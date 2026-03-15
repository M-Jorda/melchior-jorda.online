# Story 1.2: Extension de `ProjectCard.vue` avec les champs enrichis

Status: done

## Story

As a visitor (Sophie / Marc),
I want to see the client context, concrete result, sector, and delivery status for each project on its card,
So that I immediately understand who the project was built for and what outcome was achieved.

## Acceptance Criteria

1. **Given** a project with a `sector` value, **When** `ProjectCard` renders, **Then** the sector label appears in orange above the project title.

2. **Given** a project with a `clientContext` value, **When** `ProjectCard` renders, **Then** the `$t('projects.items.{id}.clientContext')` text is displayed in the card body, below the title, in standard body text (`text-slate-600 dark:text-accent-200`).

3. **Given** a project with a `result` value, **When** `ProjectCard` renders, **Then** the `$t('projects.items.{id}.result')` text is displayed in `text-green-500 dark:text-green-400` below the clientContext.

4. **Given** a project with `status: "delivered"`, **When** `ProjectCard` renders, **Then** a "Livré ✓" badge with green styling is visible on the card.

5. **Given** a project with `status: "in-progress"`, **When** `ProjectCard` renders, **Then** an "En cours" badge with orange styling is visible on the card.

6. **Given** a project image (thumbnail), **When** `ProjectCard` renders, **Then** the `<img>` has a descriptive `alt` attribute following the pattern `"[Nom projet] — [secteur], livré pour [type client]"`, uses `loading="lazy"`, and if the image fails to load it is hidden.

7. **Given** dark mode is active, **When** `ProjectCard` renders, **Then** all text colors use `dark:` Tailwind prefixes and the card is readable with contrast ≥ 4.5:1.

8. **Given** a mobile viewport of 320px, **When** `ProjectCard` renders, **Then** `clientContext` and `result` are always visible without requiring hover or tap interaction.

9. **Given** `Projects.vue`, **When** `ProjectCard` is integrated, **Then** client projects (`category: "client"`) are rendered using `ProjectCard` in a dedicated section — making them visible again after the category change in Story 1.1.

## Tasks / Subtasks

- [x] Task 1 — Créer `src/components/ProjectCard.vue` (AC: 1–8)
  - [x] Structure HTML avec la hiérarchie visuelle : image → sector → title → clientContext → result → status badge → tech tags → liens
  - [x] Prop `project` (objet complet depuis `projects.json`)
  - [x] Sector label orange au-dessus du titre (conditionnel si `project.sector`)
  - [x] `clientContext` via `$t('projects.items.' + project.id + '.clientContext')` (conditionnel)
  - [x] `result` en vert via `$t('projects.items.' + project.id + '.result')` (conditionnel)
  - [x] Status badge conditionnel : "Livré ✓" (vert) ou "En cours" (orange)
  - [x] Image avec `loading="lazy"`, `@error` handler, alt descriptif
  - [x] Lien "Me contacter pour un projet similaire" vers `/contact` (préparation Story 3.1)
  - [x] Ajouter les clés i18n dans `en.json`, `fr.json`, `es.json` : `projects.status.delivered`, `projects.status.inProgress`, `projects.contactCTA`

- [x] Task 2 — Mettre à jour `src/pages/Projects.vue` pour intégrer `ProjectCard` (AC: 9)
  - [x] Importer et enregistrer `ProjectCard.vue` dans `components`
  - [x] Ajouter la computed `clientProjects()` qui filtre `p.category === 'client'`
  - [x] Ajouter la section "Clients" dans le template, avec `v-for="project in clientProjects"` → `<ProjectCard :project="project" />`
  - [x] Ajouter le bouton de filtre "Clients" dans `filterCategories` (valeur `'client'`)
  - [x] Gérer la visibilité avec `v-show="selectedCategory === 'all' || selectedCategory === 'client'"`

- [x] Task 3 — Validation finale (AC: 6–8)
  - [x] Tester en dark mode ET light mode
  - [x] Vérifier à 320px que `clientContext` et `result` sont visibles sans interaction
  - [x] Vérifier le contraste des couleurs (green-500 sur fond card, orange sector label)
  - [x] Lancer `npm run build` — build réussi, 0 erreur

## Dev Notes

### CRITICAL — `ProjectCard.vue` n'existe pas encore

Le composant `ProjectCard.vue` est à créer from scratch dans `src/components/`. Il n'existe aucun composant existant à étendre. Les cartes actuelles dans `Projects.vue` sont des `<article>` inline — copier le style de base (fond, ombre, bordure orange hover) mais ajouter les nouveaux champs.

### CRITICAL — Projets clients ACTUELLEMENT CACHÉS

Suite à Story 1.1, les 6 projets clients ont leur `category` changée de `"websites"` à `"client"`. La computed `websiteProjects()` dans `Projects.vue` filtre `p.category === 'websites'` → **0 résultat pour les projets clients**.

Cette story DOIT rendre ces projets visibles en ajoutant une section "Clients" dans `Projects.vue` avec la computed `clientProjects()` qui filtre `p.category === 'client'`.

### Hiérarchie visuelle obligatoire (UX-DR4)

```
image (lazy, si thumbnail)
  ↓
sector label (orange, au-dessus du titre, conditionnel)
  ↓
title (h3, text-primary dark:text-accent-50)
  ↓
clientContext (body text, text-slate-600 dark:text-accent-200)
  ↓
result (text-green-500 dark:text-green-400)
  ↓
status badge ("Livré ✓" vert / "En cours" orange)
  ↓
tech tags (pills existants)
  ↓
liens live/github + CTA contact
```

### `clientContext` et `result` sont des clés i18n — PAS des champs JSON

Ces deux champs ne sont PAS dans `projects.json`. Ils sont résolus via i18n :
```js
// ✅ CORRECT
$t('projects.items.' + project.id + '.clientContext')
$t('projects.items.' + project.id + '.result')

// ❌ INTERDIT
project.clientContext  // n'existe pas dans le JSON
```
Les clés i18n existent déjà dans `en.json`, `fr.json`, `es.json` pour les 6 projets clients (ajoutées en Story 1.1).

### Structure exacte du composant Vue (Options API obligatoire)

```js
export default {
  name: 'ProjectCard',
  components: {},
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  data() { return {} },
  computed: {
    projectTitle() {
      return this.$t('projects.items.' + this.project.id + '.title') || this.project.title
    },
    // ... autres computed si nécessaire
  },
  methods: {
    handleImageError(event) {
      event.target.style.display = 'none'
    }
  }
}
```

**JAMAIS** `<script setup>`. **JAMAIS** Composition API.

### Style de base de la carte (copier depuis Projects.vue existant)

```html
<article class="card bg-accent-50 dark:bg-slate-800 rounded-lg p-5 sm:p-6 relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden flex flex-col">
  <!-- Barre orange gauche au hover (existant dans toutes les cartes) -->
  <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
  <!-- ... contenu enrichi ... -->
</article>
```

### Alt attribute obligatoire sur l'image

Pattern requis (AC 6) :
```html
:alt="($t('projects.items.' + project.id + '.title') || project.title) + ' — ' + (project.sector || '') + ', ' + $t('projects.altSuffix')"
```
Ou plus simplement une computed `imageAlt` qui compose le texte. Ajouter la clé `projects.altSuffix` en i18n (ex: "réalisé pour client").

### Nouvelles clés i18n à ajouter dans les 3 locales

```json
// en.json
"projects": {
  "status": {
    "delivered": "Delivered ✓",
    "inProgress": "In Progress"
  },
  "contactCTA": "Contact me for a similar project",
  "altSuffix": "delivered for client"
}

// fr.json
"projects": {
  "status": {
    "delivered": "Livré ✓",
    "inProgress": "En cours"
  },
  "contactCTA": "Me contacter pour un projet similaire",
  "altSuffix": "réalisé pour client"
}

// es.json
"projects": {
  "status": {
    "delivered": "Entregado ✓",
    "inProgress": "En curso"
  },
  "contactCTA": "Contactarme por un proyecto similar",
  "altSuffix": "realizado para cliente"
}
```

### Status badge styling

```html
<!-- Livré ✓ -->
<span class="text-xs px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/40 text-green-600 dark:text-green-400">
  {{ $t('projects.status.delivered') }}
</span>

<!-- En cours -->
<span class="text-xs px-2 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-600 dark:text-orange-400">
  {{ $t('projects.status.inProgress') }}
</span>
```

### CTA "Me contacter pour un projet similaire" (préparation Story 3.1)

À inclure dans `ProjectCard.vue` uniquement pour `category: "client"`. Utilise `<router-link>` vers `/contact` :
```html
<router-link
  v-if="project.category === 'client'"
  to="/contact"
  class="text-sm text-orange-500 dark:text-orange-400 hover:underline mt-2 inline-block"
>
  {{ $t('projects.contactCTA') }}
</router-link>
```

### Intégration dans `Projects.vue`

Ajouter dans `<script>` :
```js
import ProjectCard from '@/components/ProjectCard.vue'

export default {
  components: {
    MetaTags,
    ProjectCard
  },
  computed: {
    // Ajouter :
    clientProjects() {
      return this.projects.filter(p => p.category === 'client')
    },
    filterCategories() {
      return [
        { value: 'all', label: this.$t('projects.categories.all') },
        { value: 'client', label: this.$t('projects.categories.clients') }, // NOUVEAU
        { value: 'websites', label: this.$t('projects.categories.websites') },
        { value: '42', label: this.$t('projects.categories.school42') },
        { value: 'applications', label: this.$t('projects.categories.applications') }
      ]
    }
  }
}
```

Ajouter la clé i18n `projects.categories.clients` dans les 3 locales (en: "Clients", fr: "Clients", es: "Clientes").

Section à ajouter dans le template `Projects.vue` (avant la section "Websites") :
```html
<div v-show="selectedCategory === 'all' || selectedCategory === 'client'" class="mt-10">
  <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-primary dark:text-accent-50 mb-4 border-b-2 border-primary dark:border-accent-100 pb-2">
    {{ $t('projects.categories.clients') }}
  </h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
    <ProjectCard
      v-for="project in clientProjects"
      :key="project.id"
      :project="project"
    />
  </div>
</div>
```

### Projets clients disponibles (6 projets)

| ID | Sector | Status | Thumbnail |
|---|---|---|---|
| `minata-portfolio` | Photographie & Cinéma | delivered | null |
| `trixie-conciergerie` | Conciergerie & Services | delivered | null |
| `miss-boat` | Location nautique | in-progress | null |
| `elsa-psychologue` | Santé & Bien-être | delivered | null |
| `les-planches` | Restauration | delivered | null |
| `le-nain-vert` | E-commerce / Mode | in-progress | null |

⚠️ Aucun projet client n'a de `thumbnail` pour l'instant. Le `v-if="project.thumbnail"` gère ça proprement (la section image est cachée si null). Ne PAS ajouter d'image placeholder — l'absence est le comportement attendu.

### Project Structure Notes

- `ProjectCard.vue` → `src/components/ProjectCard.vue` (NOUVEAU)
- `Projects.vue` → `src/pages/Projects.vue` (MODIFIÉ — ajout section clients + import ProjectCard)
- Locales modifiées → `src/locales/en.json`, `fr.json`, `es.json`
- **NE PAS MODIFIER** : `src/data/projects.json`, `src/main.js`, `seo.config.js`
- Note: Les pages sont dans `src/pages/` (pas `src/views/`), confirmé Story 1.1

### Learnings from Story 1.1

- `projects.json` validé : 6 projets `category: "client"` (minata-portfolio, trixie-conciergerie, miss-boat, elsa-psychologue, les-planches, le-nain-vert)
- Tous les champs `sector`, `status`, `featured` sont présents et corrects dans le JSON
- Les clés i18n `projects.items.{id}.clientContext` et `projects.items.{id}.result` existent dans les 3 locales
- La hiérarchie i18n imbriquée est respectée — ne jamais créer de clés plates

### References

- [Source: epics.md — Story 1.2 AC]
- [Source: epics.md — Story 3.1 AC] (CTA contact sur ProjectCard)
- [Source: architecture.md — Frontend Architecture, Boundaries composants]
- [Source: architecture.md — Naming Patterns, section 1 et 2]
- [Source: architecture.md — Vue Options API ordre des options, section 3]
- [Source: architecture.md — Tailwind & Dark mode, section 5]
- [Source: architecture.md — Enforcement rules]
- [Source: epics.md — UX-DR4] (hiérarchie visuelle, badges)
- [Source: 1-1-enrichissement-du-schema.md — Completion Notes] (schéma final, projets clients)
- [Source: Projects.vue — card style existant] (copier bg, shadow, hover border gauche)

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

_Aucune erreur — build Vite réussi du premier coup (70 modules transformés)._

### Completion Notes List

- ✅ `src/components/ProjectCard.vue` créé (nouveau composant, Options API)
  - Hiérarchie visuelle complète : image → sector → title → clientContext → result → status badge → tech tags → liens → CTA contact
  - `clientContext` et `result` résolus via computed `$t()` avec fallback null si clé absente
  - `imageAlt` computed composant le texte alt descriptif (title + sector + altSuffix i18n)
  - Status badges stylisés : vert pour `delivered`, orange pour `in-progress`
  - CTA `<router-link to="/contact">` conditionnel sur `category === 'client'` (prépare Story 3.1)
  - Barre orange gauche au hover (pattern identique aux cartes existantes dans Projects.vue)
- ✅ `src/pages/Projects.vue` mis à jour
  - Import et enregistrement de `ProjectCard`
  - Computed `clientProjects()` filtre `p.category === 'client'` — rend visibles les 6 projets cachés depuis Story 1.1
  - Nouveau bouton filtre "Clients" dans `filterCategories`
  - Section "Clients" avec `<ProjectCard>` avant la section "Websites"
- ✅ `src/locales/en.json` : ajout `projects.status`, `projects.contactCTA`, `projects.altSuffix`, `projects.categories.clients`
- ✅ `src/locales/fr.json` : idem en français
- ✅ `src/locales/es.json` : idem en espagnol
- ✅ Build Vite production : 0 erreur, 0 warning — 70 modules transformés
- ℹ️ Pas de test runner configuré (hors périmètre MVP — cf. architecture.md)
- ✅ [Code Review] H1 corrigé : `text-green-600` → `text-green-500` (AC3 conforme)
- ✅ [Code Review] M1 corrigé : `flex-grow` ajouté sur `clientContext` `<p>` — alignement bas des cartes dans la grille
- ✅ [Code Review] M2 corrigé : `imageAlt` simplifiée en `title + ' — ' + sector` (toujours exact, sans assumption sur le statut)
- ✅ [Code Review] L1 corrigé : `$te(key)` remplace la comparaison `translated !== key` (API officielle vue-i18n)

### File List

- `src/components/ProjectCard.vue` (nouveau)
- `src/pages/Projects.vue` (modifié — import ProjectCard, computed clientProjects, section Clients, filtre Clients)
- `src/locales/en.json` (modifié — ajout status, contactCTA, altSuffix, categories.clients)
- `src/locales/fr.json` (modifié — idem français)
- `src/locales/es.json` (modifié — idem espagnol)
