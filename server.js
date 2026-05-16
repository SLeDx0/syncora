const http = require("http");
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const os = require("os");
const bcrypt = require("bcryptjs");

const ROOT_DIR = __dirname;
loadEnv();

const PUBLIC_DIR = ROOT_DIR;
const DATA_DIR = resolveDataDir();
const BACKUP_DIR = path.join(DATA_DIR, "backups");
const UPLOAD_DIR = resolveUploadDir();
const ERROR_LOG_FILE = path.join(DATA_DIR, "syncora-errors.log");
const STATE_FILE = path.join(DATA_DIR, "state.json");
const AUTH_FILE = path.join(DATA_DIR, "auth-users.json");
const AUTH_BLOB_KEY = "auth-users";
const MAX_BODY_BYTES = 8 * 1024 * 1024;
const SESSION_DAYS = 14;
const SESSION_HOURS = 8;
const RESET_TOKEN_MINUTES = 15;
const RESET_LINK_TOKEN_BYTES = 32;
const RESET_CODE_DIGITS = 6;
const PASSWORD_HASH_ROUNDS = Number(process.env.PASSWORD_HASH_ROUNDS || 12);
const MYSQL_MEMBERS_TABLE = mysqlIdentifierFromEnv(process.env.SYNCORA_AUTH_TABLE || process.env.MYSQL_MEMBERS_TABLE, "member");
const MYSQL_SESSIONS_TABLE = mysqlIdentifierFromEnv(process.env.SYNCORA_SESSIONS_TABLE || process.env.MYSQL_SESSIONS_TABLE, "syncora_sessions");
const MYSQL_PASSWORD_RESETS_TABLE = mysqlIdentifierFromEnv(process.env.SYNCORA_PASSWORD_RESETS_TABLE || process.env.MYSQL_PASSWORD_RESETS_TABLE, "password_resets");
const MYSQL_OAUTH_STATES_TABLE = mysqlIdentifierFromEnv(process.env.SYNCORA_OAUTH_STATES_TABLE || process.env.MYSQL_OAUTH_STATES_TABLE, "syncora_oauth_states");
const LEGACY_MYSQL_USERS_TABLES = ["members", "syncora_users"].filter((table, index, list) => table !== MYSQL_MEMBERS_TABLE && list.indexOf(table) === index);
const METRIC_INTERVAL_MS = 30 * 1000;
const PORT = Number(process.env.PORT || 3000);
const MAX_PORT = Number(process.env.MAX_PORT || PORT);
const DISCORD_CALLBACK_PATH = "/discord/callback";
const LEGACY_DISCORD_CALLBACK_PATH = "/api/auth/discord/callback";
const NETLIFY_DISCORD_CALLBACK_PATH = "/api/discord/callback";
const SYNCORA_PUBLIC_ORIGIN = "https://syncora.netlify.app";

const STATIC_DENYLIST = new Set([
  ".env",
  "server.js",
  "package.json",
  "task.json",
  "launch.json",
  "baslat-panel.cmd"
]);
const STATIC_PRIVATE_DIRS = new Set([".vscode", "data", "backups"]);

const DEFAULT_DEPARTMENTS = [
  { id: "police", name: { tr: "Polis", en: "Police", ru: "Politsiya" }, color: "#7dd3fc" },
  { id: "ems", name: { tr: "EMS", en: "EMS", ru: "EMS" }, color: "#fb7185" },
  { id: "mechanic", name: { tr: "Mekanik", en: "Mechanic", ru: "Mekhanik" }, color: "#fbbf24" },
  { id: "staff", name: { tr: "Yetkili", en: "Staff", ru: "Administratsiya" }, color: "#c084fc" }
];

let state = null;
let saveQueue = Promise.resolve();
let blobStores = null;
let blobStorageUnavailable = false;
let mysqlPool = null;
let mysqlAuthReady = false;
let authStorageError = null;

const defaultState = () => ({
  version: 1,
  users: [],
  sessions: [],
  oauthStates: [],
  passwordResetTokens: [],
  personnel: [],
  tasks: [],
  notes: {
    general: "",
    operations: ""
  },
  logs: [],
  metrics: [],
  settings: {
    brandName: "Syncora Roleplay",
    language: "tr",
    backgroundUrl: "",
    logoUrl: "/syncora-pp.png",
    inviteRequired: false,
    servers: [
      {
        id: "syncora-rp",
        name: process.env.FIVEM_SERVER_NAME || "Syncora RP",
        address: process.env.FIVEM_SERVER || "",
        enabled: true
      }
    ],
    departments: DEFAULT_DEPARTMENTS
  }
});

function loadEnv() {
  const envPath = path.join(ROOT_DIR, ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const index = line.indexOf("=");
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim().replace(/^['"]|['"]$/g, "");
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

function mysqlIdentifierFromEnv(value, fallback) {
  const text = String(value || fallback || "").trim();
  return /^[A-Za-z0-9_]+$/.test(text) ? text : fallback;
}

async function ensureStorage() {
  if (usesNetlifyBlobs()) return;
  await fsp.mkdir(DATA_DIR, { recursive: true });
  await fsp.mkdir(BACKUP_DIR, { recursive: true });
  await fsp.mkdir(UPLOAD_DIR, { recursive: true });
}

function usesNetlifyBlobs() {
  return !blobStorageUnavailable && (
    process.env.SYNCORA_STORAGE === "netlify-blobs" ||
    selectedNetlifyBlobsAuth() ||
    isNetlifyRuntime()
  );
}

function isNetlifyRuntime() {
  return process.env.NETLIFY === "true" || process.env.NETLIFY_DEV === "true" || isServerlessRuntime();
}

function isServerlessRuntime() {
  return Boolean(
    process.env.LAMBDA_TASK_ROOT ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.AWS_EXECUTION_ENV?.includes("AWS_Lambda")
  );
}

function resolveDataDir() {
  return resolveRuntimeStoragePath(process.env.DATA_DIR, "data", "syncora-panel-data");
}

function resolveUploadDir() {
  return resolveRuntimeStoragePath(process.env.UPLOAD_DIR, "uploads", "syncora-panel-uploads");
}

function resolveRuntimeStoragePath(configuredValue, localName, runtimeName) {
  const configured = String(configuredValue || "").trim();
  if (!isNetlifyRuntime()) return configured ? path.resolve(configured) : path.join(ROOT_DIR, localName);

  const tempRoot = os.tmpdir();
  if (!configured) return path.join(tempRoot, runtimeName);

  if (path.isAbsolute(configured)) {
    const resolved = path.resolve(configured);
    return isPathInside(tempRoot, resolved) ? resolved : path.join(tempRoot, runtimeName);
  }

  const safeName = path
    .normalize(configured)
    .split(/[\\/]+/)
    .filter((part) => part && part !== "." && part !== "..")
    .join(path.sep);

  return path.join(tempRoot, safeName || runtimeName);
}

function isPathInside(parent, child) {
  const relative = path.relative(path.resolve(parent), path.resolve(child));
  return relative === "" || (relative && !relative.startsWith("..") && !path.isAbsolute(relative));
}

async function getBlobStores() {
  if (!blobStores) {
    const { getStore } = await import("@netlify/blobs");
    const options = blobStoreOptions();
    blobStores = {
      state: options ? getStore({ name: "syncora-panel-state", ...options }) : getStore("syncora-panel-state"),
      uploads: options ? getStore({ name: "syncora-panel-uploads", ...options }) : getStore("syncora-panel-uploads")
    };
  }
  return blobStores;
}

function blobStoreOptions() {
  const siteID = process.env.NETLIFY_SITE_ID || process.env.SITE_ID;
  const token = process.env.NETLIFY_AUTH_TOKEN || process.env.NETLIFY_BLOBS_TOKEN;
  return siteID && token ? { siteID, token } : null;
}

function isMissingBlobsEnvironment(error) {
  const message = `${error?.name || ""} ${error?.message || ""}`;
  return message.includes("MissingBlobsEnvironmentError") || message.includes("siteID, token");
}

function disableBlobStorageFallback(error) {
  if (!isMissingBlobsEnvironment(error)) return false;
  blobStorageUnavailable = true;
  blobStores = null;
  return true;
}

function selectedAuthStorage() {
  return String(process.env.SYNCORA_AUTH_STORAGE || process.env.AUTH_STORAGE || "").trim().toLowerCase();
}

function selectedMysqlAuth() {
  const selectedStorage = selectedAuthStorage();
  return selectedStorage === "mysql" || selectedStorage === "mariadb";
}

function selectedNetlifyBlobsAuth() {
  const selectedStorage = selectedAuthStorage();
  return selectedStorage === "netlify-blobs" || selectedStorage === "blobs" || selectedStorage === "netlify";
}

function effectiveAuthStorage() {
  if (selectedMysqlAuth()) return "mysql";
  if (selectedNetlifyBlobsAuth() || usesNetlifyBlobs()) return "netlify-blobs";
  return "local-json";
}

function mysqlEnvConfigured() {
  return Boolean(
    safeText(process.env.MYSQL_HOST) ||
      safeText(process.env.DB_HOST) ||
      safeText(process.env.MYSQL_DATABASE) ||
      safeText(process.env.DB_DATABASE) ||
      safeText(process.env.DB_NAME) ||
      safeText(process.env.MYSQL_USER) ||
      safeText(process.env.DB_USER)
  );
}

function hasRequiredMysqlEnvForNetlify() {
  const host = safeText(process.env.MYSQL_HOST || process.env.DB_HOST);
  const database = safeText(process.env.MYSQL_DATABASE || process.env.DB_DATABASE || process.env.DB_NAME);
  const user = safeText(process.env.MYSQL_USER || process.env.DB_USER);
  return Boolean(host && database && user);
}

function usesMysqlAuth() {
  // MySQL/phpMyAdmin is now a legacy/manual mode only. The panel must not switch
  // back to MySQL just because old MYSQL_* variables are still present in Netlify.
  // To use the legacy adapter intentionally, set SYNCORA_AUTH_STORAGE=mysql.
  return selectedMysqlAuth();
}

function isLocalMysqlHost(host) {
  const value = String(host || "").replace(/^\[|\]$/g, "").toLowerCase();
  return value === "localhost" || value === "127.0.0.1" || value === "::1" || value === "0.0.0.0";
}

function mysqlConfig() {
  return {
    host: process.env.MYSQL_HOST || process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.MYSQL_PORT || process.env.DB_PORT || 3306),
    user: process.env.MYSQL_USER || process.env.DB_USER || "root",
    password: process.env.MYSQL_PASSWORD ?? process.env.DB_PASSWORD ?? process.env.DB_PASS ?? "",
    database: process.env.MYSQL_DATABASE || process.env.DB_DATABASE || process.env.DB_NAME || "syncora_panel",
    waitForConnections: true,
    connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT || 10),
    queueLimit: 0,
    charset: "utf8mb4"
  };
}


function mysqlPublicConfig() {
  const config = mysqlConfig();
  return {
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    authTable: MYSQL_MEMBERS_TABLE,
    sessionsTable: MYSQL_SESSIONS_TABLE,
    passwordResetsTable: MYSQL_PASSWORD_RESETS_TABLE,
    envConfigured: mysqlEnvConfigured(),
    netlifyRequiredEnvConfigured: hasRequiredMysqlEnvForNetlify(),
    localHostOnNetlify: isNetlifyRuntime() && isLocalMysqlHost(config.host)
  };
}

function createAuthStorageError(errorOrMessage, code = "mysql_unavailable") {
  const error = errorOrMessage instanceof Error ? errorOrMessage : new Error(String(errorOrMessage || "MySQL auth storage unavailable."));
  error.status = error.status || 503;
  error.code = error.code || code;
  return error;
}

function mysqlFriendlyError(error) {
  const config = mysqlPublicConfig();
  const code = error?.code || "mysql_unavailable";
  const base = `${config.host}:${config.port}/${config.database}`;
  if (code === "mysql_env_missing_on_netlify" || code === "mysql_localhost_on_netlify") return error?.message || "Netlify MySQL ayarlari eksik veya hatali.";
  if (code === "ECONNREFUSED") return `MySQL baglantisi reddedildi (${base}). XAMPP/MySQL acik mi, port dogru mu kontrol et.`;
  if (code === "ETIMEDOUT" || code === "ENETUNREACH") return `MySQL baglantisi zaman asimina ugradi (${base}). Host public erisime acik degil veya firewall engelliyor.`;
  if (code === "ENOTFOUND") return `MySQL host bulunamadi (${config.host}). MYSQL_HOST adresini kontrol et.`;
  if (code === "ER_ACCESS_DENIED_ERROR") return "MySQL kullanici adi veya sifresi hatali. MYSQL_USER ve MYSQL_PASSWORD degerlerini kontrol et.";
  if (code === "ER_BAD_DB_ERROR") return `MySQL veritabani bulunamadi (${config.database}). database/mysql_auth_schema.sql dosyasini phpMyAdmin\'de ice aktar.`;
  if (code === "ER_NO_SUCH_TABLE") return `MySQL tablosu bulunamadi (${config.database}.${config.authTable}). database/mysql_auth_schema.sql dosyasini phpMyAdmin\'de ice aktar.`;
  return `MySQL auth depolamasi hazirlanamadi: ${error?.message || "bilinmeyen hata"}`;
}

function validateMysqlConfigForRuntime() {
  if (!usesMysqlAuth()) return;
  const config = mysqlConfig();

  if (isNetlifyRuntime() && !hasRequiredMysqlEnvForNetlify()) {
    throw createAuthStorageError(
      "Netlify'de MySQL/phpMyAdmin kaydi icin Environment Variables eksik. Netlify > Site configuration > Environment variables kismina MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD ve SYNCORA_AUTH_TABLE=member ekle. Netlify kendi bilgisayarindaki phpMyAdmin/XAMPP veritabanina baglanamaz; MYSQL_HOST public/uzak MySQL hostu olmalidir.",
      "mysql_env_missing_on_netlify"
    );
  }

  if (isNetlifyRuntime() && isLocalMysqlHost(config.host)) {
    throw createAuthStorageError(
      "Netlify uzerindeki site 127.0.0.1/localhost XAMPP MySQL'e erisemez. PHPMyAdmin kullanacaksan MYSQL_HOST Netlify'nin ulasabildigi uzak/public bir MySQL hostu olmalidir.",
      "mysql_localhost_on_netlify"
    );
  }
}

function authStorageUnavailablePayload() {
  return {
    error: authStorageError?.code || "mysql_unavailable",
    message: authStorageError?.message || "MySQL auth depolamasi hazir degil.",
    mysql: mysqlPublicConfig()
  };
}

function isPublicApiRoute(pathname) {
  return pathname === "/api/public-config" || pathname === "/api/health" || pathname.startsWith("/api/uploads/files/");
}

async function getMysqlPool() {
  if (mysqlPool) return mysqlPool;

  let mysql;
  try {
    mysql = require("mysql2/promise");
  } catch {
    throw new Error("MySQL auth aktif, fakat mysql2 paketi kurulu degil. Proje klasorunde `npm install` calistir.");
  }

  mysqlPool = mysql.createPool(mysqlConfig());
  return mysqlPool;
}

async function initAuthStorage() {
  authStorageError = null;
  mysqlAuthReady = false;
  if (!usesMysqlAuth()) return;

  try {
    validateMysqlConfigForRuntime();
    const pool = await getMysqlPool();
    await createMysqlAuthTables(pool);

    const [[countRow]] = await pool.query(`SELECT COUNT(*) AS total FROM \`${MYSQL_MEMBERS_TABLE}\``);
    mysqlAuthReady = true;

    if (Number(countRow.total || 0) === 0 && Array.isArray(state.users) && state.users.length > 0) {
      await saveAuthToMysql(state);
    }

    await loadAuthFromMysql();
    await saveState({ backup: false });
    console.log(`Syncora MySQL auth aktif: ${mysqlConfig().host}:${mysqlConfig().port}/${mysqlConfig().database}`);
  } catch (error) {
    authStorageError = createAuthStorageError(mysqlFriendlyError(error), error.code || "mysql_unavailable");
    await writeErrorLog("mysql.init", authStorageError, { mysql: mysqlPublicConfig() });
  }
}

async function createMysqlAuthTables(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`${MYSQL_MEMBERS_TABLE}\` (
      id VARCHAR(64) NOT NULL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(190) NOT NULL,
      role VARCHAR(30) NOT NULL DEFAULT 'member',
      password_hash VARCHAR(255) NOT NULL DEFAULT '',
      discord_id VARCHAR(32) NULL,
      discord_json LONGTEXT NULL,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NULL,
      UNIQUE KEY uq_members_email (email),
      INDEX idx_members_discord_id (discord_id),
      INDEX idx_members_role (role)
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `);

  await ensureMysqlColumn(pool, MYSQL_MEMBERS_TABLE, "name", "VARCHAR(120) NOT NULL DEFAULT 'Panel User'");
  await ensureMysqlColumn(pool, MYSQL_MEMBERS_TABLE, "role", "VARCHAR(30) NOT NULL DEFAULT 'member'");
  await ensureMysqlColumn(pool, MYSQL_MEMBERS_TABLE, "password_hash", "VARCHAR(255) NOT NULL DEFAULT ''");
  await ensureMysqlColumn(pool, MYSQL_MEMBERS_TABLE, "discord_id", "VARCHAR(32) NULL");
  await ensureMysqlColumn(pool, MYSQL_MEMBERS_TABLE, "discord_json", "LONGTEXT NULL");
  await ensureMysqlColumn(pool, MYSQL_MEMBERS_TABLE, "created_at", "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP");
  await ensureMysqlColumn(pool, MYSQL_MEMBERS_TABLE, "updated_at", "DATETIME NULL");
  await ensureMysqlIndex(pool, MYSQL_MEMBERS_TABLE, "uq_members_email", "`email`", true);
  await ensureMysqlIndex(pool, MYSQL_MEMBERS_TABLE, "idx_members_discord_id", "`discord_id`");
  await migrateLegacyUsersToMembers(pool);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`${MYSQL_SESSIONS_TABLE}\` (
      token_hash CHAR(64) NOT NULL PRIMARY KEY,
      user_id VARCHAR(64) NOT NULL,
      expires_at DATETIME NOT NULL,
      remember TINYINT(1) NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL,
      INDEX idx_syncora_sessions_user (user_id),
      INDEX idx_syncora_sessions_expires (expires_at)
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`${MYSQL_PASSWORD_RESETS_TABLE}\` (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(190) NOT NULL,
      user_id VARCHAR(64) NULL,
      code_hash VARCHAR(255) NOT NULL,
      expires_at DATETIME NOT NULL,
      used_at DATETIME NULL,
      created_at DATETIME NOT NULL,
      INDEX idx_password_resets_email (email),
      INDEX idx_password_resets_user (user_id),
      INDEX idx_password_resets_active (email, expires_at, used_at)
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `);

  await ensureMysqlColumn(pool, MYSQL_PASSWORD_RESETS_TABLE, "email", "VARCHAR(190) NOT NULL");
  await ensureMysqlColumn(pool, MYSQL_PASSWORD_RESETS_TABLE, "user_id", "VARCHAR(64) NULL");
  await ensureMysqlColumn(pool, MYSQL_PASSWORD_RESETS_TABLE, "code_hash", "VARCHAR(255) NOT NULL");
  await ensureMysqlColumn(pool, MYSQL_PASSWORD_RESETS_TABLE, "expires_at", "DATETIME NOT NULL");
  await ensureMysqlColumn(pool, MYSQL_PASSWORD_RESETS_TABLE, "used_at", "DATETIME NULL");
  await ensureMysqlColumn(pool, MYSQL_PASSWORD_RESETS_TABLE, "created_at", "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP");

  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`${MYSQL_OAUTH_STATES_TABLE}\` (
      token VARCHAR(96) NOT NULL PRIMARY KEY,
      mode VARCHAR(20) NOT NULL,
      user_id VARCHAR(64) NULL,
      redirect_uri TEXT NULL,
      created_at DATETIME NOT NULL,
      INDEX idx_syncora_oauth_created (created_at)
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `);
}

async function ensureMysqlColumn(pool, table, column, definition) {
  if (await mysqlColumnExists(pool, table, column)) return;

  await pool.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition}`);
}

async function mysqlColumnExists(pool, table, column) {
  const config = mysqlConfig();
  const [rows] = await pool.query(
    `SELECT COUNT(*) AS total
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [config.database, table, column]
  );

  return Number(rows?.[0]?.total || 0) > 0;
}

async function ensureMysqlIndex(pool, table, indexName, columnsSql, unique = false) {
  const config = mysqlConfig();
  const [rows] = await pool.query(
    `SELECT COUNT(*) AS total
     FROM INFORMATION_SCHEMA.STATISTICS
     WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND INDEX_NAME = ?`,
    [config.database, table, indexName]
  );

  if (Number(rows?.[0]?.total || 0) > 0) return;

  await pool.query(`ALTER TABLE \`${table}\` ADD ${unique ? "UNIQUE " : ""}KEY \`${indexName}\` (${columnsSql})`);
}

async function mysqlTableExists(pool, table) {
  const config = mysqlConfig();
  const [rows] = await pool.query(
    `SELECT COUNT(*) AS total
     FROM INFORMATION_SCHEMA.TABLES
     WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
    [config.database, table]
  );

  return Number(rows?.[0]?.total || 0) > 0;
}

async function migrateLegacyUsersToMembers(pool) {
  for (const legacyTable of LEGACY_MYSQL_USERS_TABLES) {
    if (!(await mysqlTableExists(pool, legacyTable))) continue;

    const hasId = await mysqlColumnExists(pool, legacyTable, "id");
    const hasEmail = await mysqlColumnExists(pool, legacyTable, "email");
    if (!hasEmail) continue;

    const hasName = await mysqlColumnExists(pool, legacyTable, "name");
    const hasRole = await mysqlColumnExists(pool, legacyTable, "role");
    const hasPasswordHash = await mysqlColumnExists(pool, legacyTable, "password_hash");
    const hasDiscordId = await mysqlColumnExists(pool, legacyTable, "discord_id");
    const hasDiscordJson = await mysqlColumnExists(pool, legacyTable, "discord_json");
    const hasCreatedAt = await mysqlColumnExists(pool, legacyTable, "created_at");
    const hasUpdatedAt = await mysqlColumnExists(pool, legacyTable, "updated_at");

    const idExpr = hasId ? "id" : "UUID()";
    const nameExpr = hasName
      ? "COALESCE(NULLIF(`name`, ''), SUBSTRING_INDEX(email, '@', 1), 'Panel User')"
      : "COALESCE(SUBSTRING_INDEX(email, '@', 1), 'Panel User')";
    const roleExpr = hasRole ? "COALESCE(NULLIF(role, ''), 'member')" : "'member'";
    const passwordExpr = hasPasswordHash ? "COALESCE(password_hash, '')" : "''";
    const discordIdExpr = hasDiscordId ? "discord_id" : "NULL";
    const discordExpr = hasDiscordJson ? "discord_json" : "NULL";
    const createdExpr = hasCreatedAt ? "COALESCE(created_at, UTC_TIMESTAMP())" : "UTC_TIMESTAMP()";
    const updatedExpr = hasUpdatedAt ? "updated_at" : "NULL";

    await pool.query(`
      INSERT IGNORE INTO \`${MYSQL_MEMBERS_TABLE}\`
        (id, name, email, role, password_hash, discord_id, discord_json, created_at, updated_at)
      SELECT
        ${idExpr} AS id,
        ${nameExpr} AS name,
        LOWER(TRIM(email)) AS email,
        ${roleExpr} AS role,
        ${passwordExpr} AS password_hash,
        ${discordIdExpr} AS discord_id,
        ${discordExpr} AS discord_json,
        ${createdExpr} AS created_at,
        ${updatedExpr} AS updated_at
      FROM \`${legacyTable}\`
      WHERE email IS NOT NULL AND TRIM(email) <> ''
    `);
  }
}

function toMysqlDate(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 19).replace("T", " ");
  return date.toISOString().slice(0, 19).replace("T", " ");
}

function fromMysqlDate(value) {
  if (!value) return new Date().toISOString();
  if (value instanceof Date) return value.toISOString();
  const text = String(value).trim();
  const parsed = new Date(text.includes("T") ? text : `${text.replace(" ", "T")}Z`);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

function parseJsonColumn(value, fallback = null) {
  if (!value) return fallback;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

async function loadAuthFromMysql() {
  if (!usesMysqlAuth()) return;
  const pool = await getMysqlPool();
  const [users] = await pool.query(`
    SELECT
      id,
      \`name\` AS name,
      email,
      role,
      password_hash,
      discord_id,
      discord_json,
      created_at,
      updated_at
    FROM \`${MYSQL_MEMBERS_TABLE}\`
    ORDER BY created_at ASC
  `);
  const [sessions] = await pool.query(`SELECT * FROM \`${MYSQL_SESSIONS_TABLE}\` ORDER BY created_at ASC`);
  const [tokens] = await pool.query(`
    SELECT *
    FROM \`${MYSQL_PASSWORD_RESETS_TABLE}\`
    WHERE used_at IS NULL AND expires_at > UTC_TIMESTAMP()
    ORDER BY created_at ASC
  `);
  const [oauthStates] = await pool.query(`SELECT * FROM \`${MYSQL_OAUTH_STATES_TABLE}\` ORDER BY created_at ASC`);

  state.users = users.map((row) => {
    const discord = parseJsonColumn(row.discord_json, null);
    const discordId = row.discord_id ? String(row.discord_id) : "";
    if (discord && discordId && !discord.id) discord.id = discordId;

    return {
      id: row.id,
      name: row.name,
      email: normalizeEmail(row.email),
      role: row.role || "member",
      passwordHash: row.password_hash || "",
      discord: discord || (discordId ? { id: discordId, connectedAt: row.updated_at ? fromMysqlDate(row.updated_at) : fromMysqlDate(row.created_at) } : null),
      createdAt: fromMysqlDate(row.created_at),
      updatedAt: row.updated_at ? fromMysqlDate(row.updated_at) : undefined
    };
  });

  state.sessions = pruneSessions(sessions.map((row) => ({
    tokenHash: row.token_hash,
    userId: row.user_id,
    expiresAt: fromMysqlDate(row.expires_at),
    remember: Boolean(row.remember),
    createdAt: fromMysqlDate(row.created_at)
  })));

  state.passwordResetTokens = prunePasswordResetTokens(tokens.map((row) => ({
    id: row.id ? String(row.id) : undefined,
    email: normalizeEmail(row.email),
    userId: row.user_id,
    codeHash: row.code_hash,
    expiresAt: fromMysqlDate(row.expires_at),
    usedAt: row.used_at ? fromMysqlDate(row.used_at) : null,
    createdAt: fromMysqlDate(row.created_at)
  })));

  state.oauthStates = pruneOauthStates(oauthStates.map((row) => ({
    token: row.token,
    mode: row.mode,
    userId: row.user_id || null,
    redirectUri: row.redirect_uri || "",
    createdAt: fromMysqlDate(row.created_at)
  })));
}

async function saveAuthToMysql(source) {
  if (!usesMysqlAuth() || !mysqlAuthReady) return;

  const pool = await getMysqlPool();
  const conn = await pool.getConnection();
  const snapshot = {
    users: Array.isArray(source.users) ? source.users : [],
    sessions: pruneSessions(source.sessions || []),
    passwordResetTokens: prunePasswordResetTokens(source.passwordResetTokens || []),
    oauthStates: pruneOauthStates(source.oauthStates || [])
  };

  try {
    await conn.beginTransaction();

    for (const user of snapshot.users) {
      await conn.query(
        `INSERT INTO \`${MYSQL_MEMBERS_TABLE}\` (id, name, email, role, password_hash, discord_id, discord_json, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           name = IF(VALUES(updated_at) IS NOT NULL AND (\`${MYSQL_MEMBERS_TABLE}\`.updated_at IS NULL OR VALUES(updated_at) >= \`${MYSQL_MEMBERS_TABLE}\`.updated_at), VALUES(name), \`${MYSQL_MEMBERS_TABLE}\`.name),
           email = IF(VALUES(updated_at) IS NOT NULL AND (\`${MYSQL_MEMBERS_TABLE}\`.updated_at IS NULL OR VALUES(updated_at) >= \`${MYSQL_MEMBERS_TABLE}\`.updated_at), VALUES(email), \`${MYSQL_MEMBERS_TABLE}\`.email),
           role = IF(VALUES(updated_at) IS NOT NULL AND (\`${MYSQL_MEMBERS_TABLE}\`.updated_at IS NULL OR VALUES(updated_at) >= \`${MYSQL_MEMBERS_TABLE}\`.updated_at), VALUES(role), \`${MYSQL_MEMBERS_TABLE}\`.role),
           password_hash = IF(VALUES(updated_at) IS NOT NULL AND (\`${MYSQL_MEMBERS_TABLE}\`.updated_at IS NULL OR VALUES(updated_at) >= \`${MYSQL_MEMBERS_TABLE}\`.updated_at), VALUES(password_hash), \`${MYSQL_MEMBERS_TABLE}\`.password_hash),
           discord_id = IF(VALUES(updated_at) IS NOT NULL AND (\`${MYSQL_MEMBERS_TABLE}\`.updated_at IS NULL OR VALUES(updated_at) >= \`${MYSQL_MEMBERS_TABLE}\`.updated_at), VALUES(discord_id), \`${MYSQL_MEMBERS_TABLE}\`.discord_id),
           discord_json = IF(VALUES(updated_at) IS NOT NULL AND (\`${MYSQL_MEMBERS_TABLE}\`.updated_at IS NULL OR VALUES(updated_at) >= \`${MYSQL_MEMBERS_TABLE}\`.updated_at), VALUES(discord_json), \`${MYSQL_MEMBERS_TABLE}\`.discord_json),
           created_at = COALESCE(\`${MYSQL_MEMBERS_TABLE}\`.created_at, VALUES(created_at)),
           updated_at = IF(VALUES(updated_at) IS NOT NULL AND (\`${MYSQL_MEMBERS_TABLE}\`.updated_at IS NULL OR VALUES(updated_at) >= \`${MYSQL_MEMBERS_TABLE}\`.updated_at), VALUES(updated_at), \`${MYSQL_MEMBERS_TABLE}\`.updated_at)`,
        [
          user.id,
          safeText(user.name, "Panel User"),
          normalizeEmail(user.email),
          safeText(user.role, "member"),
          user.passwordHash || "",
          user.discord?.id ? String(user.discord.id).slice(0, 32) : null,
          user.discord ? JSON.stringify(user.discord) : null,
          toMysqlDate(user.createdAt),
          user.updatedAt ? toMysqlDate(user.updatedAt) : null
        ]
      );
    }

    await conn.query(`DELETE FROM \`${MYSQL_SESSIONS_TABLE}\` WHERE expires_at <= UTC_TIMESTAMP()`);
    for (const session of snapshot.sessions) {
      await conn.query(
        `INSERT INTO \`${MYSQL_SESSIONS_TABLE}\` (token_hash, user_id, expires_at, remember, created_at)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           user_id = VALUES(user_id),
           expires_at = VALUES(expires_at),
           remember = VALUES(remember)`,
        [session.tokenHash, session.userId, toMysqlDate(session.expiresAt), session.remember ? 1 : 0, toMysqlDate(session.createdAt)]
      );
    }

    await conn.query(`DELETE FROM \`${MYSQL_PASSWORD_RESETS_TABLE}\` WHERE used_at IS NOT NULL OR expires_at <= UTC_TIMESTAMP()`);
    const resetUserIds = [...new Set(snapshot.passwordResetTokens.map((token) => token.userId).filter(Boolean))];
    for (const userId of resetUserIds) {
      await conn.query(`DELETE FROM \`${MYSQL_PASSWORD_RESETS_TABLE}\` WHERE user_id = ? AND used_at IS NULL`, [userId]);
    }
    for (const token of snapshot.passwordResetTokens) {
      const user = snapshot.users.find((item) => item.id === token.userId);
      const email = normalizeEmail(token.email || user?.email || "");
      const codeHash = token.codeHash || token.tokenHash || "";
      if (!email || !codeHash) continue;
      await conn.query(
        `INSERT INTO \`${MYSQL_PASSWORD_RESETS_TABLE}\` (email, user_id, code_hash, expires_at, created_at)
         VALUES (?, ?, ?, ?, ?)`,
        [email, token.userId || null, codeHash, toMysqlDate(token.expiresAt), toMysqlDate(token.createdAt)]
      );
    }

    await conn.query(`DELETE FROM \`${MYSQL_OAUTH_STATES_TABLE}\` WHERE created_at <= DATE_SUB(UTC_TIMESTAMP(), INTERVAL 10 MINUTE)`);
    for (const oauthState of snapshot.oauthStates) {
      await conn.query(
        `INSERT INTO \`${MYSQL_OAUTH_STATES_TABLE}\` (token, mode, user_id, redirect_uri, created_at)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           mode = VALUES(mode),
           user_id = VALUES(user_id),
           redirect_uri = VALUES(redirect_uri)`,
        [oauthState.token, oauthState.mode || "login", oauthState.userId || null, oauthState.redirectUri || "", toMysqlDate(oauthState.createdAt)]
      );
    }

    await conn.commit();
  } catch (error) {
    await conn.rollback().catch(() => {});
    throw error;
  } finally {
    conn.release();
  }
}

async function deleteMysqlSessionByTokenHash(tokenHash) {
  if (!usesMysqlAuth() || !mysqlAuthReady || !tokenHash) return;
  const pool = await getMysqlPool();
  await pool.query(`DELETE FROM \`${MYSQL_SESSIONS_TABLE}\` WHERE token_hash = ?`, [tokenHash]);
}

async function deleteMysqlSessionsByUserId(userId) {
  if (!usesMysqlAuth() || !mysqlAuthReady || !userId) return;
  const pool = await getMysqlPool();
  await pool.query(`DELETE FROM \`${MYSQL_SESSIONS_TABLE}\` WHERE user_id = ?`, [userId]);
}

async function deleteMysqlPasswordResetTokensByUserId(userId) {
  if (!usesMysqlAuth() || !mysqlAuthReady || !userId) return;
  const pool = await getMysqlPool();
  await pool.query(`DELETE FROM \`${MYSQL_PASSWORD_RESETS_TABLE}\` WHERE user_id = ? AND used_at IS NULL`, [userId]);
}


function sanitizeAuthSnapshot(source) {
  const usersById = new Map();
  const users = Array.isArray(source?.users) ? source.users : [];
  for (const user of users) {
    const email = normalizeEmail(user?.email);
    if (!email || !email.includes("@")) continue;
    const cleanUser = {
      id: safeText(user.id, crypto.randomUUID()),
      name: safeText(user.name, email.split("@")[0] || "Panel User"),
      email,
      role: safeText(user.role, "member"),
      passwordHash: safeText(user.passwordHash || user.password_hash || ""),
      discord: user.discord || null,
      createdAt: user.createdAt || new Date().toISOString(),
      updatedAt: user.updatedAt || user.createdAt || new Date().toISOString()
    };
    usersById.set(cleanUser.id, cleanUser);
  }

  return {
    version: 1,
    savedAt: new Date().toISOString(),
    users: [...usersById.values()],
    sessions: pruneSessions(Array.isArray(source?.sessions) ? source.sessions : []),
    passwordResetTokens: prunePasswordResetTokens(Array.isArray(source?.passwordResetTokens) ? source.passwordResetTokens : []),
    oauthStates: pruneOauthStates(Array.isArray(source?.oauthStates) ? source.oauthStates : [])
  };
}

function newerAuthItem(a, b) {
  const aTime = new Date(a?.updatedAt || a?.createdAt || 0).getTime() || 0;
  const bTime = new Date(b?.updatedAt || b?.createdAt || 0).getTime() || 0;
  return aTime >= bTime ? a : b;
}

function mergeAuthSnapshotIntoState(snapshot) {
  const clean = sanitizeAuthSnapshot(snapshot);
  if (!clean.users.length && !clean.sessions.length && !clean.passwordResetTokens.length && !clean.oauthStates.length) return false;

  const byId = new Map();
  const byEmail = new Map();
  for (const user of state.users || []) {
    const cleanUser = sanitizeAuthSnapshot({ users: [user] }).users[0];
    if (!cleanUser) continue;
    byId.set(cleanUser.id, cleanUser);
    byEmail.set(canonicalEmailKey(cleanUser.email), cleanUser.id);
  }

  for (const user of clean.users) {
    const existingId = byId.has(user.id) ? user.id : byEmail.get(canonicalEmailKey(user.email));
    if (existingId && byId.has(existingId)) {
      const chosen = newerAuthItem(user, byId.get(existingId));
      chosen.id = existingId;
      byId.set(existingId, chosen);
      byEmail.set(canonicalEmailKey(chosen.email), existingId);
      continue;
    }
    byId.set(user.id, user);
    byEmail.set(canonicalEmailKey(user.email), user.id);
  }

  state.users = [...byId.values()].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const sessionMap = new Map();
  for (const session of pruneSessions([...(state.sessions || []), ...clean.sessions])) {
    if (session?.tokenHash && byId.has(session.userId)) sessionMap.set(session.tokenHash, session);
  }
  state.sessions = [...sessionMap.values()];

  const resetMap = new Map();
  for (const token of prunePasswordResetTokens([...(state.passwordResetTokens || []), ...clean.passwordResetTokens])) {
    const key = token.id || `${token.userId || ""}:${token.email || ""}:${token.createdAt || ""}:${token.codeHash || token.tokenHash || ""}`;
    if (key) resetMap.set(key, token);
  }
  state.passwordResetTokens = [...resetMap.values()];

  const oauthMap = new Map();
  for (const oauthState of pruneOauthStates([...(state.oauthStates || []), ...clean.oauthStates])) {
    if (oauthState?.token) oauthMap.set(oauthState.token, oauthState);
  }
  state.oauthStates = [...oauthMap.values()];
  return true;
}

async function readAuthSnapshotFile() {
  try {
    if (!fs.existsSync(AUTH_FILE)) return null;
    return parseJsonText(await fsp.readFile(AUTH_FILE, "utf8"));
  } catch (error) {
    await writeErrorLog("auth.file.read", error, { file: AUTH_FILE }).catch(() => {});
    return null;
  }
}

async function readAuthSnapshotFromBlob() {
  if (!usesNetlifyBlobs()) return null;
  try {
    const stores = await getBlobStores();
    return await stores.state.get(AUTH_BLOB_KEY, { consistency: "strong", type: "json" });
  } catch (error) {
    if (!disableBlobStorageFallback(error)) await writeErrorLog("auth.blob.read", error, { key: AUTH_BLOB_KEY }).catch(() => {});
    return null;
  }
}

async function loadDurableAuthSnapshot() {
  const blobSnapshot = await readAuthSnapshotFromBlob();
  const fileSnapshot = await readAuthSnapshotFile();
  let changed = false;
  if (fileSnapshot) changed = mergeAuthSnapshotIntoState(fileSnapshot) || changed;
  if (blobSnapshot) changed = mergeAuthSnapshotIntoState(blobSnapshot) || changed;
  return changed;
}

async function saveAuthSnapshot(source) {
  const snapshot = sanitizeAuthSnapshot(source);

  if (usesNetlifyBlobs()) {
    try {
      const stores = await getBlobStores();
      await stores.state.setJSON(AUTH_BLOB_KEY, snapshot);
      return;
    } catch (error) {
      if (!disableBlobStorageFallback(error)) throw error;
      await ensureStorage();
    }
  }

  await ensureStorage();
  const data = JSON.stringify(snapshot, null, 2);
  const tempFile = `${AUTH_FILE}.tmp`;
  await fsp.writeFile(tempFile, data, "utf8");
  await fsp.rename(tempFile, AUTH_FILE);
}

async function loadState() {
  await ensureStorage();
  let needsInitialSave = false;

  if (usesNetlifyBlobs()) {
    try {
      const stores = await getBlobStores();
      const loaded = await stores.state.get("state", { consistency: "strong", type: "json" });
      state = normalizeLoadedState(loaded || readBundledState() || defaultState());
      needsInitialSave = !loaded;
      await loadDurableAuthSnapshot();
      if (needsInitialSave) await saveState({ backup: false });
      return;
    } catch (error) {
      if (!disableBlobStorageFallback(error)) throw error;
      await ensureStorage();
    }
  }

  if (!fs.existsSync(STATE_FILE)) {
    state = defaultState();
    await loadDurableAuthSnapshot();
    await saveState({ backup: true });
    return;
  }

  const loaded = parseJsonText(await fsp.readFile(STATE_FILE, "utf8"));
  state = normalizeLoadedState(loaded);
  await loadDurableAuthSnapshot();
}

function readBundledState() {
  try {
    if (!fs.existsSync(STATE_FILE)) return null;
    return parseJsonText(fs.readFileSync(STATE_FILE, "utf8"));
  } catch {
    return null;
  }
}

function parseJsonText(text) {
  return JSON.parse(String(text || "").replace(/^\uFEFF/, ""));
}

function normalizeLoadedState(loaded) {
  const fresh = defaultState();
  return {
    ...fresh,
    ...loaded,
    settings: normalizeSettings({
      ...fresh.settings,
      ...(loaded.settings || {}),
      servers: loaded.settings?.servers?.length ? loaded.settings.servers : fresh.settings.servers,
      departments: loaded.settings?.departments?.length ? loaded.settings.departments : fresh.settings.departments
    }),
    users: loaded.users || [],
    sessions: pruneSessions(loaded.sessions || []),
    oauthStates: pruneOauthStates(loaded.oauthStates || []),
    passwordResetTokens: prunePasswordResetTokens(loaded.passwordResetTokens || []),
    personnel: loaded.personnel || [],
    tasks: loaded.tasks || [],
    notes: loaded.notes || fresh.notes,
    logs: loaded.logs || [],
    metrics: loaded.metrics || []
  };
}

function sanitizeStateForSave(source) {
  return {
    ...source,
    sessions: pruneSessions(source.sessions),
    oauthStates: pruneOauthStates(source.oauthStates),
    passwordResetTokens: prunePasswordResetTokens(source.passwordResetTokens)
  };
}

function saveState(options = {}) {
  const backup = options.backup !== false;
  saveQueue = saveQueue.then(async () => {
    const cleanState = sanitizeStateForSave(state);
    await saveAuthSnapshot(cleanState);
    await saveAuthToMysql(cleanState);
    if (usesNetlifyBlobs()) {
      try {
        const stores = await getBlobStores();
        await stores.state.setJSON("state", cleanState);
        if (backup) await stores.state.setJSON(`backups/state-${new Date().toISOString()}`, cleanState);
        return;
      } catch (error) {
        if (!disableBlobStorageFallback(error)) throw error;
        await ensureStorage();
      }
    }

    await ensureStorage();
    const data = JSON.stringify(cleanState, null, 2);
    const tempFile = `${STATE_FILE}.tmp`;
    await fsp.writeFile(tempFile, data, "utf8");
    await fsp.rename(tempFile, STATE_FILE);
    if (backup) await writeBackup(data);
  });
  return saveQueue;
}

async function writeBackup(data) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  await fsp.writeFile(path.join(BACKUP_DIR, `state-${stamp}.json`), data, "utf8");
  const backups = (await fsp.readdir(BACKUP_DIR))
    .filter((file) => file.startsWith("state-") && file.endsWith(".json"))
    .sort();
  const oldBackups = backups.slice(0, Math.max(0, backups.length - 60));
  await Promise.all(oldBackups.map((file) => fsp.unlink(path.join(BACKUP_DIR, file)).catch(() => {})));
}

function pruneSessions(sessions) {
  const now = Date.now();
  return (sessions || []).filter((session) => new Date(session.expiresAt).getTime() > now);
}

function pruneOauthStates(oauthStates) {
  const cutoff = Date.now() - 10 * 60 * 1000;
  return (oauthStates || []).filter((item) => new Date(item.createdAt).getTime() > cutoff);
}

function prunePasswordResetTokens(tokens) {
  const now = Date.now();
  return (tokens || []).filter((item) => !item.usedAt && new Date(item.expiresAt).getTime() > now);
}

function parseCookies(req) {
  const header = req.headers.cookie || "";
  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf("=");
        if (index === -1) return [decodeURIComponent(part), ""];
        return [decodeURIComponent(part.slice(0, index)), decodeURIComponent(part.slice(index + 1))];
      })
  );
}

function hashToken(token) {
  return crypto.createHash("sha256").update(String(token)).digest("hex");
}

function hashPassword(password) {
  return bcrypt.hashSync(String(password || ""), PASSWORD_HASH_ROUNDS);
}

function verifyPassword(password, stored) {
  const value = String(stored || "");
  if (value.startsWith("$2y$") || value.startsWith("$2a$") || value.startsWith("$2b$")) {
    try {
      return bcrypt.compareSync(String(password || ""), normalizeBcryptPrefix(value));
    } catch {
      return false;
    }
  }

  if (verifyLegacyPbkdf2Password(password, value)) return true;

  // One-time rescue for old rows that were accidentally saved as plain text.
  // A successful login is immediately upgraded by needsPasswordRehash().
  return verifyLegacyPlainTextPassword(password, value);
}

function verifyLegacyPbkdf2Password(password, stored) {
  const [kind, iterations, salt, expected] = String(stored || "").split("$");
  if (kind !== "pbkdf2" || !iterations || !salt || !expected) return false;
  const iterationCount = Number(iterations);
  if (!Number.isSafeInteger(iterationCount) || iterationCount < 10000 || !/^[a-f0-9]+$/i.test(expected)) return false;
  const actual = crypto.pbkdf2Sync(String(password || ""), salt, iterationCount, 32, "sha256").toString("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(actual, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

function verifyLegacyPlainTextPassword(password, stored) {
  const plain = String(stored || "");
  const candidate = String(password || "");
  if (!plain || plain.length > 256 || candidate.length > 256) return false;

  const plainBuffer = Buffer.from(plain, "utf8");
  const candidateBuffer = Buffer.from(candidate, "utf8");
  if (plainBuffer.length !== candidateBuffer.length) return false;

  try {
    return crypto.timingSafeEqual(plainBuffer, candidateBuffer);
  } catch {
    return false;
  }
}

function normalizeBcryptPrefix(hash) {
  return String(hash || "").replace(/^\$2y\$/, "$2b$");
}

function needsPasswordRehash(stored) {
  const value = String(stored || "");
  if (!value.startsWith("$2y$") && !value.startsWith("$2a$") && !value.startsWith("$2b$")) return true;
  const rounds = Number(value.split("$")[2]);
  return !Number.isSafeInteger(rounds) || rounds < PASSWORD_HASH_ROUNDS;
}

function hashResetCode(code) {
  return hashPassword(String(code || ""));
}

function verifyResetCode(code, reset) {
  if (!reset) return false;
  if (reset.codeHash) return verifyPassword(String(code || ""), reset.codeHash);
  if (reset.tokenHash) return reset.tokenHash === hashToken(code);
  return false;
}

function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    discord: user.discord || null,
    hasPassword: Boolean(user.passwordHash),
    createdAt: user.createdAt
  };
}

function createSession(userId, remember = false) {
  const token = crypto.randomBytes(32).toString("hex");
  const duration = remember ? SESSION_DAYS * 24 * 60 * 60 * 1000 : SESSION_HOURS * 60 * 60 * 1000;
  const expiresAt = new Date(Date.now() + duration).toISOString();
  state.sessions = pruneSessions(state.sessions);
  state.sessions.push({
    tokenHash: hashToken(token),
    userId,
    expiresAt,
    remember: Boolean(remember),
    createdAt: new Date().toISOString()
  });
  return { token, expiresAt, remember: Boolean(remember) };
}

function sessionCookie(token, expiresAt, remember = false) {
  const maxAge = remember ? `; Max-Age=${Math.max(1, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000))}` : "";
  return `syncora_session=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Lax${maxAge}`;
}

function clearSessionCookie() {
  return "syncora_session=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0";
}

function getUserFromRequest(req) {
  const token = parseCookies(req).syncora_session;
  if (!token) return null;
  state.sessions = pruneSessions(state.sessions);
  const session = state.sessions.find((item) => item.tokenHash === hashToken(token));
  if (!session) return null;
  return state.users.find((user) => user.id === session.userId) || null;
}

function requireUser(req, res) {
  const user = getUserFromRequest(req);
  if (!user) {
    sendJson(res, 401, { error: "auth_required" });
    return null;
  }
  return user;
}

function requireAdmin(req, res) {
  const user = requireUser(req, res);
  if (!user) return null;
  if (user.role !== "admin") {
    sendJson(res, 403, { error: "admin_required", message: "Admin yetkisi gerekli." });
    return null;
  }
  return user;
}

function appendLog(actor, action, message, details = {}) {
  state.logs.push({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    actorId: actor?.id || null,
    actorName: actor?.name || "System",
    action,
    message,
    details
  });
  if (state.logs.length > 1500) state.logs = state.logs.slice(-1500);
}

async function writeErrorLog(category, error, details = {}) {
  const entry = {
    createdAt: new Date().toISOString(),
    category,
    code: error?.code || "",
    status: error?.status || "",
    message: error?.message || String(error || ""),
    stack: error?.stack || "",
    details
  };

  console.error(`[${category}]`, error);

  try {
    await fsp.mkdir(DATA_DIR, { recursive: true });
    await fsp.appendFile(ERROR_LOG_FILE, `${JSON.stringify(entry)}\n`, "utf8");
  } catch (logError) {
    console.error("Syncora error log yazilamadi:", logError?.message || logError);
  }
}

async function readJson(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      const error = new Error("Body too large");
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return {};
  const contentType = headerValue(req, "content-type").toLowerCase();
  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(raw).entries());
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    if (!raw.startsWith("{") && raw.includes("=")) {
      return Object.fromEntries(new URLSearchParams(raw).entries());
    }
    throw error;
  }
}

function sendJson(res, status, payload, headers = {}) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    ...headers
  });
  res.end(JSON.stringify(payload));
}

function redirect(res, location, headers = {}) {
  res.writeHead(302, { location, ...headers });
  res.end();
}

function configuredPanelOrigin() {
  const configured = configuredSiteValue();
  if (configured) {
    try {
      const parsed = new URL(configured);
      parsed.pathname = "";
      parsed.search = "";
      parsed.hash = "";
      return parsed.toString().replace(/\/$/, "");
    } catch {
      return configured.replace(/\/$/, "");
    }
  }
  return SYNCORA_PUBLIC_ORIGIN;
}

function panelEntryUrl(screen, params = {}) {
  const origin = configuredPanelOrigin();
  const singleEntry = path.join(PUBLIC_DIR, "panel-tek-html.html");
  if (fs.existsSync(singleEntry)) {
    const search = new URLSearchParams({ screen });
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") search.set(key, value);
    });
    return `${origin}/?${search.toString()}`;
  }

  const fallback = {
    app: "/app.html",
    discord: "/discord.html",
    login: "/index.html"
  }[screen] || "/index.html";
  const search = new URLSearchParams(params);
  const suffix = search.toString();
  return `${origin}${fallback}${suffix ? `?${suffix}` : ""}`;
}

function sendError(res, status, error, message) {
  sendJson(res, status, { error, message });
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function normalizeEmailFromBody(body) {
  return normalizeEmail(body?.email || body?.gmail);
}

function canonicalEmailKey(email) {
  const normalized = normalizeEmail(email);
  const atIndex = normalized.lastIndexOf("@");
  if (atIndex <= 0) return normalized;

  let local = normalized.slice(0, atIndex);
  let domain = normalized.slice(atIndex + 1);
  if (domain === "googlemail.com") domain = "gmail.com";

  if (domain === "gmail.com") {
    local = local.split("+")[0].replace(/\./g, "");
  }

  return `${local}@${domain}`;
}

function findUserByEmail(email) {
  const normalized = normalizeEmail(email);
  const exact = state.users.find((user) => normalizeEmail(user.email) === normalized);
  if (exact) return exact;

  const canonical = canonicalEmailKey(normalized);
  return state.users.find((user) => canonicalEmailKey(user.email) === canonical) || null;
}

function isEmailUsedByAnotherUser(email, currentUserId = "") {
  const canonical = canonicalEmailKey(email);
  return state.users.some((user) => user.id !== currentUserId && canonicalEmailKey(user.email) === canonical);
}

function unlinkDiscordFromOtherUsers(discordId, currentUserId) {
  const normalizedDiscordId = safeText(discordId);
  if (!normalizedDiscordId) return;

  for (const otherUser of state.users) {
    if (otherUser.id === currentUserId || otherUser.discord?.id !== normalizedDiscordId) continue;
    otherUser.discord = null;
    otherUser.updatedAt = new Date().toISOString();
  }
}

function safeText(value, fallback = "") {
  return String(value || fallback).trim();
}

function configuredSiteValue() {
  return safeText(
    process.env.PUBLIC_SITE_URL ||
      process.env.APP_URL ||
      process.env.SITE_URL ||
      process.env.BASE_URL ||
      process.env.URL ||
      process.env.DEPLOY_PRIME_URL
  );
}

function booleanFromBody(value) {
  return value === true || value === "true" || value === "on" || value === "1";
}

function createResetToken(user) {
  const token = crypto.randomBytes(RESET_LINK_TOKEN_BYTES).toString("hex");
  const expiresAt = new Date(Date.now() + RESET_TOKEN_MINUTES * 60 * 1000).toISOString();
  state.passwordResetTokens = prunePasswordResetTokens(state.passwordResetTokens).filter((item) => item.userId !== user.id);
  state.passwordResetTokens.push({
    email: normalizeEmail(user.email),
    codeHash: hashResetCode(token),
    userId: user.id,
    expiresAt,
    createdAt: new Date().toISOString()
  });
  return { token, expiresAt };
}

function createResetCode(user) {
  const min = 10 ** (RESET_CODE_DIGITS - 1);
  const max = 10 ** RESET_CODE_DIGITS;
  const code = String(crypto.randomInt(min, max));
  const expiresAt = new Date(Date.now() + RESET_TOKEN_MINUTES * 60 * 1000).toISOString();
  const email = normalizeEmail(user.email);
  state.passwordResetTokens = prunePasswordResetTokens(state.passwordResetTokens).filter((item) => {
    return item.userId !== user.id && normalizeEmail(item.email) !== email;
  });
  state.passwordResetTokens.push({
    email,
    codeHash: hashResetCode(code),
    userId: user.id,
    expiresAt,
    createdAt: new Date().toISOString()
  });
  return { code, expiresAt };
}

function isDiscordConfigured() {
  return Boolean(process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET);
}

function headerValue(req, name) {
  const headers = req?.headers || {};
  const direct = headers[name] ?? headers[name.toLowerCase()] ?? headers[name.toUpperCase()];
  if (Array.isArray(direct)) return direct[0] || "";
  return String(direct || "");
}

function firstHeaderValue(req, name) {
  return headerValue(req, name).split(",")[0].trim();
}

function hostnameFromHost(host) {
  try {
    return new URL(`http://${host}`).hostname;
  } catch {
    return String(host || "").split(":")[0];
  }
}

function isLocalHostname(hostname) {
  const value = String(hostname || "").replace(/^\[|\]$/g, "").toLowerCase();
  return value === "localhost" || value === "127.0.0.1" || value === "::1" || value === "0.0.0.0";
}

function requestProtocol(req, url, host) {
  const forwardedProto = firstHeaderValue(req, "x-forwarded-proto").toLowerCase();
  if (forwardedProto === "http" || forwardedProto === "https") return forwardedProto;
  if (url?.protocol === "http:" || url?.protocol === "https:") return url.protocol.slice(0, -1);
  return isLocalHostname(hostnameFromHost(host)) ? "http" : "https";
}

function requestOrigin(req, url) {
  const host = firstHeaderValue(req, "x-forwarded-host") || headerValue(req, "host") || url?.host || `localhost:${PORT}`;
  return `${requestProtocol(req, url, host)}://${host}`;
}

function isDiscordCallbackPath(pathname) {
  return pathname === DISCORD_CALLBACK_PATH ||
    pathname === LEGACY_DISCORD_CALLBACK_PATH ||
    pathname === NETLIFY_DISCORD_CALLBACK_PATH;
}

function normalizeDiscordRedirectUri(value) {
  const raw = safeText(value);
  if (!raw) return "";
  try {
    const parsed = new URL(raw);
    if (!parsed.pathname || parsed.pathname === "/") parsed.pathname = DISCORD_CALLBACK_PATH;
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return raw;
  }
}

function shouldIgnoreConfiguredRedirect(configured, origin) {
  try {
    const configuredUrl = new URL(configured);
    const originUrl = new URL(origin);
    return isLocalHostname(configuredUrl.hostname) && !isLocalHostname(originUrl.hostname);
  } catch {
    return false;
  }
}

function resolveDiscordRedirectUri(req, url) {
  const origin = requestOrigin(req, url);
  const configured = normalizeDiscordRedirectUri(process.env.DISCORD_REDIRECT_URI);
  if (configured && !shouldIgnoreConfiguredRedirect(configured, origin)) return configured;
  return `${configuredPublicOrigin(req, url)}${DISCORD_CALLBACK_PATH}`;
}

function classifyDiscordError(error) {
  const message = `${error?.message || ""} ${error?.cause?.message || ""} ${error?.cause?.code || ""}`.toLowerCase();
  if (
    message.includes("fetch failed") ||
    message.includes("econnreset") ||
    message.includes("etimedout") ||
    message.includes("enotfound") ||
    message.includes("cert") ||
    message.includes("btk.gov.tr")
  ) {
    return "discord_network";
  }
  if (message.includes("invalid_grant") || message.includes("redirect_uri")) return "discord_redirect";
  if (message.includes("unauthorized_client") || message.includes("invalid_client")) return "discord_credentials";
  return "discord_failed";
}


function configuredPublicOrigin(req, url) {
  const configured = configuredSiteValue();
  if (configured) {
    try {
      const parsed = new URL(configured);
      parsed.pathname = "";
      parsed.search = "";
      parsed.hash = "";
      return parsed.toString().replace(/\/$/, "");
    } catch {
      return configured.replace(/\/$/, "");
    }
  }
  return SYNCORA_PUBLIC_ORIGIN;
}

function resetPasswordUrl(req, url, email, code = "") {
  const publicOrigin = configuredPublicOrigin(req, url);
  const params = new URLSearchParams({ resetEmail: email });
  if (code) params.set("resetCode", code);
  return `${publicOrigin}/?${params.toString()}`;
}

function mailConfig() {
  const user = process.env.GMAIL_USER || process.env.MAIL_USERNAME || process.env.SMTP_USER || process.env.MAIL_USER;
  const pass =
    process.env.GMAIL_APP_PASSWORD ||
    process.env.GMAIL_PASS ||
    process.env.MAIL_PASSWORD ||
    process.env.SMTP_PASS ||
    process.env.MAIL_PASS;
  const host = process.env.MAIL_HOST || process.env.SMTP_HOST || (user || pass ? "smtp.gmail.com" : "");
  const port = Number(process.env.MAIL_PORT || process.env.SMTP_PORT || (host === "smtp.gmail.com" ? 465 : 587));
  const encryption = String(process.env.MAIL_ENCRYPTION || process.env.SMTP_ENCRYPTION || "").toLowerCase();
  const secure =
    encryption === "ssl" ||
    encryption === "smtps" ||
    String(process.env.SMTP_SECURE || (port === 465 ? "true" : "false")).toLowerCase() === "true";
  return {
    enabled: Boolean(host && user && pass),
    host,
    port,
    secure,
    user,
    pass,
    from: process.env.MAIL_FROM || process.env.GMAIL_FROM || user,
    fromName: process.env.MAIL_FROM_NAME || process.env.SMTP_FROM_NAME || "Syncora"
  };
}

function maskSecret(value) {
  const text = String(value || "");
  if (!text) return "";
  const at = text.indexOf("@");
  if (at > 1) return `${text.slice(0, 2)}***${text.slice(at)}`;
  if (text.length <= 6) return "***";
  return `${text.slice(0, 3)}***${text.slice(-2)}`;
}

function mailPublicStatus() {
  const config = mailConfig();
  return {
    enabled: config.enabled,
    host: config.host,
    port: config.port,
    secure: config.secure,
    user: maskSecret(config.user),
    from: maskSecret(config.from)
  };
}

async function sendPasswordResetEmail(user, resetLink, resetCode) {
  const config = mailConfig();
  if (!config.enabled) {
    const error = new Error("Gmail/SMTP ayarlari eksik. GMAIL_USER ve GMAIL_APP_PASSWORD eklenmeli.");
    error.status = 500;
    error.code = "mail_not_configured";
    throw error;
  }

  let nodemailer;
  try {
    nodemailer = require("nodemailer");
  } catch {
    const error = new Error("Mail paketi eksik. Proje klasorunde `npm install` calistir.");
    error.status = 500;
    error.code = "nodemailer_missing";
    throw error;
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass
    }
  });

  const brand = state?.settings?.brandName || "Syncora";
  let publicOrigin = configuredSiteValue() || SYNCORA_PUBLIC_ORIGIN;
  try {
    publicOrigin = new URL(resetLink).origin;
  } catch {}
  publicOrigin = String(publicOrigin || SYNCORA_PUBLIC_ORIGIN).replace(/\/$/, "");

  const logoUrl = `${publicOrigin}/syncora-pp.png`;
  const bannerUrl = `${publicOrigin}/syncora-email-banner.gif`;
  const supportUrl = publicOrigin;

  const text = [
    `Merhaba ${user.name},`,
    "",
    `${brand} hesabiniz icin bir sifre sifirlama istegi aldik.`,
    `Sifre sifirlama kodunuz: ${resetCode}`,
    `Yeni sifrenizi belirlemek icin paneli acin: ${resetLink}`,
    "",
    `Bu kod ${RESET_TOKEN_MINUTES} dakika gecerlidir. Bu islemi siz yapmadiysaniz bu e-postayi dikkate almayabilirsiniz.`,
    `${brand}: ${supportUrl}`
  ].join("\n");

  const html = `
    <div style="margin:0;padding:24px 12px;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:22px;overflow:hidden;box-shadow:0 10px 40px rgba(15,23,42,0.12);">
        <tr>
          <td style="padding:0;background:#020817;">
            <img src="${escapeHtml(bannerUrl)}" alt="${escapeHtml(brand)}" style="display:block;width:100%;height:auto;border:0;" />
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px 10px 32px; text-align:center;">
            <img src="${escapeHtml(logoUrl)}" alt="${escapeHtml(brand)} logo" width="84" height="84" style="display:inline-block;width:84px;height:84px;border-radius:20px;object-fit:cover;border:1px solid #dbeafe;box-shadow:0 6px 18px rgba(37,99,235,0.18);" />
            <div style="margin-top:14px;font-size:13px;letter-spacing:0.16em;text-transform:uppercase;color:#64748b;">${escapeHtml(brand)} Guvenlik</div>
            <h1 style="margin:10px 0 0 0;font-size:28px;line-height:1.2;color:#0f172a;">Sifre Sifirlama Talebi</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:6px 32px 0 32px;">
            <p style="margin:0 0 14px 0;font-size:16px;line-height:1.7;color:#334155;">Merhaba <strong>${escapeHtml(user.name)}</strong>,</p>
            <p style="margin:0 0 14px 0;font-size:15px;line-height:1.7;color:#334155;">${escapeHtml(brand)} hesabiniz icin bir sifre sifirlama istegi aldik. Asagidaki sifirlama kodunu panele girip yeni sifrenizi belirleyin.</p>
            <div style="margin:20px 0 18px 0;text-align:center;">
              <div style="display:inline-block;padding:16px 26px;border-radius:18px;background:#0f172a;color:#ffffff;font-size:30px;font-weight:800;letter-spacing:0.28em;box-shadow:0 10px 24px rgba(15,23,42,0.18);">${escapeHtml(resetCode)}</div>
              <div style="margin-top:10px;font-size:13px;color:#64748b;">Sifre sifirlama kodunuz</div>
            </div>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:24px 0 18px 0;">
              <tr>
                <td align="center">
                  <a href="${escapeHtml(resetLink)}" style="display:inline-block;background:linear-gradient(135deg,#1d4ed8,#38bdf8);color:#ffffff;text-decoration:none;padding:15px 28px;border-radius:14px;font-size:16px;font-weight:700;letter-spacing:0.01em;">Panelde Kodu Gir</a>
                </td>
              </tr>
            </table>
            <div style="margin:0 0 18px 0;padding:16px 18px;border-radius:14px;background:#eff6ff;border:1px solid #dbeafe;color:#1e3a8a;font-size:14px;line-height:1.6;">
              Bu kod <strong>${RESET_TOKEN_MINUTES} dakika</strong> boyunca gecerlidir. Eger bu istegi siz yapmadiysaniz e-postayi dikkate almayabilirsiniz.
            </div>
            <p style="margin:0 0 8px 0;font-size:13px;color:#475569;">Buton calismazsa asagidaki linki kopyalayip tarayiciniza yapistirin, sonra yukaridaki kodu girin:</p>
            <p style="margin:0 0 24px 0;word-break:break-all;font-size:13px;line-height:1.7;"><a href="${escapeHtml(resetLink)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(resetLink)}</a></p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 26px 32px;">
            <div style="border-top:1px solid #e2e8f0;padding-top:18px;text-align:center;">
              <p style="margin:0 0 8px 0;font-size:13px;color:#64748b;">Bu e-posta ${escapeHtml(brand)} hesabinizin guvenligi icin otomatik olarak gonderilmistir.</p>
              <p style="margin:0;font-size:12px;color:#94a3b8;">${escapeHtml(brand)} • <a href="${escapeHtml(supportUrl)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(supportUrl)}</a></p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  `;

  try {
    await transporter.verify();
    await transporter.sendMail({
      from: config.fromName ? `"${config.fromName.replace(/"/g, "'")}" <${config.from}>` : config.from,
      to: user.email,
      subject: `${brand} - Sifre Sifirlama Talebi`,
      text,
      html
    });
  } catch (error) {
    const wrapped = new Error(`Gmail/SMTP gonderimi basarisiz: ${error.message || "bilinmeyen hata"}`);
    wrapped.status = 500;
    wrapped.code = "mail_send_failed";
    throw wrapped;
  }
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function buildHealthReport() {
  const authStorage = effectiveAuthStorage();
  const report = {
    ok: true,
    generatedAt: new Date().toISOString(),
    runtime: isNetlifyRuntime() ? "netlify" : "node",
    authStorage,
    selectedAuthStorage: selectedAuthStorage() || "auto",
    blobs: {
      enabled: authStorage === "netlify-blobs",
      ready: authStorage === "netlify-blobs" ? !blobStorageUnavailable : false,
      stateStore: "syncora-panel-state",
      authKey: AUTH_BLOB_KEY,
      stateKey: "state",
      strongReads: true
    },
    mysql: {
      enabled: usesMysqlAuth(),
      ready: !usesMysqlAuth() || (mysqlAuthReady && !authStorageError),
      legacyOnly: true,
      ignoredUnless: "SYNCORA_AUTH_STORAGE=mysql",
      ...mysqlPublicConfig()
    },
    mail: mailPublicStatus(),
    discord: {
      enabled: isDiscordConfigured(),
      clientIdConfigured: Boolean(process.env.DISCORD_CLIENT_ID),
      clientSecretConfigured: Boolean(process.env.DISCORD_CLIENT_SECRET),
      redirectUri: isDiscordConfigured() ? resolveDiscordRedirectUri(null, null) : (process.env.DISCORD_REDIRECT_URI || "auto")
    }
  };

  if (authStorageError) {
    report.ok = false;
    report.mysql.ready = false;
    report.mysql.error = authStorageError.code || "mysql_unavailable";
    report.mysql.message = authStorageError.message;
  }

  if (usesMysqlAuth() && mysqlAuthReady && !authStorageError) {
    try {
      const pool = await getMysqlPool();
      const [[row]] = await pool.query(`SELECT COUNT(*) AS total FROM \`${MYSQL_MEMBERS_TABLE}\``);
      report.mysql.userCount = Number(row.total || 0);
    } catch (error) {
      report.ok = false;
      report.mysql.ready = false;
      report.mysql.error = error.code || "mysql_query_failed";
      report.mysql.message = error.message;
    }
  }

  return report;
}

async function handleApi(req, res, pathname, url) {
  try {
    if (req.method === "GET" && pathname.startsWith("/api/uploads/files/")) {
      const fileName = path.basename(decodeURIComponent(pathname.replace("/api/uploads/files/", "")));
      const image = await readStoredUpload(fileName);
      if (!image) {
        sendError(res, 404, "upload_not_found", "Upload not found.");
        return;
      }
      res.writeHead(200, {
        "content-type": contentType(fileName),
        "cache-control": "public, max-age=86400"
      });
      res.end(image);
      return;
    }

    if (req.method === "GET" && pathname === "/api/health") {
      const report = await buildHealthReport();
      sendJson(res, report.ok ? 200 : 503, report);
      return;
    }

    if (usesMysqlAuth() && authStorageError && !isPublicApiRoute(pathname)) {
      sendJson(res, 503, authStorageUnavailablePayload());
      return;
    }

    if (req.method === "GET" && pathname === "/api/public-config") {
      sendJson(res, 200, {
        brandName: state.settings.brandName,
        language: state.settings.language,
        backgroundUrl: state.settings.backgroundUrl,
        logoUrl: state.settings.logoUrl,
        inviteRequired: false,
        discordEnabled: isDiscordConfigured(),
        discordRedirectUri: isDiscordConfigured() ? resolveDiscordRedirectUri(req, url) : "",
        siteUrl: configuredPublicOrigin(req, url),
        apiBaseUrl: process.env.API_BASE_URL || "/api"
      });
      return;
    }

    if (req.method === "GET" && (pathname === "/api/bootstrap" || pathname === "/api/me")) {
      const user = requireUser(req, res);
      if (!user) return;
      const payload = {
        user: publicUser(user),
        settings: state.settings,
        discordEnabled: isDiscordConfigured()
      };
      sendJson(res, 200, pathname === "/api/me" ? { ...payload, me: payload.user } : payload);
      return;
    }

    if (req.method === "POST" && pathname === "/api/auth/register") {
      const body = await readJson(req);
      const email = normalizeEmailFromBody(body);
      const password = String(body.password || "");
      const name = safeText(body.name, email.split("@")[0]);
      const remember = booleanFromBody(body.remember);

      if (!name || !email.includes("@") || password.length < 6) {
        sendError(res, 400, "invalid_register", "Panel adi, gecerli Gmail ve 6+ karakter sifre gerekli.");
        return;
      }
      if (isEmailUsedByAnotherUser(email)) {
        sendError(res, 409, "email_exists", "Bu Gmail zaten kayitli.");
        return;
      }

      const role = state.users.length === 0 ? "admin" : "member";
      const nowIso = new Date().toISOString();
      const user = {
        id: crypto.randomUUID(),
        name,
        email,
        role,
        passwordHash: hashPassword(password),
        discord: null,
        createdAt: nowIso,
        updatedAt: nowIso
      };
      state.users.push(user);
      const session = createSession(user.id, remember);
      appendLog(user, "auth.register", `${name} registered.`, { role });
      await saveState({ backup: true });
      sendJson(res, 201, { user: publicUser(user) }, { "set-cookie": sessionCookie(session.token, session.expiresAt, session.remember) });
      return;
    }

    if (req.method === "POST" && pathname === "/api/auth/login") {
      const body = await readJson(req);
      const email = normalizeEmailFromBody(body);
      const remember = booleanFromBody(body.remember);
      const user = findUserByEmail(email);
      if (!user || !verifyPassword(String(body.password || ""), user.passwordHash)) {
        sendError(res, 401, "invalid_login", "Gmail veya sifre hatali.");
        return;
      }
      if (needsPasswordRehash(user.passwordHash)) {
        user.passwordHash = hashPassword(String(body.password || ""));
        user.updatedAt = new Date().toISOString();
      }
      const session = createSession(user.id, remember);
      appendLog(user, "auth.login", `${user.name} logged in.`);
      await saveState({ backup: false });
      sendJson(res, 200, { user: publicUser(user) }, { "set-cookie": sessionCookie(session.token, session.expiresAt, session.remember) });
      return;
    }

    if (req.method === "POST" && pathname === "/api/auth/logout") {
      const token = parseCookies(req).syncora_session;
      const user = getUserFromRequest(req);
      if (token) {
        const tokenHash = hashToken(token);
        state.sessions = state.sessions.filter((session) => session.tokenHash !== tokenHash);
        await deleteMysqlSessionByTokenHash(tokenHash).catch(() => {});
      }
      if (user) appendLog(user, "auth.logout", `${user.name} logged out.`);
      await saveState({ backup: false });
      sendJson(res, 200, { ok: true }, { "set-cookie": clearSessionCookie() });
      return;
    }

    if (req.method === "POST" && pathname === "/api/auth/password-reset/request") {
      const body = await readJson(req);
      const email = normalizeEmailFromBody(body);
      const user = findUserByEmail(email);
      if (!user) {
        sendError(res, 404, "email_not_found", "Bu Gmail ile kayitli hesap bulunamadi. Once kayit olman gerekiyor.");
        return;
      }
      const reset = createResetCode(user);
      const resetLink = resetPasswordUrl(req, url, user.email);
      await deleteMysqlPasswordResetTokensByUserId(user.id).catch(() => {});
      await saveState({ backup: false });
      try {
        await sendPasswordResetEmail(user, resetLink, reset.code);
      } catch (error) {
        state.passwordResetTokens = state.passwordResetTokens.filter((item) => item.userId !== user.id);
        await deleteMysqlPasswordResetTokensByUserId(user.id).catch(() => {});
        await saveState({ backup: false }).catch(() => {});
        throw error;
      }
      appendLog(user, "auth.password_reset_request", `${user.name} requested a password reset code email.`);
      await saveState({ backup: false });
      sendJson(res, 200, {
        ok: true,
        expiresAt: reset.expiresAt,
        message: "Sifre sifirlama kodu Gmail adresine gonderildi."
      });
      return;
    }

    if (req.method === "POST" && pathname === "/api/auth/password-reset/confirm") {
      const body = await readJson(req);
      const email = normalizeEmailFromBody(body);
      const code = safeText(body.resetCode);
      const password = String(body.password || "");
      const passwordConfirm = String(body.passwordConfirm || body.confirmPassword || "");
      const user = findUserByEmail(email);
      if (!user || !code || password.length < 6 || !passwordConfirm) {
        sendError(res, 400, "invalid_password_reset", "Gmail, kod ve en az 6 karakterli yeni sifre gerekli.");
        return;
      }
      if (password !== passwordConfirm) {
        sendError(res, 400, "password_mismatch", "Yeni sifre kutulari ayni olmali.");
        return;
      }
      state.passwordResetTokens = prunePasswordResetTokens(state.passwordResetTokens);
      const token = state.passwordResetTokens.find((item) => item.userId === user.id && verifyResetCode(code, item));
      if (!token) {
        sendError(res, 403, "invalid_reset_code", "Sifirlama kodu gecersiz veya suresi doldu.");
        return;
      }
      user.passwordHash = hashPassword(password);
      user.updatedAt = new Date().toISOString();
      state.passwordResetTokens = state.passwordResetTokens.filter((item) => item.userId !== user.id);
      state.sessions = state.sessions.filter((session) => session.userId !== user.id);
      await deleteMysqlPasswordResetTokensByUserId(user.id).catch(() => {});
      await deleteMysqlSessionsByUserId(user.id).catch(() => {});
      appendLog(user, "auth.password_reset_confirm", `${user.name} reset password.`);
      await saveState({ backup: true });
      sendJson(res, 200, { ok: true }, { "set-cookie": clearSessionCookie() });
      return;
    }

    if (req.method === "PATCH" && pathname === "/api/account") {
      const user = requireUser(req, res);
      if (!user) return;
      const body = await readJson(req);
      const nextName = safeText(body.name, user.name);
      const nextEmail = normalizeEmail(body.email || body.gmail || user.email);
      const currentPassword = String(body.currentPassword || "");
      const newPassword = String(body.newPassword || "");

      if (!nextName || !nextEmail.includes("@")) {
        sendError(res, 400, "invalid_account", "Gecerli panel adi ve Gmail gerekli.");
        return;
      }
      if (isEmailUsedByAnotherUser(nextEmail, user.id)) {
        sendError(res, 409, "email_exists", "Bu Gmail baska bir hesapta kullaniliyor.");
        return;
      }
      if (newPassword) {
        if (newPassword.length < 6) {
          sendError(res, 400, "weak_password", "Yeni sifre en az 6 karakter olmali.");
          return;
        }
        if (user.passwordHash && !verifyPassword(currentPassword, user.passwordHash)) {
          sendError(res, 403, "invalid_current_password", "Mevcut sifre hatali.");
          return;
        }
        user.passwordHash = hashPassword(newPassword);
      }

      user.name = nextName;
      user.email = nextEmail;
      user.updatedAt = new Date().toISOString();
      appendLog(user, "account.update", `${user.name} updated account settings.`);
      await saveState({ backup: true });
      sendJson(res, 200, { user: publicUser(user) });
      return;
    }

    if (req.method === "GET" && pathname === "/api/auth/discord/start") {
      if (!isDiscordConfigured()) {
        redirect(res, panelEntryUrl("login", { error: "discord_config" }));
        return;
      }
      const mode = url.searchParams.get("mode") === "connect" ? "connect" : "login";
      const currentUser = getUserFromRequest(req);
      if (mode === "connect" && !currentUser) {
        redirect(res, panelEntryUrl("login", { error: "discord_login_required" }));
        return;
      }

      const oauthState = crypto.randomBytes(24).toString("hex");
      const redirectUri = resolveDiscordRedirectUri(req, url);
      state.oauthStates = pruneOauthStates(state.oauthStates);
      state.oauthStates.push({
        token: oauthState,
        mode,
        userId: currentUser?.id || null,
        redirectUri,
        createdAt: new Date().toISOString()
      });
      await saveState({ backup: false });

      const params = new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "identify email",
        state: oauthState
      });
      redirect(res, `https://discord.com/api/oauth2/authorize?${params.toString()}`);
      return;
    }

    if (req.method === "GET" && isDiscordCallbackPath(pathname)) {
      await handleDiscordCallback(req, res, url);
      return;
    }

    if (req.method === "GET" && pathname === "/api/status") {
      const user = requireUser(req, res);
      if (!user) return;
      const status = await buildStatus();
      sendJson(res, 200, status);
      return;
    }

    if (req.method === "GET" && pathname === "/api/metrics") {
      const user = requireUser(req, res);
      if (!user) return;
      sendJson(res, 200, buildMetrics(url.searchParams.get("range") || "hour"));
      return;
    }

    if (req.method === "GET" && pathname === "/api/personnel") {
      const user = requireUser(req, res);
      if (!user) return;
      sendJson(res, 200, { personnel: state.personnel });
      return;
    }

    if (req.method === "POST" && pathname === "/api/personnel") {
      const user = requireUser(req, res);
      if (!user) return;
      const body = await readJson(req);
      const item = {
        id: crypto.randomUUID(),
        name: safeText(body.name),
        department: safeText(body.department, "staff"),
        rank: safeText(body.rank, "Yetkili"),
        discordId: safeText(body.discordId),
        fivemIdentifier: safeText(body.fivemIdentifier),
        createdAt: new Date().toISOString(),
        createdBy: user.id,
        lastSeenAt: null,
        lastActiveServer: null
      };
      if (!item.name) {
        sendError(res, 400, "invalid_personnel", "Personel adi gerekli.");
        return;
      }
      state.personnel.push(item);
      appendLog(user, "personnel.create", `${item.name} added to personnel.`, item);
      await saveState({ backup: true });
      sendJson(res, 201, { personnel: item });
      return;
    }

    if (req.method === "PATCH" && pathname.startsWith("/api/personnel/")) {
      const user = requireUser(req, res);
      if (!user) return;
      const id = pathname.split("/").pop();
      const item = state.personnel.find((person) => person.id === id);
      if (!item) {
        sendError(res, 404, "not_found", "Personel bulunamadi.");
        return;
      }
      const body = await readJson(req);
      for (const field of ["name", "department", "rank", "discordId", "fivemIdentifier"]) {
        if (Object.prototype.hasOwnProperty.call(body, field)) item[field] = safeText(body[field]);
      }
      appendLog(user, "personnel.update", `${item.name} updated.`, { id: item.id });
      await saveState({ backup: true });
      sendJson(res, 200, { personnel: item });
      return;
    }

    if (req.method === "DELETE" && pathname.startsWith("/api/personnel/")) {
      const user = requireUser(req, res);
      if (!user) return;
      const id = pathname.split("/").pop();
      const index = state.personnel.findIndex((person) => person.id === id);
      if (index === -1) {
        sendError(res, 404, "not_found", "Personel bulunamadi.");
        return;
      }
      const [removed] = state.personnel.splice(index, 1);
      appendLog(user, "personnel.delete", `${removed.name} removed from personnel.`, { id });
      await saveState({ backup: true });
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "GET" && pathname === "/api/workspace") {
      const user = requireUser(req, res);
      if (!user) return;
      sendJson(res, 200, {
        tasks: state.tasks || [],
        notes: state.notes || { general: "", operations: "" }
      });
      return;
    }

    if (req.method === "POST" && pathname === "/api/tasks") {
      const user = requireUser(req, res);
      if (!user) return;
      const body = await readJson(req);
      const task = {
        id: crypto.randomUUID(),
        title: safeText(body.title),
        owner: safeText(body.owner, user.name),
        priority: ["low", "normal", "high"].includes(body.priority) ? body.priority : "normal",
        status: ["open", "done"].includes(body.status) ? body.status : "open",
        createdAt: new Date().toISOString(),
        createdBy: user.id
      };
      if (!task.title) {
        sendError(res, 400, "invalid_task", "Gorev basligi gerekli.");
        return;
      }
      state.tasks.unshift(task);
      appendLog(user, "task.create", `${task.title} task added.`, { id: task.id });
      await saveState({ backup: true });
      sendJson(res, 201, { task });
      return;
    }

    if (req.method === "PATCH" && pathname.startsWith("/api/tasks/")) {
      const user = requireUser(req, res);
      if (!user) return;
      const id = pathname.split("/").pop();
      const task = state.tasks.find((item) => item.id === id);
      if (!task) {
        sendError(res, 404, "not_found", "Gorev bulunamadi.");
        return;
      }
      const body = await readJson(req);
      if (Object.prototype.hasOwnProperty.call(body, "title")) task.title = safeText(body.title, task.title);
      if (Object.prototype.hasOwnProperty.call(body, "owner")) task.owner = safeText(body.owner, task.owner);
      if (["low", "normal", "high"].includes(body.priority)) task.priority = body.priority;
      if (["open", "done"].includes(body.status)) task.status = body.status;
      task.updatedAt = new Date().toISOString();
      appendLog(user, "task.update", `${task.title} task updated.`, { id: task.id, status: task.status });
      await saveState({ backup: true });
      sendJson(res, 200, { task });
      return;
    }

    if (req.method === "DELETE" && pathname.startsWith("/api/tasks/")) {
      const user = requireUser(req, res);
      if (!user) return;
      const id = pathname.split("/").pop();
      const index = state.tasks.findIndex((item) => item.id === id);
      if (index === -1) {
        sendError(res, 404, "not_found", "Gorev bulunamadi.");
        return;
      }
      const [removed] = state.tasks.splice(index, 1);
      appendLog(user, "task.delete", `${removed.title} task removed.`, { id });
      await saveState({ backup: true });
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "PATCH" && pathname === "/api/notes") {
      const user = requireUser(req, res);
      if (!user) return;
      const body = await readJson(req);
      state.notes = {
        ...(state.notes || { general: "", operations: "" }),
        general: Object.prototype.hasOwnProperty.call(body, "general") ? String(body.general || "") : state.notes?.general || "",
        operations: Object.prototype.hasOwnProperty.call(body, "operations") ? String(body.operations || "") : state.notes?.operations || ""
      };
      appendLog(user, "notes.update", "Shared notes updated.");
      await saveState({ backup: true });
      sendJson(res, 200, { notes: state.notes });
      return;
    }

    if (req.method === "POST" && pathname === "/api/server-test") {
      const user = requireUser(req, res);
      if (!user) return;
      const body = await readJson(req);
      const server = {
        id: safeText(body.id, "test"),
        name: safeText(body.name, "FiveM Server"),
        address: safeText(body.address),
        enabled: true
      };
      const result = await fetchFiveMServer(server);
      appendLog(user, "server.test", `${server.name} connection tested.`, { online: result.online, address: server.address });
      await saveState({ backup: false });
      sendJson(res, 200, { server: result });
      return;
    }

    if (req.method === "GET" && pathname === "/api/logs") {
      const user = requireUser(req, res);
      if (!user) return;
      sendJson(res, 200, { logs: state.logs.slice(-300).reverse() });
      return;
    }

    if (req.method === "GET" && pathname === "/api/admin/auth-export") {
      const user = requireAdmin(req, res);
      if (!user) return;
      const snapshot = sanitizeAuthSnapshot(state);
      sendJson(res, 200, {
        ok: true,
        storage: effectiveAuthStorage(),
        users: snapshot.users.map((item) => publicUser(item)),
        userCount: snapshot.users.length,
        sessionCount: snapshot.sessions.length,
        passwordResetTokenCount: snapshot.passwordResetTokens.length,
        oauthStateCount: snapshot.oauthStates.length,
        blobStore: "syncora-panel-state",
        blobAuthKey: AUTH_BLOB_KEY,
        blobStateKey: "state"
      });
      return;
    }

    if (req.method === "PATCH" && pathname === "/api/settings") {
      const user = requireAdmin(req, res);
      if (!user) return;
      const body = await readJson(req);
      state.settings = normalizeSettings({ ...state.settings, ...body });
      appendLog(user, "settings.update", "Panel settings updated.", {
        language: state.settings.language,
        serverCount: state.settings.servers.length
      });
      await saveState({ backup: true });
      sendJson(res, 200, { settings: state.settings });
      return;
    }

    if (req.method === "POST" && pathname === "/api/uploads/background") {
      const user = requireAdmin(req, res);
      if (!user) return;
      const body = await readJson(req);
      const publicUrl = await saveDataUrlImage(body.dataUrl, "background");
      state.settings.backgroundUrl = publicUrl;
      appendLog(user, "settings.background", "Panel background updated.", { publicUrl });
      await saveState({ backup: true });
      sendJson(res, 201, { url: publicUrl });
      return;
    }

    if (req.method === "POST" && pathname === "/api/uploads/logo") {
      const user = requireAdmin(req, res);
      if (!user) return;
      const body = await readJson(req);
      const publicUrl = await saveDataUrlImage(body.dataUrl, "logo");
      state.settings.logoUrl = publicUrl;
      appendLog(user, "settings.logo", "Panel logo updated.", { publicUrl });
      await saveState({ backup: true });
      sendJson(res, 201, { url: publicUrl });
      return;
    }

    sendError(res, 404, "not_found", "API route not found.");
  } catch (error) {
    const status = error.status || 500;
    const errorCode = error.code || "server_error";
    sendError(res, status, errorCode, status === 500 ? error.message || "Unexpected server error." : error.message);
    if (status >= 500) await writeErrorLog("api.request", error, { method: req.method, pathname });
  }
}

async function handleDiscordCallback(req, res, url) {
  if (!isDiscordConfigured()) {
    redirect(res, panelEntryUrl("login", { error: "discord_config" }));
    return;
  }

  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  const oauthIndex = state.oauthStates.findIndex((item) => item.token === returnedState);
  const oauthState = oauthIndex >= 0 ? state.oauthStates[oauthIndex] : null;
  const callbackUser = getUserFromRequest(req);
  if (!code || !oauthState) {
    redirect(res, callbackUser ? panelEntryUrl("app", { discord: "state_error" }) : panelEntryUrl("login", { error: "discord_state" }));
    return;
  }
  state.oauthStates.splice(oauthIndex, 1);

  try {
    const redirectUri = normalizeDiscordRedirectUri(oauthState.redirectUri) || resolveDiscordRedirectUri(req, url);
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri
      })
    });

    if (!tokenResponse.ok) {
      const text = await tokenResponse.text().catch(() => "");
      throw new Error(`Discord token failed: ${tokenResponse.status} ${text.slice(0, 160)}`);
    }

    const token = await tokenResponse.json();
    const profileResponse = await fetch("https://discord.com/api/users/@me", {
      headers: { authorization: `${token.token_type} ${token.access_token}` }
    });
    if (!profileResponse.ok) throw new Error(`Discord profile failed: ${profileResponse.status}`);
    const profile = await profileResponse.json();

    let user = null;
    if (oauthState.mode === "connect" && oauthState.userId) {
      user = state.users.find((item) => item.id === oauthState.userId) || null;
    }
    if (!user && oauthState.mode === "connect" && callbackUser) user = callbackUser;
    if (!user) user = state.users.find((item) => item.discord?.id === profile.id) || null;
    if (!user && profile.email) {
      const profileEmail = normalizeEmail(profile.email);
      user = findUserByEmail(profileEmail);
    }

    if (!user) {
      user = {
        id: crypto.randomUUID(),
        name: profile.global_name || profile.username || "Discord User",
        email: normalizeEmail(profile.email || `${profile.id}@discord.local`),
        role: state.users.length === 0 ? "admin" : "member",
        passwordHash: "",
        discord: null,
        createdAt: new Date().toISOString()
      };
      state.users.push(user);
    }

    unlinkDiscordFromOtherUsers(profile.id, user.id);
    user.discord = {
      id: profile.id,
      username: profile.username,
      globalName: profile.global_name || "",
      avatar: profile.avatar || "",
      email: profile.email || "",
      connectedAt: new Date().toISOString()
    };
    user.name = user.name || profile.global_name || profile.username;
    user.updatedAt = new Date().toISOString();

    const session = createSession(user.id, true);
    appendLog(user, "auth.discord", `${user.name} connected Discord.`, { discordId: profile.id });
    await saveState({ backup: true });
    redirect(res, panelEntryUrl("app", { discord: "connected" }), {
      "set-cookie": sessionCookie(session.token, session.expiresAt, session.remember)
    });
  } catch (error) {
    const user = oauthState?.userId ? state.users.find((item) => item.id === oauthState.userId) : callbackUser;
    const errorCode = classifyDiscordError(error);
    await writeErrorLog("discord.callback", error, { errorCode, hasUser: Boolean(user) });
    if (user) {
      appendLog(user, "auth.discord_failed", "Discord connection failed.", {
        errorCode,
        message: error.message,
        cause: error.cause?.message || ""
      });
    }
    await saveState({ backup: false });
    const target = oauthState?.mode === "connect"
      ? panelEntryUrl("discord", { mode: "connect", error: errorCode })
      : panelEntryUrl("login", { error: errorCode });
    redirect(res, target);
  }
}

function normalizeSettings(settings) {
  const language = ["tr", "en", "ru", "rs"].includes(settings.language) ? settings.language : "tr";
  const departments = Array.isArray(settings.departments)
    ? settings.departments
        .map((department) => ({
          id: slugify(department.id || department.name?.tr || department.name || "department"),
          name: normalizeDepartmentName(department.name),
          color: /^#[0-9a-f]{6}$/i.test(department.color || "") ? department.color : "#c084fc"
        }))
        .filter((department) => department.id)
    : DEFAULT_DEPARTMENTS;

  const servers = Array.isArray(settings.servers)
    ? settings.servers
        .map((server) => ({
          id: slugify(server.id || server.name || crypto.randomUUID()),
          name: safeText(server.name, "FiveM Server"),
          address: safeText(server.address),
          enabled: server.enabled !== false
        }))
        .filter((server) => server.id)
    : [];

  return {
    ...settings,
    brandName: safeText(settings.brandName, "Syncora Roleplay"),
    language: language === "rs" ? "ru" : language,
    backgroundUrl: publicMediaUrl(settings.backgroundUrl),
    logoUrl: publicMediaUrl(settings.logoUrl, "/syncora-pp.png"),
    servers: servers.length ? servers : defaultState().settings.servers,
    departments: departments.length ? departments : DEFAULT_DEPARTMENTS
  };
}

function publicMediaUrl(value, fallback = "") {
  const text = safeText(value);
  if (!text) return fallback;
  if (/^https?:\/\//i.test(text)) return text;
  if (/^\/(?!\/)/.test(text)) return text;
  if (/^data:image\/(png|jpe?g|webp|gif|svg\+xml);/i.test(text)) return text;
  return fallback;
}

function normalizeDepartmentName(name) {
  if (typeof name === "object" && name) {
    return {
      tr: safeText(name.tr || name.en || name.ru, "Departman"),
      en: safeText(name.en || name.tr || name.ru, "Department"),
      ru: safeText(name.ru || name.tr || name.en, "Otdel")
    };
  }
  const text = safeText(name, "Departman");
  return { tr: text, en: text, ru: text };
}

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

async function saveDataUrlImage(dataUrl, kind) {
  const match = String(dataUrl || "").match(/^data:image\/(png|jpeg|jpg|webp|gif);base64,([a-z0-9+/=]+)$/i);
  if (!match) {
    const error = new Error("Only png, jpg, webp or gif images are supported.");
    error.status = 400;
    throw error;
  }
  const extension = match[1].toLowerCase() === "jpeg" ? "jpg" : match[1].toLowerCase();
  const buffer = Buffer.from(match[2], "base64");
  if (buffer.length > 6 * 1024 * 1024) {
    const error = new Error("Image must be smaller than 6 MB.");
    error.status = 413;
    throw error;
  }
  const fileName = `${kind}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}.${extension}`;
  if (usesNetlifyBlobs()) {
    const stores = await getBlobStores();
    await stores.uploads.set(fileName, buffer, { metadata: { contentType: contentType(fileName) } });
    return `/api/uploads/files/${fileName}`;
  }

  await fsp.writeFile(path.join(UPLOAD_DIR, fileName), buffer);
  return `/api/uploads/files/${fileName}`;
}

async function readStoredUpload(fileName) {
  if (!/^[a-z0-9-]+\.(png|jpg|jpeg|webp|gif)$/i.test(fileName)) return null;
  if (usesNetlifyBlobs()) {
    const stores = await getBlobStores();
    const data = await stores.uploads.get(fileName, { consistency: "strong", type: "arrayBuffer" });
    return data ? Buffer.from(data) : null;
  }

  const filePath = path.join(UPLOAD_DIR, fileName);
  const relativePath = path.relative(UPLOAD_DIR, filePath);
  if (relativePath.startsWith("..") || path.isAbsolute(relativePath) || !fs.existsSync(filePath)) return null;
  return fsp.readFile(filePath);
}

async function buildStatus() {
  const servers = state.settings.servers.filter((server) => server.enabled);
  const results = await Promise.all(servers.map((server) => fetchFiveMServer(server)));
  const allPlayers = results.flatMap((server) =>
    server.players.map((player) => ({ ...player, serverId: server.id, serverName: server.name }))
  );

  const personnelStatus = state.personnel.map((person) => {
    const activePlayer = findMatchingPlayer(person, allPlayers);
    if (activePlayer) {
      person.lastSeenAt = new Date().toISOString();
      person.lastActiveServer = activePlayer.serverName;
    }
    return {
      ...person,
      active: Boolean(activePlayer),
      playerName: activePlayer?.name || "",
      serverName: activePlayer?.serverName || person.lastActiveServer || ""
    };
  });

  const departments = Object.fromEntries(
    state.settings.departments.map((department) => [
      department.id,
      {
        id: department.id,
        name: department.name,
        color: department.color,
        active: 0,
        total: state.personnel.filter((person) => person.department === department.id).length
      }
    ])
  );

  for (const person of personnelStatus) {
    if (person.active && departments[person.department]) departments[person.department].active += 1;
  }

  const totalPlayers = results.reduce((sum, server) => sum + server.clients, 0);
  const maxPlayers = results.reduce((sum, server) => sum + server.maxClients, 0);
  const activePersonnel = personnelStatus.filter((person) => person.active).length;

  const payload = {
    generatedAt: new Date().toISOString(),
    totalPlayers,
    maxPlayers,
    activePersonnel,
    servers: results,
    departments: Object.values(departments),
    personnel: personnelStatus
  };

  await recordMetric(payload);
  return payload;
}

async function fetchFiveMServer(server) {
  const base = {
    id: server.id,
    name: server.name,
    address: server.address,
    online: false,
    clients: 0,
    maxClients: 0,
    hostname: server.name,
    players: [],
    error: ""
  };

  const address = normalizeFiveMAddress(server.address);
  if (!address) return { ...base, error: "not_configured" };

  try {
    if (/^https?:\/\/cfx\.re\/join\//i.test(address) || /^cfx\.re\/join\//i.test(address)) {
      return await fetchCfxServer({ ...server, address }, base);
    }
    if (/^https?:\/\//i.test(address)) {
      return await fetchDirectServer({ ...server, address }, { ...base, address });
    }
    return await fetchCfxServer({ ...server, address }, { ...base, address });
  } catch (error) {
    return { ...base, error: error.message || "offline" };
  }
}

function normalizeFiveMAddress(address) {
  const value = safeText(address);
  if (!value) return "";
  if (/^https?:\/\//i.test(value) || /^cfx\.re\/join\//i.test(value)) return value;
  if (/^[a-z0-9.-]+:\d{2,5}$/i.test(value)) return `http://${value}`;
  return value;
}

async function fetchDirectServer(server, base) {
  const address = server.address.replace(/\/$/, "");
  const [dynamic, players] = await Promise.all([
    fetchJson(`${address}/dynamic.json`),
    fetchJson(`${address}/players.json`).catch(() => [])
  ]);
  return {
    ...base,
    online: true,
    clients: Number(dynamic.clients || players.length || 0),
    maxClients: Number(dynamic.sv_maxclients || dynamic.maxclients || 0),
    hostname: dynamic.hostname || server.name,
    players: normalizePlayers(players)
  };
}

async function fetchCfxServer(server, base) {
  const code = server.address
    .replace(/^https?:\/\/cfx\.re\/join\//i, "")
    .replace(/^cfx\.re\/join\//i, "")
    .trim();
  const payload = await fetchJson(`https://servers-frontend.fivem.net/api/servers/single/${encodeURIComponent(code)}`);
  const data = payload.Data || payload.data || {};
  return {
    ...base,
    online: true,
    clients: Number(data.clients || 0),
    maxClients: Number(data.sv_maxclients || data.vars?.sv_maxClients || 0),
    hostname: data.hostname || server.name,
    players: normalizePlayers(data.players || [])
  };
}

async function fetchJson(target) {
  const response = await fetch(target, {
    headers: {
      accept: "application/json",
      "user-agent": "syncora-panel/1.0"
    },
    signal: AbortSignal.timeout(6500)
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function normalizePlayers(players) {
  return (players || []).map((player) => ({
    id: String(player.id || player.endpoint || player.name || ""),
    name: String(player.name || ""),
    ping: Number(player.ping || 0),
    identifiers: (player.identifiers || []).map((identifier) => String(identifier).toLowerCase())
  }));
}

function findMatchingPlayer(person, players) {
  const keys = [person.fivemIdentifier, person.discordId ? `discord:${person.discordId}` : "", person.discordId, person.name]
    .filter(Boolean)
    .map((value) => String(value).trim().toLowerCase());

  return players.find((player) => {
    const identifiers = player.identifiers || [];
    const name = player.name.toLowerCase();
    return keys.some((key) => identifiers.includes(key) || name === key);
  });
}

async function recordMetric(status) {
  const last = state.metrics[state.metrics.length - 1];
  if (last && Date.now() - new Date(last.createdAt).getTime() < METRIC_INTERVAL_MS) return;

  state.metrics.push({
    id: crypto.randomUUID(),
    createdAt: status.generatedAt,
    totalPlayers: status.totalPlayers,
    maxPlayers: status.maxPlayers,
    activePersonnel: status.activePersonnel,
    departments: Object.fromEntries(status.departments.map((department) => [department.id, department.active])),
    servers: status.servers.map((server) => ({
      id: server.id,
      name: server.name,
      online: server.online,
      clients: server.clients,
      maxClients: server.maxClients
    }))
  });
  if (state.metrics.length > 5000) state.metrics = state.metrics.slice(-5000);
  await saveState({ backup: false });
}

function buildMetrics(range) {
  const now = Date.now();
  const windows = {
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000
  };
  const windowMs = windows[range] || windows.hour;
  const points = state.metrics.filter((point) => new Date(point.createdAt).getTime() >= now - windowMs);
  const departmentTotals = Object.fromEntries(state.settings.departments.map((department) => [department.id, 0]));

  for (const point of points) {
    for (const [department, count] of Object.entries(point.departments || {})) {
      departmentTotals[department] = (departmentTotals[department] || 0) + Number(count || 0);
    }
  }

  return {
    range: windows[range] ? range : "hour",
    points,
    departmentTotals,
    departments: state.settings.departments
  };
}

async function serveStatic(req, res, pathname) {
  const routeMap = {
    "/": "/panel-tek-html.html",
    "/index.html": "/panel-tek-html.html",
    "/login.html": "/panel-tek-html.html",
    "/dashboard.html": "/panel-tek-html.html",
    "/dashboard": "/panel-tek-html.html",
    "/app.html": "/panel-tek-html.html",
    "/app": "/panel-tek-html.html",
    "/discord.html": "/panel-tek-html.html",
    "/discord": "/panel-tek-html.html",
    "/assets/syncora-logo.svg": "/syncora-logo.svg",
    "/assets/syncora-pp.png": "/syncora-pp.png"
  };
  const requested = routeMap[pathname] || pathname;
  const decoded = decodeURIComponent(requested);
  const filePath = path.normalize(path.join(PUBLIC_DIR, decoded));
  const relativePath = path.relative(PUBLIC_DIR, filePath);
  const firstSegment = relativePath.split(path.sep).filter(Boolean)[0]?.toLowerCase() || "";
  const baseName = path.basename(filePath).toLowerCase();

  if (
    relativePath.startsWith("..") ||
    path.isAbsolute(relativePath) ||
    firstSegment.startsWith(".") ||
    STATIC_PRIVATE_DIRS.has(firstSegment) ||
    STATIC_DENYLIST.has(baseName)
  ) {
    res.writeHead(403, { "content-type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  try {
    const stat = await fsp.stat(filePath);
    if (!stat.isFile()) throw new Error("Not a file");
    const longCache = filePath.endsWith(".svg") || filePath.includes(`${path.sep}uploads${path.sep}`);
    res.writeHead(200, {
      "content-type": contentType(filePath),
      "cache-control": longCache ? "public, max-age=86400" : "no-cache"
    });
    fs.createReadStream(filePath).pipe(res);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return (
    {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".svg": "image/svg+xml",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".webp": "image/webp",
      ".gif": "image/gif",
      ".zip": "application/zip"
    }[ext] || "application/octet-stream"
  );
}

async function start() {
  await loadState();
  await initAuthStorage();
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    if (url.pathname.startsWith("/api/") || isDiscordCallbackPath(url.pathname)) {
      await handleApi(req, res, url.pathname, url);
      return;
    }
    await serveStatic(req, res, url.pathname);
  });

  await listenOnAvailablePort(server, PORT);
}

function listenOnAvailablePort(server, port) {
  return new Promise((resolve, reject) => {
    const tryListen = (candidate) => {
      const onError = (error) => {
        server.off("listening", onListening);
        if (error.code === "EADDRINUSE" && candidate < MAX_PORT) {
          tryListen(candidate + 1);
          return;
        }
        reject(error);
      };

      const onListening = () => {
        server.off("error", onError);
        console.log(`Syncora panel running at http://localhost:${candidate}`);
        console.log(`Syncora public panel: ${SYNCORA_PUBLIC_ORIGIN}`);
        resolve(candidate);
      };

      server.once("error", onError);
      server.once("listening", onListening);
      server.listen(candidate);
    };

    tryListen(port);
  });
}

if (require.main === module) {
  start().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = {
  handleApi,
  loadState,
  initAuthStorage
};
