# CLAUDE.md

Single static site: `index.html` at the root, no build step, zero dependencies.
Read PRODUCT.md (brand brief) and DESIGN.md (tokens) before any visual change.

## Working here

Keep responses focused, brief, and concise. Keep disclaimers and caveats short, and spend most of the response on the main answer. When asked to explain something, give a high-level summary unless an in-depth explanation is specifically requested.

Match the length of written documents to what the task needs: cover the substance, but do not pad with filler sections, redundant summaries, or boilerplate.

Before your first tool call, say in one sentence what you're about to do. While working, give a brief update only when you find something important or change direction. When you finish, lead with the outcome: your first sentence should answer "what happened" or "what did you find," with supporting detail after it for readers who want it.

Deliver what was asked, at the scope intended. Make routine judgment calls yourself, and check in only when different readings of the request would lead to materially different work. If the request seems mistaken or a better approach exists, say so in a sentence and continue with the task as asked rather than quietly narrowing, widening, or transforming it. Finish the whole task, and stop short of actions that are clearly beyond what was asked.

Delegate to a subagent only for large tasks that are genuinely independent and parallelizable, such as a wide multi-file investigation. Do not delegate work you can finish yourself in a handful of tool calls, and do not use subagents to verify or double-check your own work. If one subagent can complete the task, use one rather than several, and keep spawn counts low.

## Footguns specific to this repo

- The `@media print` block must stay LAST in the stylesheet. Media queries add no
  specificity, so any rule declared after it silently wins and print breaks.
- Editing the hero, pill, or type scale invalidates `og.png`. Regenerate it at
  1200x630 from the live hero.
- `Profile.pdf` at the root is what visitors download. `dist/Profile.pdf` is a
  legacy copy; update both or the site serves a stale résumé.
- Deploy is `git push origin master`. GitHub Pages, ~60s.
- Changing a console command (`CMDS`) or the search block between `search:start`
  and `search:end`? Run `node tests/console-search.mjs`; it must print PASS.
- Analytics stays off until `GOATCOUNTER` is set in `index.html`. Keep it that way
  unless asked: an empty code means the site makes zero external requests.
