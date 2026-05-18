# Syncora Panel - Netlify Blobs Kurulumu

Bu surumde canli site icin ana veri kaydi **Netlify Blobs** olarak ayarlandi.
phpMyAdmin / MySQL zorunlu degildir.

## 1) Netlify'de girilecek Environment Variables

Netlify panelinden:

Sites > syncora > Site configuration > Environment variables

Asagidaki degerleri ekle:

```env
SYNCORA_STORAGE=netlify-blobs
SYNCORA_AUTH_STORAGE=netlify-blobs
PUBLIC_SITE_URL=https://syncora.netlify.app
APP_URL=https://syncora.netlify.app
SITE_URL=https://syncora.netlify.app
BASE_URL=https://syncora.netlify.app
TOKEN_SECRET=uzun-rastgele-gizli-bir-yazi
```

Discord kullanacaksan bunlari da ekle:

```env
DISCORD_CLIENT_ID=senin_discord_client_id
DISCORD_CLIENT_SECRET=senin_discord_client_secret
DISCORD_REDIRECT_URI=https://syncora.netlify.app/discord/callback
DISCORD_BOT_TOKEN=senin_bot_tokenin
```

Sifre sifirlama Gmail ile calissin istiyorsan bunlari da ekle:

```env
GMAIL_USER=senin_gmail_adresin
GMAIL_APP_PASSWORD=gmail_app_password
MAIL_FROM=senin_gmail_adresin
MAIL_FROM_NAME=Syncora
```

## 2) MySQL/phpMyAdmin envlerini sil veya bos birak

Netlify Environment Variables icinde su degerler varsa sil veya bos birak:

```env
SYNCORA_AUTH_STORAGE=mysql
MYSQL_HOST=
MYSQL_PORT=
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=
DB_HOST=
DB_NAME=
DB_USER=
DB_PASS=
```

Bu surumde MySQL adapteri sadece bilerek `SYNCORA_AUTH_STORAGE=mysql` yazarsan calisir.
Blobs modunda eski MYSQL_* degerleri dikkate alinmaz.

## 3) Yeniden deploy yap

Netlify'de:

Deploys > Trigger deploy > Deploy site

Deploy bitince kontrol adresi:

```txt
https://syncora.netlify.app/api/health
```

Dogru sonuc buna benzemeli:

```json
{
  "ok": true,
  "runtime": "netlify",
  "authStorage": "netlify-blobs",
  "blobs": {
    "enabled": true,
    "ready": true,
    "stateStore": "syncora-panel-state",
    "authKey": "auth-users",
    "stateKey": "state"
  },
  "mysql": {
    "enabled": false,
    "legacyOnly": true
  }
}
```

## 4) Kayit/giris verileri nerede duracak?

Netlify Blobs store:

```txt
syncora-panel-state
```

Ana dosyalar/keyler:

```txt
state
```

```txt
auth-users
```

`auth-users` icinde kullanicilar, session bilgileri, sifre sifirlama kod hashleri ve Discord OAuth state bilgileri tutulur.
Sifreler duz yazi olarak saklanmaz; `passwordHash` olarak tutulur.

## 5) Verileri Netlify UI'da gorme

Netlify panelinden:

1. Sites > syncora projesine gir.
2. Sol menude veya Project bolumunde **Blobs** sayfasini ac.
3. Store olarak `syncora-panel-state` sec.
4. `auth-users` veya `state` keyini indirip JSON olarak kontrol et.

## 6) Panel icinden guvenli kontrol

Admin hesabinla panele girince su endpointi de acabilirsin:

```txt
https://syncora.netlify.app/api/admin/auth-export
```

Bu endpoint sadece admin oturumu varsa calisir. Sifre hashlerini disari vermez; kullanici sayisi ve public kullanici listesini gosterir.

## 7) Test sirasi

1. `https://syncora.netlify.app/api/health` ac.
2. `authStorage` degeri `netlify-blobs` olmali.
3. Siteye girip yeni hesap kaydet.
4. Cikis yap.
5. Ayni Gmail ve sifreyle giris yap.
6. Netlify Blobs > `syncora-panel-state` > `auth-users` indirip kaydin geldigini kontrol et.

## 8) Onemli not

Netlify Functions icinde kullanilacak Environment Variables degerlerini Netlify UI'dan ekle.
`netlify.toml` icindeki build environment degerleri build icindir; canli Functions runtime icin Netlify UI tarafinda variable eklemek daha guvenlidir.
