import React, { useState, useEffect, useRef } from 'react';
import { 
  Car, 
  Terminal, 
  CheckCircle2, 
  Wifi, 
  Battery, 
  Clock, 
  ShieldCheck, 
  ArrowDownCircle, 
  Radio, 
  FolderGit2, 
  MapPin,
  Building2,
  Camera,
  QrCode,
  Zap
} from 'lucide-react';
import GeoapifyMap from './GeoapifyMap';

export default function AndroidEmulatorView({ lang = 'sq' }) {
  const isSq = lang === 'sq';

  // Bottom Nav Tab in Phone: 'shoferi' | 'ble_lab'
  const [appTab, setAppTab] = useState('shoferi');

  // Inspected Command for 20-Byte Packet Inspector
  const [inspectedCommand, setInspectedCommand] = useState(0x01);

  // Driver View Mode: 'map' (interactive Geoapify map) | 'list' (parking cards)
  const [driverViewMode, setDriverViewMode] = useState('map');

  // Enterprise Corporate Fleet Account State
  const [isCorporateFleet, setIsCorporateFleet] = useState(false);
  const [showPlateScanner, setShowPlateScanner] = useState(false);
  const [scannedPlate] = useState('01-842-AB');
  const [isScanningPlate, setIsScanningPlate] = useState(false);
  const [plateVerified, setPlateVerified] = useState(false);

  // Digital Fiscal Receipt State
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [lastReceipt, setLastReceipt] = useState(null);

  // Driver Tab State
  const [walletBalance, setWalletBalance] = useState(15.00);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [activeSession, setActiveSession] = useState(null); // { spot, seconds: 0 }
  const [driverStateStep, setDriverStateStep] = useState(0); // 0: Idle, 1: Cloud Verify, 2: BLE TX, 3: Success
  const [driverStatusMessage, setDriverStatusMessage] = useState('');
  const [showTopUpModal, setShowTopUpModal] = useState(false);

  // Driver Parking Spots with Geoapify GPS coordinates
  const driverSpots = [
    {
      id: 'P01',
      code: 'Vendi P-01',
      address: 'Rr. Perandori Justinian (Pejton)',
      rate: '€1.00/orë',
      walk: '45m',
      hardwareId: 'DN-0892',
      macAddress: 'C4:4F:33:08:92:A1',
      lat: 42.6601,
      lon: 21.1572,
      isAvailable: true
    },
    {
      id: 'P02',
      code: 'Vendi P-02',
      address: 'Rr. Pashko Vasa (Pejton)',
      rate: '€1.00/orë',
      walk: '120m',
      hardwareId: 'DN-1440',
      macAddress: 'D1:22:98:14:40:B9',
      lat: 42.6592,
      lon: 21.1558,
      isAvailable: false
    },
    {
      id: 'P03',
      code: 'Vendi P-03',
      address: 'Afër Teatrit ODA (Pejton)',
      rate: '€1.00/orë',
      walk: '85m',
      hardwareId: 'DN-0118',
      macAddress: 'FA:88:51:01:18:C4',
      lat: 42.6608,
      lon: 21.1582,
      isAvailable: true
    }
  ];

  // BLE Lab Tab State
  const [isMockMode, setIsMockMode] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDeviceId, setConnectedDeviceId] = useState(null);
  const [bleDevices] = useState([
    { id: 'C4:4F:33:08:92:A1', name: 'SHTEGU-DN-0892', rssi: -58, matched: true },
    { id: 'D1:22:98:14:40:B9', name: 'SHTEGU-DN-1440', rssi: -72, matched: true },
    { id: 'FA:88:51:01:18:C4', name: 'SHTEGU-DN-0118', rssi: -84, matched: true }
  ]);
  const [bleLogs, setBleLogs] = useState([
    {
      time: '23:00:12',
      direction: 'SYS',
      message: 'Shtegu BLE Engine i inicializuar. NUS UUID: 6E400001-...',
      hex: null
    },
    {
      time: '23:00:13',
      direction: 'SYS',
      message: 'Aktivizuar: Simulo pa Hardware (Mock Mode ON)',
      hex: null
    }
  ]);

  const logTerminalRef = useRef(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logTerminalRef.current) {
      logTerminalRef.current.scrollTop = logTerminalRef.current.scrollHeight;
    }
  }, [bleLogs]);

  // Session timer
  useEffect(() => {
    let interval = null;
    if (activeSession) {
      interval = setInterval(() => {
        setActiveSession(prev => prev ? { ...prev, seconds: prev.seconds + 1 } : null);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeSession]);

  const formatTimer = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60).toString().padStart(2, '0');
    const secs = (totalSecs % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Helper to add log
  const addLog = (direction, message, hex = null) => {
    const d = new Date();
    const timeStr = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
    setBleLogs(prev => [...prev.slice(-100), { time: timeStr, direction, message, hex }]);
  };

  // 20-Byte Payload Constructor
  const build20BytePayload = (cmdByte, customKey = [0xA1, 0xB2, 0xC3, 0xD4]) => {
    const packet = new Array(20).fill(0);
    packet[0] = 0x44; // 'D'
    packet[1] = 0x44; // 'D'
    packet[2] = 0x54; // 'T'
    packet[3] = 0x43; // 'C'
    packet[4] = 0x14; // Length 20
    packet[5] = 0xFF; // Frame marker
    packet[6] = 0x14; // Category
    packet[7] = cmdByte; // 0x01 Drop, 0x02 Raise, 0x03 Auto-Raise
    packet[8] = customKey[0];
    packet[9] = customKey[1];
    packet[10] = customKey[2];
    packet[11] = customKey[3];
    packet[12] = 0x00;
    packet[13] = 0x00;
    packet[14] = 0x00;
    packet[15] = 0x00;
    packet[16] = 0x00;
    packet[17] = 0x45; // ETX

    // BCC XOR Checksum
    let bcc = 0;
    for (let i = 0; i <= 17; i++) {
      bcc ^= packet[i];
    }
    packet[18] = bcc;
    packet[19] = 0x0A; // Delimiter

    const hexStr = packet.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
    return { packet, hexStr };
  };

  // Driver: Execute Drop Barrier
  const handleExecuteDrop = () => {
    if (!selectedSpot) return;
    setDriverStateStep(1);
    setDriverStatusMessage("Duke verifikuar çelësin me cloud...");
    addLog('SYS', `Kërkesë autorizimi nga cloud për vendin ${selectedSpot.code} (${selectedSpot.macAddress})`);

    // Step 1: 1s
    setTimeout(() => {
      setDriverStateStep(2);
      setDriverStatusMessage("Duke dërguar komandën BLE...");
      const { hexStr } = build20BytePayload(0x01);
      addLog('TX', `Dërgim: Ule Krahun (Cmd: 0x01) te ${selectedSpot.hardwareId}`, hexStr);

      // Step 2: 1s
      setTimeout(() => {
        setDriverStateStep(3);
        setDriverStatusMessage("Barriera u ul! Parkim i suksesshëm.");
        addLog('RX', `Përgjigje nga barriera: Status 0x03 (Krahu i ulur plotësisht).`, '44 44 54 43 03 01 90 45 22 0A');

        setTimeout(() => {
          setActiveSession({ spot: selectedSpot, seconds: 0 });
          setSelectedSpot(null);
          setDriverStateStep(0);
          setDriverStatusMessage('');
        }, 1200);
      }, 1000);
    }, 1000);
  };

  // Driver: End Session & Generate Digital Fiscal Receipt
  const handleEndSession = () => {
    if (!activeSession) return;
    const cost = Math.max(0.20, (activeSession.seconds / 3600) * 1.0);
    if (!isCorporateFleet) {
      setWalletBalance(prev => Math.max(0, prev - cost));
    }
    const receipt = {
      receiptNo: `SHT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      spot: activeSession.spot,
      duration: formatTimer(activeSession.seconds),
      cost: cost,
      vat: cost * 0.18,
      net: cost * 0.82,
      corporate: isCorporateFleet,
      date: '12.10.2026',
      time: '23:25'
    };
    setLastReceipt(receipt);
    setShowReceiptModal(true);
    addLog('SYS', `Seanca u mbyll për ${activeSession.spot.code}. Kuponi fiskal u gjenerua: €${cost.toFixed(2)}${isCorporateFleet ? ' (Faturuar te BKT Fleet)' : ''}`);
    setActiveSession(null);
  };

  // Driver: Plate Scanner Simulation
  const handleScanPlate = () => {
    setShowPlateScanner(true);
    setIsScanningPlate(true);
    setPlateVerified(false);
    setTimeout(() => {
      setIsScanningPlate(false);
      setPlateVerified(true);
      addLog('SYS', 'Kamera LPR: Targa 01-842-AB u njoh dhe u verifikua në bazën e Shtegu Cloud.');
    }, 1400);
  };

  // Driver: Emergency Reroute
  const handleReroute = () => {
    setSelectedSpot({
      id: 'P03',
      code: 'Vendi P-03',
      address: 'Afër Teatrit ODA (Pejton)',
      rate: '€1.00/orë',
      walk: '85m',
      hardwareId: 'DN-0118',
      macAddress: 'FA:88:51:01:18:C4'
    });
    addLog('SYS', 'Rirutim automatik: Zgjedhur vendi alternativ më i afërt (Vendi P-03).');
  };

  // BLE Lab: Scan Toggle
  const handleToggleScan = () => {
    if (isScanning) {
      setIsScanning(false);
      addLog('SYS', 'Skanimi u ndërpre nga përdoruesi.');
    } else {
      setIsScanning(true);
      addLog('SYS', 'Filloi skanimi i fenerëve BLE (NUS UUID: 6E400001)...');
      setTimeout(() => {
        setIsScanning(false);
        addLog('SYS', 'Skanimi përfundoi. U identifikuan 3 barriera aktive Shtegu në rreze.');
      }, 1500);
    }
  };

  // BLE Lab: Connect Toggle
  const handleConnect = (device) => {
    if (connectedDeviceId === device.id) {
      setConnectedDeviceId(null);
      addLog('SYS', `Pajisja ${device.name} u shkëput.`);
    } else {
      setConnectedDeviceId(device.id);
      addLog('SYS', `Duke u lidhur me GATT Server: ${device.id}...`);
      setTimeout(() => {
        addLog('SYS', `Nordic UART Service u lidh me sukses (MTU: 23).`);
        addLog('RX', `Beacon Telemetrik: Batt: 92% | Vendi: I LIRË | Krahu: NALT`, '01 92 00');
      }, 600);
    }
  };

  // BLE Lab: Send Quick Command
  const handleQuickCommand = (cmdByte, cmdName) => {
    const { hexStr } = build20BytePayload(cmdByte);
    addLog('TX', `Dërgim: ${cmdName} (Cmd: 0x0${cmdByte})`, hexStr);
    setTimeout(() => {
      addLog('RX', `Konfirmim GATT: Krahu konfirmoi ekzekutimin (Status OK).`, `44 44 54 43 03 0${cmdByte} 90 45 22 0A`);
    }, 500);
  };

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '28px 24px',
      color: '#e2e8f0',
      fontFamily: 'var(--font-sans)'
    }}>
      {/* Intro Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px',
        paddingBottom: '20px',
        borderBottom: '1px solid #1F222A'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <span style={{
              background: '#FFB703',
              color: '#000000',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: '900',
              padding: '2px 8px',
              borderRadius: '4px',
              letterSpacing: '0.05em'
            }}>
              FLUTTER MVP PROTOTYPE
            </span>
            <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: '#8F96A3' }}>
              app.shtegu.iot • Android SDK 21+
            </span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em', margin: 0 }}>
            {isSq ? 'Testuesi Funksional Android — Shtegu Mobile & BLE Lab' : 'Functional Android Testing App — Shtegu Mobile & BLE Lab'}
          </h1>
          <p style={{ fontSize: '13.5px', color: '#8F96A3', margin: '4px 0 0 0' }}>
            {isSq 
              ? 'Prototip interaktiv me dy ekrane: Eksperienca e plotë e shoferit (Pejton) dhe Terminali diagnostikues BLE me protokollin Nordic UART 20-Byte.'
              : 'Interactive prototype with two core tabs: Driver flow in Pejton and BLE Hardware Debugger with Nordic UART 20-byte payload engine.'}
          </p>
        </div>

        {/* Quick Badges */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{
            background: '#16181D',
            border: '1px solid #282C37',
            padding: '8px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)'
          }}>
            <span style={{ color: '#8F96A3' }}>Kodi Burimor: </span>
            <span style={{ color: '#FFB703', fontWeight: '700' }}>shtegu_app/</span>
          </div>
          <div style={{
            background: '#16181D',
            border: '1px solid #282C37',
            padding: '8px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)'
          }}>
            <span style={{ color: '#8F96A3' }}>BLE Protocol: </span>
            <span style={{ color: '#10B981', fontWeight: '700' }}>Nordic NUS (20-Byte)</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Side Phone Emulator, Right Side Architecture & Diagnostics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(360px, 420px) 1fr',
        gap: '32px',
        alignItems: 'start'
      }}>
        
        {/* ======================================================== */}
        {/* PHONE EMULATOR CONTAINER */}
        {/* ======================================================== */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* Phone Device Shell */}
          <div style={{
            width: '100%',
            maxWidth: '390px',
            height: '780px',
            background: '#0B0B0D',
            borderRadius: '44px',
            border: '10px solid #1E2028',
            boxShadow: '0 25px 60px -15px rgba(0,0,0,0.8), 0 0 0 1px #2C303D',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {/* Phone Notch / Speaker */}
            <div style={{
              height: '24px',
              background: '#0B0B0D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px',
              fontSize: '11px',
              color: '#8F96A3',
              fontFamily: 'var(--font-mono)',
              borderBottom: '1px solid #16181D'
            }}>
              <span>23:02</span>
              <div style={{ width: '40px', height: '4px', background: '#282C37', borderRadius: '4px' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Wifi size={11} />
                <Battery size={12} color="#10B981" />
              </div>
            </div>

            {/* App Top Bar */}
            <div style={{
              background: '#0B0B0D',
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #1A1D24'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src="/cat_logo_clean.jpg"
                  alt="Shtegu Cat Logo"
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1.5px solid #FFB703'
                  }}
                />
                <div>
                  <span style={{ fontWeight: '900', fontSize: '15px', letterSpacing: '0.04em', color: '#FFFFFF' }}>
                    SHTEGU
                  </span>
                  <div style={{ fontSize: '9.5px', fontFamily: 'var(--font-mono)', color: '#FFB703' }}>
                    PRISHTINA PILOT
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div style={{
                fontSize: '10px',
                fontFamily: 'var(--font-mono)',
                padding: '3px 8px',
                borderRadius: '4px',
                background: isMockMode ? 'rgba(255, 183, 3, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                color: isMockMode ? '#FFB703' : '#10B981',
                border: `1px solid ${isMockMode ? '#FFB703' : '#10B981'}`
              }}>
                {isMockMode ? 'MOCK BLE' : 'HARDWARE'}
              </div>
            </div>

            {/* Screen Content Body */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              background: '#0B0B0D',
              position: 'relative'
            }}>
              
              {/* ==================================================== */}
              {/* TAB 1: SHOFERI VIEW */}
              {/* ==================================================== */}
              {appTab === 'shoferi' && (
                <div style={{ padding: '16px' }}>
                  
                  {/* Enterprise Account Switcher: Personal vs Corporate Fleet */}
                  <div style={{
                    display: 'flex',
                    background: '#16181D',
                    padding: '3px',
                    borderRadius: '10px',
                    border: '1px solid #282C37',
                    marginBottom: '12px'
                  }}>
                    <button
                      onClick={() => setIsCorporateFleet(false)}
                      style={{
                        flex: 1,
                        background: !isCorporateFleet ? '#FFB703' : 'transparent',
                        color: !isCorporateFleet ? '#000000' : '#8F96A3',
                        border: 'none',
                        padding: '6px',
                        borderRadius: '7px',
                        fontSize: '11px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px'
                      }}
                    >
                      👤 {isSq ? 'Kuletë Personale' : 'Personal Wallet'}
                    </button>
                    <button
                      onClick={() => setIsCorporateFleet(true)}
                      style={{
                        flex: 1,
                        background: isCorporateFleet ? '#38BDF8' : 'transparent',
                        color: isCorporateFleet ? '#000000' : '#8F96A3',
                        border: 'none',
                        padding: '6px',
                        borderRadius: '7px',
                        fontSize: '11px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px'
                      }}
                    >
                      <Building2 size={12} />
                      {isSq ? 'Flota e Ndërmarrjes' : 'Corporate Fleet'}
                    </button>
                  </div>

                  {/* Top Bar: Driver Wallet or Enterprise Card */}
                  {!isCorporateFleet ? (
                    <div style={{
                      background: '#16181D',
                      border: '1px solid #282C37',
                      borderRadius: '14px',
                      padding: '14px 16px',
                      marginBottom: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ fontSize: '11px', color: '#8F96A3', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Kuleta e Shoferit
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: '900', color: '#FFFFFF', marginTop: '2px' }}>
                          €{walletBalance.toFixed(2)}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={handleScanPlate}
                          title="Skano Targën e Veturës (LPR)"
                          style={{
                            background: '#1F222A',
                            border: '1px solid #282C37',
                            color: '#FFFFFF',
                            padding: '7px 10px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '11px',
                            fontWeight: '700'
                          }}
                        >
                          <Camera size={13} color="#FFB703" />
                          <span>LPR</span>
                        </button>
                        <button
                          onClick={() => setShowTopUpModal(true)}
                          style={{
                            background: 'rgba(255, 183, 3, 0.15)',
                            border: '1px solid #FFB703',
                            color: '#FFB703',
                            fontWeight: '800',
                            fontSize: '11px',
                            padding: '7px 10px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                          }}
                        >
                          + Mbush
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      background: 'linear-gradient(135deg, #16181D 0%, #0D2030 100%)',
                      border: '1.5px solid #38BDF8',
                      borderRadius: '14px',
                      padding: '14px 16px',
                      marginBottom: '14px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Building2 size={15} color="#38BDF8" />
                          <span style={{ fontSize: '11px', fontWeight: '800', color: '#38BDF8', letterSpacing: '0.04em' }}>
                            BKT KOSOVA FLEET ACCOUNT
                          </span>
                        </div>
                        <span style={{
                          background: 'rgba(56, 189, 248, 0.2)',
                          color: '#38BDF8',
                          fontSize: '9.5px',
                          fontFamily: 'var(--font-mono)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: '800'
                        }}>
                          PA LIMIT
                        </span>
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>
                        Automjeti: VW Golf 8 (01-842-AB)
                      </div>
                      <div style={{ fontSize: '11px', color: '#8F96A3', marginTop: '2px' }}>
                        Pagesa faturohet automatikisht në llogarinë qendrore të ndërmarrjes.
                      </div>
                    </div>
                  )}

                  {/* LPR Plate Scanner Modal Overlay */}
                  {showPlateScanner && (
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: 'rgba(0,0,0,0.85)',
                      zIndex: 35,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      padding: '20px'
                    }}>
                      <div style={{
                        background: '#16181D',
                        borderRadius: '16px',
                        border: '1.5px solid #FFB703',
                        padding: '18px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '12px', fontWeight: '800', color: '#FFB703', marginBottom: '8px' }}>
                          📷 SKANERI I TARGËS (LPR CAMERA)
                        </div>

                        {/* Camera Viewfinder Box */}
                        <div style={{
                          height: '110px',
                          background: '#0B0B0D',
                          borderRadius: '10px',
                          border: '2px dashed #38BDF8',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          overflow: 'hidden',
                          marginBottom: '14px'
                        }}>
                          <div style={{
                            background: '#FFFFFF',
                            color: '#000000',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '18px',
                            fontWeight: '900',
                            padding: '6px 14px',
                            borderRadius: '6px',
                            border: '2px solid #000000',
                            letterSpacing: '0.1em'
                          }}>
                            {scannedPlate}
                          </div>

                          {isScanningPlate && (
                            <div style={{
                              position: 'absolute',
                              top: 0, left: 0, right: 0,
                              height: '2px',
                              background: '#EF4444',
                              boxShadow: '0 0 10px #EF4444',
                              animation: 'scan-laser 1.2s ease-in-out infinite'
                            }} />
                          )}
                        </div>

                        <div style={{ fontSize: '12px', color: plateVerified ? '#10B981' : '#8F96A3', marginBottom: '14px' }}>
                          {isScanningPlate ? 'Duke analizuar targën me inteligjencë artificiale...' : (plateVerified ? '✅ Targa u verifikua në Shtegu Cloud Registry!' : 'Poziciononi targën brenda kornizës.')}
                        </div>

                        <button
                          onClick={() => setShowPlateScanner(false)}
                          style={{
                            width: '100%',
                            background: plateVerified ? '#10B981' : '#1F222A',
                            color: plateVerified ? '#000000' : '#FFFFFF',
                            border: 'none',
                            padding: '10px',
                            borderRadius: '8px',
                            fontWeight: '800',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          {plateVerified ? 'Vazhdo me këtë Targë' : 'Mbyll Skanerin'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Digital Fiscal Receipt Modal */}
                  {showReceiptModal && lastReceipt && (
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: 'rgba(0,0,0,0.85)',
                      zIndex: 35,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      padding: '16px'
                    }}>
                      <div style={{
                        background: '#FFFFFF',
                        color: '#0F172A',
                        borderRadius: '16px',
                        padding: '18px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.9)',
                        fontFamily: 'var(--font-mono)'
                      }}>
                        <div style={{ textAlign: 'center', borderBottom: '1px dashed #CBD5E1', paddingBottom: '12px', marginBottom: '12px' }}>
                          <div style={{ fontWeight: '900', fontSize: '15px', color: '#0F172A' }}>SHTEGU IOT PARKIM</div>
                          <div style={{ fontSize: '10px', color: '#64748B' }}>KUPON FISKAL I AUTORIZUAR • ATK</div>
                          <div style={{ fontSize: '11px', fontWeight: '700', marginTop: '4px' }}>Nr: {lastReceipt.receiptNo}</div>
                        </div>

                        <div style={{ fontSize: '11px', lineHeight: 1.8, marginBottom: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Vendi:</span> <strong>{lastReceipt.spot.code}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Kohëzgjatja:</span> <strong>{lastReceipt.duration}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Data / Ora:</span> <span>{lastReceipt.date} {lastReceipt.time}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Mënyra:</span> <strong>{lastReceipt.corporate ? 'BKT Fleet Corp' : 'Kuletë Digjitale'}</strong>
                          </div>
                          <div style={{ borderTop: '1px dashed #CBD5E1', margin: '6px 0' }} />
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Neto:</span> <span>€{lastReceipt.net.toFixed(2)}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>TVSH (18%):</span> <span>€{lastReceipt.vat.toFixed(2)}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '900', color: '#047857' }}>
                            <span>TOTALI:</span> <span>€{lastReceipt.cost.toFixed(2)}</span>
                          </div>
                        </div>

                        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                          <div style={{
                            display: 'inline-flex',
                            padding: '6px',
                            background: '#F1F5F9',
                            borderRadius: '8px',
                            border: '1px solid #CBD5E1'
                          }}>
                            <QrCode size={48} color="#0F172A" />
                          </div>
                          <div style={{ fontSize: '9px', color: '#64748B', marginTop: '4px' }}>
                            Skanoni për verifikim tatimor
                          </div>
                        </div>

                        <button
                          onClick={() => setShowReceiptModal(false)}
                          style={{
                            width: '100%',
                            background: '#0F172A',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '10px',
                            borderRadius: '8px',
                            fontWeight: '800',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          Mbyll Faturën
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Top Up Preset Modal Sheet */}
                  {showTopUpModal && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0,0,0,0.75)',
                      zIndex: 30,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end'
                    }}>
                      <div style={{
                        background: '#16181D',
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                        padding: '20px',
                        border: '1px solid #282C37'
                      }}>
                        <div style={{ fontWeight: '800', fontSize: '16px', color: '#FFFFFF', marginBottom: '4px' }}>
                          Mbush Kuletën Shtegu
                        </div>
                        <div style={{ fontSize: '12px', color: '#8F96A3', marginBottom: '16px' }}>
                          Zgjidh shumën e dëshiruar me pagesë të çastit:
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
                          {[5, 10, 15].map(amt => (
                            <button
                              key={amt}
                              onClick={() => {
                                setWalletBalance(prev => prev + amt);
                                setShowTopUpModal(false);
                                addLog('SYS', `Kuleta u rimbush me sukses me +€${amt}.00`);
                              }}
                              style={{
                                background: '#1F222A',
                                border: '1px solid #FFB703',
                                color: '#FFFFFF',
                                padding: '14px 8px',
                                borderRadius: '10px',
                                fontWeight: '800',
                                fontSize: '15px',
                                cursor: 'pointer'
                              }}
                            >
                              +€{amt}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => setShowTopUpModal(false)}
                          style={{
                            width: '100%',
                            background: 'transparent',
                            border: '1px solid #282C37',
                            color: '#8F96A3',
                            padding: '10px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          Anulo
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Active Parking Session Display */}
                  {activeSession && (
                    <div style={{
                      background: 'linear-gradient(135deg, #16181D 0%, #1A2218 100%)',
                      border: '1.5px solid #10B981',
                      borderRadius: '14px',
                      padding: '16px',
                      marginBottom: '16px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CheckCircle2 size={18} color="#10B981" />
                          <span style={{ fontWeight: '800', fontSize: '14px', color: '#FFFFFF' }}>
                            Seancë Aktive e Parkimit
                          </span>
                        </div>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          background: 'rgba(16, 185, 129, 0.2)',
                          color: '#10B981',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontWeight: '700'
                        }}>
                          BARRIERA POSHTË
                        </span>
                      </div>

                      <div style={{ fontSize: '12.5px', color: '#8F96A3', marginBottom: '10px' }}>
                        {activeSession.spot.code} — {activeSession.spot.address}
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: '#0B0B0D',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        marginBottom: '12px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={14} color="#FFB703" />
                          <span style={{ fontSize: '12px', color: '#8F96A3' }}>Koha:</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: '800', color: '#FFFFFF' }}>
                            {formatTimer(activeSession.seconds)}
                          </span>
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: '800', color: '#FFB703' }}>
                          Kosto: €{Math.max(0.20, (activeSession.seconds / 3600) * 1.0).toFixed(2)}
                        </div>
                      </div>

                      <button
                        onClick={handleEndSession}
                        style={{
                          width: '100%',
                          background: '#EF4444',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '12px',
                          borderRadius: '10px',
                          fontWeight: '800',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        Përfundo Seancën & Ngrite Krahun
                      </button>
                    </div>
                  )}

                  {/* View Mode Toggle: Map vs List */}
                  <div style={{
                    display: 'flex',
                    background: '#16181D',
                    padding: '3px',
                    borderRadius: '8px',
                    border: '1px solid #282C37',
                    marginBottom: '12px'
                  }}>
                    <button
                      onClick={() => setDriverViewMode('map')}
                      style={{
                        flex: 1,
                        background: driverViewMode === 'map' ? '#FFB703' : 'transparent',
                        color: driverViewMode === 'map' ? '#000000' : '#8F96A3',
                        border: 'none',
                        padding: '6px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px'
                      }}
                    >
                      <MapPin size={12} />
                      {isSq ? 'Harta Live' : 'Live Map'}
                    </button>
                    <button
                      onClick={() => setDriverViewMode('list')}
                      style={{
                        flex: 1,
                        background: driverViewMode === 'list' ? '#FFB703' : 'transparent',
                        color: driverViewMode === 'list' ? '#000000' : '#8F96A3',
                        border: 'none',
                        padding: '6px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '800',
                        cursor: 'pointer'
                      }}
                    >
                      {isSq ? 'Vetëm Lista' : 'List Only'}
                    </button>
                  </div>

                  {/* Embedded Compact Geoapify Map */}
                  {driverViewMode === 'map' && (
                    <div style={{ marginBottom: '14px', height: '220px', borderRadius: '12px', overflow: 'hidden' }}>
                      <GeoapifyMap
                        spots={driverSpots}
                        selectedSpot={selectedSpot}
                        onSelectSpot={(spot) => (!activeSession) && setSelectedSpot(spot)}
                        compact={true}
                        height="220px"
                        lang={lang}
                      />
                    </div>
                  )}

                  {/* Active Zone Card Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    padding: '0 2px'
                  }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#8F96A3', fontFamily: 'var(--font-mono)' }}>
                        ZONA E ZBULUAR AUTOMATIKISHT
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF' }}>
                        Pejton — Korridori 1
                      </div>
                    </div>
                    <span style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      color: '#10B981',
                      background: 'rgba(16, 185, 129, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      2 vende të lira
                    </span>
                  </div>

                  {/* 3 Simulated Spots List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    
                    {/* Spot 1: P-01 */}
                    <div 
                      onClick={() => (!activeSession) && setSelectedSpot({
                        id: 'P01',
                        code: 'Vendi P-01',
                        address: 'Rr. Perandori Justinian',
                        rate: '€1.00/orë',
                        walk: '45m',
                        hardwareId: 'DN-0892',
                        macAddress: 'C4:4F:33:08:92:A1'
                      })}
                      style={{
                        background: '#16181D',
                        border: selectedSpot?.id === 'P01' ? '1.5px solid #FFB703' : '1px solid #282C37',
                        borderRadius: '12px',
                        padding: '12px 14px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '800', fontSize: '14px', color: '#FFFFFF' }}>
                          Vendi P-01 (Rr. Perandori Justinian)
                        </span>
                        <span style={{
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: '#10B981',
                          fontSize: '10.5px',
                          fontWeight: '800',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontFamily: 'var(--font-mono)'
                        }}>
                          I LIRË
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11.5px', color: '#8F96A3' }}>
                        <span>Tarifa: €1.00/orë</span>
                        <span>•</span>
                        <span>Ecje: 45m</span>
                        <span>•</span>
                        <span style={{ fontFamily: 'var(--font-mono)', color: '#64748B' }}>DN-0892</span>
                      </div>
                    </div>

                    {/* Spot 2: P-02 (I ZËNË) */}
                    <div 
                      style={{
                        background: '#16181D',
                        border: '1px solid #282C37',
                        borderRadius: '12px',
                        padding: '12px 14px',
                        opacity: 0.65,
                        cursor: 'not-allowed'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '800', fontSize: '14px', color: '#8F96A3' }}>
                          Vendi P-02 (Rr. Pashko Vasa)
                        </span>
                        <span style={{
                          background: 'rgba(239, 68, 68, 0.15)',
                          color: '#EF4444',
                          fontSize: '10.5px',
                          fontWeight: '800',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontFamily: 'var(--font-mono)'
                        }}>
                          I ZËNË
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11.5px', color: '#64748B' }}>
                        <span>Tarifa: €1.00/orë</span>
                        <span>•</span>
                        <span>I rezervuar nga përdorues tjetër</span>
                      </div>
                    </div>

                    {/* Spot 3: P-03 */}
                    <div 
                      onClick={() => (!activeSession) && setSelectedSpot({
                        id: 'P03',
                        code: 'Vendi P-03',
                        address: 'Afër Teatrit ODA',
                        rate: '€1.00/orë',
                        walk: '85m',
                        hardwareId: 'DN-0118',
                        macAddress: 'FA:88:51:01:18:C4'
                      })}
                      style={{
                        background: '#16181D',
                        border: selectedSpot?.id === 'P03' ? '1.5px solid #FFB703' : '1px solid #282C37',
                        borderRadius: '12px',
                        padding: '12px 14px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '800', fontSize: '14px', color: '#FFFFFF' }}>
                          Vendi P-03 (Afër Teatrit ODA)
                        </span>
                        <span style={{
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: '#10B981',
                          fontSize: '10.5px',
                          fontWeight: '800',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontFamily: 'var(--font-mono)'
                        }}>
                          I LIRË
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11.5px', color: '#8F96A3' }}>
                        <span>Tarifa: €1.00/orë</span>
                        <span>•</span>
                        <span>Ecje: 85m</span>
                        <span>•</span>
                        <span style={{ fontFamily: 'var(--font-mono)', color: '#64748B' }}>DN-0118</span>
                      </div>
                    </div>

                  </div>

                  {/* Spot Modal Sheet */}
                  {selectedSpot && !activeSession && (
                    <div style={{
                      marginTop: '16px',
                      background: '#16181D',
                      border: '1.5px solid #FFB703',
                      borderRadius: '16px',
                      padding: '16px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div>
                          <div style={{ fontSize: '11px', color: '#8F96A3', fontFamily: 'var(--font-mono)' }}>
                            MODAL I ZGJEDHJES
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: '900', color: '#FFFFFF' }}>
                            {selectedSpot.code}
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedSpot(null)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#8F96A3',
                            fontSize: '14px',
                            cursor: 'pointer'
                          }}
                        >
                          ✕
                        </button>
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '10px',
                        background: '#0B0B0D',
                        padding: '10px',
                        borderRadius: '8px',
                        marginBottom: '14px'
                      }}>
                        <div>
                          <div style={{ fontSize: '10.5px', color: '#8F96A3' }}>Tarifa Ora / Min</div>
                          <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#FFFFFF' }}>{selectedSpot.rate}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '10.5px', color: '#8F96A3' }}>Distanca në Këmbë</div>
                          <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#FFB703' }}>{selectedSpot.walk}</div>
                        </div>
                      </div>

                      {/* State Machine Status Indicator */}
                      {driverStateStep > 0 && (
                        <div style={{
                          background: driverStateStep === 3 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 183, 3, 0.15)',
                          border: `1px solid ${driverStateStep === 3 ? '#10B981' : '#FFB703'}`,
                          borderRadius: '8px',
                          padding: '10px',
                          marginBottom: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}>
                          <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            border: `2px solid ${driverStateStep === 3 ? '#10B981' : '#FFB703'}`,
                            borderTopColor: 'transparent',
                            animation: driverStateStep === 3 ? 'none' : 'spin 0.8s linear infinite'
                          }} />
                          <div style={{
                            fontSize: '12px',
                            fontWeight: '700',
                            color: driverStateStep === 3 ? '#10B981' : '#FFB703'
                          }}>
                            {driverStatusMessage}
                          </div>
                        </div>
                      )}

                      {/* Massive Hazard Yellow Button */}
                      <button
                        onClick={driverStateStep === 0 ? handleExecuteDrop : undefined}
                        disabled={driverStateStep > 0}
                        style={{
                          width: '100%',
                          background: '#FFB703',
                          color: '#000000',
                          border: 'none',
                          padding: '16px',
                          borderRadius: '12px',
                          fontWeight: '900',
                          fontSize: '15px',
                          letterSpacing: '0.04em',
                          cursor: driverStateStep === 0 ? 'pointer' : 'not-allowed',
                          boxShadow: '0 4px 14px rgba(255, 183, 3, 0.35)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                      >
                        <ArrowDownCircle size={18} />
                        {driverStateStep === 0 ? 'ULE BARRIERËN' : 'DUKE EKZEKUTUAR...'}
                      </button>

                      {/* Emergency / Fallback Button */}
                      <button
                        onClick={handleReroute}
                        style={{
                          width: '100%',
                          background: 'transparent',
                          border: 'none',
                          color: '#8F96A3',
                          fontSize: '12px',
                          marginTop: '10px',
                          cursor: 'pointer',
                          textDecoration: 'underline'
                        }}
                      >
                        Vendi është i zënë? Riruto automatikisht
                      </button>
                    </div>
                  )}

                </div>
              )}

              {/* ==================================================== */}
              {/* TAB 2: BLE LAB & HARDWARE TEST BENCH */}
              {/* ==================================================== */}
              {appTab === 'ble_lab' && (
                <div style={{ padding: '16px' }}>
                  
                  {/* Mock Switch */}
                  <div style={{
                    background: '#16181D',
                    border: '1px solid #282C37',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>
                        Simulo pa Hardware
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#8F96A3' }}>
                        {isMockMode ? 'Testim virtual aktiv pa nevojë për BLE fizike' : 'Kërkon barrierë fizike BLE'}
                      </div>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '42px', height: '22px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={isMockMode}
                        onChange={(e) => {
                          setIsMockMode(e.target.checked);
                          addLog('SYS', e.target.checked ? 'Modaliteti MOCK u aktivizua.' : 'Modaliteti HARDWARE REAL u aktivizua.');
                        }}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: isMockMode ? '#FFB703' : '#282C37',
                        borderRadius: '22px',
                        transition: '0.2s'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '""',
                          height: '16px',
                          width: '16px',
                          left: isMockMode ? '22px' : '3px',
                          bottom: '3px',
                          background: '#0B0B0D',
                          borderRadius: '50%',
                          transition: '0.2s'
                        }} />
                      </span>
                    </label>
                  </div>

                  {/* Scan Controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px'
                  }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8F96A3' }}>
                      PAJISJET NORDIC NUS ({bleDevices.length})
                    </span>
                    <button
                      onClick={handleToggleScan}
                      style={{
                        background: isScanning ? '#EF4444' : '#1F222A',
                        border: '1px solid #282C37',
                        color: isScanning ? '#FFFFFF' : '#FFB703',
                        padding: '5px 12px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      {isScanning ? 'Ndalo Skanimin' : 'Skano Pajisjet'}
                    </button>
                  </div>

                  {/* Device List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                    {bleDevices.map(dev => {
                      const isConn = connectedDeviceId === dev.id;
                      return (
                        <div
                          key={dev.id}
                          style={{
                            background: '#16181D',
                            border: isConn ? '1.5px solid #10B981' : '1px solid #282C37',
                            borderRadius: '10px',
                            padding: '10px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>
                              {dev.name}
                            </div>
                            <div style={{ display: 'flex', gap: '8px', fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: '#8F96A3', marginTop: '2px' }}>
                              <span>{dev.id}</span>
                              <span style={{ color: dev.rssi > -65 ? '#10B981' : '#FFB703' }}>{dev.rssi} dBm</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleConnect(dev)}
                            style={{
                              background: isConn ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                              border: `1px solid ${isConn ? '#EF4444' : '#10B981'}`,
                              color: isConn ? '#EF4444' : '#10B981',
                              padding: '5px 10px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            {isConn ? 'Shkëputu' : 'Lidhu'}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quick Commands Bar */}
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8F96A3', marginBottom: '8px' }}>
                      KOMANDAT E SHPEJTA (20-BYTE NUS FRAME)
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                      <button
                        onClick={() => handleQuickCommand(0x01, 'Ule Krahun')}
                        style={{
                          background: '#1F222A',
                          border: '1px solid #FFB703',
                          color: '#FFB703',
                          padding: '10px 4px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '800',
                          cursor: 'pointer'
                        }}
                      >
                        [0x01] Ule Krahun
                      </button>
                      <button
                        onClick={() => handleQuickCommand(0x02, 'Ngrite Krahun')}
                        style={{
                          background: '#1F222A',
                          border: '1px solid #282C37',
                          color: '#FFFFFF',
                          padding: '10px 4px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '800',
                          cursor: 'pointer'
                        }}
                      >
                        [0x02] Ngrite
                      </button>
                      <button
                        onClick={() => handleQuickCommand(0x03, 'Auto-Raise')}
                        style={{
                          background: '#1F222A',
                          border: '1px solid #282C37',
                          color: '#FFFFFF',
                          padding: '10px 4px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '800',
                          cursor: 'pointer'
                        }}
                      >
                        [0x03] Auto
                      </button>
                    </div>
                  </div>

                  {/* 20-Byte Nordic NUS Packet Inspector */}
                  <div style={{
                    background: '#0B0B0D',
                    border: '1px solid #282C37',
                    borderRadius: '10px',
                    padding: '12px',
                    marginBottom: '14px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Zap size={13} color="#FFB703" />
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: '800', color: '#FFFFFF' }}>
                          INSPEKTORI I PAKETËS 20-BYTE NUS
                        </span>
                      </div>
                      <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '1px 6px', borderRadius: '4px' }}>
                        BCC Valid
                      </span>
                    </div>

                    <p style={{ fontSize: '10.5px', color: '#8F96A3', margin: '0 0 10px 0' }}>
                      {isSq 
                        ? 'Struktura binare e transmetuar te çipi Nordic nRF52840 (GATT Characteristic RX: 0x0002):' 
                        : 'Binary NUS payload dispatched to Nordic nRF52840 SoC (GATT Char RX: 0x0002):'}
                    </p>

                    {/* Byte Layout Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px', marginBottom: '10px' }}>
                      {[
                        { label: 'B0..B3: PREAMBLE', hex: '44 44 54 43', name: 'ASCII "DDTC"', color: '#3B82F6' },
                        { label: 'B4: LEN', hex: '14', name: '20 Bytes', color: '#8B5CF6' },
                        { label: 'B5: CMD', hex: inspectedCommand === 0x01 ? '01' : (inspectedCommand === 0x02 ? '02' : '03'), name: inspectedCommand === 0x01 ? 'LOWER_ARM' : (inspectedCommand === 0x02 ? 'RAISE_ARM' : 'STATUS'), color: '#FFB703' },
                        { label: 'B6..B9: HMAC', hex: 'A1 B2 C3 D4', name: 'Rolling Auth', color: '#10B981' },
                        { label: 'B10..B17: NONCE', hex: '65 0F 12 8A', name: 'Crypto Nonce', color: '#EC4899' },
                        { label: 'B18: BCC', hex: inspectedCommand === 0x01 ? 'B7' : (inspectedCommand === 0x02 ? 'B4' : 'B5'), name: 'XOR Checksum', color: '#F59E0B' },
                        { label: 'B19: TAIL', hex: '45', name: 'ASCII "E"', color: '#64748B' }
                      ].map((b, i) => (
                        <div key={i} style={{
                          background: '#16181D',
                          border: `1px solid ${b.color}44`,
                          borderRadius: '6px',
                          padding: '6px 4px',
                          textAlign: 'center',
                          gridColumn: i === 0 || i === 4 ? 'span 2' : 'span 1'
                        }}>
                          <div style={{ fontSize: '8.5px', color: '#8F96A3', fontFamily: 'var(--font-mono)' }}>{b.label}</div>
                          <div style={{ fontSize: '11px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: b.color, margin: '2px 0' }}>{b.hex}</div>
                          <div style={{ fontSize: '8px', color: '#CBD5E1' }}>{b.name}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => {
                          setInspectedCommand(0x01);
                          handleQuickCommand(0x01, 'Inspekto Ule Krahun (0x01)');
                        }}
                        style={{
                          flex: 1,
                          background: inspectedCommand === 0x01 ? '#FFB703' : '#16181D',
                          color: inspectedCommand === 0x01 ? '#000000' : '#CBD5E1',
                          border: '1px solid #282C37',
                          padding: '6px',
                          borderRadius: '5px',
                          fontSize: '10.5px',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        [0x01] Ule Krahun
                      </button>
                      <button
                        onClick={() => {
                          setInspectedCommand(0x02);
                          handleQuickCommand(0x02, 'Inspekto Ngrite Krahun (0x02)');
                        }}
                        style={{
                          flex: 1,
                          background: inspectedCommand === 0x02 ? '#FFB703' : '#16181D',
                          color: inspectedCommand === 0x02 ? '#000000' : '#CBD5E1',
                          border: '1px solid #282C37',
                          padding: '6px',
                          borderRadius: '5px',
                          fontSize: '10.5px',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        [0x02] Ngrite
                      </button>
                    </div>
                  </div>

                  {/* Live Hex Log Console */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Terminal size={12} color="#FFB703" />
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8F96A3' }}>
                          LIVE HEX TERMINAL
                        </span>
                      </div>
                      <button
                        onClick={() => setBleLogs([{ time: '00:00:00', direction: 'SYS', message: 'Terminali u pastrua.', hex: null }])}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#64748B',
                          fontSize: '10px',
                          cursor: 'pointer'
                        }}
                      >
                        Pastro
                      </button>
                    </div>

                    <div
                      ref={logTerminalRef}
                      style={{
                        height: '140px',
                        background: '#050507',
                        border: '1px solid #1F222A',
                        borderRadius: '8px',
                        padding: '10px',
                        overflowY: 'auto',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10.5px'
                      }}
                    >
                      {bleLogs.map((log, idx) => {
                        let color = '#8F96A3';
                        if (log.direction === 'TX') color = '#FFB703';
                        if (log.direction === 'RX') color = '#10B981';
                        if (log.direction === 'SYS') color = '#38BDF8';

                        return (
                          <div key={idx} style={{ marginBottom: '6px', lineHeight: 1.4 }}>
                            <div>
                              <span style={{ color: '#475569' }}>[{log.time}] </span>
                              <span style={{ color, fontWeight: '700' }}>{log.direction}: </span>
                              <span style={{ color: '#E2E8F0' }}>{log.message}</span>
                            </div>
                            {log.hex && (
                              <div style={{ color: color, opacity: 0.9, paddingLeft: '8px', marginTop: '2px' }}>
                                HEX: {log.hex}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Bottom Navigation Bar */}
            <div style={{
              background: '#16181D',
              borderTop: '1px solid #282C37',
              height: '58px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '0 10px'
            }}>
              <button
                onClick={() => setAppTab('shoferi')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  color: appTab === 'shoferi' ? '#FFB703' : '#8F96A3',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: appTab === 'shoferi' ? '800' : '600'
                }}
              >
                <Car size={18} />
                <span>Shoferi</span>
              </button>

              <button
                onClick={() => setAppTab('ble_lab')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  color: appTab === 'ble_lab' ? '#FFB703' : '#8F96A3',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: appTab === 'ble_lab' ? '800' : '600'
                }}
              >
                <Terminal size={18} />
                <span>Laboratori BLE</span>
              </button>
            </div>

          </div>

          <div style={{ marginTop: '12px', fontSize: '12px', color: '#8F96A3', textAlign: 'center' }}>
            {isSq ? 'Kliko mbi vendet ose butonat për të simuluar gjithë rrjedhën' : 'Click spots or buttons to simulate the complete driver and BLE flow'}
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT SIDE: FLUTTER CODEBASE & BLE PROTOCOL SPEC */}
        {/* ======================================================== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: Flutter Project Structure & Quick Commands */}
          <div style={{
            background: '#16181D',
            border: '1px solid #282C37',
            borderRadius: '16px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FolderGit2 size={20} color="#FFB703" />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#FFFFFF' }}>
                  {isSq ? 'Struktura Modulare e Kodit (Flutter / Dart)' : 'Modular Code Architecture (Flutter / Dart)'}
                </h3>
              </div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#10B981' }}>
                Gati për Build
              </span>
            </div>

            <div style={{
              background: '#0B0B0D',
              borderRadius: '10px',
              border: '1px solid #1F222A',
              padding: '14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              lineHeight: 1.6,
              color: '#CBD5E1',
              marginBottom: '16px'
            }}>
              <div><span style={{ color: '#FFB703' }}>shtegu_app/</span></div>
              <div style={{ paddingLeft: '16px' }}>├── <span style={{ color: '#38BDF8' }}>pubspec.yaml</span> <span style={{ color: '#64748B' }}>(flutter_blue_plus, provider, google_fonts)</span></div>
              <div style={{ paddingLeft: '16px' }}>├── <span style={{ color: '#E2E8F0' }}>android/</span></div>
              <div style={{ paddingLeft: '32px' }}>├── <span style={{ color: '#38BDF8' }}>app/src/main/AndroidManifest.xml</span> <span style={{ color: '#64748B' }}>(BT Scan/Connect, Fine Loc)</span></div>
              <div style={{ paddingLeft: '32px' }}>└── <span style={{ color: '#38BDF8' }}>app/build.gradle</span> <span style={{ color: '#64748B' }}>(minSdkVersion: 21)</span></div>
              <div style={{ paddingLeft: '16px' }}>└── <span style={{ color: '#E2E8F0' }}>lib/</span></div>
              <div style={{ paddingLeft: '32px' }}>├── <span style={{ color: '#10B981' }}>main.dart</span> <span style={{ color: '#64748B' }}>(MultiProvider, BottomNav, Scaffold)</span></div>
              <div style={{ paddingLeft: '32px' }}>├── <span style={{ color: '#10B981' }}>theme/app_theme.dart</span> <span style={{ color: '#64748B' }}>(#0B0B0D, #16181D, #FFB703)</span></div>
              <div style={{ paddingLeft: '32px' }}>├── <span style={{ color: '#10B981' }}>services/ble_service.dart</span> <span style={{ color: '#64748B' }}>(Nordic UART, 20-Byte Frame, XOR BCC)</span></div>
              <div style={{ paddingLeft: '32px' }}>├── <span style={{ color: '#10B981' }}>services/geoapify_service.dart</span> <span style={{ color: '#64748B' }}>(Geoapify Maps & Geocoding Search)</span></div>
              <div style={{ paddingLeft: '32px' }}>├── <span style={{ color: '#10B981' }}>models/spot_model.dart</span> <span style={{ color: '#64748B' }}>(ParkingSpot, Rates, Distance)</span></div>
              <div style={{ paddingLeft: '32px' }}>└── <span style={{ color: '#10B981' }}>views/</span></div>
              <div style={{ paddingLeft: '48px' }}>├── <span style={{ color: '#FFB703' }}>driver_view.dart</span> <span style={{ color: '#64748B' }}>(Wallet, Pejton spots, State Machine)</span></div>
              <div style={{ paddingLeft: '48px' }}>└── <span style={{ color: '#FFB703' }}>ble_lab_view.dart</span> <span style={{ color: '#64748B' }}>(Hardware bench, Terminal logs)</span></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              <div style={{ background: '#0B0B0D', padding: '12px', borderRadius: '8px', border: '1px solid #1F222A' }}>
                <div style={{ fontSize: '11px', color: '#8F96A3', fontFamily: 'var(--font-mono)' }}>TESTIMI LOKAL (DEV)</div>
                <div style={{ fontSize: '12.5px', fontFamily: 'var(--font-mono)', color: '#FFB703', marginTop: '4px' }}>
                  cd shtegu_app<br />flutter run
                </div>
              </div>
              <div style={{ background: '#0B0B0D', padding: '12px', borderRadius: '8px', border: '1px solid #1F222A' }}>
                <div style={{ fontSize: '11px', color: '#8F96A3', fontFamily: 'var(--font-mono)' }}>NDËRTIMI I APK-SË RELEASE</div>
                <div style={{ fontSize: '12.5px', fontFamily: 'var(--font-mono)', color: '#10B981', marginTop: '4px' }}>
                  flutter build apk --release
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 20-Byte Nordic UART Protocol Specification */}
          <div style={{
            background: '#16181D',
            border: '1px solid #282C37',
            borderRadius: '16px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Radio size={20} color="#FFB703" />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#FFFFFF' }}>
                {isSq ? 'Specifikimi i Protokollit BLE (20-Byte Frame)' : 'Nordic UART Service 20-Byte Frame Specification'}
              </h3>
            </div>

            <div style={{ overflowX: 'auto', marginBottom: '14px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                <thead>
                  <tr style={{ background: '#0B0B0D', borderBottom: '1px solid #282C37' }}>
                    <th style={{ padding: '8px 10px', textAlign: 'left', color: '#8F96A3' }}>Pozita</th>
                    <th style={{ padding: '8px 10px', textAlign: 'left', color: '#8F96A3' }}>Vlera (Hex)</th>
                    <th style={{ padding: '8px 10px', textAlign: 'left', color: '#8F96A3' }}>Fusha</th>
                    <th style={{ padding: '8px 10px', textAlign: 'left', color: '#8F96A3' }}>Përshkrimi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #1F222A' }}>
                    <td style={{ padding: '8px 10px', color: '#CBD5E1' }}>0..3</td>
                    <td style={{ padding: '8px 10px', color: '#FFB703' }}>44 44 54 43</td>
                    <td style={{ padding: '8px 10px', color: '#FFFFFF', fontWeight: '700' }}>STX Magic</td>
                    <td style={{ padding: '8px 10px', color: '#8F96A3' }}>Prefiksi i shenjtë ("DDTC")</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #1F222A' }}>
                    <td style={{ padding: '8px 10px', color: '#CBD5E1' }}>4..5</td>
                    <td style={{ padding: '8px 10px', color: '#FFB703' }}>14 FF</td>
                    <td style={{ padding: '8px 10px', color: '#FFFFFF', fontWeight: '700' }}>Length / Flag</td>
                    <td style={{ padding: '8px 10px', color: '#8F96A3' }}>Gjatësia fikse 20 bajta</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #1F222A' }}>
                    <td style={{ padding: '8px 10px', color: '#CBD5E1' }}>6..7</td>
                    <td style={{ padding: '8px 10px', color: '#10B981' }}>14 [CMD]</td>
                    <td style={{ padding: '8px 10px', color: '#FFFFFF', fontWeight: '700' }}>Command</td>
                    <td style={{ padding: '8px 10px', color: '#8F96A3' }}>0x01 (Ule), 0x02 (Ngrite), 0x03 (Auto)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #1F222A' }}>
                    <td style={{ padding: '8px 10px', color: '#CBD5E1' }}>8..11</td>
                    <td style={{ padding: '8px 10px', color: '#38BDF8' }}>A1 B2 C3 D4</td>
                    <td style={{ padding: '8px 10px', color: '#FFFFFF', fontWeight: '700' }}>Auth Key</td>
                    <td style={{ padding: '8px 10px', color: '#8F96A3' }}>4-Byte çelësi dinamik i nënshkruar nga Cloud</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #1F222A' }}>
                    <td style={{ padding: '8px 10px', color: '#CBD5E1' }}>12..17</td>
                    <td style={{ padding: '8px 10px', color: '#64748B' }}>00 ... 45</td>
                    <td style={{ padding: '8px 10px', color: '#FFFFFF', fontWeight: '700' }}>Padding / ETX</td>
                    <td style={{ padding: '8px 10px', color: '#8F96A3' }}>Rezervuar (0x00 x 5) + ETX (0x45)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 10px', color: '#CBD5E1' }}>18..19</td>
                    <td style={{ padding: '8px 10px', color: '#EF4444' }}>[BCC] 0A</td>
                    <td style={{ padding: '8px 10px', color: '#FFFFFF', fontWeight: '700' }}>Checksum & LF</td>
                    <td style={{ padding: '8px 10px', color: '#8F96A3' }}>XOR Checksum i 18 bajtave + Linefeed</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{
              background: '#0B0B0D',
              padding: '12px 14px',
              borderRadius: '8px',
              border: '1px solid #1F222A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '11.5px'
            }}>
              <span style={{ color: '#8F96A3' }}>Nordic NUS UUID:</span>
              <span style={{ color: '#FFB703', fontWeight: '700' }}>6E400001-B5A3-F393-E0A9-E50E24DCCA9E</span>
            </div>
          </div>

          {/* Card 3: Android 12+ Permissions Setup */}
          <div style={{
            background: '#16181D',
            border: '1px solid #282C37',
            borderRadius: '16px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <ShieldCheck size={20} color="#10B981" />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#FFFFFF' }}>
                {isSq ? 'Konfigurimi i Lejeve në Android (AndroidManifest.xml)' : 'Android Permissions Configuration'}
              </h3>
            </div>

            <p style={{ fontSize: '13px', color: '#8F96A3', margin: '0 0 12px 0' }}>
              {isSq
                ? 'Përputhshmëri e plotë me standardet moderne të Android 12, 13 dhe 14 pa kërkesa të tepërta për përdoruesin:'
                : 'Full compliance with Android 12+ Bluetooth runtime permission model:'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                'BLUETOOTH_SCAN',
                'BLUETOOTH_CONNECT',
                'BLUETOOTH_ADVERTISE',
                'ACCESS_FINE_LOCATION',
                'minSdkVersion 21',
                'targetSdkVersion 34'
              ].map((perm, i) => (
                <span
                  key={i}
                  style={{
                    background: '#0B0B0D',
                    border: '1px solid #282C37',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: '#E2E8F0'
                  }}
                >
                  {perm}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
