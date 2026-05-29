# Deploy to Hostinger

This site builds to static HTML in `dist/` and deploys to Hostinger over **FTPS** via GitHub Actions.

## Prerequisites

1. **Domain** — `fortworthdev.com` pointed at Hostinger (nameservers or A record).
2. **Hostinger plan** — Website hosting with FTP/FTPS access (hPanel).
3. **GitHub repo** — https://github.com/fort-worth-dev/fortworthdev

## 1. Get FTP credentials from hPanel

1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com/).
2. Open **Websites** → select **fortworthdev.com** (or your site).
3. Go to **Files** → **FTP Accounts** (or **FTP Access** on some plans).
4. Note these values:

| Setting | Typical value |
|---|---|
| **Host** | `ftp.fortworthdev.com` or the IP shown in hPanel |
| **Username** | e.g. `u123456789` or a custom FTP user |
| **Password** | Your FTP account password |
| **Port** | `21` |
| **Remote directory** | `/public_html/` for the primary domain |

> **Addon domain?** If `fortworthdev.com` is an addon (not the primary site), the remote path is often `/domains/fortworthdev.com/public_html/` instead of `/public_html/`. Set the `FTP_SERVER_DIR` repository variable (step 2b) if needed.

## 2. Add GitHub secrets

In the repo: **Settings → Secrets and variables → Actions**

### 2a. Secrets (required)

Click **New repository secret** for each:

| Secret | Value |
|---|---|
| `FTP_HOST` | FTP hostname from hPanel (no `ftp://` prefix) |
| `FTP_USERNAME` | FTP username |
| `FTP_PASSWORD` | FTP password |

### 2b. Variables (optional)

Under the **Variables** tab:

| Variable | Value | When to set |
|---|---|---|
| `FTP_SERVER_DIR` | `/domains/fortworthdev.com/public_html/` | Only if `/public_html/` is wrong for your setup |

Default deploy path is `/public_html/`.

### Set secrets from the CLI (optional)

```bash
gh secret set FTP_HOST --repo fort-worth-dev/fortworthdev
gh secret set FTP_USERNAME --repo fort-worth-dev/fortworthdev
gh secret set FTP_PASSWORD --repo fort-worth-dev/fortworthdev
```

Each command prompts for the value interactively.

## 3. Deploy

Deployment runs automatically when you **push to `main`**.

You can also trigger it manually:

1. Repo → **Actions** → **Deploy to Hostinger**
2. **Run workflow**

### What the workflow does

1. Verifies FTP secrets are set
2. Runs `npm ci` and `npm run build`
3. Uploads `dist/` to Hostinger via FTPS

## 4. Verify the live site

After a successful deploy:

- https://fortworthdev.com/
- https://fortworthdev.com/blog/
- https://fortworthdev.com/blog/welcome/

Check that HTTPS redirects work and that a bad URL shows the custom 404 page.

## Troubleshooting

### Deploy fails: missing secrets

Add all three secrets from step 2a. The workflow prints which secret is missing.

### Deploy fails: FTPS connection

Hostinger usually supports FTPS on port 21. If connection fails:

1. Confirm the host, username, and password in hPanel.
2. Try connecting with FileZilla using **FTP over TLS (explicit)**.
3. If FTPS still fails, open an issue or temporarily change `protocol:` in `.github/workflows/deploy.yml` from `ftps` to `ftp` (less secure).

### Files uploaded to the wrong folder

Set the `FTP_SERVER_DIR` repository variable to the path shown in hPanel’s file manager when you open your site’s web root.

### Site shows Hostinger default page

The domain may not be linked to the correct `public_html` folder, or DNS hasn’t propagated yet. Confirm the domain assignment in hPanel.

### Old files remain after deploy

The FTP deploy action syncs incrementally. To force a full re-upload, delete the contents of `public_html` in hPanel (keep `.htaccess` if you added one manually), then re-run the deploy workflow.

## Local preview of the production build

```bash
npm run build
npm run preview
```

Preview runs at http://localhost:4321 with the same static output that gets deployed.
