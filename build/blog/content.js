// Chargement, validation et rendu Markdown des articles du blog.
// Toute erreur de format fait échouer le build avec un message explicite.

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import { LANGS, TYPES, RESERVED_SLUGS, SITE } from './config.js'

const FILE_RE = /^(\d{4}-\d{2}-\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/
const FIELDS = ['title', 'date', 'type', 'summary', 'tags', 'sources', 'indexable', 'lang']
const SUMMARY_MAX = 160

export class BlogContentError extends Error {
  constructor(errors) {
    super(
      `Blog : ${errors.length} erreur(s) dans content/blog/ :\n` +
      errors.map((e) => `  ✗ ${e}`).join('\n') +
      '\nVoir content/blog/README.md pour le format attendu.'
    )
    this.name = 'BlogContentError'
  }
}

// Le HTML brut est désactivé : le contenu est généré automatiquement à partir
// de sources externes, on ne lui fait pas confiance.
const md = new MarkdownIt({ html: false, linkify: true, typographer: true })

const defaultLinkOpen = md.renderer.rules.link_open ||
  ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const href = tokens[idx].attrGet('href') || ''
  if (isExternal(href)) tokens[idx].attrSet('rel', 'noopener noreferrer external')
  return defaultLinkOpen(tokens, idx, options, env, self)
}

export function isExternal(href) {
  return /^https?:\/\//i.test(href) && !href.startsWith(SITE.url)
}

export function slugify(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v) && !(v instanceof Date)
}

function nonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0
}

// js-yaml transforme une date non quotée en objet Date (UTC) : on accepte
// les deux écritures et on normalise en AAAA-MM-JJ.
function normalizeDate(v) {
  if (v instanceof Date && !Number.isNaN(v.getTime())) return v.toISOString().slice(0, 10)
  if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)) {
    const d = new Date(`${v}T00:00:00Z`)
    if (!Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v) return v
  }
  return null
}

function validUrl(v) {
  if (typeof v !== 'string') return false
  try {
    const u = new URL(v)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

export function validatePost(file, lang, raw) {
  const errors = []
  const fail = (msg) => errors.push(`${file} : ${msg}`)
  const name = path.basename(file)
  const m = FILE_RE.exec(name)
  if (!m) {
    fail('nom de fichier invalide, attendu AAAA-MM-JJ-slug.md (slug en minuscules, chiffres et tirets)')
    return { errors }
  }
  const [, fileDate, slug] = m
  if (!normalizeDate(fileDate)) fail(`date du nom de fichier invalide (${fileDate})`)
  if (RESERVED_SLUGS.includes(slug)) fail(`slug réservé « ${slug} » (interdits : ${RESERVED_SLUGS.join(', ')})`)

  let parsed
  try {
    parsed = matter(raw)
  } catch (e) {
    fail(`frontmatter YAML illisible : ${e.message}`)
    return { errors }
  }
  const data = parsed.data || {}
  if (!raw.startsWith('---')) fail('le fichier doit commencer par un bloc frontmatter délimité par ---')

  for (const key of Object.keys(data)) {
    if (!FIELDS.includes(key)) fail(`champ inconnu « ${key} » (champs autorisés : ${FIELDS.join(', ')})`)
  }
  for (const key of FIELDS) {
    if (!(key in data)) fail(`champ obligatoire manquant « ${key} »`)
  }

  if ('title' in data && !nonEmptyString(data.title)) fail('« title » doit être une chaîne non vide')

  let date = null
  if ('date' in data) {
    date = normalizeDate(data.date)
    if (!date) fail(`« date » doit être une date valide au format AAAA-MM-JJ (reçu : ${JSON.stringify(data.date)})`)
    else if (date !== fileDate) fail(`« date » (${date}) ne correspond pas à la date du nom de fichier (${fileDate})`)
  }

  if ('type' in data && !TYPES.includes(data.type)) {
    fail(`« type » doit valoir ${TYPES.map((t) => `"${t}"`).join(' ou ')} (reçu : ${JSON.stringify(data.type)})`)
  }

  if ('summary' in data) {
    if (!nonEmptyString(data.summary)) fail('« summary » doit être une chaîne non vide')
    else if ([...data.summary.trim()].length > SUMMARY_MAX) {
      fail(`« summary » dépasse ${SUMMARY_MAX} caractères (${[...data.summary.trim()].length})`)
    }
  }

  const tags = []
  if ('tags' in data) {
    if (!Array.isArray(data.tags)) fail('« tags » doit être une liste de chaînes')
    else {
      const seen = new Set()
      data.tags.forEach((t, i) => {
        if (!nonEmptyString(t)) return fail(`« tags[${i}] » doit être une chaîne non vide`)
        const s = slugify(t)
        if (!s) return fail(`« tags[${i}] » (« ${t} ») ne contient aucun caractère alphanumérique`)
        if (seen.has(s)) return fail(`tag en double « ${t} »`)
        seen.add(s)
        tags.push({ label: t.trim(), slug: s })
      })
    }
  }

  const sources = []
  if ('sources' in data) {
    if (!Array.isArray(data.sources) || data.sources.length === 0) {
      fail('« sources » doit être une liste non vide de { title, url }')
    } else {
      data.sources.forEach((s, i) => {
        if (!isPlainObject(s)) return fail(`« sources[${i}] » doit être un objet { title, url }`)
        for (const k of Object.keys(s)) {
          if (k !== 'title' && k !== 'url') fail(`« sources[${i}] » : champ inconnu « ${k} »`)
        }
        if (!nonEmptyString(s.title)) fail(`« sources[${i}].title » doit être une chaîne non vide`)
        if (!validUrl(s.url)) fail(`« sources[${i}].url » doit être une URL http(s) absolue (reçu : ${JSON.stringify(s.url)})`)
        sources.push({ title: String(s.title || '').trim(), url: s.url })
      })
    }
  }

  if ('indexable' in data && typeof data.indexable !== 'boolean') {
    fail(`« indexable » doit valoir true ou false (reçu : ${JSON.stringify(data.indexable)})`)
  }

  if ('lang' in data && data.lang !== lang) {
    fail(`« lang » (${JSON.stringify(data.lang)}) doit correspondre au dossier content/blog/${lang}/`)
  }

  const body = parsed.content.trim()
  let html = ''
  if (!body) fail('le contenu de l’article est vide')
  else {
    const tokens = md.parse(body, {})
    for (const t of tokens) {
      if (t.type === 'heading_open' && t.tag === 'h1') {
        fail(`titre de niveau 1 interdit dans le contenu (ligne ${t.map ? t.map[0] + 1 : '?'}) : le titre de la page vient de « title », commencer à ##`)
      }
      if (t.type === 'inline' && t.children) {
        for (const c of t.children) {
          if (c.type === 'image' && !c.content.trim()) {
            fail(`image sans texte alternatif (ligne ${t.map ? t.map[0] + 1 : '?'}) : utiliser ![description](url)`)
          }
        }
      }
    }
    html = md.renderer.render(tokens, md.options, {})
  }

  if (errors.length) return { errors }
  return {
    errors,
    post: {
      file: name,
      lang,
      slug,
      title: data.title.trim(),
      date,
      type: data.type,
      summary: data.summary.trim(),
      tags,
      sources,
      indexable: data.indexable,
      html
    }
  }
}

// Retourne { fr: Post[], en: Post[] }, triés du plus récent au plus ancien.
export function loadPosts(contentDir) {
  const errors = []
  const posts = Object.fromEntries(LANGS.map((l) => [l, []]))

  if (fs.existsSync(contentDir)) {
    for (const entry of fs.readdirSync(contentDir, { withFileTypes: true })) {
      if (entry.isDirectory() && !LANGS.includes(entry.name)) {
        errors.push(`content/blog/${entry.name}/ : dossier inattendu (seuls ${LANGS.join('/, ')}/ sont autorisés)`)
      } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'README.md') {
        errors.push(`content/blog/${entry.name} : les articles doivent être placés dans content/blog/fr/ ou content/blog/en/`)
      }
    }
  }

  for (const lang of LANGS) {
    const dir = path.join(contentDir, lang)
    if (!fs.existsSync(dir)) continue
    const bySlug = new Map()
    for (const name of fs.readdirSync(dir).sort()) {
      const full = path.join(dir, name)
      if (!fs.statSync(full).isFile()) {
        errors.push(`content/blog/${lang}/${name} : sous-dossier non autorisé`)
        continue
      }
      if (!name.endsWith('.md')) {
        errors.push(`content/blog/${lang}/${name} : seuls les fichiers .md sont autorisés`)
        continue
      }
      const rel = `content/blog/${lang}/${name}`
      const res = validatePost(rel, lang, fs.readFileSync(full, 'utf8'))
      errors.push(...res.errors)
      if (!res.post) continue
      if (bySlug.has(res.post.slug)) {
        errors.push(`${rel} : slug « ${res.post.slug} » déjà utilisé par ${bySlug.get(res.post.slug)}`)
        continue
      }
      bySlug.set(res.post.slug, name)
      posts[lang].push(res.post)
    }
  }

  if (errors.length) throw new BlogContentError(errors)

  for (const lang of LANGS) {
    posts[lang].sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : b.date.localeCompare(a.date)))
  }
  return posts
}
