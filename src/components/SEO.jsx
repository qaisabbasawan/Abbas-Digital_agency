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
}) {
  const url = `${BASE_URL}${path}`

  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Abbas Digital Agency" />
      <meta name="geo.region" content="PK-IS" />
      <meta name="geo.placename" content="Islamabad" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Abbas Digital Agency" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@AbbasDigital" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
