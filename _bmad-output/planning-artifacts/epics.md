---
stepsCompleted: [step-01-validate-prerequisites, step-02-design-epics, step-03-create-stories]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
---

# melchior-jorda.online - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for melchior-jorda.online, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Visitors can view each project with its client context (problem, sector, target audience) and concrete result
FR2: Visitors can identify the status of a project (delivered / in progress)
FR3: Visitors can browse projects organized by category (client sites, 42 projects, other)
FR4: Visitors can see visuals for each client project
FR5: Visitors can understand the types of sites Mel builds (showcase, e-commerce, multi-page)
FR6: Visitors can identify the targeted client profiles (artisans, restaurateurs, liberal professions, e-commerce)
FR7: Visitors can see the price range for freelance services
FR8: Visitors see the NASA Space Apps Challenge result (1st place Málaga 2025 + national qualification) featured on the home page
FR9: Visitors can understand what École 42 training is and what it signifies (rigor, autonomy, peer validation)
FR10: Visitors can access Mel's complete career path (training, projects, skills)
FR11: Visitors can see ≥ 1 project 42 with an animated visualization illustrating its behavior or algorithm
FR12: Visitors can read an in-depth technical explanation of a 42 project (design decisions, constraints, learnings)
FR13: Visitors can visually distinguish 42 projects from client projects
FR14: Visitors can send a message to Mel from any page
FR15: Visitors can reach the contact form in ≤ 2 clicks from the home page
FR16: Visitors can submit a message in French, English, or Spanish
FR17: Mel receives form submissions by email
FR18: All new content is accessible in French, English, and Spanish
FR19: Visitors can change language from any page
FR20: Mel can add a client project with context, result, and status without modifying component code
FR21: Mel can mark a project as "in progress" or "delivered"
FR22: Mel can enter translated content for a new project in all 3 languages via existing data files
FR23: Visitors can consult additional post-delivery service options (admin panel, monthly maintenance)
FR24: Visitors can understand what each option includes — admin panel: autonomous content management without dev intervention; maintenance: updates, security, multi-month support
FR25: Visitors can express interest in an additional option via the contact form

### NonFunctional Requirements

NFR1: Lighthouse Performance score ≥ 85 on mobile and desktop
NFR2: First Contentful Paint (FCP) ≤ 2 seconds on 4G mobile connection
NFR3: Animated visualizations (42 projects) do not degrade the Lighthouse score by more than 5 points
NFR4: Project images are optimized (WebP or compressed, lazy-loaded)
NFR5: The contact form maintains the existing anti-bot honeypot protection
NFR6: No personal visitor data is stored client-side beyond the session
NFR7: The contact form displays a GDPR data usage notice before submission
NFR8: All project images have descriptive alt attributes
NFR9: Text contrast ratio ≥ 4.5:1 (WCAG 2.1 AA)
NFR10: Functional keyboard navigation (visible focus, logical order)
NFR11: Site readable and usable on mobile from 320px
NFR12: If EmailJS is unavailable, an explicit error message is displayed to the visitor
NFR13: The existing Firebase / GitHub Actions CI/CD pipeline deploys MVP features without modification
NFR14: No new dependency > 50kb gzipped without explicit justification

### Additional Requirements

- Brownfield project: existing Vue 3 / Vite / Tailwind / Firebase codebase — no refactoring, only targeted additions
- Enrich `projects.json` schema with new fields: `clientContext`, `result`, `status`, `featured`, `video` (all camelCase)
- `clientContext` and `result` are localized via i18n keys (`projects.items.{id}.clientContext`, `projects.items.{id}.result`)
- Video files hosted locally in `public/assets/videos/{project-id}/` — mp4 + webm fallback + WebP poster
- New route `/42` added inline in `src/main.js` (no separate router file), lazy-loaded
- Pages live in `src/pages/` (not `src/views/`), components in `src/components/`
- Google Analytics 4: gtag.js script in `index.html`, pageview hook in `main.js` via `router.afterEach`, `VITE_GA_ID` env variable
- Create `.env` (git-ignored) and `.env.example` for environment variables
- Update `sitemap.xml` to include the `/42` route
- Options API exclusively — no `<script setup>`, no Composition API — no exceptions
- Scroll listeners on `#app` element only, never on `window`
- No global state store (no Pinia/Vuex) — local state or props/events only
- Every feature provides all 3 i18n translations (en.json, fr.json, es.json) — no hardcoded visible text in components
- Nested i18n key hierarchy mandatory (e.g., `home.nasaBadge.title`, not flat keys)
- Test in both dark mode and light mode before every commit
- `video` field in `projects.json` references local path: `assets/videos/{id}/demo.mp4`
- `ProjectVideo.vue` pattern: `preload="none"`, mp4 + webm sources, WebP poster, `playsinline`

### UX Design Requirements

UX-DR1: Hero reformulation — client-oriented value proposition readable in 5 seconds, NASA badge visible above the fold, double CTA (one for Sophie/clients, one for Thomas/recruiters); hero must immediately answer "is this for me?" for both personas
UX-DR2: `NasaBadge.vue` — reusable component with variants `sm` (header/about) and `md` (hero home); text "1st place · NASA Space Apps Challenge · Málaga 2025"; orange translucent style (`bg-orange-500/15 border border-orange-500/40 rounded-full`); `aria-label` required; optional hover tooltip "Qualified at national level"
UX-DR3: `ProjectFilter.vue` — inline tabs "Clients | Projets 42" at top of `Projects.vue`; Clients tab active by default (orange style); 42 tab with indigo style (`bg-indigo-600/20 text-indigo-400 border border-indigo-500/40`); ARIA roles tablist/tab/aria-selected; keyboard navigation ←/→; fade transition 150ms; emit `tab-change`
UX-DR4: `ProjectCard.vue` enrichment — display sector label (orange, above title), clientContext (1-2 client-POV sentences), result (green text), status badge ("Livré ✓" green / "En cours" orange); visual hierarchy: image → sector → title → clientContext → result → status badge; alt attribute mandatory on image
UX-DR5: `OffreBlock.vue` — 3 service blocks (vitrine/e-commerce/multi-page); desktop: 3-column grid; mobile: vertical stack; each block: icon + title + target client profile; single CTA "Devis gratuit sous 48h" below the entire section (not per block); hover: light elevation + orange border; `role="article"` on each block
UX-DR6: `Viz42.vue` — push_swap animated visualization using CSS @keyframes or native canvas (no external library, no dep > 50kb); states: playing, paused, idle (trigger by IntersectionObserver); full `prefers-reduced-motion` support (static snapshot if reduced); `aria-label="Animated visualization of the push_swap algorithm"`; scoped CSS only
UX-DR7: Contact form state feedback — 4 mandatory states: idle (active orange button "Envoyer mon message"), loading (spinner + disabled button "Envoi en cours..."), success (green ✓ icon + "Reçu ! Je te réponds sous 48h."), error (⚠ orange icon + fallback direct email message); form fields reset after success; `aria-live="polite"` on confirmation zone; error state persistent until user click
UX-DR8: Persistent CTA — "Contact" always visible in sticky header; contextual CTA at end of each section; "Me contacter pour un projet similaire" link on client project cards; ensures ≤ 2 clicks from any page to contact form
UX-DR9: RGPD notice before submit button in contact form: "Tes données sont utilisées uniquement pour te répondre." (i18n required); honeypot field maintained with `display:none` + `tabindex="-1"`
UX-DR10: Image skeleton loaders — `bg-gray-200 dark:bg-navy-700 animate-pulse rounded-lg` while loading; `loading="lazy"` on all project images outside hero; `loading="eager"` on hero image; empty tab state: centered "Projets en cours d'ajout — reviens bientôt." in `text-gray-500 dark:text-gray-400`
UX-DR11: Contrast verification — `text-indigo-400` on `bg-navy-800` for 42 tab must be verified with DevTools to ensure ≥ 4.5:1 ratio (WCAG 2.1 AA); adjust if needed before shipping
UX-DR12: `About.vue` — rewrite tone to center client value first (not chronological biography); include "tarifs accessibles, devis gratuit sous 48h", empathy for artisans/TPE language; mention 42 and NASA as proof-points, not as intro

### FR Coverage Map

| FR | Épic | Sujet |
|---|---|---|
| FR1 | Epic 1 | Contexte client + résultat visible sur ProjectCard |
| FR2 | Epic 1 | Badge statut Livré/En cours sur ProjectCard |
| FR3 | Epic 1 | Filtrage par catégorie via ProjectFilter |
| FR4 | Epic 1 | Visuels projets sur ProjectCard |
| FR5 | Epic 2 | Types de sites dans OffreBlock |
| FR6 | Epic 2 | Profils clients cibles dans OffreBlock |
| FR7 | Epic 2 | Fourchette tarifaire dans OffreBlock |
| FR8 | Epic 2 | NASA badge dans Home hero |
| FR9 | Epic 4 | Explication 42 dans FortyTwo.vue |
| FR10 | Epic 5 | Parcours complet dans About.vue |
| FR11 | Epic 4 | Visualisation animée push_swap (Viz42) |
| FR12 | Epic 4 | Explication technique profonde dans FortyTwo.vue |
| FR13 | Epic 1 | Distinction visuelle 42 / clients via ProjectFilter |
| FR14 | Epic 3 | Message depuis n'importe quelle page (CTA sticky) |
| FR15 | Epic 3 | Contact en ≤ 2 clics depuis la home |
| FR16 | Epic 3 | Formulaire en 3 langues |
| FR17 | Epic 3 | Réception email via EmailJS |
| FR18 | Transversal | i18n obligatoire dans chaque story (en/fr/es) |
| FR19 | Transversal | Sélecteur langue maintenu dans Header |
| FR20 | Epic 1 | Ajout projet via JSON seul |
| FR21 | Epic 1 | Champ `status` dans projects.json |
| FR22 | Epic 1 | Traductions via locales/{en,fr,es}.json |
| FR23 | Epic 5 | Services additionnels dans About.vue |
| FR24 | Epic 5 | Description de ce qu'inclut chaque service |
| FR25 | Epic 5 | Intérêt exprimable via formulaire contact |
| NFR1–14 | Epic 6 | Performance, sécurité, accessibilité, intégrations |

## Epic List

### Epic 1: Découverte des projets clients enrichis
Les visiteurs (Sophie, Marc) parcourent les projets clients avec le contexte métier, le résultat concret et le statut — et reconnaissent immédiatement un projet similaire au leur. Mel peut ajouter un projet en éditant uniquement des fichiers de données.
**FRs covered:** FR1, FR2, FR3, FR4, FR13, FR20, FR21, FR22

### Epic 2: Page d'accueil — signal fort
Un visiteur qui arrive sur la home comprend en 5 secondes ce que Mel fait, pour qui, et à quel prix approximatif — grâce au badge NASA, au hero reformulé et à la section offre freelance.
**FRs covered:** FR5, FR6, FR7, FR8

### Epic 3: Contact accessible depuis n'importe quelle page
N'importe quel visiteur atteint le formulaire de contact en ≤ 2 clics, reçoit un feedback clair sur l'état d'envoi, et peut le faire en 3 langues.
**FRs covered:** FR14, FR15, FR16, FR17

### Epic 4: Vitrine technique pour recruteurs (Projets 42)
Thomas navigue vers l'onglet 42 dédié, voit la visualisation animée de push_swap avec une explication technique profonde, et télécharge le CV.
**FRs covered:** FR9, FR11, FR12

### Epic 5: Profil complet et services additionnels
Les visiteurs accèdent au parcours complet de Mel via une page About recentrée sur la valeur client, et découvrent les options de service post-livraison.
**FRs covered:** FR10, FR23, FR24, FR25

### Epic 6: Qualité, performance et tracking
Mel dispose d'analytics pour mesurer les conversions. Le site respecte les seuils Lighthouse ≥ 85, les critères WCAG AA, et le CI/CD fonctionne sans modification.
**FRs covered:** NFR1–NFR14 (transversal)

## Epic 1: Découverte des projets clients enrichis

Les visiteurs (Sophie, Marc) parcourent les projets clients avec le contexte métier, le résultat concret et le statut — et reconnaissent immédiatement un projet similaire au leur. Mel peut ajouter un projet en éditant uniquement des fichiers de données.

### Story 1.1: Enrichissement du schéma `projects.json` et migration des données

As a site owner (Mel),
I want the projects data schema to support `clientContext`, `result`, `status`, `featured`, `sector`, and `video` fields,
So that I can present client projects with full business context and add new projects without modifying any component code.

**Acceptance Criteria:**

**Given** the `projects.json` file,
**When** I add a new project entry,
**Then** the schema accepts all new fields: `clientContext`, `result`, `status` (`"delivered"` | `"in-progress"`), `featured` (boolean), `sector` (string), `video` (local path string)
**And** no component code change is required to render the new data

**Given** existing client projects (Les Planches, Elsa Psychologue, and others),
**When** they are migrated to the new schema,
**Then** they each have `clientContext`, `result`, `sector`, and `status: "delivered"` populated
**And** the i18n keys `projects.items.{id}.clientContext` and `projects.items.{id}.result` are present in `en.json`, `fr.json`, and `es.json`

**Given** the new projects Miss Boat and Le Nain Vert,
**When** added to `projects.json`,
**Then** they have `status: "in-progress"` and `category: "client"` with all 3 locale translations

**Given** a project with a video,
**When** the `video` field is set,
**Then** it references a local path `assets/videos/{project-id}/demo.mp4` and a corresponding `poster` field points to `assets/videos/{project-id}/poster.webp`

**Given** the i18n key hierarchy,
**When** new keys are added,
**Then** they follow the nested pattern (`projects.items.{id}.clientContext`) — never flat keys

### Story 1.2: Extension de `ProjectCard.vue` avec les champs enrichis

As a visitor (Sophie / Marc),
I want to see the client context, concrete result, sector, and delivery status for each project on its card,
So that I immediately understand who the project was built for and what outcome was achieved.

**Acceptance Criteria:**

**Given** a project with a `sector` value,
**When** `ProjectCard` renders,
**Then** the sector label appears in orange above the project title

**Given** a project with a `clientContext` value,
**When** `ProjectCard` renders,
**Then** the clientContext text is displayed in the card body, below the title, in standard body text

**Given** a project with a `result` value,
**When** `ProjectCard` renders,
**Then** the result text is displayed in green (`text-green-500 dark:text-green-400`) below the clientContext

**Given** a project with `status: "delivered"`,
**When** `ProjectCard` renders,
**Then** a "Livré ✓" badge with green background is visible on the card

**Given** a project with `status: "in-progress"`,
**When** `ProjectCard` renders,
**Then** an "En cours" badge with orange background is visible on the card

**Given** a project image,
**When** `ProjectCard` renders,
**Then** the `<img>` has a descriptive `alt` attribute following the pattern `"[Nom projet] — [secteur], livré pour [type client]"`
**And** the image uses `loading="lazy"` and is in WebP format

**Given** dark mode is active,
**When** `ProjectCard` renders,
**Then** all text colors use `dark:` Tailwind prefixes and the card is readable with contrast ≥ 4.5:1

**Given** a mobile viewport of 320px,
**When** `ProjectCard` renders,
**Then** `clientContext` and `result` are always visible without requiring hover or tap interaction

### Story 1.3: Création de `ProjectFilter.vue` (onglets Clients / Projets 42)

As a visitor,
I want to filter projects by type using "Clients" and "Projets 42" tabs,
So that I can immediately navigate to the category relevant to me without scrolling through irrelevant projects.

**Acceptance Criteria:**

**Given** I navigate to the Projects page,
**When** the page loads,
**Then** the "Clients" tab is active by default and only projects with `category: "client"` are shown

**Given** the "Clients" tab is active,
**When** I click "Projets 42",
**Then** only projects with `category: "42"` are displayed with a 150ms fade opacity transition
**And** the Projets 42 tab shows indigo active style (`bg-indigo-600/20 text-indigo-400 border border-indigo-500/40`)

**Given** the "Projets 42" tab is active,
**When** I click "Clients",
**Then** client projects are shown again and the Clients tab shows orange active style

**Given** keyboard navigation,
**When** I press `←` or `→` while focused on a tab,
**Then** focus moves to the adjacent tab and content updates accordingly

**Given** the tab component,
**When** rendered in the DOM,
**Then** `role="tablist"` is on the container, `role="tab"` and `aria-selected` are on each tab button

**Given** a tab with no projects (edge case),
**When** that tab is active,
**Then** the message "Projets en cours d'ajout — reviens bientôt." is displayed centered in `text-gray-500 dark:text-gray-400`

**Given** dark mode,
**When** `ProjectFilter` renders,
**Then** all colors use `dark:` Tailwind prefixes appropriately

### Story 1.4: Création de `NasaBadge.vue` (composant badge de crédibilité)

As a visitor,
I want to see Mel's NASA Space Apps Challenge result prominently displayed,
So that I immediately perceive credibility before any doubt about his junior status sets in.

**Acceptance Criteria:**

**Given** `NasaBadge` with `variant="md"`,
**When** rendered (hero home),
**Then** it shows a trophy icon + "1ère place · NASA Space Apps Challenge · Málaga 2025" at hero size

**Given** `NasaBadge` with `variant="sm"`,
**When** rendered (About page),
**Then** it shows a smaller version using `text-sm` sizing

**Given** the component,
**When** rendered,
**Then** it has `aria-label="NASA Space Apps Challenge Málaga 2025 — 1ère place"`

**Given** the component style,
**When** rendered,
**Then** it uses `bg-orange-500/15 border border-orange-500/40 rounded-full` with orange text

**Given** dark mode,
**When** `NasaBadge` renders,
**Then** `dark:` prefixed classes are applied and the badge is visible with sufficient contrast

**Given** the component text,
**When** rendered in any language,
**Then** all visible strings are pulled from i18n keys in `en.json`, `fr.json`, `es.json` (e.g., `home.nasaBadge.title`)

## Epic 2: Page d'accueil — signal fort

Un visiteur qui arrive sur la home comprend en 5 secondes ce que Mel fait, pour qui, et à quel prix approximatif — grâce au badge NASA, au hero reformulé et à la section offre freelance.

### Story 2.1: Reformulation du hero `Home.vue` avec signal de crédibilité immédiat

As a first-time visitor (Sophie / Thomas),
I want to see a clear value proposition and a NASA credibility badge above the fold on the home page,
So that I immediately understand what Mel does, for whom, and that he has proven results — before I scroll.

**Acceptance Criteria:**

**Given** I arrive on the home page,
**When** the page loads,
**Then** the `NasaBadge` (variant `md`) is visible above the fold without scrolling

**Given** the hero section,
**When** rendered,
**Then** the headline communicates what Mel builds (sites for real clients) and for whom (artisans, restaurateurs, professions libérales) — not just "Full-Stack Developer"

**Given** the hero section,
**When** rendered,
**Then** there are two CTAs: a primary ("Voir mes projets" → `#projets`) and a secondary ("Devis gratuit" → `/contact`)

**Given** the hero headline and sub-headline,
**When** rendered in any language,
**Then** all text is served from i18n keys (`home.hero.title`, `home.hero.subtitle`, etc.) in `en.json`, `fr.json`, `es.json`

**Given** dark mode,
**When** the hero renders,
**Then** `dark:` Tailwind classes are applied and contrast ratio ≥ 4.5:1 on all text

**Given** a mobile viewport of 320px,
**When** the hero renders,
**Then** the NASA badge, headline, and at least one CTA are all visible above the fold without scrolling

### Story 2.2: Création de `OffreBlock.vue` — section offre freelance

As a visitor (Sophie / Marc),
I want to see the types of sites Mel builds, who they are for, and a rough price signal,
So that I can immediately self-qualify ("is this for me?") without asking.

**Acceptance Criteria:**

**Given** the `OffreBlock` section on `Home.vue`,
**When** the page loads,
**Then** three service blocks are displayed: vitrine (showcase), e-commerce, and multi-page

**Given** each service block,
**When** rendered,
**Then** it shows an icon, a short title, and 2–3 target client profiles (e.g., "Artisans · Restaurateurs · Professions libérales")

**Given** the section,
**When** rendered,
**Then** a single CTA "Devis gratuit sous 48h" appears below all three blocks (not repeated per block)

**Given** a desktop viewport,
**When** `OffreBlock` renders,
**Then** the three blocks are displayed in a 3-column grid

**Given** a mobile viewport (320px–767px),
**When** `OffreBlock` renders,
**Then** the blocks stack vertically in a single column

**Given** a block on hover (desktop),
**When** the user hovers,
**Then** a light elevation effect and an orange border are applied

**Given** each block,
**When** rendered in the DOM,
**Then** `role="article"` is present on the block element and all text is keyboard-focusable

**Given** any visible text in `OffreBlock`,
**When** rendered in any language,
**Then** all strings use i18n keys in `en.json`, `fr.json`, `es.json`

**Given** dark mode,
**When** `OffreBlock` renders,
**Then** `dark:` Tailwind classes are applied and all text is readable with contrast ≥ 4.5:1

## Epic 3: Contact accessible depuis n'importe quelle page

N'importe quel visiteur atteint le formulaire de contact en ≤ 2 clics, reçoit un feedback clair sur l'état d'envoi, et peut le faire en 3 langues.

### Story 3.1: CTA contact persistant depuis toutes les pages

As a visitor (Sophie / Marc / Thomas),
I want a contact call-to-action to be permanently accessible regardless of which page I'm on or how far I've scrolled,
So that I can reach the contact form in ≤ 2 clicks from anywhere on the site.

**Acceptance Criteria:**

**Given** I am on any page of the site,
**When** I look at the sticky header,
**Then** a "Contact" or "Devis gratuit" CTA button is visible on the right side at all times

**Given** I am on a mobile viewport with the hamburger menu closed,
**When** I open the hamburger menu,
**Then** the contact CTA is accessible within the open menu

**Given** I am at the bottom of the `OffreBlock` section on the home page,
**When** the section renders,
**Then** a contextual CTA "Discutons de ton projet →" links directly to `/contact`

**Given** a client project card (`ProjectCard`),
**When** rendered with `category: "client"`,
**Then** a "Me contacter pour un projet similaire" link is present on the card and navigates to `/contact`

**Given** any CTA link on the site,
**When** clicked,
**Then** the visitor reaches the contact form in at most 1 additional click (total ≤ 2 from any starting point)

**Given** all CTA text,
**When** rendered in any language,
**Then** all strings use i18n keys in `en.json`, `fr.json`, `es.json`

### Story 3.2: Renforcement du formulaire `Contact.vue` (4 états + RGPD)

As a visitor,
I want clear visual feedback at every stage of submitting the contact form, and to know my data is handled correctly,
So that I am confident my message was received and I trust Mel with my information.

**Acceptance Criteria:**

**Given** the contact form in its initial state,
**When** the page loads,
**Then** the submit button is active, labeled "Envoyer mon message" in orange, and the form fields (name, email, message) are visible with labels above each field

**Given** the visitor clicks submit,
**When** the form is submitting,
**Then** the button shows a spinner and is disabled, labeled "Envoi en cours...", and all form fields are non-interactive

**Given** EmailJS successfully sends the message,
**When** the response is received,
**Then** a green ✓ icon and the message "Reçu ! Je te réponds sous 48h." are displayed
**And** the form fields are reset to empty
**And** `aria-live="polite"` on the confirmation zone announces the success to screen readers

**Given** EmailJS returns an error or is unavailable,
**When** the submission fails,
**Then** an orange ⚠ icon and a fallback message with Mel's direct email are displayed
**And** the error state persists until the visitor explicitly dismisses it

**Given** the form,
**When** rendered,
**Then** a RGPD notice "Tes données sont utilisées uniquement pour te répondre." appears immediately before the submit button
**And** this text uses an i18n key in all 3 locales

**Given** the honeypot field (`website`),
**When** the form renders,
**Then** the field has `display:none` and `tabindex="-1"` and is submitted with the form (existing protection maintained)

**Given** the form,
**When** navigated by keyboard alone,
**Then** all fields are reachable in logical order, focus ring is visible (`focus:ring-2 focus:ring-orange-500`), and the form can be submitted without a mouse

**Given** the form is submitted in any language,
**When** Mel receives the email,
**Then** Mel receives the message via EmailJS (FR17 — existing integration maintained)

## Epic 4: Vitrine technique pour recruteurs (Projets 42)

Thomas navigue vers l'onglet 42 dédié, voit la visualisation animée de push_swap avec une explication technique profonde, et télécharge le CV.

### Story 4.1: Création de la route `/42` et de la page `FortyTwo.vue`

As a visitor (Thomas),
I want a dedicated page for 42 school projects accessible directly from the navigation,
So that I can explore Mel's technical depth without sifting through client projects.

**Acceptance Criteria:**

**Given** I am on any page of the site,
**When** I look at the navigation header,
**Then** a "Projets 42" or "42" link is visible and navigates to `/42`

**Given** I navigate to `/42`,
**When** the page loads,
**Then** `FortyTwo.vue` renders with a page title, a brief explanation of what École 42 is (FR9), and a list of 42 projects from `projects.json` filtered by `category: "42"`

**Given** the route `/42` in `src/main.js`,
**When** defined,
**Then** `FortyTwo.vue` is loaded lazily (`() => import('@/pages/FortyTwo.vue')`) to avoid impacting initial bundle size

**Given** the page title and 42 explanation text,
**When** rendered in any language,
**Then** all text uses i18n keys in `en.json`, `fr.json`, `es.json` (e.g., `fortyTwo.pageTitle`, `fortyTwo.schoolExplanation`)

**Given** dark mode,
**When** `FortyTwo.vue` renders,
**Then** `dark:` Tailwind classes are applied throughout

**Given** `seo.config.js`,
**When** updated,
**Then** the `/42` route has its own meta title and description in all 3 locales

### Story 4.2: Création de `ProjectVideo.vue` (lecteur vidéo lazy)

As a visitor (Thomas),
I want to watch a short demo video of a 42 project directly on the page,
So that I can see the project in action without leaving the site.

**Acceptance Criteria:**

**Given** `ProjectVideo` receives `src` (mp4), `srcWebm` (webm), `poster` (WebP), and `title` props,
**When** the component renders,
**Then** a `<video>` element is shown with the poster image visible before playback

**Given** the video element,
**When** rendered,
**Then** it has `preload="none"`, `playsinline`, `controls`, and both `<source>` tags (mp4 + webm fallback)

**Given** the video is not yet in the viewport,
**When** the page loads,
**Then** the video does not load its media data (lazy loading via `preload="none"`)

**Given** the video loads slowly or the file is missing,
**When** the error event fires,
**Then** a fallback message is shown in place of the video player (e.g., "Vidéo non disponible")

**Given** the `title` prop,
**When** rendered,
**Then** the video has an `aria-label` equal to the title for screen reader accessibility

**Given** `FortyTwo.vue` uses `ProjectVideo`,
**When** a 42 project has a `video` field in `projects.json`,
**Then** `ProjectVideo` is rendered for that project with the correct `src`, `srcWebm`, and `poster` paths

### Story 4.3: Création de `Viz42.vue` — visualisation animée push_swap

As a visitor (Thomas),
I want to see an animated visualization of the push_swap algorithm with a technical explanation,
So that I understand Mel's thought process and problem-solving ability, not just that he completed the project.

**Acceptance Criteria:**

**Given** `Viz42.vue` is rendered in `FortyTwo.vue` for the push_swap project,
**When** the component enters the viewport (IntersectionObserver),
**Then** the animation starts playing (state: `playing`)

**Given** the animation is playing,
**When** it runs,
**Then** it visualizes stack operations (push/pop between stack a and stack b) using CSS `@keyframes` or native canvas — no external library, no dependency > 50kb

**Given** a user's system has `prefers-reduced-motion: reduce`,
**When** `Viz42.vue` renders,
**Then** a static snapshot is shown instead of the animation, and no motion plays

**Given** the component,
**When** rendered,
**Then** it has `aria-label="Visualisation animée de l'algorithme push_swap"` and all CSS is scoped

**Given** the technical explanation section below the visualization,
**When** rendered,
**Then** it includes at minimum: the problem constraints, the algorithm approach chosen, and key learnings

**Given** the explanation text,
**When** rendered in any language,
**Then** all strings use i18n keys in `en.json`, `fr.json`, `es.json`

**Given** a Lighthouse performance audit after adding `Viz42.vue`,
**When** run on the `/42` page,
**Then** the Lighthouse Performance score does not drop more than 5 points compared to baseline (NFR3)

## Epic 5: Profil complet et services additionnels

Les visiteurs accèdent au parcours complet de Mel via une page About recentrée sur la valeur client, et découvrent les options de service post-livraison.

### Story 5.1: Mise à jour de `About.vue` (ton client-first + services additionnels)

As a visitor (Sophie / Thomas),
I want the About page to immediately tell me what value Mel brings rather than his career timeline, and to understand the add-on services available after delivery,
So that I gain confidence in Mel's professionalism and can evaluate post-project support options.

**Acceptance Criteria:**

**Given** I navigate to `/about`,
**When** the page loads,
**Then** the opening section leads with the value Mel brings to clients (not a chronological biography starting with "In 2019...")

**Given** the About page content,
**When** rendered,
**Then** it includes: empathy for artisan/TPE clients, a mention of accessible rates and "devis gratuit sous 48h", and 42 + NASA as proof-points (not as the opening)

**Given** `NasaBadge` (variant `sm`),
**When** rendered on the About page,
**Then** it appears as a small credential badge alongside the 42 and NASA mentions

**Given** the additional services section,
**When** rendered,
**Then** it presents two post-delivery options: admin panel (autonomous content management) and monthly maintenance (updates, security, support)

**Given** each additional service,
**When** rendered,
**Then** it clearly explains what is included (FR24) and includes a CTA linking to `/contact` with a pre-filled subject or context (FR25)

**Given** all text on the About page,
**When** rendered in any language,
**Then** all strings use i18n keys in `en.json`, `fr.json`, `es.json`

**Given** dark mode,
**When** `About.vue` renders,
**Then** `dark:` Tailwind classes are applied and contrast ≥ 4.5:1 on all text

## Epic 6: Qualité, performance et tracking

Mel dispose d'analytics pour mesurer les conversions. Le site respecte les seuils Lighthouse ≥ 85, les critères WCAG AA, et le CI/CD fonctionne sans modification.

### Story 6.1: Intégration Google Analytics 4

As a site owner (Mel),
I want Google Analytics 4 to track page views and user sessions,
So that I can measure which pages drive contact conversions and optimize accordingly.

**Acceptance Criteria:**

**Given** a `VITE_GA_ID` variable defined in `.env`,
**When** the app builds,
**Then** the GA4 measurement ID is injected into `index.html` via the gtag.js script

**Given** a visitor navigates between pages,
**When** `router.afterEach` fires in `main.js`,
**Then** a pageview event is sent to GA4 with the correct route path

**Given** the GA4 configuration,
**When** initialized,
**Then** `anonymize_ip: true` is set to comply with GDPR/NFR6

**Given** the `.env` file,
**When** committed,
**Then** it is listed in `.gitignore` and not tracked by git
**And** `.env.example` exists with `VITE_GA_ID=` as a template for other developers

**Given** the CI/CD pipeline (GitHub Actions → Firebase),
**When** a push to `main` is made,
**Then** the pipeline runs unchanged and the build succeeds with the GA4 script included (NFR13)

### Story 6.2: Mise à jour SEO pour la route `/42`

As a site owner (Mel),
I want the `/42` page to be properly indexed by search engines with correct meta tags and sitemap entry,
So that the page can be discovered organically and does not regress existing SEO quality.

**Acceptance Criteria:**

**Given** `seo.config.js`,
**When** updated,
**Then** the `/42` route has a `title` and `description` meta in all 3 locales (en, fr, es)

**Given** `MetaTags.vue`,
**When** rendering on the `/42` route,
**Then** the correct `<title>` and `<meta name="description">` are injected into the document head

**Given** `public/sitemap.xml`,
**When** updated,
**Then** the `/42` URL is included with a valid `<loc>` entry

**Given** all existing routes (home, projects, about, contact, resume),
**When** the SEO update is deployed,
**Then** their meta tags are unchanged — no regression

### Story 6.3: Audit accessibilité et performance

As a site owner (Mel),
I want the site to pass Lighthouse and WCAG AA thresholds after all MVP features are deployed,
So that all visitors — including those using assistive technologies — have a good experience, and business KPIs are not harmed by slow load times.

**Acceptance Criteria:**

**Given** a Lighthouse audit run on the home page (`/`),
**When** executed on mobile and desktop,
**Then** the Performance score is ≥ 85 (NFR1) and FCP ≤ 2s on simulated 4G (NFR2)

**Given** all project images across the site,
**When** audited,
**Then** every `<img>` has a non-empty descriptive `alt` attribute (NFR8)
**And** all project images outside the hero use `loading="lazy"` (NFR4)

**Given** all text elements on the site,
**When** contrast is checked via browser DevTools,
**Then** all text/background combinations meet ≥ 4.5:1 ratio, including `text-indigo-400` on `bg-navy-800` for the 42 tab (NFR9 / UX-DR11)

**Given** the entire site,
**When** navigated using keyboard only (Tab, Enter, Space, ←/→),
**Then** all interactive elements (links, buttons, form fields, tabs) are reachable and have a visible focus ring (`focus:ring-2 focus:ring-orange-500`) (NFR10)

**Given** a mobile device at 320px width,
**When** any page is rendered,
**Then** all content is readable and no horizontal scroll occurs (NFR11)

**Given** the `Viz42.vue` animation,
**When** a Lighthouse Performance audit is run on `/42`,
**Then** the score does not drop more than 5 points below the baseline score without the animation (NFR3)
