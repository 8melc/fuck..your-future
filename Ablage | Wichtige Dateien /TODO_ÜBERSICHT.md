# TODO-Übersicht – FYF Projekt

Stand: Oktober 2025

## 📋 Inhalt

1. [Backlog Items](#backlog-items)
2. [API & Backend Integration](#api--backend-integration)
3. [Code-spezifische TODOs](#code-spezifische-todos)
4. [UI/UX Verbesserungen](#uiux-verbesserungen)
5. [Testing](#testing)

---

## Backlog Items

**Quelle:** `Ablage | Wichtige Dateien /BACKLOG.md`

- [ ] **Grid-Hover-Tipps prüfen**
  - Datei: `/life-weeks` (Wochenraster)
  - Aufgabe: Tooltip-Texte Darstellung fixen
  - Status: Offen

- [ ] **Kartenpanel responsive machen**
  - Bereich: Mobile Viewports
  - Aufgabe: Tabs für mobile Ansicht optimieren
  - Status: Offen

---

## API & Backend Integration

**Quelle:** `fyf-app/README.md` (Zeilen 182-184)

- [ ] **Feedboard Event Integration**
  - TODO: Connect with Feedboard dispatch event `fyf:addFocus`
  - Datei: `fyf-app/src/hooks/useGuideState.ts`
  - Status: Offen

- [ ] **API-Endpoint Migration**
  - TODO: Replace mock data with API calls to `/api/feedboard/*`
  - Betroffene Dateien:
    - `fyf-app/src/hooks/useGuideState.ts`
    - `fyf-app/src/app/guide/dashboard/page.tsx`
    - `fyf-app/src/components/profile/CreditsWidget.tsx`
  - Status: Offen

- [ ] **Real-time Sync Implementation**
  - TODO: Implement real-time sync via WebSocket/SSE
  - Datei: `fyf-app/src/hooks/useGuideState.ts`
  - Status: Offen

---

## Code-spezifische TODOs

### useGuideState.ts

**Datei:** `fyf-app/src/hooks/useGuideState.ts`

- [ ] **Zeile 41:** API Endpoint Conversion
  - TODO: Convert to API endpoint `/api/feedboard/images` for live loading
  - Status: Offen

- [ ] **Zeile 327:** Event Integration
  - TODO: Connect with Feedboard dispatch event `fyf:addPrompt`
  - Status: Offen

- [ ] **Zeile 328:** Real-time Sync
  - TODO: Implement real-time sync via WebSocket/SSE
  - Status: Offen

### Guide Dashboard

**Datei:** `fyf-app/src/app/guide/dashboard/page.tsx`

- [ ] **Zeile 25:** Profile Data
  - TODO: Replace with real profile from API/context
  - Status: Offen

### Credits Widget

**Datei:** `fyf-app/src/components/profile/CreditsWidget.tsx`

- [ ] **Zeile 32:** API Call
  - TODO: Replace mock data with real API call
  - Status: Offen

---

## UI/UX Verbesserungen

### Access Pages (Legacy HTML)

- [ ] **access-page-finish-step8.html** (Zeile 738)
  - TODO: Ersetze Status-Copy für GUIDE, sobald echte Daten verfügbar sind
  - Status: Offen

- [ ] **access-page-standalone.html** (Zeile 42)
  - TODO: Animation for Step 4 "Dein Ziel"
  - Status: Offen

---

## Testing

**Status:** Tests sind noch nicht implementiert

**Anforderungen laut AGENTS.md:**

### STEP 2: Login via Geburtsdatum
- [ ] Date validation
- [ ] Session management
- [ ] Cookie handling

### STEP 3: Life-in-Weeks Visualisierung
- [ ] Grid calculations
- [ ] Metrics display
- [ ] Responsive design

### STEP 4: Zielsetzung
- [ ] Goal storage
- [ ] Profile integration
- [ ] Motivation feedback

### STEP 5: Guide/Content-Feed
- [ ] Content feed
- [ ] Guide comments
- [ ] Dynamic loading

### STEP 6: Filter-Funktion
- [ ] Filter functionality
- [ ] Live updates
- [ ] Preference storage

### STEP 7: Tageslimit
- [ ] Session timer
- [ ] Limit enforcement
- [ ] Logout mechanics

---

## Prioritäten (laut Flowchart)

### Phase 1 - Core Features (⭐⭐⭐ Must-have)
- [x] STEP 2: Login via Geburtsdatum (implementiert)
- [x] STEP 3: Life-in-Weeks Visualisierung (implementiert)
- [x] STEP 4: Zielsetzung (implementiert)
- [x] STEP 5: Guide/Content-Feed (implementiert)
- [x] STEP 6: Filter-Funktion (implementiert)
- [x] STEP 7: Tageslimit (implementiert)

### Phase 2 - High Priority (⭐⭐)
- [ ] STEP 9: Events/Workshops
- [ ] STEP 10: Credits & Access-Limitierung
- [ ] STEP 11: Kauf/Credit-Transaktion

### Phase 3 - V2 Features (⭐)
- [ ] STEP 8: People/Experten-Modul

---

## Continuous Elements (Always Active)

Diese Elemente müssen in allen Komponenten implementiert sein:

- [ ] **Transparenz & Ethik**: "Warum sehe ich das?" info buttons
- [ ] **Rückmeldung & Motivation**: Feedback triggers at milestones
- [ ] **Restzeit-Kachel**: Always visible time awareness widget

---

## Notizen

- **Letzte Aktualisierung:** Oktober 2025
- **Nächste Review:** Nach Abschluss der API-Integration
- **Aktueller Fokus:** Backend-Integration und Real-time Features

