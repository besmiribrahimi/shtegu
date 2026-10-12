import React from 'react';
import { X, Printer, Shield, CheckCircle2 } from 'lucide-react';

export default function ExecutiveMemoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '820px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: '#ffffff',
        border: '1px solid #cbd5e1',
        borderRadius: '20px',
        padding: '40px 36px',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
        position: 'relative'
      }}>
        {/* Controls */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          display: 'flex',
          gap: '8px'
        }}>
          <button
            onClick={() => window.print()}
            className="btn btn-secondary"
            style={{
              padding: '8px 14px',
              fontSize: '0.8rem'
            }}
          >
            <Printer size={15} />
            Print / PDF
          </button>
          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '8px',
              color: '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Brand Header */}
        <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-cobalt">CONFIDENTIAL EXECUTIVE MEMO</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              OCTOBER 2026 &bull; REF: SHTEGU-ANGEL-BRIEF
            </span>
          </div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--text-titanium)', marginBottom: '6px' }}>
            SHTEGU — Autonomous Urban Micro-Parking Network
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Investment Memorandum prepared for Driton Hapçiu & Series Angel Syndicate
          </p>
        </div>

        {/* Memo Body Content */}
        <div style={{ color: 'var(--text-slate)', fontSize: '0.925rem', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <section>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-titanium)', marginBottom: '8px' }}>
              1. The Prishtina Opportunity
            </h3>
            <p>
              Prishtina suffers from an acute urban parking deficit in core business sectors (Pejton, Qendër, Qafa). Drivers spend 20 to 45 minutes searching for spots, resulting in severe street congestion and lost economic productivity. Simultaneously, hundreds of private driveways and courtyards sit vacant during business hours (08:30–16:30). Shtegu unlocks this trapped asphalt via surface-mounted, solar-powered, BLE-controlled smart barriers.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-titanium)', marginBottom: '8px' }}>
              2. Asset-Backed Hardware & IoT Architecture
            </h3>
            <p>
              Hardware is sourced directly from a verified ODM factory in Shenzhen with native Nordic UART Service (NUS) firmware (GATT UUID <code>6E400001</code>). The unit features a monocrystalline solar panel, an industrial battery operable down to -15°C, a 5-ton compressive load rating, IP67 waterproof enclosure, and a 180° bidirectional anti-collision spring with a 100 dB tamper siren. 
              Drivers' smartphones bridge commands locally over BLE ("Phone-as-Gateway"), eliminating per-stall cellular modem and SIM subscription costs.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-titanium)', marginBottom: '8px' }}>
              3. Unit Economics & Capital Payback Velocity
            </h3>
            <p>
              At a landed cost of <strong>€110 per stall</strong> (hardware, air express DHL, customs, and concrete anchor bolts), each active unit produces a conservative net operating cash flow of <strong>€35.90 per month</strong> (blended from 30% parking take-rate, €18/mo Forex ad-plate lease, minus payment and cloud buffers).
              This delivers a rapid capital payback period of <strong>92 days (~3.06 months)</strong>.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-titanium)', marginBottom: '8px' }}>
              4. The Zero-Burn Operating Model
            </h3>
            <p>
              Shtegu operates with €0 office rent, €0 full-time staff liabilities, and €0 founder salary draw. Barrier installations are executed via a gig piece-work model at €15 per barrier installed using rotary hammer drills. In periods of adverse weather or seasonal lulls, fixed overhead is virtually non-existent (~€50/mo server hosting).
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-titanium)', marginBottom: '8px' }}>
              5. The Angel Tranche
            </h3>
            <p>
              We are offering <strong>15.0% Common Equity for a €25,000 – €30,000 angel investment</strong>. 100% of proceeds are dedicated to hardware procurement (80–100 barriers), express freight, installation tooling, and payment gateway float.
            </p>
          </section>
        </div>

        {/* Sign-off */}
        <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-titanium)' }}>
              Besmir
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Founder & Systems Engineer, Shtegu
            </div>
          </div>
          <div className="badge badge-emerald">
            <CheckCircle2 size={12} />
            OFFICIALLY RATIFIED
          </div>
        </div>
      </div>
    </div>
  );
}
