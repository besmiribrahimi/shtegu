import React from 'react';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  Calendar, 
  Download
} from 'lucide-react';

export default function TermSheetModal({ isOpen, onClose }) {
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
        maxWidth: '740px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: '#ffffff',
        border: '1px solid #cbd5e1',
        borderRadius: '20px',
        padding: '38px 34px',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
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

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span className="badge badge-cobalt">CONFIDENTIAL TERM SHEET</span>
          <span className="badge badge-slate">SERIES ANGEL 2026</span>
        </div>

        <h2 style={{ fontSize: '1.65rem', color: 'var(--text-titanium)', marginBottom: '8px' }}>
          Investment Term Sheet Summary
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
          Prepared for Driton Hapçiu & Anchor Angel Syndicates. All terms subject to definitive closing documentation.
        </p>

        {/* Core Terms Matrix */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #cbd5e1',
          borderRadius: '14px',
          padding: '24px',
          marginBottom: '28px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '18px' }}>
            <div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>TARGET ALLOCATION</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--signal-cobalt)', fontFamily: 'var(--font-mono)' }}>
                €25,000 – €30,000
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>EQUITY OFFERED</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-titanium)', fontFamily: 'var(--font-mono)' }}>
                15.0% Common Equity
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>PRE-MONEY VALUATION</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-titanium)', fontFamily: 'var(--font-mono)' }}>
                €141,666 – €170,000
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>FOUNDER SALARY DRAW</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--signal-emerald)', fontFamily: 'var(--font-mono)' }}>
                €0 (Zero Draw)
              </div>
            </div>
          </div>
        </div>

        {/* Use of Proceeds */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '1.05rem', color: 'var(--text-titanium)', marginBottom: '14px' }}>
            Deployment of Capital (100% Asset-Backed)
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '14px 16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-titanium)' }}>
                  70% — Hardware Batches & Express Logistics
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--signal-cobalt)', fontWeight: '700' }}>
                  €17,500 – €21,000
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Purchasing batches of 80 to 100 smart solar barriers directly from the Shenzhen ODM partner with DHL Express air cargo.
              </div>
            </div>

            <div style={{ padding: '14px 16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-titanium)' }}>
                  15% — Tooling, Heavy Anchors & Forex Signage
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--signal-cobalt)', fontWeight: '700' }}>
                  €3,750 – €4,500
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Industrial rotary hammer drills, M10 stainless concrete expansion anchors, and UV-laminated Forex A4 ad plates.
              </div>
            </div>

            <div style={{ padding: '14px 16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-titanium)' }}>
                  15% — Working Capital & Payment Gateway Reserves
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--signal-amber)', fontWeight: '700' }}>
                  €3,750 – €4,500
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                In-app merchant float security reserves, server infrastructure, and contingency liquidity buffer.
              </div>
            </div>
          </div>
        </div>

        {/* Governance & Investor Protection */}
        <div style={{ marginBottom: '32px' }}>
          <h4 style={{ fontSize: '1.05rem', color: 'var(--text-titanium)', marginBottom: '12px' }}>
            Investor Rights & Information Access
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem', color: 'var(--text-slate)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--signal-emerald)', flexShrink: 0 }} />
              <span><strong>Real-Time IoT Access:</strong> Direct administrator login to live telemetry dashboard (occupancy, battery levels, revenue).</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--signal-emerald)', flexShrink: 0 }} />
              <span><strong>Monthly Financial Statements:</strong> Certified monthly P&L statements and operational KPI reports delivered on the 5th of each month.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--signal-emerald)', flexShrink: 0 }} />
              <span><strong>Pro-Rata Rights:</strong> Right to participate pro-rata in any subsequent financing round.</span>
            </li>
          </ul>
        </div>

        {/* Direct Actions */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href="mailto:contact@shtegu.app?subject=Shtegu%20Angel%20Investment%20Discussion&body=Hello%20Besmir,%20I%20reviewed%20the%20Shtegu%20briefing%20deck%20and%20would%20like%20to%20schedule%20a%20meeting%20to%20discuss%20the%20angel%20tranche."
            className="btn btn-primary"
            style={{ flex: 1, padding: '12px', fontSize: '0.925rem' }}
          >
            <Calendar size={16} />
            Confirm Direct Meeting with Founder
          </a>
          <button
            onClick={() => window.print()}
            className="btn btn-secondary"
            style={{ padding: '12px 20px', fontSize: '0.925rem' }}
          >
            <Download size={16} />
            Print Term Sheet
          </button>
        </div>
      </div>
    </div>
  );
}
