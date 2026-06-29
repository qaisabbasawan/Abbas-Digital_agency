import { Link } from 'react-router-dom'
import { Home, Mail, ArrowLeft } from 'lucide-react'
import SEO from '../components/SEO'
import Footer from '../components/Footer'

/* Branded 404. Rendered for any unknown route and prerendered to
   dist/404.html, which Netlify serves with a real HTTP 404 status. */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-dark text-white flex flex-col">
      <SEO
        title="Page Not Found (404) | Abbas Digital Agency"
        description="The page you're looking for doesn't exist or has moved. Explore our services or get in touch with Abbas Digital Agency."
        path="/404"
      />
      {/* The 404 HTTP status (served via Netlify _redirects) already signals
          crawlers not to index this page. */}

      <main className="flex-1 flex flex-col items-center justify-center text-center px-5 py-32 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full bg-brand-blue/[0.08] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-pink/[0.06] blur-[140px] pointer-events-none" />

        <p
          className="relative font-bold leading-none mb-2 bg-clip-text text-transparent"
          style={{ fontSize: 'clamp(5rem, 18vw, 11rem)', backgroundImage: 'linear-gradient(135deg, #2E55E0, #E8155A)' }}
        >
          404
        </p>
        <h1 className="relative text-2xl sm:text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="relative text-white/50 max-w-md mb-9 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="relative flex flex-col sm:flex-row gap-4 items-center">
          <Link
            to="/"
            className="shimmer-btn inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm tracking-[0.08em] uppercase font-medium text-white hover:opacity-90 transition-opacity"
          >
            <Home size={16} /> Go Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm text-white/60 hover:text-white transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <Mail size={15} /> Contact Us
          </Link>
        </div>

        <div className="relative mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px]">
          {[
            { to: '/services', label: 'Services' },
            { to: '/portfolio', label: 'Portfolio' },
            { to: '/blog', label: 'Blog' },
            { to: '/about', label: 'About' },
          ].map(l => (
            <Link key={l.to} to={l.to} className="text-white/40 hover:text-brand-pink transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft size={12} /> {l.label}
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
