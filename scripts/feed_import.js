#!/usr/bin/env node

/**
 * FYF Feedboard Content Import Script
 * 
 * Konvertiert Notion-CSV-Export zu strukturierter JSON-Datenbank
 * für das FYF Feedboard System.
 * 
 * Verwendung: node scripts/feed_import.js
 */

const fs = require('fs');
const path = require('path');

// Konfiguration
const CONFIG = {
  inputFile: '/Users/melissaconrads/Desktop/MVP2/FYF-Codex/02_CLUSTER_CONTENT/fyf_feed_data.csv',
  outputFile: '/Users/melissaconrads/Desktop/MVP2/docs/data/fyf_feed_items.json',
  imagesDir: '/Users/melissaconrads/Desktop/MVP2/docs/assets/images/feed_visuals/',
  logFile: '/Users/melissaconrads/Desktop/MVP2/docs/data/import_log.json'
};

// CSV Parser (verbesserte Implementierung)
function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const item = {};
    
    headers.forEach((header, index) => {
      item[header] = values[index] || '';
    });
    
    return item;
  });
}

// Hilfsfunktion für CSV-Zeilen-Parsing
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result.map(v => v.replace(/^"(.*)"$/, '$1'));
}

// Prüfe ob Bilddatei existiert
function checkImageExists(imagePath) {
  try {
    return fs.existsSync(imagePath);
  } catch (error) {
    return false;
  }
}

// Validiere PERMA-Werte
function validatePERMA(perma) {
  const validPERMA = ['Meaning', 'Engagement', 'Relationships', 'Accomplishment', 'Positive Emotions'];
  return validPERMA.includes(perma) ? perma : 'Meaning';
}

// Validiere Format-Typen
function validateFormat(format) {
  const validFormats = ['Artikel', 'Podcast', 'Zitat', 'People', 'Song', 'Event'];
  return validFormats.includes(format) ? format : 'Artikel';
}

// Validiere Themen-Cluster
function validateThema(thema) {
  const validThemen = [
    'Zeit & Endlichkeit',
    'Freiheit & Orte', 
    'Fokus & Flow',
    'Geld & Wert',
    'Sinn & Bedeutung',
    'Kultur & Stimmen',
    'Beziehungen',
    'Selbsterkenntnis',
    'Wachstum'
  ];
  return validThemen.includes(thema) ? thema : 'Zeit & Endlichkeit';
}

// Generiere eindeutige ID
function generateId(titel, thema) {
  const cleanTitle = titel
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 30);
  
  const cleanThema = thema
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_');
  
  return `${cleanThema}_${cleanTitle}`;
}

// Hauptfunktion
function importFeedData() {
  console.log('🚀 FYF Feedboard Content Import gestartet...\n');
  
  // Lese CSV-Datei
  let csvContent;
  try {
    csvContent = fs.readFileSync(CONFIG.inputFile, 'utf8');
    console.log(`✅ CSV-Datei gelesen: ${CONFIG.inputFile}`);
  } catch (error) {
    console.error(`❌ Fehler beim Lesen der CSV-Datei: ${error.message}`);
    process.exit(1);
  }
  
  // Parse CSV
  const rawItems = parseCSV(csvContent);
  console.log(`📊 ${rawItems.length} Roh-Items gefunden`);
  
  // Verarbeite Items
  const processedItems = [];
  const stats = {
    total: rawItems.length,
    processed: 0,
    imagesOk: 0,
    imagesMissing: 0,
    issues: []
  };
  
  rawItems.forEach((item, index) => {
    try {
      // Validiere und bereinige Daten
      const processedItem = {
        id: generateId(item.Titel, item.Thema),
        titel: item.Titel || `Item ${index + 1}`,
        format: validateFormat(item.Format),
        quelle: item.Quelle || '',
        link: item.link || '',
        guideKommentar: item['Guide-Kommentar'] || '',
        perma: validatePERMA(item.PERMA),
        thema: validateThema(item.Thema),
        visual: item.Visual || '',
        warum: item['Warum sehe ich das?'] || '',
        bildpfad: item.Bildpfad || '',
        promptLink: item['Prompt-Link'] || '',
        // Metadaten
        importDate: new Date().toISOString(),
        version: '1.0'
      };
      
      // Prüfe Bildverfügbarkeit
      if (processedItem.bildpfad) {
        const imageExists = checkImageExists(processedItem.bildpfad);
        processedItem.imageStatus = imageExists ? 'ok' : 'missing';
        
        if (imageExists) {
          stats.imagesOk++;
        } else {
          stats.imagesMissing++;
          stats.issues.push(`Bild fehlt: ${processedItem.bildpfad}`);
        }
      } else {
        processedItem.imageStatus = 'no_path';
        stats.issues.push(`Kein Bildpfad für: ${processedItem.titel}`);
      }
      
      // Prüfe auf leere Pflichtfelder
      if (!processedItem.titel) {
        stats.issues.push(`Leerer Titel bei Item ${index + 1}`);
      }
      if (!processedItem.guideKommentar) {
        stats.issues.push(`Leerer Guide-Kommentar bei: ${processedItem.titel}`);
      }
      if (!processedItem.link) {
        stats.issues.push(`Leerer Link bei: ${processedItem.titel}`);
      }
      
      processedItems.push(processedItem);
      stats.processed++;
      
    } catch (error) {
      stats.issues.push(`Fehler bei Item ${index + 1}: ${error.message}`);
    }
  });
  
  // Erstelle Ausgabe-Ordner falls nicht vorhanden
  const outputDir = path.dirname(CONFIG.outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`📁 Ausgabe-Ordner erstellt: ${outputDir}`);
  }
  
  // Schreibe JSON-Datei
  const outputData = {
    metadata: {
      importDate: new Date().toISOString(),
      version: '1.0',
      source: 'Notion CSV Export',
      totalItems: processedItems.length,
      stats: stats
    },
    feedItems: processedItems
  };
  
  try {
    fs.writeFileSync(CONFIG.outputFile, JSON.stringify(outputData, null, 2), 'utf8');
    console.log(`✅ JSON-Datei erstellt: ${CONFIG.outputFile}`);
  } catch (error) {
    console.error(`❌ Fehler beim Schreiben der JSON-Datei: ${error.message}`);
    process.exit(1);
  }
  
  // Schreibe Log-Datei
  try {
    fs.writeFileSync(CONFIG.logFile, JSON.stringify({
      timestamp: new Date().toISOString(),
      stats: stats,
      issues: stats.issues
    }, null, 2), 'utf8');
    console.log(`📋 Log-Datei erstellt: ${CONFIG.logFile}`);
  } catch (error) {
    console.warn(`⚠️  Log-Datei konnte nicht erstellt werden: ${error.message}`);
  }
  
  // Ausgabe der Zusammenfassung
  console.log('\n📊 IMPORT-ZUSAMMENFASSUNG');
  console.log('═'.repeat(50));
  console.log(`✅ Items verarbeitet: ${stats.processed}/${stats.total}`);
  console.log(`🖼️  Bilder verfügbar: ${stats.imagesOk}`);
  console.log(`❌ Bilder fehlen: ${stats.imagesMissing}`);
  console.log(`⚠️  Issues gefunden: ${stats.issues.length}`);
  
  if (stats.issues.length > 0) {
    console.log('\n⚠️  GEFUNDENE ISSUES:');
    stats.issues.slice(0, 10).forEach(issue => {
      console.log(`   • ${issue}`);
    });
    if (stats.issues.length > 10) {
      console.log(`   ... und ${stats.issues.length - 10} weitere`);
    }
  }
  
  console.log('\n🎯 NÄCHSTE SCHRITTE:');
  console.log('1. JSON-Datei in Feedboard integrieren');
  console.log('2. Fehlende Bilder nachladen');
  console.log('3. Content-Validierung durchführen');
  
  console.log('\n✨ Import abgeschlossen!');
}

// Führe Import aus
if (require.main === module) {
  importFeedData();
}

module.exports = { importFeedData, parseCSV, checkImageExists };
