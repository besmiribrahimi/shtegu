import React, { useState } from 'react';
import { 
  Cpu, 
  Sun, 
  BatteryCharging, 
  ShieldAlert, 
  Wifi, 
  Radio, 
  Smartphone, 
  CheckCircle2, 
  Volume2, 
  Layers, 
  Gauge
} from 'lucide-react';

export default function HardwareInspector() {
  const [armStatus, setArmStatus] = useState('RAISED'); // 'RAISED' | 'LOWERED' | 'TAMPER'
  const [logs, setLogs] = useState([
    { time: '14:02:11.204', hex: '0x44 0x44 0x54 0x43 [ADV_BEACON]', desc: 'Passive Beacon: Arm=90° (Up), Vacant, Batt=94%' },
    { time: '14:02:15.890', hex: 'NUS_SERVICE: 6E400001-...', desc: 'BLE RSSI: -62dBm detected via Driver Mobile Gateway' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const triggerLower = () => {
    setIsProcessing(true);
    const newLog1 = {
      time: new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 900 + 100),
      hex: 'TX: 0x44 0x44 0x54 0x43 0x03 [KEY: A8 F1 2C 04]',
      desc: 'Mobile App auth handshake: Command 0x03 (Lower arm with magnetic auto-rise)'
    };
    setTimeout(() => {
      const newLog2 = {
        time: new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 900 + 100),
        hex: 'RX: 0x44 0x44 0x54 0x43 0x00 0x01 [ACK_SUCCESS]',
        desc: 'Barrier status updated: Arm flat (0°), Motor Current: 1.2A, Solenoid locked'
      };
      setArmStatus('LOWERED');
      setLogs(prev => [newLog2, newLog1, ...prev.slice(0, 4)]);
      setIsProcessing(false);
    }, 700);
  };

  const triggerRaise = () => {
    setIsProcessing(true);
    const newLog1 = {
      time: new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 900 + 100),
      hex: 'TX: 0x44 0x44 0x54 0x43 0x02 [KEY: A8 F1 2C 04]',
      desc: 'Command 0x02: Raise arm to vertical position'
    };
    setTimeout(() => {
      const newLog2 = {
        time: new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 900 + 100),
        hex: 'RX: 0x44 0x44 0x54 0x43 0x00 0x00 [ACK_VERTICAL]',
        desc: 'Barrier upright (90°). Security clutch engaged.'
      };
      setArmStatus('RAISED');
      setLogs(prev => [newLog2, newLog1, ...prev.slice(0, 4)]);
      setIsProcessing(false);
    }, 700);
  };

  const triggerTamper = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newLog = {
        time: new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 900 + 100),
        hex: 'ALARM_EVENT: 0xEE 0x99 [FORCE_DETECTED]',
        desc: '180° Anti-Collision Clutch engaged. 100 dB acoustic siren active. Telemetry pushed to Cloud.'
      };
      setArmStatus('TAMPER');
      setLogs(prev => [newLog, ...prev.slice(0, 5)]);
      setIsProcessing(false);
    }, 400);
  };

  return (
    <section id="hardware" style={{ padding: '64px 0', borderTop: '1px solid var(--border-subtle)', backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '840px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="badge badge-cobalt">
              <Cpu size={14} />
              HARDWARE & IOT INTEGRATION
            </span>
            <span className="badge badge-slate">ODM SOURCING CONFIRMED</span>
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '14px', color: 'var(--text-titanium)' }}>
            Industrial Physical Barrier & Nordic UART Telemetry
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-slate)', lineHeight: '1.6' }}>
            Unlike purely virtual parking apps, Shtegu deploys physical, tamper-proof IoT locks sourced from vetted ODM manufacturers with direct factory firmware control. 
            No cellular SIM overhead per stall: driver devices bridge communication automatically.
          </p>
        </div>

        {/* Two Column: Digital Twin on Left, Telemetry Protocol on Right */}
        <div className="grid-2" style={{ gap: '28px', alignItems: 'stretch' }}>
          {/* Left: Physical Asset Specs & Interactive Visualizer */}
          <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#ffffff' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-titanium)' }}>
                  Physical Asset Specification
                </h3>
                <span className={`badge ${armStatus === 'RAISED' ? 'badge-amber' : armStatus === 'LOWERED' ? 'badge-emerald' : 'badge-crimson'}`}>
                  {armStatus === 'RAISED' && 'BARRIER LOCKED (UP)'}
                  {armStatus === 'LOWERED' && 'BARRIER UNLOCKED (DOWN)'}
                  {armStatus === 'TAMPER' && 'TAMPER SIREN TRIGGERED'}
                </span>
              </div>

              {/* Graphic Representation of the Barrier */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '24px',
                textAlign: 'center',
                position: 'relative',
                marginBottom: '24px'
              }}>
                {/* Visual Status Indicator */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: armStatus === 'RAISED' ? 'var(--signal-amber-dim)' : armStatus === 'LOWERED' ? 'var(--signal-emerald-dim)' : 'var(--signal-crimson-dim)',
                  border: `2px dashed ${armStatus === 'RAISED' ? 'var(--signal-amber)' : armStatus === 'LOWERED' ? 'var(--signal-emerald)' : 'var(--signal-crimson)'}`,
                  margin: '0 auto 16px',
                  transition: 'all 0.4s ease'
                }}>
                  {armStatus === 'RAISED' && (
                    <div style={{ textAlign: 'center' }}>
                      <Layers size={36} style={{ color: 'var(--signal-amber)', margin: '0 auto' }} />
                      <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--signal-amber)', fontWeight: 'bold', marginTop: '4px' }}>
                        ARM 90°
                      </div>
                    </div>
                  )}
                  {armStatus === 'LOWERED' && (
                    <div style={{ textAlign: 'center' }}>
                      <CheckCircle2 size={36} style={{ color: 'var(--signal-emerald)', margin: '0 auto' }} />
                      <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--signal-emerald)', fontWeight: 'bold', marginTop: '4px' }}>
                        ARM 0° FLAT
                      </div>
                    </div>
                  )}
                  {armStatus === 'TAMPER' && (
                    <div style={{ textAlign: 'center' }}>
                      <Volume2 size={36} style={{ color: 'var(--signal-crimson)', margin: '0 auto' }} />
                      <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--signal-crimson)', fontWeight: 'bold', marginTop: '4px' }}>
                        100dB SIREN
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ fontSize: '0.9rem', color: 'var(--text-titanium)', fontWeight: '700' }}>
                  Model: Heavy-Duty Solar BLE 5.0 Anchor
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                  LOWERED PROFILE: 75mm &bull; LOAD CAPACITY: 5.0 TONS &bull; IP67 ENCLOSURE
                </div>
              </div>

              {/* Hardware Spec Bullets */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <Sun size={14} style={{ color: 'var(--signal-amber)' }} />
                    Solar + Sub-Zero Batt
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-titanium)', fontWeight: '600', marginTop: '4px' }}>
                    -15°C Tested &bull; 60+ Days
                  </div>
                </div>

                <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <ShieldAlert size={14} style={{ color: 'var(--signal-crimson)' }} />
                    Anti-Collision Spring
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-titanium)', fontWeight: '600', marginTop: '4px' }}>
                    180° Clutch &bull; 100 dB Siren
                  </div>
                </div>

                <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <Gauge size={14} style={{ color: 'var(--signal-cobalt)' }} />
                    Surface Anchoring
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-titanium)', fontWeight: '600', marginTop: '4px' }}>
                    M10 Expansion Bolts
                  </div>
                </div>

                <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <Layers size={14} style={{ color: 'var(--signal-emerald)' }} />
                    A4 Billboard Plate
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-titanium)', fontWeight: '600', marginTop: '4px' }}>
                    €18/mo Forex Ad Surface
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Control Buttons */}
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                INTERACTIVE BENCH TEST TRIGGER:
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={triggerLower}
                  disabled={isProcessing}
                  className="btn btn-emerald"
                  style={{ flex: 1, padding: '9px 12px', fontSize: '0.825rem' }}
                >
                  Lower Arm (0x03)
                </button>
                <button
                  onClick={triggerRaise}
                  disabled={isProcessing}
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '9px 12px', fontSize: '0.825rem' }}
                >
                  Raise Arm (0x02)
                </button>
                <button
                  onClick={triggerTamper}
                  disabled={isProcessing}
                  className="btn btn-ghost"
                  style={{ padding: '9px 12px', fontSize: '0.825rem', color: 'var(--signal-crimson)', border: '1px solid var(--signal-crimson-border)' }}
                >
                  Force Tamper
                </button>
              </div>
            </div>
          </div>

          {/* Right: Live Telemetry Protocol & Architecture Feed */}
          <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#ffffff' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-titanium)' }}>
                  Nordic UART Service (NUS) Protocol
                </h3>
                <span className="badge badge-cobalt">GATT 6E400001</span>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Native Bluetooth Low Energy UART frame verified directly with the ODM manufacturer. Broadcasts occupancy passively without pairing lag.
              </p>

              {/* Protocol Specs Details */}
              <div style={{
                background: '#0b132b',
                borderRadius: '10px',
                border: '1px solid #1e293b',
                padding: '16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                lineHeight: '1.6',
                marginBottom: '16px',
                color: '#e2e8f0'
              }}>
                <div style={{ color: '#94a3b8', borderBottom: '1px solid #1e293b', paddingBottom: '6px', marginBottom: '8px' }}>
                  FACTORY COMM SPECIFICATION:
                </div>
                <div><span style={{ color: '#94a3b8' }}>SERVICE_UUID:</span> <span style={{ color: '#38bdf8' }}>6E400001-B5A3-F393-E0A9-E50E24DCCA9E</span></div>
                <div><span style={{ color: '#94a3b8' }}>FRAME_HEADER:</span> <span style={{ color: '#f59e0b' }}>0x44 0x44 0x54 0x43 ("DDTC")</span></div>
                <div><span style={{ color: '#94a3b8' }}>DYNAMIC_KEY:</span> 4-Byte Hash derived from barrier MAC & Cloud Secret</div>
                <div><span style={{ color: '#94a3b8' }}>BEACON_MODE:</span> Byte 2 (0=Vacant, 1=Occupied) &bull; Byte 3 (Arm Angle)</div>
              </div>

              {/* Live Simulated Console Feed */}
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                LIVE BLE BUS ACTIVITY LOG:
              </div>
              <div className="telemetry-feed" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                {logs.map((log, idx) => (
                  <div key={idx} className="telemetry-row">
                    <span className="telemetry-timestamp">{log.time}</span>
                    <span className="telemetry-hex">{log.hex}</span>
                    <span className="telemetry-desc">{log.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Explainer Badge */}
            <div style={{
              marginTop: '20px',
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'var(--signal-cobalt-dim)',
              border: '1px solid var(--signal-cobalt-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Smartphone size={20} style={{ color: 'var(--signal-cobalt)', flexShrink: 0 }} />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-slate)' }}>
                <strong>"Phone-as-Gateway" Advantage:</strong> Driver's cellular connection bridges commands to the barrier locally over BLE. Zero €3/mo recurring cellular SIM costs per stall.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
