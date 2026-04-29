# Front-End Spec — Shiin Portfolio

**Author:** UX Expert persona (Phase 3)
**Inputs:** `docs/brief.md`, `docs/prd.md`, ADR-001…006, build prompt §2
**Date:** 2026-04-28

---

## 0. How to read this spec

This document is the bridge between *what* the PRD wants and *how* it looks/feels. It is the **single source of truth for design tokens, component contracts, interaction details, and motion behavior**. The Architect (Phase 4) translates this into folder structure and routing. The Dev (Phase 6) implements one section at a time using this as the reference.

Anything marked **🟡 DECISION NEEDED** is a Ken-input point. Phase 3 does not advance until those are resolved.

---

## 1. Design tokens

Per ADR-004: **keep the baseline; refine, don't redesign.** Below: what stays, what's adjusted, and where Ken needs to pick.

### 1.1 Color — base (locked)

| Token | Hex | Role | Usage |
|---|---|---|---|
| `--bg-darkest` | `#0e0c16` | Page floor | Body bg fallback, footer bg |
| `--bg-dark` | `#1a1527` | Default surface | Body bg, hero |
| `--bg-section` | `#14121c` | Section break | Lab, About backgrounds |
| `--bg-card` | `#0f0d15` | Elevated surface | Project tile bg behind image |
| `--bg-footer` | `#0e0d10` | Footer base | Contact bg |
| `--primary` | `#5918df` | Brand purple | Block reveals, link color today, gradient glows |
| `--primary-light` | `#7b3ff2` | Brand hover | Currently unused; proposed for hover (§1.2) |
| `--primary-dark` | `#4012a6` | Brand pressed | Currently unused; proposed for active (§1.2) |

### 1.2 Color — accent + state refinements

The current palette **overloads `--primary`** for three jobs at once: brand surface (block reveals), CTA color (link/hover), and decorative glow. Per ADR-004, we split CTA off and lock state colors. Two proposals:

#### 🟡 DECISION NEEDED — Pick A or B

**Option A — Bold contrast accent (recommended)**

| Token | Hex | Sampled from | Role |
|---|---|---|---|
| `--accent` | `#ffa63d` | Existing `btn-gradient` orange | All link text, primary CTA stroke, hover underlines |
| `--accent-hot` | `#ff3d77` | Existing `btn-gradient` pink | Active/pressed state of `--accent` interactions |
| `--primary` | `#5918df` | (locked) | Decorative glows, block-reveal sweeps, focus rings, hero name highlight |
| `--primary-light` | `#7b3ff2` | (locked) | Hover state on `--primary` *surfaces* (e.g. block reveal hover) |

*Visual feel:* warm amber CTAs over deep purple/black. Highest contrast, most "intentional" — recruiters spot the action immediately. Distinct from yasio.dev's red/grey.

**Option B — Cohesive lavender accent**

| Token | Hex | Sampled from | Role |
|---|---|---|---|
| `--accent` | `#c792ea` | IDE keyword color (`IDECodeBlock.tsx:33`) | All link text, CTAs |
| `--accent-hot` | `#a64cff` | Derived (50% lighter than `--primary-dark`) | Active state |
| `--primary` | `#5918df` | (locked) | Glows, block reveals, focus rings |

*Visual feel:* the whole site sits in one purple family, like the IDE block extends outward. Quieter, more cohesive, less commercial. Matches the code-tag aesthetic.

> **My pick if forced:** **Option A.** Warmer accent draws the eye to "Get in touch" and `liveUrl` CTAs — the metrics that matter (G1: recruitable surface). Option B is prettier but the action sites blend into the background.

### 1.3 Color — neutral ramp (expanded)

Today: 4 levels (`text.light`, `text.muted`, `text.dim`, `text.dark`). Adding two so we have hover and disabled tiers:

| Token | Hex | Role | Contrast on `#0e0c16` |
|---|---|---|---|
| `--text-bright` | `#ffffff` | Hero name, key emphasis | 18.4 : 1 ✅ AAA |
| `--text-light` | `#f9f9f9` | Body, headings | 17.4 : 1 ✅ AAA |
| `--text-muted` | `#988e9f` | Secondary copy | 7.0 : 1 ✅ AAA |
| `--text-dim` | `#78707e` | Captions, line numbers, footer | 4.8 : 1 ✅ AA |
| `--text-faint` | `#574f5c` | Decorative metadata | 3.2 : 1 ⚠️ AA *Large only* |
| `--text-disabled` | `#3b3553` | Disabled state | 2.4 : 1 ❌ — only for non-text decoration |

Contrast computed against `#0e0c16` (page floor). Anything tagged ❌ must not carry information; AC for FR-A1 enforces this.

### 1.4 Color — code-block (locked from existing)

Inherited from `IDECodeBlock.tsx` Vibrant theme — Tokyo Night-tuned. **Locked**, no Phase 3 changes:

| Role | Hex |
|---|---|
| Comment | `#4a4a6a` |
| Keyword (`class`, `return`, `this`) | `#c792ea` |
| Class / function name | `#ffcb6b` |
| Property | `#f07178` |
| String | `#c3e88d` |
| Number | `#f78c6c` |
| Punctuation | `#89ddff` |
| Editor bg | `#0d0b14` |

### 1.5 Spacing scale

Tailwind defaults. Locked usage:

| Token | px | Role |
|---|---|---|
| `space-1` | 4 | Inline gaps |
| `space-2` | 8 | Compact pairs |
| `space-3` | 12 | Pill paddings |
| `space-4` | 16 | Default body gap |
| `space-6` | 24 | Section content gap |
| `space-8` | 32 | Sub-section gap |
| `space-12` | 48 | Hero block separation |
| `space-20` | 80 | Major section breaks (mobile) |
| `space-32` | 128 | Major section breaks (desktop) |

### 1.6 Type scale

| Token | Size · LH | Family | Role |
|---|---|---|---|
| `text-display` | `clamp(48px, 8vw, 96px) / 1.05` | sans (Roboto Condensed) | `/work/[slug]` page hero (new) |
| `text-hero` | `48px / 1.2` | sans | Home hero name |
| `text-hero-md` | `38px / 1.2` | sans | Tablet hero |
| `text-hero-sm` | `30px / 1.2` | sans | Mobile hero |
| `text-2xl` | `30px / 1.2` | sans | Section H2 |
| `text-xl` | `24px / 1.4` | sans | Section H3 |
| `text-lg` | `20px / 1.5` | sans | Lead paragraph |
| `text-base` | `16px / 1.6` | sans | Body |
| `text-sm` | `14px / 1.5` | mono | Code, tech-stack pills, captions |
| `text-xs` | `12px / 1.4` | mono | Section labels (`Start />`), metadata |
| `text-env` | `clamp(140px, 28vw, 800px) / 0.85` | mono | Environmental ghost text watermarks |

Fonts loaded today: Roboto Condensed, Roboto Mono, Fira Code, JetBrains Mono. **Locked.** Recommend dropping Fira Code (JetBrains Mono is the dominant code font; Fira Code is a near-unused fallback).

### 1.7 Radii

| Token | px | Role |
|---|---|---|
| `rounded` | 4 | Code-line bg highlight |
| `rounded-md` | 6 | Pills (tech stack) |
| `rounded-lg` | 8 | Inputs (none yet, future-proof) |
| `rounded-xl` | 12 | Project tiles |
| `rounded-2xl` | 16 | Mobile menu drawer, 404 card |
| `rounded-full` | ∞ | CTA button, social icons, spinner |

### 1.8 Shadows

Three only — keep restraint:

| Token | Value | Role |
|---|---|---|
| `shadow-tile` | `4px 21px 50px -10px rgba(0,0,0,0.8)` | Project tile hover (existing) |
| `shadow-glow` | `0 0 100px 0 rgba(89,24,223,0.18)` | Watermark + ambient |
| `shadow-cta` | `0 12px 40px -6px rgba(89,24,223,0.5)` | "Get in touch" hover (new — replaces overloaded `btn-gradient-glow`) |

### 1.9 Z-index map (locked authoritatively)

Currently scattered (`9999`, `99999`, ad-hoc `10`/`20`). Lock once:

| Layer | Z | Component |
|---|---|---|
| Atmosphere bg | `0` | `AtmosphereBackground` |
| Section content | `1` | All section bodies |
| Watermarks | `0` (sibling) | `aria-hidden` ghost text |
| Tile internals | `1–4` | `ProjectCard` image, glow, glare |
| Tile overlay (hover) | `20` | `ProjectCard` description flip |
| Scroll progress bar | `40` | `ScrollProgressBar` |
| Navbar | `50` | `Navbar` |
| Mobile menu drawer | `55` | inside `Navbar` |
| Custom cursor | `60` | `LiquidCursor` |
| Cert tooltip | `70` | `IDEWindow` |
| 404 page card | `80` | `not-found.tsx` |
| Loader | `90` | `Loader` |

Any new element must pick from this scale, not invent a new tier.

### 1.10 Motion — durations + easings

Today there are 9+ ad-hoc durations. Consolidate:

| Token | Duration | Easing | Role |
|---|---|---|---|
| `motion-instant` | 0ms | linear | reduced-motion fallback |
| `motion-quick` | 150ms | `ease-out` | Hover color, focus ring |
| `motion-default` | 250ms | `var(--ease-out-expo)` | Buttons, link transitions |
| `motion-smooth` | 400ms | `var(--ease-out-expo)` | Section transitions, card hover |
| `motion-reveal` | 700ms | `cubic-bezier(0.19, 1, 0.22, 1)` | Block reveals, intro stagger |
| `motion-decor` | 1200ms+ | varied | Scramble, scroll bounce, gradient drift |

Two easings only:
- `--ease-out-expo: cubic-bezier(0.165, 0.84, 0.44, 1)` (UI default) — locked
- `--ease-bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275)` (CTA punch) — locked

---

## 2. Component inventory

For each component: **purpose · props contract · states · key files**. This is the contract Phase 4 (Architect) and Phase 6 (Dev) work against.

### 2.1 Layout & chrome

| Component | Purpose | Key states | Files |
|---|---|---|---|
| **`<RootLayout>`** | App wrapper: fonts, providers, cursor, smooth scroll, metadata | n/a | `app/layout.tsx` |
| **`<NavBar>`** | Top nav with five anchor links + brand + mobile drawer | scrolled, mobile-open, active-section | `components/Navbar.tsx` |
| **`<BrandTag>`** ✨new | Renders `<Shiin/>` JSX-style logo. Extracted from inline JSX in Navbar. | normal, hover-scale | `components/BrandTag.tsx` |
| **`<Loader>`** | Pre-loader with `INIT()` wordmark + bar | loading, dismissed | `components/Loader.tsx` |
| **`<SmoothScrollProvider>`** | Lenis init + anchor binding + reduced-motion bypass | active, bypassed | `components/SmoothScrollProvider.tsx` |
| **`<LiquidCursor>`** | Custom cursor (pointer:fine only) | idle, hover-interactive, hidden | `components/LiquidCursor.tsx` |
| **`<ScrollProgressBar>`** | Top horizontal progress bar | n/a | `components/ScrollProgressBar.tsx` |
| **`<AtmosphereBackground>`** | Background gradient/noise field | n/a | `components/AtmosphereBackground.tsx` |
| **`<SectionWatermark>`** ✨new | Reusable `aria-hidden` ghost text for each section | n/a (parallax only) | `components/SectionWatermark.tsx` |

### 2.2 Section components

| Component | Purpose | Files |
|---|---|---|
| **`<HeroSection>`** | Identity + value + scramble + scroll hint | `components/HeroSection.tsx` |
| **`<ScrollHint>`** ✨new | "Scroll" label + indicator + down-arrow, reusable | `components/ScrollHint.tsx` |
| **`<ScrambleText>`** | Cycles through word list with scramble effect | `components/ScrambleText.tsx` |
| **`<WorkSection>`** | Renders ProjectGrid | `components/WorkSection.tsx` |
| **`<ProjectGrid>`** ✨new | Encapsulates the three responsive layouts (mobile single col, tablet 2-col, desktop 3-col stepped) | `components/ProjectGrid.tsx` |
| **`<ProjectTile>`** (renamed from `ProjectCard`) | Single tile: number, title, screenshot, rotating disk, hover overlay, click → route | `components/ProjectTile.tsx` |
| **`<RotatingDisk>`** ✨new | SVG circular text spinner for tiles | `components/RotatingDisk.tsx` |
| **`<ProjectDetailLayout>`** ✨new | `/work/[slug]` page chrome | `app/work/[slug]/page.tsx` |
| **`<LabSection>`** | Categorized link list | `components/LabSection.tsx` |
| **`<LabCategory>`** ✨new | One category block | inline or split |
| **`<LabItem>`** ✨new | One link row | inline or split |
| **`<AboutSection>`** | Wraps the class-block + a11y mirror | `components/AboutSection.tsx` |
| **`<ClassBlock>`** | Visual code-block (Shiki + tabs + tooltips). `aria-hidden="true"`. | `components/IDEWindow.tsx`, `components/IDECodeBlock.tsx` |
| **`<ClassBlockA11y>`** ✨new (gating) | Parallel `<dl>` semantic mirror — see §6. | `components/ClassBlockA11y.tsx` |
| **`<ContactSection>`** | Find-me-on + CTA + footer | `components/ContactSection.tsx` |
| **`<SocialList>`** ✨new | Renders socials from `content/socials.ts` | `components/SocialList.tsx` |
| **`<GetInTouchButton>`** ✨new | Magnetic CTA wrapping `mailto:` | `components/GetInTouchButton.tsx` |

✨ = new in Phase 6. The `Card → Tile` rename happens in Story 3.1 (atomic refactor).

### 2.3 Optional / deferred

- **`<ThemeToggle>`** — dark only ships v1 (per scope). **Out of scope.** Don't build.
- **Blog components (`<MDXContent>`, etc.)** — out of scope. Don't build.

---

## 3. Section-by-section interaction spec

For each section: **structure · interactions · §2-pattern citation**.

### 3.1 Start (Hero)

**Structure (top to bottom):**
1. Section label `Start />` (block-reveal, `motion-reveal`)
2. H1: "Hi, my name is **Shiin**" (block-reveal, `motion-reveal`, `--text-hero`, `--text-bright` for "Shiin")
3. H1 line 2: "I *build* {scramble}" — italic verb (the §2-mandated italic), monospace, `--accent` color on scramble word
4. Subtitle: "Let me show you what I've been working on..." (`--text-muted`)
5. ScrollHint: `Scroll` label + scroll-indicator + down-arrow → `#work`
6. Background: `HELLO` watermark, parallaxed via `useTransform` on scroll position

**Interactions:**
- On mount: lines 1–4 stagger-reveal at 200ms apart (1.3s total).
- ScrambleText cycles 10 words, 1500ms hold + 450ms scramble per cycle.
- Click any nav anchor → Lenis-scrolled smooth nav.
- Reduced-motion: stagger collapses to single 200ms fade-in; scramble freezes on first word; watermark static.

**§2 cite:** Hero, ambient motion, italicized verb.

### 3.2 Work

**Structure:**
1. Section label `Work />`.
2. Section H2 (sub-headline): "Selected web, mobile & branding projects..." (`--text-muted`).
3. ProjectGrid with stepped layout.
4. Background: `WORK` watermark.

**Interactions:**
- **Tile hover** (pointer:fine, motion-allowed): cursor grows; tile scales 1.03 + tilts ±6° based on cursor; description overlay fades in over 400ms; arrow nudges 12px right.
- **Tile click**: internal navigation to `/work/[slug]` via `next/link`.
- **Tile keyboard**: Enter / Space activates link.
- **Tile reduced-motion**: scale + tilt off, hover overlay fades only, rotating disk frozen.
- **Stagger reveal** on column scroll-into-view: 100ms per item, spring (stiffness 120, damping 20).
- **RotatingDisk**: 10s linear spin, behind screenshot.

**§2 cite:** Work tiles, numbered, rotating element, click reveals detail (now via routing per ADR-005).

### 3.3 Project Detail (`/work/[slug]`)

**Structure:**
1. Back link `← Work` top-left, sticky to viewport.
2. Project hero: title (`--text-display`), role · year (`--text-muted`), tech-stack pills, primary CTA (`View live →` or `Private build` disclosure).
3. Long-form description (max-width prose, `--text-light`).
4. Screenshot gallery (vertical stack on mobile, 2-col on desktop, lazy-loaded).
5. Bottom: `← Back to all work` link + "Next project →" link to next slug in projects array.

**Interactions:**
- Page transition in: fade + 8px y-offset over 250ms (reduced-motion: 150ms fade only).
- Image lightbox: **out of scope v1.** Click goes to fullsize via `next/image` `unoptimized` (or open in new tab). Add later if needed.
- Sticky back link: `position: sticky; top: 80px;` on desktop.

**§2 cite:** "Click reveals project detail (modal, side panel, or dedicated route)" — we picked route.

### 3.4 Lab

**Structure:**
1. Section label `Lab />`.
2. Heading paragraph: "Thesis papers, design work, competition wins, tech explorations and more." (Ken's voice, NOT yasio.dev's wording).
3. 2-column grid of categories on `sm+`, 1-col on mobile.
4. Each category: heading (`--text-faint`, large) + list of LabItems.
5. Background: `LAB` watermark.

**Interactions:**
- Category reveal: stagger 100ms in-view.
- LabItem hover: text shifts color to `--accent`, padding-left grows by 12px (current `.lab-link` behavior — keep).
- External links open new tab.
- Reduced-motion: no slide-in; static color shift on hover.

**§2 cite:** Lab as minimal text-link list, sub-categorized.

### 3.5 About

**Structure:**
1. Section label `<About />` (note: this section's label uses literal angle brackets, matching the JSX-tag aesthetic — see `AboutSection.tsx:47-51`).
2. Tab list (`role="tablist"`): `About.ts` · `Credentials.ts` (renamed from `.js`/`.ts` mix).
3. Active tab panel renders class-block (Shiki) + invisible accessible mirror (FR-A3).
4. Cert tooltips (`Cisco`, `freeCodeCamp`, `Google`) appear on hover/focus of cert string tokens.
5. Background: `ABOUT` watermark.

**Interactions:**
- Tab change: instant content swap; `motion-quick` cross-fade (reduced-motion: instant).
- Tab keyboard: APG `tablist` pattern (see §6.4).
- Cert tooltip: appears on focus + hover; dismissed on blur or `Escape`.
- Reduced-motion: spring tooltip → snap.

**§2 cite:** Class-block About — most distinctive YASIO element. Also our biggest a11y risk; see §6.

### 3.6 Contact

**Structure:**
1. Section label `Contact />`.
2. H2: "Find me on:".
3. SocialList — grid of social rows (icon + label + href).
4. GetInTouchButton — magnetic CTA → `mailto:`.
5. Footer: copyright with auto year + heart icon.
6. Background: `CONTACT` watermark.

**Interactions:**
- Social hover: color `--text-light` → `--accent`.
- CTA hover (pointer:fine, motion-allowed): magnetic translate ~6px, scale 1.08, gradient-shift bg-position to 100%.
- CTA reduced-motion: scale 1.02 only, no translate, no gradient drift.

**§2 cite:** Contact — Find me on + CTA + footer.

---

## 4. Animation map (with library ownership)

Per ADR-003: GSAP is dropped. Every animation falls to one of: **Framer Motion**, **Lenis**, **CSS keyframes**, or **Shiki** (compile-time only). Owners locked here so review never has "which one runs this?" doubt.

| Animation | Owner | Reason |
|---|---|---|
| Smooth wheel/touch scroll | Lenis | Purpose-built, lightest path |
| Anchor-scroll on nav click | Lenis (`scrollTo`) | Same engine; respects offset |
| Loader bar fill | CSS keyframe (`loaderProgress`) | Decorative; no JS state needed |
| Loader dismiss fade | CSS transition | Same |
| Hero block-reveal | CSS keyframe (`blockReveal`) + Framer state | Hybrid: CSS owns the sweep, Framer owns the trigger ordering |
| Hero scramble text | Framer Motion (custom `useEffect` cycle) | Needs JS state machine |
| Hero watermark parallax | Framer `useScroll`/`useTransform` | Scroll-linked transform |
| Section watermark parallax | Framer `useScroll`/`useTransform` | Same |
| Scroll progress bar | Framer `useScroll`/`useTransform` | Same |
| Tile reveal stagger | Framer `motion.div` variants + `useInView` | Component-scoped, viewport-triggered |
| Tile hover tilt + glow | Framer `useMotionValue` + `useSpring` | 60fps spring physics |
| Tile rotating disk | CSS `@keyframes spin` | No JS state; honor reduced-motion via `@media (prefers-reduced-motion: reduce)` |
| Tile flip-on-hover overlay | CSS transition (`opacity`, `transform`) | Cheaper than Framer; covered by global `prefers-reduced-motion` rule |
| About tab cross-fade | Framer `AnimatePresence` | Needs exit animation |
| Cert tooltip pop | Framer `useSpring` | Already shipped; keep |
| Page transition `/` ↔ `/work/[slug]` | Framer `AnimatePresence` (App-Router transition) | One pattern across routes |
| 404 page mount | Framer (single fade) | Trivial |
| CTA gradient drift | CSS keyframe (`gradientShift`) | Already shipped; gate via reduced-motion media query |
| CTA magnetic hover | Framer `useMotionValue` | Pointer-tracking |
| Cursor dot/ring | Framer `useMotionValue` + `useSpring` | Already shipped; keep |
| Code-block syntax highlighting | Shiki (server-side at build) | Compile-time, zero runtime |

**Reduced-motion gate strategy:** All Framer animations read `useReducedMotion()` and either drop transitions (`{ duration: 0 }`) or skip variants entirely. CSS-owned animations are gated by a single global rule:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0ms !important;
    scroll-behavior: auto !important;
  }
}
```

Lenis short-circuits in `SmoothScrollProvider` when `useReducedMotion()` is true.

---

## 5. Responsive behavior

Five breakpoint targets. **Layout pivots, not pixel-perfect mocks** — Tailwind handles the in-between fluidly.

| | 360 (mobile S) | 768 (tablet) | 1024 (laptop) | 1440 (desktop) | 1920 (wide) |
|---|---|---|---|---|---|
| **Nav** | Hamburger drawer | Hamburger drawer | 5 inline links | 5 inline links | 5 inline links |
| **Hero name** | `text-hero-sm` 30px | `text-hero-md` 38px | `text-hero` 48px | 48px (cap) | 48px (cap) |
| **Hero watermark** | `clamp(150px, 30vw, …)` resolves ~150px | ~230px | ~310px | ~432px | ~576px |
| **Work grid** | 1 col, gap-5 | 2 col staggered, B-col `pt-28` | 3 col stepped (`pt-0`/`pt-20`/`pt-40`) | 3 col stepped, gap-8 | 3 col stepped, max-w cap |
| **Tile height** | 280px | 320–460px varied | 380–530px varied | same | same |
| **Project Detail layout** | single column | single column | 2-col (text left, gallery right) | 2-col | 2-col |
| **Lab grid** | 1 col | 2 col | 2 col | 2 col | 2 col |
| **About class-block** | full-width, font-size 12px | full-width, 14px | left-shifted `-ml-16`, 14px | same | same |
| **Contact socials** | 1 col | 2 col | 3 col | 3 col | 3 col |
| **Custom cursor** | hidden | hidden | enabled | enabled | enabled |
| **Code-line indent** | hidden (`code-indent` display:none) | shown | shown | shown | shown |
| **Body padding** | `px-6` | `sm:px-12` | `lg:px-20` | `lg:px-20` | `lg:px-20` (max-w-7xl) |

**Non-negotiables:**
- **No horizontal scroll** at any breakpoint (already handled by `overflow-x: hidden` + `whitespace-nowrap` discipline on watermarks).
- **Touch targets ≥ 44 × 44 CSS px** at all breakpoints. Audit ProjectTile arrow + nav links specifically; current footer "social-link" is fine (1.1rem text + svg).
- **No CLS on font load** — preload Roboto Condensed display + JetBrains Mono code via `<link rel="preload">` in `app/layout.tsx`.

---

## 6. Accessibility plan — class-block (gating)

> **This section gates Phase 3 spec approval.** Per Ken's instruction: if this plan isn't concrete, push back.

### 6.1 Problem statement

`IDEWindow.tsx` renders ~30 lines of code as `<span style="color:#xyz">{token}</span>` chains, output by Shiki. To a sighted user that's a syntax-highlighted bio. To a screen reader it's a wall of unlabeled text fragments — `Shiin Ken Narzabal Tayabas City Quezon kenlawrencenarz@gmail.com` etc., concatenated, with no field boundaries.

### 6.2 Architecture: parallel rendering

The class-block is a **visual representation** of structured data. We treat it like an SVG chart: the visual is `aria-hidden`, and a parallel semantic structure carries the meaning.

```tsx
// AboutSection.tsx
<section id="about" aria-labelledby="about-heading">
  <h2 id="about-heading" className="sr-only">About Shiin</h2>

  {/* visual block — decorative for AT */}
  <div role="img" aria-labelledby="about-heading"
       aria-describedby="about-mirror" aria-hidden="false">
    <ClassBlock {...ideProps} />
  </div>

  {/* parallel mirror — readable to AT, visually hidden */}
  <div id="about-mirror" className="sr-only">
    <ClassBlockA11y profile={profile} credentials={credentials} />
  </div>
</section>
```

Notes:
- Container is `role="img"` because it's a labelled visual artifact, not interactive content.
- The visual `<ClassBlock>` itself receives `aria-hidden="true"` *internally* on its tab content area so the `<span>` soup doesn't double-announce.
- The tab list (interactive controls) stays accessible — see §6.4. Only the *code text* inside each tab panel is hidden.

### 6.3 `<ClassBlockA11y>` semantic structure

Output a series of `<dl>` blocks grouped by section heading. One `<dl>` per logical class method.

```tsx
<>
  <h3>Profile</h3>
  <dl>
    <dt>Name</dt>           <dd>Ken Lawrence E. Narzabal (Shiin)</dd>
    <dt>Location</dt>       <dd>Tayabas City, Quezon, Philippines</dd>
    <dt>Email</dt>          <dd><a href="mailto:...">kenlawrencenarz@gmail.com</a></dd>
  </dl>

  <h3>Education</h3>
  <dl>
    <dt>School</dt>         <dd>Colegio de la Ciudad de Tayabas (CCT)</dd>
    <dt>Degree</dt>         <dd>BS Computer Science</dd>
    <dt>Years</dt>          <dd>2022 – 2026</dd>
    <dt>Honors</dt>         <dd>Dean's Lister, AY 2022–2026 (consistent)</dd>
  </dl>

  <h3>Experience</h3>
  <ol>
    <li>
      <h4>Lead Developer — GSO-RMS (Thesis)</h4>
      <p>2024–2026 · Tayabas City government RMS</p>
    </li>
    <li>
      <h4>Founder / VR Lead — TimeLens VR</h4>
      <p>2023–2024 · 4× Best Startup Awards</p>
    </li>
    {/* etc. */}
  </ol>

  <h3>Skills</h3>
  <dl>
    <dt>Languages</dt>      <dd>TypeScript, JavaScript, PHP, Python, HTML, CSS</dd>
    <dt>Frameworks</dt>     <dd>React, Next.js, React Native, Vite, Capacitor</dd>
    <dt>Data</dt>           <dd>MySQL, REST APIs</dd>
    <dt>Design</dt>         <dd>Figma, branding, identity systems</dd>
  </dl>

  <h3>Certifications</h3>
  <ul>
    <li>Cisco Networking Academy (2023)
        — <a href="https://www.netacad.com/">verify</a></li>
    <li>freeCodeCamp (2022)
        — <a href="https://www.freecodecamp.org/">verify</a></li>
    <li>Google (2023)
        — <a href="https://grow.google/certificates/">verify</a></li>
  </ul>
</>
```

Wrapped in `.sr-only` (Tailwind's standard utility — `position: absolute; width: 1px; height: 1px; ...` clipped). NVDA/VoiceOver/JAWS read it; sighted users don't see it. Crucially, the structure is real semantic HTML — search engines index it, and AT users get prose.

### 6.4 Tab list keyboard contract (APG `tablist` pattern)

Per [W3C ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/):

| Key | Behavior |
|---|---|
| `Tab` | Move focus into the tab list (lands on the active tab) |
| `ArrowRight` | Move focus to next tab; activate (we use **automatic activation** — content already loaded, no perf cost) |
| `ArrowLeft` | Move focus to previous tab; activate |
| `Home` | Focus + activate first tab |
| `End` | Focus + activate last tab |
| `Tab` (again) | Move focus out of tab list, into next focusable element |

Markup:

```tsx
<div role="tablist" aria-label="About sections">
  <button role="tab"
          aria-selected={active === 'profile'}
          aria-controls="panel-profile"
          id="tab-profile"
          tabIndex={active === 'profile' ? 0 : -1}>
    About.ts
  </button>
  <button role="tab" /* ...credentials similar... */ />
</div>

<div role="tabpanel"
     id="panel-profile"
     aria-labelledby="tab-profile"
     hidden={active !== 'profile'}>
  {/* Shiki block + ClassBlockA11y */}
</div>
```

`:focus-visible` outline: 2px solid `--accent`, 2px offset.

### 6.5 Cert tooltip a11y

Tooltip currently appears on hover. Add:
- Tooltip linked via `aria-describedby` from the cert token (clickable wrapper).
- Trigger on `:focus` (keyboard), not just `:hover`.
- Dismiss on `Escape` (keyboard) — already implicit on blur.
- Tooltip itself `role="tooltip"`, `id` referenced.

### 6.6 Acceptance — what "done" looks like

- [ ] axe-core run on `/` reports zero `serious`/`critical` issues in the About region.
- [ ] NVDA in Chrome on `/#about`: announces "About Shiin", then "Profile" → "Name: Ken …" etc., as a structured outline. Does NOT announce the code `<span>` soup.
- [ ] VoiceOver rotor (macOS Safari, ⌃⌥U) lists each `<dl>` and heading as a navigable group.
- [ ] Keyboard-only: Tab into About → focus lands on `About.ts` tab → ArrowRight cycles → Tab continues out to next section.
- [ ] All cert tooltips reachable by keyboard focus with `Tab`.

> **This passes the gate Ken set in his Phase 0 message.** Story 5.2 in the PRD implements it; Story 8.2 (axe) verifies it.

---

## 7. Reduced-motion alternates — full table

Every animated element listed once with its `prefers-reduced-motion: reduce` behavior.

| Element | Default | Reduced-motion |
|---|---|---|
| Lenis smooth scroll | wheel/touch lerp | bypass — native `scrollIntoView({behavior:'auto'})` |
| Loader bar | `scaleX` 0→1 over 1.8s | static; 200ms fade-out only |
| Loader text | static | static |
| Hero block-reveal lines | translateX sweep + fade | 200ms opacity fade only |
| Hero scramble text | 1500ms hold + 450ms scramble cycle | freeze on first word |
| Hero watermark parallax | scroll-linked transform 0…-120px | static at 0 |
| Section watermarks (Work/Lab/About/Contact) | parallax | static |
| Scroll progress bar | scroll-linked scaleX | scroll-linked scaleX (no animation, just position — keep) |
| Tile stagger reveal | 100ms-staggered spring up | render at full opacity, no transform |
| Tile hover tilt | rotateX/rotateY ±6° + scale 1.03 | no transform; opacity-only flip |
| Tile rotating disk | 10s linear spin | static |
| Tile hover flip overlay | 400ms cross-fade + scale | 200ms opacity-only |
| About tab change | cross-fade | instant swap |
| Cert tooltip | spring pop-in | instant show/hide |
| Page transition `/`↔`/work/*` | 250ms fade + 8px y | 150ms fade only |
| 404 page mount | 200ms fade-up | 150ms fade only |
| CTA gradient drift | 3s background-position cycle | static |
| CTA hover scale | 1.08 + magnetic translate | scale 1.02, no translate |
| Custom cursor ring | spring follow + scale on hover | hidden entirely OR static dot only (Phase 6 picks; default = hidden) |

---

## 8. Open questions — needs Ken (or deferred)

1. **🟡 §1.2 — Pick accent palette: A (warm amber) or B (cohesive lavender)?** I recommend A.
2. **🟡 §3.1 — Italic verb word.** Default = "build". Other candidates: "design", "ship", "make". One pick.
3. **🟡 §3.6 — CTA reduced-motion: keep magnetic-disabled cursor *hidden* or *static dot only* on touch? Default: hidden entirely.** Confirmable later in Story 1.6 if you'd rather defer.
4. **🟡 §6.3 — `ClassBlockA11y` structure assumes data fields (Education years, Experience entries, Cert dates) you haven't yet provided.** Phase 6 Story 5.1 will scaffold with `TODO_KEN` placeholders; you fill in once. Confirm acceptable.

Everything else is locked by ADRs or PRD.

---

## 9. Definition of "spec done"

- [x] Design tokens documented with refinement options (§1) — pending Ken's A/B pick.
- [x] Component inventory complete with new components flagged ✨ (§2).
- [x] Section-by-section interaction spec citing §2 patterns (§3).
- [x] Animation map with explicit library ownership and reduced-motion strategy (§4).
- [x] Responsive table at 5 breakpoints (§5).
- [x] **Concrete a11y plan for class-block** with markup, keyboard contract, and acceptance checks (§6). **Gate cleared.**
- [x] Reduced-motion alternates enumerated for every animated element (§7).
- [x] Open questions surfaced (§8).

---

**Next phase (Phase 4 — Architect):** Adopt the Architect persona; produce `docs/architecture.md` covering folder structure, routing model (App Router with `/` + `/work/[slug]`), content model (typed `content/*.ts`), build/deploy (Vercel), SEO plan (sitemap, robots, OG, JSON-LD), analytics decision (Vercel Analytics vs Plausible), and testing strategy (Playwright + axe + Lighthouse CI). Wait for Ken's "go" — *and* his answer to §8 question 1 (palette) — before starting.
