/**
 * FYF Feedboard Service
 * 
 * Service für Content-Management und Personalisierung
 * des FYF Feedboard Systems
 */

import { FeedItem, ClusterSection } from '@/types/feedboard';
import { feedItems } from '@/data/feedItems';

// Cluster-Konfiguration
const CLUSTER_CONFIG = {
  'Zeit & Endlichkeit': {
    color: '#4ecdc4',
    icon: '⏰',
    description: 'Reflexion über Vergänglichkeit und bewusste Zeitnutzung'
  },
  'Freiheit & Orte': {
    color: '#ff6b6b',
    icon: '🌍',
    description: 'Nomadische Lebensweise und radikale Zeitsouveränität'
  },
  'Fokus & Flow': {
    color: '#f6c06f',
    icon: '🎯',
    description: 'Deep Work, Aufmerksamkeit und produktive Gewohnheiten'
  },
  'Geld & Wert': {
    color: '#a8e6cf',
    icon: '💰',
    description: 'Wertschöpfung, Investitionen und finanzielle Freiheit'
  },
  'Sinn & Bedeutung': {
    color: '#ffd93d',
    icon: '🧭',
    description: 'Purpose, Ikigai und existenzielle Fragen'
  },
  'Kultur & Stimmen': {
    color: '#b4a7d6',
    icon: '🎨',
    description: 'Kreative Stimmen und kulturelle Widerstände'
  },
  'Beziehungen': {
    color: '#ffb3ba',
    icon: '🤝',
    description: 'Qualität statt Quantität in menschlichen Verbindungen'
  },
  'Selbsterkenntnis': {
    color: '#c7ceea',
    icon: '🔍',
    description: 'Selbstreflexion und authentische Identität'
  },
  'Wachstum': {
    color: '#d4a5a5',
    icon: '🌱',
    description: 'Bewusste Entwicklung und kontinuierliche Verbesserung'
  }
};

export class FeedboardService {
  private static instance: FeedboardService;
  private feedItems: FeedItem[] = [];

  constructor() {
    this.feedItems = feedItems;
  }

  static getInstance(): FeedboardService {
    if (!FeedboardService.instance) {
      FeedboardService.instance = new FeedboardService();
    }
    return FeedboardService.instance;
  }

  /**
   * Alle Feed-Items abrufen
   */
  getAllItems(): FeedItem[] {
    return this.feedItems;
  }

  /**
   * Items nach Cluster/Thema gruppieren
   */
  getItemsByCluster(): ClusterSection[] {
    const clusters: { [key: string]: FeedItem[] } = {};

    this.feedItems.forEach(item => {
      if (!clusters[item.theme]) {
        clusters[item.theme] = [];
      }
      clusters[item.theme].push(item);
    });

    return Object.entries(clusters).map(([theme, items]) => ({
      thema: theme,
      items,
      color: CLUSTER_CONFIG[theme as keyof typeof CLUSTER_CONFIG]?.color || '#4ecdc4',
      icon: CLUSTER_CONFIG[theme as keyof typeof CLUSTER_CONFIG]?.icon || '📄'
    }));
  }

  /**
   * Items nach Format filtern
   */
  getItemsByFormat(format: FeedItem['format']): FeedItem[] {
    return this.feedItems.filter(item => item.format === format);
  }

  /**
   * Items nach PERMA-Werten filtern
   */
  getItemsByPERMA(perma: FeedItem['perma']): FeedItem[] {
    return this.feedItems.filter(item => item.perma === perma);
  }

  /**
   * Suche in Items
   */
  searchItems(query: string): FeedItem[] {
    const searchTerm = query.toLowerCase();
    return this.feedItems.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.guideWhy.toLowerCase().includes(searchTerm) ||
      item.theme.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Personalisierte Empfehlungen basierend auf User-Profil
   */
  getPersonalizedItems(userProfile: {
    goals?: string[];
    interests?: string[];
    musicDNA?: string[];
    timeStyle?: string;
  }): FeedItem[] {
    let scoredItems = this.feedItems.map(item => ({
      ...item,
      matchScore: this.calculateMatchScore(item, userProfile)
    }));

    // Sortiere nach Match-Score (höchste zuerst)
    scoredItems.sort((a, b) => b.matchScore - a.matchScore);

    return scoredItems.slice(0, 12); // Top 12 Empfehlungen
  }

  /**
   * Match-Score für Personalisierung berechnen
   */
  private calculateMatchScore(item: FeedItem, userProfile: any): number {
    let score = 0;

    // Basis-Score für alle Items
    score += 0.1;

    // PERMA-Alignment mit User-Goals
    if (userProfile.goals) {
      const goalKeywords = userProfile.goals.join(' ').toLowerCase();
      if (goalKeywords.includes('zeit') && item.thema === 'Zeit & Endlichkeit') score += 0.3;
      if (goalKeywords.includes('freiheit') && item.thema === 'Freiheit & Orte') score += 0.3;
      if (goalKeywords.includes('fokus') && item.thema === 'Fokus & Flow') score += 0.3;
      if (goalKeywords.includes('geld') && item.thema === 'Geld & Wert') score += 0.3;
      if (goalKeywords.includes('sinn') && item.thema === 'Sinn & Bedeutung') score += 0.3;
    }

    // Format-Präferenzen
    if (userProfile.interests) {
      const interests = userProfile.interests.join(' ').toLowerCase();
      if (interests.includes('podcast') && item.format === 'Podcast') score += 0.2;
      if (interests.includes('lesen') && item.format === 'Artikel') score += 0.2;
      if (interests.includes('musik') && item.format === 'Song') score += 0.2;
    }

    // Zeit-Style Alignment
    if (userProfile.timeStyle === 'deep' && item.thema === 'Fokus & Flow') score += 0.2;
    if (userProfile.timeStyle === 'explore' && item.thema === 'Freiheit & Orte') score += 0.2;
    if (userProfile.timeStyle === 'reflect' && item.thema === 'Zeit & Endlichkeit') score += 0.2;

    return Math.min(score, 1.0); // Maximal 1.0
  }

  /**
   * Statistiken abrufen
   */
  getStats() {
    return {
      totalItems: this.feedItems.length,
      itemsByFormat: this.getFormatStats(),
      itemsByCluster: this.getClusterStats(),
      imageStatus: this.getImageStats()
    };
  }

  private getFormatStats() {
    const stats: { [key: string]: number } = {};
    this.feedItems.forEach(item => {
      stats[item.format] = (stats[item.format] || 0) + 1;
    });
    return stats;
  }

  private getClusterStats() {
    const stats: { [key: string]: number } = {};
    this.feedItems.forEach(item => {
      stats[item.theme] = (stats[item.theme] || 0) + 1;
    });
    return stats;
  }

  private getImageStats() {
    const stats = { ok: 0, missing: 0, noPath: 0 };
    this.feedItems.forEach(item => {
      if (item.image && item.image.startsWith('/images/')) {
        stats.ok++;
      } else if (item.image && item.image !== '') {
        stats.missing++;
      } else {
        stats.noPath++;
      }
    });
    return stats;
  }

  /**
   * Einzelnes Item nach ID abrufen
   */
  getItemById(id: string): FeedItem | undefined {
    return this.feedItems.find(item => item.id === id);
  }

  /**
   * Zufällige Items für Discovery
   */
  getRandomItems(count: number = 6): FeedItem[] {
    const shuffled = [...this.feedItems].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}

// Singleton-Instanz exportieren
export const feedboardService = FeedboardService.getInstance();
