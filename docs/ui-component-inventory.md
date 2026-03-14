# UI Component Inventory

**Generated:** 2026-03-13 | **Scan level:** Exhaustive

---

## Component Architecture

All components use **Vue 3 Options API** (not Composition API / `<script setup>`).
No component library — all UI is custom with TailwindCSS utilities.

---

## Shared Components (`src/components/`)

### Header.vue
**Category:** Layout / Navigation
**Path:** `src/components/Header.vue`

**Purpose:** Fixed top navigation bar, persistent across all routes.

**Features:**
- Glassmorphism effect (backdrop blur + opacity), adjusts on scroll
- Auto-hide on scroll down, reappear on scroll up (threshold: 50px)
- Active route highlighting with animated underline (desktop) / left bar (mobile)
- **Language switcher:** EN / FR / ES via flag buttons dropdown; persists in `localStorage` key `lang`
- **Theme toggle:** Light/dark mode via `<html class="dark">`; persists in `localStorage` key `theme`
- **Mobile menu:** Full-screen overlay at `top-[73px]`, contains all nav links + lang + theme
- Scroll container: listens on `#app` (not `window`) for scroll events

**State (data):**
| Property | Type | Default | Description |
|---|---|---|---|
| `currentLang` | String | `localStorage.lang \|\| 'en'` | Active locale |
| `isDark` | Boolean | `localStorage.theme === 'dark'` | Dark mode state |
| `isMobileMenuOpen` | Boolean | `false` | Mobile menu visibility |
| `showHeader` | Boolean | `true` | Header visibility (scroll-hide) |
| `lastScrollPosition` | Number | `0` | Last scroll Y position |
| `scrollThreshold` | Number | `50` | Min scroll before hiding header |
| `langMenuOpen` | Boolean | `false` | Desktop lang dropdown |
| `langMenuOpenMobile` | Boolean | `false` | Mobile lang dropdown |

**Key methods:**
- `handleScroll()` — hide/show header based on scroll direction
- `onLang(val)` — switch locale, update i18n, save to localStorage
- `toggleTheme()` — toggle dark class, save to localStorage
- `toggleMobileMenu()` — open/close mobile overlay (locks body scroll)

---

### Footer.vue
**Category:** Layout
**Path:** `src/components/Footer.vue`

**Purpose:** Bottom footer with links and CV download.

**Features:**
- Responsive layout: column on mobile, row on desktop
- Dynamic year (`new Date().getFullYear()`)
- CV download is **locale-aware**: serves `Melchior_Jorda_FullStack_FR/EN/ES.pdf` based on `$i18n.locale`
- Email link uses obfuscation technique (mailUser + mailHost joined at click)

**Links:** LinkedIn, GitHub, Download CV, Email

---

### MetaTags.vue
**Category:** SEO / Utility
**Path:** `src/components/MetaTags.vue`

**Purpose:** Dynamic SEO meta tag management per page. Renders no HTML (`<div></div>`).

**Props:**
| Prop | Type | Default |
|---|---|---|
| `title` | String | `'Melchior JORDA — Junior Web & Software Developer \| Portfolio'` |
| `description` | String | Full description |
| `keywords` | String | Basic keywords |
| `image` | String | `/favicon.png` |
| `url` | String | `''` |
| `type` | String | `'website'` |

**Injects/updates on mount + prop change:**
- `<title>` tag
- `<meta name="description/keywords/title">`
- Open Graph: `og:title`, `og:description`, `og:url`, `og:image`, `og:type`
- Twitter Card: `twitter:title`, `twitter:description`, `twitter:url`, `twitter:image`
- `<link rel="canonical">`
- JSON-LD `WebPage` structured data (`data-page-sd` attribute)

---

## Page Components (`src/pages/`)

### Home.vue
**Route:** `/`
**Loaded:** Eagerly (in router)

**Sections:**
1. **Hero** — h1 title + subtitle + CTA buttons (See Projects / Contact Me)
2. **Featured Projects** — grid of 3 hardcoded projects: `re-fresh-earth`, `minata-portfolio`, `so-long`

**Data:** imports `src/data/projects.json`, filters by `featuredIds` array.

---

### Projects.vue
**Route:** `/projects`
**Loaded:** Lazy

**Sections:**
- Category filter buttons (All / Websites / 42 School / Applications)
- **Websites section** — `v-show` based on filter, grid of website projects with thumbnails
- **42 School section** — École 42 C projects (no thumbnails, Repl.it links)
- **Applications section** — Apps with optional thumbnails

**Features:** Image lazy loading, `handleImageError` hides broken images.
**Data:** imports `src/data/projects.json`, filters by `category` field.

---

### About.vue
**Route:** `/about`
**Loaded:** Lazy

**Sections:**
- Introduction paragraph (from i18n `about.intro`)
- Skills grid (2×2): Frontend, Backend & Systems, Tools & Databases, Languages

---

### Resume.vue
**Route:** `/resume`
**Loaded:** Lazy

**Sections:**
- CV download button (locale-aware PDF)
- Profile summary
- Professional Experience (LQA Tester, NainVert, Web Dev Intern)
- Key Technical Projects — École 42 (Minishell, Philosophers, cub3D, C++ Modules)
- Hackathons (NASA Space Apps 2025 — 1st Prize)
- Technical Skills (6 categories)
- Education (École 42, ENI)
- Hobbies

---

### Contact.vue
**Route:** `/contact`
**Loaded:** Lazy

**Sections:**
- Contact cards: LinkedIn / Email (obfuscated, reveal on click) / Phone (obfuscated, reveal on click)
- Contact form (EmailJS integration)

**Form features:**
- Fields: name, email, message
- Honeypot anti-bot field (`website` hidden field)
- Loading state with spinner
- Success notification via Vue `<Teleport to="body">` (dismissible, auto-hides after 6s)

**EmailJS flow:**
1. `handleSubmit()` checks honeypot
2. Calls `emailjs.send(serviceID, templateID, params, publicKey)`
3. Params: `from_name`, `from_email`, `message`, `to_email`

---

### NotFound.vue
**Route:** `/:pathMatch(.*)*`
**Loaded:** Lazy

**Features:**
- Large decorative "404" text
- Back to Home + View Projects CTAs
- Quick links to About, Resume, Contact

---

## Design Patterns Used

| Pattern | Where | Description |
|---|---|---|
| Orange left accent bar | All cards | `absolute left-0 w-1 gradient-to-b`, opacity 0 → 1 on hover |
| Glass navbar | Header | backdrop-blur + rgba background, increases on scroll |
| Teleport notification | Contact.vue | Floating success toast outside form DOM |
| Obfuscated contact | Contact.vue, Footer.vue | Email/phone split into parts, assembled on click |
| Locale-aware CV | Footer.vue, Resume.vue | `/assets/Melchior_Jorda_FullStack_${code}.pdf` |
| Page transitions | App.vue | `opacity + translateY`, `out-in` mode |
