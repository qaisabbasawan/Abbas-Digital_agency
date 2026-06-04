import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe, TrendingUp, Target, Users, ShoppingCart,
  Smartphone, Bot, Palette,
  CheckCircle2, ChevronDown, Phone, MessageCircle,
  Zap, Award, BarChart3, Clock,
} from 'lucide-react'
import SEO from './SEO'
import Footer from './Footer'

// ─── Constants ─────────────────────────────────────────────────────────────

const WA_LINK = 'https://wa.me/923005935125'
const BOOK_LINK = '/contact'

const SERVICES = [
  { Icon: Globe,        title: 'Web Design & Development', desc: 'Custom websites that convert visitors into clients.',                   color: '#2E55E0' },
  { Icon: TrendingUp,   title: 'SEO Services',             desc: 'Rank on Google and drive consistent organic traffic.',                 color: '#059669' },
  { Icon: Target,       title: 'Google Ads (PPC)',          desc: 'High-ROI campaigns in front of ready-to-buy customers.',             color: '#D97706' },
  { Icon: Users,        title: 'Meta Ads',                  desc: 'Facebook & Instagram campaigns that generate qualified leads.',       color: '#E8155A' },
  { Icon: ShoppingCart, title: 'E-Commerce',                desc: 'Shopify and WooCommerce stores built to sell at scale.',             color: '#7C3AED' },
  { Icon: Smartphone,   title: 'Mobile Apps',               desc: 'iOS and Android apps for your customers and business.',              color: '#0891B2' },
  { Icon: Bot,          title: 'AI & Automation',           desc: 'Chatbots, CRM automation and AI tools that save time.',             color: '#6366F1' },
  { Icon: Palette,      title: 'Branding & Design',         desc: 'Logos and visual systems that instantly build trust.',              color: '#F59E0B' },
]

const STATS = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '10+',  label: 'Years Experience' },
  { value: '98%',  label: 'Client Retention' },
  { value: '3×',   label: 'Avg. ROI Delivered' },
]

const WHY_POINTS = [
  'Google-certified team with 10+ years of hands-on experience',
  'USA-registered LLC with operations in Islamabad, Pakistan',
  'Transparent fixed pricing — no hidden fees or surprises',
  'Dedicated account manager and monthly performance reports',
  'Full IP ownership transferred to you on final payment',
]

const PROCESS = [
  { step: '01', title: 'Discovery',   desc: 'We audit your current digital presence, research competitors and define clear goals.' },
  { step: '02', title: 'Strategy',    desc: 'A custom roadmap is built around your market, budget and target audience.' },
  { step: '03', title: 'Execution',   desc: 'Our specialists build, launch and activate every channel with precision.' },
  { step: '04', title: 'Optimisation', desc: 'Data-driven refinement ensures continuous improvement in results and ROI.' },
]

const INDUSTRIES = [
  'Law Firms', 'Real Estate', 'Healthcare', 'Dental',
  'Restaurants', 'Construction', 'Transport & Logistics', 'E-Commerce',
  'Schools', 'Universities', 'Automotive', 'Travel & Tourism',
]

// ─── Animation variants ─────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <span className="inline-block text-[11px] tracking-[0.24em] uppercase text-brand-pink font-semibold mb-3">
      {children}
    </span>
  )
}

function CTAButtons({ className = '' }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={BOOK_LINK}
        className="shimmer-btn inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold text-sm transition-transform hover:scale-105"
      >
        <Phone size={15} />
        Book Free Strategy Call
      </a>
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/25 text-white font-semibold text-sm hover:border-white/50 hover:bg-white/[0.05] transition-all"
      >
        <MessageCircle size={15} />
        WhatsApp Us
      </a>
    </div>
  )
}

// ─── Sections ───────────────────────────────────────────────────────────────

function HeroSection({ hero }) {
  const lines = hero.headline.split('\n')

  return (
    <section className="relative overflow-hidden bg-bg-dark pt-28 pb-20">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-pink/5 rounded-full blur-[120px]" />
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-pink/30 bg-brand-pink/10 text-brand-pink text-[12px] tracking-wider font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-pulse" />
              {hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
          >
            {lines.map((line, i) => (
              <span key={i} className={i === 1 ? 'gradient-text block' : 'block'}>
                {line}
              </span>
            ))}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-white/60 text-lg leading-relaxed mb-8 max-w-xl"
          >
            {hero.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp}>
            <CTAButtons />
          </motion.div>
        </motion.div>

        {/* Stat boxes */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 text-center"
            >
              <p className="gradient-text font-heading text-3xl font-bold">{s.value}</p>
              <p className="text-white/45 text-[12px] mt-1">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function TrustBar() {
  const badges = [
    { Icon: Award,    text: 'USA Registered LLC' },
    { Icon: Clock,    text: '10+ Years Experience' },
    { Icon: BarChart3, text: '500+ Projects' },
    { Icon: CheckCircle2, text: 'Google Certified' },
    { Icon: Globe,    text: 'Pakistan Operations' },
  ]

  return (
    <section className="bg-bg-dark2 border-y border-white/[0.06] py-5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {badges.map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white/50 text-[13px]">
              <Icon size={14} className="text-brand-pink shrink-0" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="bg-bg-dark py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp}><SectionLabel>What We Do</SectionLabel></motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-4xl font-bold">
            Full-Service Digital Agency
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 mt-3 max-w-lg mx-auto">
            Everything your business needs to dominate online — under one roof.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {SERVICES.map(({ Icon, title, desc, color }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: `${color}20`, border: `1px solid ${color}30` }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <h3 className="font-heading font-semibold text-[15px] mb-2">{title}</h3>
              <p className="text-white/45 text-[13px] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function WhySection() {
  return (
    <section className="bg-bg-dark2 py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}><SectionLabel>Why Choose Us</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-4xl font-bold mb-6">
              Why Abbas Digital Agency?
            </motion.h2>
            <motion.div variants={stagger} className="space-y-4">
              {WHY_POINTS.map((point) => (
                <motion.div key={point} variants={fadeUp} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-brand-pink shrink-0 mt-0.5" />
                  <p className="text-white/65 text-[14px] leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8">
              <CTAButtons />
            </motion.div>
          </motion.div>

          {/* Right — stat boxes */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid grid-cols-2 gap-5"
          >
            {[
              { icon: <Zap size={22} className="text-brand-pink" />, value: '48h', label: 'Average Response Time' },
              { icon: <Award size={22} className="text-brand-pink" />, value: '5★', label: 'Client Satisfaction' },
              { icon: <BarChart3 size={22} className="text-brand-pink" />, value: '300%', label: 'Avg. Traffic Growth' },
              { icon: <Globe size={22} className="text-brand-pink" />, value: '15+', label: 'Countries Served' },
            ].map(({ icon, value, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6"
              >
                <div className="mb-3">{icon}</div>
                <p className="font-heading text-2xl font-bold gradient-text">{value}</p>
                <p className="text-white/45 text-[12px] mt-1">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="bg-bg-dark py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp}><SectionLabel>How We Work</SectionLabel></motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-4xl font-bold">
            Our Proven 4-Step Process
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PROCESS.map(({ step, title, desc }) => (
            <motion.div
              key={step}
              variants={fadeUp}
              className="relative bg-white/[0.03] border border-white/[0.07] rounded-xl p-6"
            >
              <p className="gradient-text font-heading text-4xl font-bold mb-4">{step}</p>
              <h3 className="font-heading font-semibold text-lg mb-2">{title}</h3>
              <p className="text-white/45 text-[13px] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function IndustriesSection() {
  return (
    <section className="bg-bg-dark2 py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="text-center mb-10"
        >
          <motion.div variants={fadeUp}><SectionLabel>Industry Expertise</SectionLabel></motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-4xl font-bold">
            We Know Your Industry
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 mt-3 max-w-md mx-auto">
            Deep sector knowledge means faster results and fewer wasted cycles.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="flex flex-wrap justify-center gap-3"
        >
          {INDUSTRIES.map((industry) => (
            <motion.span
              key={industry}
              variants={fadeUp}
              className="px-4 py-2 rounded-full border border-white/[0.10] bg-white/[0.03] text-white/60 text-[13px] hover:border-brand-pink/40 hover:text-white hover:bg-brand-pink/[0.07] transition-all duration-200 cursor-default"
            >
              {industry}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FAQItem({ q, a, isOpen, toggle }) {
  return (
    <div className="border-b border-white/[0.07]">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-heading font-semibold text-[15px] text-white/90">{q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-white/40"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-white/55 text-[14px] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FAQSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null)

  if (!faqs || faqs.length === 0) return null

  return (
    <section className="bg-bg-dark py-20">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp}><SectionLabel>FAQ</SectionLabel></motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-4xl font-bold">
            Frequently Asked Questions
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeUp}>
              <FAQItem
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                toggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="bg-bg-dark2 py-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="bg-gradient-to-br from-brand-blue/20 via-transparent to-brand-pink/20 border border-white/[0.08] rounded-2xl px-8 py-14"
        >
          <motion.div variants={fadeUp}><SectionLabel>Get Started Today</SectionLabel></motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Ready to Grow Your Business<br />
            <span className="gradient-text">Faster Than Your Competitors?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/55 mb-8 max-w-lg mx-auto leading-relaxed">
            Book a free 30-minute strategy call. No hard sell — just honest advice on what will move the needle for your business.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
            <a
              href={BOOK_LINK}
              className="shimmer-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-white font-semibold transition-transform hover:scale-105"
            >
              <Phone size={16} />
              Book Free Strategy Call
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-white/25 text-white font-semibold hover:border-white/50 hover:bg-white/[0.05] transition-all"
            >
              <MessageCircle size={16} />
              WhatsApp Us Now
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Main Template ──────────────────────────────────────────────────────────

export default function SeoLandingTemplate({ page }) {
  const { seo, hero, faqs, slug } = page

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        path={`/${slug}`}
      />

      <main>
        <HeroSection hero={hero} />
        <TrustBar />
        <ServicesSection />
        <WhySection />
        <ProcessSection />
        <IndustriesSection />
        {faqs && faqs.length > 0 && <FAQSection faqs={faqs} />}
        <FinalCTA />
      </main>

      <Footer />
    </>
  )
}
