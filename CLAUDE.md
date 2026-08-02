# fortworthdev.com

Personal/professional site for Fort Worth Dev. Astro 4 static site with a terminal-inspired dark UI, deployed to Hostinger via FTP on push to `main`.

## Stack

- **Framework:** Astro 4 (static output, `astro.config.mjs`)
- **Styling:** Tailwind 3 + custom design tokens in `tailwind.config.mjs` and `src/styles/global.css`
- **Content:** Astro Content Collections (MDX blog posts in `src/content/blog/`)
- **TypeScript:** strict mode (`astro/tsconfigs/strict`), path alias `@/*` → `src/*`
- **Fonts:** JetBrains Mono (primary), Inter (sans fallback)
- **Node:** 20

## Commands

```bash
npm run dev        # dev server (localhost:4321)
npm run build      # production build → dist/
npm run preview    # serve dist/ locally
```

No test suite. No linter configured.

## Project structure

```
src/
  components/       # Astro components (Hero, About, Skills, etc.)
  components/shell/ # Terminal chrome: Rail, Pane, StatusBar, CommandPalette, HelpOverlay
  content/blog/     # MDX posts (schema: title, description, date, category, draft)
  data/             # resources.ts (curated link list), projects.ts
  layouts/          # BaseLayout, ShellLayout, BlogPostLayout
  pages/            # index, blog/, resources/, 404
  styles/           # global.css (Tailwind layers + custom utilities)
```

## Design system

Dark terminal aesthetic — dark canvas (`#0a0c0e`), monospace-first typography, phosphor scanline overlay.

Color roles (defined in `tailwind.config.mjs`):
- `term-green` — prompts, status, single CTA
- `term-cyan` — links, paths, filenames
- `term-amber` — numerals and metrics
- `term-violet` — types, proper nouns, product names
- `term-red` — errors

Text scale uses CSS custom properties (`--fs-micro` through `--fs-stat`) with Tailwind utility classes (`text-micro`, `text-label`, `text-meta`, `text-body`, `text-lead`, `text-stat`).

Component patterns: `.btn-solid` / `.btn-ghost` for CTAs, `.card` for hoverable panels, `.row` for list items, `.pane` for shell sections.

## Content model

**Blog posts** (`src/content/blog/`): MDX with frontmatter schema in `src/content/config.ts`. Categories: `assistants`, `agents`, `notes`. Posts with `draft: true` are hidden in production.

**Resources** (`src/data/resources.ts`): curated links typed as `video | repo | article`, each with track (`assistants | agents`), annotation, and last-checked date. Two rules: nothing unvetted, every link periodically re-verified.

## Deployment

- **Host:** Hostinger (shared hosting, FTP)
- **CI:** GitHub Actions — `build.yml` (PR + push) and `deploy.yml` (push to main)
- **Repo:** `fort-worth-dev/fortworthdev` on GitHub
- **Deploy details:** see `DEPLOY.md`

Secrets required: `FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD` (GitHub repo secrets).

## Conventions

- Trailing slashes on all URLs (`trailingSlash: 'always'` in Astro config)
- Shell-style section IDs and commands (e.g., `whoami`, `cat about.md`, `ls ./projects`)
- Keyboard navigation: `j`/`k` to move between panes, `?` for help overlay, `/` for command palette
