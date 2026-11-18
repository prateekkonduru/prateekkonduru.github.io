# DESIGN.md

Design system for the live site (`index.html` at the repo root). Everything is defined as
CSS custom properties in the `:root` block of that file.

## Color (OKLCH, dark theme locked)

| Token | Value | Use |
|---|---|---|
| `--bg` | `oklch(11.5% 0.007 255)` | page base (cool graphite, never #000) |
| `--bg-panel` | `oklch(13.5% 0.008 255)` | capability panels |
| `--bg-raise` | `oklch(14.5% 0.008 255)` | the one lifted surface: console palette panel |
| `--ink` | `oklch(93% 0.006 85)` | primary text (warm bone, never #fff) |
| `--ink-dim` | `oklch(74% 0.008 255)` | body/secondary text |
| `--ink-faint` | `oklch(63% 0.009 255)` | labels, dates (large/label sizes only) |
| `--line` / `--line-soft` | `oklch(26%/20.5% 0.008 255)` | hairlines, borders |
| `--amber` | `oklch(80% 0.148 72)` | THE accent: CTAs, caret, key figures, focus rings |
| `--amber-hot` | `oklch(85% 0.152 78)` | amber button hover only |
| `--amber-ink` | `oklch(20% 0.03 72)` | text on amber buttons |
| `--amber-wash` | `oklch(80% 0.148 72 / 0.07)` | AI/ML panel tint, selected console row |

Those are the tokens. The CSS also carries inline `oklch()` literals, but only as
alpha variants of these same three hues (bone `93% 0.006 85`, amber `80% 0.148 72`,
graphite `255`), plus two darker values used solely for the console scrim and its
shadow. If a surface seems to need a new value, reach for an existing token or an
alpha of one; a new hue is almost always the wrong answer.

Strategy: monochrome graphite surface + one signal accent. Do not add a second
accent color. Amber marks instrument moments only (status, numbers, current
role, primary CTA).

## Typography

- **Archivo** (variable, `wdth` 62..125, `wght` 100..900), one family, two voices:
  - Display: `font-stretch: 112-122%`, weight 760-800, tight tracking, uppercase for name/company marks
  - Body: normal width, 400/600
- **Martian Mono** 400-600: dates, chips, labels (11-12.5px, letter-spacing 0.08-0.14em, uppercase)
- Emphasis inside a headline: weight/width of the same family, never a second family
- Both families are **self-hosted** from `fonts/` as variable woff2, declared in
  `@font-face` and preloaded. The page makes zero external
  requests: do not reintroduce a Google Fonts `<link>`. To change a weight or width,
  adjust the axis in CSS rather than fetching another file
- Archivo uses `font-display: swap` (it carries the name, it must show). Martian Mono uses
  `optional`: it only sets labels, and a late swap re-wrapped the hero pill and failed
  mobile CLS (0.131). Keep it `optional`

## Shape and space

- One radius everywhere: `--r: 4px` (near-sharp, engineered). No pills, no large rounds.
- Container: `max-width: 1200px`, `padding-inline: clamp(20px, 4vw, 48px)`
- Section rhythm: `padding-block: clamp(88px, 12vh, 140px)`, hairline `border-top` separators
- Cards only where grouping needs them (capability panels); lists use hairlines and space

## Motion

- Easings: `--eo: cubic-bezier(0.23,1,0.32,1)` (enter/exit), `--eio: cubic-bezier(0.77,0,0.175,1)` (on-screen movement)
- Reveals: `.rv` + IntersectionObserver adds `.in`; stagger via `--d` (60-100ms steps)
- Hero: line-mask rise on load (`html.ready`), blinking amber caret. Other hero elements are
  visible from the first paint and settle with a transform-only 10px rise: never fade the
  hero in from opacity 0, it delays LCP
- Field: motion is time-based (dt scaled to 60fps), so it runs the same speed on 120Hz
  screens; strokes are batched into two paths per frame; it starts after first paint
- All hidden-until-reveal states are gated on `html.js`; print resets them
- `prefers-reduced-motion`: reveals instant, canvas renders one static frame, caret/pulse stop
- Buttons: `:active { scale(0.97) }`, arrow glyphs translate on hover, transitions 160-300ms

## Imagery

Generative canvas flow field in the hero (amber + bone telemetry streaks on
graphite, pointer-reactive, paused offscreen/hidden). No stock photography,
no fake product screenshots.

## Hard rules

- Zero em/en-dashes in visible text (hyphens only)
- Middle-dots only as the hero pill's two domain separators; never in prose or metadata lines
- One decorative-adjacent dot on the whole page: the hero status pulse (fronting the domain strip "AI Leadership / Agentic Systems / Enterprise AI"; all three segments always show, wrapping into tidy rows inside the pill on narrow screens)
- No gradient text, no glassmorphism, no side-stripe borders, no stat-card strips
- Contrast: body text >= 4.5:1, labels >= 4.5:1 at their size, amber-on-graphite CTAs ~8:1
