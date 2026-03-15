# Story 6.1: Intégration Google Analytics 4

Status: done

## Story

As a site owner (Mel),
I want Google Analytics 4 to track page views and user sessions,
so that I can measure which pages drive contact conversions and optimize accordingly.

## Acceptance Criteria

1. **Given** a `VITE_GA_ID` variable defined in `.env`, **When** the app builds, **Then** the GA4 measurement ID is injected into `index.html` via the gtag.js script using Vite's `%VITE_GA_ID%` HTML replacement syntax.

2. **Given** a visitor navigates between pages, **When** `router.afterEach` fires in `main.js`, **Then** a `page_view` event is sent to GA4 with the correct `page_path` (i.e., `to.fullPath`).

3. **Given** the GA4 configuration in `index.html`, **When** initialized, **Then** `anonymize_ip: true` is set in the `gtag('config', ...)` call (RGPD compliance / NFR6).

4. **Given** the `.env` file, **When** committed to git, **Then** it is listed in `.gitignore` and NOT tracked by git — **AND** a `.env.example` file exists at project root with `VITE_GA_ID=` as a template.

5. **Given** the CI/CD pipeline (GitHub Actions → Firebase Hosting), **When** a push to `main` is made, **Then** the pipeline runs unchanged and the build succeeds with the GA4 script included (NFR13).

## Tasks / Subtasks

- [x] Task 1 — Créer les fichiers d'environnement (AC: 1, 4)
  - [x] Créer `.env` à la racine avec `VITE_GA_ID=G-XXXXXXXXXX` (valeur placeholder — Mel renseignera son vrai Measurement ID)
  - [x] Créer `.env.example` à la racine avec `VITE_GA_ID=` (fichier de template, committable)
  - [x] Ajouter `.env` dans `.gitignore` (section existante "EmailJS Configuration" — ajouter une section "Environment variables")

- [x] Task 2 — Injecter le script gtag.js dans `index.html` (AC: 1, 3)
  - [x] Ajouter le snippet GA4 juste avant `</head>` dans `index.html` (voir Dev Notes pour le code exact)
  - [x] Utiliser `%VITE_GA_ID%` pour le Measurement ID (substitution HTML Vite native — pas de plugin tiers)
  - [x] Inclure `anonymize_ip: true` dans l'appel `gtag('config', ...)`

- [x] Task 3 — Ajouter le hook pageview dans `main.js` (AC: 2)
  - [x] Dans le `router.afterEach` existant, ajouter l'envoi de l'event GA4 `page_view` avec `to.fullPath`
  - [x] Garder le hook conditionnel : `if (typeof gtag !== 'undefined' && import.meta.env.VITE_GA_ID)` pour éviter les erreurs en dev sans `.env`
  - [x] Ne pas toucher à la logique de titre existante dans `router.afterEach`

- [x] Task 4 — Validation finale (AC: 1–5)
  - [x] Vérifier que `.env` n'apparaît PAS dans `git status` (bien ignoré)
  - [x] Vérifier que `.env.example` apparaît dans `git status` comme untracked (committable)
  - [x] `npm run build` — 0 erreur, le script gtag.js doit apparaître dans le HTML généré dans `dist/`
  - [x] Vérifier dans `dist/index.html` que `%VITE_GA_ID%` a bien été substitué

## Dev Notes

### Fichiers à créer / modifier

| Fichier | Action |
|---|---|
| `index.html` | **MODIFIER** — ajouter snippet GA4 avant `</head>` |
| `src/main.js` | **MODIFIER** — ajouter hook pageview dans `router.afterEach` existant |
| `.gitignore` | **MODIFIER** — ajouter entrée `.env` |
| `.env` | **CRÉER** — variable locale, ne PAS committer |
| `.env.example` | **CRÉER** — template committable |

### `index.html` — Snippet GA4 exact à insérer juste avant `</head>`

```html
    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=%VITE_GA_ID%"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '%VITE_GA_ID%', { anonymize_ip: true });
    </script>
```

**Mécanisme Vite :** Vite remplace automatiquement `%VITE_GA_ID%` dans `index.html` à la compilation — **aucune dépendance externe, aucun plugin nécessaire**. Ne pas utiliser `import.meta.env.VITE_GA_ID` dans index.html (ça ne fonctionne que dans les fichiers JS/TS).

### `src/main.js` — Modification du `router.afterEach` existant

**Code actuel (lignes 20–26) :**
```js
router.afterEach((to) => {
  const key = to.meta && to.meta.titleKey ? to.meta.titleKey : null
  const title = key && i18n && i18n.global && i18n.global.t
    ? i18n.global.t(key)
    : (to.meta && to.meta.title) || ''
  document.title = `${title} · Melchior JORDA`
})
```

**Code cible — ajouter le bloc GA4 après la logique de titre :**
```js
router.afterEach((to) => {
  const key = to.meta && to.meta.titleKey ? to.meta.titleKey : null
  const title = key && i18n && i18n.global && i18n.global.t
    ? i18n.global.t(key)
    : (to.meta && to.meta.title) || ''
  document.title = `${title} · Melchior JORDA`
  // GA4 pageview tracking
  if (typeof gtag !== 'undefined' && import.meta.env.VITE_GA_ID) {
    gtag('event', 'page_view', { page_path: to.fullPath })
  }
})
```

**Pourquoi la condition :** `gtag` est défini globalement dans `index.html` — le guard `typeof gtag !== 'undefined'` évite une erreur JS si le script n'a pas encore chargé ou si `VITE_GA_ID` est vide en dev.

### `.env` — Contenu exact

```
VITE_GA_ID=G-XXXXXXXXXX
```

> Mel doit remplacer `G-XXXXXXXXXX` par son vrai Measurement ID GA4 (disponible dans Google Analytics → Admin → Data Streams → Measurement ID).

### `.env.example` — Contenu exact

```
# Google Analytics 4 Measurement ID
# Format: G-XXXXXXXXXX
# Get your ID from: Google Analytics > Admin > Data Streams
VITE_GA_ID=
```

### `.gitignore` — Ajout à faire

Ajouter après la section `# EmailJS Configuration (contains API keys)` :

```gitignore
# Environment variables (contains API keys)
.env
```

**CRITIQUE : ne pas supprimer les entrées existantes** du `.gitignore` — notamment `src/config/emailjs.config.js` qui doit rester ignoré.

### Architecture Constraints (OBLIGATOIRES)

- **Pas de nouvelle dépendance** — Vite supporte nativement `%VITE_GA_ID%` dans index.html, aucun plugin additionnel requis (contrainte 50kb, NFR architecture)
- **CI/CD inchangé** — ne PAS modifier `firebase.json`, `.github/workflows/ci.yml` ni aucun fichier de déploiement (NFR13)
- **Variables Vite** — toujours préfixer `VITE_` pour exposer côté browser (convention Vite — sans le préfixe, la variable est accessible en Node uniquement)
- **`anonymize_ip: true`** obligatoire — RGPD compliance (NFR6 / architecture.md ligne 166)
- **`router.afterEach` existant** — modifier uniquement en ajoutant le bloc GA4 **sans toucher** à la logique de titre qui existe

### CI/CD et Firebase Hosting — Note opérationnelle

Pour que le build CI/CD fonctionne avec le vrai Measurement ID (pas juste le placeholder), il faut ajouter `VITE_GA_ID` comme secret GitHub :
- GitHub → Settings → Secrets → Actions → New repository secret
- Nom : `VITE_GA_ID`, valeur : `G-XXXXXXXXXX`
- Le `.yml` existant doit référencer ce secret dans l'étape `build`

**Cependant : cette configuration GitHub/Firebase est hors scope du code.** Le build local avec `.env` suffit pour valider l'AC5. Documenter dans les Completion Notes que cette étape infra reste à faire.

### Learnings des stories précédentes

- **Options API uniquement** (code review story 4.2) — pas applicable ici (pas de composant Vue)
- **Pas de dépendance > 50kb gzippé** (architecture.md) — `gtag.js` est chargé en `async` depuis les CDN Google, pas inclus dans le bundle Vite
- **`@/` alias** fonctionne dans les imports JS — non applicable ici mais à garder en tête
- **`npm run build` 0 erreur obligatoire** — valider avant de marquer done
- **Story 5.1 pattern** : modifier les fichiers existants plutôt que d'en créer de nouveaux quand c'est possible

### References

- [Source: epics.md — Story 6.1 ACs] (VITE_GA_ID, gtag.js, router.afterEach, anonymize_ip, .gitignore, .env.example, CI/CD)
- [Source: architecture.md — Infrastructure & Deployment] (GA4 pattern, VITE_GA_ID, anonymize_ip, CI/CD inchangé)
- [Source: architecture.md — Technical Constraints] (pas de dep > 50kb, CI/CD non modifié)
- [Source: architecture.md — Authentication & Security] (anonymize_ip: true obligatoire, NFR6)
- [Source: architecture.md — Directory structure] (index.html ★ MODIFIÉ, main.js ★ MODIFIÉ)
- [Source: src/main.js — lignes 20–26] (router.afterEach existant — ne modifier qu'en ajoutant le bloc GA4)
- [Source: index.html — ligne 176-180] (emplacement d'insertion du snippet : juste avant `</head>`)
- [Source: .gitignore] (pas d'entrée .env — à ajouter ; emailjs.config.js déjà ignoré)

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

### Completion Notes List

- `.env` créé à la racine avec `VITE_GA_ID=G-XXXXXXXXXX` (placeholder) — bien ignoré par git (confirmé via `git status`)
- `.env.example` créé à la racine — template committable avec commentaires explicatifs
- `.gitignore` mis à jour : nouvelle section "Environment variables" avec entrée `.env` ajoutée avant la section EmailJS
- Snippet GA4 injecté dans `index.html` juste avant `</head>` — `%VITE_GA_ID%` substitué nativement par Vite, `anonymize_ip: true` inclus (NFR6/RGPD)
- Hook `page_view` ajouté dans `router.afterEach` de `main.js` — conditionnel `typeof gtag !== 'undefined' && import.meta.env.VITE_GA_ID` pour sécurité dev
- Logique de titre existante dans `router.afterEach` conservée intacte
- Build : 76 modules, 0 erreur (3.31s) — `dist/index.html` confirme la substitution de `%VITE_GA_ID%` → `G-XXXXXXXXXX`
- Note : aucun test runner configuré dans ce projet (architecture.md — hors périmètre MVP)
- Note opérationnelle : pour activer GA4 en prod, remplacer `G-XXXXXXXXXX` dans `.env` par le vrai Measurement ID, et configurer `VITE_GA_ID` comme secret GitHub Actions

### File List

- `.env` (créé — variable locale, non committée)
- `.env.example` (créé — template committable)
- `.gitignore` (modifié — ajout entrée `.env`)
- `index.html` (modifié — ajout snippet GA4 avec `%VITE_GA_ID%` et `anonymize_ip: true`)
- `src/main.js` (modifié — ajout hook `page_view` dans `router.afterEach`)
