const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const appI18n = {
  tr: {
    "document.title": "Syncora Panel | Dashboard",
    "views.dashboard": "Ana sayfa",
    "views.personnel": "Personel",
    "views.departments": "Departmanlar",
    "views.servers": "Sunucular",
    "views.operations": "Operasyon",
    "views.records": "Kayitlar",
    "views.integrations": "Entegrasyon",
    "views.logs": "Loglar",
    "views.settings": "Ayarlar",
    "priority.low": "Dusuk",
    "priority.normal": "Normal",
    "priority.high": "Yuksek",
    "nav.core": "Merkez",
    "nav.management": "Yonetim",
    "nav.system": "Sistem",
    "top.eyebrow": "Syncora ortak panel",
    "button.refresh": "Yenile",
    "button.logout": "Cikis",
    "button.save": "Kaydet",
    "button.test": "Test et",
    "button.delete": "Sil",
    "button.connect": "Bagla",
    "button.reconnect": "Yeniden bagla",
    "button.settingsRequired": "Ayar gerekli",
    "common.panel": "Panel",
    "language.label": "Dil",
    "hero.eyebrow": "Canli operasyon",
    "hero.title": "{brand} kontrol merkezi",
    "hero.serverWaiting": "Sunucu beklemede",
    "hero.dataLoading": "Veri hazirlaniyor",
    "hero.activePlayers": "Aktif oyuncu",
    "stat.serverStatus": "Sunucu durumu",
    "stat.activeStaff": "Aktif personel",
    "stat.openTasks": "Acik gorev",
    "stat.operationList": "operasyon listesi",
    "dashboard.departmentActivity": "Departman aktifligi",
    "dashboard.departmentDescription": "Secilen zaman araligindaki aktif personel yogunlugu.",
    "range.hour": "Saatlik",
    "range.day": "Gunluk",
    "range.month": "Aylik",
    "dashboard.metricsChart": "Isletim grafigi",
    "dashboard.serverCards": "Sunucu kartlari",
    "personnel.add": "Personel ekle",
    "personnel.fullName": "Ad soyad",
    "personnel.department": "Departman",
    "personnel.rank": "Rutbe",
    "personnel.discordId": "Discord ID",
    "personnel.fivemIdentifier": "FiveM identifier",
    "personnel.list": "Personel listesi",
    "personnel.search": "Personel ara",
    "personnel.none": "Personel kaydi bulunamadi.",
    "departments.create": "Departman olustur",
    "departments.name": "Departman adi",
    "departments.shortId": "Kisa ID",
    "departments.exampleId": "ornegin: sheriff",
    "departments.color": "Renk",
    "departments.add": "Departman ekle",
    "departments.title": "Departmanlar",
    "departments.description": "Personel ve aktiflik dagilimi.",
    "servers.add": "Sunucu ekle",
    "servers.name": "Sunucu adi",
    "servers.address": "Adres veya cfx kodu",
    "servers.addressPlaceholder": "cfx.re/join/xxxx veya ip:port",
    "servers.enabled": "Aktif",
    "servers.config": "Sunucu konfigurasyonu",
    "servers.configDescription": "Aktif kartlar genel bakisa yansir.",
    "operations.createTask": "Gorev olustur",
    "operations.title": "Baslik",
    "operations.owner": "Sorumlu",
    "operations.priority": "Oncelik",
    "operations.addTask": "Gorev ekle",
    "operations.flow": "Operasyon akisi",
    "operations.clearDone": "Tamamlananlari temizle",
    "operations.notes": "Operasyon notlari",
    "operations.notesDescription": "Paylasimli calisma notlari.",
    "operations.saveNotes": "Notlari kaydet",
    "records.center": "Kayit merkezi",
    "records.description": "Personel, departman ve son gorulme verileri.",
    "records.search": "Kayit ara",
    "integrations.fivem": "FiveM baglantilari",
    "logs.flow": "Log akis",
    "logs.description": "Son 300 panel hareketi.",
    "logs.search": "Log ara",
    "settings.rooms": "Ayar odalari",
    "settings.description": "Panelin genel gorunumu, medya dosyalari ve hesap bilgileri buradan yonetilir.",
    "settings.general": "Genel panel",
    "settings.media": "Gorsel",
    "settings.account": "Hesap bilgileri",
    "settings.brandName": "Marka adi",
    "settings.logoUrl": "Logo URL",
    "settings.backgroundUrl": "Arka plan URL",
    "settings.saveGeneral": "Genel ayarlari kaydet",
    "settings.visual": "Gorsel ayarlari",
    "settings.logoFile": "Logo dosyasi",
    "settings.backgroundFile": "Arka plan dosyasi",
    "settings.uploadHint": "Yuklenen gorseller panelin tamaminda kullanilir.",
    "settings.panelName": "Panel adi",
    "settings.currentPassword": "Mevcut sifre",
    "settings.newPassword": "Yeni sifre",
    "settings.confirmPassword": "Yeni sifre tekrar",
    "settings.saveAccount": "Hesabi kaydet",
    "settings.profileLinks": "Profil baglantilari",
    "tag.roster": "Roster",
    "tag.unit": "Unit",
    "tag.ops": "Ops",
    "tag.admin": "Admin",
    "tag.media": "Media",
    "tag.profile": "Profil",
    "tag.account": "Hesap",
    "tag.status": "Durum",
    "date.none": "Kayit yok",
    "status.active": "Aktif",
    "status.passive": "Pasif",
    "status.waiting": "Beklemede",
    "status.connected": "Bagli",
    "status.offline": "Offline",
    "status.online": "Online",
    "status.passwordEnabled": "Sifre aktif",
    "status.setPassword": "Sifre belirle",
    "status.password": "Sifreli",
    "metric.capacity": "{value}% kapasite",
    "metric.serverCount": "{online}/{total} sunucu",
    "metric.updated": "Guncel: {date}",
    "metric.connections": "{count} baglanti",
    "metric.total": "{count} toplam",
    "metric.records": "{count} kayit",
    "metric.openTasks": "{count} acik gorev",
    "metric.servers": "{count} server",
    "metric.active": "{active}/{total} aktif",
    "metric.activeCount": "{count} aktif",
    "metric.staffCount": "{count} personel",
    "server.noAddress": "Adres yok",
    "server.noAddressEntered": "Adres girilmedi",
    "server.noRecords": "Sunucu kaydi yok.",
    "server.noneAdded": "Sunucu eklenmedi.",
    "server.noFivem": "FiveM baglantisi yok.",
    "server.toggleOff": "Pasifle",
    "server.toggleOn": "Aktif et",
    "department.noRecords": "Departman kaydi yok.",
    "department.none": "Departman yok.",
    "personnel.noDiscord": "Discord ID yok",
    "task.noOwner": "Sorumlu yok",
    "task.open": "Ac",
    "task.done": "Bitir",
    "task.none": "Gorev yok.",
    "record.noServer": "Sunucu yok",
    "record.none": "Kayit bulunamadi.",
    "discord.connected": "Discord bagli",
    "discord.waiting": "Discord beklemede",
    "discord.connect": "Discord bagla",
    "discord.notConfigured": "Discord ayari yok",
    "discord.noEmail": "email yok",
    "discord.integration": "Discord baglantisi",
    "discord.oauthReady": "OAuth2 hazir",
    "discord.envMissing": "Discord ayarlari eksik",
    "discord.profile": "Discord profili",
    "discord.matchAccount": "Hesabini Discord ile eslestirebilirsin.",
    "discord.oauthMissing": "Discord OAuth ayari eksik.",
    "account.defaultUser": "Panel kullanicisi",
    "account.noGmail": "Gmail yok",
    "logs.system": "System",
    "logs.none": "Log bulunamadi.",
    "chart.noData": "Veri yok",
    "chart.waiting": "Grafik icin daha fazla metrik bekleniyor",
    "notice.refreshed": "Panel verileri yenilendi.",
    "notice.refreshFailed": "Veriler yenilenemedi.",
    "notice.languageSaved": "Dil ayari kaydedildi.",
    "notice.languageFailed": "Dil kaydedilemedi.",
    "notice.metricsFailed": "Metrikler okunamadi.",
    "notice.logsFailed": "Loglar okunamadi.",
    "notice.personAdded": "Personel eklendi.",
    "notice.departmentInvalid": "Departman ID gecersiz veya zaten var.",
    "notice.departmentAdded": "Departman eklendi.",
    "notice.serverSaved": "Sunucu kaydedildi.",
    "notice.serverTesting": "Test ediliyor...",
    "notice.serverOnline": "Online: {clients}/{maxClients} oyuncu",
    "notice.serverNoConnection": "Baglanti yok: {error}",
    "notice.serverTestFailed": "Sunucu test edilemedi.",
    "notice.taskCreated": "Gorev olusturuldu.",
    "notice.doneCleared": "Tamamlanan gorevler temizlendi.",
    "notice.notesSaved": "Notlar kaydedildi.",
    "notice.settingsSaved": "Panel ayarlari kaydedildi.",
    "notice.accountMismatch": "Yeni sifre tekrari ayni degil.",
    "notice.accountSaved": "Hesap bilgileri kaydedildi.",
    "notice.accountFailed": "Hesap bilgileri kaydedilemedi.",
    "notice.imageUploaded": "Gorsel yuklendi.",
    "notice.imageFailed": "Gorsel yuklenemedi.",
    "notice.personDeleted": "Personel silindi.",
    "notice.departmentHasPersonnel": "Bu departmanda personel var; once personeli tasi veya sil.",
    "notice.departmentDeleted": "Departman silindi.",
    "notice.serverDeleted": "Sunucu silindi.",
    "notice.serverUpdated": "Sunucu durumu guncellendi.",
    "notice.taskUpdated": "Gorev guncellendi.",
    "notice.taskDeleted": "Gorev silindi.",
    "notice.actionFailed": "Islem tamamlanamadi.",
    "notice.discordConnected": "Discord hesabin panele baglandi.",
    "notice.discordStateError": "Discord oturumu dogrulanamadi, panel oturumun korunuyor.",
    "notice.panelFailed": "Panel baslatilamadi."
  },
  en: {
    "document.title": "Syncora Panel | Dashboard",
    "views.dashboard": "Home",
    "views.personnel": "Personnel",
    "views.departments": "Departments",
    "views.servers": "Servers",
    "views.operations": "Operations",
    "views.records": "Records",
    "views.integrations": "Integrations",
    "views.logs": "Logs",
    "views.settings": "Settings",
    "priority.low": "Low",
    "priority.normal": "Normal",
    "priority.high": "High",
    "nav.core": "Center",
    "nav.management": "Management",
    "nav.system": "System",
    "top.eyebrow": "Syncora shared panel",
    "button.refresh": "Refresh",
    "button.logout": "Logout",
    "button.save": "Save",
    "button.test": "Test",
    "button.delete": "Delete",
    "button.connect": "Connect",
    "button.reconnect": "Reconnect",
    "button.settingsRequired": "Settings required",
    "common.panel": "Panel",
    "language.label": "Language",
    "hero.eyebrow": "Live operation",
    "hero.title": "{brand} control center",
    "hero.serverWaiting": "Server waiting",
    "hero.dataLoading": "Preparing data",
    "hero.activePlayers": "Active players",
    "stat.serverStatus": "Server status",
    "stat.activeStaff": "Active staff",
    "stat.openTasks": "Open tasks",
    "stat.operationList": "operation list",
    "dashboard.departmentActivity": "Department activity",
    "dashboard.departmentDescription": "Active personnel density in the selected time range.",
    "range.hour": "Hourly",
    "range.day": "Daily",
    "range.month": "Monthly",
    "dashboard.metricsChart": "Operations graph",
    "dashboard.serverCards": "Server cards",
    "personnel.add": "Add personnel",
    "personnel.fullName": "Full name",
    "personnel.department": "Department",
    "personnel.rank": "Rank",
    "personnel.discordId": "Discord ID",
    "personnel.fivemIdentifier": "FiveM identifier",
    "personnel.list": "Personnel list",
    "personnel.search": "Search personnel",
    "personnel.none": "No personnel records found.",
    "departments.create": "Create department",
    "departments.name": "Department name",
    "departments.shortId": "Short ID",
    "departments.exampleId": "example: sheriff",
    "departments.color": "Color",
    "departments.add": "Add department",
    "departments.title": "Departments",
    "departments.description": "Personnel and activity distribution.",
    "servers.add": "Add server",
    "servers.name": "Server name",
    "servers.address": "Address or cfx code",
    "servers.addressPlaceholder": "cfx.re/join/xxxx or ip:port",
    "servers.enabled": "Enabled",
    "servers.config": "Server configuration",
    "servers.configDescription": "Enabled cards appear in the overview.",
    "operations.createTask": "Create task",
    "operations.title": "Title",
    "operations.owner": "Owner",
    "operations.priority": "Priority",
    "operations.addTask": "Add task",
    "operations.flow": "Operations flow",
    "operations.clearDone": "Clear completed",
    "operations.notes": "Operation notes",
    "operations.notesDescription": "Shared working notes.",
    "operations.saveNotes": "Save notes",
    "records.center": "Record center",
    "records.description": "Personnel, department, and last-seen data.",
    "records.search": "Search records",
    "integrations.fivem": "FiveM connections",
    "logs.flow": "Log stream",
    "logs.description": "Latest 300 panel actions.",
    "logs.search": "Search logs",
    "settings.rooms": "Settings rooms",
    "settings.description": "Manage the panel appearance, media files, and account details here.",
    "settings.general": "General panel",
    "settings.media": "Visual",
    "settings.account": "Account details",
    "settings.brandName": "Brand name",
    "settings.logoUrl": "Logo URL",
    "settings.backgroundUrl": "Background URL",
    "settings.saveGeneral": "Save general settings",
    "settings.visual": "Visual settings",
    "settings.logoFile": "Logo file",
    "settings.backgroundFile": "Background file",
    "settings.uploadHint": "Uploaded images are used across the panel.",
    "settings.panelName": "Panel name",
    "settings.currentPassword": "Current password",
    "settings.newPassword": "New password",
    "settings.confirmPassword": "Repeat new password",
    "settings.saveAccount": "Save account",
    "settings.profileLinks": "Profile links",
    "tag.roster": "Roster",
    "tag.unit": "Unit",
    "tag.ops": "Ops",
    "tag.admin": "Admin",
    "tag.media": "Media",
    "tag.profile": "Profile",
    "tag.account": "Account",
    "tag.status": "Status",
    "date.none": "No record",
    "status.active": "Active",
    "status.passive": "Passive",
    "status.waiting": "Waiting",
    "status.connected": "Connected",
    "status.offline": "Offline",
    "status.online": "Online",
    "status.passwordEnabled": "Password active",
    "status.setPassword": "Set password",
    "status.password": "Password",
    "metric.capacity": "{value}% capacity",
    "metric.serverCount": "{online}/{total} servers",
    "metric.updated": "Updated: {date}",
    "metric.connections": "{count} connections",
    "metric.total": "{count} total",
    "metric.records": "{count} records",
    "metric.openTasks": "{count} open tasks",
    "metric.servers": "{count} servers",
    "metric.active": "{active}/{total} active",
    "metric.activeCount": "{count} active",
    "metric.staffCount": "{count} personnel",
    "server.noAddress": "No address",
    "server.noAddressEntered": "No address entered",
    "server.noRecords": "No server records.",
    "server.noneAdded": "No servers added.",
    "server.noFivem": "No FiveM connection.",
    "server.toggleOff": "Disable",
    "server.toggleOn": "Enable",
    "department.noRecords": "No department records.",
    "department.none": "No departments.",
    "personnel.noDiscord": "No Discord ID",
    "task.noOwner": "No owner",
    "task.open": "Open",
    "task.done": "Complete",
    "task.none": "No tasks.",
    "record.noServer": "No server",
    "record.none": "No records found.",
    "discord.connected": "Discord connected",
    "discord.waiting": "Discord waiting",
    "discord.connect": "Connect Discord",
    "discord.notConfigured": "Discord not configured",
    "discord.noEmail": "no email",
    "discord.integration": "Discord connection",
    "discord.oauthReady": "OAuth2 ready",
    "discord.envMissing": "Discord settings are missing",
    "discord.profile": "Discord profile",
    "discord.matchAccount": "You can match your account with Discord.",
    "discord.oauthMissing": "Discord OAuth settings are missing.",
    "account.defaultUser": "Panel user",
    "account.noGmail": "No Gmail",
    "logs.system": "System",
    "logs.none": "No logs found.",
    "chart.noData": "No data",
    "chart.waiting": "Waiting for more metrics for the chart",
    "notice.refreshed": "Panel data refreshed.",
    "notice.refreshFailed": "Data could not be refreshed.",
    "notice.languageSaved": "Language setting saved.",
    "notice.languageFailed": "Language could not be saved.",
    "notice.metricsFailed": "Metrics could not be read.",
    "notice.logsFailed": "Logs could not be read.",
    "notice.personAdded": "Personnel added.",
    "notice.departmentInvalid": "Department ID is invalid or already exists.",
    "notice.departmentAdded": "Department added.",
    "notice.serverSaved": "Server saved.",
    "notice.serverTesting": "Testing...",
    "notice.serverOnline": "Online: {clients}/{maxClients} players",
    "notice.serverNoConnection": "No connection: {error}",
    "notice.serverTestFailed": "Server test failed.",
    "notice.taskCreated": "Task created.",
    "notice.doneCleared": "Completed tasks cleared.",
    "notice.notesSaved": "Notes saved.",
    "notice.settingsSaved": "Panel settings saved.",
    "notice.accountMismatch": "New password repeat does not match.",
    "notice.accountSaved": "Account details saved.",
    "notice.accountFailed": "Account details could not be saved.",
    "notice.imageUploaded": "Image uploaded.",
    "notice.imageFailed": "Image could not be uploaded.",
    "notice.personDeleted": "Personnel deleted.",
    "notice.departmentHasPersonnel": "This department has personnel; move or delete the personnel first.",
    "notice.departmentDeleted": "Department deleted.",
    "notice.serverDeleted": "Server deleted.",
    "notice.serverUpdated": "Server status updated.",
    "notice.taskUpdated": "Task updated.",
    "notice.taskDeleted": "Task deleted.",
    "notice.actionFailed": "Action could not be completed.",
    "notice.discordConnected": "Your Discord account was connected to the panel.",
    "notice.discordStateError": "Discord session could not be verified; your panel session is preserved.",
    "notice.panelFailed": "Panel could not be started."
  },
  ru: {
    "document.title": "Syncora Panel | Dashboard",
    "views.dashboard": "Glavnaya",
    "views.personnel": "Personal",
    "views.departments": "Otdely",
    "views.servers": "Servery",
    "views.operations": "Operatsii",
    "views.records": "Zapisi",
    "views.integrations": "Integratsii",
    "views.logs": "Logi",
    "views.settings": "Nastroyki",
    "priority.low": "Nizkiy",
    "priority.normal": "Normalnyy",
    "priority.high": "Vysokiy",
    "nav.core": "Tsentr",
    "nav.management": "Upravlenie",
    "nav.system": "Sistema",
    "top.eyebrow": "Obshchaya panel Syncora",
    "button.refresh": "Obnovit",
    "button.logout": "Vyhod",
    "button.save": "Sohranit",
    "button.test": "Test",
    "button.delete": "Udalit",
    "button.connect": "Podklyuchit",
    "button.reconnect": "Podklyuchit snova",
    "button.settingsRequired": "Nuzhny nastroyki",
    "common.panel": "Panel",
    "language.label": "Yazyk",
    "hero.eyebrow": "Zhivaya operatsiya",
    "hero.title": "Tsentr upravleniya {brand}",
    "hero.serverWaiting": "Server ozhidaet",
    "hero.dataLoading": "Dannye gotovyatsya",
    "hero.activePlayers": "Aktivnye igroki",
    "stat.serverStatus": "Status servera",
    "stat.activeStaff": "Aktivnyy personal",
    "stat.openTasks": "Otkrytye zadachi",
    "stat.operationList": "spisok operatsiy",
    "dashboard.departmentActivity": "Aktivnost otdelov",
    "dashboard.departmentDescription": "Plotnost aktivnogo personala za vybrannyy period.",
    "range.hour": "Chas",
    "range.day": "Den",
    "range.month": "Mesyats",
    "dashboard.metricsChart": "Grafik operatsiy",
    "dashboard.serverCards": "Kartochki serverov",
    "personnel.add": "Dobavit personal",
    "personnel.fullName": "Imya i familiya",
    "personnel.department": "Otdel",
    "personnel.rank": "Rang",
    "personnel.discordId": "Discord ID",
    "personnel.fivemIdentifier": "FiveM identifier",
    "personnel.list": "Spisok personala",
    "personnel.search": "Poisk personala",
    "personnel.none": "Zapisi personala ne naydeny.",
    "departments.create": "Sozdat otdel",
    "departments.name": "Nazvanie otdela",
    "departments.shortId": "Korotkiy ID",
    "departments.exampleId": "primer: sheriff",
    "departments.color": "Tsvet",
    "departments.add": "Dobavit otdel",
    "departments.title": "Otdely",
    "departments.description": "Raspredelenie personala i aktivnosti.",
    "servers.add": "Dobavit server",
    "servers.name": "Nazvanie servera",
    "servers.address": "Adres ili cfx kod",
    "servers.addressPlaceholder": "cfx.re/join/xxxx ili ip:port",
    "servers.enabled": "Aktiven",
    "servers.config": "Konfiguratsiya servera",
    "servers.configDescription": "Aktivnye kartochki pokazyvayutsya v obzore.",
    "operations.createTask": "Sozdat zadachu",
    "operations.title": "Zagolovok",
    "operations.owner": "Otvetstvennyy",
    "operations.priority": "Prioritet",
    "operations.addTask": "Dobavit zadachu",
    "operations.flow": "Hod operatsiy",
    "operations.clearDone": "Ochistit vypolnennye",
    "operations.notes": "Zametki operatsiy",
    "operations.notesDescription": "Obshchie rabochie zametki.",
    "operations.saveNotes": "Sohranit zametki",
    "records.center": "Tsentr zapisey",
    "records.description": "Personal, otdely i dannye posledney aktivnosti.",
    "records.search": "Poisk zapisey",
    "integrations.fivem": "FiveM podklyucheniya",
    "logs.flow": "Potok logov",
    "logs.description": "Poslednie 300 deystviy paneli.",
    "logs.search": "Poisk logov",
    "settings.rooms": "Razdely nastroyek",
    "settings.description": "Zdes upravlyayutsya vid paneli, mediafayly i dannye akkaunta.",
    "settings.general": "Obshchaya panel",
    "settings.media": "Vizual",
    "settings.account": "Danye akkaunta",
    "settings.brandName": "Nazvanie brenda",
    "settings.logoUrl": "Logo URL",
    "settings.backgroundUrl": "Fon URL",
    "settings.saveGeneral": "Sohranit obshchie nastroyki",
    "settings.visual": "Vizualnye nastroyki",
    "settings.logoFile": "Fayl logo",
    "settings.backgroundFile": "Fayl fona",
    "settings.uploadHint": "Zagruzhennye izobrazheniya ispolzuyutsya vo vsey paneli.",
    "settings.panelName": "Imya paneli",
    "settings.currentPassword": "Tekushchiy parol",
    "settings.newPassword": "Novyy parol",
    "settings.confirmPassword": "Povtor novogo parolya",
    "settings.saveAccount": "Sohranit akkaunt",
    "settings.profileLinks": "Svyazi profilya",
    "tag.roster": "Roster",
    "tag.unit": "Unit",
    "tag.ops": "Ops",
    "tag.admin": "Admin",
    "tag.media": "Media",
    "tag.profile": "Profil",
    "tag.account": "Akkaunt",
    "tag.status": "Status",
    "date.none": "Net zapisi",
    "status.active": "Aktiven",
    "status.passive": "Passiven",
    "status.waiting": "Ozhidanie",
    "status.connected": "Podklyuchen",
    "status.offline": "Offline",
    "status.online": "Online",
    "status.passwordEnabled": "Parol aktiven",
    "status.setPassword": "Zadat parol",
    "status.password": "S parolem",
    "metric.capacity": "{value}% emkosti",
    "metric.serverCount": "{online}/{total} serverov",
    "metric.updated": "Obnovleno: {date}",
    "metric.connections": "{count} podklyucheniy",
    "metric.total": "{count} vsego",
    "metric.records": "{count} zapisey",
    "metric.openTasks": "{count} otkrytyh zadach",
    "metric.servers": "{count} serverov",
    "metric.active": "{active}/{total} aktivno",
    "metric.activeCount": "{count} aktivno",
    "metric.staffCount": "{count} personal",
    "server.noAddress": "Net adresa",
    "server.noAddressEntered": "Adres ne vveden",
    "server.noRecords": "Net zapisey servera.",
    "server.noneAdded": "Servery ne dobavleny.",
    "server.noFivem": "Net FiveM podklyucheniya.",
    "server.toggleOff": "Otklyuchit",
    "server.toggleOn": "Vklyuchit",
    "department.noRecords": "Net zapisey otdelov.",
    "department.none": "Net otdelov.",
    "personnel.noDiscord": "Net Discord ID",
    "task.noOwner": "Net otvetstvennogo",
    "task.open": "Otkryt",
    "task.done": "Zavershit",
    "task.none": "Net zadach.",
    "record.noServer": "Net servera",
    "record.none": "Zapisi ne naydeny.",
    "discord.connected": "Discord podklyuchen",
    "discord.waiting": "Discord ozhidaet",
    "discord.connect": "Podklyuchit Discord",
    "discord.notConfigured": "Discord ne nastroen",
    "discord.noEmail": "net email",
    "discord.integration": "Discord podklyuchenie",
    "discord.oauthReady": "OAuth2 gotov",
    "discord.envMissing": "Nastroyki Discord otsutstvuyut",
    "discord.profile": "Discord profil",
    "discord.matchAccount": "Mozhno svyazat akkaunt s Discord.",
    "discord.oauthMissing": "Nastroyki Discord OAuth otsutstvuyut.",
    "account.defaultUser": "Polzovatel paneli",
    "account.noGmail": "Net Gmail",
    "logs.system": "System",
    "logs.none": "Logi ne naydeny.",
    "chart.noData": "Net dannyh",
    "chart.waiting": "Dlya grafika nuzhno bolshe metrik",
    "notice.refreshed": "Dannye paneli obnovleny.",
    "notice.refreshFailed": "Dannye ne obnovleny.",
    "notice.languageSaved": "Yazyk sohranen.",
    "notice.languageFailed": "Yazyk ne sohranen.",
    "notice.metricsFailed": "Metriki ne prochitany.",
    "notice.logsFailed": "Logi ne prochitany.",
    "notice.personAdded": "Personal dobavlen.",
    "notice.departmentInvalid": "ID otdela nevernyy ili uzhe est.",
    "notice.departmentAdded": "Otdel dobavlen.",
    "notice.serverSaved": "Server sohranen.",
    "notice.serverTesting": "Testiruetsya...",
    "notice.serverOnline": "Online: {clients}/{maxClients} igrokov",
    "notice.serverNoConnection": "Net podklyucheniya: {error}",
    "notice.serverTestFailed": "Test servera ne udalsya.",
    "notice.taskCreated": "Zadacha sozdana.",
    "notice.doneCleared": "Vypolnennye zadachi ochishcheny.",
    "notice.notesSaved": "Zametki sohraneny.",
    "notice.settingsSaved": "Nastroyki paneli sohraneny.",
    "notice.accountMismatch": "Povtor novogo parolya ne sovpadaet.",
    "notice.accountSaved": "Danye akkaunta sohraneny.",
    "notice.accountFailed": "Danye akkaunta ne sohraneny.",
    "notice.imageUploaded": "Izobrazhenie zagruzheno.",
    "notice.imageFailed": "Izobrazhenie ne zagruzheno.",
    "notice.personDeleted": "Personal udalen.",
    "notice.departmentHasPersonnel": "V etom otdele est personal; snachala perenesite ili udalitie ego.",
    "notice.departmentDeleted": "Otdel udalen.",
    "notice.serverDeleted": "Server udalen.",
    "notice.serverUpdated": "Status servera obnovlen.",
    "notice.taskUpdated": "Zadacha obnovlena.",
    "notice.taskDeleted": "Zadacha udalena.",
    "notice.actionFailed": "Deystvie ne vypolneno.",
    "notice.discordConnected": "Discord akkaunt podklyuchen k paneli.",
    "notice.discordStateError": "Sessiya Discord ne proverena; sessiya paneli sohranena.",
    "notice.panelFailed": "Panel ne zapushchena."
  }
};

const viewTitleKeys = {
  dashboard: "views.dashboard",
  personnel: "views.personnel",
  departments: "views.departments",
  servers: "views.servers",
  operations: "views.operations",
  records: "views.records",
  integrations: "views.integrations",
  logs: "views.logs",
  settings: "views.settings"
};

let me = null;
let settings = null;
let appLang = localStorage.getItem("syncora_lang") || "tr";
let discordEnabled = false;
let currentStatus = null;
let currentMetrics = null;
let currentRange = "hour";
let personnel = [];
let tasks = [];
let notes = { general: "", operations: "" };
let latestLogs = [];

function normalizeLanguage(language) {
  if (language === "rs") return "ru";
  return ["tr", "en", "ru"].includes(language) ? language : "tr";
}

function currentLanguage() {
  return normalizeLanguage(settings?.language || appLang);
}

function t(key, vars = {}) {
  const template = appI18n[currentLanguage()]?.[key] || appI18n.tr[key] || key;
  return template.replace(/\{(\w+)\}/g, (_, name) => (vars[name] ?? ""));
}

function viewTitle(view) {
  return t(viewTitleKeys[view] || viewTitleKeys.dashboard);
}

function priorityLabel(priority) {
  return t(`priority.${priority || "normal"}`);
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: "include",
    headers: { "content-type": "application/json" },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (response.status === 401) {
    window.location.href = "/index.html";
    throw new Error("auth_required");
  }
  if (!response.ok) {
    const error = new Error(data.message || data.error || "request_failed");
    error.data = data;
    throw error;
  }
  return data;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function departmentName(department) {
  if (!department) return "";
  if (typeof department.name === "string") return department.name;
  const lang = currentLanguage();
  return department.name?.[lang] || department.name?.tr || department.name?.en || department.name?.ru || department.id;
}

function getDepartment(id) {
  return settings?.departments?.find((department) => department.id === id);
}

function formatDate(value) {
  if (!value) return t("date.none");
  const locales = { tr: "tr-TR", en: "en-US", ru: "ru-RU" };
  return new Intl.DateTimeFormat(locales[currentLanguage()] || "tr-TR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function showNotice(message, error = false) {
  const notice = $("#appNotice");
  notice.textContent = message;
  notice.classList.toggle("error", error);
  notice.classList.remove("hidden");
  clearTimeout(showNotice.timer);
  showNotice.timer = setTimeout(() => notice.classList.add("hidden"), 3600);
}

function emptyState(message) {
  return `<div class="empty-state">${escapeHtml(message)}</div>`;
}

function translateStatic() {
  appLang = currentLanguage();
  localStorage.setItem("syncora_lang", appLang);
  document.documentElement.lang = appLang;
  document.title = t("document.title");

  $$("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  $$("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
  $$("[data-i18n-aria-label]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
  });

  const activeView = $(".view.active")?.id?.replace("View", "") || "dashboard";
  $("#pageTitle").textContent = viewTitle(activeView);
}

function applySettings() {
  document.body.style.setProperty("--bg-image", settings.backgroundUrl ? `url("${settings.backgroundUrl}")` : "none");
  $("#sideBrand").textContent = settings.brandName || "Syncora Roleplay";
  const brandImage = settings.logoUrl || "/syncora-pp.png";
  document.body.style.setProperty("--brand-image", `url("${brandImage}")`);
  $("#sideLogo").src = brandImage;
  translateStatic();
  $("#heroTitle").textContent = t("hero.title", { brand: settings.brandName || "Syncora RP" });
  $("#languageSelect").value = settings.language || "tr";
  $("#settingsBrandName").value = settings.brandName || "Syncora Roleplay";
  $("#settingsLanguage").value = settings.language || "tr";
  $("#settingsLogoUrl").value = brandImage;
  $("#settingsBackgroundUrl").value = settings.backgroundUrl || "";
  renderAccountSettings();
  renderDepartmentOptions();
  renderDiscordBox();
}

function renderDiscordBox() {
  const discord = me?.discord;
  if (discord) {
    const avatar = discord.avatar
      ? `https://cdn.discordapp.com/avatars/${discord.id}/${discord.avatar}.png?size=96`
      : settings.logoUrl || "/syncora-pp.png";
    $("#discordBox").innerHTML = `
      <div class="discord-profile">
        <img src="${escapeHtml(avatar)}" alt="">
        <div>
          <strong>${escapeHtml(discord.globalName || discord.username || me.name)}</strong>
          <span>ID ${escapeHtml(discord.id)}</span>
        </div>
      </div>
      <a class="discord-link" href="/discord.html?mode=connect">${t("discord.connected")}</a>
    `;
    return;
  }

  $("#discordBox").innerHTML = `
    <div class="discord-profile">
      <img src="${escapeHtml(settings.logoUrl || "/syncora-pp.png")}" alt="">
      <div>
        <strong>${escapeHtml(me?.name || t("common.panel"))}</strong>
        <span>${t("discord.waiting")}</span>
      </div>
    </div>
    <a class="discord-link" href="/discord.html?mode=connect">${discordEnabled ? t("discord.connect") : t("discord.notConfigured")}</a>
  `;
}

function renderDepartmentOptions() {
  const options = (settings.departments || [])
    .map((department) => `<option value="${escapeHtml(department.id)}">${escapeHtml(departmentName(department))}</option>`)
    .join("");
  $("#personnelDepartment").innerHTML = options;
}

function switchView(view) {
  const target = viewTitleKeys[view] ? view : "dashboard";
  $$(".view").forEach((section) => section.classList.toggle("active", section.id === `${target}View`));
  $$("[data-view]").forEach((button) => button.classList.toggle("active", button.dataset.view === target));
  $("#pageTitle").textContent = viewTitle(target);
  window.location.hash = target;
  if (target === "dashboard") {
    drawDepartmentChart();
    drawMetricsChart();
  }
}

async function loadStatus() {
  currentStatus = await api("/api/status");
  renderStatus();
}

async function loadMetrics(range = currentRange) {
  currentRange = range;
  currentMetrics = await api(`/api/metrics?range=${encodeURIComponent(range)}`);
  renderMetrics();
}

async function loadPersonnel() {
  const data = await api("/api/personnel");
  personnel = data.personnel || [];
  renderPersonnel();
  renderDepartmentCards();
  renderRecords();
}

async function loadWorkspace() {
  const data = await api("/api/workspace");
  tasks = data.tasks || [];
  notes = data.notes || { general: "", operations: "" };
  renderTasks();
  $("#operationsNotes").value = notes.operations || "";
}

async function loadLogs() {
  const data = await api("/api/logs");
  latestLogs = data.logs || [];
  renderLogs();
}

async function refreshAll() {
  await Promise.all([loadStatus(), loadMetrics(), loadPersonnel(), loadWorkspace(), loadLogs()]);
  showNotice(t("notice.refreshed"));
}

function renderStatus() {
  const status = currentStatus || {
    totalPlayers: 0,
    maxPlayers: 0,
    activePersonnel: 0,
    servers: [],
    departments: [],
    personnel: []
  };
  const onlineServers = (status.servers || []).filter((server) => server.online).length;
  const totalServers = (status.servers || []).length;
  const capacity = status.maxPlayers ? Math.round((status.totalPlayers / status.maxPlayers) * 100) : 0;
  const onlineText = onlineServers > 0 ? t("status.active") : t("status.waiting");
  const openTasks = tasks.filter((task) => task.status !== "done").length;

  $("#heroPlayers").textContent = status.totalPlayers || 0;
  $("#heroCapacity").textContent = t("metric.capacity", { value: capacity });
  $("#heroServerState").textContent = `${onlineText} | ${t("metric.serverCount", { online: onlineServers, total: totalServers })}`;
  $("#heroUpdated").textContent = t("metric.updated", { date: formatDate(status.generatedAt) });
  $("#totalPlayers").textContent = `${status.totalPlayers || 0}/${status.maxPlayers || 0}`;
  $("#playerCapacity").textContent = t("metric.capacity", { value: capacity });
  $("#serverState").textContent = onlineText;
  $("#onlineServers").textContent = t("metric.connections", { count: onlineServers });
  $("#activePersonnel").textContent = status.activePersonnel || 0;
  $("#staffRatio").textContent = t("metric.total", { count: personnel.length });
  $("#openTaskCount").textContent = openTasks;

  renderServerCards();
  renderDepartmentSummary();
  renderIntegrationServers();
  renderRecords();
}

function renderMetrics() {
  renderDepartmentSummary();
  drawDepartmentChart();
  drawMetricsChart();
  $$("[data-range]").forEach((button) => button.classList.toggle("active", button.dataset.range === currentRange));
}

function renderServerCards() {
  const servers = currentStatus?.servers || [];
  $("#serverList").innerHTML = servers.length
    ? servers.map((server) => `
      <div class="data-row">
        <div>
          <strong>${escapeHtml(server.name)}</strong>
          <span>${escapeHtml(server.hostname || server.address || t("server.noAddress"))}</span>
        </div>
        <span class="status-pill ${server.online ? "online" : "offline"}">${server.online ? `${server.clients}/${server.maxClients}` : t("status.offline")}</span>
      </div>
    `).join("")
    : emptyState(t("server.noRecords"));
}

function renderServerConfig() {
  const servers = settings.servers || [];
  $("#serverConfigList").innerHTML = servers.length
    ? servers.map((server) => `
      <div class="data-row">
        <div>
          <strong>${escapeHtml(server.name)}</strong>
          <span>${escapeHtml(server.address || t("server.noAddressEntered"))}</span>
        </div>
        <div class="button-row">
          <span class="status-pill ${server.enabled ? "online" : "offline"}">${server.enabled ? t("status.active") : t("status.passive")}</span>
          <button class="icon-btn" type="button" data-toggle-server="${escapeHtml(server.id)}">${server.enabled ? t("server.toggleOff") : t("server.toggleOn")}</button>
          <button class="icon-btn danger" type="button" data-delete-server="${escapeHtml(server.id)}">${t("button.delete")}</button>
        </div>
      </div>
    `).join("")
    : emptyState(t("server.noneAdded"));
  renderIntegrationServers();
}

function renderIntegrationServers() {
  const servers = settings?.servers || [];
  $("#integrationServerCount").textContent = t("metric.servers", { count: servers.length });
  $("#integrationServers").innerHTML = servers.length
    ? servers.map((server) => {
      const live = (currentStatus?.servers || []).find((item) => item.id === server.id);
      return `
        <div class="data-row">
          <div>
            <strong>${escapeHtml(server.name)}</strong>
            <span>${escapeHtml(server.address || t("server.noAddress"))}</span>
          </div>
          <span class="status-pill ${live?.online ? "online" : "offline"}">${live?.online ? `${live.clients}/${live.maxClients}` : t("status.waiting")}</span>
        </div>
      `;
    }).join("")
    : emptyState(t("server.noFivem"));
}

function renderDepartmentSummary() {
  const totals = currentMetrics?.departmentTotals || {};
  const departments = currentMetrics?.departments || settings?.departments || [];
  $("#departmentSummary").innerHTML = departments.length
    ? departments.map((department) => {
      const live = (currentStatus?.departments || []).find((item) => item.id === department.id);
      const total = Number(totals[department.id] || 0);
      return `
        <div class="data-row">
          <div>
            <strong>${escapeHtml(departmentName(department))}</strong>
            <span>${t("metric.active", { active: live?.active || 0, total: live?.total || 0 })}</span>
          </div>
          <span class="tag">${total}</span>
        </div>
      `;
    }).join("")
    : emptyState(t("department.noRecords"));
}

function renderPersonnel() {
  const query = ($("#personnelSearch")?.value || "").trim().toLowerCase();
  const statusPeople = currentStatus?.personnel || [];
  const rows = personnel
    .filter((person) => {
      const haystack = `${person.name} ${person.rank} ${person.discordId} ${person.fivemIdentifier}`.toLowerCase();
      return !query || haystack.includes(query);
    })
    .map((person) => {
      const live = statusPeople.find((item) => item.id === person.id);
      const department = getDepartment(person.department);
      return `
        <tr>
          <td><strong>${escapeHtml(person.name)}</strong><br><span class="subtle">${escapeHtml(person.discordId || t("personnel.noDiscord"))}</span></td>
          <td>${escapeHtml(departmentName(department) || person.department)}</td>
          <td>${escapeHtml(person.rank || "-")}</td>
          <td><span class="status-pill ${live?.active ? "online" : "offline"}">${live?.active ? t("status.active") : t("status.passive")}</span></td>
          <td><button class="icon-btn danger" type="button" data-delete-person="${escapeHtml(person.id)}">${t("button.delete")}</button></td>
        </tr>
      `;
    })
    .join("");

  $("#personnelCount").textContent = t("metric.records", { count: personnel.length });
  $("#personnelTable").innerHTML = rows || `<tr><td colspan="5">${emptyState(t("personnel.none"))}</td></tr>`;
  $("#staffRatio").textContent = t("metric.total", { count: personnel.length });
}

function renderDepartmentCards() {
  const liveDepartments = currentStatus?.departments || [];
  $("#departmentCards").innerHTML = (settings.departments || []).map((department) => {
    const live = liveDepartments.find((item) => item.id === department.id);
    const departmentPersonnel = personnel.filter((person) => person.department === department.id);
    return `
      <article class="department-card">
        <div class="department-color" style="background:${escapeHtml(department.color || "#26dfff")}"></div>
        <h3>${escapeHtml(departmentName(department))}</h3>
        <div class="department-meta">
          <span class="status-pill online">${t("metric.activeCount", { count: live?.active || 0 })}</span>
          <span class="status-pill">${t("metric.staffCount", { count: departmentPersonnel.length })}</span>
        </div>
        <button class="ghost-btn danger" type="button" data-delete-department="${escapeHtml(department.id)}">${t("button.delete")}</button>
      </article>
    `;
  }).join("") || emptyState(t("department.none"));
}

function renderTasks() {
  const openTasks = tasks.filter((task) => task.status !== "done").length;
  $("#openTaskCount").textContent = openTasks;
  $("#taskCount").textContent = t("metric.openTasks", { count: openTasks });
  $("#taskList").innerHTML = tasks.length
    ? tasks.map((task) => `
      <article class="task-item ${task.status === "done" ? "done" : ""}">
        <div>
          <strong>${escapeHtml(task.title)}</strong>
          <div class="task-meta">
            <span>${escapeHtml(task.owner || t("task.noOwner"))}</span>
            <span class="priority-pill ${escapeHtml(task.priority)}">${priorityLabel(task.priority)}</span>
            <span>${formatDate(task.createdAt)}</span>
          </div>
        </div>
        <div class="task-actions">
          <button class="icon-btn" type="button" data-toggle-task="${escapeHtml(task.id)}">${task.status === "done" ? t("task.open") : t("task.done")}</button>
          <button class="icon-btn danger" type="button" data-delete-task="${escapeHtml(task.id)}">${t("button.delete")}</button>
        </div>
      </article>
    `).join("")
    : emptyState(t("task.none"));
}

function renderRecords() {
  const query = ($("#recordSearch")?.value || "").trim().toLowerCase();
  const statusPeople = currentStatus?.personnel || [];
  const rows = personnel
    .filter((person) => {
      const department = getDepartment(person.department);
      const haystack = `${person.name} ${person.rank} ${departmentName(department)} ${person.lastActiveServer || ""}`.toLowerCase();
      return !query || haystack.includes(query);
    })
    .map((person) => {
      const live = statusPeople.find((item) => item.id === person.id);
      const department = getDepartment(person.department);
      return `
        <article class="record-card">
          <strong>${escapeHtml(person.name)}</strong>
          <span>${escapeHtml(person.rank || "-")} | ${escapeHtml(departmentName(department) || person.department)}</span>
          <div class="record-meta">
            <span class="status-pill ${live?.active ? "online" : "offline"}">${live?.active ? t("status.online") : t("status.offline")}</span>
            <span>${escapeHtml(live?.serverName || person.lastActiveServer || t("record.noServer"))}</span>
            <span>${formatDate(person.lastSeenAt || person.createdAt)}</span>
          </div>
        </article>
      `;
    });
  $("#recordsList").innerHTML = rows.join("") || emptyState(t("record.none"));
}

function renderDiscordIntegration() {
  const discord = me?.discord;
  $("#discordStateTag").textContent = discord ? t("status.connected") : t("status.waiting");
  $("#discordIntegration").innerHTML = discord
    ? `
      <div class="data-row">
        <div>
          <strong>${escapeHtml(discord.globalName || discord.username || me.name)}</strong>
          <span>ID ${escapeHtml(discord.id)} | ${escapeHtml(discord.email || t("discord.noEmail"))}</span>
        </div>
        <a class="ghost-btn" href="/discord.html?mode=connect">${t("button.reconnect")}</a>
      </div>
    `
    : `
      <div class="data-row">
        <div>
          <strong>${t("discord.integration")}</strong>
          <span>${discordEnabled ? t("discord.oauthReady") : t("discord.envMissing")}</span>
        </div>
        <a class="ghost-btn" href="/discord.html?mode=connect">${discordEnabled ? t("button.connect") : t("button.settingsRequired")}</a>
      </div>
    `;
}

function renderAccountSettings() {
  if (!me || !$("#accountForm")) return;
  $("#accountName").value = me.name || "";
  $("#accountEmail").value = me.email || "";
  $("#accountPasswordTag").textContent = me.hasPassword ? t("status.passwordEnabled") : t("status.setPassword");
  $("#accountSummary").innerHTML = `
    <div class="data-row">
      <div>
        <strong>${escapeHtml(me.name || t("account.defaultUser"))}</strong>
        <span>${escapeHtml(me.email || t("account.noGmail"))} | ${escapeHtml(me.role || "member")}</span>
      </div>
      <span class="status-pill online">${me.hasPassword ? t("status.password") : "Discord"}</span>
    </div>
  `;

  const discord = me.discord;
  $("#settingsDiscordProfile").innerHTML = discord
    ? `
      <div class="data-row">
        <div>
          <strong>${escapeHtml(discord.globalName || discord.username || "Discord")}</strong>
          <span>Discord ID ${escapeHtml(discord.id)}</span>
        </div>
        <a class="ghost-btn" href="/discord.html?mode=connect">${t("button.reconnect")}</a>
      </div>
    `
    : `
      <div class="data-row">
        <div>
          <strong>${t("discord.profile")}</strong>
          <span>${discordEnabled ? t("discord.matchAccount") : t("discord.oauthMissing")}</span>
        </div>
        <a class="ghost-btn" href="/discord.html?mode=connect">${discordEnabled ? t("discord.connect") : t("button.settingsRequired")}</a>
      </div>
    `;
}

function switchSettingsRoom(room) {
  const target = ["general", "media", "account"].includes(room) ? room : "general";
  $$(".settings-room").forEach((section) => {
    section.classList.toggle("active", section.id === `settings${target[0].toUpperCase()}${target.slice(1)}Room`);
  });
  $$("[data-settings-room]").forEach((button) => {
    button.classList.toggle("active", button.dataset.settingsRoom === target);
  });
}

function renderLogs() {
  const query = ($("#logSearch")?.value || "").trim().toLowerCase();
  const rows = latestLogs
    .filter((log) => {
      const haystack = `${log.actorName} ${log.action} ${log.message}`.toLowerCase();
      return !query || haystack.includes(query);
    })
    .map((log) => `
      <article class="timeline-item">
        <time>${formatDate(log.createdAt)}</time>
        <div>
          <strong>${escapeHtml(log.action)}</strong>
          <span>${escapeHtml(log.message || "")} | ${escapeHtml(log.actorName || t("logs.system"))}</span>
        </div>
      </article>
    `);
  $("#logsList").innerHTML = rows.join("") || emptyState(t("logs.none"));
}

function drawDepartmentChart() {
  const canvas = $("#departmentChart");
  if (!canvas) return;
  const departments = currentMetrics?.departments || settings?.departments || [];
  const totals = currentMetrics?.departmentTotals || {};
  const values = departments.map((department) => Number(totals[department.id] || 0));
  drawBars(canvas, departments.map(departmentName), values, departments.map((item) => item.color || "#26dfff"));
}

function drawMetricsChart() {
  const canvas = $("#metricsChart");
  if (!canvas) return;
  const points = currentMetrics?.points || [];
  drawLine(canvas, points.map((point) => Number(point.totalPlayers || 0)), varColor("--teal"));
}

function prepareCanvas(canvas, height) {
  const width = Math.max(320, Math.floor(canvas.clientWidth || 640));
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.height = `${height}px`;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width, height };
}

function varColor(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function drawBars(canvas, labels, values, colors) {
  const { ctx, width, height } = prepareCanvas(canvas, 320);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(47,174,255,0.035)";
  ctx.fillRect(0, 0, width, height);

  const max = Math.max(1, ...values);
  const padding = 36;
  const gap = 18;
  const barWidth = Math.max(28, (width - padding * 2 - gap * Math.max(0, labels.length - 1)) / Math.max(1, labels.length));
  ctx.font = "12px Segoe UI, Arial";
  ctx.textBaseline = "middle";

  values.forEach((value, index) => {
    const x = padding + index * (barWidth + gap);
    const barHeight = Math.max(8, ((height - 88) * value) / max);
    const y = height - 48 - barHeight;
    ctx.fillStyle = colors[index] || varColor("--teal");
    roundRect(ctx, x, y, barWidth, barHeight, 8);
    ctx.fill();
    ctx.fillStyle = varColor("--text") || "#eef8ff";
    ctx.fillText(String(value), x, y - 12);
    ctx.fillStyle = varColor("--muted") || "rgba(238,248,255,0.64)";
    ctx.fillText(String(labels[index] || "").slice(0, 12), x, height - 26);
  });

  if (!labels.length) {
    ctx.fillStyle = varColor("--muted") || "rgba(238,248,255,0.62)";
    ctx.fillText(t("chart.noData"), padding, height / 2);
  }
}

function drawLine(canvas, values, color) {
  const { ctx, width, height } = prepareCanvas(canvas, 260);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(47,174,255,0.035)";
  ctx.fillRect(0, 0, width, height);

  const padding = 34;
  const max = Math.max(1, ...values);
  ctx.strokeStyle = "rgba(85,240,255,0.12)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i += 1) {
    const y = padding + ((height - padding * 2) / 3) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  if (values.length < 2) {
    ctx.fillStyle = varColor("--muted") || "rgba(238,248,255,0.62)";
    ctx.font = "12px Segoe UI, Arial";
    ctx.fillText(t("chart.waiting"), padding, height / 2);
    return;
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  values.forEach((value, index) => {
    const x = padding + ((width - padding * 2) / (values.length - 1)) * index;
    const y = height - padding - ((height - padding * 2) * value) / max;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.fillStyle = color;
  values.forEach((value, index) => {
    const x = padding + ((width - padding * 2) / (values.length - 1)) * index;
    const y = height - padding - ((height - padding * 2) * value) / max;
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

async function patchSettings(nextSettings, successKey = "notice.settingsSaved") {
  const data = await api("/api/settings", {
    method: "PATCH",
    body: JSON.stringify(nextSettings)
  });
  settings = data.settings;
  applySettings();
  renderStatus();
  renderMetrics();
  renderServerConfig();
  renderPersonnel();
  renderDepartmentCards();
  renderDepartmentSummary();
  renderTasks();
  renderRecords();
  renderDiscordIntegration();
  renderLogs();
  showNotice(t(successKey));
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function initEvents() {
  $$("[data-view]").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  $$("[data-jump]").forEach((item) => {
    item.addEventListener("click", (event) => {
      const target = item.dataset.jump || item.getAttribute("href")?.replace("#", "");
      if (target && viewTitleKeys[target]) {
        event.preventDefault();
        switchView(target);
      }
    });
  });

  $("#logoutBtn").addEventListener("click", async () => {
    await api("/api/auth/logout", { method: "POST" });
    window.location.href = "/index.html";
  });

  $("[data-action='refresh']").addEventListener("click", () => refreshAll().catch(() => showNotice(t("notice.refreshFailed"), true)));

  $("#languageSelect").addEventListener("change", (event) => {
    patchSettings({ ...settings, language: event.target.value }, "notice.languageSaved").catch(() => showNotice(t("notice.languageFailed"), true));
  });

  $("#rangeFilter").addEventListener("click", (event) => {
    const button = event.target.closest("[data-range]");
    if (!button) return;
    loadMetrics(button.dataset.range).catch(() => showNotice(t("notice.metricsFailed"), true));
  });

  $("#settingsTabs").addEventListener("click", (event) => {
    const button = event.target.closest("[data-settings-room]");
    if (!button) return;
    switchSettingsRoom(button.dataset.settingsRoom);
  });


  $("#personnelSearch").addEventListener("input", renderPersonnel);
  $("#recordSearch").addEventListener("input", renderRecords);
  $("#logSearch").addEventListener("input", renderLogs);
  $("#reloadLogs").addEventListener("click", () => loadLogs().catch(() => showNotice(t("notice.logsFailed"), true)));

  $("#personnelForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    await api("/api/personnel", { method: "POST", body: JSON.stringify(payload) });
    form.reset();
    renderDepartmentOptions();
    await Promise.all([loadPersonnel(), loadLogs()]);
    showNotice(t("notice.personAdded"));
  });

  $("#departmentForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const name = String(data.name || "").trim();
    const id = slugify(data.id || name);
    if (!id || (settings.departments || []).some((department) => department.id === id)) {
      showNotice(t("notice.departmentInvalid"), true);
      return;
    }
    const department = {
      id,
      name: { tr: name, en: name, ru: name },
      color: data.color || "#26dfff"
    };
    await patchSettings({ ...settings, departments: [...settings.departments, department] }, "notice.departmentAdded");
    form.reset();
    form.elements.color.value = "#26dfff";
  });

  $("#serverForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const id = slugify(data.name || data.address || Date.now());
    const server = {
      id,
      name: String(data.name || "FiveM Server").trim(),
      address: String(data.address || "").trim(),
      enabled: data.enabled === "on"
    };
    const servers = [...(settings.servers || []).filter((item) => item.id !== id), server];
    await patchSettings({ ...settings, servers }, "notice.serverSaved");
    form.reset();
    form.elements.enabled.checked = true;
    await loadStatus().catch(() => {});
  });

  $("#testServerBtn").addEventListener("click", async () => {
    const form = $("#serverForm");
    const data = Object.fromEntries(new FormData(form).entries());
    $("#serverTestResult").textContent = t("notice.serverTesting");
    try {
      const result = await api("/api/server-test", { method: "POST", body: JSON.stringify(data) });
      const server = result.server;
      $("#serverTestResult").textContent = server.online
        ? t("notice.serverOnline", { clients: server.clients, maxClients: server.maxClients })
        : t("notice.serverNoConnection", { error: server.error || "offline" });
    } catch {
      $("#serverTestResult").textContent = t("notice.serverTestFailed");
    }
  });

  $("#taskForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    await api("/api/tasks", { method: "POST", body: JSON.stringify(payload) });
    form.reset();
    await Promise.all([loadWorkspace(), loadLogs()]);
    showNotice(t("notice.taskCreated"));
  });

  $("#clearDoneBtn").addEventListener("click", async () => {
    const doneTasks = tasks.filter((task) => task.status === "done");
    await Promise.all(doneTasks.map((task) => api(`/api/tasks/${task.id}`, { method: "DELETE" })));
    await Promise.all([loadWorkspace(), loadLogs()]);
    showNotice(t("notice.doneCleared"));
  });

  $("#saveOperationNotes").addEventListener("click", async () => {
    const data = await api("/api/notes", {
      method: "PATCH",
      body: JSON.stringify({ operations: $("#operationsNotes").value })
    });
    notes = data.notes;
    showNotice(t("notice.notesSaved"));
  });

  $("#settingsForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    await patchSettings({ ...settings, ...data }, "notice.settingsSaved");
  });
  $("#accountForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
      showNotice(t("notice.accountMismatch"), true);
      return;
    }
    try {
      const result = await api("/api/account", {
        method: "PATCH",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          currentPassword: data.currentPassword,
          newPassword: data.newPassword
        })
      });
      me = result.user;
      form.elements.currentPassword.value = "";
      form.elements.newPassword.value = "";
      form.elements.confirmPassword.value = "";
      renderDiscordBox();
      renderDiscordIntegration();
      renderAccountSettings();
      showNotice(t("notice.accountSaved"));
    } catch (error) {
      showNotice(error.data?.message || t("notice.accountFailed"), true);
    }
  });

  $("#logoUpload").addEventListener("change", (event) => uploadImage(event, "logo"));
  $("#backgroundUpload").addEventListener("change", (event) => uploadImage(event, "background"));

  document.addEventListener("click", handleDocumentActions);
  window.addEventListener("resize", () => {
    if ($("#dashboardView").classList.contains("active")) {
      drawDepartmentChart();
      drawMetricsChart();
    }
  });
}

async function uploadImage(event, kind) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const dataUrl = await readFileAsDataUrl(file);
    const data = await api(`/api/uploads/${kind}`, { method: "POST", body: JSON.stringify({ dataUrl }) });
    if (kind === "logo") $("#settingsLogoUrl").value = data.url;
    if (kind === "background") $("#settingsBackgroundUrl").value = data.url;
    const next = kind === "logo" ? { ...settings, logoUrl: data.url } : { ...settings, backgroundUrl: data.url };
    await patchSettings(next, "notice.imageUploaded");
  } catch {
    showNotice(t("notice.imageFailed"), true);
  } finally {
    event.target.value = "";
  }
}

async function handleDocumentActions(event) {
  const deletePerson = event.target.closest("[data-delete-person]");
  const deleteDepartment = event.target.closest("[data-delete-department]");
  const deleteServer = event.target.closest("[data-delete-server]");
  const toggleServer = event.target.closest("[data-toggle-server]");
  const toggleTask = event.target.closest("[data-toggle-task]");
  const deleteTask = event.target.closest("[data-delete-task]");

  try {
    if (deletePerson) {
      await api(`/api/personnel/${deletePerson.dataset.deletePerson}`, { method: "DELETE" });
      await Promise.all([loadPersonnel(), loadLogs()]);
      showNotice(t("notice.personDeleted"));
    }

    if (deleteDepartment) {
      const id = deleteDepartment.dataset.deleteDepartment;
      if (personnel.some((person) => person.department === id)) {
        showNotice(t("notice.departmentHasPersonnel"), true);
        return;
      }
      await patchSettings(
        { ...settings, departments: settings.departments.filter((department) => department.id !== id) },
        "notice.departmentDeleted"
      );
    }

    if (deleteServer) {
      await patchSettings(
        { ...settings, servers: settings.servers.filter((server) => server.id !== deleteServer.dataset.deleteServer) },
        "notice.serverDeleted"
      );
      await loadStatus().catch(() => {});
    }

    if (toggleServer) {
      const id = toggleServer.dataset.toggleServer;
      const servers = settings.servers.map((server) => (server.id === id ? { ...server, enabled: !server.enabled } : server));
      await patchSettings({ ...settings, servers }, "notice.serverUpdated");
      await loadStatus().catch(() => {});
    }

    if (toggleTask) {
      const task = tasks.find((item) => item.id === toggleTask.dataset.toggleTask);
      if (!task) return;
      await api(`/api/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: task.status === "done" ? "open" : "done" })
      });
      await Promise.all([loadWorkspace(), loadLogs()]);
      showNotice(t("notice.taskUpdated"));
    }

    if (deleteTask) {
      await api(`/api/tasks/${deleteTask.dataset.deleteTask}`, { method: "DELETE" });
      await Promise.all([loadWorkspace(), loadLogs()]);
      showNotice(t("notice.taskDeleted"));
    }
  } catch {
    showNotice(t("notice.actionFailed"), true);
  }
}

async function init() {
  try {
    const bootstrap = await api("/api/bootstrap");
    me = bootstrap.user;
    settings = bootstrap.settings;
    discordEnabled = bootstrap.discordEnabled;
    applySettings();
    renderServerConfig();
    renderDiscordIntegration();
    initEvents();
    await refreshAll();
    const initialView = window.location.hash.replace("#", "");
    switchView(viewTitleKeys[initialView] ? initialView : "dashboard");
    const params = new URLSearchParams(window.location.search);
    if (params.get("discord") === "connected") showNotice(t("notice.discordConnected"));
    if (params.get("discord") === "state_error") showNotice(t("notice.discordStateError"), true);
  } catch (error) {
    if (error.message !== "auth_required") {
      showNotice(t("notice.panelFailed"), true);
    }
  }
}

init();
