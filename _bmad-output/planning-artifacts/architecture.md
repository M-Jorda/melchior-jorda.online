---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-03-14'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - _bmad-output/planning-artifacts/product-brief-melchior-jorda.online-2026-03-13.md
  - docs/index.md
  - docs/technology-stack.md
  - docs/ui-component-inventory.md
  - docs/projects-data.md
  - docs/i18n-localization.md
  - docs/seo-strategy.md
  - docs/development-guide.md
  - docs/deployment-configuration.md
workflowType: 'architecture'
project_name: 'melchior-jorda.online'
user_name: 'Mel'
date: '2026-03-14'
---

# Architecture Decision Document

_Ce document se construit collaborativement étape par étape. Les sections sont ajoutées au fil des décisions architecturales prises ensemble._

## Project Context Analysis

### Requirements Overview

**Functional Requirements (25 total) :**

- *Project Showcase (FR1–4)* — Enrichir ProjectCard pour afficher clientContext, result, status depuis projects.json. Filtrage par catégorie.
- *Offre Freelance (FR5–7)* — Nouveau bloc/section décrivant types de sites et tarification.
- *Signaux de Crédibilité (FR8–10)* — Badge NASA hero, explication 42.
- *Projets 42 (FR11–13)* — ≥1 visualisation via outil en ligne dédié push_swap (embed ou lien externe) + explication technique profonde. Distinction visuelle projets 42 vs clients. **Note : aucune animation custom à développer — outil externe spécialisé utilisé.**
- *Contact & Conversion (FR14–17)* — CTA accessible depuis toutes les pages, ≤2 clics depuis home, 3 langues.
- *Support Multilingue (FR18–19)* — Toute nouvelle section : 3 clés i18n obligatoires.
- *Gestion Contenu (FR20–22)* — Mel peut ajouter projet via JSON seul, sans toucher au code.
- *Services Additionnels (FR23–25)* — Panel admin et maintenance mensuelle présentés comme options post-livraison.

**Non-Functional Requirements :**

- Performance : Lighthouse ≥ 85 mobile + desktop ; FCP ≤ 2s 4G ; pas de dégradation liée aux visualisations (outil externe = pas de charge JS custom).
- Sécurité : honeypot maintenu, RGPD mention formulaire.
- Accessibilité : WCAG 2.1 AA (contrast 4.5:1, clavier, alt images), mobile à partir de 320px.
- Intégrations : EmailJS avec gestion d'erreur explicite, CI/CD non modifié, aucune dep > 50kb non justifiée.

**Scale & Complexity :**

- Domaine principal : frontend SPA (Vue 3, browser-only)
- Complexité : low — brownfield ciblé, logique produit simple
- Composants architecturaux estimés : 3–5 nouveaux composants, 1 enrichissement de schéma de données

### Technical Constraints & Dependencies

- **Options API uniquement** — pas de `<script setup>` ni Composition API
- **`#app` scroll** — scroll listeners sur `document.getElementById('app')`, jamais sur `window`
- **Pas de store global** — état local ou props/events uniquement
- **`src/data/projects.json` seule source de données** — pas de nouvelle source externe
- **i18n obligatoire** — toute feature fournit les 3 traductions (`en.json`, `fr.json`, `es.json`)
- **Aucune dépendance > 50kb gzippé** sans justification explicite
- **CI/CD existant non modifié** — pipeline Firebase/GitHub Actions intact
- **Navigateurs cibles** : Chrome, Firefox, Safari, Edge (2 dernières versions)
- **Visualisation push_swap** — outil en ligne externe spécialisé (lien ou embed léger), pas de développement custom d'animation

### Cross-Cutting Concerns Identified

1. **Internationalisation (i18n)** — Toutes les nouvelles features ajoutent des clés dans les 3 locales. Pattern établi, à respecter strictement.
2. **Dark/Light mode** — Toute nouvelle UI utilise les classes Tailwind existantes (`dark:` prefix). Palette orange/navy déjà définie.
3. **SEO dynamique** — Les nouvelles sections s'intègrent au système MetaTags.vue + JSON-LD existant sans régression.
4. **Performance** — Seuil Lighthouse ≥ 85 non-négociable. Lazy loading, WebP/compression images. Risque animation éliminé par le choix d'outil externe.

## Starter Template Evaluation

### Primary Technology Domain

Frontend SPA (Vue 3, browser-only) — brownfield, codebase existant.

### Starter Options Considered

Projet brownfield : aucun nouveau starter évalué. La stack existante est la fondation retenue. Toute introduction d'un nouveau starter constituerait une refonte hors périmètre MVP.

### Selected Starter: Codebase existant — melchior-jorda.online

**Rationale for Selection:**
La stack Vue 3 / Vite / Tailwind / Firebase est opérationnelle, déployée, documentée (8 fichiers docs/) et maîtrisée par Mel. La remplacer n'apporterait aucune valeur produit et introduirait une dette technique non justifiée.

**Initialization Command:**
N/A — projet initialisé. Développement local : `npm run dev`

**Architectural Decisions Provided by la stack existante :**

**Language & Runtime:**
JavaScript ES2022+, pas de TypeScript. Options API Vue 3 — pattern figé, pas de migration Composition API.

**Styling Solution:**
TailwindCSS 3 avec palette custom (orange `#ff7a18` / navy `#0b1220`). Dark mode class-based (`dark:`). PostCSS + Autoprefixer configurés.

**Build Tooling:**
Vite 7 avec code splitting manuel (`vue`, `vue-router`, `vue-i18n` en chunks séparés). Alias `@` → `src/`.

**Testing Framework:**
Aucun test runner configuré — hors périmètre MVP. Décision non bloquante pour les features ciblées.

**Code Organization:**
`src/views/` (pages), `src/components/` (composants réutilisables), `src/data/projects.json` (source de données), `src/locales/` (i18n).

**Development Experience:**
Hot reload Vite, CI/CD GitHub Actions → Firebase push `main`. Pas de modification du pipeline pour le MVP.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Enrichissement schéma projects.json (fondation de toutes les features)
- Route `/42` dédiée aux projets 42
- Stratégie vidéo pour les projets visuels 42

**Important Decisions (Shape Architecture):**
- Intégration Google Analytics 4
- Sections nouvelles sur pages existantes (pas de nouvelles routes sauf `/42`)

**Deferred Decisions (Post-MVP):**
- Tests automatisés (aucun test runner configuré — hors périmètre)
- Démos interactives live (post-MVP explicitement)

---

### Data Architecture

**Source de données unique : `src/data/projects.json`**
Pas de base de données, pas de backend. Toute la donnée projet est dans ce fichier.

**Enrichissement du schéma projects.json :**
```json
{
  "clientContext": "string — secteur + besoin client (ex: 'Restaurant familial cherchant visibilité en ligne')",
  "result": "string — résultat concret livré (ex: 'Site livré en 3 semaines, +30% réservations')",
  "status": "delivered | in-progress",
  "featured": "boolean — mise en avant (badge hero, NASA)"
}
```
Les champs `clientContext` et `result` sont localisés via les clés i18n existantes (`projects.items.{id}.clientContext`, `projects.items.{id}.result`).
Les champs `status` et `featured` sont des valeurs neutres (pas besoin de traduction).

**Gestion des vidéos :**
Fichiers hébergés localement dans `public/assets/videos/{project-id}/`.
Format : `mp4` + `webm` fallback. Poster WebP (première frame). Chargement `lazy`.
Référencés dans `projects.json` via un champ `video: "assets/videos/{id}/demo.mp4"`.

---

### Authentication & Security

**Pas d'authentification** — SPA publique, aucun compte utilisateur.

**Sécurité formulaire contact :**
- Honeypot anti-bot existant (`formData.website`) maintenu tel quel
- Mention RGPD à ajouter avant le bouton de soumission (nouvelle clé i18n)

**Données visiteurs :**
- Aucune donnée personnelle stockée côté client au-delà de la session
- GA4 : anonymisation IP activée (`anonymize_ip: true`)

---

### API & Communication Patterns

**Pas d'API propriétaire** — SPA browser-only.

**EmailJS** : service existant maintenu, gestion d'erreur explicite ajoutée (message visible si le service est indisponible).

**Visualisation projets 42** : vidéos locales (mp4/webm), pas d'iframe externe, pas de dépendance réseau pour le contenu.

---

### Frontend Architecture

**State Management :**
Pas de store global. État local dans chaque composant.
Dark mode et langue persistés dans `localStorage` via `Header.vue` — inchangé.

**Nouvelles routes :**
- `/42` — Page dédiée aux projets 42 (chargement lazy)
  Contenu : projets 42 avec vidéo + explication technique profonde + lien GitHub
  Public cible : Thomas (recruteur tech)
- Toutes les autres nouvelles sections s'intègrent sur les pages existantes :
  - Badge NASA → `Home.vue` (section hero)
  - Offre freelance + tarification → `Home.vue` (nouvelle section)
  - Services additionnels → `About.vue`

**Nouveaux composants (estimés) :**
- `ProjectCard.vue` — enrichi avec `clientContext`, `result`, `status` badge
- `NasaBadge.vue` — composant réutilisable badge NASA hero
- `FreelanceOffer.vue` — section offre + tarification
- `ProjectVideo.vue` — lecteur vidéo lazy avec poster WebP
- `FortyTwoPage.vue` — page `/42` dédiée

**Performance :**
- `FortyTwoPage.vue` chargé en lazy via vue-router (`import()`)
- Vidéos : attributs `preload="none"` + `lazy` — chargées uniquement à l'affichage
- Images projets : WebP, attribut `loading="lazy"`

**Routing :**
Ajout dans `src/router/index.js` :
```js
{ path: '/42', component: () => import('@/views/FortyTwo.vue') }
```

---

### Infrastructure & Deployment

**Hosting :** Firebase Hosting — inchangé.
**CI/CD :** GitHub Actions push `main` → build Vite → deploy Firebase — inchangé.

**Google Analytics 4 :**
Script `gtag.js` injecté dans `index.html`. Tracking pageviews automatique via vue-router `afterEach`. Anonymisation IP activée.
Measurement ID stocké dans variable d'environnement Vite (`VITE_GA_ID`).

**Environnement :**
Variables Vite (`import.meta.env.VITE_*`) pour les clés externes (GA, EmailJS).
EmailJS keys déjà dans `src/config/emailjs.config.js` — pattern maintenu.

---

### Decision Impact Analysis

**Implementation Sequence :**
1. Enrichissement `projects.json` (schéma + données existantes migrées)
2. `ProjectCard.vue` mis à jour (affiche nouveaux champs)
3. Badge NASA + section offre freelance sur `Home.vue`
4. Route `/42` + `FortyTwo.vue` + `ProjectVideo.vue`
5. Services additionnels sur `About.vue`
6. Google Analytics 4
7. Mention RGPD formulaire contact

**Cross-Component Dependencies :**
- `ProjectCard` dépend du nouveau schéma `projects.json`
- `FortyTwo.vue` dépend de `ProjectVideo.vue` + champ `video` dans `projects.json`
- GA4 dépend de `VITE_GA_ID` configuré dans Firebase + `.env`
- Toutes les nouvelles features dépendent des 3 clés i18n (FR/EN/ES)

## Implementation Patterns & Consistency Rules

### Points de conflit identifiés (7 zones critiques)

### 1. Naming Patterns

**Composants Vue :**
- PascalCase pour le nom du fichier ET la balise : `ProjectCard.vue` → `<ProjectCard />`
- Jamais kebab-case pour les fichiers : ~~`project-card.vue`~~

**Fichiers :**
- Vues (pages) : PascalCase → `FortyTwo.vue`, `Projects.vue`
- Composants : PascalCase → `ProjectVideo.vue`, `NasaBadge.vue`
- Data/config : camelCase → `projects.json`, `emailjs.config.js`
- Assets vidéo : kebab-case → `push-swap-demo.mp4`, `cub3d-demo.mp4`

**i18n keys :**
Pattern établi — TOUJOURS respecter la hiérarchie existante :
```
projects.items.{project-id}.title
projects.items.{project-id}.description
projects.items.{project-id}.clientContext   ← nouveaux champs
projects.items.{project-id}.result          ← nouveaux champs
nav.fortyTwo                                ← nouvelle entrée nav
home.nasaBadge.title                        ← nouveaux blocs
home.freelanceOffer.title
```
Jamais de clés à plat comme `clientContextPushSwap`. Toujours imbriqué.

**projects.json fields :**
camelCase strict — `clientContext`, `result`, `status`, `featured`, `video`.
Jamais snake_case (`client_context`) ni PascalCase (`ClientContext`).

---

### 2. Structure Patterns

**Nouveaux composants :** toujours dans `src/components/`
**Nouvelles vues (pages) :** toujours dans `src/views/`
**Vidéos :** `public/assets/videos/{project-id}/demo.mp4` + `demo.webm`
**Posters vidéo :** `public/assets/videos/{project-id}/poster.webp`
**Images projets :** `public/assets/images/{project-id}/` (pattern existant)

---

### 3. Vue Options API — Ordre des options

Ordre OBLIGATOIRE dans tous les composants :
```js
export default {
  name: '',
  components: {},
  props: {},
  data() { return {} },
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
  // autres hooks lifecycle
}
```
Jamais `<script setup>`. Jamais Composition API.

---

### 4. Communication entre composants

- Parent → Enfant : **props** uniquement (pas d'accès direct `$parent`)
- Enfant → Parent : **`$emit`** avec événements kebab-case
  - ✅ `this.$emit('contact-submitted', payload)`
  - ❌ `this.$emit('contactSubmitted', payload)`
- Pas de bus d'événements global. Pas de Pinia/Vuex.
- Partage d'état (langue, thème) : `Header.vue` via `localStorage` — ne pas dupliquer.

---

### 5. Tailwind & Dark mode

- **Toujours Tailwind** — jamais de style inline `style=""` sauf pour valeurs dynamiques (ex: largeur calculée)
- **Dark mode** : préfixe `dark:` systématique, jamais de JS pour changer les couleurs
  - ✅ `class="text-gray-900 dark:text-white"`
  - ❌ `style="color: var(--text-color)"`
- Palette custom : utiliser les tokens définis (`accent-500`, `primary`, `orange-400`) — jamais de valeur hex directe dans les classes

---

### 6. Scroll & DOM

- Scroll listeners : **toujours sur `#app`**
  ```js
  document.getElementById('app').addEventListener('scroll', handler)
  ```
  ❌ Jamais `window.addEventListener('scroll', handler)`
- `mounted()` pour les listeners DOM, `beforeUnmount()` pour les nettoyer

---

### 7. Process Patterns

**Loading states :**
```js
data() { return { isLoading: false, error: null } }
```
Nommage : `isLoading`, `isSubmitting`, `isSending` — toujours booléen préfixé `is`.

**Error handling :**
- Erreurs EmailJS : afficher message visible dans le template (pas seulement `console.error`)
- Pattern :
  ```js
  this.error = this.$t('contact.errorMessage')  // clé i18n
  ```
- Jamais laisser une erreur silencieuse sans feedback UI

**Vidéos (ProjectVideo.vue) :**
```html
<video
  :poster="posterSrc"
  preload="none"
  loading="lazy"
  controls
  playsinline
>
  <source :src="videoSrc" type="video/mp4" />
  <source :src="videoSrcWebm" type="video/webm" />
</video>
```
Toujours fournir mp4 + webm. Toujours `preload="none"`.

---

### Enforcement — Ce que TOUS les agents DOIVENT respecter

1. Options API uniquement — aucune exception
2. i18n obligatoire pour tout texte visible (3 locales : en, fr, es)
3. Scroll listeners sur `#app`, jamais sur `window`
4. `projects.json` seule source de données — jamais de données hardcodées dans les composants
5. Toute nouvelle dépendance > 50kb gzippé doit être justifiée explicitement
6. Chaque nouvelle feature : tester en dark mode ET light mode avant commit

## Project Structure & Boundaries

### Complete Project Directory Structure

```
melchior-jorda.online/
│
├── index.html                        # ★ MODIFIÉ — ajout script gtag.js GA4
├── package.json
├── vite.config.js
├── tailwind.config.cjs
├── postcss.config.cjs
├── firebase.json
├── .env                              # ★ NEW — VITE_GA_ID (git-ignored)
├── .env.example                      # ★ NEW — template variables d'environnement
│
├── src/
│   ├── main.js                       # ★ MODIFIÉ — ajout route /42 + GA4 router hook
│   ├── App.vue
│   ├── i18n.js
│   │
│   ├── pages/
│   │   ├── Home.vue                  # ★ MODIFIÉ — NasaBadge + FreelanceOffer
│   │   ├── Projects.vue              # ★ MODIFIÉ — ProjectCard enrichi
│   │   ├── FortyTwo.vue              # ★ NEW — page dédiée projets 42
│   │   ├── About.vue                 # ★ MODIFIÉ — services additionnels
│   │   ├── Resume.vue
│   │   ├── Contact.vue               # ★ MODIFIÉ — mention RGPD
│   │   └── NotFound.vue
│   │
│   ├── components/
│   │   ├── Header.vue                # ★ MODIFIÉ — lien nav /42
│   │   ├── Footer.vue
│   │   ├── MetaTags.vue
│   │   ├── ProjectCard.vue           # ★ NEW — carte projet enrichie (clientContext, result, status)
│   │   ├── NasaBadge.vue             # ★ NEW — badge NASA hero réutilisable
│   │   ├── FreelanceOffer.vue        # ★ NEW — section offre freelance + tarification
│   │   └── ProjectVideo.vue          # ★ NEW — lecteur vidéo lazy (mp4/webm + poster)
│   │
│   ├── data/
│   │   └── projects.json             # ★ MODIFIÉ — nouveaux champs + projets 42 avec vidéos
│   │
│   ├── locales/
│   │   ├── en.json                   # ★ MODIFIÉ — nouvelles clés (clientContext, result, NASA, offre, RGPD, /42)
│   │   ├── fr.json                   # ★ MODIFIÉ — idem
│   │   └── es.json                   # ★ MODIFIÉ — idem
│   │
│   ├── config/
│   │   ├── seo.config.js             # ★ MODIFIÉ — ajout route /42
│   │   ├── emailjs.config.js
│   │   └── emailjs.config.example.js
│   │
│   └── styles/
│       └── tailwind.css
│
├── public/
│   ├── assets/
│   │   ├── Melchior_Jorda_FullStack_EN.pdf
│   │   ├── Melchior_Jorda_FullStack_FR.pdf
│   │   ├── Melchior_Jorda_FullStack_ES.pdf
│   │   └── videos/                   # ★ NEW — vidéos projets 42
│   │       ├── push-swap/
│   │       │   ├── demo.mp4
│   │       │   ├── demo.webm
│   │       │   └── poster.webp
│   │       ├── cub3d/
│   │       │   ├── demo.mp4
│   │       │   ├── demo.webm
│   │       │   └── poster.webp
│   │       ├── so-long/
│   │       │   ├── demo.mp4
│   │       │   ├── demo.webm
│   │       │   └── poster.webp
│   │       └── philo/
│   │           ├── demo.mp4
│   │           ├── demo.webm
│   │           └── poster.webp
│   ├── sitemap.xml                   # ★ MODIFIÉ — ajout /42
│   ├── favicon.png
│   ├── favicon.svg
│   ├── manifest.json
│   ├── robots.txt
│   └── .htaccess
│
├── .github/
│   └── workflows/
│       └── ci.yml                    # inchangé
│
└── docs/                             # documentation AI (inchangé)
```

### Architectural Boundaries

**Pas d'API** — SPA browser-only. Toutes les limites sont frontend.

**Component Boundaries :**

| Composant | Responsabilité | Reçoit | Émet |
|---|---|---|---|
| `ProjectCard.vue` | Afficher 1 projet (client ou 42) | props: `project` (objet complet) | `click` |
| `NasaBadge.vue` | Badge NASA hero | props: `variant` (hero/inline) | — |
| `FreelanceOffer.vue` | Section offre + tarifs | — | `contact-requested` |
| `ProjectVideo.vue` | Lecteur vidéo lazy | props: `src`, `srcWebm`, `poster`, `title` | — |
| `FortyTwo.vue` (page) | Agrège ProjectCard + ProjectVideo pour projets 42 | — | — |

**Data Boundaries :**

```
projects.json
    → importé dans Home.vue (featured), Projects.vue (tous), FortyTwo.vue (catégorie 42)
    → jamais modifié à runtime — lecture seule côté client

locales/{en,fr,es}.json
    → injectés via vue-i18n, $t() dans tous les composants
    → source unique pour tout texte visible

emailjs.config.js
    → consommé uniquement par Contact.vue
    → clés dans src/config/ (jamais dans les templates)

VITE_GA_ID
    → consommé uniquement dans index.html + main.js (router hook)
```

### Requirements → Structure Mapping

| FR | Fichiers concernés |
|---|---|
| FR1–4 (Project Showcase) | `projects.json` ★, `ProjectCard.vue` ★, `Projects.vue` |
| FR5–7 (Offre Freelance) | `FreelanceOffer.vue` ★, `Home.vue`, locales |
| FR8–10 (Crédibilité NASA/42) | `NasaBadge.vue` ★, `Home.vue`, `FortyTwo.vue` ★ |
| FR11–13 (Projets 42 visuels) | `FortyTwo.vue` ★, `ProjectVideo.vue` ★, `public/assets/videos/` ★ |
| FR14–17 (Contact/CTA) | `Contact.vue`, `Header.vue`, tous les composants CTA |
| FR18–19 (i18n) | `locales/en.json` ★, `fr.json` ★, `es.json` ★ |
| FR20–22 (Gestion contenu) | `projects.json` ★ (schéma enrichi) |
| FR23–25 (Services additionnels) | `About.vue`, locales |
| NFR (GA4) | `index.html` ★, `main.js` ★, `.env` ★ |
| NFR (RGPD) | `Contact.vue` ★, locales ★ |

### Data Flow

```
Visiteur charge la page
    → index.html (GA4 script)
    → main.js (Vue app + router + GA4 pageview hook)
    → App.vue (Header + router-view + Footer)
        → Home.vue
            importe projects.json → filtre featured=true → NasaBadge + FreelanceOffer + ProjectCard
        → Projects.vue
            importe projects.json → tous projets → ProjectCard (filtre par catégorie)
        → FortyTwo.vue  ★ NEW
            importe projects.json → filtre category='42' → ProjectCard + ProjectVideo
        → Contact.vue
            EmailJS → email Mel
```

### Correction patterns étape 5

Suite à la lecture du code source :
- Pages dans `src/pages/` (pas `src/views/`)
- Routes définies inline dans `src/main.js` (pas de fichier `src/router/index.js` séparé)
- Nouvelle route `/42` à ajouter directement dans le tableau `routes` de `src/main.js`

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility :**
- Vue 3.4 + Vite 7 + TailwindCSS 3 + vue-router 4 + vue-i18n 9 + Firebase Hosting →
  stack éprouvée, aucun conflit de versions connu. EmailJS 4.x browser-compatible.
- Pas de store global + état local → cohérent avec l'absence de backend et la
  faible complexité de l'état applicatif.
- Options API partout → cohérent avec la base de code existante, aucune friction de migration.

**Pattern Consistency :**
- Naming PascalCase composants + camelCase JSON + hiérarchie i18n imbriquée →
  cohérents entre eux, documentés avec exemples et anti-patterns.
- Dark mode `dark:` Tailwind + palette custom tokens → cohérent avec `tailwind.config.cjs`.
- Scroll sur `#app` → documenté, justifié, exemple fourni.

**Structure Alignment :**
- Nouvelle page `FortyTwo.vue` dans `src/pages/` → aligne avec le pattern existant.
- Routes inline dans `src/main.js` → correction documentée (étape 5 corrigée en étape 6).
- Videos dans `public/assets/videos/` → respecte la convention `public/` pour les assets statiques.

---

### Requirements Coverage Validation ✅

**Functional Requirements (25/25 couverts) :**

| Catégorie | FRs | Couverture architecturale |
|---|---|---|
| Project Showcase | FR1–4 | `ProjectCard.vue` + schéma `projects.json` enrichi |
| Offre Freelance | FR5–7 | `FreelanceOffer.vue` + `Home.vue` |
| Crédibilité | FR8–10 | `NasaBadge.vue` + `Home.vue` + `FortyTwo.vue` |
| Projets 42 | FR11–13 | `FortyTwo.vue` + `ProjectVideo.vue` + `public/assets/videos/` |
| Contact/CTA | FR14–17 | `Contact.vue` + CTA présent dans tous les composants |
| i18n | FR18–19 | 3 locales systématiques, pattern enforced |
| Gestion contenu | FR20–22 | `projects.json` seule source, schéma enrichi |
| Services additionnels | FR23–25 | `About.vue` + locales |

**Non-Functional Requirements (14/14 couverts) :**

- Performance (NFR1–4) : lazy loading pages + `preload="none"` vidéos + WebP images. Aucune animation custom (risque éliminé).
- Sécurité (NFR5–7) : honeypot maintenu, RGPD mention dans `Contact.vue`, GA4 `anonymize_ip: true`.
- Accessibilité (NFR8–11) : alt obligatoire enforced, Tailwind contrast tokens, `playsinline` vidéos.
- Intégrations (NFR12–14) : EmailJS error UI, CI/CD inchangé, contrainte 50kb enforced.

---

### Implementation Readiness Validation ✅

**Decision Completeness :** 7 décisions critiques documentées avec rationale.
**Structure Completeness :** Arbre complet avec marqueurs NEW/MODIFIÉ, mapping FR→fichier.
**Pattern Completeness :** 7 zones de conflit identifiées et résolues avec exemples et anti-patterns explicites.

---

### Gap Analysis Results

**Gaps critiques :** aucun.

**Gaps mineurs (non bloquants) :**
- `alt` attributes : mentionné dans enforcement, à préciser en story d'implémentation.
- `.env` / `.gitignore` : vérifier que `.env` est bien git-ignoré en début d'implémentation.
- Sitemap update : `/42` à ajouter manuellement à `sitemap.xml` — action documentée en story.

---

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Contexte projet analysé (PRD + UX + 8 docs)
- [x] Complexité évaluée (low, brownfield)
- [x] Contraintes techniques identifiées
- [x] Préoccupations transversales mappées (i18n, dark mode, SEO, perf)

**✅ Architectural Decisions**
- [x] Stack confirmée (brownfield, inchangée)
- [x] Route `/42` décidée
- [x] Stratégie vidéo décidée (mp4/webm local)
- [x] GA4 décidé et intégration spécifiée
- [x] Schéma `projects.json` défini

**✅ Implementation Patterns**
- [x] Naming conventions (composants, fichiers, i18n, JSON)
- [x] Options API — ordre des options
- [x] Communication props/emit
- [x] Tailwind + dark mode
- [x] Scroll sur #app
- [x] Process patterns (loading, errors, vidéos)
- [x] 6 règles d'enforcement

**✅ Project Structure**
- [x] Arbre complet avec NEW/MODIFIÉ
- [x] Boundaries composants (props/emits définis)
- [x] Data flow documenté
- [x] FR → fichiers mapping complet

---

### Architecture Readiness Assessment

**Overall Status : READY FOR IMPLEMENTATION**

**Confidence Level : HIGH**

**Key Strengths :**
- Stack brownfield très bien documentée — agents n'ont aucune ambiguïté sur les patterns
- Schéma de données clair et extensible
- Risque performance éliminé (vidéos locales, pas d'animation custom)
- Séparation claire client vs recruteur (route `/42` dédiée)

**Areas for Future Enhancement (post-MVP) :**
- Ajouter un test runner (Vitest) une fois le MVP stabilisé
- Automatiser la mise à jour du sitemap
- Envisager un fichier `src/router/index.js` séparé si les routes continuent de croître

---

### Implementation Handoff

**AI Agent Guidelines :**
- Suivre Options API strictement — aucune exception
- Toujours fournir les 3 clés i18n avec chaque feature
- Utiliser `src/pages/` pour les vues et `src/components/` pour les composants réutilisables
- Référencer ce document pour toute question architecturale

**First Implementation Priority :**
1. Enrichir `projects.json` (schéma + données)
2. Créer `ProjectCard.vue`
3. Badge NASA + `FreelanceOffer.vue` sur `Home.vue`
4. Route `/42` + `FortyTwo.vue` + `ProjectVideo.vue`
5. GA4 + RGPD
