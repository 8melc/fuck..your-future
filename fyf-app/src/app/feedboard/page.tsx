'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import { feedboardService } from '@/lib/feedboardService';
import { CLUSTER_CONFIG } from '@/lib/clusterConfig';
import { FeedItem } from '@/types/feedboard';
import './feedboard.css';

type ModeKey = 'focus' | 'explore' | 'pulse';

type GridItem = {
  item: FeedItem;
  variant: 'hero' | 'standard' | 'silence';
  key: string;
};

type QuickStat = {
  label: string;
  value: string;
  note: string;
};

const MODE_CONFIG: Record<
  ModeKey,
  {
    emoji: string;
    label: string;
    tagline: string;
    clusters: string[];
  }
> = {
  focus: {
    emoji: '🎯',
    label: 'Fokus',
    tagline: '12 Slots. Null Ausreden.',
    clusters: ['Fokus & Flow', 'Zeit & Endlichkeit'],
  },
  explore: {
    emoji: '🧭',
    label: 'Explore',
    tagline: 'Finde Orte, die dich nicht betäuben.',
    clusters: ['Freiheit & Orte', 'Sinn & Bedeutung', 'Wachstum'],
  },
  pulse: {
    emoji: '⚡',
    label: 'Pulse',
    tagline: 'Watch, wann du vergeudest.',
    clusters: ['Kultur & Stimmen', 'Beziehungen', 'Geld & Wert', 'Selbsterkenntnis'],
  },
};

const INTENT_STATEMENTS = [
  {
    today: 'Nicht mehr betäuben.',
    guide: 'Du bist 16 Slots zu weich. Drei killst du heute.',
  },
  {
    today: 'Kurzfristig killen, langfristig bauen.',
    guide: 'Baust du oder sammelst du To-dos? Wähl eine Seite.',
  },
  {
    today: 'Fokus über Komfort.',
    guide: 'Komfort frisst deine Wochen. Wähl Reibung.',
  },
];

export default function FeedboardPage() {
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<ModeKey>('focus');
  const [activeCluster, setActiveCluster] = useState<string | null>(null);
  const [intentIndex, setIntentIndex] = useState(0);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [guidePrompt, setGuidePrompt] = useState('');
  const [guideResults, setGuideResults] = useState<FeedItem[]>([]);

  const allItems = useMemo(() => feedboardService.getAllItems(), []);
  const silenceCards = useMemo(() => allItems.filter(item => item.isSilence), [allItems]);
  const standardItems = useMemo(() => allItems.filter(item => !item.isSilence), [allItems]);

  const activeIntent = INTENT_STATEMENTS[intentIndex];

  useEffect(() => {
    const modeClusters = MODE_CONFIG[activeMode].clusters;
    if (activeCluster && !modeClusters.includes(activeCluster)) {
      setActiveCluster(null);
    }
  }, [activeMode, activeCluster]);

  useEffect(() => {
    if (!isGuideOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsGuideOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGuideOpen]);

  const quickStats: QuickStat[] = useMemo(
    () => [
      { label: 'Zeit heute', value: '0 Min', note: 'Alles investiert' },
      { label: 'Fokus-Level', value: '100%', note: '0% verbraucht' },
      { label: 'Intent heute', value: `„${activeIntent.today}“`, note: 'Guide Statement' },
      { label: 'Pulse', value: String(silenceCards.length), note: 'Statements in deiner Stille' },
    ],
    [activeIntent, silenceCards.length],
  );

  const modeItems = useMemo(() => {
    const clusters = MODE_CONFIG[activeMode].clusters;
    return standardItems.filter(item => clusters.includes(item.theme));
  }, [standardItems, activeMode]);

  const filteredItems = useMemo(() => {
    if (!activeCluster) {
      return modeItems;
    }
    return modeItems.filter(item => item.theme === activeCluster);
  }, [modeItems, activeCluster]);

  const gridItems: GridItem[] = useMemo(() => {
    const result: GridItem[] = [];
    if (!filteredItems.length) {
      return result;
    }

    const sorted = [...filteredItems].sort(
      (a, b) => Number(Boolean(b.isHero)) - Number(Boolean(a.isHero)),
    );

    let silenceCursor = 0;
    sorted.forEach((item, index) => {
      if (index > 0 && index % 5 === 0 && silenceCards.length > 0) {
        const silence = silenceCards[silenceCursor % silenceCards.length];
        result.push({
          item: silence,
          variant: 'silence',
          key: `silence-${silence.id}-${index}-${silenceCursor}`,
        });
        silenceCursor += 1;
      }

      result.push({
        item,
        variant: item.isHero ? 'hero' : 'standard',
        key: item.id,
      });
    });

    return result;
  }, [filteredItems, silenceCards]);

  const secondaryItems = useMemo(() => {
    const modeClusters = MODE_CONFIG[activeMode].clusters;
    return standardItems
      .filter(item => !modeClusters.includes(item.theme))
      .slice(0, 6);
  }, [standardItems, activeMode]);

  const activeClusterConfig = activeCluster ? CLUSTER_CONFIG[activeCluster] : undefined;

  const handleGuideSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prompt = guidePrompt.trim();
    if (!prompt) {
      return;
    }

    const searchResults = feedboardService.searchItems(prompt);
    setGuideResults(searchResults.slice(0, 6));
  };

  return (
    <>
      <TickTockHeader
        isOpen={isHeaderOpen}
        quickStats={quickStats}
        activeMode={activeMode}
        onToggle={() => setIsHeaderOpen(value => !value)}
        onModeChange={mode => setActiveMode(mode)}
        onCycleIntent={() => setIntentIndex(index => (index + 1) % INTENT_STATEMENTS.length)}
        intent={activeIntent}
        onOpenGuide={() => setIsGuideOpen(true)}
        onSetFocus={() => setActiveMode('focus')}
      />

      <div className={`feedboard-shell ${isHeaderOpen ? 'header-open' : ''}`}>
        <div className="feedboard-shell__background" aria-hidden="true" />

        <section className="feedboard-controls">
          <div className="feedboard-controls__mode">
            <span className="feedboard-controls__mode-label">
              {MODE_CONFIG[activeMode].emoji} {MODE_CONFIG[activeMode].label}
            </span>
            <p className="feedboard-controls__mode-tagline">
              {MODE_CONFIG[activeMode].tagline}
            </p>
          </div>

          <div className="feedboard-cluster-chips" role="tablist" aria-label="Cluster Filter">
            <button
              type="button"
              className={`feedboard-chip ${activeCluster === null ? 'is-active' : ''}`}
              onClick={() => setActiveCluster(null)}
            >
              Alle Territorien
            </button>

            {MODE_CONFIG[activeMode].clusters.map(clusterName => {
              const config = CLUSTER_CONFIG[clusterName];
              return (
                <button
                  key={clusterName}
                  type="button"
                  role="tab"
                  className={`feedboard-chip ${activeCluster === clusterName ? 'is-active' : ''}`}
                  onClick={() =>
                    setActiveCluster(prev => (prev === clusterName ? null : clusterName))
                  }
                  style={{ '--chip-accent': config?.color || '#4ecdc4' } as CSSProperties}
                >
                  <span aria-hidden="true">{config?.icon ?? '◯'}</span>
                  {clusterName}
                </button>
              );
            })}
          </div>

          {activeClusterConfig && (
            <p className="feedboard-cluster-intro">
              <span aria-hidden="true">{activeClusterConfig.icon}</span>{' '}
              {activeClusterConfig.intro}
            </p>
          )}
        </section>

        <section className="feedboard-grid" aria-live="polite">
          {gridItems.map(({ item, variant, key }) => (
            <FeedCard key={key} item={item} variant={variant} />
          ))}

          {!gridItems.length && (
            <div className="feedboard-empty">
              <p>Keine Inhalte für dieses Cluster. Wähl ein anderes Terrain.</p>
            </div>
          )}
        </section>

        {secondaryItems.length > 0 && (
          <section className="feedboard-secondary">
            <div className="feedboard-secondary__headline">
              <h2>Mehr aus anderen Territorien</h2>
              <p>Du willst querverlinken? Geh rüber und hol dir andere Perspektiven.</p>
            </div>
            <div className="feedboard-secondary__grid">
              {secondaryItems.map(item => (
                <FeedCard key={`secondary-${item.id}`} item={item} variant="standard" size="compact" />
              ))}
            </div>
          </section>
        )}
      </div>

      <GuideModal
        open={isGuideOpen}
        prompt={guidePrompt}
        onPromptChange={setGuidePrompt}
        onClose={() => {
          setIsGuideOpen(false);
          setGuidePrompt('');
          setGuideResults([]);
        }}
        onSubmit={handleGuideSubmit}
        results={guideResults}
      />
    </>
  );
}

type HeaderProps = {
  isOpen: boolean;
  quickStats: QuickStat[];
  activeMode: ModeKey;
  onToggle: () => void;
  onModeChange: (mode: ModeKey) => void;
  onCycleIntent: () => void;
  intent: (typeof INTENT_STATEMENTS)[number];
  onOpenGuide: () => void;
  onSetFocus: () => void;
};

function TickTockHeader({
  isOpen,
  quickStats,
  activeMode,
  onToggle,
  onModeChange,
  onCycleIntent,
  intent,
  onOpenGuide,
  onSetFocus,
}: HeaderProps) {
  return (
    <header className={`ticktock-header ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="ticktock-header__toggle"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="ticktock-header__label">TICK TOCK GUIDE</span>
        <span className="ticktock-header__chevron" aria-hidden="true">
          {isOpen ? '▾' : '▸'}
        </span>
        <span className="ticktock-header__teaser">Dein Fokus-Feed. Für Mut statt Hustle.</span>
      </button>

      <div className="ticktock-header__body">
        <div className="ticktock-header__manifest">
          <div className="ticktock-header__manifest-title">TICK TOCK GUIDE</div>
          <p className="ticktock-header__manifest-copy">
            Dein Fokus-Feed. Schraub das Hustle-Level runter und hol dir 12 Stunden Fokus zurück – ohne
            schlechter zu performen.
          </p>
          <div className="ticktock-header__manifest-glow" aria-hidden="true" />
        </div>

        <div className="ticktock-header__modes" role="tablist" aria-label="Guide-Filter">
          {(Object.keys(MODE_CONFIG) as ModeKey[]).map(modeKey => {
            const mode = MODE_CONFIG[modeKey];
            const isActive = activeMode === modeKey;
            return (
              <button
                key={modeKey}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`ticktock-header__mode ${isActive ? 'is-active' : ''}`}
                onClick={() => onModeChange(modeKey)}
              >
                <span aria-hidden="true">{mode.emoji}</span> {mode.label}
              </button>
            );
          })}
        </div>

        <div className="ticktock-header__stats">
          {quickStats.map(stat => (
            <div key={stat.label} className="ticktock-stat">
              <span className="ticktock-stat__label">{stat.label}</span>
              <span className="ticktock-stat__value">{stat.value}</span>
              <span className="ticktock-stat__note">{stat.note}</span>
            </div>
          ))}
        </div>

        <div className="ticktock-header__intent">
          <div className="ticktock-intent__badge" aria-hidden="true">
            🜂
          </div>
          <div>
            <h3>Heute: „{intent.today}“</h3>
            <p>Guide sagt: {intent.guide}</p>
          </div>

          <div className="ticktock-intent__actions">
            <button type="button" className="ttg-button ttg-button--solid" onClick={onSetFocus}>
              Fokus setzen
            </button>
            <button type="button" className="ttg-button ttg-button--ghost" onClick={onOpenGuide}>
              Guide fragen
            </button>
            <button type="button" className="ttg-button ttg-button--link" onClick={onCycleIntent}>
              Statement wechseln
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

type FeedCardProps = {
  item: FeedItem;
  variant: 'hero' | 'standard' | 'silence';
  size?: 'default' | 'compact';
};

function FeedCard({ item, variant, size = 'default' }: FeedCardProps) {
  const cluster = CLUSTER_CONFIG[item.theme];
  const accent = cluster?.color ?? '#4ecdc4';
  const icon = cluster?.icon ?? '◯';

  const cardClass = [
    'feed-card',
    `feed-card--${variant}`,
    size === 'compact' ? 'feed-card--compact' : '',
    item.hasGlitch ? 'feed-card--glitch' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {!item.isSilence && (
        <div
          className="feed-card__visual"
          style={
            {
              '--feed-card-visual': item.image ? `url(${item.image})` : 'none',
              '--feed-card-accent': accent,
            } as CSSProperties
          }
          aria-hidden="true"
        />
      )}

      <div className="feed-card__overlay" />

      <div className="feed-card__body">
        <div className="feed-card__cluster" style={{ color: accent }}>
          <span aria-hidden="true">{icon}</span>
          <span>{item.theme}</span>
        </div>

        <h3 className="feed-card__title">{item.title}</h3>

        {item.guideComment && <p className="feed-card__comment">{item.guideComment}</p>}

        {item.guideWhy && <p className="feed-card__why">{item.guideWhy}</p>}

        {item.chips?.length > 0 && (
          <div className="feed-card__chips">
            {item.chips.map(chip => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        )}
      </div>
    </>
  );

  if (variant === 'silence' || item.link === '#') {
    return (
      <article className={cardClass} data-variant={variant}>
        <div className="feed-card__body feed-card__body--silence">
          <span className="feed-card__cluster" style={{ color: accent }}>
            {icon}
          </span>
          <h3 className="feed-card__title">{item.title}</h3>
          {item.guideComment && <p className="feed-card__comment">{item.guideComment}</p>}
        </div>
      </article>
    );
  }

  return (
    <article className={cardClass} data-variant={variant}>
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="feed-card__link">
        {content}
      </a>
    </article>
  );
}

type GuideModalProps = {
  open: boolean;
  prompt: string;
  onPromptChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  results: FeedItem[];
};

function GuideModal({ open, prompt, onPromptChange, onSubmit, onClose, results }: GuideModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="guide-modal" role="dialog" aria-modal="true">
      <div className="guide-modal__panel">
        <div className="guide-modal__header">
          <h2>Guide fragen</h2>
          <button type="button" onClick={onClose} aria-label="Guide schließen">
            ✕
          </button>
        </div>

        <form className="guide-modal__form" onSubmit={onSubmit}>
          <label htmlFor="guide-input">Was blockiert dich?</label>
          <textarea
            id="guide-input"
            value={prompt}
            onChange={event => onPromptChange(event.target.value)}
            placeholder="Frag den Guide ohne Filter."
            rows={4}
          />

          <button type="submit" className="ttg-button ttg-button--solid">
            Suche starten
          </button>
        </form>

        {results.length > 0 && (
          <div className="guide-modal__results">
            <h3>Der Guide wirft dir das hin:</h3>
            <ul>
              {results.map(result => (
                <li key={result.id}>
                  <a href={result.link} target="_blank" rel="noopener noreferrer">
                    {result.title}
                  </a>
                  <span>{result.guideComment ?? result.guideWhy}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
