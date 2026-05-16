const notice = document.querySelector("#discordNotice");
const button = document.querySelector("#authorizeDiscord");
const params = new URLSearchParams(window.location.search);
const mode = params.get("mode") === "login" ? "login" : "connect";
const discordI18n = {
  tr: {
    copy: "Bu ekran Discord'un yetki verme sayfasi gibi calisir. Onay verdikten sonra Discord hesabinin avatar ve ID bilgisi panelin sol altinda gorunur.",
    identifyText: "Discord ID, kullanici adi ve avatar.",
    emailText: "Gmail hesabi ile Discord hesabini eslestirme.",
    sessionText: "Baglanti tamamlaninca panele geri donus.",
    backToPanel: "Panele don",
    authorize: "Yetki ver ve bagla",
    center: "Discord baglanti merkezi",
    scopeIdentify: "Hesabini tanimlar",
    scopeLink: "Panel hesabina baglar",
    scopeTeam: "Sunucu ekibi icin ortak gorunum saglar",
    settingsMissing: "Discord ayarlari eksik. Netlify Environment Variables icinde DISCORD_CLIENT_ID ve DISCORD_CLIENT_SECRET kontrol edilmeli.",
    settingsMissingButton: "Discord ayari eksik",
    configReadFailed: "Discord baglanti ayarlari okunamadi.",
    discord_network: "Bu bilgisayar/server Discord API'ye erisemiyor. Baglanti discord.com yerine ag engeline takiliyor; Discord API erisimi olan bir agda veya sunucuda calistir.",
    discord_redirect: "Discord Redirect URI uyusmuyor. Netlify ve Discord Developer Portal adresi birebir ayni olmali.",
    discord_credentials: "Discord Client ID veya Client Secret hatali gorunuyor.",
    discord_failed: "Discord baglantisi tamamlanamadi. Redirect URI ve Discord Developer Portal ayarlarini kontrol et.",
    discord_config: "Discord ayarlari eksik.",
    discord_state: "Discord oturumu dogrulanamadi."
  },
  en: {
    copy: "This screen behaves like Discord's authorization page. After approval, your Discord avatar and ID appear in the lower-left of the panel.",
    identifyText: "Discord ID, username, and avatar.",
    emailText: "Match the Gmail account with the Discord account.",
    sessionText: "Return to the panel when the connection is complete.",
    backToPanel: "Back to panel",
    authorize: "Authorize and connect",
    center: "Discord connection center",
    scopeIdentify: "Identifies your account",
    scopeLink: "Links to the panel account",
    scopeTeam: "Provides a shared view for the server team",
    settingsMissing: "Discord settings are missing. Check DISCORD_CLIENT_ID and DISCORD_CLIENT_SECRET in Netlify Environment Variables.",
    settingsMissingButton: "Discord settings missing",
    configReadFailed: "Discord connection settings could not be read.",
    discord_network: "This computer/server cannot reach the Discord API. Run it on a network or server with Discord API access.",
    discord_redirect: "Discord Redirect URI does not match. The Netlify and Discord Developer Portal addresses must be identical.",
    discord_credentials: "Discord Client ID or Client Secret looks wrong.",
    discord_failed: "Discord connection could not be completed. Check Redirect URI and Discord Developer Portal settings.",
    discord_config: "Discord settings are missing.",
    discord_state: "Discord session could not be verified."
  },
  ru: {
    copy: "Ekran rabotaet kak stranitsa avtorizatsii Discord. Posle podtverzhdeniya avatar i ID Discord poyavyatsya v levom nizu paneli.",
    identifyText: "Discord ID, imya polzovatelya i avatar.",
    emailText: "Svyaz Gmail akkaunta s Discord akkauntom.",
    sessionText: "Vozvrat v panel posle zaversheniya podklyucheniya.",
    backToPanel: "Nazad v panel",
    authorize: "Razreshit i podklyuchit",
    center: "Tsentr Discord podklyucheniya",
    scopeIdentify: "Opredelyaet akkaunt",
    scopeLink: "Svyazyvaet s akkauntom paneli",
    scopeTeam: "Daet obshchiy vid dlya komandy servera",
    settingsMissing: "Nastroyki Discord otsutstvuyut. Proverte DISCORD_CLIENT_ID i DISCORD_CLIENT_SECRET v Netlify Environment Variables.",
    settingsMissingButton: "Nastroyki Discord otsutstvuyut",
    configReadFailed: "Nastroyki Discord podklyucheniya ne prochitany.",
    discord_network: "Etot kompyuter/server ne mozhet dostuchatsya do Discord API. Zapustite v seti ili na servere s dostupom k Discord API.",
    discord_redirect: "Discord Redirect URI ne sovpadaet. Adresa v Netlify i Discord Developer Portal dolzhny sovpadat.",
    discord_credentials: "Discord Client ID ili Client Secret neverny.",
    discord_failed: "Discord podklyuchenie ne zaversheno. Proverte Redirect URI i nastroyki Discord Developer Portal.",
    discord_config: "Nastroyki Discord otsutstvuyut.",
    discord_state: "Sessiya Discord ne proverena."
  }
};
let discordLang = localStorage.getItem("syncora_lang") || "tr";

function normalizeLanguage(language) {
  if (language === "rs") return "ru";
  return ["tr", "en", "ru"].includes(language) ? language : "tr";
}

function t(key) {
  return discordI18n[discordLang]?.[key] || discordI18n.tr[key] || key;
}

function translateDiscord() {
  discordLang = normalizeLanguage(discordLang);
  localStorage.setItem("syncora_lang", discordLang);
  document.documentElement.lang = discordLang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
}

function showDiscordNotice(message, error = true) {
  notice.textContent = message;
  notice.classList.toggle("error", error);
  notice.classList.remove("hidden");
}

function showUrlError() {
  const error = params.get("error");
  if (!error) return;
  showDiscordNotice(discordI18n[discordLang]?.[error] ? t(error) : t("discord_failed"));
}

async function loadDiscordConfig() {
  const [configResponse, healthResponse] = await Promise.allSettled([
    fetch("/api/public-config", { credentials: "include" }),
    fetch("/api/health", { credentials: "include", cache: "no-store" })
  ]);

  if (configResponse.status !== "fulfilled" || !configResponse.value.ok) {
    throw new Error("public_config_failed");
  }

  const config = await configResponse.value.json();
  let health = null;
  if (healthResponse.status === "fulfilled" && healthResponse.value.ok) {
    health = await healthResponse.value.json().catch(() => null);
  }

  const discordReady = Boolean(health?.discord?.enabled ?? config.discordEnabled ?? config.discordRedirectUri);
  discordLang = normalizeLanguage(config.language || discordLang);
  document.querySelector("#discordBrand").textContent = config.brandName || "Syncora Roleplay";
  document.querySelector("#discordLogo").src = config.logoUrl || "/syncora-pp.png";
  document.body.style.setProperty("--brand-image", `url("${config.logoUrl || "/syncora-pp.png"}")`);
  document.body.style.setProperty("--bg-image", config.backgroundUrl ? `url("${config.backgroundUrl}")` : "none");
  translateDiscord();

  if (!discordReady) {
    showDiscordNotice(t("settingsMissing"));
    button.disabled = true;
    button.textContent = t("settingsMissingButton");
    return;
  }

  button.disabled = false;
  button.textContent = t("authorize");
}

button.addEventListener("click", () => {
  window.location.href = `/api/auth/discord/start?mode=${encodeURIComponent(mode)}`;
});

loadDiscordConfig()
  .then(showUrlError)
  .catch(() => {
    translateDiscord();
    showDiscordNotice(t("configReadFailed"));
    button.disabled = true;
  });
