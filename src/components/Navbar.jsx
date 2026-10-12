import React from 'react';
import { Shield, FileText, ChevronRight, Lock, MonitorPlay, Activity } from 'lucide-react';

export default function Navbar({ onOpenTermSheet, onOpenMemo, onLock, onLaunchPresentation }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid #e2e8f0',
      padding: '12px 0',
      boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'var(--signal-cobalt-dim)',
            border: '1px solid var(--signal-cobalt-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--signal-cobalt)'
          }}>
            <Shield size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--text-titanium)' }}>
                SHTEGU
              </span>
              <span className="badge badge-cobalt" style={{ padding: '2px 8px', fontSize: '0.65rem' }}>
                <span className="pulse-dot pulse-dot-cobalt" />
                SERIES ANGEL
              </span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Prishtina Autonomous Micro-Parking Network
            </div>
          </div>
        </div>

        {/* Navigation Jump Links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '20px' }} className="desktop-nav">
          <a href="#thesis" style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-slate)', textDecoration: 'none', transition: 'color 0.2s' }}>
            Thesis
          </a>
          <a href="#hardware" style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-slate)', textDecoration: 'none', transition: 'color 0.2s' }}>
            IoT Hardware
          </a>
          <a href="#monetization" style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-slate)', textDecoration: 'none', transition: 'color 0.2s' }}>
            Monetization Matrix
          </a>
          <a href="#calculator" style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-slate)', textDecoration: 'none', transition: 'color 0.2s' }}>
            Payback Simulator
          </a>
          <a href="#operations" style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-slate)', textDecoration: 'none', transition: 'color 0.2s' }}>
            Operations
          </a>
          <a href="#projections" style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-slate)', textDecoration: 'none', transition: 'color 0.2s' }}>
            Projections
          </a>
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Prominent Presentation Mode Button */}
          <button
            onClick={onLaunchPresentation}
            className="btn btn-primary"
            style={{ padding: '8px 14px', fontSize: '0.8rem', background: 'var(--signal-cobalt)' }}
            title="Start slide-by-slide presentation deck"
          >
            <MonitorPlay size={15} />
            Presentation Mode
          </button>

          <button
            onClick={onOpenMemo}
            className="btn btn-secondary"
            style={{ padding: '8px 12px', fontSize: '0.8rem' }}
          >
            <FileText size={15} />
            Memo
          </button>

          <button
            onClick={onOpenTermSheet}
            className="btn btn-emerald"
            style={{ padding: '8px 14px', fontSize: '0.8rem' }}
          >
            Term Sheet
            <ChevronRight size={15} />
          </button>

          <button
            onClick={onLock}
            className="btn btn-ghost"
            title="Lock briefing session"
            style={{ padding: '8px', color: 'var(--text-faint)' }}
          >
            <Lock size={15} />
          </button>
        </div>
      </div>
      <style>{`
        @media (min-width: 960px) {
          .desktop-nav {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
