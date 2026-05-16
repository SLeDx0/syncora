# Syncora Panel - Netlify Blobs Surumu

Bu dosya eski notlardan kaldi; karisiklik olmamasi icin yeni sistem ozeti yazildi.

Canli sitede kayit/giris verisi artik phpMyAdmin/MySQL degil, **Netlify Blobs** icinde tutulur.

Detayli kurulum:

```txt
NETLIFY_BLOBS_KURULUM.md
```

Netlify Environment Variables temel ayarlari:

```env
SYNCORA_STORAGE=netlify-blobs
SYNCORA_AUTH_STORAGE=netlify-blobs
PUBLIC_SITE_URL=https://syncora.netlify.app
APP_URL=https://syncora.netlify.app
SITE_URL=https://syncora.netlify.app
BASE_URL=https://syncora.netlify.app
TOKEN_SECRET=uzun-rastgele-gizli-bir-yazi
```

Dogru kontrol ciktilari:

```txt
https://syncora.netlify.app/api/health
```

```json
"authStorage": "netlify-blobs"
"blobs": { "enabled": true }
"mysql": { "enabled": false }
```
