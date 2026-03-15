# Story 1.1: Enrichissement du schéma `projects.json` et migration des données

Status: done

## Story

As a site owner (Mel),
I want the projects data schema to support `clientContext`, `result`, `status`, `featured`, `sector`, and `video` fields,
So that I can present client projects with full business context and add new projects without modifying any component code.

## Acceptance Criteria

1. **Given** the `projects.json` file, **When** a new client project is added, **Then** the schema accepts: `clientContext` (i18n key ref), `result` (i18n key ref), `status` (`"delivered"` | `"in-progress"`), `featured` (boolean), `sector` (string), `video` (local path, optional), `poster` (local path, optional).

2. **Given** existing client projects (Les Planches, Elsa Psychologue, Minata, Trixie Conciergerie), **When** migrated to the new schema, **Then** each has `clientContext`, `result`, `sector`, `status: "delivered"`, and the i18n keys `projects.items.{id}.clientContext` and `projects.items.{id}.result` exist in `en.json`, `fr.json`, and `es.json`.

3. **Given** Miss Boat (existing) and Le Nain Vert (new), **When** configured, **Then** they have `status: "in-progress"` and `category: "client"` with all 3 locale translations for `clientContext` and `result`.

4. **Given** a project with a `video` field, **When** the field is set, **Then** it references a local path `assets/videos/{project-id}/demo.mp4` and `poster` references `assets/videos/{project-id}/poster.webp`.

5. **Given** new i18n keys, **When** added, **Then** they follow the nested pattern (`projects.items.{id}.clientContext`) — never flat keys.

6. **Given** all client projects migrated, **When** their `category` is updated, **Then** it is `"client"` (not `"websites"`) — note this temporarily hides them from `Projects.vue` "Websites" filter, which is corrected in Story 1.3.

## Tasks / Subtasks

- [x] Task 1 — Migrer les projets clients existants dans `src/data/projects.json` (AC: 1, 2, 6)
  - [x] Ajouter les champs `sector`, `status: "delivered"`, `featured: false`, `clientContext`, `result` à: `les-planches`, `elsa-psychologue`, `minata-portfolio`, `trixie-conciergerie`
  - [x] Changer `category` de `"websites"` à `"client"` pour ces 4 projets
  - [x] Mettre à jour `miss-boat`: ajouter champs enrichis + `status: "in-progress"` + `category: "client"`
  - [x] Ajouter le nouveau projet `le-nain-vert` avec tous les champs + `status: "in-progress"` + `category: "client"`

- [x] Task 2 — Ajouter les clés i18n dans les 3 locales (AC: 2, 3, 5)
  - [x] `src/locales/en.json` : ajouter `clientContext` et `result` pour chaque projet client sous `projects.items.{id}`
  - [x] `src/locales/fr.json` : idem
  - [x] `src/locales/es.json` : idem
  - [x] Ajouter également l'entrée pour `le-nain-vert` dans les 3 locales (title + description + clientContext + result)

- [x] Task 3 — Vérification de non-régression (AC: 4, 5)
  - [x] Vérifier que les projets `"42"` (get-next-line, ft-printf, libft, etc.) sont inchangés (8 projets 42 intacts)
  - [x] Vérifier que les projets `"applications"` (series-tracker, enchere, etc.) sont inchangés (5 apps intactes)
  - [x] Confirmer que `re-fresh-earth` reste en `category: "websites"` (ni client ni 42)
  - [x] JSON valide — tous les fichiers validés par `node -e "JSON.parse(...)"` sans erreur

## Dev Notes

### ⚠️ Conflit critique : changement de catégorie

Changer `category` de `"websites"` à `"client"` pour les projets clients va **temporairement cacher** ces projets dans `Projects.vue`. La computed `websiteProjects()` filtre par `p.category === 'websites'` — elle ne renverra plus les projets `"client"`.

**C'est attendu et voulu.** Story 1.2 et 1.3 corrigeront cela en créant `ProjectCard.vue` et `ProjectFilter.vue`. Ne pas reverter ce changement de category.

### Fichiers à modifier (et UNIQUEMENT ces fichiers)

```
src/data/projects.json          ← enrichissement schéma + migration données
src/locales/en.json             ← nouvelles clés i18n
src/locales/fr.json             ← nouvelles clés i18n
src/locales/es.json             ← nouvelles clés i18n
```

**Ne pas toucher** : aucun fichier `.vue`, `main.js`, `seo.config.js`. Story purement data.

### Schéma final attendu pour un projet client

```json
{
  "id": "les-planches",
  "title": "Les Planches",
  "description": "...",
  "technologies": ["HTML", "CSS", "JavaScript", "Animations"],
  "category": "client",
  "sector": "Restauration",
  "status": "delivered",
  "featured": false,
  "github": "https://github.com/M-Jorda/Les-Planches",
  "live": "/les-planches/index.html",
  "thumbnail": null
}
```

Les champs `clientContext` et `result` **ne sont PAS stockés directement** dans `projects.json` — ils sont des **clés de référence implicites** résolues par `$t('projects.items.les-planches.clientContext')`. Seuls `sector`, `status`, `featured`, `video` (optionnel), `poster` (optionnel) sont des champs JSON directs.

### Données i18n suggérées à implémenter

**Les Planches** (`les-planches`)
- `clientContext` (en): "Mediterranean tapas restaurant in Cavalaire-sur-Mer seeking an online presence to attract tourists near Saint-Tropez."
- `result` (en): "Delivered in 3 weeks with animated gallery and smooth scrolling — operational season opening."
- `clientContext` (fr): "Restaurant de tapas méditerranéen à Cavalaire-sur-Mer souhaitant une présence en ligne pour attirer les touristes près de Saint-Tropez."
- `result` (fr): "Livré en 3 semaines avec galerie animée et scroll fluide — ouverture de saison opérationnelle."
- `clientContext` (es): "Restaurante de tapas mediterráneo en Cavalaire-sur-Mer en busca de presencia online para atraer turistas cerca de Saint-Tropez."
- `result` (es): "Entregado en 3 semanas con galería animada y desplazamiento fluido — apertura de temporada operativa."
- `sector`: `"Restauration"`

**Elsa Psychologue** (`elsa-psychologue`)
- `clientContext` (en): "Psychologist in solo practice looking for a professional, reassuring website to gain patient trust online."
- `result` (en): "Clean and calming site deployed on Firebase — online appointment booking and clear therapy service presentation."
- `clientContext` (fr): "Psychologue en cabinet individuel cherchant un site professionnel et rassurant pour gagner la confiance des patients en ligne."
- `result` (fr): "Site épuré et apaisant déployé sur Firebase — prise de rendez-vous en ligne et présentation claire des services thérapeutiques."
- `clientContext` (es): "Psicóloga en consulta individual buscando un sitio web profesional y tranquilizador para generar confianza en pacientes online."
- `result` (es): "Sitio limpio y calmante desplegado en Firebase — reserva de citas online y presentación clara de servicios terapéuticos."
- `sector`: `"Santé & Bien-être"`

**Minata Sartori** (`minata-portfolio`)
- `clientContext` (en): "Photographer and filmmaker needing a multi-page portfolio to present her photo and video work professionally."
- `result` (en): "Responsive multi-page portfolio with interactive media players — showcases photography, film, and radio productions."
- `clientContext` (fr): "Photographe et réalisatrice ayant besoin d'un portfolio multi-pages pour présenter ses travaux photo et vidéo de façon professionnelle."
- `result` (fr): "Portfolio multi-pages responsive avec lecteurs médias interactifs — met en valeur photographies, films et productions radio."
- `clientContext` (es): "Fotógrafa y realizadora que necesitaba un portfolio multipágina para presentar sus trabajos foto y vídeo de forma profesional."
- `result` (es): "Portfolio multipágina responsive con reproductores multimedia interactivos — muestra fotografía, cine y producciones de radio."
- `sector`: `"Photographie & Cinéma"`

**Trixie Conciergerie** (`trixie-conciergerie`)
- `clientContext` (en): "Luxury concierge service in Saint-Tropez needing an upscale website to attract high-end clientele and manage service bookings."
- `result` (en): "Modern responsive site with booking system and SEO optimization — online presence matching the premium positioning."
- `clientContext` (fr): "Service de conciergerie de luxe à Saint-Tropez ayant besoin d'un site haut de gamme pour attirer une clientèle aisée et gérer les réservations de services."
- `result` (fr): "Site moderne et responsive avec système de réservation et optimisation SEO — présence en ligne à la hauteur du positionnement premium."
- `clientContext` (es): "Servicio de conserjería de lujo en Saint-Tropez que necesitaba un sitio web de alto nivel para atraer clientes selectos y gestionar reservas."
- `result` (es): "Sitio moderno y responsive con sistema de reservas y optimización SEO — presencia online acorde al posicionamiento premium."
- `sector`: `"Conciergerie & Services"`

**Miss Boat** (`miss-boat`) — `status: "in-progress"`
- `clientContext` (en): "Boat rental company in Cavalaire-sur-Mer (French Riviera) offering license-free rentals for ages 16+, seeking an online showcase with pricing."
- `result` (en): "Vue.js site with Tailwind CSS, pricing page, and gallery — currently in progress, delivery expected soon."
- `clientContext` (fr): "Société de location de bateaux à Cavalaire-sur-Mer proposant des locations sans permis dès 16 ans, cherchant une vitrine en ligne avec tarification."
- `result` (fr): "Site Vue.js avec Tailwind CSS, page tarifs et galerie — en cours de finalisation, livraison prévue prochainement."
- `clientContext` (es): "Empresa de alquiler de barcos en Cavalaire-sur-Mer con alquileres sin licencia desde 16 años, buscando un escaparate online con precios."
- `result` (es): "Sitio Vue.js con Tailwind CSS, página de precios y galería — actualmente en progreso, entrega prevista próximamente."
- `sector`: `"Location nautique"`

**Le Nain Vert** (`le-nain-vert`) — NOUVEAU, `status: "in-progress"`
- `title` (en/fr/es): "Le Nain Vert"
- `description` (en): "Psychedelic streetwear e-commerce platform with real-time inventory, secure payment gateway, and role-based admin dashboard."
- `description` (fr): "Plateforme e-commerce streetwear psychédélique avec inventaire temps réel, paiement sécurisé et tableau de bord admin par rôles."
- `description` (es): "Plataforma de e-commerce streetwear psicodélico con inventario en tiempo real, pasarela de pago segura y panel de administración por roles."
- `clientContext` (en): "Streetwear brand with a bold identity seeking a full e-commerce platform with inventory management and admin control."
- `result` (en): "Full-stack Vue.js + Firebase platform with real-time inventory, secure Stripe payment, and role-based admin dashboard — currently in progress."
- `clientContext` (fr): "Marque streetwear à identité forte cherchant une plateforme e-commerce complète avec gestion des stocks et panneau d'administration."
- `result` (fr): "Plateforme full-stack Vue.js + Firebase avec inventaire temps réel, paiement Stripe sécurisé et tableau de bord admin par rôles — en cours de développement."
- `clientContext` (es): "Marca de streetwear con identidad audaz que busca una plataforma de e-commerce completa con gestión de inventario y panel de control."
- `result` (es): "Plataforma full-stack Vue.js + Firebase con inventario en tiempo real, pago seguro con Stripe y panel de administración por roles — en desarrollo."
- `sector`: `"E-commerce / Mode"`
- `technologies`: `["Vue.js", "Firebase", "Tailwind CSS", "Stripe"]`
- `github`: omit or leave null (private project)
- `live`: omit or leave null (not yet deployed)

### Règles i18n obligatoires

```
✅ projects.items.les-planches.clientContext   ← CORRECT
✅ projects.items.les-planches.result          ← CORRECT
❌ lesPlanchesClientContext                    ← INTERDIT (flat key)
❌ projects.lesPlanchesContext                 ← INTERDIT
```

Hiérarchie dans le JSON i18n :
```json
"projects": {
  "items": {
    "les-planches": {
      "title": "...",          ← existant
      "description": "...",   ← existant
      "clientContext": "...", ← NOUVEAU
      "result": "..."         ← NOUVEAU
    }
  }
}
```

### Projets à NE PAS modifier

| Projet | Raison |
|--------|--------|
| `re-fresh-earth` | Ni client ni 42 — NASA hackathon, reste en `"websites"` |
| `get-next-line`, `ft-printf`, `libft`, `personal-libft`, `push-swap`, `so-long`, `philosophers`, `minishell` | Category `"42"` — inchangée |
| `series-tracker`, `enchere`, `random-rgb`, `form-with-regex`, `random-password` | Category `"applications"` — inchangée |
| `portfolio-v034` | Portfolio perso — reste en `"websites"` |

### Champ `video` — scope de cette story

Le champ `video` est introduit dans le schéma pour les projets 42, mais **aucun fichier vidéo n'existe encore** (créés en Story 4.2). Pour cette story, ne PAS ajouter le champ `video` aux projets 42 — le laisser absent est valide (champ optionnel). Le pattern attendu quand utilisé : `"video": "assets/videos/push-swap/demo.mp4"`.

### Project Structure Notes

- `src/data/projects.json` — source de données unique, jamais dupliquée dans un composant
- `src/locales/{en,fr,es}.json` — i18n via vue-i18n, accès via `$t()` dans les templates
- Pages : `src/pages/` (PAS `src/views/` malgré ce qu'indique l'architecture — le codebase réel utilise `src/pages/`)
- Composants : `src/components/`

### Validation JSON

Après modification, valider le JSON :
```bash
node -e "JSON.parse(require('fs').readFileSync('./src/data/projects.json','utf8')); console.log('JSON valid')"
```

Et lancer le dev server pour confirmer aucune erreur de console :
```bash
npm run dev
```

### References

- Epics Story 1.1 AC — `_bmad-output/planning-artifacts/epics.md` (lignes 158–187)
- Architecture — Data Architecture section — `_bmad-output/planning-artifacts/architecture.md`
- Architecture — Naming Patterns section (camelCase pour champs JSON, hiérarchie i18n)
- Architecture — Enforcement rules (i18n 3 locales obligatoire)
- Codebase existant — `src/data/projects.json` (schéma actuel, 19 projets)
- Codebase existant — `src/locales/en.json` (pattern `projects.items.{id}.title`)
- Codebase existant — `src/pages/Projects.vue` (filtres actuels par `category === 'websites'`)

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

_Aucune erreur de débogage — implémentation directe, tous les JSON valides._

### Completion Notes List

- ✅ `src/data/projects.json` : 5 projets clients existants migrés (category → "client", + sector, status, featured)
- ✅ `src/data/projects.json` : 1 nouveau projet ajouté (`le-nain-vert`, category: "client", status: "in-progress")
- ✅ `src/locales/en.json` : 6 entrées enrichies avec `clientContext` + `result` (pattern `projects.items.{id}`)
- ✅ `src/locales/fr.json` : idem en français
- ✅ `src/locales/es.json` : idem en espagnol
- ✅ Non-régression : 8 projets "42", 5 "applications", 2 "websites" (re-fresh-earth, portfolio-v034) inchangés
- ✅ Validation JSON : tous les fichiers parsés sans erreur par Node.js
- ℹ️ `Projects.vue` affiche désormais 0 projet dans la section "Websites" pour les projets clients — attendu, sera corrigé en Story 1.3

### File List

- `src/data/projects.json` (modifié — migration schéma + ajout le-nain-vert)
- `src/locales/en.json` (modifié — ajout clientContext + result pour 6 projets clients)
- `src/locales/fr.json` (modifié — ajout clientContext + result pour 6 projets clients)
- `src/locales/es.json` (modifié — ajout clientContext + result pour 6 projets clients)
