# Syncora v15.2 optimize edilmiş sürüm

Bu paket v15.2 üzerine güvenli temizlik ve çalışma kontrolü uygulanmış halidir.

## Yapılan ek düzeltmeler

- `app.js` içindeki tekrar eden `renderSecurityCenter` fonksiyonu temizlendi.
- Form oluşturucu geliştirildi: mevcut form artık prompt ile değil, builder alanına yüklenerek düzenlenir.
- Form cevapları artık sadece tarih/isim değil, cevap detaylarıyla birlikte görüntülenir.
- FiveM kayıtlarına kategori filtresi ve arama alanı eklendi.
- Genel/business kayıtlarına kategori filtresi ve arama alanı eklendi.
- Dosya merkezi arayüzünde sistemin dosya/link kaydı olarak çalıştığı daha net gösterildi.
- Discord rol senkronizasyonunda eksik env/rol ayarları daha anlaşılır hata mesajı verir.
- Genel işlem hatalarında kullanıcıya gerçek API hata mesajı gösterilir.
- `npm run check` ve `npm run build:netlify` tekrar çalıştırıldı.
- Lokal API testleriyle register, login cookie, bootstrap, ticket, duyuru, etkinlik, dosya/link, form, form cevapları, görev, FiveM kaydı, business kaydı, arama, backup ve 2FA setup endpointleri kontrol edildi.

## Yayına almadan önce

Canlı panelindeki `data/`, `.env`, `uploads/`, `.git/` ve varsa üretim verilerini direkt ezme. Önce yedek al.

Netlify önerilen ayarlar:

```text
Build command: npm run build:netlify
Publish directory: dist
Functions directory: netlify/functions
Node version: 20
```

Netlify Environment Variables içine gizli değerleri koy:

```env
SYNCORA_STORAGE=netlify-blobs
SYNCORA_AUTH_STORAGE=netlify-blobs
PUBLIC_SITE_URL=https://syncora.netlify.app
APP_URL=https://syncora.netlify.app
SITE_URL=https://syncora.netlify.app
BASE_URL=https://syncora.netlify.app
DISCORD_CLIENT_ID=...
DISCORD_CLIENT_SECRET=...
DISCORD_REDIRECT_URI=https://syncora.netlify.app/discord/callback
DISCORD_BOT_TOKEN=...
DISCORD_GUILD_ID=...
DISCORD_WEBHOOK_URL=...
GMAIL_USER=...
GMAIL_APP_PASSWORD=...
```
