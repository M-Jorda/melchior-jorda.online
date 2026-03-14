---
stepsCompleted: [1, 2]
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
