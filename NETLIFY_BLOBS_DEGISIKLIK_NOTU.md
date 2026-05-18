# Yapilan Degisiklikler - Netlify Blobs Surumu

- Varsayilan canli auth storage `netlify-blobs` yapildi.
- `netlify.toml` icindeki `SYNCORA_AUTH_STORAGE=mysql` degeri `netlify-blobs` olarak degistirildi.
- Eski `MYSQL_*` env degerleri var diye panelin otomatik MySQL/phpMyAdmin moduna gecmesi engellendi.
- MySQL adapteri eski kod olarak korundu ama sadece bilerek `SYNCORA_AUTH_STORAGE=mysql` yazilirsa calisacak hale getirildi.
- Kayit/giris/oturum/sifre sifirlama auth snapshot'i `syncora-panel-state` store icindeki `auth-users` keyine yazilacak sekilde guclendirildi.
- Panel state'i `syncora-panel-state` store icindeki `state` keyinde kalici tutulur.
- `/api/health` ciktisina `blobs` alani eklendi.
- `/api/admin/auth-export` endpointi eklendi; admin oturumuyla kullanici sayisi ve public kullanici ozeti gorulebilir.
- Blobs yazimi basarili oldugunda Netlify Functions icinde gereksiz local auth dosyasi yazma denemesi durduruldu.
- Eski phpMyAdmin/MySQL odakli kurulum notlari Blobs kurulumuna yonlendirildi.
- Detayli yeni kurulum dosyasi eklendi: `NETLIFY_BLOBS_KURULUM.md`.

Kontrol komutlari:

```bash
npm run check
npm run build:netlify
```

Ikisi de basarili calisti.
