/**
 * FYF Feedboard Type Definitions
 * 
 * TypeScript Interfaces für das Feedboard-System
 * basierend auf der importierten Notion-Datenbank
 */

export interface FeedItem {
  id: string;
  title: string;
  description: string;
  format: 'Zitat' | 'Artikel' | 'Event' | 'People' | 'Podcast' | 'Song';
  theme: 'Zeit & Endlichkeit' | 'Beziehungen' | 'Wachstum' | 'Selbsterkenntnis' | 'Sinn & Bedeutung' | 'Fokus & Flow' | 'Freiheit & Orte' | 'Geld & Wert' | 'Kultur & Stimmen';
  perma: 'Meaning' | 'Relationships' | 'Accomplishment' | 'Engagement' | 'Positive Emotions';
  link: string;
  image: string;
  guideWhy: string;
  source?: 'feedboard' | 'guide' | 'manual';
  chips: string[];
  isHero?: boolean;          // Markiert dominante/hero cards
  isSilence?: boolean;       // Markiert Silence Cards
  hasGlitch?: boolean;       // Markiert Cards mit Störungseffekt
  guideComment?: string;     // Neuer FYF-Untertitel
}

export interface FeedData {
  metadata: {
    importDate: string;
    version: string;
    source: string;
    totalItems: number;
    stats: {
      total: number;
      processed: number;
      imagesOk: number;
      imagesMissing: number;
      issues: string[];
    };
  };
  feedItems: FeedItem[];
}

export interface ClusterSection {
  thema: string;
  items: FeedItem[];
  color: string;             // Hex color
  icon: string;              // Emoji icon
  intro: string;             // FYF-Intro-Text
}

export interface FeedboardState {
  items: FeedItem[];
  filteredItems: FeedItem[];
  activeFilter: string | null;
  selectedCluster: string | null;
  searchQuery: string;
  viewMode: 'grid' | 'list' | 'focus';
}

export interface GuideComment {
  text: string;
  tone: 'straight' | 'soft';
  timestamp: string;
}

export interface TransparencyInfo {
  reason: string;
  algorithm: string;
  personalization: string[];
}
