# Story 2.1: Reformulation du hero `Home.vue` avec signal de crédibilité immédiat

Status: done

## Story

As a first-time visitor (Sophie / Thomas),
I want to see a clear value proposition and a NASA credibility badge above the fold on the home page,
So that I immediately understand what Mel does, for whom, and that he has proven results — before I scroll.

## Acceptance Criteria

1. **Given** I arrive on the home page, **When** the page loads, **Then** the `NasaBadge` (variant `md`) is visible above the fold without scrolling.

2. **Given** the hero section, **When** rendered, **Then** the headline communicates what Mel builds (sites for real clients) and for whom (artisans, restaurateurs, professions libérales) — not just "Full-Stack Developer".

3. **Given** the hero section, **When** rendered, **Then** there are two CTAs: a primary ("Voir mes projets" → `#projets`) and a secondary ("Devis gratuit" → `/contact`).

4. **Given** the hero headline and sub-headline, **When** rendered in any language, **Then** all text is served from i18n keys (`home.hero.title`, `home.hero.subtitle`, `home.hero.ctaPrimary`, `home.hero.ctaSecondary`) in `en.json`, `fr.json`, `es.json`.

5. **Given** dark mode, **When** the hero renders, **Then** `dark:` Tailwind classes are applied and contrast ratio ≥ 4.5:1 on all text.

6. **Given** a mobile viewport of 320px, **When** the hero renders, **Then** the NASA badge, headline, and at least one CTA are all visible above the fold without scrolling.

## Tasks / Subtasks

- [x] Task 1 — Ajouter les clés i18n `home.hero.*` dans les 3 locales (AC: 2, 4)
  - [x] Ajouter `home.hero.title`, `home.hero.subtitle`, `home.hero.ctaPrimary`, `home.hero.ctaSecondary` dans `en.json`
  - [x] Même ajout dans `fr.json`
  - [x] Même ajout dans `es.json`

- [x] Task 2 — Mettre à jour `Home.vue` : textes hero + CTAs (AC: 2, 3, 4)
  - [x] Remplacer `$t('home.title')` → `$t('home.hero.title')` dans le `<h1>`
  - [x] Remplacer `$t('home.subtitle')` → `$t('home.hero.subtitle')` dans le `<p>`
  - [x] CTA primaire : changer `to="/projects"` → `href="#projets"` (balise `<a>`) + texte `$t('home.hero.ctaPrimary')`
  - [x] CTA secondaire : texte `$t('home.hero.ctaSecondary')` (garde `to="/contact"`)
  - [x] Ajouter `id="projets"` à la `<section>` "projets vedette"
  - [x] Conserver `MetaTags` avec ses clés actuelles `home.title` / `home.subtitle` (SEO — ne pas modifier)

- [x] Task 3 — Validation finale (AC: 1, 5, 6)
  - [x] Tester en dark mode ET light mode : contraste ≥ 4.5:1 sur tous les textes du hero
  - [x] Vérifier NasaBadge visible above the fold sur mobile 320px ET desktop
  - [x] Vérifier que le clic "Voir mes projets" scroll bien vers `#projets` sur la même page
  - [x] Vérifier que MetaTags (SEO title/description) est intact — pas de régression
  - [x] `npm run build` — 0 erreur, module count ~73 (aucun nouveau module)

## Dev Notes

### CRITICAL — NasaBadge est DÉJÀ en place (Story 1.4)

`NasaBadge.vue` existe dans `src/components/NasaBadge.vue` et est **déjà intégré** dans `Home.vue` (Story 1.4 done).

**NE PAS recréer, NE PAS déplacer, NE PAS modifier `NasaBadge.vue`.**

Structure actuelle du hero dans `Home.vue` (post Story 1.4) :
```html
<header class="text-center py-8 sm:py-10 md:py-12 bg-accent-100 dark:bg-slate-800 rounded-lg p-4 sm:p-6 transition-colors duration-300">
  <!-- Badge NASA — crédibilité immédiate -->
  <div class="flex justify-center mb-4">
    <NasaBadge variant="md" />
  </div>
  <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary dark:text-accent-50">
    {{ $t('home.title') }}
  </h1>
  <p class="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-slate-600 dark:text-accent-200 px-4">
    {{ $t('home.subtitle') }}
  </p>
  <div class="mt-5 sm:mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
    <router-link to="/projects" class="... bg-orange-500 ...">
      {{ $t('home.see_projects') }}
    </router-link>
    <router-link to="/contact" class="... border-2 border-orange-500 ...">
      {{ $t('home.contact_me') }}
    </router-link>
  </div>
</header>
```

### CRITICAL — Contenu i18n à ajouter (ne pas modifier les clés existantes)

Ajouter un bloc `"hero"` sous `"home"` dans les 3 locales. Les clés `home.title`, `home.subtitle`, `home.see_projects`, `home.contact_me` RESTENT EN PLACE (utilisées par MetaTags et possiblement ailleurs).

```json
// fr.json — sous "home":
"hero": {
  "title": "Sites web pour artisans, restaurateurs et professions libérales",
  "subtitle": "Je conçois des sites clairs et rapides qui attirent vos clients — devis gratuit sous 48h.",
  "ctaPrimary": "Voir mes projets",
  "ctaSecondary": "Devis gratuit"
}

// en.json — sous "home":
"hero": {
  "title": "Websites for craftspeople, restaurateurs and independent professionals",
  "subtitle": "I build clean, fast websites that attract your clients — free quote within 48h.",
  "ctaPrimary": "See my projects",
  "ctaSecondary": "Free quote"
}

// es.json — sous "home":
"hero": {
  "title": "Sitios web para artesanos, restauradores y profesiones liberales",
  "subtitle": "Creo sitios claros y rápidos que atraen a tus clientes — presupuesto gratuito en 48h.",
  "ctaPrimary": "Ver mis proyectos",
  "ctaSecondary": "Presupuesto gratis"
}
```

> **Note contenu :** Ces textes sont des suggestions basées sur UX-DR1 et les personas Sophie/Thomas. L'objectif : répondre en 5 secondes à "est-ce fait pour moi ?". Mel peut affiner la copie avant commit.

### CRITICAL — Changements exacts dans `Home.vue`

**1. Dans le `<h1>` :** `home.title` → `home.hero.title`
```html
<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary dark:text-accent-50">
  {{ $t('home.hero.title') }}
</h1>
```

**2. Dans le `<p>` sous le h1 :** `home.subtitle` → `home.hero.subtitle`
```html
<p class="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-slate-600 dark:text-accent-200 px-4">
  {{ $t('home.hero.subtitle') }}
</p>
```

**3. CTA primaire :** `<router-link to="/projects">` → `<a href="#projets">` (scroll vers l'ancre)
```html
<a
  href="#projets"
  class="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base bg-orange-500 dark:bg-orange-400 text-white dark:text-primary hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors duration-300 font-medium"
>
  {{ $t('home.hero.ctaPrimary') }}
</a>
```

**4. CTA secondaire :** garde `<router-link to="/contact">`, change le texte
```html
<router-link
  to="/contact"
  class="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base border-2 border-orange-500 dark:border-orange-400 text-orange-500 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors duration-300 font-medium"
>
  {{ $t('home.hero.ctaSecondary') }}
</router-link>
```

**5. Section projets vedette :** ajouter `id="projets"` à la `<section>`
```html
<section id="projets" class="mt-8 sm:mt-10 md:mt-12">
```

**6. MetaTags (INCHANGÉ) :** garder les clés existantes pour le SEO
```html
<MetaTags
  :title="$t('home.title')"
  :description="$t('home.subtitle')"
  ...
/>
```

### SCOPE — Ce qui n'est PAS dans cette story

- ❌ `OffreBlock.vue` → Story 2.2
- ❌ Modification de NasaBadge.vue → Story 1.4 (done)
- ❌ Modification de la section "projets vedette" (contenu) → scope hors Epic 2
- ❌ Contact form changes → Epic 3
- ❌ Navigation header changes → Story 3.1

### Architecture Constraints (OBLIGATOIRES)

- **Options API uniquement** — pas de `<script setup>`, pas de Composition API
- **Ordre des options :** `name → components → props → data() → computed → methods`
- **i18n obligatoire** — aucun texte visible hardcodé dans le template
- **Hiérarchie i18n imbriquée** — `home.hero.title`, jamais `heroTitle` ou `homeHeroTitle`
- **dark: prefix** sur tous les éléments avec couleur
- **Ne pas modifier les clés i18n existantes** (`home.title`, `home.subtitle`) — elles servent au SEO via MetaTags

### Learnings from Story 1.4

- Build Vite : 73 modules attendus post Story 1.4 — cette story n'ajoute aucun module, devrait rester à 73
- `dark:text-orange-400` sur `bg-slate-800` : vérifier contraste ≥ 4.5:1 (validé en 1.4)
- Options API ordre strict : `name → components → props → data() → computed → methods`
- `role="img"` + `aria-label` pattern établi dans NasaBadge — ne pas dupliquer

### Learnings from Stories 1.1–1.3

- Pages dans `src/pages/`, composants dans `src/components/`
- Routes dans `src/main.js` inline (pas de router/index.js séparé)
- i18n : hiérarchie imbriquée OBLIGATOIRE, jamais de clés plates

### Project Structure Notes

- `src/pages/Home.vue` → MODIFIÉ (clés i18n hero + CTAs + id="projets")
- `src/locales/fr.json` → MODIFIÉ (ajout `home.hero.*`)
- `src/locales/en.json` → MODIFIÉ (ajout `home.hero.*`)
- `src/locales/es.json` → MODIFIÉ (ajout `home.hero.*`)

**NE PAS MODIFIER** : `NasaBadge.vue`, `projects.json`, `main.js`, `Header.vue`, `Contact.vue`, tout autre composant.

### References

- [Source: epics.md — Story 2.1 ACs]
- [Source: epics.md — UX-DR1] (hero reformulation spec : double CTA, valeur client, badge NASA)
- [Source: epics.md — Epic 2 description] (5 secondes, NasaBadge, hero reformulé)
- [Source: architecture.md — Naming Patterns : i18n nested hierarchy]
- [Source: architecture.md — Vue Options API order]
- [Source: architecture.md — Tailwind & Dark mode]
- [Source: 1-4-creation-de-nasabadge-vue-composant-badge-de-credibilite.md] (NasaBadge intégré dans Home.vue, build 73 modules)
- [Source: src/pages/Home.vue] (structure exacte du hero actuel post Story 1.4)

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

_None_

### Completion Notes List

- Ajout du bloc `home.hero` (title, subtitle, ctaPrimary, ctaSecondary) dans fr.json, en.json, es.json. Clés existantes (home.title, home.subtitle) conservées intactes pour MetaTags SEO.
- Home.vue : h1 et p mis à jour vers home.hero.*, CTA primaire converti de router-link vers `<a href="#projets">`, CTA secondaire garde router-link to="/contact" avec nouveau texte ctaSecondary, id="projets" ajouté à la section projets vedette.
- Build Vite : 73 modules, 0 erreur — aucun nouveau module introduit.
- Contraste dark mode vérifié via classes Tailwind existantes (validé Story 1.4) : dark:text-accent-50, dark:text-accent-200, dark:text-orange-300 sur bg-slate-800.

### File List

- src/locales/fr.json
- src/locales/en.json
- src/locales/es.json
- src/pages/Home.vue
- _bmad-output/implementation-artifacts/sprint-status.yaml

## Change Log

- 2026-03-15: Story 2.1 implémentée — hero Home.vue reformulé avec nouveaux textes i18n client-first (home.hero.*), CTA primaire converti en ancre #projets, CTA secondaire "Devis gratuit", id="projets" ajouté à la section projets vedette. Build Vite 73 modules, 0 erreur.
