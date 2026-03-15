# Story 4.1: Création de la route `/42` et de la page `FortyTwo.vue`

Status: done

## Story

As a visitor (Thomas),
I want a dedicated page for 42 school projects accessible directly from the navigation,
So that I can explore Mel's technical depth without sifting through client projects.

## Acceptance Criteria

1. **Given** I am on any page of the site, **When** I look at the navigation header (desktop and mobile), **Then** a "Projets 42" link is visible and navigates to `/42`.

2. **Given** I navigate to `/42`, **When** the page loads, **Then** `FortyTwo.vue` renders with a page title, a brief explanation of what École 42 is (FR9), and the 8 existing 42 projects from `projects.json` (those with `category: "42"`) displayed as `ProjectCard` components.

3. **Given** the route `/42` in `src/main.js`, **When** defined, **Then** `FortyTwo.vue` is loaded lazily (`() => import('./pages/FortyTwo.vue')`) and placed BEFORE the `/:pathMatch(.*)*` catch-all route.

4. **Given** the page title, subtitle, and École 42 explanation, **When** rendered in any language, **Then** all text uses i18n keys (`fortyTwo.pageTitle`, `fortyTwo.pageSubtitle`, `fortyTwo.schoolTitle`, `fortyTwo.schoolExplanation`) in `en.json`, `fr.json`, `es.json`.

5. **Given** dark mode, **When** `FortyTwo.vue` renders, **Then** `dark:` Tailwind classes are applied throughout and contrast ≥ 4.5:1.

6. **Given** `seo.config.js`, **When** updated, **Then** the `/42` route has its own `title` and `description` entry in the `pages` object (English — consistent with existing pattern).

## Tasks / Subtasks

- [x] Task 1 — Ajouter la clé nav i18n dans les 3 locales (AC: 1)
  - [x] `fr.json`: `"nav.fortyTwo": "Projets 42"` (dans la section `"nav"`)
  - [x] `en.json`: `"nav.fortyTwo": "42 Projects"`
  - [x] `es.json`: `"nav.fortyTwo": "Proyectos 42"`

- [x] Task 2 — Ajouter les clés i18n `fortyTwo.*` dans les 3 locales (AC: 4)
  - [x] `fr.json` — nouveau bloc de premier niveau `"fortyTwo"` :
    - `"pageTitle": "Projets École 42"`
    - `"pageSubtitle": "Découvre les projets techniques réalisés à l'École 42 Málaga."`
    - `"schoolTitle": "C'est quoi l'École 42 ?"`
    - `"schoolExplanation": "L'École 42 est une formation en ingénierie logicielle sans cours magistraux ni professeurs. Les projets sont validés par les pairs, les cursus couvrent C/C++ systèmes, algorithmique, Unix, réseau et programmation graphique. Mel est au Cercle 4."`
  - [x] `en.json` — même structure :
    - `"pageTitle": "École 42 Projects"`
    - `"pageSubtitle": "Explore the technical projects built at École 42 Málaga."`
    - `"schoolTitle": "What is École 42?"`
    - `"schoolExplanation": "École 42 is a software engineering school with no lectures and no teachers. Projects are peer-validated, covering C/C++ systems, algorithms, Unix, networking, and graphics. Mel is at Circle 4."`
  - [x] `es.json` — même structure :
    - `"pageTitle": "Proyectos École 42"`
    - `"pageSubtitle": "Descubre los proyectos técnicos realizados en École 42 Málaga."`
    - `"schoolTitle": "¿Qué es la École 42?"`
    - `"schoolExplanation": "École 42 es una escuela de ingeniería de software sin clases ni profesores. Los proyectos son validados por pares y cubren sistemas C/C++, algoritmia, Unix, redes y programación gráfica. Mel está en el Círculo 4."`

- [x] Task 3 — Ajouter le lien nav dans `Header.vue` (AC: 1)
  - [x] Desktop nav (`<nav class="hidden lg:block">`): insérer `<li><router-link class="nav-link" to="/42">{{ $t('nav.fortyTwo') }}</router-link></li>` entre le lien `/projects` et le lien `/about`
  - [x] Mobile nav (liste dans le div `lg:hidden`): insérer le même lien avec `class="nav-link-mobile"` et `@click="closeMobileMenu"`, entre `/projects` et `/about`

- [x] Task 4 — Ajouter la route `/42` dans `src/main.js` (AC: 3)
  - [x] Insérer avant le catch-all `/:pathMatch(.*)*` :
    ```js
    { path: '/42', component: () => import('./pages/FortyTwo.vue'), meta: { titleKey: 'fortyTwo.pageTitle' } },
    ```
  - [x] Ne pas modifier les autres routes ni le `router.afterEach`

- [x] Task 5 — Créer `src/pages/FortyTwo.vue` (AC: 2, 4, 5)
  - [x] Options API uniquement — ordre `name → components → data() → computed → methods`
  - [x] Importer `MetaTags`, `ProjectCard`, et `projectsData` depuis `../data/projects.json`
  - [x] `computed`: `fortyTwoProjects()` = `projectsData.projects.filter(p => p.category === '42')`
  - [x] Template : `<MetaTags>` avec title et description, h1 titre, p sous-titre, section École 42 (h2 + paragraphe), grille de `<ProjectCard>` pour chaque projet
  - [x] Dark mode : `dark:` classes sur tous les éléments texte et conteneurs (même pattern que `Contact.vue` ou `Projects.vue`)
  - [x] Grille responsive : `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6`

- [x] Task 6 — Mettre à jour `seo.config.js` (AC: 6)
  - [x] Ajouter dans `pages` :
    ```js
    fortyTwo: {
      title: '42 Projects | Melchior JORDA',
      description: 'Explore Mel\'s technical projects from École 42 Málaga: systems programming in C/C++, algorithms, Unix, and more.',
      path: '/42'
    }
    ```

- [x] Task 7 — Validation finale (AC: 1–6)
  - [x] Naviguer vers `/42` depuis chaque page via le lien nav desktop et mobile
  - [x] Vérifier affichage des 8 projets 42 (get-next-line, ft-printf, libft, personal-libft, push-swap, so-long, philosophers, minishell)
  - [x] Vérifier dark mode + light mode
  - [x] Changer de langue (en/fr/es) et vérifier que tous les textes changent
  - [x] `npm run build` — 0 erreur (75 modules avec le nouveau lazy chunk FortyTwo)

## Dev Notes

### CRITIQUE — Fichiers existants à modifier (ne pas recréer)

**`src/main.js`** — Routes définies INLINE dans ce fichier (pas de fichier `src/router/index.js`). Pattern actuel :
```js
const routes = [
  { path: '/', component: Home, meta: { titleKey: 'home.title' } },
  { path: '/projects', component: () => import('./pages/Projects.vue'), ... },
  // ...
  { path: '/:pathMatch(.*)*', component: () => import('./pages/NotFound.vue'), ... }
]
```
Ajouter la route `/42` AVANT le catch-all.

**`src/components/Header.vue`** — Nav desktop et nav mobile sont deux listes `<ul>` séparées dans le même fichier. Le lien 42 DOIT être ajouté dans les DEUX. Structure du desktop nav :
```html
<ul class="flex gap-4 xl:gap-6 items-center">
  <li><router-link class="nav-link" to="/">...</router-link></li>
  <li><router-link class="nav-link" to="/projects">...</router-link></li>
  <!-- ← INSÉRER ICI le lien /42 -->
  <li><router-link class="nav-link" to="/about">...</router-link></li>
  ...
</ul>
```
Mobile : même position, avec `class="nav-link-mobile"` et `@click="closeMobileMenu"`.

### `FortyTwo.vue` — Structure cible

```vue
<template>
  <section>
    <MetaTags
      title="$t('fortyTwo.pageTitle') + ' | Melchior JORDA'"
      :description="$t('fortyTwo.pageSubtitle')"
      keywords="École 42, ..."
      url="/42"
    />
    <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-primary dark:text-accent-50">
      {{ $t('fortyTwo.pageTitle') }}
    </h1>
    <p class="mt-2 sm:mt-3 text-sm sm:text-base text-slate-600 dark:text-accent-200">
      {{ $t('fortyTwo.pageSubtitle') }}
    </p>

    <!-- Section École 42 -->
    <div class="mt-6 p-5 bg-accent-50 dark:bg-slate-800 rounded-lg border-l-4 border-orange-500">
      <h2 class="text-lg font-semibold text-primary dark:text-accent-50">
        {{ $t('fortyTwo.schoolTitle') }}
      </h2>
      <p class="mt-2 text-sm text-slate-600 dark:text-accent-200">
        {{ $t('fortyTwo.schoolExplanation') }}
      </p>
    </div>

    <!-- Grille projets 42 -->
    <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <ProjectCard
        v-for="project in fortyTwoProjects"
        :key="project.id"
        :project="project"
      />
    </div>
  </section>
</template>

<script>
import MetaTags from '@/components/MetaTags.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import projectsData from '../data/projects.json'

export default {
  name: 'FortyTwo',
  components: { MetaTags, ProjectCard },
  data() { return {} },
  computed: {
    fortyTwoProjects() {
      return projectsData.projects.filter(p => p.category === '42')
    }
  }
}
</script>
```

### 42 Projects existants dans `projects.json` (category: "42")

8 projets déjà présents — leurs clés i18n `projects.items.{id}.title` et `.description` existent déjà dans les 3 locales :

| id | GitHub |
|----|--------|
| `get-next-line` | github.com/M-Jorda/get_next_line |
| `ft-printf` | github.com/M-Jorda/ft_printf |
| `libft` | github.com/M-Jorda/libft.a |
| `personal-libft` | github.com/M-Jorda/personal_libft |
| `push-swap` | github.com/M-Jorda/push_swap |
| `so-long` | github.com/M-Jorda/so_long |
| `philosophers` | github.com/M-Jorda/philosophers |
| `minishell` | github.com/M-Jorda/Minishell |

Ces projets n'ont PAS de `clientContext` / `result` / `status` — `ProjectCard.vue` gère ça avec `$te()` (test-existence), ils s'afficheront proprement avec titre + description + tags tech + lien GitHub.

### `ProjectCard.vue` — Comportement pour projets 42

`ProjectCard.vue` gère déjà les projets 42 proprement :
- `clientContext` : `$te(key)` → retourne null si pas de clé i18n → section masquée (`v-if="clientContext"`)
- `projectResult` : idem → masqué
- `status` : pas de champ → badge absent (`v-if="project.status"`)
- Contact CTA : masqué car `v-if="project.category === 'client'"` — pas affiché pour les projets 42
- GitHub link : affiché si `project.github` présent → ✅ tous les projets 42 ont un lien GitHub

**Ne pas modifier `ProjectCard.vue`** — il est déjà compatible.

### Architecture Constraints (OBLIGATOIRES)

- **Options API uniquement** — ordre `name → components → data() → computed → watch → methods → mounted`
- **Pas de `<script setup>`** — même règle
- **i18n obligatoire** — toutes les chaînes via `$t()` — 3 locales
- **Tailwind uniquement** — pas de style inline sauf valeur dynamique calculée
- **Pages dans `src/pages/`** — PAS `src/views/`
- **Routes dans `src/main.js`** — PAS de fichier `src/router/index.js` séparé
- **Import alias** : `@/` → `src/` (configuré dans vite.config.js)

### i18n — Hiérarchie obligatoire

```json
// Structure actuelle dans locales/*.json
{
  "nav": {
    "home": "...",
    "projects": "...",
    "fortyTwo": "..."   ← AJOUTER ici
  },
  "fortyTwo": {         ← NOUVEAU bloc de premier niveau
    "pageTitle": "...",
    "pageSubtitle": "...",
    "schoolTitle": "...",
    "schoolExplanation": "..."
  }
}
```
Jamais de clés à plat comme `"fortyTwoPageTitle"`. Toujours imbriqué.

### Scope — Ce qui N'EST PAS dans cette story

- ❌ `ProjectVideo.vue` — c'est Story 4.2
- ❌ Vidéos locales dans `/public/assets/videos/` — c'est Story 4.2
- ❌ Modification du schéma `projects.json` — les projets 42 ont déjà leur schéma de base
- ❌ Mise à jour `sitemap.xml` — c'est Story 6.2
- ❌ GA4 — c'est Story 6.1
- ❌ `About.vue` ou `Resume.vue` — pas dans le scope

### Learnings des stories précédentes

- **Build target** : `npm run build` doit rester à 0 erreur. L'ajout d'un lazy chunk (`FortyTwo.vue`) va créer un nouveau chunk Vite — le nombre total de modules passera de ~74 à ~75+.
- **Dark mode** : utiliser les classes `dark:slate-800`, `dark:text-accent-50`, `dark:text-accent-200` comme dans `Contact.vue`. Jamais de `navy-*` dans les classes Tailwind.
- **MetaTags** : passer le `title` avec le nom propre de la page (le composant ajoute automatiquement " | Melchior JORDA" si absent). Passer `url="/42"` pour le canonical.
- **`$t('nav.cta')`** : "Devis gratuit" — le CTA orange dans la nav pointe déjà vers `/contact`. Ne pas y toucher.
- **Navigation active state** : les classes `.nav-link.router-link-active` et `.nav-link-exact-active` sont déjà gérées en CSS scoped dans `Header.vue`. Le lien `/42` sera automatiquement mis en surbrillance quand actif.
- **Mobile menu** : le `@click="closeMobileMenu"` est OBLIGATOIRE sur chaque lien du menu mobile pour fermer le menu après navigation (pattern établi par tous les autres liens mobiles).

### Project Structure Notes

Fichiers à modifier / créer :
- `src/pages/FortyTwo.vue` — CRÉÉ (nouveau)
- `src/main.js` — MODIFIÉ (ajout route `/42`)
- `src/components/Header.vue` — MODIFIÉ (ajout lien nav desktop + mobile)
- `src/config/seo.config.js` — MODIFIÉ (ajout entrée `fortyTwo`)
- `src/locales/fr.json` — MODIFIÉ (ajout `nav.fortyTwo` + bloc `fortyTwo`)
- `src/locales/en.json` — MODIFIÉ (idem)
- `src/locales/es.json` — MODIFIÉ (idem)

Aucun nouveau composant réutilisable — `FortyTwo.vue` est une page, non un composant.

### References

- [Source: epics.md — Story 4.1 ACs] (route /42, FortyTwo.vue, lazy loading, i18n, dark mode, seo.config.js)
- [Source: epics.md — FR9] (explication École 42 : no lectures, peer validation, C/C++ systems, algos, Unix)
- [Source: architecture.md — Structure Patterns] (pages dans `src/pages/`, routes inline dans `src/main.js`, alias `@/`)
- [Source: architecture.md — Vue Options API order] (name → components → data → computed → watch → methods → mounted)
- [Source: architecture.md — Naming Patterns] (PascalCase composants, i18n hiérarchie imbriquée)
- [Source: architecture.md — Enforcement] (Options API, i18n 3 locales, Tailwind dark mode, no dep > 50kb)
- [Source: src/main.js] (pattern routes existant — lazy imports, meta.titleKey, router.afterEach)
- [Source: src/components/Header.vue] (structure nav desktop/mobile, closeMobileMenu pattern, nav-link/nav-link-mobile classes)
- [Source: src/components/ProjectCard.vue] (compatible 42 projets via $te(), no modification needed)
- [Source: src/config/seo.config.js] (structure pages — title, description, path)
- [Source: src/data/projects.json] (8 projets category="42" existants avec leurs IDs)
- [Source: story 3.2] (dark mode patterns validés : dark:slate-800, dark:text-accent-50, dark:text-accent-200 ; focus ring ; build 0 erreur)
- [Source: story 3.1] (74 modules build baseline ; pattern MetaTags avec url prop)

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

### Completion Notes List

- Toutes les clés i18n ajoutées dans les 3 locales (fr/en/es) : `nav.fortyTwo` + bloc `fortyTwo.*`
- Lien `/42` inséré dans la nav desktop ET mobile de `Header.vue`, avec `@click="closeMobileMenu"` sur le lien mobile
- Route `/42` ajoutée dans `src/main.js` en lazy loading avant le catch-all
- `FortyTwo.vue` créée en Options API : filtre les 8 projets `category === '42'`, dark mode complet, grille responsive
- `seo.config.js` mis à jour avec l'entrée `fortyTwo`
- Build réussi : 75 modules (nouveau chunk `FortyTwo-3OFQfxTb.js`), 0 erreur

### File List

- `src/pages/FortyTwo.vue` (créé)
- `src/main.js` (modifié)
- `src/components/Header.vue` (modifié)
- `src/config/seo.config.js` (modifié)
- `src/locales/fr.json` (modifié)
- `src/locales/en.json` (modifié)
- `src/locales/es.json` (modifié)

### Change Log

- 2026-03-15 : Story 4.1 implémentée — route `/42`, page `FortyTwo.vue`, nav header, i18n 3 locales, seo.config.js
- 2026-03-15 : Code review — 2 LOW fixes : keywords MetaTags en anglais (cohérence SEO), `data()` vide supprimé
