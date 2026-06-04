import { useParams, Navigate } from 'react-router-dom'
import { SEO_PAGES } from '../data/seoPages'
import SeoLandingTemplate from '../components/SeoLandingTemplate'

export default function DynamicSeoPage() {
  const { slug } = useParams()
  const page = SEO_PAGES[slug]
  if (!page) return <Navigate to="/" replace />
  return <SeoLandingTemplate page={{ ...page, slug }} />
}
