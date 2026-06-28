import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://abbasdigitalagency.com'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`

export default function SEO({
  title,
  description,
  keywords = '',
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  schema = null,           // object or array of JSON-LD objects
  publishedTime,           // ISO date — articles
  modifiedTime,            // ISO date — articles
}) {
  const url = `${BASE_URL}${path}`
  const ogImage = image && image.startsWith('http') ? image : `${BASE_URL}${image || ''}`
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : []

  // Serialise JSON-LD and guard against </script> breakouts. These scripts are
  // rendered as plain React elements below (NOT through <Helmet>) so react-dom
  // emits identical markup on the server and client. Routing JSON-LD through
  // react-helmet-async re-encodes the content differently on each side and
  // breaks hydration (React #418). JSON-LD is valid anywhere, so the body is fine.
  const ldJson = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c')

  return (
    <>
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Abbas Digital Agency" />
      <link rel="canonical" href={url} />

      {/* hreflang — dual market (Pakistan + USA), English */}
      <link rel="alternate" hrefLang="en-pk" href={url} />
      <link rel="alternate" hrefLang="en-us" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Abbas Digital Agency" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@AbbasDigital" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>

    {/* JSON-LD structured data — rendered by react-dom (not Helmet) for stable
        server/client markup. dangerouslySetInnerHTML avoids text re-encoding. */}
    {schemas.map((s, i) => (
      <script
        key={i}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(s) }}
      />
    ))}
    </>
  )
}
