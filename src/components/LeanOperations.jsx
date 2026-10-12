import React from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  MapPin, 
  Hammer, 
  Smartphone, 
  Flame, 
  Users, 
  TrendingUp, 
  Building2, 
  Share2 
} from 'lucide-react';

export default function LeanOperations() {
  return (
    <section id="operations" style={{ padding: '64px 0', borderTop: '1px solid var(--border-subtle)', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '840px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="badge badge-cobalt">
              <Flame size={14} />
              LEAN EXECUTION PLAYBOOK
            </span>
            <span className="badge badge-slate">ZERO FIXED OVERHEAD</span>
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '14px', color: 'var(--text-titanium)' }}>
            The Zero-Burn Advantage & Prishtina Rollout
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-slate)', lineHeight: '1.6' }}>
            Traditional startups collapse by signing €600/month glass office leases and hiring full-time staff before establishing cash flow. 
            Shtegu operates with near-zero fixed overhead: every euro of capital goes straight into revenue-generating hardware.
          </p>
        </div>

        {/* Audit Table: Traditional vs Shtegu Lean */}
        <div className="glass-panel" style={{ padding: '28px', marginBottom: '36px', background: '#ffffff' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-titanium)', marginBottom: '20px' }}>
            Comparative Monthly Burn Audit
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  <th style={{ padding: '14px 16px' }}>OPERATIONAL EXPENSE</th>
                  <th style={{ padding: '14px 16px' }}>TRADITIONAL STARTUP</th>
                  <th style={{ padding: '14px 16px', color: 'var(--signal-cobalt)' }}>SHTEGU LEAN MODEL</th>
                  <th style={{ padding: '14px 16px' }}>STRATEGIC RATIONALE</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--text-slate)' }}>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: 'var(--text-titanium)' }}>Commercial Office Lease</td>
                  <td style={{ padding: '14px 16px', color: 'var(--signal-crimson)', fontWeight: '600' }}>€600 / month</td>
                  <td style={{ padding: '14px 16px', color: 'var(--signal-cobalt)', fontWeight: '700' }}>€0 (Remote / Field Ops)</td>
                  <td style={{ padding: '14px 16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Inventory in vehicle/garage. Saves €7,200/yr.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: 'var(--text-titanium)' }}>Permanent Staff Payroll</td>
                  <td style={{ padding: '14px 16px', color: 'var(--signal-crimson)', fontWeight: '600' }}>€1,800 / mo (3 staff)</td>
                  <td style={{ padding: '14px 16px', color: 'var(--signal-cobalt)', fontWeight: '700' }}>€0 (Founder Tech Equity)</td>
                  <td style={{ padding: '14px 16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>App, backend & BLE protocol developed directly by founder.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: 'var(--text-titanium)' }}>Installation Labor</td>
                  <td style={{ padding: '14px 16px' }}>Full-time tech contract</td>
                  <td style={{ padding: '14px 16px', color: 'var(--signal-cobalt)', fontWeight: '700' }}>€15 / stall (Piece-rate)</td>
                  <td style={{ padding: '14px 16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hammer drill piece-work. Zero payroll liability when idle.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: 'var(--text-titanium)' }}>Total Fixed Monthly Burn</td>
                  <td style={{ padding: '14px 16px', color: 'var(--signal-crimson)', fontWeight: '700' }}>€2,400+ / month</td>
                  <td style={{ padding: '14px 16px', color: 'var(--signal-cobalt)', fontWeight: '700' }}>~€50 / month (Hosting/DB)</td>
                  <td style={{ padding: '14px 16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Can survive rainy weeks or holidays with zero financial strain.</td>
                </tr>
                <tr>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: 'var(--text-titanium)' }}>Break-Even Pressure</td>
                  <td style={{ padding: '14px 16px', color: 'var(--signal-crimson)' }}>Needs 100+ stalls to survive</td>
                  <td style={{ padding: '14px 16px', color: 'var(--signal-emerald)', fontWeight: '700' }}>Profitable on Spot #1</td>
                  <td style={{ padding: '14px 16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Immediate operating cash flow from first deployment.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Two Column: Launch Corridors & Viral GTM */}
        <div className="grid-2" style={{ gap: '28px' }}>
          {/* Launch Corridors */}
          <div className="glass-panel" style={{ padding: '28px', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'var(--signal-cobalt-dim)',
                border: '1px solid var(--signal-cobalt-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--signal-cobalt)'
              }}>
                <MapPin size={18} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-titanium)' }}>
                Target Launch Corridors (Prishtina)
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ padding: '14px 16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ color: 'var(--text-titanium)', fontSize: '0.925rem' }}>1. Pejton (Primary Hub)</strong>
                  <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>IMMEDIATE PILOT</span>
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-slate)' }}>
                  Dense cul-de-sacs, international organizations, and medical centers. High parking deficit where residents possess private courtyard gates suitable for 5-stall cluster pilots.
                </div>
              </div>

              <div style={{ padding: '14px 16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ color: 'var(--text-titanium)', fontSize: '0.925rem' }}>2. Qendër & Sheshi Corridors</strong>
                  <span className="badge badge-cobalt" style={{ fontSize: '0.65rem' }}>B2B WHITELIST</span>
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-slate)' }}>
                  Commercial banks, notary bureaus, and law chambers willing to pay €70/month flat retainer to protect reserved visitor stalls by day while monetizing evening public parking.
                </div>
              </div>

              <div style={{ padding: '14px 16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ color: 'var(--text-titanium)', fontSize: '0.925rem' }}>3. Qafa & Ulpianë</strong>
                  <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>COMMERCIAL EXPANSION</span>
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-slate)' }}>
                  High-turnover residential-commercial zones with heavy daily hospital & university traffic congestion.
                </div>
              </div>
            </div>
          </div>

          {/* Viral Distribution */}
          <div className="glass-panel" style={{ padding: '28px', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'var(--signal-amber-dim)',
                border: '1px solid var(--signal-amber-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--signal-amber)'
              }}>
                <Share2 size={18} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-titanium)' }}>
                Low-CAC Creator Distribution
              </h3>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-slate)', lineHeight: '1.6', marginBottom: '16px' }}>
              Instead of wasting capital on low-conversion Google/Meta ads, Shtegu partners with high-affinity local creators who live and create content around Prishtina street friction.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ padding: '12px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-titanium)' }}>
                  Local Culture Creators (e.g. Burim Pacolli, Don Zhugani)
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Averaging 100k+ organic views per clip. Framing Prishtina parking misery as a relatable cultural reality that Shtegu solves in 1 tap.
                </div>
              </div>

              <div style={{ padding: '12px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-titanium)' }}>
                  Prepaid Wallet Referral Credit Codes
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Codes like <code style={{ color: 'var(--signal-cobalt)', fontWeight: 'bold' }}>BURIM</code> or <code style={{ color: 'var(--signal-cobalt)', fontWeight: 'bold' }}>DONI</code> grant €2 in initial parking float, driving verified installs at an effective CAC under <strong>€0.25 per active user</strong>.
                </div>
              </div>
            </div>

            <div style={{
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'var(--signal-cobalt-dim)',
              border: '1px solid var(--signal-cobalt-border)',
              fontSize: '0.825rem',
              color: 'var(--text-slate)'
            }}>
              <strong style={{ color: 'var(--signal-cobalt)' }}>Capital Flywheel:</strong> 100% of cash generated by existing barriers is recycled immediately to order the next batch from the factory.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
