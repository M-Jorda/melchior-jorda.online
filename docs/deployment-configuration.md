# Deployment Configuration

**Generated:** 2026-03-13 | Source: `firebase.json`, `.github/workflows/ci.yml`

---

## Hosting: Firebase Hosting

**Config file:** `firebase.json`
**Public directory:** `dist/` (Vite build output)

### SPA Rewrite
All routes redirect to `index.html` — required for Vue Router history mode:
```json
"rewrites": [{ "source": "**", "destination": "/index.html" }]
```

### Cache Headers
| Files | Cache-Control | TTL |
|---|---|---|
| `*.js`, `*.css` | `public, max-age=31536000, immutable` | 1 year |
| Images (png, jpg, jpeg, gif, webp, avif, ico) | `public, max-age=31536000, immutable` | 1 year |
| `*.svg` | `public, max-age=31536000, immutable` | 1 year |
| `/index.html` | `no-cache` | Always revalidate |

Strategy: Long cache for hashed static assets, no-cache for the HTML entry point.

### Firebase Ignored Files
```json
"ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
```

---

## CI/CD: GitHub Actions

**Config file:** `.github/workflows/ci.yml`
**Triggers:** Push to `main` or `master` branches

### Workflow Jobs

#### `build` job (runs on every push)
1. Checkout code
2. Setup Node.js 18
3. `npm ci` (clean install)
4. `npm run build` (Vite build → `dist/`)

#### `deploy` job (only on `main`/`master`, needs `build`)
1. Checkout code
2. `npm ci`
3. `npm run build`
4. Install `firebase-tools` globally
5. `firebase deploy --only hosting --token "$FIREBASE_TOKEN"`
   - Only runs if `secrets.FIREBASE_TOKEN` is set in GitHub repository secrets

### Required GitHub Secret
| Secret | Description |
|---|---|
| `FIREBASE_TOKEN` | Firebase CI token (obtain via `firebase login:ci`) |

---

## Manual Deployment

```bash
# Install Firebase CLI (if not installed)
npm install -g firebase-tools

# Login
firebase login

# Initialize (first time only)
firebase init hosting

# Build and deploy
npm run build
firebase deploy --only hosting
```

---

## Domain

Live URL: `https://melchior-jorda.online`
- Canonical URL set in `index.html`
- SPA served via Firebase Hosting custom domain

---

## Also: Apache (`.htaccess`)

`public/.htaccess` provides Apache mod_rewrite rules for SPA routing — serves as backup for Apache-based hosts, though the primary deployment is Firebase.
