import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  CalendarDays, FolderCheck, Users, Star,
  Gem, Clock3, MessagesSquare, TrendingUp,
} from 'lucide-react'
import LinkedInIcon from '../components/icons/LinkedInIcon'
import Footer from '../components/Footer'
import useCountUp from '../hooks/useCountUp'
import SEO from '../components/SEO'
import { organizationSchema, breadcrumbSchema } from '../lib/schema'
import RevealText from '../components/anim/RevealText'
import TiltCard from '../components/anim/TiltCard'
import Magnetic from '../components/anim/Magnetic'

const stats = [
  { value: 10,  suffix: '+', label: 'Years Experience',   color: '#2E55E0', Icon: CalendarDays },
  { value: 500, suffix: '+', label: 'Projects Delivered', color: '#E8155A', Icon: FolderCheck },
  { value: 50,  suffix: '+', label: 'Happy Clients',      color: '#7C3AED', Icon: Users },
  { value: 5,   suffix: '★', label: 'Star Rating',        color: '#D97706', Icon: Star },
]

const team = [
  {
    name: 'Muhammad Yasin',
    role: 'MERN-Stack Developer',
    initials: 'MY',
    color: '#2E55E0',
    img: '/team/muhammad-yasin.jpeg',
    linkedin: 'https://www.linkedin.com/in/muhammad-yasin-86b417413/',
  },
  {
    name: 'Nabeel Faisal',
    role: 'AI Automation Specialist',
    initials: 'NF',
    color: '#7C3AED',
    img: '/team/nabeel-faisal.jpg',
    linkedin: 'https://www.linkedin.com/in/nabeel-faisal-sheikh/',
  },
  {
    name: 'Gohar Abbas',
    role: 'Project Manager',
    initials: 'GA',
    color: '#E8155A',
    img: '/team/gohar-abbas.jpeg',
    linkedin: 'https://www.linkedin.com/in/gohar-abbas-a95288409/',
  },
  {
    name: 'Umme Farwa',
    role: 'Digital Marketing Expert',
    initials: 'UF',
    color: '#059669',
    img: '/team/umme-farwa-v2.jpeg',
    linkedin: 'https://www.linkedin.com/in/umm-e-farwa-7b057928a/',
  },
]

const values = [
  { Icon: Gem,             color: '#2E55E0', title: 'Quality First',             desc: 'Every project is built to the highest standard. We never cut corners.' },
  { Icon: Clock3,          color: '#7C3AED', title: 'On-Time Delivery',          desc: 'Deadlines are commitments. We plan carefully and execute precisely.' },
  { Icon: MessagesSquare,  color: '#E8155A', title: 'Transparent Communication', desc: 'No surprises. We keep you in the loop at every stage of the project.' },
  { Icon: TrendingUp,      color: '#059669', title: 'Results Driven',            desc: 'We measure success by your growth — real, measurable business results.' },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { delay, duration: 0.62, ease: [0.25, 0.46, 0.45, 0.94] },
})

/* ── Animated stat cell ── */
function Stat({ s, i }) {
  const { count, ref } = useCountUp(s.value, 1800)
  return (
    <motion.div
      ref={ref}
      {...fade(i * 0.1)}
      className="group relative p-7 rounded-2xl overflow-hidden text-center"
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(90% 70% at 50% 0%, ${s.color}1C, transparent 70%)` }}
      />
      <div
        className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${s.color}16`, border: `1px solid ${s.color}30`, boxShadow: `0 0 18px ${s.color}20` }}
      >
        <s.Icon size={17} style={{ color: s.color }} strokeWidth={1.9} />
      </div>
      <p className="font-bold text-white text-4xl mb-1 tracking-tight">
        {count}<span style={{ color: s.color }}>{s.suffix}</span>
      </p>
      <p className="text-white/40 text-[11px] uppercase tracking-[0.18em]">{s.label}</p>
    </motion.div>
  )
}

/* ── Team member card — photo slot with styled placeholder fallback ── */
function TeamCard({ m, i }) {
  const [imgOk, setImgOk] = useState(true)
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <TiltCard max={8} glareColor={`${m.color}26`}>
        <div
          className="group relative rounded-3xl overflow-hidden h-full"
          style={{
            background: `linear-gradient(165deg, ${m.color}14, transparent 50%), linear-gradient(#0A1130, #0A1130)`,
            border: `1px solid ${m.color}2E`,
          }}
        >
          {/* hover accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(90deg, transparent, ${m.color}, transparent)` }}
          />

          {/* ── Photo area ── */}
          <div className="relative aspect-[4/4.4] overflow-hidden">
            {imgOk ? (
              <img
                src={m.img}
                alt={m.name}
                loading="lazy"
                onError={() => setImgOk(false)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
              />
            ) : (
              /* placeholder until the real photo lands in /public/team/ */
              <div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ background: `radial-gradient(130% 100% at 50% 0%, ${m.color}2E, #0A1130 75%)` }}
              >
                <div className="relative w-24 h-24">
                  <div
                    className="absolute inset-0 rounded-full animate-spin-slower"
                    style={{
                      background: `conic-gradient(from 0deg, transparent 18%, ${m.color} 42%, transparent 68%)`,
                      WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
                      mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
                    }}
                  />
                  <div
                    className="absolute inset-[6px] rounded-full flex items-center justify-center font-bold text-white text-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${m.color}, ${m.color}66)`,
                      boxShadow: `0 0 34px ${m.color}45`,
                    }}
                  >
                    {m.initials}
                  </div>
                </div>
                <p className="text-white/25 text-[9.5px] uppercase tracking-[0.28em] mt-5">Photo coming soon</p>
              </div>
            )}

            {/* bottom blend into the card body */}
            <div
              className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
              style={{ background: 'linear-gradient(0deg, #0A1130, transparent)' }}
            />
            {/* index chip */}
            <span
              className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.2em] text-white/70"
              style={{ background: 'rgba(5,9,26,0.6)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
            >
              0{i + 1}
            </span>
          </div>

          {/* ── Info ── */}
          <div className="relative px-6 pb-7 -mt-3 flex items-end justify-between gap-3">
            <div>
              <h3 className="text-white font-bold text-[19px] leading-tight mb-1.5">{m.name}</h3>
              <p
                className="text-[12px] font-semibold tracking-[0.14em] uppercase inline-flex items-center gap-2"
                style={{ color: m.color }}
              >
                <span className="w-4 h-px" style={{ background: m.color }} />
                {m.role}
              </p>
            </div>
            <motion.a
              href={m.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${m.name} on LinkedIn`}
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center mb-0.5"
              style={{
                background: `${m.color}16`,
                border: `1px solid ${m.color}45`,
                color: m.color,
                boxShadow: `0 0 16px ${m.color}25`,
              }}
            >
              <LinkedInIcon size={15} />
            </motion.a>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-dark pt-[72px]">
      <SEO
        title="About Abbas Digital Agency — US-Registered, Pakistan-Based"
        description="Learn about Abbas Digital Agency LLC — a US-registered, Pakistan-based digital marketing agency serving clients since 2012 with world-class SEO, web design and more."
        keywords="about Abbas Digital Agency, digital agency Pakistan, Abbas Digital Agency LLC Montana, digital marketing Islamabad, Abbas Digital Agency team"
        path="/about"
        schema={[
          organizationSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />

      {/* ── Page hero ── */}
      <section className="relative py-20 lg:py-28 border-b border-white/[0.06] overflow-hidden">
        {/* dot grid + aurora */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            maskImage: 'radial-gradient(ellipse 70% 80% at 35% 50%, #000 25%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 35% 50%, #000 25%, transparent 75%)',
          }}
        />
        <div className="absolute -top-20 right-0 w-[440px] h-[440px] bg-brand-blue/[0.09] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[360px] h-[360px] bg-brand-pink/[0.06] rounded-full blur-[120px] pointer-events-none" />

        {/* ghost watermark */}
        <span
          aria-hidden
          className="absolute right-2 lg:right-10 bottom-2 font-bold leading-none select-none pointer-events-none hidden md:block"
          style={{
            fontSize: 'clamp(120px, 14vw, 220px)',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(255,255,255,0.06)',
          }}
        >
          2012
        </span>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-5">
            Who We Are
          </motion.p>
          <h1 className="font-bold leading-[1.0] mb-6" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
            <RevealText as="span" className="text-white inline-block" stagger={0.09}>
              About
            </RevealText>{' '}
            <RevealText as="span" className="inline-block" gradient delay={0.2} stagger={0.12}>
              Us.
            </RevealText>
          </h1>
          <motion.p {...fade(0.3)} className="text-white/50 text-[15px] max-w-lg leading-relaxed">
            A decade of building digital products that matter. Based in Islamabad, trusted globally.
          </motion.p>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-20 lg:py-28 border-b border-white/[0.06] bg-bg-dark2 relative overflow-hidden">
        <div className="absolute top-1/2 -right-24 w-[380px] h-[380px] -translate-y-1/2 bg-brand-pink/[0.06] rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center relative">
          <div>
            <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4">Our Story</motion.p>
            <h2 className="font-bold leading-[1.06] mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              <RevealText as="span" className="text-white inline-block" stagger={0.06}>
                Built From Passion,
              </RevealText>
              <br />
              <RevealText as="span" className="inline-block" gradient delay={0.3} stagger={0.07}>
                Driven By Results.
              </RevealText>
            </h2>
            <div className="space-y-4">
              {[
                'Abbas Digital Agency was founded in 2012 by Muhammad Qais Abbas with one clear vision — to help Pakistani businesses compete and win in the digital world. What started as a small web studio in Islamabad has grown into a full-service agency trusted by clients across Pakistan and internationally.',
                'Over the past decade, we have delivered more than 500 projects across web development, e-commerce, mobile apps, AI solutions and digital marketing. Each project is approached with the same level of care and commitment that defined our earliest work.',
                "Today, we are a team of designers, developers, marketers and strategists — all united by a passion for technology and a drive to help our clients grow.",
              ].map((p, i) => (
                <motion.p key={i} {...fade(0.18 + i * 0.1)} className="text-white/55 text-[15px] leading-relaxed">{p}</motion.p>
              ))}
            </div>
          </div>

          {/* Founder quote — 3D tilt card */}
          <motion.div {...fade(0.2)}>
            <TiltCard max={6} glareColor="rgba(255,255,255,0.07)">
              <div
                className="relative rounded-3xl p-8 sm:p-10 overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, rgba(46,85,224,0.10), rgba(8,14,42,0.7) 55%, rgba(232,21,90,0.06))',
                  border: '1px solid rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)',
                }}
              >
                {/* gradient quote mark */}
                <span
                  aria-hidden
                  className="absolute -top-4 right-6 leading-none select-none pointer-events-none font-bold"
                  style={{
                    fontSize: '8rem',
                    background: 'linear-gradient(135deg, rgba(46,85,224,0.35), transparent 75%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  "
                </span>

                <div className="flex items-center gap-4 mb-7 pb-7 border-b border-white/[0.07]">
                  {/* photo with spinning energy ring */}
                  <div className="relative w-16 h-16 shrink-0">
                    <div
                      className="absolute inset-0 rounded-full animate-spin-slower"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent 18%, #E8155A 42%, transparent 68%)',
                        WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
                        mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
                      }}
                    />
                    <img
                      src="/team/qais-abbas.png"
                      alt="Muhammad Qais Abbas"
                      loading="lazy" decoding="async"
                      className="absolute inset-[5px] w-[calc(100%-10px)] h-[calc(100%-10px)] rounded-full object-cover bg-white"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Muhammad Qais Abbas</p>
                    <p className="text-white/40 text-[13px] mt-0.5">Founder & CEO · Islamabad, Pakistan</p>
                  </div>
                  <motion.a
                    href="https://www.linkedin.com/in/qaisabbas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Muhammad Qais Abbas on LinkedIn"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="ml-auto shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(232,21,90,0.12)',
                      border: '1px solid rgba(232,21,90,0.4)',
                      color: '#FF2D72',
                      boxShadow: '0 0 18px rgba(232,21,90,0.25)',
                    }}
                  >
                    <LinkedInIcon size={16} />
                  </motion.a>
                </div>
                <blockquote className="text-white/65 text-[15px] leading-relaxed italic">
                  "My goal from day one has been to make premium digital services accessible to every
                  business in Pakistan. Technology should not be a barrier — it should be your
                  greatest competitive advantage."
                </blockquote>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => <Stat key={s.label} s={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── Our Professional Team ── */}
      <section className="py-20 lg:py-28 border-b border-white/[0.06] relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[420px] h-[420px] bg-brand-blue/[0.06] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">
          <div className="text-center mb-14 lg:mb-18">
            <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4">
              The People
            </motion.p>
            <h2 className="font-bold leading-[1.05]" style={{ fontSize: 'clamp(2.1rem, 4.4vw, 3.6rem)' }}>
              <RevealText as="span" className="text-white inline-block" stagger={0.07}>
                Our Professional
              </RevealText>{' '}
              <RevealText as="span" className="inline-block" gradient delay={0.25} stagger={0.1}>
                Team.
              </RevealText>
            </h2>
            <motion.p {...fade(0.3)} className="text-white/40 text-[15px] mt-5 max-w-md mx-auto leading-relaxed">
              The specialists behind every launch — engineers, strategists and marketers
              working as one unit.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((m, i) => <TeamCard key={m.name} m={m} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 lg:py-28 bg-bg-dark2 border-b border-white/[0.06] relative overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-[380px] h-[380px] bg-brand-pink/[0.05] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4">Our Values</motion.p>
          <h2 className="font-bold leading-tight mb-12" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            <RevealText as="span" className="text-white inline-block" stagger={0.07}>
              What Drives
            </RevealText>{' '}
            <RevealText as="span" className="inline-block" gradient delay={0.22} stagger={0.1}>
              Us.
            </RevealText>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <motion.div key={v.title} {...fade(i * 0.1)} className="h-full">
                <TiltCard max={7} glareColor={`${v.color}22`}>
                  <div
                    className="group relative p-7 rounded-2xl overflow-hidden h-full"
                    style={{
                      background: `linear-gradient(150deg, ${v.color}10, transparent 45%), rgba(255,255,255,0.02)`,
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
                      style={{ background: `radial-gradient(100% 70% at 50% 0%, ${v.color}1E, transparent 65%)` }}
                    />
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${v.color}14`, border: `1px solid ${v.color}30`, boxShadow: `0 0 20px ${v.color}1E` }}
                    >
                      <v.Icon size={20} style={{ color: v.color }} strokeWidth={1.7} />
                    </div>
                    <h3 className="font-bold text-white text-lg mb-3">{v.title}</h3>
                    <p className="text-white/50 text-[14px] leading-relaxed">{v.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[300px] bg-brand-blue/[0.07] rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center relative">
          <h2 className="font-bold leading-tight mb-5" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>
            <RevealText as="span" className="text-white inline-block" stagger={0.07}>
              Ready to Work
            </RevealText>{' '}
            <RevealText as="span" className="inline-block" gradient delay={0.25} stagger={0.1}>
              Together?
            </RevealText>
          </h2>
          <motion.p {...fade(0.2)} className="text-white/45 text-[15px] mb-10 max-w-sm mx-auto leading-relaxed">
            Tell us about your project and we will get back to you within 24 hours.
          </motion.p>
          <motion.div {...fade(0.3)} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Magnetic>
              <Link to="/contact" className="shimmer-btn inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm text-white hover:opacity-90 transition-opacity">
                Start a Project →
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/services" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm text-white/60 border border-white/15 hover:text-white hover:border-white/35 transition-all duration-250">
                View Services
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
