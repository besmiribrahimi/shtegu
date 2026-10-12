import React from 'react';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

export default function FinancialProjections({ onOpenTermSheet }) {
  return (
    <section id="projections" style={{ padding: '64px 0', borderTop: '1px solid var(--border-subtle)', backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '840px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="badge badge-cobalt">
              <Target size={14} />
              TRACTION ROADMAP
            </span>
            <span className="badge badge-slate">JULY 2027 TARGETS</span>
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '14px', color: 'var(--text-titanium)' }}>
            18-Month Scaling Roadmap & Valuation Model
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-slate)', lineHeight: '1.6' }}>
            From an initial 5-stall validation batch in Pejton to a 150-barrier autonomous citywide network generating over €81,000 in annualized net operating cash flow.
          </p>
        </div>

        {/* Phase Timeline Cards */}
        <div className="grid-3" style={{ marginBottom: '40px' }}>
          {/* Phase 1 */}
          <div className="glass-panel" style={{ padding: '26px', borderTop: '4px solid var(--signal-cobalt)', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="badge badge-cobalt">PHASE 1 &bull; Q4 2026</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>5 UNITS</span>
            </div>
            <h4 style={{ fontSize: '1.2rem', color: 'var(--text-titanium)', marginBottom: '10px' }}>
              Bench Test & Pejton Cul-de-Sac
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-slate)', lineHeight: '1.6', marginBottom: '16px' }}>
              Bench verification of Nordic UART BLE firmware, mobile app wallet top-up, and 5 physical units anchored in one private cul-de-sac in Pejton.
            </p>
            <div style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.825rem', color: 'var(--text-slate)' }}>
              <strong>Capital Required:</strong> &lt; €750 (All-in Landed)
            </div>
          </div>

          {/* Phase 2 */}
          <div className="glass-panel" style={{ padding: '26px', borderTop: '4px solid var(--signal-amber)', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="badge badge-amber">PHASE 2 &bull; Q1–Q2 2027</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>50 UNITS</span>
            </div>
            <h4 style={{ fontSize: '1.2rem', color: 'var(--text-titanium)', marginBottom: '10px' }}>
              Pejton & Qendër Commercial Core
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-slate)', lineHeight: '1.6', marginBottom: '16px' }}>
              Expansion across 25 residential driveway hosts and 10 B2B clinic/notary whitelist retainers. Activation of creator distribution (Burim Pacolli promo codes).
            </p>
            <div style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.825rem', color: 'var(--text-slate)' }}>
              <strong>Net Run-Rate:</strong> ~€1,800 / month FCF
            </div>
          </div>

          {/* Phase 3 */}
          <div className="glass-panel" style={{ padding: '26px', borderTop: '4px solid var(--signal-emerald)', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="badge badge-emerald">PHASE 3 &bull; JULY 2027</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>150 UNITS</span>
            </div>
            <h4 style={{ fontSize: '1.2rem', color: 'var(--text-titanium)', marginBottom: '10px' }}>
              Citywide Autonomous Network
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-slate)', lineHeight: '1.6', marginBottom: '16px' }}>
              Dense cluster across Pejton, Qendër, Qafa, and Ulpianë. Self-funded hardware expansion via organic cash-flow recycling.
            </p>
            <div style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.825rem', color: 'var(--text-slate)' }}>
              <strong>Net EBITDA:</strong> €6,800+ / mo (~€81k ARR)
            </div>
          </div>
        </div>

        {/* July 2027 Scale Targets Summary Board */}
        <div style={{ padding: '36px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px', boxShadow: 'var(--shadow-elevation)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--text-titanium)', marginBottom: '4px' }}>
                July 2027 Pro-Forma Metrics (150 Active Stalls)
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Based on 150 deployed barriers with organic cash flow reinvestment
              </p>
            </div>
            <div className="badge badge-emerald" style={{ padding: '6px 14px', fontSize: '0.825rem' }}>
              IMPLIED VALUATION: €650,000 – €1,000,000
            </div>
          </div>

          <div className="grid-4" style={{ gap: '16px', marginBottom: '28px' }}>
            <div style={{ padding: '18px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>GROSS DRIVER GMV</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-titanium)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                €13,680
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Per Month</div>
            </div>

            <div style={{ padding: '18px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>HOST DISTRIBUTIONS</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-titanium)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                €9,576
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Distributed to 70+ local hosts</div>
            </div>

            <div style={{ padding: '18px', background: 'var(--signal-emerald-dim)', borderRadius: '12px', border: '1px solid var(--signal-emerald-border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--signal-emerald)', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>NET CASH FLOW (EBITDA)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--signal-emerald)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                €6,800+
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--signal-emerald)' }}>Per Month (~€81,600 ARR)</div>
            </div>

            <div style={{ padding: '18px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--signal-cobalt)', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>VALUATION MULTIPLE</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--signal-cobalt)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                8x – 12x
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Annualized EBITDA multiple</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-slate)' }}>
              Angel Tranche of <strong>€25k – €30k</strong> fully finances the hardware inventory to bridge the network to self-sustaining profitability.
            </div>
            <button onClick={onOpenTermSheet} className="btn btn-emerald" style={{ padding: '10px 20px' }}>
              Review Term Sheet Terms
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
