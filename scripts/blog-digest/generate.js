// Génération d'un article (toutes langues) avec `claude -p`, puis contrôle
// strict du résultat avant écriture : sources et liens limités aux URL
// autorisées, frontmatter écrit par le script, validation du blog.

import { spawn } from 'node:child_process'
import os from 'node:os'
import { validatePost } from '../../build/blog/content.js'
import { systemPrompt, outputSchema } from './prompts.js'

const MAX_ATTEMPTS = 2

function runClaude(config, { system, prompt, schema }) {
  const args = [
    '-p',
    '--output-format', 'json',
    '--tools', '',
    '--no-session-persistence',
    '--system-prompt', system,
    '--json-schema', JSON.stringify(schema)
  ]
  if (config.claudeModel) args.push('--model', config.claudeModel)

  return new Promise((resolve, reject) => {
    // Dossier neutre : aucun CLAUDE.md de projet n'est chargé.
    const child = spawn(config.claudeBin, args, { cwd: os.tmpdir(), stdio: ['pipe', 'pipe', 'pipe'] })
    let out = ''
    let err = ''
    const timer = setTimeout(() => {
      child.kill('SIGTERM')
      reject(new Error(`claude -p : délai dépassé (${config.claudeTimeoutMs / 1000} s)`))
    }, config.claudeTimeoutMs)
    child.stdout.on('data', (d) => { out += d })
    child.stderr.on('data', (d) => { err += d })
    child.on('error', (e) => { clearTimeout(timer); reject(new Error(`claude introuvable (${config.claudeBin}) : ${e.message}`)) })
    child.on('close', (code) => {
      clearTimeout(timer)
      let res
      try {
        res = JSON.parse(out)
      } catch {
        return reject(new Error(`claude -p a échoué (code ${code}) : ${(err || out).slice(0, 500)}`))
      }
      if (res.is_error || !res.structured_output) {
        return reject(new Error(`claude -p : réponse invalide (${res.subtype || 'sans sortie structurée'}) ${String(res.result || '').slice(0, 300)}`))
      }
      resolve({ data: res.structured_output, cost: res.total_cost_usd })
    })
    child.stdin.end(prompt)
  })
}

const normalizeUrl = (u) => String(u).trim().replace(/\/+$/, '')

// Remplace par leur seul texte les liens Markdown vers des URL non autorisées.
function sanitizeLinks(body, allowed, warn) {
  return body.replace(/(!?)\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (all, _bang, text, url) => {
    if (allowed.has(normalizeUrl(url))) return all
    warn(`lien retiré (URL non autorisée) : ${url}`)
    return text
  })
}

function yamlString(s) {
  return JSON.stringify(String(s))
}

export function buildMarkdown({ title, date, type, summary, tags, sources, indexable, lang, body }) {
  return [
    '---',
    `title: ${yamlString(title)}`,
    `date: ${date}`,
    `type: ${type}`,
    `summary: ${yamlString(summary)}`,
    `tags: [${tags.map(yamlString).join(', ')}]`,
    'sources:',
    ...sources.flatMap((s) => [`  - title: ${yamlString(s.title)}`, `    url: ${yamlString(s.url)}`]),
    `indexable: ${indexable ? 'true' : 'false'}`,
    `lang: ${lang}`,
    '---',
    '',
    body.trim(),
    ''
  ].join('\n')
}

// Retourne { files: [{ lang, fileName, markdown }], meta } ou lève une erreur.
// job : { kind: 'daily'|'weekly', date, slug|null, langs, prompt, sourceUrls, profile }
export async function generateArticle(config, job, log) {
  const allowedSources = new Map(job.sourceUrls.map((u) => [normalizeUrl(u), u]))
  const allowedLinks = new Set([...allowedSources.keys(), ...job.profile.links.map(normalizeUrl)])
  const system = systemPrompt({ kind: job.kind, langs: job.langs, profile: job.profile })
  const schema = outputSchema({ langs: job.langs, weekly: job.kind === 'weekly' })

  let feedback = ''
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const prompt = feedback
      ? `${job.prompt}\n\n# CORRECTIONS OBLIGATOIRES\nLa tentative précédente a été rejetée :\n${feedback}\nCorrige ces points.`
      : job.prompt
    log(`  génération ${job.kind} ${job.date} (tentative ${attempt}/${MAX_ATTEMPTS})…`)
    const { data, cost } = await runClaude(config, { system, prompt, schema })
    if (typeof cost === 'number') log(`  coût indicatif : ${cost.toFixed(2)} $`)

    const problems = []
    const warn = (m) => log(`  ⚠ ${m}`)

    // Sources : uniquement des URL issues du matériau source, dédoublonnées.
    const sources = []
    const seen = new Set()
    for (const s of data.sources) {
      const key = normalizeUrl(s.url)
      if (!allowedSources.has(key)) { warn(`source écartée (URL inconnue) : ${s.url}`); continue }
      if (seen.has(key)) continue
      seen.add(key)
      sources.push({ title: s.title.trim() || allowedSources.get(key), url: allowedSources.get(key) })
    }
    if (!sources.length) problems.push('aucune source valide : `sources` doit reprendre des URL de la liste autorisée')

    let slug = job.slug
    if (job.kind === 'weekly') {
      const kw = String(data.slugKeywords || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
        .split('-').filter(Boolean).slice(0, 6).join('-')
      slug = `${kw ? `${kw}-` : ''}${job.slugSuffix}`
    }
    const fileName = `${job.date}-${slug}.md`

    const files = []
    for (const lang of job.langs) {
      const a = data.articles[lang]
      const body = sanitizeLinks(a.body, allowedLinks, warn)
      const markdown = buildMarkdown({
        title: a.title.trim(),
        date: job.date,
        type: job.kind,
        summary: a.summary.trim(),
        tags: a.tags.map((t) => t.trim()).filter(Boolean),
        sources,
        indexable: job.kind === 'weekly',
        lang,
        body
      })
      const res = validatePost(`content/blog/${lang}/${fileName}`, lang, markdown)
      if (res.errors.length) problems.push(...res.errors.map((e) => `[${lang}] ${e}`))
      files.push({ lang, fileName, markdown, title: a.title.trim(), body })
    }

    if (!problems.length) return { files, theme: data.theme, slug }
    feedback = problems.map((p) => `- ${p}`).join('\n')
    log(`  ✗ tentative ${attempt} rejetée :\n${feedback.replace(/^/gm, '    ')}`)
  }
  throw new Error(`article ${job.kind} du ${job.date} rejeté après ${MAX_ATTEMPTS} tentatives`)
}
