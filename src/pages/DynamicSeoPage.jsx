import { useParams } from 'react-router-dom'
import { SEO_PAGES } from '../data/seoPages'
import SeoLandingTemplate from '../components/SeoLandingTemplate'
import NotFound from './NotFound'

export default function DynamicSeoPage() {
  const { slug } = useParams()
  const page = SEO_PAGES[slug]
  // Unknown slug → render the branded 404 (prerendered as 404.html, served
  // by Netlify with a real 404 status) rather than redirecting to home.
  if (!page) return <NotFound />
  return <SeoLandingTemplate page={{ ...page, slug }} />
}
