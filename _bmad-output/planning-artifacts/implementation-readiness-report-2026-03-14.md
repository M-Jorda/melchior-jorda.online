---
stepsCompleted: ["step-01-document-discovery", "step-02-prd-analysis", "step-03-epic-coverage-validation", "step-04-ux-alignment", "step-05-epic-quality-review", "step-06-final-assessment"]
documentsUsed:
  prd: "_bmad-output/planning-artifacts/prd.md"
  architecture: "_bmad-output/planning-artifacts/architecture.md"
  epics: "_bmad-output/planning-artifacts/epics.md"
  ux: "_bmad-output/planning-artifacts/ux-design-specification.md"
---

# Implementation Readiness Assessment Report

**Date:** 2026-03-14
**Project:** melchior-jorda.online

---

## Document Inventory

| Type | Fichier | Taille | Date |
|------|---------|--------|------|
| PRD | `prd.md` | 16K | 2026-03-13 |
| Architecture | `architecture.md` | 27K | 2026-03-14 |
| Epics | `epics.md` | 35K | 2026-03-14 |
| UX Design | `ux-design-specification.md` | 45K | 2026-03-13 |

Aucun doublon détecté. Tous les 4 documents requis présents.

---

## PRD Analysis

### Functional Requirements

FR1: Les visiteurs peuvent consulter chaque projet avec son contexte client (problème, secteur, public cible) et son résultat concret
FR2: Les visiteurs peuvent identifier le statut d'un projet (livré / en cours)
FR3: Les visiteurs peuvent parcourir les projets organisés par catégorie (sites clients, projets 42, autres)
FR4: Les visiteurs peuvent voir des visuels pour chaque projet client
FR5: Les visiteurs peuvent comprendre les types de sites que Mel réalise (vitrine, e-commerce, multi-pages)
FR6: Les visiteurs peuvent identifier les profils clients ciblés (artisans, restaurateurs, professions libérales, e-commerçants)
FR7: Les visiteurs peuvent voir la fourchette tarifaire pour les services freelance
FR8: Les visiteurs voient le résultat NASA Space Apps Challenge (1ère place Málaga 2025 + qualification nationale) mis en avant sur la page d'accueil
FR9: Les visiteurs peuvent comprendre ce qu'est la formation 42 et ce qu'elle signifie (rigueur, autonomie, validation par les pairs)
FR10: Les visiteurs peuvent accéder au parcours complet de Mel (formation, projets, compétences)
FR11: Les visiteurs peuvent voir ≥ 1 projet 42 avec une visualisation animée illustrant son comportement ou algorithme
FR12: Les visiteurs peuvent lire une explication technique approfondie d'un projet 42 (décisions de conception, contraintes, apprentissages)
FR13: Les visiteurs peuvent distinguer visuellement les projets 42 des projets clients
FR14: Les visiteurs peuvent envoyer un message à Mel depuis n'importe quelle page
FR15: Les visiteurs peuvent atteindre le formulaire de contact en ≤ 2 clics depuis la home
FR16: Les visiteurs peuvent soumettre un message en français, anglais ou espagnol
FR17: Mel reçoit les soumissions du formulaire par email
FR18: Tout nouveau contenu est accessible en français, anglais et espagnol
FR19: Les visiteurs peuvent changer de langue depuis n'importe quelle page
FR20: Mel peut ajouter un projet client avec contexte, résultat et statut sans modifier le code des composants
FR21: Mel peut marquer un projet "en cours" ou "livré"
FR22: Mel peut renseigner le contenu traduit d'un nouveau projet dans les 3 langues via les fichiers de données existants
FR23: Les visiteurs peuvent consulter les options de services additionnels post-livraison (panel d'administration, maintenance mensuelle)
FR24: Les visiteurs peuvent comprendre ce qu'inclut chaque option — panel admin : gestion autonome du contenu sans intervention dev ; maintenance : mises à jour, sécurité, support sur plusieurs mois
FR25: Les visiteurs peuvent exprimer leur intérêt pour une option additionnelle via le formulaire de contact

**Total FRs: 25**

### Non-Functional Requirements

NFR1: Score Lighthouse Performance ≥ 85 sur mobile et desktop
NFR2: First Contentful Paint (FCP) ≤ 2 secondes sur connexion 4G mobile
NFR3: Les visualisations animées (projets 42) ne dégradent pas le score Lighthouse de plus de 5 points
NFR4: Les images de projets sont optimisées (WebP ou compressé, lazy-loaded)
NFR5: Le formulaire de contact maintient la protection anti-bot honeypot existante
NFR6: Aucune donnée personnelle des visiteurs n'est stockée côté client au-delà de la session
NFR7: Le formulaire de contact affiche une mention d'utilisation des données conforme RGPD avant soumission
NFR8: Toutes les images de projets disposent d'attributs `alt` descriptifs
NFR9: Ratio de contraste des textes ≥ 4.5:1 (WCAG 2.1 AA)
NFR10: Navigation fonctionnelle au clavier (focus visible, ordre logique)
NFR11: Site lisible et utilisable sur mobile à partir de 320px
NFR12: En cas d'indisponibilité d'EmailJS, un message d'erreur explicite est affiché au visiteur
NFR13: Le pipeline CI/CD Firebase / GitHub Actions existant déploie les features MVP sans modification
NFR14: Aucune nouvelle dépendance > 50kb gzippé sans justification explicite

**Total NFRs: 14**

### Additional Requirements / Contraintes Techniques

- Options API uniquement — pas de `<script setup>` ni Composition API
- Scroll listeners sur `#app`, pas sur `window`
- Pas de store global (pas de Pinia/Vuex) — état local ou props/events
- Données projets dans `src/data/projects.json` — pas de nouvelle source de données
- Toute nouvelle feature fournit les 3 traductions dans `src/locales/{en,fr,es}.json`
- Navigateurs cibles : Chrome, Firefox, Safari, Edge (2 dernières versions)

### PRD Completeness Assessment

Le PRD est **complet et bien structuré** : 25 FRs clairement numérotés, 14 NFRs explicites, contraintes techniques précises, personas définis, user journeys détaillés, scope MVP vs phases ultérieures clairement délimité.

---

## Epic Coverage Validation

### Coverage Matrix

| FR | Texte PRD (résumé) | Épic/Story | Statut |
|----|--------------------|------------|--------|
| FR1 | Contexte client + résultat visible | Epic 1 / Story 1.2 | ✅ Couvert |
| FR2 | Statut projet (livré/en cours) | Epic 1 / Story 1.2 | ✅ Couvert |
| FR3 | Parcourir par catégorie | Epic 1 / Story 1.3 | ✅ Couvert |
| FR4 | Visuels pour chaque projet client | Epic 1 / Story 1.2 | ✅ Couvert |
| FR5 | Types de sites proposés | Epic 2 / Story 2.2 | ✅ Couvert |
| FR6 | Profils clients ciblés | Epic 2 / Story 2.2 | ✅ Couvert |
| FR7 | Fourchette tarifaire freelance | Epic 2 / Story 2.2 | ⚠️ Partiel |
| FR8 | Badge NASA sur la home | Epic 2 / Story 2.1 | ✅ Couvert |
| FR9 | Explication de la formation 42 | Epic 4 / Story 4.1 | ✅ Couvert |
| FR10 | Parcours complet (formation, projets, compétences) | Epic 5 / Story 5.1 | ✅ Couvert |
| FR11 | ≥ 1 projet 42 avec visualisation animée | Epic 4 / Story 4.3 | ✅ Couvert |
| FR12 | Explication technique approfondie d'un projet 42 | Epic 4 / Story 4.3 | ✅ Couvert |
| FR13 | Distinction visuelle projets 42 vs clients | Epic 1 / Story 1.3 | ✅ Couvert |
| FR14 | Contacter depuis n'importe quelle page | Epic 3 / Story 3.1 | ✅ Couvert |
| FR15 | Contact en ≤ 2 clics depuis la home | Epic 3 / Story 3.1 | ✅ Couvert |
| FR16 | Formulaire en FR/EN/ES | Epic 3 / Story 3.2 | ✅ Couvert |
| FR17 | Mel reçoit les soumissions par email | Epic 3 / Story 3.2 | ✅ Couvert |
| FR18 | Tout nouveau contenu i18n 3 langues | Transversal (toutes stories) | ✅ Couvert |
| FR19 | Sélecteur de langue depuis toutes pages | Transversal (Header existant) | ✅ Couvert |
| FR20 | Ajout projet sans modifier les composants | Epic 1 / Story 1.1 | ✅ Couvert |
| FR21 | Marquer projet "en cours" ou "livré" | Epic 1 / Story 1.1 | ✅ Couvert |
| FR22 | Contenu traduit via fichiers locales existants | Epic 1 / Story 1.1 | ✅ Couvert |
| FR23 | Options services additionnels | Epic 5 / Story 5.1 | ✅ Couvert |
| FR24 | Description de chaque option de service | Epic 5 / Story 5.1 | ✅ Couvert |
| FR25 | Intérêt pour option via formulaire contact | Epic 5 / Story 5.1 | ✅ Couvert |
| NFR1–14 | Performance, sécurité, accessibilité, intégrations | Epic 6 / Stories 6.1, 6.2, 6.3 | ✅ Couvert |

### Missing / Partial Requirements

#### ⚠️ FR7 — Fourchette tarifaire (partiel)

- **Problème :** Le Coverage Map attribue FR7 à Epic 2 / OffreBlock, et Story 2.2 mentionne "rough price signal" dans son intro — mais **aucun critère d'acceptation n'impose explicitement l'affichage d'une fourchette de prix** (ex: "300–500 €"). Les ACs ne font qu'exiger icon + titre + profils clients.
- **Impact :** FR7 est un élément de conversion critique pour Sophie (User Journey 1 : *"Elle voit 'Site vitrine 1–3 pages · 300–500 €'"*). Sans AC explicite, le dev pourrait livrer OffreBlock sans prix et valider quand même tous les critères.
- **Recommandation :** Ajouter un AC dans Story 2.2 : *"Given each service block, When rendered, Then a price range (e.g., '300–500 €') is visible for each service type."*

### Coverage Statistics

- **Total FRs PRD :** 25
- **FRs couverts dans les épics :** 25
- **Pourcentage de couverture nominale :** 100%
- **FRs avec couverture complète (AC explicite) :** 24
- **FRs avec couverture partielle (AC manquant) :** 1 (FR7)
- **NFRs couverts :** 14/14 (Epic 6)

---

## UX Alignment Assessment

### UX Document Status

✅ **Trouvé** — `ux-design-specification.md` (45K, 2026-03-13, 14 étapes complétées)

### Alignement UX ↔ PRD

#### 🔴 CONFLIT CRITIQUE : FR7 vs Principe UX 4 — Prix affiché ou non ?

| Document | Position |
|----------|---------|
| **PRD FR7** | "Les visiteurs peuvent voir **la fourchette tarifaire** pour les services freelance" |
| **UX Design Principle 4** | "**Aucune grille tarifaire** ne doit ancrer la conversation avant même le premier contact" |
| **UX OffreBlock description** | `"sans prix affiché — signal d'accessibilité par le profil client"` |
| **UX Journey Sophie** | `"Aucun prix affiché — le signal d'accessibilité passe par les projets et 'devis gratuit sous 48h'"` |
| **Architecture** | `FreelanceOffer.vue` — "section offre + tarification" (nommage suggère des prix) |
| **Epics Story 2.2** | Mentionne "rough price signal" dans l'intro mais **aucun AC n'impose une fourchette de prix** |

**Impact :** C'est le conflit PRD/UX le plus important de tout le projet. Le PRD dit MONTRER les prix, l'UX dit NE PAS les montrer. La décision UX a été prise délibérément (voir Principe 4 et Design Rationale), mais elle n'a pas été reflétée dans le PRD. Un dev qui suit les ACs de Story 2.2 livrera un OffreBlock SANS fourchette tarifaire, et passera les tests — mais FR7 du PRD sera non satisfait formellement.

**Recommandation :** Décision à prendre explicitement — soit amender FR7 pour le mettre en accord avec la décision UX (remplacer "fourchette tarifaire" par "signal d'accessibilité via profil client + CTA devis"), soit mettre à jour Story 2.2 pour inclure un AC sur la fourchette de prix.

---

#### ✅ Autres alignements UX ↔ PRD : OK

- UX-DR1 (Hero reformulé) → FR8 ✅
- UX-DR2 (NasaBadge) → FR8 ✅
- UX-DR3 (ProjectFilter) → FR3, FR13 ✅
- UX-DR4 (ProjectCard enrichi) → FR1, FR2, FR4 ✅
- UX-DR6 (Viz42 animation) → FR11, FR12 ✅
- UX-DR7 (Contact 4 états) → FR14–17 ✅
- UX-DR8 (CTA persistant) → FR14, FR15 ✅
- UX-DR9 (RGPD) → NFR7 ✅

### Alignement UX ↔ Architecture

#### 🔴 CONFLIT CRITIQUE : `Viz42.vue` animation CSS vs vidéos locales

| Document | Décision |
|----------|---------|
| **UX Spec UX-DR6** | `Viz42.vue` — visualisation **CSS @keyframes ou canvas natif**, IntersectionObserver, `prefers-reduced-motion` |
| **Epics Story 4.3** | Confirme `Viz42.vue` avec **CSS @keyframes** — critère explicite : "no external library, no dep > 50kb" |
| **Architecture** | *"Aucune animation custom à développer — outil externe spécialisé utilisé"* et *"Risque performance éliminé (vidéos locales, pas d'animation custom)"* |

**Impact :** L'Architecture a pris une décision opposée à l'UX et aux Epics. Elle remplace la visualisation animée CSS par des vidéos locales (`ProjectVideo.vue`). Les Epics n'ont pas adopté cette décision — Story 4.3 demande toujours une animation CSS custom. Un dev qui suit l'Architecture livrera des vidéos. Un dev qui suit Story 4.3 livrera une animation CSS. Ces deux outputs sont fondamentalement différents.

**Recommandation :** Décision urgente à trancher avant implémentation. Options :
- A) Suivre l'Architecture : supprimer Story 4.3 (`Viz42.vue`) et s'appuyer uniquement sur `ProjectVideo.vue`
- B) Suivre les Epics/UX : amender l'Architecture pour réintroduire `Viz42.vue` et accepter le risque performance

#### ⚠️ INCOHÉRENCE MOYENNE : Nommage composant `FreelanceOffer.vue` vs `OffreBlock.vue`

| Document | Nom utilisé |
|----------|------------|
| **Architecture** | `FreelanceOffer.vue` |
| **UX Spec** | `OffreBlock.vue` |
| **Epics Story 2.2** | `OffreBlock.vue` |

Même composant, deux noms. Sans arbitrage explicite, un dev peut créer les deux fichiers. À trancher : adopter `OffreBlock.vue` (aligné UX + Epics) et mettre à jour l'Architecture.

#### ⚠️ INCOHÉRENCE MINEURE : Props `NasaBadge.vue`

| Document | Nom prop | Valeurs |
|----------|---------|---------|
| **Architecture** | `variant` | `hero` / `inline` |
| **UX Spec** | `size` | `sm` / `md` |
| **Epics** | `variant` | `sm` / `md` |

Les valeurs (sm/md) sont alignées Epics/UX. L'Architecture utilise hero/inline. Minor mais à normaliser.

#### ⚠️ `ProjectFilter.vue` absent de la liste Architecture

L'Architecture liste les composants nouveaux (ProjectCard, NasaBadge, FreelanceOffer, ProjectVideo, FortyTwoPage) mais n'inclut pas `ProjectFilter.vue`. Ce composant est pourtant créé en Story 1.3 et requis par UX-DR3. Non bloquant car l'Architecture mentionne le filtrage par onglets dans Projects.vue, mais le composant n'est pas listé explicitement.

### Warnings

- **⚠️ Lightouse Accessibility cible :** L'UX spec vise Lighthouse Accessibility ≥ 90, mais les NFRs ne le spécifient pas (ils visent WCAG 2.1 AA). Epic 6 Story 6.3 ne définit pas de score Lighthouse Accessibility minimum. Pas critique mais une opportunité de renforcer les ACs.
- **⚠️ Compteur optionnel ProjectFilter :** L'UX spec mentionne un compteur optionnel `Clients (4)` / `Projets 42 (3)` sur les onglets. Aucune story ne le requiert. Non critique mais pourrait apporter de la valeur.

---

## Epic Quality Review

### Brownfield Context Note

Ce projet est **brownfield** (codebase existante) et **solo dev**. Les critères d'évaluation s'appliquent avec ce contexte : certaines stories techniques (schéma, migrations) sont acceptables si elles débloquent directement la valeur utilisateur.

---

### Epic 1 — Découverte des projets clients enrichis ✅ VALIDE avec observations

**User Value :** ✅ Sophie et Marc peuvent explorer des projets avec contexte métier et résultat concret.
**Independence :** ✅ Peut fonctionner de manière autonome.

| Story | Valeur utilisateur | ACs BDD | Problèmes |
|-------|-------------------|---------|-----------|
| 1.1 Enrichissement schéma JSON | ⚠️ Valeur indirecte (Mel/owner) | ✅ BDD proper | Technique — mais nécessaire comme fondation brownfield |
| 1.2 ProjectCard enrichi | ✅ Sophie voit contexte + résultat | ✅ BDD proper | Aucun |
| 1.3 ProjectFilter (onglets) | ✅ Navigation par catégorie | ✅ BDD proper | Aucun |
| 1.4 NasaBadge composant | ⚠️ Crée le composant sans le placer | ✅ BDD proper | FR8 attribué à Epic 2 mais composant créé en Epic 1 — organisationnel uniquement |

**🟡 Observation :** Story 1.4 crée `NasaBadge.vue` mais il n'est visible nulle part jusqu'à Story 2.1. Le composant est livrable mais pas observable par un visiteur avant Epic 2. Acceptable pour un contexte brownfield/solo.

---

### Epic 2 — Page d'accueil — signal fort ✅ VALIDE avec observations

**User Value :** ✅ Visiteur comprend l'offre en 5 secondes.
**Independence :** ⚠️ Story 2.1 dépend du composant `NasaBadge` de Story 1.4. Dépendance documentée, acceptable si Epic 1 précède Epic 2.

| Story | Valeur utilisateur | ACs BDD | Problèmes |
|-------|-------------------|---------|-----------|
| 2.1 Hero reformulé + NASA | ✅ Signal crédibilité immédiat | ✅ BDD proper | Dépend NasaBadge (Epic 1 Story 1.4) |
| 2.2 OffreBlock section offre | ✅ Visiteur comprend l'offre | ✅ BDD proper | **FR7 non couvert** : aucun AC pour la fourchette tarifaire |

**🟠 Problème majeur :** Story 2.2 — FR7 (fourchette tarifaire) n'a pas de critère d'acceptation explicite. Conflit PRD/UX non résolu visible ici.

---

### Epic 3 — Contact accessible depuis n'importe quelle page ✅ VALIDE avec observations

**User Value :** ✅ Tout visiteur peut contacter Mel en ≤ 2 clics.
**Independence :** ⚠️ Story 3.1 fait référence à une CTA sur `ProjectCard` avec `category: "client"` → dépend de Story 1.2.

| Story | Valeur utilisateur | ACs BDD | Problèmes |
|-------|-------------------|---------|-----------|
| 3.1 CTA persistant | ✅ Contact depuis n'importe où | ✅ BDD proper | Dépend ProjectCard (Epic 1 Story 1.2) — acceptable si ordre respecté |
| 3.2 Contact form 4 états + RGPD | ✅ Feedback formulaire clair | ✅ BDD proper | Aucun — ACs très complets |

**🟡 Observation :** La dépendance de Story 3.1 sur Story 1.2 (CTA sur ProjectCard client) est acceptable si Epic 1 est complété avant Epic 3. Pas documentée explicitement dans les stories comme prérequis.

---

### Epic 4 — Vitrine technique pour recruteurs (Projets 42) ⚠️ CONFLIT CRITIQUE

**User Value :** ✅ Thomas découvre la profondeur technique de Mel.
**Independence :** ✅ Peut fonctionner indépendamment (sauf Story 1.1 pour le schéma).

| Story | Valeur utilisateur | ACs BDD | Problèmes |
|-------|-------------------|---------|-----------|
| 4.1 Route /42 + FortyTwo.vue | ✅ Page dédiée 42 accessible | ✅ BDD proper | Aucun |
| 4.2 ProjectVideo.vue | ✅ Vidéo démo visible sur la page | ✅ BDD proper | **Conflit Architecture** : l'archi utilise des vidéos POUR REMPLACER Viz42 |
| 4.3 Viz42.vue animation CSS | ✅ Moment aha de Thomas | ✅ BDD proper | **Conflit Architecture** : l'archi dit "aucune animation custom" |

**🔴 Conflit critique :** Stories 4.2 et 4.3 sont partiellement redondantes ET en conflit avec l'Architecture :
- Architecture : vidéos locales = visualisation push_swap. Pas d'animation CSS custom.
- Story 4.2 : `ProjectVideo.vue` pour les démos vidéo des projets 42 ✅ (aligné Architecture)
- Story 4.3 : `Viz42.vue` avec CSS @keyframes pour push_swap ❌ (contredit Architecture)

Si les deux stories sont implémentées, push_swap aura à la fois une vidéo ET une animation CSS — ce qui n'est pas décidé. Un dev devra choisir ou faire les deux sans directive claire.

---

### Epic 5 — Profil complet et services additionnels ✅ VALIDE

**User Value :** ✅ Sophie trouve la confiance via l'About ; Marc et Sophie découvrent les options post-livraison.
**Independence :** ✅ Totalement indépendant.

| Story | Valeur utilisateur | ACs BDD | Problèmes |
|-------|-------------------|---------|-----------|
| 5.1 About.vue client-first + services | ✅ Multi-valeur (confiance + services) | ✅ BDD proper | Story volumineuse (2 objectifs distincts) — acceptable solo dev |

**🟡 Observation :** Story 5.1 couvre deux livrables distincts (refonte ton About + section services additionnels). Pour un sprint solo, acceptable. En équipe, ce serait idéalement splittée.

---

### Epic 6 — Qualité, performance et tracking ⚠️ Épic partiellement technique

**User Value :** ⚠️ Mixte — GA4 (valeur Mel), SEO (valeur indirecte), Accessibilité (valeur utilisateurs handicapés)
**Independence :** ⚠️ Story 6.3 (audit) dépend que TOUS les autres epics soient complétés.

| Story | Valeur utilisateur | ACs BDD | Problèmes |
|-------|-------------------|---------|-----------|
| 6.1 Google Analytics 4 | Valeur Mel (analytics) | ✅ BDD proper | Technique — pas de valeur directe visiteur |
| 6.2 SEO route /42 | Valeur indirecte (discoverabilité) | ✅ BDD proper | Technique — acceptable comme tâche de qualité |
| 6.3 Audit accessibilité + performance | ✅ Valeur tous utilisateurs | ✅ BDD proper | Story d'AUDIT, pas d'implémentation — les ACs sont des vérifications |

**🟠 Problème majeur :** Story 6.3 est une **story d'audit**, pas d'implémentation. Elle vérifie des choses qui devraient déjà être vraies (NFR1, NFR8, etc.). Dans un sprint réel, cette story ne sera "complète" que si TOUTES les stories précédentes respectent déjà les critères. C'est un gate de qualité, pas une story de dev. Acceptable pour un contexte solo mais à comprendre comme une checklist de vérification finale.

**🟡 Note :** Epic 6 contient des critères NFR qui devraient être enforced **dans chaque story** (alt tags, dark mode, etc.) plutôt qu'audités seulement en fin de sprint. Les epics précédents incluent bien des ACs sur l'accessibilité, ce qui réduit le risque.

---

### Compliance Checklist Globale

| Critère | Epic 1 | Epic 2 | Epic 3 | Epic 4 | Epic 5 | Epic 6 |
|---------|--------|--------|--------|--------|--------|--------|
| Valeur utilisateur | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| Indépendance | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ |
| Stories correctement dimensionnées | ✅ | ✅ | ✅ | ⚠️ | ✅ | ⚠️ |
| Pas de dépendances forward non documentées | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ |
| ACs testables BDD | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Traçabilité FRs | ✅ | ⚠️ FR7 | ✅ | ✅ | ✅ | ✅ |

### Résumé des problèmes Epic Quality

**🔴 Critique :**
1. Epic 4 — Conflit Story 4.3 (Viz42 CSS) vs Architecture (vidéos uniquement) — décision requise

**🟠 Majeur :**
2. Epic 2 Story 2.2 — FR7 (prix) sans AC explicite
3. Epic 6 Story 6.3 — story d'audit non implémentable en isolation

**🟡 Mineur :**
4. Dépendances inter-epics (3.1→1.2, 2.1→1.4) non documentées comme prérequis explicites dans les stories
5. NasaBadge organisé dans Epic 1 mais FR8 attribué à Epic 2

---

## Summary and Recommendations

### Overall Readiness Status

## ⚠️ NEEDS WORK — 2 décisions critiques à trancher avant implémentation

Le projet est **très bien documenté** (PRD complet, UX détaillée, Architecture solide, Epics bien structurés) mais 2 conflits bloquants non résolus entre les documents empêchent un agent dev de démarrer sans ambiguïté.

---

### Critical Issues Requiring Immediate Action

#### 🔴 CRITIQUE 1 — Viz42.vue (animation CSS) vs vidéos : décision à prendre

**Fichiers concernés :** `architecture.md` vs `epics.md` Story 4.3 + `ux-design-specification.md` UX-DR6

L'Architecture a décidé d'utiliser des vidéos locales à la place d'une animation CSS custom. Les Epics et l'UX spec demandent toujours `Viz42.vue` avec CSS @keyframes. Un dev qui démarre Story 4.3 sans clarification produira une animation CSS qui contredit l'architecture — ou sera bloqué.

**Action requise — choisir A ou B :**
- **Option A (suivre l'Architecture)** : Supprimer Story 4.3. Mettre à jour FR11 pour accepter une vidéo comme "visualisation animée". Mettre à jour UX-DR6 en conséquence.
- **Option B (suivre UX + Epics)** : Amender l'Architecture pour réintroduire `Viz42.vue` et accepter le risque performance limité (animation CSS légère). Conserver Story 4.3 tel quel.

---

#### 🔴 CRITIQUE 2 — FR7 (fourchette tarifaire) : PRD vs UX en contradiction directe

**Fichiers concernés :** `prd.md` FR7 vs `ux-design-specification.md` Principle 4 + `epics.md` Story 2.2

Le PRD exige que les visiteurs voient une fourchette de prix. L'UX a délibérément décidé de ne PAS afficher de prix (le signal d'accessibilité passe par le profil client et "devis gratuit sous 48h"). Story 2.2 n'a aucun AC imposant les prix — un dev livrera OffreBlock sans prix et passera tous les critères. FR7 sera formellement non satisfait.

**Action requise — choisir A ou B :**
- **Option A (suivre l'UX)** : Amender FR7 dans le PRD → remplacer "fourchette tarifaire" par "signal d'accessibilité via profil client + CTA devis gratuit". Mettre à jour Story 2.2 introductory text pour clarifier.
- **Option B (suivre le PRD)** : Ajouter un AC dans Story 2.2 : *"Given each service block, When rendered, Then a price range (e.g., '300–500 €') is visible"*. Mettre à jour UX OffreBlock description pour autoriser les prix.

---

### Recommended Next Steps

1. **Trancher le conflit Viz42 vs vidéos** (Option A ou B) — mettre à jour architecture.md ou epics.md Story 4.3 en conséquence
2. **Trancher le conflit FR7 prix** — amender prd.md FR7 ou ajouter AC dans Story 2.2 de epics.md
3. **Harmoniser le nommage** `FreelanceOffer.vue` (architecture) → `OffreBlock.vue` (epics/UX) dans architecture.md
4. **Documenter les dépendances inter-epics** comme prérequis dans les stories concernées (Story 2.1 note: "requires NasaBadge from Epic 1 Story 1.4", Story 3.1 note: "requires ProjectCard from Epic 1 Story 1.2")
5. **Normaliser les props NasaBadge** : choisir `variant="sm/md"` (aligné Epics/UX) et mettre à jour architecture.md si `variant="hero/inline"` est utilisé

---

### Issues Summary

| Sévérité | Count | Items |
|----------|-------|-------|
| 🔴 Critique | 2 | Viz42 vs vidéos · FR7 prix |
| 🟠 Majeur | 3 | Story 2.2 sans AC prix · Story 6.3 story d'audit · ProjectFilter absent Architecture |
| 🟡 Mineur | 4 | Nommage FreelanceOffer/OffreBlock · Dépendances non documentées · NasaBadge props · FR8 org |
| **Total** | **9** | |

---

### Final Note

Cette évaluation a identifié **9 problèmes** répartis sur 3 niveaux de sévérité. Les 2 critiques **doivent être tranchés** avant le démarrage de l'implémentation — ils créent des conflits directs entre les documents de référence qu'un agent dev ne peut pas résoudre seul sans risquer de produire un résultat incorrect.

Les 7 autres sont des améliorations qui peuvent être adressées en cours d'implémentation ou ignorées dans un contexte solo dev avec pleine connaissance des arbitrages.

**Le projet est bien planifié dans l'ensemble.** Les FRs sont couverts à 100%, les ACs sont bien formés, les patterns techniques sont clairs. Une fois les 2 décisions critiques tranchées, l'implémentation peut démarrer.

---

*Rapport généré le 2026-03-14 · Projet : melchior-jorda.online · Assesseur : Claude (PM/Scrum Master role)*

---

## Décisions Post-Assessment (2026-03-14)

| # | Conflit | Décision |
|---|---------|---------|
| 1 | Viz42 animation CSS vs vidéos | **Option A — vidéos uniquement.** Story 4.3 supprimée. FR11 satisfait par `ProjectVideo.vue`. `prd.md` + `epics.md` mis à jour. |
| 2 | FR7 fourchette tarifaire vs UX sans prix | **Option A — sans prix.** FR7 amendé pour refléter signal d'accessibilité via profil client + "devis gratuit sous 48h". `prd.md` + `epics.md` mis à jour. |

**Statut après décisions : ✅ READY FOR IMPLEMENTATION**

Les 2 conflits critiques sont résolus. Les 7 problèmes mineurs/majeurs restants peuvent être adressés en cours d'implémentation.
