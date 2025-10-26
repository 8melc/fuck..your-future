#!/usr/bin/env node

/**
 * Generate feedItems.ts from Cluster_Content_DB.md
 * 
 * Parses the Markdown file and generates a clean TypeScript file
 * with proper types and structure
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  markdownFile: '/Users/melissaconrads/Desktop/MVP2/FYF-Codex/02_CLUSTER_CONTENT/Cluster_Content_DB.md',
  outputFile: '/Users/melissaconrads/Desktop/MVP2/fyf-app/src/data/feedItems.ts'
};

// Helper function to create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Parse Markdown content
function parseMarkdown(content) {
  const items = [];
  const sections = content.split('---').filter(section => section.trim());
  
  for (const section of sections) {
    if (section.includes('## ')) {
      const lines = section.split('\n').map(line => line.trim()).filter(line => line);
      
      let item = {};
      let currentField = '';
      
      for (const line of lines) {
        if (line.startsWith('## ')) {
          // Extract title (remove number prefix)
          const title = line.replace(/^## \d+\.\s*/, '').trim();
          item.title = title;
          item.id = createSlug(title);
        } else if (line.startsWith('**Format:**')) {
          item.format = line.replace('**Format:**', '').trim();
        } else if (line.startsWith('**Thema:**')) {
          item.theme = line.replace('**Thema:**', '').trim();
        } else if (line.startsWith('**PERMA:**')) {
          item.perma = line.replace('**PERMA:**', '').trim();
        } else if (line.startsWith('**Guide-Kommentar:**')) {
          currentField = 'description';
          item.description = '';
        } else if (line.startsWith('**Quelle:**')) {
          item.source = line.replace('**Quelle:**', '').trim();
        } else if (line.startsWith('**Link:**')) {
          item.link = line.replace('**Link:**', '').trim();
        } else if (line.startsWith('**Visual:**')) {
          item.visual = line.replace('**Visual:**', '').trim();
        } else if (line.startsWith('**Bildpfad:**')) {
          const bildpfad = line.replace('**Bildpfad:**', '').replace(/`/g, '').trim();
          item.image = `/images/feed_visuals/${bildpfad}`;
        } else if (line.startsWith('**Warum sehe ich das?**')) {
          currentField = 'guideWhy';
          item.guideWhy = '';
        } else if (currentField === 'description' && line && !line.startsWith('**')) {
          item.description += (item.description ? ' ' : '') + line;
        } else if (currentField === 'guideWhy' && line && !line.startsWith('**')) {
          item.guideWhy += (item.guideWhy ? ' ' : '') + line;
        }
      }
      
      // Add default values
      item.source = item.source || 'feedboard';
      item.chips = [];
      
      // Only add if we have required fields
      if (item.title && item.format && item.theme) {
        items.push(item);
      }
    }
  }
  
  return items;
}

// Generate TypeScript file
function generateTypeScriptFile(items) {
  const tsContent = `/**
 * FYF Feedboard Content Data
 * 
 * Generated from Cluster_Content_DB.md
 * ${new Date().toISOString()}
 */

export type FeedItem = {
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
};

export const feedItems: readonly FeedItem[] = [
${items.map(item => `  {
    id: "${item.id}",
    title: "${item.title}",
    description: "${item.description}",
    format: "${item.format}" as const,
    theme: "${item.theme}" as const,
    perma: "${item.perma || 'Meaning'}" as const,
    link: "${item.link}",
    image: "${item.image}",
    guideWhy: "${item.guideWhy}",
    source: "feedboard" as const,
    chips: []
  }`).join(',\n')}
] as const;
`;

  return tsContent;
}

// Main function
function generateFeedItems() {
  console.log('🔄 Generating feedItems.ts from Cluster_Content_DB.md...\n');
  
  try {
    // Read Markdown file
    const markdownContent = fs.readFileSync(CONFIG.markdownFile, 'utf8');
    console.log(`✅ Markdown file read: ${CONFIG.markdownFile}`);
    
    // Parse content
    const items = parseMarkdown(markdownContent);
    console.log(`✅ Parsed ${items.length} feed items`);
    
    // Generate TypeScript content
    const tsContent = generateTypeScriptFile(items);
    
    // Write TypeScript file
    fs.writeFileSync(CONFIG.outputFile, tsContent, 'utf8');
    console.log(`✅ TypeScript file generated: ${CONFIG.outputFile}`);
    
    // Show statistics
    console.log('\n📊 STATISTICS:');
    const formatStats = items.reduce((acc, item) => {
      acc[item.format] = (acc[item.format] || 0) + 1;
      return acc;
    }, {});
    
    const themeStats = items.reduce((acc, item) => {
      acc[item.theme] = (acc[item.theme] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\nFormats:');
    Object.entries(formatStats).forEach(([format, count]) => {
      console.log(`  • ${format}: ${count}`);
    });
    
    console.log('\nThemes:');
    Object.entries(themeStats).forEach(([theme, count]) => {
      console.log(`  • ${theme}: ${count}`);
    });
    
    console.log('\n✨ Generation completed successfully!');
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateFeedItems();
}

module.exports = { generateFeedItems, parseMarkdown, createSlug };
