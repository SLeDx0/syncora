# Syncora Panel

Bu surum Netlify uzerinde calismak icin hazirlandi.
Kayit, giris, oturum, Discord baglantisi ve sifre sifirlama verileri canli sitede **Netlify Blobs** ile kalici tutulur.

Canli panel:

```txt
https://syncora.netlify.app
```

## Ana veri sistemi

Varsayilan auth storage:

```env
SYNCORA_AUTH_STORAGE=netlify-blobs
SYNCORA_STORAGE=netlify-blobs
```

phpMyAdmin / MySQL artik zorunlu degildir. Eski MySQL adapteri kodda legacy olarak durur ama sadece bilerek `SYNCORA_AUTH_STORAGE=mysql` yazarsan calisir.

## Netlify kurulumu

Detayli anlatim:

```txt
NETLIFY_BLOBS_KURULUM.md
```

Netlify Environment Variables icin temel degerler:

```env
SYNCORA_STORAGE=netlify-blobs
SYNCORA_AUTH_STORAGE=netlify-blobs
PUBLIC_SITE_URL=https://syncora.netlify.app
APP_URL=https://syncora.netlify.app
SITE_URL=https://syncora.netlify.app
BASE_URL=https://syncora.netlify.app
TOKEN_SECRET=uzun-rastgele-gizli-bir-yazi
```

## Kontrol adresleri

Saglik kontrolu:

```txt
https://syncora.netlify.app/api/health
```

Admin auth ozeti:

```txt
https://syncora.netlify.app/api/admin/auth-export
```

Dogru health sonucunda `authStorage` degeri `netlify-blobs`, `blobs.enabled` true, `mysql.enabled` false olmali.

## Local test

```bash
npm install
npm run check
npm run build:netlify
```

Netlify canli ortaminda veri Netlify Blobs store icinde saklanir:

```txt
Store: syncora-panel-state
Keys: state, auth-users
```
