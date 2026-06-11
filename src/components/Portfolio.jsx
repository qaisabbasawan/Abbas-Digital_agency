import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import RevealText from './anim/RevealText'
import Magnetic from './anim/Magnetic'

const featured = [
  {
    id: 1,
    title: 'TechCorp Solutions',
    client: 'TechCorp Inc.',
    cat: 'Web',
    yr: '2024',
    metric: '+40%',
    metricLabel: 'Conversion Rate',
    desc: 'Corporate rebrand with custom CMS, multilingual support & Next.js.',
    tags: ['React', 'Next.js', 'Tailwind'],
    from: '#1A3BBF',
    to: '#2E55E0',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=600&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'LuxeWear Fashion',
    client: 'LuxeWear Ltd.',
    cat: 'E-Commerce',
    yr: '2024',
    metric: '$2M',
    metricLabel: 'Revenue Generated',
    desc: 'Shopify store with virtual try-on, loyalty programme & AR viewer.',
    tags: ['Shopify', 'Liquid', 'AR'],
    from: '#7C1D6F',
    to: '#E8155A',
    img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&h=600&fit=crop&q=80',
  },
  {
    id: 5,
    title: 'FitPulse Fitness',
    client: 'FitPulse Co.',
    cat: 'Mobile',
    yr: '2024',
    metric: '50K',
    metricLabel: 'Active Users',
    desc: 'iOS & Android fitness app with AI workout plans and social feed.',
    tags: ['React Native', 'Firebase', 'AI'],
    from: '#7C3AED',
    to: '#A855F7',
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&h=600&fit=crop&q=80',
  },
  {
    id: 7,
    title: 'ShopBot AI',
    client: 'ShopBot Technologies',
    cat: 'AI',
    yr: '2024',
    metric: '80%',
    metricLabel: 'Queries Automated',
    desc: 'WhatsApp + Messenger AI chatbot handling orders & returns 24/7.',
    tags: ['GPT-4', 'Node.js', 'WhatsApp API'],
    from: '#0C4A6E',
    to: '#2E55E0',
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&h=600&fit=crop&q=80',
  },
  {
    id: 9,
    title: 'RealEstate360 SEO',
    client: 'RealEstate360',
    cat: 'Marketing',
    yr: '2024',
    metric: '3×',
    metricLabel: 'Organic Traffic',
    desc: 'Technical SEO + content strategy delivering results over 6 months.',
    tags: ['SEO', 'Ahrefs', 'Analytics'],
    from: '#7C2D12',
    to: '#E8155A',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&h=600&fit=crop&q=80',
  },
  {
    id: 11,
    title: 'NovaLabs Rebrand',
    client: 'NovaLabs',
    cat: 'Branding',
    yr: '2024',
    metric: 'Full',
    metricLabel: 'Brand System',
    desc: 'Logo, typography, colour system and comprehensive brand guidelines.',
    tags: ['Brand Identity', 'Figma', 'Guidelines'],
    from: '#4C1D95',
    to: '#D97706',
    img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&h=600&fit=crop&q=80',
  },
]

const catColors = {
  Web: '#2E55E0',
  'E-Commerce': '#E8155A',
  Mobile: '#A855F7',
  AI: '#0891B2',
  Marketing: '#F97316',
  Branding: '#D97706',
}

/* ── One stacking deck card ── */
function StackCard({ p, i, total, progress }) {
  /* Cards beneath the stack shrink progressively as new ones land on top */
  const targetScale = 1 - (total - 1 - i) * 0.045
  const scale = useTransform(progress, [i / total, 1], [1, targetScale])
  const catColor = catColors[p.cat]

  return (
    <div
      className="sticky mb-[7vh] lg:mb-[9vh]"
      style={{ top: `calc(13vh + ${i * 18}px)`, zIndex: i + 1 }}
    >
      <motion.div style={{ scale, transformOrigin: 'center top' }}>
        <div
          className="group relative grid grid-cols-1 lg:grid-cols-[11fr_13fr] overflow-hidden rounded-[28px] border border-white/10 lg:h-[62vh] lg:max-h-[560px] lg:min-h-[440px]"
          style={{
            // opaque base layer underneath the colour tint — cards behind must not bleed through
            background: `linear-gradient(125deg, ${p.from}33 0%, transparent 52%, ${p.to}1C 100%), linear-gradient(#0A1130, #0A1130)`,
            boxShadow: '0 30px 90px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          {/* ── Content ── */}
          <div className="relative flex flex-col p-7 sm:p-10 lg:p-12 order-last lg:order-first">
            {/* ghost watermark number */}
            <span
              aria-hidden
              className="absolute -bottom-6 right-4 font-bold leading-none select-none pointer-events-none"
              style={{
                fontSize: 'clamp(120px, 12vw, 190px)',
                color: 'transparent',
                WebkitTextStroke: `1.5px ${p.from}38`,
              }}
            >
              0{i + 1}
            </span>

            <div className="flex items-center justify-between mb-7">
              <span
                className="px-3 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold text-white"
                style={{ background: `${catColor}26`, border: `1px solid ${catColor}55` }}
              >
                {p.cat}
              </span>
              <span className="text-white/30 text-[11px] tracking-[0.25em]">
                0{i + 1} / 0{total}
              </span>
            </div>

            <h3
              className="font-bold text-white leading-[1.05] mb-2"
              style={{ fontSize: 'clamp(1.7rem, 2.8vw, 2.5rem)' }}
            >
              {p.title}
            </h3>
            <p className="text-white/35 text-[11px] uppercase tracking-[0.2em] mb-5">{p.client} · {p.yr}</p>
            <p className="text-white/55 text-[14.5px] leading-relaxed max-w-md">{p.desc}</p>

            {/* metric + tags + CTA pinned to the bottom */}
            <div className="mt-auto pt-8">
              <div className="flex items-end gap-3 mb-6">
                <span
                  className="font-bold leading-none"
                  style={{
                    fontSize: 'clamp(2.4rem, 3.6vw, 3.4rem)',
                    background: `linear-gradient(135deg, ${p.to}, #fff)`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {p.metric}
                </span>
                <span className="text-white/40 text-[11px] uppercase tracking-[0.18em] pb-1.5">{p.metricLabel}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {p.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-[11px] text-white/60"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {tag}
                  </span>
                ))}
                <Link
                  to="/portfolio"
                  className="ml-auto inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-semibold transition-all duration-300 hover:gap-3.5"
                  style={{ color: p.to }}
                >
                  View Case
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300 group-hover:rotate-45"
                    style={{ border: `1px solid ${p.to}55`, background: `${p.to}14` }}
                  >
                    <ArrowUpRight size={14} strokeWidth={2} />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* ── Image ── */}
          <div className="relative h-60 sm:h-72 lg:h-auto overflow-hidden">
            <img
              src={p.img}
              alt={p.title}
              loading="lazy"
              onError={e => { e.target.style.display = 'none' }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
            />
            {/* blend into the card */}
            <div
              className="absolute inset-0 pointer-events-none hidden lg:block"
              style={{ background: 'linear-gradient(90deg, #0A1130 0%, transparent 32%)' }}
            />
            <div
              className="absolute inset-0 pointer-events-none lg:hidden"
              style={{ background: 'linear-gradient(0deg, transparent 55%, rgba(10,17,48,0.85) 100%)' }}
            />
            {/* colour wash */}
            <div
              className="absolute inset-0 mix-blend-soft-light pointer-events-none"
              style={{ background: `linear-gradient(135deg, ${p.from}66, transparent 60%)` }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Portfolio() {
  const deckRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="portfolio" className="py-28 lg:py-36 bg-bg-dark relative">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-16 lg:mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4"
            >
              Our Work
            </motion.p>
            <h2
              className="font-bold leading-[1.04]"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}
            >
              <RevealText as="span" className="text-white inline-block" stagger={0.08}>
                Work That
              </RevealText>{' '}
              <RevealText as="span" className="inline-block" gradient delay={0.25} stagger={0.09}>
                Performs.
              </RevealText>
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-white/35 text-[13px] max-w-[230px] leading-relaxed sm:text-right"
          >
            Six featured projects. Scroll through the deck — every card is a real result.
          </motion.p>
        </div>

        {/* ── Stacking deck ── */}
        <div ref={deckRef} className="relative">
          {featured.map((p, i) => (
            <StackCard key={p.id} p={p} i={i} total={featured.length} progress={scrollYProgress} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="mt-10 flex justify-center"
        >
          <Magnetic>
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-white/60 text-sm border border-white/15 hover:text-white hover:border-white/40 hover:bg-white/[0.04] transition-all duration-300"
            >
              See All Projects
              <span className="flex items-center justify-center w-7 h-7 rounded-full border border-white/15 group-hover:border-white/40 group-hover:rotate-45 transition-all duration-300">
                <ArrowUpRight size={13} strokeWidth={2} />
              </span>
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
