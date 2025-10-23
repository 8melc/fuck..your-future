'use client';

import { useState, useEffect } from 'react';

interface PauseOverlayProps {
  showAfterMs?: number;
}

export default function PauseOverlay({ showAfterMs = 1800000 }: PauseOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, showAfterMs);

    return () => clearTimeout(timer);
  }, [showAfterMs]);

  const closePause = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      style={{
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.7)',
        zIndex: 1000,
        textAlign: 'center'
      }}
    >
      <div 
        style={{
          marginTop: '40vh',
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          display: 'inline-block'
        }}
      >
        <h2>Pause-Time! 🛑</h2>
        <p>Bitte nimm dir jetzt zwei Minuten Pause. Nach Klick geht's weiter.</p>
        <button 
          onClick={closePause}
          style={{
            background: 'var(--fyf-coral)',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Ich habe Pause gemacht!
        </button>
      </div>
    </div>
  );
}
