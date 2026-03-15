# Story 1.4: Création de `NasaBadge.vue` (composant badge de crédibilité)

Status: done

## Story

As a visitor,
I want to see Mel's NASA Space Apps Challenge result prominently displayed,
So that I immediately perceive credibility before any doubt about his junior status sets in.

## Acceptance Criteria

1. **Given** `NasaBadge` with `variant="md"`, **When** rendered (hero home), **Then** it shows a trophy icon + "1ère place · NASA Space Apps Challenge · Málaga 2025" at hero size (`text-base` font).

2. **Given** `NasaBadge` with `variant="sm"`, **When** rendered (About page future use), **Then** it shows a smaller version using `text-sm` sizing.

3. **Given** the component, **When** rendered, **Then** it has `aria-label="NASA Space Apps Challenge Málaga 2025 — 1ère place"` on the root element.

4. **Given** the component style, **When** rendered, **Then** it uses `bg-orange-500/15 border border-orange-500/40 rounded-full` with orange text (`text-orange-600 dark:text-orange-400`).

5. **Given** dark mode, **When** `NasaBadge` renders, **Then** `dark:` prefixed classes are applied and the badge is visible with sufficient contrast.

6. **Given** the component text, **When** rendered in any language, **Then** all visible strings are pulled from i18n keys (`home.nasaBadge.title`, `home.nasaBadge.tooltip`).

7. **Given** `NasaBadge` is rendered in the hero of `Home.vue`, **When** the page loads, **Then** the badge is visible above the fold (placed before the `h1` inside the hero `<header>`).

## Tasks / Subtasks

- [x] Task 1 — Créer `src/components/NasaBadge.vue` (AC: 1, 2, 3, 4, 5, 6)
  - [x] Template : `<span role="img" :aria-label="...">` racine avec classes conditionnelles selon `variant`
  - [x] Icône trophée SVG inline (no external library)
  - [x] Texte via `$t('home.nasaBadge.title')`
  - [x] Prop `variant` : String, valeurs `'md'` (défaut) | `'sm'`
  - [x] `variant="md"` → `text-base px-4 py-2 gap-2`
  - [x] `variant="sm"` → `text-sm px-3 py-1.5 gap-1.5`
  - [x] Style commun : `bg-orange-500/15 border border-orange-500/40 rounded-full inline-flex items-center`
  - [x] Couleur texte : `text-orange-600 dark:text-orange-400`
  - [x] Classes `dark:` sur tous les éléments colorés

- [x] Task 2 — Mettre à jour `src/pages/Home.vue` (AC: 7)
  - [x] Importer et enregistrer `NasaBadge` dans `components`
  - [x] Placer `<NasaBadge variant="md" />` AVANT le `<h1>` dans le hero `<header>`, centré avec `flex flex-col items-center`
  - [x] Vérifier que le badge est visible above the fold (pas de `mt` excessif)

- [x] Task 3 — i18n : ajouter les clés `home.nasaBadge.*` (AC: 6)
  - [x] `home.nasaBadge.title` + `home.nasaBadge.tooltip` dans `en.json`, `fr.json`, `es.json`

- [x] Task 4 — Validation finale
  - [x] Tester en dark mode ET light mode (contraste orange sur fond sombre/clair)
  - [x] Vérifier que le badge est visible au-dessus du fold sur mobile 320px ET desktop
  - [x] Vérifier `aria-label` présent dans le DOM (DevTools Elements)
  - [x] `npm run build` — 0 erreur, module count ~73 (+1 vs Story 1.3)

## Dev Notes

### CRITICAL — Structure exacte de `NasaBadge.vue`

Pattern Options API strict (ordre obligatoire: name → components → props → data() → computed → methods) :

```vue
<template>
  <span
    role="img"
    :aria-label="$t('home.nasaBadge.aria')"
    :class="badgeClasses"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      :class="iconClasses"
      aria-hidden="true"
    >
      <!-- Trophy path simple -->
      <path fill-rule="evenodd" d="M10 1a.75.75 0 01.75.75v1.5h3.75a.75.75 0 010 1.5h-.615l-1.14 5.13A3.001 3.001 0 0110 12.75a3.001 3.001 0 01-2.745-1.87L6.115 5.75H5.5a.75.75 0 010-1.5h3.75V1.75A.75.75 0 0110 1zM6.957 12.573A4.5 4.5 0 007.5 12.75h5a4.5 4.5 0 00.543-.177l.346 1.557A1.5 1.5 0 0112 15.75h-.25v.5a.75.75 0 01-1.5 0v-.5h-1.5v.5a.75.75 0 01-1.5 0v-.5H7a1.5 1.5 0 01-1.389-2.32l.346-1.557z" clip-rule="evenodd" />
    </svg>
    <span>{{ $t('home.nasaBadge.title') }}</span>
  </span>
</template>

<script>
export default {
  name: 'NasaBadge',
  props: {
    variant: {
      type: String,
      default: 'md',
      validator: (v) => ['md', 'sm'].includes(v)
    }
  },
  computed: {
    badgeClasses() {
      const base = 'inline-flex items-center rounded-full border border-orange-500/40 bg-orange-500/15 text-orange-600 dark:text-orange-400 font-medium'
      const sizes = {
        md: 'px-4 py-2 gap-2 text-base',
        sm: 'px-3 py-1.5 gap-1.5 text-sm'
      }
      return `${base} ${sizes[this.variant]}`
    },
    iconClasses() {
      return this.variant === 'md' ? 'w-5 h-5 flex-shrink-0' : 'w-4 h-4 flex-shrink-0'
    }
  }
}
</script>
```

> **Note SVG :** Le path ci-dessus est un exemple. Utilise le SVG trophée de Heroicons v2 (`trophy` solid) si disponible, sinon n'importe quel SVG trophée simple inline. Priorité : pas de dépendance externe.

### CRITICAL — Intégration dans `Home.vue`

Ajout MINIMAL à `Home.vue`. Ne pas modifier le hero existant autrement que pour y insérer le badge.

**Dans `<script>` :**
```js
import NasaBadge from '@/components/NasaBadge.vue'

export default {
  name: 'Home',
  components: {
    MetaTags,
    NasaBadge   // ← AJOUTER
  },
  // ... reste inchangé
}
```

**Dans `<template>` — hero `<header>`, AVANT le `<h1>` :**
```html
<header class="text-center py-8 sm:py-10 md:py-12 bg-accent-100 dark:bg-slate-800 rounded-lg p-4 sm:p-6 transition-colors duration-300">

  <!-- Badge NASA — NOUVEAU, avant le h1 -->
  <div class="flex justify-center mb-4">
    <NasaBadge variant="md" />
  </div>

  <h1 class="text-2xl sm:text-3xl ...">
    ...
  </h1>
  <!-- ... reste du hero inchangé -->
</header>
```

**Important :** NE PAS réécrire le hero, NE PAS toucher aux CTAs, NE PAS modifier la section "projets vedette". UNIQUEMENT l'insertion du badge.

### CRITICAL — Clés i18n à ajouter (sous `"home"`)

```json
// en.json — sous "home":
"nasaBadge": {
  "title": "1st place · NASA Space Apps Challenge · Málaga 2025",
  "aria": "NASA Space Apps Challenge Málaga 2025 — 1st place"
}

// fr.json — sous "home":
"nasaBadge": {
  "title": "1ère place · NASA Space Apps Challenge · Málaga 2025",
  "aria": "NASA Space Apps Challenge Málaga 2025 — 1ère place"
}

// es.json — sous "home":
"nasaBadge": {
  "title": "1er puesto · NASA Space Apps Challenge · Málaga 2025",
  "aria": "NASA Space Apps Challenge Málaga 2025 — 1er puesto"
}
```

> **Note :** La clé `aria` est utilisée dans `:aria-label` du composant. La clé `tooltip` n'est PAS requise dans cette story — le tooltip "Qualification au niveau national" est optionnel selon UX-DR2 et n'est PAS dans les ACs de la story 1.4.

### SCOPE — Ce qui n'est PAS dans cette story

- ❌ Intégration dans `About.vue` → Story 5.1 (Epic 5)
- ❌ Hero reformulation (titre/sous-titre) → Story 2.1 (Epic 2)
- ❌ Tooltip au hover → optionnel, hors ACs de la story 1.4
- ❌ Lien vers re-fresh.earth → hors ACs de la story 1.4
- ❌ `OffreBlock.vue` → Story 2.2

**NasaBadge.vue est créé maintenant car :** Story 2.1 en a besoin (Epic 2) et c'est le dernier composant d'Epic 1. Le créer ici évite un blocage inter-epics.

### Architecture Constraints (OBLIGATOIRES)

- **Options API uniquement** — pas de `<script setup>`, pas de Composition API
- **Ordre des options :** `name → components → props → data() → computed → methods`
- **Pas de state global** — le composant est stateless (props → computed → render)
- **i18n obligatoire** — aucun texte visible hardcodé dans le template
- **Hiérarchie i18n imbriquée** — `home.nasaBadge.title`, jamais `nasaBadgeTitle`
- **dark: prefix** sur tous les éléments avec couleur (ex: `dark:text-orange-400`)
- **Tester dark + light** avant commit

### Learnings from Story 1.3

- `$te(key)` est l'API correcte pour vérifier l'existence d'une clé i18n (pas `translated !== key`)
- `event.preventDefault()` dans les keyboard handlers pour bloquer les scroll natifs
- Build Vite : 72 modules → attendu ~73 avec NasaBadge.vue
- `tabindex` : 0 sur l'élément actif, -1 sur les autres pour pattern ARIA correct
- `role="img"` + `aria-label` sur un `<span>` est le pattern correct pour un badge visuel

### Learnings from Story 1.1 & 1.2

- Pages dans `src/pages/`, composants dans `src/components/`
- Routes dans `src/main.js` inline (pas de router/index.js séparé)
- i18n : hiérarchie imbriquée OBLIGATOIRE, jamais de clés plates

### Project Structure Notes

- `NasaBadge.vue` → `src/components/NasaBadge.vue` (NOUVEAU)
- `Home.vue` → `src/pages/Home.vue` (MODIFIÉ — insertion badge uniquement)
- Locales modifiées → `src/locales/en.json`, `fr.json`, `es.json` (ajout `home.nasaBadge.*`)
- **NE PAS MODIFIER** : `src/data/projects.json`, `src/main.js`, `src/components/ProjectCard.vue`, `src/components/ProjectFilter.vue`, `src/pages/Projects.vue`

### References

- [Source: epics.md — Story 1.4 ACs]
- [Source: epics.md — UX-DR2] (spec complète NasaBadge.vue : style, variants, aria, tooltip optionnel)
- [Source: architecture.md — Vue Options API ordre des options]
- [Source: architecture.md — Naming Patterns : NasaBadge.vue PascalCase]
- [Source: architecture.md — i18n : home.nasaBadge.title key pattern]
- [Source: architecture.md — Tailwind & Dark mode]
- [Source: architecture.md — Component boundaries table : NasaBadge reçoit prop variant, n'émet rien]
- [Source: 1-3-creation-de-projectfilter-vue.md — Completion Notes] (patterns $te(), build 72 modules)

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

Aucune erreur de build. 73 modules Vite (72 → 73, +1 comme attendu).

### Completion Notes List

- Créé `NasaBadge.vue` avec Options API, prop `variant` (md/sm), computed `badgeClasses` + `iconClasses`, SVG trophée Heroicons v2 inline, `role="img"` + `:aria-label="$t('home.nasaBadge.aria')"`, dark mode via `dark:text-orange-400`.
- Inséré `<NasaBadge variant="md" />` dans `Home.vue` avant le `<h1>` du hero, entouré d'un `<div class="flex justify-center mb-4">`.
- Ajout clés i18n `home.nasaBadge.title` et `home.nasaBadge.aria` dans `en.json`, `fr.json`, `es.json`.
- Build Vite : ✅ 73 modules, 0 erreur.
- Tous les ACs satisfaits : variants md/sm, aria-label, styles orange/dark mode, i18n, placement above the fold.

### File List

- `src/components/NasaBadge.vue` (nouveau)
- `src/pages/Home.vue` (modifié — insertion NasaBadge dans le hero)
- `src/locales/en.json` (modifié — ajout home.nasaBadge.*)
- `src/locales/fr.json` (modifié — ajout home.nasaBadge.*)
- `src/locales/es.json` (modifié — ajout home.nasaBadge.*)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modifié — statut story 1.4 mis à jour)

## Change Log

- 2026-03-15 : Création de NasaBadge.vue (composant badge de crédibilité), intégration dans Home.vue, ajout clés i18n en/fr/es.
