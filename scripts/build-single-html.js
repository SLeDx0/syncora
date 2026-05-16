const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const OUTPUT_FILE = path.join(ROOT_DIR, "panel-tek-html.html");

function read(fileName) {
  return fs.readFileSync(path.join(ROOT_DIR, fileName), "utf8");
}

function extractBody(fileName, logoData) {
  const html = read(fileName);
  const match = html.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);
  if (!match) throw new Error(`${fileName} icinde body bulunamadi.`);

  const classMatch = match[1].match(/class=["']([^"']+)["']/i);
  const body = match[2]
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replaceAll('src="/syncora-pp.png"', `src="${logoData}"`)
    .replaceAll('src="/syncora-logo.svg"', `src="${logoData}"`)
    .replaceAll('href="/app.html"', 'href="?screen=app"')
    .trim();

  return {
    className: classMatch ? classMatch[1] : "",
    body
  };
}

function makeTemplate(id, body) {
  return `<template id="screen-${id}">\n${body}\n</template>`;
}

function buildSingleHtml() {
  const logoData = `data:image/png;base64,${fs.readFileSync(path.join(ROOT_DIR, "syncora-pp.png")).toString("base64")}`;

  const css = read("styles.css").replace(/<\/style/gi, "<\\/style");
  const screens = {
    login: extractBody("index.html", logoData),
    app: extractBody("app.html", logoData),
    discord: extractBody("discord.html", logoData)
  };

  const authJs = read("auth.js")
    .replaceAll('window.location.href = "/app.html";', 'window.location.href = window.singleUrl("app");')
    .replaceAll('publicConfig.logoUrl || "/syncora-pp.png"', "publicConfig.logoUrl || window.INLINE_LOGO");

  const appJs = read("app.js")
    .replaceAll('window.location.href = "/index.html";', 'window.location.href = window.singleUrl("login");')
    .replaceAll('href="/discord.html?mode=connect"', 'href="${window.singleUrl("discord", { mode: "connect" })}"');

  const discordJs = read("discord.js")
    .replaceAll('config.logoUrl || "/syncora-pp.png"', "config.logoUrl || window.INLINE_LOGO");

  const sourceJson = JSON.stringify({
    login: authJs,
    app: appJs,
    discord: discordJs
  }).replace(/<\/script/gi, "<\\/script");

  const output = `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>SYNCORA Panel</title>
  <style>
${css}
  </style>
</head>
<body>
  <div id="singleRoot"></div>

  ${makeTemplate("login", screens.login.body)}
  ${makeTemplate("app", screens.app.body)}
  ${makeTemplate("discord", screens.discord.body)}

  <script>
    window.INLINE_LOGO = ${JSON.stringify(logoData)};
    window.singleUrl = function singleUrl(screen, extra) {
      const url = new URL(window.location.href);
      url.search = "";
      url.hash = "";
      url.searchParams.set("screen", screen);
      Object.entries(extra || {}).forEach(function(entry) {
        const key = entry[0];
        const value = entry[1];
        if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
      });
      return url.href;
    };

    const screenClasses = ${JSON.stringify({
      login: screens.login.className,
      app: screens.app.className,
      discord: screens.discord.className
    })};
    const screenTitles = {
      login: "SYNCORA Panel | Giris",
      app: "SYNCORA Panel | Dashboard",
      discord: "SYNCORA Panel | Discord Baglanti"
    };
    const screenSources = ${sourceJson};

    function getInitialScreen() {
      const params = new URLSearchParams(window.location.search);
      const requested = params.get("screen");
      if (["login", "app", "discord"].includes(requested)) return requested;
      if (params.has("discord")) return "app";
      if (params.has("mode")) return "discord";
      const currentPath = window.location.pathname.toLowerCase();
      if (currentPath.endsWith("app.html") || currentPath.endsWith("dashboard.html") || currentPath.endsWith("/app") || currentPath.endsWith("/dashboard")) return "app";
      if (currentPath.endsWith("discord.html") || currentPath.endsWith("/discord")) return "discord";
      return "login";
    }

    function mountScreen(screen) {
      const screenTemplate = document.querySelector("#screen-" + screen);
      const root = document.querySelector("#singleRoot");
      document.body.className = screenClasses[screen] || "";
      document.title = screenTitles[screen] || "SYNCORA Panel";
      root.innerHTML = screenTemplate.innerHTML;

      const script = document.createElement("script");
      script.textContent = screenSources[screen];
      document.body.appendChild(script);
    }

    mountScreen(getInitialScreen());
  <\/script>
</body>
</html>
`;

  fs.writeFileSync(OUTPUT_FILE, output, "utf8");
  return {
    file: OUTPUT_FILE,
    bytes: Buffer.byteLength(output, "utf8")
  };
}

if (require.main === module) {
  console.log(JSON.stringify(buildSingleHtml()));
}

module.exports = buildSingleHtml;
