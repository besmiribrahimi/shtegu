import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Cloud, ArrowRight, Smartphone, Radio } from 'lucide-react';

export default function PresentationView({
  currentSlide,
  setCurrentSlide,
  totalSlides,
  isFullscreen,
  onToggleFullscreen,
  lang,
  onLangChange
}) {
  const isSq = lang === 'sq';

  // Sensitivity controls for Slide 5 (Unit Economics)
  const [stalls, setStalls] = useState(50);
  const [hours, setHours] = useState(3.5);

  const workingDays = 22;
  const hourlyRate = 1.0;
  const landedCost = 110;
  const upfrontFee = 50; // €50 upfront installation fee from host
  const netCapexPerStall = landedCost - upfrontFee; // €60 net exposure!
  const adRate = 18;

  const monthlyGrossPerStall = hours * workingDays * hourlyRate;
  const totalGmv = stalls * monthlyGrossPerStall;
  const shteguCut = totalGmv * 0.30;
  const adRevenue = stalls * adRate;
  const opsBuffer = stalls * 5.20; // Payment processing + server margin

  const monthlyNetCashFlow = shteguCut + adRevenue - opsBuffer;
  const totalNetCapex = stalls * netCapexPerStall;
  const paybackDays = Math.round((totalNetCapex / Math.max(monthlyNetCashFlow, 1)) * 30);

  // Keyboard navigation, Fullscreen, and Language hotkeys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        onToggleFullscreen();
      } else if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        onLangChange((prev) => (prev === 'sq' ? 'en' : 'sq'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCurrentSlide, totalSlides, onToggleFullscreen, onLangChange]);

  const slideTitles = isSq ? [
    '01. Arbitrazhi Urban & Zgjidhja (Hyrja)',
    '02. Barriera Fizike dhe Teknologjike (ODM & Hardueri)',
    '03. Arkitektura Teknike: Komunikimi & Rrjeti IoT',
    '04. Modeli i Biznesit: 3 Nivelet Operacionale & Reklamat',
    '05. Ekonomia për Njësi & Kthimi i Përshpejtuar (50 Ditë)',
    '06. Operimi Pa Shpenzime & Shpërndarja me Krijues',
    '07. Parashikimet e Rritjes (Shtrirja në Prishtinë)',
    '08. Oferta e Investimit & Term Sheet (Fjala për Dritonin)'
  ] : [
    '01. Executive Thesis: The Urban Arbitrage',
    '02. The Hardware Moat (De-Risked & Ready)',
    '03. Technical Architecture: Communication & Fleet Monitoring',
    '04. Core Business Model: The 3 Operating Modes',
    '05. Unit Economics & Accelerated Payback (50 Days)',
    '06. Lean Operations & Hyper-Local Creator Distribution',
    '07. Growth Projections (Prishtina Rollout)',
    '08. The Investment Offer & Term Sheet'
  ];

  return (
    <div className="presentation-fullscreen-root">
      <div className="deck-container">
        {/* Navigation Toolbar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: '600',
              color: 'var(--text-secondary)'
            }}>
              {slideTitles[currentSlide]}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Quick Language Toggle */}
            <div style={{
              display: 'flex',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-light)',
              borderRadius: '6px',
              padding: '2px',
              marginRight: '4px'
            }}>
              <button
                onClick={() => onLangChange('sq')}
                style={{
                  border: 'none',
                  padding: '3px 8px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: isSq ? '700' : '500',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: isSq ? 'var(--accent-blue)' : 'transparent',
                  color: isSq ? '#ffffff' : 'var(--text-muted)'
                }}
                title="Shqip (Key: L)"
              >
                AL
              </button>
              <button
                onClick={() => onLangChange('en')}
                style={{
                  border: 'none',
                  padding: '3px 8px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: !isSq ? '700' : '500',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: !isSq ? 'var(--accent-blue)' : 'transparent',
                  color: !isSq ? '#ffffff' : 'var(--text-muted)'
                }}
                title="English (Key: L)"
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
              disabled={currentSlide === 0}
              className="exec-btn"
              style={{ padding: '5px 12px', fontSize: '12px', opacity: currentSlide === 0 ? 0.35 : 1 }}
            >
              <ChevronLeft size={14} /> {isSq ? 'Para' : 'Prev'}
            </button>

            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: '600',
              padding: '0 4px',
              color: 'var(--text-secondary)'
            }}>
              {currentSlide + 1} / {totalSlides}
            </span>

            <button
              onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1))}
              disabled={currentSlide === totalSlides - 1}
              className="exec-btn exec-btn-primary"
              style={{ padding: '5px 14px', fontSize: '12px', opacity: currentSlide === totalSlides - 1 ? 0.35 : 1 }}
            >
              {isSq ? 'Tjetra' : 'Next'} <ChevronRight size={14} />
            </button>

            <button
              onClick={onToggleFullscreen}
              className="exec-btn"
              style={{ padding: '5px 10px', fontSize: '12px' }}
              title="Toggle Full Screen (Key: F)"
            >
              {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </button>
          </div>
        </div>

        {/* Slide Canvas */}
        <div className="slide-frame">
          {/* SLIDE 1: THE URBAN ARBITRAGE (THE HOOK) */}
          {currentSlide === 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '26px' }}>
                <img
                  src="/cat_logo_clean.jpg"
                  alt="Shtegu Logo"
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--border-medium)',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.06)'
                  }}
                />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-blue)', fontWeight: '700', letterSpacing: '0.05em' }}>
                    {isSq
                      ? 'SHTEGU.APP • PREZANTIM MASTER PËR INVESTITORIN • PRISHTINË 2026'
                      : 'SHTEGU.APP • MASTER INVESTOR BRIEFING • PRISHTINA 2026'}
                  </div>
                  <h1 style={{ fontSize: '32px', color: 'var(--text-primary)', margin: '4px 0 0', letterSpacing: '-0.03em', lineHeight: '1.2' }}>
                    {isSq
                      ? 'Ne Nuk Ndërtojmë Vendparkime. Ne Monetizojmë Asfaltin e Bllokuar.'
                      : "We Don't Build Parking Lots. We Monetize Trapped Asphalt."}
                  </h1>
                </div>
              </div>

              <div className="grid-2" style={{ gap: '24px', marginBottom: '28px' }}>
                <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '700', fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    {isSq ? 'Arbitrazhi Urban në Prishtinë' : 'The Urban Arbitrage in Prishtina'}
                  </div>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {isSq ? (
                      <>
                        Në qendrat komerciale të Prishtinës (<strong>Pejton, Qendër, Qafë</strong>), shoferët sillen 20–40 minuta duke djegur karburant.
                        Njëkohësisht, qindra hyrje private, oborre dhe vende të klinikave qëndrojnë të papërdorura pas drynave ose zinxhirëve gjatë orarit të punës.
                      </>
                    ) : (
                      <>
                        Prishtina's commercial centers (<strong>Pejton, Qendër, Qafa</strong>) suffer severe parking friction, with drivers circulating 20 to 40 minutes.
                        Concurrently, hundreds of private driveways, residential courtyards, and clinic spots sit idle behind manual padlocks or chains.
                      </>
                    )}
                  </p>
                </div>

                <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: '8px', background: 'var(--bg-subtle)' }}>
                  <div style={{ fontWeight: '700', fontSize: '14.5px', color: 'var(--accent-blue)', marginBottom: '8px' }}>
                    {isSq ? 'Zgjidhja Autonome Shtegu' : 'The Shtegu Solution'}
                  </div>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {isSq ? (
                      <>
                        Barriera inteligjente me energji diellore dhe Bluetooth (BLE), të montuara direkt mbi asfaltin privat. Shoferët rezervojnë dhe ulin barrierën me 1 klikim në celular — me <strong>zero punime civile, zero gërmime dhe zero leje komunale</strong>.
                      </>
                    ) : (
                      <>
                        Surface-mounted, solar-powered BLE smart barriers deployed directly onto private concrete. Drivers discover, reserve, and lower barriers with a single tap — with <strong>zero municipal civil works, zero trenching, and zero utility permits</strong>.
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* 4 Key Stat Metric Cards */}
              <div className="grid-4" style={{ marginBottom: '26px' }}>
                <div className="stat-box">
                  <div className="stat-label">{isSq ? 'Capex Neto / Vend' : 'Net Capex / Stall'}</div>
                  <div className="stat-value">€60</div>
                  <div className="stat-sub">{isSq ? '€110 kosto - €50 tarifë montimi' : '€110 cost - €50 host fee'}</div>
                </div>

                <div className="stat-box">
                  <div className="stat-label">{isSq ? 'FCF Neto / Vend / Muaj' : 'Net FCF / Stall / Mo'}</div>
                  <div className="stat-value" style={{ color: 'var(--accent-green)' }}>€35.90</div>
                  <div className="stat-sub">{isSq ? 'Pas 70% ndarjeje me pronarin' : 'After 70% host rev-share'}</div>
                </div>

                <div className="stat-box">
                  <div className="stat-label">{isSq ? 'Kthimi i Përshpejtuar' : 'Accelerated Payback'}</div>
                  <div className="stat-value" style={{ color: 'var(--accent-blue)' }}>50 {isSq ? 'Ditë' : 'Days'}</div>
                  <div className="stat-sub">{isSq ? '~1.67 Muaj deri në kthim' : '~1.67 Months break-even'}</div>
                </div>

                <div className="stat-box">
                  <div className="stat-label">{isSq ? 'Alokimi Angel' : 'Angel Allocation'}</div>
                  <div className="stat-value">€25k – €30k</div>
                  <div className="stat-sub">{isSq ? '15.0% Aksione të Zakonshme' : '15.0% Common Equity'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '14px', fontSize: '13px', color: 'var(--text-tertiary)' }}>
                <div>{isSq ? 'Themeluesi:' : 'Founder:'} <strong>Besmir</strong> &bull; {isSq ? 'Platforma:' : 'Platform:'} <strong>shtegu.app</strong></div>
                <div>{isSq ? 'Përgatitur për:' : 'Prepared for:'} <strong>Driton Hapçiu</strong></div>
              </div>
            </div>
          )}

          {/* SLIDE 2: THE HARDWARE MOAT */}
          {currentSlide === 1 && (
            <div>
              <div style={{ marginBottom: '26px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-blue)', fontWeight: '700', marginBottom: '6px' }}>
                  {isSq ? 'SLLAJDI 02 • PAJISJA DHE PROTOKOLLI I SIGURUAR' : 'SLIDE 02 • DE-RISKED HARDWARE & PROTOCOL'}
                </div>
                <h2 style={{ fontSize: '28px', marginBottom: '6px' }}>
                  {isSq ? 'Barriera Fizike dhe Teknologjike (E Gatshme & Pa Rreziqe)' : 'The Hardware Moat (De-Risked & Ready)'}
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {isSq
                    ? 'Prodhimi i siguruar direkt nga prodhuesi i specializuar ODM në Shenzhen. Integrim i drejtpërdrejtë Nordic UART BLE 5.0.'
                    : 'Hardware sourced directly from specialized ODM partner in Shenzhen. Direct Nordic UART BLE 5.0 integration.'}
                </p>
              </div>

              <div className="grid-2" style={{ gap: '24px', marginBottom: '26px' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14.5px', marginBottom: '10px', color: 'var(--text-primary)' }}>
                    {isSq ? 'Prodhimi Direkt nga Fabrika (ODM)' : 'Direct ODM Manufacturing Sourced'}
                  </div>
                  <table className="exec-table">
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: '600' }}>{isSq ? 'Kosto e Ulët për Njësi' : 'Ultra-Low Unit Cost'}</td>
                        <td>
                          {isSq ? (
                            <>Blerja bazë e siguruar në <strong>$35 – $45</strong> për barrierë (MOQ 5). Mbërritur në Prishtinë: <strong>~€110</strong>.</>
                          ) : (
                            <>Raw hardware secured at <strong>$35 – $45</strong> per automated barrier (MOQ 5). Landed in Prishtina: <strong>~€110</strong>.</>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: '600' }}>{isSq ? 'Zero Punime Rrjeti' : 'Zero Infrastructure Works'}</td>
                        <td>
                          {isSq ? (
                            <>Panel diellor monokristalin + bateri industriale e testuar deri në <strong>-15°C</strong> me 60+ ditë rezervë pa diell.</>
                          ) : (
                            <>Self-sustaining solar panel + industrial battery down to <strong>-15°C</strong> with 60+ days standby.</>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: '600' }}>{isSq ? 'Ndërtim i Pathyeshëm' : 'Indestructible Build'}</td>
                        <td>
                          {isSq ? (
                            <>Rezistencë <strong>5 ton</strong> ndaj shtypjes, certifikim <strong>IP67</strong>, sustë 180° kundër goditjeve dhe sirenë alarmi 100 dB.</>
                          ) : (
                            <><strong>5-ton</strong> compressive load, <strong>IP67</strong> waterproof, 180° anti-collision spring & 100 dB tamper siren.</>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <div style={{ fontWeight: '700', fontSize: '14.5px', marginBottom: '10px', color: 'var(--text-primary)' }}>
                    {isSq ? 'Programi Bazë & Komunikimi' : 'Firmware & Connectivity'}
                  </div>
                  <table className="exec-table">
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: '600' }}>Nordic UART BLE 5.0</td>
                        <td>
                          {isSq ? (
                            <>Protokoll standard i hapur (UUID: <code className="mono">6E400001-...</code>). Integrim i plotë me aplikacionin tonë celular.</>
                          ) : (
                            <>Open protocol standard (UUID: <code className="mono">6E400001-...</code>). Seamless custom mobile app integration.</>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: '600' }}>{isSq ? 'Zero Kosto SIM Celulare' : 'Zero Cellular SIM Cost'}</td>
                        <td>
                          {isSq ? (
                            <><strong>€0.00 / muaj:</strong> Telefoni i shoferit shërben si urë e sigurt interneti (gateway) drejt serverit në cloud.</>
                          ) : (
                            <><strong>€0.00 / month:</strong> The driver's smartphone acts as the secure internet gateway to our cloud server.</>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: '600' }}>{isSq ? 'Monitorim Pasiv i Vendit' : 'Passive Occupancy Sensing'}</td>
                        <td>
                          {isSq ? (
                            <>Transmeton statusin (<code className="mono">0 = lirë, 1 = zënë</code>) direkt përmes sinjaleve pa tel BLE beacon (&lt; 15m).</>
                          ) : (
                            <>Broadcasts spot status (<code className="mono">0 = vacant, 1 = occupied</code>) directly in raw BLE advertising beacons (&lt; 15m range).</>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ padding: '14px 18px', background: 'var(--bg-subtle)', borderRadius: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <strong>{isSq ? 'Përparësia Operacionale:' : 'Field Advantage:'}</strong>{' '}
                {isSq
                  ? 'Bulonat standardë M10 e ankorojnë barrierën për 15 minuta në beton/asfalt. Nuk kërkohen leje komunale apo lidhje me KEDS.'
                  : 'Standard M10 expansion bolts mount the barrier in 15 minutes. No reliance on municipal permits or electrical utilities.'}
              </div>
            </div>
          )}

          {/* SLIDE 3: TECHNICAL ARCHITECTURE & FLEET MONITORING */}
          {currentSlide === 2 && (
            <div>
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-blue)', fontWeight: '700', marginBottom: '6px' }}>
                  {isSq ? 'SLLAJDI 03 • TOPOLOGJIA IOT & PROTOKOLLI NORDIC UART' : 'SLIDE 03 • IOT SYSTEM TOPOLOGY & NORDIC UART'}
                </div>
                <h2 style={{ fontSize: '28px', marginBottom: '6px' }}>
                  {isSq ? 'Arkitektura Teknike: Komunikimi & Monitorimi i Rrjetit' : 'Technical Architecture: Communication & Fleet Monitoring'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
                  {isSq
                    ? 'Arkitekturë "Telefoni si Gateway" që eliminon kostot mujore të kartave SIM prej €3–€5/muaj. Ekzekutim nën-sekondë përmes Nordic UART Service (NUS).'
                    : 'Phone-as-Gateway architecture eliminating €3–€5/mo cellular SIM costs. Sub-second GATT Nordic UART execution.'}
                </p>
              </div>

              {/* System Topology Visual Flow */}
              <div style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                padding: '14px 18px',
                marginBottom: '18px'
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {isSq ? 'Topologjia e Sistemit në Kohë Reale' : 'Real-Time System Topology'}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', alignItems: 'center', gap: '10px' }}>
                  <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <Cloud size={15} color="var(--accent-blue)" />
                      <span style={{ fontWeight: '700', fontSize: '12.5px' }}>Shtegu Cloud</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                      • PostgreSQL / Redis DB<br />
                      • Dynamic 4-Byte Key Gen<br />
                      • Prepaid Ledger & Telemetry
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: 'var(--accent-blue)', fontWeight: '600' }}>HTTPS / REST</div>
                    <ArrowRight size={16} color="var(--accent-blue)" style={{ margin: '0 auto' }} />
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-tertiary)' }}>Auth & Token</div>
                  </div>

                  <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <Smartphone size={15} color="var(--accent-blue)" />
                      <span style={{ fontWeight: '700', fontSize: '12.5px' }}>Mobile App (Flutter)</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                      • Foreground BLE Bridge<br />
                      • Proximity Scanner (&lt;15m)<br />
                      • Zero Manual Pairing
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: 'var(--accent-green)', fontWeight: '600' }}>BLE 5.0 UART</div>
                    <ArrowRight size={16} color="var(--accent-green)" style={{ margin: '0 auto' }} />
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-tertiary)' }}>20-Byte Frame</div>
                  </div>

                  <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <Radio size={15} color="var(--accent-green)" />
                      <span style={{ fontWeight: '700', fontSize: '12.5px' }}>Smart Barrier</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                      • Nordic NUS Service<br />
                      • 4-6s Drop to 75mm<br />
                      • Health Beacon (1,000ms)
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Detail Columns */}
              <div className="grid-3" style={{ gap: '16px' }}>
                <div style={{ border: '1px solid var(--border-light)', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {isSq ? '1. Rrjedha e Komandës Live' : '1. Live Command Execution'}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    <p style={{ marginBottom: '4px' }}><strong>{isSq ? 'Zbulimi (< 15m):' : 'Discovery (< 15m):'}</strong> {isSq ? 'Transmeton ID pa nevojë pairing.' : 'Broadcasts ID without Bluetooth pairing.'}</p>
                    <p style={{ marginBottom: '4px' }}><strong>{isSq ? 'Çelësi Kriptografik:' : 'Cloud Key:'}</strong> {isSq ? 'Serveri kthen çelës 4-bajtësh nga MAC.' : 'Server validates wallet, issues 4-byte key.'}</p>
                    <div style={{ background: 'var(--bg-subtle)', padding: '5px 7px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '10.5px', marginBottom: '4px' }}>
                      STX: 0x44 0x44 0x54 0x43 ("DDTC")<br />
                      CMD: 0x14 0x01 (Drop) | 0x14 0x03 (Raise)
                    </div>
                    <p><strong>{isSq ? 'Ekzekutimi:' : 'Action:'}</strong> {isSq ? 'Ulet në 75mm për 4-6s; kthen RX.' : 'Lowers to 75mm in 4–6s; sends RX confirmation.'}</p>
                  </div>
                </div>

                <div style={{ border: '1px solid var(--border-light)', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '700', fontSize: '13px', color: 'var(--accent-blue)', marginBottom: '6px' }}>
                    {isSq ? '2. Telemetria Pasive (Zero SIM)' : '2. Passive Fleet Monitoring'}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    <p style={{ marginBottom: '4px' }}><strong>{isSq ? 'Kursimi:' : 'Zero SIM Cost:'}</strong> {isSq ? 'Kursen €3–€5/muaj për çdo vendparkim.' : 'Eliminates €3–€5/month SIM fees per stall.'}</p>
                    <p style={{ marginBottom: '4px' }}><strong>{isSq ? 'Sinjalet (1,000ms):' : 'Health Frames (1,000ms):'}</strong></p>
                    <div style={{ background: 'var(--bg-subtle)', padding: '5px 7px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '10.5px', marginBottom: '4px' }}>
                      B1: Firmware Revision<br />
                      B2: Bateria (0–9) + Zënia (0/1)<br />
                      B3: Pozicioni (Up/Flat) + Error (0xEE)
                    </div>
                    <p><strong>{isSq ? 'Mesh i Heshtur:' : 'Silent Mesh:'}</strong> {isSq ? 'Çdo aplikacion brenda 20m përcjell statusin.' : 'Passing apps passively relay status to cloud.'}</p>
                  </div>
                </div>

                <div style={{ border: '1px solid var(--border-light)', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {isSq ? '3. Qendra Komerciale (30+ Vende)' : '3. Commercial Cluster Hubs'}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    <p style={{ marginBottom: '4px' }}><strong>{isSq ? 'Gateway Industrial:' : 'Hardware Hub:'}</strong> {isSq ? '1 njësi BLE-në-MQTT (~€35 ESP32/Teltonika).' : 'Single industrial BLE-to-MQTT unit (~€35).'}</p>
                    <p style={{ marginBottom: '4px' }}><strong>{isSq ? 'Lidhja:' : 'Connectivity:'}</strong> {isSq ? 'Wi-Fi e objektit ose 1 SIM e përbashkët.' : 'Connects via building Wi-Fi or 1 shared SIM.'}</p>
                    <p><strong>{isSq ? 'Vonesa Nën-Sekondë:' : 'Sub-Second Map:'}</strong> {isSq ? 'Përditëson të gjitha 30+ barrierat njëkohësisht në hartë.' : 'Streams concurrent stall occupancy to live map.'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 4: CORE BUSINESS MODEL: THE 3 OPERATING MODES & REVENUE PILLARS */}
          {currentSlide === 3 && (
            <div>
              <div style={{ marginBottom: '22px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-blue)', fontWeight: '700', marginBottom: '6px' }}>
                  {isSq ? 'SLLAJDI 04 • MODELI I BIZNESIT ME 3 NIVELE' : 'SLIDE 04 • CORE BUSINESS MODEL: 3 OPERATING MODES'}
                </div>
                <h2 style={{ fontSize: '28px', marginBottom: '6px' }}>
                  {isSq ? 'Modeli i Biznesit: 3 Nivelet Operacionale & Shtyllat e Fitimit' : 'Core Business Model: The 3 Operating Modes & Revenue Pillars'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
                  {isSq
                    ? 'Tarifa fillestare e montimit prej €50 dhe kontratat 12-mujore eliminojnë rrezikun e kapitalit dhe sigurojnë të ardhura afatgjata:'
                    : 'A €50 upfront installation fee + 12-month lock-in contracts de-risk capital deployment and guarantee recurring yield:'}
                </p>
              </div>

              <div className="grid-3" style={{ gap: '16px', marginBottom: '20px' }}>
                {/* Mode 1: Personal */}
                <div style={{ border: '1px solid var(--border-light)', padding: '18px', borderRadius: '8px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    MODE 1
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {isSq ? 'Personal (Hyrje Private)' : 'Personal (Private Driveways)'}
                  </div>
                  <div style={{ background: 'var(--bg-subtle)', padding: '6px 10px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: '700', color: 'var(--accent-blue)', marginBottom: '10px' }}>
                    {isSq ? '€50 Montimi + Kontratë 12-Mujore' : '€50 Upfront Fee + 12-Month Lock-In'}
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {isSq
                      ? 'Ndarje fitimi 70/30 në favor të pronarit. Hapësira hapet automatikisht për publikun nga ora 08:30 deri 16:30 kur pronari është në punë.'
                      : '70/30 parking revenue-share in favor of host. Unlocks automatically for public booking between 08:30 and 16:30 while host is at work.'}
                  </p>
                </div>

                {/* Mode 2: Local */}
                <div style={{ border: '1px solid var(--border-light)', padding: '18px', borderRadius: '8px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    MODE 2
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {isSq ? 'Lokal (Klinika, Noterë, Zyra)' : 'Local (Clinics, Notaries, Offices)'}
                  </div>
                  <div style={{ background: 'var(--bg-subtle)', padding: '6px 10px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: '700', color: 'var(--accent-blue)', marginBottom: '10px' }}>
                    {isSq ? '€50 Montimi + €50–€70/muaj Retainer' : '€50 Upfront Fee + €50–€70/mo Retainer'}
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {isSq
                      ? 'Ditën (08:00–17:00): Hyrje falas për stafin dhe klientët e verifikuar. Mbrëmjeve & fundjavave: Parkim publik me pagesë (70/30 rev-share).'
                      : 'Daytime (08:00–17:00): Free automated entry for whitelisted clients/staff. Evening & weekends: Automated paid public parking (70/30).'}
                  </p>
                </div>

                {/* Mode 3: Enterprise */}
                <div style={{ border: '1px solid var(--border-light)', padding: '18px', borderRadius: '8px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    MODE 3
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {isSq ? 'Enterprise (Kulla & 30+ Vende)' : 'Enterprise (30+ Stall Complexes)'}
                  </div>
                  <div style={{ background: 'var(--bg-subtle)', padding: '6px 10px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: '700', color: 'var(--accent-green)', marginBottom: '10px' }}>
                    {isSq ? '€300 / muaj SaaS Fiks' : '€300 / month Flat SaaS Retainer'}
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {isSq
                      ? 'Gateway BLE-në-MQTT i dedikuar, panel qendror në ueb për menaxhimin e parkimit, hapje në grup në distancë dhe çmime dinamike sipas zonave.'
                      : 'Dedicated IoT gateway, centralized web facility dashboard, remote multi-stall overrides, real-time heatmaps & dynamic rate control.'}
                  </p>
                </div>
              </div>

              {/* 2 High-Margin Pillars */}
              <div className="grid-2" style={{ gap: '16px' }}>
                <div style={{ border: '1px solid var(--border-light)', padding: '14px 18px', borderRadius: '8px', background: 'var(--bg-subtle)' }}>
                  <div style={{ fontWeight: '700', fontSize: '13.5px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {isSq ? 'Pllakat Reklamuese A4 Forex (Baza e Sigurt e Parave)' : 'Physical A4 Micro-Billboards (The Cash-Flow Floor)'}
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {isSq
                      ? 'Pllakë 3mm Forex e montuar në krahun e barrierës (~€1.80 kosto prodhimi). Jepet me qira për €15–€25/muaj (llogaritur €18/muaj) për dentistët dhe farmacitë lokale. Mbulon serverin para se të parkojë makina e parë.'
                      : 'Rigid 3mm Forex plate (~€1.80 print cost) leased at €15–€25/mo (modeled at €18/mo) to adjacent pharmacies/dentists. Covers cloud & server costs before a single car parks.'}
                  </div>
                </div>

                <div style={{ border: '1px solid var(--border-light)', padding: '14px 18px', borderRadius: '8px', background: 'var(--bg-subtle)' }}>
                  <div style={{ fontWeight: '700', fontSize: '13.5px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {isSq ? 'Kuleta e Parapaguar (Zero Humbje nga Pagesat e Vogla)' : 'Zero Micro-Transactions (Prepaid Wallet Engine)'}
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {isSq
                      ? 'Mbushjet blihen në paketa €5, €10 dhe €15. Kjo shmang komisionet bankare prej €0.20 + 2.5% për çdo parkim prej €1.00, duke garantuar likuiditet të menjëhershëm në llogari para parkimit.'
                      : 'Drivers top up balances in blocks of €5, €10, or €15, eliminating fixed €0.20 + 2.5% swipe fees on €1.00 charges. Shtegu holds upfront float liquidity prior to occupancy.'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 5: GROUND-TRUTH UNIT ECONOMICS & ACCELERATED PAYBACK (50 DAYS) */}
          {currentSlide === 4 && (
            <div>
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-blue)', fontWeight: '700', marginBottom: '6px' }}>
                  {isSq ? 'SLLAJDI 05 • EKONOMIA PËR NJËSI & KTHIMI I PËRSHPEJTUAR' : 'SLIDE 05 • UNIT ECONOMICS & ACCELERATED PAYBACK'}
                </div>
                <h2 style={{ fontSize: '28px', marginBottom: '6px' }}>
                  {isSq ? 'Ekonomia për Njësi dhe Kthimi në ~50 Ditë' : 'Ground-Truth Unit Economics & Accelerated Payback (~50 Days)'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
                  {isSq ? (
                    <>Duke marrë <strong>€50 tarifë montimi në Ditën 1</strong>, rreziku ynë neto bie nga €110 në vetëm <strong>€60 për barrierë</strong>, duke përgjysmuar kohën e kthimit të investimit!</>
                  ) : (
                    <>By charging a <strong>€50 installation fee on Day 1</strong>, net CapEx drops from €110 to <strong>€60 per stall</strong>, cutting payback time in half!</>
                  )}
                </p>
              </div>

              <div className="grid-2" style={{ gap: '26px', marginBottom: '18px' }}>
                <div>
                  <table className="exec-table">
                    <thead>
                      <tr>
                        <th>{isSq ? 'Pasqyra Mujore Për Vendparkim' : 'Monthly Stall P&L (Single Spot Breakdown)'}</th>
                        <th style={{ textAlign: 'right' }}>{isSq ? 'Shuma' : 'Amount'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{isSq ? 'Qarkullimi Bruto (3.5 orë/ditë @ €1.00, 22 ditë)' : 'Gross Parking Volume (3.5 hrs/day @ €1.00, 22 days)'}</td>
                        <td className="mono" style={{ textAlign: 'right' }}>€77.00</td>
                      </tr>
                      <tr>
                        <td style={{ color: 'var(--text-muted)' }}>{isSq ? 'Pjesa e Pronarit të Hapësirës (70%)' : 'Host Revenue Share (70%)'}</td>
                        <td className="mono" style={{ textAlign: 'right', color: 'var(--text-muted)' }}>(€53.90)</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: '600' }}>{isSq ? 'Marzha e Shtegut nga Parkimi (30%)' : 'Shtegu Net Parking Cut (30%)'}</td>
                        <td className="mono" style={{ textAlign: 'right', fontWeight: '600' }}>€23.10</td>
                      </tr>
                      <tr>
                        <td>{isSq ? 'Pllaka Reklamuese A4 Forex' : 'Physical A4 Forex Ad Lease'}</td>
                        <td className="mono" style={{ textAlign: 'right', color: 'var(--accent-blue)', fontWeight: '600' }}>+€18.00</td>
                      </tr>
                      <tr>
                        <td style={{ color: 'var(--text-muted)' }}>{isSq ? 'Procesimi Bankar & Serveri' : 'Payment Processing & Cloud Buffer'}</td>
                        <td className="mono" style={{ textAlign: 'right', color: 'var(--text-muted)' }}>(€5.20)</td>
                      </tr>
                      <tr style={{ background: 'var(--bg-subtle)' }}>
                        <td style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{isSq ? 'Fluksi Neto i Parasë (FCF) / Vend' : 'Net Free Cash Flow (FCF) / Stall'}</td>
                        <td className="mono" style={{ textAlign: 'right', fontWeight: '700', color: 'var(--accent-green)' }}>€35.90 {isSq ? '/ muaj' : '/ month'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ border: '1px solid var(--border-light)', padding: '18px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '700', fontSize: '13.5px', marginBottom: '10px' }}>
                    {isSq ? 'Llogaritja e Kthimit të Shpejtë të Kapitalit' : 'The Capital Payback Calculation'}
                  </div>

                  <div style={{ background: 'var(--bg-subtle)', padding: '10px 14px', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '12px', marginBottom: '14px', lineHeight: '1.5' }}>
                    {isSq ? (
                      <>
                        Kosto e Mbërritur: €110.00<br />
                        Tarifa Fillestare e Montimit: -€50.00<br />
                        <strong>Ekspozimi Neto i Kapitalit: €60.00</strong><br />
                        Kthimi: €60.00 / €35.90 = <strong>1.67 Muaj (~50 Ditë)</strong>
                      </>
                    ) : (
                      <>
                        Landed Unit Cost: €110.00<br />
                        Upfront Host Installation Fee: -€50.00<br />
                        <strong>Net Out-of-Pocket CapEx: €60.00</strong><br />
                        Payback: €60.00 / €35.90 = <strong>1.67 Months (~50 Days)</strong>
                      </>
                    )}
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '5px' }}>
                      <span>{isSq ? 'Numri i Vendparkimeve:' : 'Fleet Size:'} <strong>{stalls} {isSq ? 'Vende' : 'Stalls'}</strong></span>
                      <span className="mono">Net CapEx: €{totalNetCapex.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="150"
                      step="10"
                      value={stalls}
                      onChange={(e) => setStalls(Number(e.target.value))}
                      className="exec-slider"
                    />
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '5px' }}>
                      <span>{isSq ? 'Shfrytëzimi Ditor:' : 'Daily Turnover:'} <strong>{hours.toFixed(1)} {isSq ? 'orë/ditë' : 'hrs/day'}</strong></span>
                    </div>
                    <input
                      type="range"
                      min="2.0"
                      max="5.0"
                      step="0.5"
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="exec-slider"
                    />
                  </div>

                  <div className="grid-2" style={{ gap: '10px' }}>
                    <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', padding: '10px', borderRadius: '6px' }}>
                      <div className="stat-label">{isSq ? 'FCF Neto Mujor' : 'Monthly Net FCF'}</div>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                        €{Math.round(monthlyNetCashFlow).toLocaleString()}
                      </div>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', padding: '10px', borderRadius: '6px' }}>
                      <div className="stat-label">{isSq ? 'Kthimi i Plotë' : 'Full Payback'}</div>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}>
                        {paybackDays} {isSq ? 'Ditë (~1.6 Muaj)' : 'Days (~1.6 Mos)'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 6: LEAN OPERATIONS & HYPER-LOCAL CREATOR DISTRIBUTION */}
          {currentSlide === 5 && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-blue)', fontWeight: '700', marginBottom: '6px' }}>
                  {isSq ? 'SLLAJDI 06 • EFIÇENCA OPERACIONALE & MARKETINGU' : 'SLIDE 06 • LEAN OPERATIONS & CREATOR DISTRIBUTION'}
                </div>
                <h2 style={{ fontSize: '28px', marginBottom: '6px' }}>
                  {isSq ? 'Operimi Pa Shpenzime (Zero Burn) & Shpërndarja me Krijues' : 'Lean Operations (Zero Burn) & Hyper-Local Creator Distribution'}
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {isSq
                    ? '100% e kapitalit të investuar mbrohet nga shpenzimet e kota, ndërsa përdoruesit blihen me kosto minimale (CAC < €0.25):'
                    : '100% of capital goes directly into revenue assets, while driver acquisition remains ultra-low cost (CAC < €0.25):'}
                </p>
              </div>

              <div className="grid-2" style={{ gap: '20px', marginBottom: '24px' }}>
                <div style={{ border: '1px solid var(--border-light)', padding: '18px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '700', fontSize: '14.5px', marginBottom: '6px' }}>
                    {isSq ? 'Operimi me Zero Shpenzime Fikse (Zero Burn)' : 'Zero Burn Lean Operations'}
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <li>&bull; <strong>{isSq ? 'Qira Zyre: €0.' : 'Office Overhead: €0.'}</strong> {isSq ? 'Operim në terren nga themeluesi; pajisjet ruhen në automjet/garazh.' : 'Founder-led mobile field operations; inventory stored in vehicle/garage.'}</li>
                    <li>&bull; <strong>{isSq ? 'Paga Fikse: €0.' : 'Fixed Payroll: €0.'}</strong> {isSq ? 'Aplikacioni, serveri dhe integrimet programore kryhen nga vetë themeluesi.' : 'Mobile app, backend architecture & firmware integrations handled in-house.'}</li>
                    <li>&bull; <strong>{isSq ? 'Montimi me Copë: €15 / Vend.' : 'Piece-Rate Install: €15 / Stall.'}</strong> {isSq ? 'Paguhen teknikë me hilti vetëm në ditët e shpimit; zero detyrime fikse.' : 'Local technicians paid piece-rate on drill days, avoiding fixed monthly payroll.'}</li>
                  </ul>
                </div>

                <div style={{ border: '1px solid var(--border-light)', padding: '18px', borderRadius: '8px', background: 'var(--bg-subtle)' }}>
                  <div style={{ fontWeight: '700', fontSize: '14.5px', color: 'var(--accent-blue)', marginBottom: '6px' }}>
                    {isSq ? 'Shpërndarja Hiper-Lokale me Krijues Përmbajtjeje' : 'Hyper-Local Creator Distribution (CAC < €0.25)'}
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '10px' }}>
                    {isSq ? (
                      <>
                        Bashkëpunim me krijues me ndikim masiv në Prishtinë (<strong>Burim Pacolli, Don Zhugani</strong>) me kode promocionale (p.sh. <code className="mono">BURIM</code>, <code className="mono">DONI</code>) që ofrojnë €2 kredit falas parkimi.
                      </>
                    ) : (
                      <>
                        High-reach creator distribution (<strong>Burim Pacolli, Don Zhugani</strong>) using referral promo codes (e.g. <code className="mono">BURIM</code>, <code className="mono">DONI</code>) providing €2 introductory parking credit.
                      </>
                    )}
                  </p>
                  <div style={{ padding: '8px 12px', background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    <strong>{isSq ? 'Rezultati:' : 'Result:'}</strong> {isSq ? 'Kosto e blerjes së shoferit (CAC) mbahet nën €0.25 me konvertim të menjëhershëm në pagesë.' : 'Keeps driver acquisition cost (CAC) below €0.25 per active registered driver.'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 7: GROWTH PROJECTIONS (PRISHTINA ROLLOUT) */}
          {currentSlide === 6 && (
            <div>
              <div style={{ marginBottom: '26px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-blue)', fontWeight: '700', marginBottom: '6px' }}>
                  {isSq ? 'SLLAJDI 07 • PLANI I RRITJES NË PRISHTINË' : 'SLIDE 07 • SCALING ROADMAP'}
                </div>
                <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>
                  {isSq ? 'Parashikimet e Rritjes (Shtrirja në Prishtinë)' : 'Growth Projections (Prishtina Rollout)'}
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {isSq
                    ? 'Trajektore e qartë e zhvillimit në tri faza nëpër zonat kryesore komerciale të Prishtinës.'
                    : 'Clear three-phase scaling trajectory across Prishtina commercial zones.'}
                </p>
              </div>

              <div className="grid-3" style={{ marginBottom: '26px' }}>
                <div style={{ border: '1px solid var(--border-light)', padding: '22px', borderRadius: '8px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    {isSq ? 'FAZA 1 (M1–M3)' : 'PHASE 1 (M1–M3)'}
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '8px' }}>
                    {isSq ? 'Validimi i Pilotit (10–20 Vende)' : 'Pilot Validation (10–20 Stalls)'}
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    <li>&bull; {isSq ? 'Shtrirje e përqendruar në Pejton qendrore.' : 'Deployed across central Pejton.'}</li>
                    <li>&bull; {isSq ? 'Tarifa €50 për montim e vërtetuar me pronarët.' : '€50 upfront host fee validated.'}</li>
                    <li>&bull; {isSq ? 'Kthim i plotë i kapitalit brenda 50 ditëve.' : 'Full capital payback in ~50 days.'}</li>
                  </ul>
                </div>

                <div style={{ border: '1px solid var(--border-light)', padding: '22px', borderRadius: '8px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    {isSq ? 'FAZA 2 (M4–M9)' : 'PHASE 2 (M4–M9)'}
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '8px' }}>
                    {isSq ? 'Zgjerimi në Korridore (50–75 Vende)' : 'Corridor Expansion (50–75 Stalls)'}
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    <li>&bull; {isSq ? 'Zgjerim në Qendër, Qafë dhe Ulpianë.' : 'Expansion in Qendër, Qafa, Ulpianë.'}</li>
                    <li>&bull; {isSq ? 'Vala e parë e kontratave B2B me klinika dentare/zyra (€70/muaj).' : 'First wave of B2B Whitelist dental/legal contracts (€70/mo).'}</li>
                    <li>&bull; {isSq ? 'Monetizimi i pllakave reklamuese Forex A4.' : 'Initial Forex ad plates monetized.'}</li>
                  </ul>
                </div>

                <div style={{ border: '1px solid var(--border-light)', padding: '22px', borderRadius: '8px', background: 'var(--bg-subtle)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-blue)', marginBottom: '4px' }}>
                    {isSq ? 'FAZA 3 (M10–M15)' : 'PHASE 3 (M10–M15)'}
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '8px' }}>
                    {isSq ? 'Rritja në Shkallë të Gjerë (150 Vende)' : 'Scale (150 Active Stalls)'}
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    <li>&bull; {isSq ? <><strong>€5,300+ deri €6,800+</strong> fluks neto mujor i lirë (FCF).</> : <><strong>€5,300+ to €6,800+</strong> monthly net platform FCF.</>}</li>
                    <li>&bull; {isSq ? <>Fitim vjetor operacional (EBITDA) mbi <strong>€81,000+</strong>.</> : <>Annualized EBITDA run-rate exceeding <strong>€81,000+</strong>.</>}</li>
                    <li>&bull; {isSq ? <>Vlerësimi i synuar: <strong>€650,000 – €1,000,000</strong>.</> : <>Target Valuation: <strong>€650,000 – €1,000,000</strong>.</>}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 8: THE INVESTMENT OFFER & CLOSING PITCH NOTE */}
          {currentSlide === 7 && (
            <div>
              <div style={{ marginBottom: '22px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-blue)', fontWeight: '700', marginBottom: '6px' }}>
                  {isSq ? 'SLLAJDI 08 • KUSHTET E INVESTIMIT & PËRDORIMI I FONDEVE' : 'SLIDE 08 • TERM SHEET & USE OF FUNDS'}
                </div>
                <h2 style={{ fontSize: '28px', marginBottom: '6px' }}>
                  {isSq ? 'Oferta e Investimit dhe Shpërndarja e Fondeve' : 'The Investment Offer & Use of Funds'}
                </h2>
              </div>

              <div className="grid-3" style={{ marginBottom: '20px' }}>
                <div className="stat-box">
                  <div className="stat-label">{isSq ? 'Shuma e Investimit' : 'Investment Amount'}</div>
                  <div className="stat-value" style={{ color: 'var(--accent-blue)' }}>€25k – €30k</div>
                  <div className="stat-sub">{isSq ? 'Aksione të Zakonshme / Marrëveshje e Konvertueshme' : 'Clean Common Equity / Convertible Note'}</div>
                </div>

                <div className="stat-box">
                  <div className="stat-label">{isSq ? 'Aksione të Ofruara' : 'Equity Stake'}</div>
                  <div className="stat-value">15.0%</div>
                  <div className="stat-sub">{isSq ? 'Aksione të Zakonshme të Pastra' : 'Clean Common Equity'}</div>
                </div>

                <div className="stat-box">
                  <div className="stat-label">{isSq ? 'Paga e Themeluesit' : 'Founder Salary Draw'}</div>
                  <div className="stat-value" style={{ color: 'var(--accent-green)' }}>€0</div>
                  <div className="stat-sub">{isSq ? '100% Para në Pajisje Fitimprurëse' : '100% Cash into Deployable Assets'}</div>
                </div>
              </div>

              <div style={{ border: '1px solid var(--border-light)', padding: '16px 20px', borderRadius: '8px', marginBottom: '18px' }}>
                <div style={{ fontWeight: '700', fontSize: '13.5px', marginBottom: '8px' }}>
                  {isSq ? 'Shpërndarja e Kapitalit të Investuar' : 'Capital Deployment Breakdown'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '5px' }}>
                    <span>
                      {isSq
                        ? <><strong>70% Blerja Direkte e Pajisjeve:</strong> Prodhimi dhe transporti i shpejtë DHL i 80 deri 100 barrierave inteligjente.</>
                        : <><strong>70% Hardware Procurement:</strong> Batch production & express air logistics for 80–100 smart barriers.</>}
                    </span>
                    <span className="mono" style={{ color: 'var(--accent-blue)', fontWeight: '600' }}>{isSq ? 'Pajisje' : 'Hardware'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '5px' }}>
                    <span>
                      {isSq
                        ? <><strong>15% Montimi & Shenjat:</strong> Trapanë hilti, bulona të blinduar ankorimi dhe pllaka reklamuese Forex.</>
                        : <><strong>15% Field Tooling & Signage:</strong> Industrial hammer drills, anchor hardware, and branded Forex ad plates.</>}
                    </span>
                    <span className="mono">{isSq ? 'Montim' : 'Tooling'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>
                      {isSq
                        ? <><strong>15% Rezervë Likuiditeti:</strong> Depozita e integrimit bankar, regjistrimet ligjore dhe rezerva operacionale.</>
                        : <><strong>15% Reserve Capital:</strong> Merchant processor liquidity reserves and legal registrations.</>}
                    </span>
                    <span className="mono">{isSq ? 'Rezerva' : 'Reserves'}</span>
                  </div>
                </div>
              </div>

              {/* The Closing Investor Pitch Note (Direct for Driton) */}
              <div style={{
                background: 'var(--bg-subtle)',
                borderLeft: '4px solid var(--accent-blue)',
                padding: '14px 18px',
                borderRadius: '0 8px 8px 0',
                fontStyle: 'italic',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                marginBottom: '18px'
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src="/cat_logo_clean.jpg"
                    alt="Shtegu Logo"
                    style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    {isSq ? 'Themeluesi:' : 'Founder:'} Besmir &bull; {isSq ? 'Platforma:' : 'Platform:'} <strong>shtegu.app</strong> &bull; {isSq ? 'Kontakt:' : 'Contact:'} <strong>contact@shtegu.app</strong> &bull; Prishtina, Kosovo
                  </div>
                </div>
                <a
                  href="mailto:contact@shtegu.app?subject=Shtegu%20Angel%20Investment%20Discussion"
                  className="exec-btn exec-btn-primary"
                  style={{ padding: '8px 20px' }}
                >
                  {isSq ? 'Cakto Takimin e Mbylljes së Marrëveshjes' : 'Schedule Direct Closing Meeting'}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Slide Navigation Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
          {slideTitles.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: currentSlide === idx ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: currentSlide === idx ? 'var(--accent-blue)' : 'var(--border-medium)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title={slideTitles[idx]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
