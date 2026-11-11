// Plugin Vite : génère le blog statique (HTML, RSS, sitemap) au build et le
// sert à la volée en développement.

import fs from 'node:fs'
import path from 'node:path'
import { loadPosts } from './content.js'
import { buildSite, urlToFile } from './site.js'
import { DEFAULT_LANG } from './config.js'

const DEV_CSS = '/src/styles/tailwind.css'

function contentType(file) {
  if (file.endsWith('rss.xml')) return 'application/rss+xml; charset=utf-8'
  if (file.endsWith('.xml')) return 'application/xml; charset=utf-8'
  return 'text/html; charset=utf-8'
}

export default function staticBlog({ contentDir }) {
  const dir = path.resolve(contentDir)
  let isBuild = false
  let posts = null

  return {
    name: 'static-blog',

    configResolved(config) {
      isBuild = config.command === 'build'
    },

    buildStart() {
      if (!isBuild) return
      try {
        posts = loadPosts(dir)
      } catch (e) {
        this.error(e.message)
      }
    },

    generateBundle(_options, bundle) {
      const entry = Object.values(bundle).find((c) => c.type === 'chunk' && c.isEntry)
      const css = entry && entry.viteMetadata && [...entry.viteMetadata.importedCss][0]
      if (!css) this.error('Blog : feuille de style principale introuvable dans le bundle.')
      const files = buildSite(posts, { cssHref: `/${css}` })
      for (const [fileName, source] of files) {
        this.emitFile({ type: 'asset', fileName, source })
      }
    },

    // `vite preview` : reproduit le comportement de Firebase Hosting
    // (redirection /blog, pages statiques sans slash final, vrai 404).
    configurePreviewServer(server) {
      const outDir = path.resolve(server.config.root, server.config.build.outDir)
      server.middlewares.use((req, res, next) => {
        const urlPath = decodeURIComponent((req.url || '/').split('?')[0])
        if (urlPath !== '/blog' && !urlPath.startsWith('/blog/')) return next()
        const clean = urlPath.replace(/\/+$/, '')
        if (clean !== urlPath || clean === '/blog') {
          res.statusCode = 301
          res.setHeader('Location', clean === '/blog' ? `/blog/${DEFAULT_LANG}` : clean)
          return res.end()
        }
        const file = path.join(outDir, urlToFile(clean))
        const found = file.startsWith(outDir) && fs.existsSync(file) && fs.statSync(file).isFile()
        res.statusCode = found ? 200 : 404
        res.setHeader('Content-Type', found ? contentType(file) : 'text/html; charset=utf-8')
        res.end(fs.readFileSync(found ? file : path.join(outDir, '404.html')))
      })
    },

    configureServer(server) {
      server.watcher.add(dir)
      server.watcher.on('all', (_event, file) => {
        if (file.startsWith(dir)) server.ws.send({ type: 'full-reload' })
      })

      server.middlewares.use(async (req, res, next) => {
        const urlPath = (req.url || '/').split('?')[0]
        const clean = urlPath.length > 1 ? urlPath.replace(/\/+$/, '') : urlPath
        const isBlog = clean === '/blog' || clean.startsWith('/blog/')
        if (!isBlog && clean !== '/sitemap.xml') return next()
        if (clean === '/blog') {
          res.statusCode = 301
          res.setHeader('Location', `/blog/${DEFAULT_LANG}`)
          return res.end()
        }

        let files
        try {
          files = buildSite(loadPosts(dir), { cssHref: DEV_CSS })
        } catch (e) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          return res.end(e.message)
        }

        const file = urlToFile(clean)
        let body = files.get(file)
        res.statusCode = 200
        if (body === undefined) {
          body = files.get('404.html')
          res.statusCode = 404
        }
        const type = body === files.get('404.html') ? 'text/html; charset=utf-8' : contentType(file)
        if (type.startsWith('text/html')) body = await server.transformIndexHtml(clean, body)
        res.setHeader('Content-Type', type)
        res.end(body)
      })
    }
  }
}
