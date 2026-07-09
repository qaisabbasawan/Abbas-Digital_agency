/* ───────────────────────────────────────────────────────────────────────────
   Static prerender + sitemap generator.

   Runs after `vite build` (client) and `vite build --ssr` (server bundle).
   For every public route it renders real HTML with react-dom/server, injects
   that markup + the per-page <head> tags (react-helmet-async) into the built
   index.html template, and writes dist/<route>/index.html.

   Blog content is fetched once from Supabase and embedded as window.__SSG_DATA__
   so the client hydrates against identical markup. The sitemap is rebuilt from
   the same authoritative route list, so new blog posts appear automatically on
   the next build.
─────────────────────────────────────────────────────────────────────────── */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')

const SITE = 'https://abbasdigitalagency.com'

const SUPABASE_URL = 'https://bwhqdzzlsrjomqppoide.supabase.co'
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3aHFkenpsc3Jqb21xcHBvaWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NDU4MzUsImV4cCI6MjA5NDQyMTgzNX0.FuK7Yy7M9DOnYidE5gxbXmLch0eqP36NgD8pC7N_-Gw'

// Same field mapping the client (AuthContext) uses, so hydration matches.
function blogFromDb(b) {
  return {
    id: b.id, title: b.title, slug: b.slug, content: b.content,
    category: b.category, status: b.status, author: b.author,
    date: b.date, updatedAt: b.updated_at, image: b.image,
    metaTitle: b.meta_title, metaDesc: b.meta_desc,
    tags: b.tags || '', views: b.views || 0,
  }
}

// Service detail slugs (src/pages/ServiceDetailPage.jsx)
const SERVICE_SLUGS = [
  'web-development', 'ecommerce', 'mobile-apps',
  'ai-chatbots', 'digital-marketing', 'branding-design',
  'erp-solutions',
]

// Static public routes (admin is intentionally excluded — noindex).
const STATIC_ROUTES = [
  '/', '/about', '/services', '/portfolio', '/saas-products', '/contact',
  '/blog', '/islamabad', '/usa-clients', '/cleaningservices', '/analyzer',
  '/privacy-policy', '/terms-and-conditions',
]

async function fetchBlogs() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)
    const { data, error } = await supabase
      .from('blogs').select('*')
      .eq('status', 'published')
      .order('date', { ascending: false })
    if (error) throw error
    return (data || []).map(blogFromDb)
  } catch (e) {
    console.warn('⚠️  Could not fetch blogs from Supabase — prerendering without blog data:', e.message)
    return []
  }
}

function safeJson(obj) {
  // Prevent </script> breakouts and HTML-comment edge cases in inline JSON.
  return JSON.stringify(obj).replace(/</g, '\\u003c').replace(/-->/g, '--\\u003e')
}

/* React 19 + react-helmet-async render hoistable metadata (<title>, <meta>,
   <link>, JSON-LD <script>) inline in the component output rather than the
   document <head>. Crawlers only honour these in <head>, so we lift them out
   of the rendered body and return them for injection into <head>. */
function extractHead(html) {
  const heads = []
  let body = html

  const titleMatch = body.match(/<title[^>]*>[\s\S]*?<\/title>/i)
  if (titleMatch) { heads.push(titleMatch[0]); body = body.replace(titleMatch[0], '') }

  body = body.replace(/<meta\b[^>]*>/gi, (m) => { heads.push(m); return '' })
  body = body.replace(/<link\b[^>]*>/gi, (m) => { heads.push(m); return '' })
  // NOTE: <script type="application/ld+json"> is intentionally LEFT in the body.
  // React 19 hoists <title>/<meta>/<link> into <head> on the client but does NOT
  // hoist JSON-LD scripts — they hydrate inline in the body. Lifting them to
  // <head> here would make the server markup diverge from the client render and
  // break hydration (React error #418). JSON-LD is valid anywhere in the doc, so
  // crawlers still read it from the body.

  const head = heads.join('')
    .replace(/hrefLang=/g, 'hreflang=')          // canonical lowercase attr
    .replace(/\s*data-(?:rh|react-helmet)="[^"]*"/g, '')
  return { head, body }
}

function routeToFile(route) {
  if (route === '/') return path.join(distDir, 'index.html')
  return path.join(distDir, route.replace(/^\//, ''), 'index.html')
}

function buildSitemap(routes, blogs) {
  const today = new Date().toISOString().slice(0, 10)
  const lastmodFor = (route) => {
    if (route.startsWith('/blog/')) {
      const slug = route.slice('/blog/'.length)
      const b = blogs.find(x => x.slug === slug)
      const d = b?.updatedAt || b?.date
      if (d) return new Date(d).toISOString().slice(0, 10)
    }
    return today
  }
  const priorityFor = (route) => {
    if (route === '/') return '1.0'
    if (route === '/services' || route.startsWith('/services/')) return '0.9'
    if (route === '/blog') return '0.8'
    if (route.startsWith('/blog/')) return '0.7'
    if (route.startsWith('/landing-')) return '0.6'
    return '0.7'
  }
  const changefreqFor = (route) =>
    route === '/' || route === '/blog' ? 'weekly' : 'monthly'

  const urls = routes.map(route => `  <url>
    <loc>${SITE}${route === '/' ? '/' : route}</loc>
    <lastmod>${lastmodFor(route)}</lastmod>
    <changefreq>${changefreqFor(route)}</changefreq>
    <priority>${priorityFor(route)}</priority>
  </url>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

async function main() {
  const { render } = await import(path.join(distDir, '..', 'dist-ssr', 'entry-server.js'))
  const { SEO_PAGES } = await import(path.join(root, 'src', 'data', 'seoPages.js'))
  const { INDUSTRY_LANDING_PAGES } = await import(path.join(root, 'src', 'data', 'industryLandingPages.js'))

  const blogs = await fetchBlogs()
  const ssrData = { blogs }

  // HTML-size optimization: the heavy blog `content` is only needed on blog
  // routes (list + detail). Every other page's body never renders blog content,
  // and AuthContext re-fetches fresh blogs on mount anyway — so we embed a
  // lightweight copy (no content) there. This keeps hydration data identical to
  // the rendered body while shaving tens of KB off non-blog pages.
  const blogsLight = blogs.map(({ content, ...rest }) => rest)
  const lightData = { blogs: blogsLight }
  const isBlogRoute = (r) => r === '/blog' || r.startsWith('/blog/')
  const dataFor = (r) => (isBlogRoute(r) ? ssrData : lightData)
  const scriptFor = (r) => `<script>window.__SSG_DATA__=${safeJson(dataFor(r))}</script>`

  const seoRoutes = Object.keys(SEO_PAGES).map(s => `/${s}`)
  const landingRoutes = INDUSTRY_LANDING_PAGES.map(v => `/${v.routeSlug}`)
  const serviceRoutes = SERVICE_SLUGS.map(s => `/services/${s}`)
  const blogRoutes = blogs.map(b => `/blog/${b.slug}`)

  const routes = [
    ...STATIC_ROUTES,
    ...serviceRoutes,
    ...blogRoutes,
    ...seoRoutes,
    ...landingRoutes,
  ]

  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8')

  let ok = 0, failed = 0
  for (const route of routes) {
    try {
      const { html } = await render(route, dataFor(route))
      // React 19 renders helmet/metadata inline in the component output; lift
      // those <head> tags out of the body so crawlers see them in <head>.
      const { head, body } = extractHead(html)
      let page = template
      // Drop template defaults so the per-page title/description win.
      page = page.replace(/<title>[\s\S]*?<\/title>/, '')
      page = page.replace(/<meta\s+name="description"[^>]*>/i, '')
      page = page.replace('</head>', `${head}${scriptFor(route)}</head>`)
      page = page.replace('<div id="root"></div>', `<div id="root">${body}</div>`)

      const file = routeToFile(route)
      fs.mkdirSync(path.dirname(file), { recursive: true })
      fs.writeFileSync(file, page)
      ok++
    } catch (e) {
      failed++
      console.error(`✗ ${route}:`, e.message)
    }
  }

  // Branded 404 → dist/404.html (Netlify serves this with a real 404 status
  // via the `/* /404.html 404` fallback in public/_redirects). Not added to the
  // sitemap and carries a noindex robots tag.
  try {
    const { html } = await render('/404', lightData)
    const { head, body } = extractHead(html)
    let page = template
    page = page.replace(/<title>[\s\S]*?<\/title>/, '')
    page = page.replace(/<meta\s+name="description"[^>]*>/i, '')
    page = page.replace('</head>', `${head}${scriptFor('/404')}</head>`)
    page = page.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
    fs.writeFileSync(path.join(distDir, '404.html'), page)
    console.log('✓ 404.html written.')
  } catch (e) {
    console.error('✗ /404:', e.message)
  }

  // Sitemap (only indexable content routes).
  const sitemap = buildSitemap(routes, blogs)
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap)

  console.log(`\n✓ Prerendered ${ok} routes (${blogRoutes.length} blog posts, ${landingRoutes.length} industry landing pages), ${failed} failed.`)
  console.log(`✓ sitemap.xml written with ${routes.length} URLs.`)
  if (failed > 0) process.exitCode = 1
}

main().catch(err => { console.error(err); process.exit(1) })
