import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Globe, ShoppingCart, Smartphone,
  Bot, TrendingUp, Palette, ArrowUpRight,
} from 'lucide-react'
import RevealText from './anim/RevealText'
import TiltCard from './anim/TiltCard'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    Icon: Globe,
    title: 'Web Development',
    desc: 'Custom WordPress, WooCommerce and React/Next.js websites built for performance, SEO, and conversions.',
    color: '#2E55E0',
  },
  {
    Icon: ShoppingCart,
    title: 'E-Commerce',
    desc: 'Shopify, WooCommerce, Amazon and eBay stores with seamless payment integration and conversion optimisation.',
    color: '#E8155A',
  },
  {
    Icon: Smartphone,
    title: 'Mobile Apps',
    desc: 'Native iOS and Android apps from concept to App Store launch. Great UX, clean code, ongoing support.',
    color: '#7C3AED',
  },
  {
    Icon: Bot,
    title: 'AI & Chatbots',
    desc: 'WhatsApp and Facebook chatbots, ChatGPT integrations and smart automation that works around the clock.',
    color: '#0891B2',
  },
  {
    Icon: TrendingUp,
    title: 'Digital Marketing',
    desc: 'SEO, Google Ads, social media management and email campaigns designed to drive qualified traffic and real ROI.',
    color: '#059669',
  },
  {
    Icon: Palette,
    title: 'Branding & Design',
    desc: 'Logo design, brand identity, UI/UX and marketing materials that make your business unforgettable.',
    color: '#D97706',
  },
]

/* ── One tall 3D glass card ── */
function ServiceCard({ Icon, title, desc, color, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="shrink-0 w-[84vw] sm:w-[420px] lg:w-[395px]"
    >
      <TiltCard max={8} glareColor={`${color}29`}>
        <Link
          to="/services"
          className="group relative flex flex-col h-[480px] p-9 rounded-3xl overflow-hidden"
          style={{
            background: `linear-gradient(165deg, ${color}16 0%, rgba(255,255,255,0.015) 42%), rgba(8,14,42,0.55)`,
            border: `1px solid ${color}30`,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          {/* Hover: deep colour glow from the top */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: `radial-gradient(120% 60% at 50% 0%, ${color}26, transparent 65%)` }}
          />
          {/* Hover: accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
          />

          {/* Ghost index */}
          <span
            className="absolute top-7 right-8 font-bold leading-none select-none transition-all duration-500 group-hover:scale-110"
            style={{ fontSize: 72, color: `${color}22`, WebkitTextStroke: `1px ${color}30` }}
          >
            0{i + 1}
          </span>

          {/* Icon orb with spinning energy ring */}
          <div className="relative w-[88px] h-[88px] mb-auto">
            <div
              className="absolute inset-0 rounded-full animate-spin-slow"
              style={{
                background: `conic-gradient(from 0deg, transparent 12%, ${color} 38%, transparent 64%)`,
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
              }}
            />
            <div
              className="absolute inset-[3px] rounded-full border"
              style={{ borderColor: `${color}28` }}
            />
            <div
              className="absolute inset-2.5 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
              style={{
                background: `radial-gradient(circle at 32% 28%, ${color}70, ${color}16 70%)`,
                boxShadow: `0 0 34px ${color}45, inset 0 1px 0 rgba(255,255,255,0.18)`,
              }}
            >
              <Icon size={27} color="#fff" strokeWidth={1.7} />
            </div>
          </div>

          {/* Text */}
          <h3 className="text-white font-bold text-[26px] leading-tight mb-3 mt-8">{title}</h3>
          <p className="text-white/50 text-[14.5px] leading-relaxed mb-7">{desc}</p>

          {/* CTA */}
          <span
            className="inline-flex items-center gap-2 text-[11.5px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 group-hover:gap-3.5"
            style={{ color }}
          >
            Explore Service
            <span
              className="flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 group-hover:rotate-45"
              style={{ border: `1px solid ${color}55`, background: `${color}14` }}
            >
              <ArrowUpRight size={13} strokeWidth={2} />
            </span>
          </span>
        </Link>
      </TiltCard>
    </motion.div>
  )
}

/* ── "What We Do" — pinned horizontal showcase on desktop,
     vertical stack on mobile ── */
export default function Services() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const track = trackRef.current
      const amount = () => track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: () => -amount(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${amount()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      gsap.fromTo(progressRef.current, { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${amount()}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="relative bg-bg-dark overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-0 w-[480px] h-[480px] bg-brand-blue/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-brand-pink/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div
        ref={trackRef}
        className="relative flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-7 py-24 lg:py-0 lg:h-screen lg:w-max px-5 lg:pl-[7vw] lg:pr-[9vw]"
      >
        {/* Intro panel — first stop of the journey */}
        <div className="shrink-0 w-full sm:w-[420px] lg:w-[400px] lg:pr-8 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4"
          >
            What We Do
          </motion.p>
          <RevealText
            as="h2"
            className="font-bold text-white leading-[1.02] mb-6"
            style={{ fontSize: 'clamp(2.4rem, 4.6vw, 4rem)' }}
            stagger={0.08}
          >
            Six Crafts. One Standard.
          </RevealText>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-white/45 text-[15px] leading-relaxed mb-9 max-w-sm mx-auto lg:mx-0"
          >
            Every discipline your business needs to win online — engineered
            by one team, to one standard: excellence.
          </motion.p>

          {/* Scroll hint (desktop) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="hidden lg:flex items-center gap-4 text-white/30 text-[10.5px] uppercase tracking-[0.3em]"
          >
            Keep Scrolling
            <motion.svg
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              width="26" height="10" viewBox="0 0 26 10" fill="none"
            >
              <path d="M0 5h22M18 1l4 4-4 4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-9"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors duration-200 group"
            >
              View All Services
              <span className="w-5 h-px bg-white/30 group-hover:bg-white group-hover:w-8 transition-all duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* The six cards */}
        {services.map((s, i) => (
          <ServiceCard key={s.title} {...s} i={i} />
        ))}
      </div>

      {/* Horizontal progress line (desktop) */}
      <div className="hidden lg:block absolute bottom-9 left-1/2 -translate-x-1/2 w-[220px]">
        <div className="h-px bg-white/[0.08]" />
        <div
          ref={progressRef}
          className="h-[2px] -mt-[1.5px] origin-left rounded-full"
          style={{ background: 'linear-gradient(90deg, #2E55E0, #E8155A)', transform: 'scaleX(0)' }}
        />
      </div>
    </section>
  )
}
