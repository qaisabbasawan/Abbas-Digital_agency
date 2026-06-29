/* Centralised JSON-LD (schema.org) builders.
   Rendered into <head> via the SEO component so they appear in the
   prerendered HTML and are visible to crawlers in View-Source. */

const SITE = 'https://abbasdigitalagency.com'
const LOGO = `${SITE}/logo.png`

const SAME_AS = [
  'https://www.facebook.com/abbasdigitalagency',
  'https://www.linkedin.com/company/abbasdigitalagency',
  'https://www.instagram.com/abbasdigitalagency',
]

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'Abbas Digital Agency',
    legalName: 'Abbas Digital Agency LLC',
    url: SITE,
    logo: LOGO,
    image: `${SITE}/og-image.jpg`,
    description:
      'Full-service digital marketing agency based in Islamabad, Pakistan and registered as an LLC in Montana, USA. SEO, web design, mobile apps, social media, PPC and branding.',
    email: 'info@abbasdigitalagency.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'H 1-A, IVY Street, Banigala',
      addressLocality: 'Islamabad',
      addressRegion: 'Islamabad Capital Territory',
      postalCode: '44000',
      addressCountry: 'PK',
    },
    contactPoint: [{
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@abbasdigitalagency.com',
      telephone: '+92-300-5935125',
      availableLanguage: ['English', 'Urdu'],
      areaServed: ['PK', 'US', 'GB', 'AE'],
    }],
    sameAs: SAME_AS,
  }
}

/* Pakistan office — Abbas Digital Agency */
export function localBusinessPK() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE}/#business-pk`,
    name: 'Abbas Digital Agency',
    url: SITE,
    logo: LOGO,
    image: `${SITE}/og-image.jpg`,
    description:
      "Islamabad's leading digital marketing agency — SEO, web design, social media marketing, PPC and branding for businesses across Pakistan.",
    telephone: '+92-300-5935125',
    email: 'info@abbasdigitalagency.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'H 1-A, IVY Street, Banigala',
      addressLocality: 'Islamabad',
      addressRegion: 'Islamabad Capital Territory',
      postalCode: '44000',
      addressCountry: 'PK',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 33.6844, longitude: 73.0479 },
    areaServed: ['Islamabad', 'Rawalpindi', 'Pakistan'],
    sameAs: SAME_AS,
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00', closes: '19:00',
    }],
  }
}

/* USA office — Abbas Digital Agency LLC (Kalispell, Montana) */
export function localBusinessUSA() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE}/#business-us`,
    name: 'Abbas Digital Agency LLC',
    url: SITE,
    logo: LOGO,
    image: `${SITE}/og-image.jpg`,
    description:
      'US-registered digital marketing agency in Kalispell, Montana — SEO, web design and digital marketing for businesses across Montana and the United States.',
    // NOTE: add a real US phone number here when available.
    email: 'info@abbasdigitalagency.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1001 S Main St Ste 500',
      addressLocality: 'Kalispell',
      addressRegion: 'MT',
      postalCode: '59901',
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 48.1958, longitude: -114.3129 },
    areaServed: ['Kalispell', 'Montana', 'United States'],
    sameAs: SAME_AS,
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00', closes: '17:00',
    }],
  }
}

export function articleSchema(blog) {
  const url = `${SITE}/blog/${blog.slug}`
  const published = blog.date ? new Date(blog.date).toISOString() : undefined
  const modified = blog.updatedAt ? new Date(blog.updatedAt).toISOString() : published
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: blog.title,
    description: blog.metaDesc || blog.title,
    image: blog.image ? [blog.image] : [`${SITE}/og-image.jpg`],
    datePublished: published,
    dateModified: modified,
    author: { '@type': 'Organization', name: 'Abbas Digital Agency', url: SITE },
    publisher: {
      '@type': 'Organization',
      name: 'Abbas Digital Agency',
      logo: { '@type': 'ImageObject', url: LOGO },
    },
    articleSection: blog.category || undefined,
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.path}`,
    })),
  }
}

export function serviceSchema(name, description, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name,
    description,
    url: `${SITE}${path}`,
    provider: { '@type': 'Organization', name: 'Abbas Digital Agency', url: SITE },
    areaServed: ['Pakistan', 'United States'],
  }
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/* Homepage FAQ schema — built from the same source as the visible FAQ section
   (src/data/faqs.js) so the rendered Q&A and the structured data never drift. */
export function homepageFaqSchema() {
  return faqSchema(HOMEPAGE_FAQS_FOR_SCHEMA)
}

// Inlined copy of the FAQ Q/A used for JSON-LD. Kept here (not imported) so
// schema.js has no module-graph dependency on a data file during SSR prerender.
const HOMEPAGE_FAQS_FOR_SCHEMA = [
  { q: 'What services does Abbas Digital Agency offer?', a: 'We offer web development, e-commerce, mobile app development, AI automation & chatbots, digital marketing & SEO, branding & design, and modular ERP solutions for businesses of every size.' },
  { q: 'Where is Abbas Digital Agency located?', a: 'We are based in Islamabad, Pakistan and are also registered as an LLC in Montana, USA — serving clients across Pakistan, the Middle East, the UK and the United States.' },
  { q: 'How much do your services cost?', a: 'Pricing depends on scope. Websites typically start from around $500, mobile apps and ERP builds are quoted per module, and marketing is available on monthly retainers. Every project begins with a free consultation and a fixed written quote.' },
  { q: 'How long does a typical project take?', a: 'Most websites launch in 2–4 weeks, branding projects in 1–3 weeks, and mobile apps or ERP systems in 6–12 weeks depending on complexity. We agree a clear timeline before any work begins.' },
  { q: 'Do you work with international clients?', a: 'Yes. As a US-registered LLC with a Pakistan delivery team, we work with clients worldwide and bill in USD. We hold meetings across US, UK and Pakistan time zones.' },
]
