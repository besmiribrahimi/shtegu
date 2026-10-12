import React, { useState } from 'react';
import { 
  Battery, 
  Sun, 
  Radio, 
  ShieldCheck, 
  ArrowDownCircle, 
  ArrowUpCircle,
  Filter,
  AlertTriangle,
  FileSpreadsheet,
  Zap,
  TrendingUp,
  Download,
  Flame,
  BellRing,
  Sparkles,
  Building2,
  Cpu,
  RefreshCw
} from 'lucide-react';
import GeoapifyMap from './GeoapifyMap';
import { GEOAPIFY_API_KEY } from '../services/geoapifyService';

export default function NetworkMapView({ lang = 'sq' }) {
  const isSq = lang === 'sq';

  // Active Enterprise Sub-Tab: 'map' | 'controls' | 'alarms' | 'reports' | 'telemetry' | 'fleet'
  const [activeTab, setActiveTab] = useState('map');

  // Network stalls in Prishtina
  const initialSpots = [
    {
      id: 'P01',
      code: 'Vendi P-01',
      corridor: 'Pejton',
      address: 'Rr. Perandori Justinian (Pejton)',
      rate: '€1.00/orë',
      rateVal: 1.00,
      walk: '45m',
      hardwareId: 'DN-0892',
      macAddress: 'C4:4F:33:08:92:A1',
      lat: 42.6601,
      lon: 21.1572,
      isAvailable: true,
      battery: 94,
      solarCharging: true,
      barrierState: 'RAISED',
      tamperAlarm: false
    },
    {
      id: 'P02',
      code: 'Vendi P-02',
      corridor: 'Pejton',
      address: 'Rr. Pashko Vasa (Pejton)',
      rate: '€1.00/orë',
      rateVal: 1.00,
      walk: '120m',
      hardwareId: 'DN-1440',
      macAddress: 'D1:22:98:14:40:B9',
      lat: 42.6592,
      lon: 21.1558,
      isAvailable: false,
      battery: 88,
      solarCharging: true,
      barrierState: 'LOWERED',
      tamperAlarm: false
    },
    {
      id: 'P03',
      code: 'Vendi P-03',
      corridor: 'Pejton',
      address: 'Afër Teatrit ODA (Pejton)',
      rate: '€1.00/orë',
      rateVal: 1.00,
      walk: '85m',
      hardwareId: 'DN-0118',
      macAddress: 'FA:88:51:01:18:C4',
      lat: 42.6608,
      lon: 21.1582,
      isAvailable: true,
      battery: 96,
      solarCharging: true,
      barrierState: 'RAISED',
      tamperAlarm: false
    },
    {
      id: 'P04',
      code: 'Vendi P-04',
      corridor: 'Pejton',
      address: 'Bulevardi Bill Clinton (Hyrja Pejton)',
      rate: '€1.00/orë',
      rateVal: 1.00,
      walk: '160m',
      hardwareId: 'DN-2201',
      macAddress: 'E5:19:80:44:11:C9',
      lat: 42.6586,
      lon: 21.1546,
      isAvailable: true,
      battery: 91,
      solarCharging: true,
      barrierState: 'RAISED',
      tamperAlarm: false
    },
    {
      id: 'P05',
      code: 'Vendi P-05',
      corridor: 'Pejton',
      address: 'Rr. Robert Doll (Ambasadat)',
      rate: '€1.00/orë',
      rateVal: 1.00,
      walk: '210m',
      hardwareId: 'DN-0943',
      macAddress: 'B2:11:77:33:99:A2',
      lat: 42.6614,
      lon: 21.1552,
      isAvailable: false,
      battery: 89,
      solarCharging: false,
      barrierState: 'LOWERED',
      tamperAlarm: false
    },
    {
      id: 'P06',
      code: 'Vendi P-06',
      corridor: 'Qendër',
      address: 'Rr. Garibaldi (Grand Hotel)',
      rate: '€1.50/orë',
      rateVal: 1.50,
      walk: '320m',
      hardwareId: 'DN-3104',
      macAddress: 'AA:55:99:11:22:33',
      lat: 42.6622,
      lon: 21.1598,
      isAvailable: true,
      battery: 95,
      solarCharging: true,
      barrierState: 'RAISED',
      tamperAlarm: false
    },
    {
      id: 'P07',
      code: 'Vendi P-07',
      corridor: 'Qendër',
      address: 'Sheshi Zahir Pajaziti (Kënd)',
      rate: '€1.50/orë',
      rateVal: 1.50,
      walk: '280m',
      hardwareId: 'DN-4012',
      macAddress: 'CC:44:88:22:00:11',
      lat: 42.6628,
      lon: 21.1611,
      isAvailable: true,
      battery: 92,
      solarCharging: true,
      barrierState: 'RAISED',
      tamperAlarm: false
    },
    {
      id: 'P08',
      code: 'Vendi P-08',
      corridor: 'Qendër',
      address: 'Rr. Luan Haradinaj (Afër Stadiumit)',
      rate: '€1.00/orë',
      rateVal: 1.00,
      walk: '400m',
      hardwareId: 'DN-5110',
      macAddress: 'EE:77:33:99:44:88',
      lat: 42.6639,
      lon: 21.1569,
      isAvailable: false,
      battery: 85,
      solarCharging: true,
      barrierState: 'LOWERED',
      tamperAlarm: false
    }
  ];

  const [spots, setSpots] = useState(initialSpots);
  const [selectedSpot, setSelectedSpot] = useState(initialSpots[0]);
  const [filterAvailability, setFilterAvailability] = useState('ALL');
  const [filterCorridor, setFilterCorridor] = useState('ALL');

  // Surge Pricing Multiplier: 1.0, 1.5, 2.0
  const [surgeMultiplier, setSurgeMultiplier] = useState(1.0);

  // Live Audit Event Stream
  const [eventLogs, setEventLogs] = useState([
    { id: 1, time: '23:18:10', type: 'SYS', text: 'Qendra Operative Shtegu: Sinkronizuar me 8 barriera në Prishtinë.' },
    { id: 2, time: '23:18:14', type: 'BLE', text: 'DN-0892 (P-01): BLE Heartbeat OK. RSSI: -58 dBm, Batt: 94%.' },
    { id: 3, time: '23:18:22', type: 'SOLAR', text: 'Paneli Solar: Karikim aktiv 18.2V në të gjitha njësitë Pejton.' }
  ]);

  // Push new event
  const pushEvent = (type, text) => {
    const d = new Date();
    const timeStr = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
    setEventLogs(prev => [{ id: Date.now(), time: timeStr, type, text }, ...prev.slice(0, 25)]);
  };

  // Interactive Demo Scenario State
  const [activeScenario, setActiveScenario] = useState(null);
  const [scenarioToast, setScenarioToast] = useState(null);

  // OTA Firmware Deployment State
  const [otaProgress, setOtaProgress] = useState(0);
  const [isOtaDeploying, setIsOtaDeploying] = useState(false);
  const [otaComplete, setOtaComplete] = useState(false);
  const [otaLogs, setOtaLogs] = useState([
    'Sistemi gati: Nordic DFU Mesh Gateway aktiv.',
    'Paketa e verifikuar: Shtegu-nRF52840-v2.4.2-ATK.bin (CRC32: 0x8F91B02C).'
  ]);

  // Corporate Fleet Accounts & Whitelist State
  const [corporateAccounts] = useState([
    { id: 'bkt', name: 'BKT Banka Kosovës', vehiclesCount: 12, budgetMonthly: 1200, spentMonthly: 342.00, transactions: 85, active: true },
    { id: 'keds', name: 'KEDS Kosova', vehiclesCount: 24, budgetMonthly: 2500, spentMonthly: 890.50, transactions: 210, active: true },
    { id: 'ipko', name: 'IPKO Telecommunications', vehiclesCount: 8, budgetMonthly: 800, spentMonthly: 184.00, transactions: 42, active: true },
    { id: 'dukagjini', name: 'Dukagjini Group', vehiclesCount: 6, budgetMonthly: 600, spentMonthly: 98.00, transactions: 28, active: true }
  ]);

  const [fleetVehicles, setFleetVehicles] = useState([
    { plate: '01-842-AB', model: 'Audi A6 (2024)', company: 'BKT Banka Kosovës', dept: 'Bordi Drejtues', accessZone: 'Pejton + Qendër', status: 'Në Parkim (P-01)' },
    { plate: '01-190-KL', model: 'VW Caddy Maxi', company: 'KEDS Kosova', dept: 'Ekipi Operativ Terren', accessZone: 'Të gjitha Zonat', status: 'I Lirë' },
    { plate: '02-550-ZZ', model: 'Skoda Octavia Combi', company: 'IPKO Telecommunications', dept: 'Inxhinieria e Rrjetit', accessZone: 'Pejton', status: 'I Lirë' },
    { plate: '01-773-EE', model: 'BMW 530d', company: 'Dukagjini Group', dept: 'Menaxhment Ekzekutiv', accessZone: 'Pejton + Qendër', status: 'I Lirë' },
    { plate: '01-419-MC', model: 'Toyota RAV4 Hybrid', company: 'BKT Banka Kosovës', dept: 'Auditimi i Brendshëm', accessZone: 'Pejton', status: 'I Lirë' }
  ]);

  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [newVehiclePlate, setNewVehiclePlate] = useState('');
  const [newVehicleModel, setNewVehicleModel] = useState('');
  const [newVehicleCompany, setNewVehicleCompany] = useState('BKT Banka Kosovës');
  const [newVehicleDept, setNewVehicleDept] = useState('');

  // Runner for Enterprise Demo Scenarios
  const handleRunScenario = (type) => {
    setActiveScenario(type);
    if (type === 'tamper') {
      setSpots(prev => prev.map(s => s.id === 'P04' ? { ...s, tamperAlarm: true } : s));
      pushEvent('TAMPER', '🚨 ALARM TAMPER: Vandalizëm i detektuar në Vendi P-04 (Bulevardi Bill Clinton). Sirena 100dB aktive! Policia Komunale u njoftua.');
      setScenarioToast('🚨 Skenari 1 Aktiv: Sirena 100 dB u ndez në Vendi P-04 (Bill Clinton). Shiko skedën "Siguria & Sirena".');
    } else if (type === 'fleet') {
      setSpots(prev => prev.map(s => s.id === 'P01' ? { ...s, barrierState: 'LOWERED', isAvailable: false } : s));
      pushEvent('FLEET', '🏢 FLOTA BKT: Automjeti Audi A6 (01-842-AB) u njoh me kamerën LPR. Barriera P-01 u ul në 1.4s. Faturuar €1.00 me debitim automatik.');
      setScenarioToast('🚙 Skenari 2 Aktiv: Flota BKT (01-842-AB) kaloi barrierën P-01 pa pritur. Faturimi korporativ u debitua automatikisht.');
    } else if (type === 'surge') {
      handleApplySurge(2.5);
      pushEvent('PRICING', '⚡ SURGE PRICING 2.5x: Ndeshja në Stadiumin Fadil Vokrri fillon pas 45min. Çmimi u rrit automatikisht nga €1.00 në €2.50/orë.');
      setScenarioToast('⚡ Skenari 3 Aktiv: Surge Pricing 2.5x u aktivizua për krejt korridorin Pejton/Qendër.');
    } else if (type === 'emergency') {
      handleBulkLowerAll();
      pushEvent('EMERGENCY', '🚒 EVAKUIM EMERGJENT: Qendra Operative Komunale liroi korridorin e rrugës Perandori Justinian për auto-ambulancën.');
      setScenarioToast('🚒 Skenari 4 Aktiv: Korridori Emergjent i liruar! Të gjitha 12 barrierat u ulën për kalimin e shpejtë.');
    } else if (type === 'eco') {
      setSpots(prev => prev.map(s => s.id === 'P02' ? { ...s, battery: 22, solarCharging: false } : s));
      pushEvent('ECO', '🔋 ECO BEACON: Barriera P-02 kaloi në kursim energjie (Intervali BLE 1000ms, transmetimi i reduktuar në 0dBm).');
      setScenarioToast('🔋 Skenari 5 Aktiv: Barriera P-02 kaloi në modalitetin me kursim energjie.');
    }
  };

  // OTA Firmware Deployment Runner
  const handleStartOta = () => {
    if (isOtaDeploying) return;
    setIsOtaDeploying(true);
    setOtaProgress(0);
    setOtaComplete(false);
    pushEvent('OTA', '🚀 Transmetimi OTA Firmware (v2.4.2-enterprise-kosovo) nisi përmes BLE Mesh Broadcast...');

    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      if (current >= 100) {
        clearInterval(interval);
        setOtaProgress(100);
        setIsOtaDeploying(false);
        setOtaComplete(true);
        pushEvent('OTA', '✅ OTA Firmware v2.4.2 u instalua me sukses në të 12 barrierat nRF52840. Hashi CRC32 u verifikua!');
      } else {
        setOtaProgress(current);
        if (current === 30) {
          setOtaLogs(prev => ['[BLE MESH] Chunk 18/60 shpërndarë në nyjet Pejton...', ...prev]);
        } else if (current === 60) {
          setOtaLogs(prev => ['[DFU FLASH] Dual-Bank Flash Swap verifikuar në nyjen DN-0892...', ...prev]);
        } else if (current === 90) {
          setOtaLogs(prev => ['[VERIFY] Checksum CRC32 0x8F91B02C përputhet 100%...', ...prev]);
        }
      }
    }, 350);
  };

  // Filtered spots for map
  const displayedSpots = spots.filter(s => {
    if (filterAvailability === 'FREE' && !s.isAvailable) return false;
    if (filterAvailability === 'OCCUPIED' && s.isAvailable) return false;
    if (filterCorridor !== 'ALL' && s.corridor !== filterCorridor) return false;
    return true;
  });

  const availableCount = spots.filter(s => s.isAvailable).length;
  const occupiedCount = spots.filter(s => !s.isAvailable).length;
  const activeAlarmsCount = spots.filter(s => s.tamperAlarm).length;

  // Single stall override
  const handleToggleBarrier = (spotId) => {
    setSpots(prev => prev.map(s => {
      if (s.id === spotId) {
        const nextState = s.barrierState === 'RAISED' ? 'LOWERED' : 'RAISED';
        const nextAvail = nextState === 'RAISED';
        pushEvent('CMD', `Komandë direkte: Barriera ${s.code} u caktua në ${nextState}.`);
        return { ...s, barrierState: nextState, isAvailable: nextAvail };
      }
      return s;
    }));

    if (selectedSpot && selectedSpot.id === spotId) {
      setSelectedSpot(prev => ({
        ...prev,
        barrierState: prev.barrierState === 'RAISED' ? 'LOWERED' : 'RAISED',
        isAvailable: prev.barrierState !== 'RAISED'
      }));
    }
  };

  // Bulk Emergency Override: Lower All
  const handleBulkLowerAll = () => {
    setSpots(prev => prev.map(s => ({
      ...s,
      barrierState: 'LOWERED',
      isAvailable: false
    })));
    pushEvent('EMERGENCY', '🚨 ALARM EMERGJENT: Të gjitha barrierat u ulën për evakuim (Komandë e Përgjithshme).');
  };

  // Bulk Lock: Raise All
  const handleBulkRaiseAll = () => {
    setSpots(prev => prev.map(s => ({
      ...s,
      barrierState: 'RAISED',
      isAvailable: true
    })));
    pushEvent('SECURITY', '🔒 SIGURIA E RRJETIT: Të gjitha barrierat u ngritën (Kyçje e Rrjetit).');
  };

  // Simulate Tamper Siren
  const handleTriggerTamper = (spotId) => {
    setSpots(prev => prev.map(s => {
      if (s.id === spotId) {
        return { ...s, tamperAlarm: true };
      }
      return s;
    }));
    pushEvent('TAMPER', `🚨 GODITJE ME FORCE! Sensori 3-boshtor i vibrimit u aktivizua në ${spotId}. Sirena 100 dB aktive!`);
  };

  const handleResetTamper = (spotId) => {
    setSpots(prev => prev.map(s => {
      if (s.id === spotId) {
        return { ...s, tamperAlarm: false };
      }
      return s;
    }));
    pushEvent('SECURITY', `Sirena u çaktivizua dhe sensori u ri-armatos për ${spotId}.`);
  };

  // Dynamic Surge Pricing Application
  const handleApplySurge = (mult) => {
    setSurgeMultiplier(mult);
    setSpots(prev => prev.map(s => ({
      ...s,
      rate: `€${(s.rateVal * mult).toFixed(2)}/orë`
    })));
    pushEvent('PRICING', `Çmimi dinamik u përditësua me faktorin ${mult}x. Tarifa e re aktive.`);
  };

  // Export Municipal Fiscal CSV
  const handleExportFiscalCSV = () => {
    const csvHeader = "Transaksioni_ID,Vendi_Kodi,Zona,Tarifa_Ore_EUR,Kohezgjatja_Min,Shuma_Bruto_EUR,TVSH_18_EUR,Neto_EUR,Statusi,Koha\n";
    const sampleRows = [
      "TX-90214,Vendi P-01,Pejton,1.00,75,1.25,0.19,1.06,I_KRYER,2026-10-12 14:15",
      "TX-90215,Vendi P-02,Pejton,1.00,120,2.00,0.31,1.69,I_KRYER,2026-10-12 14:40",
      "TX-90216,Vendi P-03,Pejton,1.00,45,0.75,0.11,0.64,I_KRYER,2026-10-12 15:10",
      "TX-90217,Vendi P-06,Qendër,1.50,90,2.25,0.34,1.91,I_KRYER,2026-10-12 15:35",
      "TX-90218,Vendi P-07,Qendër,1.50,180,4.50,0.69,3.81,I_KRYER,2026-10-12 16:00"
    ].join('\n');

    const blob = new Blob([csvHeader + sampleRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Shtegu_Raporti_Fiskal_Prishtine_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    pushEvent('EXPORT', 'Eksporti fiskal u shkarkua me sukses (Shtegu_Raporti_Fiskal_Prishtine_2026.csv).');
  };

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '24px 20px 60px',
      color: '#E2E8F0',
      fontFamily: 'var(--font-sans)'
    }}>
      {/* Top Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid #1F222A'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{
              background: '#FFB703',
              color: '#000000',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: '900',
              padding: '2px 8px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Building2 size={12} /> ENTERPRISE OPERATIONS CENTER
            </span>
            <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: '#8F96A3' }}>
              Qendra Operative Komunale • Prishtinë 2026
            </span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
            {isSq ? 'Paneli Operativ i Ndërmarrjes — Shtegu IoT Mission Control' : 'Enterprise IoT Mission Control — Shtegu Smart Grid'}
          </h1>
          <p style={{ fontSize: '13px', color: '#8F96A3', margin: '4px 0 0 0' }}>
            {isSq 
              ? 'Menaxhimi i plotë komunal i rrjetit të mikro-parkimit: Harta Geoapify, komandat në grup (overrides), çmimi dinamik dhe raportimi fiskal me TVSH.' 
              : 'Complete municipal micro-parking fleet platform: Geoapify spatial digital twin, bulk emergency overrides, surge pricing engine & VAT tax audit.'}
          </p>
        </div>

        {/* Status Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {activeAlarmsCount > 0 && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid #EF4444',
              color: '#EF4444',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              animation: 'pulse 1.5s infinite'
            }}>
              <AlertTriangle size={15} />
              {activeAlarmsCount} SIRENË TAMPER AKTIVE!
            </div>
          )}

          <div style={{
            background: '#16181D',
            border: '1px solid #282C37',
            padding: '8px 14px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10B981',
              boxShadow: '0 0 10px #10B981'
            }}></div>
            <div>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#8F96A3' }}>GEOAPIFY SERVICE</div>
              <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#FFB703', fontWeight: '700' }}>
                {GEOAPIFY_API_KEY.slice(0, 8)}...{GEOAPIFY_API_KEY.slice(-6)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Enterprise Demo Presets Simulator */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255, 183, 3, 0.08) 0%, rgba(16, 185, 129, 0.05) 100%)',
        border: '1px solid rgba(255, 183, 3, 0.35)',
        borderRadius: '14px',
        padding: '14px 18px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="#FFB703" />
            <span style={{ fontSize: '12px', fontWeight: '900', fontFamily: 'var(--font-mono)', color: '#FFB703', letterSpacing: '0.04em' }}>
              {isSq ? 'SIMULATORI I SKENARËVE TË DEMOS (1-CLICK ENTERPRISE DEMO PRESETS)' : 'ENTERPRISE DEMO PRESETS (1-CLICK LIVE SCENARIO SIMULATOR)'}
            </span>
          </div>
          <span style={{ fontSize: '11px', color: '#8F96A3', fontFamily: 'var(--font-mono)' }}>
            {isSq ? 'Kliko një skenar për të testuar reagimin e plotë të rrjetit në kohë reale' : 'Click a scenario to trigger real-time multi-system reaction'}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
          <button
            onClick={() => handleRunScenario('tamper')}
            style={{
              background: activeScenario === 'tamper' ? '#EF4444' : '#16181D',
              border: `1px solid ${activeScenario === 'tamper' ? '#EF4444' : '#282C37'}`,
              color: activeScenario === 'tamper' ? '#FFFFFF' : '#CBD5E1',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '11.5px',
              fontWeight: '700',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>🚨</span>
            <span>{isSq ? 'Skenari 1: Alarm Vandalizmi (P-04)' : 'Scenario 1: Tamper Alarm (P-04)'}</span>
          </button>

          <button
            onClick={() => handleRunScenario('fleet')}
            style={{
              background: activeScenario === 'fleet' ? '#FFB703' : '#16181D',
              border: `1px solid ${activeScenario === 'fleet' ? '#FFB703' : '#282C37'}`,
              color: activeScenario === 'fleet' ? '#000000' : '#CBD5E1',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '11.5px',
              fontWeight: '700',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>🚙</span>
            <span>{isSq ? 'Skenari 2: Flota BKT (LPR Autopass)' : 'Scenario 2: BKT Fleet (LPR Pass)'}</span>
          </button>

          <button
            onClick={() => handleRunScenario('surge')}
            style={{
              background: activeScenario === 'surge' ? '#FFB703' : '#16181D',
              border: `1px solid ${activeScenario === 'surge' ? '#FFB703' : '#282C37'}`,
              color: activeScenario === 'surge' ? '#000000' : '#CBD5E1',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '11.5px',
              fontWeight: '700',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>⚡</span>
            <span>{isSq ? 'Skenari 3: Surge Fadil Vokrri (2.5x)' : 'Scenario 3: Stadium Surge (2.5x)'}</span>
          </button>

          <button
            onClick={() => handleRunScenario('emergency')}
            style={{
              background: activeScenario === 'emergency' ? '#10B981' : '#16181D',
              border: `1px solid ${activeScenario === 'emergency' ? '#10B981' : '#282C37'}`,
              color: activeScenario === 'emergency' ? '#000000' : '#CBD5E1',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '11.5px',
              fontWeight: '700',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>🚒</span>
            <span>{isSq ? 'Skenari 4: Korridori Emergjent' : 'Scenario 4: Green Corridor'}</span>
          </button>

          <button
            onClick={() => handleRunScenario('eco')}
            style={{
              background: activeScenario === 'eco' ? '#38BDF8' : '#16181D',
              border: `1px solid ${activeScenario === 'eco' ? '#38BDF8' : '#282C37'}`,
              color: activeScenario === 'eco' ? '#000000' : '#CBD5E1',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '11.5px',
              fontWeight: '700',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>🔋</span>
            <span>{isSq ? 'Skenari 5: Bateri e Ulët & Eco Beacon' : 'Scenario 5: Eco Beacon Mode'}</span>
          </button>
        </div>

        {scenarioToast && (
          <div style={{
            marginTop: '10px',
            background: '#0B0B0D',
            border: '1px solid #FFB703',
            borderRadius: '8px',
            padding: '8px 14px',
            fontSize: '12px',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px'
          }}>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{scenarioToast}</span>
            <button
              onClick={() => setScenarioToast(null)}
              style={{ background: 'transparent', border: 'none', color: '#8F96A3', cursor: 'pointer', fontSize: '13px' }}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Enterprise Sub-Navigation Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '20px',
        borderBottom: '1px solid #1F222A',
        paddingBottom: '12px',
        overflowX: 'auto'
      }}>
        {[
          { id: 'map', label: isSq ? '🗺️ Harta Digjitale (Live Grid)' : '🗺️ Digital Twin Map', badge: `${spots.length} Barriera` },
          { id: 'controls', label: isSq ? '⚡ Veprimet në Grup & Çmimet' : '⚡ Bulk Overrides & Surge', badge: `${surgeMultiplier}x Surge` },
          { id: 'alarms', label: isSq ? '🚨 Siguria & Sirena (Tamper)' : '🚨 Tamper & Security', badge: activeAlarmsCount > 0 ? `${activeAlarmsCount} Alarm` : 'Sigurt' },
          { id: 'reports', label: isSq ? '📊 Raportimi Fiskal & Eksporti' : '📊 Fiscal Audit & CSV', badge: 'TVSH 18%' },
          { id: 'telemetry', label: isSq ? '📡 Telemetria & Firmware OTA' : '📡 Telemetry & OTA Firmware', badge: otaComplete ? 'v2.4.2 OK' : 'Nordic DFU' },
          { id: 'fleet', label: isSq ? '🏢 Flotat Korporative B2B' : '🏢 Corporate Fleet Hub', badge: `${corporateAccounts.length} Ndërmarrje` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? '#FFB703' : '#16181D',
              color: activeTab === tab.id ? '#000000' : '#CBD5E1',
              border: activeTab === tab.id ? '1px solid #FFB703' : '1px solid #282C37',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '12.5px',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <span>{tab.label}</span>
            <span style={{
              background: activeTab === tab.id ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.08)',
              color: activeTab === tab.id ? '#000000' : '#8F96A3',
              fontSize: '10px',
              padding: '1px 6px',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)'
            }}>
              {tab.badge}
            </span>
          </button>
        ))}
      </div>

      {/* 4 Metric Callout Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '14px',
        marginBottom: '20px'
      }}>
        <div style={{ background: '#16181D', border: '1px solid #282C37', borderRadius: '12px', padding: '14px 18px' }}>
          <div style={{ fontSize: '11px', color: '#8F96A3', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
            {isSq ? 'Kapaciteti Total' : 'Total Grid Stalls'}
          </div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#FFFFFF', marginTop: '4px' }}>
            {spots.length} <span style={{ fontSize: '13px', color: '#8F96A3', fontWeight: '400' }}>vende aktive</span>
          </div>
        </div>

        <div style={{ background: '#16181D', border: '1px solid #282C37', borderRadius: '12px', padding: '14px 18px' }}>
          <div style={{ fontSize: '11px', color: '#8F96A3', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
            {isSq ? 'Të Lira Menjëherë' : 'Instantly Available'}
          </div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#10B981', marginTop: '4px' }}>
            {availableCount} <span style={{ fontSize: '13px', color: '#8F96A3', fontWeight: '400' }}>({Math.round((availableCount / spots.length) * 100)}%)</span>
          </div>
        </div>

        <div style={{ background: '#16181D', border: '1px solid #282C37', borderRadius: '12px', padding: '14px 18px' }}>
          <div style={{ fontSize: '11px', color: '#8F96A3', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
            {isSq ? 'Nën Shfrytëzim' : 'Occupied'}
          </div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#EF4444', marginTop: '4px' }}>
            {occupiedCount} <span style={{ fontSize: '13px', color: '#8F96A3', fontWeight: '400' }}>({Math.round((occupiedCount / spots.length) * 100)}%)</span>
          </div>
        </div>

        <div style={{ background: '#16181D', border: '1px solid #282C37', borderRadius: '12px', padding: '14px 18px' }}>
          <div style={{ fontSize: '11px', color: '#8F96A3', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
            {isSq ? 'Efikasiteti Solar & Bateria' : 'Solar MPPT & Battery'}
          </div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#FFB703', marginTop: '4px' }}>
            92.8% <span style={{ fontSize: '13px', color: '#10B981', fontWeight: '600' }}>• 100% Online</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: DIGITAL TWIN MAP VIEW */}
      {/* ========================================================= */}
      {activeTab === 'map' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '20px',
          alignItems: 'stretch'
        }}>
          {/* Left: Map Container with Filters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Quick Filter Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
              background: '#16181D',
              padding: '10px 14px',
              borderRadius: '12px',
              border: '1px solid #282C37'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Filter size={14} color="#8F96A3" />
                <span style={{ fontSize: '12px', color: '#8F96A3', fontWeight: '600' }}>
                  {isSq ? 'Filtro Statusin:' : 'Filter Status:'}
                </span>
                {[
                  { id: 'ALL', label: isSq ? 'Të Gjitha' : 'All' },
                  { id: 'FREE', label: isSq ? 'Të Lira' : 'Free' },
                  { id: 'OCCUPIED', label: isSq ? 'Të Zëna' : 'Busy' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFilterAvailability(f.id)}
                    style={{
                      background: filterAvailability === f.id ? '#FFB703' : '#1F222A',
                      color: filterAvailability === f.id ? '#000000' : '#8F96A3',
                      border: 'none',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: '#8F96A3' }}>{isSq ? 'Zona:' : 'Zone:'}</span>
                {['ALL', 'Pejton', 'Qendër'].map(z => (
                  <button
                    key={z}
                    onClick={() => setFilterCorridor(z)}
                    style={{
                      background: filterCorridor === z ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                      color: filterCorridor === z ? '#60A5FA' : '#8F96A3',
                      border: `1px solid ${filterCorridor === z ? '#3B82F6' : '#282C37'}`,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                  >
                    {z === 'ALL' ? (isSq ? 'Të gjitha' : 'All') : z}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Map */}
            <div style={{ height: '560px', width: '100%' }}>
              <GeoapifyMap
                spots={displayedSpots}
                selectedSpot={selectedSpot}
                onSelectSpot={(spot) => setSelectedSpot(spot)}
                height="100%"
                compact={false}
                lang={lang}
              />
            </div>
          </div>

          {/* Right: Selected Spot Inspector & Remote Telemetry */}
          <div style={{
            background: '#16181D',
            border: '1px solid #282C37',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{
                  background: selectedSpot?.isAvailable ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: selectedSpot?.isAvailable ? '#10B981' : '#EF4444',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: '800',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: `1px solid ${selectedSpot?.isAvailable ? '#10B981' : '#EF4444'}`
                }}>
                  {selectedSpot?.isAvailable ? (isSq ? 'I LIRË • GATI PËR PARKIM' : 'AVAILABLE • READY') : (isSq ? 'I ZËNË • BARRIERA POSHTË' : 'OCCUPIED')}
                </span>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8F96A3' }}>
                  {selectedSpot?.hardwareId}
                </span>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#FFFFFF', margin: '0 0 4px 0' }}>
                {selectedSpot?.code}
              </h3>
              <p style={{ fontSize: '12.5px', color: '#8F96A3', margin: '0 0 16px 0' }}>
                {selectedSpot?.address}
              </p>

              {/* Hardware Telemetry Specs */}
              <div style={{
                background: '#0B0B0D',
                border: '1px solid #1F222A',
                borderRadius: '12px',
                padding: '14px',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8F96A3', marginBottom: '10px' }}>
                  TELEMETRIA IOT NË KOHË REALE
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#8F96A3', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Battery size={14} color="#10B981" /> Niveli i Baterisë:
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: '#FFFFFF' }}>
                      {selectedSpot?.battery}% (LiFePO4)
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#8F96A3', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sun size={14} color="#FFB703" /> Paneli Solar:
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: selectedSpot?.solarCharging ? '#10B981' : '#8F96A3' }}>
                      {selectedSpot?.solarCharging ? '18.2V (Duke u karikuar)' : 'Pasiv (Hije)'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#8F96A3', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Radio size={14} color="#3B82F6" /> Protokolli BLE:
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: '#38BDF8' }}>
                      Nordic NUS (20-Byte)
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#8F96A3', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ShieldCheck size={14} color="#FFB703" /> Pozicioni Fizik:
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: '800',
                      color: selectedSpot?.barrierState === 'RAISED' ? '#FFB703' : '#10B981'
                    }}>
                      {selectedSpot?.barrierState === 'RAISED' ? 'NALT (450mm)' : 'POSHTË (75mm)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Coordinates & MAC Address */}
              <div style={{
                background: '#0B0B0D',
                border: '1px solid #1F222A',
                borderRadius: '10px',
                padding: '10px 12px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: '#8F96A3',
                marginBottom: '16px'
              }}>
                <div>MAC: <span style={{ color: '#FFFFFF' }}>{selectedSpot?.macAddress}</span></div>
                <div>GPS: <span style={{ color: '#FFFFFF' }}>{selectedSpot?.lat.toFixed(4)}, {selectedSpot?.lon.toFixed(4)}</span></div>
                <div>Tarifa: <span style={{ color: '#FFB703', fontWeight: '700' }}>{selectedSpot?.rate}</span></div>
              </div>
            </div>

            {/* Action Button: Override Barrier */}
            <div>
              <button
                onClick={() => handleToggleBarrier(selectedSpot.id)}
                style={{
                  width: '100%',
                  background: selectedSpot?.barrierState === 'RAISED' ? '#FFB703' : '#10B981',
                  color: '#000000',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '12px',
                  fontWeight: '900',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                  transition: 'all 0.15s ease'
                }}
              >
                {selectedSpot?.barrierState === 'RAISED' ? (
                  <>
                    <ArrowDownCircle size={18} />
                    {isSq ? 'Komando: ULE BARRIERËN (BLE)' : 'Command: LOWER BARRIER'}
                  </>
                ) : (
                  <>
                    <ArrowUpCircle size={18} />
                    {isSq ? 'Komando: NGRITE BARRIERËN' : 'Command: RAISE BARRIER'}
                  </>
                )}
              </button>

              <div style={{ fontSize: '11px', color: '#64748B', textAlign: 'center', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
                {isSq ? 'Simulon dërgimin e paketës 20-Byte në GATT Server' : 'Simulates 20-byte payload write to Nordic NUS'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: BULK OVERRIDES & SURGE PRICING ENGINE */}
      {/* ========================================================= */}
      {activeTab === 'controls' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
          
          {/* Card A: Municipal Bulk Emergency Actions */}
          <div style={{
            background: '#16181D',
            border: '1px solid #282C37',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Zap size={20} color="#FFB703" />
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                {isSq ? 'Komandat Emergjente në Grup (Municipal Overrides)' : 'Municipal Fleet Bulk Overrides'}
              </h2>
            </div>
            <p style={{ fontSize: '12.5px', color: '#8F96A3', marginBottom: '20px' }}>
              {isSq 
                ? 'Protokolle komanduese që transmetojnë me broadcast sinjalin BLE te të gjitha 8 barrierat njëkohësisht.' 
                : 'Broadcast BLE payloads controlling all smart barrier units across corridors simultaneously.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Action 1: Lower All */}
              <div style={{
                background: '#0B0B0D',
                border: '1px solid #1F222A',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px'
              }}>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: '#EF4444' }}>
                    🚨 {isSq ? 'Evakuim Emergjent (Hap Të Gjitha)' : 'Emergency Evacuation (Lower All)'}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#8F96A3', marginTop: '2px' }}>
                    {isSq ? 'Ul të gjitha barrierat për kalim të lirë të zjarrfikësve dhe ambulancave.' : 'Lowers all barriers for emergency services and clear evacuation.'}
                  </div>
                </div>
                <button
                  onClick={handleBulkLowerAll}
                  style={{
                    background: '#EF4444',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontWeight: '800',
                    fontSize: '12px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {isSq ? 'Ekzekuto Tani' : 'Execute Now'}
                </button>
              </div>

              {/* Action 2: Raise All / Curfew */}
              <div style={{
                background: '#0B0B0D',
                border: '1px solid #1F222A',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px'
              }}>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: '#FFB703' }}>
                    🔒 {isSq ? 'Kyçja e Rrjetit (Orë Policore / Natë)' : 'Lock Grid (Night Security Curfew)'}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#8F96A3', marginTop: '2px' }}>
                    {isSq ? 'Ngrit të gjitha barrierat për parandalim të parkimit të paautorizuar gjatë natës.' : 'Raises all barriers to secure spaces overnight.'}
                  </div>
                </div>
                <button
                  onClick={handleBulkRaiseAll}
                  style={{
                    background: '#FFB703',
                    color: '#000000',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontWeight: '800',
                    fontSize: '12px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {isSq ? 'Kyç Rrjetin' : 'Lock All'}
                </button>
              </div>

              {/* Action 3: Rotate HMAC Keys */}
              <div style={{
                background: '#0B0B0D',
                border: '1px solid #1F222A',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px'
              }}>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: '#38BDF8' }}>
                    🔄 {isSq ? 'Rotacion Çelësash Cloud HMAC' : 'Rotate Cloud HMAC Auth Keys'}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#8F96A3', marginTop: '2px' }}>
                    {isSq ? 'Gjeneron dhe shpërndan 4-bajt çelësa të rinj kriptografikë te fenerët BLE.' : 'Refreshes 4-byte auth tokens across all Nordic NUS receivers.'}
                  </div>
                </div>
                <button
                  onClick={() => pushEvent('CRYPTO', 'Çelësat e rinj HMAC [0x9B, 0x4C, 0x11, 0xFA] u shpërndanë me sukses.')}
                  style={{
                    background: '#1F222A',
                    color: '#38BDF8',
                    border: '1px solid #38BDF8',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontWeight: '800',
                    fontSize: '12px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {isSq ? 'Ri-gjenero' : 'Rotate'}
                </button>
              </div>
            </div>
          </div>

          {/* Card B: Dynamic Surge Pricing Engine */}
          <div style={{
            background: '#16181D',
            border: '1px solid #282C37',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Flame size={20} color="#FFB703" />
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                {isSq ? 'Motori i Çmimeve Dinamike (Surge Pricing)' : 'Dynamic Surge Pricing Engine'}
              </h2>
            </div>
            <p style={{ fontSize: '12.5px', color: '#8F96A3', marginBottom: '20px' }}>
              {isSq 
                ? 'Rregullo tarifat e parkimit në bazë të ngarkesës në Pejton dhe Qendër për të maksimizuar qarkullimin e veturave.' 
                : 'Adjust micro-parking rates dynamically based on demand to maximize turnover and municipal revenue.'}
            </p>

            <div style={{ background: '#0B0B0D', padding: '16px', borderRadius: '12px', border: '1px solid #1F222A', marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', color: '#8F96A3', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                SHKALLA E ÇMIMIT DINAMIK AKTIV:
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {[
                  { mult: 1.0, label: isSq ? 'Standard' : 'Standard', desc: '€1.00/h', color: '#10B981' },
                  { mult: 1.5, label: isSq ? 'Piku (11:00-14:00)' : 'Peak Hours', desc: '€1.50/h', color: '#FFB703' },
                  { mult: 2.0, label: isSq ? 'Event / VIP' : 'Event Surge', desc: '€2.00/h', color: '#EF4444' }
                ].map(tier => (
                  <button
                    key={tier.mult}
                    onClick={() => handleApplySurge(tier.mult)}
                    style={{
                      background: surgeMultiplier === tier.mult ? tier.color : '#16181D',
                      color: surgeMultiplier === tier.mult ? '#000000' : '#FFFFFF',
                      border: `1.5px solid ${tier.color}`,
                      padding: '14px 10px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span style={{ fontSize: '12px', fontWeight: '800' }}>{tier.label}</span>
                    <span style={{ fontSize: '16px', fontWeight: '900', fontFamily: 'var(--font-mono)' }}>{tier.desc}</span>
                    <span style={{ fontSize: '10px', opacity: 0.8 }}>({tier.mult}x)</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Impact Projection */}
            <div style={{
              background: '#0B0B0D',
              border: '1px solid #1F222A',
              borderRadius: '12px',
              padding: '14px',
              fontSize: '12px',
              lineHeight: 1.6
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8F96A3', marginBottom: '6px' }}>
                <span>Të hyrat e projektuara ditore (32 vende):</span>
                <strong style={{ color: '#FFB703', fontFamily: 'var(--font-mono)' }}>€{(348.50 * surgeMultiplier).toFixed(2)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8F96A3', marginBottom: '6px' }}>
                <span>Qarkullimi mesatar i veturave:</span>
                <strong style={{ color: '#10B981', fontFamily: 'var(--font-mono)' }}>{(4.2 * surgeMultiplier).toFixed(1)} vetura/vend</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8F96A3' }}>
                <span>Pjesa komunale (Koncesioni 20%):</span>
                <strong style={{ color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>€{(69.70 * surgeMultiplier).toFixed(2)} / ditë</strong>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: TAMPER & SECURITY ALARM CENTER */}
      {/* ========================================================= */}
      {activeTab === 'alarms' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
          
          {/* Card A: Tamper Simulator */}
          <div style={{
            background: '#16181D',
            border: '1px solid #282C37',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <BellRing size={20} color="#EF4444" />
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                {isSq ? 'Qendra e Alarmit të Vjedhjes (100 dB Siren)' : 'Tamper & Siren Security Dispatch'}
              </h2>
            </div>
            <p style={{ fontSize: '12.5px', color: '#8F96A3', marginBottom: '20px' }}>
              {isSq 
                ? 'Secila njësi përmban akselerometër 3-boshtor me friksion mbrojtës 180° dhe sirenë piezo 100 dB.' 
                : 'Each unit features a 3-axis impact accelerometer, 180° anti-collision clutch and 100 dB siren.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {spots.slice(0, 4).map(spot => (
                <div
                  key={spot.id}
                  style={{
                    background: spot.tamperAlarm ? 'rgba(239, 68, 68, 0.15)' : '#0B0B0D',
                    border: `1px solid ${spot.tamperAlarm ? '#EF4444' : '#1F222A'}`,
                    borderRadius: '12px',
                    padding: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '13.5px', color: '#FFFFFF' }}>
                      {spot.code} — {spot.address}
                    </div>
                    <div style={{ fontSize: '11px', color: spot.tamperAlarm ? '#EF4444' : '#10B981', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                      {spot.tamperAlarm ? '⚠️ GODITJE E DETEKTUAR (>2.5G) • SIRENA AKTIVE' : '✅ Sensori: Normal • Armatosur'}
                    </div>
                  </div>

                  <div>
                    {spot.tamperAlarm ? (
                      <button
                        onClick={() => handleResetTamper(spot.id)}
                        style={{
                          background: '#10B981',
                          color: '#000000',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          fontWeight: '800',
                          fontSize: '11px',
                          cursor: 'pointer'
                        }}
                      >
                        Çaktivizo Sirenën
                      </button>
                    ) : (
                      <button
                        onClick={() => handleTriggerTamper(spot.id)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.2)',
                          color: '#EF4444',
                          border: '1px solid #EF4444',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          fontWeight: '800',
                          fontSize: '11px',
                          cursor: 'pointer'
                        }}
                      >
                        Simulo Goditje
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card B: Security Protocols */}
          <div style={{
            background: '#16181D',
            border: '1px solid #282C37',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <ShieldCheck size={20} color="#10B981" />
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                {isSq ? 'Protokollet e Sigurisë & Integrimi Policor' : 'Municipal Security Integration'}
              </h2>
            </div>
            <p style={{ fontSize: '12.5px', color: '#8F96A3', marginBottom: '16px' }}>
              {isSq 
                ? 'Në rast tentative vjedhjeje ose goditjeje të rëndë nga vetura, sistemi dërgon automatikisht tiketë te Komuna.' 
                : 'Automated dispatch to municipal parking inspection and police dispatcher upon collision.'}
            </p>

            <div style={{
              background: '#0B0B0D',
              border: '1px solid #1F222A',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '12px',
              lineHeight: 1.7,
              color: '#CBD5E1'
            }}>
              <div>✔️ <strong>Mbrojtja Mekanike:</strong> Krahu përkulet 180° pa thyer ingranazhet e motorit.</div>
              <div>✔️ <strong>Sensori Optik:</strong> Ri-ngritja bllokohet nëse vetura është ende e parkuar sipër.</div>
              <div>✔️ <strong>Geofencing BLE:</strong> Vetëm shoferi me Bluetooth brenda 15m mund të komunikojë me barrierën.</div>
              <div>✔️ <strong>Tamper Siren 100 dB:</strong> Tingull alarmi për të dekurajuar lëvizjen e dhunshme.</div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: FISCAL REPORTING & CSV EXPORT */}
      {/* ========================================================= */}
      {activeTab === 'reports' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
          
          {/* Card A: Financial Ledger */}
          <div style={{
            background: '#16181D',
            border: '1px solid #282C37',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileSpreadsheet size={20} color="#FFB703" />
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                  {isSq ? 'Raporti Fiskal me TVSH (18%)' : 'Fiscal VAT Audit Ledger (18%)'}
                </h2>
              </div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#10B981' }}>
                ATK Verifikuar
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#8F96A3', marginBottom: '20px' }}>
              {isSq 
                ? 'Pasqyra e transaksioneve sipas standardeve të Administratës Tatimore të Kosovës (ATK).' 
                : 'Standardized municipal fiscal reports compliant with Kosovo Tax Administration.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#0B0B0D', borderRadius: '8px', fontSize: '13px' }}>
                <span style={{ color: '#8F96A3' }}>Të Hyrat Bruto Sot:</span>
                <strong style={{ color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>€1,480.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#0B0B0D', borderRadius: '8px', fontSize: '13px' }}>
                <span style={{ color: '#8F96A3' }}>TVSH e Llogaritur (18%):</span>
                <strong style={{ color: '#FFB703', fontFamily: 'var(--font-mono)' }}>€225.76</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#0B0B0D', borderRadius: '8px', fontSize: '13px' }}>
                <span style={{ color: '#8F96A3' }}>Të Hyrat Neto:</span>
                <strong style={{ color: '#10B981', fontFamily: 'var(--font-mono)' }}>€1,254.24</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#0B0B0D', borderRadius: '8px', fontSize: '13px' }}>
                <span style={{ color: '#8F96A3' }}>Reduktimi i CO₂ në Qytet:</span>
                <strong style={{ color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>184.2 kg CO₂</strong>
              </div>
            </div>

            <button
              onClick={handleExportFiscalCSV}
              style={{
                width: '100%',
                background: '#FFB703',
                color: '#000000',
                border: 'none',
                padding: '14px',
                borderRadius: '10px',
                fontWeight: '900',
                fontSize: '13.5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(255, 183, 3, 0.3)'
              }}
            >
              <Download size={16} />
              {isSq ? 'Shkarko Raportin Zyrtar (.CSV)' : 'Export Official Audit (.CSV)'}
            </button>
          </div>

          {/* Card B: Hourly Occupancy Distribution */}
          <div style={{
            background: '#16181D',
            border: '1px solid #282C37',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <TrendingUp size={20} color="#10B981" />
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                {isSq ? 'Shpërndarja e Ngarkesës Gjatë Ditës' : 'Hourly Occupancy Curve'}
              </h2>
            </div>
            <p style={{ fontSize: '12.5px', color: '#8F96A3', marginBottom: '20px' }}>
              {isSq ? 'Përqindja e vendeve të zëna sipas orëve në Pejton (piku në 12:00-14:00):' : 'Hourly peak distribution curve across commercial corridor.'}
            </p>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '180px', padding: '10px 0', borderBottom: '1px solid #282C37' }}>
              {[
                { time: '08h', pct: 35 },
                { time: '10h', pct: 65 },
                { time: '12h', pct: 95 },
                { time: '14h', pct: 90 },
                { time: '16h', pct: 75 },
                { time: '18h', pct: 85 },
                { time: '20h', pct: 50 },
                { time: '22h', pct: 25 }
              ].map(bar => (
                <div key={bar.time} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#8F96A3' }}>{bar.pct}%</span>
                  <div style={{
                    width: '100%',
                    height: `${bar.pct * 1.3}px`,
                    background: bar.pct > 80 ? '#FFB703' : '#10B981',
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.3s ease'
                  }} />
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#64748B' }}>{bar.time}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '16px', fontSize: '11.5px', color: '#8F96A3', lineHeight: 1.6 }}>
              {isSq 
                ? '💡 Sugjerim Algoritmik: Aktivizoni Surge Pricing në orën 12:00 për të liruar vende për klientët e bizneseve lokale.' 
                : '💡 Automated Insight: Enable Surge Pricing at 12:00 to free stalls for quick turnover.'}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: NORDIC NRF52840 HARDWARE TELEMETRY & OTA FIRMWARE */}
      {/* ========================================================= */}
      {activeTab === 'telemetry' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Top Panel: Firmware OTA Deployment Engine */}
          <div style={{
            background: '#16181D',
            border: '1px solid #282C37',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Cpu size={22} color="#FFB703" />
                  <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                    {isSq ? 'Qendra e Përditësimit Firmware OTA (Nordic DFU Mesh)' : 'Nordic DFU Firmware OTA Deployment Hub'}
                  </h2>
                </div>
                <p style={{ fontSize: '12.5px', color: '#8F96A3', margin: '4px 0 0 0' }}>
                  {isSq 
                    ? 'Shpërndarja automatike e binarëve të rinj (Dual-Bank Flash) përmes Bluetooth Low Energy Mesh pa ndërhyrje fizike.' 
                    : 'Over-the-air firmware distribution via BLE Mesh with cryptographically signed dual-bank flash swapping.'}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={handleStartOta}
                  disabled={isOtaDeploying}
                  style={{
                    background: otaComplete ? '#10B981' : '#FFB703',
                    color: '#000000',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontWeight: '800',
                    fontSize: '12.5px',
                    cursor: isOtaDeploying ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 10px rgba(255,183,3,0.3)'
                  }}
                >
                  <RefreshCw size={14} />
                  {isOtaDeploying ? 'Duke Shpërndarë Firmware OTA...' : (otaComplete ? '✓ Firmware v2.4.2 i Instaluar' : 'Fillo Përditësimin OTA në 12 Nyje')}
                </button>
                {otaComplete && (
                  <button
                    onClick={() => { setOtaProgress(0); setOtaComplete(false); }}
                    style={{
                      background: 'transparent',
                      border: '1px solid #282C37',
                      color: '#8F96A3',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Rivendos
                  </button>
                )}
              </div>
            </div>

            {/* Firmware Metadata & Progress Bar */}
            <div style={{
              background: '#0B0B0D',
              border: '1px solid #1F222A',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '10.5px', color: '#8F96A3', fontFamily: 'var(--font-mono)' }}>TARGET FIRMWARE</div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>Shtegu-v2.4.2-ATK.bin</div>
                </div>
                <div>
                  <div style={{ fontSize: '10.5px', color: '#8F96A3', fontFamily: 'var(--font-mono)' }}>MADHËSIA & CHECKSUM</div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#10B981', fontFamily: 'var(--font-mono)' }}>142 KB (CRC32: 0x8F91B02C)</div>
                </div>
                <div>
                  <div style={{ fontSize: '10.5px', color: '#8F96A3', fontFamily: 'var(--font-mono)' }}>PROTOKOLLI I TRANSMETIMIT</div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>BLE 5.2 Extended Adv (2 Mbps)</div>
                </div>
                <div>
                  <div style={{ fontSize: '10.5px', color: '#8F96A3', fontFamily: 'var(--font-mono)' }}>STATUSI I SHPËRNDARJES</div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: otaComplete ? '#10B981' : (isOtaDeploying ? '#FFB703' : '#CBD5E1') }}>
                    {otaComplete ? '12/12 Nyje Përditësuar' : (isOtaDeploying ? `Në Progres (${otaProgress}%)` : 'Gati për Shpërndarje')}
                  </div>
                </div>
              </div>

              {/* Progress Track */}
              <div style={{ width: '100%', height: '8px', background: '#1F222A', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${otaProgress}%`,
                  height: '100%',
                  background: otaComplete ? '#10B981' : '#FFB703',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {/* Real-time OTA Diagnostic Terminal Logs */}
            <div style={{
              background: '#0B0B0D',
              border: '1px solid #1F222A',
              borderRadius: '8px',
              padding: '10px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#8F96A3',
              maxHeight: '75px',
              overflowY: 'auto'
            }}>
              {otaLogs.map((log, i) => (
                <div key={i} style={{ color: i === 0 ? '#10B981' : '#8F96A3' }}>&gt; {log}</div>
              ))}
            </div>
          </div>

          {/* Bottom Panel: Hardware Telemetry Matrix across All 12 Barriers */}
          <div style={{
            background: '#16181D',
            border: '1px solid #282C37',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                  {isSq ? 'Matrica e Telemetrisë së Pajisjeve (12 Nyje në Pejton & Qendër)' : 'Hardware Telemetry & Sensor Matrix (12 Nodes)'}
                </h3>
                <span style={{ fontSize: '12px', color: '#8F96A3' }}>
                  {isSq ? 'Statusi i tensionit LiFePO4, gjenerimi fotovoltaik MPPT, ciklet e motorit dhe dridhjet 3-boshtore.' : 'LiFePO4 voltage, MPPT PV yield, motor actuation cycles, and 3-axis vibration.'}
                </span>
              </div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '3px 8px', borderRadius: '4px' }}>
                12/12 Nyje në Linjë
              </span>
            </div>

            {/* Telemetry Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #282C37', color: '#8F96A3' }}>
                    <th style={{ padding: '8px' }}>KODI / NYJA</th>
                    <th style={{ padding: '8px' }}>VENDNDODHJA</th>
                    <th style={{ padding: '8px' }}>BATERIA (LiFePO4)</th>
                    <th style={{ padding: '8px' }}>SOLAR MPPT</th>
                    <th style={{ padding: '8px' }}>CIKLET E MOTORIT</th>
                    <th style={{ padding: '8px' }}>AKSELEROMETRI</th>
                    <th style={{ padding: '8px' }}>BLE RSSI</th>
                    <th style={{ padding: '8px' }}>FIRMWARE</th>
                  </tr>
                </thead>
                <tbody>
                  {spots.map((spot, idx) => (
                    <tr key={spot.id} style={{ borderBottom: '1px solid #1F222A', color: '#E2E8F0' }}>
                      <td style={{ padding: '10px 8px', fontWeight: '800', color: '#FFB703' }}>
                        {spot.code} <span style={{ color: '#8F96A3', fontSize: '10.5px' }}>({spot.hardwareId})</span>
                      </td>
                      <td style={{ padding: '10px 8px', color: '#CBD5E1' }}>{spot.address.split('(')[0]}</td>
                      <td style={{ padding: '10px 8px' }}>
                        <span style={{ color: spot.battery > 50 ? '#10B981' : '#EF4444', fontWeight: '700' }}>
                          {spot.battery}% (3.24V)
                        </span>
                      </td>
                      <td style={{ padding: '10px 8px', color: spot.solarCharging ? '#10B981' : '#64748B' }}>
                        {spot.solarCharging ? '☀️ +185 mW' : '🌑 0 mW'}
                      </td>
                      <td style={{ padding: '10px 8px' }}>
                        {(14200 + idx * 340).toLocaleString()} cikle
                      </td>
                      <td style={{ padding: '10px 8px', color: spot.tamperAlarm ? '#EF4444' : '#10B981' }}>
                        {spot.tamperAlarm ? '🚨 2.85G (ALARM)' : '0.02G (Qetë)'}
                      </td>
                      <td style={{ padding: '10px 8px', color: '#38BDF8' }}>
                        {-55 - (idx * 2)} dBm
                      </td>
                      <td style={{ padding: '10px 8px', color: otaComplete ? '#10B981' : '#8F96A3' }}>
                        {otaComplete ? 'v2.4.2-ENT' : 'v2.4.1-rc3'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 6: CORPORATE FLEET MANAGEMENT HUB (B2B SAAS) */}
      {/* ========================================================= */}
      {activeTab === 'fleet' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Top Panel: Corporate Fleet Accounts */}
          <div style={{
            background: '#16181D',
            border: '1px solid #282C37',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Building2 size={22} color="#FFB703" />
                  <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                    {isSq ? 'Llogaritë Korporative të Flotave (B2B Parking Subscriptions)' : 'B2B Enterprise Corporate Fleet Accounts'}
                  </h2>
                </div>
                <p style={{ fontSize: '12.5px', color: '#8F96A3', margin: '4px 0 0 0' }}>
                  {isSq 
                    ? 'Banka dhe kompani me kontrata mujore: zbritje automatike nga kuleta e ndërmarrjes, qasje me targa (LPR) dhe faturim i konsoliduar me TVSH.' 
                    : 'Contracted enterprise client fleets: automated balance deduction, LPR gate auto-drop, and unified monthly invoicing.'}
                </p>
              </div>

              <button
                onClick={() => setShowAddVehicleModal(true)}
                style={{
                  background: '#FFB703',
                  color: '#000000',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontWeight: '800',
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 8px rgba(255,183,3,0.3)'
                }}
              >
                + {isSq ? 'Regjistro Automjet të Ri' : 'Register New Fleet Vehicle'}
              </button>
            </div>

            {/* Corporate Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              {corporateAccounts.map(corp => (
                <div
                  key={corp.id}
                  style={{
                    background: '#0B0B0D',
                    border: '1px solid #1F222A',
                    borderRadius: '12px',
                    padding: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF' }}>{corp.name}</div>
                    <span style={{ fontSize: '10px', background: 'rgba(16,185,129,0.15)', color: '#10B981', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                      AKTIV
                    </span>
                  </div>

                  <div style={{ fontSize: '11px', color: '#8F96A3', marginBottom: '10px' }}>
                    {corp.vehiclesCount} Automjete të autorizuara • {corp.transactions} Hyrje këtë muaj
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '6px' }}>
                    <span style={{ color: '#8F96A3' }}>Konsumi Mujor:</span>
                    <strong style={{ color: '#FFB703', fontFamily: 'var(--font-mono)' }}>€{corp.spentMonthly.toFixed(2)} / €{corp.budgetMonthly}</strong>
                  </div>

                  {/* Budget bar */}
                  <div style={{ width: '100%', height: '6px', background: '#1F222A', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${(corp.spentMonthly / corp.budgetMonthly) * 100}%`,
                      height: '100%',
                      background: '#FFB703'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Whitelisted Fleet Vehicles Table */}
          <div style={{
            background: '#16181D',
            border: '1px solid #282C37',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                  {isSq ? 'Automjetet e Autorizuara me Njohje Targash (LPR Whitelist)' : 'Whitelisted Corporate Fleet Vehicles (LPR Engine)'}
                </h3>
                <span style={{ fontSize: '12px', color: '#8F96A3' }}>
                  {isSq ? 'Kamerat në hyrje të korridorit njohin targat dhe ulin barrierën automatikisht.' : 'Corridor AI cameras recognize authorized plates and trigger instant gate drop.'}
                </span>
              </div>
              <span style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: '#38BDF8' }}>
                {fleetVehicles.length} Automjete në Listë të Bardhë
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #282C37', color: '#8F96A3', fontFamily: 'var(--font-mono)' }}>
                    <th style={{ padding: '8px' }}>TARGA</th>
                    <th style={{ padding: '8px' }}>MODELI</th>
                    <th style={{ padding: '8px' }}>NDËRMARRJA</th>
                    <th style={{ padding: '8px' }}>DEPARTAMENTI</th>
                    <th style={{ padding: '8px' }}>ZONA E LEJUAR</th>
                    <th style={{ padding: '8px' }}>STATUSI I PARKINGUT</th>
                    <th style={{ padding: '8px', textAlign: 'right' }}>VEPRIMI DEMO</th>
                  </tr>
                </thead>
                <tbody>
                  {fleetVehicles.map(veh => (
                    <tr key={veh.plate} style={{ borderBottom: '1px solid #1F222A', color: '#E2E8F0' }}>
                      <td style={{ padding: '10px 8px' }}>
                        <span style={{
                          background: '#0B0B0D',
                          border: '1px solid #FFB703',
                          color: '#FFB703',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: '800',
                          fontSize: '12px'
                        }}>
                          {veh.plate}
                        </span>
                      </td>
                      <td style={{ padding: '10px 8px', fontWeight: '600' }}>{veh.model}</td>
                      <td style={{ padding: '10px 8px', color: '#CBD5E1' }}>{veh.company}</td>
                      <td style={{ padding: '10px 8px', color: '#8F96A3' }}>{veh.dept}</td>
                      <td style={{ padding: '10px 8px', color: '#10B981', fontFamily: 'var(--font-mono)' }}>{veh.accessZone}</td>
                      <td style={{ padding: '10px 8px' }}>
                        <span style={{
                          color: veh.status.includes('Në Parkim') ? '#FFB703' : '#10B981',
                          fontWeight: '700'
                        }}>
                          {veh.status}
                        </span>
                      </td>
                      <td style={{ padding: '10px 8px', textAlign: 'right' }}>
                        <button
                          onClick={() => handleRunScenario('fleet')}
                          style={{
                            background: '#1F222A',
                            border: '1px solid #282C37',
                            color: '#FFB703',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                        >
                          Simulo LPR
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Modal: Regjistro Automjet të Ri në Flotë */}
      {showAddVehicleModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: '#16181D',
            border: '1px solid #FFB703',
            borderRadius: '16px',
            maxWidth: '480px',
            width: '100%',
            padding: '24px',
            color: '#FFFFFF'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '800' }}>
                {isSq ? 'Regjistro Automjet të Ri në Flotë' : 'Register Corporate Fleet Vehicle'}
              </h3>
              <button
                onClick={() => setShowAddVehicleModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#8F96A3', fontSize: '18px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#8F96A3', display: 'block', marginBottom: '4px' }}>Targa e Kosovës (psh: 01-999-ZZ)</label>
                <input
                  type="text"
                  value={newVehiclePlate}
                  onChange={(e) => setNewVehiclePlate(e.target.value.toUpperCase())}
                  placeholder="01-999-ZZ"
                  style={{
                    width: '100%',
                    background: '#0B0B0D',
                    border: '1px solid #282C37',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#FFB703',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    fontWeight: '800',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#8F96A3', display: 'block', marginBottom: '4px' }}>Modeli i Automjetit</label>
                <input
                  type="text"
                  value={newVehicleModel}
                  onChange={(e) => setNewVehicleModel(e.target.value)}
                  placeholder="psh: Skoda Superb (2025)"
                  style={{
                    width: '100%',
                    background: '#0B0B0D',
                    border: '1px solid #282C37',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#8F96A3', display: 'block', marginBottom: '4px' }}>Ndërmarrja Korporative</label>
                <select
                  value={newVehicleCompany}
                  onChange={(e) => setNewVehicleCompany(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0B0B0D',
                    border: '1px solid #282C37',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="BKT Banka Kosovës">BKT Banka Kosovës</option>
                  <option value="KEDS Kosova">KEDS Kosova</option>
                  <option value="IPKO Telecommunications">IPKO Telecommunications</option>
                  <option value="Dukagjini Group">Dukagjini Group</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#8F96A3', display: 'block', marginBottom: '4px' }}>Departamenti / Qëllimi</label>
                <input
                  type="text"
                  value={newVehicleDept}
                  onChange={(e) => setNewVehicleDept(e.target.value)}
                  placeholder="psh: Menaxhmenti Rajonal"
                  style={{
                    width: '100%',
                    background: '#0B0B0D',
                    border: '1px solid #282C37',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  onClick={() => setShowAddVehicleModal(false)}
                  style={{
                    flex: 1,
                    background: '#1F222A',
                    border: '1px solid #282C37',
                    color: '#8F96A3',
                    padding: '10px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Anulo
                </button>
                <button
                  onClick={() => {
                    if (!newVehiclePlate) return;
                    setFleetVehicles(prev => [
                      {
                        plate: newVehiclePlate,
                        model: newVehicleModel || 'Automjet Korporativ',
                        company: newVehicleCompany,
                        dept: newVehicleDept || 'Departamenti i Përgjithshëm',
                        accessZone: 'Pejton + Qendër',
                        status: 'I Lirë'
                      },
                      ...prev
                    ]);
                    pushEvent('FLEET', `Automjeti i ri ${newVehiclePlate} (${newVehicleCompany}) u regjistrua me sukses në listën e bardhë LPR.`);
                    setShowAddVehicleModal(false);
                    setNewVehiclePlate('');
                    setNewVehicleModel('');
                    setNewVehicleDept('');
                  }}
                  style={{
                    flex: 1,
                    background: '#FFB703',
                    border: 'none',
                    color: '#000000',
                    padding: '10px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '800',
                    cursor: 'pointer'
                  }}
                >
                  Konfirmo & Bardho
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ENTERPRISE REAL-TIME AUDIT LOG FEED */}
      {/* ========================================================= */}
      <div style={{
        marginTop: '24px',
        background: '#0B0B0D',
        border: '1px solid #1F222A',
        borderRadius: '14px',
        padding: '16px 20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
            <span style={{ fontSize: '12px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#FFFFFF' }}>
              RRJEDHA E EVENTEVE IOT NË KOHË REALE (AUDIT STREAM)
            </span>
          </div>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8F96A3' }}>
            Protokolli Nordic UART • Gateway Pejton-GW1
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '110px', overflowY: 'auto' }}>
          {eventLogs.map(log => (
            <div key={log.id} style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', display: 'flex', gap: '10px', color: '#CBD5E1' }}>
              <span style={{ color: '#64748B' }}>[{log.time}]</span>
              <span style={{
                color: log.type === 'EMERGENCY' || log.type === 'TAMPER' ? '#EF4444' : (log.type === 'PRICING' ? '#FFB703' : '#10B981'),
                fontWeight: '700'
              }}>
                {log.type}:
              </span>
              <span>{log.text}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
