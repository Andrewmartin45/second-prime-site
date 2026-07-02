# Second Prime Site — Handoff Notes

Static site: vanilla HTML/CSS/JS. No build step, no dependencies. Edit files, commit, push.

## Hosting & deploys
- Repo: github.com/Andrewmartin45/second-prime-site (branch `main`)
- Vercel auto-deploys `main` → https://second-prime-site.vercel.app (~1 min)
- GitHub Pages also serves the same repo (slower to update)
- CSS is cache-busted via `css/styles.css?v=NN` in every page head. If you edit styles.css, bump the version number on all pages or changes won't show for returning visitors.

## Structure
- `index.html` — homepage. `what-we-do.html`, `how-it-works.html`, `case-studies.html`, 3 case-study pages, `blog.html`, `blog-cardio-panel.html`, `privacy.html`, `terms.html`
- `css/styles.css` — all styling. Design tokens (colors/fonts/spacing) at the top.
- `js/main.js` — shared behavior for subpages; index has inline scripts.
- Fonts: Satoshi + Zodiak, self-hosted in `assets/fonts/`. Note: Zodiak only ships 300/400 weights; don't set serif headings bolder or they'll faux-bold.
- Reveal animations use IntersectionObserver; logo marquee + testimonial wall are CSS keyframe marquees; all respect `prefers-reduced-motion`.

## Open items (yours)
1. **Booking flow (the big one).** Every "Book a Consult" resolves to `index.html#footer-cta`, and that section's button is `href="#"`. Build the consultation/booking page and point all CTAs at it. Grep for `#footer-cta` and `href="#"`.
2. **Legal review.** `privacy.html` and `terms.html` are starter drafts (see HTML comments at the top of each). Have an attorney finalize, especially health-data handling and the medical disclaimer.
3. **Custom domain.** When you attach the real domain in Vercel, update the `canonical` and `og:url`/`og:image` URLs in every page head (they currently point at second-prime-site.vercel.app).
4. **404 page.** None exists yet; add a branded `404.html`.

## Already wired (don't redo)
- Favicon set + apple-touch-icon (`assets/favicon-*.png`, `assets/apple-touch-icon.png`)
- Meta description, canonical, Open Graph + Twitter card on every page; share image at `assets/og-image.jpg` (1200x630)
- Social links (Instagram + LinkedIn) in every footer
- Footer legal links → privacy.html / terms.html
- Results/medical disclaimer in every footer
- Mobile: stacked hero with dedicated crop (`assets/andrew-hero-mobile.*`), one-line stats on case pages, 44px touch targets, no horizontal scroll

## Gotchas
- The floating nav flips light/dark by reading the section behind it (`NAV_DARK` selector list in each page's inline script). If you add a new dark section, add its class to that list.
- Hero images use WebP with JPEG fallback via `image-set()` in styles.css; hero files are cache-busted with `?v=N` query params.
- The logo wall label states "Trusted by 500+ founders & executives from" — the logos represent companies whose owners/execs Andrew has coached individually, not corporate clients. Keep wording consistent with that.
