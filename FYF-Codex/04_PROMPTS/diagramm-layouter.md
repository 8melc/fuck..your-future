# Diagramm-Layouter für Flow/Mermaid

**Titel:** Diagramm-Layouter für Flow/Mermaid  
**Typ:** Visualisierung  
**Zweck:** Visual-Logik für Cluster/Architektur-Kopplung  

---

## Prompt

Erzeuge ein Mermaid-Diagramm, das die Verbindungen zwischen den 6 FYF-Content-Clustern, UI-Rollen und Guide-Kommentaren darstellt (mit Labels/Kuratorpfad erreichbar).

---

## Diagramm-Typen

### 1. Content-Cluster-Flow
```mermaid
graph TD
    A[User Onboarding] --> B[Content-Filter]
    B --> C[Zeit & Endlichkeit]
    B --> D[Freiheit & Orte]
    B --> E[Fokus & Flow]
    B --> F[Geld & Wert]
    B --> G[Sinn & Haltung]
    B --> H[Kultur & Stimmen]
    
    C --> I[Guide-Kommentar]
    D --> I
    E --> I
    F --> I
    G --> I
    H --> I
    
    I --> J[Transparenz-Layer]
    J --> K[User-Action]
```

### 2. System-Architektur
```mermaid
graph LR
    A[User] --> B[Filter-System]
    B --> C[Content-Pool]
    C --> D[Kuratierung]
    D --> E[Guide-Engine]
    E --> F[Transparenz-Layer]
    F --> G[Feed-UI]
    G --> A
    
    H[Wissenschaftliche Basis] --> D
    I[PERMA-Modell] --> D
    J[Eisenhower-Matrix] --> D
```

### 3. Content-Entscheidungsbaum
```mermaid
flowchart TD
    A[Content-Item] --> B{Wichtig?}
    B -->|Ja| C{Dringend?}
    B -->|Nein| D[Inspiration]
    
    C -->|Ja| E[Sofort]
    C -->|Nein| F[Deep Work]
    
    E --> G[Guide-Kommentar]
    F --> G
    D --> G
    
    G --> H[Transparenz-Erklärung]
    H --> I[User-Action]
```

---

## Mermaid-Templates

### Content-Cluster-Übersicht
```mermaid
graph TB
    subgraph "FYF Content-Cluster"
        A[Zeit & Endlichkeit<br/>Life in Weeks<br/>Burkeman<br/>Frankl]
        B[Freiheit & Orte<br/>Bali Coworking<br/>Nomad Podcast<br/>Jenny Odell]
        C[Fokus & Flow<br/>Cal Newport<br/>Farnam Street<br/>FYF Design]
        D[Geld & Wert<br/>Money as Energy<br/>Hidden Brain<br/>Morgan Housel]
        E[Sinn & Haltung<br/>Psyche Magazine<br/>On Being<br/>Ikigai]
        F[Kultur & Stimmen<br/>Austin Kleon<br/>Art Resistance<br/>Erykah Badu]
    end
    
    subgraph "User-Interaktion"
        G[Filter-Setup]
        H[Content-Consumption]
        I[Feedback-Loop]
    end
    
    A --> G
    B --> G
    C --> G
    D --> G
    E --> G
    F --> G
    
    G --> H
    H --> I
    I --> A
```

### Guide-Kommentar-System
```mermaid
sequenceDiagram
    participant U as User
    participant F as Feed
    participant G as Guide
    participant T as Transparenz
    
    U->>F: Content anzeigen
    F->>G: Kommentar generieren
    G->>F: FYF-Style Kommentar
    F->>U: Content + Kommentar
    U->>T: "Warum sehe ich das?"
    T->>U: Erklärung (Eisenhower/PERMA)
    U->>F: Action (Lesen/Skip/Speichern)
```

### PERMA-Integration
```mermaid
graph LR
    subgraph "PERMA-Dimensionen"
        P[Positive Emotion]
        E[Engagement]
        R[Relationships]
        M[Meaning]
        A[Achievement]
    end
    
    subgraph "Content-Cluster"
        C1[Zeit & Endlichkeit]
        C2[Freiheit & Orte]
        C3[Fokus & Flow]
        C4[Geld & Wert]
        C5[Sinn & Haltung]
        C6[Kultur & Stimmen]
    end
    
    C1 --> M
    C2 --> A
    C3 --> E
    C4 --> A
    C5 --> M
    C6 --> R
```

---

## Diagramm-Generierung-Prompts

### Für Content-Flow
```
Erstelle ein Mermaid-Diagramm für den FYF-Content-Flow:
1. User startet mit Onboarding
2. Setzt Filter (Format, Themen, Limits)
3. Content wird nach 6 Clustern gefiltert
4. Guide kommentiert jeden Content
5. Transparenz-Layer erklärt Auswahl
6. User interagiert (Lesen/Skip/Speichern)
7. Feedback fließt zurück in System

Stil: Klar, minimalistisch, fokussiert auf User-Autonomie
```

### Für System-Architektur
```
Visualisiere die FYF-System-Architektur:
- User als Zentrum
- Filter-System als Kontrollschicht
- Content-Pool als Datenquelle
- Kuratierung als Qualitätsfilter
- Guide-Engine als Kommentar-Generator
- Transparenz-Layer als Erklärungsmodul
- Feed-UI als Präsentationsschicht

Zeige: Datenfluss, Entscheidungspunkte, Feedback-Loops
```

### Für Content-Entscheidungen
```
Erstelle einen Entscheidungsbaum für Content-Kategorisierung:
- Start: Content-Item
- Kriterium 1: Wichtig? (Ja/Nein)
- Kriterium 2: Dringend? (Ja/Nein)
- Ergebnis: Eisenhower-Kategorien
- Folge: Guide-Kommentar-Style
- Ende: Transparenz-Erklärung

Stil: Logisch, nachvollziehbar, transparent
```

---

## Visual-Requirements

### Design-Prinzipien
- **Minimalistisch:** Weniger ist mehr
- **Klar:** Jeder Pfeil hat Bedeutung
- **Transparent:** Entscheidungen sichtbar
- **User-zentriert:** User im Mittelpunkt

### Farb-Coding
- **Blau:** User-Aktionen
- **Grün:** Content-Cluster
- **Orange:** Guide-System
- **Grau:** System-Komponenten
- **Rot:** Entscheidungspunkte

### Labeling
- **Kurze Labels:** Max. 3 Wörter
- **Klare Pfeile:** Richtung eindeutig
- **Gruppierungen:** Logische Clusters
- **Legende:** Farb-/Symbol-Erklärung

---

## Export-Formate

### Mermaid-Live
- Direkt in Mermaid-Live-Editor
- Export als PNG/SVG
- Embedding in Dokumentation

### Notion-Integration
- Mermaid-Blocks in Notion
- Interaktive Diagramme
- Kollaborative Bearbeitung

### GitHub-Integration
- Mermaid in README.md
- Automatische Rendering
- Versionierung

---

**Status:** Template bereit für Diagramm-Generierung  
**Nächste Schritte:** Prompts ausführen, Diagramme erstellen, in Dokumentation integrieren
