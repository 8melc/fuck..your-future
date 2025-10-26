'use client';

import { useEffect, useRef, useState } from 'react';
import './feedboard.css';

type SliderCard = {
  title: string;
  subtitle: string;
  image: string;
};

type CarouselItem = {
  name: string;
  gradient: string;
};

type GalleryItem = {
  name: string;
  country: string;
  description: string;
  image: string;
};

type ThemeItem = {
  title: string;
  subtitle: string;
  action: string;
  image: string;
};

const SLIDER_CARDS: SliderCard[] = [
  {
    title: 'Pop Ready-Made',
    subtitle: 'Bilder der Macht',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Der Spiegel starrt dich an',
    subtitle: 'Marzia Miglioras Liebeslieder',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Künstliche Perlen',
    subtitle: 'Erlebnisse unter Oberfläche',
    image: 'https://images.unsplash.com/photo-1473862170180-53121d3d90eb?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Memphis Shift',
    subtitle: 'Wenn Form Haltung wird',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80',
  },
];

const CAROUSEL_ITEMS: CarouselItem[] = [
  { name: 'Visual Crosswords', gradient: 'linear-gradient(135deg,#e0f7fa,#fff9c4)' },
  { name: 'Art Coloring Book', gradient: 'linear-gradient(135deg,#fce4ec,#e3f2fd)' },
  { name: 'Geo Artwork', gradient: 'linear-gradient(135deg,#ede7f6,#fff8e1)' },
  { name: 'Guess the Line', gradient: 'linear-gradient(135deg,#f3e5f5,#f1f8e9)' },
  { name: 'Audio Stories', gradient: 'linear-gradient(135deg,#ffe0b2,#bbdefb)' },
];

const GALLERY_ITEMS: GalleryItem[] = [
  {
    name: 'NEMO Science Museum',
    country: 'Niederlande',
    description: 'Hands-on Freiheit, gestaltet von Visionären in Amsterdam.',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'National Museum of Nature',
    country: 'Japan',
    description: 'Tokyo zeigt dir, wie Struktur und Natur koexistieren.',
    image: 'https://images.unsplash.com/photo-1529429617124-aee3d4d0404b?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Science Museum',
    country: 'UK',
    description: 'Londoner Stimme zum Thema Zeit als Ressource.',
    image: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'TEKNISKA',
    country: 'Schweden',
    description: 'Stockholm zeigt radikale Nachhaltigkeitsprojekte.',
    image: 'https://images.unsplash.com/photo-1554653189-190318d12c5b?auto=format&fit=crop&w=800&q=80',
  },
];

const THEME_ITEMS: ThemeItem[] = [
  {
    title: 'Die Welt der Maya erkunden',
    subtitle: 'Eine Reise in die Vergangenheit',
    action: 'Erkunden',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Lerne die Menschen Kenias kennen',
    subtitle: 'Aus der Wiege der Menschheit',
    action: 'Entdecken',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Wunder Pakistans',
    subtitle: 'Kulturelle Schätze & Moderne',
    action: 'Reise',
    image: 'https://images.unsplash.com/photo-1526481280695-3c469928fee3?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Wayang-Schattenpuppen',
    subtitle: 'Stil, Geschichten, Überraschungen',
    action: 'Anschauen',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80',
  },
];

const TIMELINE_SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'slider', label: 'Moodboard' },
  { id: 'carousel', label: 'Play' },
  { id: 'gallery', label: 'Museen' },
  { id: 'themes', label: 'Welten' },
];

const KEYWORD_MAP: Array<{ keywords: string[]; indices: number[] }> = [
  { keywords: ['fokus', 'focus', 'block'], indices: [0, 1] },
  { keywords: ['wissen', 'essay'], indices: [2, 3] },
  { keywords: ['stimme', 'voice', 'mensch'], indices: [0, 1] },
  { keywords: ['aktion', 'heute'], indices: [0, 1] },
];

export default function FeedboardPage() {
  const [guideOpen, setGuideOpen] = useState(false);
  const [guidePrompt, setGuidePrompt] = useState('');
  const [guideResults, setGuideResults] = useState<ThemeItem[]>([]);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    TIMELINE_SECTIONS.forEach(({ id }) => {
      sectionRefs.current[id] = document.getElementById(id);
    });
  }, []);

  useEffect(() => {
    if (!guideOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setGuideOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [guideOpen]);

  const handleTimelineClick = (id: string) => {
    const target = sectionRefs.current[id];
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleGuideSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prompt = guidePrompt.trim().toLowerCase();
    if (!prompt) return;

    const match = KEYWORD_MAP.find((entry) => entry.keywords.some((keyword) => prompt.includes(keyword)));
    const items = match ? match.indices.map((i) => THEME_ITEMS[i % THEME_ITEMS.length]) : THEME_ITEMS.slice(0, 3);
    setGuideResults(items);
  };

  return (
    <div className="feedboard-page feedboard-noise">
      <div className="feedboard-ambient" aria-hidden="true" />

      <nav className="feedboard-timeline" aria-label="Sektionen">
        {TIMELINE_SECTIONS.map(({ id, label }) => (
          <button key={id} type="button" onClick={() => handleTimelineClick(id)}>
            {label}
          </button>
        ))}
      </nav>

      <div className="feedboard-shell">
        <header className="feedboard-hero" id="hero">
          <div className="feedboard-heroContent">
            <span className="feedboard-highlight">FYF Feedboard · Auto Curation</span>
            <span className="feedboard-heroKicker">Guide-Kanal für Mara Jensen · Freiheit · Fokus · Wirkung</span>
            <h1 className="feedboard-heroTitle">Dein Feedboard ist kein Dashboard. Es ist der Raum, in dem dein nächster Schritt sichtbar wird.</h1>
            <p className="feedboard-heroText">
              FYF kuratiert nur das, was deine Ziel-Logik stärkt. Explore wie in einer Galerie, spiel mit dem Guide und lass dich
              von Stimmen mitnehmen, die Freiheit verhandeln.
            </p>
          </div>
        </header>

        <section className="feedboard-section" id="slider">
          <div className="feedboard-sectionInner">
            <div className="feedboard-sectionHeader">
              <span className="feedboard-sectionKicker">Moodboard · Materielle Welt</span>
              <h2 className="feedboard-sectionTitle">Zieh durch deine nächste Kulisse.</h2>
              <p className="feedboard-sectionSubtitle">Swipe durch kuratierte Statements – jeder Slide ein anderer Blick auf dein Freedom-Narrativ.</p>
            </div>
            <div className="feedboard-cardSlider">
              {SLIDER_CARDS.map((card) => (
                <article className="feedboard-sliderCard" key={card.title}>
                  <div className="feedboard-sliderImage" style={{ backgroundImage: `url(${card.image})` }} />
                  <div className="feedboard-sliderContent">
                    <h3>{card.title}</h3>
                    <p>{card.subtitle}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="feedboard-section" id="carousel">
          <div className="feedboard-sectionInner">
            <div className="feedboard-sectionHeader">
              <span className="feedboard-sectionKicker">Play · Experimente</span>
              <h2 className="feedboard-sectionTitle">Aktiviere deinen Fokus spielerisch.</h2>
              <p className="feedboard-sectionSubtitle">Diese Experimente brechen deine Muster und lassen dir Raum für Testläufe – wie Google Arts & Culture, nur auf Freiheit getunt.</p>
            </div>
            <div className="feedboard-gamesCarousel">
              {CAROUSEL_ITEMS.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className="feedboard-game"
                  style={{ background: item.gradient }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="feedboard-section" id="gallery">
          <div className="feedboard-sectionInner">
            <div className="feedboard-sectionHeader">
              <span className="feedboard-sectionKicker">Stimmen · Orte</span>
              <h2 className="feedboard-sectionTitle">Menschen & Museen, die dir Kontext geben.</h2>
              <p className="feedboard-sectionSubtitle">Wir holen Stimmen aus der Welt, die Freiheit nicht romantisieren, sondern gestalten. Ein digitaler Museumsgang nur für dich.</p>
            </div>
            <div className="feedboard-museumGallery">
              {GALLERY_ITEMS.map((item) => (
                <article className="feedboard-museumCard" key={item.name}>
                  <div className="feedboard-museumImage" style={{ backgroundImage: `url(${item.image})` }} />
                  <div className="feedboard-museumContent">
                    <h3>{item.name}</h3>
                    <p className="feedboard-museumCountry">{item.country}</p>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="feedboard-section" id="themes">
          <div className="feedboard-sectionInner">
            <div className="feedboard-sectionHeader">
              <span className="feedboard-sectionKicker">Explore · Welten</span>
              <h2 className="feedboard-sectionTitle">Dein Guide zeigt dir Welten, die deine Perspektive weiten.</h2>
              <p className="feedboard-sectionSubtitle">Jede Karte ist ein Ticket in eine andere Zeit, Kultur oder Haltung. Pick eine – der Guide erzählt dir den Kontext.</p>
            </div>
            <div className="feedboard-themeGrid">
              {THEME_ITEMS.map((item) => (
                <article className="feedboard-themeCard" key={item.title} style={{ backgroundImage: `url(${item.image})` }}>
                  <div className="feedboard-themeOverlay">
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                    <button type="button">{item.action}</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer className="feedboard-outro" id="outro">
          <div className="feedboard-outroContent">
            <h2 className="feedboard-sectionTitle">Der Guide kuratiert. Du entscheidest.</h2>
            <p className="feedboard-sectionSubtitle">
              Sprich mit dem Guide, committe Actions oder vertiefe Wissen. FYF arbeitet für dich, sobald du sagst, was Gewicht hat.
            </p>
            <div className="feedboard-outroActions">
              <a href="#carousel" className="feedboard-cta feedboard-ctaPrimary">Spielen</a>
              <a href="#gallery" className="feedboard-cta">Stimmen hören</a>
              <a href="#themes" className="feedboard-cta">Welten öffnen</a>
            </div>
          </div>
        </footer>
      </div>

      <button
        type="button"
        className="feedboard-guideOrb"
        aria-label="Guide öffnen"
        onClick={() => setGuideOpen(true)}
      >
        🜂
      </button>

      <div
        className={`feedboard-portal${guideOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedboard-guide-title"
        onClick={(event) => {
          if (event.currentTarget === event.target) setGuideOpen(false);
        }}
      >
        <div className="feedboard-dialog">
          <header>
            <h2 id="feedboard-guide-title">Frag den FYF Guide</h2>
            <button
              type="button"
              className="feedboard-close"
              aria-label="Guide schließen"
              onClick={() => setGuideOpen(false)}
            >
              &times;
            </button>
          </header>
          <p>
            Schreib, was du brauchst. Zum Beispiel: „Wie plane ich 3 Monate Freiheit?“ oder „Welche Stimmen verstehen Freiheit radikal?“
          </p>
          <form onSubmit={handleGuideSubmit}>
            <input
              type="text"
              value={guidePrompt}
              onChange={(event) => setGuidePrompt(event.target.value)}
              placeholder="Hey Guide, erzähl mir etwas über..."
              required
            />
          </form>
          <div className="feedboard-guideResults">
            {guideResults.length > 0
              ? guideResults.map((item) => (
                  <div className="feedboard-guideCard" key={item.title}>
                    <span className="feedboard-cardKicker">FYF Empfehlung</span>
                    <strong>{item.title}</strong>
                    <p>{item.subtitle}</p>
                    <span className="feedboard-chip feedboard-chipMint">{item.action}</span>
                  </div>
                ))
              : (
                  <p className="feedboard-sectionSubtitle">Der Guide hört zu. Frag ihn, was du brauchst.</p>
                )}
          </div>
        </div>
      </div>
    </div>
  );
}
