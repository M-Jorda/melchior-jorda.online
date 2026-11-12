#!/usr/bin/env node
// Publieur automatique : transforme les e-mails « Dev Digest » en articles
// du blog (FR/EN), puis construit et déploie le site.
//
// Conçu pour un PC qui n'est pas toujours allumé : chaque exécution rattrape
// tout ce qui manque sur la période LOOKBACK_DAYS, sans rien publier deux fois.
//
// Usage : node scripts/blog-digest/run.js [--dry-run] [--no-deploy]
//         [--only daily|weekly] [--lookback N] [--eml fichier.eml ...]

import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { simpleParser } from 'mailparser'
import { LANGS } from '../../build/blog/config.js'
import { loadConfig, STATE_DIR } from './config.js'
import { fetchDigests } from './mail.js'
import { groupByDate, todayIn, addDays, isoWeek } from './digest.js'
import { loadProfile, dailyPrompt, weeklyPrompt } from './prompts.js'
import { generateArticle } from './generate.js'

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const PENDING = path.join(STATE_DIR, 'deploy-pending')
const PUBLISH_BRANCH = 'main'

const log = (msg) => console.log(`[${new Date().toISOString()}] ${msg}`)

function parseArgs(argv) {
  const opts = { dryRun: false, noDeploy: false, only: null, lookback: null, eml: [] }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--dry-run') opts.dryRun = true
    else if (a === '--no-deploy') opts.noDeploy = true
    else if (a === '--only') opts.only = argv[++i]
    else if (a === '--lookback') opts.lookback = Number(argv[++i])
    else if (a === '--eml') { while (argv[i + 1] && !argv[i + 1].startsWith('--')) opts.eml.push(argv[++i]) }
    else throw new Error(`option inconnue : ${a}`)
  }
  if (opts.only && !['daily', 'weekly'].includes(opts.only)) throw new Error('--only attend daily ou weekly')
  return opts
}

function run(cmd, args, { env, allowFail = false } = {}) {
  log(`$ ${cmd} ${args.join(' ')}`)
  const res = spawnSync(cmd, args, { cwd: REPO, env: { ...process.env, ...env }, stdio: 'inherit' })
  if (res.status !== 0 && !allowFail) throw new Error(`${cmd} ${args[0] || ''} a échoué (code ${res.status ?? res.error?.message})`)
  return res.status === 0
}

function git(args) {
  return spawnSync('git', args, { cwd: REPO, encoding: 'utf8' }).stdout.trim()
}

// Articles existants (dépôt + éventuel dossier de dry-run), dans une langue.
function readPosts(dirs, lang) {
  const posts = []
  for (const dir of dirs) {
    const d = path.join(dir, lang)
    if (!fs.existsSync(d)) continue
    for (const name of fs.readdirSync(d)) {
      if (!name.endsWith('.md')) continue
      const { data, content } = matter(fs.readFileSync(path.join(d, name), 'utf8'))
      const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date)
      posts.push({ name, date, type: data.type, title: data.title, sources: data.sources || [], body: content })
    }
  }
  return posts
}

async function loadMessages(config, opts, since) {
  if (opts.eml.length) {
    log(`Mode test : ${opts.eml.length} fichier(s) .eml local(aux)`)
    return Promise.all(opts.eml.map(async (file) => {
      const p = await simpleParser(fs.readFileSync(file))
      return { messageId: p.messageId || file, subject: p.subject || '', receivedAt: p.date || new Date(0), html: p.html || '', text: p.text || '' }
    }))
  }
  return fetchDigests(config, since, log)
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))
  const config = loadConfig({ needImap: !opts.eml.length, needDeploy: !opts.dryRun && !opts.noDeploy })
  fs.mkdirSync(STATE_DIR, { recursive: true })

  const repoContent = path.join(REPO, 'content', 'blog')
  const outContent = opts.dryRun ? path.join(STATE_DIR, 'dry-run', 'content', 'blog') : repoContent
  const lookback = Number.isFinite(opts.lookback) ? opts.lookback : config.lookbackDays
  const today = todayIn(config.timezone)
  const since = addDays(today, -lookback)
  const profile = loadProfile(REPO)
  const langs = [...LANGS]
  const refLang = langs.includes('fr') ? 'fr' : langs[0]

  if (!opts.dryRun) {
    const branch = git(['rev-parse', '--abbrev-ref', 'HEAD'])
    if (branch !== PUBLISH_BRANCH) {
      throw new Error(`le dépôt ${REPO} est sur « ${branch} » : la publication n'est autorisée que depuis « ${PUBLISH_BRANCH} » (utiliser --dry-run pour tester)`)
    }
  }

  log(`Publieur Dev Digest — aujourd'hui ${today} (${config.timezone}), rattrapage depuis le ${since}${opts.dryRun ? ', DRY-RUN' : ''}`)
  const written = []
  let failures = 0

  const writeFiles = (files) => {
    for (const f of files) {
      const dir = path.join(outContent, f.lang)
      fs.mkdirSync(dir, { recursive: true })
      const full = path.join(dir, f.fileName)
      fs.writeFileSync(full, f.markdown)
      written.push(full)
      log(`  ✓ écrit ${path.relative(REPO, full)}`)
    }
  }

  // ---------- Articles quotidiens ----------
  if (opts.only !== 'weekly') {
    const messages = await loadMessages(config, opts, since)
    const groups = groupByDate(messages)
    for (const [date, digests] of groups) {
      if (date < since) continue
      if (date >= today) { log(`${date} : journée en cours, article quotidien reporté`); continue }
      const fileName = `${date}-dev-digest-${date}.md`
      if (fs.existsSync(path.join(repoContent, refLang, fileName)) ||
          fs.existsSync(path.join(outContent, refLang, fileName))) continue
      const allowedUrls = [...new Set(digests.flatMap((d) => d.links))]
      log(`${date} : ${digests.length} digest(s), ${allowedUrls.length} lien(s)`)
      try {
        const res = await generateArticle(config, {
          kind: 'daily', date, slug: `dev-digest-${date}`, langs, profile,
          prompt: dailyPrompt({ date, digests, allowedUrls }), sourceUrls: allowedUrls
        }, log)
        log(`  thème : ${res.theme}`)
        writeFiles(res.files)
      } catch (e) {
        failures++
        log(`  ✗ ${date} : ${e.message}`)
      }
    }
  }

  // ---------- Récapitulatifs hebdomadaires ----------
  if (opts.only !== 'daily') {
    const dirs = opts.dryRun ? [repoContent, outContent] : [repoContent]
    const refPosts = readPosts(dirs, refLang)
    let week = isoWeek(since)
    while (week.sunday < today) {
      const { monday, sunday } = week
      const exists = refPosts.some((p) => p.type === 'weekly' && p.date === sunday)
      if (sunday >= since && !exists) {
        const dailies = refPosts
          .filter((p) => p.type === 'daily' && p.date >= monday && p.date <= sunday)
          .sort((a, b) => a.date.localeCompare(b.date))
        if (dailies.length < config.weeklyMinDailies) {
          log(`semaine ${week.week}/${week.year} : ${dailies.length} article(s) quotidien(s), minimum ${config.weeklyMinDailies} — pas de récapitulatif`)
        } else {
          const allowedUrls = [...new Set(dailies.flatMap((p) => p.sources.map((s) => s.url)))]
          log(`semaine ${week.week}/${week.year} : ${dailies.length} article(s) quotidien(s)`)
          try {
            const res = await generateArticle(config, {
              kind: 'weekly', date: sunday, slugSuffix: `week-${week.week}-${week.year}`, langs, profile,
              prompt: weeklyPrompt({ ...week, dailies, allowedUrls }), sourceUrls: allowedUrls
            }, log)
            log(`  thème : ${res.theme}`)
            writeFiles(res.files)
          } catch (e) {
            failures++
            log(`  ✗ semaine ${week.week}/${week.year} : ${e.message}`)
          }
        }
      }
      week = isoWeek(addDays(sunday, 1))
    }
  }

  if (opts.dryRun) {
    log(`DRY-RUN terminé : ${written.length} fichier(s) dans ${outContent}`)
    return failures ? 1 : 0
  }

  // ---------- Build, déploiement, git ----------
  const pending = fs.existsSync(PENDING)
  if (!written.length && !pending) {
    log('Rien de nouveau à publier.')
    pushIfAhead(config)
    return failures ? 1 : 0
  }
  if (written.length) fs.writeFileSync(PENDING, new Date().toISOString())

  try {
    run('npm', ['run', 'build'])
  } catch (e) {
    // Ne jamais laisser un dépôt qui ne construit plus : on retire les nouveaux fichiers.
    for (const f of written) fs.rmSync(f, { force: true })
    log('✗ build en échec : nouveaux articles retirés')
    throw e
  }

  if (config.gitCommit && written.length) {
    run('git', ['add', '--', ...written])
    const dates = [...new Set(written.map((f) => path.basename(f).slice(0, 10)))].sort()
    run('git', ['commit', '-m', `content(blog): articles du ${dates.join(', ')}`])
  }

  if (config.deploy && !opts.noDeploy) {
    // Un compte ouvert par `firebase login` passe avant GOOGLE_APPLICATION_CREDENTIALS :
    // un dossier de configuration vide force la CLI à utiliser le compte de service.
    const firebaseConfigHome = path.join(STATE_DIR, 'firebase-config')
    fs.mkdirSync(firebaseConfigHome, { recursive: true })
    run(config.firebaseBin, ['deploy', '--only', 'hosting', '--project', config.firebaseProject, '--non-interactive'],
      { env: { GOOGLE_APPLICATION_CREDENTIALS: config.credentials, XDG_CONFIG_HOME: firebaseConfigHome } })
    fs.rmSync(PENDING, { force: true })
    log('✓ déployé')
  } else {
    log('Déploiement désactivé : marqueur « déploiement en attente » conservé.')
  }

  pushIfAhead(config)
  return failures ? 1 : 0
}

// Le push est utile mais pas critique (clé SSH indisponible, réseau…) : il est
// retenté à chaque passage tant que des commits locaux ne sont pas poussés.
function pushIfAhead(config) {
  if (!config.gitCommit || !config.gitPush) return
  const ahead = Number(git(['rev-list', '--count', `origin/${PUBLISH_BRANCH}..HEAD`]) || 0)
  if (!ahead) return
  if (!run('git', ['push', 'origin', PUBLISH_BRANCH], { allowFail: true })) {
    log(`⚠ git push en échec : ${ahead} commit(s) restent locaux, nouvel essai au prochain passage`)
  }
}

main()
  .then((code) => process.exit(code))
  .catch((e) => {
    log(`✗ ${e.message}`)
    process.exit(1)
  })
