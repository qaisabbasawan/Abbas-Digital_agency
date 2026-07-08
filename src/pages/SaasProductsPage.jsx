import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FileText, Download, Leaf, ArrowUpRight, CheckCircle2, Sparkles, Rocket,
} from 'lucide-react'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { breadcrumbSchema } from '../lib/schema'
import RevealText from '../components/anim/RevealText'
import TiltCard from '../components/anim/TiltCard'
import Magnetic from '../components/anim/Magnetic'

const products = [
  {
    name: 'CV Maker Free',
    url: 'https://cvmakerfree.com/',
    Icon: FileText,
    category: 'Career Tools',
    tagline: 'Build a job-winning résumé in minutes',
    desc: 'A free, browser-based résumé builder with professionally designed templates — no sign-up, no paywalls. Fill in your details and export a polished, ATS-friendly CV instantly.',
    features: ['Multiple professional templates', 'Instant PDF export', '100% free, no account needed'],
    stat: '100% Free',
    from: '#1A3BBF',
    to: '#2E55E0',
  },
  {
    name: 'DownloadMyVideo',
    url: 'https://downloadmyvideo.com/',
    Icon: Download,
    category: 'Media Tool',
    tagline: 'Download videos from 1,000+ platforms',
    desc: 'A fast, privacy-first video downloader supporting YouTube, TikTok, Instagram, Facebook and more — up to 4K quality, with no watermark, signup or tracking.',
    features: ['Up to 4K video & MP3 audio', '1,000+ supported platforms', 'No signup, no watermark, no tracking'],
    stat: '90M+ Downloads',
    from: '#7C1D6F',
    to: '#E8155A',
  },
  {
    name: 'AI Plant Doctor',
    url: 'https://ai-plant-doctor-nu.vercel.app/',
    Icon: Leaf,
    category: 'AI · AgriTech',
    tagline: 'Diagnose plant diseases instantly with AI',
    desc: 'Snap a photo of any plant and let our AI identify diseases, pests and nutrient deficiencies in seconds — complete with treatment tips to help it thrive again.',
    features: ['Instant AI photo diagnosis', 'Care & treatment recommendations', 'Works on any plant, anywhere'],
    stat: 'Instant Diagnosis',
    from: '#065F46',
    to: '#10B981',
  },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { delay, duration: 0.62 },
})

export default function SaasProductsPage() {
  return (
    <div className="min-h-screen bg-bg-dark pt-[72px]">
      <SEO
        title="SaaS Products | Abbas Digital Agency"
        description="Explore SaaS products built by Abbas Digital Agency — CV Maker Free, DownloadMyVideo and AI Plant Doctor. Try each product live."
        keywords="Abbas Digital Agency SaaS products, CV Maker Free, DownloadMyVideo, AI Plant Doctor"
        path="/saas-products"
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'SaaS Products', path: '/saas-products' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: products.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'SoftwareApplication',
                name: p.name,
                url: p.url,
                applicationCategory: p.category,
                description: p.desc,
                operatingSystem: 'Web',
              },
            })),
          },
        ]}
      />

      {/* ── Hero ── */}
      <section className="relative py-20 lg:py-28 border-b border-white/[0.06] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            maskImage: 'radial-gradient(ellipse 70% 80% at 65% 45%, #000 25%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 65% 45%, #000 25%, transparent 75%)',
          }}
        />
        <div className="absolute -top-24 left-0 w-[460px] h-[460px] bg-brand-blue/[0.08] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[380px] h-[380px] bg-brand-pink/[0.08] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <motion.p {...fade(0)} className="inline-flex items-center gap-2 text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-5">
              <Sparkles size={13} strokeWidth={2} />
              Our Products
            </motion.p>
            <h1 className="font-bold leading-[1.0] mb-6" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.2rem)' }}>
              <RevealText as="span" className="text-white block" stagger={0.09}>
                Products We've
              </RevealText>
              <RevealText as="span" className="block" gradient delay={0.22} stagger={0.1}>
                Built & Shipped.
              </RevealText>
            </h1>
            <motion.p {...fade(0.3)} className="text-white/50 text-[15px] max-w-md leading-relaxed mb-8">
              Real, live SaaS applications designed and developed in-house — from AI tools to enterprise software.
              Explore them below and try each one for yourself.
            </motion.p>
            <motion.div {...fade(0.4)} className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[11px] text-white/60" style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                4 products · live now
              </div>
            </motion.div>
          </div>

          {/* 3D orbiting product ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:flex justify-center"
          >
            <div className="saas-orbit-stage">
              <div className="saas-orbit-core">
                <Rocket size={26} color="#fff" strokeWidth={1.7} />
              </div>
              <div className="saas-orbit-ring">
                {products.map((p, i) => {
                  const angle = (360 / products.length) * i
                  return (
                    <div
                      key={p.name}
                      className="saas-orbit-item"
                      style={{ transform: `rotateY(${angle}deg) translateZ(150px)` }}
                    >
                      <div className="saas-orbit-counter">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${p.from}, ${p.to})`,
                            boxShadow: `0 0 26px ${p.to}55`,
                          }}
                        >
                          <p.Icon size={24} color="#fff" strokeWidth={1.7} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Product grid ── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard max={6} glareColor={`${p.from}22`}>
                  <div
                    className="group relative flex flex-col h-full rounded-3xl overflow-hidden p-7 lg:p-8"
                    style={{
                      background: `linear-gradient(165deg, ${p.from}1C, transparent 55%), linear-gradient(#0A1130, #0A1130)`,
                      border: `1px solid ${p.from}33`,
                    }}
                  >
                    {/* hover accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(90deg, ${p.from}, ${p.to})` }}
                    />
                    {/* ambient glow */}
                    <div
                      className="absolute -top-16 -right-16 w-52 h-52 rounded-full blur-3xl opacity-30 pointer-events-none transition-opacity duration-500 group-hover:opacity-50"
                      style={{ background: p.to }}
                    />

                    <div className="relative flex items-start justify-between gap-4 mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-400 group-hover:scale-110 group-hover:-rotate-3"
                        style={{
                          background: `linear-gradient(135deg, ${p.from}, ${p.to})`,
                          boxShadow: `0 8px 28px ${p.to}40`,
                        }}
                      >
                        <p.Icon size={24} color="#fff" strokeWidth={1.7} />
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span
                          className="px-2.5 py-1 rounded-full text-[9px] font-bold tracking-[0.18em] uppercase"
                          style={{ background: `${p.to}18`, border: `1px solid ${p.to}40`, color: p.to, filter: 'brightness(1.5)' }}
                        >
                          {p.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[10px] text-white/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Live
                        </span>
                      </div>
                    </div>

                    <h3 className="text-white font-bold text-[22px] leading-snug mb-1.5">{p.name}</h3>
                    <p
                      className="text-[13px] font-semibold mb-4"
                      style={{
                        background: `linear-gradient(90deg, ${p.to}, #fff)`,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {p.tagline}
                    </p>
                    <p className="text-white/50 text-sm leading-relaxed mb-6">{p.desc}</p>

                    <ul className="space-y-2.5 mb-7">
                      {p.features.map(f => (
                        <li key={f} className="flex items-start gap-2.5 text-white/60 text-[13px] leading-snug">
                          <CheckCircle2 size={15} strokeWidth={2} style={{ color: p.to }} className="shrink-0 mt-[1px]" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="relative mt-auto flex items-center justify-between gap-4 pt-5" style={{ borderTop: `1px solid ${p.from}2A` }}>
                      <span
                        className="text-[13px] font-bold"
                        style={{
                          background: `linear-gradient(90deg, ${p.from}, ${p.to})`,
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {p.stat}
                      </span>
                      <Magnetic strength={0.25}>
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-semibold text-white tracking-wide transition-transform duration-300 hover:scale-[1.04]"
                          style={{ background: `linear-gradient(90deg, ${p.from}, ${p.to})`, boxShadow: `0 8px 24px ${p.to}45` }}
                        >
                          Launch App
                          <ArrowUpRight size={14} strokeWidth={2.2} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </a>
                      </Magnetic>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-bg-dark2 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4">
            Got a Product Idea?
          </motion.p>
          <h2 className="font-bold leading-[1.08] mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            <RevealText as="span" className="text-white block" stagger={0.06}>
              Let's Build Your
            </RevealText>
            <RevealText as="span" className="block" gradient delay={0.3} stagger={0.08}>
              Next SaaS Product.
            </RevealText>
          </h2>
          <motion.p {...fade(0.3)} className="text-white/45 text-[15px] mb-10 max-w-sm mx-auto leading-relaxed">
            From idea to launch — we design, build and ship full-stack SaaS applications end to end.
          </motion.p>
          <motion.div {...fade(0.4)}>
            <Magnetic>
              <Link
                to="/contact"
                className="shimmer-btn inline-flex items-center gap-2 px-10 py-3.5 text-sm text-white hover:opacity-90 transition-opacity"
              >
                Start Your Project
                <ArrowUpRight size={15} strokeWidth={2} />
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
