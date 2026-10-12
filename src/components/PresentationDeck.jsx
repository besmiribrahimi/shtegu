import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  FileText, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  Shield, 
  TrendingUp, 
  Clock, 
  Coins, 
  Layers, 
  Cpu, 
  Calendar, 
  Building2, 
  MapPin, 
  ArrowRight,
  Flame,
  Volume2
} from 'lucide-react';
import HardwareInspector from './HardwareInspector';
import MonetizationMatrix from './MonetizationMatrix';
import RoiSimulator from './RoiSimulator';
import LeanOperations from './LeanOperations';
import FinancialProjections from './FinancialProjections';
import TermSheetModal from './TermSheetModal';

export default function PresentationDeck({ onExitPresentation, onOpenMemo }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [isTermSheetOpen, setIsTermSheetOpen] = useState(false);

  const totalSlides = 7;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          document.exitFullscreen?.().catch(() => {});
          setIsFullscreen(false);
        } else {
          onExitPresentation();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, onExitPresentation]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const slidesData = [
    {
      title: 'The Investment Thesis',
      subtitle: 'Converting Trapped Urban Asphalt into Predictable Cash Flow in Prishtina',
      notes: 'Z. Driton: Prishtina ka krizë kronike parkingu në Pejton dhe Qendër ku humben 30-45 minuta. Në anën tjetër, qindra hyrje private dhe oborre rrinë bosh. Shtegu nuk është thjesht një app: është rrjet fizik me barriera inteligjente solare BLE që monetizon këtë asfalt.',
    },
    {
      title: 'Physical Asset & Nordic UART BLE',
      subtitle: 'Factory-Vetted ODM Smart Barrier with Zero Cellular Overhead',
      notes: 'Hardware është verifikuar direkt me fabrikën ODM: protokoll Nordic UART NUS 6E400001, bateri për -15°C dhe panel solar. Telefoni i shoferit shërben si urë (Phone-as-Gateway), duke shmangur koston e kartelave 4G për çdo vend.',
    },
    {
      title: 'The 4-Tier Revenue Framework',
      subtitle: 'Hybrid B2B SaaS + Micro-Parking Marketplace + Ad Billboards',
      notes: 'Nuk varemi vetëm nga shoferët me orë: kemi 4 nivele: Hostet private (70/30), parkingjet ekzistuese (€10/vend), zyrat/klinikat Whitelist (€70/muaj), dhe komplekset afariste (€300/muaj). Plus pllaka A4 e reklamës (€18/muaj) garanton dyshemenë financiare.',
    },
    {
      title: 'Unit Economics & 92-Day Payback',
      subtitle: 'Dynamic Financial Yield & Break-Even Simulation per Stall',
      notes: 'Me kosto totale ~€110 për barrierë dhe fitim neto të pastër €35.90 në muaj, investimi për çdo copë kthehet plotësisht brenda 92 ditëve (~3 muaj). Pas muajit të tretë, barrierat prodhojnë cash flow të pastër.',
    },
    {
      title: 'The Zero-Burn Operating Model',
      subtitle: 'Eliminating Fixed Overhead & Scaling via Gig Labor',
      notes: 'Modeli ynë ka €0 qira zyre dhe €0 paga fikse në vitin e parë. Instalimet bëhen me punëtorë të pavarur me €15 për barrierë të montuar me hilt. Nëse bie shi ose ka festë, shpenzimet fikse janë vetëm serveri (~€50).',
    },
    {
      title: '18-Month Scaling Roadmap',
      subtitle: 'July 2027 Target: 150 Active Units & €81,000+ Annual EBITDA Run-Rate',
      notes: 'Nga 5 njësi pilot në Pejton kalojmë në 50 dhe pastaj 150 barriera në korridoret kryesore. Me 150 vende arrijmë €6,800+ fitim operativ neto në muaj (~€81k ARR) me vlerësim tregu €650k–€1M.',
    },
    {
      title: 'The Angel Term Sheet',
      subtitle: '€25,000 – €30,000 Tranche for 15.0% Common Equity',
      notes: 'Kërkesa jonë është €25k–€30k për 15% aksione. 100% e kapitalit shkon për inventar hardueri (80-100 barriera me DHL express) dhe vegla montimi. Paga e themeluesit: €0. Jemi të gatshëm të nënshkruajmë.',
    }
  ];

  return (
    <div className="presentation-container">
      {/* Top Slide Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: '#e2e8f0',
        zIndex: 100
      }}>
        <div style={{
          height: '100%',
          width: `${((currentSlide + 1) / totalSlides) * 100}%`,
          background: 'var(--signal-cobalt)',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }} />
      </div>

      {/* Presentation Top Control Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 90,
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e2e8f0',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Left: Brand & Slide Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'var(--signal-cobalt-dim)',
            border: '1px solid var(--signal-cobalt-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--signal-cobalt)'
          }}>
            <Shield size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-titanium)' }}>
                SHTEGU
              </span>
              <span className="badge badge-cobalt" style={{ padding: '2px 8px', fontSize: '0.65rem' }}>
                PRESENTATION MODE
              </span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--signal-cobalt)', fontFamily: 'var(--font-mono)', fontWeight: '600' }}>
              SLIDE {String(currentSlide + 1).padStart(2, '0')} OF {String(totalSlides).padStart(2, '0')} &bull; {slidesData[currentSlide].title.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`btn ${showNotes ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '6px 12px', fontSize: '0.75rem' }}
            title="Toggle Presenter Talking Points"
          >
            <FileText size={14} />
            {showNotes ? 'Hide Talking Points' : 'Presenter Notes'}
          </button>

          <button
            onClick={() => setIsTermSheetOpen(true)}
            className="btn btn-emerald"
            style={{ padding: '6px 12px', fontSize: '0.75rem' }}
          >
            Term Sheet
          </button>

          <button
            onClick={toggleFullscreen}
            className="btn btn-ghost"
            style={{ padding: '6px' }}
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          <button
            onClick={onExitPresentation}
            className="btn btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.75rem' }}
          >
            Exit to Document View
          </button>
        </div>
      </header>

      {/* Presenter Notes Bar (Collapsible) */}
      {showNotes && (
        <div style={{
          background: '#eff6ff',
          borderBottom: '1px solid var(--signal-cobalt-border)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '0.825rem',
          color: '#1e3a8a',
          animation: 'slideFadeIn 0.2s ease-out'
        }}>
          <Sparkles size={16} style={{ color: 'var(--signal-cobalt)', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <strong>Talking Points for Driton:</strong> {slidesData[currentSlide].notes}
          </div>
        </div>
      )}

      {/* Slide Presentation Area */}
      <div className="slide-content-area">
        <div className="slide-card-wrapper" key={currentSlide}>
          {/* Slide 0: Executive Thesis */}
          {currentSlide === 0 && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span className="badge badge-cobalt">SLIDE 01 &bull; CORE THESIS</span>
                  <span className="badge badge-emerald">PRISHTINA OPPORTUNITY</span>
                </div>
                <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--text-titanium)', lineHeight: '1.2', marginBottom: '14px' }}>
                  Converting Trapped Urban Asphalt into Predictable Cash Flow.
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-slate)', maxWidth: '900px', lineHeight: '1.6' }}>
                  Prishtina core commercial corridors (Pejton, Qendër, Qafa) suffer from 20–45 minute search delays. 
                  Meanwhile, hundreds of private driveways sit completely vacant during business hours. 
                  <strong> Shtegu</strong> deploys autonomous, solar-powered BLE smart barriers that transform private asphalt into an asset-backed parking marketplace.
                </p>
              </div>

              <div className="grid-4" style={{ marginBottom: '32px' }}>
                <div className="metric-card" style={{ borderLeft: '4px solid var(--signal-emerald)' }}>
                  <div className="metric-label">
                    <Clock size={14} style={{ color: 'var(--signal-emerald)' }} />
                    Payback Velocity
                  </div>
                  <div className="metric-value" style={{ color: 'var(--signal-emerald)' }}>
                    92 Days
                  </div>
                  <div className="metric-subtitle">
                    Landed Capex (~€110) recouped in ~3.06 months
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-label">
                    <Coins size={14} style={{ color: 'var(--signal-cobalt)' }} />
                    Net FCF / Stall / Mo
                  </div>
                  <div className="metric-value">
                    €35.90
                  </div>
                  <div className="metric-subtitle">
                    Net cash flow after 70% host share & ops
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-label">
                    <TrendingUp size={14} style={{ color: 'var(--signal-amber)' }} />
                    Target Angel Tranche
                  </div>
                  <div className="metric-value">
                    €25k – €30k
                  </div>
                  <div className="metric-subtitle">
                    15.0% Common Equity &bull; 100% hardware inventory
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-label">
                    <Flame size={14} style={{ color: 'var(--text-muted)' }} />
                    Monthly Fixed Burn
                  </div>
                  <div className="metric-value">
                    €0
                  </div>
                  <div className="metric-subtitle">
                    Zero office rent &bull; Zero founder salary draw
                  </div>
                </div>
              </div>

              <div className="grid-2" style={{ gap: '20px' }}>
                <div className="glass-panel" style={{ padding: '24px', borderLeft: '3px solid var(--signal-crimson)' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-titanium)', marginBottom: '10px' }}>
                    The Market Pain in Prishtina
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
                    <li>&bull; 20–45 mins wasted looking for parking in Pejton & Qendër.</li>
                    <li>&bull; Private driveways sit locked & unmonetized from 08:30 to 16:30.</li>
                    <li>&bull; Manual lots suffer from booth labor overhead and paper cash theft.</li>
                  </ul>
                </div>

                <div className="glass-panel" style={{ padding: '24px', borderLeft: '3px solid var(--signal-emerald)' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-titanium)', marginBottom: '10px' }}>
                    The Shtegu Solution
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={15} style={{ color: 'var(--signal-emerald)' }} />
                      Surface-mounted anchors: Zero municipal trenching or grid power.
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={15} style={{ color: 'var(--signal-emerald)' }} />
                      "Phone-as-Gateway": Smartphone bridges BLE commands locally.
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={15} style={{ color: 'var(--signal-emerald)' }} />
                      Prepaid wallet blocks (€5/€10/€15) provide upfront float.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Slide 1: Hardware & IoT Inspector */}
          {currentSlide === 1 && (
            <div>
              <HardwareInspector />
            </div>
          )}

          {/* Slide 2: Monetization Matrix */}
          {currentSlide === 2 && (
            <div>
              <MonetizationMatrix />
            </div>
          )}

          {/* Slide 3: ROI Simulator */}
          {currentSlide === 3 && (
            <div>
              <RoiSimulator />
            </div>
          )}

          {/* Slide 4: Lean Operations */}
          {currentSlide === 4 && (
            <div>
              <LeanOperations />
            </div>
          )}

          {/* Slide 5: Projections & Scale */}
          {currentSlide === 5 && (
            <div>
              <FinancialProjections onOpenTermSheet={() => setIsTermSheetOpen(true)} />
            </div>
          )}

          {/* Slide 6: Term Sheet */}
          {currentSlide === 6 && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span className="badge badge-cobalt">SLIDE 07 &bull; THE OFFER</span>
                  <span className="badge badge-emerald">SERIES ANGEL TRANCHE</span>
                </div>
                <h1 style={{ fontSize: '2.4rem', color: 'var(--text-titanium)', lineHeight: '1.2', marginBottom: '12px' }}>
                  Series Angel Investment Term Sheet
                </h1>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-slate)', maxWidth: '850px' }}>
                  We are offering <strong>15.0% Common Equity</strong> for an anchor angel allocation of <strong>€25,000 – €30,000</strong>. 
                  100% of proceeds are committed to hardware inventory, logistics, and installation tooling.
                </p>
              </div>

              <div style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.08)',
                marginBottom: '28px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>TARGET CAPITAL</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--signal-cobalt)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                      €25k – €30k
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>Angel Tranche</div>
                  </div>

                  <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>EQUITY OFFERED</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-titanium)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                      15.0%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>Common Equity</div>
                  </div>

                  <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>PRE-MONEY VALUATION</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-titanium)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                      ~€170,000
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>Attractive entry point</div>
                  </div>

                  <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--signal-emerald)', fontFamily: 'var(--font-mono)' }}>FOUNDER SALARY</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--signal-emerald)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                      €0
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>100% Cash into Hardware</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setIsTermSheetOpen(true)}
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '12px' }}
                  >
                    Open Complete Term Sheet Document
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={onOpenMemo}
                    className="btn btn-secondary"
                    style={{ padding: '12px 20px' }}
                  >
                    <FileText size={16} />
                    View Executive Memo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Presentation Control Dock at Bottom */}
      <div style={{
        position: 'sticky',
        bottom: '20px',
        alignSelf: 'center',
        background: '#ffffff',
        border: '1px solid #cbd5e1',
        borderRadius: '9999px',
        padding: '6px 14px',
        boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.12)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 90
      }}>
        <button
          onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
          disabled={currentSlide === 0}
          className="btn btn-ghost"
          style={{ padding: '6px 10px', borderRadius: '9999px', opacity: currentSlide === 0 ? 0.4 : 1 }}
          title="Previous slide (Left Arrow)"
        >
          <ChevronLeft size={18} />
          <span>Prev</span>
        </button>

        {/* Slide Dots / Quick Jumper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {slidesData.map((_, sIdx) => (
            <button
              key={sIdx}
              onClick={() => setCurrentSlide(sIdx)}
              style={{
                width: currentSlide === sIdx ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: currentSlide === sIdx ? 'var(--signal-cobalt)' : '#cbd5e1',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              title={`Jump to slide ${sIdx + 1}: ${slidesData[sIdx].title}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1))}
          disabled={currentSlide === totalSlides - 1}
          className="btn btn-primary"
          style={{ padding: '6px 14px', borderRadius: '9999px', opacity: currentSlide === totalSlides - 1 ? 0.4 : 1 }}
          title="Next slide (Right Arrow / Space)"
        >
          <span>Next</span>
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Modals */}
      <TermSheetModal
        isOpen={isTermSheetOpen}
        onClose={() => setIsTermSheetOpen(false)}
      />
    </div>
  );
}
