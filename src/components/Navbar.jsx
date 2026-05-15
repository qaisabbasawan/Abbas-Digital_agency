import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import {
  Globe, ShoppingCart, Smartphone,
  Bot, TrendingUp, Palette, ChevronDown,
} from 'lucide-react'
import Logo from './Logo'

/* ── Services dropdown items ── */
const serviceItems = [
  { Icon: Globe,        label: 'Web Development',   sub: 'WordPress, React & Next.js',       color: '#2E55E0', path: '/services/web-development' },
  { Icon: ShoppingCart, label: 'E-Commerce',         sub: 'Shopify, WooCommerce & Amazon',     color: '#E8155A', path: '/services/ecommerce' },
  { Icon: Smartphone,   label: 'Mobile Apps',        sub: 'Native iOS & Android',              color: '#7C3AED', path: '/services/mobile-apps' },
  { Icon: Bot,          label: 'AI & Chatbots',      sub: 'WhatsApp bots & GPT integrations',  color: '#0891B2', path: '/services/ai-chatbots' },
  { Icon: TrendingUp,   label: 'Digital Marketing',  sub: 'SEO, Google Ads & Social Media',    color: '#059669', path: '/services/digital-marketing' },
  { Icon: Palette,      label: 'Branding & Design',  sub: 'Logo, identity & UI/UX',            color: '#D97706', path: '/services/branding-design' },
]

const navLinks = [
  { label: 'Home',      path: '/' },
  { label: 'About',     path: '/about' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Blog',      path: '/blog' },
  { label: 'Contact',   path: '/contact' },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [dropOpen,   setDropOpen]   = useState(false)
  const [mobileServOpen, setMobileServOpen] = useState(false)
  const location = useLocation()
  const dropRef  = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setDropOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  /* Slight delay on close so user can move into the panel */
  const openDrop  = () => { clearTimeout(timerRef.current); setDropOpen(true)  }
  const closeDrop = () => { timerRef.current = setTimeout(() => setDropOpen(false), 120) }

  const isServicesActive = location.pathname === '/services'

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? 'bg-bg-dark/95 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link to="/" aria-label="Home">
            <Logo size="sm" />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">

            {/* Home */}
            {navLinks.slice(0, 1).map(l => {
              const active = location.pathname === l.path
              return (
                <Link
                  key={l.label}
                  to={l.path}
                  className={`relative text-xs tracking-[0.18em] uppercase transition-colors duration-200 py-1 ${
                    active ? 'text-white' : 'text-white/50 hover:text-white/90'
                  }`}
                >
                  {l.label}
                  {active && (
                    <motion.span layoutId="nav-underline" className="absolute -bottom-0.5 left-0 right-0 h-px bg-brand-pink" />
                  )}
                </Link>
              )
            })}

            {/* About */}
            {navLinks.slice(1, 2).map(l => {
              const active = location.pathname === l.path
              return (
                <Link
                  key={l.label}
                  to={l.path}
                  className={`relative text-xs tracking-[0.18em] uppercase transition-colors duration-200 py-1 ${
                    active ? 'text-white' : 'text-white/50 hover:text-white/90'
                  }`}
                >
                  {l.label}
                  {active && (
                    <motion.span layoutId="nav-underline" className="absolute -bottom-0.5 left-0 right-0 h-px bg-brand-pink" />
                  )}
                </Link>
              )
            })}

            {/* Services — dropdown trigger */}
            <div
              ref={dropRef}
              className="relative"
              onMouseEnter={openDrop}
              onMouseLeave={closeDrop}
            >
              <Link
                to="/services"
                className={`relative flex items-center gap-1 text-xs tracking-[0.18em] uppercase transition-colors duration-200 py-1 ${
                  isServicesActive ? 'text-white' : 'text-white/50 hover:text-white/90'
                }`}
              >
                Services
                <motion.span
                  animate={{ rotate: dropOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={12} strokeWidth={2} />
                </motion.span>
                {isServicesActive && (
                  <motion.span layoutId="nav-underline" className="absolute -bottom-0.5 left-0 right-0 h-px bg-brand-pink" />
                )}
              </Link>

              {/* Dropdown panel */}
              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={openDrop}
                    onMouseLeave={closeDrop}
                    className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[520px] rounded-2xl overflow-hidden"
                    style={{
                      background: 'rgba(5, 9, 26, 0.97)',
                      backdropFilter: 'blur(24px)',
                      WebkitBackdropFilter: 'blur(24px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
                    }}
                  >
                    {/* Arrow pointer */}
                    <div
                      className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                      style={{
                        background: 'rgba(5,9,26,0.97)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderBottom: 'none',
                        borderRight: 'none',
                      }}
                    />

                    <div className="p-4 grid grid-cols-2 gap-1">
                      {serviceItems.map(({ Icon, label, sub, color, path }, i) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04, duration: 0.22 }}
                        >
                          <Link
                            to={path}
                            onClick={() => setDropOpen(false)}
                            className="group flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-white/[0.05]"
                          >
                            {/* Icon */}
                            <div
                              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 group-hover:scale-110"
                              style={{
                                background: `${color}18`,
                                border: `1px solid ${color}30`,
                              }}
                            >
                              <Icon size={16} style={{ color }} strokeWidth={1.8} />
                            </div>
                            {/* Text */}
                            <div>
                              <p className="text-white text-[13px] font-semibold leading-tight mb-0.5 group-hover:text-white transition-colors">
                                {label}
                              </p>
                              <p className="text-white/40 text-[11px] leading-snug">{sub}</p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Footer strip */}
                    <div className="px-4 py-3 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-white/30 text-[11px]">All 6 services available</span>
                      <Link
                        to="/services"
                        onClick={() => setDropOpen(false)}
                        className="text-brand-pink text-[11px] tracking-wide hover:underline"
                      >
                        View all services →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Portfolio & Contact */}
            {navLinks.slice(2).map(l => {
              const active = location.pathname === l.path
              return (
                <Link
                  key={l.label}
                  to={l.path}
                  className={`relative text-xs tracking-[0.18em] uppercase transition-colors duration-200 py-1 ${
                    active ? 'text-white' : 'text-white/50 hover:text-white/90'
                  }`}
                >
                  {l.label}
                  {active && (
                    <motion.span layoutId="nav-underline" className="absolute -bottom-0.5 left-0 right-0 h-px bg-brand-pink" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* CTA */}
          <Link
            to="/contact"
            className="hidden lg:inline-flex items-center gap-2 shimmer-btn px-5 py-2.5 text-xs tracking-[0.15em] uppercase text-white font-medium hover:opacity-90 transition-opacity duration-200"
          >
            Start a Project
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="lg:hidden flex flex-col justify-center gap-[6px] p-2 w-10 h-10"
            aria-label="Menu"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 7 }  : { rotate: 0, y: 0 }}  className="block w-6 h-px bg-white origin-center" />
            <motion.span animate={menuOpen ? { opacity: 0 }         : { opacity: 1 }}        className="block w-6 h-px bg-white" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}  className="block w-6 h-px bg-white origin-center" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-bg-dark/98 border-b border-white/[0.06]"
          >
            <nav className="px-6 py-5 flex flex-col">
              {/* Home */}
              {[{ label: 'Home', path: '/' }, { label: 'About', path: '/about' }].map((l, i) => (
                <motion.div key={l.label} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <Link
                    to={l.path}
                    className={`flex items-center justify-between py-3.5 border-b border-white/[0.06] text-sm tracking-widest uppercase ${
                      location.pathname === l.path ? 'text-white' : 'text-white/50'
                    }`}
                  >
                    {l.label}
                    {location.pathname === l.path && <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />}
                  </Link>
                </motion.div>
              ))}

              {/* Services accordion */}
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}>
                <button
                  onClick={() => setMobileServOpen(v => !v)}
                  className="w-full flex items-center justify-between py-3.5 border-b border-white/[0.06] text-sm tracking-widest uppercase text-white/50"
                >
                  Services
                  <motion.span animate={{ rotate: mobileServOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={14} strokeWidth={2} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {mobileServOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="py-2 pl-2 space-y-1">
                        {serviceItems.map(({ Icon, label, color, path }) => (
                          <Link
                            key={label}
                            to={path}
                            className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-white/[0.04] transition-colors"
                          >
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                            >
                              <Icon size={13} style={{ color }} strokeWidth={1.8} />
                            </div>
                            <span className="text-white/70 text-sm">{label}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Portfolio, Blog & Contact */}
              {[{ label: 'Portfolio', path: '/portfolio' }, { label: 'Blog', path: '/blog' }, { label: 'Contact', path: '/contact' }].map((l, i) => (
                <motion.div key={l.label} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (i + 3) * 0.06 }}>
                  <Link
                    to={l.path}
                    className={`flex items-center justify-between py-3.5 border-b border-white/[0.06] text-sm tracking-widest uppercase ${
                      location.pathname === l.path ? 'text-white' : 'text-white/50'
                    }`}
                  >
                    {l.label}
                    {location.pathname === l.path && <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />}
                  </Link>
                </motion.div>
              ))}

              <Link
                to="/contact"
                className="mt-5 shimmer-btn py-3 text-center text-xs tracking-widest uppercase text-white"
              >
                Start a Project
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
