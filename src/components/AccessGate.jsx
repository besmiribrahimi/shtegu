import React, { useState } from 'react';
import { Shield, ArrowRight, CheckCircle2, AlertCircle, KeyRound, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function AccessGate({ onUnlock, lang = 'sq', onLangChange }) {
  const [accessKey, setAccessKey] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isSq = lang === 'sq';

  const validKeys = ['SHTEGU2026', 'DRITON2026', 'ANGEL', 'PRISHTINA2026', 'BESMIR'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanKey = accessKey.trim().toUpperCase();
    if (validKeys.includes(cleanKey)) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('shtegu_authorized', 'true');
      }
      onUnlock();
    } else {
      setError(true);
    }
  };

  const handleQuickBypass = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('shtegu_authorized', 'true');
    }
    onUnlock();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      backgroundColor: '#08080A',
      backgroundImage: 'radial-gradient(circle at 50% 15%, rgba(255, 183, 3, 0.08), transparent 60%)',
      fontFamily: 'var(--font-sans)',
      color: '#E2E8F0'
    }}>
      <div style={{
        maxWidth: '460px',
        width: '100%',
        background: '#12141A',
        border: '1px solid #232732',
        borderRadius: '20px',
        padding: '36px 32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 1px rgba(255, 183, 3, 0.2)',
        position: 'relative'
      }}>
        {/* Top Header Badge & Language Switcher */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src="/cat_logo_clean.jpg"
              alt="Shtegu Logo"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid #FFB703'
              }}
            />
            <div>
              <div style={{ fontSize: '15px', fontWeight: '900', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                SHTEGU
              </div>
              <div style={{ fontSize: '10px', color: '#8F96A3', fontFamily: 'var(--font-mono)' }}>
                {isSq ? 'PORTALI I AUTORIZUAR' : 'AUTHORIZED ACCESS'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {onLangChange && (
              <div style={{
                display: 'flex',
                background: '#1A1D24',
                padding: '2px',
                borderRadius: '6px',
                border: '1px solid #2A2E39'
              }}>
                <button
                  type="button"
                  onClick={() => onLangChange('sq')}
                  style={{
                    border: 'none',
                    padding: '3px 8px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: isSq ? '700' : '500',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    background: isSq ? '#FFB703' : 'transparent',
                    color: isSq ? '#000000' : '#8F96A3'
                  }}
                >
                  AL
                </button>
                <button
                  type="button"
                  onClick={() => onLangChange('en')}
                  style={{
                    border: 'none',
                    padding: '3px 8px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: !isSq ? '700' : '500',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    background: !isSq ? '#FFB703' : 'transparent',
                    color: !isSq ? '#000000' : '#8F96A3'
                  }}
                >
                  EN
                </button>
              </div>
            )}
            <span style={{
              fontSize: '10.5px',
              fontFamily: 'var(--font-mono)',
              fontWeight: '800',
              padding: '3px 8px',
              borderRadius: '6px',
              background: 'rgba(255, 183, 3, 0.12)',
              color: '#FFB703',
              border: '1px solid rgba(255, 183, 3, 0.3)'
            }}>
              🔒 PRIVATE
            </span>
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 8px 0', color: '#FFFFFF' }}>
            {isSq ? 'Portali Ekzekutiv & Prezantimi' : 'Executive Investor Portal'}
          </h2>
          <p style={{ fontSize: '13px', color: '#8F96A3', lineHeight: 1.5, margin: 0 }}>
            {isSq 
              ? 'Përgatitur për Driton Hapçiu, investitorë engjëj dhe partnerët komunalë të Prishtinës. Përmban të dhëna konfidenciale të IoT hardware, telemetrisë dhe modelit financiar.'
              : 'Prepared for Driton Hapçiu, angel investors & municipal stakeholders. Contains confidential IoT telemetry, hardware specs, and financial models.'}
          </p>
        </div>

        {/* Security Key Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: '#8F96A3',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {isSq ? 'Fjalëkalimi i Sigurisë' : 'Security Access Code'}
              </label>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#FFB703' }}>
                Kodi: <strong>SHTEGU2026</strong>
              </span>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748B'
              }}>
                <KeyRound size={16} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={accessKey}
                onChange={(e) => {
                  setAccessKey(e.target.value);
                  if (error) setError(false);
                }}
                placeholder={isSq ? "Shkruaj fjalëkalimin (psh: SHTEGU2026)" : "Enter access key (e.g. SHTEGU2026)"}
                autoFocus
                style={{
                  width: '100%',
                  padding: '13px 40px 13px 40px',
                  background: '#0B0B0D',
                  border: error ? '1.5px solid #EF4444' : '1px solid #282C37',
                  borderRadius: '10px',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13.5px',
                  outline: 'none',
                  letterSpacing: '0.04em',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: '#64748B',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '8px',
                fontSize: '11.5px',
                color: '#EF4444'
              }}>
                <AlertCircle size={14} />
                {isSq ? 'Kodi nuk është i saktë. Përdorni SHTEGU2026 ose klikoni hyrjen e shpejtë.' : 'Invalid code. Use SHTEGU2026 or click 1-click preview below.'}
              </div>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              background: '#FFB703',
              color: '#000000',
              border: 'none',
              padding: '13px',
              borderRadius: '10px',
              fontWeight: '900',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(255, 183, 3, 0.35)',
              transition: 'transform 0.1s ease'
            }}
          >
            <Lock size={15} />
            {isSq ? 'Verifiko & Hyr në Platformë' : 'Authenticate & Open Platform'}
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '22px 0',
          color: '#64748B',
          fontSize: '11px',
          fontFamily: 'var(--font-mono)'
        }}>
          <div style={{ flex: 1, height: '1px', background: '#232732' }} />
          <span>{isSq ? 'OSE' : 'OR'}</span>
          <div style={{ flex: 1, height: '1px', background: '#232732' }} />
        </div>

        {/* 1-Click Investor Demo Access */}
        <button
          onClick={handleQuickBypass}
          style={{
            width: '100%',
            background: '#1A1D24',
            border: '1px solid #2E3340',
            color: '#FFFFFF',
            padding: '12px',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'background 0.2s'
          }}
        >
          <Sparkles size={15} color="#FFB703" />
          {isSq ? 'Hyrje e Menjëhershme (1-Click Demo Access)' : 'Instant 1-Click Investor Access'}
        </button>

        {/* Footer Audit Meta */}
        <div style={{
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid #1F222A',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '10.5px',
          color: '#64748B',
          fontFamily: 'var(--font-mono)'
        }}>
          <span>REF: SHTEGU-ANGEL-2026</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10B981' }}>
            <CheckCircle2 size={12} />
            {isSq ? 'VERIFIKUAR ME SUKSES' : 'VERIFIED AUDIT'}
          </span>
        </div>
      </div>
    </div>
  );
}
