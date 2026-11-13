# Articles du blog — format de référence

Ce dossier contient les articles du blog de melchior-jorda.online. Chaque
fichier Markdown déposé ici est publié au prochain build. Il n'y a ni base de
données ni CMS : **ajouter le fichier puis pousser sur `main` suffit**, et la CI
construit et déploie le site.

Le build **valide chaque fichier**. Une seule erreur fait échouer tout le build
et empêche le déploiement. Le message indique le fichier et la règle en cause.
Respectez donc strictement ce document.

> Ce fichier `README.md` est ignoré par le générateur. Ne placez aucun autre
> fichier à la racine de `content/blog/`.

> **Publication automatique.** Les articles sont produits par le publieur Dev
> Digest (`scripts/blog-digest/`, voir son README) à partir des e-mails
> « Dev Digest ». Ses conventions :
> - un quotidien par jour, `AAAA-MM-JJ-dev-digest-AAAA-MM-JJ.md`, `type: daily`,
>   `indexable: false` ;
> - un hebdomadaire par semaine ISO, daté du dimanche,
>   `AAAA-MM-JJ-<mots-cles>-week-<n>-<annee>.md`, `type: weekly`, `indexable: true`.
>
> Un fichier ajouté à la main en respectant ce format est publié de la même façon.

---

## 1. Structure des dossiers

```
content/blog/
├── README.md
├── fr/
│   └── AAAA-MM-JJ-slug.md      ← article en français
└── en/
    └── AAAA-MM-JJ-slug.md      ← article en anglais
```

- Les articles français vont dans `content/blog/fr/` et les articles anglais
  dans `content/blog/en/`.
- Aucun autre dossier ni sous-dossier n'est autorisé, et ces dossiers ne
  contiennent que des fichiers `.md` (pas de `.gitkeep` ni d'autre fichier).
- Tant qu'aucun article n'est publié, les dossiers `fr/` et `en/` n'existent
  pas dans le dépôt, car git ne suit pas les dossiers vides. Créez-les au
  besoin au premier dépôt d'article. Le build accepte qu'ils soient absents.

### Traductions : même nom de fichier

**Deux fichiers portant exactement le même nom dans `fr/` et `en/` sont les
traductions l'un de l'autre.** C'est la seule façon de lier deux versions :

```
content/blog/fr/2026-11-09-weekly-technical-seo.md
content/blog/en/2026-11-09-weekly-technical-seo.md   ← traduction du précédent
```

Le slug, et donc l'URL, est le même dans les deux langues :
`/blog/fr/weekly-technical-seo` et `/blog/en/weekly-technical-seo`. Choisissez
un slug neutre, en anglais de préférence, qui convient aux deux versions.

La traduction est facultative. Un article peut n'exister que dans une langue.
Dans ce cas, il n'a pas de balises hreflang et le lien « FR / EN » mène à la
liste des articles de l'autre langue.

---

## 2. Nom de fichier

```
AAAA-MM-JJ-slug.md
```

| Partie       | Règle                                                                    |
|--------------|--------------------------------------------------------------------------|
| `AAAA-MM-JJ` | Date de publication, valide dans le calendrier. Identique au champ `date`. |
| `slug`       | Minuscules `a-z`, chiffres `0-9` et tirets simples. Pas d'accent, pas d'espace, pas de tiret au début ni à la fin. |
| extension    | `.md`                                                                    |

Expression régulière exacte : `^\d{4}-\d{2}-\d{2}-[a-z0-9]+(-[a-z0-9]+)*\.md$`

**Contraintes supplémentaires :**

- Le slug doit être **unique dans une langue**, même avec des dates
  différentes. `2026-11-10-ai-news.md` et `2026-11-11-ai-news.md` dans le même
  dossier provoquent une erreur. Pour un article quotidien, incluez donc la
  date ou un sujet précis dans le slug, par exemple `ai-news-2026-11-10`.
- Slugs réservés et interdits : `page`, `tags`, `rss`, `rss.xml`, `daily`,
  `weekly`.

Exemples valides : `2026-11-10-daily-ai-news-2026-11-10.md`,
`2026-11-09-weekly-technical-seo.md`.

---

## 3. Frontmatter

Le fichier **commence** par un bloc YAML délimité par `---`. Les **8 champs
sont tous obligatoires** et **aucun autre champ n'est accepté**.

```yaml
---
title: "Titre de l'article"
date: 2026-11-10
type: daily
summary: "Résumé de 160 caractères maximum, utilisé comme meta description."
tags: ["IA", "Vue.js"]
sources:
  - title: "Titre de la source"
    url: "https://exemple.com/article"
indexable: true
lang: fr
---
```

| Champ       | Type                         | Règles |
|-------------|------------------------------|--------|
| `title`     | chaîne                       | Non vide. Sert de `<h1>`, de `<title>` et de titre Open Graph. |
| `date`      | `AAAA-MM-JJ`                 | Date valide, **égale à la date du nom de fichier**. Les guillemets sont facultatifs. Tout fichier présent est publié, même si sa date est dans le futur. |
| `type`      | `"daily"` ou `"weekly"`      | Exactement l'une de ces deux valeurs, en minuscules. |
| `summary`   | chaîne                       | Non vide, **160 caractères maximum** (espaces compris). Sert de meta description, de description OG/Twitter, de résumé dans les listes et dans le RSS. |
| `tags`      | liste de chaînes             | Liste YAML, éventuellement vide `[]`. Chaque tag contient au moins une lettre ou un chiffre. Pas de doublon : `Vue.js` et `vue-js` comptent comme le même tag. |
| `sources`   | liste de `{ title, url }`    | **Au moins une source.** Chaque entrée a exactement deux champs : `title` (chaîne non vide) et `url` (URL absolue en `http://` ou `https://`). |
| `indexable` | booléen                      | `true` ou `false`, sans guillemets. `false` ajoute `noindex, follow` et retire l'article du sitemap et du flux RSS. |
| `lang`      | `"fr"` ou `"en"`             | **Doit correspondre au dossier** : `fr` dans `content/blog/fr/`, `en` dans `content/blog/en/`. |

### Tags

- Chaque tag a une page `/blog/<lang>/tags/<tag-slug>`. Le slug est calculé
  ainsi : minuscules, accents retirés, tout caractère non alphanumérique
  remplacé par `-`. Par exemple, `Déploiement` donne `deploiement` et `Vue.js`
  donne `vue-js`.
- Gardez une orthographe constante d'un article à l'autre pour regrouper les
  articles, puisque les articles liés sont calculés à partir des tags communs.
- Les tags sont propres à chaque langue. Utilisez le même libellé dans les deux
  langues quand il ne se traduit pas (`SEO`, `Vue.js`) pour que les pages de
  tags soient reliées entre elles.

### YAML : pièges courants

- Mettez entre guillemets toute chaîne contenant `:`, `#`, `'`, ou commençant
  par `[`, `{`, `*`, `&`, `!`, `%`, `@` ou `` ` ``. En pratique, **mettez
  toujours `title`, `summary` et les `url` entre guillemets doubles.**
- À l'intérieur de guillemets doubles, échappez `"` et `\` (`\"`, `\\`).
- `indexable: "true"` (avec guillemets) est **refusé** : il faut un booléen.

---

## 4. Contenu Markdown (après le frontmatter)

- Le contenu ne doit pas être vide.
- **Pas de titre de niveau 1 (`#`)** : le `<h1>` de la page vient de `title`.
  Commencez à `##` et respectez la hiérarchie (`##` puis `###`).
- **Le HTML brut est désactivé** : les balises HTML s'affichent comme du texte.
  N'utilisez que la syntaxe Markdown.
- **Blocs repliables** : le texte de la ligne d'ouverture reste visible, le
  contenu ne s'affiche que si le lecteur déplie le bloc. Le blog les rend en
  `<details>` natif, avec un bouton « Tout déplier » et une ancre tirée du
  sujet (le texte avant « : », ici `#rust-1-100`) :

  ```markdown
  ::: details **Rust 1.100** : le type `!` devient stable.
  Contenu détaillé en Markdown (paragraphes, listes, liens, encadré `>`).
  :::
  ```

  Un bloc doit avoir un titre et ne peut pas en contenir un autre (erreur de build).
- **Toute image doit avoir un texte alternatif** : `![description](url)`.
  `![](url)` provoque une erreur.
- Les URL nues sont transformées en liens. Les liens externes reçoivent
  automatiquement `rel="noopener noreferrer external"`.
- N'ajoutez **pas** de section « Sources » ni de mention IA dans le contenu :
  la page les génère à partir de `sources`, et la mention
  « Article rédigé par IA à partir des sources citées. » (en anglais :
  « Article written by AI from the cited sources. ») est ajoutée
  automatiquement sous chaque article.

---

## 5. Modèles complets à copier

Les valeurs ci-dessous sont des exemples : remplacez titres, résumés, tags et
sources par le contenu réel. Les URL `example.com` ne doivent jamais être
publiées.

### Article quotidien (`type: daily`)

`content/blog/fr/2026-11-10-veille-quotidienne-2026-11-10.md` :

```markdown
---
title: "Veille quotidienne — 10 novembre 2026"
date: 2026-11-10
type: daily
summary: "L'essentiel de l'actualité du développement web du jour, résumé en quelques points avec un lien vers chaque source."
tags: ["IA", "Développement web"]
sources:
  - title: "Titre de la première source"
    url: "https://example.com/premiere-source"
  - title: "Titre de la deuxième source"
    url: "https://example.org/deuxieme-source"
indexable: false
lang: fr
---

## Premier sujet

Deux ou trois paragraphes qui résument la source.

## Deuxième sujet

- Point clé
- Autre point clé
```

### Article hebdomadaire (`type: weekly`)

`content/blog/en/2026-11-09-weekly-recap-2026-w46.md` :

```markdown
---
title: "Weekly recap — week 46, 2026"
date: 2026-11-09
type: weekly
summary: "The week's most important web and software development news, grouped by theme, with links to every source."
tags: ["AI", "Web development", "Security"]
sources:
  - title: "First source title"
    url: "https://example.com/first-source"
  - title: "Second source title"
    url: "https://example.org/second-source"
  - title: "Third source title"
    url: "https://example.net/third-source"
indexable: true
lang: en
---

## Highlights of the week

A short introduction to the main trends of the week.

## First theme

### Topic A

One or two paragraphs summarising the source.

### Topic B

One or two paragraphs summarising the source.

## Second theme

- Key point
- Another key point
```

---

## 6. Publier et vérifier

```bash
npm run build          # valide tous les articles et génère dist/
npm run preview        # sert dist/ comme en production (http://localhost:4173/blog)
npm run dev            # dev : pages du blog servies à la volée, rechargement auto
```

Pour publier, faites un commit du fichier dans `content/blog/fr/` ou
`content/blog/en/` puis un push sur `main`. La CI GitHub Actions lance le lint,
puis le build, puis le déploiement sur Firebase Hosting.

### URL générées (pour chaque `<lang>` = `fr` | `en`)

| URL                                   | Indexation |
|---------------------------------------|------------|
| `/blog` → redirection 301 vers `/blog/en` | — |
| `/blog/<lang>`                        | index |
| `/blog/<lang>/page/<n>`               | noindex, follow |
| `/blog/<lang>/daily`, `/blog/<lang>/weekly` (+ `/page/<n>`) | noindex, follow |
| `/blog/<lang>/tags`, `/blog/<lang>/tags/<tag>` (+ `/page/<n>`) | noindex, follow |
| `/blog/<lang>/<slug>`                 | selon `indexable` |
| `/blog/<lang>/rss.xml`                | articles `indexable: true` uniquement |
| `/sitemap.xml`                        | pages indexables uniquement |

Toute autre URL sous `/blog/` renvoie une page 404 statique (statut HTTP 404,
noindex).
