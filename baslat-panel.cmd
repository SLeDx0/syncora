@echo off
setlocal
cd /d "%~dp0"

set "PUBLIC_SITE_URL=https://syncora.netlify.app"
set "APP_URL=https://syncora.netlify.app"
set "SITE_URL=https://syncora.netlify.app"
set "BASE_URL=https://syncora.netlify.app"
set "PANEL_URL=https://syncora.netlify.app"

echo Syncora Panel Netlify adresi aciliyor...
echo %PANEL_URL%
start "" "%PANEL_URL%/"
exit /b 0