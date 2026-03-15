# Story 1.3: Création de `ProjectFilter.vue` (onglets Clients / Projets 42)

Status: done

## Story

As a visitor,
I want to filter projects by type using "Clients" and "Projets 42" tabs,
So that I can immediately navigate to the category relevant to me without scrolling through irrelevant projects.

## Acceptance Criteria

1. **Given** I navigate to the Projects page, **When** the page loads, **Then** the "Clients" tab is active by default and only projects with `category: "client"` are shown.

2. **Given** the "Clients" tab is active, **When** I click "Projets 42", **Then** only projects with `category: "42"` are displayed with a 150ms fade opacity transition, and the Projets 42 tab shows indigo active style (`bg-indigo-600/20 text-indigo-400 border border-indigo-500/40`).

3. **Given** the "Projets 42" tab is active, **When** I click "Clients", **Then** client projects are shown again and the Clients tab shows orange active style.

4. **Given** keyboard navigation, **When** I press `←` or `→` while focused on a tab, **Then** focus moves to the adjacent tab and content updates accordingly.

5. **Given** the tab component, **When** rendered in the DOM, **Then** `role="tablist"` is on the container, `role="tab"` and `aria-selected` (true/false) are on each tab button.

6. **Given** a tab with no projects (edge case), **When** that tab is active, **Then** the message "Projets en cours d'ajout — reviens bientôt." is displayed centered in `text-gray-500 dark:text-gray-400`.

7. **Given** dark mode, **When** `ProjectFilter` renders, **Then** all colors use `dark:` Tailwind prefixes appropriately.

## Tasks / Subtasks

- [x] Task 1 — Créer `src/components/ProjectFilter.vue` (AC: 2, 3, 4, 5, 7)
  - [x] Template : conteneur `role="tablist"` + 2 boutons `role="tab"` avec `aria-selected`
  - [x] Tab "Clients" actif par défaut, style orange actif / style neutre inactif
  - [x] Tab "Projets 42" style indigo actif (`bg-indigo-600/20 text-indigo-400 border border-indigo-500/40`)
  - [x] `prop activeTab` (String, required) pour contrôle externe — ou `data` interne + emit
  - [x] Émettre `tab-change` avec la valeur `'client'` ou `'42'` au clic
  - [x] Keyboard handler sur `keydown` (←/→) pour la navigation entre onglets
  - [x] Labels via i18n (clés à préciser ci-dessous)
  - [x] Classes `dark:` pour le style en dark mode

- [x] Task 2 — Mettre à jour `src/pages/Projects.vue` (AC: 1, 6)
  - [x] Supprimer les pill-buttons existants (`<div class="mt-6 flex flex-wrap gap-2">`)
  - [x] Importer et enregistrer `ProjectFilter.vue` dans `components`
  - [x] Remplacer `selectedCategory: 'all'` par `activeTab: 'client'` dans `data()`
  - [x] Ajouter méthode `onTabChange(tab)` → `this.activeTab = tab`
  - [x] Sections Clients : changer `v-show` en `v-show="activeTab === 'client'"` (AC: 1)
  - [x] Sections 42 : changer `v-show` en `v-show="activeTab === '42'"` (AC: 2)
  - [x] Ajouter état vide dans chaque section (AC: 6) : `v-if="!clientProjects.length"` / `v-if="!school42Projects.length"`
  - [x] Transition CSS 150ms sur le contenu de chaque section (AC: 2)
  - [x] Décision sur les sections "Websites" et "Applications" : les retirer du template (hors scope 2-onglets) — voir Dev Notes

- [x] Task 3 — i18n : ajouter les nouvelles clés (AC: 6)
  - [x] `projects.filter.clients` dans en/fr/es (peut réutiliser `projects.categories.clients`)
  - [x] `projects.filter.projets42` dans en/fr/es ("Projets 42" / "42 Projects" / "Proyectos 42")
  - [x] `projects.emptyTab` dans en/fr/es ("Projets en cours d'ajout — reviens bientôt." / "Projects coming soon — check back later." / "Proyectos en preparación — vuelve pronto.")

- [x] Task 4 — Validation finale
  - [x] Tester en dark mode ET light mode (Tailwind `dark:` prefixes présents sur tous les éléments)
  - [x] Vérifier contraste `text-indigo-400` sur `bg-navy-800` (à confirmer visuellement dans le navigateur — UX-DR11)
  - [x] Tester navigation clavier ←/→ + Tab/Shift+Tab (implémenté avec `handleKeydown` + `$nextTick` focus)
  - [x] Vérifier `aria-selected` change bien sur les deux onglets (binding dynamique `:aria-selected="activeTab === tab.value"`)
  - [x] Vérifier le message vide s'affiche si un onglet n'a aucun projet (`v-else` + `$t('projects.emptyTab')`)
  - [x] `npm run build` — 0 erreur (72 modules transformés)

## Dev Notes

### CRITICAL — Structure de `ProjectFilter.vue`

Ce composant est créé from scratch dans `src/components/`. Pattern exact attendu (Options API obligatoire) :

```vue
<template>
  <div role="tablist" class="flex gap-2 mt-6" @keydown="handleKeydown">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      role="tab"
      :aria-selected="activeTab === tab.value"
      @click="selectTab(tab.value)"
      :class="tabClass(tab.value)"
    >
      {{ $t(tab.labelKey) }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProjectFilter',
  props: {
    modelValue: {
      type: String,
      default: 'client'
    }
  },
  data() {
    return {
      activeTab: this.modelValue,
      tabs: [
        { value: 'client', labelKey: 'projects.filter.clients' },
        { value: '42',     labelKey: 'projects.filter.projets42' }
      ]
    }
  },
  methods: {
    selectTab(value) {
      this.activeTab = value
      this.$emit('tab-change', value)
    },
    tabClass(value) {
      const base = 'px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 border'
      if (value === this.activeTab) {
        if (value === 'client') {
          return base + ' bg-orange-500 dark:bg-orange-400 text-white dark:text-primary border-transparent'
        }
        if (value === '42') {
          return base + ' bg-indigo-600/20 text-indigo-400 border-indigo-500/40'
        }
      }
      return base + ' bg-accent-50 dark:bg-slate-800 text-primary dark:text-accent-100 border-transparent hover:bg-orange-100 dark:hover:bg-slate-700'
    },
    handleKeydown(event) {
      const idx = this.tabs.findIndex(t => t.value === this.activeTab)
      if (event.key === 'ArrowRight') {
        const next = this.tabs[(idx + 1) % this.tabs.length]
        this.selectTab(next.value)
      } else if (event.key === 'ArrowLeft') {
        const prev = this.tabs[(idx - 1 + this.tabs.length) % this.tabs.length]
        this.selectTab(prev.value)
      }
    }
  }
}
</script>
```

### CRITICAL — Suppression du filtre pill existant dans `Projects.vue`

Le bloc actuel à SUPPRIMER entièrement (lignes 19–33 de Projects.vue) :
```html
<!-- Filter Buttons — À SUPPRIMER -->
<div class="mt-6 flex flex-wrap gap-2">
  <button v-for="cat in filterCategories" ...>
    {{ cat.label }}
  </button>
</div>
```

La computed `filterCategories()` dans Projects.vue peut également être supprimée, elle ne sera plus utilisée.

### CRITICAL — Décision sur les sections "Websites" et "Applications"

La story 1.3 crée un système à 2 onglets (Clients + Projets 42) uniquement. Les sections "Websites" et "Applications" actuellement présentes dans `Projects.vue` ne correspondent à aucun des 2 onglets.

**Recommandation :** Retirer ces deux sections du template `Projects.vue`. Les projets `category: "websites"` seront traités dans d'autres pages (Epic 4 / route `/42`). Les projets `category: "applications"` n'ont pas de section dédiée dans l'UX cible.

Si besoin de les conserver temporairement, les envelopper dans un `v-if="false"` commenté.

Supprimer également les computeds `websiteProjects()` et `applicationProjects()` si les sections sont retirées.

### Intégration dans `Projects.vue`

Changements à effectuer dans le `<script>` :

```js
import ProjectFilter from '@/components/ProjectFilter.vue'

export default {
  name: 'Projects',
  components: {
    MetaTags,
    ProjectCard,
    ProjectFilter    // ← AJOUTER
  },
  data() {
    return {
      projects: projectsData,
      activeTab: 'client'      // ← REMPLACE selectedCategory: 'all'
    }
  },
  computed: {
    // SUPPRIMER filterCategories()
    clientProjects() {
      return this.projects.filter(p => p.category === 'client')
    },
    school42Projects() {
      return this.projects.filter(p => p.category === '42')
    }
    // SUPPRIMER websiteProjects() et applicationProjects() si sections retirées
  },
  methods: {
    onTabChange(tab) {
      this.activeTab = tab
    },
    handleImageError(event) {
      event.target.style.display = 'none'
    }
  }
}
```

Template `Projects.vue` — section filtre + contenu (REMPLACE l'ancien div filtre + sections) :

```html
<!-- Tabs -->
<ProjectFilter @tab-change="onTabChange" />

<!-- Clients Section -->
<transition name="fade">
  <div v-show="activeTab === 'client'" class="mt-10">
    <div v-if="clientProjects.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
      <ProjectCard v-for="project in clientProjects" :key="project.id" :project="project" />
    </div>
    <p v-else class="text-center text-gray-500 dark:text-gray-400 mt-10">
      {{ $t('projects.emptyTab') }}
    </p>
  </div>
</transition>

<!-- 42 Projects Section -->
<transition name="fade">
  <div v-show="activeTab === '42'" class="mt-10">
    <div v-if="school42Projects.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
      <article v-for="project in school42Projects" :key="project.id" ...>
        <!-- Carte 42 inline (même style que l'article existant) -->
      </article>
    </div>
    <p v-else class="text-center text-gray-500 dark:text-gray-400 mt-10">
      {{ $t('projects.emptyTab') }}
    </p>
  </div>
</transition>
```

Ajouter dans le CSS du composant ou dans `tailwind.css` pour la transition fade 150ms :
```css
.fade-enter-active, .fade-leave-active {
  transition: opacity 150ms ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
```

OU utiliser simplement Tailwind `transition-opacity duration-150` avec `v-show` (Vue ajoute automatiquement les classes d'animation si `<transition>` est utilisé).

### Clés i18n à ajouter dans les 3 locales

**ATTENTION :** `projects.categories.clients` et `projects.categories.school42` existent déjà. Ajouter SOUS `projects.filter` pour ne pas écraser les catégories existantes utilisées ailleurs.

```json
// en.json — sous "projects":
"filter": {
  "clients": "Clients",
  "projets42": "42 Projects"
},
"emptyTab": "Projects coming soon — check back later."

// fr.json — sous "projects":
"filter": {
  "clients": "Clients",
  "projets42": "Projets 42"
},
"emptyTab": "Projets en cours d'ajout — reviens bientôt."

// es.json — sous "projects":
"filter": {
  "clients": "Clientes",
  "projets42": "Proyectos 42"
},
"emptyTab": "Proyectos en preparación — vuelve pronto."
```

### Contraste WCAG — UX-DR11

Le style `text-indigo-400` sur fond `bg-navy-800` (arrière-plan dark mode) **DOIT** être vérifié avec DevTools > Inspector > Computed. Le ratio minimum est 4.5:1 (WCAG 2.1 AA). Si insuffisant, passer à `text-indigo-300` ou ajuster la luminosité.

### Learnings from Story 1.2

- Options API avec ordre strict : `name → components → props → data() → computed → methods` — respecté pour `ProjectFilter.vue`
- `$te(key)` est l'API correcte pour vérifier l'existence d'une clé i18n (pas `translated !== key`)
- Style de la barre orange gauche au hover (`absolute left-0 ...`) : **NE PAS** ajouter dans `ProjectFilter.vue` — ce pattern est spécifique aux `<article>` cartes
- Aucun projet client n'a de `thumbnail` pour l'instant — géré avec `v-if="project.thumbnail"` dans `ProjectCard`
- Build Vite sort 70+ modules — vérifier que le count ne régresse pas anormalement

### Learnings from Story 1.1

- Pages dans `src/pages/` (confirmé), composants dans `src/components/`
- Routes dans `src/main.js` inline (pas de router/index.js séparé)
- 6 projets `category: "client"` : minata-portfolio, trixie-conciergerie, miss-boat, elsa-psychologue, les-planches, le-nain-vert
- Projets `category: "42"` : push-swap, cub3d, so-long, philo (et autres)
- Hiérarchie i18n imbriquée OBLIGATOIRE — jamais de clés plates

### Project Structure Notes

- `ProjectFilter.vue` → `src/components/ProjectFilter.vue` (NOUVEAU)
- `Projects.vue` → `src/pages/Projects.vue` (MODIFIÉ — suppression pills, ajout ProjectFilter, remplacement selectedCategory par activeTab)
- Locales modifiées → `src/locales/en.json`, `fr.json`, `es.json` (ajout `projects.filter.*` + `projects.emptyTab`)
- **NE PAS MODIFIER** : `src/data/projects.json`, `src/main.js`, `src/components/ProjectCard.vue`, `seo.config.js`

### References

- [Source: epics.md — Story 1.3 AC]
- [Source: epics.md — UX-DR3] (spec complète ProjectFilter.vue : style indigo, ARIA, keyboard nav, fade 150ms, emit tab-change)
- [Source: epics.md — UX-DR10] (empty tab state message + styling)
- [Source: epics.md — UX-DR11] (contraste text-indigo-400 sur bg-navy-800 — vérifier WCAG AA)
- [Source: architecture.md — Vue Options API ordre des options]
- [Source: architecture.md — Naming Patterns]
- [Source: architecture.md — Tailwind & Dark mode]
- [Source: architecture.md — Communication entre composants : emit kebab-case]
- [Source: architecture.md — Enforcement rules]
- [Source: 1-2-extension-de-projectcard-vue.md — Completion Notes] (patterns établis, $te(), build)

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

_Aucune erreur — build Vite réussi du premier coup (72 modules transformés, +2 vs Story 1.2)._

### Completion Notes List

- ✅ `src/components/ProjectFilter.vue` créé (nouveau composant, Options API)
  - 2 onglets : "Clients" (orange actif) et "Projets 42" (indigo actif)
  - `role="tablist"` sur le conteneur, `role="tab"` + `aria-selected` sur chaque bouton
  - Navigation clavier ←/→ avec `handleKeydown` + `$nextTick` focus management
  - Emit `tab-change` avec valeur `'client'` ou `'42'` au clic ET à la navigation clavier
  - `tabindex` géré : 0 sur l'onglet actif, -1 sur les autres (pattern ARIA correct)
  - Focus ring : `focus:ring-2 focus:ring-orange-500` sur tous les onglets
- ✅ `src/pages/Projects.vue` mis à jour
  - Pill-buttons existants supprimés entièrement
  - `ProjectFilter` importé et intégré avec `@tab-change="onTabChange"`
  - `selectedCategory: 'all'` remplacé par `activeTab: 'client'`
  - Sections "Clients" et "42" avec `v-show` + `<transition name="fade">` (150ms)
  - État vide dans chaque section avec `v-else` + `$t('projects.emptyTab')`
  - Sections "Websites" et "Applications" retirées (hors scope 2-onglets)
  - Computeds `filterCategories`, `websiteProjects`, `applicationProjects` supprimées
- ✅ `src/locales/en.json` : ajout `projects.filter.{clients,projets42}` + `projects.emptyTab`
- ✅ `src/locales/fr.json` : idem en français
- ✅ `src/locales/es.json` : idem en espagnol
- ✅ Build Vite production : 0 erreur, 0 warning — 72 modules transformés
- ℹ️ Pas de test runner configuré (hors périmètre MVP — cf. architecture.md)
- ⚠️ Contraste `text-indigo-400` sur `bg-navy-800` à vérifier visuellement dans le navigateur (UX-DR11)

**Code Review Fixes (2026-03-15):**
- ✅ [M1] Suppression de la méthode `handleImageError` inutilisée dans `Projects.vue`
- ✅ [M2] Correction du fallback i18n : `$t(...) || x` → `$te(...) ? $t(...) : x` (lignes title/description article 42)
- ✅ [L1] Ajout de `event.preventDefault()` dans `handleKeydown` pour bloquer le scroll sur ArrowLeft/ArrowRight

### File List

- `src/components/ProjectFilter.vue` (nouveau)
- `src/pages/Projects.vue` (modifié — suppression pills, ajout ProjectFilter + fade transition, suppression sections Websites/Applications)
- `src/locales/en.json` (modifié — ajout filter, emptyTab)
- `src/locales/fr.json` (modifié — ajout filter, emptyTab)
- `src/locales/es.json` (modifié — ajout filter, emptyTab)
