import React from 'react';

export default function DocumentView({ lang = 'sq' }) {
  const isSq = lang === 'sq';

  return (
    <div className="deck-container" style={{ maxWidth: '880px' }}>
      <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '48px 56px' }}>
        {/* Memo Header */}
        <div style={{ borderBottom: '2px solid var(--text-primary)', paddingBottom: '20px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src="/cat_logo_clean.jpg"
                alt="Shtegu Logo"
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--border-medium)' }}
              />
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>
                  {isSq ? 'MEMORANDUM MASTER INVESTIMI • SHTEGU.APP' : 'MASTER EXECUTIVE BRIEFING • SHTEGU.APP'}
                </div>
                <h1 style={{ fontSize: '28px', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {isSq ? 'Shtegu: Rrjeti Autonom i Vendparkimeve Urbane' : 'Shtegu: Autonomous Urban Micro-Parking Network'}
                </h1>
              </div>
            </div>
            <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
              <div>{isSq ? 'DATA: TETOR 2026' : 'DATE: OCTOBER 2026'}</div>
              <div>{isSq ? 'VENDNDODHJA: PRISHTINË, KOSOVË' : 'LOCATION: PRISHTINA, KOSOVO'}</div>
              <div>{isSq ? 'PRANUESI: DRITON HAPÇIU' : 'RECIPIENT: DRITON HAPÇIU'}</div>
            </div>
          </div>

          <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            <strong>{isSq ? 'Lënda:' : 'Subject:'}</strong>{' '}
            {isSq
              ? 'Raundi Fillestar i Financimit Angel (€25,000 – €30,000 për 15.0% Aksione të Zakonshme) me modelin e ri të tarifës së montimit €50 dhe kthimit të përshpejtuar brenda 50 ditëve në Prishtinë.'
              : 'Seed Angel Financing Round (€25,000 – €30,000 for 15.0% Common Equity) featuring the €50 upfront host onboarding fee and accelerated 50-day capital payback in Prishtina.'}
          </div>
        </div>

        {/* Section 1: Executive Thesis */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '18px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px', marginBottom: '14px' }}>
            {isSq ? '1. Teza Ekzekutive: Arbitrazhi Urban' : '1. Executive Thesis: The Urban Arbitrage'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: '1.7' }}>
            {isSq
              ? 'Qendrat tregtare dhe administrative të Prishtinës (Pejton, Qendër, Qafë) vuajnë nga mungesa e theksuar e vendparkimeve, me shoferë që qarkullojnë 20 deri 40 minuta për një vend të vetëm. Njëkohësisht, qindra hyrje private, oborre dhe vende të rezervuara qëndrojnë krejt të zbrazëta pas drynave apo zinxhirëve gjatë orarit të punës.'
              : "Prishtina's commercial centers (Pejton, Qendër, Qafa) suffer severe parking friction, with drivers circulating 20 to 40 minutes per trip. Concurrently, hundreds of private driveways, residential courtyards, and reserved professional spots sit idle during peak business hours behind manual padlocks or chains."}
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.7' }}>
            {isSq ? (
              <>
                <strong>Shtegu</strong> e kthen këtë asfalt të bllokuar në një treg automatik parkimi. Barriera inteligjente autonome me energji diellore dhe Bluetooth (BLE) vendosen direkt mbi beton pa asnjë gërmim apo leje komunale. Shoferët zbulojnë, rezervojnë dhe ulin barrierën me 1 klikim në aplikacion.
              </>
            ) : (
              <>
                <strong>Shtegu</strong> converts this locked asphalt into an automated parking marketplace. Surface-mounted, solar-powered, BLE barriers deploy directly onto private concrete with zero municipal civil works or street trenching required.
              </>
            )}
          </p>

          <div className="grid-4" style={{ gap: '12px', marginTop: '18px' }}>
            <div className="stat-box" style={{ padding: '14px' }}>
              <div className="stat-label">{isSq ? 'Capex Neto / Vend' : 'Net CapEx / Stall'}</div>
              <div className="stat-value" style={{ fontSize: '20px' }}>€60</div>
              <div className="stat-sub">{isSq ? '€110 kosto - €50 tarifë' : '€110 landed - €50 fee'}</div>
            </div>
            <div className="stat-box" style={{ padding: '14px' }}>
              <div className="stat-label">{isSq ? 'FCF Neto / Muaj' : 'Net FCF / Mo'}</div>
              <div className="stat-value" style={{ fontSize: '20px', color: 'var(--accent-green)' }}>€35.90</div>
              <div className="stat-sub">{isSq ? 'Për njësi aktive' : 'Per active stall'}</div>
            </div>
            <div className="stat-box" style={{ padding: '14px' }}>
              <div className="stat-label">{isSq ? 'Kthimi i Kapitalit' : 'Payback Velocity'}</div>
              <div className="stat-value" style={{ fontSize: '20px', color: 'var(--accent-blue)' }}>50 {isSq ? 'Ditë' : 'Days'}</div>
              <div className="stat-sub">{isSq ? '~1.67 Muaj' : '~1.67 Months'}</div>
            </div>
            <div className="stat-box" style={{ padding: '14px' }}>
              <div className="stat-label">{isSq ? 'Alokimi Angel' : 'Angel Tranche'}</div>
              <div className="stat-value" style={{ fontSize: '20px' }}>€25k – €30k</div>
              <div className="stat-sub">{isSq ? '15% Aksione' : '15% Equity'}</div>
            </div>
          </div>
        </section>

        {/* Section 2: Core Business Model */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '18px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px', marginBottom: '14px' }}>
            {isSq ? '2. Modeli Kryesor i Biznesit: 3 Nivelet Operacionale' : '2. Core Business Model: The 3 Operating Modes'}
          </h2>
          <table className="exec-table">
            <thead>
              <tr>
                <th>{isSq ? 'Niveli' : 'Mode'}</th>
                <th>{isSq ? 'Klienti i Synuar' : 'Target Customer'}</th>
                <th>{isSq ? 'Kushtet e Anëtarësimit & Pagesa' : 'Onboarding Terms & Revenue Structure'}</th>
                <th>{isSq ? 'Logjika Operacionale' : 'Operational Logic'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>{isSq ? '1. Personal' : '1. Personal'}</strong></td>
                <td>{isSq ? 'Hyrje Private & Shtëpi' : 'Private Residential Driveways'}</td>
                <td><strong style={{ color: 'var(--accent-blue)' }}>€50 {isSq ? 'montimi' : 'fee'} + {isSq ? 'kontratë 12-m' : '12-mo contract'}</strong><br />70/30 Rev-share</td>
                <td>{isSq ? 'Hapet automatikisht për publikun nga 08:30 deri 16:30 kur pronari është në punë.' : 'Unlocks automatically between 08:30 and 16:30 while owner is at work.'}</td>
              </tr>
              <tr>
                <td><strong>{isSq ? '2. Lokal' : '2. Local'}</strong></td>
                <td>{isSq ? 'Klinika, Noterë, Zyra Avokatie' : 'Clinics, Notaries, Small Lots'}</td>
                <td><strong style={{ color: 'var(--accent-blue)' }}>€50 {isSq ? 'montimi' : 'fee'} + {isSq ? 'kontratë 12-m' : '12-mo contract'}</strong><br />€50 – €70 / {isSq ? 'muaj' : 'month'}</td>
                <td>{isSq ? 'Ditën (08:00–17:00): Falas për stafin/klientët. Mbrëmjeve & fundjavave: Parkim publik me pagesë (70/30).' : 'Daytime: Free automated whitelist entry for staff/clients. Evenings/weekends: Public parking (70/30).'}</td>
              </tr>
              <tr>
                <td><strong>{isSq ? '3. Enterprise' : '3. Enterprise'}</strong></td>
                <td>{isSq ? 'Kulla Afariste & 30+ Vende' : 'Commercial Towers (30+ stalls)'}</td>
                <td><strong style={{ color: 'var(--accent-green)' }}>€300 / {isSq ? 'muaj' : 'month'} SaaS</strong><br />Gateway IoT i dedikuar</td>
                <td>{isSq ? 'Panel qendror kontrolli, hapje në grup në distancë, harta të ngarkesës në kohë reale dhe çmime dinamike.' : 'Centralized facility dashboard, remote multi-stall overrides, heatmaps & dynamic rate control.'}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Section 3: High Margin Pillars */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '18px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px', marginBottom: '14px' }}>
            {isSq ? '3. Shtyllat me Marzh të Lartë Fitimi' : '3. High-Margin Revenue Pillars'}
          </h2>
          <div className="grid-2" style={{ gap: '16px' }}>
            <div style={{ border: '1px solid var(--border-light)', padding: '16px', borderRadius: '6px' }}>
              <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '6px' }}>
                {isSq ? 'Pllakat Reklamuese A4 Forex' : 'Physical A4 Micro-Billboards'}
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {isSq
                  ? 'Pllakë e ngurtë 3mm Forex (~€1.80 kosto prodhimi), e dhënë me qira për €15–€25/muaj (llogaritur €18/muaj) për dentistët dhe farmacitë lokale. Mbulon serverin dhe sistemin para se të parkojë makina e parë.'
                  : 'Rigid 3mm Forex plate (~€1.80 print cost) leased at €15 to €25/mo (modeled at €18/mo) to adjacent pharmacies and clinics. Covers all operational and server expenses before a car parks.'}
              </p>
            </div>

            <div style={{ border: '1px solid var(--border-light)', padding: '16px', borderRadius: '6px' }}>
              <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '6px' }}>
                {isSq ? 'Kuleta e Parapaguar (Prepaid Wallet)' : 'Zero Micro-Transactions (Prepaid Wallet)'}
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {isSq
                  ? 'Mbushjet blihen në blloqe prej €5, €10 ose €15, duke shmangur komisionet fikse bankare (€0.20 + 2.5%) për pagesat prej €1.00. Shtegu mban likuiditet paraprak para çdo parkimi.'
                  : 'Drivers load wallet balances in blocks of €5, €10, or €15, preventing fixed €0.20 + 2.5% swipe fees from eroding €1.00 parking charges, while holding float liquidity.'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Unit Economics & Payback */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '18px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px', marginBottom: '14px' }}>
            {isSq ? '4. Ekonomia për Njësi dhe Kthimi në ~50 Ditë' : '4. Ground-Truth Unit Economics & Accelerated Payback'}
          </h2>
          <table className="exec-table" style={{ marginBottom: '16px' }}>
            <thead>
              <tr>
                <th>{isSq ? 'Zëri i Pasqyrës' : 'P&L Line Item'}</th>
                <th>{isSq ? 'Baza Mujore (3.5 orë/ditë, 22 ditë, €1.00/orë)' : 'Monthly Basis (3.5 hrs/day, 22 days, €1.00/hr)'}</th>
                <th style={{ textAlign: 'right' }}>{isSq ? 'Shuma' : 'Amount'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{isSq ? 'Qarkullimi Bruto (GMV)' : 'Gross Parking Volume (GMV)'}</td>
                <td>3.5 {isSq ? 'orë' : 'hrs'} &times; 22 {isSq ? 'ditë' : 'days'} &times; €1.00/{isSq ? 'orë' : 'hr'}</td>
                <td className="mono" style={{ textAlign: 'right' }}>€77.00</td>
              </tr>
              <tr>
                <td>{isSq ? 'Pjesa e Pronarit (70%)' : 'Host Revenue Share (70%)'}</td>
                <td>{isSq ? 'I shpërndahet pronarit' : 'Distributed to property host'}</td>
                <td className="mono" style={{ textAlign: 'right', color: 'var(--text-muted)' }}>(€53.90)</td>
              </tr>
              <tr>
                <td><strong>{isSq ? 'Marzha e Shtegut nga Parkimi (30%)' : 'Shtegu Net Parking Cut (30%)'}</strong></td>
                <td>{isSq ? 'Fitimi bazë' : 'Core transaction margin'}</td>
                <td className="mono" style={{ textAlign: 'right', fontWeight: '600' }}>€23.10</td>
              </tr>
              <tr>
                <td>{isSq ? 'Qiraja e Pllakës A4 Forex' : 'Physical A4 Forex Ad Lease'}</td>
                <td>{isSq ? 'Reklamë fikse e montuar në barrierë' : 'Fixed advertising display on barrier arm'}</td>
                <td className="mono" style={{ textAlign: 'right', color: 'var(--accent-blue)', fontWeight: '600' }}>+€18.00</td>
              </tr>
              <tr>
                <td>{isSq ? 'Komisioni Bankar & Serveri' : 'Payment Processing & Cloud Buffer'}</td>
                <td>{isSq ? 'Hosting dhe transaksione' : 'Merchant fees & telemetry hosting'}</td>
                <td className="mono" style={{ textAlign: 'right', color: 'var(--text-muted)' }}>(€5.20)</td>
              </tr>
              <tr style={{ background: 'var(--bg-subtle)' }}>
                <td><strong>{isSq ? 'Fluksi Neto Operacional i Lirë (FCF)' : 'Net Free Cash Flow (FCF) / Stall'}</strong></td>
                <td><strong>{isSq ? 'Rendimenti neto mujor' : 'Monthly Net Operating Yield'}</strong></td>
                <td className="mono" style={{ textAlign: 'right', fontWeight: '700', color: 'var(--accent-green)' }}>€35.90 {isSq ? '/ muaj' : '/ month'}</td>
              </tr>
            </tbody>
          </table>

          <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', padding: '14px 18px', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: '1.6' }}>
            {isSq ? (
              <>
                Kostoja e Mbërritur (Pajisje + DHL + Bulona): <strong>€110.00</strong><br />
                Tarifa Fillestare e Montimit e Paguar nga Pronari: <strong>-€50.00</strong><br />
                Ekspozimi Neto i Kapitalit: <strong>€60.00</strong><br />
                Kthimi i Kapitalit: €60.00 / €35.90 = <strong>1.67 Muaj (~50 Ditë)</strong>
              </>
            ) : (
              <>
                Landed Unit Cost (Hardware + Express Air + Anchors): <strong>€110.00</strong><br />
                Upfront Host Installation Fee: <strong>-€50.00</strong><br />
                Net Out-of-Pocket CapEx Exposure: <strong>€60.00</strong><br />
                Hardware Payback Period: €60.00 / €35.90 = <strong>1.67 Months (~50 Days)</strong>
              </>
            )}
          </div>
        </section>

        {/* Section 5: Technical Architecture */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '18px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px', marginBottom: '14px' }}>
            {isSq ? '5. Arkitektura Teknike: Komunikimi & Monitorimi' : '5. Technical Architecture: Communication & Fleet Monitoring'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: '1.7' }}>
            {isSq
              ? 'Shtegu eliminon nevojën për karta celulare SIM prej €3–€5/muaj përmes modelit Phone-as-a-Gateway dhe telemetrisë pasive:'
              : 'Shtegu runs a "phone-as-a-gateway" architecture, eliminating €3–€5/month cellular SIM costs per stall:'}
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <li>&bull; <strong>{isSq ? 'Zbulimi pa Pairing (< 15m):' : 'Beacon Discovery (< 15m):'}</strong> {isSq ? 'Barriera transmeton ID-në e saj në sinjale BLE; celulari e gjen vendin menjëherë pa lidhje manuale.' : "The barrier broadcasts hardware ID over BLE advertisements; driver's phone detects spot without manual pairing."}</li>
            <li>&bull; <strong>{isSq ? 'Korniza 20-Bajtëshe Nordic UART:' : 'Nordic UART Transmission:'}</strong> {isSq ? 'STX: 0x44 0x44 0x54 0x43 ("DDTC"), komanda 0x01 (ulje) / 0x03 (ngritje), çelësi 4-bajtësh nga MAC-adresa, ETX 0x45 dhe BCC XOR checksum.' : 'App writes structured 20-byte control frame: STX header (0x44 0x44 0x54 0x43), command parameter, 4-byte key, ETX delimiter, and BCC XOR checksum.'}</li>
            <li>&bull; <strong>{isSq ? 'Telemetria Pasive (1,000ms):' : 'Passive Fleet Monitoring:'}</strong> {isSq ? 'Bateria (0-9), statusi i zënies (0/1), pozicioni i krahut dhe kodi i gabimit (0xEE) përcillen në server nga çdo qytetar me aplikacion brenda 20m pa kosto celulare.' : 'Health beacons (battery 0-9, occupancy 0/1, arm state, error flag 0xEE) relayed passively to cloud by passing user apps with €0 SIM cost.'}</li>
            <li>&bull; <strong>{isSq ? 'Gateway për Parkingje të Mëdha:' : 'Commercial Cluster Gateways:'}</strong> {isSq ? '1 gateway industrial BLE-në-MQTT (~€35 ESP32/Teltonika) monitoron deri në 30 vende njëkohësisht me Wi-Fi ose 1 SIM të vetme.' : 'Single stationary BLE-to-MQTT Gateway (~€35) monitors up to 30 stalls simultaneously via facility Wi-Fi or 1 shared SIM.'}</li>
          </ul>
        </section>

        {/* Section 6: Lean Operations & Creator Distribution */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '18px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px', marginBottom: '14px' }}>
            {isSq ? '6. Operimi Pa Shpenzime & Shpërndarja me Krijues' : '6. Lean Operations & Hyper-Local Creator Distribution'}
          </h2>
          <div className="grid-2" style={{ gap: '16px' }}>
            <div style={{ border: '1px solid var(--border-light)', padding: '16px', borderRadius: '6px' }}>
              <div style={{ fontWeight: '700', fontSize: '13.5px', marginBottom: '6px' }}>Zero Burn Discipline</div>
              <ul style={{ listStyle: 'none', fontSize: '12.5px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>&bull; {isSq ? 'Qira zyre: €0 (operim në terren).' : 'Office overhead: €0 (founder-led field operations).'}</li>
                <li>&bull; {isSq ? 'Paga fikse: €0 (zhvillim direkt nga themeluesi).' : 'Fixed payroll: €0 (in-house engineering by founder).'}</li>
                <li>&bull; {isSq ? 'Montimi: €15 për barrierë teknikëve me trapan.' : 'Installation: €15 piece-rate to local gig drillers.'}</li>
              </ul>
            </div>

            <div style={{ border: '1px solid var(--border-light)', padding: '16px', borderRadius: '6px' }}>
              <div style={{ fontWeight: '700', fontSize: '13.5px', marginBottom: '6px' }}>Creator Distribution (CAC &lt; €0.25)</div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {isSq
                  ? 'Bashkëpunim me Burim Pacollin dhe Don Zhuganin me kode promocionale (BURIM, DONI) që ofrojnë €2 kredit parkimi, duke mbajtur koston e blerjes së klientit (CAC) nën €0.25.'
                  : 'Creator distribution via Burim Pacolli and Don Zhugani referral codes (BURIM, DONI) providing €2 intro credit, keeping CAC below €0.25 per active driver.'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Projections */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '18px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px', marginBottom: '14px' }}>
            {isSq ? '7. Parashikimet për Korrik 2027 & Vlerësimi' : '7. Projections & Enterprise Valuation'}
          </h2>
          <table className="exec-table">
            <tbody>
              <tr>
                <td>{isSq ? 'Numri i Barrierave Aktive' : 'Active Operating Footprint'}</td>
                <td className="mono" style={{ fontWeight: '600' }}>150 {isSq ? 'Barriera Inteligjente' : 'Smart Barriers'}</td>
              </tr>
              <tr>
                <td>{isSq ? 'Qarkullimi Bruto i Shoferëve (GMV)' : 'Gross Driver Volume (GMV)'}</td>
                <td className="mono" style={{ fontWeight: '600' }}>€13,680 {isSq ? '/ muaj' : '/ month'}</td>
              </tr>
              <tr>
                <td>{isSq ? 'Shpërndarja te Pronarët (70+ partnerë privatë)' : 'Host Distributions (70+ Local Property Partners)'}</td>
                <td className="mono">€9,576 {isSq ? '/ muaj' : '/ month'}</td>
              </tr>
              <tr>
                <td><strong>{isSq ? 'Fitimi Operacional Neto (EBITDA)' : 'Net Operating EBITDA Run-Rate'}</strong></td>
                <td className="mono" style={{ fontWeight: '700', color: 'var(--accent-green)' }}>€6,800+ {isSq ? '/ muaj (~€81,600 vjetore)' : '/ month (~€81,600 ARR)'}</td>
              </tr>
              <tr>
                <td>{isSq ? 'Vlerësimi i Kompanisë (Mbizotërues 8x – 12x i Fitimit)' : 'Implied Enterprise Valuation (8x – 12x Cash-Flow Multiple)'}</td>
                <td className="mono" style={{ fontWeight: '700', color: 'var(--accent-blue)' }}>€650,000 – €1,000,000</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Section 8: Term Sheet */}
        <section style={{ borderTop: '2px solid var(--border-light)', paddingTop: '28px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '14px' }}>
            {isSq ? '8. Kushtet e Investimit (Series Angel Term Sheet)' : '8. Investment Term Sheet (Angel Tranche)'}
          </h2>
          <table className="exec-table" style={{ marginBottom: '20px' }}>
            <tbody>
              <tr>
                <td style={{ fontWeight: '600' }}>{isSq ? 'Shuma e Investimit' : 'Investment Amount'}</td>
                <td className="mono" style={{ fontWeight: '700', color: 'var(--accent-blue)' }}>€25,000 – €30,000</td>
              </tr>
              <tr>
                <td style={{ fontWeight: '600' }}>{isSq ? 'Aksione të Ofruara' : 'Equity Stake Offered'}</td>
                <td className="mono" style={{ fontWeight: '700' }}>15.0% {isSq ? 'Aksione të Zakonshme' : 'Clean Common Equity'}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: '600' }}>{isSq ? 'Paga e Themeluesit' : 'Founder Salary Allocation'}</td>
                <td className="mono" style={{ fontWeight: '700', color: 'var(--accent-green)' }}>€0 ({isSq ? 'Zero Tërheqje' : 'Zero Draw'})</td>
              </tr>
              <tr>
                <td style={{ fontWeight: '600' }}>{isSq ? 'Destinimi i Fondeve' : 'Capital Deployment'}</td>
                <td>
                  {isSq
                    ? '70% Prodhimi dhe transporti i 80–100 barrierave • 15% Veglat e montimit dhe pllakat Forex • 15% Rezervë operative dhe ligjore'
                    : '70% Hardware Procurement (80–100 barriers) • 15% Field Tooling & Signage • 15% Reserve Capital'}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Closing Pitch Note */}
          <div style={{
            background: 'var(--bg-subtle)',
            borderLeft: '4px solid var(--accent-blue)',
            padding: '14px 18px',
            borderRadius: '0 8px 8px 0',
            fontStyle: 'italic',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            marginBottom: '20px'
          }}>
            {isSq ? (
              <>
                "Z. Driton, ky nuk është një aplikacion që kërkon pesë vite djegie kapitali për të shpresuar për fitim. Me modelin tonë të ri, pronarët e vendeve paguajnë €50 menjëherë për montim dhe nënshkruajnë kontratë 12-mujore. Kjo e ul rrezikun tonë neto nga €110 në vetëm €60 për barrierë. Me fluksin tonë mujor të parave, çdo vendparkim e shlyen plotësisht koston e tij brenda 50 ditëve. Nuk kemi shpenzime zyre, nuk kemi rroga të kota mujore dhe nuk varemi nga tenderët e komunës. 100% e investimit tënd shkon direkt në pajisje fizike fitimprurëse në rrugët e Prishtinës. Le të nisim pilotin e parë në Pejton këtë muaj."
              </>
            ) : (
              <>
                "Mr. Driton, this is not an app hoping to make money in five years by burning cash on marketing. With our upgraded model, hosts pay €50 upfront for installation and sign a 12-month lock-in contract. This drops our net CapEx risk from €110 down to just €60 per barrier. With our monthly cash flow, each stall completely recovers its cost in ~50 days. We have zero office overhead, zero unnecessary payroll, and zero reliance on municipal tenders. 100% of your investment goes directly into deployable, revenue-generating physical hardware. Let us launch the first Pejton corridor pilot this month."
              </>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Besmir &bull; {isSq ? 'Themelues & Inxhinier Kryesor' : 'Founder & Lead Engineer'} &bull; <strong>contact@shtegu.app</strong> &bull; Prishtina, Kosovo
            </div>
            <a
              href="mailto:contact@shtegu.app?subject=Shtegu%20Angel%20Investment%20Discussion"
              className="exec-btn exec-btn-primary"
            >
              {isSq ? 'Kontakto Themeluesin' : 'Contact Founder'}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
