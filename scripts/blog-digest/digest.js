// Analyse des e-mails « Dev Digest » : sujets, regroupement par jour,
// conversion HTML -> texte et extraction des liens sources.

import { convert } from 'html-to-text'

// « Dev Digest - 2026-11-12 » ou « Dev Digest - 2026-11-12 (1/2) ».
// Les variantes « TEST », « échec » et les anciens formats sont ignorées.
const SUBJECT_RE = /^\s*Dev Digest\s+-\s+(\d{4}-\d{2}-\d{2})(?:\s+\((\d+)\/(\d+)\))?\s*$/i

export function parseSubject(subject) {
  const m = SUBJECT_RE.exec(subject || '')
  if (!m) return null
  return { date: m[1], part: m[2] ? Number(m[2]) : 1, parts: m[3] ? Number(m[3]) : 1 }
}

// Gmail réécrit parfois les liens en https://www.google.com/url?q=<cible>&...
export function unwrapUrl(href) {
  try {
    const u = new URL(href)
    if (/(^|\.)google\.[a-z.]+$/.test(u.hostname) && u.pathname === '/url' && u.searchParams.get('q')) {
      return unwrapUrl(u.searchParams.get('q'))
    }
    // Paramètres de suivi sans valeur pour le lecteur.
    for (const key of [...u.searchParams.keys()]) {
      if (/^utm_/i.test(key)) u.searchParams.delete(key)
    }
    return u.toString()
  } catch {
    return null
  }
}

export function extractLinks(html) {
  const urls = new Set()
  const re = /<a\b[^>]*\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')/gi
  let m
  while ((m = re.exec(html))) {
    const raw = (m[1] ?? m[2]).replace(/&amp;/g, '&')
    const url = unwrapUrl(raw)
    if (url && /^https?:\/\//.test(url)) urls.add(url)
  }
  return [...urls]
}

export function htmlToText(html) {
  // Les titres deviennent des paragraphes préfixés par des # pour garder la
  // structure du digest dans le texte transmis au modèle.
  const withHeadings = html
    .replace(/<h([1-6])\b[^>]*>/gi, (_, n) => `<p>${'#'.repeat(Number(n))} `)
    .replace(/<\/h[1-6]\s*>/gi, '</p>')
  return convert(withHeadings, {
    wordwrap: false,
    selectors: [
      { selector: 'a', options: { hideLinkHrefIfSameAsText: true, linkBrackets: ['[', ']'] } },
      { selector: 'img', format: 'skip' }
    ]
  }).replace(/\[(https?:\/\/[^\]\s]+)\]/g, (_, href) => `[${unwrapUrl(href) || href}]`)
}

// Regroupe les e-mails valides par date de digest (celle du sujet).
// messages : [{ subject, receivedAt: Date, html, text, messageId }]
export function groupByDate(messages) {
  const byDate = new Map()
  for (const msg of messages) {
    const info = parseSubject(msg.subject)
    if (!info) continue
    const html = msg.html || ''
    const text = html ? htmlToText(html) : (msg.text || '')
    if (!text.trim()) continue
    const list = byDate.get(info.date) || []
    list.push({ ...msg, ...info, content: text, links: html ? extractLinks(html) : [] })
    byDate.set(info.date, list)
  }
  for (const list of byDate.values()) {
    list.sort((a, b) => a.receivedAt - b.receivedAt || a.part - b.part)
  }
  return new Map([...byDate.entries()].sort(([a], [b]) => a.localeCompare(b)))
}

// ---------- Dates ----------

export function todayIn(timezone, now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit' })
    .format(now)
}

export function addDays(iso, days) {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

// Lundi et dimanche de la semaine ISO contenant `iso`.
export function isoWeek(iso) {
  const d = new Date(`${iso}T00:00:00Z`)
  const dow = (d.getUTCDay() + 6) % 7 // 0 = lundi
  const monday = addDays(iso, -dow)
  const sunday = addDays(monday, 6)
  // Numéro de semaine ISO : celle qui contient le jeudi.
  const thursday = new Date(`${addDays(monday, 3)}T00:00:00Z`)
  const jan1 = new Date(Date.UTC(thursday.getUTCFullYear(), 0, 1))
  const week = Math.ceil(((thursday - jan1) / 86400000 + 1) / 7)
  return { monday, sunday, week, year: thursday.getUTCFullYear() }
}
