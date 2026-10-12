# SHTEGU — Autonomous Urban Micro-Parking Network 🅿️⚡

> **Investor Briefing, Municipal Operations Center & Android Prototyping Platform**  
> *Prepared for Driton Hapçiu • Prishtina Pilot 2026*

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.3-purple?style=flat&logo=vite)](https://vite.dev)
[![Leaflet](https://img.shields.io/badge/Leaflet-Geoapify-green?style=flat&logo=leaflet)](https://leafletjs.com)
[![Flutter](https://img.shields.io/badge/Flutter-Mobile_App-02569B?style=flat&logo=flutter)](https://flutter.dev)

---

## 🚀 Key Features

1. **🔐 Password-Protected Executive Access Gate**:
   - Built-in client-side gatekeeper protecting the executive briefing, telemetry, and financial terms.
   - Default Passcode: `SHTEGU2026` (also accepts `DRITON2026`, `PRISHTINA2026`).
   - 1-Click Investor Demo Access option for seamless presentations.
   - Authentication remembered in `localStorage` with a 1-click lock button in the top navigation.

2. **🗺️ Interactive Geoapify Spatial Digital Twin**:
   - Geoapify Vector & Dark Matter Yellow Roads tiles (`apiKey: c8878e4857d34392a4ba89fc327116f6`).
   - Live Prishtina geocoding search with autocomplete (Pejton & Qendër).
   - Dynamic pulsing stall markers (Free 🟢, Occupied 🔴, Selected 🟡).

3. **🎮 1-Click Enterprise Demo Presets**:
   - 🚨 **Scenario 1: Tamper & Siren Alert (P-04)** — 100 dB acoustic siren and municipal security dispatch.
   - 🚙 **Scenario 2: Corporate Fleet LPR Autopass** — Automated license plate scan (`01-842-AB` Audi A6) and barrier drop.
   - ⚡ **Scenario 3: Stadium Surge Pricing (2.5x)** — Fadil Vokrri match rush dynamic pricing engine.
   - 🚒 **Scenario 4: Green Corridor Evacuation** — Simultaneous 12-barrier override for ambulances.
   - 🔋 **Scenario 5: Low Solar Eco Beacon** — Nordic low-power BLE mode.

4. **📡 Nordic nRF52840 Telemetry & Firmware OTA**:
   - Hardware telemetry matrix: LiFePO4 3.24V battery, solar MPPT wattage, motor actuator lift lifetime cycles, 3-axis accelerometer, BLE RSSI.
   - Simulated BLE Mesh Over-The-Air (OTA) DFU firmware deployment (`Shtegu-v2.4.2-ATK.bin`).

5. **🏢 B2B Corporate Fleet Hub**:
   - Accounts for BKT Banka Kosovës, KEDS, IPKO, and Dukagjini Group.
   - LPR Whitelist with instant gate drop.
   - Modal for registering new fleet vehicles.

6. **📱 Android Prototype & BLE Lab (`shtegu_app/`)**:
   - Flutter driver mobile app.
   - Virtual 20-Byte Nordic NUS Packet Inspector (`44 44 54 43` preamble, HMAC rolling token, BCC checksum).
   - ATK-compliant digital fiscal receipt with QR code.

---

## 🌐 Deploying to Vercel with Custom Domain

### Step 1: Connect to Vercel
1. Log in to [vercel.com](https://vercel.com) using your GitHub account (`besmiribrahimi`).
2. Click **"Add New..."** → **"Project"**.
3. Import the repository **`besmiribrahimi/shtegu`**.
4. Framework Preset will automatically detect **Vite**.
5. Click **"Deploy"**.

### Step 2: Add Your Custom Domain
1. In the Vercel project dashboard, navigate to **Settings** → **Domains**.
2. Type your domain (e.g. `shtegu.app` or `www.shtegu.app`) and click **"Add"**.
3. Configure your DNS provider with the records provided by Vercel:
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME Record**: `www` → `cname.vercel-dns.com`
4. Once DNS propagates (typically 1–5 minutes), Vercel automatically issues a free SSL certificate.

### Step 3: Password Protection
- **Option A (Built-in, Included Free)**: The app already has the built-in dark matter **Access Gate** enabled. Visitors must enter `SHTEGU2026` or click 1-click preview.
- **Option B (Vercel Edge Protection)**: If you are on a Vercel Pro plan, you can also enable **Settings** → **Deployment Protection** → **Password Protection**.

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/besmiribrahimi/shtegu.git
cd shtegu

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📄 License & Confidentiality
Confidential and Proprietary. Prepared for investor syndicates and municipal stakeholders in Prishtina, Kosovo.
