# DESIGN.md

Design system for the live site (`dist/index.html`). Everything is defined as
CSS custom properties in the `:root` block of that file.

## Color (OKLCH, dark theme locked)

| Token | Value | Use |
|---|---|---|
| `--bg` | `oklch(16% 0.008 255)` | page base (cool graphite, never #000) |
| `--bg-panel` | `oklch(17.5% 0.009 255)` | capability panels |
| `--ink` | `oklch(93% 0.006 85)` | primary text (warm bone, never #fff) |
| `--ink-dim` | `oklch(74% 0.008 255)` | body/secondary text |
| `--ink-faint` | `oklch(63% 0.009 255)` | labels, dates (large/label sizes only) |
| `--line` / `--line-soft` | `oklch(29%/24% 0.008 255)` | hairlines, borders |
| `--amber` | `oklch(80% 0.148 72)` | THE accent: CTAs, caret, key figures, focus rings |
| `--amber-ink` | `oklch(20% 0.03 72)` | text on amber buttons |

Strategy: monochrome graphite surface + one signal accent. Do not add a second
accent color. Amber marks instrument moments only (status, numbers, current
role, primary CTA).

## Typography

- **Archivo** (variable, `wdth` 62..125, `wght` 100..900), one family, two voices:
  - Display: `font-stretch: 112-122%`, weight 760-800, tight tracking, uppercase for name/company marks
  - Body: normal width, 400/600
- **Martian Mono** 400-600: dates, chips, labels (11-12.5px, letter-spacing 0.08-0.14em, uppercase)
- Emphasis inside a headline: weight/width of the same family, never a second family

## Shape and space

- One radius everywhere: `--r: 4px` (near-sharp, engineered). No pills, no large rounds.
- Container: `max-width: 1200px`, `padding-inline: clamp(20px, 4vw, 48px)`
- Section rhythm: `padding-block: clamp(88px, 12vh, 140px)`, hairline `border-top` separators
- Cards only where grouping needs them (capability panels); lists use hairlines and space

## Motion

- Easings: `--eo: cubic-bezier(0.23,1,0.32,1)` (enter/exit), `--eio: cubic-bezier(0.77,0,0.175,1)` (on-screen movement)
- Reveals: `.rv` + IntersectionObserver adds `.in`; stagger via `--d` (60-100ms steps)
- Hero: line-mask rise on load (`html.ready`), blinking amber caret
- All hidden-until-reveal states are gated on `html.js`; print resets them
- `prefers-reduced-motion`: reveals instant, canvas renders one static frame, caret/pulse stop
- Buttons: `:active { scale(0.97) }`, arrow glyphs translate on hover, transitions 160-300ms

## Imagery

Generative canvas flow field in the hero (amber + bone telemetry streaks on
graphite, pointer-reactive, paused offscreen/hidden). No stock photography,
no fake product screenshots.

## Hard rules

- Zero em/en-dashes in visible text (hyphens only)
- Max one middle-dot per metadata line (currently zero)
- One decorative-adjacent dot on the whole page: the availability pulse (semantic)
- No gradient text, no glassmorphism, no side-stripe borders, no stat-card strips
- Contrast: body text >= 4.5:1, labels >= 4.5:1 at their size, amber-on-graphite CTAs ~8:1
