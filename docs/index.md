# melchior-jorda.online — Project Documentation

**Generated:** 2026-03-13 | **Scan level:** Exhaustive | **Version:** 1.0

---

## Project Summary

Personal portfolio website for Melchior JORDA, Full-Stack Developer based in Málaga, Spain.
Built as a Vue 3 SPA, deployed on Firebase Hosting, fully responsive with dark/light mode and 3-language support.

**Live:** https://melchior-jorda.online
**Repository:** GitHub (M-Jorda)

---

## Quick Reference

| Aspect | Details |
|---|---|
| **Type** | Web SPA (portfolio) |
| **Framework** | Vue 3.4 (Options API) |
| **Build Tool** | Vite 7 |
| **Styling** | TailwindCSS 3 (custom orange/navy palette) |
| **Routing** | vue-router 4 (history mode) |
| **i18n** | vue-i18n 9 — EN / FR / ES |
| **Email** | EmailJS (no backend) |
| **Hosting** | Firebase Hosting |
| **CI/CD** | GitHub Actions → Firebase on push to `main` |
| **Dark mode** | class-based, localStorage persisted |
| **Pages** | Home, Projects, About, Resume, Contact, 404 |
| **Projects** | 19 across 3 categories |
| **No tests** | No test runner configured |

---

## Documentation Index

| File | Contents |
|---|---|
| [source-tree-analysis.md](./source-tree-analysis.md) | Full annotated file tree, entry points, critical directories |
| [technology-stack.md](./technology-stack.md) | Dependencies, versions, architecture pattern, color system, config files |
| [ui-component-inventory.md](./ui-component-inventory.md) | All components & pages: props, state, features, design patterns |
| [projects-data.md](./projects-data.md) | 19 projects schema, categories, how to add a project |
| [i18n-localization.md](./i18n-localization.md) | i18n setup, locale switching, translation file structure, locale-aware features |
| [seo-strategy.md](./seo-strategy.md) | Static + dynamic SEO, JSON-LD, meta tags, sitemap, keywords |
| [development-guide.md](./development-guide.md) | Dev setup, build, scroll architecture, adding content |
| [deployment-configuration.md](./deployment-configuration.md) | Firebase Hosting, GitHub Actions CI/CD, cache strategy |

---

## Routes

| Route | Component | Load |
|---|---|---|
| `/` | `Home.vue` | Eager |
| `/projects` | `Projects.vue` | Lazy |
| `/about` | `About.vue` | Lazy |
| `/resume` | `Resume.vue` | Lazy |
| `/contact` | `Contact.vue` | Lazy |
| `/:pathMatch(.*)*` | `NotFound.vue` | Lazy |

---

## Key Files for AI Context

When implementing features or fixes, these are the most important files:

```
src/main.js              — router, app bootstrap
src/App.vue              — root layout, page transitions
src/components/Header.vue — navbar, theme, language (largest component)
src/components/MetaTags.vue — SEO injection
src/data/projects.json   — all project content
src/locales/en.json      — canonical translations
tailwind.config.cjs      — design tokens, dark mode
```

---

## Known Patterns & Conventions

- **Options API only** — no `<script setup>` or Composition API
- **`#app` scrolls**, not `window` — attach scroll listeners to `document.getElementById('app')`
- **Scoped styles** in Header.vue for nav links; global styles in `tailwind.css`
- **i18n key pattern for projects:** `projects.items.{project-id}.title` / `.description`
- **CV filenames:** `Melchior_Jorda_FullStack_${FR|EN|ES}.pdf` in `public/assets/`
- **No Vuex/Pinia** — theme and language state live in `Header.vue`, persisted to localStorage
- **Honeypot anti-bot** in Contact form: `formData.website` hidden field, checked before EmailJS call
