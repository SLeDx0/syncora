const authI18n = {
  tr: {
    login: "Giris yap",
    register: "Kayit ol",
    email: "Gmail",
    password: "Sifre",
    name: "Panel adi",
    inviteCode: "Davet kodu",
    heroTitle: "Ortak Panel",
    heroCopy: "Gmail ve sifre ile giris yap. Discord hesabini panelin icinden sol alttaki baglanti alaniyla eslestir.",
    metricLiveServer: "Live server",
    metricSharedRecords: "Shared records",
    metricDiscordLink: "Discord link",
    remember: "Beni sonraki giriste hatirla",
    forgotPassword: "Sifremi unuttum",
    createAccount: "Hesap olustur",
    resetCodeGet: "Sifirlama kodu gonder",
    backToLogin: "Girise don",
    resetCode: "Sifirlama kodu",
    newPassword: "Yeni sifre",
    newPasswordConfirm: "Tekrar yeni sifre",
    passwordMismatch: "Yeni sifre kutulari ayni olmali.",
    saveNewPassword: "Yeni sifreyi kaydet",
    invalidLogin: "Gmail veya sifre hatali.",
    registerFailed: "Kayit tamamlanamadi.",
    resetCodeMessage: "Sifre sifirlama kodu Gmail adresine gonderildi. Kodu girip yeni sifreni iki kutuya da yaz.",
    resetCodeFailed: "Sifirlama kodu gonderilemedi.",
    passwordResetDone: "Sifren yenilendi. Yeni sifrenle giris yapabilirsin.",
    passwordResetFailed: "Sifre yenilenemedi.",
    unknownError: "Islem tamamlanamadi.",
    errorDiscordConfig: "Discord ayarlari eksik. Netlify Environment Variables icindeki Client ID ve Secret kontrol edilmeli.",
    errorDiscordState: "Discord oturumu dogrulanamadi. Tekrar baglanmayi dene.",
    errorDiscordNetwork: "Bu bilgisayar/server Discord API'ye erisemiyor. Discord API erisimi olan bir agda veya sunucuda calistirman gerekiyor.",
    errorDiscordRedirect: "Discord Redirect URI uyusmuyor. Netlify ve Discord Developer Portal adresi birebir ayni olmali.",
    errorDiscordCredentials: "Discord Client ID veya Client Secret hatali gorunuyor.",
    errorDiscordFailed: "Discord baglantisi tamamlanamadi. Redirect URI ve Discord uygulama ayarlarini kontrol et.",
    errorDiscordLoginRequired: "Discord baglamak icin once panele giris yapmalisin."
  },
  en: {
    login: "Login",
    register: "Register",
    email: "Gmail",
    password: "Password",
    name: "Panel name",
    inviteCode: "Invite code",
    heroTitle: "Shared Panel",
    heroCopy: "Sign in with Gmail and password. Match your Discord account from the link area in the lower-left of the panel.",
    metricLiveServer: "Live server",
    metricSharedRecords: "Shared records",
    metricDiscordLink: "Discord link",
    remember: "Remember me next time",
    forgotPassword: "Forgot password",
    createAccount: "Create account",
    resetCodeGet: "Send reset code",
    backToLogin: "Back to login",
    resetCode: "Reset code",
    newPassword: "New password",
    newPasswordConfirm: "Repeat new password",
    passwordMismatch: "New password fields must match.",
    saveNewPassword: "Save new password",
    invalidLogin: "Gmail or password is wrong.",
    registerFailed: "Registration failed.",
    resetCodeMessage: "A password reset code has been sent to your Gmail address.",
    resetCodeFailed: "Reset code could not be sent.",
    passwordResetDone: "Password renewed. You can log in with your new password.",
    passwordResetFailed: "Password could not be renewed.",
    unknownError: "Action failed.",
    errorDiscordConfig: "Discord settings are missing. Check Client ID and Secret in Netlify Environment Variables.",
    errorDiscordState: "Discord session could not be verified. Try connecting again.",
    errorDiscordNetwork: "This computer/server cannot reach the Discord API. Run it on a network or server with Discord API access.",
    errorDiscordRedirect: "Discord Redirect URI does not match. The Netlify and Discord Developer Portal addresses must be identical.",
    errorDiscordCredentials: "Discord Client ID or Client Secret looks wrong.",
    errorDiscordFailed: "Discord connection failed. Check Redirect URI and Discord application settings.",
    errorDiscordLoginRequired: "You must log in before connecting Discord."
  },
  ru: {
    login: "Vhod",
    register: "Registratsiya",
    email: "Gmail",
    password: "Parol",
    name: "Imya paneli",
    inviteCode: "Kod",
    heroTitle: "Obshchaya panel",
    heroCopy: "Voydite cherez Gmail i parol. Discord akkaunt mozhno svyazat iz oblasti svyazi v levom nizu paneli.",
    metricLiveServer: "Zhivoy server",
    metricSharedRecords: "Obshchie zapisi",
    metricDiscordLink: "Discord svyaz",
    remember: "Zapomnit menya",
    forgotPassword: "Zabyl parol",
    createAccount: "Sozdat akkaunt",
    resetCodeGet: "Otpravit kod sbrosa",
    backToLogin: "Nazad ko vhodu",
    resetCode: "Kod sbrosa",
    newPassword: "Novyy parol",
    newPasswordConfirm: "Povtorite novyy parol",
    passwordMismatch: "Polya novogo parolya dolzhny sovpadat.",
    saveNewPassword: "Sohranit novyy parol",
    invalidLogin: "Gmail ili parol neverny.",
    registerFailed: "Registratsiya ne zavershena.",
    resetCodeMessage: "Kod sbrosa parolya otpravlen na Gmail.",
    resetCodeFailed: "Kod sbrosa ne otpravlen.",
    passwordResetDone: "Parol obnovlen. Voydite s novym parolem.",
    passwordResetFailed: "Parol ne obnovlen.",
    unknownError: "Oshibka.",
    errorDiscordConfig: "Nastroyki Discord otsutstvuyut. Proverte Client ID i Secret v Netlify Environment Variables.",
    errorDiscordState: "Sessiya Discord ne proverena. Poprobuyte snova.",
    errorDiscordNetwork: "Etot kompyuter/server ne mozhet dostuchatsya do Discord API. Zapustite v seti ili na servere s dostupom k Discord API.",
    errorDiscordRedirect: "Discord Redirect URI ne sovpadaet. Adresa v Netlify i Discord Developer Portal dolzhny sovpadat.",
    errorDiscordCredentials: "Discord Client ID ili Client Secret neverny.",
    errorDiscordFailed: "Discord podklyuchenie ne zaversheno. Proverte Redirect URI i nastroyki Discord prilozheniya.",
    errorDiscordLoginRequired: "Snachala nuzhno voyt v panel, chtoby podklyuchit Discord."
  }
};

let authLang = localStorage.getItem("syncora_lang") || "tr";
let publicConfig = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function t(key, vars = {}) {
  const template = authI18n[authLang]?.[key] || authI18n.tr[key] || key;
  return template.replace(/\{(\w+)\}/g, (_, name) => (vars[name] ?? ""));
}

function translateAuth() {
  document.documentElement.lang = authLang;
  if ($("#brandName") && !publicConfig?.brandName) $("#brandName").textContent = t("heroTitle");
  $$("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  $$("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
  $$("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === authLang);
  });
}

function showNotice(message, error = true) {
  const notice = $("#authNotice");
  notice.textContent = message;
  notice.classList.toggle("error", error);
  notice.classList.remove("hidden");
}

function hideNotice() {
  $("#authNotice").classList.add("hidden");
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: "include",
    headers: { "content-type": "application/json" },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || data.error || "request_failed");
    error.data = data;
    throw error;
  }
  return data;
}

function formData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function showAuthForm(name) {
  const forms = {
    login: $("#loginForm"),
    register: $("#registerForm"),
    resetRequest: $("#resetRequestForm"),
    resetConfirm: $("#resetConfirmForm")
  };
  Object.entries(forms).forEach(([key, form]) => {
    form.classList.toggle("hidden", key !== name);
  });
  $$("[data-auth-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.authTab === name);
  });
  hideNotice();
}

async function loadPublicConfig() {
  publicConfig = await api("/api/public-config");
  authLang = publicConfig.language || authLang;
  localStorage.setItem("syncora_lang", authLang);
  $("#brandName").textContent = publicConfig.brandName || t("heroTitle");
  $("#brandLogo").src = publicConfig.logoUrl || "/syncora-pp.png";
  document.body.style.setProperty("--brand-image", `url("${publicConfig.logoUrl || "/syncora-pp.png"}")`);
  document.body.style.setProperty("--bg-image", publicConfig.backgroundUrl ? `url("${publicConfig.backgroundUrl}")` : "none");
  $("#inviteField").classList.toggle("hidden", !publicConfig.inviteRequired);
  translateAuth();
}

async function redirectRememberedSession() {
  if (localStorage.getItem("syncora_remember") !== "1") return;
  try {
    await api("/api/bootstrap");
    window.location.href = "/app.html";
  } catch {
    localStorage.removeItem("syncora_remember");
  }
}

function showUrlError() {
  const error = new URLSearchParams(window.location.search).get("error");
  if (!error) return;
  const messages = {
    discord_config: "errorDiscordConfig",
    discord_state: "errorDiscordState",
    discord_network: "errorDiscordNetwork",
    discord_redirect: "errorDiscordRedirect",
    discord_credentials: "errorDiscordCredentials",
    discord_failed: "errorDiscordFailed",
    discord_login_required: "errorDiscordLoginRequired"
  };
  showNotice(messages[error] ? t(messages[error]) : t("unknownError"));
}


function showPasswordResetFromLink() {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("resetEmail");
  const code = params.get("resetCode") || params.get("resetToken") || "";
  if (!email) return false;

  const emailInput = $("#resetConfirmEmail");
  const codeInput = $("#resetConfirmForm [name='resetCode']");
  if (!emailInput || !codeInput) return false;

  emailInput.value = email;
  if (code) codeInput.value = code;
  codeInput.type = "text";
  const codeLabel = codeInput.closest("label");
  if (codeLabel) codeLabel.classList.remove("hidden");

  showAuthForm("resetConfirm");
  showNotice(code ? "Kod otomatik dolduruldu. Yeni sifreni iki kutuya da yazip kaydet." : "Gmail dolduruldu. E-postadaki 6 haneli kodu girip yeni sifreni yaz.", false);
  return true;
}

function initTabs() {
  $$("[data-auth-tab]").forEach((button) => {
    button.addEventListener("click", () => showAuthForm(button.dataset.authTab));
  });
  $$("[data-auth-back]").forEach((button) => {
    button.addEventListener("click", () => showAuthForm(button.dataset.authBack));
  });
  $("#forgotPasswordBtn").addEventListener("click", () => showAuthForm("resetRequest"));
}

function initLanguage() {
  $$("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      authLang = button.dataset.lang;
      localStorage.setItem("syncora_lang", authLang);
      translateAuth();
    });
  });
}

function initForms() {
  const loginEmailInput = $("#loginForm [name='email']");
  const rememberedEmail = localStorage.getItem("syncora_last_email") || "";
  if (loginEmailInput && rememberedEmail) loginEmailInput.value = rememberedEmail;
  $("#rememberLogin").checked = localStorage.getItem("syncora_remember") !== "0";

  $("#loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = formData(event.currentTarget);
    try {
      await api("/api/auth/login", { method: "POST", body: JSON.stringify(payload) });
      if (payload.remember === "on") {
        localStorage.setItem("syncora_remember", "1");
        localStorage.setItem("syncora_last_email", String(payload.email || "").trim().toLowerCase());
      } else {
        localStorage.setItem("syncora_remember", "0");
        localStorage.removeItem("syncora_last_email");
      }
      window.location.href = "/app.html";
    } catch (error) {
      showNotice(error.data?.message || error.message || t("invalidLogin"));
    }
  });

  $("#registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = formData(event.currentTarget);
    payload.remember = "on";
    try {
      await api("/api/auth/register", { method: "POST", body: JSON.stringify(payload) });
      localStorage.setItem("syncora_remember", "1");
      localStorage.setItem("syncora_last_email", String(payload.email || "").trim().toLowerCase());
      window.location.href = "/app.html";
    } catch (error) {
      showNotice(error.data?.message || error.message || t("registerFailed"));
    }
  });

  $("#resetRequestForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = formData(event.currentTarget);
    try {
      const result = await api("/api/auth/password-reset/request", { method: "POST", body: JSON.stringify(payload) });
      const emailInput = $("#resetConfirmEmail");
      const codeInput = $("#resetConfirmForm [name='resetCode']");
      if (emailInput) emailInput.value = payload.email || "";
      if (codeInput) codeInput.value = "";
      $("#resetConfirmForm [name='password']").value = "";
      const confirmInput = $("#resetConfirmForm [name='passwordConfirm']");
      if (confirmInput) confirmInput.value = "";
      showAuthForm("resetConfirm");
      showNotice(result.message || t("resetCodeMessage"), false);
      if (codeInput) codeInput.focus();
    } catch (error) {
      showNotice(error.data?.message || t("resetCodeFailed"));
    }
  });

  $("#resetConfirmForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = formData(event.currentTarget);
    if (payload.password !== payload.passwordConfirm) {
      showNotice(t("passwordMismatch"));
      return;
    }
    try {
      await api("/api/auth/password-reset/confirm", { method: "POST", body: JSON.stringify(payload) });
      localStorage.removeItem("syncora_remember");
      showAuthForm("login");
      showNotice(t("passwordResetDone"), false);
    } catch (error) {
      showNotice(error.data?.message || t("passwordResetFailed"));
    }
  });
}

loadPublicConfig()
  .then(async () => {
    initTabs();
    initLanguage();
    initForms();
    if (!showPasswordResetFromLink()) showUrlError();
    await redirectRememberedSession();
  })
  .catch(() => {
    translateAuth();
    showNotice(t("unknownError"));
  });
