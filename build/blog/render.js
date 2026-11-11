// Gabarits HTML statiques du blog. Aucun framework côté client : seul un
// petit script inline gère le thème clair/sombre (partagé avec la SPA via
// localStorage.theme).

import { SITE, UI, LANGS, DEFAULT_LANG } from './config.js'

export function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export const abs = (p) => `${SITE.url}${p}`

export function formatDate(iso, lang) {
  return new Intl.DateTimeFormat(UI[lang].dateLocale, { dateStyle: 'long', timeZone: 'UTC' })
    .format(new Date(`${iso}T00:00:00Z`))
}

const otherLang = (lang) => LANGS.find((l) => l !== lang)

// Classes partagées
const LINK = 'underline decoration-orange-500 dark:decoration-orange-400 decoration-2 underline-offset-4 hover:text-orange-900 dark:hover:text-orange-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-sm'
const FOCUS = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
const NAV_LINK = `px-3 py-2 rounded-md font-medium text-primary dark:text-accent-50 hover:bg-orange-500/10 dark:hover:text-orange-300 ${FOCUS}`
const CHIP = `inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border border-orange-500/40 bg-accent-100 text-orange-900 dark:bg-slate-800 dark:text-orange-300 dark:border-orange-400/40 hover:bg-accent-200 dark:hover:bg-slate-700 ${FOCUS}`
const CHIP_ACTIVE = `inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-900 text-white dark:bg-orange-400 dark:text-primary ${FOCUS}`
const MUTED = 'text-slate-600 dark:text-accent-200'

const THEME_HEAD = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})();`
const THEME_BODY = `(function(){var b=document.getElementById('theme-toggle');if(!b)return;var r=document.documentElement;function s(){b.setAttribute('aria-pressed',r.classList.contains('dark')?'true':'false')}b.hidden=false;s();b.addEventListener('click',function(){var d=r.classList.toggle('dark');try{localStorage.setItem('theme',d?'dark':'light')}catch(e){}s()})})();`

function jsonLd(data) {
  // Empêche toute sortie prématurée du bloc <script>.
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

function head(meta, cssHref) {
  const t = UI[meta.lang]
  const url = abs(meta.path)
  const alt = meta.alternates
  const hreflang = alt
    ? LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${esc(abs(alt[l]))}">`).join('\n    ') +
      `\n    <link rel="alternate" hreflang="x-default" href="${esc(abs(alt[DEFAULT_LANG]))}">`
    : ''
  const article = meta.article
    ? [
        `<meta property="article:published_time" content="${meta.article.date}">`,
        `<meta property="article:author" content="${esc(SITE.author)}">`,
        ...meta.article.tags.map((tag) => `<meta property="article:tag" content="${esc(tag.label)}">`)
      ].join('\n    ')
    : ''
  return `<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>${esc(meta.title)}</title>
    <meta name="description" content="${esc(meta.description)}">
    <meta name="robots" content="${meta.indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'}">
    <meta name="author" content="${esc(SITE.author)}">
    <meta name="theme-color" content="#f97316" media="(prefers-color-scheme: light)">
    <meta name="theme-color" content="#fb923c" media="(prefers-color-scheme: dark)">
    <link rel="canonical" href="${esc(url)}">
    ${hreflang}
    <link rel="alternate" type="application/rss+xml" title="${esc(`${t.blogPageTitle} · ${SITE.name}`)}" href="/blog/${meta.lang}/rss.xml">
    <link rel="icon" type="image/png" href="/favicon.png">
    <link rel="apple-touch-icon" href="/favicon.png">
    <meta property="og:type" content="${meta.article ? 'article' : 'website'}">
    <meta property="og:site_name" content="${esc(SITE.name)}">
    <meta property="og:title" content="${esc(meta.title)}">
    <meta property="og:description" content="${esc(meta.description)}">
    <meta property="og:url" content="${esc(url)}">
    <meta property="og:image" content="${SITE.image}">
    <meta property="og:image:alt" content="${esc(SITE.name)}">
    <meta property="og:locale" content="${t.locale}">
    <meta property="og:locale:alternate" content="${UI[otherLang(meta.lang)].locale}">
    ${article}
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="${SITE.twitter}">
    <meta name="twitter:creator" content="${SITE.twitter}">
    <meta name="twitter:title" content="${esc(meta.title)}">
    <meta name="twitter:description" content="${esc(meta.description)}">
    <meta name="twitter:image" content="${SITE.image}">
    ${meta.jsonLd ? `<script type="application/ld+json">${jsonLd(meta.jsonLd)}</script>` : ''}
    <script>${THEME_HEAD}</script>
    <link rel="stylesheet" href="${cssHref}">
  </head>`
}

function navItems(lang) {
  const n = UI[lang].nav
  const items = [
    ['/', n.home], ['/projects', n.projects], ['/42', n.fortyTwo], ['/about', n.about],
    ['/resume', n.resume], ['/contact', n.contact], [`/blog/${lang}`, n.blog, true]
  ]
  return items.map(([href, label, current]) =>
    `<li><a class="${NAV_LINK}${current ? ' text-orange-900 dark:text-orange-300 underline decoration-orange-500 decoration-2 underline-offset-4' : ''}" href="${href}"${current ? ' aria-current="page"' : ''}>${esc(label)}</a></li>`
  ).join('')
}

function header(lang, switchHref) {
  const t = UI[lang]
  const other = otherLang(lang)
  const switcher = `<a href="${esc(switchHref)}" hreflang="${other}" lang="${other}" class="px-2.5 py-1 rounded border border-orange-500 text-sm font-semibold text-orange-900 dark:text-orange-300 hover:bg-orange-500/10 ${FOCUS}"><span aria-hidden="true"><span class="opacity-60">${lang.toUpperCase()}</span> / ${t.switchShort}</span><span class="sr-only">${esc(t.switchLabel)}</span></a>`
  const theme = `<button id="theme-toggle" type="button" hidden aria-pressed="false" class="px-2.5 py-1 rounded border border-orange-500 text-sm text-orange-900 dark:text-orange-300 hover:bg-orange-500/10 ${FOCUS}"><span class="sr-only">${esc(t.theme)}</span><span aria-hidden="true" class="dark:hidden">${esc(t.themeLight)}</span><span aria-hidden="true" class="hidden dark:inline">${esc(t.themeDark)}</span></button>`
  return `<header class="sticky top-0 z-40 border-b border-orange-500/20 dark:border-slate-700/50 bg-[#ffedd5]/90 dark:bg-[#0f172a]/90 backdrop-blur">
    <div class="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
      <a href="/" class="flex items-center gap-2 md:gap-3 rounded-lg hover:opacity-80 ${FOCUS}">
        <img src="/favicon.png" alt="" width="40" height="40" class="w-8 h-8 md:w-10 md:h-10">
        <span>
          <span class="block text-sm md:text-lg font-semibold text-primary dark:text-accent-50">Melchior JORDA</span>
          <span class="block text-xs md:text-sm text-slate-600 dark:text-accent-200">${esc(t.jobTitle)}</span>
        </span>
      </a>
      <div class="flex items-center gap-2 lg:order-last">${switcher}${theme}</div>
      <nav aria-label="Main" class="hidden lg:block"><ul class="flex gap-1 xl:gap-2 items-center">${navItems(lang)}</ul></nav>
      <details class="lg:hidden w-full group">
        <summary class="list-none cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded border border-slate-300 dark:border-slate-600 text-primary dark:text-accent-50 ${FOCUS}">
          <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16"/></svg>
          <span>Menu</span>
        </summary>
        <nav aria-label="Mobile"><ul class="mt-2 flex flex-col gap-1">${navItems(lang)}</ul></nav>
      </details>
    </div>
  </header>`
}

function footer(lang) {
  const year = new Date().getUTCFullYear()
  const a = 'text-orange-200 dark:text-orange-400 hover:text-orange-300 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded-sm'
  return `<footer class="bg-primary dark:bg-slate-800 text-neutral dark:text-accent-50 py-6 md:py-8">
    <div class="container mx-auto px-4 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
      <p>© ${year} Melchior JORDA. ${esc(UI[lang].footer)}</p>
      <nav aria-label="Footer"><ul class="flex flex-wrap gap-4 justify-center">
        <li><a class="${a}" href="https://www.linkedin.com/in/melchior-jorda-354a31270" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a class="${a}" href="https://github.com/M-Jorda" rel="noopener noreferrer">GitHub</a></li>
        <li><a class="${a}" href="/blog/${lang}/rss.xml">${esc(UI[lang].rss)}</a></li>
        <li><a class="${a}" href="/contact">${esc(UI[lang].nav.contact)}</a></li>
      </ul></nav>
    </div>
  </footer>`
}

export function layout({ meta, switchHref, cssHref, main }) {
  const t = UI[meta.lang]
  return `<!doctype html>
<html lang="${meta.lang}">
  ${head(meta, cssHref)}
  <body>
    <div id="app" class="bg-accent-50 dark:bg-slate-900 text-slate-900 dark:text-accent-50 font-sans">
      <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-orange-900 focus:text-white focus:rounded-lg">${esc(t.skip)}</a>
      ${header(meta.lang, switchHref)}
      <main id="main-content" class="container mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 min-h-screen">
        ${main}
      </main>
      ${footer(meta.lang)}
    </div>
    <script>${THEME_BODY}</script>
  </body>
</html>
`
}

// ---------- Fragments ----------

function typeBadge(type, lang) {
  return `<span class="inline-block px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide bg-primary text-accent-50 dark:bg-accent-100 dark:text-primary">${esc(UI[lang].types[type])}</span>`
}

function tagList(tags, lang, label) {
  if (!tags.length) return ''
  return `<ul class="flex flex-wrap gap-2" aria-label="${esc(label)}">${tags
    .map((tag) => `<li><a class="${CHIP}" href="/blog/${lang}/tags/${tag.slug}">#${esc(tag.label)}</a></li>`)
    .join('')}</ul>`
}

export function postCard(post, headingLevel = 2) {
  const h = `h${headingLevel}`
  const t = UI[post.lang]
  return `<article class="h-full p-5 rounded-lg bg-white/70 dark:bg-slate-800 border border-orange-500/15 dark:border-slate-700 flex flex-col gap-3">
    <div class="flex flex-wrap items-center gap-3 text-sm ${MUTED}">
      <time datetime="${post.date}">${formatDate(post.date, post.lang)}</time>
      ${typeBadge(post.type, post.lang)}
    </div>
    <${h} class="text-lg sm:text-xl font-semibold text-primary dark:text-accent-50"><a class="hover:text-orange-900 dark:hover:text-orange-300 hover:underline underline-offset-4 decoration-orange-500 ${FOCUS} rounded-sm" href="/blog/${post.lang}/${post.slug}">${esc(post.title)}</a></${h}>
    <p class="${MUTED}">${esc(post.summary)}</p>
    ${tagList(post.tags, post.lang, t.tags)}
  </article>`
}

function filters({ lang, activeType, activeTag, allTags }) {
  const t = UI[lang]
  const typeLink = (href, label, active) =>
    `<li><a class="${active ? CHIP_ACTIVE : CHIP}" href="${href}"${active ? ' aria-current="page"' : ''}>${esc(label)}</a></li>`
  const types = [
    typeLink(`/blog/${lang}`, t.all, !activeType && !activeTag),
    typeLink(`/blog/${lang}/daily`, t.types.daily, activeType === 'daily'),
    typeLink(`/blog/${lang}/weekly`, t.types.weekly, activeType === 'weekly')
  ].join('')
  const tags = allTags
    .map((tag) => typeLink(`/blog/${lang}/tags/${tag.slug}`, `#${tag.label} (${tag.count})`, activeTag === tag.slug))
    .join('')
  return `<nav aria-label="${esc(t.filterLabel)}" class="mt-6 flex flex-col gap-3 text-sm">
    <div class="flex flex-wrap items-center gap-2"><span class="font-semibold mr-1">${esc(t.filterType)}</span><ul class="flex flex-wrap gap-2">${types}</ul></div>
    ${allTags.length
      ? `<details class="group"${activeTag ? ' open' : ''}><summary class="cursor-pointer font-semibold w-fit rounded-sm ${FOCUS}">${esc(t.filterTags)} (${allTags.length})</summary><ul class="mt-2 flex flex-wrap gap-2">${tags}</ul></details>`
      : ''}
  </nav>`
}

function pagination({ lang, page, totalPages, basePath }) {
  if (totalPages <= 1) return ''
  const t = UI[lang]
  const href = (n) => (n === 1 ? basePath : `${basePath}/page/${n}`)
  const btn = `px-4 py-2 rounded-lg border border-orange-500 text-orange-900 dark:text-orange-300 hover:bg-orange-500/10 ${FOCUS}`
  return `<nav aria-label="${esc(t.pagination)}" class="mt-10 flex items-center justify-between gap-4">
    ${page > 1 ? `<a class="${btn}" rel="prev" href="${href(page - 1)}">← ${esc(t.prevPage)}</a>` : '<span></span>'}
    <span class="text-sm ${MUTED}" aria-current="page">${esc(t.pageOf(page, totalPages))}</span>
    ${page < totalPages ? `<a class="${btn}" rel="next" href="${href(page + 1)}">${esc(t.nextPage)} →</a>` : '<span></span>'}
  </nav>`
}

export function listMain({ lang, h1, intro, posts, page, totalPages, basePath, activeType, activeTag, allTags }) {
  const t = UI[lang]
  return `<h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-primary dark:text-accent-50">${esc(h1)}</h1>
    <p class="mt-3 max-w-3xl ${MUTED}">${esc(intro)}</p>
    ${filters({ lang, activeType, activeTag, allTags })}
    ${posts.length
      ? `<ul class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">${posts.map((p) => `<li>${postCard(p)}</li>`).join('')}</ul>`
      : `<p class="mt-8 ${MUTED}">${esc(t.empty)}</p>`}
    ${pagination({ lang, page, totalPages, basePath })}`
}

export function tagsIndexMain({ lang, h1, intro, allTags }) {
  return `<h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-primary dark:text-accent-50">${esc(h1)}</h1>
    <p class="mt-3 ${MUTED}">${esc(intro)}</p>
    ${allTags.length
      ? `<ul class="mt-8 flex flex-wrap gap-2">${allTags
          .map((tag) => `<li><a class="${CHIP}" href="/blog/${lang}/tags/${tag.slug}">#${esc(tag.label)} (${tag.count})</a></li>`)
          .join('')}</ul>`
      : `<p class="mt-8 ${MUTED}">${esc(UI[lang].empty)}</p>`}`
}

export function postMain({ post, prev, next, related }) {
  const t = UI[post.lang]
  const lang = post.lang
  const sources = post.sources.map((s) => {
    let host = ''
    try { host = new URL(s.url).hostname.replace(/^www\./, '') } catch { /* URL déjà validée */ }
    return `<li><a class="${LINK}" href="${esc(s.url)}" rel="noopener noreferrer external">${esc(s.title)}<span class="sr-only"> ${esc(t.externalLink)}</span><span aria-hidden="true"> ↗</span></a> <span class="text-sm ${MUTED}">— ${esc(host)}</span></li>`
  }).join('')

  const navLink = (p, label, dir) => p
    ? `<a class="block p-4 rounded-lg border border-orange-500/30 dark:border-slate-700 hover:bg-orange-500/5 ${FOCUS} ${dir === 'next' ? 'sm:text-right' : ''}" href="/blog/${lang}/${p.slug}" rel="${dir}">
        <span class="block text-xs uppercase tracking-wide ${MUTED}">${dir === 'prev' ? '← ' : ''}${esc(label)}${dir === 'next' ? ' →' : ''}</span>
        <span class="block mt-1 font-semibold">${esc(p.title)}</span>
      </a>`
    : '<span class="hidden sm:block"></span>'

  return `<p class="mb-6 text-sm"><a class="${LINK}" href="/blog/${lang}">← ${esc(t.backToBlog)}</a></p>
    <article class="max-w-3xl mx-auto">
      <header class="flex flex-col gap-4 border-b border-orange-500/20 dark:border-slate-700 pb-6">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-primary dark:text-accent-50">${esc(post.title)}</h1>
        <div class="flex flex-wrap items-center gap-3 text-sm ${MUTED}">
          <time datetime="${post.date}">${formatDate(post.date, lang)}</time>
          ${typeBadge(post.type, lang)}
        </div>
        ${tagList(post.tags, lang, t.tags)}
      </header>
      <div class="blog-prose mt-8">${post.html}</div>
      <section aria-labelledby="sources-title" class="mt-10 p-5 rounded-lg bg-white/70 dark:bg-slate-800 border-l-4 border-orange-500">
        <h2 id="sources-title" class="text-lg font-semibold text-primary dark:text-accent-50">${esc(t.sources)}</h2>
        <ol class="mt-3 list-decimal pl-5 flex flex-col gap-2">${sources}</ol>
      </section>
      <footer class="mt-6">
        <p class="text-sm italic ${MUTED}">${esc(t.aiNotice)}</p>
      </footer>
    </article>
    <nav aria-label="${esc(t.articleNav)}" class="max-w-3xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${navLink(prev, t.prevArticle, 'prev')}
      ${navLink(next, t.nextArticle, 'next')}
    </nav>
    ${related.length
      ? `<section aria-labelledby="related-title" class="max-w-3xl mx-auto mt-12">
          <h2 id="related-title" class="text-xl font-bold text-primary dark:text-accent-50">${esc(t.related)}</h2>
          <ul class="mt-4 grid grid-cols-1 gap-4">${related.map((p) => `<li>${postCard(p, 3)}</li>`).join('')}</ul>
        </section>`
      : ''}`
}

export function notFoundMain() {
  // Page bilingue : la langue de l'URL demandée n'est pas connue côté serveur.
  return LANGS.map((l) => {
    const t = UI[l]
    const heading = l === LANGS[0]
      ? `<h1 class="text-2xl sm:text-3xl font-bold text-primary dark:text-accent-50">${esc(t.notFoundTitle)}</h1>`
      : `<h2 class="text-2xl sm:text-3xl font-bold text-primary dark:text-accent-50">${esc(t.notFoundTitle)}</h2>`
    return `<section lang="${l}" class="max-w-2xl mx-auto mb-10">
      ${heading}
      <p class="mt-3 ${MUTED}">${esc(t.notFoundText)}</p>
      <p class="mt-4"><a class="${LINK}" href="/blog/${l}">${esc(t.backToBlog)}</a></p>
    </section>`
  }).join('')
}
