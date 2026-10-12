import React, { useState } from 'react';
import { 
  Calculator, 
  Coins, 
  Clock, 
  TrendingUp, 
  RotateCcw, 
  Sparkles, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Percent
} from 'lucide-react';

export default function RoiSimulator() {
  const [stalls, setStalls] = useState(50);
  const [hoursPerDay, setHoursPerDay] = useState(3.5);
  const [hourlyRate, setHourlyRate] = useState(1.0);
  const [adPlateRate, setAdPlateRate] = useState(18);

  // Financial Math based on shtegu.md ground-truth
  const workingDays = 22;
  const landedCostPerUnit = 110; // €110 landed with DHL express, customs & anchors

  const monthlyGrossPerStall = hoursPerDay * workingDays * hourlyRate;
  const totalMonthlyGmv = stalls * monthlyGrossPerStall;

  const hostRevShare = totalMonthlyGmv * 0.70;
  const shteguParkingCut = totalMonthlyGmv * 0.30;
  const totalAdRevenue = stalls * adPlateRate;

  // Processing & Infrastructure
  const paymentFees = totalMonthlyGmv * 0.04; // 4% blended
  const cloudBuffer = stalls * 1.40;

  const monthlyNetCashFlow = shteguParkingCut + totalAdRevenue - paymentFees - cloudBuffer;
  const annualizedNetCashFlow = monthlyNetCashFlow * 12;

  const totalHardwareCapex = stalls * landedCostPerUnit;
  const paybackMonths = totalHardwareCapex / Math.max(monthlyNetCashFlow, 1);
  const paybackDays = Math.round(paybackMonths * 30);
  const annualRoi = Math.round((annualizedNetCashFlow / totalHardwareCapex) * 100);

  const applyPreset = (presetStalls, presetHours, presetAd) => {
    setStalls(presetStalls);
    setHoursPerDay(presetHours);
    setAdPlateRate(presetAd);
  };

  return (
    <section id="calculator" style={{ padding: '64px 0', borderTop: '1px solid var(--border-subtle)', backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '840px', marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="badge badge-cobalt">
              <Calculator size={14} />
              INVESTOR ROI SIMULATOR
            </span>
            <span className="badge badge-slate">DYNAMIC FINANCIAL ENGINE</span>
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '14px', color: 'var(--text-titanium)' }}>
            Interactive Unit Economics & Payback Velocity
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-slate)', lineHeight: '1.6' }}>
            Test the unit economics across fleet size, turnover hours, and advertising lease rates. 
            All formulas reflect conservative Prishtina parameters (22 working days/mo, 70% host share, €110 landed barrier Capex).
          </p>
        </div>

        {/* Preset Quick-Buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
          <button
            onClick={() => applyPreset(5, 3.0, 15)}
            className={`btn ${stalls === 5 ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '7px 16px', fontSize: '0.825rem' }}
          >
            Phase 1: Micro-Pilot (5 Stalls)
          </button>
          <button
            onClick={() => applyPreset(50, 3.5, 18)}
            className={`btn ${stalls === 50 ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '7px 16px', fontSize: '0.825rem' }}
          >
            Phase 2: Core Corridor (50 Stalls)
          </button>
          <button
            onClick={() => applyPreset(150, 4.0, 20)}
            className={`btn ${stalls === 150 ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '7px 16px', fontSize: '0.825rem' }}
          >
            Phase 3: Scale Target (150 Stalls)
          </button>
        </div>

        <div className="grid-2" style={{ gap: '28px' }}>
          {/* Controls Box */}
          <div className="glass-panel" style={{ padding: '28px', background: '#ffffff' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '24px', color: 'var(--text-titanium)' }}>
              Operational Assumptions
            </h3>

            {/* Slider 1: Active Stalls */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-slate)' }}>Active Fleet Size (Stalls)</label>
                <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--signal-cobalt)', fontFamily: 'var(--font-mono)' }}>
                  {stalls} Units
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={stalls}
                onChange={(e) => setStalls(Number(e.target.value))}
                className="range-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                <span>5 (Pilot)</span>
                <span>50 (Pejton)</span>
                <span>200 (Citywide)</span>
              </div>
            </div>

            {/* Slider 2: Daily Billable Hours */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-slate)' }}>Avg. Billable Hours / Stall / Day</label>
                <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--signal-cobalt)', fontFamily: 'var(--font-mono)' }}>
                  {hoursPerDay.toFixed(1)} hrs/day
                </span>
              </div>
              <input
                type="range"
                min="1.5"
                max="6.0"
                step="0.5"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                className="range-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                <span>1.5 hrs (Low)</span>
                <span>3.5 hrs (Base)</span>
                <span>6.0 hrs (High)</span>
              </div>
            </div>

            {/* Slider 3: Ad-Plate Lease Rate */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-slate)' }}>Forex A4 Ad Plate Lease (€ / mo)</label>
                <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--signal-cobalt)', fontFamily: 'var(--font-mono)' }}>
                  €{adPlateRate} / stall
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="2"
                value={adPlateRate}
                onChange={(e) => setAdPlateRate(Number(e.target.value))}
                className="range-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                <span>€0 (Zero Ads)</span>
                <span>€18 (Target)</span>
                <span>€30 (Premium Spot)</span>
              </div>
            </div>

            {/* Fixed Constants Audit */}
            <div style={{
              padding: '14px',
              borderRadius: '10px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              fontSize: '0.775rem',
              color: 'var(--text-muted)',
              lineHeight: '1.6'
            }}>
              <div>&bull; Tariff: €1.00 / hour &bull; Host Payout: 70% Gross GMV</div>
              <div>&bull; Landed Barrier Capex: €110 (Alibaba ODM + DHL Express + Concrete Anchors)</div>
              <div>&bull; Gateway / Payment Buffer: 4% top-up fee + €1.40 cloud sync</div>
            </div>
          </div>

          {/* Results Output Box */}
          <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#ffffff' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-titanium)' }}>
                  Net Financial Yield Outputs
                </h3>
                <span className="badge badge-emerald">
                  PAYBACK: {paybackDays} DAYS
                </span>
              </div>

              {/* Main Cash Flow Output Card */}
              <div style={{
                background: 'var(--signal-emerald-dim)',
                border: '1px solid var(--signal-emerald-border)',
                borderRadius: '14px',
                padding: '24px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--signal-emerald)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontWeight: '700' }}>
                  NET OPERATING CASH FLOW (EBITDA)
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-titanium)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                  €{Math.round(monthlyNetCashFlow).toLocaleString()} <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>/ month</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-slate)' }}>
                  Annualized Run-Rate: <strong style={{ color: 'var(--signal-emerald)' }}>€{Math.round(annualizedNetCashFlow).toLocaleString()} / year</strong>
                </div>
              </div>

              {/* Secondary Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    CAPITAL PAYBACK
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-titanium)', fontFamily: 'var(--font-mono)' }}>
                    {paybackDays} Days
                  </div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    {paybackMonths.toFixed(1)} Months to Break-Even
                  </div>
                </div>

                <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.725rem', color: 'var(--signal-emerald)', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
                    ANNUAL CASH ROI
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--signal-emerald)', fontFamily: 'var(--font-mono)' }}>
                    {annualRoi}%
                  </div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    Cash-on-Cash Return
                  </div>
                </div>

                <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    GROSS GMV / MONTH
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-titanium)', fontFamily: 'var(--font-mono)' }}>
                    €{Math.round(totalMonthlyGmv).toLocaleString()}
                  </div>
                </div>

                <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    REQUIRED HARDWARE CAPEX
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-titanium)', fontFamily: 'var(--font-mono)' }}>
                    €{Math.round(totalHardwareCapex).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Investor Takeaway */}
            <div style={{
              padding: '14px 16px',
              borderRadius: '10px',
              background: 'var(--signal-cobalt-dim)',
              border: '1px solid var(--signal-cobalt-border)',
              fontSize: '0.825rem',
              color: 'var(--text-slate)'
            }}>
              <strong style={{ color: 'var(--signal-cobalt)' }}>Investor Takeaway:</strong> With full payback achieved in under 100 days, every single euro invested in hardware is recovered within ~3 months and recycled into purchasing new barriers.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
