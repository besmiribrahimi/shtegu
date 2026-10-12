import React, { useState } from 'react';
import { 
  Home, 
  Car, 
  Briefcase, 
  Building, 
  Layers, 
  CheckCircle2, 
  TrendingUp
} from 'lucide-react';

export default function MonetizationMatrix() {
  const [activeTier, setActiveTier] = useState(0);

  const tiers = [
    {
      id: 'residential',
      name: 'Residential Host',
      target: 'Private Driveways & Courtyards (Pejton, Qendër)',
      pricing: 'Free Install + 70/30 Rev-Share',
      icon: Home,
      accent: 'var(--signal-emerald)',
      badgeClass: 'badge-emerald',
      description: 'Homeowners monetize empty driveways while away at work between 08:30 and 16:30.',
      hostIncome: '€60 – €90 / month passive yield for homeowner',
      shteguCut: '30% platform take-rate + €18/mo Ad-Plate lease',
      mechanics: [
        'Barrier unlocks automatically into public network during working hours.',
        'Owner returns home and barrier reserves exclusively for host.',
        'Zero upfront hardware cost for host creates frictionless network onboarding.'
      ]
    },
    {
      id: 'autoparking',
      name: 'Auto-Parking Lot',
      target: 'Existing Private Surface Lots with Booths',
      pricing: '€10 / Stall / Month Flat SaaS',
      icon: Car,
      accent: 'var(--signal-cobalt)',
      badgeClass: 'badge-cobalt',
      description: 'Digitizes existing surface lots without heavy pneumatic civil infrastructure.',
      hostIncome: 'Owner eliminates €500/mo cash booth attendant & theft',
      shteguCut: '100% recurring pure software margin + 10% transaction processing',
      mechanics: [
        'Replaces physical attendants collecting paper cash with mobile app wallet.',
        'Each stall receives smart barrier or entryway control.',
        'A 15-stall surface lot produces €150/month predictable recurring MRR.'
      ]
    },
    {
      id: 'whitelist',
      name: 'B2B Whitelist Office',
      target: 'Dental Clinics, Notary Offices, Law Firms',
      pricing: '€70 / Month Flat Retainer',
      icon: Briefcase,
      accent: 'var(--signal-amber)',
      badgeClass: 'badge-amber',
      description: 'Stops commuters from stealing client spots during business hours; monetizes evenings.',
      hostIncome: 'Guaranteed customer parking by day + rev-share at night',
      shteguCut: '€70/month subscription + 30% cut of evening public turnover',
      mechanics: [
        '08:00 – 17:00: Only whitelisted client numbers/plates can lower the barrier.',
        '17:00 – 00:00: Barrier flips automatically to paid public parking.',
        'Eliminates street shouting matches in front of high-end clinics.'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise Complex',
      target: 'Commercial Towers, Private Hospitals (30+ Stalls)',
      pricing: '€300 / Month SaaS Retainer',
      icon: Building,
      accent: 'var(--signal-cobalt)',
      badgeClass: 'badge-cobalt',
      description: 'Full-scale parking fleet management platform with real-time IoT gateway integration.',
      hostIncome: 'Automated occupancy tracking, VIP allocation, and commercial billing',
      shteguCut: 'High-ticket monthly SaaS retainer with zero churn + hardware deployment margin',
      mechanics: [
        'Fixed ESP32 IoT gateways stream real-time occupancy beacons to cloud dashboard.',
        'Dynamic zone pricing, merchant validations, and executive VIP overrides.',
        'Automated digital invoicing, VAT reporting, and occupancy heatmaps.'
      ]
    }
  ];

  const currentTier = tiers[activeTier];
  const IconComponent = currentTier.icon;

  return (
    <section id="monetization" style={{ padding: '64px 0', borderTop: '1px solid var(--border-subtle)', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '840px', marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="badge badge-cobalt">
              <Layers size={14} />
              REVENUE ENGINE
            </span>
            <span className="badge badge-slate">4 MONETIZATION TIERS</span>
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '14px', color: 'var(--text-titanium)' }}>
            The 4-Tier Monetization Framework
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-slate)', lineHeight: '1.6' }}>
            Shtegu does not rely solely on variable parking commissions. We combine consumer booking fees with predictable Monthly Recurring Revenue (MRR) through B2B access control and hardware ad leasing.
          </p>
        </div>

        {/* Tier Selector Buttons */}
        <div className="tab-list" style={{ marginBottom: '28px', maxWidth: '880px', background: '#f1f5f9' }}>
          {tiers.map((tier, idx) => {
            const BtnIcon = tier.icon;
            return (
              <button
                key={tier.id}
                onClick={() => setActiveTier(idx)}
                className={`tab-btn ${activeTier === idx ? 'active' : ''}`}
              >
                <BtnIcon size={16} />
                <span>{tier.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Tier Detail Card */}
        <div className="glass-panel" style={{ padding: '32px', marginBottom: '36px', borderLeft: `4px solid ${currentTier.accent}`, background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: currentTier.accent,
                  border: '1px solid #e2e8f0'
                }}>
                  <IconComponent size={20} />
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-titanium)' }}>
                  {currentTier.name}
                </h3>
                <span className={`badge ${currentTier.badgeClass}`}>
                  {currentTier.pricing}
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                TARGET: {currentTier.target}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
                BILLING STRUCTURE
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-titanium)' }}>
                {currentTier.pricing}
              </div>
            </div>
          </div>

          <p style={{ fontSize: '1rem', color: 'var(--text-slate)', lineHeight: '1.6', marginBottom: '24px' }}>
            {currentTier.description}
          </p>

          {/* Economics comparison */}
          <div className="grid-2" style={{ gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                VALUE PROPOSITION TO CLIENT / HOST
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-titanium)' }}>
                {currentTier.hostIncome}
              </div>
            </div>

            <div style={{ padding: '16px', background: 'var(--signal-emerald-dim)', borderRadius: '10px', border: '1px solid var(--signal-emerald-border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--signal-emerald)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                SHTEGU PLATFORM TAKE
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--signal-emerald)' }}>
                {currentTier.shteguCut}
              </div>
            </div>
          </div>

          {/* Operational Mechanics Checklist */}
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '10px' }}>
              OPERATIONAL WORKFLOW:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentTier.mechanics.map((step, sIdx) => (
                <div key={sIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--text-slate)' }}>
                  <CheckCircle2 size={16} style={{ color: currentTier.accent, flexShrink: 0, marginTop: '3px' }} />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The Blended Revenue Stack Callout */}
        <div style={{ padding: '24px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <TrendingUp size={20} style={{ color: 'var(--signal-cobalt)' }} />
            <h4 style={{ fontSize: '1.05rem', color: 'var(--text-titanium)' }}>
              The Triple-Stream Asset Yield Formula
            </h4>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Every single barrier mounted on the street pulls revenue from three distinct streams simultaneously:
          </p>
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--signal-cobalt-border)',
            borderRadius: '10px',
            padding: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
            color: 'var(--text-titanium)',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.05)'
          }}>
            <span style={{ color: 'var(--signal-cobalt)', fontWeight: '700' }}>Total Stall Yield</span> = 
            <span style={{ color: '#475569' }}> [B2B SaaS / Whitelist Fee]</span> + 
            <span style={{ color: 'var(--signal-emerald)', fontWeight: '700' }}> [Driver Hourly Commission (30%)]</span> + 
            <span style={{ color: 'var(--signal-amber)', fontWeight: '700' }}> [Physical A4 Forex Ad-Plate (€18/mo)]</span>
          </div>
        </div>
      </div>
    </section>
  );
}
