import { Link } from 'react-router-dom'
import Logo from './Logo'

const navLinks = [
  { label: 'Home',      path: '/' },
  { label: 'About',     path: '/about' },
  { label: 'Services',  path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact',   path: '/contact' },
]

const services = [
  'Web Development', 'E-Commerce', 'Mobile Apps',
  'AI & Chatbots', 'Digital Marketing', 'Branding & Design',
]

export default function Footer() {
  return (
    <footer className="bg-bg-dark border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16 border-b border-white/[0.06]">

          {/* Brand */}
          <div>
            <Logo size="sm" />
            <p className="text-white/35 text-[13px] leading-relaxed mt-4 mb-6 max-w-[200px]">
              Your Digital Partner Towards Success. Building Digital Futures Since 2012.
            </p>
            <div className="flex gap-2">
              {['f','in','📸','💬'].map((ic,i) => (
                <button key={i} className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-200 text-xs font-bold">
                  {ic}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/35 text-[11px] uppercase tracking-[0.22em] mb-5">Navigation</h4>
            <ul className="space-y-2.5">
              {navLinks.map(l => (
                <li key={l.label}>
                  <Link to={l.path} className="text-white/50 text-[13px] hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-0 h-px bg-brand-pink group-hover:w-3 transition-all duration-300" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white/35 text-[11px] uppercase tracking-[0.22em] mb-5">Services</h4>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s}>
                  <Link to="/services" className="text-white/50 text-[13px] hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-0 h-px bg-brand-pink group-hover:w-3 transition-all duration-300" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/35 text-[11px] uppercase tracking-[0.22em] mb-5">Get In Touch</h4>
            <div className="space-y-3 mb-6">
              <p className="text-white/50 text-[13px] flex items-start gap-2">
                <span className="text-brand-pink mt-0.5 shrink-0">✉</span>
                info@abbasonline.com
              </p>
              <p className="text-white/50 text-[13px] flex items-start gap-2">
                <span className="text-brand-pink mt-0.5 shrink-0">📍</span>
                Islamabad, Pakistan
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 shimmer-btn px-5 py-2.5 text-xs tracking-[0.12em] uppercase text-white hover:opacity-90 transition-opacity"
            >
              Get a Quote →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5">
          <p className="text-white/25 text-[12px]">
            © {new Date().getFullYear()} Abbas Digital Agency. All Rights Reserved.
          </p>
          <p className="text-white/25 text-[12px]">Made with ❤️ in Pakistan 🇵🇰</p>
        </div>
      </div>
    </footer>
  )
}
