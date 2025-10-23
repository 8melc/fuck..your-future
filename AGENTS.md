# Repository Guidelines

## Projekt-Vision & Basisdokumente

Unsere ursprüngliche Projekt-Vision und die zentralen Basisideen findest du in den Archivdateien unter `/docs/Basis_Archive/`:

- **`basis_Deal-Entwurf_05 09 2025.md`** - Ursprüngliche Deal-Entwürfe und Projektstrategie
- **`basis_Ideen_MVP-Features (Version Zero)_05 09 2025.md`** - Erste MVP-Feature-Ideen und Konzeptentwicklung

Diese Archivdateien enthalten die ursprünglichen Ideen und die Basisvision des FYF-Projekts. Sie erläutern die Entstehung, Hintergründe und die übergeordnete Strategie.

**Achtung:** Einzelne Details darin sind nicht mehr aktuell – die Dokumente dienen als Grundgerüst und Inspirationsquelle. Die aktuelle Umsetzung ist in den Flowcharts und der Hauptdokumentation beschrieben.

## Aktuelle Dokumente & Flowcharts

Die Dateien mit „aktuell_" im Namen enthalten die jeweils aktuelle Vision, die Roadmap und die User Flows des FYF-Projekts:

- **`aktuell_🗺️ FYF User Flow – Flowchart Visualisierung.md`** - Zentrale User Flow Referenz mit 11 Steps und Priorisierungen
- **`aktuell_FLOWCHART-INTEGRATION-SUMMARY.md`** - Integration Summary und Development Guidelines
- **`aktuell_Debrief_Werkstatt-Check-In_07 10 2025.md`** - Aktuelle Meeting Notes und Entwicklungsstand
- **`aktuell_FYF Circle – Debrief_09 10 2025 (Extern) (1).md`** - Externe Circle Debrief und Strategie-Updates

Diese Dokumente bilden den aktuellen Stand der Entwicklung, Roadmap und User Flows ab. Sie sind die wichtigste Basis für neue Features, Komponenten und die Produktstrategie.

**Wichtig:** Bei Generierungen, Änderungen und Automatisierungen wird immer zuerst auf die aktuell_ Dateien Bezug genommen. Für Hintergrund und Ursprung siehe die Archivdateien im Ordner Basis_Archive.

## Project Structure & Module Organization
The active product lives in `fyf-app/`, a Next.js 16 App Router project configured for TypeScript. Page routes sit under `src/app`, grouped by feature (`life-weeks`, `people`, etc.) with co-located `page.tsx`, loading states, and CSS modules when needed. Shared UI and hooks belong in `src/components`, while static assets go in `public/`. Legacy marketing prototypes remain in the repository root as standalone HTML files; leave them untouched unless you are migrating them into the Next.js app.

## Build, Test, and Development Commands
Install dependencies with `npm install` inside `fyf-app/`. Run `npm run dev` for the local dev server, `npm run build` for production builds, and `npm run start` to verify the built output. Keep lint clean with `npm run lint`; pass `--fix` when safe to auto-resolve formatting issues.

## Coding Style & Naming Conventions
Write TypeScript first; new files should be `.tsx` or `.ts`. Follow the existing two-space indentation and favor `PascalCase` for components, `camelCase` for utilities, and kebab-case for route folders. Tailwind CSS classes drive styling—prefer utility composition over ad-hoc CSS, and define shared tokens in `globals.css` as needed. ESLint already enforces Next.js Core Web Vitals rules, so address all warnings before committing.

## Testing Guidelines
Automated tests are not yet scaffolded, so rely on manual verification while keeping linting mandatory. When adding tests, place them alongside the feature (`src/app/<route>/__tests__/*.test.tsx`) or in `src/components/__tests__/`, and aim for meaningful rendering or integration coverage. Document any new test scripts in `package.json` and update this guide once a framework is adopted.

## Commit & Pull Request Guidelines
Recent history mixes English and German messages, but they stay short and descriptive. Use the imperative mood (`Add life-weeks timeline`) and keep subject lines under 72 characters. Each pull request should include: a concise summary, screenshots or clips of UI changes, links to related issues, and a checklist of manual verifications (dev server, build, lint). Request review before merging to `main`, squash commits when the history is noisy, and ensure no untracked artifacts are left behind.

## FYF User Flow Integration

### Development Based on User Flow Flowchart

All development must follow the **🗺️ FYF User Flow – Flowchart Visualisierung.md** as the central reference. This document defines the complete user journey with 11 core steps and continuous elements.

### Feature Development Priority

**Phase 1 - Core Features (Must-have ⭐⭐⭐):**
- STEP 2: Login via Geburtsdatum
- STEP 3: Life-in-Weeks Visualisierung  
- STEP 4: Zielsetzung
- STEP 5: Guide/Content-Feed
- STEP 6: Filter-Funktion
- STEP 7: Tageslimit

**Phase 2 - High Priority (⭐⭐):**
- STEP 9: Events/Workshops
- STEP 10: Credits & Access-Limitierung
- STEP 11: Kauf/Credit-Transaktion

**Phase 3 - V2 Features (⭐):**
- STEP 8: People/Experten-Modul

### Component Development Guidelines

When creating components, always reference the specific Flowchart Step:

```bash
# Example component creation prompts:
"Create React component for STEP 2: Login via Geburtsdatum according to Flowchart"
"Implement STEP 3: Life-in-Weeks Visualisierung with grid display and metrics"
"Build STEP 4: Zielsetzung component with goal input and profile integration"
```

### Testing Requirements per Step

Each Flowchart Step requires specific testing:

- **STEP 2**: Date validation, session management, cookie handling
- **STEP 3**: Grid calculations, metrics display, responsive design
- **STEP 4**: Goal storage, profile integration, motivation feedback
- **STEP 5**: Content feed, guide comments, dynamic loading
- **STEP 6**: Filter functionality, live updates, preference storage
- **STEP 7**: Session timer, limit enforcement, logout mechanics

### Continuous Elements (Always Active)

These elements must be implemented across all components:

- **Transparenz & Ethik**: "Warum sehe ich das?" info buttons
- **Rückmeldung & Motivation**: Feedback triggers at milestones
- **Restzeit-Kachel**: Always visible time awareness widget

### Development Workflow with Flowchart

1. **Reference Flowchart**: Always check the specific Step's To-Do Block
2. **Component Creation**: Use Step-specific requirements and priorities
3. **Testing**: Implement tests for each Step's specific functionality
4. **Integration**: Ensure components connect according to Flowchart flow
5. **Documentation**: Update docs with Step-specific implementation details
