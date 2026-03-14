# Projects Data Reference

**Generated:** 2026-03-13 | Source: `src/data/projects.json`

---

## Data Schema

Each project object in `projects.json` has:

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | String | ✓ | Unique identifier, used as i18n key (`projects.items.{id}`) |
| `title` | String | ✓ | Fallback title if i18n key not found |
| `description` | String | ✓ | Fallback description if i18n key not found |
| `technologies` | String[] | ✓ | Tech tags displayed on card |
| `category` | String | ✓ | `websites` \| `42` \| `applications` |
| `github` | String | — | GitHub repo URL |
| `live` | String | — | Live URL (absolute or relative path in /public) |
| `thumbnail` | String | — | Image path for websites and applications |

---

## Projects by Category

### Websites (7)

| ID | Title | Technologies | Live | GitHub |
|---|---|---|---|---|
| `minata-portfolio` | From MY Window - Minata Sartori | HTML, CSS, JS, SEO | `/minata/index.html` | M-Jorda/Minata |
| `trixie-conciergerie` | Trixie Conciergerie | HTML, CSS, JS, Schema.org | `/trixie/index.html` | M-Jorda/Trixie |
| `miss-boat` | Miss Boat | Vue.js, Vue Router, Tailwind, Vite | `/miss-boat/index.html` | M-Jorda/miss_boat |
| `elsa-psychologue` | Elsa Psychologue | HTML, CSS, JS, Firebase | elsa-psychologue.firebaseapp.com | M-Jorda/Elsa_psychologue |
| `les-planches` | Les Planches | HTML, CSS, JS, Animations | `/les-planches/index.html` | M-Jorda/Les-Planches |
| `re-fresh-earth` | Re-Fresh Earth | AI, ML, Satellite Data | re-fresh.earth | — |
| `portfolio-v034` | Portfolio v0.3.4 | HTML, CSS, JS | `/version_0.3.4/index.html` | — |

### 42 School Projects (8)

| ID | Title | Technologies | Repl.it |
|---|---|---|---|
| `get-next-line` | get_next_line | C | ✓ |
| `ft-printf` | ft_printf | C | ✓ |
| `libft` | Libft | C | — |
| `personal-libft` | Personal Libft | C | — |
| `push-swap` | push_swap | C, Algorithms | — |
| `so-long` | so_long | C, MiniLibX, Graphics | — |
| `philosophers` | Philosophers | C, pthreads, Mutexes | — |
| `minishell` | Minishell | C, Unix, Shell | — |

### Applications (5)

| ID | Title | Technologies | Live | Thumbnail |
|---|---|---|---|---|
| `series-tracker` | Series Tracker | HTML, CSS, JS | — | — |
| `enchere` | Enchere (Auction Site) | Java, HTML, Bootstrap, JS | — | — |
| `random-rgb` | Random RGB | HTML, CSS, JS | `/projects/random-rgb/` | ✓ |
| `form-with-regex` | Form with Regex | HTML, CSS, JS, Regex | `/projects/form-with-regex/` | ✓ |
| `random-password` | Random Password | HTML, CSS, JS | `/projects/random-password/` | ✓ |

---

## Featured Projects (Home page)

Hardcoded in `Home.vue` data:
```js
featuredIds: ['re-fresh-earth', 'minata-portfolio', 'so-long']
```

---

## How Projects Are Displayed

1. **Title/Description:** The component first tries `$t('projects.items.{project.id}.title')`. If empty, falls back to `project.title` from JSON.
2. **Images:** `<img loading="lazy" @error="handleImageError">` — hides broken images gracefully.
3. **Links:** Conditional rendering — `View Live` shows if `project.live`, `GitHub` shows if `project.github`, `Try on Repl.it` shows for category `42` with live link.
4. **Hosted projects** (Minata, Trixie, Miss Boat, Les Planches): full static sites in `public/`, served as relative paths.

---

## Adding a New Project

1. Add entry to `src/data/projects.json`
2. Add i18n keys to all 3 locales (`src/locales/en.json`, `fr.json`, `es.json`) under `projects.items.{id}`
3. If thumbnail: place image in `public/projects/{id}/thumbnail.png` (or appropriate path)
4. If hosted site: place static files in `public/{project-folder}/`
5. Category must be one of: `websites`, `42`, `applications`
