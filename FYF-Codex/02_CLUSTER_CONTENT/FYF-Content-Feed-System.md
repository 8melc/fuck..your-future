# FYF Content-Feed Kuratierungssystem
**Version: MVP 1.0 (für Präsentation 30.10.2025)**  
**Status:** Must-have Features dokumentiert | Nice-to-have markiert für V2

---

## 📖 Überblick

Dieses Dokument definiert, **wie Content in den FYF-Feed gelangt** und **nach welchen Prinzipien** er dem User angezeigt wird.

**Kernprinzip:** User hat Hoheit. Alles, was erscheint, basiert auf bewussten User-Entscheidungen.

---

## 🎯 MVP Must-Haves (Phase 1 – bis 30.10.)

### 1. Content-Pool (Manuell kuratiert)

**Was:** Initiale Content-Sammlung für Demo/MVP  
**Umfang:** 15-20 Items  
**Formate:**
- Artikel (5-7 Stück)
- Podcasts (3-5 Stück)
- Zitate (5-7 Stück)
- People-Profile (2-3 Stück)

**Kuratierungskriterien (manuell geprüft):**

✅ **Substanz-Check:**
- Keine Clickbait-Headlines
- Mindestlänge: Artikel 800+ Wörter, Podcasts 15+ Min
- Klare Kernaussage erkennbar

✅ **FYF-Relevanz:**
- Themen: Zeit, Prioritäten, Lebensgestaltung, Deep Work, Sinnfragen, Kultur
- Passt zu mindestens einer FYF-Methode (Life in Weeks, Eisenhower, PERMA, etc.)

✅ **Tonalität:**
- Direkt, respektvoll, keine Hochglanz-Motivations-Sprache
- Progressive, inklusive Perspektiven
- Keine "10 Hacks für produktiveres Leben"-Clickbait

**Kategorisierung (für jeden Content-Item):**
- **Eisenhower:** Wichtig/Dringend, Wichtig/Nicht dringend, etc.
- **PERMA-Dimension:** Welche Säule? (P/E/R/M/A)
- **Format:** Artikel/Podcast/Zitat/Video
- **Lesezeit/Hörzeit:** Geschätzte Dauer

---

### 2. User-Filter-System (Autonomie-Layer)

**Was:** User bestimmt selbst, was er sieht  
**Interface:** Filter-Panel (STEP 6 im Flowchart)

**Must-have Filter für MVP:**

✅ **Format-Filter:**
- [ ] Artikel
- [ ] Podcasts
- [ ] Zitate
- [ ] People-Profile

✅ **Anzahl-Limit:**
- User setzt: "Max. X Artikel pro Tag"
- Default-Vorschlag: 3 Artikel, 2 Podcasts, 4 Zitate
- Änderbar nur nach bewusstem Logout (verhindert Impuls-Scrolling)

✅ **Themen-Filter (grob):**
- [ ] Zeit & Prioritäten
- [ ] Deep Work & Fokus
- [ ] Sinn & Ikigai
- [ ] Beziehungen
- [ ] Kultur & Perspektiven

**Technische Umsetzung MVP:**
- Statische Checkboxen
- Filter speichern in Session/Cookie (kein Backend nötig für Demo)
- Änderungen erst nach Logout aktiv

---

### 3. Transparenz-Layer ("Warum sehe ich das?")

**Was:** Bei jedem Content-Item ein Button/Tooltip  
**Ziel:** User versteht Auswahllogik

**Must-have Transparenz-Texte (5-7 Varianten):**

✅ **Variante 1: Ziel-Match**
> "Du siehst das, weil es zu deinem Ziel '[Weltreise]' passt – wichtig, aber nicht dringend. Perfekt für Deep Work."

✅ **Variante 2: Eisenhower-Kategorie**
> "Basierend auf Eisenhower-Matrix: Wichtig, nicht dringend. Zeit für Reflexion."

✅ **Variante 3: PERMA-Match**
> "Passt zu deinem PERMA-Profil: Meaning (Sinn) + Achievement (Zielerreichung)."

✅ **Variante 4: Format-Präferenz**
> "Du hast Podcasts aktiviert. Geschätzte Hörzeit: 23 Minuten."

✅ **Variante 5: Guide-Empfehlung**
> "Der Guide empfiehlt das, weil du letzte Woche nach 'Zeit-Bewusstsein' gefragt hast."

**Technische Umsetzung MVP:**
- Statische Texte pro Content-Item (hardcoded in Demo)
- Button öffnet kleines Overlay mit Erklärung

---

### 4. Guide-Kommentar-System

**Was:** Guide kommentiert Content mit Persönlichkeit  
**Stil:** Direkt, ehrlich, nicht bevormundend

**Must-have Kommentar-Typen:**

✅ **Typ 1: Kontext-Einordnung**
> "Das hier ist kein Quick Win. Das ist tiefe Arbeit. Nimm dir Zeit."

✅ **Typ 2: Ziel-Verknüpfung**
> "Du willst in 3 Jahren sabbatical? Dieser Artikel zeigt dir, wie andere das finanziert haben."

✅ **Typ 3: Kritische Perspektive**
> "Der Autor ist polarisierend. Lies es trotzdem – oder gerade deswegen."

✅ **Typ 4: Zeitinvestition**
> "15 Minuten. Lohnt sich. Oder überspring's, wenn du heute keine Energie hast."

✅ **Typ 5: Erinnerung an Autonomie**
> "Nicht dein Ding? Mute diese Kategorie in den Einstellungen."

**Technische Umsetzung MVP:**
- Pro Content-Item 1 vordefinierter Kommentar
- Visuell: Kleines Overlay oder Sidebar-Element
- Keine dynamische Generierung (kann später via API)

---

### 5. Feed-Layout (Minimalistisch)

**Was:** Feed zeigt Content-Items mit klarer Struktur

**Must-have Elemente pro Item:**
- **Titel** (klar, direkt)
- **Format-Tag** (Artikel/Podcast/Zitat)
- **Lesezeit/Hörzeit** (z.B. "12 Min Lesezeit")
- **Eisenhower-Kategorie-Icon** (z.B. "Wichtig, nicht dringend")
- **"Warum sehe ich das?"-Button**
- **Guide-Kommentar** (ausklappbar oder persistent sichtbar)
- **CTA**: "Lesen", "Hören", "Später speichern"

**Anti-Pattern (was NICHT im MVP ist):**
❌ Endless Scroll
❌ "Ähnliche Artikel"-Empfehlungen
❌ Gamification (Punkte, Badges)
❌ "Noch 3 Artikel heute übrig"-Counter (zu manipulativ)

---

## 🚀 Nice-to-Have Features (V2 – Post-MVP)

Diese Features sind **konzeptionell wichtig**, aber **nicht zwingend für 30.10.**

### 🔄 Dynamische Personalisierung

**Was:** Algorithmus lernt aus User-Verhalten  
**Wie:**
- User markiert Content als "Mehr davon" / "Anderes Thema"
- System passt zukünftige Vorschläge an
- Basierend auf PERMA-Profil + Eisenhower-Präferenzen

**Status:** → Ausbau in V2  
**Begründung:** MVP zeigt Prinzip mit statischem Content – Algorithmus danach

---

### 🧠 PERMA-basierte Filter

**Was:** Detailfilter nach Positive Psychology-Dimensionen  
**Beispiel:**
- [ ] Zeig mir nur Content, der "Meaning" (Sinn) betrifft
- [ ] Fokus auf "Engagement" (Flow-States)

**Status:** → Ausbau in V2  
**Begründung:** Basis-Themenfilter reichen für MVP-Demo

---

### 🎯 Adaptive Guide-Interventionen

**Was:** Guide erkennt Muster und interveniert proaktiv  
**Beispiel:**
> "Du scrollst seit 10 Minuten. Wolltest du nicht [Ziel X] prioritisieren?"

**Status:** → Ausbau in V2  
**Begründung:** Ethisch komplex – braucht Nudging-Policy-Testing

---

### 📊 Content-Diversität-Metrics

**Was:** System stellt sicher, dass User nicht in Filterblase gerät  
**Wie:** Bewusst gegensätzliche Perspektiven einstreuen

**Status:** → Ausbau in V2  
**Begründung:** MVP fokussiert auf User-Kontrolle, nicht Algorithmus-Features

---

### 🔗 Integration mit Dashboard

**Was:** Feed-Aktivität wird auf Dashboard getrackt  
**Beispiel:** "Diese Woche: 5 Artikel gelesen, 2 Podcasts gehört, 2h Deep Work"

**Status:** → Ausbau in V2  
**Begründung:** Dashboard ist spätere Phase (STEP 8+)

---

## 📋 Implementierungs-Checkliste (MVP bis 30.10.)

### Phase 1: Content-Vorbereitung
- [ ] 15-20 Content-Items manuell kuratieren
- [ ] Jedes Item kategorisieren (Eisenhower + PERMA + Format)
- [ ] Guide-Kommentare pro Item schreiben (1 pro Item)
- [ ] Transparenz-Texte zuordnen ("Warum sehe ich das?")

### Phase 2: Filter-System
- [ ] Format-Checkboxen implementieren (UI)
- [ ] Anzahl-Limit-Input (User setzt Dosis)
- [ ] Themen-Filter (grobe Kategorien)
- [ ] Speicherung in Session/Cookie

### Phase 3: Transparenz-UI
- [ ] "Warum sehe ich das?"-Button pro Item
- [ ] Overlay/Tooltip mit Erklärung
- [ ] Guide-Kommentar-Element (Sidebar oder Overlay)

### Phase 4: Feed-Layout
- [ ] Content-Item-Cards designen
- [ ] Icons für Eisenhower-Kategorien
- [ ] CTA-Buttons ("Lesen", "Hören")
- [ ] Responsives Layout (Mobile + Desktop)

### Phase 5: Testing
- [ ] User kann Filter setzen
- [ ] Content erscheint entsprechend Filter
- [ ] Transparenz-Texte sind verständlich
- [ ] Guide-Kommentare passen zur Tonalität

---

## 🎨 Visuelle Referenz (Wireframe-Logik)

```
┌─────────────────────────────────────────────┐
│  FILTER-PANEL (ausklappbar)                 │
│  ☐ Artikel ☐ Podcasts ☑ Zitate            │
│  Max. pro Tag: [3] Artikel                  │
│  Themen: ☑ Zeit ☐ Deep Work ☑ Sinn        │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  📄 ARTIKEL: "Your Life in Weeks Revisited" │
│  ⏱ 8 Min Lesezeit | 🟩 Wichtig, nicht dring.│
│                                              │
│  Guide sagt:                                │
│  "Das ist kein Quick Win. Tiefe Arbeit."   │
│                                              │
│  [Warum sehe ich das?] [Lesen]              │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  💬 ZITAT: "Those are your weeks..."        │
│  – Tim Urban                                 │
│  🟩 Wichtig, nicht dringend                  │
│                                              │
│  [Warum sehe ich das?]                      │
└─────────────────────────────────────────────┘
```

---

## ✅ Status & Nächste Schritte

**Aktueller Stand:**
- [x] Kuratierungskriterien definiert (MVP-Scope)
- [x] Filter-System spezifiziert
- [x] Transparenz-Layer dokumentiert
- [x] Guide-Kommentar-Typen festgelegt
- [x] Nice-to-have Features markiert (V2)

**Nächste Aufgabe:**
- [ ] **2.2: Guide-Kommentar-Templates schreiben** (10-15 Beispiele für verschiedene Content-Typen)
- [ ] **2.3: "Warum sehe ich das?"-Tooltip-Texte finalisieren** (Copy-paste-ready)
- [ ] **Content-Recherche:** 15-20 echte Artikel/Podcasts/Zitate finden

---

**Erstellt von:** FYF Team  
**Letzte Aktualisierung:** 25.10.2025  
**Für Fragen:** Siehe Flowchart STEP 5 + STEP 6