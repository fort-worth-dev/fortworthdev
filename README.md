# fortworthdev.com

Personal site for [@fortworthdev](https://x.com/fortworthdev) — AI + .NET consulting.

Built with [Astro](https://astro.build), Tailwind CSS, and MDX. Deployed to Hostinger via GitHub Actions.

## Stack

- **Astro 4** — static output, zero JS by default
- **Tailwind CSS 3** — utility-first styling
- **MDX** — blog posts with components
- **JetBrains Mono + Syne** — typography
- **GitHub Actions → FTP** — CI/CD to Hostinger

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
