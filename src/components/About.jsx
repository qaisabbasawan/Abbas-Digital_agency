import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  CalendarDays, FolderCheck, Users, Star, ArrowUpRight,
} from 'lucide-react'
import LinkedInIcon from './icons/LinkedInIcon'
import useCountUp from '../hooks/useCountUp'
import Magnetic from './anim/Magnetic'
import TiltCard from './anim/TiltCard'
import RevealText from './anim/RevealText'

const stats = [
  { value: 10,  suffix: '+', label: 'Years Experience', color: '#2E55E0', Icon: CalendarDays },
  { value: 500, suffix: '+', label: 'Projects Done',    color: '#E8155A', Icon: FolderCheck },
  { value: 50,  suffix: '+', label: 'Happy Clients',    color: '#7C3AED', Icon: Users },
  { value: 5,   suffix: '★', label: 'Star Rating',      color: '#D97706', Icon: Star },
]

const expertise = ['WordPress', 'Shopify', 'React', 'Next.js', 'Mobile Apps', 'AI Solutions', 'SEO', 'Branding']

/* ── Rotating circular "EST 2012" badge ── */
function RotatingBadge() {
  return (
    <div className="absolute -top-12 -left-12 w-[110px] h-[110px] z-10 hidden sm:block">
      <div className="absolute inset-0 animate-spin-slower">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
          </defs>
          <text fontSize="8" letterSpacing="2.6" fill="rgba(255,255,255,0.55)" fontWeight="600">
            <textPath href="#badge-circle">EST 2012 · ISLAMABAD · TRUSTED ·</textPath>
          </text>
        </svg>
      </div>
      <div
        className="absolute inset-[30px] rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #1A3BBF, #E8155A)',
          boxShadow: '0 0 28px rgba(232,21,90,0.4)',
        }}
      >
        <ArrowUpRight size={20} color="#fff" strokeWidth={2.2} />
      </div>
    </div>
  )
}

/* ── One animated stat cell ── */
function StatCell({ value, suffix, label, color, Icon, i }) {
  const { count, ref } = useCountUp(value, 1800)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative p-6 rounded-2xl overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* corner glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(90% 70% at 20% 0%, ${color}1C, transparent 70%)` }}
      />
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${color}16`, border: `1px solid ${color}30`, boxShadow: `0 0 16px ${color}20` }}
      >
        <Icon size={16} style={{ color }} strokeWidth={1.9} />
      </div>
      <p className="text-white font-bold text-[34px] leading-none tracking-tight">
        {count}<span style={{ color }}>{suffix}</span>
      </p>
      <p className="text-white/35 text-[10.5px] uppercase tracking-[0.2em] mt-2">{label}</p>
    </motion.div>
  )
}

export default function About() {
  const sectionRef = useRef(null)

  /* Parallax — panel drifts slower than the page */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const yPanel = useTransform(scrollYProgress, [0, 1], [64, -64])
  const yGlow  = useTransform(scrollYProgress, [0, 1], [120, -120])

  return (
    <section id="about" ref={sectionRef} className="py-28 lg:py-36 bg-bg-dark2 relative overflow-hidden">

      {/* Dot grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 42%, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 42%, #000 30%, transparent 75%)',
        }}
      />
      {/* Aurora glows with parallax */}
      <motion.div
        style={{ y: yGlow }}
        className="absolute top-1/3 -left-24 w-[420px] h-[420px] bg-brand-blue/[0.10] rounded-full blur-[130px] pointer-events-none"
      />
      <motion.div
        style={{ y: yPanel }}
        className="absolute bottom-0 -right-20 w-[380px] h-[380px] bg-brand-pink/[0.08] rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">

        {/* ── Header ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4"
        >
          About Us
        </motion.p>
        <h2
          className="font-bold leading-[1.04] mb-14 lg:mb-20"
          style={{ fontSize: 'clamp(2.3rem, 4.8vw, 4.2rem)' }}
        >
          <RevealText as="span" className="text-white inline-block" stagger={0.07}>
            A Decade of
          </RevealText>{' '}
          <RevealText as="span" className="inline-block" gradient delay={0.25} stagger={0.09}>
            Digital Excellence.
          </RevealText>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[6fr_6fr] gap-14 lg:gap-20 items-center">

          {/* ── Left — narrative ── */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="text-white/55 text-[15.5px] leading-relaxed mb-5"
            >
              Abbas Digital Agency was founded in 2012 by Muhammad Qais Abbas with a clear
              vision — to help businesses thrive in the digital world. Based in Islamabad,
              we have grown into a leading full-service agency trusted by clients across
              Pakistan and globally.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="text-white/55 text-[15.5px] leading-relaxed mb-9"
            >
              Over 500 successful projects, one consistent standard: excellence.
            </motion.p>

            {/* Expertise chips — staggered pop-in */}
            <div className="flex flex-wrap gap-2 mb-10">
              {expertise.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.6, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-3.5 py-1.5 rounded-full text-[12px] text-white/65 cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.035)',
                    border: '1px solid rgba(255,255,255,0.09)',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.3, duration: 0.55 }}
              className="flex flex-wrap gap-3"
            >
              <Magnetic>
                <Link
                  to="/about"
                  data-hc-target="about"
                  className="shimmer-btn inline-flex items-center gap-2 px-7 py-3.5 text-sm text-white hover:opacity-90 transition-opacity"
                >
                  Our Full Story
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm text-white/60 border border-white/15 hover:text-white hover:border-white/35 transition-all duration-250"
                >
                  Work With Us
                </Link>
              </Magnetic>
            </motion.div>
          </div>

          {/* ── Right — 3D stats hologram panel with parallax ── */}
          <motion.div style={{ y: yPanel }} className="relative lg:pl-4">
            <RotatingBadge />

            <TiltCard max={6} glareColor="rgba(255,255,255,0.07)">
              <div
                className="relative p-7 sm:p-8 rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(165deg, rgba(46,85,224,0.10), rgba(8,14,42,0.65) 50%, rgba(232,21,90,0.07))',
                  border: '1px solid rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)',
                }}
              >
                {/* sheen line */}
                <div
                  className="absolute top-0 left-10 right-10 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
                />

                <div className="grid grid-cols-2 gap-3">
                  {stats.map((s, i) => <StatCell key={s.label} {...s} i={i} />)}
                </div>

                {/* Founder row */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: 0.5, duration: 0.55 }}
                  className="mt-4 flex items-center gap-4 p-5 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="relative shrink-0">
                    <img
                      src="/team/qais-abbas.png"
                      alt="Muhammad Qais Abbas"
                      width={48} height={48} loading="lazy" decoding="async"
                      className="w-12 h-12 rounded-full object-cover bg-white"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-[#0A1130]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold">Muhammad Qais Abbas</p>
                    <p className="text-white/40 text-xs mt-0.5">Founder & CEO · Est. 2012</p>
                  </div>
                  <motion.a
                    href="https://www.linkedin.com/in/qaisabbas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Muhammad Qais Abbas on LinkedIn"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(232,21,90,0.12)',
                      border: '1px solid rgba(232,21,90,0.4)',
                      color: '#FF2D72',
                      boxShadow: '0 0 16px rgba(232,21,90,0.25)',
                    }}
                  >
                    <LinkedInIcon size={15} />
                  </motion.a>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
