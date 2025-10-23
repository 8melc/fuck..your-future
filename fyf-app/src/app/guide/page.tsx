'use client';

import { useState, useEffect, useRef } from 'react';

interface FeedCard {
  id: string;
  type: 'article' | 'quote' | 'video' | 'people' | 'event';
  size: 'small' | 'medium' | 'large' | 'wide' | 'full';
  title: string;
  content: any;
}

export default function GuideFeed() {
  const [isZoomedIn, setZoomedIn] = useState(false);
  const [focusedCard, setFocusedCard] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(0.35);
  const [translateX, setTranslateX] = useState(-200);
  const [translateY, setTranslateY] = useState(-200);
  const [currentTranslateX, setCurrentTranslateX] = useState(-200);
  const [currentTranslateY, setCurrentTranslateY] = useState(-200);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [guidePanelOpen, setGuidePanelOpen] = useState(false);
  const [guideInputVisible, setGuideInputVisible] = useState(false);
  const [guideOverlayActive, setGuideOverlayActive] = useState(false);
  const [tone, setTone] = useState<'straight' | 'soft'>('straight');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "TICK TOCK! Du hast heute schon 3 Stunden gescrollt. Das sind 180 Minuten deines einzigen Lebens. Wake the fuck up.",
      type: 'guide'
    },
    {
      id: 2,
      text: "Dein Zeit-Score heute: 23% - 77% verschwendet. Das geht besser. Viel besser.",
      type: 'guide'
    },
    {
      id: 3,
      text: "Sarah Chen hat gemacht, wovon du nur träumst. Connect mit ihr oder scroll weiter ins Nichts.",
      type: 'guide'
    }
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const navHelperRef = useRef<HTMLDivElement>(null);
  const guideInputRef = useRef<HTMLInputElement>(null);

  const feedCards: FeedCard[] = [
    {
      id: '1',
      type: 'article',
      size: 'medium',
      title: 'Die Illusion der unendlichen Zeit',
      content: {
        heroImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        favicon: 'M',
        domain: 'medium.com',
        excerpt: 'Wir leben, als hätten wir ewig Zeit. Doch die Realität ist brutal...',
        readTime: '5 Min. Lesezeit'
      }
    },
    {
      id: '2',
      type: 'quote',
      size: 'medium',
      title: 'Du hast zwei Leben',
      content: {
        text: '"Du hast zwei Leben. Das zweite beginnt, wenn du erkennst, dass du nur eines hast."',
        author: '— Konfuzius'
      }
    },
    {
      id: '3',
      type: 'video',
      size: 'medium',
      title: 'How to Actually Use Your Time',
      content: {
        thumbnail: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8))',
        author: 'Ali Abdaal',
        duration: '12:34'
      }
    },
    {
      id: '4',
      type: 'people',
      size: 'medium',
      title: 'Sarah Chen',
      content: {
        avatar: '🚀',
        name: 'Sarah Chen',
        bio: 'Digital Nomad seit 2019. Lebt ihre Vision von Freiheit.'
      }
    },
    {
      id: '5',
      type: 'event',
      size: 'medium',
      title: 'FYF Festival 2025',
      content: {
        badge: 'LIVE EVENT',
        location: 'Hamburg · Kampnagel',
        timeLeft: '137 Tage'
      }
    },
    {
      id: '6',
      type: 'article',
      size: 'medium',
      title: 'The Attention Economy Is Eating Your Life',
      content: {
        heroImage: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        favicon: 'W',
        domain: 'wired.com',
        excerpt: 'Every notification steals your most precious resource...',
        readTime: '8 Min. Lesezeit'
      }
    },
    {
      id: '7',
      type: 'quote',
      size: 'wide',
      title: 'Zeit ist das, was verhindert',
      content: {
        text: '"Zeit ist das, was verhindert, dass alles auf einmal passiert."',
        author: '— Ray Cummings'
      }
    },
    {
      id: '8',
      type: 'people',
      size: 'medium',
      title: 'Marcus Weber',
      content: {
        avatar: '💡',
        name: 'Marcus Weber',
        bio: 'Gründer & Impact Investor. Baut die Zukunft.'
      }
    },
    {
      id: '9',
      type: 'article',
      size: 'medium',
      title: 'The Privilege of Time: Who Gets to Waste It?',
      content: {
        heroImage: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        favicon: 'N',
        domain: 'newyorker.com',
        excerpt: 'In our society, the ability to \'waste\' time has become the ultimate luxury...',
        readTime: '12 Min. Lesezeit'
      }
    },
    {
      id: '10',
      type: 'event',
      size: 'medium',
      title: 'Zeit-Audit Masterclass',
      content: {
        badge: 'WORKSHOP',
        location: 'Online · Zoom',
        timeLeft: '42 Tage'
      }
    },
    {
      id: '11',
      type: 'video',
      size: 'medium',
      title: 'Why You\'re Always Running Out of Time',
      content: {
        thumbnail: 'linear-gradient(135deg, rgba(250, 112, 154, 0.8), rgba(254, 225, 64, 0.8))',
        author: 'Kurzgesagt',
        duration: '9:21'
      }
    },
    {
      id: '12',
      type: 'quote',
      size: 'small',
      title: 'Wir müssen die Zeit als Werkzeug benutzen',
      content: {
        text: '"Wir müssen die Zeit als Werkzeug benutzen, nicht als Sofa."',
        author: '— JFK'
      }
    },
    {
      id: '13',
      type: 'people',
      size: 'small',
      title: 'Luna Petrova',
      content: {
        avatar: '🎨',
        name: 'Luna Petrova',
        bio: 'Künstlerin & Zeit-Philosophin'
      }
    },
    {
      id: '14',
      type: 'article',
      size: 'medium',
      title: 'The Tyranny of the Clock',
      content: {
        heroImage: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        favicon: 'A',
        domain: 'aeon.co',
        excerpt: 'From sundials to smartphones, we\'ve created a prison of perpetual urgency...',
        readTime: '15 Min. Lesezeit'
      }
    },
    {
      id: '15',
      type: 'event',
      size: 'wide',
      title: '48h Digital Detox',
      content: {
        badge: 'RETREAT',
        location: 'Schwarzwald · Wald & Berge',
        timeLeft: '89 Tage'
      }
    },
    {
      id: '16',
      type: 'quote',
      size: 'small',
      title: 'The bad news is time flies',
      content: {
        text: '"The bad news is time flies. The good news is you\'re the pilot."',
        author: '— Altshuler'
      }
    },
    {
      id: '17',
      type: 'article',
      size: 'small',
      title: 'The Rise of Time Poverty',
      content: {
        heroImage: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        favicon: 'T',
        domain: 'time.com',
        excerpt: 'Despite all our time-saving technology...',
        readTime: '7 Min. Lesezeit'
      }
    },
    {
      id: '18',
      type: 'video',
      size: 'medium',
      title: 'Stop Wasting Your 20s',
      content: {
        thumbnail: 'linear-gradient(135deg, rgba(48, 207, 208, 0.8), rgba(51, 8, 103, 0.8))',
        author: 'Hamza',
        duration: '18:42'
      }
    },
    {
      id: '19',
      type: 'people',
      size: 'small',
      title: 'Nina Richter',
      content: {
        avatar: '🌟',
        name: 'Nina Richter',
        bio: 'Creative Direction'
      }
    },
    {
      id: '20',
      type: 'article',
      size: 'large',
      title: 'Why Hustle Culture Is Killing You',
      content: {
        heroImage: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        favicon: 'F',
        domain: 'fastcompany.com',
        excerpt: 'The toxic truth about productivity obsession and why the cult of busy is destroying our mental health, relationships, and actual output...',
        readTime: '6 Min. Lesezeit'
      }
    }
  ];

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof Element) {
      if (e.target.closest('.feed-card') || 
          e.target.closest('.guide-input-container') ||
          e.target.closest('.guide-panel') || 
          e.target.closest('.guide-toggle') ||
          e.target.closest('.controls') || 
          e.target.closest('.nav-helper')) {
        return;
      }
    }

    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    document.body.style.cursor = 'grabbing';
    if (containerRef.current) {
      containerRef.current.style.transition = 'none';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const speedMultiplier = scrollAmount > 0.8 ? 0.015 : 0.03;
    const deltaX = (e.clientX - startX) * speedMultiplier;
    const deltaY = (e.clientY - startY) * speedMultiplier;

    const newTranslateX = translateX + deltaX;
    const newTranslateY = translateY + deltaY;

    const maxOffset = 80;
    const clampedX = Math.max(-200 - maxOffset, Math.min(-200 + maxOffset, newTranslateX));
    const clampedY = Math.max(-200 - maxOffset, Math.min(-200 + maxOffset, newTranslateY));

    setCurrentTranslateX(clampedX);
    setCurrentTranslateY(clampedY);

    if (containerRef.current) {
      containerRef.current.style.transform = `translate(${clampedX}vw, ${clampedY}vh) scale(${scrollAmount})`;
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setTranslateX(currentTranslateX);
      setTranslateY(currentTranslateY);
      document.body.style.cursor = 'crosshair';
      if (containerRef.current) {
        containerRef.current.style.transition = 'transform 0.3s ease-out';
      }
    }
  };

  // Scroll to zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    if (navHelperRef.current) {
      navHelperRef.current.style.opacity = '0';
    }

    const oldScale = scrollAmount;
    let newScale = scrollAmount;

    if (e.deltaY < 0) {
      newScale = Math.max(0.35, scrollAmount - 0.05);
    } else {
      newScale = Math.min(1.0, scrollAmount + 0.05);
    }

    setScrollAmount(newScale);

    // Zoom towards cursor position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      const scaleChange = newScale / oldScale;

      const newCurrentX = currentTranslateX - (cursorX * (scaleChange - 1) / window.innerWidth * 100);
      const newCurrentY = currentTranslateY - (cursorY * (scaleChange - 1) / window.innerHeight * 100);

      setCurrentTranslateX(newCurrentX);
      setCurrentTranslateY(newCurrentY);
      setTranslateX(newCurrentX);
      setTranslateY(newCurrentY);

      containerRef.current.style.transform = `translate(${newCurrentX}vw, ${newCurrentY}vh) scale(${newScale})`;
    }

    const newIsZoomedIn = newScale >= 0.8;
    setZoomedIn(newIsZoomedIn);

    if (newIsZoomedIn) {
      if (containerRef.current) {
        containerRef.current.classList.add('zoomed-in', 'navigate-mode');
      }
      showGuideHint();
    } else {
      if (containerRef.current) {
        containerRef.current.classList.remove('zoomed-in', 'navigate-mode');
      }
    }

    setTimeout(() => {
      if (navHelperRef.current) {
        navHelperRef.current.style.opacity = '1';
      }
    }, 2000);
  };

  // Card interactions
  const handleCardClick = (cardId: string) => {
    if (expandedCard === cardId) return;
    setExpandedCard(cardId);
    document.body.classList.add('card-expanded');
  };

  const closeExpandedCard = () => {
    setExpandedCard(null);
    document.body.classList.remove('card-expanded');
  };

  // Guide functions
  const showGuideHint = () => {
    setTimeout(() => {
      if (isZoomedIn && !focusedCard) {
        setGuideOverlayActive(true);
        setTimeout(() => {
          setGuideOverlayActive(false);
        }, 5000);
      }
    }, 3000);
  };

  const toggleGuide = () => {
    setGuidePanelOpen(!guidePanelOpen);
    
    const newMessage = {
      id: Date.now(),
      text: `Guide ${!guidePanelOpen ? 'aktiviert' : 'deaktiviert'}! ${!guidePanelOpen ? 'Ich helfe dir, den Überblick zu behalten.' : 'Du bist auf dich allein gestellt.'}`,
      type: 'guide' as const
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const toggleTone = (newTone: 'straight' | 'soft') => {
    setTone(newTone);
    
    const newMessage = {
      id: Date.now(),
      text: newTone === 'straight' 
        ? "Straight Talk aktiviert. Alright, ich sag's dir wie es ist. Keine Kuschel-Scheiße mehr."
        : "Soft Touch aktiviert. Okay, ich bin jetzt etwas sanfter zu dir. Aber die Wahrheit bleibt die gleiche.",
      type: 'guide' as const
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const sendToGuide = () => {
    const input = guideInputRef.current;
    if (!input || !input.value.trim()) return;

    const message = input.value.trim();
    
    // Hide input
    setGuideInputVisible(false);
    
    // Open guide panel if not open
    if (!guidePanelOpen) {
      setGuidePanelOpen(true);
    }

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      text: message,
      type: 'user' as const
    };
    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Verstanden! Ich filtere deinen Feed jetzt basierend auf deinem Input.",
        "Alright! Lass mich dir zeigen, was zu deinem Mindset passt.",
        "Ich hab's. Ich zeige dir die relevanten Inhalte.",
        "Got it! Ich kuratiere deinen Feed neu - check die highlighted Cards.",
        "Perfekt! Deine Zeit ist wertvoll - ich zeige dir nur was zählt."
      ];

      const response = responses[Math.floor(Math.random() * responses.length)];
      const aiMessage = {
        id: Date.now() + 1,
        text: `TICK TOCK: ${response}`,
        type: 'guide' as const
      };
      setChatMessages(prev => [...prev, aiMessage]);
    }, 800);

    // Clear input
    input.value = '';
  };

  const resetView = () => {
    setScrollAmount(0.35);
    setTranslateX(-200);
    setTranslateY(-200);
    setCurrentTranslateX(-200);
    setCurrentTranslateY(-200);
    if (containerRef.current) {
      containerRef.current.style.transform = 'translate(-200vw, -200vh) scale(0.35)';
      containerRef.current.classList.remove('zoomed-in', 'navigate-mode');
    }
    setFocusedCard(null);
    setZoomedIn(false);
  };

  const toggleZoom = () => {
    if (isZoomedIn) {
      resetView();
    } else {
      setScrollAmount(0.9);
      if (containerRef.current) {
        containerRef.current.style.transform = 'translate(-200vw, -200vh) scale(0.9)';
        containerRef.current.classList.add('zoomed-in', 'navigate-mode');
      }
      setZoomedIn(true);
      showGuideHint();
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault();
        setGuideInputVisible(!guideInputVisible);
        if (!guideInputVisible && guideInputRef.current) {
          setTimeout(() => guideInputRef.current?.focus(), 100);
        }
      }
      
      if (e.key === 'Escape') {
        if (expandedCard) {
          closeExpandedCard();
        } else {
          resetView();
        }
      }
      
      if (e.key === 'g') {
        toggleGuide();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [guideInputVisible, expandedCard]);

  // Render card content based on type
  const renderCardContent = (card: FeedCard) => {
    switch (card.type) {
      case 'article':
        return (
          <>
            <div 
              className="hero-image" 
              style={{ background: card.content.heroImage }}
            />
            <div className="text-content">
              <div className="article-header">
                <div className="favicon">{card.content.favicon}</div>
                <span className="domain">{card.content.domain}</span>
              </div>
              <h3 className="title">{card.title}</h3>
              <p className="excerpt">{card.content.excerpt}</p>
              <span className="read-time">{card.content.readTime}</span>
            </div>
          </>
        );
      
      case 'quote':
        return (
          <div className="card-content">
            <p className="quote-text">{card.content.text}</p>
            <p className="quote-author">{card.content.author}</p>
          </div>
        );
      
      case 'video':
        return (
          <>
            <div 
              className="thumbnail" 
              style={{ background: card.content.thumbnail }}
            >
              <div className="play-btn">▶</div>
            </div>
            <div className="text-content">
              <h3 className="title">{card.title}</h3>
              <p className="excerpt">{card.content.author} • {card.content.duration}</p>
            </div>
          </>
        );
      
      case 'people':
        return (
          <div className="card-content">
            <div className="avatar">{card.content.avatar}</div>
            <h3 className="name">{card.content.name}</h3>
            <p className="bio">{card.content.bio}</p>
            <button className="connect-btn">Connect</button>
          </div>
        );
      
      case 'event':
        return (
          <div className="card-content">
            <span className="event-badge">{card.content.badge}</span>
            <h3 className="event-title">{card.title}</h3>
            <p className="excerpt">{card.content.location}<br/>{card.content.timeLeft}</p>
        </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen bg-fyf-noir text-fyf-cream"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Navigation Helper */}
      <div className="nav-helper" ref={navHelperRef}>
        <span>SCROLL</span> zum Zoomen · <span>DRAG</span> zum Navigieren · <span>CLICK</span> Card öffnen · <span>CMD+J</span> für Guide
                </div>
                
      {/* Card Backdrop */}
      <div 
        className={`card-backdrop ${expandedCard ? 'active' : ''}`}
        onClick={closeExpandedCard}
      />

      {/* Guide Input */}
      <div className={`guide-input-container ${guideInputVisible ? 'visible' : ''}`}>
        <div className="guide-input-wrapper">
          <span className="guide-icon">🧭</span>
          <input
            ref={guideInputRef}
            type="text"
            className="guide-input"
            placeholder="Hey, heute habe ich Bock mich von xy inspirieren zu lassen..."
            onKeyPress={(e) => e.key === 'Enter' && sendToGuide()}
          />
          <button className="guide-send-btn" onClick={sendToGuide}>→</button>
        </div>
      </div>

      {/* Grid Container */}
      <div 
        ref={containerRef}
        className={`grid-container ${isZoomedIn ? 'zoomed-in navigate-mode' : ''}`}
      >
        {feedCards.map((card) => (
          <div
            key={card.id}
            className={`feed-card card-${card.type} size-${card.size} ${
              expandedCard === card.id ? 'expanded' : ''
            } ${focusedCard === card.id ? 'focused' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            {renderCardContent(card)}
              </div>
            ))}
          </div>

      {/* Guide AI Overlay */}
      <div className={`guide-overlay ${guideOverlayActive ? 'active' : ''}`}>
        <div className="guide-message">
          <strong>TICK TOCK!</strong> Du scrollst seit 5 Minuten ziellos herum. 
          Sarah Chen's Story könnte dein Leben ändern. Fokussieren?
        </div>
        <div className="guide-actions">
          <button className="guide-btn guide-accept">Zeig mir</button>
          <button className="guide-btn guide-dismiss" onClick={() => setGuideOverlayActive(false)}>Später</button>
        </div>
      </div>

      {/* Side Panel */}
      <aside className={`guide-panel ${guidePanelOpen ? 'open' : ''}`}>
        <div className="guide-header">
          <h2 className="guide-name">TICK TOCK</h2>
          <p style={{ color: 'var(--fyf-steel)', fontSize: '0.9rem', textAlign: 'center', marginBottom: '1rem' }}>
            Deine Zeit läuft. Ich zähle mit.
          </p>

          {/* User Settings Display */}
          <div className="user-settings">
            <div className="settings-title">Deine Einstellungen</div>
            <div className="setting-item">
              <span className="setting-label">Ziel:</span>
              <span className="setting-value">Freiheit mit 45</span>
            </div>
            <div className="setting-item">
              <span className="setting-label">Fokus:</span>
              <span className="setting-value">Zeit &gt; Geld</span>
            </div>
            <div className="setting-item">
              <span className="setting-label">Risiko:</span>
              <span className="setting-value">Mutig</span>
            </div>
          </div>

          {/* Ton-Kalibrierung */}
          <div className="tone-toggle">
            <div 
              className={`tone-option ${tone === 'straight' ? 'active' : ''}`}
              onClick={() => toggleTone('straight')}
            >
              🔥 Straight Talk
            </div>
            <div 
              className={`tone-option ${tone === 'soft' ? 'active' : ''}`}
              onClick={() => toggleTone('soft')}
            >
              🤗 Soft Touch
            </div>
          </div>
        </div>

        <div className="guide-chat">
          {chatMessages.map((message) => (
            <div key={message.id} className="chat-message">
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        <button 
          className="shut-up-btn" 
          style={{
            width: 'calc(100% - 3rem)',
            margin: '1rem 1.5rem',
            padding: '0.75rem',
            background: 'rgba(255, 107, 107, 0.1)',
            border: '1px solid var(--fyf-coral)',
            color: 'var(--fyf-coral)',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          HALT DIE FRESSE
        </button>

        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '0.5rem' }}>
            <input
              type="text" 
              placeholder="Frag mich was..." 
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--fyf-cream)', padding: '0.5rem' }}
            />
            <button 
              style={{
                width: '40px',
                height: '40px',
                background: 'var(--fyf-coral)',
                border: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              <span style={{ color: 'var(--fyf-noir)', fontSize: '1.5rem' }}>→</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Guide Toggle Button */}
      <div className="guide-toggle" onClick={toggleGuide}>
        <span style={{ fontSize: '1.8rem' }}>⏰</span>
      </div>

      {/* Controls */}
      <div className="controls">
        <button className="control-btn" onClick={resetView} title="Reset View">⟲</button>
        <button className="control-btn" onClick={toggleZoom} title="Toggle Zoom">🔍</button>
      </div>

      {/* Focus Overlay */}
      <div className="focus-overlay" />
    </div>
  );
}