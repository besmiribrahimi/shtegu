import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  Coins, 
  ShieldCheck, 
  Layers, 
  ArrowUpRight, 
  Car, 
  CheckCircle2, 
  Radio,
  MonitorPlay,
  FileText
} from 'lucide-react';

export default function HeroSection({ onOpenTermSheet, onOpenMemo, onLaunchPresentation }) {
  return (
    <section id="thesis" style={{ paddingTop: '56px', paddingBottom: '64px', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Strategic Header Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <span className="badge badge-cobalt">
            <span className="pulse-dot pulse-dot-cobalt" />
            LIVE INVESTMENT PROPOSAL
          </span>
          <span className="badge badge-slate">
            PRISHTINA PILOT &bull; SHTEGU.APP
          </span>
        </div>

        {/* Main Headline */}
        <div style={{ maxWidth: '940px', marginBottom: '36px' }}>
          <h1 style={{ 
            fontSize: 'clamp(2.3rem, 4.5vw, 3.5rem)', 
            fontWeight: '800', 
            letterSpacing: '-0.035em', 
            lineHeight: '1.14',
            color: 'var(--text-titanium)',
            marginBottom: '18px'
          }}>
            Converting Trapped Urban Asphalt into Predictable Cash Flow.
          </h1>
          <p style={{ 
            fontSize: '1.15rem', 
            color: 'var(--text-slate)', 
            lineHeight: '1.6', 
            maxWidth: '840px' 
          }}>
            In Prishtina, commercial sectors (Pejton, Qendër, Qafa) suffer severe 20–45 minute parking bottlenecks, while hundreds of private driveways sit completely empty. 
            <strong style={{ color: 'var(--signal-cobalt)' }}> Shtegu</strong> installs autonomous, solar-powered, BLE-controlled smart barriers that turn vacant private asphalt into high-margin micro-parking infrastructure.
          </p>
        </div>

        {/* High-Impact Executive Metric Cards */}
        <div className="grid-4" style={{ marginBottom: '48px' }}>
          <div className="metric-card" style={{ borderLeft: '4px solid var(--signal-emerald)' }}>
            <div className="metric-label">
              <Clock size={14} style={{ color: 'var(--signal-emerald)' }} />
              Payback Velocity
            </div>
            <div className="metric-value" style={{ color: 'var(--signal-emerald)' }}>
              92 Days
            </div>
            <div className="metric-subtitle">
              Landed cost (~€110) recouped in ~3.06 months
            </div>
          </div>

          <div className="metric-card" style={{ borderLeft: '4px solid var(--signal-cobalt)' }}>
            <div className="metric-label">
              <Coins size={14} style={{ color: 'var(--signal-cobalt)' }} />
              Net FCF / Stall / Mo
            </div>
            <div className="metric-value" style={{ color: 'var(--signal-cobalt)' }}>
              €35.90
            </div>
            <div className="metric-subtitle">
              Net free cash flow after 70% host share & ops
            </div>
          </div>

          <div className="metric-card" style={{ borderLeft: '4px solid var(--signal-amber)' }}>
            <div className="metric-label">
              <TrendingUp size={14} style={{ color: 'var(--signal-amber)' }} />
              Target Angel Tranche
            </div>
            <div className="metric-value">
              €25k – €30k
            </div>
            <div className="metric-subtitle">
              15.0% Equity &bull; 100% deployed into hardware
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">
              <ShieldCheck size={14} style={{ color: 'var(--text-muted)' }} />
              Monthly Fixed Burn
            </div>
            <div className="metric-value">
              €0
            </div>
            <div className="metric-subtitle">
              Zero office lease &bull; Zero founder salary draw
            </div>
          </div>
        </div>

        {/* Institutional Thesis Breakdown: Problem vs Solution */}
        <div className="grid-2" style={{ gap: '24px' }}>
          {/* Problem Card */}
          <div className="glass-panel" style={{ padding: '28px', borderLeft: '4px solid var(--signal-crimson)', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'var(--signal-crimson-dim)',
                border: '1px solid var(--signal-crimson-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--signal-crimson)'
              }}>
                <Car size={18} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-titanium)' }}>
                The Prishtina Gridlock Friction
              </h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.925rem', color: 'var(--text-slate)' }}>
                <span style={{ color: 'var(--signal-crimson)', marginTop: '2px', fontWeight: 'bold' }}>&bull;</span>
                <span><strong>20 to 45 minutes</strong> lost per vehicle searching for parking in core business corridors (Pejton, Qendër, Ulpianë).</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.925rem', color: 'var(--text-slate)' }}>
                <span style={{ color: 'var(--signal-crimson)', marginTop: '2px', fontWeight: 'bold' }}>&bull;</span>
                <span><strong>Trapped Private Real Estate:</strong> Hundreds of residential driveways and private courtyards sit empty from 08:30 to 16:30 while owners are at work.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.925rem', color: 'var(--text-slate)' }}>
                <span style={{ color: 'var(--signal-crimson)', marginTop: '2px', fontWeight: 'bold' }}>&bull;</span>
                <span><strong>Cash Leakage & Attendants:</strong> Surface lots rely on manual cash booths with high labor overhead and chronic revenue loss.</span>
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div className="glass-panel" style={{ padding: '28px', borderLeft: '4px solid var(--signal-cobalt)', background: '#ffffff' }}>
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
                <Radio size={18} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-titanium)' }}>
                The Shtegu Autonomous Network
              </h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.925rem', color: 'var(--text-slate)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--signal-cobalt)', flexShrink: 0, marginTop: '3px' }} />
                <span><strong>Surface-Mounted Anchors:</strong> Zero trenching, zero electrical grid connections, zero municipal permits. Heavy concrete expansion bolts.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.925rem', color: 'var(--text-slate)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--signal-cobalt)', flexShrink: 0, marginTop: '3px' }} />
                <span><strong>Phone-as-Gateway BLE Mesh:</strong> Driver’s smartphone connects via Nordic UART BLE 5.0, eliminating expensive per-stall cellular SIM costs.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.925rem', color: 'var(--text-slate)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--signal-cobalt)', flexShrink: 0, marginTop: '3px' }} />
                <span><strong>Prepaid Wallet Float:</strong> Users prepay in blocks of €5, €10, or €15, eliminating micro-transaction fees and providing upfront float.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick CTA row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '36px', flexWrap: 'wrap' }}>
          <button onClick={onLaunchPresentation} className="btn btn-primary" style={{ padding: '12px 20px', fontSize: '0.95rem' }}>
            <MonitorPlay size={18} />
            Launch Investor Presentation Deck (Slides)
          </button>
          <button onClick={onOpenTermSheet} className="btn btn-emerald" style={{ padding: '12px 20px', fontSize: '0.95rem' }}>
            Review Angel Term Sheet
            <ArrowUpRight size={16} />
          </button>
          <a href="#calculator" className="btn btn-secondary" style={{ padding: '12px 18px', fontSize: '0.95rem' }}>
            Launch Payback Calculator
          </a>
        </div>
      </div>
    </section>
  );
}
