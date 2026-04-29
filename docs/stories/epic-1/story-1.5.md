# Story 1.5 — Global `useReducedMotion` plumbing + Lenis bypass

**Status:** pending
**Epic:** 1 — Foundation
**Blocks:** 1.6, 2.1, 2.3, 3.2, 3.6, 4.2, 6.2, 7.1, 7.2, 7.4, 7.5
**Blocked-by:** 1.2
**Files (primary):** `src/hooks/useReducedMotion.ts` (new), `src/components/SmoothScrollProvider.tsx`, `src/app/globals.css`, every existing motion-bearing component

## User statement
As a user with motion sensitivity I want every animated effect to be disabled or short-circuited so that the site is comfortable for me.

## Acceptance criteria
- [ ] `src/hooks/useReducedMotion.ts` returns boolean from `matchMedia('(prefers-reduced-motion: reduce)')`. SSR-safe default `false`. Subscribes to changes via `addEventListener('change')`.
- [ ] `SmoothScrollProvider` short-circuits Lenis init when reduced-motion is set; falls back to native `scrollTo({ behavior: 'auto' })` for anchor clicks.
- [ ] Global CSS rule added to `globals.css`:
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
- [ ] Every Framer `motion` component in current source reads `useReducedMotion()` and either skips animations entirely or sets `transition: { duration: 0 }`. Audit list (current source): `HeroSection`, `WorkSection`, `ProjectCard`, `LabSection`, `AboutSection`, `ContactSection`, `Navbar`, `IDEWindow`, `LiquidCursor`, `ScrollProgressBar`, `AtmosphereBackground`, `ScrambleText`.
- [ ] Manual test (OS-level reduced-motion toggle → reload `/`): no scramble cycle, no parallax drift, no spring tilt; native scroll only; loader bar fades without sweep.

## Definition of Done
Reduced-motion walkthrough produces a static, dignified version of every section. No animation runs after toggling the OS setting.

## Notes
- This story is the **gate for the entire reduced-motion AC across the project**. Spec §7 lists 18 elements; verify each.
- Many later stories add their own component-level reduced-motion AC (3.2 disk freeze, 3.6 tile tilt off, etc.). Those are *in addition to* the global rule landed here.
