# PRD — Shiin Portfolio

**Author:** PM persona (Phase 2)
**Inputs:** `docs/brief.md`, `docs/00-workspace-audit.md`, ADR-001…006
**Date:** 2026-04-28

---

## 0. How to read this document

- **Functional Requirements (FR)** are the *what*. They are testable from outside the system.
- **Non-Functional Requirements (NFR)** are the *how-well*. They apply across all FRs.
- **Epics** decompose the work into 8 ordered phases. **Stories** under each epic are atomic, PR-sized, and individually mergeable.
- **Story format:** *Title* — *user-statement* — *AC checklist* — *DoD* — *blocks/blocked-by*.
- **Blocking edges** are explicit so Phase 5 (PO) can validate the dependency graph.
- "Repo state today" notes reference current files so stories know whether they're greenfield, refactor, or finish-in-place.

---

## 1. Functional Requirements

### Global

- **FR-G1.** Single-page route `/` mounts five sections in order: Start, Work, Lab, About, Contact. Anchor IDs: `#start`, `#work`, `#lab`, `#about`, `#contact`.
- **FR-G2.** Per-project routes at `/work/[slug]` are statically generated for every project in the content layer. Each renders a detail layout, links to the live URL when available, and exposes a unique OG image.
- **FR-G3.** A 404 route renders for any non-matching path with the same visual language and a working "Back to start" affordance.
- **FR-G4.** Navigation: persistent top nav with five anchor links (Start, Work, Lab, About, Contact) styled with `Section />` code-tag suffix. Active section is visually marked.
- **FR-G5.** Brand mark: the `<Shiin/>` JSX/XML-style logo links to `#start` on `/` and to `/` from any other route.
- **FR-G6.** Anchor scroll: clicking a nav link smooth-scrolls to the target section with a fixed offset accounting for nav height (~72 px).
- **FR-G7.** Smooth scroll: momentum-based wheel/touch scrolling on pointer-capable devices. Disabled or short-circuited when the user prefers reduced motion (NFR-A4).
- **FR-G8.** Custom cursor: dot + trailing ring, expands on interactive elements. Active **only** on `(pointer: fine)` devices. Hidden entirely otherwise; never overlays touch targets.
- **FR-G9.** Pre-loader screen: covers the viewport on first paint, displays the brand wordmark `INIT()` and a determinate progress bar. Dismisses ≤ 2.5s after load. Hidden via `aria-hidden` once dismissed.
- **FR-G10.** Mobile menu: hamburger toggle on widths < 768 px; opens a drawer with the same five anchor links.
- **FR-G11.** Scroll progress: a thin horizontal bar at top of viewport reflects total page scroll progress on `/`.

### Section: Start (Hero)

- **FR-S1.** Two stacked statements — identity line ("Hi, my name is **Shiin**") and value line ("I build and develop *X*") with one *italicized* verb in the value line.
- **FR-S2.** The `X` cycles through a curated word list using a scramble effect (current `ScrambleText` component).
- **FR-S3.** Scroll affordance ("Scroll" + indicator) anchored to `#work`, plus a corner down-arrow.
- **FR-S4.** Ambient motion: a subtle parallaxed environmental ghost-text watermark ("HELLO") drifting on scroll.

### Section: Work

- **FR-W1.** Renders all projects from `content/projects.ts` as tile cards. The order in the data file is the order on screen.
- **FR-W2.** Each tile shows: project number (00, 01, …), title (multi-line allowed), tech-stack pills, a screenshot, an arrow `→`, a hover overlay with description and live-link CTA, and a privacy badge if the project is `screenshots`-only.
- **FR-W3.** Each tile includes a **rotating element** behind the screenshot (circular-text disk or rotating ring) that visibly spins. Honors NFR-A4 (reduced motion → static).
- **FR-W4.** Clicking a tile navigates internally to `/work/[slug]` via `next/link`. The live URL becomes a CTA *inside* the detail page; tiles no longer open external URLs.
- **FR-W5.** Layout: stepped multi-column grid on `lg` (3 cols, vertical offsets), 2-col staggered on `md`, single-column stack on mobile.

### Section: Project Detail (`/work/[slug]`)

- **FR-D1.** Header: project title, tech stack, role, year, and a primary "View live" CTA (suppressed for `screenshots`-only projects, replaced with a "Private build — screenshots only" disclosure).
- **FR-D2.** Body: long-form description (problem, role, stack, outcome — fields in `content/projects.ts`). Uses `TODO_KEN` placeholders where Ken hasn't supplied copy yet.
- **FR-D3.** Gallery: project screenshots from `public/works/`, lazy-loaded via `next/image`.
- **FR-D4.** Footer: "Back to all work" link returning to `/#work`.
- **FR-D5.** OG image: dynamically rendered per slug via `next/og`, embedding project title + accent color.
- **FR-D6.** Metadata: per-page `<title>`, `description`, canonical, OG, Twitter card, JSON-LD `CreativeWork`.

### Section: Lab

- **FR-L1.** Renders categorized text-link lists from `content/lab.ts`. Categories are short, item links are minimal monospace.
- **FR-L2.** External links open in new tab with `rel="noreferrer"`.
- **FR-L3.** Lab heading copy is in Ken's voice (not yasio.dev's wording). Confirmed: current heading "Thesis papers, design work, competition wins, tech explorations and more." stays unless Ken edits it.

### Section: About

- **FR-A1.** Renders a syntax-highlighted **class-block** of Ken's bio styled as a TypeScript class definition with methods `constructor()`, `education()`, `experience()`, `skills()` (or equivalents from the content layer). Tokenized server-side via Shiki.
- **FR-A2.** Multi-tab UI: at least two tabs (`About.ts`, `Credentials.ts`) switchable by click and keyboard (`ArrowLeft`/`ArrowRight`, `Home`/`End`). Tabs follow the WAI-ARIA Authoring Practices `tablist` pattern.
- **FR-A3.** **Parallel accessible mirror**: the same data (name, location, education, experience, skills, certifications) is rendered as a hidden semantic `<dl>` (or equivalent ARIA-described block) so screen readers announce structured content rather than tokenized spans. **This is non-negotiable; gates Phase 3 spec approval.**
- **FR-A4.** Cert tooltips (current `IDEWindow` feature) preserve their interactive behavior but expose `aria-describedby` for accessible descriptions.

### Section: Contact

- **FR-C1.** "Find me on:" header above a flat list of socials: Email, Phone, GitHub, LinkedIn (current set; expandable via `content/socials.ts`).
- **FR-C2.** Primary CTA: gradient "Get in touch" button → `mailto:kenlawrencenarz@gmail.com`. **No form backend in v1** (per scope §6).
- **FR-C3.** Footer: copyright line "© Made with ♥ by Shiin. {YEAR}." Year auto-updates from `new Date().getFullYear()`.

### Microinteractions / Polish

- **FR-P1.** Block-reveal animation on intro headlines (current implementation).
- **FR-P2.** Hover scramble on nav links (decorative, NFR-A4-gated).
- **FR-P3.** Magnetic effect on the primary CTA button (decorative, NFR-A4-gated).
- **FR-P4.** Page transitions on `/` ↔ `/work/[slug]` route changes (fade + slight slide).

### SEO / Sharing

- **FR-SEO1.** `app/sitemap.ts` enumerates `/` and `/work/[slug]` for every project.
- **FR-SEO2.** `app/robots.ts` allows all user-agents, points sitemap at `siteConfig.url + '/sitemap.xml'`.
- **FR-SEO3.** Root JSON-LD `Person` schema embedded in `<head>` of `/`.
- **FR-SEO4.** Per-project JSON-LD `CreativeWork` schema in `<head>` of `/work/[slug]`.
- **FR-SEO5.** Favicon set: `favicon.ico`, `icon-16x16.png`, `icon-32x32.png`, `apple-touch-icon.png`, `manifest.webmanifest`.

### Content & data

- **FR-CT1.** Projects, lab items, about/credentials data, and socials live under `content/` as typed TS modules. Adding a new project is a one-file edit.
- **FR-CT2.** All asset references go through `next/image` (already present in ProjectCard) or explicit `<img>` only where Shiki/SVG markup demands it.
- **FR-CT3.** All origin URLs come from a single `siteConfig` constant; no hard-coded `https://shiin.dev` strings in components.

### Analytics

- **FR-AN1.** Privacy-respecting analytics enabled in production only. Choice (Vercel Analytics vs Plausible) locked in Phase 4. Cookies: none, or first-party essentials only.
- **FR-AN2.** Outbound clicks on social/mailto links are tracked as events.

---

## 2. Non-Functional Requirements

### Performance

- **NFR-P1.** Lighthouse Performance ≥ **90** on mobile + desktop (deployed build, slow 4G profile).
- **NFR-P2.** Largest Contentful Paint ≤ **2.5s** on cable.
- **NFR-P3.** Cumulative Layout Shift ≤ **0.05**.
- **NFR-P4.** Interaction to Next Paint ≤ **200ms**.
- **NFR-P5.** Initial route `/` JS payload ≤ **200 KB gzipped** (measured with `next build` analyzer).
- **NFR-P6.** Images served via `next/image` with explicit `sizes` and lazy-loading (already partly in place).

### Accessibility

- **NFR-A1.** WCAG 2.2 AA conformance. All text/background pairs meet contrast.
- **NFR-A2.** Lighthouse Accessibility ≥ **95**.
- **NFR-A3.** Full keyboard navigability with visible `:focus-visible` states. No focus traps. Tab order matches DOM order.
- **NFR-A4.** **`prefers-reduced-motion: reduce` honored everywhere.** Lenis short-circuits to native scroll, Framer Motion uses `useReducedMotion()`, scramble/loader animations fall back to static reveal, custom cursor disables.
- **NFR-A5.** Screen-reader walkthrough (NVDA on Windows, VoiceOver on macOS) yields a sensible, structured narrative for every section, *including* the class-block via FR-A3's parallel mirror.
- **NFR-A6.** All interactive elements (tabs, buttons, links) expose correct ARIA roles and labels. The `tablist` in About follows the APG pattern.

### SEO

- **NFR-SEO1.** Lighthouse SEO ≥ **95** on `/` and any sample `/work/[slug]`.
- **NFR-SEO2.** All routes return correct status codes (200 for known, 404 for unknown).
- **NFR-SEO3.** `metadata.metadataBase` set to `siteConfig.url`; canonical URLs absolute.

### Best practices

- **NFR-BP1.** Lighthouse Best Practices ≥ **95**.
- **NFR-BP2.** No console errors or warnings on initial load.
- **NFR-BP3.** TypeScript `strict: true`; no `any` in product code (existing one in `IDECodeBlock.tsx` Shiki theme typing is allowed and annotated).
- **NFR-BP4.** ESLint passes (next-recommended ruleset minimum).

### Browser support

- **NFR-BR1.** Latest two versions of Chromium, Firefox, Safari (desktop + iOS), Samsung Internet on Android.
- **NFR-BR2.** No IE/legacy Edge support. No polyfills beyond `next`'s defaults.

### Mobile / responsive

- **NFR-R1.** Layouts validated at 360, 768, 1024, 1440, 1920 widths.
- **NFR-R2.** No horizontal scroll on any breakpoint (`overflow-x: hidden` already applied; AC re-verifies).
- **NFR-R3.** Touch targets ≥ 44 × 44 CSS pixels for any tap-able element.

### IP / hard rules

- **NFR-IP1.** Source contains zero hits for `yasio`, `Yasio`, `Baszczok`, `L0AD1NG`. Verified by CI script (Story 8.4).
- **NFR-IP2.** No yasio.dev assets, fonts, or strings copied into the repo. Brief.md's competitive-scan citation is the only allowed mention, scoped to `docs/`.

### Privacy

- **NFR-PR1.** Analytics tracker has no third-party cookies and respects DNT.
- **NFR-PR2.** No user input collected v1 (no form). `mailto:` is the only contact mechanism.

---

## 3. Epics & Stories

### Legend

- **Status notation in AC items**: `[ ]` not done · `[x]` done.
- **Block edges:** `blocks: 3.4` means this story must finish before story 3.4 can start. `blocked-by:` is the inverse.
- **Files** column shows the primary touch surface so SM/Dev can scope.

---

### Epic 1 — Foundation

**Goal.** Stabilize the codebase (commit hygiene, dep cleanup, scripts), seat global plumbing (siteConfig, reduced-motion hook, content layer skeleton), and **eliminate the `L0AD1NG` rule violation** in this epic — not as a polish task.

#### Story 1.1 — Working-tree hygiene & repo bootstrap

> **As** Ken (developer) **I want** to start Phase 6 from a clean working tree with conventional-commits in place **so that** every later story produces an atomic, reviewable diff.

**AC**
- [ ] Decide commit/discard for the four uncommitted files (`globals.css`, `AboutSection.tsx`, `IDECodeBlock.tsx`, `IDEWindow.tsx`) — Ken decides.
- [ ] Stale `out/` directory and `public/web.config` removed.
- [ ] `.gitignore` includes `_bmad-output/`, `.next/`, `node_modules/`, `out/`, `*.log`, `.env*` (verify).
- [ ] `README.md` scaffold created with placeholder sections (filled in 8.8).
- [ ] First conventional-commit lands: `chore: repo hygiene`.

**DoD** — `git status` clean except for staged commits; `npm run dev` boots without console errors.
**Blocks:** all subsequent stories.

#### Story 1.2 — Dep cleanup & scripts

> **As** Ken **I want** unused dependencies removed and missing scripts added **so that** the toolchain matches what we actually use.

**AC**
- [ ] Remove `gsap` and `vanilla-tilt` from `package.json` (ADR-003).
- [ ] Add scripts: `typecheck` (`tsc --noEmit`), `format` (`prettier --write .`), `format:check`, `test` (placeholder, wired in Epic 8), `analyze` (`ANALYZE=true next build`).
- [ ] Add `prettier` + `prettier-plugin-tailwindcss` devDeps; commit `.prettierrc`.
- [ ] Add `@next/bundle-analyzer` devDep; wire `next.config.mjs` with `withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })`.
- [ ] `npm install` produces a clean lockfile diff.
- [ ] `npm run typecheck` passes.
- [ ] `npm run analyze` opens the visualizer with current bundle composition (one-off verification).

**DoD** — CI-equivalent local commands `lint`, `typecheck`, `build` all pass green.
**Blocks:** 1.3, 1.4, 1.5, 1.7.

#### Story 1.3 — Loader copy `INIT()` + forbidden-string sweep script

> **As** Ken **I want** the YASIO `L0AD1NG` violation removed **and** a CI-runnable sweep that prevents regression **so that** we never ship the forbidden string again.

**AC**
- [ ] `Loader.tsx` text replaced from `L0AD1NG` to `INIT()`.
- [ ] Loader markup includes `aria-busy` and `aria-label="Initializing"`; dismisses with `aria-hidden="true"`.
- [ ] New script `scripts/check-forbidden.mjs` greps `src/` for the full forbidden set: `yasio`, `Yasio`, `YASIO`, `Baszczok`, `L0AD1NG`, plus the YASIO-owned project names called out in Brief §5 / build-prompt §1: `NatGeo`, `Hotel z Rowerem`, plus the YASIO tagline fragment `i design and develop things`. Case-insensitive where appropriate; word-boundaried where ambiguous (e.g. "yasio" must not false-flag inside `docs/` — script's scope is `src/` only).
- [ ] `package.json` adds `"check:forbidden": "node scripts/check-forbidden.mjs"`.
- [ ] Script wired into `lint` step (or invoked by CI in 8.4).
- [ ] Negative test: temporarily insert each forbidden term in a source file → script exits non-zero with the offending term + path printed.
- [ ] Positive test: clean source tree → script exits 0.

**DoD** — `npm run check:forbidden` exits 0; visual check of loader on dev server.
**Blocked-by:** 1.2. **Blocks:** 8.4.

#### Story 1.4 — `siteConfig` constant + `metadataBase`

> **As** Ken **I want** all origin URLs and global metadata to flow through a single source of truth **so that** swapping the domain is a one-line change.

**AC**
- [ ] Create `src/lib/siteConfig.ts` exporting `{ name, handle, url, description, ogImage, locale, twitter? }`.
- [ ] `url` reads `process.env.NEXT_PUBLIC_SITE_URL` with default `https://shiin.dev` (ADR-002).
- [ ] `app/layout.tsx` sets `metadata.metadataBase = new URL(siteConfig.url)`.
- [ ] All hard-coded `https://...` origins in `metadata` blocks replaced with `siteConfig.url`.
- [ ] `.env.example` documents `NEXT_PUBLIC_SITE_URL`.

**DoD** — `npm run build` succeeds; `next build` output references the right base URL.
**Blocked-by:** 1.2. **Blocks:** 3.5, 8.5.

#### Story 1.5 — Global `useReducedMotion` plumbing + Lenis bypass

> **As** a user with motion sensitivity **I want** every animated effect to be disabled or short-circuited **so that** the site is comfortable for me.

**AC**
- [ ] `src/hooks/useReducedMotion.ts` returns boolean from `matchMedia('(prefers-reduced-motion: reduce)')`, with SSR-safe default `false`.
- [ ] `SmoothScrollProvider` short-circuits Lenis init when reduced-motion is set; falls back to `scrollIntoView({ behavior: 'auto' })` for anchor clicks.
- [ ] All Framer `motion` components in current source updated to read `useReducedMotion()` and either skip animations or set `transition: { duration: 0 }`.
- [ ] Manual test: toggle OS-level reduced-motion → reload → no scramble cycle, no parallax drift, no spring tilt, native scroll only.

**DoD** — Reduced-motion walkthrough produces a static, dignified version of every section.
**Blocked-by:** 1.2. **Blocks:** 1.6, 2.1, 2.3, 3.2, 3.6, 4.2, 6.2, 7.4, 7.5.

#### Story 1.6 — Custom cursor `(pointer:fine)` gating

> **As** a touch-device user **I want** the custom cursor never to render **so that** scroll/tap aren't interfered with.

**AC**
- [ ] `LiquidCursor` mounts only when `matchMedia('(pointer: fine)').matches`.
- [ ] Reduced-motion → cursor scale spring disabled (constant value).
- [ ] On hover of `<a>`, `<button>`, `[role="button"]`, `[role="link"]`, `[data-cursor]`, ring scales up smoothly.
- [ ] No paint during initial loader screen.
- [ ] iPad/iPhone simulator test: cursor never renders.

**DoD** — Dev-tools "touch device" simulation hides the cursor entirely; desktop unchanged.
**Blocked-by:** 1.5.

#### Story 1.7 — Typed content layer skeleton

> **As** Ken **I want** projects, lab items, about, and socials to live in typed TS modules **so that** content edits don't require component edits.

**AC**
- [ ] Create `src/content/projects.ts` with type `Project` (slug, title, blurb, longDescription?, role, year, techStack[], coverImage, screenshots[], liveUrl?, externalUrl?, disclosure: 'full'|'screenshots', orientation: 'h'|'v', accentColor?). Migrate the seven projects from `WorkSection.tsx`.
- [ ] Create `src/content/lab.ts` with type `LabCategory[]`. Migrate from `LabSection.tsx`.
- [ ] Create `src/content/about.ts` with typed `Profile` + `Credentials` data (name, location, email, education, experience[], skills[], languages?, certifications[]).
- [ ] Create `src/content/socials.ts` with type `Social[]`. Migrate from `ContactSection.tsx`.
- [ ] All four content files type-check; no runtime imports break.
- [ ] Components still render identical output (regression baseline screenshots saved in `docs/qa/baselines/`).

**DoD** — Visual diff of `/` before/after migration is zero.
**Blocked-by:** 1.2. **Blocks:** 3.1, 4.1, 5.1, 6.1.

#### Story 1.8 — Tailwind / token sanity pass

> **As** Ken **I want** the design-token palette inventoried before Phase 3 refines it **so that** UX work has a clean starting baseline.

**AC**
- [ ] `tailwind.config.ts` reviewed: every color token referenced by at least one component (no orphans).
- [ ] `globals.css` reviewed: every `--var` referenced; orphans removed.
- [ ] No behavior change. Comment header added to each file documenting the token groups.

**DoD** — `npm run build` succeeds; no visual diff.
**Blocked-by:** 1.2.

#### Story 1.9 — Drop `next/image` `unoptimized` flag

> **As** Ken **I want** project images served through `next/image`'s optimizer **so that** Lighthouse perf measurements (Story 8.3) reflect the production-worthy delivery path, not a flat-PNG poison signal.

**AC**
- [ ] Remove `unoptimized` prop from the `<Image>` in `ProjectCard.tsx` (now `ProjectTile.tsx` after move).
- [ ] Verify all 21 images in `public/works/` optimize without error during `next build` (no transform failures).
- [ ] Manually compare LCP candidates on `/` before/after — visual fidelity preserved (no compression artifacts on logo PNGs).
- [ ] `next build` analyzer (Story 1.2's `npm run analyze`) shows `_next/image` URL pattern in network during smoke test (covered by Story 8.1).
- [ ] No `unoptimized` prop survives anywhere except where it is *intentional* (e.g. SVG/animated sources — none today).

**DoD** — `next build` clean; visual diff zero on tile thumbnails; image responses have correct `Cache-Control` and `Content-Type: image/webp` (or `avif`) on the deployed preview.
**Blocked-by:** 1.2.
**Why this lives in Epic 1:** Lighthouse CI in Epic 8 will read perf scores off the deployed preview. If `unoptimized` stays until Story 3.1, every Phase 6 preview between now and 3.1 ships oversized PNGs and any opportunistic perf measurement (or LH manual sanity check) is poisoned. One-line fix; lands in foundation.

---

### Epic 2 — Hero + Loader

**Goal.** Tighten the front-door experience and deliver the `INIT()` loader's reduced-motion variant.

#### Story 2.1 — Loader visual polish + reduced-motion variant

> **As** a visitor **I want** the loader to be brief and dignified across motion preferences **so that** the first impression doesn't feel sluggish or overwhelming.

**AC**
- [ ] Loader bar fills via `transform: scaleX()` (GPU-friendly), not `width`.
- [ ] Loader dismisses ≤ 1.6s if document is already complete; max 2.5s otherwise.
- [ ] Reduced-motion variant: no progress animation; static `INIT()` text + 200ms fade-out.
- [ ] No CLS attributable to loader on FCP.
- [ ] `aria-live="polite"` announces "Ready" briefly when dismissed (or omit if it adds noise — Phase 3 final call).

**DoD** — Lighthouse Perf trace shows loader teardown contributes 0 to CLS.
**Blocked-by:** 1.3, 1.5.

#### Story 2.2 — Hero italic verb + word list curation

> **As** a recruiter **I want** the value line to land in 3 seconds **so that** I know what Shiin builds before scrolling.

**AC**
- [ ] Value line restructured: identity = "Hi, my name is Shiin." + value = "I *build* {scramble-word}." (italicize "build" or chosen verb).
- [ ] `SCRAMBLE_WORDS` list reviewed with Ken; remove any that overpromise. Default-keep set: things, mobile apps, websites, web apps, games, ui/ux, brands, academic papers, experiences, solutions. Mark for `TODO_KEN` if Ken wants edits.
- [ ] No content-driven layout shift when the longest word renders.

**DoD** — Visual review on 360, 768, 1440 widths.
**Blocked-by:** 1.5.

#### Story 2.3 — Hero reduced-motion variant

> **As** a motion-sensitive visitor **I want** the hero to render statically **so that** I see the same content without parallax or scramble.

**AC**
- [ ] Reduced-motion: scramble disables — render the *first* word (or "things") statically.
- [ ] Reduced-motion: HELLO watermark holds at zero offset.
- [ ] Reduced-motion: block-reveal headlines fade-in over 200ms (no slide).

**DoD** — Manual OS-level reduced-motion test.
**Blocked-by:** 1.5, 2.2.

---

### Epic 3 — Work

**Goal.** Replace external-link tile behavior with internal `/work/[slug]` routes, add the missing rotating element, and ship per-project OG images.

#### Story 3.1 — Migrate Work content to `content/projects.ts`

> **As** Ken **I want** to add a new project by editing one TS file **so that** I never touch component code for content.

**AC**
- [ ] `WorkSection.tsx` consumes from `src/content/projects.ts` instead of inline `PROJECTS`.
- [ ] All seven existing projects render identically.
- [ ] Each project gains a `slug`, `role`, `year`, and `accentColor` field (placeholder if Ken hasn't supplied — `TODO_KEN`).

**DoD** — Visual diff zero against pre-migration baseline.
**Blocked-by:** 1.7.

#### Story 3.2 — Rotating circular-text element on tile

> **As** a visitor **I want** the tiles to feel alive **so that** the Work section has the YASIO "spinning element" charm.

**AC**
- [ ] Each tile renders an SVG circular-text disk in a corner (e.g. "VIEW · PROJECT · "). Slowly rotates (10s linear).
- [ ] Reduced-motion: rotation disabled; disk stays static.
- [ ] No interference with click/hover targets.
- [ ] Z-order: behind screenshot but above background.

**DoD** — All seven tiles show the rotating disk; reduced-motion freezes it.
**Blocked-by:** 1.5, 3.1. **Blocks:** none.

#### Story 3.3 — Tile click → internal route

> **As** a visitor **I want** clicking a tile to deep-link me to a real page **so that** I can read more, share the URL, and find context.

**AC**
- [ ] Tile click calls `router.push('/work/' + slug)` (via `next/link` wrapping the card).
- [ ] Card remains a single accessible link (`<a>` semantics); secondary "live URL" CTA appears in the *detail page*, not on the tile.
- [ ] Privacy badge (`disclosure: 'screenshots'`) still visible.
- [ ] Hover overlay text adapts: "View case study →" instead of "View live →".
- [ ] Keyboard: Enter / Space activates navigation.

**DoD** — All seven tiles route correctly; no `window.open` calls remain in `ProjectCard.tsx`.
**Blocked-by:** 3.1. **Blocks:** 3.4.

#### Story 3.4 — `/work/[slug]/page.tsx` with `generateStaticParams`

> **As** a recruiter **I want** a real page per project **so that** I can read about it without bouncing to an external site.

**AC**
- [ ] `app/work/[slug]/page.tsx` created with `generateStaticParams` reading `content/projects.ts`.
- [ ] Layout includes: header (title, role, year, tech-stack pills, primary CTA = "View live" or "Private build" disclosure), body (description), gallery (screenshots), back-link to `/#work`.
- [ ] `not-found.tsx` for unknown slugs.
- [ ] `metadata` per page (title, description, OG, Twitter, canonical).
- [ ] JSON-LD `CreativeWork` injected via `<Script type="application/ld+json">`.
- [ ] All seven URLs resolve in dev and build.

**DoD** — `next build` produces seven static `/work/*` routes; navigating to each renders correctly with focus on `<h1>`.
**Blocked-by:** 3.3. **Blocks:** 3.5, 7.1, 8.5.

#### Story 3.5 — Per-project dynamic OG image

> **As** Ken **I want** sharing a project link on LinkedIn/Twitter to render a unique branded image **so that** my work looks intentional in feed.

**AC**
- [ ] `app/work/[slug]/opengraph-image.tsx` route uses `next/og` `ImageResponse`.
- [ ] Renders project title, accent color, and a "shiin.dev" wordmark on a dark background; uses one bundled font (no remote fetch on each request).
- [ ] `metadata.openGraph.images` references the route.
- [ ] Manual test via `curl <slug>/opengraph-image` returns valid PNG.

**DoD** — LinkedIn Post Inspector preview shows correct image (or local equivalent until deployed).
**Blocked-by:** 1.4, 3.4.

#### Story 3.6 — ProjectCard reduced-motion variant

> **As** a motion-sensitive visitor **I want** tile reveals and tilts to disable **so that** I'm not nauseated by the grid.

**AC**
- [ ] `ProjectCard` reads `useReducedMotion()`; disables 3D tilt, scale-on-hover, glow tracking, hover-flip slide.
- [ ] Hover overlay still fades in/out (200ms opacity) so info is reachable; no transform.
- [ ] Reveal stagger disables: cards render at full opacity immediately.

**DoD** — OS-level toggle produces a static, navigable grid.
**Blocked-by:** 1.5, 3.1.

---

### Epic 4 — Lab

#### Story 4.1 — Migrate Lab to `content/lab.ts`

> **As** Ken **I want** to add a Lab item with one file edit **so that** the surface stays current as I publish work.

**AC**
- [ ] `LabSection.tsx` consumes from `src/content/lab.ts`.
- [ ] All four current categories + items render identically.
- [ ] Each item: `{ label, href, kind?: 'paper'|'design'|'award'|'experiment' }` (kind drives an inline emoji/icon chip).

**DoD** — Visual diff zero.
**Blocked-by:** 1.7.

#### Story 4.2 — Lab reduced-motion + reveal tuning

> **As** a motion-sensitive visitor **I want** Lab items to appear without slide-up animation **so that** scanning is comfortable.

**AC**
- [ ] Reduced-motion: items render at full opacity, no `y` translation.
- [ ] Hover state on `.lab-link` still applies (color + 12px padding-left), respects no-motion (ease shortened).

**DoD** — OS-level toggle test.
**Blocked-by:** 1.5, 4.1.

---

### Epic 5 — About

**Goal.** Migrate About to typed content + ship the **non-negotiable parallel a11y mirror** for the class-block.

#### Story 5.1 — Migrate About data to `content/about.ts`

> **As** Ken **I want** the class-block content to come from typed data **so that** I update credentials in one place.

**AC**
- [ ] `IDECodeBlock.tsx` consumes a `profile` and `credentials` object from `src/content/about.ts`.
- [ ] Generated source code string is built from the data (template-literal composition); Shiki tokenizes the output.
- [ ] Refactor preserves current visual output.

**DoD** — Visual diff zero against pre-migration baseline.
**Blocked-by:** 1.7.

#### Story 5.2 — Parallel `<dl>` accessibility mirror — **non-negotiable**

> **As** a screen-reader user **I want** the About content as semantic structured data **so that** I get prose, not a stream of unlabeled spans.

**AC**
- [ ] Hidden-but-readable `<dl>` (using `sr-only` Tailwind utility) renders alongside the Shiki block.
- [ ] Pairs include: Name, Location, Email, Education (with school + degree + years), Experience (each role: title, org, period), Skills (grouped), Certifications (each: name, issuer, date, verify URL).
- [ ] Class-block has `aria-hidden="true"` so it's *not* dual-announced.
- [ ] Class-block container has `role="img" aria-labelledby` pointing to a heading like "About Shiin (visual code-block representation)".
- [ ] NVDA + VoiceOver manual test: each pair announces correctly, in document order.
- [ ] axe-core passes with zero new violations.

**DoD** — Phase 3 spec already documented this; this story implements it. **Story is gating for Epic 8 a11y audit.**
**Blocked-by:** 5.1. **Blocks:** 8.2.

#### Story 5.3 — Tab keyboard navigation (APG `tablist` pattern)

> **As** a keyboard user **I want** to switch between About.ts and Credentials.ts tabs without a mouse **so that** I can read both panels.

**AC**
- [ ] Tab list has `role="tablist"`, each tab `role="tab"` with `aria-selected`, `tabindex="0"` on active / `-1` on others.
- [ ] `ArrowRight`/`ArrowLeft` cycle, `Home`/`End` jump to ends, `Enter`/`Space` activates (or activate-on-focus — Phase 3 chooses).
- [ ] `:focus-visible` outline meets contrast NFR-A1.
- [ ] Tab panels have `role="tabpanel"` and `aria-labelledby`.

**DoD** — Keyboard-only walk-through of About section completes both tabs.
**Blocked-by:** 5.1.

---

### Epic 6 — Contact

#### Story 6.1 — Migrate socials to `content/socials.ts`

> **As** Ken **I want** to edit socials in one file **so that** the contact list stays accurate.

**AC**
- [ ] `ContactSection.tsx` consumes from `src/content/socials.ts`.
- [ ] Each social: `{ kind: 'email'|'phone'|'github'|'linkedin'|'x'|'other', label, href, icon? }`.
- [ ] Icons resolved by `kind` from a small inline SVG map (no extra deps).

**DoD** — Visual diff zero.
**Blocked-by:** 1.7.

#### Story 6.2 — CTA reduced-motion + microinteraction polish

> **As** a motion-sensitive visitor **I want** the gradient CTA to behave gracefully **so that** I'm not dizzied by the shift animation.

**AC**
- [ ] Reduced-motion: gradient holds at one position (no 3s background shift).
- [ ] Hover scale: reduce to `1.02` (from `1.08`) under reduced-motion, or disable transform entirely.
- [ ] Glow opacity fade still allowed (intensity-only, no transform).

**DoD** — OS-level toggle test.
**Blocked-by:** 1.5.

#### Story 6.3 — Footer year auto-update

> **As** Ken **I want** the copyright year to roll over automatically **so that** I never ship a stale "2025" in 2027.

**AC**
- [ ] `ContactSection.tsx` renders year from `new Date().getFullYear()` (server-safe; no hydration mismatch).
- [ ] Visual unchanged otherwise.

**DoD** — Browser console + screenshot at runtime.
**Blocked-by:** 6.1.

---

### Epic 7 — Polish

#### Story 7.1 — Page transitions on `/` ↔ `/work/[slug]`

> **As** a visitor **I want** route changes to feel smooth **so that** the site reads as one piece, not two.

**AC**
- [ ] Use Framer's `AnimatePresence` (or App-Router transition primitive) for fade + 8px slide on route change.
- [ ] Reduced-motion: fade-only, 150ms.
- [ ] Initial mount on direct visit doesn't double-animate.
- [ ] No CLS introduced.

**DoD** — Click tile, then back, then forward — feels continuous.
**Blocked-by:** 3.4, 1.5.

#### Story 7.2 — Custom 404 page

> **As** a visitor who mistyped a URL **I want** a friendly redirect **so that** I'm not dumped on Next.js's default page.

**AC**
- [ ] `app/not-found.tsx` renders code-tag aesthetic ("404 / not found"), brand mark, and "Back to start" link to `/`.
- [ ] Same reduced-motion behavior.
- [ ] Status code 404.

**DoD** — Navigate to `/totally-not-a-page`; correct page + status.
**Blocked-by:** 1.5.

#### Story 7.3 — Favicon + manifest set

> **As** a visitor **I want** the browser tab and home-screen icon to look intentional **so that** the site reads as polished.

**AC**
- [ ] `app/icon.tsx` (dynamic) or `public/favicon.ico` + `icon-16.png` + `icon-32.png` + `apple-touch-icon.png`.
- [ ] `public/manifest.webmanifest` with `name`, `short_name`, `theme_color: #5918df`, `background_color: #0e0c16`.
- [ ] All Lighthouse "Best Practices" / PWA mini-checks pass.

**DoD** — Browser shows correct icon; iOS "Add to Home Screen" preview correct.
**Blocked-by:** none.

#### Story 7.4 — Hover scramble on nav links (decorative, gated)

> **As** a curious visitor **I want** nav links to feel alive on hover **so that** the YASIO-tier microinteraction signal lands.

**AC**
- [ ] Nav link `Section />` text scrambles briefly on `:hover` (200ms then resolves).
- [ ] Reduced-motion: skip; show plain hover color change only.
- [ ] No layout shift.

**DoD** — Hover any nav link → scramble plays once.
**Blocked-by:** 1.5.

#### Story 7.5 — Magnetic primary CTA (decorative, gated)

> **As** a visitor **I want** the "Get in touch" button to subtly track my cursor **so that** the moment of contact feels considered.

**AC**
- [ ] Within ~80 px radius, button translates ~6 px toward cursor (Framer spring).
- [ ] Reduced-motion: disable (no transform).
- [ ] Touch / `(pointer: coarse)`: disable.

**DoD** — Hover near CTA → magnet effect; on touch device, none.
**Blocked-by:** 1.5, 1.6.

---

### Epic 8 — Quality gates

**Goal.** Lock the §2 quality bar with automated checks and ship.

#### Story 8.1 — Playwright smoke + visual regression

> **As** Ken **I want** a baseline test that catches obvious regressions **so that** future edits don't silently break sections.

**AC**
- [ ] `playwright.config.ts` configured for desktop Chromium + mobile iPhone profiles.
- [ ] Smoke test: visits `/`, asserts each section heading exists, clicks one tile, asserts `/work/[slug]` loads and shows project title.
- [ ] Visual regression on `/` and one `/work/[slug]` (snapshots committed to `tests/__screenshots__/`).
- [ ] `npm test` runs the suite.

**DoD** — Tests green locally; one intentional regression caught and reverted.
**Blocked-by:** 3.4.

#### Story 8.2 — axe-core a11y test

> **As** Ken **I want** automated a11y checks on every PR **so that** WCAG violations don't slip through.

**AC**
- [ ] `@axe-core/playwright` integrated into the smoke suite.
- [ ] Tests assert zero `serious` / `critical` violations on `/` and `/work/[slug]`.
- [ ] About section a11y mirror specifically asserted (FR-A3).
- [ ] Failures print rule + selector for debug.

**DoD** — Test green; intentional missing label triggers correct failure.
**Blocked-by:** 5.2, 8.1.

#### Story 8.3 — Lighthouse CI in PR workflow

> **As** Ken **I want** every PR to fail if Perf/A11y/SEO drop below the §2 bar **so that** quality is enforced, not aspirational.

**AC**
- [ ] `.github/workflows/lighthouse.yml` runs `lhci autorun` on Vercel preview URL.
- [ ] Asserts: Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95 (mobile profile).
- [ ] Output uploaded as artifact.
- [ ] Workflow failure blocks merge to `main`.

**DoD** — Open a sample PR with intentional regression; merge blocked.
**Blocked-by:** 8.7 (deploy must exist).

#### Story 8.4 — Forbidden-string sweep CI

> **As** Ken **I want** CI to fail if any forbidden YASIO string lands in source **so that** §1 IP rules are enforced.

**AC**
- [ ] `.github/workflows/lint.yml` runs `npm run check:forbidden`.
- [ ] Failure blocks merge.
- [ ] Test: introduce `// L0AD1NG` in a source file → CI fails; revert → CI passes.

**DoD** — Negative test demonstrates the gate.
**Blocked-by:** 1.3.

#### Story 8.5 — SEO surfaces (sitemap, robots, JSON-LD)

> **As** Ken **I want** the site fully indexable with rich results **so that** recruiter searches find me.

**AC**
- [ ] `app/sitemap.ts` enumerates `/` + every `/work/[slug]`; lastModified set.
- [ ] `app/robots.ts` allows all; references sitemap.
- [ ] Root JSON-LD `Person` (name, url, image, sameAs[github,linkedin], jobTitle: "Full-Stack Developer", alumniOf: CCT).
- [ ] Per-project JSON-LD `CreativeWork` (name, url, description, datePublished, creator → ref to Person).
- [ ] Lighthouse SEO ≥ 95 on both `/` and a sample `/work/[slug]`.

**DoD** — Rich Results Test (Google) validates without errors.
**Blocked-by:** 1.4, 3.4, 6.1. *(6.1 added: root `Person` JSON-LD's `sameAs` array reads from `content/socials.ts`; cannot land before that content layer exists.)*

#### Story 8.6 — Analytics

> **As** Ken **I want** privacy-respecting analytics **so that** I can measure the success metrics.

**AC**
- [ ] Tracker chosen in Phase 4 architecture (Vercel Analytics or Plausible).
- [ ] Loaded in production only (`process.env.NODE_ENV === 'production'`).
- [ ] Outbound social/mailto clicks fire a custom event.
- [ ] No third-party cookies; DNT honored.
- [ ] Privacy/Terms link in footer if tracker requires (Plausible doesn't; Vercel Analytics doesn't either).

**DoD** — Live deploy emits events; dev does not.
**Blocked-by:** 8.7.

#### Story 8.7 — Production deploy + custom domain

> **As** Ken **I want** the site live on `shiin.dev` **so that** I can share the link.

**AC**
- [ ] Vercel project linked to GitHub `main`.
- [ ] Production deploy succeeds; preview deploys per branch enabled.
- [ ] Custom domain configured (or *.vercel.app fallback if domain still pending).
- [ ] `NEXT_PUBLIC_SITE_URL` env var set to production origin.
- [ ] HTTPS enforced; redirects from `www` to apex (or vice-versa, Ken's pref).

**DoD** — `https://shiin.dev` (or fallback) returns 200 with correct canonical.
**Blocked-by:** 8.5, 8.4, 8.3.

#### Story 8.8 — README + maintenance docs

> **As** future Ken **I want** clear instructions to run, build, deploy, and add content **so that** I'm not re-deriving setup six months from now.

**AC**
- [ ] `README.md` covers: prereqs, install, dev, build, deploy, `NEXT_PUBLIC_SITE_URL`, "add a new project" walkthrough (one-file edit), "add a Lab item" walkthrough, link to ADRs.
- [ ] `docs/` index links brief, PRD, spec, architecture, ADRs, stories.
- [ ] Repo passes `markdownlint` (optional).

**DoD** — A teammate cloning fresh can ship a new project in < 10 minutes following the README.
**Blocked-by:** 8.7.

---

## 4. Dependency graph (high level)

```
1.1 ─► 1.2 ─► {1.3, 1.4, 1.5, 1.7, 1.8, 1.9}
1.5 ─► {1.6, 2.1, 2.3, 3.2, 3.6, 4.2, 6.2, 7.1, 7.2, 7.4, 7.5}
1.7 ─► {3.1, 4.1, 5.1, 6.1}
3.1 ─► 3.3 ─► 3.4 ─► {3.5, 7.1, 8.5}
5.1 ─► {5.2, 5.3} ; 5.2 ─► 8.2
6.1 ─► 8.5
1.3 ─► 8.4
3.4 ─► 8.1 ─► 8.2 ─► 8.3
{8.3, 8.4, 8.5} ─► 8.7 ─► {8.6, 8.8}
```

## 5. Definition of Done — project-level

Mirrors brief §9 plus the build prompt's §5 DoD. Repeated here so PO can validate against PRD-internal scope.

- [ ] All 39 stories above marked DONE.
- [ ] Production deploy live (8.7).
- [ ] Lighthouse mobile + desktop both meet §2 bar (8.3 enforcing).
- [ ] Keyboard-only walkthrough of `/` and `/work/[slug]` succeeds (manual; in 8.2 follow-up notes).
- [ ] NVDA / VoiceOver walkthrough sensible across all sections; FR-A3 verified.
- [ ] Reduced-motion variant produces a static, dignified site.
- [ ] README documents run/build/deploy/add-project (8.8).
- [ ] `npm run check:forbidden` exits 0; sweep also covers `docs/brief.md`'s competitive-scan citation as the only allowed mention (script scope is `src/` only — verified).

---

**Next phase (Phase 3 — UX Expert):** Adopt the UX Expert persona; produce `docs/front-end-spec.md` covering design tokens (proposing 1–2 accent/neutral refinements per ADR-004), component inventory, section-by-section interaction spec referencing §2, animation map (Framer Motion ownership), responsive behavior at 360/768/1024/1440/1920, reduced-motion alternates for every animated element, and **the concrete a11y plan for the class-block (gating)**. Wait for Ken's "go" before starting.
