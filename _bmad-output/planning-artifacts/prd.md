---
stepsCompleted: [step-01-init, step-02-discovery, step-02b-vision, step-02c-executive-summary, step-03-success, step-04-journeys, step-05-domain, step-06-innovation, step-07-project-type, step-08-scoping, step-09-functional, step-10-nonfunctional, step-11-polish, step-12-complete]
inputDocuments:
  - _bmad-output/planning-artifacts/product-brief-melchior-jorda.online-2026-03-13.md
  - docs/index.md
  - docs/technology-stack.md
  - docs/ui-component-inventory.md
  - docs/projects-data.md
  - docs/seo-strategy.md
workflowType: 'prd'
briefCount: 1
researchCount: 0
brainstormingCount: 0
projectDocsCount: 5
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: brownfield
---

# Product Requirements Document - melchior-jorda.online

**Author:** Mel
**Date:** 2026-03-13

## Executive Summary

melchior-jorda.online est le portfolio professionnel de Melchior JORDA, développeur web full-stack junior basé au BAB (France) avec présence régulière à Málaga (Espagne). Le site sert deux publics simultanément : des **clients freelance** (artisans, restaurateurs, professions libérales TPE) cherchant un développeur local fiable pour créer leur site vitrine ou e-commerce, et des **recruteurs tech** évaluant un profil junior pour un poste CDD/CDI. Le problème central est un portfolio passif — les preuves de valeur existent mais ne sont pas présentées de manière à déclencher un premier contact qualifié. Ce PRD définit les améliorations à apporter à la SPA Vue 3 existante pour en faire un outil de conversion actif.

### What Makes This Special

Le différenciateur de Mel est la **preuve d'exécution réelle** : des sites livrés pour de vrais clients (Les Planches, Elsa Psychologue), une victoire au NASA Space Apps Challenge Málaga 2025 (1ère place locale, qualification au national — projet Re-Fresh Earth sur IA + données satellitaires), et une formation 42 en cours — signalant rigueur et autonomie rares pour un junior. L'insight central : pour les TPE locales, la confiance prime sur la compétence perçue — et la confiance se construit par la preuve, pas par la déclaration.

## Project Classification

- **Type :** Web App — SPA Vue 3, browser-only, Firebase Hosting
- **Domaine :** General — portfolio professionnel, aucune réglementation sectorielle
- **Complexité :** Low — stack maîtrisée, logique produit simple, brownfield bien documenté
- **Contexte :** Brownfield — améliorations ciblées sur codebase existant, pas de refonte architecture

## Success Criteria

### User Success

- **Sophie (cliente freelance) :** comprend l'offre (ce que Mel fait, pour qui, à quel prix) en ≤ 30 secondes sur la home ; trouve un projet similaire au sien en 1 clic ; atteint le formulaire de contact en ≤ 2 clics
- **Thomas (recruteur) :** identifie le niveau technique réel (42 + NASA) et les projets livrés sans chercher ; repart avec suffisamment de confiance pour envoyer un message ou enregistrer le CV
- **Moment "aha" client :** voir un projet qui ressemble au sien (Les Planches pour un restaurateur, Elsa pour un professionnel libéral) avec contexte client et résultat concret
- **Moment "aha" recruteur :** visualisation animée d'un projet 42 + explication qui démontre la compréhension, pas juste l'exécution

### Business Success

| Horizon | Objectif |
|---|---|
| **30 jours post-déploiement** | 1 premier contact qualifié reçu via formulaire |
| **3 mois** | 2–3 contrats signés · ~1 500 € générés |
| **12 mois** | Volume de contrats permettant de commencer à rembourser le prêt de 15 000 € |
| **24 mois** | Activité auto-suffisante ou prêt partiellement/totalement remboursé |
| **Fallback** | Traction freelance insuffisante → pivot actif vers CDI/CDD |

### Technical Success

- Score Lighthouse Performance ≥ 85 — aucune régression
- Taux de rebond < 60 % · Pages vues / session > 2 (Google Analytics)
- Aucune régression SEO (meta tags, JSON-LD, sitemap)
- Aucune dette technique — améliorations dans les patterns existants (Options API, Tailwind, `projects.json`)

### Measurable Outcomes

- **KPI nord :** contrats freelance signés par trimestre
- **Proxy acquisition :** sessions mensuelles, sources organique + Malt
- **Proxy conversion :** messages reçus / mois · taux contact → devis → contrat signé

## Product Scope

### MVP — Phase 1

**Approche :** Experience MVP — réussir quand Sophie et Thomas ont chacun leur moment "aha" en ≤ 2 clics. Mel seul, livrable en 1–2 sprints sans dette technique.

| # | Capacité | Justification |
|---|---|---|
| 1 | Enrichissement schéma `projects.json` (`clientContext`, `result`, `status`) | Fondation — sans ça, les projets restent une liste technique |
| 2 | `ProjectCard` affiche contexte client + résultat | Rend le travail lisible pour Sophie et Marc |
| 3 | Badge / hero NASA (1ère place Málaga + qualification nationale) | Signal de crédibilité immédiat sur la home |
| 4 | Section offre freelance (types de sites + fourchette tarifaire) | Répond à la question de Sophie avant qu'elle la pose |
| 5 | ≥ 1 projet 42 avec visualisation animée + explication technique | Moment "aha" de Thomas |
| 6 | Miss Boat et Le Nain Vert (e-commerce streetwear psychédélique) ajoutés avec statut "en cours" | Élargit la couverture client |
| 7 | CTA contact visible depuis toutes les pages | Chemin court vers la conversion |

**Hors MVP :** démos live projets 42 · système de devis/réservation · blog SEO · Minata et Trixie (abandonnés)

### Growth — Phase 2

- Témoignages clients réels (dès 1–2 contrats livrés)
- Autres projets 42 avec visualisation (ft_printf, minishell, etc.)
- Version ES renforcée pour ciblage Málaga
- Services packagés ("site vitrine clé en main")

### Vision — Phase 3

- Articles techniques pour SEO organique
- Expansion marché Málaga / Costa del Sol
- Démos live interactives projets 42 (si valeur prouvée)

### Risk Mitigation

- **Technique :** visualisation animée → CSS ou canvas natif ; fallback : screenshot annoté + explication textuelle
- **Marché :** pivot CDI/CDD déjà anticipé — le portfolio sert les deux cas sans modification
- **Ressources :** features indépendantes et livrables séparément ; features 1–4 = MVP minimal si le temps manque

## User Journeys

### Journey 1 — Sophie, cliente freelance

Sophie gère une chambre d'hôtes à Bidart. Un vendredi soir, une cliente lui demande l'adresse de son site — elle n'en a pas. Le lendemain, elle tape "développeur web Biarritz" sur Google.

**Découverte :** Le portfolio apparaît. Premier écran : un titre clair, un sous-titre humain, un badge NASA visible. Sophie ne sait pas ce qu'est la NASA Space Apps mais comprend que ce garçon a gagné quelque chose d'important.

**Exploration :** Elle clique sur "Projets". Elle voit Les Planches (restaurant) — contexte client, photos, résultat. *C'est exactement son monde.* Elle voit Elsa Psychologue — une profession libérale qui lui ressemble.

**Moment clé :** Elle voit "Site vitrine 1–3 pages · 300–500 €". Elle n'avait pas demandé le prix — il est là, sans friction.

**Résolution :** Elle remplit le formulaire en 2 minutes. Mel répond dans la journée. Premier contact qualifié converti.

*Capacités : projets avec contexte client · section offre avec tarification · CTA accessible depuis chaque page*

---

### Journey 2 — Marc, client e-commerce

Marc veut lancer une boutique en ligne pour sa marque de vêtements. Il cherche quelqu'un qui a déjà livré un vrai e-commerce. Un ami lui recommande Mel.

**Découverte :** Marc arrive directement sur la page projets.

**Moment clé :** Il voit Le Nain Vert (e-commerce streetwear psychédélique) — une vraie boutique livrée, pas un template. La preuve est là.

**Exploration :** Il scrolle vers "À propos" pour vérifier que ce n'est pas une grande agence. Le ton est direct. Il voit "junior, prix accessibles, je livre".

**Résolution :** Il contacte Mel : "tu peux faire un shop avec catalogue et paiement en ligne ?" Conversation commerciale engagée.

*Capacités : projets filtrables par catégorie · page À propos avec positionnement et tarification junior*

---

### Journey 3 — Thomas, recruteur tech

Thomas reçoit le CV de Mel via LinkedIn — École 42, hackathon NASA. Avant l'entretien, il ouvre le portfolio.

**Découverte :** Page d'accueil propre, rapide. Bon signal.

**Exploration :** Il cherche les projets techniques. Il trouve la section Projets 42 : push_swap avec visualisation animée. Il lit l'explication — Mel explique pourquoi, quelles contraintes, ce qu'il a appris. Pas juste "j'ai fait un algorithme de tri".

**Moment clé :** Thomas voit quelqu'un qui comprend ce qu'il fait, pas seulement quelqu'un qui exécute.

**Résolution :** Il prépare des questions techniques sur la gestion mémoire en C. Mel est dans la pile "à voir sérieusement".

*Capacités : projets 42 avec visualisations · explications techniques profondes · page Résumé valorisant le parcours 42*

---

### Journey 4 — Mel, propriétaire du site

Mel vient de livrer Le Nain Vert. Il veut l'ajouter au portfolio avec contexte client, visuels, lien live.

**Situation actuelle :** `projects.json` n'a pas de champ `clientContext` ni `result` — les projets sont présentés comme une liste technique, pas des cas clients.

**Résolution souhaitée :** Schéma enrichi avec `clientContext`, `result`, `status`. Mel ajoute l'entrée JSON + traductions dans les 3 locales, commit, push — déployé en 2 minutes via CI/CD.

*Capacités : enrichissement `projects.json` · `ProjectCard` affichant les nouveaux champs*

---

### Journey Requirements Summary

| Capacité requise | Source |
|---|---|
| Projets avec contexte client + résultat | Sophie, Marc, Mel |
| Section offre freelance (types + tarifs) | Sophie |
| Projets filtrables (clients vs 42) | Marc, Thomas |
| Projets 42 avec visualisation animée + explication | Thomas |
| Badge NASA (1ère place Málaga + national) | Sophie, Thomas |
| CTA contact accessible depuis toutes les pages | Sophie |
| Schéma `projects.json` enrichi | Mel |
| Page À propos avec positionnement et tarification | Marc |

## Web App Technical Constraints

SPA Vue 3 (Options API) · Vite 7 · Tailwind CSS 3 · vue-router 4 (history mode) · Firebase Hosting · EmailJS (no backend) · CI/CD GitHub Actions → push `main` déploie automatiquement.

**Règles d'implémentation obligatoires :**
- Options API uniquement — pas de `<script setup>` ni Composition API
- Scroll listeners sur `#app`, pas sur `window`
- Pas de store global (pas de Pinia/Vuex) — état local ou props/events
- Données projets dans `src/data/projects.json` — pas de nouvelle source de données
- Toute nouvelle feature fournit les 3 traductions dans `src/locales/{en,fr,es}.json`
- Navigateurs cibles : Chrome, Firefox, Safari, Edge (2 dernières versions)
- Pipeline CI/CD existant non modifié pour le MVP
- Aucune nouvelle dépendance > 50kb gzippé sans justification

**SEO :** meta tags dynamiques via `MetaTags.vue`, JSON-LD et sitemap existants — aucune régression tolérée ; nouvelles sections ajoutent leurs clés i18n dans les meta.

## Functional Requirements

### Project Showcase

- **FR1 :** Les visiteurs peuvent consulter chaque projet avec son contexte client (problème, secteur, public cible) et son résultat concret
- **FR2 :** Les visiteurs peuvent identifier le statut d'un projet (livré / en cours)
- **FR3 :** Les visiteurs peuvent parcourir les projets organisés par catégorie (sites clients, projets 42, autres)
- **FR4 :** Les visiteurs peuvent voir des visuels pour chaque projet client

### Offre Freelance

- **FR5 :** Les visiteurs peuvent comprendre les types de sites que Mel réalise (vitrine, e-commerce, multi-pages)
- **FR6 :** Les visiteurs peuvent identifier les profils clients ciblés (artisans, restaurateurs, professions libérales, e-commerçants)
- **FR7 :** Les visiteurs peuvent identifier l'accessibilité de l'offre freelance via le profil client ciblé et la promesse de devis gratuit sous 48h

### Signaux de Crédibilité

- **FR8 :** Les visiteurs voient le résultat NASA Space Apps Challenge (1ère place Málaga 2025 + qualification nationale) mis en avant sur la page d'accueil
- **FR9 :** Les visiteurs peuvent comprendre ce qu'est la formation 42 et ce qu'elle signifie (rigueur, autonomie, validation par les pairs)
- **FR10 :** Les visiteurs peuvent accéder au parcours complet de Mel (formation, projets, compétences)

### Projets Techniques 42

- **FR11 :** Les visiteurs peuvent voir ≥ 1 projet 42 avec une visualisation animée illustrant son comportement ou algorithme
- **FR12 :** Les visiteurs peuvent lire une explication technique approfondie d'un projet 42 (décisions de conception, contraintes, apprentissages)
- **FR13 :** Les visiteurs peuvent distinguer visuellement les projets 42 des projets clients

### Contact et Conversion

- **FR14 :** Les visiteurs peuvent envoyer un message à Mel depuis n'importe quelle page
- **FR15 :** Les visiteurs peuvent atteindre le formulaire de contact en ≤ 2 clics depuis la home
- **FR16 :** Les visiteurs peuvent soumettre un message en français, anglais ou espagnol
- **FR17 :** Mel reçoit les soumissions du formulaire par email

### Support Multilingue

- **FR18 :** Tout nouveau contenu est accessible en français, anglais et espagnol
- **FR19 :** Les visiteurs peuvent changer de langue depuis n'importe quelle page

### Gestion du Contenu

- **FR20 :** Mel peut ajouter un projet client avec contexte, résultat et statut sans modifier le code des composants
- **FR21 :** Mel peut marquer un projet "en cours" ou "livré"
- **FR22 :** Mel peut renseigner le contenu traduit d'un nouveau projet dans les 3 langues via les fichiers de données existants

### Services & Options Payantes

- **FR23 :** Les visiteurs peuvent consulter les options de services additionnels post-livraison (panel d'administration, maintenance mensuelle)
- **FR24 :** Les visiteurs peuvent comprendre ce qu'inclut chaque option — panel admin : gestion autonome du contenu sans intervention dev ; maintenance : mises à jour, sécurité, support sur plusieurs mois
- **FR25 :** Les visiteurs peuvent exprimer leur intérêt pour une option additionnelle via le formulaire de contact

## Non-Functional Requirements

### Performance

- **NFR1 :** Score Lighthouse Performance ≥ 85 sur mobile et desktop
- **NFR2 :** First Contentful Paint (FCP) ≤ 2 secondes sur connexion 4G mobile
- **NFR3 :** Les visualisations animées (projets 42) ne dégradent pas le score Lighthouse de plus de 5 points
- **NFR4 :** Les images de projets sont optimisées (WebP ou compressé, lazy-loaded)

### Sécurité

- **NFR5 :** Le formulaire de contact maintient la protection anti-bot honeypot existante
- **NFR6 :** Aucune donnée personnelle des visiteurs n'est stockée côté client au-delà de la session
- **NFR7 :** Le formulaire de contact affiche une mention d'utilisation des données conforme RGPD avant soumission

### Accessibilité

- **NFR8 :** Toutes les images de projets disposent d'attributs `alt` descriptifs
- **NFR9 :** Ratio de contraste des textes ≥ 4.5:1 (WCAG 2.1 AA)
- **NFR10 :** Navigation fonctionnelle au clavier (focus visible, ordre logique)
- **NFR11 :** Site lisible et utilisable sur mobile à partir de 320px

### Intégrations

- **NFR12 :** En cas d'indisponibilité d'EmailJS, un message d'erreur explicite est affiché au visiteur
- **NFR13 :** Le pipeline CI/CD Firebase / GitHub Actions existant déploie les features MVP sans modification
- **NFR14 :** Aucune nouvelle dépendance > 50kb gzippé sans justification explicite
