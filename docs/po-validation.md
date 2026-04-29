# PO Validation Report — Phase 5

**Author:** PO persona (Phase 5)
**Date:** 2026-04-29
**Inputs:** `docs/brief.md`, `docs/prd.md`, `docs/front-end-spec.md`, `docs/architecture.md`, ADR-001…008

---

## 1. Master consistency matrix

For each Brief goal / build-prompt §2 pattern, verify it traces forward to a PRD FR, a Spec section, an Architecture surface, and at least one story. Gaps are flagged with ❌ and addressed in §4.

### 1.1 Goals → coverage

| Goal | PRD | Spec | Arch | Story | Status |
|---|---|---|---|---|---|
| G1 Recruitable surface | FR-G1…G11 | §3 (all sections) | §3 | All Epic 2-7 | ✅ |
| G2 Identity expression | FR-G5, FR-A1 | §3.5, §6 | §4.4 | 5.1, 5.2 | ✅ |
| G3 Standards parity | NFR-P1…P5, NFR-A2, NFR-SEO1, NFR-BP1 | §1.3 contrast | §8 LHCI | 8.3 | ✅ |
| G4 Per-project deep links | FR-G2, FR-D1…D6 | §3.3 | §3.1, §6.2 | 3.4, 3.5 | ✅ |
| G5 Updateability | FR-CT1…CT3 | §2 inventory | §4 content model | 1.7, 3.1, 4.1, 5.1, 6.1 | ✅ |
| G6 A11y dignity (class-block) | FR-A3 | §6 (full plan) | §3.3 server vs client | 5.2, 8.2 | ✅ |

### 1.2 §2 pattern coverage

| §2 pattern | PRD FR | Spec § | Arch § | Story | Status |
|---|---|---|---|---|---|
| Single-page anchor nav | FR-G1, FR-G4 | §3 | §3.1, §3.2 | 1.7 (existing) | ✅ |
| `Section />` code-tag labels | FR-G4 | §3 (each section) | — | existing | ✅ |
| `<Shiin/>` brand mark | FR-G5 | §2.1 BrandTag | — | extracted in 1.7 | ✅ |
| Pre-loader (custom wording) | FR-G9 | §3.1 implicit | — | 1.3, 2.1 | ✅ |
| Smooth scroll | FR-G7 | §4 Lenis | §3.2 | 1.5 (RM bypass) | ✅ |
| Custom cursor (pointer-only) | FR-G8 | §2.1, §7 | — | 1.6 | ✅ |
| Display + monospace typography | NFR-A1 (contrast tied) | §1.6 | — | 1.8 | ✅ |
| Strong contrast palette | (own choice; not yasio's) | §1.1-1.4, ADR-007 | — | 1.8 | ✅ |
| Microinteractions (2-3, not piled on) | FR-P1…P4 | §4 | — | 7.4, 7.5 (gated) | ✅ |
| **Hero**: identity + value, italic verb, scroll affordance | FR-S1…S4 | §3.1 | — | 2.2, 2.3 | ✅ |
| **Hero** ambient motion | FR-S4 | §3.1 watermark | — | existing | ✅ |
| **Work**: numbered tiles, spinning, arrow, click reveals detail | FR-W1…W5, FR-D* | §3.2, §3.3 | §3.1 | 3.1-3.6 | ✅ |
| **Work** project-detail surface | FR-D1…D6 | §3.3 | §3.1, §6 | 3.4 | ✅ |
| **Lab**: heading in own voice + categorized list | FR-L1…L3 | §3.4 | — | 4.1 | ✅ |
| **About**: class-block + a11y parallel | FR-A1…A4 | §6 (gating plan) | §3.3 | 5.1-5.3 | ✅ |
| **Contact**: Find me on + CTA + footer | FR-C1…C3 | §3.6 | — | 6.1-6.3 | ✅ |
| Lighthouse perf bar | NFR-P1…P5 | — | §8.5 LHCI | 8.3 | ✅ |
| LCP / CLS / INP | NFR-P2…P4 | — | §9 levers | 8.3 | ✅ |
| 200KB gz initial JS | NFR-P5 | — | §9 | 8.3 + 1.2 analyzer | ✅ |
| `prefers-reduced-motion` everywhere | NFR-A4 | §7 (full table) | §4.4 | 1.5 + per-section | ✅ |
| Keyboard navigable + focus visible | NFR-A3 | §6.4 tablist | — | 5.3 + 8.2 | ✅ |
| WCAG 2.2 AA contrast | NFR-A1 | §1.3 verified | — | 1.8 | ✅ |

### 1.3 §1 hard rules

| Rule | PRD | Story | CI gate | Status |
|---|---|---|---|---|
| No yasio.dev strings | NFR-IP1 | 1.3 (script), 8.4 (CI) | `check-forbidden` | ✅ |
| No yasio.dev assets/fonts | NFR-IP2 | n/a (none in repo today) | manual review during 1.1 | ✅ |
| Replace `L0AD1NG` | ADR-006 | 1.3 | — | ✅ |
| Class-block a11y parallel | FR-A3 | 5.2 | axe in 8.2 | ✅ |

### 1.4 Build prompt §5 project-DoD coverage

| §5 item | PRD §5 DoD | Story | Status |
|---|---|---|---|
| All epics' stories DONE | yes | n/a | ✅ |
| Production deploy live | yes | 8.7 | ✅ |
| Lighthouse meets bar | yes | 8.3 | ✅ |
| Keyboard walkthrough | yes | 8.2 + manual | ✅ |
| Screen-reader walkthrough | yes | 5.2 + manual | ✅ |
| Reduced-motion variant | yes | 1.5 + per-section | ✅ |
| README documents add-project | yes | 8.8 | ✅ |
| Forbidden-string sweep | yes | 8.4 | ✅ |

---

## 2. Ken's three explicit validation checks

### 2.1 ✅ Slugs locked in `content/projects.ts`

- **Architecture §4.2** — `Project` type defines `slug: string` as **required**.
- **PRD Story 3.1 AC** — "Each project gains a `slug`, `role`, `year`, and `accentColor` field…"
- **Architecture §3.1** — `/work/[slug]` page uses `generateStaticParams()` reading from `content/projects.ts` slugs; static-paths fail at build time if any slug is missing or duplicated.
- **Architecture §4.5** — README (Story 8.8) walkthrough makes slug the *first* required field on a new project.

**Recommended slug values for the seven existing projects** (PO proposal — Ken can override in Story 3.1 AC):

| Title | Slug |
|---|---|
| CCT Tayabas | `cct-tayabas` |
| EXCELLENT Platform | `excellent-platform` |
| TASDEC Website | `tasdec` |
| TWIMS Website | `twims` |
| TimeLens VR | `timelens-vr` |
| GSO-RMS | `gso-rms` |
| NegosyoNexus | `negosyo-nexus` |

These are URL-safe (kebab-case, lowercase, no spaces, no diacritics), short, and unambiguous. Story 3.1 AC will reference this table.

### 2.2 ✅ `check-forbidden` script greps the right strings

Updated PRD Story 1.3 AC now requires the script to detect the **full forbidden set**:

| Term | Source | Why |
|---|---|---|
| `L0AD1NG` | ADR-006 | Already-shipped violation |
| `yasio` / `Yasio` / `YASIO` | Brief §1, build-prompt §1 | Identity word |
| `Baszczok` | Brief §1 | YASIO author surname |
| `NatGeo` | Brief §1, build-prompt §1 | YASIO project name |
| `Hotel z Rowerem` | Brief §1, build-prompt §1 | YASIO project name |
| `i design and develop things` | Build-prompt §1 | YASIO tagline (case-insensitive substring) |

Script scope: `src/` only — never `docs/`, where Brief §5's competitive-scan citation is the *one* allowed mention. Negative test (insert + revert) is in Story 1.3 AC.

### 2.3 ✅ JSON-LD socials flagged as Phase 6 content dependency

- **Architecture §6.5** — root `Person` JSON-LD's `sameAs[]` array is built from `content/socials.ts` (GitHub + LinkedIn). It is **not** a free-floating literal.
- **PRD Story 8.5** — `blocked-by` updated to include **6.1** (Migrate socials to `content/socials.ts`). Verified in PRD §4 dependency graph: `6.1 ─► 8.5`.
- **Story 6.1 AC** — every social already in `ContactSection.tsx` migrates to `content/socials.ts` with the `kind` typed enum. JSON-LD generator filters to `kind ∈ {github, linkedin, x}` for `sameAs`.

If Story 8.5 attempts to start before 6.1, the build will produce malformed JSON-LD (or hard-coded fallback that drifts). Block edge prevents that.

---

## 3. Internal consistency findings

### 3.1 Resolved tightly

- **PRD `unoptimized` flag**: New Story 1.9 added in Epic 1, blocked-by 1.2, ahead of any LH measurement. Architecture §4.6 already flagged this; story now exists.
- **Bundle analyzer**: Story 1.2 AC now requires `@next/bundle-analyzer` + `npm run analyze` script. Confirmed.
- **Forbidden-strings list**: Story 1.3 AC expanded per §2.2 above.
- **Story counts**: PRD §5 DoD updated 30 → **39 stories** (Epic 1 grew from 8 to 9; original count was off-by-some).

### 3.2 Findings still to resolve (non-blocking — flagged for SM/Dev awareness)

| # | Finding | Severity | Disposition |
|---|---|---|---|
| F1 | Hero `<About />` in `AboutSection.tsx:47-51` uses literal angle brackets in label, but other sections (`Start />`, `Work />`, `Lab />`, `Contact />`) do not. Spec §3.5 already notes this is intentional. | Cosmetic | Keep, per spec — but Story 5.1 should *explicitly* preserve the literal angle-bracket form, lest a refactor "normalize" it away. AC carry-over. |
| F2 | `IDEWindow.tsx:67-68` has tab labels `About.js` and `Credentials.ts`. Spec §3.5 uses `About.ts` / `Credentials.ts` (consistent TS). | Cosmetic / IP-adjacent | Story 5.1 AC: rename `About.js` → `About.ts`. Keeps spec consistent and removes a JS/TS mix. |
| F3 | `ContactSection.tsx:80-83` and `:103-104` etc. embed inline SVG paths for icons. Spec §2 lists `<SocialList>` as ✨new which would source icons from a kind-based map. | Refactor scope | Story 6.1 owns this. Confirmed. |
| F4 | `next.config.mjs` has only `reactStrictMode: true`. Bundle analyzer wiring (Story 1.2) is the first config addition. Be careful to preserve `reactStrictMode`. | Minor | Story 1.2 AC explicit. |
| F5 | `web.config` removal (PRD Story 1.1) — confirm Vercel deploy will not need anything from it (it doesn't; IIS-only). | Confirm during 1.1 | Logged. |
| F6 | `out/` directory removal (Story 1.1) — confirm not referenced by `next.config.mjs` (it isn't; export was ad-hoc). | Confirm during 1.1 | Logged. |
| F7 | Story 8.6 (analytics) is `blocked-by: 8.7` (deploy). But the analytics SDK *mounts* in `app/layout.tsx` regardless of deploy. The dep is really about *verifying live events fire*. Sequence is fine; flag for SM clarity. | Doc clarity | Will surface in story shard for 8.6. |
| F8 | The `check-forbidden` script's "case-insensitive where appropriate" clause needs concrete spec — does `yasio` match `Yasio`? Recommended: case-insensitive for *all* terms except project names ("Hotel z Rowerem" stays case-sensitive to avoid `hotel` false-positives). | Implementation detail | Encoded in Story 1.3 shard below; SM/Dev confirms during implementation. |
| F9 | Story 3.5 (per-project OG) uses one bundled font. Architecture §6.2 says "JetBrains Mono" — but no font file currently lives in repo. Story 3.5 needs to either bundle a font file (`public/fonts/jetbrains-mono.woff2`) or accept a Vercel ephemeral fetch. Recommend: bundle the file. | Needs decision in 3.5 | Logged in story shard. |
| F10 | Phase 0 working-tree had four uncommitted files. Ken needs to decide commit/stash/discard. Story 1.1 AC includes this but doesn't tell Ken which. | Awaiting Ken | Will surface in story 1.1 shard explicitly. |

### 3.3 Cross-doc cite integrity

- ADR cites used 8 times across PRD/spec/architecture; all link consistently to `docs/decisions/00X-*.md`. ✅
- PRD `FR-*`/`NFR-*` numbering is unique and continuous (G/S/W/D/L/A/C/P/SEO/CT/AN/IP/PR groups). ✅
- Spec §6 a11y plan precisely matches PRD FR-A3 acceptance language. ✅
- Architecture §4.2 types match Spec §2 component prop expectations. ✅

---

## 4. Gaps surfaced + fixes proposed

| Gap | Origin | Fix | Owner |
|---|---|---|---|
| Story 1.9 (unoptimized images) was missing | Ken's adjustment §1 | **Added** to Epic 1 with full AC | Done in PRD edit |
| Bundle analyzer not in Story 1.2 | Architecture §11 deferred | **Added** to Story 1.2 AC | Done in PRD edit |
| Forbidden-strings list narrow | Ken's check §3 | **Expanded** Story 1.3 AC | Done in PRD edit |
| Story 8.5 missing 6.1 dep | Architecture §6.5 implied | **Added** `blocked-by: 6.1` | Done in PRD edit |
| `About.js` vs `About.ts` inconsistency | Repo state | Carry-over to Story 5.1 AC | In shard |
| Slug values not yet specified | Story 3.1 AC abstract | PO-proposed table § 2.1 above | In shard |
| OG font bundling decision | Architecture §6.2 vague | Story 3.5 AC: bundle JetBrains Mono Variable.woff2 in `public/fonts/` | In shard |
| Working-tree commit decision | Phase 0 uncommitted files | Story 1.1 AC: explicit Ken-input first item | In shard |

All gaps either resolved by the four PRD edits already applied, or surfaced in the per-story shards below as explicit AC carry-overs.

---

## 5. Sharding plan

39 stories shard into `docs/stories/epic-N/story-N.M.md`. Each file is single-PR-sized, self-contained, and references the PRD/spec/arch by cite (not by paste).

Story file structure:

```markdown
# Story N.M — Title

**Status:** pending
**Epic:** N
**Blocks:** [list]
**Blocked-by:** [list]
**Files (primary):** [paths]

## User statement
As [role] I want [outcome] so that [reason].

## Acceptance criteria
- [ ] …

## Definition of Done
…

## Notes
- Cite to PRD / spec / arch where relevant
- Carry-over findings from PO validation §3.2
```

---

## 6. Outstanding for Ken (before Phase 6 starts)

1. **Story 1.1, AC item 1**: commit / stash / discard decision for the four uncommitted files (`globals.css`, `AboutSection.tsx`, `IDECodeBlock.tsx`, `IDEWindow.tsx`). Phase 6 SM persona will block on this at the start of Story 1.1.
2. **Story 3.1, AC**: confirm or override the proposed slug list in §2.1 above.
3. **Story 5.1, AC**: provide real values for `content/about.ts` placeholder fields (education years, experience entries with dates, cert dates) — earlier Ken acknowledged this in Phase 3 Q4, scheduled for after Story 5.1.

These three are **the only Ken-input gates** between here and the SM/Dev/QA loop.

---

## 7. Definition of "validation done"

- [x] Goals (G1-G6) traced to PRD/spec/arch/stories — all ✅.
- [x] §2 pattern coverage matrix complete — all ✅.
- [x] §1 hard-rule coverage verified — all ✅.
- [x] Ken's three explicit validation checks each ✅.
- [x] Internal-consistency findings logged with disposition.
- [x] Four PRD edits applied (1.2 analyzer, 1.3 forbidden-set, 1.9 added, 8.5 dep + DoD count + dep-graph).
- [x] Sharding plan defined with file structure + count (39).
- [x] Three Ken-input gates surfaced for Phase 6.

---

**Next phase (Phase 6 — SM/Dev/QA loop):** SM opens Story 1.1, restates context, lists files to touch + test plan. Ken answers the working-tree commit/stash/discard question. Dev implements. QA runs typecheck + lint + check-forbidden + build. Ken signs off; loop continues. **Wait for Ken's "go" — and his answer on the working-tree question — before starting Story 1.1.**
