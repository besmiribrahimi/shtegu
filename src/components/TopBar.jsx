import React from 'react';
import { Printer, Maximize2, Minimize2, Download, Lock } from 'lucide-react';

export default function TopBar({ activeMode, onModeChange, currentSlide, totalSlides, isFullscreen, onToggleFullscreen, lang, onLangChange, onLock }) {
  const isSq = lang === 'sq';

  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '1px solid var(--border-light)',
      padding: '12px 24px',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{
        maxWidth: '1140px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Brand & Mascot Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src="/cat_logo_clean.jpg"
            alt="Shtegu Logo"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1.5px solid #e2e8f0'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: '800', fontSize: '15px', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                SHTEGU
              </span>
              <span style={{ color: 'var(--border-dark)' }}>/</span>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {isSq ? 'PREZANTIMI PËR INVESTITORIN' : 'INVESTOR BRIEFING'}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '1px' }}>
              {isSq ? 'Përgatitur për Driton Hapçiu • Piloti Prishtinë 2026' : 'Prepared for Driton Hapçiu • Prishtina Pilot 2026'}
            </div>
          </div>
        </div>

        {/* Center / Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Language Switcher */}
          <div style={{
            display: 'flex',
            background: 'var(--bg-subtle)',
            padding: '3px',
            borderRadius: '6px',
            border: '1px solid var(--border-light)'
          }}>
            <button
              onClick={() => onLangChange('sq')}
              style={{
                border: 'none',
                padding: '4px 10px',
                fontSize: '11.5px',
                fontFamily: 'var(--font-mono)',
                fontWeight: isSq ? '700' : '500',
                borderRadius: '4px',
                cursor: 'pointer',
                background: isSq ? 'var(--accent-blue)' : 'transparent',
                color: isSq ? '#ffffff' : 'var(--text-muted)',
                boxShadow: isSq ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.15s ease'
              }}
              title="Shqip (Albanian)"
            >
              AL
            </button>
            <button
              onClick={() => onLangChange('en')}
              style={{
                border: 'none',
                padding: '4px 10px',
                fontSize: '11.5px',
                fontFamily: 'var(--font-mono)',
                fontWeight: !isSq ? '700' : '500',
                borderRadius: '4px',
                cursor: 'pointer',
                background: !isSq ? 'var(--accent-blue)' : 'transparent',
                color: !isSq ? '#ffffff' : 'var(--text-muted)',
                boxShadow: !isSq ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.15s ease'
              }}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Mode Switcher */}
          <div style={{
            display: 'flex',
            background: 'var(--bg-subtle)',
            padding: '3px',
            borderRadius: '6px',
            border: '1px solid var(--border-light)'
          }}>
            <button
              onClick={() => onModeChange('slides')}
              style={{
                border: 'none',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: '600',
                borderRadius: '4px',
                cursor: 'pointer',
                background: activeMode === 'slides' ? '#ffffff' : 'transparent',
                color: activeMode === 'slides' ? 'var(--text-primary)' : 'var(--text-muted)',
                boxShadow: activeMode === 'slides' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              {isSq ? 'Sllajdet' : 'Slides'} {activeMode === 'slides' && `(${currentSlide + 1}/${totalSlides})`}
            </button>
            <button
              onClick={() => onModeChange('memo')}
              style={{
                border: 'none',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: '600',
                borderRadius: '4px',
                cursor: 'pointer',
                background: activeMode === 'memo' ? '#ffffff' : 'transparent',
                color: activeMode === 'memo' ? 'var(--text-primary)' : 'var(--text-muted)',
                boxShadow: activeMode === 'memo' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              {isSq ? 'Memorandumi' : 'Executive Memo'}
            </button>
            <button
              onClick={() => onModeChange('app')}
              style={{
                border: 'none',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: '700',
                borderRadius: '4px',
                cursor: 'pointer',
                background: activeMode === 'app' ? '#0B0B0D' : 'transparent',
                color: activeMode === 'app' ? '#FFB703' : 'var(--text-muted)',
                boxShadow: activeMode === 'app' ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
                border: activeMode === 'app' ? '1px solid #FFB703' : '1px solid transparent'
              }}
            >
              📱 {isSq ? 'Prototipi Android' : 'Android Prototype'}
            </button>
            <button
              onClick={() => onModeChange('map')}
              style={{
                border: 'none',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: '700',
                borderRadius: '4px',
                cursor: 'pointer',
                background: activeMode === 'map' ? '#0B0B0D' : 'transparent',
                color: activeMode === 'map' ? '#10B981' : 'var(--text-muted)',
                boxShadow: activeMode === 'map' ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
                border: activeMode === 'map' ? '1px solid #10B981' : '1px solid transparent'
              }}
            >
              🗺️ {isSq ? 'Harta e Rrjetit' : 'Network Map'}
            </button>
          </div>

          {/* Fullscreen Button */}
          {activeMode === 'slides' && (
            <button
              onClick={onToggleFullscreen}
              className="exec-btn"
              style={{ padding: '6px 12px', fontSize: '12px' }}
              title="Toggle Fullscreen (Key: F)"
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              {isFullscreen ? (isSq ? 'Dil nga Ekrani Plotë' : 'Exit Full Screen') : (isSq ? 'Ekran i Plotë' : 'Full Screen')}
            </button>
          )}

          <a
            href={isSq ? "/Shtegu_Investor_Deck_SQ.pptx" : "/Shtegu_Investor_Deck_EN.pptx"}
            download={isSq ? "Shtegu_Investor_Deck_SQ.pptx" : "Shtegu_Investor_Deck_EN.pptx"}
            className="exec-btn"
            style={{ padding: '6px 12px', fontSize: '12px', textDecoration: 'none' }}
            title={isSq ? 'Shkarko Prezantimin në PowerPoint (.pptx)' : 'Download PowerPoint Presentation (.pptx)'}
          >
            <Download size={14} />
            {isSq ? 'Shkarko PPTX' : 'Export PPTX'}
          </a>

          <button
            onClick={() => window.print()}
            className="exec-btn"
            style={{ padding: '6px 12px', fontSize: '12px' }}
            title={isSq ? 'Printo ose Ruaj si PDF' : 'Print or Save as PDF'}
          >
            <Printer size={14} />
            {isSq ? 'Printo / PDF' : 'Print / PDF'}
          </button>

          {onLock && (
            <button
              onClick={onLock}
              className="exec-btn"
              style={{ padding: '6px 12px', fontSize: '12px', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
              title={isSq ? 'Kyç platformën / Dil' : 'Lock Platform / Logout'}
            >
              <Lock size={13} />
              {isSq ? 'Kyç' : 'Lock'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
