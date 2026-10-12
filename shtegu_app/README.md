# Shtegu Android Testing App (Flutter MVP)

Prototip funksional për testimin e rrjetit autonom të parkimit urban në Prishtinë (**Shtegu**).
Ky aplikacion ofron dy module kryesore:
1. **Shoferi (Driver Flow & Reservation)** — Eksperiencë e plotë për drejtuesin e automjetit me kuletë dixhitale, zbulim vendesh në Pejton, dhe ulje barrierash me makinë gjendjesh me 3 hapa.
2. **Laboratori BLE (Hardware Debugger & Terminal)** — Konsolë inxhinierike për testimin e drejtpërdrejtë të barrierës fizike mbi protokollin **Nordic UART Service (NUS)** me mbështetje për testim me dhe pa hardware fizike ("Simulo pa Hardware").

---

## 🎨 Identiteti Vizual & Tema
- **Sfondi Kryesor:** Asfalt mat (`#0B0B0D`)
- **Sipërfaqet e Kartelave:** Qymyr i errët (`#16181D`)
- **Ngjyra e Sigurisë & Trafikut:** E verdhë e theksuar / Hazard Yellow (`#FFB703`)
- **Tipografia:** E bardhë me kontrast të lartë (`#FFFFFF`) dhe zink i zbutur (`#8F96A3`)
- **Logoja:** Mascot me macen që shkel syrin me medaljon "P" (`assets/images/cat_logo_clean.jpg`).

---

## 📱 Struktura e Aplikacionit

### 1. Tab 1: "Shoferi" (Driver Flow)
- **Kuleta e Drejtuesit:** Paraqet balancin live (fillestar: `€15.00`) me chip-in interaktiv `+ Mbush Kuletën` (opsione të shpejta: `€5`, `€10`, `€15`).
- **Zona Aktive (Pejton — Korridori 1):**
  - `Vendi P-01 (Rr. Perandori Justinian)` — Status: **I LIRË** (Chip i gjelbër `#10B981`, 45m ecje, €1.00/orë)
  - `Vendi P-02 (Rr. Pashko Vasa)` — Status: **I ZËNË** (Chip i kuq `#EF4444`, 120m ecje)
  - `Vendi P-03 (Afër Teatrit ODA)` — Status: **I LIRË** (Chip i gjelbër `#10B981`, 85m ecje, €1.00/orë)
- **Modal i Vendit të Parkimit & Makina e Gjendjeve:**
  - Buton masiv Hazard Yellow: **"ULE BARRIERËN"**.
  - Sekuencë e animuar automatike:
    1. `Duke verifikuar çelësin me cloud...` (1 sekondë)
    2. `Duke dërguar komandën BLE...` (1 sekondë, dërgon kornizën 20-bajtshe në GATT)
    3. `Barriera u ul! Parkim i suksesshëm.` (Nis kronometrin e seancës aktive me llogaritje kostoje).
  - Buton emergjence: **"Vendi është i zënë? Riruto automatikisht"** për ridrejtim të menjëhershëm në vendin më të afërt të lirë.

---

### 2. Tab 2: "Laboratori BLE" (Hardware Test Bench)
- **UUID-të e Shërbimit Nordic UART (NUS):**
  - **Service UUID:** `6E400001-B5A3-F393-E0A9-E50E24DCCA9E`
  - **TX Characteristic (Write):** `6E400002-B5A3-F393-E0A9-E50E24DCCA9E`
  - **RX Characteristic (Notify/Read):** `6E400003-B5A3-F393-E0A9-E50E24DCCA9E`
- **Skanim & Identifikim:**
  - Skanon fenerët BLE që fillojnë me prefiksin `DN...` ose ofrojnë shërbimin NUS.
  - Kartelë për çdo pajisje me fuqinë e sinjalit **RSSI (dBm)**, MAC Address dhe buton Lidhu/Shkëputu.
- **Komandat e Shpejta:**
  - `0x01`: Ule Krahun (Drop Barrier)
  - `0x02`: Ngrite Krahun (Raise Barrier)
  - `0x03`: Auto-Raise on Departure (Ngrite automatikisht pas largimit)
- **Struktura e Kornizës 20-Bajtshe:**
  ```text
  [0x44, 0x44, 0x54, 0x43]   -> STX Magic ("DDTC")
  [0x14, 0xFF]               -> Gjatësia (20) & Shënuesi
  [0x14, CMD]                -> Kategoria & Komanda (0x01, 0x02, 0x03)
  [KEY0, KEY1, KEY2, KEY3]   -> 4-Byte Çelësi i autorizimit i derivuar nga MAC/Cloud
  [0x00 x 6, 0x45]           -> Padding i rezervuar dhe Delimiter ETX
  [BCC]                      -> XOR Checksum i 18 bajtave të para
  [0x0A]                     -> Linefeed delimiter
  ```
- **Konsola Live Hex Log:**
  - Dritare terminali në kohë reale me scroll automatik që shfaq transmetimet `TX`, përgjigjet `RX` dhe njoftimet e sistemit `SYS` me pullë kohore dhe paraqitje heksadecimale.
- **Mock Switch ("Simulo pa Hardware"):**
  - Mundëson testimin dhe demonstrimin e plotë të të gjitha funksioneve në çdo telefon Android pa patur nevojë për barrierë fizike pranë.

---

## 🚀 Si të ekzekutohet dhe ndërtohet APK

### 1. Përgatitja e varësive
```bash
cd shtegu_app
flutter pub get
```

### 2. Ekzekutimi në pajisje ose emulator
```bash
flutter run
```

### 3. Ndërtimi i APK-së Release
```bash
flutter build apk --release
```
APK-ja e gjeneruar do të ndodhet në:
`build/app/outputs/flutter-apk/app-release.apk`

---

## 🔒 Lejet në Android (`AndroidManifest.xml`)
Aplikacioni përmban të gjitha lejet e nevojshme sipas standardeve të Android 12+:
- `android.permission.BLUETOOTH_SCAN`
- `android.permission.BLUETOOTH_CONNECT`
- `android.permission.BLUETOOTH_ADVERTISE`
- `android.permission.ACCESS_FINE_LOCATION`
- `android.permission.BLUETOOTH` & `BLUETOOTH_ADMIN` (për pajisje me Android <= 11)
- `android.hardware.bluetooth_le` (hardware feature)
- `minSdkVersion = 21`
