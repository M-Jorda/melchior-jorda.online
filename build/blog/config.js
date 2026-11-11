// Configuration du blog statique : constantes du site, textes d'interface
// et pages de la SPA à conserver dans le sitemap généré.

export const SITE = {
  url: 'https://melchior-jorda.online',
  name: 'Melchior JORDA',
  author: 'Melchior JORDA',
  twitter: '@melchiorjorda',
  image: 'https://melchior-jorda.online/favicon.png'
}

export const LANGS = ['fr', 'en']
export const DEFAULT_LANG = 'en'
export const TYPES = ['daily', 'weekly']
export const PAGE_SIZE = 10
export const RELATED_COUNT = 3

// Segments d'URL réservés sous /blog/<lang>/ : un article ne peut pas
// porter ces slugs, sinon il écraserait une page de liste.
export const RESERVED_SLUGS = ['page', 'tags', 'rss', 'rss.xml', ...TYPES]

export const UI = {
  fr: {
    locale: 'fr_FR',
    jobTitle: 'Développeur Full-Stack',
    dateLocale: 'fr-FR',
    blogTitle: 'Blog',
    blogPageTitle: 'Blog — veille technique',
    blogDescription: 'Veille technique de Melchior JORDA : résumés quotidiens et hebdomadaires de l’actualité du développement web et logiciel.',
    nav: { home: 'Accueil', projects: 'Projets', fortyTwo: 'Projets 42', about: 'À propos', resume: 'CV', contact: 'Contact', blog: 'Blog' },
    skip: 'Aller au contenu',
    filterLabel: 'Filtrer les articles',
    filterType: 'Type',
    filterTags: 'Tags',
    all: 'Tous',
    types: { daily: 'Quotidien', weekly: 'Hebdo' },
    typesPlural: { daily: 'Résumés quotidiens', weekly: 'Résumés hebdomadaires' },
    tagTitle: (tag) => `Articles tagués « ${tag} »`,
    tagDescription: (tag) => `Tous les articles du blog sur le thème « ${tag} ».`,
    typeDescription: (type) => (type === 'daily'
      ? 'Les résumés quotidiens de la veille technique.'
      : 'Les résumés hebdomadaires de la veille technique.'),
    pageSuffix: (n) => ` — page ${n}`,
    pagination: 'Pagination',
    prevPage: 'Page précédente',
    nextPage: 'Page suivante',
    pageOf: (n, total) => `Page ${n} sur ${total}`,
    empty: 'Aucun article pour le moment.',
    readMore: 'Lire l’article',
    tags: 'Tags',
    sources: 'Sources',
    aiNotice: 'Résumé assisté par IA à partir des sources citées.',
    externalLink: '(lien externe)',
    articleNav: 'Navigation entre articles',
    prevArticle: 'Article précédent',
    nextArticle: 'Article suivant',
    related: 'Articles liés',
    backToBlog: 'Retour au blog',
    switchLabel: 'Read in English',
    switchShort: 'EN',
    theme: 'Changer de thème',
    themeLight: 'Clair',
    themeDark: 'Sombre',
    rss: 'Flux RSS',
    notFoundTitle: 'Page introuvable',
    notFoundText: 'Cet article ou cette page du blog n’existe pas ou a été déplacé.',
    footer: 'Tous droits réservés.'
  },
  en: {
    locale: 'en_US',
    jobTitle: 'Full-Stack Developer',
    dateLocale: 'en-GB',
    blogTitle: 'Blog',
    blogPageTitle: 'Blog — tech watch',
    blogDescription: 'Tech watch by Melchior JORDA: daily and weekly summaries of web and software development news.',
    nav: { home: 'Home', projects: 'Projects', fortyTwo: '42 Projects', about: 'About', resume: 'Resume', contact: 'Contact', blog: 'Blog' },
    skip: 'Skip to content',
    filterLabel: 'Filter posts',
    filterType: 'Type',
    filterTags: 'Tags',
    all: 'All',
    types: { daily: 'Daily', weekly: 'Weekly' },
    typesPlural: { daily: 'Daily summaries', weekly: 'Weekly summaries' },
    tagTitle: (tag) => `Posts tagged “${tag}”`,
    tagDescription: (tag) => `All blog posts about “${tag}”.`,
    typeDescription: (type) => (type === 'daily'
      ? 'Daily tech watch summaries.'
      : 'Weekly tech watch summaries.'),
    pageSuffix: (n) => ` — page ${n}`,
    pagination: 'Pagination',
    prevPage: 'Previous page',
    nextPage: 'Next page',
    pageOf: (n, total) => `Page ${n} of ${total}`,
    empty: 'No posts yet.',
    readMore: 'Read the post',
    tags: 'Tags',
    sources: 'Sources',
    aiNotice: 'AI-assisted summary based on the cited sources.',
    externalLink: '(external link)',
    articleNav: 'Post navigation',
    prevArticle: 'Previous post',
    nextArticle: 'Next post',
    related: 'Related posts',
    backToBlog: 'Back to the blog',
    switchLabel: 'Lire en français',
    switchShort: 'FR',
    theme: 'Toggle theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    rss: 'RSS feed',
    notFoundTitle: 'Page not found',
    notFoundText: 'This blog post or page does not exist or has been moved.',
    footer: 'All rights reserved.'
  }
}

// Pages de la SPA reprises de l'ancien public/sitemap.xml.
// Mettre à jour lastmod ici (ou via ./update-sitemap-dates.sh).
export const STATIC_PAGES = [
  { path: '/', lastmod: '2025-10-08', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', lastmod: '2025-10-08', changefreq: 'monthly', priority: '0.9' },
  { path: '/resume', lastmod: '2025-10-08', changefreq: 'monthly', priority: '0.9' },
  { path: '/contact', lastmod: '2025-10-08', changefreq: 'monthly', priority: '0.8' },
  { path: '/projects', lastmod: '2025-10-08', changefreq: 'weekly', priority: '0.85' },
  { path: '/42', lastmod: '2026-03-15', changefreq: 'monthly', priority: '0.85' }
]
