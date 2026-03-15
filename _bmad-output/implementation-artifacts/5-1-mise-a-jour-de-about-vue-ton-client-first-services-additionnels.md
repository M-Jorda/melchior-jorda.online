# Story 5.1: Mise à jour de `About.vue` (ton client-first + services additionnels)

Status: done

## Story

As a visitor (Sophie / Thomas),
I want the About page to immediately tell me what value Mel brings rather than his career timeline, and to understand the add-on services available after delivery,
So that I gain confidence in Mel's professionalism and can evaluate post-project support options.

## Acceptance Criteria

1. **Given** I navigate to `/about`, **When** the page loads, **Then** the opening section leads with the value Mel brings to clients (not a chronological biography starting with "I'm Melchior JORDA, Full-Stack Developer passionate about...").

2. **Given** the About page content, **When** rendered, **Then** it includes: empathy for artisan/TPE clients, a mention of accessible rates and "devis gratuit sous 48h", and 42 + NASA as proof-points (not as the opening).

3. **Given** `NasaBadge` (variant `sm`), **When** rendered on the About page, **Then** it appears as a small credential badge alongside the 42 and NASA mentions.

4. **Given** the additional services section, **When** rendered, **Then** it presents two post-delivery options: admin panel (autonomous content management) and monthly maintenance (updates, security, support).

5. **Given** each additional service, **When** rendered, **Then** it clearly explains what is included (FR24) and includes a `<router-link to="/contact">` CTA linking to `/contact` (FR25).

6. **Given** all text on the About page, **When** rendered in any language, **Then** all strings use i18n keys in `en.json`, `fr.json`, `es.json` — no hardcoded visible text.

7. **Given** dark mode, **When** `About.vue` renders, **Then** `dark:` Tailwind classes are applied and contrast ≥ 4.5:1 on all text.

## Tasks / Subtasks

- [x] Task 1 — Ajouter les clés i18n dans les 3 locales (AC: 1, 2, 3, 4, 5, 6)
  - [x] Mettre à jour `about.intro` (ton client-first) dans fr.json, en.json, es.json
  - [x] Ajouter `about.rates` dans les 3 locales
  - [x] Ajouter `about.credentials.title`, `about.credentials.fortyTwo`, `about.credentials.nasa` dans les 3 locales
  - [x] Ajouter `about.additionalServices.title`, `about.additionalServices.subtitle` dans les 3 locales
  - [x] Ajouter `about.additionalServices.adminPanel.title/description/cta` dans les 3 locales
  - [x] Ajouter `about.additionalServices.maintenance.title/description/cta` dans les 3 locales

- [x] Task 2 — Mettre à jour `About.vue` (AC: 1–7)
  - [x] Importer `NasaBadge` et l'enregistrer dans `components: { MetaTags, NasaBadge }`
  - [x] Remplacer la section intro par un contenu client-first (valeur client, artisans/TPE, tarifs)
  - [x] Ajouter la section credentials avec `<NasaBadge variant="sm" />` + textes proof-points 42/NASA
  - [x] Conserver la section skills existante telle quelle (4 cartes frontend/backend/tools/languages)
  - [x] Ajouter la section "services additionnels" avec 2 blocs (`role="article"`) + CTAs `<router-link to="/contact">`
  - [x] Vérifier dark mode sur tous les nouveaux éléments

- [x] Task 3 — Validation finale (AC: 1–7)
  - [x] Vérifier l'affichage en light mode et dark mode
  - [x] Vérifier les 3 langues (fr/en/es) — aucune clé manquante
  - [x] Vérifier que les CTAs naviguent bien vers `/contact`
  - [x] `npm run build` — 0 erreur (76 modules, 2.64s)

## Dev Notes

### Fichiers à créer / modifier

| Fichier | Action |
|---|---|
| `src/pages/About.vue` | **MODIFIER** — restructuration complète du template |
| `src/locales/fr.json` | **MODIFIER** — nouvelles clés + mise à jour `about.intro` |
| `src/locales/en.json` | **MODIFIER** — idem |
| `src/locales/es.json` | **MODIFIER** — idem |

### `NasaBadge.vue` — composant existant, ne pas recréer

Fichier : `src/components/NasaBadge.vue` — déjà implémenté (story 1.4).

**Props :**
- `variant`: `"sm"` | `"md"` — utiliser `"sm"` sur About

**Comportement interne :** le badge utilise `$t('home.nasaBadge.title')` et `$t('home.nasaBadge.aria')` directement — ces clés existent déjà dans les 3 locales. Aucune prop de texte à passer.

**Import dans `About.vue` :**
```js
import NasaBadge from '@/components/NasaBadge.vue'
// Dans components: { MetaTags, NasaBadge }
```

**Usage dans le template :**
```html
<NasaBadge variant="sm" />
```

### `About.vue` — Structure cible complète

La page actuelle a `<section>` sans classe — conserver ce pattern (le container vient du layout parent). Ne pas ajouter `container mx-auto` sur `<section>`.

```vue
<template>
  <section>
    <MetaTags
      :title="$t('about.title') + ' | Melchior JORDA'"
      :description="$t('about.intro')"
      keywords="Melchior JORDA, About, Skills, Experience, École 42, Web Developer, Vue.js, JavaScript, C Programming, Frontend, Backend, PHP, Symfony, Málaga, Spain"
      url="/about"
    />

    <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-primary dark:text-accent-50">
      {{ $t('about.title') }}
    </h1>

    <!-- 1. Value proposition — client-first opening (AC: 1, 2) -->
    <div class="mt-6 sm:mt-8">
      <div class="bg-accent-50 dark:bg-slate-800 p-6 sm:p-8 rounded-lg">
        <p class="text-base sm:text-lg text-slate-600 dark:text-accent-200 leading-relaxed">
          {{ $t('about.intro') }}
        </p>
        <p class="mt-3 text-sm font-medium text-orange-500 dark:text-orange-400">
          {{ $t('about.rates') }}
        </p>
      </div>
    </div>

    <!-- 2. Credentials — 42 + NASA proof-points (AC: 2, 3) -->
    <div class="mt-8 sm:mt-10">
      <h2 class="text-lg sm:text-xl font-semibold text-primary dark:text-accent-50 mb-4">
        {{ $t('about.credentials.title') }}
      </h2>
      <div class="flex flex-col gap-3">
        <p class="text-sm sm:text-base text-slate-600 dark:text-accent-200">
          {{ $t('about.credentials.fortyTwo') }}
        </p>
        <div>
          <NasaBadge variant="sm" />
        </div>
        <p class="text-sm sm:text-base text-slate-600 dark:text-accent-200">
          {{ $t('about.credentials.nasa') }}
        </p>
      </div>
    </div>

    <!-- 3. Skills section — CONSERVER TEL QUEL (ne pas modifier) -->
    <div class="mt-10 sm:mt-12">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-accent-50 mb-6">
        {{ $t('about.skills_title') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <!-- ... les 4 cartes existantes frontend/backend/tools/languages restent identiques ... -->
      </div>
    </div>

    <!-- 4. Additional services (AC: 4, 5, 6, 7) -->
    <div class="mt-10 sm:mt-12">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-accent-50 mb-2">
        {{ $t('about.additionalServices.title') }}
      </h2>
      <p class="text-sm text-slate-600 dark:text-accent-200 mb-6">
        {{ $t('about.additionalServices.subtitle') }}
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <article
          role="article"
          class="bg-accent-50 dark:bg-slate-800 p-6 rounded-lg border border-transparent hover:border-orange-500 dark:hover:border-orange-400 hover:shadow-md transition-all duration-300"
        >
          <h3 class="text-base font-semibold text-primary dark:text-accent-50 mb-2">
            {{ $t('about.additionalServices.adminPanel.title') }}
          </h3>
          <p class="text-sm text-slate-600 dark:text-accent-200 mb-4">
            {{ $t('about.additionalServices.adminPanel.description') }}
          </p>
          <router-link
            to="/contact"
            class="inline-block px-4 py-2 rounded-lg bg-orange-500 dark:bg-orange-400 text-white dark:text-primary hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors duration-300 font-medium text-sm"
          >
            {{ $t('about.additionalServices.adminPanel.cta') }}
          </router-link>
        </article>

        <article
          role="article"
          class="bg-accent-50 dark:bg-slate-800 p-6 rounded-lg border border-transparent hover:border-orange-500 dark:hover:border-orange-400 hover:shadow-md transition-all duration-300"
        >
          <h3 class="text-base font-semibold text-primary dark:text-accent-50 mb-2">
            {{ $t('about.additionalServices.maintenance.title') }}
          </h3>
          <p class="text-sm text-slate-600 dark:text-accent-200 mb-4">
            {{ $t('about.additionalServices.maintenance.description') }}
          </p>
          <router-link
            to="/contact"
            class="inline-block px-4 py-2 rounded-lg bg-orange-500 dark:bg-orange-400 text-white dark:text-primary hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors duration-300 font-medium text-sm"
          >
            {{ $t('about.additionalServices.maintenance.cta') }}
          </router-link>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import MetaTags from '@/components/MetaTags.vue'
import NasaBadge from '@/components/NasaBadge.vue'

export default {
  name: 'About',
  components: { MetaTags, NasaBadge }
}
</script>
```

> **CRITIQUE** : La section skills (4 cartes) doit être copiée telle quelle depuis le fichier actuel. Ne pas la supprimer ni la modifier. Elle se place entre la section credentials et la section additional services.

### i18n — Clés à modifier et à ajouter

**`about.intro` — METTRE À JOUR** (remplace le texte biographique actuel) :

```json
// fr.json
"intro": "J'aide les artisans, restaurateurs et professions libérales à se démarquer en ligne avec un site web rapide, moderne et pensé pour leurs clients. Tarifs accessibles, suivi personnalisé."

// en.json
"intro": "I help craftspeople, restaurateurs and independent professionals stand out online with a fast, modern website built around their clients. Accessible rates, personal follow-up."

// es.json
"intro": "Ayudo a artesanos, restauradores y profesiones liberales a destacar en internet con un sitio web rápido y moderno pensado para sus clientes. Tarifas accesibles, seguimiento personalizado."
```

**Nouvelles clés à AJOUTER dans le bloc `"about": {}` existant :**

```json
// fr.json — dans le bloc "about"
"rates": "Tarifs accessibles · Devis gratuit sous 48h",
"credentials": {
  "title": "Formation & réalisations",
  "fortyTwo": "Diplômé de l'École 42 — école de programmation intensive par les pairs (C, C++, algorithmique, Unix).",
  "nasa": "1ère place, NASA Space Apps Challenge, Málaga 2025 — qualifié au niveau national."
},
"additionalServices": {
  "title": "Services post-livraison",
  "subtitle": "Besoin d'aide après la mise en ligne ? Deux options pour que votre site reste au top.",
  "adminPanel": {
    "title": "Panneau d'administration",
    "description": "Gérez vos textes, images et menu en autonomie — aucune intervention développeur requise.",
    "cta": "Me demander cette option"
  },
  "maintenance": {
    "title": "Maintenance mensuelle",
    "description": "Mises à jour, correctifs de sécurité et support sur plusieurs mois.",
    "cta": "Me demander cette option"
  }
}

// en.json — dans le bloc "about"
"rates": "Accessible rates · Free quote within 48h",
"credentials": {
  "title": "Training & achievements",
  "fortyTwo": "Graduate of École 42 — intensive peer-to-peer programming school (C, C++, algorithms, Unix).",
  "nasa": "1st place, NASA Space Apps Challenge, Málaga 2025 — selected for national qualification."
},
"additionalServices": {
  "title": "Post-delivery services",
  "subtitle": "Need help after launch? Two options to keep your site running strong.",
  "adminPanel": {
    "title": "Admin panel",
    "description": "Update your text, images and menu yourself — no developer required.",
    "cta": "Ask about this option"
  },
  "maintenance": {
    "title": "Monthly maintenance",
    "description": "Updates, security patches and support over several months.",
    "cta": "Ask about this option"
  }
}

// es.json — dans le bloc "about"
"rates": "Tarifas accesibles · Presupuesto gratuito en 48h",
"credentials": {
  "title": "Formación y logros",
  "fortyTwo": "Graduado en École 42 — escuela de programación intensiva por pares (C, C++, algoritmos, Unix).",
  "nasa": "1er lugar, NASA Space Apps Challenge, Málaga 2025 — clasificado a nivel nacional."
},
"additionalServices": {
  "title": "Servicios post-entrega",
  "subtitle": "¿Necesitas ayuda después del lanzamiento? Dos opciones para mantener tu sitio al máximo.",
  "adminPanel": {
    "title": "Panel de administración",
    "description": "Gestiona textos, imágenes y menú de forma autónoma — sin necesidad de un desarrollador.",
    "cta": "Preguntar por esta opción"
  },
  "maintenance": {
    "title": "Mantenimiento mensual",
    "description": "Actualizaciones, parches de seguridad y soporte durante varios meses.",
    "cta": "Preguntar por esta opción"
  }
}
```

> **Clés existantes à conserver** — ne pas supprimer ni modifier : `about.skills_title`, `about.skills.*`, `about.experience_title`, `about.experience.*` (elles existent dans les locales mais n'ont plus toutes de rendu dans le template — les garder pour ne pas casser de future utilisation).

### Architecture Constraints (OBLIGATOIRES)

- **Options API uniquement** — ordre `name → components` (pas de `data()`, `computed`, ni `methods` nécessaires ici)
- **Pas de `data()` vide** — ne pas ajouter `data() { return {} }` (learning code review story 4.2 — data() vide retiré)
- **i18n** — aucun texte visible hardcodé, tout via `$t()`
- **Tailwind uniquement** — pas de style inline
- **Dark mode** — `dark:bg-slate-800`, `dark:text-accent-50`, `dark:text-accent-200`, `dark:text-orange-400` — palette validée
- **`<router-link to="/contact">`** — jamais `<a href="/contact">` pour les CTAs (vue-router SPA)
- **`role="article"`** sur les blocs services additionnels (pattern OffreBlock.vue)
- **Hiérarchie i18n** — jamais de clé à plat comme `"aboutAdminPanelTitle"` — toujours imbriqué : `about.additionalServices.adminPanel.title`

### Scope — Ce qui N'EST PAS dans cette story

- ❌ Modifier les clés i18n existantes de skills (déjà traduites, conserver)
- ❌ Supprimer ou modifier la section skills (4 cartes — conserver telle quelle)
- ❌ Créer un nouveau composant séparé pour les services (tout dans `About.vue` directement)
- ❌ Ajouter des animations ou transitions complexes
- ❌ Mettre à jour `sitemap.xml` (Story 6.2)
- ❌ Ajouter Google Analytics 4 (Story 6.1)

### Learnings des stories précédentes

- **Pas de `data()` vide** (code review story 4.2) — ne pas l'ajouter si aucun état local
- **Dark mode tokens validés** : `dark:bg-slate-800`, `dark:text-accent-50`, `dark:text-accent-200`, `dark:text-orange-400`
- **`@/` alias** fonctionne dans tous les imports composants
- **`<router-link to="/contact">`** — pattern validé dans OffreBlock.vue (ligne 27–32), ProjectCard.vue (ligne 101–107), Header.vue
- **`container mx-auto px-4 py-8 sm:py-12`** utilisé dans FortyTwo.vue — mais `About.vue` existant n'utilise PAS de classe sur `<section>` — ne pas ajouter (layout parent fournit le container)
- **`bg-accent-50 dark:bg-slate-800 p-6 rounded-lg`** — pattern carte validé dans About.vue existant et dans les stories précédentes
- **Hover border orange** : `border border-transparent hover:border-orange-500 dark:hover:border-orange-400 hover:shadow-md transition-all duration-300` — pattern OffreBlock.vue

### Project Structure Notes

- `About.vue` reste dans `src/pages/` ✅
- `NasaBadge.vue` dans `src/components/` ✅ — importer, ne pas recréer
- Nouvelles clés dans le bloc `"about": {}` existant de chaque fichier locales — ne pas créer de nouveau bloc
- Les fichiers locales ont des milliers de lignes — ajouter les clés exactement à la fin du bloc `"about"`, avant la fermeture `}`

### References

- [Source: epics.md — Story 5.1 ACs] (client-first intro, NasaBadge sm, services additionnels, CTAs /contact, FR23–25)
- [Source: epics.md — UX-DR12] (rewrite About.vue ton client-first; tarifs; 42 + NASA comme proof-points, pas intro)
- [Source: architecture.md — Section Frontend Architecture] (services additionnels → About.vue uniquement; pas de nouvelle route)
- [Source: architecture.md — Enforcement] (Options API, i18n 3 locales, no dep > 50kb, dark mode test)
- [Source: architecture.md — Naming Patterns] (clés i18n imbriquées: `about.additionalServices.adminPanel.cta`)
- [Source: src/components/NasaBadge.vue] (props: variant="sm"|"md"; textes depuis home.nasaBadge.* en interne)
- [Source: src/components/OffreBlock.vue] (pattern CTA router-link + role="article" blocks + hover orange border)
- [Source: src/pages/About.vue] (structure actuelle: `<section>` sans classe, MetaTags + intro + 4 skills cards)
- [Source: src/locales/fr.json — bloc "about"] (clés existantes à conserver: title, intro, experience_*, skills_title, skills.*)
- [Source: story 4.2 — Learnings] (pas de data() vide; dark: tokens; @/ alias; build 0 erreur obligatoire)

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

### Completion Notes List

- `about.intro` mis à jour en ton client-first dans fr/en/es — remplace la biographie technique
- Nouvelles clés i18n ajoutées dans les 3 locales : `about.rates`, `about.credentials.*`, `about.additionalServices.*` (10 nouvelles clés par locale)
- `About.vue` restructuré : intro client-first + rates + section credentials avec `NasaBadge variant="sm"` + section skills (conservée) + section services additionnels (2 blocs `role="article"` + CTAs `<router-link to="/contact">`)
- Options API `name + components` uniquement — pas de `data()` vide (learning story 4.2)
- Dark mode testé : `dark:bg-slate-800 dark:text-accent-200 dark:text-orange-400 dark:text-primary` — palette validée
- Build : 76 modules, 0 erreur (About chunk 9.14 kB gzip 2.39 kB)

### File List

- `src/pages/About.vue` (modifié — restructuration complète du template)
- `src/locales/fr.json` (modifié — `about.intro` mis à jour + 10 nouvelles clés)
- `src/locales/en.json` (modifié — idem)
- `src/locales/es.json` (modifié — idem)
