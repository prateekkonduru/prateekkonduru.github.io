# Prateek Konduru — Portfolio

Personal portfolio site for **Prateek Konduru** — AI Solutions Leader, Forward Deployed Engineering, and Enterprise Implementation.

Live at: https://prateekkonduru.github.io

## Structure

- `index.html` — root redirect to `dist/index.html`
- `dist/index.html` — the modern single-file portfolio (dark, minimalist)
- `dist/Profile.pdf` — résumé download
- `dist/assets/img/favicon.ico` — favicon
- `src/` — legacy Pug/SCSS source for the previous Start Bootstrap theme (no longer used by the live site)

## Tech

The live page is a single self-contained HTML file using:

- Inter & JetBrains Mono via Google Fonts
- Font Awesome 6 (CDN)
- Vanilla CSS (custom dark theme, glassmorphism, ambient gradients)
- A small Intersection Observer for scroll reveals

No build step is required to update the live site — edit `dist/index.html` directly.

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080/dist/index.html
```
