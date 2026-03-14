# Internationalization (i18n)

**Generated:** 2026-03-13 | Source: `src/i18n.js`, `src/locales/`

---

## Overview

The site supports 3 languages: **English (en)**, **French (fr)**, **Spanish (es)**.
Language preference is persisted in `localStorage` key `lang`.

---

## Setup (`src/i18n.js`)

```js
const i18n = createI18n({
  legacy: false,          // Composition API mode
  globalInjection: true,  // $t() available in all components
  locale: saved || 'en',  // From localStorage or default 'en'
  fallbackLocale: 'en',
  messages: { en, fr, es }
})
```

---

## Language Switching

Triggered in `Header.vue` via `onLang(val)`:
1. Sets `i18n.global.locale.value = val`
2. Sets `document.documentElement.lang = val`
3. Saves `localStorage.setItem('lang', val)`
4. Closes language dropdown

---

## Translation File Structure

### Top-level keys in each locale:

| Key | Description |
|---|---|
| `header` | `job_title` |
| `nav` | Navigation links: `home`, `projects`, `about`, `resume`, `contact` |
| `home` | `title`, `subtitle`, `see_projects`, `contact_me` |
| `footer` | `download_cv`, `linkedin` |
| `theme` | `dark`, `light`, `dark_mode`, `light_mode` |
| `contact` | Form labels, card titles, success message, obfuscation labels |
| `projects` | `title`, `description`, `featured`, `view_live`, `try_replit`, `categories`, `items` |
| `about` | `title`, `intro`, `skills_title`, `skills.{frontend\|backend\|tools\|languages}` |
| `resume` | `title`, `download`, `profile`, `experience`, `projects`, `hackathons`, `skills`, `education`, `hobbies` |
| `notfound` | `title`, `message`, `back_home`, `view_projects`, `looking_for` |

### Projects items key (nested):
```json
"projects": {
  "items": {
    "{project-id}": {
      "title": "...",
      "description": "..."
    }
  }
}
```

---

## Usage in Components

```vue
<!-- Template -->
{{ $t('home.title') }}
{{ $t(`projects.items.${project.id}.title`) || project.title }}

<!-- Script (Options API) -->
this.$t('contact.success_title')
this.$i18n.locale  // current locale string
```

---

## Locale-Aware Features

| Feature | How |
|---|---|
| CV download (Footer + Resume) | `map[this.$i18n.locale]` → `FR/EN/ES` → `/assets/Melchior_Jorda_FullStack_${code}.pdf` |
| Document language attribute | `document.documentElement.lang = val` on switch |
| Page title | `router.afterEach` calls `i18n.global.t(to.meta.titleKey)` |
| HTML `lang` in index.html | Set to `en` initially (updated dynamically) |

---

## Notes

- All 3 locale files must have the same keys to avoid vue-i18n warnings
- Fallback locale is `en` — missing keys in fr/es will silently use English
- The `en.json` file is the canonical/most complete reference
