CREATE DATABASE IF NOT EXISTS syncora_panel CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE syncora_panel;

CREATE TABLE IF NOT EXISTS `member` (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  name VARCHAR(120) NOT NULL DEFAULT 'Panel User',
  email VARCHAR(190) NOT NULL,
  role VARCHAR(30) NOT NULL DEFAULT 'member',
  password_hash VARCHAR(255) NOT NULL DEFAULT '',
  discord_id VARCHAR(32) NULL,
  discord_json LONGTEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  UNIQUE KEY uq_member_email (email),
  INDEX idx_member_discord_id (discord_id),
  INDEX idx_member_role (role)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS password_resets (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(190) NOT NULL,
  user_id VARCHAR(64) NULL,
  code_hash VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_password_resets_email (email),
  INDEX idx_password_resets_user (user_id),
  INDEX idx_password_resets_active (email, expires_at, used_at)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS syncora_sessions (
  token_hash CHAR(64) NOT NULL PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  expires_at DATETIME NOT NULL,
  remember TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL,
  INDEX idx_syncora_sessions_user (user_id),
  INDEX idx_syncora_sessions_expires (expires_at)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS syncora_oauth_states (
  token VARCHAR(96) NOT NULL PRIMARY KEY,
  mode VARCHAR(20) NOT NULL,
  user_id VARCHAR(64) NULL,
  redirect_uri TEXT NULL,
  created_at DATETIME NOT NULL,
  INDEX idx_syncora_oauth_created (created_at)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
