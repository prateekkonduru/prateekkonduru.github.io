# Prateek Konduru | Portfolio

Personal portfolio site for **Prateek Konduru**: AI Solutions Leader, Forward Deployed Engineering, and Enterprise Implementation.

Live at: https://prateekkonduru.github.io

## Structure

- `index.html` - the live single-file portfolio ("deployment record" design), served at the root
- `Profile.pdf` - résumé download
- `og.png` - social share card (1200x630), regenerate from the hero if the design changes
- `favicon.ico` - favicon
- `robots.txt` / `sitemap.xml` / `llms.txt` - crawler, index, and AI-assistant discovery files
- `PRODUCT.md` / `DESIGN.md` - brand brief and design-system notes for the site
- `dist/index.html` - legacy URL, now a redirect stub back to `/` (old shared links keep working)
- `src/` - legacy Pug/SCSS source for the old Start Bootstrap theme (no longer used by the live site)

## Design

The site is an "engineered ops console" take on a portfolio, built around the
forward-deployed identity:

- Graphite monochrome base (OKLCH) with a single signal-amber accent
- Archivo variable font (width axis: expanded display voice, normal body voice) + Martian Mono for data labels
- A generative canvas flow field as the hero imagery (no stock photos)
- Sticky company rail + promotion ladder in the experience "deployment log"
- IntersectionObserver reveals, gated behind an `html.js` class so the page is
  fully readable without JavaScript, in print, and for crawlers
- `prefers-reduced-motion` collapses all motion to static states

## SEO / AI-SEO

- Content is served at the canonical root URL (no redirect hop); `dist/` canonicals back to `/`
- `ProfilePage` + `Person` + `WebSite` JSON-LD graph (knowsAbout, credentials, sameAs)
- Full Open Graph + Twitter cards backed by `og.png`
- `robots.txt` explicitly welcomes AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- `llms.txt` gives AI assistants a structured profile summary
- After deploying, submit `sitemap.xml` in Google Search Console

No build step: edit `index.html` directly and push.

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080/
```
