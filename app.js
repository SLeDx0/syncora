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
  settings: "views.settings",
  tickets: "Ticket",
  announcements: "Duyurular",
  calendar: "Takvim",
  files: "Dosya Merkezi",
  forms: "Formlar",
  projects: "Projeler",
  fivem: "FiveM",
  business: "Genel Yonetim",
  security: "Guvenlik"
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
let dashboardSummary = {};
let moduleDefinitions = [];
let roleDefinitions = [];
let permissionDefinitions = [];
let purposeDefinitions = [];
let widgetDefinitions = [];
let users = [];
let invitations = [];
let tickets = [];
let announcements = [];
let events = [];
let files = [];
let fileCategories = [];
let forms = [];
let editingFormId = null;
let formResponses = [];
let notifications = [];
let fivemRecords = [];
let businessRecords = [];

const viewModules = {
  operations: "tasks",
  projects: "tasks",
  personnel: "personnel",
  departments: "personnel",
  records: "personnel",
  servers: "fivem",
  integrations: "discord",
  logs: "logs",
  tickets: "tickets",
  announcements: "announcements",
  calendar: "calendar",
  files: "files",
  forms: "forms",
  fivem: "fivem",
  business: "business",
  security: "security"
};

const formFieldTypes = [
  ["shortText", "Kisa yazi"],
  ["longText", "Uzun yazi"],
  ["singleChoice", "Tek secim"],
  ["multiChoice", "Coklu secim"],
  ["date", "Tarih"],
  ["number", "Sayi"],
  ["fileLink", "Dosya/link"],
  ["rating", "Puanlama"],
  ["checkbox", "Onay kutusu"]
];

const fivemKinds = [
  ["mdt", "MDT olay"],
  ["fine", "Ceza hesaplama"],
  ["criminal", "Sabika kaydi"],
  ["player", "Oyuncu kaydi"],
  ["vehicle", "Arac kaydi"],
  ["patrol", "Devriye raporu"],
  ["shift", "Vardiya"],
  ["ban", "Ban"],
  ["warn", "Warn"],
  ["jail", "Jail"],
  ["whitelist", "Whitelist"],
  ["teamApplication", "Ekip basvurusu"],
  ["restart", "Restart duyurusu"],
  ["complaint", "Oyuncu sikayeti"],
  ["discordRoleSync", "Discord rol sync"]
];

const fivemKindFields = {
  mdt: [
    ["caseNo", "Dosya no", "text"],
    ["incidentAt", "Olay tarihi", "datetime-local"],
    ["officer", "Sorumlu yetkili", "text"],
    ["location", "Konum", "text"],
    ["evidence", "Delil / kanit linki", "url"]
  ],
  fine: [
    ["officer", "Ceza kesen yetkili", "text"],
    ["laws", "Maddeler", "textarea"],
    ["paidStatus", "Odeme durumu", "select", ["odenmedi", "odendi", "itiraz"]]
  ],
  criminal: [
    ["citizenId", "Citizen ID / license", "text"],
    ["charges", "Suclama maddeleri", "textarea"],
    ["verdict", "Karar", "textarea"],
    ["expiresAt", "Gecerlilik / silinme tarihi", "date"]
  ],
  player: [
    ["license", "License", "text"],
    ["discordId", "Discord ID", "text"],
    ["steam", "Steam", "text"],
    ["notes", "Oyuncu notu", "textarea"]
  ],
  vehicle: [
    ["plate", "Plaka", "text"],
    ["model", "Model", "text"],
    ["owner", "Sahip", "text"],
    ["status", "Durum", "select", ["aktif", "aranan", "cekildi", "arsiv"]]
  ],
  patrol: [
    ["unit", "Birim", "text"],
    ["startedAt", "Baslangic", "datetime-local"],
    ["endedAt", "Bitis", "datetime-local"],
    ["route", "Rota / bolge", "textarea"]
  ],
  shift: [
    ["person", "Personel", "text"],
    ["startedAt", "Giris", "datetime-local"],
    ["endedAt", "Cikis", "datetime-local"],
    ["duration", "Sure", "text"]
  ],
  ban: [
    ["targetIdentifier", "Identifier", "text"],
    ["reason", "Sebep", "textarea"],
    ["expiresAt", "Bitis tarihi", "datetime-local"],
    ["evidence", "Kanıt linki", "url"]
  ],
  warn: [
    ["targetIdentifier", "Identifier", "text"],
    ["reason", "Sebep", "textarea"],
    ["level", "Seviye", "select", ["dusuk", "normal", "ciddi"]]
  ],
  jail: [
    ["targetIdentifier", "Identifier", "text"],
    ["minutes", "Hapis dakikasi", "number"],
    ["reason", "Sebep", "textarea"],
    ["releaseAt", "Tahmini cikis", "datetime-local"]
  ],
  whitelist: [
    ["applicantDiscord", "Basvuran Discord ID", "text"],
    ["score", "Puan", "number"],
    ["reviewer", "Inceleyen", "text"],
    ["decision", "Karar", "select", ["beklemede", "kabul", "red"]]
  ],
  teamApplication: [
    ["teamName", "Ekip adi", "text"],
    ["leader", "Lider", "text"],
    ["memberCount", "Uye sayisi", "number"],
    ["decision", "Karar", "select", ["beklemede", "kabul", "red"]]
  ],
  restart: [
    ["restartAt", "Restart zamani", "datetime-local"],
    ["reason", "Sebep", "textarea"],
    ["broadcast", "Duyuru metni", "textarea"]
  ],
  complaint: [
    ["complainant", "Sikayet eden", "text"],
    ["target", "Sikayet edilen", "text"],
    ["evidence", "Kanıt linki", "url"],
    ["result", "Sonuc", "textarea"]
  ],
  discordRoleSync: [
    ["discordId", "Discord ID", "text"],
    ["roleId", "Rol ID", "text"],
    ["syncStatus", "Senkron durumu", "select", ["beklemede", "basarili", "hata"]]
  ]
};

const fineCatalog = [
  { id: "speed", label: "Hiz ihlali", amount: 2500, jail: 0 },
  { id: "reckless", label: "Tehlikeli surus", amount: 6000, jail: 5 },
  { id: "illegal_weapon", label: "Ruhsatsiz silah", amount: 12000, jail: 20 },
  { id: "assault", label: "Saldiri", amount: 15000, jail: 25 },
  { id: "robbery", label: "Soygun", amount: 30000, jail: 45 }
];

const businessKinds = [
  ["customer", "Musteri takip"],
  ["inventory", "Stok / envanter"],
  ["finance", "Gelir-gider"],
  ["leave", "Personel izin"],
  ["meeting", "Toplanti notlari"],
  ["note", "Genel not"]
];

const businessKindFields = {
  customer: [
    ["contact", "Yetkili kisi", "text"],
    ["email", "E-posta", "email"],
    ["phone", "Telefon", "text"],
    ["stage", "Asama", "select", ["aday", "gorusme", "aktif", "arsiv"]]
  ],
  inventory: [
    ["sku", "Stok kodu", "text"],
    ["quantity", "Adet", "number"],
    ["location", "Konum", "text"],
    ["minStock", "Minimum stok", "number"]
  ],
  finance: [
    ["direction", "Tip", "select", ["gelir", "gider"]],
    ["currency", "Para birimi", "select", ["TRY", "USD", "EUR"]],
    ["paidAt", "Tarih", "date"],
    ["invoiceUrl", "Belge linki", "url"]
  ],
  leave: [
    ["person", "Personel", "text"],
    ["startAt", "Baslangic", "date"],
    ["endAt", "Bitis", "date"],
    ["approval", "Onay", "select", ["beklemede", "onaylandi", "reddedildi"]]
  ],
  meeting: [
    ["meetingAt", "Toplanti tarihi", "datetime-local"],
    ["attendees", "Katilimcilar", "text"],
    ["decisions", "Kararlar", "textarea"],
    ["nextStep", "Sonraki adim", "text"]
  ],
  note: [
    ["owner", "Sorumlu", "text"],
    ["category", "Kategori", "text"],
    ["dueAt", "Takip tarihi", "datetime-local"]
  ]
};

const notificationTypes = [
  ["ticket", "Ticket bildirimleri"],
  ["ticket_reply", "Ticket cevaplari"],
  ["announcement", "Duyuru bildirimleri"],
  ["event", "Yaklasan etkinlikler"],
  ["role", "Rol degisikligi"],
  ["security", "Guvenlik uyarilari"],
  ["form_response", "Form cevaplari"],
  ["file", "Dosya ekleme"]
];

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

function hasPermission(permission) {
  return Boolean(me?.permissions?.[permission] || me?.role === "admin" || me?.role === "founder");
}

function isModuleEnabled(moduleId) {
  return !moduleId || settings?.modules?.[moduleId] !== false;
}

function roleOptions(selected = "") {
  return (roleDefinitions.length ? roleDefinitions : [
    { id: "admin", label: "Admin" },
    { id: "member", label: "Uye" }
  ]).map((role) => `<option value="${escapeHtml(role.id)}" ${role.id === selected ? "selected" : ""}>${escapeHtml(role.label)}</option>`).join("");
}

function roleCheckboxes(name, selected = []) {
  const active = new Set(Array.isArray(selected) ? selected : String(selected || "").split(",").filter(Boolean));
  return (roleDefinitions || []).map((role) => `
    <label class="inline-check"><input type="checkbox" name="${escapeHtml(name)}" value="${escapeHtml(role.id)}" ${active.has(role.id) ? "checked" : ""}> <span>${escapeHtml(role.label)}</span></label>
  `).join("");
}

function checkedValues(form, name) {
  return Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
}

function formatDateTimeInput(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

function formJson(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function taskStatusLabel(status) {
  const labels = { todo: "Yapilacak", doing: "Devam ediyor", done: "Tamamlandi", cancelled: "Iptal" };
  return labels[status] || labels.todo;
}

function ticketStatusLabel(status) {
  const labels = { open: "Acik", pending: "Beklemede", resolved: "Cozuldu", closed: "Kapali" };
  return labels[status] || labels.open;
}

function fieldTypeLabel(type) {
  return formFieldTypes.find(([value]) => value === type)?.[1] || "Kisa yazi";
}

function renderFormAnswerInput(field) {
  const name = escapeHtml(field.id);
  const required = field.required ? "required" : "";
  const options = Array.isArray(field.options) ? field.options : [];
  if (field.type === "longText") return `<textarea name="${name}" ${required}></textarea>`;
  if (field.type === "singleChoice") return `<select name="${name}" ${required}><option value="">Sec</option>${options.map((item) => `<option>${escapeHtml(item)}</option>`).join("")}</select>`;
  if (field.type === "multiChoice") return `<div class="check-grid">${options.map((item) => `<label class="inline-check"><input type="checkbox" name="${name}" value="${escapeHtml(item)}"> <span>${escapeHtml(item)}</span></label>`).join("")}</div>`;
  if (field.type === "date") return `<input type="date" name="${name}" ${required}>`;
  if (field.type === "number") return `<input type="number" name="${name}" ${required}>`;
  if (field.type === "fileLink") return `<input type="url" name="${name}" placeholder="https://..." ${required}>`;
  if (field.type === "rating") return `<input type="range" min="1" max="5" value="3" name="${name}" ${required}>`;
  if (field.type === "checkbox") return `<label class="inline-check"><input type="checkbox" name="${name}" value="on"> <span>Onayliyorum</span></label>`;
  return `<input name="${name}" ${required}>`;
}

function collectFormBuilderFields(form) {
  return Array.from(form.querySelectorAll("[data-builder-field]")).map((row) => ({
    id: row.dataset.fieldId || cryptoRandomId(),
    label: row.querySelector("[name='fieldLabel']")?.value || "Alan",
    type: row.querySelector("[name='fieldType']")?.value || "shortText",
    required: row.querySelector("[name='fieldRequired']")?.checked || false,
    options: String(row.querySelector("[name='fieldOptions']")?.value || "").split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean)
  })).filter((field) => field.label.trim());
}

function cryptoRandomId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `field-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formFieldsToHtml(fields = []) {
  const list = fields.length ? fields : [{ id: cryptoRandomId(), label: "", type: "shortText", required: false, options: [] }];
  return list.map((field) => `
    <article class="builder-field" data-builder-field data-field-id="${escapeHtml(field.id || cryptoRandomId())}">
      <label>Alan adi<input name="fieldLabel" value="${escapeHtml(field.label || "")}" required></label>
      <label>Tip<select name="fieldType">${formFieldTypes.map(([value, label]) => `<option value="${value}" ${field.type === value ? "selected" : ""}>${label}</option>`).join("")}</select></label>
      <label>Secenekler<textarea name="fieldOptions" placeholder="Secim alanlari icin virgulle veya satirla ayir">${escapeHtml((field.options || []).join("\\n"))}</textarea></label>
      <label class="inline-check"><input name="fieldRequired" type="checkbox" ${field.required ? "checked" : ""}> <span>Zorunlu</span></label>
      <button class="icon-btn danger" type="button" data-builder-remove>Alan sil</button>
    </article>
  `).join("");
}

function checkedMultiValue(form, fieldId) {
  return Array.from(form.querySelectorAll(`input[name="${CSS.escape(fieldId)}"]:checked`)).map((input) => input.value);
}

function responseAnswersHtml(formDef, response) {
  const answers = response?.answers || {};
  const fields = Array.isArray(formDef?.fields) ? formDef.fields : [];
  if (!fields.length) return "";
  return `<div class="record-meta">${fields.map((field) => {
    const raw = answers[field.id];
    const value = Array.isArray(raw) ? raw.join(", ") : (raw === "on" ? "Evet" : raw);
    return `<span class="tag">${escapeHtml(field.label || field.id)}: ${escapeHtml(value || "-")}</span>`;
  }).join("")}</div>`;
}

function dynamicFieldHtml([key, label, type = "text", options = []], prefix, value = "") {
  const name = `${prefix}_${key}`;
  if (type === "textarea") {
    return `<label>${escapeHtml(label)}<textarea name="${escapeHtml(name)}" data-extra-field="${escapeHtml(key)}">${escapeHtml(value || "")}</textarea></label>`;
  }
  if (type === "select") {
    return `<label>${escapeHtml(label)}<select name="${escapeHtml(name)}" data-extra-field="${escapeHtml(key)}">${options.map((option) => `<option value="${escapeHtml(option)}" ${option === value ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select></label>`;
  }
  return `<label>${escapeHtml(label)}<input name="${escapeHtml(name)}" type="${escapeHtml(type)}" value="${escapeHtml(value || "")}" data-extra-field="${escapeHtml(key)}"></label>`;
}

function dynamicFieldsHtml(fields, prefix, values = {}) {
  return fields.map((field) => dynamicFieldHtml(field, prefix, values[field[0]])).join("");
}

function collectExtraFields(form, prefix) {
  const data = {};
  for (const element of form.querySelectorAll(`[name^="${CSS.escape(prefix)}_"]`)) {
    const key = element.dataset.extraField || element.name.replace(`${prefix}_`, "");
    data[key] = element.type === "checkbox" ? element.checked : element.value;
  }
  return data;
}

function fivemFieldsHtml(kind, values = {}) {
  return dynamicFieldsHtml(fivemKindFields[kind] || fivemKindFields.mdt || [], "fivemData", values);
}

function businessFieldsHtml(kind, values = {}) {
  return dynamicFieldsHtml(businessKindFields[kind] || businessKindFields.note || [], "businessData", values);
}

function businessKindLabel(kind) {
  return fieldKindLabel(kind, businessKinds);
}

function activeFineCatalog() {
  const rows = commaList(settings?.fivemFineCatalog);
  const parsed = rows.map((row, index) => {
    const [label, amount, jail] = String(row).split("|").map((item) => item.trim());
    return label ? { id: `custom-${index}`, label, amount: Number(amount || 0), jail: Number(jail || 0) } : null;
  }).filter(Boolean);
  return parsed.length ? parsed : fineCatalog;
}

function commaList(value, fallback = []) {
  if (Array.isArray(value)) return value;
  const text = String(value || "").trim();
  return text ? text.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean) : fallback;
}

function safeSettingValue(value) {
  return value === "configured" ? "" : value || "";
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
  document.body.dataset.theme = settings.theme || "dark";
  document.documentElement.style.setProperty("--teal", settings.accentColor || "#26dfff");
  document.documentElement.style.setProperty("--aqua", settings.accentColor || "#55f0ff");
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
  applyModuleVisibility();
  renderSettingsModules();
  renderRoleSettings();
  renderSecuritySettings();
  renderDiscordSettings();
  renderFivemSettings();
  renderNotificationSettings();
  renderBackupSettings();
  renderSecurityCenter();
}

function applyModuleVisibility() {
  $$("[data-module]").forEach((node) => {
    node.classList.toggle("hidden", !isModuleEnabled(node.dataset.module));
  });
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
  const requested = viewTitleKeys[view] ? view : "dashboard";
  const moduleId = viewModules[requested];
  const target = isModuleEnabled(moduleId) ? requested : "dashboard";
  $$(".view").forEach((section) => section.classList.toggle("active", section.id === `${target}View`));
  $$("[data-view]").forEach((button) => button.classList.toggle("active", button.dataset.view === target));
  $("#pageTitle").textContent = viewTitle(target);
  window.location.hash = target;
  document.body.classList.remove("sidebar-open");
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
  renderProjects();
  $("#operationsNotes").value = notes.operations || "";
}

async function loadLogs() {
  const data = await api("/api/logs");
  latestLogs = data.logs || [];
  renderLogs();
}

async function safeLoad(loader) {
  try {
    await loader();
  } catch {
    // Disabled modules or missing permissions should not block the rest of the panel.
  }
}

async function loadDashboardSummary() {
  const data = await api("/api/dashboard");
  dashboardSummary = data.dashboard || {};
  renderDashboardWidgets();
}

async function loadUsers() {
  if (!hasPermission("viewUsers")) return;
  const data = await api("/api/admin/users");
  users = data.users || [];
  renderUsers();
  renderDiscordSettings();
}

async function loadInvitations() {
  if (!hasPermission("createUsers")) return;
  const data = await api("/api/invitations");
  invitations = data.invitations || [];
  renderInvitations();
}

async function loadTickets() {
  if (!isModuleEnabled("tickets")) return;
  const data = await api("/api/tickets");
  tickets = data.tickets || [];
  renderTickets();
}

async function loadAnnouncements() {
  if (!isModuleEnabled("announcements")) return;
  const data = await api("/api/announcements");
  announcements = data.announcements || [];
  renderAnnouncements();
}

async function loadEvents() {
  if (!isModuleEnabled("calendar")) return;
  const data = await api("/api/events");
  events = data.events || [];
  renderEvents();
}

async function loadFiles() {
  if (!isModuleEnabled("files")) return;
  const data = await api("/api/files");
  files = data.files || [];
  fileCategories = data.categories || [];
  renderFiles();
}

async function loadForms() {
  if (!isModuleEnabled("forms")) return;
  const data = await api("/api/forms");
  forms = data.forms || [];
  renderForms();
}

async function loadNotifications() {
  const data = await api("/api/notifications");
  notifications = data.notifications || [];
  renderNotifications();
}

async function loadFivemRecords() {
  if (!isModuleEnabled("fivem") || !hasPermission("manageFivem")) return;
  const data = await api("/api/fivem-records");
  fivemRecords = data.records || [];
  renderFivemRecords();
}

async function loadBusinessRecords() {
  if (!isModuleEnabled("business") || !hasPermission("manageBusiness")) return;
  const data = await api("/api/business-records");
  businessRecords = data.records || [];
  renderBusinessRecords();
}

async function refreshAll() {
  await Promise.all([
    safeLoad(loadStatus),
    safeLoad(loadMetrics),
    safeLoad(loadPersonnel),
    safeLoad(loadWorkspace),
    safeLoad(loadLogs),
    safeLoad(loadDashboardSummary),
    safeLoad(loadUsers),
    safeLoad(loadInvitations),
    safeLoad(loadTickets),
    safeLoad(loadAnnouncements),
    safeLoad(loadEvents),
    safeLoad(loadFiles),
    safeLoad(loadForms),
    safeLoad(loadNotifications),
    safeLoad(loadFivemRecords),
    safeLoad(loadBusinessRecords)
  ]);
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

function renderProjects() {
  const root = $("#projectsRoot");
  if (!root) return;
  const grouped = {
    todo: tasks.filter((task) => (task.status || "todo") === "todo" || task.status === "open"),
    doing: tasks.filter((task) => task.status === "doing"),
    done: tasks.filter((task) => task.status === "done"),
    cancelled: tasks.filter((task) => task.status === "cancelled")
  };
  root.innerHTML = `
    <section class="surface">
      <div class="section-head">
        <div><h2>Proje / Gorev takip</h2><p>Kanban ve liste gorunumu ayni veriyle calisir.</p></div>
        <form class="inline-form roomy" data-dynamic-form="project-task-create">
          <input name="title" placeholder="Gorev basligi" required>
          <input name="owner" placeholder="Atanan">
          <select name="priority"><option value="low">Dusuk</option><option value="normal" selected>Normal</option><option value="high">Yuksek</option><option value="urgent">Acil</option></select>
          <input name="dueAt" type="datetime-local">
          <button class="primary-btn" type="submit">Gorev ekle</button>
        </form>
      </div>
      <div class="kanban-board">
        ${Object.entries(grouped).map(([status, items]) => `
          <section class="kanban-column">
            <h3>${taskStatusLabel(status)} <span>${items.length}</span></h3>
            ${items.map((task) => `
              <article class="kanban-card">
                <strong>${escapeHtml(task.title)}</strong>
                <span>${escapeHtml(task.owner || "Atanmadi")} | ${priorityLabel(task.priority)} | ${task.dueAt ? formatDate(task.dueAt) : "Termin yok"}</span>
                <p>${escapeHtml(task.description || "")}</p>
                <div class="button-row">
                  <button class="icon-btn" type="button" data-project-status="${escapeHtml(task.id)}" data-status="todo">Yapilacak</button>
                  <button class="icon-btn" type="button" data-project-status="${escapeHtml(task.id)}" data-status="doing">Devam</button>
                  <button class="icon-btn" type="button" data-project-status="${escapeHtml(task.id)}" data-status="done">Bitir</button>
                  <button class="icon-btn danger" type="button" data-delete-task="${escapeHtml(task.id)}">Sil</button>
                </div>
              </article>
            `).join("") || emptyState("Kayit yok.")}
          </section>
        `).join("")}
      </div>
    </section>
  `;
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
  const target = ["general", "media", "modules", "roles", "security", "discord", "fivem", "notifications", "backup", "account"].includes(room) ? room : "general";
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

function renderDashboardWidgets() {
  let host = $("#dashboardWidgets");
  if (!host) {
    host = document.createElement("section");
    host.className = "surface module-dashboard";
    host.id = "dashboardWidgets";
    $(".stat-grid")?.insertAdjacentElement("afterend", host);
  }
  if (!isModuleEnabled("dashboardWidgets")) {
    host.classList.add("hidden");
    return;
  }
  host.classList.remove("hidden");
  const widgets = settings.widgets || {};
  const cards = [
    ["totalUsers", "Toplam kullanici", dashboardSummary.totalUsers ?? users.length ?? 0],
    ["activeUsers", "Aktif kullanici", dashboardSummary.activeUsers ?? 0],
    ["openTickets", "Acik ticket", dashboardSummary.openTickets ?? tickets.filter((item) => item.status === "open").length],
    ["pendingTickets", "Bekleyen ticket", dashboardSummary.pendingTickets ?? tickets.filter((item) => item.status === "pending").length],
    ["recentAnnouncements", "Son duyuru", (dashboardSummary.recentAnnouncements || announcements).slice(0, 1)[0]?.title || "-"],
    ["upcomingEvents", "Yaklasan etkinlik", (dashboardSummary.upcomingEvents || events).slice(0, 1)[0]?.title || "-"],
    ["taskStats", "Gorevler", `${dashboardSummary.taskStats?.todo || 0}/${dashboardSummary.taskStats?.doing || 0}/${dashboardSummary.taskStats?.done || 0}`],
    ["fivemStatus", "FiveM", $("#serverState")?.textContent || "-"],
    ["departmentStats", "Departman", settings.departments?.length || 0]
  ].filter(([id]) => widgets[id] !== false);
  host.innerHTML = `
    <div class="section-head">
      <div><h2>Dashboard widgetlari</h2><p>Modul ayarlarindan yonetilen ozet kartlar.</p></div>
    </div>
    <div class="mini-grid">${cards.map(([id, label, value]) => `
      <article class="mini-card" data-widget="${escapeHtml(id)}"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></article>
    `).join("")}</div>
  `;
}

function renderTickets() {
  const root = $("#ticketsRoot");
  if (!root) return;
  const canManage = hasPermission("manageTickets");
  root.innerHTML = `
    <section class="section-grid">
      <form class="surface form-stack" data-dynamic-form="ticket-create">
        <div class="section-head"><h2>Ticket ac</h2><span class="tag">Destek</span></div>
        <label>Baslik<input name="title" required></label>
        <label>Kategori<input name="category" value="Genel"></label>
        <label>Oncelik<select name="priority"><option value="low">Dusuk</option><option value="normal" selected>Normal</option><option value="high">Yuksek</option><option value="urgent">Acil</option></select></label>
        <label>Mesaj<textarea name="body" required></textarea></label>
        <button class="primary-btn" type="submit">Ticket olustur</button>
      </form>
      <section class="surface">
        <div class="section-head"><div><h2>Ticket listesi</h2><p>${tickets.length} kayit</p></div><input class="compact-input" id="ticketSearch" placeholder="Ticket ara"></div>
        <div class="data-list module-list" id="ticketList"></div>
      </section>
    </section>
  `;
  const query = ($("#ticketSearch")?.value || "").toLowerCase();
  const list = tickets.filter((ticket) => `${ticket.title} ${ticket.category} ${ticket.status}`.toLowerCase().includes(query));
  $("#ticketList").innerHTML = list.map((ticket) => `
    <article class="module-card">
      <div class="module-card-head">
        <div><strong>${escapeHtml(ticket.title)}</strong><span>${escapeHtml(ticket.category)} | ${ticketStatusLabel(ticket.status)} | ${priorityLabel(ticket.priority)}</span></div>
        <div class="button-row">
          ${canManage ? `<button class="icon-btn" type="button" data-ticket-status="${escapeHtml(ticket.id)}" data-status="pending">Beklet</button><button class="icon-btn" type="button" data-ticket-status="${escapeHtml(ticket.id)}" data-status="resolved">Coz</button>` : ""}
          <button class="icon-btn" type="button" data-ticket-status="${escapeHtml(ticket.id)}" data-status="${ticket.status === "closed" ? "open" : "closed"}">${ticket.status === "closed" ? "Yeniden ac" : "Kapat"}</button>
          ${canManage ? `<button class="icon-btn danger" type="button" data-ticket-delete="${escapeHtml(ticket.id)}">Sil</button>` : ""}
        </div>
      </div>
      <div class="message-list">${(ticket.messages || []).filter((message) => !message.internal || canManage).slice(-4).map((message) => `
        <div class="message-item"><strong>${escapeHtml(message.authorName)}</strong><span>${escapeHtml(message.body)}</span></div>
      `).join("") || "<p class=\"subtle\">Mesaj yok.</p>"}</div>
      <form class="inline-form" data-dynamic-form="ticket-message" data-ticket-id="${escapeHtml(ticket.id)}">
        <input name="body" placeholder="Cevap yaz" required>
        ${canManage ? "<label class=\"inline-check\"><input name=\"internal\" type=\"checkbox\"> <span>Admin notu</span></label>" : ""}
        <button class="ghost-btn" type="submit">Gonder</button>
      </form>
    </article>
  `).join("") || emptyState("Ticket yok.");
  $("#ticketSearch")?.addEventListener("input", renderTickets);
}

function renderAnnouncements() {
  const root = $("#announcementsRoot");
  if (!root) return;
  const canManage = hasPermission("createAnnouncements");
  root.innerHTML = `
    <section class="section-grid">
      ${canManage ? `<form class="surface form-stack" data-dynamic-form="announcement-create">
        <div class="section-head"><h2>Duyuru olustur</h2><span class="tag">Duyuru</span></div>
        <label>Baslik<input name="title" required></label>
        <label>Icerik<textarea name="body"></textarea></label>
        <div class="two-col"><label class="inline-check"><input name="pinned" type="checkbox"> <span>Sabitle</span></label><label class="inline-check"><input name="urgent" type="checkbox"> <span>Acil</span></label></div>
        <label class="inline-check"><input name="public" type="checkbox" checked> <span>Herkese acik</span></label>
        <div class="check-grid">${roleCheckboxes("targetRoles")}</div>
        <button class="primary-btn" type="submit">Duyuru yayinla</button>
      </form>` : ""}
      <section class="surface">
        <div class="section-head"><div><h2>Duyurular</h2><p>${announcements.length} kayit</p></div></div>
        <div class="module-list">${announcements.map((item) => `
          <article class="module-card ${item.urgent ? "urgent" : ""}">
            <div class="module-card-head">
              <div><strong>${item.pinned ? "[Sabit] " : ""}${escapeHtml(item.title)}</strong><span>${escapeHtml(item.createdByName || "")} | ${formatDate(item.createdAt)}</span></div>
              <div class="button-row"><button class="icon-btn" type="button" data-announcement-read="${escapeHtml(item.id)}">Okundu</button>${canManage ? `<button class="icon-btn danger" type="button" data-announcement-delete="${escapeHtml(item.id)}">Sil</button>` : ""}</div>
            </div>
            <p>${escapeHtml(item.body || "")}</p>
          </article>
        `).join("") || emptyState("Duyuru yok.")}</div>
      </section>
    </section>
  `;
}

function renderEvents() {
  const root = $("#calendarRoot");
  if (!root) return;
  const canManage = hasPermission("manageEvents");
  root.innerHTML = `
    <section class="section-grid">
      ${canManage ? `<form class="surface form-stack" data-dynamic-form="event-create">
        <div class="section-head"><h2>Etkinlik olustur</h2><span class="tag">Takvim</span></div>
        <label>Baslik<input name="title" required></label>
        <label>Tur<input name="type" placeholder="restart, toplantı, organizasyon"></label>
        <label>Konum<input name="location"></label>
        <label>Baslangic<input name="startAt" type="datetime-local" required></label>
        <label>Bitis<input name="endAt" type="datetime-local"></label>
        <label>Aciklama<textarea name="description"></textarea></label>
        <label>Hatirlatma<input name="reminder" placeholder="15 dakika once"></label>
        <div class="check-grid">${roleCheckboxes("targetRoles")}</div>
        <button class="primary-btn" type="submit">Etkinlik kaydet</button>
      </form>` : ""}
      <section class="surface">
        <div class="section-head"><div><h2>Takvim</h2><p>${events.length} etkinlik</p></div></div>
        <div class="module-list">${events.map((item) => `
          <article class="module-card">
            <div class="module-card-head">
              <div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.type || "event")} | ${formatDate(item.startAt)} | ${escapeHtml(item.location || "Konum yok")}</span></div>
              ${canManage ? `<button class="icon-btn danger" type="button" data-event-delete="${escapeHtml(item.id)}">Sil</button>` : ""}
            </div>
            <p>${escapeHtml(item.description || "")}</p>
          </article>
        `).join("") || emptyState("Etkinlik yok.")}</div>
      </section>
    </section>
  `;
}

function renderFiles() {
  const root = $("#filesRoot");
  if (!root) return;
  const canManage = hasPermission("uploadFiles");
  const categories = fileCategories.length ? fileCategories : ["Kurallar", "Basvuru belgeleri", "Log kayitlari", "Ekip belgeleri", "Sunucu belgeleri", "Sirket belgeleri", "Diger"];
  root.innerHTML = `
    <section class="section-grid">
      ${canManage ? `<form class="surface form-stack" data-dynamic-form="file-create">
        <div class="section-head"><div><h2>Dosya/link kaydi ekle</h2><p>Netlify Blobs aktifse dosya saklanir; degilse link kaydi olarak kullanabilirsin.</p></div><span class="tag">Upload / Link</span></div>
        <label>Baslik<input name="title" required></label>
        <label>PDF/ofis/gorsel yukle<input name="upload" type="file" accept=".pdf,.txt,.csv,.json,.zip,.docx,.xlsx,image/png,image/jpeg,image/webp,image/gif"></label>
        <label>Veya link<input name="url" type="url" placeholder="https://..."></label>
        <label>Kategori<select name="category">${categories.map((item) => `<option>${escapeHtml(item)}</option>`).join("")}</select></label>
        <label>Aciklama<textarea name="description"></textarea></label>
        <div class="check-grid">${roleCheckboxes("targetRoles")}</div>
        <button class="primary-btn" type="submit">Dosya kaydet</button>
      </form>` : ""}
      <section class="surface">
        <div class="section-head"><div><h2>Dosya merkezi</h2><p>${files.length} dosya/link kaydi</p></div></div>
        <div class="module-list">${files.map((item) => `
          <article class="module-card">
            <div class="module-card-head">
              <div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.category)} | ${escapeHtml(item.createdByName || "")} | ${formatDate(item.createdAt)}</span></div>
              <div class="button-row"><a class="ghost-btn" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">Ac</a>${canManage ? `<button class="icon-btn" type="button" data-file-edit="${escapeHtml(item.id)}">Duzenle</button><button class="icon-btn danger" type="button" data-file-delete="${escapeHtml(item.id)}">Sil</button>` : ""}</div>
            </div>
            <p>${escapeHtml(item.description || "")}</p>
          </article>
        `).join("") || emptyState("Dosya yok.")}</div>
      </section>
    </section>
  `;
}

function renderForms() {
  const root = $("#formsRoot");
  if (!root) return;
  const canManage = hasPermission("manageForms");
  const editingForm = editingFormId ? forms.find((item) => item.id === editingFormId) : null;
  root.innerHTML = `
    <section class="split-grid">
      ${canManage ? `<form class="surface form-stack form-builder" data-dynamic-form="form-create" id="formBuilderForm">
        <div class="section-head"><div><h2>${editingForm ? "Formu duzenle" : "Form olusturucu"}</h2><p>Alan tipi, zorunluluk ve secenekleri panelden yonet. Duzenleme yaparken eski cevaplar korunur.</p></div><span class="tag">Builder</span></div>
        <label>Baslik<input name="title" value="${escapeHtml(editingForm?.title || "")}" required></label>
        <label>Aciklama<textarea name="description">${escapeHtml(editingForm?.description || "")}</textarea></label>
        <div class="builder-list" id="formBuilderFields">${formFieldsToHtml(editingForm?.fields || [])}</div>
        <button class="ghost-btn" type="button" data-builder-add>Alan ekle</button>
        <label class="inline-check"><input name="active" type="checkbox" ${editingForm?.active === false ? "" : "checked"}> <span>Aktif</span></label>
        <div class="check-grid">${roleCheckboxes("targetRoles", editingForm?.targetRoles || [])}</div>
        <div class="button-row">
          <button class="primary-btn" type="submit">${editingForm ? "Formu guncelle" : "Formu kaydet"}</button>
          ${editingForm ? `<button class="ghost-btn" type="button" data-form-edit-cancel>Yeni form moduna don</button>` : ""}
        </div>
      </form>` : ""}
      <section class="surface">
        <div class="section-head"><div><h2>Formlar</h2><p>${forms.length} form</p></div></div>
        <div class="module-list">${forms.map((form) => `
          <article class="module-card ${editingFormId === form.id ? "selected" : ""}">
            <div class="module-card-head">
              <div><strong>${escapeHtml(form.title)}</strong><span>${form.active ? "Aktif" : "Pasif"} | ${form.fields?.length || 0} alan</span></div>
              <div class="button-row">${canManage ? `<button class="icon-btn" type="button" data-form-edit="${escapeHtml(form.id)}">Duzenle</button><button class="icon-btn" type="button" data-form-duplicate="${escapeHtml(form.id)}">Cogalt</button><button class="icon-btn" type="button" data-form-responses="${escapeHtml(form.id)}">Cevaplar</button><button class="icon-btn danger" type="button" data-form-delete="${escapeHtml(form.id)}">Sil</button>` : ""}</div>
            </div>
            <p>${escapeHtml(form.description || "")}</p>
            ${form.active !== false ? `<form class="form-stack compact-form" data-dynamic-form="form-response" data-form-id="${escapeHtml(form.id)}">
              ${(form.fields || []).map((field) => `<label>${escapeHtml(field.label)}<span class="subtle">${fieldTypeLabel(field.type)}</span>${renderFormAnswerInput(field)}</label>`).join("")}
              <button class="ghost-btn" type="submit">Cevap gonder</button>
            </form>` : ""}
            <div class="data-list hidden" id="responses-${escapeHtml(form.id)}"></div>
          </article>
        `).join("") || emptyState("Form yok.")}</div>
      </section>
    </section>
  `;
}

function renderUsers() {
  if (!hasPermission("viewUsers")) return;
  let host = $("#usersRoot");
  if (!host) {
    host = document.createElement("section");
    host.className = "surface";
    host.id = "usersRoot";
    $("#personnelView")?.appendChild(host);
  }
  const canCreate = hasPermission("createUsers");
  host.innerHTML = `
    <div class="section-head"><div><h2>Panel kullanicilari</h2><p>${users.length} hesap</p></div></div>
    ${canCreate ? `<form class="inline-form roomy" data-dynamic-form="user-create">
      <input name="name" placeholder="Ad" required>
      <input name="email" placeholder="Gmail" required>
      <input name="password" type="password" placeholder="Sifre" required>
      <select name="role">${roleOptions("member")}</select>
      <button class="primary-btn" type="submit">Kullanici ekle</button>
    </form>` : ""}
    <div class="table-wrap">
      <table><thead><tr><th>Kullanici</th><th>Rol</th><th>Departman</th><th>Son giris</th><th></th></tr></thead><tbody>
        ${users.map((user) => `<tr>
          <td><strong>${escapeHtml(user.name)}</strong><br><span class="subtle">${escapeHtml(user.email)}</span></td>
          <td>${escapeHtml(user.roleLabel || user.role)}</td>
          <td>${escapeHtml(user.department || "-")}</td>
          <td>${formatDate(user.lastLoginAt || user.createdAt)}</td>
          <td class="button-row">${hasPermission("editUsers") ? `<button class="icon-btn" type="button" data-user-role="${escapeHtml(user.id)}">Rol</button>` : ""}${hasPermission("deleteUsers") && user.id !== me.id ? `<button class="icon-btn danger" type="button" data-user-delete="${escapeHtml(user.id)}">Sil</button>` : ""}</td>
        </tr>`).join("") || `<tr><td colspan="5">${emptyState("Kullanici yok.")}</td></tr>`}
      </tbody></table>
    </div>
  `;
}

function renderInvitations() {
  const host = $("#inviteSettingsRoot");
  if (!host || !hasPermission("createUsers")) return;
  host.innerHTML = `
    <form class="inline-form roomy" data-dynamic-form="invite-create">
      <input name="name" placeholder="Kod adi" required>
      <input name="code" placeholder="Kod (bos birakirsan uretilir)">
      <select name="role">${roleOptions("member")}</select>
      <input name="maxUses" type="number" min="1" value="1">
      <input name="expiresAt" type="datetime-local">
      <button class="primary-btn" type="submit">Davet olustur</button>
    </form>
    <div class="data-list">${invitations.map((invite) => `
      <div class="data-row">
        <div><strong>${escapeHtml(invite.code)}</strong><span>${escapeHtml(invite.name)} | ${escapeHtml(invite.role)} | ${invite.usedBy?.length || 0}/${invite.maxUses || 1}</span></div>
        <div class="button-row"><button class="icon-btn" type="button" data-invite-toggle="${escapeHtml(invite.id)}">${invite.active === false ? "Aktif et" : "Pasifle"}</button><button class="icon-btn danger" type="button" data-invite-delete="${escapeHtml(invite.id)}">Sil</button></div>
      </div>
    `).join("") || emptyState("Davet kodu yok.")}</div>
  `;
}

function renderSettingsModules() {
  const root = $("#moduleSettingsRoot");
  if (!root) return;
  const purposeOptions = (purposeDefinitions || []).map((purpose) => `<option value="${escapeHtml(purpose.id)}" ${settings.purpose === purpose.id ? "selected" : ""}>${escapeHtml(purpose.label)}</option>`).join("");
  root.innerHTML = `
    <section class="section-grid">
      <form class="surface form-stack" data-dynamic-form="purpose-save">
        <div class="section-head"><h2>Panel kullanim amaci</h2><span class="tag">Preset</span></div>
        <label>Kullanim amaci<select name="purpose">${purposeOptions}</select></label>
        <label class="inline-check"><input name="applyPurposePreset" type="checkbox" checked> <span>Onerilen modulleri otomatik uygula</span></label>
        <button class="primary-btn" type="submit">Amaci kaydet</button>
      </form>
      <form class="surface form-stack" data-dynamic-form="modules-save">
        <div class="section-head"><h2>Modul yonetimi</h2><span class="tag">Admin</span></div>
        <div class="check-grid">${(moduleDefinitions || []).map((module) => `
          <label class="inline-check"><input name="modules" type="checkbox" value="${escapeHtml(module.id)}" ${settings.modules?.[module.id] !== false ? "checked" : ""}> <span>${escapeHtml(module.label)}</span></label>
        `).join("")}</div>
        <button class="primary-btn" type="submit">Modulleri kaydet</button>
      </form>
    </section>
    <section class="surface">
      <div class="section-head"><h2>Dashboard widgetlari</h2></div>
      <form class="check-grid" data-dynamic-form="widgets-save">${(widgetDefinitions || []).map((widget) => `
        <label class="inline-check"><input name="widgets" type="checkbox" value="${escapeHtml(widget.id)}" ${settings.widgets?.[widget.id] !== false ? "checked" : ""}> <span>${escapeHtml(widget.label)}</span></label>
      `).join("")}<button class="primary-btn" type="submit">Widgetlari kaydet</button></form>
    </section>
    <section class="surface">
      <div class="section-head"><h2>Davet kodlari</h2></div>
      <div id="inviteSettingsRoot"></div>
    </section>
  `;
  renderInvitations();
}

function renderRoleSettings() {
  const root = $("#roleSettingsRoot");
  if (!root) return;
  root.innerHTML = `
    <section class="surface">
      <div class="section-head"><div><h2>Rol ve yetki yonetimi</h2><p>Sayfa ve islem bazli izinler.</p></div></div>
      <form data-dynamic-form="permissions-save" class="role-matrix">
        ${(roleDefinitions || []).map((role) => `
          <article class="module-card">
            <strong>${escapeHtml(role.label)}</strong>
            <div class="check-grid">${(permissionDefinitions || []).map((permission) => `
              <label class="inline-check"><input name="${escapeHtml(role.id)}" value="${escapeHtml(permission.id)}" type="checkbox" ${settings.permissions?.[role.id]?.[permission.id] !== false ? "checked" : ""}> <span>${escapeHtml(permission.label)}</span></label>
            `).join("")}</div>
          </article>
        `).join("")}
        <button class="primary-btn" type="submit">Yetkileri kaydet</button>
      </form>
    </section>
  `;
}

function renderSecuritySettings() {
  const root = $("#securitySettingsRoot");
  if (!root) return;
  const security = settings.security || {};
  root.innerHTML = `
    <form class="surface form-stack" data-dynamic-form="security-save">
      <div class="section-head"><h2>Guvenlik ayarlari</h2><span class="tag">Security</span></div>
      <label>Hatali giris limiti<input name="failedLoginLimit" type="number" min="1" max="20" value="${escapeHtml(security.failedLoginLimit || 5)}"></label>
      <label>Deneme penceresi (dk)<input name="failedLoginWindowMinutes" type="number" min="1" max="120" value="${escapeHtml(security.failedLoginWindowMinutes || 15)}"></label>
      <label>Kilit suresi (dk)<input name="failedLoginLockMinutes" type="number" min="1" max="240" value="${escapeHtml(security.failedLoginLockMinutes || 15)}"></label>
      <label>Sifre sifirlama kod suresi (dk)<input name="resetCodeMinutes" type="number" min="5" max="60" value="${escapeHtml(security.resetCodeMinutes || 15)}"></label>
      <label>Kod deneme limiti<input name="resetCodeAttemptLimit" type="number" min="1" max="20" value="${escapeHtml(security.resetCodeAttemptLimit || 5)}"></label>
      <label class="inline-check"><input name="strongPassword" type="checkbox" ${security.strongPassword !== false ? "checked" : ""}> <span>Guclu sifre kontrolu</span></label>
      <label class="inline-check"><input name="twoFactorReady" type="checkbox" ${security.twoFactorReady ? "checked" : ""}> <span>Iki asamali dogrulama altyapisi hazir</span></label>
      <button class="primary-btn" type="submit">Guvenligi kaydet</button>
    </form>
  `;
}

function renderBackupSettings() {
  const root = $("#backupSettingsRoot");
  if (!root) return;
  root.innerHTML = `
    <section class="surface form-stack">
      <div class="section-head"><h2>Veri / yedekleme</h2><span class="tag">JSON</span></div>
      <div class="button-row">
        <button class="primary-btn" type="button" data-backup-export>JSON disa aktar</button>
        <label class="ghost-btn">JSON ice aktar<input class="hidden" id="backupImportFile" type="file" accept="application/json"></label>
      </div>
      <p class="subtle">Aktarim mevcut verilerle birlestirilir; eski kayitlar korunur.</p>
    </section>
  `;
}

function renderDiscordSettings() {
  const root = $("#discordSettingsRoot");
  if (!root) return;
  if (!hasPermission("manageDiscord")) {
    root.innerHTML = emptyState("Discord ayarlarini yonetmek icin yetki gerekli.");
    return;
  }
  const roleMap = settings.discordRoleMap || {};
  root.innerHTML = `
    <section class="section-grid">
      <form class="surface form-stack" data-dynamic-form="discord-settings-save">
        <div class="section-head"><div><h2>Discord ayarlari</h2><p>Webhook ve rol eslestirmeleri burada, bot token ise sadece .env / Netlify environment icinde tutulur.</p></div><span class="tag">Discord</span></div>
        <label>Webhook URL<input name="discordWebhookUrl" placeholder="${settings.discordWebhookUrl === "configured" ? "Webhook kayitli" : "https://discord.com/api/webhooks/..."}" value="${escapeHtml(safeSettingValue(settings.discordWebhookUrl))}"></label>
        <label>Sunucu / Guild ID<input name="discordGuildId" placeholder="${settings.discordGuildId === "configured" ? "Guild ID kayitli" : "Discord sunucu ID"}" value="${escapeHtml(safeSettingValue(settings.discordGuildId))}"></label>
        <div class="module-list">
          ${(roleDefinitions || []).map((role) => `
            <label>${escapeHtml(role.label)} rol ID<input name="discordRole_${escapeHtml(role.id)}" value="${escapeHtml(roleMap[role.id] || "")}" placeholder="Discord role ID"></label>
          `).join("")}
        </div>
        <p class="subtle">Rol verme/alma icin Netlify Environment Variables icinde DISCORD_BOT_TOKEN ve gerekirse DISCORD_GUILD_ID tanimli olmali.</p>
        <button class="primary-btn" type="submit">Discord ayarlarini kaydet</button>
      </form>
      <section class="surface">
        <div class="section-head"><div><h2>Rol senkronizasyonu</h2><p>Discord hesabi bagli kullanicilar icin panel rolu ile Discord rolunu esitle.</p></div></div>
        <div class="data-list">
          <div class="data-row">
            <div><strong>${escapeHtml(me?.name || "Ben")}</strong><span>${me?.discord?.id ? `Discord ID ${escapeHtml(me.discord.id)}` : "Discord baglantisi yok"}</span></div>
            <button class="ghost-btn" type="button" data-discord-role-sync="${escapeHtml(me?.id || "me")}" ${me?.discord?.id ? "" : "disabled"}>Rol sync</button>
          </div>
          ${(users || []).filter((user) => user.id !== me?.id).slice(0, 20).map((user) => `
            <div class="data-row">
              <div><strong>${escapeHtml(user.name)}</strong><span>${escapeHtml(user.roleLabel || user.role)} | ${user.discord?.id ? `Discord ID ${escapeHtml(user.discord.id)}` : "Discord yok"}</span></div>
              <button class="ghost-btn" type="button" data-discord-role-sync="${escapeHtml(user.id)}" ${user.discord?.id ? "" : "disabled"}>Rol sync</button>
            </div>
          `).join("") || ""}
        </div>
      </section>
    </section>
  `;
}

function renderFivemSettings() {
  const root = $("#fivemSettingsRoot");
  if (!root) return;
  const fivemCategories = commaList(settings.fivemCategories, fivemKinds.map(([, label]) => label));
  const fineRows = commaList(settings.fivemFineCatalog, fineCatalog.map((fine) => `${fine.label}|${fine.amount}|${fine.jail}`));
  root.innerHTML = `
    <section class="section-grid">
      <form class="surface form-stack" data-dynamic-form="fivem-settings-save">
        <div class="section-head"><div><h2>FiveM ayar odasi</h2><p>MDT, ceza, sabika, whitelist ve disiplin alt odalarinin gorunum kategorilerini yonet.</p></div><span class="tag">FiveM</span></div>
        <label>FiveM alt kategorileri<textarea name="fivemCategories">${escapeHtml(fivemCategories.join("\n"))}</textarea></label>
        <label>Ceza katalogu<textarea name="fivemFineCatalog" placeholder="Etiket|Tutar|Jail dakika">${escapeHtml(fineRows.join("\n"))}</textarea></label>
        <button class="primary-btn" type="submit">FiveM ayarlarini kaydet</button>
      </form>
      <section class="surface">
        <div class="section-head"><div><h2>Sunucu ve departman baglantilari</h2><p>Sunucu kartlari Sunucular sayfasindaki mevcut veriyle calisir; departmanlar Personel kategorisinde korunur.</p></div></div>
        <div class="mini-grid">
          <article class="mini-card"><span>Aktif sunucu</span><strong>${(settings.servers || []).filter((server) => server.enabled).length}</strong></article>
          <article class="mini-card"><span>Departman</span><strong>${(settings.departments || []).length}</strong></article>
          <article class="mini-card"><span>FiveM kaydi</span><strong>${fivemRecords.length}</strong></article>
          <article class="mini-card"><span>Ceza maddesi</span><strong>${fineRows.length}</strong></article>
        </div>
      </section>
    </section>
  `;
}

function renderNotificationSettings() {
  const root = $("#notificationSettingsRoot");
  if (!root) return;
  const prefs = settings.notificationPreferences || {};
  const categories = commaList(settings.fileCategories, fileCategories.length ? fileCategories : ["Kurallar", "Basvuru belgeleri", "Log kayitlari", "Ekip belgeleri", "Sunucu belgeleri", "Sirket belgeleri", "Diger"]);
  root.innerHTML = `
    <section class="section-grid">
      <form class="surface form-stack" data-dynamic-form="notification-settings-save">
        <div class="section-head"><div><h2>Bildirim ayarlari</h2><p>Yeni sistemlerin bildirim kategorileri buradan acilip kapatilabilir.</p></div><span class="tag">Notify</span></div>
        <div class="check-grid">${notificationTypes.map(([id, label]) => `
          <label class="inline-check"><input name="notificationTypes" value="${escapeHtml(id)}" type="checkbox" ${prefs[id] !== false ? "checked" : ""}> <span>${escapeHtml(label)}</span></label>
        `).join("")}</div>
        <label>Dosya merkezi kategorileri<textarea name="fileCategories">${escapeHtml(categories.join("\n"))}</textarea></label>
        <button class="primary-btn" type="submit">Bildirim/kategori ayarlarini kaydet</button>
      </form>
      <section class="surface">
        <div class="section-head"><div><h2>Bildirim merkezi</h2><p>Okundu/okunmadi durumu kullanici bazli tutulur.</p></div></div>
        <div class="mini-grid">
          <article class="mini-card"><span>Toplam bildirim</span><strong>${notifications.length}</strong></article>
          <article class="mini-card"><span>Okunmamis</span><strong>${notifications.filter((item) => !item.readAt).length}</strong></article>
          <article class="mini-card"><span>Dosya kategorisi</span><strong>${categories.length}</strong></article>
          <article class="mini-card"><span>Aktif tip</span><strong>${notificationTypes.filter(([id]) => prefs[id] !== false).length}</strong></article>
        </div>
      </section>
    </section>
  `;
}

function renderFivemRecords() {
  const root = $("#fivemRoot");
  if (!root) return;
  const totals = Object.fromEntries(fivemKinds.map(([kind]) => [kind, fivemRecords.filter((record) => record.kind === kind).length]));
  const activeFines = activeFineCatalog();
  root.innerHTML = `
    <section class="surface">
      <div class="section-head"><div><h2>FiveM kontrol merkezi</h2><p>MDT, ceza, sabika, whitelist, ban/warn/jail ve operasyon kayitlari ayri kategorilerde tutulur.</p></div></div>
      <div class="mini-grid">${fivemKinds.map(([kind, label]) => `<article class="mini-card"><span>${label}</span><strong>${totals[kind] || 0}</strong></article>`).join("")}</div>
    </section>
    <section class="section-grid">
      <form class="surface form-stack" data-dynamic-form="fivem-record-create" id="fivemRecordForm">
        <div class="section-head"><h2>FiveM islem kaydi</h2><span class="tag">MDT</span></div>
        <label>Sistem<select name="kind" id="fivemKindSelect">${fivemKinds.map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}</select></label>
        <label>Baslik<input name="title" required placeholder="Olay, kisi, karar veya basvuru basligi"></label>
        <label>Kisi / oyuncu / plaka<input name="subject" placeholder="Ad, citizenid, license, plaka"></label>
        <label>Ceza / sure / karar<input name="value" placeholder="Ceza tutari, hapis dk, karar"></label>
        <div class="dynamic-fields" id="fivemKindFields">${fivemFieldsHtml("mdt")}</div>
        <div class="fine-calculator">
          <strong>Ceza hesaplama</strong>
          <div class="check-grid">${activeFines.map((fine) => `<label class="inline-check"><input name="fineItems" type="checkbox" value="${escapeHtml(fine.id)}" data-fine-label="${escapeHtml(fine.label)}" data-fine-amount="${escapeHtml(fine.amount)}" data-fine-jail="${escapeHtml(fine.jail)}"> <span>${escapeHtml(fine.label)} (${escapeHtml(fine.amount)} TL / ${escapeHtml(fine.jail)} dk)</span></label>`).join("")}</div>
          <p class="subtle" id="fineTotal">Toplam: 0 TL / 0 dk</p>
        </div>
        <label>Aciklama / rapor<textarea name="description"></textarea></label>
        <button class="primary-btn" type="submit">Kayit ekle</button>
      </form>
      <section class="surface">
        <div class="section-head"><div><h2>FiveM kayitlari</h2><p>${fivemRecords.length} kayit</p></div><div class="button-row"><input class="compact-input" id="fivemRecordSearch" placeholder="Kayit ara"><select id="fivemRecordFilter"><option value="">Tum sistemler</option>${fivemKinds.map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}</select></div></div>
        <div class="module-list" id="fivemRecordList"></div>
      </section>
    </section>
  `;
  renderFivemRecordList();
  $("#fivemRecordFilter")?.addEventListener("change", renderFivemRecordList);
  $("#fivemRecordSearch")?.addEventListener("input", renderFivemRecordList);
  $("#fivemKindSelect")?.addEventListener("change", (event) => {
    $("#fivemKindFields").innerHTML = fivemFieldsHtml(event.target.value);
    updateFineTotal();
  });
  $("#fivemRecordForm")?.addEventListener("change", updateFineTotal);
  updateFineTotal();
}

function renderFivemRecordList() {
  const filter = $("#fivemRecordFilter")?.value || "";
  const query = ($("#fivemRecordSearch")?.value || "").trim().toLowerCase();
  const list = (filter ? fivemRecords.filter((record) => record.kind === filter) : fivemRecords)
    .filter((record) => !query || `${record.title} ${record.subject} ${record.value} ${record.description} ${record.status}`.toLowerCase().includes(query));
  $("#fivemRecordList").innerHTML = list.map((record) => `
    <article class="module-card">
      <div class="module-card-head">
        <div><strong>${escapeHtml(record.title)}</strong><span>${fieldKindLabel(record.kind, fivemKinds)} | ${escapeHtml(record.subject || "-")} | ${formatDate(record.createdAt)}</span></div>
        <button class="icon-btn danger" type="button" data-fivem-delete="${escapeHtml(record.id)}">Sil</button>
      </div>
      <p>${escapeHtml(record.description || record.value || "")}</p>
      ${record.data ? `<div class="record-meta">${Object.entries(record.data).filter(([key]) => !["fineItems", "fineTotal", "jailTotal"].includes(key)).slice(0, 5).map(([key, value]) => `<span class="tag">${escapeHtml(key)}: ${escapeHtml(value)}</span>`).join("")}</div>` : ""}
      <div class="button-row"><button class="icon-btn" type="button" data-fivem-edit="${escapeHtml(record.id)}">Duzenle</button></div>
      ${record.data?.fineTotal ? `<div class="data-row"><div><strong>Ceza toplami</strong><span>${escapeHtml(record.data.fineTotal)} TL / ${escapeHtml(record.data.jailTotal || 0)} dk</span></div></div>` : ""}
    </article>
  `).join("") || emptyState("FiveM kaydi yok.");
}

function fieldKindLabel(kind, list) {
  return list.find(([value]) => value === kind)?.[1] || kind;
}

function updateFineTotal() {
  const form = $("#fivemRecordForm");
  if (!form) return;
  const selected = Array.from(form.querySelectorAll("input[name='fineItems']:checked"));
  const amount = selected.reduce((sum, item) => sum + Number(item.dataset.fineAmount || 0), 0);
  const jail = selected.reduce((sum, item) => sum + Number(item.dataset.fineJail || 0), 0);
  $("#fineTotal").textContent = `Toplam: ${amount} TL / ${jail} dk`;
  if (form.elements.kind?.value === "fine") form.elements.value.value = `${amount} TL / ${jail} dk`;
}

function renderBusinessRecords() {
  const root = $("#businessRoot");
  if (!root) return;
  const totals = Object.fromEntries(businessKinds.map(([kind]) => [kind, businessRecords.filter((record) => record.kind === kind).length]));
  root.innerHTML = `
    <section class="surface">
      <div class="section-head"><div><h2>Genel yonetim odalari</h2><p>Musteri, stok, finans, izin ve toplanti kayitlari ayri kategori mantigiyla calisir.</p></div></div>
      <div class="mini-grid">${businessKinds.map(([kind, label]) => `<article class="mini-card"><span>${label}</span><strong>${totals[kind] || 0}</strong></article>`).join("")}</div>
    </section>
    <section class="section-grid">
      <form class="surface form-stack" data-dynamic-form="business-record-create" id="businessRecordForm">
        <div class="section-head"><div><h2>Genel kayit</h2><p>Secilen kategoriye gore ek alanlar degisir.</p></div><span class="tag">Business</span></div>
        <label>Tur<select name="kind" id="businessKindSelect">${businessKinds.map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}</select></label>
        <label>Baslik<input name="title" required></label>
        <label>Tutar / adet<input name="amount" type="number" step="0.01" value="0"></label>
        <label>Durum<select name="status"><option value="active">Aktif</option><option value="pending">Beklemede</option><option value="done">Tamamlandi</option><option value="archived">Arsiv</option></select></label>
        <div class="dynamic-fields" id="businessKindFields">${businessFieldsHtml("customer")}</div>
        <label>Aciklama<textarea name="description"></textarea></label>
        <button class="primary-btn" type="submit">Kayit ekle</button>
      </form>
      <section class="surface">
        <div class="section-head"><div><h2>Normal kullanim kayitlari</h2><p>${businessRecords.length} kayit</p></div><div class="button-row"><input class="compact-input" id="businessRecordSearch" placeholder="Kayit ara"><select id="businessRecordFilter"><option value="">Tum turler</option>${businessKinds.map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}</select></div></div>
        <div class="module-list" id="businessRecordList"></div>
      </section>
    </section>
  `;
  $("#businessKindSelect")?.addEventListener("change", (event) => {
    $("#businessKindFields").innerHTML = businessFieldsHtml(event.target.value);
  });
}


function renderSecurityCenter() {
  const root = $("#securityRoot");
  if (!root) return;
  const security = settings.security || {};
  root.innerHTML = `
    <section class="section-grid">
      <section class="surface form-stack">
        <div class="section-head"><h2>Hesap guvenligi</h2><span class="tag">Oturum</span></div>
        <p class="subtle">Sifre degistirme hesap ayarlari sekmesinde calisir. Buradan oturumlari gorebilir ve 2FA kurabilirsin.</p>
        <div class="button-row">
          <button class="ghost-btn" type="button" data-security-sessions>Aktif oturumlari goster</button>
          <button class="primary-btn danger" type="button" data-logout-all>Tum oturumlardan cik</button>
        </div>
        <div class="data-list" id="securitySessionsList">${emptyState("Oturumlari gormek icin yenile.")}</div>
      </section>
      <section class="surface form-stack">
        <div class="section-head"><h2>Iki asamali dogrulama</h2><span class="tag">${me?.twoFactorEnabled ? "Aktif" : "Kapali"}</span></div>
        <p class="subtle">Authenticator uygulamasinda 6 haneli TOTP kodu uretir. Login ekrani kod istemeyi otomatik acar.</p>
        <div class="button-row">
          <button class="ghost-btn" type="button" data-twofactor-setup>Kurulum anahtari olustur</button>
          ${me?.twoFactorEnabled ? `<form class="inline-form" data-dynamic-form="twofactor-disable"><input name="code" inputmode="numeric" placeholder="6 haneli kod" required><button class="icon-btn danger" type="submit">2FA kapat</button></form>` : ""}
        </div>
        <div class="data-list hidden" id="twoFactorSetupBox"></div>
        ${!me?.twoFactorEnabled ? `<form class="inline-form" data-dynamic-form="twofactor-enable"><input name="code" inputmode="numeric" placeholder="6 haneli kod" required><button class="primary-btn" type="submit">2FA etkinlestir</button></form>` : ""}
      </section>
      <section class="surface">
        <div class="section-head"><h2>Guvenlik altyapisi</h2></div>
        <div class="data-list">
          <div class="data-row"><div><strong>Hatali giris limiti</strong><span>${escapeHtml(security.failedLoginLimit || 5)} deneme / ${escapeHtml(security.failedLoginWindowMinutes || 15)} dk</span></div></div>
          <div class="data-row"><div><strong>Hesap kilidi</strong><span>${escapeHtml(security.failedLoginLockMinutes || 15)} dakika</span></div></div>
          <div class="data-row"><div><strong>Sifirlama kod suresi</strong><span>${escapeHtml(security.resetCodeMinutes || 15)} dakika, ${escapeHtml(security.resetCodeAttemptLimit || 5)} deneme</span></div></div>
          <div class="data-row"><div><strong>Iki asamali dogrulama</strong><span>${me?.twoFactorEnabled ? "Hesabinda aktif" : "Hesabinda kapali"}</span></div></div>
        </div>
      </section>
    </section>
  `;
}

function renderNotifications() {
  const unread = notifications.filter((item) => !item.readAt).length;
  $("#notificationBadge").textContent = unread;
  const panel = $("#notificationPanel");
  if (!panel) return;
  panel.innerHTML = `
    <div class="section-head compact"><h2>Bildirimler</h2><button class="ghost-btn" type="button" data-notifications-read>Okundu yap</button></div>
    <div class="data-list">${notifications.slice(0, 20).map((item) => `
      <button class="notification-item ${item.readAt ? "" : "unread"}" type="button" data-notification-read="${escapeHtml(item.id)}">
        <strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.message || "")}</span><small>${formatDate(item.createdAt)}</small>
      </button>
    `).join("") || emptyState("Bildirim yok.")}</div>
  `;
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

async function handleGlobalSearch(event) {
  const query = event.target.value.trim();
  const panel = $("#globalSearchResults");
  if (!panel) return;
  if (!query) {
    panel.classList.add("hidden");
    panel.innerHTML = "";
    return;
  }
  clearTimeout(handleGlobalSearch.timer);
  handleGlobalSearch.timer = setTimeout(async () => {
    try {
      const data = await api(`/api/search?q=${encodeURIComponent(query)}`);
      const results = data.results || {};
      const groups = Object.entries(results).filter(([, items]) => Array.isArray(items) && items.length);
      panel.innerHTML = groups.map(([group, items]) => `
        <section><strong>${escapeHtml(group)}</strong>${items.map((item) => `
          <button type="button" data-search-jump="${escapeHtml(group)}">${escapeHtml(item.title || item.name || item.action || item.id)}</button>
        `).join("")}</section>
      `).join("") || emptyState("Sonuc yok.");
      panel.classList.remove("hidden");
    } catch {
      panel.innerHTML = emptyState("Arama yapilamadi.");
      panel.classList.remove("hidden");
    }
  }, 220);
}

async function handleDynamicSubmit(event) {
  const form = event.target.closest("[data-dynamic-form]");
  if (!form) return;
  event.preventDefault();
  const kind = form.dataset.dynamicForm;
  const data = formJson(form);

  try {
    if (kind === "ticket-create") {
      await api("/api/tickets", { method: "POST", body: JSON.stringify(data) });
      form.reset();
      await Promise.all([loadTickets(), loadDashboardSummary(), loadNotifications(), loadLogs()]);
      showNotice("Ticket olusturuldu.");
    }
    if (kind === "ticket-message") {
      await api(`/api/tickets/${form.dataset.ticketId}/messages`, { method: "POST", body: JSON.stringify({ body: data.body, internal: data.internal === "on" }) });
      form.reset();
      await Promise.all([loadTickets(), loadNotifications(), loadLogs()]);
      showNotice("Mesaj gonderildi.");
    }
    if (kind === "announcement-create") {
      await api("/api/announcements", { method: "POST", body: JSON.stringify({ ...data, pinned: data.pinned === "on", urgent: data.urgent === "on", public: data.public === "on", targetRoles: checkedValues(form, "targetRoles") }) });
      form.reset();
      await Promise.all([loadAnnouncements(), loadDashboardSummary(), loadNotifications(), loadLogs()]);
      showNotice("Duyuru yayinlandi.");
    }
    if (kind === "event-create") {
      await api("/api/events", { method: "POST", body: JSON.stringify({ ...data, targetRoles: checkedValues(form, "targetRoles") }) });
      form.reset();
      await Promise.all([loadEvents(), loadDashboardSummary(), loadNotifications(), loadLogs()]);
      showNotice("Etkinlik kaydedildi.");
    }
    if (kind === "file-create") {
      const uploadFile = form.elements.upload?.files?.[0];
      const uploadPayload = uploadFile ? { dataUrl: await readFileAsDataUrl(uploadFile), fileName: uploadFile.name } : {};
      await api("/api/files", { method: "POST", body: JSON.stringify({ ...data, ...uploadPayload, targetRoles: checkedValues(form, "targetRoles") }) });
      form.reset();
      await Promise.all([loadFiles(), loadNotifications(), loadLogs()]);
      showNotice("Dosya kaydedildi.");
    }
    if (kind === "form-create") {
      const fields = collectFormBuilderFields(form);
      const payload = { ...data, active: data.active === "on", targetRoles: checkedValues(form, "targetRoles"), fields };
      if (editingFormId) {
        await api(`/api/forms/${editingFormId}`, { method: "PATCH", body: JSON.stringify(payload) });
        editingFormId = null;
        showNotice("Form guncellendi.");
      } else {
        await api("/api/forms", { method: "POST", body: JSON.stringify(payload) });
        showNotice("Form kaydedildi.");
      }
      form.reset();
      await Promise.all([loadForms(), loadLogs()]);
    }
    if (kind === "form-response") {
      const formDef = forms.find((item) => item.id === form.dataset.formId);
      const answers = {};
      for (const field of formDef?.fields || []) {
        answers[field.id] = field.type === "multiChoice" ? checkedMultiValue(form, field.id) : data[field.id] || "";
      }
      await api(`/api/forms/${form.dataset.formId}/responses`, { method: "POST", body: JSON.stringify({ answers }) });
      form.reset();
      await Promise.all([loadNotifications(), loadLogs()]);
      showNotice("Form cevabi gonderildi.");
    }
    if (kind === "project-task-create") {
      await api("/api/tasks", { method: "POST", body: JSON.stringify({ ...data, status: "todo" }) });
      form.reset();
      await Promise.all([loadWorkspace(), loadDashboardSummary(), loadLogs()]);
      showNotice("Gorev olusturuldu.");
    }
    if (kind === "user-create") {
      await api("/api/admin/users", { method: "POST", body: JSON.stringify(data) });
      form.reset();
      await Promise.all([loadUsers(), loadDashboardSummary(), loadLogs()]);
      showNotice("Kullanici olusturuldu.");
    }
    if (kind === "invite-create") {
      await api("/api/invitations", { method: "POST", body: JSON.stringify(data) });
      form.reset();
      await Promise.all([loadInvitations(), loadLogs()]);
      showNotice("Davet kodu olusturuldu.");
    }
    if (kind === "purpose-save") {
      await patchSettings({ ...settings, purpose: data.purpose, applyPurposePreset: data.applyPurposePreset === "on" }, "notice.settingsSaved");
      await refreshAll();
    }
    if (kind === "modules-save") {
      const selected = new Set(checkedValues(form, "modules"));
      const modules = Object.fromEntries((moduleDefinitions || []).map((module) => [module.id, selected.has(module.id)]));
      await patchSettings({ ...settings, modules }, "notice.settingsSaved");
      await refreshAll();
    }
    if (kind === "widgets-save") {
      const selected = new Set(checkedValues(form, "widgets"));
      const widgets = Object.fromEntries((widgetDefinitions || []).map((widget) => [widget.id, selected.has(widget.id)]));
      await patchSettings({ ...settings, widgets }, "notice.settingsSaved");
    }
    if (kind === "permissions-save") {
      const permissions = {};
      for (const role of roleDefinitions || []) {
        const selected = new Set(checkedValues(form, role.id));
        permissions[role.id] = Object.fromEntries((permissionDefinitions || []).map((permission) => [permission.id, selected.has(permission.id)]));
      }
      await patchSettings({ ...settings, permissions }, "notice.settingsSaved");
      await refreshAll();
    }
    if (kind === "security-save") {
      await api("/api/security/settings", { method: "PATCH", body: JSON.stringify({ ...data, strongPassword: data.strongPassword === "on", twoFactorReady: data.twoFactorReady === "on" }) });
      settings.security = { ...settings.security, ...data, strongPassword: data.strongPassword === "on", twoFactorReady: data.twoFactorReady === "on" };
      renderSecuritySettings();
      renderSecurityCenter();
      showNotice("Guvenlik ayarlari kaydedildi.");
    }
    if (kind === "discord-settings-save") {
      const discordRoleMap = {};
      for (const role of roleDefinitions || []) {
        const value = data[`discordRole_${role.id}`];
        if (value) discordRoleMap[role.id] = value;
      }
      await patchSettings({ ...settings, discordWebhookUrl: data.discordWebhookUrl || settings.discordWebhookUrl, discordGuildId: data.discordGuildId || settings.discordGuildId, discordRoleMap }, "notice.settingsSaved");
    }
    if (kind === "fivem-settings-save") {
      await patchSettings({ ...settings, fivemCategories: commaList(data.fivemCategories), fivemFineCatalog: commaList(data.fivemFineCatalog) }, "notice.settingsSaved");
      renderFivemRecords();
    }
    if (kind === "notification-settings-save") {
      const selected = new Set(checkedValues(form, "notificationTypes"));
      const notificationPreferences = Object.fromEntries(notificationTypes.map(([id]) => [id, selected.has(id)]));
      await patchSettings({ ...settings, notificationPreferences, fileCategories: commaList(data.fileCategories) }, "notice.settingsSaved");
      fileCategories = settings.fileCategories || fileCategories;
      renderFiles();
    }
    if (kind === "twofactor-enable") {
      const result = await api("/api/security/2fa/enable", { method: "POST", body: JSON.stringify(data) });
      me = result.user;
      renderSecurityCenter();
      showNotice("2FA etkinlestirildi.");
    }
    if (kind === "twofactor-disable") {
      const result = await api("/api/security/2fa/disable", { method: "POST", body: JSON.stringify(data) });
      me = result.user;
      renderSecurityCenter();
      showNotice("2FA kapatildi.");
    }
    if (kind === "fivem-record-create") {
      const fineItems = Array.from(form.querySelectorAll("input[name='fineItems']:checked")).map((item) => ({
        id: item.value,
        label: item.dataset.fineLabel || item.value,
        amount: Number(item.dataset.fineAmount || 0),
        jail: Number(item.dataset.fineJail || 0)
      }));
      const fineTotal = fineItems.reduce((sum, item) => sum + item.amount, 0);
      const jailTotal = fineItems.reduce((sum, item) => sum + item.jail, 0);
      await api("/api/fivem-records", { method: "POST", body: JSON.stringify({ ...data, data: { ...collectExtraFields(form, "fivemData"), fineItems, fineTotal, jailTotal } }) });
      form.reset();
      await Promise.all([loadFivemRecords(), loadLogs()]);
      showNotice("FiveM kaydi eklendi.");
    }
    if (kind === "business-record-create") {
      await api("/api/business-records", { method: "POST", body: JSON.stringify({ ...data, data: collectExtraFields(form, "businessData") }) });
      form.reset();
      await Promise.all([loadBusinessRecords(), loadLogs()]);
      showNotice("Kayit eklendi.");
    }
  } catch (error) {
    showNotice(error.data?.message || "Islem tamamlanamadi.", true);
  }
}

function initEvents() {
  document.addEventListener("submit", handleDynamicSubmit);

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

  $("#mobileNavToggle")?.addEventListener("click", () => document.body.classList.toggle("sidebar-open"));
  $("#notificationBtn")?.addEventListener("click", () => $("#notificationPanel")?.classList.toggle("hidden"));
  $("#globalSearch")?.addEventListener("input", handleGlobalSearch);
  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      $("#globalSearch")?.focus();
    }
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
  document.addEventListener("change", async (event) => {
    if (event.target?.id !== "backupImportFile") return;
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      await api("/api/admin/backup", { method: "POST", body: text });
      await refreshAll();
      showNotice("Yedek ice aktarildi.");
    } catch {
      showNotice("Yedek ice aktarilamadi.", true);
    } finally {
      event.target.value = "";
    }
  });

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
  const ticketStatus = event.target.closest("[data-ticket-status]");
  const ticketDelete = event.target.closest("[data-ticket-delete]");
  const announcementRead = event.target.closest("[data-announcement-read]");
  const announcementDelete = event.target.closest("[data-announcement-delete]");
  const eventDelete = event.target.closest("[data-event-delete]");
  const fileDelete = event.target.closest("[data-file-delete]");
  const fileEdit = event.target.closest("[data-file-edit]");
  const formEdit = event.target.closest("[data-form-edit]");
  const formDuplicate = event.target.closest("[data-form-duplicate]");
  const formResponsesButton = event.target.closest("[data-form-responses]");
  const formDelete = event.target.closest("[data-form-delete]");
  const formEditCancel = event.target.closest("[data-form-edit-cancel]");
  const userDelete = event.target.closest("[data-user-delete]");
  const userRole = event.target.closest("[data-user-role]");
  const inviteToggle = event.target.closest("[data-invite-toggle]");
  const inviteDelete = event.target.closest("[data-invite-delete]");
  const notificationRead = event.target.closest("[data-notification-read]");
  const notificationsRead = event.target.closest("[data-notifications-read]");
  const backupExport = event.target.closest("[data-backup-export]");
  const logoutAll = event.target.closest("[data-logout-all]");
  const fivemDelete = event.target.closest("[data-fivem-delete]");
  const fivemEdit = event.target.closest("[data-fivem-edit]");
  const businessDelete = event.target.closest("[data-business-delete]");
  const businessEdit = event.target.closest("[data-business-edit]");
  const builderAdd = event.target.closest("[data-builder-add]");
  const builderRemove = event.target.closest("[data-builder-remove]");
  const projectStatus = event.target.closest("[data-project-status]");
  const discordRoleSync = event.target.closest("[data-discord-role-sync]");
  const twoFactorSetup = event.target.closest("[data-twofactor-setup]");
  const securitySessions = event.target.closest("[data-security-sessions]");

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

    if (projectStatus) {
      await api(`/api/tasks/${projectStatus.dataset.projectStatus}`, { method: "PATCH", body: JSON.stringify({ status: projectStatus.dataset.status }) });
      await Promise.all([loadWorkspace(), loadDashboardSummary(), loadLogs()]);
      showNotice("Gorev durumu guncellendi.");
    }

    if (ticketStatus) {
      await api(`/api/tickets/${ticketStatus.dataset.ticketStatus}`, { method: "PATCH", body: JSON.stringify({ status: ticketStatus.dataset.status }) });
      await Promise.all([loadTickets(), loadDashboardSummary(), loadNotifications(), loadLogs()]);
      showNotice("Ticket guncellendi.");
    }

    if (ticketDelete) {
      if (!confirm("Ticket silinsin mi?")) return;
      await api(`/api/tickets/${ticketDelete.dataset.ticketDelete}`, { method: "DELETE" });
      await Promise.all([loadTickets(), loadDashboardSummary(), loadLogs()]);
      showNotice("Ticket silindi.");
    }

    if (announcementRead) {
      await api(`/api/announcements/${announcementRead.dataset.announcementRead}/read`, { method: "POST" });
      await loadAnnouncements();
      showNotice("Duyuru okundu olarak isaretlendi.");
    }

    if (announcementDelete) {
      if (!confirm("Duyuru silinsin mi?")) return;
      await api(`/api/announcements/${announcementDelete.dataset.announcementDelete}`, { method: "DELETE" });
      await Promise.all([loadAnnouncements(), loadDashboardSummary(), loadLogs()]);
      showNotice("Duyuru silindi.");
    }

    if (eventDelete) {
      if (!confirm("Etkinlik silinsin mi?")) return;
      await api(`/api/events/${eventDelete.dataset.eventDelete}`, { method: "DELETE" });
      await Promise.all([loadEvents(), loadDashboardSummary(), loadLogs()]);
      showNotice("Etkinlik silindi.");
    }

    if (fileEdit) {
      const file = files.find((item) => item.id === fileEdit.dataset.fileEdit);
      if (!file) return;
      const title = prompt("Dosya basligi", file.title);
      if (!title) return;
      const description = prompt("Aciklama", file.description || "") ?? file.description;
      await api(`/api/files/${file.id}`, { method: "PATCH", body: JSON.stringify({ title, description }) });
      await Promise.all([loadFiles(), loadLogs()]);
      showNotice("Dosya guncellendi.");
    }

    if (fileDelete) {
      if (!confirm("Dosya kaydi silinsin mi?")) return;
      await api(`/api/files/${fileDelete.dataset.fileDelete}`, { method: "DELETE" });
      await Promise.all([loadFiles(), loadLogs()]);
      showNotice("Dosya silindi.");
    }

    if (formEdit) {
      const formDef = forms.find((item) => item.id === formEdit.dataset.formEdit);
      if (!formDef) return;
      editingFormId = formDef.id;
      renderForms();
      document.querySelector("#formsRoot")?.scrollIntoView({ behavior: "smooth", block: "start" });
      showNotice("Form duzenleme moduna alindi.");
    }

    if (formEditCancel) {
      editingFormId = null;
      renderForms();
      showNotice("Yeni form moduna donuldu.");
    }

    if (formDuplicate) {
      await api(`/api/forms/${formDuplicate.dataset.formDuplicate}`, { method: "PATCH", body: JSON.stringify({ duplicate: true }) });
      await Promise.all([loadForms(), loadLogs()]);
      showNotice("Form cogaltildi.");
    }

    if (formResponsesButton) {
      const formId = formResponsesButton.dataset.formResponses;
      const target = $(`#responses-${CSS.escape(formId)}`);
      if (!target) return;
      if (!target.classList.contains("hidden")) {
        target.classList.add("hidden");
        return;
      }
      const data = await api(`/api/forms/${formId}/responses`);
      const formDef = forms.find((item) => item.id === formId);
      target.innerHTML = (data.responses || []).map((response) => `<div class="data-row stacked"><div><strong>${escapeHtml(response.createdByName)}</strong><span>${formatDate(response.createdAt)}</span>${responseAnswersHtml(formDef, response)}</div><button class="icon-btn danger" type="button" data-response-delete="${escapeHtml(response.id)}">Sil</button></div>`).join("") || emptyState("Cevap yok.");
      target.classList.remove("hidden");
    }

    const responseDelete = event.target.closest("[data-response-delete]");
    if (responseDelete) {
      await api(`/api/form-responses/${responseDelete.dataset.responseDelete}`, { method: "DELETE" });
      await loadForms();
      showNotice("Cevap silindi.");
    }

    if (formDelete) {
      if (!confirm("Form ve cevaplari silinsin mi?")) return;
      await api(`/api/forms/${formDelete.dataset.formDelete}`, { method: "DELETE" });
      await Promise.all([loadForms(), loadLogs()]);
      showNotice("Form silindi.");
    }

    if (userRole) {
      const selected = prompt("Yeni rol: founder, admin, moderator, staff, leader, member, guest");
      if (!selected) return;
      await api(`/api/admin/users/${userRole.dataset.userRole}`, { method: "PATCH", body: JSON.stringify({ role: selected }) });
      await Promise.all([loadUsers(), loadLogs()]);
      showNotice("Rol guncellendi.");
    }

    if (userDelete) {
      if (!confirm("Kullanici silinsin mi?")) return;
      await api(`/api/admin/users/${userDelete.dataset.userDelete}`, { method: "DELETE" });
      await Promise.all([loadUsers(), loadDashboardSummary(), loadLogs()]);
      showNotice("Kullanici silindi.");
    }

    if (inviteToggle) {
      const invite = invitations.find((item) => item.id === inviteToggle.dataset.inviteToggle);
      await api(`/api/invitations/${inviteToggle.dataset.inviteToggle}`, { method: "PATCH", body: JSON.stringify({ active: invite?.active === false }) });
      await Promise.all([loadInvitations(), loadLogs()]);
      showNotice("Davet guncellendi.");
    }

    if (inviteDelete) {
      if (!confirm("Davet kodu silinsin mi?")) return;
      await api(`/api/invitations/${inviteDelete.dataset.inviteDelete}`, { method: "DELETE" });
      await Promise.all([loadInvitations(), loadLogs()]);
      showNotice("Davet silindi.");
    }

    if (notificationRead) {
      await api(`/api/notifications/${notificationRead.dataset.notificationRead}`, { method: "PATCH" });
      await loadNotifications();
    }

    if (notificationsRead) {
      await api("/api/notifications/read-all", { method: "PATCH" });
      await loadNotifications();
    }

    if (backupExport) {
      const data = await api("/api/admin/backup");
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `syncora-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(link.href);
      showNotice("Yedek hazirlandi.");
    }

    if (logoutAll) {
      await api("/api/security/logout-all", { method: "POST" });
      window.location.href = "/index.html";
    }

    if (discordRoleSync) {
      const userId = discordRoleSync.dataset.discordRoleSync;
      await api("/api/discord/role-sync", { method: "POST", body: JSON.stringify(userId && userId !== me?.id ? { userId } : {}) });
      showNotice("Discord rol senkronizasyonu tamamlandi.");
    }

    if (twoFactorSetup) {
      const result = await api("/api/security/2fa/setup", { method: "POST" });
      const box = $("#twoFactorSetupBox");
      if (box) {
        box.innerHTML = `
          <div class="data-row"><div><strong>Secret</strong><span>${escapeHtml(result.secret)}</span></div></div>
          <div class="data-row"><div><strong>Authenticator URI</strong><span>${escapeHtml(result.otpauthUrl)}</span></div></div>
          ${result.sampleCode ? `<div class="data-row"><div><strong>Test kodu</strong><span>${escapeHtml(result.sampleCode)}</span></div></div>` : ""}
        `;
        box.classList.remove("hidden");
      }
      showNotice("2FA kurulum anahtari olusturuldu.");
    }

    if (securitySessions) {
      const result = await api("/api/security/sessions");
      const box = $("#securitySessionsList");
      if (box) {
        box.innerHTML = (result.sessions || []).map((session) => `
          <div class="data-row"><div><strong>${escapeHtml(session.userName || "Oturum")}</strong><span>${formatDate(session.createdAt)} - ${formatDate(session.expiresAt)}</span></div><span class="status-pill">${session.remember ? "Kalici" : "Standart"}</span></div>
        `).join("") || emptyState("Aktif oturum yok.");
      }
    }

    if (fivemEdit) {
      const record = fivemRecords.find((item) => item.id === fivemEdit.dataset.fivemEdit);
      if (!record) return;
      const title = prompt("Kayit basligi", record.title);
      if (!title) return;
      const status = prompt("Durum", record.status || "active") || record.status;
      const description = prompt("Aciklama", record.description || "") ?? record.description;
      await api(`/api/fivem-records/${record.id}`, { method: "PATCH", body: JSON.stringify({ title, status, description }) });
      await Promise.all([loadFivemRecords(), loadLogs()]);
      showNotice("FiveM kaydi guncellendi.");
    }

    if (fivemDelete) {
      if (!confirm("FiveM kaydi silinsin mi?")) return;
      await api(`/api/fivem-records/${fivemDelete.dataset.fivemDelete}`, { method: "DELETE" });
      await Promise.all([loadFivemRecords(), loadLogs()]);
      showNotice("FiveM kaydi silindi.");
    }

    if (businessEdit) {
      const record = businessRecords.find((item) => item.id === businessEdit.dataset.businessEdit);
      if (!record) return;
      const title = prompt("Kayit basligi", record.title);
      if (!title) return;
      const status = prompt("Durum", record.status || "active") || record.status;
      const amount = prompt("Tutar / adet", record.amount || 0) || record.amount;
      const description = prompt("Aciklama", record.description || "") ?? record.description;
      await api(`/api/business-records/${record.id}`, { method: "PATCH", body: JSON.stringify({ title, status, amount, description }) });
      await Promise.all([loadBusinessRecords(), loadLogs()]);
      showNotice("Kayit guncellendi.");
    }

    if (businessDelete) {
      if (!confirm("Kayit silinsin mi?")) return;
      await api(`/api/business-records/${businessDelete.dataset.businessDelete}`, { method: "DELETE" });
      await Promise.all([loadBusinessRecords(), loadLogs()]);
      showNotice("Kayit silindi.");
    }

    if (builderAdd) {
      $("#formBuilderFields")?.insertAdjacentHTML("beforeend", formFieldsToHtml([{ id: cryptoRandomId(), label: "", type: "shortText", required: false, options: [] }]));
    }

    if (builderRemove) {
      const row = builderRemove.closest("[data-builder-field]");
      if (row && $$("#formBuilderFields [data-builder-field]").length > 1) row.remove();
    }
  } catch (error) {
    showNotice(error.data?.message || error.message || t("notice.actionFailed"), true);
  }
}

async function init() {
  try {
    const bootstrap = await api("/api/bootstrap");
    me = bootstrap.user;
    settings = bootstrap.settings;
    discordEnabled = bootstrap.discordEnabled;
    moduleDefinitions = bootstrap.modules || [];
    roleDefinitions = bootstrap.roles || [];
    permissionDefinitions = bootstrap.permissions || [];
    purposeDefinitions = bootstrap.purposes || [];
    widgetDefinitions = bootstrap.widgets || [];
    dashboardSummary = bootstrap.dashboard || {};
    applySettings();
    renderServerConfig();
    renderDiscordIntegration();
    renderDashboardWidgets();
    renderTickets();
    renderAnnouncements();
    renderEvents();
    renderFiles();
    renderForms();
    renderFivemRecords();
    renderBusinessRecords();
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
