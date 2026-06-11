import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import RevealText from './anim/RevealText'
import TiltCard from './anim/TiltCard'

const featured = [
  {
    id: 1,
    title: 'TechCorp Solutions',
    client: 'TechCorp Inc.',
    cat: 'Web',
    yr: '2024',
    metric: '+40% Conv.',
    desc: 'Corporate rebrand with custom CMS, multilingual support & Next.js.',
    tags: ['React', 'Next.js', 'Tailwind'],
    from: '#1A3BBF',
    to: '#2E55E0',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'LuxeWear Fashion',
    client: 'LuxeWear Ltd.',
    cat: 'E-Commerce',
    yr: '2024',
    metric: '$2M Revenue',
    desc: 'Shopify store with virtual try-on, loyalty programme & AR viewer.',
    tags: ['Shopify', 'Liquid', 'AR'],
    from: '#7C1D6F',
    to: '#E8155A',
    img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 5,
    title: 'FitPulse Fitness',
    client: 'FitPulse Co.',
    cat: 'Mobile',
    yr: '2024',
    metric: '50K Users',
    desc: 'iOS & Android fitness app with AI workout plans and social feed.',
    tags: ['React Native', 'Firebase', 'AI'],
    from: '#7C3AED',
    to: '#A855F7',
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 7,
    title: 'ShopBot AI',
    client: 'ShopBot Technologies',
    cat: 'AI',
    yr: '2024',
    metric: '80% Automated',
    desc: 'WhatsApp + Messenger AI chatbot handling orders & returns 24/7.',
    tags: ['GPT-4', 'Node.js', 'WhatsApp API'],
    from: '#0C4A6E',
    to: '#2E55E0',
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 9,
    title: 'RealEstate360 SEO',
    client: 'RealEstate360',
    cat: 'Marketing',
    yr: '2024',
    metric: '3× Organic',
    desc: 'Technical SEO + content strategy delivering results over 6 months.',
    tags: ['SEO', 'Ahrefs', 'Analytics'],
    from: '#7C2D12',
    to: '#E8155A',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 11,
    title: 'NovaLabs Rebrand',
    client: 'NovaLabs',
    cat: 'Branding',
    yr: '2024',
    metric: 'Full System',
    desc: 'Logo, typography, colour system and comprehensive brand guidelines.',
    tags: ['Brand Identity', 'Figma', 'Guidelines'],
    from: '#4C1D95',
    to: '#D97706',
    img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=500&fit=crop&q=80',
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

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-28 lg:py-36 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-3"
          >
            Our Work
          </motion.p>
          <RevealText as="h2" className="font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }} delay={0.1} stagger={0.09}>
            Selected Projects
          </RevealText>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.09, duration: 0.55 }}
              className="h-full"
            >
              <TiltCard max={7} glareColor={`${p.from}26`}>
              <div
                className="group h-full bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.14] transition-all duration-300 cursor-pointer"
              >
              {/* Image area */}
              <div
                className="relative h-48 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                  onError={e => { e.target.style.display = 'none' }}
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

                {/* Top-left: category chip */}
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full backdrop-blur-sm"
                  style={{ background: `${catColors[p.cat]}33`, border: `1px solid ${catColors[p.cat]}55` }}
                >
                  <span className="text-white text-[10px] tracking-widest uppercase font-medium">{p.cat}</span>
                </div>

                {/* Top-right: year */}
                <div className="absolute top-3 right-3">
                  <span className="text-white/40 text-[11px]">{p.yr}</span>
                </div>

                {/* Bottom-right: metric badge */}
                <div
                  className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full"
                  style={{ background: `${p.from}CC`, border: `1px solid ${p.from}` }}
                >
                  <span className="text-white text-[10px] font-semibold tracking-wide">{p.metric}</span>
                </div>

                {/* Colored top border line that appears on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${p.from}, ${p.to})` }}
                />
              </div>

              {/* Card body */}
              <div
                className="p-5 transition-all duration-300"
                style={{
                  boxShadow: 'none',
                }}
              >
                <div className="mb-1">
                  <h3 className="font-bold text-white text-[17px] leading-snug">{p.title}</h3>
                  <p className="text-white/40 text-[11px] mt-0.5 tracking-wide uppercase">{p.client}</p>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mt-2 mb-4">{p.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-[10px] tracking-wide"
                      style={{
                        background: `${p.from}22`,
                        border: `1px solid ${p.from}44`,
                        color: `${p.from}`,
                        filter: 'brightness(1.6)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
              </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-14 flex justify-center"
        >
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2.5 text-white/50 text-sm hover:text-white transition-colors duration-250"
          >
            See All Projects
            <span className="flex items-center justify-center w-7 h-7 rounded-full border border-white/15 group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-300">
              <ArrowUpRight size={13} strokeWidth={2} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
