import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const pageConfig = {
  about: {
    icon: '🏆',
    title: 'About Us',
    tagline: 'Our Story',
    desc: 'Learn about our journey, our team, and the decade of passion that built Abbas Digital Agency into Pakistan\'s most trusted digital partner.',
    accentColor: '#8B5CF6',
    accentColorAlt: '#2E55E0',
    gradient: 'from-purple-900/20 to-brand-blue-dark/30',
  },
  services: {
    icon: '⚡',
    title: 'Our Services',
    tagline: 'What We Do',
    desc: 'From web development to AI solutions — a full suite of digital services crafted to transform your business and outpace the competition.',
    accentColor: '#06B6D4',
    accentColorAlt: '#2E55E0',
    gradient: 'from-cyan-900/20 to-brand-blue-dark/30',
  },
  portfolio: {
    icon: '🎨',
    title: 'Our Portfolio',
    tagline: 'Our Work',
    desc: 'Five hundred projects. One standard: excellence. Explore the brands we\'ve built, stores we\'ve launched, and apps we\'ve shipped.',
    accentColor: '#E8155A',
    accentColorAlt: '#FF2D72',
    gradient: 'from-pink-900/20 to-brand-blue-dark/30',
  },
  contact: {
    icon: '💬',
    title: 'Contact Us',
    tagline: 'Let\'s Talk',
    desc: 'Ready to start your project? We\'d love to hear from you. Full contact page with a detailed form and all our details is on its way.',
    accentColor: '#10B981',
    accentColorAlt: '#2E55E0',
    gradient: 'from-emerald-900/20 to-brand-blue-dark/30',
  },
}

const progressSteps = [
  { label: 'Design', pct: 90 },
  { label: 'Development', pct: 65 },
  { label: 'Content', pct: 40 },
  { label: 'Launch', pct: 15 },
]

export default function ComingSoon({ page }) {
  const config = pageConfig[page] || pageConfig.services

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center relative overflow-hidden pt-20">

      {/* Animated background blobs */}
      <div
        className="absolute top-1/4 left-1/5 w-96 h-96 rounded-full blur-3xl opacity-15 animate-pulse"
        style={{ background: config.accentColor }}
      />
      <div
        className="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full blur-3xl opacity-10"
        style={{ background: config.accentColorAlt, animationDelay: '1s' }}
      />
      <div
        className="absolute top-3/4 left-1/2 w-64 h-64 rounded-full blur-3xl opacity-8 animate-pulse"
        style={{ background: config.accentColor, animationDelay: '2s' }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, white 0, white 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, white 0, white 1px, transparent 1px, transparent 60px)',
        }}
      />

      {/* Large background page title — decorative */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-syne font-extrabold text-[18vw] leading-none whitespace-nowrap opacity-[0.03]"
          style={{ color: config.accentColor }}
        >
          {config.title.toUpperCase()}
        </span>
      </div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 glass rounded-3xl p-10 sm:p-14 max-w-2xl w-full mx-4 sm:mx-auto text-center"
        style={{
          borderColor: `${config.accentColor}30`,
          boxShadow: `0 0 80px ${config.accentColor}15, 0 0 40px rgba(0,0,0,0.4)`,
        }}
      >
        {/* Tagline pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-dm font-medium uppercase tracking-widest mb-6 border"
          style={{
            color: config.accentColor,
            borderColor: `${config.accentColor}40`,
            background: `${config.accentColor}10`,
          }}
        >
          {config.tagline}
        </motion.div>

        {/* Floating icon */}
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-7xl mb-5 block"
        >
          {config.icon}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-syne font-extrabold text-4xl sm:text-5xl gradient-text mb-4"
        >
          {config.title}
        </motion.h1>

        {/* Coming soon divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div
            className="h-px flex-1 max-w-16"
            style={{ background: `linear-gradient(to right, transparent, ${config.accentColor})` }}
          />
          <span
            className="font-dm text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: config.accentColor }}
          >
            Coming Soon
          </span>
          <div
            className="h-px flex-1 max-w-16"
            style={{ background: `linear-gradient(to left, transparent, ${config.accentColor})` }}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-dm text-white/60 text-base sm:text-lg leading-relaxed mb-10 max-w-lg mx-auto"
        >
          {config.desc}
        </motion.p>

        {/* Build progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-10 space-y-3 text-left"
        >
          <p className="font-dm text-white/30 text-xs uppercase tracking-widest text-center mb-4">
            Build Progress
          </p>
          {progressSteps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3">
              <span className="font-dm text-white/40 text-xs w-20 shrink-0">{step.label}</span>
              <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${step.pct}%` }}
                  transition={{ delay: 0.7 + i * 0.12, duration: 0.9, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${config.accentColorAlt}, ${config.accentColor})`,
                  }}
                />
              </div>
              <span className="font-dm text-white/30 text-xs w-8 text-right">{step.pct}%</span>
            </div>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            to="/"
            className="shimmer-btn px-8 py-3.5 rounded-full font-dm font-medium text-sm text-white shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center justify-center gap-2"
          >
            ← Back to Home
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3.5 rounded-full font-dm font-medium text-sm border-2 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              color: config.accentColor,
              borderColor: `${config.accentColor}60`,
            }}
          >
            Get in Touch
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="font-dm text-white/25 text-xs mt-6"
        >
          Have a project in mind? Reach out — we're available right now.
        </motion.p>
      </motion.div>
    </div>
  )
}
