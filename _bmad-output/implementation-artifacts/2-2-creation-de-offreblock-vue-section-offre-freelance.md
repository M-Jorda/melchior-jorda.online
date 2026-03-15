# Story 2.2: Création de `OffreBlock.vue` — section offre freelance

Status: done

## Story

As a visitor (Sophie / Marc),
I want to see the types of sites Mel builds and who they are for, with a clear call to get a free quote,
So that I can immediately self-qualify ("is this for me?") and know the next step without friction.

## Acceptance Criteria

1. **Given** the `OffreBlock` section on `Home.vue`, **When** the page loads, **Then** three service blocks are displayed: vitrine (showcase), e-commerce, and multi-page.

2. **Given** each service block, **When** rendered, **Then** it shows an icon, a short title, and 2–3 target client profiles (e.g., "Artisans · Restaurateurs · Professions libérales").

3. **Given** the section, **When** rendered, **Then** a single CTA "Devis gratuit sous 48h" appears below all three blocks (not repeated per block) and links to `/contact`.

4. **Given** a desktop viewport (≥ 640px), **When** `OffreBlock` renders, **Then** the three blocks are displayed in a 3-column grid.

5. **Given** a mobile viewport (320px–639px), **When** `OffreBlock` renders, **Then** the blocks stack vertically in a single column.

6. **Given** a block on hover (desktop), **When** the user hovers, **Then** a light elevation effect (`hover:shadow-md`) and an orange border (`hover:border-orange-500 dark:hover:border-orange-400`) are applied.

7. **Given** each block, **When** rendered in the DOM, **Then** `role="article"` is present on the block element.

8. **Given** any visible text in `OffreBlock`, **When** rendered in any language, **Then** all strings use i18n keys in `en.json`, `fr.json`, `es.json` under `home.offreBlock.*`.

9. **Given** dark mode, **When** `OffreBlock` renders, **Then** `dark:` Tailwind classes are applied and all text is readable with contrast ≥ 4.5:1.

## Tasks / Subtasks

- [x] Task 1 — Créer `src/components/OffreBlock.vue` (AC: 1, 2, 3, 4, 5, 6, 7, 8, 9)
  - [x] Définir `data()` avec le tableau `services` (3 entrées: vitrine, ecommerce, multipage) contenant la clé i18n et l'icône SVG
  - [x] Template: grille `grid-cols-1 sm:grid-cols-3` avec `v-for` sur `services`
  - [x] Chaque item: `role="article"`, border transparente + `hover:border-orange-500 dark:hover:border-orange-400 hover:shadow-md`
  - [x] Icône SVG inline via `v-html` dans un `<svg>` borné (données hardcodées = pas de risque XSS)
  - [x] CTA unique `<router-link to="/contact">` sous la grille (pas dans chaque bloc)
  - [x] Dark mode : `dark:bg-slate-800` sur les blocs, `dark:text-accent-50` sur les titres, `dark:text-accent-200` sur les profils

- [x] Task 2 — Intégrer `OffreBlock.vue` dans `Home.vue` (AC: 1)
  - [x] Importer `OffreBlock` dans `components` de `Home.vue`
  - [x] Positionner `<OffreBlock />` entre le hero `<header>` et la `<section id="projets">`
  - [x] Ajouter `mt-8 sm:mt-10 md:mt-12` comme margin-top (cohérent avec les sections existantes)

- [x] Task 3 — Ajouter les clés i18n `home.offreBlock.*` dans les 3 locales (AC: 8)
  - [x] Ajouter le bloc `"offreBlock"` sous `"home"` dans `en.json`
  - [x] Même ajout dans `fr.json`
  - [x] Même ajout dans `es.json`

- [x] Task 4 — Validation finale (AC: 4, 5, 6, 9)
  - [x] Vérifier le layout 3 colonnes sur ≥ sm (640px) et 1 colonne sur mobile 320px
  - [x] Vérifier l'effet hover (border orange + shadow) en desktop
  - [x] Vérifier contraste dark mode : titres, profils, icônes, CTA
  - [x] `npm run build` — 0 erreur, module count ~74 (1 nouveau module : OffreBlock.vue)

## Dev Notes

### CRITICAL — Nom du composant

L'architecture.md appelle ce composant `FreelanceOffer.vue` mais les epics, l'UX spec, et cette story l'appellent tous `OffreBlock.vue`. **Utiliser `OffreBlock.vue`** — c'est le nom canonique de cette story.

### Structure de `OffreBlock.vue`

Composant statique : aucune prop, aucun emit requis. Le CTA est un `<router-link to="/contact">` interne.

```vue
<template>
  <section class="mt-8 sm:mt-10 md:mt-12">
    <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold text-primary dark:text-accent-50 text-center mb-6 sm:mb-8">
      {{ $t('home.offreBlock.title') }}
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      <article
        v-for="service in services"
        :key="service.key"
        role="article"
        class="bg-accent-50 dark:bg-slate-800 rounded-lg p-5 sm:p-6 border border-transparent hover:border-orange-500 dark:hover:border-orange-400 hover:shadow-md transition-all duration-300"
      >
        <div class="text-orange-500 dark:text-orange-400 mb-3 w-8 h-8">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8" v-html="service.iconPath" aria-hidden="true"></svg>
        </div>
        <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50 mb-2">
          {{ $t(`home.offreBlock.${service.key}.title`) }}
        </h3>
        <p class="text-sm text-slate-600 dark:text-accent-200">
          {{ $t(`home.offreBlock.${service.key}.profiles`) }}
        </p>
      </article>
    </div>

    <div class="mt-6 sm:mt-8 text-center">
      <router-link
        to="/contact"
        class="inline-block px-6 py-3 rounded-lg bg-orange-500 dark:bg-orange-400 text-white dark:text-primary hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors duration-300 font-medium text-sm sm:text-base"
      >
        {{ $t('home.offreBlock.cta') }}
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'OffreBlock',
  data() {
    return {
      services: [
        {
          key: 'vitrine',
          iconPath: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'
        },
        {
          key: 'ecommerce',
          iconPath: '<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>'
        },
        {
          key: 'multipage',
          iconPath: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>'
        }
      ]
    }
  }
}
</script>
```

> **Note icônes:** Les `iconPath` sont des fragments SVG injectés via `v-html` dans un `<svg>` borné. La donnée est hardcodée dans `data()` — pas d'entrée utilisateur — donc pas de risque XSS. Pas de librairie d'icônes requise.

### Intégration dans `Home.vue`

Structure actuelle du template (post Story 2.1) :
```html
<section>
  <MetaTags ... />
  <header class="... hero ..."> ... </header>
  <section id="projets" class="mt-8 ..."> ... </section>
</section>
```

Après modification :
```html
<section>
  <MetaTags ... />
  <header class="... hero ..."> ... </header>
  <OffreBlock />                           <!-- ← AJOUTER ICI -->
  <section id="projets" class="mt-8 ..."> ... </section>
</section>
```

Et dans `<script>` :
```js
import OffreBlock from '@/components/OffreBlock.vue'

export default {
  name: 'Home',
  components: {
    MetaTags,
    NasaBadge,
    OffreBlock   // ← AJOUTER
  },
  ...
}
```

### CRITICAL — Clés i18n à ajouter (ne pas modifier les clés existantes)

Ajouter un bloc `"offreBlock"` sous `"home"` dans les 3 locales. **Ne pas toucher** aux clés existantes (`home.title`, `home.subtitle`, `home.see_projects`, `home.contact_me`, `home.nasaBadge`, `home.hero`).

```json
// fr.json — sous "home":
"offreBlock": {
  "title": "Ce que je construis",
  "vitrine": {
    "title": "Site vitrine",
    "profiles": "Artisans · Restaurateurs · Professions libérales"
  },
  "ecommerce": {
    "title": "Site e-commerce",
    "profiles": "Boutiques · Créateurs · E-commerçants locaux"
  },
  "multipage": {
    "title": "Site multi-pages",
    "profiles": "Conciergeries · Portfolios · Services professionnels"
  },
  "cta": "Devis gratuit sous 48h"
}

// en.json — sous "home":
"offreBlock": {
  "title": "What I build",
  "vitrine": {
    "title": "Showcase website",
    "profiles": "Craftspeople · Restaurateurs · Independent professionals"
  },
  "ecommerce": {
    "title": "E-commerce website",
    "profiles": "Shops · Creators · Local e-commerce"
  },
  "multipage": {
    "title": "Multi-page website",
    "profiles": "Concierge services · Portfolios · Professional services"
  },
  "cta": "Free quote within 48h"
}

// es.json — sous "home":
"offreBlock": {
  "title": "Lo que construyo",
  "vitrine": {
    "title": "Sitio vitrina",
    "profiles": "Artesanos · Restauradores · Profesiones liberales"
  },
  "ecommerce": {
    "title": "Sitio e-commerce",
    "profiles": "Tiendas · Creadores · E-commerce local"
  },
  "multipage": {
    "title": "Sitio multipágina",
    "profiles": "Conserjerías · Portfolios · Servicios profesionales"
  },
  "cta": "Presupuesto gratis en 48h"
}
```

### Architecture Constraints (OBLIGATOIRES)

- **Options API uniquement** — `name → data() → computed → methods` (pas de props ni components à part RouterLink déjà global)
- **i18n obligatoire** — aucun texte visible hardcodé dans le template
- **Hiérarchie i18n imbriquée** — `home.offreBlock.vitrine.title`, jamais `offreBlockVitrineTitle`
- **dark: prefix** sur tous les éléments avec couleur
- **Tailwind uniquement** — pas de `style=""` inline sauf valeur dynamique calculée
- **Ne pas modifier les clés i18n existantes**
- **Pas de nouvelle dépendance** — icônes SVG inline, pas de librairie

### Tailwind tokens disponibles (tailwind.config.cjs réel)

```
// Couleurs custom disponibles :
primary: '#0b1220'           // dark text
slate-800: '#0f172a'         // dark background surface
accent-50: '#fff8f3'         // light surface
accent-100: '#fff1e6'        // lighter surface
accent-200: '#ffd8b0'        // secondary text light
orange-400: '#ff9f43'        // CTA dark mode
orange-500: '#ff7a18'        // CTA light mode
orange-600: '#ff5c00'        // CTA hover light mode

// Note: PAS de tokens "navy-*" dans le tailwind.config.cjs réel.
// Utiliser slate-* pour les fonds dark et accent-* pour les teintes chaudes.
```

### Learnings from Story 2.1

- Build Vite : 73 modules post Story 2.1 — Story 2.2 ajoute 1 composant → devrait passer à **74 modules**
- Options API ordre strict : `name → data() → computed → methods`
- `dark:` prefix obligatoire sur tous les éléments colorés — pattern validé avec `dark:bg-slate-800`, `dark:text-accent-50`, `dark:text-orange-400`
- Aucun hardcode de texte visible — tout passe par `$t()`
- Sections existantes utilisent `mt-8 sm:mt-10 md:mt-12` — respecter ce spacing pour la cohérence visuelle

### Learnings from Stories 1.1–1.4

- Composants dans `src/components/`, pages dans `src/pages/`
- Routes dans `src/main.js` inline (pas de router/index.js séparé)
- i18n : hiérarchie imbriquée OBLIGATOIRE, jamais de clés plates
- Tester en dark mode ET light mode avant commit
- `accent-50` pour les fonds de surface en light mode, `slate-800` en dark mode (voir les project cards existantes `Home.vue:53`)

### SCOPE — Ce qui n'est PAS dans cette story

- ❌ Modification de `NasaBadge.vue` — done (Story 1.4)
- ❌ CTA contact persistant dans le header — Story 3.1
- ❌ `FortyTwo.vue` / route `/42` — Story 4.1
- ❌ Modification de la section projets vedette (contenu/filtres) — Stories 1.2, 1.3
- ❌ Formulaire contact RGPD — Story 3.2
- ❌ Emit `contact-requested` depuis OffreBlock — non requis pour MVP (router-link direct suffit)

### Project Structure Notes

- `src/components/OffreBlock.vue` → CRÉÉ (nouveau composant)
- `src/pages/Home.vue` → MODIFIÉ (import + intégration OffreBlock)
- `src/locales/fr.json` → MODIFIÉ (ajout `home.offreBlock.*`)
- `src/locales/en.json` → MODIFIÉ (ajout `home.offreBlock.*`)
- `src/locales/es.json` → MODIFIÉ (ajout `home.offreBlock.*`)

**NE PAS MODIFIER** : `NasaBadge.vue`, `projects.json`, `main.js`, `Header.vue`, `Contact.vue`, `ProjectCard.vue`, tout autre composant ou fichier.

### References

- [Source: epics.md — Story 2.2 ACs]
- [Source: epics.md — UX-DR5] (OffreBlock spec : 3 blocs, icône + titre + profils, CTA unique)
- [Source: epics.md — Epic 2 description] (5 secondes, section offre freelance)
- [Source: architecture.md — Component Boundaries : OffreBlock emits contact-requested] (optionnel, router-link suffisant)
- [Source: architecture.md — Naming Patterns : i18n nested hierarchy]
- [Source: architecture.md — Vue Options API order]
- [Source: architecture.md — Tailwind & Dark mode]
- [Source: architecture.md — Structure Patterns : composants dans src/components/]
- [Source: tailwind.config.cjs] (tokens réels : orange-*, accent-*, slate-*, primary — PAS de navy-*)
- [Source: src/pages/Home.vue] (structure post Story 2.1 — position d'insertion OffreBlock)
- [Source: 2-1-reformulation-du-hero-home-vue-avec-signal-de-credibilite-immediat.md] (learnings : 73 modules, dark mode classes validées)

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

_None_

### Completion Notes List

- Créé `src/components/OffreBlock.vue` — composant Options API statique, grille 3 colonnes responsive, 3 blocs service avec icônes SVG inline hardcodées, CTA unique `<router-link to="/contact">`, dark mode complet
- Intégré dans `Home.vue` entre le hero et la section projets — import + déclaration dans `components`
- Ajout des clés `home.offreBlock.*` dans fr.json, en.json, es.json (title, 3 services × title+profiles, cta)
- Build validé : 74 modules (73 → 74, +1 OffreBlock.vue), 0 erreur, 0 warning
- Tous les ACs satisfaits : 3 blocs (AC1), icône+titre+profils (AC2), CTA unique /contact (AC3), 3 colonnes sm+ (AC4), 1 colonne mobile (AC5), hover:shadow-md + hover:border-orange-500 (AC6), role="article" (AC7), i18n complet (AC8), dark mode complet (AC9)

### File List

- src/components/OffreBlock.vue (créé)
- src/pages/Home.vue (modifié)
- src/locales/fr.json (modifié)
- src/locales/en.json (modifié)
- src/locales/es.json (modifié)

## Change Log

- 2026-03-15: Implémentation complète de Story 2.2 — Création de `OffreBlock.vue`, intégration dans `Home.vue`, ajout des clés i18n dans les 3 locales (fr, en, es), build validé à 74 modules
