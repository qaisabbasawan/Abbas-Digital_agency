import { SEO_PAGES } from './seoPages'

/* Core service detail pages (/services/:slug).
   Data for these lives in src/pages/ServiceDetailPage.jsx — importing that
   module here would pull the whole page (and create a circular import via
   Footer), so the list is mirrored as config. Keep in sync when adding a
   new service there (scripts/prerender.mjs mirrors the same slugs). */
const CORE_SERVICE_LINKS = [
  { label: 'Web Development',   path: '/services/web-development' },
  { label: 'E-Commerce',        path: '/services/ecommerce' },
  { label: 'Mobile Apps',       path: '/services/mobile-apps' },
  { label: 'AI & Chatbots',     path: '/services/ai-chatbots' },
  { label: 'Digital Marketing', path: '/services/digital-marketing' },
  { label: 'Branding & Design', path: '/services/branding-design' },
  { label: 'ERP Solutions',     path: '/services/erp-solutions' },
]

/* SEO service silo pages (/:slug, type 'service' in seoPages.js) —
   derived automatically, so new entries appear in the footer marquee
   without any manual step. */
const seoServiceLinks = Object.values(SEO_PAGES)
  .filter(p => p.type === 'service')
  .map(p => ({ label: p.hero.badge, path: `/${p.slug}` }))

export const SERVICE_LINKS = [...CORE_SERVICE_LINKS, ...seoServiceLinks]

/* US city/state landing pages (type 'location-us' in seoPages.js) —
   label comes from each page's own H1 (hero.headline). */
export const US_LOCATION_LINKS = Object.values(SEO_PAGES)
  .filter(p => p.type === 'location-us')
  .map(p => ({ label: p.hero.headline.replace(/\n/g, ' '), path: `/${p.slug}` }))
