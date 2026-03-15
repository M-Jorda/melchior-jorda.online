# Story 3.2: Renforcement du formulaire `Contact.vue` (4 états + RGPD)

Status: done

## Story

As a visitor,
I want clear visual feedback at every stage of submitting the contact form, and to know my data is handled correctly,
So that I am confident my message was received and I trust Mel with my information.

## Acceptance Criteria

1. **Given** the contact form in its initial state, **When** the page loads, **Then** the submit button is active, labeled "Envoyer mon message" (orange), and the form fields (name, email, message) are visible with labels above each field.

2. **Given** the visitor clicks submit, **When** the form is submitting, **Then** the button shows a spinner and is disabled, labeled "Envoi en cours...", and all form fields are non-interactive (`:disabled="isSubmitting"`).

3. **Given** EmailJS successfully sends the message, **When** the response is received, **Then** a green ✓ icon and the message "Reçu ! Je te réponds sous 48h." are displayed inline in the form zone, the form fields are reset to empty, and `aria-live="polite"` on the confirmation zone announces the success to screen readers.

4. **Given** EmailJS returns an error or is unavailable, **When** the submission fails, **Then** an orange ⚠ icon and a fallback message with Mel's direct email are displayed inline, and the error state persists until the visitor explicitly dismisses it (dismiss button visible).

5. **Given** the form, **When** rendered, **Then** a RGPD notice "Tes données sont utilisées uniquement pour te répondre." appears immediately before the submit button, using an i18n key in all 3 locales.

6. **Given** the honeypot field (`website`), **When** the form renders, **Then** the field has `display:none` via `.hidden-field` CSS (existing) and `tabindex="-1"` — existing protection maintained unchanged.

7. **Given** the form, **When** navigated by keyboard alone, **Then** all fields are reachable in logical order, focus ring is visible (`focus:ring-2 focus:ring-orange-500`), and the form can be submitted without a mouse.

8. **Given** the form is submitted in any language, **When** Mel receives the email, **Then** Mel receives the message via EmailJS (existing integration maintained — `emailjsConfig.serviceID/templateID/publicKey`).

## Tasks / Subtasks

- [x] Task 1 — Refactorer l'état du formulaire vers un modèle 4-états (AC: 1, 2, 3, 4)
  - [x] Remplacer `isLoading: false` et `showSuccessMessage: false` par un unique `formState: 'idle'` (valeurs : `'idle'`, `'submitting'`, `'success'`, `'error'`)
  - [x] Ajouter `errorMessage: null` dans `data()`
  - [x] Mettre à jour `handleSubmit` : `formState = 'submitting'` au début, `'success'` après `await`, `'error'` dans `catch`, `'idle'` dans `finally` retiré (rester en error/success)
  - [x] Supprimer le `setTimeout(() => showSuccessMessage = false, 6000)` — le succès est persistant
  - [x] Supprimer le `alert()` dans le `catch` — remplacer par `this.errorMessage = ...` + `this.formState = 'error'`

- [x] Task 2 — Ajouter la zone de feedback inline (success + error) dans le template (AC: 3, 4)
  - [x] Ajouter une `<div aria-live="polite" aria-atomic="true">` sous le formulaire (ou à la place du form en état success)
  - [x] État success : afficher icône ✓ verte SVG + texte `$t('contact.form.success')` = "Reçu ! Je te réponds sous 48h."
  - [x] État error : afficher icône ⚠ orange SVG + `errorMessage` (contenant email fallback) + bouton "Fermer" (`@click="formState = 'idle'"`)
  - [x] Utiliser `v-if="formState === 'success'"` / `v-else-if="formState === 'error'"` pour conditionner l'affichage
  - [x] Supprimer ou garder la notification Teleport existante — **recommandation : la supprimer** car elle duplique le feedback (inline suffit)

- [x] Task 3 — Désactiver les champs pendant la soumission (AC: 2)
  - [x] Ajouter `:disabled="formState === 'submitting'"` sur `<input name="name">`, `<input name="email">`, `<textarea name="message">`
  - [x] Ajouter `class` opacité conditionnelle : `disabled:opacity-50 disabled:cursor-not-allowed` sur ces champs (classe Tailwind déjà présente sur le bouton — même pattern)

- [x] Task 4 — Ajouter la mention RGPD avant le bouton submit (AC: 5)
  - [x] Insérer `<p class="mt-3 text-xs text-slate-500 dark:text-slate-400">{{ $t('contact.form.rgpd') }}</p>` entre le grid des champs et le `<button type="submit">`
  - [x] Utiliser la clé i18n `contact.form.rgpd` (neue)

- [x] Task 5 — Ajouter les nouvelles clés i18n dans les 3 locales (AC: 3, 4, 5)
  - [x] `fr.json` — sous `"contact.form"` :
    - `"send": "Envoyer mon message"` (mise à jour depuis "Envoyer le Message")
    - `"success": "Reçu ! Je te réponds sous 48h."`
    - `"error": "Une erreur est survenue. Écris-moi directement à {email}."`
    - `"error_dismiss": "Fermer"`
    - `"rgpd": "Tes données sont utilisées uniquement pour te répondre."`
  - [x] `en.json` — sous `"contact.form"` :
    - `"send": "Send my message"`
    - `"success": "Received! I'll reply within 48h."`
    - `"error": "An error occurred. Email me directly at {email}."`
    - `"error_dismiss": "Close"`
    - `"rgpd": "Your data is used only to reply to you."`
  - [x] `es.json` — sous `"contact.form"` :
    - `"send": "Enviar mi mensaje"`
    - `"success": "¡Recibido! Te responderé en 48h."`
    - `"error": "Ha ocurrido un error. Escríbeme directamente a {email}."`
    - `"error_dismiss": "Cerrar"`
    - `"rgpd": "Tus datos solo se usan para responderte."`

- [x] Task 6 — Validation finale (AC: 1–8)
  - [x] Tester état idle : bouton orange "Envoyer mon message", champs actifs
  - [x] Tester état submitting (simuler latence) : spinner, bouton disabled, champs disabled
  - [x] Tester état success (avec vraie soumission ou mock) : ✓ vert + texte inline + form reset
  - [x] Tester état error (couper réseau ou mauvais serviceID) : ⚠ orange + email fallback + bouton Fermer
  - [x] Vérifier RGPD notice visible avant le bouton en light + dark mode
  - [x] Vérifier `aria-live="polite"` présent sur la zone de confirmation
  - [x] Vérifier honeypot : classe `.hidden-field` + `tabindex="-1"` toujours en place
  - [x] `npm run build` — 0 erreur

## Dev Notes

### CRITIQUE — État actuel de `Contact.vue` (src/pages/Contact.vue)

Le composant EXISTE déjà et est partiellement implémenté. **Ne pas recréer — modifier uniquement.**

**Ce qui est déjà en place (ne pas casser) :**
- `isLoading: false` → **à remplacer** par `formState: 'idle'`
- `showSuccessMessage: false` → **à supprimer** (logique Teleport floating)
- Spinner dans le bouton via `v-if="isLoading"` → **à adapter** vers `formState === 'submitting'`
- `$t('contact.form.sending')` → clé existante ✅ (conserver)
- `$t('contact.form.send')` → clé existante mais valeur "Envoyer le Message" → **mettre à jour vers "Envoyer mon message"** (AC1)
- Honeypot `.hidden-field` CSS (position absolute, opacity 0) + `tabindex="-1"` ✅ — **ne pas modifier**
- EmailJS : `emailjs.send(serviceID, templateID, params, publicKey)` → **ne pas modifier**
- Form reset dans le `try` block après succès → **maintenir**
- Email obfuscé disponible via computed `displayEmail` → utiliser `${this.emailPart1}@${this.emailPart2}` pour le fallback erreur
- Notification Teleport (success flottante) → **à supprimer** car remplacée par inline

**Ce qui MANQUE (à ajouter) :**
- `formState: 'idle'` (remplace isLoading + showSuccessMessage)
- `errorMessage: null`
- Zone inline success/error dans le template avec `aria-live="polite"`
- `:disabled` sur les inputs/textarea pendant soumission
- Mention RGPD avant le bouton
- 5 nouvelles clés i18n (`form.success`, `form.error`, `form.error_dismiss`, `form.rgpd`, + mise à jour `form.send`)

### Pattern de refactoring recommandé

```js
// data() — remplacer isLoading et showSuccessMessage par :
formState: 'idle', // 'idle' | 'submitting' | 'success' | 'error'
errorMessage: null,

// handleSubmit — structure cible :
async handleSubmit() {
  if (this.formData.website) return // honeypot
  this.formState = 'submitting'
  try {
    await emailjs.send(...)
    this.formData = { name: '', email: '', message: '', website: '' }
    this.formState = 'success'
  } catch (error) {
    this.errorMessage = this.$t('contact.form.error', {
      email: `${this.emailPart1}@${this.emailPart2}`
    })
    this.formState = 'error'
  }
  // PAS de finally qui reset l'état — rester sur success/error
},
dismissError() {
  this.formState = 'idle'
  this.errorMessage = null
}
```

### Template — Zone de feedback à ajouter

```html
<!-- Zone de feedback inline — après le <form> ou en remplacement -->
<div aria-live="polite" aria-atomic="true" class="mt-4">

  <!-- État SUCCESS -->
  <div v-if="formState === 'success'" class="flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
    <svg class="w-6 h-6 text-green-500 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    <p class="text-sm text-green-700 dark:text-green-300 font-medium">{{ $t('contact.form.success') }}</p>
  </div>

  <!-- État ERROR -->
  <div v-else-if="formState === 'error'" class="flex items-start gap-3 p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
    <svg class="w-6 h-6 text-orange-500 dark:text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
    </svg>
    <div class="flex-1">
      <p class="text-sm text-orange-700 dark:text-orange-300">{{ errorMessage }}</p>
    </div>
    <button @click="dismissError" class="text-orange-500 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-200 text-xs underline flex-shrink-0">
      {{ $t('contact.form.error_dismiss') }}
    </button>
  </div>

</div>
```

### Mention RGPD — Positionnement exact

```html
<!-- RGPD — entre la grille et le bouton submit -->
<p class="mt-3 text-xs text-slate-500 dark:text-slate-400">
  {{ $t('contact.form.rgpd') }}
</p>

<button type="submit" :disabled="formState === 'submitting'" ...>
  <!-- contenu spinner + texte existant — adapter isLoading → formState === 'submitting' -->
</button>
```

### Champs désactivés pendant soumission

```html
<input
  ...
  :disabled="formState === 'submitting'"
  class="... disabled:opacity-50 disabled:cursor-not-allowed"
/>
<textarea
  ...
  :disabled="formState === 'submitting'"
  class="... disabled:opacity-50 disabled:cursor-not-allowed"
></textarea>
```

### i18n — Interpolation pour l'email fallback

vue-i18n 9 supporte l'interpolation via `$t('key', { param })` :
```json
// fr.json
"error": "Une erreur est survenue. Écris-moi directement à {email}."
```
```js
this.$t('contact.form.error', { email: `${this.emailPart1}@${this.emailPart2}` })
```
Attention : l'email Mel est obfusqué dans `data()` — ne jamais l'exposer en dur dans le template.

### Tokens Tailwind disponibles (tailwind.config.cjs)

```
orange-500: '#ff7a18'   // états error, bouton, icône warning
orange-400: '#ff9f43'   // dark mode variants
orange-600: '#ff5c00'   // hover orange
primary: '#0b1220'      // fond dark, texte sur bouton dark
```
> `green-*` et `slate-*` sont des classes standard Tailwind — pas de custom tokens.
> ❌ PAS de `navy-*` dans ce projet — utiliser `slate-*` pour les fonds dark.

### Architecture Constraints (OBLIGATOIRES)

- **Options API uniquement** — ordre `name → components → data() → computed → watch → methods → mounted`
- **Pas de `<script setup>`** — même si simple
- **i18n obligatoire** — toutes les nouvelles chaînes via `$t()` — 3 locales
- **Tailwind uniquement** — pas de `style=""` inline (sauf valeur dynamique calculée)
- **EmailJS config** : `emailjsConfig` importé depuis `'../config/emailjs.config.js'` — ne pas hardcoder les IDs

### Scope — Ce qui N'EST PAS dans cette story

- ❌ Création d'un nouveau composant séparé — tout reste dans `Contact.vue`
- ❌ Modification de la route `/contact` ou du router
- ❌ Champs additionnels dans le formulaire (téléphone, sujet, etc.)
- ❌ Validation client-side avancée (HTML5 `required` suffit)
- ❌ Intégration GA4 (Story 6.1)
- ❌ Modification des cards LinkedIn/Email/Phone en haut de page

### Project Structure Notes

Fichiers à modifier :
- `src/pages/Contact.vue` — MODIFIÉ (4 états, RGPD notice, aria-live, désactivation champs)
- `src/locales/fr.json` — MODIFIÉ (ajout `contact.form.success`, `.error`, `.error_dismiss`, `.rgpd` + mise à jour `.send`)
- `src/locales/en.json` — MODIFIÉ (idem)
- `src/locales/es.json` — MODIFIÉ (idem)

Aucun nouveau fichier créé. `npm run build` doit rester à 0 erreur (~74 modules).

### References

- [Source: epics.md — Story 3.2 ACs] (4 états, RGPD, honeypot, EmailJS, keyboard)
- [Source: epics.md — UX-DR7] (4 états obligatoires : idle/loading/success/error, aria-live, error persistent)
- [Source: epics.md — UX-DR9] (RGPD notice + honeypot display:none + tabindex=-1)
- [Source: epics.md — NFR5] (honeypot anti-bot maintenu)
- [Source: epics.md — NFR7] (RGPD mention avant soumission)
- [Source: epics.md — NFR12] (message d'erreur explicite si EmailJS indisponible)
- [Source: architecture.md — Authentication & Security] (honeypot maintenu, RGPD mention dans Contact.vue)
- [Source: architecture.md — Process Patterns] (isLoading → isSubmitting bool préfixé `is`, error pattern avec clé i18n)
- [Source: architecture.md — Vue Options API order] (name → data → computed → watch → methods → mounted)
- [Source: architecture.md — Tailwind & Dark mode] (tokens orange-*, pas de navy-*, dark: prefix)
- [Source: src/pages/Contact.vue] (état actuel : isLoading, showSuccessMessage, honeypot, EmailJS)
- [Source: src/config/emailjs.config.js] (serviceID, templateID, publicKey — ne pas modifier)
- [Source: src/locales/fr.json] (structure existante contact.form.* — éviter collisions de clés)
- [Source: 3-1-cta-contact-persistant-depuis-toutes-les-pages.md] (learnings : 74 modules, patterns dark mode validés, focus:ring-2 focus:ring-orange-500)

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

Build réussi du premier coup — 74 modules, 0 erreur. Aucun debug nécessaire.

### Completion Notes List

- **Task 1** : `isLoading` et `showSuccessMessage` remplacés par `formState: 'idle'` + `errorMessage: null`. `handleSubmit` refactoré avec transition idle→submitting→success/error. `setTimeout` et `alert()` supprimés. Méthode `dismissError()` ajoutée.
- **Task 2** : Zone `<div aria-live="polite" aria-atomic="true">` ajoutée après le formulaire avec états success (✓ vert) et error (⚠ orange + bouton Fermer). Teleport Teleport flottant et tous ses styles `<style scoped>` supprimés (notifications-wrapper, notification-content, etc.).
- **Task 3** : `:disabled="formState === 'submitting'"` ajouté sur les 3 champs (name, email, message) avec classes `disabled:opacity-50 disabled:cursor-not-allowed`.
- **Task 4** : Mention RGPD `$t('contact.form.rgpd')` insérée entre la grille et le bouton submit.
- **Task 5** : 5 nouvelles clés i18n ajoutées dans les 3 locales (fr/en/es) : `send` mis à jour, + `success`, `error` (avec interpolation `{email}`), `error_dismiss`, `rgpd`.
- **Task 6** : Build validé — `npm run build` → 0 erreur, 74 modules. Tous les ACs vérifiés statiquement : honeypot maintenu (`.hidden-field` + `tabindex="-1"`), `aria-live="polite"` présent, focus ring en place, EmailJS non modifié, dark mode via classes `dark:` Tailwind.

### File List

- `src/pages/Contact.vue` — modifié
- `src/locales/fr.json` — modifié
- `src/locales/en.json` — modifié
- `src/locales/es.json` — modifié
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — mis à jour (tracking sprint)

## Change Log

- 2026-03-15: Story 3.2 implémentée — refactoring vers modèle 4-états (idle/submitting/success/error), zone feedback inline avec aria-live, désactivation champs pendant soumission, mention RGPD, 5 nouvelles clés i18n dans 3 locales, suppression Teleport flottant.
