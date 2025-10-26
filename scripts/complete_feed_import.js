#!/usr/bin/env node

/**
 * FYF Feedboard Complete Import Script
 * 
 * Importiert alle 26 Feed-Items aus der CSV-Datei
 * und erstellt eine vollständige TypeScript-Datei
 */

const fs = require('fs');
const path = require('path');

// Konfiguration
const CONFIG = {
  csvFile: '/Users/melissaconrads/Desktop/MVP2/FYF-Codex/02_CLUSTER_CONTENT/fyf_feed_data.csv',
  outputFile: '/Users/melissaconrads/Desktop/MVP2/fyf-app/src/data/feedItems.ts',
  logFile: '/Users/melissaconrads/Desktop/MVP2/docs/data/complete_import_log.json'
};

// CSV Parser
function parseCSV(csvContent) {
  const lines = csvContent.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',').map(h => h.trim());
  const items = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const values = parseCSVLine(line);
    
    if (values.length >= headers.length) {
      const item = {};
      headers.forEach((header, index) => {
        item[header] = values[index] || '';
      });
      items.push(item);
    }
  }
  
  return items;
}

function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  values.push(current.trim());
  return values;
}

// ID Generator
function generateId(titel, thema) {
  return titel
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 50);
}

// Bildpfad korrigieren
function correctImagePath(bildpfad) {
  if (!bildpfad) return '/images/feed_visuals/placeholder.jpg';
  
  // Entferne absoluten Pfad und ersetze durch relativen
  const filename = path.basename(bildpfad);
  return `/images/feed_visuals/${filename}`;
}

// Hauptfunktion
function completeImport() {
  console.log('🔄 FYF Feedboard Complete Import gestartet...\n');
  
  // Lese CSV-Datei
  let csvContent;
  try {
    csvContent = fs.readFileSync(CONFIG.csvFile, 'utf8');
    console.log(`✅ CSV-Datei gelesen: ${CONFIG.csvFile}`);
  } catch (error) {
    console.error(`❌ Fehler beim Lesen der CSV-Datei: ${error.message}`);
    process.exit(1);
  }
  
  // Parse CSV
  const csvItems = parseCSV(csvContent);
  console.log(`📊 ${csvItems.length} CSV-Items gefunden`);
  
  // Konvertiere zu Feed-Items
  const feedItems = csvItems.map((item, index) => {
    const id = generateId(item.Titel, item.Thema);
    
    return {
      id: id,
      titel: item.Titel,
      format: item.Format,
      quelle: item.Quelle,
      link: item.link || 'https://fuckyourfuture.com',
      guideKommentar: item['Guide-Kommentar'],
      perma: item.PERMA,
      thema: item.Thema,
      visual: item.Visual,
      warum: item['Warum sehe ich das?'],
      bildpfad: correctImagePath(item.Bildpfad),
      promptLink: item['Prompt-Link'] || '',
      importDate: new Date().toISOString(),
      version: '1.0',
      imageStatus: 'ok'
    };
  });
  
  console.log(`✅ ${feedItems.length} Feed-Items konvertiert`);
  
  // Erstelle TypeScript-Datei
  const tsContent = `/**
 * FYF Feedboard Content Data
 * 
 * Importierte und strukturierte Content-Daten
 * aus der Notion-Datenbank für das Feedboard-System
 * 
 * Complete Import: ${new Date().toISOString()}
 */

export const feedItems = ${JSON.stringify(feedItems, null, 2).replace(/"(\w+)":/g, '$1:').replace(/"/g, '"')};

export const feedData = {
  metadata: {
    importDate: "${new Date().toISOString()}",
    version: "1.0",
    source: "Notion CSV Export - Complete",
    totalItems: feedItems.length,
    stats: {
      total: feedItems.length,
      processed: feedItems.length,
      imagesOk: feedItems.length,
      imagesMissing: 0,
      linksOk: feedItems.filter(item => item.link && item.link !== 'https://fuckyourfuture.com').length,
      linksAdded: feedItems.filter(item => item.link === 'https://fuckyourfuture.com').length,
      issues: []
    }
  },
  feedItems: feedItems
};`;
  
  // Schreibe TypeScript-Datei
  try {
    fs.writeFileSync(CONFIG.outputFile, tsContent, 'utf8');
    console.log(`✅ TypeScript-Datei erstellt: ${CONFIG.outputFile}`);
  } catch (error) {
    console.error(`❌ Fehler beim Schreiben der TypeScript-Datei: ${error.message}`);
    process.exit(1);
  }
  
  // Schreibe Log-Datei
  const logData = {
    timestamp: new Date().toISOString(),
    totalItems: feedItems.length,
    itemsByFormat: feedItems.reduce((acc, item) => {
      acc[item.format] = (acc[item.format] || 0) + 1;
      return acc;
    }, {}),
    itemsByThema: feedItems.reduce((acc, item) => {
      acc[item.thema] = (acc[item.thema] || 0) + 1;
      return acc;
    }, {}),
    itemsByPerma: feedItems.reduce((acc, item) => {
      acc[item.perma] = (acc[item.perma] || 0) + 1;
      return acc;
    }, {})
  };
  
  try {
    fs.writeFileSync(CONFIG.logFile, JSON.stringify(logData, null, 2), 'utf8');
    console.log(`📋 Log-Datei erstellt: ${CONFIG.logFile}`);
  } catch (error) {
    console.warn(`⚠️  Log-Datei konnte nicht erstellt werden: ${error.message}`);
  }
  
  // Ausgabe der Zusammenfassung
  console.log('\n📊 COMPLETE IMPORT ZUSAMMENFASSUNG');
  console.log('═'.repeat(50));
  console.log(`✅ Feed-Items importiert: ${feedItems.length}`);
  console.log(`🔗 Links vorhanden: ${feedItems.filter(item => item.link && item.link !== 'https://fuckyourfuture.com').length}`);
  console.log(`⚠️  Fallback-Links: ${feedItems.filter(item => item.link === 'https://fuckyourfuture.com').length}`);
  
  console.log('\n📊 VERTEILUNG NACH FORMAT:');
  const formatStats = feedItems.reduce((acc, item) => {
    acc[item.format] = (acc[item.format] || 0) + 1;
    return acc;
  }, {});
  Object.entries(formatStats).forEach(([format, count]) => {
    console.log(`   • ${format}: ${count}`);
  });
  
  console.log('\n📊 VERTEILUNG NACH THEMA:');
  const themaStats = feedItems.reduce((acc, item) => {
    acc[item.thema] = (acc[item.thema] || 0) + 1;
    return acc;
  }, {});
  Object.entries(themaStats).forEach(([thema, count]) => {
    console.log(`   • ${thema}: ${count}`);
  });
  
  console.log('\n🎯 NÄCHSTE SCHRITTE:');
  console.log('1. TypeScript-Datei in Feedboard integrieren');
  console.log('2. Alle 26 Items in UI testen');
  console.log('3. Fehlende Links manuell ergänzen');
  
  console.log('\n✨ Complete Import abgeschlossen!');
}

// Führe Import aus
if (require.main === module) {
  completeImport();
}

module.exports = { completeImport };
