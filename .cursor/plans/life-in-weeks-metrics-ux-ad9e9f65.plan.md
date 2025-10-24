<!-- ad9e9f65-80f3-4c0b-b627-e206986a4da4 183ee166-7ea2-4830-8aee-ef47c18aca77 -->
# Life-in-Weeks Side Panel Redesign

## Overview

Transform the current accordion-based stats display into a modern side panel design. The left column will contain only title + tabs + intro. Clicking a tab opens a side panel with cards next to the weeks grid (desktop) or as a fullscreen overlay (mobile). The weeks grid mutes when the panel is open.

## Implementation Steps

### 1. Update Data Structure in `fyf-app/src/app/life-weeks/page.tsx`

**Extend statsTabs with cards array:**

```typescript
const statsTabs = [
  { 
    id: 0, 
    label: 'Lebensmetriken', 
    icon: StatIcon,
    headline: 'Du hast schon {weeksLived} Wochen bewusst erlebt – Zeit, die restlichen {weeksRemaining} zu gestalten.',
    cards: [
      { 
        id: 'weeks-lived', 
        title: 'Wochen gelebt', 
        metric: (stats: LifeStats) => formatNumber(stats.weeksLived),
        body: 'Du hast bereits einen bedeutenden Teil deiner Lebenszeit erlebt.' 
      },
      { 
        id: 'days-conscious', 
        title: 'Tage des Bewusstseins', 
        metric: (stats: LifeStats) => formatNumber(stats.daysLived),
        body: 'Jeder Tag ist eine Gelegenheit, bewusst zu leben.' 
      },
      { 
        id: 'heartbeats', 
        title: 'Herzschläge', 
        metric: (stats: LifeStats) => formatNumber(stats.heartbeats),
        body: 'Dein Herz-Kreislauf-System arbeitet unermüdlich für dich.' 
      }
    ]
  },
  // ... similar structure for tabs 1, 2, 3
];
```

### 2. Replace State Management

**Remove:**

- `currentStatIndex` state
- `setCurrentStatIndex` calls
- `focusCard` state (no longer needed)
- `hasInteracted` state (optional, keep if used elsewhere)

**Add:**

```typescript
const [activeTab, setActiveTab] = useState<number | null>(null);
const isPanelOpen = activeTab !== null;
```

### 3. Refactor Grid View JSX Structure

**Replace the entire grid-view section with:**

```tsx
<div className="container">
  <section className="life-weeks-shell">
    {/* Left Column: Title + Tabs + Intro */}
    <div className="left-column">
      <div className="title-container">
        <h1 className="fyf-display">
          <div className="coral">Life</div>
          <div className="cream">in</div>
          <div className="gradient-text">Weeks</div>
        </h1>
      </div>

      <div className="metrics-intro">
        <p className="font-roboto-mono text-sm uppercase tracking-[0.12em] text-fyf-steel/80">
          Zahlen lügen nie. Was bedeutet deine Zeit?
        </p>
      </div>

      <div className="metrics-tabs" role="tablist">
        {statsTabs.map(tab => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`metrics-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <IconComponent />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>

    {/* Right Column: Weeks Grid + Panel */}
    <div className="right-column">
      <div className={`week-grid-wrapper ${isPanelOpen ? 'week-grid-wrapper--muted' : ''}`}>
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

        <div className="legend">
          {/* ... existing legend content ... */}
        </div>

        <div className="metrics-cta">
          {/* ... existing CTA content ... */}
        </div>
      </div>

      {/* Cards Panel */}
      <CardsPanel 
        activeTab={activeTab}
        statsTabs={statsTabs}
        currentStats={currentStats}
        onClose={() => setActiveTab(null)}
      />
    </div>
  </section>
</div>
```

### 4. Create CardsPanel Component

**Add before the WeekGrid component definition:**

```typescript
interface CardsPanelProps {
  activeTab: number | null;
  statsTabs: typeof statsTabs;
  currentStats: LifeStats | null;
  onClose: () => void;
}

function CardsPanel({ activeTab, statsTabs, currentStats, onClose }: CardsPanelProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const isPanelOpen = activeTab !== null;

  // Focus close button when panel opens (mobile accessibility)
  useEffect(() => {
    if (isPanelOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isPanelOpen]);

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPanelOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPanelOpen, onClose]);

  if (!currentStats || activeTab === null) {
    return (
      <div className="cards-panel">
        {/* Empty mounted panel for smooth transitions */}
      </div>
    );
  }

  const currentTab = statsTabs[activeTab];

  return (
    <div 
      className={`cards-panel ${isPanelOpen ? 'cards-panel--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="panel-title"
    >
      <div className="cards-panel__veil" aria-hidden="true" />
      
      <header className="cards-panel__header">
        <h2 id="panel-title" className="cards-panel__title">
          {currentTab.label}
        </h2>
        <button 
          ref={closeBtnRef}
          onClick={onClose} 
          className="cards-panel__close"
          aria-label="Panel schließen"
        >
          ×
        </button>
      </header>

      <div className="cards-panel__body">
        {currentTab.cards.map(card => (
          <article key={card.id} className="cards-panel__card">
            <h3 className="card-title">{card.title}</h3>
            <div className="card-metric">
              {typeof card.metric === 'function' ? card.metric(currentStats) : card.metric}
            </div>
            <p className="card-body">{card.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
```

### 5. Remove Obsolete Code

**Delete:**

- Entire `stats-accordion` div (lines ~365-470)
- `FocusOverlay` component definition
- `<FocusOverlay />` usage in grid view
- All `stat-section` divs with onClick handlers

### 6. Add CSS to `fyf-app/src/app/globals.css`

**Add new section after existing metrics styles:**

```css
/* Life Weeks Shell - Desktop Grid Layout */
.life-weeks-shell {
  display: grid;
  grid-template-columns: minmax(220px, 280px) 1fr;
  gap: 2.5rem;
  align-items: start;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.right-column {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

/* Week Grid Muted State */
.week-grid-wrapper {
  transition: transform 320ms ease, filter 320ms ease, opacity 320ms ease;
}

.week-grid-wrapper--muted {
  transform: scale(0.92);
  filter: blur(2px);
  opacity: 0.35;
  pointer-events: none;
}

/* Cards Panel - Desktop */
.cards-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: clamp(320px, 38vw, 420px);
  height: 100%;
  background: var(--fyf-carbon);
  border-left: 1px solid rgba(255,255,255,0.06);
  box-shadow: -8px 0 40px rgba(0,0,0,0.3);
  transform: translateX(100%);
  opacity: 0;
  pointer-events: none;
  transition: transform 360ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease-out;
  z-index: 50;
}

.cards-panel--open {
  transform: none;
  opacity: 1;
  pointer-events: auto;
}

.cards-panel__veil {
  display: none; /* Only visible on mobile */
}

.cards-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.75rem 2rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.cards-panel__title {
  font-family: var(--font-righteous);
  font-size: 1.25rem;
  color: var(--fyf-cream);
  margin: 0;
}

.cards-panel__close {
  background: none;
  border: none;
  color: var(--fyf-steel);
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.cards-panel__close:hover {
  background: var(--fyf-smoke);
  color: var(--fyf-cream);
}

.cards-panel__body {
  padding: 1.5rem 2rem 2.5rem;
  overflow-y: auto;
  max-height: calc(100vh - 160px);
  display: grid;
  gap: 1.25rem;
}

.cards-panel__card {
  padding: 1.5rem;
  border-radius: 1.25rem;
  background: rgba(20,20,35,0.9);
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  transition: transform 220ms ease, box-shadow 220ms ease;
}

.cards-panel__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 50px rgba(255,107,107,0.18);
}

.card-title {
  font-family: var(--font-righteous);
  font-size: 1rem;
  color: var(--fyf-mint);
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-metric {
  font-family: var(--font-righteous);
  font-size: 2rem;
  color: var(--fyf-coral);
  margin-bottom: 0.75rem;
}

.card-body {
  font-family: var(--font-roboto-mono);
  font-size: 0.875rem;
  color: var(--fyf-steel);
  line-height: 1.5;
  margin: 0;
}

/* Mobile & Tablet */
@media (max-width: 1024px) {
  .life-weeks-shell {
    display: block;
  }

  .right-column {
    position: relative;
    min-height: 400px;
  }

  .cards-panel {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 60;
    backdrop-filter: blur(6px);
    background: rgba(10,10,10,0.92);
    transform: translateY(100%);
  }

  .cards-panel--open {
    transform: none;
  }

  .cards-panel__veil {
    display: block;
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: -1;
  }

  .cards-panel__header {
    padding: 2rem 1.5rem 1.5rem;
  }

  .cards-panel__close {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    min-width: 44px;
    min-height: 44px;
  }

  .cards-panel__body {
    max-height: calc(100vh - 120px);
    padding: 1rem 1.5rem 2rem;
  }

  .week-grid-wrapper--muted {
    transform: none;
    filter: none;
    opacity: 1;
  }
}
```

### 7. Update Metrics Tabs Styling

**Modify existing `.metrics-tab` in globals.css:**

```css
.metrics-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  font-family: var(--font-roboto-mono);
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fyf-steel);
  background: transparent;
  width: 100%; /* Full width for vertical stacking */
  text-align: left;
  transition: all 0.3s ease;
  cursor: pointer;
}
```

### 8. Remove Obsolete CSS

**Delete from globals.css:**

- `.stats-accordion` and all related styles
- `.stat-section` styles
- `.focus-overlay` and related overlay styles
- Old arrow navigation styles (if any remain)

## Testing Checklist

- [ ] Desktop: Left column shows title + tabs vertically
- [ ] Desktop: Clicking tab opens side panel with smooth slide-in
- [ ] Desktop: Weeks grid mutes (blur + scale + opacity)
- [ ] Desktop: Close button in panel header closes panel
- [ ] Desktop: ESC key closes panel
- [ ] Desktop: Panel width is responsive (clamp 320-420px)
- [ ] Mobile: Panel becomes fullscreen overlay
- [ ] Mobile: Backdrop blur visible
- [ ] Mobile: Close button is touch-friendly (44x44px)
- [ ] Mobile: Focus moves to close button when panel opens
- [ ] All cards render with title, metric, and body
- [ ] Dynamic metrics evaluate correctly from currentStats
- [ ] No console errors
- [ ] Smooth transitions on all interactions

### To-dos

- [x] Extend statsTabs with cards array containing title, metric function, and body for each tab