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
**Triggers:** push to `main` (build + deploy), pull requests to `main` (build only)

### `build_and_deploy` job
1. Checkout code
2. Setup Node.js 22 (Vite 7 requires Node ≥ 20.19)
3. `npm ci`
4. Generate `src/config/emailjs.config.js` from secrets (the file is gitignored)
5. `npm run lint`
6. `npm run build` with `VITE_GA_ID` (Vite build → `dist/`, including the static blog)
7. On push to `main` only: deploy to the `live` channel of Firebase project
   `melchior-75a9e` with `FirebaseExtended/action-hosting-deploy` (service account)

### Required GitHub Secrets
| Secret | Description |
|---|---|
| `FIREBASE_SERVICE_ACCOUNT_MELCHIOR_75A9E` | JSON key of a Google Cloud service account with the **Firebase Hosting Admin** role |
| `VITE_GA_ID` | Google Analytics 4 measurement ID |
| `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY` | Values from the local `src/config/emailjs.config.js` (required on `main`, the deploy fails without them) |

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
