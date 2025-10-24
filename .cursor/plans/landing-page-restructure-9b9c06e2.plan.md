<!-- 9b9c06e2-76dd-4ee7-b303-d36719831918 f75adc51-8216-4807-8137-5034a5b51bc5 -->
# Landing Page Layout Restructure

## Analyse der Vorlage-Struktur

Die Figma-Vorlage zeigt folgendes Layout:

- **Hero mit Hintergrundbild** (fullscreen)
- **Navigation oben** (horizontal verteilt: Home links, Tagline Mitte, Menu rechts)
- **Großer vertikaler Gap** (540px Desktop, 332px Mobile)
- **Meta-Info Box + CTA Button unten** (nebeneinander auf Desktop, gestapelt auf Mobile)
- **Padding**: px-[20px] py-[30px] für Hero-Content
- **Meta-Box**: Dunkler Hintergrund (rgba(29,29,29,0.9)), rounded-[8px], gap-[40px] zwischen Items

## Implementierung

### 1. Hero-Struktur anpassen

**Datei**: `fyf-app/src/app/landing/page.tsx`

- Hero-Section als fullscreen Container mit Hintergrundbild (bestehende Gradient-Overlays beibehalten)
- Content-Wrapper mit `px-[20px] py-[30px]` und `flex flex-col` Layout
- Großer vertikaler Gap zwischen Navigation und Bottom-Section

### 2. Navigation umbauen

**Ersetzt die aktuelle vertikale Navigation durch horizontale 3-teilige Struktur:**

```typescript
<nav className="flex items-start justify-between w-full">
  {/* Links: FYF Text-Logo */}
  <a href="/" className="font-righteous text-[25.975px] text-fyf-cream leading-[0.9] tracking-tight">
    FYF
  </a>
  
  {/* Mitte: Headline "Zeit = Vermögen" */}
  <div className="flex items-center justify-center">
    <h1 className="font-righteous text-[25.975px] text-fyf-cream leading-[0.9] tracking-tight text-center">
      Zeit = Vermögen
    </h1>
  </div>
  
  {/* Rechts: Menu Items */}
  <div className="flex flex-col gap-[4px] items-end text-right">
    <a href="/guide" className="font-righteous text-[25.975px] text-[#95FF8D] leading-[0.9]">
      Guide
    </a>
    <a href="/people" className="font-righteous text-[25.975px] text-[#FF595E] leading-[0.9] underline">
      People
    </a>
  </div>
</nav>
```

**Responsive**: Gleiche Struktur auf allen Breakpoints, nur Font-Größen anpassen mit Tailwind responsive classes

### 3. Meta-Info Box + CTA erstellen

**Bottom Section mit gap-[540px] auf Desktop, gap-[332px] auf Mobile:**

```typescript
<div className="flex items-center justify-between w-full md:flex-row flex-col md:gap-0 gap-[40px]">
  {/* Meta-Info Box */}
  <div className="bg-[rgba(29,29,29,0.9)] rounded-[8px] p-[16px] flex md:flex-row flex-col md:gap-[40px] gap-[30px]">
    <div className="flex flex-col gap-[10px]">
      <h2 className="font-roboto-mono text-[14px] text-fyf-cream leading-[0.9] tracking-tight">
        Platzhalter für CTA
      </h2>
      <p className="font-roboto-mono text-[14px] text-fyf-cream leading-[0.9]">
        Life in Weeks folgt
      </p>
    </div>
    {/* Weitere Meta-Items nach Bedarf */}
  </div>
  
  {/* CTA Button */}
  <a 
    href="/life-weeks"
    className="bg-[#95FF8D] text-fyf-noir font-roboto-mono font-medium text-[16px] uppercase tracking-tight px-[19px] py-[12px] rounded-[24.5px] hover:bg-[#95FF8D]/90 transition"
  >
    jetzt starten
  </a>
</div>
```

### 4. Content-Wrapper mit korrektem Gap

**Haupt-Content mit flex-col und großem Gap:**

```typescript
<div className="flex flex-col items-center justify-between h-full w-full max-w-[1600px]">
  <nav>{/* Navigation */}</nav>
  
  {/* Vertikaler Spacer - responsive */}
  <div className="flex-1 min-h-[332px] md:min-h-[540px]" />
  
  <div>{/* Meta + CTA */}</div>
</div>
```

### 5. Bestehende Sections beibehalten

- **Secondary Content Section** (Quote, Feature Grid) bleibt nach dem Hero
- **Footer** bleibt am Ende
- Alle Farben bleiben FYF-spezifisch (fyf-noir, fyf-cream, #95FF8D, #FF595E, etc.)

### 6. Responsive Breakpoints

- **Mobile** (< 768px): Gestapeltes Layout, kleinere Gaps
- **Tablet** (768px - 1279px): Übergang zu horizontal
- **Desktop** (≥ 1280px): Volle horizontale Layouts, maximale Gaps

## Layout-Mapping: Vorlage → FYF

| Vorlage Element | FYF Umsetzung |

|-----------------|---------------|

| Hero Background Image | Hero mit Gradient-Overlays (bestehend) |

| "Home" Link | "FYF" Text-Logo |

| "Running for Change" Tagline | "Zeit = Vermögen" Headline |

| "About Us / Events" Menu | "Guide / People" Navigation (FYF-Farben) |

| Location/Date/Time Meta | "Platzhalter für CTA / Life in Weeks folgt" |

| "REGISTER" Button | "jetzt starten" Button (#95FF8D) |

| gap-[540px] | Gleicher vertikaler Gap zwischen Nav und Bottom |

| Meta-Box Styling | Gleicher dunkler BG, rounded, padding |

## Änderungen zusammengefasst

1. ✅ Vertikale Navigation → Horizontale 3-teilige Navigation
2. ✅ Zentrale Headline → Tagline in Nav-Mitte
3. ✅ Neue Meta-Info Box mit Platzhalter-Content
4. ✅ CTA Button mit FYF-Mint-Farbe
5. ✅ Große vertikale Gaps wie in Vorlage (540px/332px)
6. ✅ Responsive Breakpoints mit Tailwind
7. ✅ Bestehende Feature-Section und Footer bleiben erhalten
8. ✅ Alle FYF-Farben und -Fonts bleiben erhalten

### To-dos

- [ ] Restructure Hero section with correct padding, flex layout, and content wrapper matching template structure
- [ ] Replace vertical navigation with horizontal 3-part layout (FYF logo left, headline center, menu right) using FYF colors
- [ ] Create bottom section with Meta-Info box and CTA button, responsive layout with correct gaps and styling
- [ ] Add responsive vertical spacer between nav and bottom section (540px desktop, 332px mobile)
- [ ] Verify responsive behavior across mobile, tablet, and desktop breakpoints