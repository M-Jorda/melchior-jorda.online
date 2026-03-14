# Technology Stack

**Generated:** 2026-03-13 | **Scan level:** Exhaustive | **Project:** melchior-jorda.online

---

## Overview

Single-page application (SPA) portfolio website built with Vue 3 and deployed on Firebase Hosting.
No backend — all content is static, contact form is handled client-side via EmailJS.

---

## Stack Table

| Category | Technology | Version | Role |
|---|---|---|---|
| UI Framework | Vue.js | ^3.4.0 | Component-based SPA framework |
| Build Tool | Vite | ^7.1.9 | Dev server, bundler, code splitting |
| CSS Framework | TailwindCSS | ^3.0.0 | Utility-first styling |
| CSS Post-processing | PostCSS + Autoprefixer | ^8.4.22 / ^10.4.14 | Browser compatibility |
| Routing | vue-router | ^4.2.0 | Client-side routing, SPA navigation |
| Internationalization | vue-i18n | ^9.4.0 | EN/FR/ES translations |
| Email Service | @emailjs/browser | ^4.4.1 | Contact form email delivery (no backend) |
| Hosting | Firebase Hosting | — | Static file hosting with SPA rewrites |
| CI/CD | GitHub Actions | — | Build & deploy to Firebase on push to main |
| Vue Plugin | @vitejs/plugin-vue | ^6.0.1 | Vue SFC support in Vite |

---

## Architecture Pattern

**Component-based layered SPA**

```
index.html (entry point)
  └── #app (Vue mount point)
        ├── Header (fixed navbar, persistent across routes)
        ├── <router-view> (page content, transitions)
        └── Footer (persistent across routes)
```

- **Options API** throughout (no Composition API / `<script setup>`)
- **No Vuex/Pinia** — state managed locally in components (theme, language persisted via localStorage)
- **Lazy loading** for all pages except Home (`import()` in router)
- **Code splitting** configured in `vite.config.js` for `vue`, `vue-router`, `vue-i18n` vendors

---

## Key Configuration Files

| File | Purpose |
|---|---|
| `vite.config.js` | Build config, `@` alias → `src/`, manual vendor chunks |
| `tailwind.config.cjs` | Custom color palette (orange/navy), dark mode (`class`), breakpoints |
| `postcss.config.cjs` | TailwindCSS + Autoprefixer |
| `firebase.json` | Hosting: `dist/` public dir, SPA rewrite `** → /index.html`, cache headers |
| `src/config/emailjs.config.js` | EmailJS service/template/public key |
| `src/config/seo.config.js` | Centralized SEO constants (URL, social, meta, geo) |
| `src/i18n.js` | vue-i18n setup (localStorage locale persistence, fallback to `en`) |
| `public/manifest.json` | PWA manifest |
| `public/robots.txt` | Search engine directives |
| `public/sitemap.xml` | XML sitemap |

---

## Color System (Tailwind custom palette)

| Token | Value | Usage |
|---|---|---|
| `primary` | `#0b1220` | Main text, dark backgrounds |
| `accent-50` | `#fff8f3` | Light mode background |
| `accent-200` | `#ffd8b0` | Muted text (dark mode) |
| `accent-500` | `#ff7a18` | Orange primary (buttons, borders) |
| `orange-400` | `#ff9f43` | Orange hover/dark mode |
| `slate-800` | `#0f172a` | Dark mode cards |
| `slate-900` | `#071024` | Dark mode body |
| `neutral` | `#f8fafc` | Footer text |

Dark mode: **class-based** (`<html class="dark">`) managed by Header component.
