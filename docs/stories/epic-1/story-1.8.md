# Story 1.8 — Tailwind / token sanity pass + accent palette migration

**Status:** pending
**Epic:** 1 — Foundation
**Blocks:** —
**Blocked-by:** 1.2
**Files (primary):** `tailwind.config.ts`, `src/app/globals.css`

## User statement
As Ken I want the design-token palette inventoried and the new accent system seated **before** Phase 3 work consumes it so that subsequent stories don't keep re-introducing ad-hoc colors.

## Acceptance criteria
- [ ] **Token audit (`tailwind.config.ts` + `globals.css`):** every color token referenced by ≥ 1 component (no orphans). Orphans removed; comment header documents each token group.
- [ ] **ADR-007 migration**: add color tokens
  - `accent` = `#ffa63d`
  - `accent.hot` = `#ff3d77`
- [ ] All `a` color rules + `.lab-link:hover` + active-section nav dot in `Navbar.tsx` re-point from `--primary` to `--accent`.
- [ ] Focus ring styles (currently inferred from browser default) explicitly defined: `:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; border-radius: 2px; }` — focus stays purple per spec §1.2.
- [ ] **Neutral ramp** expanded per spec §1.3:
  - keep `text.light`, `text.muted`, `text.dim`, `text.dark`
  - add `text.bright` = `#ffffff`
  - add `text.faint` = `#574f5c` (rename of current `text.dark` if needed) and `text.disabled` = `#3b3553`
  - or rename to match spec naming (`text.faint`, `text.disabled`) — keep references consistent.
- [ ] **Motion tokens** consolidated in `globals.css` per spec §1.10: `--motion-quick: 150ms`, `--motion-default: 250ms`, `--motion-smooth: 400ms`, `--motion-reveal: 700ms`. Existing `--ease-out-expo` and `--ease-bounce` preserved.
- [ ] **Z-index tokens** added (CSS custom properties only; Tailwind already supports arbitrary values): documented in `globals.css` per spec §1.9.
- [ ] **Shadow tokens**: add `--shadow-tile`, `--shadow-glow`, `--shadow-cta` per spec §1.8. Unused legacy shadows removed.
- [ ] No behavior change visible *except* CTAs/links now read amber. Spot-check: ContactSection CTA still gradients correctly; LabItems hover amber; nav active state amber underline.

## Definition of Done
`npm run build` succeeds; visual diff shows expected accent shift (links + CTAs become amber) and no unexpected differences. Token comments make the palette self-documenting.

## Notes
- ADR-004 + ADR-007.
- Keep `--primary: #5918df` as the brand color for glows, focus rings, and the hero "Shiin" highlight — *do not* replace with `--accent`.
