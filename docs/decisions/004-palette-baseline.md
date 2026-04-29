# ADR-004 — Color palette: keep purple-on-near-black baseline

**Status:** Accepted (refinement deferred to Phase 3) · 2026-04-28

## Context
Existing palette (`tailwind.config.ts`, `globals.css`) is `--primary: #5918df` over `--bg-dark: #1a1527` / `--bg-darkest: #0e0c16`. It is already shipped, distinct from yasio.dev's red/grey direction, and consistent across every component. Redesigning from zero would discard real progress.

## Decision
Keep the current base. Phase 3 (UX Expert) will:
1. Lock a single accent for links/CTAs (currently `--primary` is overloaded for both backgrounds and CTAs).
2. Define a 6-step neutral ramp (currently four greys: `text-light`, `text-muted`, `text-dim`, `text-dark` — needs a hover/disabled tier).
3. Specify hover, focus-visible, and active states explicitly.
4. Verify WCAG 2.2 AA contrast for every text-on-bg pair.

## Consequences
- No global theme rewrite — Phase 3 produces a tokens delta, not a replacement.
- The `accent.purple-*` and `code.*` color groups already in Tailwind config stay; Phase 3 may rename or consolidate.
- Light-mode toggle: explicitly **out of scope** unless Ken adds it later.
