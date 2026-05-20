import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ArrowLeft, BarChart2, Zap, Target, TrendingUp,
  Globe, Monitor, Settings, DollarSign, Star, Users,
  CheckCircle2, AlertCircle, Rocket, ChevronRight, RefreshCw,
  Phone, Mail,
} from 'lucide-react'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

// ── Scoring engine ────────────────────────────────────────────────────────────

function computeScores(a) {
  const s = { branding: 0, digitalPresence: 0, leadGeneration: 0, conversion: 0, automation: 0, marketing: 0 }

  if (a.website === 'modern')   { s.branding += 40; s.digitalPresence += 50; s.conversion += 30 }
  if (a.website === 'redesign') { s.branding += 15; s.digitalPresence += 18; s.conversion += 10 }

  if (a.revenue === '10-50')   s.branding += 5
  if (a.revenue === '50-100')  s.branding += 12
  if (a.revenue === '100plus') s.branding += 20

  if (a.socialMedia === 'active')       { s.digitalPresence += 35; s.marketing += 28; s.leadGeneration += 15; s.branding += 18 }
  if (a.socialMedia === 'inconsistent') { s.digitalPresence += 14; s.marketing += 10; s.leadGeneration += 5;  s.branding += 5 }

  const ls = a.leadSources || []
  if (ls.includes('wom'))      s.leadGeneration += 10
  if (ls.includes('seo'))      { s.leadGeneration += 22; s.marketing += 20; s.digitalPresence += 12 }
  if (ls.includes('social'))   { s.leadGeneration += 15; s.marketing += 18 }
  if (ls.includes('paid'))     { s.leadGeneration += 20; s.marketing += 32; s.conversion += 12 }
  if (ls.includes('outreach')) s.leadGeneration += 13

  if (a.leadCapture === 'landing') { s.conversion += 42; s.leadGeneration += 20; s.automation += 15 }
  if (a.leadCapture === 'form')    { s.conversion += 18; s.leadGeneration += 10 }
  if (a.leadCapture === 'direct')  { s.conversion += 6;  s.leadGeneration += 5 }

  if (a.crm === 'active') s.automation += 52
  if (a.crm === 'basic')  s.automation += 22

  if (a.emailSequences === 'yes') { s.automation += 33; s.conversion += 10 }
  if (a.paidAds === 'yes')        { s.marketing += 32;  s.conversion += 14 }

  Object.keys(s).forEach(k => { s[k] = Math.min(100, Math.round(s[k])) })
  return s
}

function getStage(score) {
  if (score <= 25) return { label: 'Early Digital Business',      color: '#F97316' }
  if (score <= 50) return { label: 'Growing Digital Business',    color: '#EAB308' }
  if (score <= 75) return { label: 'Established Digital Business', color: '#22C55E' }
  return                  { label: 'Digital Leader',               color: '#2E55E0' }
}

const INSIGHT_MAP = {
  branding:       { Icon: Star,       title: 'Weak Brand Identity',        desc: 'Your brand presence and visual identity need strengthening. A consistent, professional brand builds trust and commands premium pricing in your market.' },
  digitalPresence: { Icon: Globe,     title: 'Weak Digital Footprint',     desc: "Your online presence doesn't accurately reflect your business value. A modern, high-performance website is critical to building trust and converting today's buyers." },
  leadGeneration: { Icon: Target,     title: 'Unpredictable Lead Flow',    desc: 'Relying on referrals or a basic contact form limits growth. Dedicated landing pages and structured lead funnels create a consistent, scalable pipeline.' },
  conversion:     { Icon: TrendingUp, title: 'Low Conversion Rate',        desc: 'Traffic is entering your funnel but not converting. Optimised pages, clear CTAs and social proof can dramatically improve your close rate.' },
  automation:     { Icon: Zap,        title: 'Lack of Automation & Systems', desc: 'Your business relies heavily on manual tasks. A CRM with automated email and SMS workflows saves hours per week and ensures zero leads slip through the cracks.' },
  marketing:      { Icon: BarChart2,  title: 'Inconsistent Marketing',     desc: 'Without a structured multi-channel marketing strategy, growth is unpredictable. SEO, paid ads, and social media create compounding, long-term returns.' },
}

function getInsights(scores) {
  return Object.entries(scores).sort((a, b) => a[1] - b[1]).slice(0, 3).map(([key]) => INSIGHT_MAP[key])
}

function getRecommendations(scores) {
  const pool = [
    { key: 'web',   Icon: Monitor,     title: 'Website Development',         tagline: 'Build a professional, high-converting digital storefront.', desc: 'A custom-built, modern website acts as your 24/7 salesperson, elevating your brand and capturing leads around the clock.', path: '/services/web-development',      condition: scores.branding < 55 || scores.digitalPresence < 55 },
    { key: 'leads', Icon: Target,      title: 'Lead Generation Funnels',      tagline: 'Create a predictable system for acquiring new clients.',   desc: 'We design targeted landing pages and optimised funnels that turn cold traffic into qualified appointments consistently.',    path: '/services/digital-marketing',    condition: scores.leadGeneration < 60 },
    { key: 'crm',   Icon: Settings,    title: 'CRM & Automation Setup',       tagline: 'Automate follow-ups and eliminate manual data entry.',     desc: 'Integrate a powerful CRM with AI-driven email and SMS automation to nurture leads automatically and close deals faster.',   path: '/services/ai-chatbots',          condition: scores.automation < 60 },
    { key: 'ads',   Icon: DollarSign,  title: 'Paid Advertising Management',  tagline: 'Scale your reach and acquire customers on demand.',        desc: 'Strategic Google and Meta ad campaigns that put your business in front of high-intent buyers exactly when they are searching.', path: '/services/digital-marketing', condition: scores.marketing < 60 },
    { key: 'brand', Icon: Star,        title: 'Branding & Identity',          tagline: 'Create a brand that earns instant trust.',                 desc: 'From logo and typography to brand guidelines and social kit — we build cohesive identities that convert browsers into buyers.', path: '/services/branding-design',  condition: scores.branding < 40 },
  ]
  const recs = pool.filter(r => r.condition)
  if (recs.length === 0) recs.push(pool[0])
  return recs.slice(0, 4)
}

// ── Small helpers ─────────────────────────────────────────────────────────────

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let cur = 0
    const step = target / (duration / 16)
    const id = setInterval(() => {
      cur += step
      if (cur >= target) { setCount(target); clearInterval(id) }
      else setCount(Math.round(cur))
    }, 16)
    return () => clearInterval(id)
  }, [target, duration])
  return count
}

// ── Radio card ────────────────────────────────────────────────────────────────
function RadioCard({ selected, onClick, label, sub, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 ${
        selected
          ? 'border-brand-pink/60 bg-brand-pink/[0.07]'
          : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
      }`}
    >
      <span className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
        selected ? 'border-brand-pink' : 'border-white/30'
      }`}>
        {selected && <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />}
      </span>
      <div>
        {label && <p className="text-white text-[14px] font-medium leading-snug">{label}</p>}
        {sub && <p className="text-white/40 text-[12px] mt-0.5 leading-snug">{sub}</p>}
        {children}
      </div>
    </button>
  )
}

// ── Checkbox card ─────────────────────────────────────────────────────────────
function CheckCard({ selected, onClick, label, sub }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 ${
        selected
          ? 'border-brand-pink/60 bg-brand-pink/[0.07]'
          : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
      }`}
    >
      <span className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-colors ${
        selected ? 'border-brand-pink bg-brand-pink' : 'border-white/30'
      }`}>
        {selected && <CheckCircle2 size={10} className="text-white" strokeWidth={3} />}
      </span>
      <div>
        <p className="text-white text-[14px] font-medium leading-snug">{label}</p>
        {sub && <p className="text-white/40 text-[12px] mt-0.5">{sub}</p>}
      </div>
    </button>
  )
}

// ── Step 1 ────────────────────────────────────────────────────────────────────
function Step1({ a, err, set }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-white/60 text-[11px] uppercase tracking-[0.18em] mb-2 block">
          Business Name <span className="text-brand-pink">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Acme Corporation"
          value={a.businessName}
          onChange={e => set('businessName', e.target.value)}
          className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-white text-[14px] placeholder-white/20 focus:outline-none transition-colors ${
            err.businessName ? 'border-red-500/50' : 'border-white/[0.08] focus:border-white/25'
          }`}
        />
        {err.businessName && <p className="text-red-400 text-[11px] mt-1">{err.businessName}</p>}
      </div>

      <div>
        <label className="text-white/60 text-[11px] uppercase tracking-[0.18em] mb-2 block">
          Industry / Niche <span className="text-brand-pink">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Real Estate, E-Commerce, Healthcare"
          value={a.industry}
          onChange={e => set('industry', e.target.value)}
          className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-white text-[14px] placeholder-white/20 focus:outline-none transition-colors ${
            err.industry ? 'border-red-500/50' : 'border-white/[0.08] focus:border-white/25'
          }`}
        />
        {err.industry && <p className="text-red-400 text-[11px] mt-1">{err.industry}</p>}
      </div>

      <div>
        <label className="text-white/60 text-[11px] uppercase tracking-[0.18em] mb-3 block">
          Current Monthly Revenue Range <span className="text-brand-pink">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { val: 'under10', label: 'Under $10k' },
            { val: '10-50',   label: '$10k – $50k' },
            { val: '50-100',  label: '$50k – $100k' },
            { val: '100plus', label: '$100k+' },
          ].map(opt => (
            <RadioCard key={opt.val} selected={a.revenue === opt.val} onClick={() => set('revenue', opt.val)} label={opt.label} />
          ))}
        </div>
        {err.revenue && <p className="text-red-400 text-[11px] mt-1">{err.revenue}</p>}
      </div>
    </div>
  )
}

// ── Step 2 ────────────────────────────────────────────────────────────────────
function Step2({ a, err, set }) {
  return (
    <div className="space-y-7">
      <div>
        <label className="text-white/60 text-[11px] uppercase tracking-[0.18em] mb-3 block">
          Do you have an active, modern website? <span className="text-brand-pink">*</span>
        </label>
        <div className="space-y-2">
          <RadioCard selected={a.website === 'modern'}   onClick={() => set('website', 'modern')}   label="Yes, it's modern and updated"   sub="Responsive, fast, and represents the brand well." />
          <RadioCard selected={a.website === 'redesign'} onClick={() => set('website', 'redesign')} label="Yes, but it needs a major redesign" sub="Looks outdated, slow, or hard to update." />
          <RadioCard selected={a.website === 'none'}     onClick={() => set('website', 'none')}     label="No, we don't have one"            sub="Relying on social media or physical presence." />
        </div>
        {err.website && <p className="text-red-400 text-[11px] mt-1">{err.website}</p>}
      </div>

      <div>
        <label className="text-white/60 text-[11px] uppercase tracking-[0.18em] mb-3 block">
          Are you active on Social Media? <span className="text-brand-pink">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <RadioCard selected={a.socialMedia === 'active'}       onClick={() => set('socialMedia', 'active')}       label="Yes, posting regularly"  />
          <RadioCard selected={a.socialMedia === 'inconsistent'} onClick={() => set('socialMedia', 'inconsistent')} label="No / Inconsistent" />
        </div>
        {err.socialMedia && <p className="text-red-400 text-[11px] mt-1">{err.socialMedia}</p>}
      </div>
    </div>
  )
}

// ── Step 3 ────────────────────────────────────────────────────────────────────
function Step3({ a, err, set, toggle }) {
  return (
    <div className="space-y-7">
      <div>
        <label className="text-white/60 text-[11px] uppercase tracking-[0.18em] mb-1 block">
          Where do your current leads come from? <span className="text-white/30 normal-case text-[10px]">(Select all that apply)</span> <span className="text-brand-pink">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {[
            { val: 'wom',      label: 'Word of Mouth / Referrals' },
            { val: 'seo',      label: 'Organic Search (SEO)' },
            { val: 'social',   label: 'Organic Social Media' },
            { val: 'paid',     label: 'Paid Ads (Google, Meta)' },
            { val: 'outreach', label: 'Cold Outreach' },
          ].map(opt => (
            <CheckCard key={opt.val} selected={a.leadSources.includes(opt.val)} onClick={() => toggle('leadSources', opt.val)} label={opt.label} />
          ))}
        </div>
        {err.leadSources && <p className="text-red-400 text-[11px] mt-1">{err.leadSources}</p>}
      </div>

      <div>
        <label className="text-white/60 text-[11px] uppercase tracking-[0.18em] mb-3 block">
          How do you capture leads online? <span className="text-brand-pink">*</span>
        </label>
        <div className="space-y-2">
          <RadioCard selected={a.leadCapture === 'landing'} onClick={() => set('leadCapture', 'landing')} label="Dedicated landing pages & funnels" />
          <RadioCard selected={a.leadCapture === 'form'}    onClick={() => set('leadCapture', 'form')}    label="Basic contact form on website" />
          <RadioCard selected={a.leadCapture === 'direct'}  onClick={() => set('leadCapture', 'direct')}  label="They just email or call us directly" />
          <RadioCard selected={a.leadCapture === 'none'}    onClick={() => set('leadCapture', 'none')}    label="We don't capture leads online" />
        </div>
        {err.leadCapture && <p className="text-red-400 text-[11px] mt-1">{err.leadCapture}</p>}
      </div>
    </div>
  )
}

// ── Step 4 ────────────────────────────────────────────────────────────────────
function Step4({ a, err, set }) {
  return (
    <div className="space-y-7">
      <div>
        <label className="text-white/60 text-[11px] uppercase tracking-[0.18em] mb-3 block">
          Do you use a CRM system? <span className="text-brand-pink">*</span>
        </label>
        <div className="space-y-2">
          <RadioCard selected={a.crm === 'active'} onClick={() => set('crm', 'active')} label="Yes, and it's actively used"  sub="HubSpot, Salesforce, GoHighLevel, etc." />
          <RadioCard selected={a.crm === 'basic'}  onClick={() => set('crm', 'basic')}  label="Yes, but only basically"       sub="Mainly used as an address book or spreadsheet." />
          <RadioCard selected={a.crm === 'none'}   onClick={() => set('crm', 'none')}   label="No CRM"                        sub="Relying on memory or disorganised files." />
        </div>
        {err.crm && <p className="text-red-400 text-[11px] mt-1">{err.crm}</p>}
      </div>

      <div>
        <label className="text-white/60 text-[11px] uppercase tracking-[0.18em] mb-3 block">
          Do you have automated email/SMS follow-up sequences? <span className="text-brand-pink">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <RadioCard selected={a.emailSequences === 'yes'} onClick={() => set('emailSequences', 'yes')} label="Yes, fully automated" />
          <RadioCard selected={a.emailSequences === 'no'}  onClick={() => set('emailSequences', 'no')}  label="No, it's manual" />
        </div>
        {err.emailSequences && <p className="text-red-400 text-[11px] mt-1">{err.emailSequences}</p>}
      </div>

      <div>
        <label className="text-white/60 text-[11px] uppercase tracking-[0.18em] mb-3 block">
          Are you currently running Paid Advertising? <span className="text-brand-pink">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <RadioCard selected={a.paidAds === 'yes'} onClick={() => set('paidAds', 'yes')} label="Yes, actively investing" />
          <RadioCard selected={a.paidAds === 'no'}  onClick={() => set('paidAds', 'no')}  label="No / Not right now" />
        </div>
        {err.paidAds && <p className="text-red-400 text-[11px] mt-1">{err.paidAds}</p>}
      </div>
    </div>
  )
}

// ── Step 5 ────────────────────────────────────────────────────────────────────
function Step5({ a, err, toggle }) {
  return (
    <div>
      <label className="text-white/60 text-[11px] uppercase tracking-[0.18em] mb-1 block">
        What are the biggest bottlenecks right now? <span className="text-white/30 normal-case text-[10px]">(Select up to 3)</span> <span className="text-brand-pink">*</span>
      </label>
      <div className="space-y-2 mt-3">
        {[
          { val: 'noLeads',    label: 'Not getting enough leads / traffic' },
          { val: 'noConvert',  label: "Getting leads, but they aren't converting" },
          { val: 'manual',     label: 'Too much time spent on manual tasks / admin' },
          { val: 'brand',      label: 'Brand looks outdated compared to competitors' },
          { val: 'noStrategy', label: 'No clear or consistent marketing strategy' },
        ].map(opt => (
          <CheckCard
            key={opt.val}
            selected={a.bottlenecks.includes(opt.val)}
            onClick={() => toggle('bottlenecks', opt.val, 3)}
            label={opt.label}
          />
        ))}
      </div>
      {err.bottlenecks && <p className="text-red-400 text-[11px] mt-1">{err.bottlenecks}</p>}
    </div>
  )
}

// ── Loading screen ────────────────────────────────────────────────────────────
function LoadingScreen() {
  const msgs = [
    'Analysing your digital presence…',
    'Scoring your lead generation…',
    'Benchmarking against industry data…',
    'Mapping your growth opportunities…',
    'Preparing your personalised report…',
  ]
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % msgs.length), 600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen bg-bg-dark pt-[72px] flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full"
            style={{ background: 'conic-gradient(from 0deg, #E8155A, #2E55E0, transparent)', mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), white calc(100% - 4px))' }}
          />
          <div className="absolute inset-2 rounded-full bg-bg-dark flex items-center justify-center">
            <BarChart2 size={28} className="text-brand-pink" />
          </div>
        </div>
        <motion.h2 key="title" className="text-white font-bold text-2xl mb-3">Generating Report…</motion.h2>
        <AnimatePresence mode="wait">
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-white/40 text-[14px]"
          >
            {msgs[idx]}
          </motion.p>
        </AnimatePresence>
        <div className="flex gap-1.5 justify-center mt-6">
          {[0,1,2].map(i => (
            <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-brand-pink"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Pillar bar ────────────────────────────────────────────────────────────────
function PillarBar({ label, value, delay }) {
  return (
    <div className="flex items-center gap-3 mb-3.5">
      <span className="text-white/55 text-[12px] w-36 shrink-0">{label}</span>
      <div className="flex-1 bg-white/[0.06] rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #2E55E0, #E8155A)' }}
        />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.8 }}
        className="text-white text-[12px] font-semibold w-8 text-right"
      >
        {value}%
      </motion.span>
    </div>
  )
}

// ── Report screen ─────────────────────────────────────────────────────────────
function ReportScreen({ report, answers, onReset }) {
  const { scores, overall, stage, insights, recommendations } = report
  const count = useCountUp(overall, 2200)
  const stageInfo = getStage(overall)

  const pillars = [
    { key: 'branding',        label: 'Branding' },
    { key: 'digitalPresence', label: 'Digital Presence' },
    { key: 'leadGeneration',  label: 'Lead Generation' },
    { key: 'conversion',      label: 'Conversion' },
    { key: 'automation',      label: 'Automation' },
    { key: 'marketing',       label: 'Marketing' },
  ]

  const phases = [
    { num: 1, title: 'Build Digital Foundation', desc: 'Establish a high-converting website and strong brand identity.', color: '#2E55E0' },
    { num: 2, title: 'Create Lead System',        desc: 'Deploy targeted landing pages and automated capture funnels.',   color: '#7C3AED' },
    { num: 3, title: 'Automate and Scale',        desc: 'Integrate CRM, email workflows, and scale via paid advertising.',color: '#E8155A' },
  ]

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6 },
  })

  return (
    <div className="min-h-screen bg-bg-dark pt-[72px]">
      <SEO title="Your Digital Maturity Report | Abbas Digital Agency" description="Your personalised digital maturity report from Abbas Digital Agency." path="/analyzer" />

      {/* Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[500px] rounded-full blur-[200px] opacity-25" style={{ background: 'rgba(46,85,224,0.18)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[180px] opacity-20" style={{ background: 'rgba(232,21,90,0.14)' }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 py-14">

        {/* Header */}
        <motion.div {...fade(0)} className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-5"
          >
            <CheckCircle2 size={13} className="text-green-400" />
            <span className="text-green-400 text-[11px] tracking-[0.2em] uppercase font-medium">Analysis Complete</span>
          </motion.div>
          <h1 className="font-bold text-white text-4xl sm:text-5xl mb-3 leading-tight">Your Digital Maturity Report</h1>
          <p className="text-white/45 text-[15px]">
            Prepared exclusively for <span className="text-brand-pink font-semibold">{answers.businessName}</span>
          </p>
        </motion.div>

        {/* Score + Pillars grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">

          {/* Score card */}
          <motion.div {...fade(0.1)} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            <p className="text-white/30 text-[10px] uppercase tracking-[0.25em] mb-5">Overall Digital Maturity</p>
            <div className="relative w-32 h-32 mx-auto mb-5">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="44" fill="none"
                  stroke="url(#scoreGrad)" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 44}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 44 * (1 - overall / 100) }}
                  transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2E55E0" />
                    <stop offset="100%" stopColor="#E8155A" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-bold text-white text-4xl leading-none">{count}</span>
                <span className="text-white/40 text-[12px]">/ 100</span>
              </div>
            </div>
            <div className="px-4 py-1.5 rounded-full text-[12px] font-semibold" style={{ background: `${stageInfo.color}20`, color: stageInfo.color, border: `1px solid ${stageInfo.color}40` }}>
              {stageInfo.label}
            </div>
          </motion.div>

          {/* Pillar bars */}
          <motion.div {...fade(0.15)} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7">
            <div className="flex items-center gap-2 mb-6">
              <BarChart2 size={15} className="text-brand-pink" />
              <p className="text-white font-semibold text-[15px]">Performance by Pillar</p>
            </div>
            {pillars.map((p, i) => (
              <PillarBar key={p.key} label={p.label} value={scores[p.key]} delay={0.3 + i * 0.12} />
            ))}
          </motion.div>
        </div>

        {/* Key Insights */}
        <motion.div {...fade(0.2)} className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle size={15} className="text-brand-pink" />
            <h2 className="font-bold text-white text-xl">Key Growth Insights</h2>
          </div>
          <p className="text-white/35 text-[13px] mb-5">Identified areas with the highest potential impact</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {insights.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.1, duration: 0.55 }}
                className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 hover:border-brand-pink/20 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg mb-4 flex items-center justify-center" style={{ background: 'rgba(232,21,90,0.12)', border: '1px solid rgba(232,21,90,0.2)' }}>
                  <Icon size={16} className="text-brand-pink" />
                </div>
                <h3 className="text-white font-semibold text-[14px] mb-2">{title}</h3>
                <p className="text-white/40 text-[12px] leading-relaxed">{desc}</p>
                <div className="flex items-center gap-1 mt-3">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(232,21,90,0.12)', color: '#E8155A', border: '1px solid rgba(232,21,90,0.2)' }}>HIGH PRIORITY</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div {...fade(0.3)} className="mb-8">
          <div className="text-center mb-8">
            <p className="text-brand-pink text-[11px] tracking-[0.25em] uppercase mb-2">Recommended Action Plan</p>
            <h2 className="font-bold text-white text-3xl mb-2">Tailored Solutions</h2>
            <p className="text-white/40 text-[14px] max-w-md mx-auto">Based on your analysis, implementing these targeted solutions will provide the highest ROI for your current business stage.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendations.map(({ Icon, title, tagline, desc, priority, path }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.55 }}
                className={`relative bg-white/[0.03] rounded-xl p-6 border transition-colors hover:border-white/20 ${priority ? 'border-brand-pink/40' : 'border-white/[0.07]'}`}
              >
                {priority && (
                  <div className="absolute -top-3 left-5">
                    <span className="bg-brand-pink text-white text-[10px] font-bold px-3 py-0.5 rounded-full tracking-wide">Top Priority</span>
                  </div>
                )}
                <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center" style={{ background: 'rgba(46,85,224,0.12)', border: '1px solid rgba(46,85,224,0.2)' }}>
                  <Icon size={18} className="text-brand-blue" style={{ color: '#2E55E0' }} />
                </div>
                <h3 className="text-white font-bold text-[16px] mb-1">{title}</h3>
                <div className="flex items-center gap-1.5 mb-3">
                  <CheckCircle2 size={12} className="text-green-400 shrink-0" />
                  <span className="text-green-400 text-[11px]">{tagline}</span>
                </div>
                <p className="text-white/45 text-[13px] leading-relaxed mb-4">{desc}</p>
                <Link to="/contact" className="flex items-center gap-1.5 text-brand-pink text-[12px] font-medium hover:gap-2.5 transition-all">
                  Contact Sales <ChevronRight size={13} />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Roadmap */}
        <motion.div {...fade(0.4)} className="mb-10">
          <h2 className="font-bold text-white text-2xl text-center mb-2">Your Execution Roadmap</h2>
          <p className="text-white/35 text-[13px] text-center mb-8">A step-by-step clear path to achieving digital maturity and dominating your market.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative">
            {/* Connector line (desktop) */}
            <div className="hidden sm:block absolute top-12 left-[calc(16.66%+16px)] right-[calc(16.66%+16px)] h-px bg-gradient-to-r from-[#2E55E0] via-[#7C3AED] to-[#E8155A] opacity-30" />
            {[
              { num: 1, title: 'Build Digital Foundation', desc: 'Establish a high-converting website and strong brand identity.',         color: '#2E55E0' },
              { num: 2, title: 'Create Lead System',        desc: 'Deploy targeted landing pages and automated capture funnels.',            color: '#7C3AED' },
              { num: 3, title: 'Automate and Scale',        desc: 'Integrate CRM, email workflows, and scale via paid advertising.', color: '#E8155A' },
            ].map((ph, i) => (
              <motion.div
                key={ph.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.55 }}
                className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 text-center relative"
              >
                <div className="w-10 h-10 rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-white text-sm" style={{ background: `${ph.color}25`, border: `2px solid ${ph.color}50` }}>
                  {ph.num}
                </div>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-2">Phase {ph.num}</p>
                <h3 className="text-white font-bold text-[15px] mb-2">{ph.title}</h3>
                <p className="text-white/40 text-[12px] leading-relaxed">{ph.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          {...fade(0.5)}
          className="rounded-2xl p-10 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(46,85,224,0.25) 0%, rgba(232,21,90,0.2) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.3) 0%, transparent 70%)' }} />
          <div className="relative">
            <div className="w-12 h-12 rounded-xl mx-auto mb-5 flex items-center justify-center" style={{ background: 'rgba(232,21,90,0.2)', border: '1px solid rgba(232,21,90,0.3)' }}>
              <Rocket size={22} className="text-brand-pink" />
            </div>
            <h2 className="font-bold text-white text-3xl mb-3">Ready to Transform Your Business?</h2>
            <p className="text-white/55 text-[14px] mb-8 max-w-md mx-auto leading-relaxed">
              Stop guessing and start growing. Book a free strategy session with our experts to review your results and map out your custom action plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="shimmer-btn inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm text-white font-medium hover:opacity-90 transition-opacity">
                <Phone size={14} /> Book Free Strategy Call
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm text-white/60 border border-white/15 rounded-xl hover:text-white hover:border-white/30 transition-all">
                <Mail size={14} /> Contact Sales
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Retake */}
        <motion.div {...fade(0.55)} className="text-center mt-8">
          <button onClick={onReset} className="flex items-center gap-2 text-white/30 text-[13px] hover:text-white/60 transition-colors mx-auto">
            <RefreshCw size={13} /> Retake Assessment
          </button>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, title: 'Basic Information',    subtitle: "Let's start with who you are and what you do." },
  { id: 2, title: 'Digital Presence',     subtitle: 'Evaluate your current online footprint and brand visibility.' },
  { id: 3, title: 'Lead Generation',      subtitle: 'How do prospects find you and enter your pipeline?' },
  { id: 4, title: 'Systems & Automation', subtitle: 'Analyse the tech stack scaling your operations.' },
  { id: 5, title: 'Challenges & Goals',   subtitle: 'Identify the primary bottlenecks holding you back.' },
]

export default function BusinessAnalyzerPage() {
  const [step,    setStep]    = useState(1)
  const [answers, setAnswers] = useState({
    businessName: '', industry: '', revenue: '',
    website: '', socialMedia: '',
    leadSources: [], leadCapture: '',
    crm: '', emailSequences: '', paidAds: '',
    bottlenecks: [],
  })
  const [errors,  setErrors]  = useState({})
  const [loading, setLoading] = useState(false)
  const [report,  setReport]  = useState(null)

  const set = (key, val) => {
    setAnswers(p => ({ ...p, [key]: val }))
    setErrors(p => ({ ...p, [key]: '' }))
  }

  const toggle = (key, val, max = 99) => {
    setAnswers(p => {
      const arr = p[key]
      if (arr.includes(val)) return { ...p, [key]: arr.filter(v => v !== val) }
      if (arr.length >= max) return p
      return { ...p, [key]: [...arr, val] }
    })
    setErrors(p => ({ ...p, [key]: '' }))
  }

  const validate = () => {
    const e = {}
    if (step === 1) {
      if (!answers.businessName.trim()) e.businessName = 'Required'
      if (!answers.industry.trim())     e.industry     = 'Required'
      if (!answers.revenue)             e.revenue      = 'Please select one'
    }
    if (step === 2) {
      if (!answers.website)     e.website     = 'Please select one'
      if (!answers.socialMedia) e.socialMedia = 'Please select one'
    }
    if (step === 3) {
      if (!answers.leadSources.length) e.leadSources = 'Select at least one'
      if (!answers.leadCapture)        e.leadCapture = 'Please select one'
    }
    if (step === 4) {
      if (!answers.crm)            e.crm            = 'Please select one'
      if (!answers.emailSequences) e.emailSequences = 'Please select one'
      if (!answers.paidAds)        e.paidAds        = 'Please select one'
    }
    if (step === 5) {
      if (!answers.bottlenecks.length) e.bottlenecks = 'Select at least one'
    }
    return e
  }

  const next = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    if (step < 5) { setStep(s => s + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    setLoading(true)
    setTimeout(() => {
      const scores = computeScores(answers)
      const overall = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 6)
      setReport({ scores, overall, stage: getStage(overall), insights: getInsights(scores), recommendations: getRecommendations(scores) })
      setLoading(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 3000)
  }

  const back = () => { if (step > 1) { setStep(s => s - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) } }

  const reset = () => {
    setStep(1); setReport(null); setLoading(false)
    setAnswers({ businessName:'', industry:'', revenue:'', website:'', socialMedia:'', leadSources:[], leadCapture:'', crm:'', emailSequences:'', paidAds:'', bottlenecks:[] })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) return <LoadingScreen />
  if (report)  return <ReportScreen report={report} answers={answers} onReset={reset} />

  const progress = (step / 5) * 100

  return (
    <div className="min-h-screen bg-bg-dark pt-[72px]">
      <SEO
        title="AI Business Analyzer | Free Digital Maturity Report | Abbas Digital Agency"
        description="Get your free digital maturity report in minutes. Our analyzer evaluates your brand, website, lead generation, automation and marketing to reveal your biggest growth opportunities."
        keywords="AI business analyzer, digital maturity report, business growth analysis, digital marketing audit Pakistan"
        path="/analyzer"
      />

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/3 w-[500px] h-[400px] rounded-full blur-[160px] opacity-30" style={{ background: 'rgba(46,85,224,0.15)' }} />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[350px] rounded-full blur-[140px] opacity-20" style={{ background: 'rgba(232,21,90,0.12)' }} />
      </div>

      <div className="relative max-w-2xl mx-auto px-5 sm:px-8 py-12">

        {/* Hero text */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: 'rgba(232,21,90,0.1)', border: '1px solid rgba(232,21,90,0.2)' }}
          >
            <BarChart2 size={13} className="text-brand-pink" />
            <span className="text-brand-pink text-[11px] tracking-[0.22em] uppercase font-medium">AI Business Analyzer</span>
          </motion.div>
          <motion.h1
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.15 }}
            className="font-bold text-white leading-tight mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Discover Your Digital<br />Growth Potential
          </motion.h1>
          <motion.p
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 0.25 }}
            className="text-white/45 text-[14px] max-w-sm mx-auto leading-relaxed"
          >
            Answer 5 quick steps and receive a personalised digital maturity report with actionable growth recommendations.
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 0.2 }} className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/35 text-[11px] tracking-[0.2em] uppercase">Step {step} / 5</span>
            <span className="text-brand-pink text-[11px] font-semibold">{Math.round(progress)}% Completed</span>
          </div>
          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #E8155A, #2E55E0)' }}
            />
          </div>
        </motion.div>

        {/* Step card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 48, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -48, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7 sm:p-9 mb-6"
          >
            <h2 className="font-bold text-white text-2xl mb-1">{STEPS[step - 1].title}</h2>
            <p className="text-white/35 text-[13px] mb-8">{STEPS[step - 1].subtitle}</p>

            {step === 1 && <Step1 a={answers} err={errors} set={set} />}
            {step === 2 && <Step2 a={answers} err={errors} set={set} />}
            {step === 3 && <Step3 a={answers} err={errors} set={set} toggle={toggle} />}
            {step === 4 && <Step4 a={answers} err={errors} set={set} />}
            {step === 5 && <Step5 a={answers} err={errors} toggle={toggle} />}
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] text-white/40 border border-white/[0.08] hover:text-white/70 hover:border-white/20 transition-all disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <motion.button
            onClick={next}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="shimmer-btn flex items-center gap-2 px-8 py-3 text-[13px] text-white font-medium hover:opacity-90 transition-opacity"
          >
            {step === 5 ? <>Generate Report <BarChart2 size={14} /></> : <>Next Step <ArrowRight size={14} /></>}
          </motion.button>
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-6 mt-10 flex-wrap"
        >
          {['Free · No credit card', '2-minute assessment', 'Instant personalised report'].map(t => (
            <div key={t} className="flex items-center gap-1.5 text-white/25 text-[11px]">
              <CheckCircle2 size={11} className="text-brand-pink/60" /> {t}
            </div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
