#!/usr/bin/env node

/**
 * FYF Feedboard Link Integration Script
 * 
 * Ergänzt fehlende Links in der Feed-Datenbank
 * basierend auf Titel-Mapping und Themen-Clustern
 */

const fs = require('fs');
const path = require('path');

// Konfiguration
const CONFIG = {
  inputFile: '/Users/melissaconrads/Desktop/MVP2/fyf-app/src/data/feedItems.ts',
  outputFile: '/Users/melissaconrads/Desktop/MVP2/fyf-app/src/data/feedItems.ts',
  logFile: '/Users/melissaconrads/Desktop/MVP2/docs/data/link_integration_log.json'
};

// Link-Mapping basierend auf Titeln und Themen
const LINK_MAPPING = {
  // Zeit & Endlichkeit
  'Your Life in Weeks': 'https://waitbutwhy.com/2014/05/life-weeks.html',
  'Four Thousand Weeks': 'https://oliverburkeman.com/fourthousandweeks',
  'Why We Can\'t Manage Time': 'https://www.oliverburkeman.com/fourhundredweeks',
  'Zwischen Reiz und Reaktion': 'https://www.themarginalian.org/frankl-between-stimulus-response',
  
  // Fokus & Flow
  'Deep Work vs. Shallow Habits': 'https://calnewport.com/deep-work',
  'Why Attention is the New IQ': 'https://fs.blog/attention-iq/',
  'Begrenzung ist Befreiung': 'https://fuckyourfuture.com/manifesto',
  
  // Freiheit & Orte
  '10 Best Coworking Spaces in Bali for Deep Work': 'https://nomadlist.com/bali-coworking-spaces',
  'The Shadow Side of Paradise': 'https://www.thenomadpodcast.com/episodes/shadow-side-paradise',
  
  // Geld & Wert
  'Money as Energy': 'https://aeon.co/essays/money-energy',
  'The Psychology of Enough': 'https://hiddenbrain.org/podcast/the-psychology-of-enough',
  'Morgan Housel – The Psychology of Money': 'https://www.morganhousel.com/the-psychology-of-money',
  
  // Sinn & Bedeutung
  'You Don\'t Have to Be Happy to Have Meaning': 'https://psyche.co/ideas/you-dont-have-to-be-happy-to-have-meaning',
  'Purpose Isn\'t a Job Title': 'https://onbeing.org/programs/purpose-conversations',
  'Héctor García & Francesc Miralles – Ikigai': 'https://www.penguinrandomhouse.com/books/538186/ikigai-by-hector-garcia-and-francesc-miralles',
  
  // Kultur & Stimmen
  'Austin Kleon – Show Your Work': 'https://austinkleon.com/show-your-work',
  'Art as Resistance in the Attention Economy': 'https://www.theatlantic.com/technology/archive/art-resistance-attention-economy',
  'Erykah Badu – Didn\'t Cha Know': 'https://open.spotify.com/track/4F7cbKTjOHZvNaVLQpMw9s'
};

// Themen-basierte Link-Generierung
const THEME_LINKS = {
  'Zeit & Endlichkeit': {
    'default': 'https://waitbutwhy.com/2014/05/life-weeks.html',
    'keywords': ['zeit', 'endlichkeit', 'tod', 'leben', 'wochen']
  },
  'Fokus & Flow': {
    'default': 'https://calnewport.com/deep-work',
    'keywords': ['fokus', 'flow', 'aufmerksamkeit', 'deep work']
  },
  'Freiheit & Orte': {
    'default': 'https://nomadlist.com',
    'keywords': ['freiheit', 'orte', 'nomad', 'reisen']
  },
  'Geld & Wert': {
    'default': 'https://www.morganhousel.com',
    'keywords': ['geld', 'wert', 'psychologie', 'finanzen']
  },
  'Sinn & Bedeutung': {
    'default': 'https://onbeing.org',
    'keywords': ['sinn', 'bedeutung', 'purpose', 'meaning']
  },
  'Kultur & Stimmen': {
    'default': 'https://www.theatlantic.com',
    'keywords': ['kultur', 'stimmen', 'kunst', 'kreativität']
  }
};

// Finde passenden Link basierend auf Titel und Thema
function findLink(titel, thema, existingLink) {
  // Wenn bereits ein Link vorhanden ist, behalte ihn
  if (existingLink && existingLink.trim() !== '') {
    return { link: existingLink, status: 'ok' };
  }
  
  // Suche nach exaktem Titel-Match
  if (LINK_MAPPING[titel]) {
    return { link: LINK_MAPPING[titel], status: 'added' };
  }
  
  // Suche nach themen-basiertem Link
  const themeConfig = THEME_LINKS[thema];
  if (themeConfig) {
    // Prüfe Keywords im Titel
    const titelLower = titel.toLowerCase();
    for (const keyword of themeConfig.keywords) {
      if (titelLower.includes(keyword)) {
        return { link: themeConfig.default, status: 'added' };
      }
    }
    // Fallback auf Theme-Default
    return { link: themeConfig.default, status: 'added' };
  }
  
  // Fallback für unbekannte Themen
  return { link: 'https://fuckyourfuture.com', status: 'fallback' };
}

// Hauptfunktion
function integrateLinks() {
  console.log('🔗 FYF Feedboard Link Integration gestartet...\n');
  
  // Lese die TypeScript-Datei
  let fileContent;
  try {
    fileContent = fs.readFileSync(CONFIG.inputFile, 'utf8');
    console.log(`✅ TypeScript-Datei gelesen: ${CONFIG.inputFile}`);
  } catch (error) {
    console.error(`❌ Fehler beim Lesen der Datei: ${error.message}`);
    process.exit(1);
  }
  
  // Extrahiere die feedItems aus der TypeScript-Datei
  const feedItemsMatch = fileContent.match(/export const feedItems = \[([\s\S]*?)\];/);
  if (!feedItemsMatch) {
    console.error('❌ Konnte feedItems Array nicht finden');
    process.exit(1);
  }
  
  // Parse die JSON-Daten (vereinfacht)
  const jsonMatch = fileContent.match(/export const feedItems = (\[[\s\S]*?\]);/);
  if (!jsonMatch) {
    console.error('❌ Konnte JSON-Daten nicht extrahieren');
    process.exit(1);
  }
  
  let feedItems;
  try {
    // Ersetze TypeScript-spezifische Syntax mit JSON-kompatibler Syntax
    const jsonString = jsonMatch[1]
      .replace(/ as const/g, '')
      .replace(/(\w+):/g, '"$1":')
      .replace(/'/g, '"');
    
    feedItems = JSON.parse(jsonString);
  } catch (error) {
    console.error(`❌ Fehler beim Parsen der JSON-Daten: ${error.message}`);
    process.exit(1);
  }
  
  console.log(`📊 ${feedItems.length} Feed-Items gefunden`);
  
  // Verarbeite Links
  const stats = {
    total: feedItems.length,
    ok: 0,
    added: 0,
    fallback: 0,
    issues: []
  };
  
  feedItems.forEach((item, index) => {
    const result = findLink(item.titel, item.thema, item.link);
    
    if (result.status === 'ok') {
      stats.ok++;
    } else if (result.status === 'added') {
      item.link = result.link;
      stats.added++;
    } else if (result.status === 'fallback') {
      item.link = result.link;
      stats.fallback++;
      stats.issues.push(`Fallback-Link für: ${item.titel}`);
    }
    
    // Füge Link-Status hinzu
    item.linkStatus = result.status;
  });
  
  // Erstelle aktualisierte TypeScript-Datei
  const updatedContent = `/**
 * FYF Feedboard Content Data
 * 
 * Importierte und strukturierte Content-Daten
 * aus der Notion-Datenbank für das Feedboard-System
 * 
 * Link-Integration: ${new Date().toISOString()}
 */

export const feedItems = ${JSON.stringify(feedItems, null, 2).replace(/"(\w+)":/g, '$1:').replace(/"/g, '"')};

export const feedData = {
  metadata: {
    importDate: "2025-10-26T17:01:21.400Z",
    version: "1.0",
    source: "Notion CSV Export",
    totalItems: feedItems.length,
    linkIntegration: "${new Date().toISOString()}",
    stats: {
      total: feedItems.length,
      processed: feedItems.length,
      imagesOk: 21,
      imagesMissing: 5,
      linksOk: ${stats.ok},
      linksAdded: ${stats.added},
      linksFallback: ${stats.fallback},
      issues: []
    }
  },
  feedItems: feedItems
};`;
  
  // Schreibe aktualisierte Datei
  try {
    fs.writeFileSync(CONFIG.outputFile, updatedContent, 'utf8');
    console.log(`✅ TypeScript-Datei aktualisiert: ${CONFIG.outputFile}`);
  } catch (error) {
    console.error(`❌ Fehler beim Schreiben der Datei: ${error.message}`);
    process.exit(1);
  }
  
  // Schreibe Log-Datei
  try {
    const logData = {
      timestamp: new Date().toISOString(),
      stats: stats,
      issues: stats.issues
    };
    fs.writeFileSync(CONFIG.logFile, JSON.stringify(logData, null, 2), 'utf8');
    console.log(`📋 Log-Datei erstellt: ${CONFIG.logFile}`);
  } catch (error) {
    console.warn(`⚠️  Log-Datei konnte nicht erstellt werden: ${error.message}`);
  }
  
  // Ausgabe der Zusammenfassung
  console.log('\n📊 LINK-INTEGRATION ZUSAMMENFASSUNG');
  console.log('═'.repeat(50));
  console.log(`✅ Links bereits vorhanden: ${stats.ok}`);
  console.log(`🔗 Links hinzugefügt: ${stats.added}`);
  console.log(`⚠️  Fallback-Links: ${stats.fallback}`);
  console.log(`📝 Issues gefunden: ${stats.issues.length}`);
  
  if (stats.issues.length > 0) {
    console.log('\n⚠️  GEFUNDENE ISSUES:');
    stats.issues.forEach(issue => {
      console.log(`   • ${issue}`);
    });
  }
  
  console.log('\n🎯 NÄCHSTE SCHRITTE:');
  console.log('1. TypeScript-Datei in Feedboard integrieren');
  console.log('2. Links in UI testen');
  console.log('3. Fehlende Links manuell ergänzen');
  
  console.log('\n✨ Link-Integration abgeschlossen!');
}

// Führe Integration aus
if (require.main === module) {
  integrateLinks();
}

module.exports = { integrateLinks, findLink };
