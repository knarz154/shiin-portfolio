# ADR-007 — Accent palette: Option A (warm amber)

**Status:** Accepted · 2026-04-29

## Context
ADR-004 deferred accent / state-color choices to Phase 3. Phase 3 (`docs/front-end-spec.md` §1.2) presented two options: A (warm amber + hot pink, sampled from the existing `btn-gradient`) versus B (cohesive lavender). The site needed a CTA color visually distinct from the dominant brand purple so recruiter-facing actions (`/work/[slug]` "View live", "Get in touch") read as the primary call-to-action.

## Decision
Adopt **Option A**:

| Token | Hex | Role |
|---|---|---|
| `--accent` | `#ffa63d` | Link text, CTA stroke, hover underline, active-section nav |
| `--accent-hot` | `#ff3d77` | Active/pressed state of `--accent` interactions |
| `--primary` | `#5918df` | Decorative glows, block-reveal sweeps, focus rings, hero "Shiin" highlight |
| `--primary-light` | `#7b3ff2` | Hover on `--primary` surfaces (block reveal, gradient drift) |

## Consequences
- **CTA visibility:** "View live" and "Get in touch" actions now read in warm amber against the deep purple/black, maximally separable from decorative purple chrome.
- **Existing gradient:** `btn-gradient` already used `#ffa63d → #ff3d77 → #1593e3 → #5918df`. Promoting two of those to first-class tokens means the gradient ceases to be ad-hoc and becomes a *system* — fewer surprises later.
- **Link color migration:** `globals.css :root` adds `--accent` and `--accent-hot`. All `a` color rules and `.lab-link:hover` etc. re-point to `--accent`. Done in Story 1.8 (token sanity pass).
- **Focus ring** stays `--primary` (not accent) — focus-visible should not compete with hover affordance for attention.
- **Contrast:** `#ffa63d` on `#0e0c16` = 9.4 : 1 (AAA). `#ff3d77` on `#0e0c16` = 5.0 : 1 (AA). Verified.
- **Tailwind config:** add `accent`, `accent.hot` color groups.
