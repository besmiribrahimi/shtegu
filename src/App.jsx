import React, { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import PresentationView from './components/PresentationView';
import DocumentView from './components/DocumentView';
import AndroidEmulatorView from './components/AndroidEmulatorView';
import NetworkMapView from './components/NetworkMapView';
import AccessGate from './components/AccessGate';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('shtegu_authorized') === 'true';
    }
    return false;
  });

  const [activeMode, setActiveMode] = useState('slides'); // 'slides' | 'memo' | 'app' | 'map'
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lang, setLang] = useState('sq'); // 'sq' (Albanian) | 'en' (English)
  const totalSlides = 8;

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleLock = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('shtegu_authorized');
    }
    setIsUnlocked(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!isUnlocked) {
    return <AccessGate onUnlock={handleUnlock} lang={lang} onLangChange={setLang} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: (activeMode === 'app' || activeMode === 'map') ? '#08080A' : 'var(--bg-page)' }}>
      {/* Sober Executive Header */}
      <TopBar
        activeMode={activeMode}
        onModeChange={(mode) => setActiveMode(mode)}
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        lang={lang}
        onLangChange={setLang}
        onLock={handleLock}
      />

      {/* Main View Area */}
      <main>
        {activeMode === 'slides' ? (
          <PresentationView
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            totalSlides={totalSlides}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
            lang={lang}
            onLangChange={setLang}
          />
        ) : activeMode === 'memo' ? (
          <DocumentView lang={lang} />
        ) : activeMode === 'map' ? (
          <NetworkMapView lang={lang} />
        ) : (
          <AndroidEmulatorView lang={lang} />
        )}
      </main>
    </div>
  );
}
