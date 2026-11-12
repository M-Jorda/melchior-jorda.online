// Configuration du publieur de digests. Les secrets vivent hors du dépôt,
// dans ~/.config/blog-digest/config.env (format KEY=valeur), surchargeable
// par les variables d'environnement.

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

export const CONFIG_FILE = process.env.BLOG_DIGEST_CONFIG ||
  path.join(os.homedir(), '.config', 'blog-digest', 'config.env')

export const STATE_DIR = process.env.BLOG_DIGEST_STATE_DIR ||
  path.join(os.homedir(), '.local', 'state', 'blog-digest')

function parseEnvFile(file) {
  if (!fs.existsSync(file)) return {}
  const out = {}
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/.exec(line)
    if (!m || line.trim().startsWith('#')) continue
    let value = m[2]
    if (/^(['"]).*\1$/.test(value)) value = value.slice(1, -1)
    out[m[1]] = value
  }
  return out
}

const bool = (v, d) => (v === undefined || v === '' ? d : /^(1|true|yes|oui)$/i.test(v))
const int = (v, d) => (v === undefined || v === '' ? d : Number.parseInt(v, 10))

export function loadConfig({ needImap = true, needDeploy = true } = {}) {
  const env = { ...parseEnvFile(CONFIG_FILE), ...process.env }
  const config = {
    imap: {
      host: env.IMAP_HOST || 'imap.gmail.com',
      port: int(env.IMAP_PORT, 993),
      user: env.IMAP_USER || '',
      password: env.IMAP_PASSWORD || '',
      // Vide = dossier « Tous les messages » de Gmail (détecté), sinon INBOX.
      mailbox: env.IMAP_MAILBOX || ''
    },
    digestFrom: env.DIGEST_FROM || '',
    timezone: env.TIMEZONE || 'Europe/Madrid',
    lookbackDays: int(env.LOOKBACK_DAYS, 14),
    weeklyMinDailies: int(env.WEEKLY_MIN_DAILIES, 3),
    claudeBin: env.CLAUDE_BIN || 'claude',
    claudeModel: env.CLAUDE_MODEL || '',
    claudeTimeoutMs: int(env.CLAUDE_TIMEOUT_SECONDS, 900) * 1000,
    firebaseBin: env.FIREBASE_BIN || 'firebase',
    firebaseProject: env.FIREBASE_PROJECT || 'melchior-75a9e',
    credentials: env.GOOGLE_APPLICATION_CREDENTIALS || '',
    deploy: bool(env.DEPLOY, true),
    gitCommit: bool(env.GIT_COMMIT, true),
    gitPush: bool(env.GIT_PUSH, true)
  }

  const missing = []
  if (needImap) {
    if (!config.imap.user) missing.push('IMAP_USER')
    if (!config.imap.password) missing.push('IMAP_PASSWORD')
  }
  if (needDeploy && config.deploy) {
    if (!config.credentials) missing.push('GOOGLE_APPLICATION_CREDENTIALS')
    else if (!fs.existsSync(config.credentials)) {
      throw new Error(`Clé de compte de service introuvable : ${config.credentials}`)
    }
  }
  if (missing.length) {
    throw new Error(`Configuration incomplète (${CONFIG_FILE}) : ${missing.join(', ')}`)
  }
  return config
}
