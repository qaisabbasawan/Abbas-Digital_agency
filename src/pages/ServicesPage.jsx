import { useRef, useState, lazy } from 'react'
import SEO from '../components/SEO'
import { serviceSchema, breadcrumbSchema, faqSchema, speakablePageSchema } from '../lib/schema'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Globe, ShoppingCart, Smartphone, Bot, TrendingUp, Palette, Boxes,
  ArrowRight, ArrowUpRight, ArrowDown, Zap, Users, Award, Clock, Check,
  Search, PenTool, Rocket, LineChart,
} from 'lucide-react'
import Footer from '../components/Footer'
import FAQ from '../components/FAQ'
import RevealText from '../components/anim/RevealText'
import TiltCard from '../components/anim/TiltCard'
import Magnetic from '../components/anim/Magnetic'
import useCountUp from '../hooks/useCountUp'
import { HOMEPAGE_FAQS } from '../data/faqs'
import SceneGate, { SceneFallback } from '../components/SceneGate'

/* three.js scene: loaded only on GPU-capable devices, after the page is interactive (see SceneGate) */
const ServicesScene = lazy(() => import('../components/ServicesScene'))

/* ── Service data ──
   `includes` mirrors the feature list on each /services/:slug page;
   `wide` cards span two columns in the desktop bento grid and show
   each included item as a tile with its one-line `notes` entry. */
const services = [
  {
    n: '01', Icon: Globe, title: 'Web Development', sub: 'WordPress, React & Next.js',
    color: '#2E55E0', slug: 'web-development', wide: true,
    includes: ['Custom Design', 'WordPress & WooCommerce', 'React & Next.js', 'SEO-First Structure'],
    notes: ['Designs crafted around your brand', 'Custom themes and an easy admin', 'Fast apps with SSR and live APIs', 'Core Web Vitals and schema built in'],
    desc: 'Custom WordPress, WooCommerce and React/Next.js websites built for performance, SEO and conversions.',
  },
  {
    n: '02', Icon: ShoppingCart, title: 'E-Commerce', sub: 'Shopify, WooCommerce & Amazon',
    color: '#E8155A', slug: 'ecommerce',
    includes: ['Shopify Development', 'WooCommerce Stores', 'Amazon & eBay Setup', 'CRO & A/B Testing'],
    desc: 'End-to-end online stores on Shopify, WooCommerce, Amazon and eBay — from setup to conversion optimisation.',
  },
  {
    n: '03', Icon: Smartphone, title: 'Mobile Apps', sub: 'Native iOS & Android',
    color: '#7C3AED', slug: 'mobile-apps',
    includes: ['iOS Development', 'Android Development', 'React Native', 'Post-Launch Support'],
    desc: 'Native iOS and Android apps from concept to App Store with clean code and ongoing post-launch support.',
  },
  {
    n: '04', Icon: Bot, title: 'AI & Chatbots', sub: 'WhatsApp Bots & GPT Integrations',
    color: '#0891B2', slug: 'ai-chatbots',
    includes: ['WhatsApp Chatbots', 'ChatGPT / GPT-4', 'Workflow Automation', 'CRM Integration'],
    desc: 'WhatsApp and Facebook chatbots, ChatGPT integrations and workflow automations saving hours every day.',
  },
  {
    n: '05', Icon: TrendingUp, title: 'Digital Marketing', sub: 'SEO, Google Ads & Social Media',
    color: '#059669', slug: 'digital-marketing',
    includes: ['SEO', 'Google Ads', 'Meta & Social Ads', 'Email Marketing'],
    desc: 'SEO, Google Ads, social media and email campaigns designed to drive qualified traffic and real ROI.',
  },
  {
    n: '06', Icon: Palette, title: 'Branding & Design', sub: 'Logo, Identity & UI/UX',
    color: '#D97706', slug: 'branding-design',
    includes: ['Logo Design', 'Brand Identity', 'UI/UX Design', 'Brand Guidelines'],
    desc: 'Logo design, full brand identity, UI/UX and marketing materials that make your business unforgettable.',
  },
  {
    n: '07', Icon: Boxes, title: 'ERP Solutions', sub: 'Modular, AI-Powered ERP',
    color: '#4F46E5', slug: 'erp-solutions', wide: true,
    includes: ['6 Core Modules', 'AI Demand Forecasting', 'Fraud & Error Detection', 'Multilingual AI Chatbot'],
    notes: ['HR, inventory, sales, finance and more', 'Predictions from 3 months of data', 'Real-time anomaly detection', 'Ask your ERP in any language'],
    desc: 'Cloud-native, modular ERP with AI demand forecasting, real-time fraud detection and a multilingual chatbot — built on Next.js + Supabase.',
  },
]

/* ── Spinning energy ring icon orb ── */
function IconOrb({ Icon, color, size = 60, iconSize = 22 }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full animate-spin-slow"
        style={{
          background: `conic-gradient(from 0deg, transparent 15%, ${color} 40%, transparent 65%)`,
          WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
          mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
        }}
      />
      <div
        className="absolute inset-[5px] rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
        style={{
          background: `radial-gradient(circle at 32% 28%, ${color}66, ${color}14 72%)`,
          boxShadow: `0 0 26px ${color}40`,
        }}
      >
        <Icon size={iconSize} color="#fff" strokeWidth={1.7} />
      </div>
    </div>
  )
}

/* ── Floating glass stat panel with count-up ── */
function HeroStat({ value, suffix, label, color, i }) {
  const { count, ref } = useCountUp(value, 1800)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 + i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.2 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.45 }}
        className="px-7 py-5 rounded-2xl text-center"
        style={{
          background: 'rgba(8,14,42,0.45)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: `1px solid ${color}35`,
          boxShadow: `0 10px 36px rgba(0,0,0,0.35), 0 0 22px ${color}1C, inset 0 1px 0 rgba(255,255,255,0.07)`,
        }}
      >
        <div className="font-bold text-white text-[26px] tracking-tight leading-none">
          {count}<span style={{ color }}>{suffix}</span>
        </div>
        <div className="text-white/35 text-[10px] uppercase tracking-[0.2em] mt-2">{label}</div>
      </motion.div>
    </motion.div>
  )
}

/* ── CTA button that fires a particle burst on hover ── */
function BurstButton({ children }) {
  const [bursts, setBursts] = useState([])
  const fire = () => {
    const id = Date.now()
    setBursts(b => [...b, id])
    setTimeout(() => setBursts(b => b.filter(x => x !== id)), 900)
  }
  return (
    <span className="relative inline-block" onMouseEnter={fire}>
      {children}
      {bursts.map(id =>
        Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI * 2
          const d = 52 + (i % 3) * 16
          return (
            <motion.span
              key={`${id}-${i}`}
              initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: 0, x: Math.cos(a) * d, y: Math.sin(a) * d, scale: 0.2 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full pointer-events-none z-20"
              style={{
                background: i % 2 ? '#FF2D72' : '#7C3AED',
                boxShadow: `0 0 10px ${i % 2 ? '#FF2D72' : '#7C3AED'}`,
              }}
            />
          )
        })
      )}
    </span>
  )
}

/* ── One service card in the bento grid ── */
function ServiceCard({ svc, i }) {
  const { Icon, color, wide } = svc
  return (
    <motion.div
      id={svc.slug}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`scroll-mt-28 h-full ${wide ? 'lg:col-span-2' : ''}`}
    >
      <Link
        to={`/services/${svc.slug}`}
        className="group relative flex flex-col h-full p-7 sm:p-8 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-4"
        style={{
          background: `linear-gradient(155deg, ${color}1F 0%, rgba(255,255,255,0.02) 46%), rgba(10,16,44,0.72)`,
          border: `1px solid ${color}33`,
          boxShadow: '0 20px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
          outlineColor: color,
        }}
      >
        {/* hover glow + accent line */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(120% 70% at 20% 0%, ${color}2E, transparent 62%)` }}
        />
        <div
          className="absolute top-0 left-8 right-8 h-px opacity-40 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />

        <div className={`relative flex flex-col h-full ${wide ? 'lg:grid lg:grid-cols-[1fr_1.15fr] lg:gap-10' : ''}`}>
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-6">
              <IconOrb Icon={Icon} color={color} size={56} iconSize={21} />
              <span
                className="font-bold leading-none select-none"
                style={{ fontSize: 46, color: 'transparent', WebkitTextStroke: `1.2px ${color}66` }}
              >
                {svc.n}
              </span>
            </div>
            <h3 className="text-white font-bold leading-tight text-[22px] sm:text-[24px] mb-1.5">{svc.title}</h3>
            <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase mb-4" style={{ color }}>{svc.sub}</p>
            <p className="text-white/60 text-[14.5px] leading-relaxed">{svc.desc}</p>
          </div>

          <div className={`flex flex-col ${wide ? 'lg:justify-center' : ''}`}>
            {svc.notes ? (
              <ul className="grid sm:grid-cols-2 gap-3 mt-6 mb-7 lg:mt-0">
                {svc.includes.map((item, k) => (
                  <li
                    key={item}
                    className="p-4 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}26` }}
                  >
                    <span className="flex items-center gap-2 text-white text-[13.5px] font-semibold mb-1">
                      <Check size={13} strokeWidth={3} style={{ color }} />
                      {item}
                    </span>
                    <span className="block text-white/50 text-[12.5px] leading-snug">{svc.notes[k]}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="grid sm:grid-cols-2 gap-2.5 mt-6 mb-7">
                {svc.includes.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-white/75 text-[13.5px] leading-snug">
                    <span
                      className="mt-0.5 flex items-center justify-center w-4.5 h-4.5 rounded-full shrink-0"
                      style={{ background: `${color}22`, border: `1px solid ${color}55` }}
                    >
                      <Check size={10} strokeWidth={3} style={{ color }} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            )}

            <span
              className="mt-auto inline-flex items-center gap-2.5 text-[11.5px] tracking-[0.2em] uppercase font-bold w-fit transition-all duration-300 group-hover:gap-4"
              style={{ color }}
            >
              Explore {svc.title}
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300 group-hover:rotate-45"
                style={{ border: `1px solid ${color}66`, background: `${color}18` }}
              >
                <ArrowUpRight size={14} strokeWidth={2.2} />
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

/* ── All services at a glance ── */
function ServicesGrid() {
  return (
    <section id="services" className="scroll-mt-20 py-20 lg:py-28 bg-bg-dark relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 20%, transparent 75%)',
        }}
      />
      <div className="absolute -top-20 left-1/4 w-[480px] h-[480px] rounded-full bg-brand-blue/8 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-brand-pink/6 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4"
            >
              What We Do
            </motion.p>
            <h2 className="font-bold leading-[1.05]" style={{ fontSize: 'clamp(2.1rem, 4.4vw, 3.5rem)' }}>
              <RevealText as="span" className="text-white inline-block" stagger={0.07}>
                Seven Services.
              </RevealText>{' '}
              <RevealText as="span" className="inline-block" gradient delay={0.22} stagger={0.09}>
                One Team.
              </RevealText>
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-white/50 text-[15px] leading-relaxed max-w-md"
          >
            Pick one service or combine several — strategy, design, build and growth all
            happen under one roof, so nothing gets lost between agencies.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => <ServiceCard key={svc.slug} svc={svc} i={i} />)}
        </div>
      </div>
    </section>
  )
}

/* ── Timelines & pricing at a glance — figures match the site FAQs ── */
const AT_A_GLANCE = [
  { slug: 'web-development',   time: '2–4 weeks',                 price: 'Fixed quote · business sites from around $500' },
  { slug: 'ecommerce',         time: '2–10 weeks, by catalogue',  price: 'Fixed quote per store' },
  { slug: 'mobile-apps',       time: '6–12 weeks',                price: 'Fixed quote per app' },
  { slug: 'ai-chatbots',       time: 'Agreed at consultation',    price: 'Fixed quote per bot or workflow' },
  { slug: 'digital-marketing', time: 'Ongoing',                   price: 'Monthly retainer' },
  { slug: 'branding-design',   time: '1–3 weeks',                 price: 'Fixed quote per project' },
  { slug: 'erp-solutions',     time: '6–12 weeks',                price: 'Priced per module' },
]

function AtAGlance() {
  return (
    <section className="py-20 lg:py-24 bg-bg-dark relative border-t border-white/6">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-10">
          <p className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4">At a Glance</p>
          <h2 className="font-bold leading-[1.08] text-white" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.9rem)' }}>
            How Long Does Each Service Take, and How Is It Priced?
          </h2>
          <p className="text-white/50 text-[15px] leading-relaxed max-w-xl mx-auto mt-4">
            Every project starts with a free consultation and a fixed written quote before any work begins.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto rounded-2xl border border-white/10"
        >
          <table className="w-full min-w-[560px] text-left text-[14px]">
            <caption className="sr-only">Typical timeline and pricing model for each Abbas Digital Agency service</caption>
            <thead>
              <tr className="bg-white/4 text-white/45 text-[11px] uppercase tracking-[0.16em]">
                <th scope="col" className="px-5 py-4 font-semibold">Service</th>
                <th scope="col" className="px-5 py-4 font-semibold">Typical timeline</th>
                <th scope="col" className="px-5 py-4 font-semibold">Pricing</th>
              </tr>
            </thead>
            <tbody>
              {AT_A_GLANCE.map(row => {
                const svc = services.find(x => x.slug === row.slug)
                return (
                  <tr key={row.slug} className="border-t border-white/8">
                    <th scope="row" className="px-5 py-4 font-semibold text-white">
                      <Link to={`/services/${svc.slug}`} className="inline-flex items-center gap-2.5 hover:underline">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: svc.color }} />
                        {svc.title}
                      </Link>
                    </th>
                    <td className="px-5 py-4 text-white/70">{row.time}</td>
                    <td className="px-5 py-4 text-white/70">{row.price}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}

/* ── How an engagement runs ── */
const STEPS = [
  { Icon: Search,    color: '#2E55E0', title: 'Discover',       desc: 'A free consultation to understand your goals, audience and competitors.' },
  { Icon: PenTool,   color: '#7C3AED', title: 'Plan & Design',  desc: 'A fixed written quote, clear timeline and designs you approve before we build.' },
  { Icon: Rocket,    color: '#E8155A', title: 'Build & Launch', desc: 'Clean, tested work delivered in milestones, with progress you can see.' },
  { Icon: LineChart, color: '#059669', title: 'Grow & Support', desc: 'Ongoing optimisation, maintenance and reporting long after go-live.' },
]

function ProcessStrip() {
  return (
    <section className="py-20 lg:py-28 bg-bg-dark relative overflow-hidden border-t border-white/6">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4"
          >
            How We Work
          </motion.p>
          <h2 className="font-bold leading-[1.05]" style={{ fontSize: 'clamp(2.1rem, 4.2vw, 3.3rem)' }}>
            <RevealText as="span" className="text-white inline-block" stagger={0.07}>
              From First Call
            </RevealText>{' '}
            <RevealText as="span" className="inline-block" gradient delay={0.25} stagger={0.09}>
              to Launch.
            </RevealText>
          </h2>
        </div>

        <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* connector line behind the step badges (desktop) */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-[34px] left-[12%] right-[12%] h-px"
            style={{ background: 'linear-gradient(90deg, #2E55E0, #7C3AED, #E8155A, #059669)', opacity: 0.45 }}
          />
          {STEPS.map(({ Icon, color, title, desc }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-center lg:px-2"
            >
              <div className="relative mx-auto mb-5 w-[68px] h-[68px] rounded-2xl flex items-center justify-center bg-bg-dark"
                style={{ border: `1px solid ${color}55`, boxShadow: `0 0 28px ${color}26, inset 0 0 20px ${color}14` }}
              >
                <Icon size={24} style={{ color }} strokeWidth={1.8} />
                <span
                  className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full text-[10.5px] font-bold text-white flex items-center justify-center"
                  style={{ background: color }}
                >
                  {i + 1}
                </span>
              </div>
              <h3 className="text-white font-bold text-[18px] mb-2">{title}</h3>
              <p className="text-white/50 text-[14px] leading-relaxed max-w-[260px] mx-auto">{desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  const heroRef    = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <div className="min-h-screen bg-bg-dark pt-[72px]">
      <SEO
        title="Digital Marketing Services Pakistan | Abbas Digital Agency"
        description="SEO, web design, social media marketing, PPC & branding services for businesses in Pakistan & USA. US-registered agency. Get a free quote today."
        keywords="digital marketing services Pakistan, SEO services Pakistan, web design company Pakistan, social media marketing Pakistan, PPC advertising Pakistan, branding agency Pakistan"
        path="/services"
        image="/og/services.jpg"
        schema={[
          serviceSchema(
            'Digital Marketing Services',
            'SEO, web design, social media marketing, PPC and branding services for businesses in Pakistan and the USA, delivered by Abbas Digital Agency.',
            '/services',
          ),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
          faqSchema(HOMEPAGE_FAQS),
          speakablePageSchema('/services', 'Services — Abbas Digital Agency'),
        ]}
      />

      {/* ══════════════════════════════════
          HERO — atom scene contained here
      ══════════════════════════════════ */}
      <section className="relative pt-20 pb-24 lg:pt-24 lg:pb-32 overflow-hidden min-h-[86vh]" ref={heroRef}>

        <div className="absolute inset-0 z-0 pointer-events-none">
          <SceneGate fallback={<SceneFallback color="#2E55E0" accent="#7C3AED" className="left-[72%] top-[44%]" size="min(50vw, 380px)" />}>
            <ServicesScene />
          </SceneGate>
        </div>

        <div
          className="absolute inset-0 pointer-events-none z-1"
          style={{ background: 'linear-gradient(100deg, rgba(5,9,26,0.88) 35%, rgba(5,9,26,0.45) 62%, rgba(5,9,26,0.05) 100%)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-1"
          style={{ background: 'linear-gradient(to top, #05091A, transparent)' }}
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-brand-pink text-[11px] tracking-[0.32em] uppercase mb-6"
          >
            What We Do
          </motion.p>

          <h1 className="font-bold leading-none tracking-tight mb-7" style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}>
            <RevealText as="span" className="text-white block" stagger={0.09}>
              Seven Services.
            </RevealText>
            <RevealText as="span" className="block" gradient delay={0.3} stagger={0.08}>
              One Digital Vision.
            </RevealText>
          </h1>

          {/* visible in the pre-rendered HTML (slide only, no fade) — this paragraph is the Largest Contentful Paint */}
          <motion.p
            initial={{ y: 20 }}
            animate={heroInView ? { y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-white/55 text-[16px] leading-relaxed max-w-lg mb-9"
          >
            From your first pixel to your thousandth customer — we build, grow and scale
            digital experiences that deliver real business results.
          </motion.p>

          {/* primary actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8"
          >
            <Magnetic>
              <Link
                to="/contact"
                className="shimmer-btn inline-flex items-center gap-2.5 px-7 py-3.5 text-sm tracking-wide text-white font-medium hover:opacity-90 transition-opacity"
              >
                Get a Free Quote
                <ArrowRight size={15} strokeWidth={2} />
              </Link>
            </Magnetic>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm tracking-wide text-white/70 border border-white/15 hover:text-white hover:border-white/35 transition-all duration-250"
            >
              Explore Services
              <ArrowDown size={15} strokeWidth={2} />
            </a>
          </motion.div>

          {/* quick jump to a service */}
          <motion.nav
            aria-label="Jump to a service"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="flex flex-wrap gap-2 max-w-2xl mb-12"
          >
            {services.map(({ slug, title, color, Icon }) => (
              <a
                key={slug}
                href={`#${slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] text-white/65 hover:text-white transition-colors duration-200"
                style={{ background: `${color}14`, border: `1px solid ${color}40` }}
              >
                <Icon size={12} style={{ color }} strokeWidth={2} />
                {title}
              </a>
            ))}
          </motion.nav>

          <div className="flex flex-wrap gap-3 sm:gap-4 max-w-2xl">
            <HeroStat value={500} suffix="+" label="Projects" color="#2E55E0" i={0} />
            <HeroStat value={10}  suffix="+" label="Years"    color="#E8155A" i={1} />
            <HeroStat value={50}  suffix="+" label="Clients"  color="#7C3AED" i={2} />
            <HeroStat value={7}   suffix=""  label="Services" color="#059669" i={3} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SERVICES — all seven at a glance
      ══════════════════════════════════ */}
      <ServicesGrid />

      {/* ══════════════════════════════════
          AT A GLANCE — timelines & pricing table
      ══════════════════════════════════ */}
      <AtAGlance />

      {/* ══════════════════════════════════
          HOW WE WORK
      ══════════════════════════════════ */}
      <ProcessStrip />

      {/* ══════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════ */}
      <section className="py-20 lg:py-28 relative overflow-hidden bg-bg-dark">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(255,255,255,0.013)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }} />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-pink/5 blur-[120px] pointer-events-none" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] pointer-events-none hidden md:block" aria-hidden>
          <div
            className="absolute inset-0 rounded-full animate-spin-slower"
            style={{
              border: '1px solid rgba(255,255,255,0.05)',
              borderTopColor: 'rgba(232,21,90,0.3)',
              borderRightColor: 'rgba(46,85,224,0.22)',
            }}
          />
          <div
            className="absolute inset-20 rounded-full animate-spin-slow"
            style={{
              animationDirection: 'reverse',
              border: '1px dashed rgba(255,255,255,0.05)',
              borderBottomColor: 'rgba(124,58,237,0.28)',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4"
            >
              Why Abbas
            </motion.p>
            <h2 className="font-bold leading-[1.05]" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)' }}>
              <RevealText as="span" className="text-white inline-block" stagger={0.07}>
                Built to Deliver
              </RevealText>{' '}
              <RevealText as="span" className="inline-block" gradient delay={0.25} stagger={0.1}>
                Results.
              </RevealText>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ perspective: 1600 }}>
            {[
              { Icon: Clock, color: '#2E55E0', title: '10+ Years',       desc: 'A decade of delivering digital solutions that actually work.' },
              { Icon: Users, color: '#E8155A', title: '50+ Clients',     desc: 'Trusted by businesses across Pakistan, UAE and beyond.' },
              { Icon: Zap,   color: '#7C3AED', title: 'End-to-End',      desc: 'From strategy to launch to growth — all under one roof.' },
              { Icon: Award, color: '#D97706', title: 'Proven Results',  desc: '500+ projects delivered with real measurable impact.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  x: i < 2 ? -90 : 90,
                  rotateY: i < 2 ? -38 : 38,
                  scale: 0.9,
                }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: Math.abs(i - 1.5) * 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
                className="h-full"
              >
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 4.5 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                  className="h-full"
                >
                <TiltCard max={7} glareColor={`${item.color}22`}>
                  <div
                    className="group relative p-6 rounded-2xl overflow-hidden h-full"
                    style={{
                      background: `linear-gradient(150deg, ${item.color}10, transparent 45%), rgba(255,255,255,0.02)`,
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at 50% 0%, ${item.color}20, transparent 70%)` }}
                    />
                    <div className="mb-5">
                      <IconOrb Icon={item.Icon} color={item.color} size={52} iconSize={19} />
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                    <p className="text-white/45 text-[13px] leading-relaxed">{item.desc}</p>
                  </div>
                </TiltCard>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FAQ — pricing, timelines, location
      ══════════════════════════════════ */}
      <FAQ faqs={HOMEPAGE_FAQS} eyebrow="Before You Ask" heading="Services FAQs" />

      {/* ══════════════════════════════════
          CTA — hologram panel
      ══════════════════════════════════ */}
      <section className="py-20 lg:py-28 relative overflow-hidden bg-bg-dark">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(46,85,224,0.08) 0%, rgba(232,21,90,0.06) 100%)' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-brand-blue/[0.07] blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10" style={{ perspective: 1400 }}>

          <motion.div
            aria-hidden
            className="absolute -top-12 -left-4 lg:-left-14 w-11 h-11 rounded-xl border pointer-events-none"
            style={{ borderColor: 'rgba(46,85,224,0.45)', boxShadow: '0 0 22px rgba(46,85,224,0.25)' }}
            animate={{ y: [0, -16, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-8 -right-2 lg:-right-12 w-8 h-8 rounded-full border pointer-events-none"
            style={{ borderColor: 'rgba(232,21,90,0.5)', boxShadow: '0 0 20px rgba(232,21,90,0.3)' }}
            animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 90, rotateX: -22, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d', transformOrigin: '50% 100%' }}
          >
            <TiltCard max={4} glareColor="rgba(255,255,255,0.06)">
              {/* breathing border glow */}
              <motion.div
                animate={{ boxShadow: [
                  '0 0 32px rgba(232,21,90,0.16), 0 0 60px rgba(46,85,224,0.10)',
                  '0 0 52px rgba(232,21,90,0.32), 0 0 90px rgba(46,85,224,0.20)',
                  '0 0 32px rgba(232,21,90,0.16), 0 0 60px rgba(46,85,224,0.10)',
                ] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative rounded-[30px] p-[1.5px] overflow-hidden"
              >
                <div
                  className="absolute inset-[-150%] animate-spin-slower pointer-events-none"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 8%, #2E55E0 22%, transparent 38%, transparent 55%, #E8155A 72%, transparent 88%)',
                  }}
                />
                <div
                  className="relative rounded-[30px] px-6 sm:px-12 py-14 lg:py-16 text-center overflow-hidden"
                  style={{
                    background: 'linear-gradient(165deg, #0B1232, #080E2A 60%)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
                  }}
                >
                  <div
                    className="nebula-blob absolute -top-24 -left-20 w-[420px] h-[320px] rounded-full"
                    style={{ background: 'radial-gradient(circle at 35% 40%, rgba(46,85,224,0.28), transparent 60%)' }}
                  />
                  <div
                    className="nebula-blob absolute -bottom-28 -right-16 w-[460px] h-[340px] rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 60% 55%, rgba(232,21,90,0.22), transparent 60%)',
                      animationDelay: '-8s',
                      animationDirection: 'reverse',
                    }}
                  />

                  <div className="relative">
                    <motion.p
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                      className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4"
                    >
                      Let's Build Together
                    </motion.p>
                    <h2 className="font-bold leading-[1.06] mb-5" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>
                      <RevealText as="span" className="text-white block" stagger={0.07}>
                        Ready to Grow
                      </RevealText>
                      <RevealText as="span" className="block" gradient delay={0.28} stagger={0.09}>
                        Your Business?
                      </RevealText>
                    </h2>
                    <motion.p
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="text-white/45 text-[15px] mb-10 max-w-md mx-auto leading-relaxed"
                    >
                      Free consultation, no commitment. Tell us about your project and we'll get back within 24 hours.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                      <BurstButton>
                        <Magnetic>
                          <Link
                            to="/contact"
                            className="shimmer-btn inline-flex items-center gap-2.5 px-8 py-3.5 text-sm tracking-wide text-white font-medium hover:opacity-90 transition-opacity"
                          >
                            Get a Free Quote
                            <ArrowRight size={15} strokeWidth={2} />
                          </Link>
                        </Magnetic>
                      </BurstButton>
                      <Magnetic>
                        <Link
                          to="/portfolio"
                          className="inline-flex items-center gap-2 px-8 py-3.5 text-sm tracking-wide text-white/60 border border-white/15 rounded-xs hover:text-white hover:border-white/35 transition-all duration-250"
                        >
                          View Our Work
                        </Link>
                      </Magnetic>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
