import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import {
  Globe, ShoppingCart, Smartphone,
  Bot, TrendingUp, Palette, ChevronDown, BarChart2,
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
    // Lenis owns the scroll position when smooth scrolling is active
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
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
        scrolled || menuOpen ? 'bg-bg-dark/95 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'
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
                  data-hc-link="about"
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
                data-hc-link="services"
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
                    initial={{ opacity: 0, y: 12, scale: 0.96, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: 8, scale: 0.97, filter: 'blur(4px)' }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={openDrop}
                    onMouseLeave={closeDrop}
                    className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[660px] rounded-3xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(165deg, rgba(13,20,48,0.98), rgba(5,9,26,0.98))',
                      backdropFilter: 'blur(28px)',
                      WebkitBackdropFilter: 'blur(28px)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      boxShadow: '0 32px 90px rgba(0,0,0,0.65), 0 0 60px rgba(46,85,224,0.08), 0 0 0 1px rgba(255,255,255,0.04)',
                    }}
                  >
                    {/* top sheen */}
                    <div
                      className="absolute top-0 left-12 right-12 h-px"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
                    />
                    {/* dot grid */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
                        backgroundSize: '22px 22px',
                        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 80%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 80%)',
                      }}
                    />

                    <div className="relative grid grid-cols-[210px_1fr]">
                      {/* ── Featured panel ── */}
                      <div
                        className="relative p-5 flex flex-col border-r border-white/[0.06] overflow-hidden"
                        style={{ background: 'linear-gradient(180deg, rgba(46,85,224,0.14), rgba(232,21,90,0.09))' }}
                      >
                        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-brand-pink/20 blur-3xl pointer-events-none" />
                        <span className="inline-flex self-start px-2.5 py-1 rounded-full text-[9px] font-bold tracking-[0.22em] uppercase text-brand-pink mb-5"
                          style={{ background: 'rgba(232,21,90,0.12)', border: '1px solid rgba(232,21,90,0.35)' }}>
                          Featured
                        </span>

                        {/* mini spinning orb */}
                        <div className="relative w-14 h-14 mb-4">
                          <div
                            className="absolute inset-0 rounded-full animate-spin-slow"
                            style={{
                              background: 'conic-gradient(from 0deg, transparent 15%, #E8155A 40%, transparent 65%)',
                              WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
                              mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
                            }}
                          />
                          <div
                            className="absolute inset-[5px] rounded-full flex items-center justify-center"
                            style={{
                              background: 'radial-gradient(circle at 32% 28%, rgba(232,21,90,0.5), rgba(46,85,224,0.25))',
                              boxShadow: '0 0 24px rgba(232,21,90,0.35)',
                            }}
                          >
                            <BarChart2 size={20} color="#fff" strokeWidth={1.8} />
                          </div>
                        </div>

                        <p className="text-white text-[14px] font-bold leading-snug mb-1.5">AI Business Analyzer</p>
                        <p className="text-white/45 text-[11.5px] leading-relaxed flex-1">
                          Get a free AI-generated growth report for your business in 2 minutes.
                        </p>
                        <Link
                          to="/analyzer"
                          onClick={() => setDropOpen(false)}
                          className="mt-4 inline-flex items-center gap-1.5 text-brand-pink text-[11.5px] font-semibold tracking-wide hover:gap-3 transition-all duration-300"
                        >
                          Try it free →
                        </Link>
                      </div>

                      {/* ── Service items ── */}
                      <div className="p-3 grid grid-cols-2 gap-1 content-start">
                        {serviceItems.map(({ Icon, label, sub, color, path }, i) => (
                          <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.06 + i * 0.045, duration: 0.25 }}
                          >
                            <Link
                              to={path}
                              onClick={() => setDropOpen(false)}
                              className="group relative flex items-start gap-3 p-3 rounded-xl transition-all duration-250 hover:bg-white/[0.05]"
                            >
                              {/* hover accent bar */}
                              <span
                                className="absolute left-0 top-2.5 bottom-2.5 w-[2.5px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-250"
                                style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                              />
                              {/* Icon chip */}
                              <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all duration-250 group-hover:scale-110 group-hover:-rotate-3"
                                style={{
                                  background: `${color}16`,
                                  border: `1px solid ${color}35`,
                                  boxShadow: `0 0 14px ${color}1E`,
                                }}
                              >
                                <Icon size={16} style={{ color }} strokeWidth={1.8} />
                              </div>
                              {/* Text */}
                              <div className="flex-1 min-w-0">
                                <p className="text-white text-[13px] font-semibold leading-tight mb-0.5 flex items-center gap-1.5">
                                  {label}
                                  <ChevronDown
                                    size={11}
                                    className="-rotate-90 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-250"
                                  />
                                </p>
                                <p className="text-white/40 text-[11px] leading-snug">{sub}</p>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Footer strip */}
                    <div className="relative px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-white/30 text-[11px] inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        All 6 services · available now
                      </span>
                      <Link
                        to="/services"
                        onClick={() => setDropOpen(false)}
                        className="group inline-flex items-center gap-1.5 text-brand-pink text-[11px] tracking-wide font-semibold hover:gap-3 transition-all duration-300"
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
                  data-hc-link={l.label.toLowerCase()}
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
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/analyzer"
              data-hc-link="analyzer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] tracking-[0.1em] font-medium text-brand-pink transition-all duration-200 hover:bg-brand-pink/10"
              style={{ border: '1px solid rgba(232,21,90,0.4)' }}
            >
              <BarChart2 size={12} strokeWidth={2} />
              AI Business Analyzer
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 shimmer-btn px-5 py-2.5 text-xs tracking-[0.15em] uppercase text-white font-medium hover:opacity-90 transition-opacity duration-200"
            >
              Start a Project
            </Link>
          </div>

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
                to="/analyzer"
                className="mt-5 flex items-center justify-center gap-2 py-3 rounded-xl text-[12px] font-medium text-brand-pink"
                style={{ border: '1px solid rgba(232,21,90,0.35)', background: 'rgba(232,21,90,0.07)' }}
              >
                <BarChart2 size={13} /> AI Business Analyzer
              </Link>
              <Link
                to="/contact"
                className="mt-2 shimmer-btn py-3 text-center text-xs tracking-widest uppercase text-white"
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
