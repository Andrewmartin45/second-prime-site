# Second Prime — Website Design System

**Version:** 1.0 (light theme), captured 2026-06-17 from the live site CSS at `css/styles.css`.
**Status:** Source of truth for the current website look. This is the LIGHT-background era.

This file documents what the site actually ships today so it can be handed to a designer or
to another AI to update the master brand guidelines. Where this conflicts with the old
`brand.md` (v1.2, slate-dominant / dark-first), THIS file wins for web. The old guide was
built for dark client decks and PDFs, not the site.

---

## 1. The shift, in one line

Old brand guide: "Slate dominates" (dark backgrounds, white text by default).
This site: **warm light dominates.** The default page is white and warm sand. Dark
sections are now the punctuation, used deliberately for emphasis, not the baseline.

So the hierarchy of grounds is now:

1. **White** (`#ffffff`) — the base canvas, most content sits here.
2. **Warm sand light** (`#F7F4F0`) — alternating soft sections, the signature warmth.
3. **Near-black** (`#18181F` / `#101016`) — feature moments only: hero, founder, the
   "what makes us different" contrast block, the pillars section.

Teal still punctuates. Sand still informs. They are still earned, never decorative fills.

---

## 2. Color tokens

These are the exact CSS variables in `:root`. Edit colors there and they cascade site-wide.

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#1F1F27` | Primary text (Slate-900) |
| `--gray` | `#686877` | Secondary text, leads (Slate-500) |
| `--near-black` | `#18181F` | Dark section backgrounds (Slate-1000) |
| `--bg-light` | `#F7F4F0` | Warm light section background (Sand-100) — the signature |
| `--bg-cool` | `#F0F0F2` | Cool light background (Slate-50) |
| `--border` | `#E5E3E0` | Hairline borders, card outlines |
| `--teal` | `#458D93` | Accent on LIGHT backgrounds (Teal-500) |
| `--teal-bright` | `#65C8D0` | Accent on DARK + primary CTA (Teal-200) |
| `--teal-deep` | `#2B5C60` | Deep teal, button hover (Teal-700) |
| `--sand` | `#D9C8AE` | One key callout per view (Sand-400) |
| `--sand-light` | `#FDFBF8` | Off-white text on dark, soft fills (Sand-50) |
| `--white` | `#ffffff` | Base canvas |

Extra darks used in gradients: `#101016` (Slate-1100, hero/pillars floor), `#050608` (near-pure
black, pillars gradient top). Teal highlight on dark hovers: `#78ECF5` (Teal-100).

### Color usage rules

- **Teal swaps by ground.** Use `--teal` (#458D93) on light. Use `--teal-bright` (#65C8D0)
  on dark. Never put the dark-teal on a dark section or vice versa, the contrast breaks.
- **Eyebrows are always teal**, uppercase, tracked wide. This is the one recurring teal mark
  on light sections.
- **Sand is rationed.** One callout per view, maximum. It is a highlight pigment, not a fill.
- **CTA logic flips with the ground:** on dark sections the primary button is bright teal
  (`btn-teal`); on light/scrolled the primary button goes near-black (`btn-dark`). The nav
  CTA does this automatically (see Nav).

---

## 3. Typography

Two brand typefaces, loaded locally from `assets/fonts/` as `.otf`.

- **Zodiak** (serif) — headlines and big statements ONLY. h1, h2. Weights: Light 300,
  Regular 400. Set large, tight line-height, slightly negative tracking. This carries the
  editorial, "specimen" feel.
- **Satoshi** (sans) — everything else: body, UI, labels, data, buttons. Weights: 400, 500,
  700, 900.

Fallback stacks: `"Satoshi", -apple-system, sans-serif` and `"Zodiak", Georgia, serif`.

### Type scale (as shipped, responsive)

| Element | Font | Size | Notes |
|---|---|---|---|
| h1 | Zodiak | `clamp(44px, 6vw, 78px)` | weight 400, line-height 1.05, tracking -0.01em, balanced wrap |
| h2 | Zodiak | `clamp(34px, 4vw, 54px)` | weight 400, line-height 1.12, tracking -0.01em |
| h3 | Satoshi | `24px` | weight 500, line-height 1.25 |
| `.eyebrow` | Satoshi | `12px` | weight 700, tracking 0.14em, UPPERCASE, color teal, 24px bottom margin |
| `.lead` | Satoshi | `18px` | color gray, max-width 560px |
| body | Satoshi | `16px` | line-height 1.6 |
| `.hero-tag` | Satoshi | `13px` | weight 700, tracking 0.18em, UPPERCASE |

Pattern for a section header: small teal `.eyebrow` (all caps) sitting above a large Zodiak
`h2`, optionally a gray `.lead` paragraph under it.

---

## 4. Layout and spacing

| Token | Value | Use |
|---|---|---|
| `--container` | `1200px` | Max content width |
| `--section-pad` | `140px` | Vertical padding top/bottom on every `section` |
| `--radius` | `16px` | Card / media corner radius |
| Container side padding | `32px` | Gutters inside `.container` |

- Sections are tall and breathe: 140px vertical padding is the default rhythm.
- Buttons and small UI use a tighter `5px`–`8px` radius; cards and media use the full 16px.
- `.center` utility centers text and constrains leads.

---

## 5. Section rhythm (light/dark alternation)

The page is mostly light, with dark sections as deliberate emphasis. Observed pattern:

- **Light sections** (`--bg-light` #F7F4F0 or white): the gap intro, plan, personas,
  testimonials, most content. Cards on light = white fill with a `--border` hairline.
- **Dark sections** (`--near-black`): the "us vs them" contrast card (`.gap-us`), the founder
  block, and the pillars section (which uses a layered dark gradient
  `linear-gradient(180deg, #050608, #18181F 40%, #1d1e23)`). Text goes white, teal goes bright.
- **Hero**: full-bleed dark photo (`#101016` floor) with a left-to-right darkening gradient so
  the white headline reads against the image. Slow Ken Burns zoom (28s) unless reduced-motion.

Rule of thumb: never two dark sections back to back unless intentional. Dark is the accent
ground, light is home.

---

## 6. Components

**Buttons** (`.btn`, 13px/30px padding, 5px radius, 14px weight-600 text, lift on hover):
- `.btn-dark` — near-black bg, sand-light text. Hover goes teal-deep. Primary on light.
- `.btn-teal` — bright-teal bg, near-black text. Hover brightens to #78ECF5. Primary on dark.
- `.btn-light` — white bg, ink text.
- `.btn-outline` — transparent, 1px border, ink text.
- `.btn-lg` — larger hero variant (15px/34px padding).
- Hover everywhere: `translateY(-2px)` plus a soft shadow.

**Cards** (stat, assess, social, gap, pillar, tier, priority): white fill, `--border`
hairline, 16px radius. Hover lifts `translateY(-4px)` with a soft shadow
(`0 16px 40px rgba(22,23,25,0.08)`). On dark sections cards are translucent white
(`rgba(255,255,255,0.04)`) with a faint white border.

**Nav** (`.nav`): floating glass pill, fixed 16px from top, centered, max 1200px wide.
- Over the dark hero: dark translucent glass (`rgba(20,20,26,0.5)`), white text/logo,
  bright-teal CTA.
- Scrolled or over light (`.scrolled` / `.light`): warm light glass
  (`rgba(247,244,240,0.72)`), ink text, near-black CTA.
- Logo is an SVG mask filled with `currentColor`, so it recolors automatically with the theme.
- Mobile: hamburger opens a light glass drop panel.

**Eyebrow + heading + lead** is the standard section-intro unit (see Typography).

**Image placeholders** (`.ph`): gray diagonal gradient with an uppercase label, 16px radius.
Replace with real media.

---

## 7. Motion

| Token | Value | Use |
|---|---|---|
| `--dur-reveal` | `0.6s` | Scroll-reveal content |
| `--dur-ui` | `0.3s` | Buttons, hover, nav theme transitions |
| `--ease` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | Default easing |

- **Scroll reveal**: `.reveal` elements fade up 28px into place
  (`opacity` + `translateY`, ~0.85s, soft ease). Only active when JS is on (`html.js`).
- **Hero Ken Burns**: 28s infinite alternating slow zoom on the background image.
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` disables reveals and the
  hero animation. Respect this, it is already wired in.

---

## 8. Accessibility notes (already in the CSS, keep them)

- Visible keyboard focus: `:focus-visible` draws a 2px teal outline, 3px offset. Do not
  remove it.
- Reduced-motion is honored (see Motion).
- Body line-height 1.6, leads constrained to ~560px for readability.
- Maintain contrast when placing teal: `--teal` on light, `--teal-bright` on dark.

---

## 9. Logos

Logo files live in `assets/`. The nav uses `assets/logo.svg` as a mask so it inherits the
current text color (works on both dark and light nav states).

Full logo set (from brand v1.2, in the workspace brand folder):
- Primary wordmark, dark (for light backgrounds) and white (for dark backgrounds).
- Logomark "2P" only, dark and white variants.

On this light-first site, the dark/black wordmark is the default; the white version is only
for the dark hero and dark feature sections.

---

## 10. How this differs from the old brand.md (hand-off summary)

If you are updating the master brand guidelines from this file, these are the deltas:

1. **Default ground flipped.** Old: dark/slate base, white text. New web: white + warm sand
   base, ink text. Dark is now an accent ground, not the default.
2. **Warm sand (#F7F4F0) is the signature section color**, not a minor tint. It carries the
   "archival paper" warmth from the Calibrated Stillness philosophy.
3. **Teal now has a two-value rule by ground** (#458D93 on light, #65C8D0 on dark) rather than
   a single accent.
4. **Type scale is web-responsive** (clamp-based) rather than the fixed deck point sizes in
   the old guide. Roles are the same: Zodiak for statements, Satoshi for everything else.
5. Everything else (palette family, Sand-is-rationed, Teal-is-earned, two typefaces) carries
   over unchanged.

Related source files in the workspace:
- `outputs/design-philosophy-calibrated-stillness.md` — the mood / philosophy (warm paper,
  ink, deep pine, brass). This light direction is its execution.
- `.second-prime/reference/brand/brand.md` — the old dark-first guide (decks/PDF).
