@echo off
cd /d "%~dp0"
echo Bu dosya eski local MySQL denemesi icindi.
echo Yeni canli sistem Netlify Blobs kullanir.
echo Normal local panel baslatiliyor...
npm install
npm start
pause
