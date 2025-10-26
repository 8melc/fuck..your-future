# User-Feedback Synthese

**Titel:** User-Feedback Synthese  
**Typ:** Content/Kuration  
**Zweck:** Schnelle Auswertung, Clustering und Transfer für Redaktion  

---

## Prompt

Analysiere das Feedback zu [Content-Cluster], fasse Kernthemen und Verbesserungswünsche in maximal 5 Bullet Points zusammen, ergänze ein Ampelsystem (grün/gelb/rot).

---

## Feedback-Kategorien

### Content-Qualität
- **Relevanz:** Passt der Content zu User-Interessen?
- **Substanz:** Ist der Inhalt tief genug?
- **Aktualität:** Ist der Content noch relevant?
- **Verständlichkeit:** Ist der Content zugänglich?

### Guide-Kommentare
- **Tonalität:** Passt der FYF-Style?
- **Hilfreichkeit:** Unterstützen die Kommentare?
- **Provokation:** Ist der Ton herausfordernd genug?
- **Authentizität:** Wirken die Kommentare echt?

### Transparenz-System
- **Verständlichkeit:** Sind Erklärungen klar?
- **Vollständigkeit:** Werden alle Aspekte erklärt?
- **Nützlichkeit:** Hilft Transparenz bei Entscheidungen?
- **Häufigkeit:** Wird zu oft/zu selten erklärt?

### User-Experience
- **Navigation:** Ist das Interface intuitiv?
- **Performance:** Lädt alles schnell genug?
- **Mobile:** Funktioniert es auf allen Geräten?
- **Accessibility:** Ist es barrierefrei?

---

## Synthese-Template

### Cluster: [Name]
**Zeitraum:** [Datum von - bis]  
**Anzahl Feedback:** [X] Kommentare  

#### 🟢 Positive Aspekte
- [Kernthema 1: Konkrete Beispiele]
- [Kernthema 2: Konkrete Beispiele]

#### 🟡 Verbesserungsbedarf
- [Kernthema 1: Konkrete Beispiele]
- [Kernthema 2: Konkrete Beispiele]

#### 🔴 Kritische Punkte
- [Kernthema 1: Konkrete Beispiele]

#### 📊 Ampelsystem
- **Content-Qualität:** 🟢/🟡/🔴
- **Guide-Kommentare:** 🟢/🟡/🔴
- **Transparenz:** 🟢/🟡/🔴
- **UX:** 🟢/🟡/🔴

#### 🎯 Nächste Schritte
1. [Konkrete Aktion 1]
2. [Konkrete Aktion 2]
3. [Konkrete Aktion 3]

---

## Feedback-Quellen

### Direkte Quellen
- **In-App Feedback:** User-Kommentare im Feed
- **Survey-Responses:** Gezielte Befragungen
- **Interview-Transkripte:** Tiefe User-Gespräche
- **Support-Tickets:** Technische Probleme

### Indirekte Quellen
- **Usage-Analytics:** Klick-Verhalten, Verweildauer
- **A/B-Test-Results:** Vergleich verschiedener Versionen
- **Social Media:** Mentions, Kommentare, Shares
- **Community-Diskussionen:** Forum-Posts, Discord

### Qualitative vs. Quantitative
- **Qualitativ:** Warum-Erklärungen, Emotionen, Kontext
- **Quantitativ:** Zahlen, Statistiken, Trends
- **Mixed Methods:** Kombination beider Ansätze

---

## Analyse-Prompts

### Für Content-Cluster
```
Analysiere das Feedback zu [Cluster-Name]:
1. Sammle alle relevanten Kommentare/Reviews
2. Identifiziere wiederkehrende Themen
3. Kategorisiere nach Positiv/Negativ/Neutral
4. Extrahiere konkrete Verbesserungsvorschläge
5. Erstelle Ampelsystem-Bewertung
6. Formuliere 3 konkrete nächste Schritte

Fokus: Substanz, Relevanz, Tonalität
```

### Für Guide-Kommentare
```
Bewerte die User-Reaktionen auf Guide-Kommentare:
1. Welche Kommentare werden gelobt/kritisiert?
2. Passt der FYF-Style zu User-Erwartungen?
3. Sind Kommentare hilfreich oder störend?
4. Welche Tonalität funktioniert am besten?
5. Wo gibt es Missverständnisse?

Fokus: Authentizität, Hilfreichkeit, Provokation
```

### Für Transparenz-System
```
Prüfe die Wirksamkeit des Transparenz-Layers:
1. Verstehen User die "Warum sehe ich das?"-Erklärungen?
2. Nutzen User die Transparenz-Informationen?
3. Führt Transparenz zu mehr Vertrauen?
4. Wo sind Erklärungen unklar/unvollständig?
5. Welche zusätzlichen Infos werden gewünscht?

Fokus: Verständlichkeit, Nützlichkeit, Vollständigkeit
```

---

## Ampelsystem-Definitionen

### 🟢 Grün (Funktioniert gut)
- **Content:** Hohe Relevanz, gute Substanz, positive Reaktionen
- **Guide:** Authentischer FYF-Style, hilfreiche Kommentare
- **Transparenz:** Klare Erklärungen, hohe Nutzung
- **UX:** Intuitive Navigation, gute Performance

### 🟡 Gelb (Verbesserungsbedarf)
- **Content:** Teilweise relevant, gemischte Reaktionen
- **Guide:** Style passt nicht immer, manchmal unklar
- **Transparenz:** Erklärungen teilweise verwirrend
- **UX:** Kleinere Probleme, aber grundsätzlich funktional

### 🔴 Rot (Kritische Probleme)
- **Content:** Niedrige Relevanz, negative Reaktionen
- **Guide:** Falscher Ton, störende Kommentare
- **Transparenz:** Unverständliche Erklärungen
- **UX:** Große Probleme, schlechte Performance

---

## Output-Formate

### Redaktion-Brief
- **Executive Summary:** 3 Hauptpunkte
- **Detaillierte Analyse:** Pro Kategorie
- **Konkrete Aktionen:** Was zu tun ist
- **Timeline:** Wann umgesetzt werden soll

### Development-Ticket
- **Problem:** Klare Beschreibung
- **Impact:** Wie viele User betroffen
- **Solution:** Konkrete Lösung
- **Priority:** Hoch/Mittel/Niedrig

### Design-Brief
- **User-Pain-Points:** Wo es hakt
- **Design-Requirements:** Was geändert werden muss
- **Success-Metrics:** Wie Erfolg gemessen wird
- **Mockups:** Visuelle Vorschläge

---

## Automatisierung

### Feedback-Sammlung
- **API-Integration:** Automatische Datensammlung
- **Sentiment-Analysis:** KI-basierte Stimmungsanalyse
- **Trend-Detection:** Wiederkehrende Themen identifizieren
- **Alert-System:** Bei kritischen Problemen benachrichtigen

### Synthese-Generierung
- **Template-basiert:** Standardisierte Auswertung
- **KI-Unterstützung:** Automatische Zusammenfassung
- **Visualisierung:** Charts und Grafiken
- **Export:** Verschiedene Formate (PDF, Notion, etc.)

---

**Status:** Template bereit für Feedback-Analyse  
**Nächste Schritte:** Feedback-Sammlung starten, erste Analysen durchführen
