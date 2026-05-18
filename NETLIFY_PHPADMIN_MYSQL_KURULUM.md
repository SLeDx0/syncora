# Legacy MySQL/phpMyAdmin Notu

Bu dosya eski kurulumdan kaldi ve dosya adi korunuyor.
Yeni canli Netlify kurulumu artik **Netlify Blobs** kullanir.

Kullanman gereken asil dosya:

```txt
NETLIFY_BLOBS_KURULUM.md
```

Canli site icin Netlify Environment Variables:

```env
SYNCORA_STORAGE=netlify-blobs
SYNCORA_AUTH_STORAGE=netlify-blobs
PUBLIC_SITE_URL=https://syncora.netlify.app
APP_URL=https://syncora.netlify.app
SITE_URL=https://syncora.netlify.app
BASE_URL=https://syncora.netlify.app
TOKEN_SECRET=uzun-rastgele-gizli-bir-yazi
```

MySQL/phpMyAdmin sadece legacy/manual moddur. Bilerek kullanmadikca `SYNCORA_AUTH_STORAGE=mysql` yazma.
