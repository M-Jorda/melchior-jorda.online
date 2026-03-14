# Development Guide

**Generated:** 2026-03-13

---

## Prerequisites

- **Node.js** 18+ (required by CI — see `.github/workflows/ci.yml`)
- **npm** (package manager, uses `npm ci` in CI)
- **Git**

---

## Installation

```bash
# Clone repository
git clone <repo-url>
cd melchior-jorda.online

# Install dependencies
npm install
```

---

## Development

```bash
# Start dev server (Vite, with HMR)
npm run dev
# → http://localhost:5173 (default Vite port)
```

---

## Build

```bash
# Production build → dist/
npm run build

# Preview production build locally
npm run preview
```

Build output: `dist/` directory (gitignored).
Code splitting creates separate chunks: `vue`, `router`, `i18n` + main bundle.

---

## Project Setup Notes

### EmailJS Configuration
The contact form requires valid EmailJS credentials in `src/config/emailjs.config.js`:
- Copy `src/config/emailjs.config.example.js` → `emailjs.config.js`
- Fill in `serviceID`, `templateID`, `publicKey` from [emailjs.com](https://emailjs.com)
- Template variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{to_email}}`

### Path Alias
`@` resolves to `src/`:
```js
import projectsData from '@/data/projects.json'
import MetaTags from '@/components/MetaTags.vue'
```

### Dark Mode
- Toggle managed in `Header.vue` → persists to `localStorage.theme`
- Applied as class on `<html>`: `document.documentElement.classList.add('dark')`
- TailwindCSS `darkMode: 'class'` in `tailwind.config.cjs`

### Language Switching
- Managed in `Header.vue` → persists to `localStorage.lang`
- `src/i18n.js` reads from localStorage on app init
- Available locales: `en`, `fr`, `es`

---

## Adding Content

### New Project
1. Add to `src/data/projects.json`
2. Add i18n translations in all 3 locales under `projects.items.{id}`
3. Optional: add thumbnail to `public/projects/{id}/thumbnail.png`
4. Optional: add hosted site to `public/{folder}/`
5. See `docs/projects-data.md` for full schema

### New Page
1. Create `src/pages/NewPage.vue`
2. Add route in `src/main.js` routes array
3. Add nav link in `Header.vue` (both desktop and mobile menus)
4. Add i18n key for `nav.{page}` in all 3 locale files
5. Add `<MetaTags>` component with appropriate props
6. Add to `public/sitemap.xml`

### New i18n Key
1. Add to `src/locales/en.json` (canonical)
2. Add to `src/locales/fr.json` and `es.json` (or leave for fallback to `en`)
3. Use in templates: `{{ $t('your.key') }}`

---

## Scrolling Architecture

**Important:** The scroll container is `#app`, not `window`.
- `html, body { overflow: hidden }` — prevents body scroll
- `#app { overflow-y: auto; height: 100% }` — only `#app` scrolls
- `Header.vue` attaches scroll listener to `document.getElementById('app')`
- If you need to detect scroll in a component, listen on `#app` not `window`

---

## CSS Classes of Note

| Class | Defined in | Description |
|---|---|---|
| `.btn` | `tailwind.css` | Orange filled button |
| `.btn-outline` | `tailwind.css` | Orange outlined button |
| `.card` | `tailwind.css` | White card with shadow |
| `.flag-btn` | `tailwind.css` | Flag icon button for language switcher |
| `.nav-link` | `Header.vue` scoped | Desktop navigation link with active state |
| `.nav-link-mobile` | `Header.vue` scoped | Mobile navigation link with left bar active state |

---

## No Tests

There are currently no automated tests in this project. No test files, no test runner configured.
