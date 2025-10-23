'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import BlackholeAnimation from '../../components/BlackholeAnimation';

interface LifeStats {
  weeksLived: number;
  totalWeeks: number;
  weeksRemaining: number;
  percentageLived: number;
  daysLived: number;
  hoursSlept: number;
  heartbeats: number;
  breaths: number;
  seasons: number;
  birthYear: number;
}

export default function LifeWeeksPage() {
  const [currentView, setCurrentView] = useState<'input' | 'grid' | 'typewriter' | 'navigation'>('input');
  const [currentStats, setCurrentStats] = useState<LifeStats | null>(null);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [birthdate, setBirthdate] = useState('');
  const [hoverInfo, setHoverInfo] = useState<{ visible: boolean; text: string }>({ visible: false, text: '' });
  const router = useRouter();
  const totalStatSections = 4;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const getPopulationAtYear = (year: number) => {
    const populationData: { [key: number]: number } = {
      1950: 2.5, 1960: 3.0, 1970: 3.7, 1980: 4.4, 1990: 5.3,
      2000: 6.1, 2010: 6.9, 2020: 7.8, 2025: 8.1
    };
    
    const years = Object.keys(populationData).map(Number);
    const closestYear = years.reduce((prev, curr) => 
      Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
    );
    
    return Math.round(populationData[closestYear] * 1000000000);
  };

  const calculateStats = () => {
    if (!birthdate) return;

    const birthDate = new Date(birthdate);
    const today = new Date();
    const birthYear = birthDate.getFullYear();
    
    // Calculate weeks lived
    const msInWeek = 1000 * 60 * 60 * 24 * 7;
    const weeksLived = Math.floor((today.getTime() - birthDate.getTime()) / msInWeek);

    // Based on "Four Thousand Weeks" concept (~77 years)
    const totalWeeks = 4000;
    const weeksRemaining = Math.max(0, totalWeeks - weeksLived);
    const percentageLived = Math.min(100, Math.round((weeksLived / totalWeeks) * 100));
    
    // Calculate days lived
    const msInDay = 1000 * 60 * 60 * 24;
    const daysLived = Math.floor((today.getTime() - birthDate.getTime()) / msInDay);
    
    // Calculate various statistics
    const hoursSlept = Math.floor(daysLived * 8);
    const heartbeats = Math.floor(daysLived * 24 * 60 * 70);
    const breaths = Math.floor(daysLived * 24 * 60 * 16);
    const seasons = Math.floor(daysLived / 91.25);
    
    const stats: LifeStats = {
      weeksLived, totalWeeks, weeksRemaining, percentageLived,
      daysLived, hoursSlept, heartbeats, breaths, seasons, birthYear
    };

    setCurrentStats(stats);
    setCurrentView('grid');

    // After grid animation completes, show typewriter
    setTimeout(() => {
      setCurrentView('typewriter');
    }, 5000);
  };

  const toggleStats = () => {
    setIsStatsOpen(!isStatsOpen);
  };

  const scrollStats = (direction: number) => {
    const newIndex = currentStatIndex + direction;
    if (newIndex >= 0 && newIndex < totalStatSections) {
      setCurrentStatIndex(newIndex);
    }
  };

  const showHoverInfo = (cellIndex: number) => {
    if (!currentStats) return;

    const weekNumber = cellIndex + 1;
    if (weekNumber > 4000) return;

    let message = `Woche ${weekNumber}: `;

    if (cellIndex < currentStats.weeksLived) {
      message += `<span class="coral">Vergangenheit</span>`;
    } else if (cellIndex === currentStats.weeksLived) {
      message += `<span class="mint">Jetzt</span>`;
    } else {
      const weeksInFuture = cellIndex - currentStats.weeksLived;
      message += `<span class="steel">In ${weeksInFuture} Wochen</span>`;
    }

    setHoverInfo({ visible: true, text: message });
  };

  const hideHoverInfo = () => {
    setHoverInfo({ visible: false, text: '' });
  };

  const resetVisualization = () => {
    setCurrentStats(null);
    setCurrentStatIndex(0);
    setIsStatsOpen(false);
    setBirthdate('');
    setCurrentView('input');
    setHoverInfo({ visible: false, text: '' });
  };

  const scrollToNavigation = () => {
    setCurrentView('navigation');
  };

  if (currentView === 'input') {
    return (
      <div className="container">
        <div className="main-view">
          <div className="input-card">
            <h2 className="fyf-display text-center mb-6" style={{ fontSize: '2rem' }}>
              Wann wurdest du geboren?
            </h2>
            <div className="input-group">
              <input 
                type="date" 
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="date-input" 
                required 
              />
            </div>
            <button 
              onClick={calculateStats} 
              className="fyf-btn fyf-btn-primary" 
              disabled={!birthdate}
            >
              Visualisierung starten
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'grid' && currentStats) {
    return (
      <div className="container">
        <div className="grid-view">
          {/* Left Panel - Title + Toggle + Stats */}
          <div className="left-panel">
            <div className="title-container">
              <h1 className="fyf-display">
                <div className="coral">Life</div>
                <div className="cream">in</div>
                <div className="gradient-text">Weeks</div>
              </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button className="accordion-toggle-small" onClick={toggleStats}>
                <span>{isStatsOpen ? '▲' : '▼'}</span>
              </button>
              <div className="stats-nav-left" onClick={() => scrollStats(-1)}>◄</div>
              <div className="stats-nav-right" onClick={() => scrollStats(1)}>►</div>
            </div>

            {/* Stats Accordion */}
            <div className={`stats-accordion ${isStatsOpen ? 'open' : ''}`}>
              <div className="stats-container">
                <div className="stats-scroll-wrapper">
                  <div 
                    className="stats-grid" 
                    style={{ transform: `translateX(-${currentStatIndex * 100}%)` }}
                  >
                    <div className="fyf-card stat-section">
                      <h3 className="gradient-text">Lebensmetriken</h3>
                      <div className="stat-item coral">
                        <p className="steel">
                          Du hast <span className="coral stat-number">{formatNumber(currentStats.weeksLived)}</span> Wochen der Existenz erlebt, das sind <span className="coral stat-number">{currentStats.percentageLived}</span>%
                        </p>
                      </div>
                      <div className="stat-item mint">
                        <p className="steel">
                          Das entspricht <span className="mint stat-number">{formatNumber(currentStats.daysLived)}</span> Tagen des Bewusstseins
                        </p>
                      </div>
                      <div className="stat-item mauve">
                        <p className="steel">
                          Dein Herz-Kreislauf-System hat ungefähr <span className="mauve stat-number">{formatNumber(currentStats.heartbeats)}</span> mal geschlagen
                        </p>
                      </div>
                    </div>

                    <div className="fyf-card stat-section">
                      <h3 className="gradient-text">Gesellschaftlicher Kontext</h3>
                      <div className="stat-item coral">
                        <p className="steel">
                          Während deiner Lebenszeit wuchs die Menschheit von <span className="coral stat-number">{formatNumber(getPopulationAtYear(currentStats.birthYear))}</span> auf über <span className="coral stat-number">8 Milliarden</span> bewusste Wesen.
                        </p>
                      </div>
                      <div className="stat-item mint">
                        <p className="steel">
                          Statistisch gesehen hast du wahrscheinlich etwa <span className="mint stat-number">{formatNumber(Math.round(80000 * (currentStats.percentageLived/100)))}</span> der ~80.000 Menschen getroffen, die du in deinem Leben begegnen wirst.
                        </p>
                      </div>
                      <div className="stat-item mauve">
                        <p className="steel">
                          Die Menschheit hat seit deiner Ankunft <span className="mauve stat-number">{formatNumber(Math.round(currentStats.daysLived * 385000))}</span> neue Leben beginnen und <span className="mauve stat-number">{formatNumber(Math.round(currentStats.daysLived * 166000))}</span> enden sehen.
                        </p>
                      </div>
                    </div>

                    <div className="fyf-card stat-section">
                      <h3 className="gradient-text">Kosmische Perspektive</h3>
                      <div className="stat-item coral">
                        <p className="steel">
                          Die Erde hat dich etwa <span className="coral stat-number">{formatNumber(Math.round(currentStats.daysLived * 1.6 * 1000000))}</span> Kilometer durch die kosmische Leere auf ihrer Sonnenumlaufbahn transportiert.
                        </p>
                      </div>
                      <div className="stat-item mint">
                        <p className="steel">
                          Deine Existenz umfasst nur <span className="mint stat-number">{(80/13800000000 * 100).toFixed(10)}</span>% der 13,8 Milliarden Jahre währenden Evolution des Universums.
                        </p>
                      </div>
                      <div className="stat-item mauve">
                        <p className="steel">
                          Unser Sonnensystem hat während deiner Lebenszeit <span className="mauve stat-number">{formatNumber(Math.round(currentStats.daysLived * 24 * 828000))}</span> Kilometer durch die Spiralarme der Milchstraße zurückgelegt.
                        </p>
                      </div>
                    </div>

                    <div className="fyf-card stat-section">
                      <h3 className="gradient-text">Natürliche Rhythmen</h3>
                      <div className="stat-item coral">
                        <p className="steel">
                          Du hast <span className="coral stat-number">{formatNumber(Math.round(currentStats.daysLived / 29.53))}</span> Mondphasen miterlebt und <span className="coral stat-number">{formatNumber(Math.floor(currentStats.daysLived / 365.25))}</span> Sonnenumrundungen vollendet.
                        </p>
                      </div>
                      <div className="stat-item mint">
                        <p className="steel">
                          Verglichen mit einem jahrtausendelangen Mammutbaum stellt deine aktuelle Zeitinvestition <span className="mint stat-number">{((currentStats.daysLived / 365.25) / 3000 * 100).toFixed(2)}</span>% seiner potenziellen Lebensspanne dar.
                        </p>
                      </div>
                      <div className="stat-item mauve">
                        <p className="steel">
                          Dein physischer Körper hat mehrmals eine vollständige Zellregeneration durchlaufen. Du bestehst buchstäblich nicht mehr aus derselben atomaren Materie, die du bei der Geburt hattest.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Grid + Legend */}
          <div className="right-panel">
            <WeekGrid 
              currentStats={currentStats} 
              onHover={showHoverInfo}
              onLeave={hideHoverInfo}
            />

            {hoverInfo.visible && (
              <div className="hover-info">
                <p className="steel" dangerouslySetInnerHTML={{ __html: hoverInfo.text }}></p>
              </div>
            )}

            {/* Legend */}
            <div className="legend">
              <div className="legend-item">
                <div className="legend-color week-past"></div>
                <span className="steel">Vergangenheit (<span>{formatNumber(currentStats.weeksLived)}</span> Wochen)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color week-current"></div>
                <span className="mint">Gegenwart</span>
              </div>
              <div className="legend-item">
                <div className="legend-color week-future"></div>
                <span className="steel">Zukunft (<span>{formatNumber(currentStats.weeksRemaining)}</span> Wochen)</span>
              </div>
              <button onClick={resetVisualization} className="reset-btn">
                Zurücksetzen
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'typewriter') {
    return (
      <div className="container">
        <div className="typewriter-section">
          <div className="blackhole-bg">
            <BlackholeAnimation isVisible={true} />
            <div className="typewriter-container">
              <div className="content" onClick={scrollToNavigation}>
                <h1 className="title" style={{ cursor: 'pointer' }}>
                  <div className="fuck-line">FUCK...</div>
                  <div className="your-line">YOUR</div>
                  <div className="future-line">FUTURE</div>
                </h1>
                <p className="tagline visible">Ready to own your time?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'navigation') {
    return (
      <div className="container">
        <div className="navigation-section">
          <div className="nav-container">
            <a href="/guide" className="nav-item">
              <span className="nav-text">GUIDE</span>
            </a>
            <a href="/people" className="nav-item">
              <span className="nav-text">PEOPLE</span>
            </a>
            <a href="/access" className="nav-item">
              <span className="nav-text">ACCESS</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// WeekGrid Component
function WeekGrid({ 
  currentStats, 
  onHover, 
  onLeave 
}: { 
  currentStats: LifeStats; 
  onHover: (index: number) => void; 
  onLeave: () => void; 
}) {
  const [cells, setCells] = useState<Array<{ cellIndex: number; isPast: boolean; isCurrent: boolean }>>([]);

  useEffect(() => {
    const TOTAL_WEEKS = 4000;
    const WEEKS_PER_ROW = 80;
    const TOTAL_ROWS = Math.ceil(TOTAL_WEEKS / WEEKS_PER_ROW);

    const cellsLived = currentStats.weeksLived;
    const cellsCurrent = 1;
    const cellsFuture = TOTAL_WEEKS - cellsLived - cellsCurrent;

    const allCells: Array<{ cellIndex: number; isPast: boolean; isCurrent: boolean }> = [];
    let cellIndex = 0;

    for (let row = 0; row < TOTAL_ROWS; row++) {
      for (let col = 0; col < WEEKS_PER_ROW; col++) {
        if (cellIndex >= TOTAL_WEEKS) break;
        
        const isPast = cellIndex < cellsLived;
        const isCurrent = cellIndex === cellsLived;
        
        allCells.push({ cellIndex, isPast, isCurrent });
        cellIndex++;
      }
    }

    setCells(allCells);
  }, [currentStats]);

  return (
    <div className="week-grid">
      {Array.from({ length: Math.ceil(4000 / 80) }, (_, rowIndex) => (
        <div key={rowIndex} className="week-row">
          {Array.from({ length: 80 }, (_, colIndex) => {
            const cellIndex = rowIndex * 80 + colIndex;
            if (cellIndex >= 4000) return null;
            
            const cell = cells.find(c => c.cellIndex === cellIndex);
            if (!cell) return null;

            const { isPast, isCurrent } = cell;
            let className = 'week-cell';
            
            if (isPast) className += ' week-past';
            else if (isCurrent) className += ' week-current';
            else className += ' week-future';

            return (
              <div
                key={cellIndex}
                className={className}
                onMouseEnter={() => onHover(cellIndex)}
                onMouseLeave={onLeave}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}