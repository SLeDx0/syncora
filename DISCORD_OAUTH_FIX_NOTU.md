# Discord OAuth Frontend Fix Notu

Bu paket, Discord ayarlari Netlify Environment Variables icinde dogru oldugu halde frontend tarafinda eski `.env` uyarisi cikmasi sorununu duzeltir.

Yapilanlar:
- `/api/public-config` cevabina `discordEnabled` eklendi.
- Discord baglanti ekrani artik statik `.env` varsayimina bakmiyor.
- Discord baglanti ekrani `/api/health` icindeki `discord.enabled` sonucunu esas aliyor.
- `/api/health` icinde Discord aktifse buton OAuth akisina gider: `/api/auth/discord/start?mode=connect`.
- Discord ayari eksik uyarisi sadece server gercekten Discord'u kapali dondururse gosterilir.
- Eski manuel Discord ID alanlari silinmedi; personel kayitlari icin durur.
- Client Secret frontend'e gonderilmez; sadece server-side Netlify Function icinde kullanilir.

Deploydan sonra kontrol:
1. `https://syncora.netlify.app/api/health` ac.
2. `discord.enabled: true` gorunmeli.
3. Panele giris yap.
4. Discord bagla butonuna bas.
5. Discord izin ekrani acilmali.
