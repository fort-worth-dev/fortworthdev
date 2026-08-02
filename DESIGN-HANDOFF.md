# Design handoff — look and feel

State of the visual/UX work on fortworthdev.com as of 2026-08-02. Covers what
changed, why, the rules that keep it coherent, and what is verified vs. not.

Content strategy is **out of scope here** and still open — see [Not started](#not-started).

---

## Starting point

The first draft was a hero + stats + two card grids + contact block with a
terminal skin on top. Three findings shaped everything after:

1. **The accent colour never rendered.** `tailwind.config.mjs` defined
   `green: { DEFAULT: '#4ade80' }`. Tailwind flattens a `DEFAULT` key to the
   *bare* name — it emits `.text-green`, never `.text-green-DEFAULT`. All 24
   usages across 10 files were no-ops; 35 elements rendered grey. The site had
   never been seen as designed.
2. **The terminal styling was decoration, not structure.** Under the green and
   the scanline it was the same page shape as any consultant template.
3. **Mobile was broken.** The hero H1 forced the document to 529px at a 375px
   viewport.

## Direction chosen

Two decisions from the design conversation:

- **Scope: full restructure** — layout reworked, not just restyled.
- **Costume: lean in, execute it well** — keep the CRT/terminal character rather
  than sanding it off.

Those pull against "more professional" unless the meaning of *leaning in*
changes, so it did: **the terminal metaphor became structural.** Layout,
navigation, section headers, and the interaction model all derive from it. The
costume stops reading as costume once it does work.

---

## Phase 1 — foundation (done)

### Palette is a syntax-highlighting theme

Each hue has exactly one job. Colour range without chaos, because developers
already parse this grammar.

| Token | Role |
|---|---|
| `term-green` | Prompts, live status, the single primary CTA |
| `term-cyan` | Links, paths, filenames, handles |
| `term-amber` | Numerals and metrics |
| `term-violet` | Types, proper nouns, product names |
| `term-red` | Errors |

Two rules stop it drifting back into wallpaper:

1. **Resting borders are neutral** (`line-1/2/3`, white at 8/14/22%). Hue on a
   border means *state* — hover, focus, active — never decoration.
2. **Rhetorical emphasis uses lightness, not hue** — `ink-0` on darker body
   text. A syntax colour is only correct when the phrase genuinely *is* a type,
   a number, or a path.

Text ramp: `ink-0` headings · `ink-1` body · `ink-2` labels/meta · `ink-3`
decorative chrome only. Contrast verified: every text token ≥ 4.6:1, `ink-3`
≥ 3.5:1 (it was bumped from `#5b6675` to `#6b7585` to clear 3:1 on raised
surfaces).

> **Never add a `DEFAULT` key to a colour scale.** Every scale is explicitly
> keyed for exactly this reason. This is the bug that hid the whole design.

### Typography

- **Syne is gone.** Display type is JetBrains Mono 800, `clamp(30px, 7vw, 64px)`,
  `-0.045em` tracking. Syne was the only element not participating in the
  metaphor and the loudest thing on the page.
- **Scale moved down one notch** — mono sets wider than sans at the same px.
  `--fs-micro` 11 · `--fs-label` 12 · `--fs-meta` 13 · `--fs-body` 15.5/15 ·
  `--fs-lead` 17 · `--fs-stat` 26/28.
- **Mono prose needs correct setting**: `--measure` 62ch, leading 1.75.
- **One exception**: blog post bodies use Inter at 17px/1.7 on 68ch. A full
  article in monospace is measurably slower to read. Headings, code, and all UI
  chrome stay mono.
- Fonts moved from a CSS `@import` to `preconnect` + `<link>` in `BaseLayout`,
  so font discovery no longer waits on the stylesheet download.

### Other foundation changes

- Scanline animation → **static phosphor texture** (`body::after`, 1-in-3px at
  1.5% white). A sweeping bar reads as a gimmick; fixed grain reads as a screen.
  Defined once instead of duplicated across four files.
- `:focus-visible` ring (green — a meaningful use of the accent) and a full
  `prefers-reduced-motion` block. Neither existed before.
- Shared `.btn-solid` / `.btn-ghost` / `.card` / `.row` in `@layer components`,
  replacing CSS duplicated across components.
- Fixed in passing: mobile H1 overflow, nav hash links (`#about` → `/#about`, so
  they work from `/blog/`), favicon rendering the literal string `{'>'}_`.

## Phase 2 — layout (done)

### Tiled panes

`index.astro` composes a 5-column grid so pane width carries hierarchy:

```
hero            span 5
stats strip     span 5
about  span 3 | skills  span 2
engag. span 3 | contact span 2
writing         span 5
```

At 1440px the page uses 1425px (previously ~768px in a single left column).

### Section headers are commands

`whoami` · `cat about.md` · `./skills.sh` · `ls ./engagements` ·
`cat contact.json` · `ls -la ./writing`. On-theme *and* more informative than
`// 01 About`.

### Lists instead of cards

Engagements became an actual `ls` listing (`drwxr-xr-x`, `ai-tooling-adoption/`
in cyan, description indented). Posts use `-rw-r--r--` + ISO date. This halved
the eight-identical-boxes problem — four `.card` boxes remain, in About only.

### Chrome carrying real state

- **Top status bar**: logo, nav, availability dot, live `America/Chicago` clock
  (rendered at build time so it is never blank, corrected and ticked client-side).
- **Bottom status line**: keybinding hints + tmux-style buffer list. Desktop
  only — it advertises affordances that do not exist on touch.
- **Left rail**: section index, real anchors, active marker on scroll. Hidden
  below `lg`.

### Keyboard layer

`j`/`k` panes · `g g` top · `G` bottom · `g h` home · `g b` writing ·
`/` command palette · `?` help · `Esc` close.

Palette filters live over sections, posts, and links; supports arrows and
`Ctrl-n`/`p`; clears on close. Both overlays are native `<dialog>`, so focus
trapping and Esc come from the platform.

**Cost: 1.4 KB gzipped**, inlined. All content is in the static HTML and the
rail is real anchors — the site works fully with JS off.

### Non-obvious implementation notes

- **Rail active-pane rule.** Tiled panes in the same row share a `top`, so the
  obvious "last pane whose top crossed the line" always picks the *right-hand*
  pane — `about` and `engagements` could never activate. Current rule picks the
  **first pane of the deepest crossed row** (`top <= 80 && top > deepest + 4`).
  Verified against real pane offsets at seven scroll positions.
- **Scroll spy uses a timestamp throttle, not IntersectionObserver or rAF.**
  Both are the more idiomatic choice and either would work in a real browser;
  the throttle was chosen because it is verifiable in a non-compositing
  test environment. Swapping back to IO is legitimate — see the caveat below.
- **`heading={false}` on the hero pane.** Otherwise the pane's `<h2>` command
  precedes the page `<h1>`.
- **`StatsBar` uses `gap-px` over `bg-line-1`** to draw cell dividers, which
  keeps hairlines correct at every column count without last-child rules.

---

## Verification status

**Verified in-browser** (dev server, dispatched events, computed styles):
build clean; all five syntax roles resolve; zero `green-DEFAULT` / `font-display`
leftovers; no horizontal overflow at 320 / 375 / 1440px; rail and status line
respect their breakpoints; every keybinding fires; palette filter, empty state,
arrow nav, Esc, and clear-on-close; guards hold (`/` ignored while typing,
`Ctrl-J` ignored); heading order; prose font split; live clock; JS payload size.

**NOT verified — needs a real browser.** The test browser pane never composites:
`window.scrollY` stays 0 regardless of `scrollTo`, and `IntersectionObserver`
and `requestAnimationFrame` never fire. Screenshots time out. So nothing
requiring paint or real scrolling was confirmed:

- smooth-scroll landing positions and the rail marker actually tracking
- sticky positioning and `backdrop-filter` rendering
- the phosphor texture's visual weight
- all hover states, `:focus-visible` ring, `::backdrop` dim
- **the overall visual result**

```bash
npm run dev
```

Look at it before trusting any of the above.

> One correction for the record: the rail marker was initially diagnosed as
> broken and rewritten off IntersectionObserver. That diagnosis was wrong — the
> observer was not firing because of the environment, not the code. The rewrite
> was made on a misread, though it did surface the genuine row-sharing bug above.

---

## File map

**New** — `layouts/ShellLayout.astro` (chrome + keyboard script),
`components/shell/{Pane,StatusBar,StatusLine,Rail,CommandPalette,HelpOverlay}.astro`,
`components/{Skills,PostList}.astro`.

**Removed** — `components/Nav.astro`, `components/Footer.astro` (replaced by the
status bars).

**Rewritten** — `tailwind.config.mjs`, `styles/global.css`,
`components/{Hero,StatsBar,About,Work,Contact}.astro`, all four pages,
`BlogPostLayout.astro`, `public/favicon.svg`.

**Also** — `.claude/launch.json` was added to run the dev server. Delete if you
do not want it tracked.

---

## Not started

**Look and feel:**

- Boot-sequence hero. The "lean in" direction allows it; only the static
  phosphor texture was built. If added: must land on readable static content in
  well under a second, be skippable, respect reduced-motion, and keep the real
  content in the DOM.
- Only four `.card` boxes remain (About). Could go further.

**Content — the largest remaining gap.** The `engagements` pane still *describes
services* rather than *showing work*: no case studies, numbers, or client names.
`StatsBar` presents "AI-first" and "FTW" as metrics when only "25+ years" is a
credential. A prospect's first question — what has this person shipped — is
still unanswered anywhere on the site.

**Carried over from the initial review, untouched:**

- No `og:image` (link previews are bare text), no sitemap, no `robots.txt`, no RSS.
- `deploy.yml` defaults to **plaintext FTP**; `README.md` and `DEPLOY.md` line 3
  both claim FTPS. Credentials cross the internet unencrypted on every push.
- `build.yml` and `deploy.yml` both build on push to `main` — same build twice.
