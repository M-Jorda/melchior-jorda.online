// Assemble toutes les pages du blog à partir des articles validés.
// Retourne une Map : chemin de fichier (relatif à dist/) -> contenu.

import { SITE, UI, LANGS, TYPES, PAGE_SIZE, RELATED_COUNT, STATIC_PAGES } from './config.js'
import { layout, listMain, postMain, tagsIndexMain, notFoundMain, esc, abs } from './render.js'

const otherLang = (lang) => LANGS.find((l) => l !== lang)

export function urlToFile(urlPath) {
  return urlPath.endsWith('.xml') || urlPath.endsWith('.html')
    ? urlPath.slice(1)
    : `${urlPath.slice(1)}/index.html`
}

function chunk(list) {
  const pages = []
  for (let i = 0; i < list.length; i += PAGE_SIZE) pages.push(list.slice(i, i + PAGE_SIZE))
  return pages.length ? pages : [[]]
}

function collectTags(posts) {
  const map = new Map()
  for (const p of posts) {
    for (const tag of p.tags) {
      const cur = map.get(tag.slug) || { slug: tag.slug, label: tag.label, posts: [] }
      cur.posts.push(p)
      map.set(tag.slug, cur)
    }
  }
  return [...map.values()]
    .map((t) => ({ ...t, count: t.posts.length }))
    .sort((a, b) => b.count - a.count || a.slug.localeCompare(b.slug))
}

function relatedPosts(post, posts) {
  const mine = new Set(post.tags.map((t) => t.slug))
  return posts
    .filter((p) => p !== post)
    .map((p) => ({ p, score: p.tags.filter((t) => mine.has(t.slug)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, RELATED_COUNT)
    .map((x) => x.p)
}

const pageTitle = (s) => `${s} · ${SITE.name}`

export function buildSite(posts, { cssHref }) {
  const files = new Map()
  const exists = new Set() // chemins d'URL générés, pour les hreflang
  const pages = [] // { path, lang, meta, mainFn, altFn }

  const ctx = Object.fromEntries(LANGS.map((lang) => {
    const list = posts[lang]
    return [lang, {
      list,
      tags: collectTags(list),
      byFile: new Map(list.map((p) => [p.file, p]))
    }]
  }))

  const addPage = (page) => {
    exists.add(page.path)
    pages.push(page)
  }

  // Pages de liste paginées (toutes, par type, par tag)
  const addListing = ({ lang, basePath, items, h1, intro, description, activeType, activeTag, indexableFirst, titleBase }) => {
    const chunks = chunk(items)
    chunks.forEach((slice, i) => {
      const page = i + 1
      const path = page === 1 ? basePath : `${basePath}/page/${page}`
      const suffix = page > 1 ? UI[lang].pageSuffix(page) : ''
      addPage({
        path,
        lang,
        counterpart: (other) => {
          const otherBase = basePath.replace(`/blog/${lang}`, `/blog/${other}`)
          return page === 1 ? otherBase : `${otherBase}/page/${page}`
        },
        meta: {
          title: pageTitle(titleBase + suffix),
          description: description + suffix,
          indexable: indexableFirst && page === 1
        },
        main: () => listMain({
          lang, h1: h1 + suffix, intro, posts: slice, page, totalPages: chunks.length,
          basePath, activeType, activeTag, allTags: ctx[lang].tags
        })
      })
    })
  }

  for (const lang of LANGS) {
    const t = UI[lang]
    const { list, tags } = ctx[lang]
    const base = `/blog/${lang}`

    addListing({
      lang, basePath: base, items: list, h1: t.blogPageTitle, titleBase: t.blogPageTitle,
      intro: t.blogDescription, description: t.blogDescription, indexableFirst: true
    })

    for (const type of TYPES) {
      addListing({
        lang, basePath: `${base}/${type}`, items: list.filter((p) => p.type === type),
        h1: t.typesPlural[type], titleBase: `${t.typesPlural[type]} — ${t.blogTitle}`,
        intro: t.typeDescription(type), description: t.typeDescription(type),
        activeType: type, indexableFirst: false
      })
    }

    addPage({
      path: `${base}/tags`,
      lang,
      counterpart: (other) => `/blog/${other}/tags`,
      meta: { title: pageTitle(`${t.filterTags} — ${t.blogTitle}`), description: t.blogDescription, indexable: false },
      main: () => tagsIndexMain({ lang, h1: `${t.filterTags} — ${t.blogTitle}`, intro: t.blogDescription, allTags: tags })
    })

    for (const tag of tags) {
      addListing({
        lang, basePath: `${base}/tags/${tag.slug}`, items: tag.posts,
        h1: t.tagTitle(tag.label), titleBase: `${t.tagTitle(tag.label)} — ${t.blogTitle}`,
        intro: t.tagDescription(tag.label), description: t.tagDescription(tag.label),
        activeTag: tag.slug, indexableFirst: false
      })
    }

    list.forEach((post, i) => {
      addPage({
        path: `${base}/${post.slug}`,
        lang,
        counterpart: (other) => {
          const tr = ctx[other].byFile.get(post.file)
          return tr ? `/blog/${other}/${tr.slug}` : null
        },
        meta: {
          title: pageTitle(post.title),
          description: post.summary,
          indexable: post.indexable,
          article: { date: post.date, tags: post.tags },
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.summary,
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: lang,
            url: abs(`${base}/${post.slug}`),
            mainEntityOfPage: { '@type': 'WebPage', '@id': abs(`${base}/${post.slug}`) },
            author: { '@type': 'Person', '@id': `${SITE.url}/#person`, name: SITE.author, url: `${SITE.url}/` },
            publisher: { '@type': 'Person', '@id': `${SITE.url}/#person`, name: SITE.author, url: `${SITE.url}/` },
            image: SITE.image,
            keywords: post.tags.map((tag) => tag.label).join(', '),
            isBasedOn: post.sources.map((s) => s.url)
          }
        },
        // Liste triée du plus récent au plus ancien : « précédent » = plus ancien.
        main: () => postMain({ post, prev: list[i + 1] || null, next: list[i - 1] || null, related: relatedPosts(post, list) })
      })
    })
  }

  // Rendu final, une fois tous les chemins connus (pour les hreflang).
  for (const page of pages) {
    const other = otherLang(page.lang)
    const cp = page.counterpart(other)
    const hasTranslation = cp && exists.has(cp)
    const alternates = hasTranslation ? { [page.lang]: page.path, [other]: cp } : null
    const meta = { ...page.meta, lang: page.lang, path: page.path, alternates }
    files.set(urlToFile(page.path), layout({
      meta,
      switchHref: hasTranslation ? cp : `/blog/${other}`,
      cssHref,
      main: page.main()
    }))
  }

  // Servie par Firebase (statut 404) pour toute URL /blog/** inexistante :
  // la réécriture vers la SPA exclut /blog (voir firebase.json).
  files.set('404.html', layout({
    meta: {
      lang: LANGS[0],
      path: '/blog/404',
      title: pageTitle(`${UI[LANGS[0]].notFoundTitle} / ${UI[LANGS[1]].notFoundTitle}`),
      description: UI[LANGS[0]].notFoundText,
      indexable: false,
      alternates: null
    },
    switchHref: `/blog/${LANGS[1]}`,
    cssHref,
    main: notFoundMain()
  }))

  for (const lang of LANGS) files.set(`blog/${lang}/rss.xml`, rss(lang, ctx[lang].list))
  files.set('sitemap.xml', sitemap(ctx))
  return files
}

// ---------- RSS ----------

function rfc822(iso) {
  return new Date(`${iso}T00:00:00Z`).toUTCString()
}

function rss(lang, list) {
  const t = UI[lang]
  const items = list.filter((p) => p.indexable)
  const link = abs(`/blog/${lang}`)
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(`${t.blogPageTitle} · ${SITE.name}`)}</title>
    <link>${link}</link>
    <description>${esc(t.blogDescription)}</description>
    <language>${lang}</language>
    <atom:link href="${abs(`/blog/${lang}/rss.xml`)}" rel="self" type="application/rss+xml"/>
${items.length ? `    <lastBuildDate>${rfc822(items[0].date)}</lastBuildDate>\n` : ''}${items.map((p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${abs(`/blog/${lang}/${p.slug}`)}</link>
      <guid isPermaLink="true">${abs(`/blog/${lang}/${p.slug}`)}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${esc(p.summary)}</description>
${p.tags.map((tag) => `      <category>${esc(tag.label)}</category>\n`).join('')}    </item>
`).join('')}  </channel>
</rss>
`
}

// ---------- Sitemap ----------

function sitemap(ctx) {
  const entries = []
  const alt = (map) => Object.entries(map)
    .map(([l, p]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(p)}"/>`)
    .join('\n')

  for (const page of STATIC_PAGES) {
    // Pages de la SPA : même URL pour toutes les langues (choix côté client).
    entries.push(`  <url>
    <loc>${abs(page.path)}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${alt({ en: page.path, fr: page.path, es: page.path })}
  </url>`)
  }

  const blogAlt = { fr: '/blog/fr', en: '/blog/en', 'x-default': '/blog/en' }
  for (const lang of LANGS) {
    const latest = ctx[lang].list[0]
    entries.push(`  <url>
    <loc>${abs(`/blog/${lang}`)}</loc>
${latest ? `    <lastmod>${latest.date}</lastmod>\n` : ''}    <changefreq>daily</changefreq>
    <priority>0.8</priority>
${alt(blogAlt)}
  </url>`)
  }

  for (const lang of LANGS) {
    const other = otherLang(lang)
    for (const post of ctx[lang].list) {
      if (!post.indexable) continue
      const tr = ctx[other].byFile.get(post.file)
      let links = ''
      if (tr && tr.indexable) {
        const map = { [lang]: `/blog/${lang}/${post.slug}`, [other]: `/blog/${other}/${tr.slug}` }
        map['x-default'] = map.en
        links = `\n${alt(map)}`
      }
      entries.push(`  <url>
    <loc>${abs(`/blog/${lang}/${post.slug}`)}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>${links}
  </url>`)
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`
}
