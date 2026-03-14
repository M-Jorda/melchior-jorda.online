# SEO Strategy

**Generated:** 2026-03-13 | Source: `index.html`, `src/config/seo.config.js`, `src/components/MetaTags.vue`

---

## Overview

Comprehensive SEO implementation for a personal portfolio SPA targeting job opportunities and freelance work in Europe (base: Málaga, Spain).

---

## Static SEO (`index.html`)

The entry HTML file contains:

### Primary Meta Tags
- `<title>`, `description`, `keywords`, `author`, `robots`, `language`, `revisit-after`
- `robots`: `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`

### Theme Colors
- Light: `#f97316` (orange-500)
- Dark: `#fb923c` (orange-400)

### Open Graph (Facebook/LinkedIn)
- `og:type`, `og:url`, `og:site_name`, `og:title`, `og:description`, `og:image`
- `og:locale` = `en_US` + alternates `fr_FR`, `es_ES`

### Twitter Card
- Type: `summary_large_image`
- `twitter:creator`: `@melchiorjorda`

### Geographic Tags
- `geo.region`: `ES-MA` (Málaga)
- `geo.position` + `ICBM`: `36.721261; -4.421482`

### Hreflang (Multilingual)
- `en`, `fr`, `es`, `x-default` → all pointing to `https://melchior-jorda.online/`
  (Single-URL strategy — language switching is client-side)

### PWA
- `<link rel="manifest" href="/manifest.json">`

### JSON-LD Structured Data (4 entities)
1. **Person** — Melchior JORDA, jobTitle, sameAs (GitHub, LinkedIn), knowsAbout, knowsLanguage, address, alumniOf
2. **WebSite** — URL, name, publisher
3. **WebPage** — Homepage description
4. **ProfessionalService** — Web Development, Europe, multilingual

---

## Dynamic SEO (`MetaTags.vue`)

Each page component includes `<MetaTags>` with page-specific props.
Updates DOM on mount and whenever props change.

### Pages and their SEO config:

| Page | Title | URL |
|---|---|---|
| Home | `$t('home.title')` | `/` |
| Projects | `$t('projects.title')` | `/projects` |
| About | `$t('about.title')` | `/about` |
| Resume | `Resume & CV \| Melchior JORDA` | `/resume` |
| Contact | `Contact \| Melchior JORDA` | `/contact` |
| 404 | `404 - {notfound.title} \| Melchior JORDA` | `/404` |

### What MetaTags.vue injects/updates:
- Document title (with "Melchior JORDA" suffix if not present)
- `description`, `keywords`, `title` meta
- All OG + Twitter Card meta
- `<link rel="canonical">`
- Per-page JSON-LD `WebPage` (`data-page-sd` attribute for cleanup on navigation)

---

## SEO Files (`/public`)

| File | Purpose |
|---|---|
| `robots.txt` | Allow all crawlers |
| `sitemap.xml` | All 5 routes + static project URLs |
| `.htaccess` | Apache SPA rewrite (same as firebase.json rewrites) |

---

## SEO Configuration (`src/config/seo.config.js`)

Centralized constants (not yet fully wired into components — available for future use):
- Site URL, name, title, description, locale
- Social: Twitter handle, GitHub, LinkedIn
- Meta keywords, robots, verification codes (Google/Bing — currently empty)
- Geo: coordinates, city, region, country
- Theme colors
- Per-page title/description/path

---

## Target Keywords

From `README.md` and component keywords:

**Primary:**
- "junior web developer", "web developer Malaga", "Vue developer"
- "frontend developer", "JavaScript developer", "full-stack developer"

**Technical:**
- Vue.js, TypeScript, C Programming, École 42, PHP, Symfony

**Geographic:**
- "Malaga web developer", "web developer Spain", "remote frontend developer Europe"

---

## Notes

- No analytics currently integrated (GA4 / Matomo mentioned in README as next step)
- No cookie/consent banner
- OG image is `favicon.png` — not ideal for social sharing (should be a larger preview image)
- `googleSiteVerification` and `bingSiteVerification` in `seo.config.js` are empty strings
