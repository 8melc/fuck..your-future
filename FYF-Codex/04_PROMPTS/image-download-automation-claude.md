# Claude Image Automation

**Titel:** Claude Image Automation  
**Typ:** Asset-Download  
**Zweck:** Bulk-Scraping und Umbenennungen für Feedboard  

---

## Prompt-Beispiel

Lade folgende Bildquellen automatisch herunter, benenne und liefere sie als Direktlinks im gewünschten JSON/Markdown-Snippet (siehe separate Liste mit Dateinamen und Quellen).

---

## Image-Source-Liste

### Content-Thumbnails (18 Items)

| Nr. | Dateiname | Quelle | Thema |
|-----|-----------|--------|-------|
| 1 | FYF_01_Life-in-Weeks.jpg | https://waitbutwhy.com/2014/05/life-weeks.html | Zeit & Endlichkeit |
| 2 | FYF_02_FourThousandWeeks.jpg | https://www.oliverburkeman.com/fourthousandweeks | Zeit & Endlichkeit |
| 3 | FYF_03_Frankl-Quote.jpg | https://en.wikipedia.org/wiki/Viktor_Frankl | Zeit & Endlichkeit |
| 4 | FYF_04_Bali-Coworking.jpg | https://thenomadcloud.com/best-coworking-spaces-in-bali/ | Freiheit & Orte |
| 5 | FYF_05_NomadPodcast.jpg | https://open.spotify.com/show/nomadpodcast | Freiheit & Orte |
| 6 | FYF_06_Jenny-Odell.jpg | https://jennyodell.com | Freiheit & Orte |
| 7 | FYF_07_Cal-Newport.jpg | https://www.moonshots.io/episode-58-cal-newport-deepwork | Fokus & Flow |
| 8 | FYF_08_FarnamStreet-Attention.jpg | https://fs.blog/attention-iq/ | Fokus & Flow |
| 9 | FYF_09_FYF-Limit-Freedom.jpg | Eigenes FYF-Visual | Fokus & Flow |
| 10 | FYF_10_Money-as-Energy.jpg | https://aeon.co/essays/money-energy | Geld & Wert |
| 11 | FYF_11_HiddenBrain-Enough.jpg | https://hiddenbrain.org | Geld & Wert |
| 12 | FYF_12_Psychology-of-Money.jpg | https://www.morganhousel.com | Geld & Wert |
| 13 | FYF_13_Psyche-Meaning.jpg | https://psyche.co/ideas/you-dont-have-to-be-happy-to-have-meaning | Sinn & Haltung |
| 14 | FYF_14_OnBeing-Purpose.jpg | https://onbeing.org | Sinn & Haltung |
| 15 | FYF_15_Ikigai-Book.jpg | https://www.goodreads.com/book/show/33908201-ikigai | Sinn & Haltung |
| 16 | FYF_16_Show-Your-Work.jpg | https://austinkleon.com/show-your-work/ | Kultur & Stimmen |
| 17 | FYF_17_Art-Resistance.jpg | https://theatlantic.com/art-resistance-attention | Kultur & Stimmen |
| 18 | FYF_18_Erykah-Badu.jpg | https://open.spotify.com/track/erykah-badu | Kultur & Stimmen |

---

## Download-Prompts

### Bulk-Download-Prompt
```
Lade alle 18 Bilder aus der obigen Liste herunter:
1. Extrahiere das Hauptbild/Thumbnail von jeder URL
2. Benenne sie entsprechend der Dateinamen-Spalte
3. Optimiere für Web (max. 800px Breite, JPEG/PNG)
4. Erstelle ein JSON mit Metadaten (URL, Titel, Thema, Format)
5. Liefere alle Bilder als ZIP-Download
```

### Einzel-Download-Prompt
```
Lade das Bild von [URL] herunter und benenne es als [Dateiname].
Anforderungen:
- Format: JPEG oder PNG
- Größe: max. 800px Breite
- Qualität: 85% für Web
- Metadaten: Titel, Autor, Quelle
```

### Metadaten-JSON-Prompt
```
Erstelle ein JSON-Array für die 18 Feedboard-Images mit folgenden Feldern:
- id: Nummer (01-18)
- filename: Dateiname
- title: Content-Titel
- author: Autor/Quelle
- url: Original-URL
- theme: Themen-Cluster
- format: Content-Format
- duration: Lesezeit/Hörzeit
- eisenhower: Wichtig/Dringend-Kategorie
- perma: PERMA-Dimension
```

---

## Automatisierungs-Scripts

### Python-Script-Template
```python
import requests
from PIL import Image
import json

def download_and_optimize_image(url, filename, max_width=800):
    """Download image and optimize for web"""
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))
    
    # Resize if too large
    if img.width > max_width:
        ratio = max_width / img.width
        new_height = int(img.height * ratio)
        img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
    
    # Save optimized
    img.save(f"images/{filename}", "JPEG", quality=85, optimize=True)
    return filename

# Usage example
images = [
    {"url": "https://waitbutwhy.com/2014/05/life-weeks.html", "filename": "FYF_01_Life-in-Weeks.jpg"},
    # ... weitere URLs
]

for img in images:
    download_and_optimize_image(img["url"], img["filename"])
```

### Bash-Script-Template
```bash
#!/bin/bash

# Download and rename images
wget -O "FYF_01_Life-in-Weeks.jpg" "https://waitbutwhy.com/2014/05/life-weeks.html"
wget -O "FYF_02_FourThousandWeeks.jpg" "https://www.oliverburkeman.com/fourthousandweeks"
# ... weitere Downloads

# Create metadata JSON
cat > feedboard_images.json << EOF
{
  "images": [
    {
      "id": "01",
      "filename": "FYF_01_Life-in-Weeks.jpg",
      "title": "Your Life in Weeks",
      "author": "Tim Urban",
      "url": "https://waitbutwhy.com/2014/05/life-weeks.html",
      "theme": "Zeit & Endlichkeit",
      "format": "Artikel",
      "duration": "8 Min",
      "eisenhower": "Wichtig, nicht dringend",
      "perma": "Meaning"
    }
    // ... weitere Einträge
  ]
}
EOF
```

---

## Qualitätskontrolle

### Image-Checklist
- [ ] Alle 18 Bilder heruntergeladen
- [ ] Korrekte Dateinamen
- [ ] Web-optimiert (max. 800px, 85% Qualität)
- [ ] Metadaten-JSON erstellt
- [ ] Alle URLs funktional
- [ ] Bilder thematisch passend

### Fehlerbehandlung
- Fallback für defekte URLs
- Alternative Bildquellen
- Manuelle Nachbearbeitung bei Bedarf
- Backup der Original-URLs

---

**Status:** Template bereit für Image-Automation  
**Nächste Schritte:** Scripts ausführen, Bilder optimieren, Metadaten validieren
