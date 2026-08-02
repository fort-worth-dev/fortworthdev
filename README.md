# fortworthdev.com

Personal site for [@fortworthdev](https://x.com/fortworthdev) — AI + .NET consulting.

Built with [Astro](https://astro.build), Tailwind CSS, and MDX. Deployed to Hostinger via GitHub Actions.

## Stack

- **Astro 4** — static output, zero JS by default
- **Tailwind CSS 3** — utility-first styling
- **MDX** — blog posts with components
- **JetBrains Mono** — everything except long-form blog prose, which uses **Inter**
- **GitHub Actions → FTP** — CI/CD to Hostinger

## Design system

The palette is a syntax-highlighting theme, not a set of decorative colors.
Each hue has exactly one job — if a new element doesn't fit a role below, it
stays on the neutral `ink` ramp.

| Token | Role |
|---|---|
| `term-green` | Shell prompts, live status, the single primary CTA |
| `term-cyan` | Links, paths, filenames, handles |
| `term-amber` | Numerals and metrics |
| `term-violet` | Types, proper nouns, product names |
| `term-red` | Errors |

Two rules keep it from drifting back into wallpaper:

1. **Resting borders are neutral** (`line-1`/`line-2`/`line-3`). Hue on a border
   means state — hover, focus, or active — never decoration.
2. **Rhetorical emphasis uses lightness, not hue.** Reach for `ink-0` on a
   darker body color. A syntax color is only correct when the phrase genuinely
   *is* a type, a number, or a path.

Text ramp: `ink-0` headings · `ink-1` body · `ink-2` labels and metadata ·
`ink-3` decorative chrome only (it clears 3:1, not 4.5:1, so nothing
information-bearing goes there).

> **Never add a `DEFAULT` key to a color scale in `tailwind.config.mjs`.**
> Tailwind flattens it to the bare name — `green: { DEFAULT }` emits
> `.text-green`, not `.text-green-DEFAULT` — so the obvious-looking class
> silently does nothing. Every scale is explicitly keyed for this reason.

## Getting started

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
npm run preview    # preview the build locally
```

## Deployment (Hostinger via FTP)

**Full setup guide:** [DEPLOY.md](./DEPLOY.md)

Quick checklist:

1. Add GitHub Actions secrets: `FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD`
2. Optionally set repo variable `FTP_SERVER_DIR` if your web root isn't `/public_html/`
3. Push to `main` (or run **Deploy to Hostinger** manually from Actions)

| Secret | Value |
|---|---|
| `FTP_HOST` | Your Hostinger FTP host (e.g. `ftp.fortworthdev.com`) |
| `FTP_USERNAME` | Your Hostinger FTP username |
| `FTP_PASSWORD` | Your Hostinger FTP password |

Push to `main` → GitHub Actions builds and deploys automatically via FTPS.

## Project structure

```
src/
  components/     # Nav, Hero, About, Contact, Footer
  layouts/        # BaseLayout.astro, BlogPostLayout.astro
  pages/          # index.astro (homepage), blog/
  styles/         # global.css (Tailwind + fonts)
  content/blog/   # MDX blog posts
public/
  favicon.svg
.github/workflows/
  deploy.yml      # Build + FTP deploy on push to main
```

## Adding a blog post

Create `src/content/blog/my-post.mdx`:

```mdx
---
title: 'My Post Title'
date: 2026-01-15
description: 'A short summary.'
draft: false
---

Content goes here...
```

Posts appear at `/blog/` automatically. Set `draft: true` to hide a post in production builds.
