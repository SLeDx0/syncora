const fs = require("fs");
const path = require("path");
const buildSingleHtml = require("./build-single-html");

const ROOT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const singleHtml = buildSingleHtml();

fs.rmSync(DIST_DIR, { recursive: true, force: true });
fs.mkdirSync(DIST_DIR, { recursive: true });

fs.copyFileSync(singleHtml.file, path.join(DIST_DIR, "index.html"));
fs.copyFileSync(path.join(ROOT_DIR, "syncora-pp.png"), path.join(DIST_DIR, "syncora-pp.png"));
fs.copyFileSync(path.join(ROOT_DIR, "syncora-logo.svg"), path.join(DIST_DIR, "syncora-logo.svg"));
fs.copyFileSync(path.join(ROOT_DIR, "syncora-email-banner.gif"), path.join(DIST_DIR, "syncora-email-banner.gif"));

fs.writeFileSync(
  path.join(DIST_DIR, "_redirects"),
  [
    "/api/* /.netlify/functions/api/:splat 200!",
    "/discord/callback /.netlify/functions/api/discord/callback 200!",
    "/dashboard /index.html 200",
    "/dashboard.html /index.html 200",
    "/app /index.html 200",
    "/app.html /index.html 200",
    "/login.html /index.html 200",
    "/discord /index.html 200",
    "/discord.html /index.html 200",
    "/* /index.html 200"
  ].join("\n"),
  "utf8"
);

fs.copyFileSync(path.join(DIST_DIR, "index.html"), path.join(DIST_DIR, "404.html"));

console.log(`Netlify build ready: ${DIST_DIR}`);