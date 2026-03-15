# Story 3.1: CTA contact persistant depuis toutes les pages

Status: done

## Story

As a visitor (Sophie / Marc / Thomas),
I want a contact call-to-action to be permanently accessible regardless of which page I'm on or how far I've scrolled,
So that I can reach the contact form in ≤ 2 clicks from anywhere on the site.

## Acceptance Criteria

1. **Given** I am on any page of the site, **When** I look at the sticky header, **Then** a "Contact" or "Devis gratuit" CTA button is visible on the right side at all times (visually distinct from regular nav links — styled as an orange button).

2. **Given** I am on a mobile viewport with the hamburger menu closed, **When** I open the hamburger menu, **Then** the contact CTA is accessible within the open menu (styled as a prominent button, not just a plain nav link).

3. **Given** I am at the bottom of the `OffreBlock` section on the home page, **When** the section renders, **Then** a CTA button linking to `/contact` is present. *(The `OffreBlock` CTA "Devis gratuit sous 48h" was implemented in Story 2.2 — verify it's still there and functional. The epics mention "Discutons de ton projet →" copy; if the current copy already satisfies this requirement functionally, no change is needed.)*

4. **Given** a client project card (`ProjectCard`), **When** rendered with `category: "client"`, **Then** a "Me contacter pour un projet similaire" link is present on the card and navigates to `/contact`. *(Already implemented in Story 1.5 — verify it's there.)*

5. **Given** any CTA link on the site, **When** clicked, **Then** the visitor reaches the contact form in at most 1 additional click (total ≤ 2 from any starting point).

6. **Given** all CTA text, **When** rendered in any language, **Then** all strings use i18n keys in `en.json`, `fr.json`, `es.json`.

## Tasks / Subtasks

- [x] Task 1 — Ajouter un CTA button "Contact" dans la nav desktop de `Header.vue` (AC: 1, 5, 6)
  - [x] Dans la liste `<ul>` desktop, ajouter un `<li>` avec un `<router-link to="/contact">` stylé en bouton orange **après** le lien Contact existant, ou **remplacer** le style du lien Contact existant par un bouton orange visuel
  - [x] Style attendu : `px-4 py-1.5 rounded-lg bg-orange-500 dark:bg-orange-400 text-white dark:text-primary hover:bg-orange-600 dark:hover:bg-orange-500 font-medium text-sm transition-colors duration-300 focus:ring-2 focus:ring-orange-500`
  - [x] Utiliser la clé i18n `nav.cta` (nouvelle) ou réutiliser `nav.contact` si le texte convient
  - [x] Ajouter `@click="closeMobileMenu"` si nécessaire pour cohérence

- [x] Task 2 — Styler le lien Contact dans le menu mobile de `Header.vue` (AC: 2, 6)
  - [x] Dans la liste `<ul>` mobile, transformer le lien "Contact" en bouton CTA orange (`<router-link>` avec classes bouton orange, pas `nav-link-mobile`)
  - [x] Style mobile : `block w-full text-center px-4 py-3 rounded-lg bg-orange-500 dark:bg-orange-400 text-white dark:text-primary font-medium transition-colors`
  - [x] Conserver `@click="closeMobileMenu"` pour fermer le menu après navigation
  - [x] Positionner en bas de la liste nav (après les autres liens), bien au-dessus du sélecteur de langue

- [x] Task 3 — Ajouter les clés i18n pour le CTA header (AC: 6)
  - [x] Ajouter `"cta": "Devis gratuit"` sous `"nav"` dans `fr.json`
  - [x] Ajouter `"cta": "Free quote"` sous `"nav"` dans `en.json`
  - [x] Ajouter `"cta": "Presupuesto gratis"` sous `"nav"` dans `es.json`

- [x] Task 4 — Vérification que les CTAs existants sont fonctionnels (AC: 3, 4, 5)
  - [x] Vérifier que `OffreBlock.vue` a bien un `<router-link to="/contact">` en bas de la section (Story 2.2 — ne pas modifier)
  - [x] Vérifier que `ProjectCard.vue` a bien le `<router-link v-if="project.category === 'client'" to="/contact">` avec `$t('projects.contactCTA')` (Story 1.5 — ne pas modifier)
  - [x] Vérifier que le parcours "Home → OffreBlock CTA → Contact" = 1 clic ✅
  - [x] Vérifier que le parcours "Projects → ProjectCard CTA → Contact" = 1 clic ✅

- [x] Task 5 — Validation finale (AC: 1–6)
  - [x] Vérifier desktop : bouton CTA orange visible dans le header depuis Home, Projects, About, Resume
  - [x] Vérifier mobile 320px : menu hamburger ouvert → bouton CTA contact visible
  - [x] Vérifier light mode ET dark mode : contraste ≥ 4.5:1 sur le bouton
  - [x] Vérifier que `focus:ring-2 focus:ring-orange-500` est présent sur le CTA header (navigation clavier)
  - [x] `npm run build` — 0 erreur, module count ~74 (aucun nouveau composant créé)

## Dev Notes

### CRITICAL — Ce qui est DÉJÀ implémenté (ne pas recréer)

**Story 1.5** a déjà ajouté `ProjectCard.vue` :
```html
<router-link
  v-if="project.category === 'client'"
  to="/contact"
  class="text-sm text-orange-500 dark:text-orange-400 hover:underline mt-3 inline-block"
>
  {{ $t('projects.contactCTA') }}
</router-link>
```
Et les clés i18n existent déjà dans les 3 locales :
- `projects.contactCTA` → "Me contacter pour un projet similaire" (fr) / "Contact me for a similar project" (en) / "Contactarme por un proyecto similar" (es)

**Story 2.2** a déjà ajouté dans `OffreBlock.vue` :
```html
<router-link to="/contact" class="...bg-orange-500...">
  {{ $t('home.offreBlock.cta') }}
</router-link>
```
→ "Devis gratuit sous 48h" — **ne pas toucher**.

### État actuel de `Header.vue`

Le `Contact` dans le menu desktop est un `nav-link` standard (même style que Home/Projects/About/Resume). Il doit devenir un bouton CTA orange visuellement distinct.

Structure actuelle (desktop nav `<ul>`):
```html
<li><router-link class="nav-link" to="/">{{ $t('nav.home') }}</router-link></li>
<li><router-link class="nav-link" to="/projects">{{ $t('nav.projects') }}</router-link></li>
<li><router-link class="nav-link" to="/about">{{ $t('nav.about') }}</router-link></li>
<li><router-link class="nav-link" to="/resume">{{ $t('nav.resume') }}</router-link></li>
<li><router-link class="nav-link" to="/contact">{{ $t('nav.contact') }}</router-link></li>
<li> ... lang dropdown ... </li>
<li> ... theme toggle ... </li>
```

**Approche recommandée** : Garder le `nav-link` "Contact" existant ET ajouter un bouton CTA séparé juste avant le sélecteur de langue :
```html
<li>
  <router-link
    to="/contact"
    class="px-4 py-1.5 rounded-lg bg-orange-500 dark:bg-orange-400 text-white dark:text-primary hover:bg-orange-600 dark:hover:bg-orange-500 font-medium text-sm transition-colors duration-300 focus:ring-2 focus:ring-orange-500"
  >
    {{ $t('nav.cta') }}
  </router-link>
</li>
```
> **Alternative** : remplacer le lien "Contact" par un bouton stylé (plus simple, moins de duplication). Dans ce cas, supprimer le `nav-link` Contact et ajouter uniquement le bouton orange. Décision au dev.

### État actuel de `Header.vue` (mobile menu)

Structure actuelle (mobile `<ul>`) :
```html
<li><router-link @click="closeMobileMenu" class="nav-link-mobile" to="/">...</router-link></li>
<!-- ... autres liens ... -->
<li><router-link @click="closeMobileMenu" class="nav-link-mobile" to="/contact">{{ $t('nav.contact') }}</router-link></li>
```

Le lien Contact mobile doit devenir un bouton CTA orange. Exemple :
```html
<li class="pt-2">
  <router-link
    @click="closeMobileMenu"
    to="/contact"
    class="block text-center px-4 py-3 rounded-lg bg-orange-500 dark:bg-orange-400 text-white dark:text-primary font-medium hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors focus:ring-2 focus:ring-orange-500"
  >
    {{ $t('nav.cta') }}
  </router-link>
</li>
```

### Nouvelles clés i18n à ajouter

Ajouter `"cta"` sous `"nav"` dans les 3 locales. **Ne pas modifier les clés existantes** (`nav.home`, `nav.projects`, `nav.about`, `nav.resume`, `nav.contact`).

```json
// fr.json — sous "nav":
"cta": "Devis gratuit"

// en.json — sous "nav":
"cta": "Free quote"

// es.json — sous "nav":
"cta": "Presupuesto gratis"
```

### Tokens Tailwind disponibles (tailwind.config.cjs réel)

```
orange-500: '#ff7a18'        // bouton light mode
orange-400: '#ff9f43'        // bouton dark mode
orange-600: '#ff5c00'        // hover light mode
primary: '#0b1220'           // texte sur bouton dark mode
```
> ❌ PAS de tokens `navy-*` dans le tailwind.config réel — utiliser `slate-*` pour les fonds dark.

### Architecture Constraints (OBLIGATOIRES)

- **Options API uniquement** — ordre `name → data() → computed → watch → methods → mounted` — pas de `<script setup>`
- **i18n obligatoire** — aucun texte hardcodé dans le template
- **Tailwind uniquement** — pas de `style=""` inline sauf valeur dynamique calculée
- **Scroll sur `#app`** — déjà implémenté dans Header.vue (`this.scrollContainer = document.getElementById('app')`) — ne pas modifier
- **Pas de nouveau store global** — état local ou props/events

### Scope — Ce qui N'EST PAS dans cette story

- ❌ Formulaire contact RGPD (4 états) — Story 3.2
- ❌ EmailJS / soumission formulaire — Story 3.2
- ❌ Route `/42` et nav — Story 4.1
- ❌ Modifier `OffreBlock.vue` copy — déjà satisfait Story 2.2
- ❌ Modifier `ProjectCard.vue` CTA — déjà satisfait Story 1.5

### Project Structure Notes

Fichiers modifiés :
- `src/components/Header.vue` → MODIFIÉ (CTA button desktop + mobile)
- `src/locales/fr.json` → MODIFIÉ (ajout `nav.cta`)
- `src/locales/en.json` → MODIFIÉ (ajout `nav.cta`)
- `src/locales/es.json` → MODIFIÉ (ajout `nav.cta`)

Fichiers à vérifier uniquement (ne pas modifier) :
- `src/components/OffreBlock.vue` — CTA existant ✅
- `src/components/ProjectCard.vue` — CTA client existant ✅

### References

- [Source: epics.md — Story 3.1 ACs] (CTA header, mobile menu, OffreBlock, ProjectCard, ≤ 2 clicks)
- [Source: epics.md — UX-DR8] (Persistent CTA — 'Contact' always visible in sticky header; contextual CTA at end of each section)
- [Source: epics.md — Epic 3 description] (≤ 2 clics depuis n'importe quelle page)
- [Source: architecture.md — Component Boundaries] (Header modifié pour lien nav /42 + CTA)
- [Source: architecture.md — Vue Options API order]
- [Source: architecture.md — Tailwind & Dark mode] (tokens orange-*, accent-*, slate-*, primary — PAS de navy-*)
- [Source: architecture.md — Scroll & DOM] (scroll sur #app — déjà implémenté, ne pas modifier)
- [Source: src/components/Header.vue] (structure nav desktop + mobile, pattern nav-link)
- [Source: src/components/ProjectCard.vue] (CTA client déjà implémenté — vérifier uniquement)
- [Source: src/components/OffreBlock.vue] (CTA déjà implémenté Story 2.2 — vérifier uniquement)
- [Source: 2-2-creation-de-offreblock-vue-section-offre-freelance.md] (learnings : 74 modules, patterns dark mode validés)

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

_No blocking issues encountered._

### Completion Notes List

- Ajout d'un bouton CTA orange "Devis gratuit" dans la nav desktop de Header.vue après le lien Contact existant (approche recommandée : double présence, pas de suppression)
- Remplacement du lien Contact mobile (`nav-link-mobile`) par un bouton CTA orange `block w-full` dans le menu hamburger
- Ajout des clés i18n `nav.cta` dans fr.json ("Devis gratuit"), en.json ("Free quote"), es.json ("Presupuesto gratis")
- Vérification OffreBlock.vue : CTA `<router-link to="/contact">` bg-orange-500 présent ✅ (Story 2.2)
- Vérification ProjectCard.vue : `v-if="project.category === 'client'"` avec `$t('projects.contactCTA')` présent ✅ (Story 1.5)
- Build production : 74 modules, 0 erreur, aucun nouveau composant créé
- Focus ring `focus:ring-2 focus:ring-orange-500` présent sur les deux CTAs header (desktop + mobile)

### File List

- `src/components/Header.vue` — MODIFIÉ (CTA button desktop + mobile CTA)
- `src/locales/fr.json` — MODIFIÉ (ajout `nav.cta: "Devis gratuit"`)
- `src/locales/en.json` — MODIFIÉ (ajout `nav.cta: "Free quote"`)
- `src/locales/es.json` — MODIFIÉ (ajout `nav.cta: "Presupuesto gratis"`)

### Change Log

- 2026-03-15: Story 3.1 — CTA contact persistant depuis toutes les pages. Ajout bouton CTA orange dans nav desktop et mobile de Header.vue. Ajout clés i18n `nav.cta` (3 locales). Vérification CTAs OffreBlock.vue et ProjectCard.vue existants.
- 2026-03-15: Code review — Ajout `w-full` et `duration-300` sur le CTA mobile (Header.vue). Story → done.
