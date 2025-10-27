'use client';

import { GuideTone } from '@/stores/guideStore';

// Text-Mapping für beide Ton-Modi
export const guideTexts = {
  // Actions & To-Dos
  actionsTitle: {
    straight: 'Aktionen',
    soft: 'Deine nächsten Schritte',
  },
  actionsEmpty: {
    straight: 'Zeit für Arbeit. Nicht für Ausreden.',
    soft: 'Bereit für den nächsten Schritt?',
  },
  timeAudit: {
    straight: 'Dein Kalender zeigt 6h Meetings. Welche streichst du?',
    soft: 'Wo könntest du diese Woche Zeit zurückgewinnen?',
  },
  freedomFramework: {
    straight: 'Freiheit hat einen Preis. Entscheidest du ihn bewusst oder zahlst du ihn unbewusst?',
    soft: 'Was bedeutet Freiheit für dich? Lass uns das gemeinsam definieren.',
  },

  // Goal & Progress
  goalProgress: {
    straight: '32% erfüllt. 68% fehlen noch. Was machst du heute?',
    soft: 'Du bist auf einem guten Weg. Weiter so!',
  },
  goalEdit: {
    straight: 'Ziel bearbeiten',
    soft: 'Ziel anpassen',
  },

  // Conversation & Guide
  conversationTitle: {
    straight: 'Conversation',
    soft: 'Dein Guide',
  },
  guideWelcome: {
    straight: 'Hier liest du nicht, um Zeit totzuschlagen, sondern weil dir ein leerer Feed längst egal wäre.',
    soft: 'Willkommen! Ich bin hier, um dich zu unterstützen.',
  },
  guideTip: {
    straight: 'Pausiere regelmäßig für Fokus. Nicht optional.',
    soft: 'Pausiere regelmäßig für Fokus.',
  },

  // Zeit-Profil
  timeProfileTitle: {
    straight: 'Zeit-Profil',
    soft: 'Deine Zeit-Philosophie',
  },
  timePhilosophy: {
    straight: 'Zeit ist gespeicherte Aufmerksamkeit. Investierst du sie oder verschwendest du sie?',
    soft: 'Zeit ist ein wertvolles Geschenk. Wie möchtest du sie nutzen?',
  },
  focusBlocks: {
    straight: 'Wie viele Fokus-Blöcke hattest du diese Woche? Ehrlich.',
    soft: 'Wie viele Fokus-Blöcke hattest du diese Woche?',
  },

  // Energie-Feeds
  energyFeedsTitle: {
    straight: 'Energie-Feeds',
    soft: 'Deine Interessen',
  },
  spotifyConnect: {
    straight: 'Spotify verbinden für Soundscapes. Oder nicht.',
    soft: 'Spotify verbinden für deine persönlichen Soundscapes',
  },

  // Tageslimit
  dailyLimitTitle: {
    straight: 'Tageslimit',
    soft: 'Deine Zeit-Grenzen',
  },
  dailyLimitUsed: {
    straight: 'Heute verbraucht: 60 Minuten. Noch 60 übrig.',
    soft: 'Du hast heute 60 Minuten genutzt. Noch 60 Minuten verfügbar.',
  },

  // Filter
  filterTitle: {
    straight: 'Filter',
    soft: 'Content-Einstellungen',
  },
  filterDescription: {
    straight: 'Nicht dein Ding? Mute diese Kategorie.',
    soft: 'Passe deine Inhalte nach deinen Wünschen an.',
  },

  // Journey
  journeyTitle: {
    straight: 'Journey',
    soft: 'Dein Weg',
  },
  journeyEmpty: {
    straight: 'Noch keine Journey. Starte heute.',
    soft: 'Dein persönlicher Weg beginnt hier.',
  },

  // Feedback
  feedbackTitle: {
    straight: 'Feedback & Impulse',
    soft: 'Dein Feedback',
  },
  feedbackQuestion: {
    straight: 'Was bedeutet Freiheit für dich? Ehrlich.',
    soft: 'Was bedeutet Freiheit für dich?',
  },
  feedbackChallenge: {
    straight: 'Dein Kalender zeigt noch 6 Stunden Meetings diese Woche.',
    soft: 'Du könntest diese Woche Zeit für dich gewinnen.',
  },

  // Guide Settings
  guideSettingsTitle: {
    straight: 'Guide-Einstellungen',
    soft: 'Deine Guide-Präferenzen',
  },
  toneStraight: {
    straight: 'Straight Talk',
    soft: 'Direkt & Ehrlich',
  },
  toneSoft: {
    straight: 'Soft Touch',
    soft: 'Sanft & Motivierend',
  },
  toneActive: {
    straight: 'Modus: Straight Talk aktiviert',
    soft: 'Modus: Soft Touch aktiviert',
  },
  haltDieFresse: {
    straight: 'Halt die Fresse',
    soft: 'Guide pausieren',
  },
  haltDieFresseFeedback: {
    straight: 'Okay, ich halte jetzt die Klappe. Du kannst mich jederzeit wieder aktivieren.',
    soft: 'Ich pausiere jetzt. Du kannst mich jederzeit wieder aktivieren.',
  },
  nudgingTitle: {
    straight: 'Nudging-Frequenz',
    soft: 'Erinnerungen',
  },
  nudgingDescription: {
    straight: 'Ich erinnere dich jetzt, weil du gesagt hast, das ist wichtig.',
    soft: 'Ich unterstütze dich mit sanften Erinnerungen.',
  },

  // Life Weeks
  lifeWeeksTitle: {
    straight: 'Life in Weeks',
    soft: 'Deine Zeit-Visualisierung',
  },
  lifeWeeksDescription: {
    straight: 'Visualisiere deine verbleibende Zeit. Jede Woche zählt.',
    soft: 'Visualisiere deine verbleibende Zeit.',
  },
  lifeWeeksOpen: {
    straight: 'Life Weeks öffnen',
    soft: 'Zeit-Visualisierung öffnen',
  },

  // Common phrases
  edit: {
    straight: 'Bearbeiten',
    soft: 'Anpassen',
  },
  save: {
    straight: 'Speichern',
    soft: 'Speichern',
  },
  cancel: {
    straight: 'Abbrechen',
    soft: 'Abbrechen',
  },
  continue: {
    straight: 'Weiter',
    soft: 'Weiter',
  },
};

// Helper-Funktion für dynamische Texte
export const getGuideText = (key: keyof typeof guideTexts, tone: GuideTone): string => {
  return guideTexts[key][tone];
};

// Helper-Funktion für bedingte Texte (wenn Guide aktiv/inaktiv)
export const getGuideTextWithStatus = (
  key: keyof typeof guideTexts, 
  tone: GuideTone, 
  guideActive: boolean
): string => {
  if (!guideActive) {
    return 'Guide ist pausiert.';
  }
  return getGuideText(key, tone);
};

// Helper für Ton-spezifische Styling-Klassen
export const getToneClass = (tone: GuideTone, baseClass: string): string => {
  return `${baseClass} tone-${tone}`;
};

// Helper für Ton-spezifische Farben
export const getToneColor = (tone: GuideTone): string => {
  return tone === 'straight' ? 'var(--fyf-coral)' : 'var(--fyf-mint)';
};
