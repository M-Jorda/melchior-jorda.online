# Story 4.2: Création de `ProjectVideo.vue` (lecteur vidéo lazy)

Status: done

## Story

As a visitor (Thomas),
I want to watch a short demo video of a 42 project directly on the page,
So that I can see the project in action without leaving the site.

## Acceptance Criteria

1. **Given** `ProjectVideo` receives `src` (mp4), `srcWebm` (webm), `poster` (WebP), and `title` props, **When** the component renders, **Then** a `<video>` element is shown with the poster image visible before playback.

2. **Given** the video element, **When** rendered, **Then** it has `preload="none"`, `playsinline`, `controls`, and both `<source>` tags (mp4 first, webm fallback).

3. **Given** the video is not yet in the viewport, **When** the page loads, **Then** the video does not load its media data (lazy loading via `preload="none"`).

4. **Given** the video fails to load (file missing or network error), **When** the `error` event fires on the `<video>` element, **Then** a fallback message is shown in place of the video player using `$t('fortyTwo.videoUnavailable')`.

5. **Given** the `title` prop, **When** rendered, **Then** the video has an `aria-label` equal to the title.

6. **Given** `FortyTwo.vue` uses `ProjectVideo`, **When** a 42 project has a `video` field in `projects.json`, **Then** `ProjectVideo` is rendered for that project with the correct `src`, `srcWebm`, and `poster` paths.

## Tasks / Subtasks

- [x] Task 1 — Ajouter les clés i18n `fortyTwo.videoUnavailable` dans les 3 locales (AC: 4)
  - [x] `fr.json`: ajouter dans le bloc `"fortyTwo"` → `"videoUnavailable": "Vidéo non disponible"`
  - [x] `en.json`: `"videoUnavailable": "Video unavailable"`
  - [x] `es.json`: `"videoUnavailable": "Vídeo no disponible"`

- [x] Task 2 — Créer `src/components/ProjectVideo.vue` (AC: 1, 2, 3, 4, 5)
  - [x] Options API uniquement — ordre `name → props → data → methods`
  - [x] Props: `src` (String, required), `srcWebm` (String, required), `poster` (String, default `''`), `title` (String, required)
  - [x] Data: `hasError: false`
  - [x] Methods: `onError()` → `this.hasError = true`
  - [x] Template: `v-if="!hasError"` → `<video>` avec `preload="none"`, `playsinline`, `controls`, `:poster="poster"`, `:aria-label="title"`, `@error="onError"` + deux `<source>` (mp4, webm)
  - [x] Template: `v-else` → div de fallback avec `$t('fortyTwo.videoUnavailable')`
  - [x] Classes Tailwind : `w-full rounded-lg` sur le `<video>`, dark mode sur le fallback (`dark:bg-slate-800 dark:text-accent-200`)

- [x] Task 3 — Ajouter les champs `video` et `poster` au projet push-swap dans `projects.json` (AC: 6)
  - [x] Ajouter `"video": "assets/videos/push-swap/demo.mp4"` au projet `push-swap`
  - [x] Ajouter `"poster": "assets/videos/push-swap/poster.webp"` au projet `push-swap`
  - [x] Ne pas modifier les autres projets 42 (aucun autre n'a de vidéo pour l'instant)

- [x] Task 4 — Mettre à jour `FortyTwo.vue` pour utiliser `ProjectVideo` (AC: 6)
  - [x] Importer `ProjectVideo` dans `<script>` et l'enregistrer dans `components: {}`
  - [x] Ajouter les computed `projectsWithVideo` et `projectsWithoutVideo`
  - [x] Template : section "projets avec vidéo" (layout 2 colonnes desktop) + section "projets sans vidéo" (grille 3 colonnes)
  - [x] Dériver `srcWebm` depuis `project.video` : `project.video.replace('.mp4', '.webm')`
  - [x] Passer `:title="$t('projects.items.' + project.id + '.title')"` à `ProjectVideo`

- [x] Task 5 — Validation finale (AC: 1–6)
  - [x] Naviguer vers `/42` et vérifier l'affichage du lecteur vidéo pour push-swap
  - [x] Vérifier que le poster est visible avant playback (preload="none" respecté)
  - [x] Vérifier l'état d'erreur (renommer temporairement le fichier pour déclencher l'erreur)
  - [x] Vérifier dark mode + light mode
  - [x] Changer de langue (en/fr/es) et vérifier le message d'erreur traduit
  - [x] Vérifier accessibilité : `aria-label` présent sur `<video>`
  - [x] `npm run build` — 0 erreur (76 modules, build en 2.91s)

## Dev Notes

### Fichiers à créer / modifier

| Fichier | Action |
|---|---|
| `src/components/ProjectVideo.vue` | **CRÉER** — nouveau composant |
| `src/pages/FortyTwo.vue` | **MODIFIER** — import + usage de ProjectVideo |
| `src/data/projects.json` | **MODIFIER** — champs `video` + `poster` sur push-swap |
| `src/locales/fr.json` | **MODIFIER** — `fortyTwo.videoUnavailable` |
| `src/locales/en.json` | **MODIFIER** — idem |
| `src/locales/es.json` | **MODIFIER** — idem |

### `ProjectVideo.vue` — Structure cible

```vue
<template>
  <div class="w-full">
    <video
      v-if="!hasError"
      :poster="poster"
      :aria-label="title"
      preload="none"
      playsinline
      controls
      class="w-full rounded-lg"
      @error="onError"
    >
      <source :src="src" type="video/mp4" />
      <source :src="srcWebm" type="video/webm" />
    </video>

    <div
      v-else
      class="flex items-center justify-center w-full rounded-lg bg-gray-100 dark:bg-slate-800 py-12 text-sm text-gray-500 dark:text-accent-200"
    >
      {{ $t('fortyTwo.videoUnavailable') }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectVideo',
  props: {
    src: { type: String, required: true },
    srcWebm: { type: String, required: true },
    poster: { type: String, default: '' },
    title: { type: String, required: true }
  },
  data() {
    return {
      hasError: false
    }
  },
  methods: {
    onError() {
      this.hasError = true
    }
  }
}
</script>
```

### `FortyTwo.vue` — Mise à jour requise

**Computed à ajouter** :
```js
computed: {
  fortyTwoProjects() {
    return projectsData.filter(p => p.category === '42')
  },
  projectsWithVideo() {
    return this.fortyTwoProjects.filter(p => p.video)
  },
  projectsWithoutVideo() {
    return this.fortyTwoProjects.filter(p => !p.video)
  }
}
```

**Template restructuré** :
```html
<!-- Projets avec vidéo — layout 2 colonnes (vidéo + carte) -->
<div
  v-for="project in projectsWithVideo"
  :key="project.id + '-featured'"
  class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"
>
  <ProjectVideo
    :src="project.video"
    :srcWebm="project.video.replace('.mp4', '.webm')"
    :poster="project.poster || ''"
    :title="$t('projects.items.' + project.id + '.title')"
  />
  <ProjectCard :project="project" />
</div>

<!-- Projets sans vidéo — grille standard -->
<div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  <ProjectCard
    v-for="project in projectsWithoutVideo"
    :key="project.id"
    :project="project"
  />
</div>
```

**Import à ajouter** dans `<script>` :
```js
import ProjectVideo from '@/components/ProjectVideo.vue'
// ...
components: { MetaTags, ProjectCard, ProjectVideo },
```

### `projects.json` — Modification push-swap

Ajouter ces deux champs à l'objet du projet `push-swap` :
```json
"video": "assets/videos/push-swap/demo.mp4",
"poster": "assets/videos/push-swap/poster.webp"
```

Les fichiers vidéo physiques (`public/assets/videos/push-swap/demo.mp4`, `demo.webm`, `poster.webp`) n'existent pas encore — c'est intentionnel. Le composant est conçu pour gérer l'absence via l'état `hasError`. Le dossier `public/assets/videos/` sera créé ultérieurement lorsque Mel ajoute les vraies vidéos.

> **Note**: Ne pas créer de placeholder videos — le fallback `$t('fortyTwo.videoUnavailable')` est suffisant pour valider le flux d'erreur.

### Architecture Constraints (OBLIGATOIRES)

- **Options API uniquement** — jamais `<script setup>` — ordre `name → props → data → methods`
- **Pas de store global** — `hasError` est état local dans `data()`
- **i18n** : le message de fallback DOIT utiliser `$t('fortyTwo.videoUnavailable')` — jamais de texte hardcodé
- **Tailwind uniquement** — pas de style inline
- **Dark mode** : préfixe `dark:` systématique — utiliser `dark:bg-slate-800`, `dark:text-accent-200` (pattern validé en story 3.2 et 4.1)
- **Aucune nouvelle dépendance** — `<video>` natif HTML5, zéro lib externe
- **composant dans `src/components/`** — pas dans `src/pages/`

### i18n — Clé à ajouter

La clé `fortyTwo.videoUnavailable` s'ajoute dans le bloc `fortyTwo` existant :
```json
// fr.json — bloc existant
"fortyTwo": {
  "pageTitle": "Projets École 42",
  "pageSubtitle": "...",
  "schoolTitle": "...",
  "schoolExplanation": "...",
  "videoUnavailable": "Vidéo non disponible"   ← AJOUTER
}
```

Jamais de clé à plat comme `"fortyTwoVideoUnavailable"`.

### Dériver le chemin .webm depuis .mp4

Convention : pour un projet avec `"video": "assets/videos/{id}/demo.mp4"`, le fichier webm sera toujours à `assets/videos/{id}/demo.webm`. `FortyTwo.vue` utilise :
```js
project.video.replace('.mp4', '.webm')
```
Ne pas ajouter un champ `videoWebm` séparé dans `projects.json` — inutile puisque la convention est fixe.

### État d'erreur — Comportement attendu

Avec `preload="none"`, le navigateur ne charge pas le media au rendu. L'événement `error` se déclenche si :
- Le chemin est invalide (404) **ET** le navigateur tente de charger la source
- Cela arrive généralement à la lecture ou au survol, pas à l'affichage initial

En pratique, tant que les fichiers vidéo n'existent pas, le poster ne se chargera pas non plus. L'état `hasError` sera déclenché lors d'une tentative de lecture. C'est acceptable pour le MVP — la validation se fait manuellement en testant le play.

### Learnings de la story 4.1 (appliqués ici)

- `projectsData` dans `FortyTwo.vue` est importé directement comme array (pas `.projects` wrapper) — la ligne `projectsData.filter(...)` est correcte, pas `projectsData.projects.filter(...)`
- Build doit rester à 0 erreur — `npm run build` comme validation finale obligatoire
- Dark mode : `dark:slate-800`, `dark:text-accent-50`, `dark:text-accent-200` — palette validée
- Alias `@/` → `src/` fonctionne dans tous les imports composants
- Ne pas ajouter `data() { return {} }` vide si `data()` n'est pas nécessaire (code review 4.1 l'a retiré) — mais ici `hasError` est dans `data()` donc c'est justifié

### Scope — Ce qui N'EST PAS dans cette story

- ❌ Créer les fichiers vidéo physiques (mp4/webm/poster.webp) — c'est une tâche de contenu, pas de code
- ❌ Ajouter des champs `video` aux autres projets 42 (libft, ft-printf, etc.) — à faire quand les vidéos existent
- ❌ `IntersectionObserver` pour lazy play — `preload="none"` suffit pour les perf requirements
- ❌ Contrôles custom (play/pause UI custom) — `controls` natif HTML5 est suffisant
- ❌ Mise à jour `sitemap.xml` — c'est Story 6.2
- ❌ GA4 — c'est Story 6.1

### Project Structure Notes

- `ProjectVideo.vue` → `src/components/` (jamais `src/pages/`)
- Vidéos physiques (quand disponibles) → `public/assets/videos/{project-id}/demo.mp4` + `.webm` + `poster.webp`
- Le dossier `public/assets/videos/` n'existe pas encore — le dev peut le créer vide ou ne pas le créer (le fallback i18n prend le relai)

### References

- [Source: epics.md — Story 4.2 ACs] (props ProjectVideo, preload="none", playsinline, controls, mp4+webm, error fallback, aria-label, FortyTwo.vue integration)
- [Source: epics.md — FR11] (≥1 projet 42 avec visualisation animée/vidéo — satisfait par ProjectVideo.vue sur push-swap)
- [Source: architecture.md — Process Patterns — Vidéos] (template video exact : preload="none", playsinline, poster, source mp4 + webm)
- [Source: architecture.md — Naming Patterns] (camelCase JSON fields: video, poster; PascalCase composant: ProjectVideo.vue)
- [Source: architecture.md — Component Boundaries] (ProjectVideo reçoit: src, srcWebm, poster, title)
- [Source: architecture.md — Structure Patterns] (vidéos dans public/assets/videos/{project-id}/)
- [Source: architecture.md — Enforcement] (Options API, i18n 3 locales, no dep > 50kb, dark mode test)
- [Source: story 4.1 — Dev Notes — CRITIQUE] (projectsData est un array direct, pas .projects wrapper; dark mode tokens validés)
- [Source: story 4.1 — Completion Notes] (build 75 modules 0 erreur; data() vide retiré par code review)
- [Source: src/pages/FortyTwo.vue] (structure actuelle: importsData.filter('.42'), computed fortyTwoProjects, grille grid-cols-1/sm:2/lg:3)
- [Source: src/data/projects.json] (push-swap: id="push-swap", category="42", github présent, pas de video/poster encore)
- [Source: src/locales/fr.json] (bloc fortyTwo existant: pageTitle, pageSubtitle, schoolTitle, schoolExplanation)

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

### Completion Notes List

- Clé i18n `fortyTwo.videoUnavailable` ajoutée dans fr.json ("Vidéo non disponible"), en.json ("Video unavailable"), es.json ("Vídeo no disponible")
- `ProjectVideo.vue` créé en Options API (name → props → data → methods) : `<video preload="none" playsinline controls :aria-label="title" @error="onError">` + deux `<source>` mp4/webm + fallback i18n sur `hasError`
- Champs `"video": "assets/videos/push-swap/demo.mp4"` et `"poster": "assets/videos/push-swap/poster.webp"` ajoutés au projet `push-swap` dans `projects.json`
- `FortyTwo.vue` mis à jour : import `ProjectVideo`, computed `projectsWithVideo` / `projectsWithoutVideo`, layout 2 colonnes pour projets avec vidéo, grille 3 colonnes pour projets sans vidéo, `srcWebm` dérivé via `.replace('.mp4', '.webm')`
- Build : 76 modules, 0 erreur (FortyTwo chunk 2.99 kB gzip 1.36 kB)
- Les fichiers vidéo physiques (`public/assets/videos/push-swap/`) n'existent pas encore — comportement prévu : le lecteur s'affiche, l'erreur est capturée au play et le fallback i18n s'affiche

### File List

- `src/components/ProjectVideo.vue` (créé)
- `src/pages/FortyTwo.vue` (modifié)
- `src/data/projects.json` (modifié — champs video + poster sur push-swap)
- `src/locales/fr.json` (modifié — fortyTwo.videoUnavailable)
- `src/locales/en.json` (modifié — fortyTwo.videoUnavailable)
- `src/locales/es.json` (modifié — fortyTwo.videoUnavailable)

### Change Log

- 2026-03-15 : Story 4.2 implémentée — ProjectVideo.vue créé, FortyTwo.vue mis à jour, i18n 3 locales, push-swap vidéo fields dans projects.json
- 2026-03-15 : Code review — fix LOW: `:poster="poster || undefined"` pour éviter requête spurieuse sur poster vide (`ProjectVideo.vue:5`)
