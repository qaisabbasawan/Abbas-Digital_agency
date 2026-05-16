import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import Logo from './Logo'

const navLinks = [
  { label: 'Home',      path: '/' },
  { label: 'About',     path: '/about' },
  { label: 'Services',  path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Blog',      path: '/blog' },
  { label: 'Contact',   path: '/contact' },
]

const services = [
  { label: 'Web Development',  path: '/services/web-development' },
  { label: 'E-Commerce',       path: '/services/ecommerce' },
  { label: 'Mobile Apps',      path: '/services/mobile-apps' },
  { label: 'AI & Chatbots',    path: '/services/ai-chatbots' },
  { label: 'Digital Marketing', path: '/services/digital-marketing' },
  { label: 'Branding & Design', path: '/services/branding-design' },
]

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/AbbasDigitalAgency',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/AbbasDigitalAgency',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/abbas-digital-agency',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

const addresses = [
  {
    phone: '0300 593 5125',
    type: 'Visit Us',
    lines: ['H 1-A, IVY Street, Banigala,', 'Islamabad, Pakistan'],
  },
  {
    phone: '+1 843 733 0701',
    type: 'Mailing Address',
    lines: ['1001 S MAIN ST STE 500,', 'KALISPELL, MT 59901, USA'],
  },
]

export default function Footer() {
  return (
    <footer className="bg-bg-dark border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16 border-b border-white/[0.06]">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo size="sm" />
            <p className="text-white/35 text-[13px] leading-relaxed mt-4 mb-6 max-w-[220px]">
              Your Digital Partner Towards Success. Building Digital Futures Since 2012.
            </p>
            <div className="flex gap-2">
              {socials.map(({ svg, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 hover:bg-white/[0.08] transition-all duration-200"
                >
                  {svg}
                </a>
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
                <li key={s.label}>
                  <Link to={s.path} className="text-white/50 text-[13px] hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-0 h-px bg-brand-pink group-hover:w-3 transition-all duration-300" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Addresses */}
          <div>
            <h4 className="text-white/35 text-[11px] uppercase tracking-[0.22em] mb-5">Find Us</h4>
            {/* Email */}
            <div className="flex items-center gap-2 mb-5">
              <Mail size={12} className="text-brand-pink shrink-0" />
              <a href="mailto:info@abbasdigitalagency.com" className="text-white/50 text-[12px] hover:text-white/80 transition-colors">
                info@abbasdigitalagency.com
              </a>
            </div>
            <div className="space-y-6">
              {addresses.map((a) => (
                <div key={a.type}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Phone size={12} className="text-brand-pink shrink-0" />
                    <span className="text-white/80 text-[13px] font-medium">{a.phone}</span>
                  </div>
                  <p className="text-brand-pink text-[10px] tracking-[0.18em] uppercase mb-1.5 pl-5">{a.type}</p>
                  <div className="flex items-start gap-2 pl-5">
                    <MapPin size={12} className="text-white/25 shrink-0 mt-0.5" />
                    <div>
                      {a.lines.map(line => (
                        <p key={line} className="text-white/40 text-[12px] leading-snug">{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5">
          <p className="text-white/25 text-[12px]">
            © {new Date().getFullYear()} Abbas Digital Agency. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
