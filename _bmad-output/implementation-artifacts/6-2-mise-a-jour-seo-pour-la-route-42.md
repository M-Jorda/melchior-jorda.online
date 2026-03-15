# Story 6.2: Mise à jour SEO pour la route `/42`

Status: done

## Story

As a site owner (Mel),
I want the `/42` page to be properly indexed by search engines with correct meta tags and sitemap entry,
so that the page can be discovered organically and does not regress existing SEO quality.

## Acceptance Criteria

1. **Given** `seo.config.js`, **When** reviewed, **Then** the `/42` route (`pages.fortyTwo`) has a `title` and `description` entry — **ALREADY DONE** (see Dev Notes).

2. **Given** `MetaTags.vue` rendering on the `/42` route, **When** a visitor loads the page, **Then** the correct `<title>` and `<meta name="description">` are injected into the document head in the active locale (en/fr/es) — **ALREADY DONE** (see Dev Notes).

3. **Given** `public/sitemap.xml`, **When** updated, **Then** the `/42` URL is included with a valid `<url>` block matching the pattern of existing entries (with `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>`, and hreflang `<xhtml:link>` tags for en/fr/es).

4. **Given** all existing routes (home, projects, about, contact, resume), **When** the SEO update is deployed, **Then** their meta tags are unchanged — no regression.

## Tasks / Subtasks

- [x] Task 1 — Ajouter la route `/42` dans `public/sitemap.xml` (AC: 3)
  - [x] Ajouter un bloc `<url>` après l'entrée `/projects` (voir Dev Notes pour le contenu exact)
  - [x] Respecter le pattern existant : `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>`, 3 `<xhtml:link>` hreflang (en/fr/es)
  - [x] Utiliser `priority="0.85"` et `changefreq="monthly"` (cohérent avec la nature de la page)
  - [x] Date `<lastmod>` : `2026-03-15`

- [x] Task 2 — Vérification de non-régression (AC: 2, 4)
  - [x] Naviguer vers chaque route (/, /projects, /about, /resume, /contact) et vérifier dans DevTools > Elements > `<head>` que `<title>` et `<meta name="description">` sont corrects
  - [x] Naviguer vers `/42` et vérifier dans DevTools que le `<title>` et `<meta name="description">` reflètent bien les clés `fortyTwo.pageTitle` / `fortyTwo.pageSubtitle` dans la langue active
  - [x] Changer de langue (EN → FR → ES) sur `/42` et vérifier que les meta tags se mettent à jour
  - [x] `npm run build` — 0 erreur

## Dev Notes

### État actuel — Ce qui est DÉJÀ fait (ne pas retoucher)

**`seo.config.js`** (`src/config/seo.config.js`) — entrée `fortyTwo` déjà présente depuis Story 4.1 :
```js
fortyTwo: {
  title: '42 Projects | Melchior JORDA',
  description: "Explore Mel's technical projects from École 42 Málaga: systems programming in C/C++, algorithms, Unix, and more.",
  path: '/42'
}
```
→ **Ne pas modifier** `seo.config.js` — le fichier est complet.

**`FortyTwo.vue`** (`src/pages/FortyTwo.vue`) — `MetaTags` déjà importé et utilisé :
```html
<MetaTags
  :title="$t('fortyTwo.pageTitle') + ' | Melchior JORDA'"
  :description="$t('fortyTwo.pageSubtitle')"
  ...
/>
```
→ **Ne pas modifier** `FortyTwo.vue` — la meta description est déjà multilingue via `$t()`.

**Locales** — clés `fortyTwo.pageTitle` et `fortyTwo.pageSubtitle` présentes dans les 3 fichiers :
- `en.json` : `"pageTitle": "École 42 Projects"`, `"pageSubtitle": "Explore the technical projects built at École 42 Málaga."`
- `fr.json` : `"pageTitle": "Projets École 42"`, `"pageSubtitle": "Découvre les projets techniques réalisés à l'École 42 Málaga."`
- `es.json` : `"pageTitle": "Proyectos École 42"`, `"pageSubtitle": "Descubre los proyectos técnicos realizados en École 42 Málaga."`
→ **Ne pas modifier** les locales — les clés SEO sont déjà complètes.

**`main.js`** — route `/42` déjà définie avec `titleKey: 'fortyTwo.pageTitle'` pour le `document.title` du router :
```js
{ path: '/42', component: () => import('./pages/FortyTwo.vue'), meta: { titleKey: 'fortyTwo.pageTitle' } }
```
→ **Ne pas modifier** `main.js`.

---

### Fichier à modifier : `public/sitemap.xml`

**Contenu exact à insérer** — ajouter avant la balise de fermeture `</urlset>` :

```xml
  <!-- 42 Projects Page -->
  <url>
    <loc>https://melchior-jorda.online/42</loc>
    <lastmod>2026-03-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://melchior-jorda.online/42" />
    <xhtml:link rel="alternate" hreflang="fr" href="https://melchior-jorda.online/42" />
    <xhtml:link rel="alternate" hreflang="es" href="https://melchior-jorda.online/42" />
  </url>
```

**Pourquoi pas `/42` avec slash initial dans la `<loc>` :** les autres entrées (`/about`, `/contact`, etc.) n'ont pas de slash initial dans le chemin (`melchior-jorda.online/about`, pas `melchior-jorda.online//about`). La `<loc>` est l'URL absolue complète — pas de double slash.

**Pourquoi `priority="0.85"` :** cohérent avec `/projects` (même valeur) — page de contenu principal, moins prioritaire que la home (`1.0`) ou l'about (`0.9`).

---

### Fichiers à modifier / créer

| Fichier | Action |
|---|---|
| `public/sitemap.xml` | **MODIFIER** — ajouter bloc `<url>` pour `/42` |

**Tous les autres fichiers :** NE PAS TOUCHER. `seo.config.js`, `FortyTwo.vue`, les locales, `main.js` sont déjà corrects.

---

### Architecture Constraints (OBLIGATOIRES)

- **Options API uniquement** — pas de `<script setup>`, pas de Composition API (mais cette story ne crée pas de composant Vue)
- **i18n** — les meta tags de `/42` sont déjà multilingues via `$t()` dans `FortyTwo.vue` — pattern correct, à ne pas briser
- **CI/CD inchangé** — ne pas toucher `firebase.json`, `.github/workflows/ci.yml`, ni `firebase.json` (NFR13)
- **Pas de nouvelle dépendance** — cette story ne nécessite aucune dépendance nouvelle
- **`sitemap.xml` est dans `public/`** — pas dans `src/` ni à la racine — respecter cet emplacement

---

### Learnings des stories précédentes

- **Story 6.1 (GA4)** : confirme que les modifications dans `public/` (assets statiques) sont copiées telles quelles dans `dist/` au build — pas besoin d'import JS pour `sitemap.xml`
- **Story 4.1 (FortyTwo.vue)** : `seo.config.js` a été mis à jour avec l'entrée `fortyTwo` lors de la création de la route — bien présent, ne pas recréer
- **Pattern MetaTags** : toutes les pages Vue utilisent `<MetaTags :title="..." :description="..." />` en première balise du template — `FortyTwo.vue` respecte déjà ce pattern

### References

- [Source: epics.md — Story 6.2 ACs] (seo.config.js, MetaTags, sitemap.xml, no-regression)
- [Source: src/config/seo.config.js] (entrée fortyTwo déjà présente — pages.fortyTwo.title/description/path)
- [Source: src/pages/FortyTwo.vue — lignes 3-5] (MetaTags déjà intégré avec $t('fortyTwo.pageTitle') et $t('fortyTwo.pageSubtitle'))
- [Source: src/locales/en.json + fr.json + es.json] (clés fortyTwo.pageTitle + fortyTwo.pageSubtitle présentes dans les 3 locales)
- [Source: src/main.js — ligne 14] (route /42 avec meta.titleKey: 'fortyTwo.pageTitle')
- [Source: public/sitemap.xml] (5 routes existantes, format avec xhtml:link hreflang — pas d'entrée /42)
- [Source: architecture.md — Project Structure] (sitemap.xml dans public/ ★ MODIFIÉ)

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

### Completion Notes List

- `public/sitemap.xml` mis à jour : bloc `<url>` pour `/42` ajouté après l'entrée `/projects`, avec `<loc>`, `<lastmod>2026-03-15`, `<changefreq>monthly`, `<priority>0.85`, et 3 `<xhtml:link>` hreflang (en/fr/es)
- `dist/sitemap.xml` confirmé : 6 entrées `<url>` (5 existantes + `/42`), entrée `/42` avec les 3 hreflang corrects
- Build : 76 modules, 0 erreur (2.02s) — aucune régression, taille des bundles identique
- AC1/AC2 déjà satisfaits depuis Story 4.1 (`seo.config.js` + `FortyTwo.vue` avec `MetaTags`) — aucune modification nécessaire
- Note : pas de test runner configuré dans ce projet (hors périmètre MVP — confirmé story 6.1)

### File List

- `public/sitemap.xml` (modifié — ajout entrée `/42`)
