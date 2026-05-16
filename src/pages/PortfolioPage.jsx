import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const projects = [
  {
    id: 1,
    title: 'TechCorp Solutions',
    client: 'TechCorp Inc.',
    cat: 'Web',
    yr: '2024',
    metric: '+40% Conv.',
    desc: 'Corporate rebrand with custom CMS, multilingual support and performance-first Next.js architecture.',
    tags: ['React', 'Next.js', 'Tailwind'],
    from: '#1A3BBF',
    to: '#2E55E0',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'GreenLeaf Organics',
    client: 'GreenLeaf Farm',
    cat: 'Web',
    yr: '2024',
    metric: '3× Traffic',
    desc: 'Farm-to-table website featuring a recipe blog, seasonal menus and local delivery integration.',
    tags: ['WordPress', 'WooCommerce', 'SEO'],
    from: '#065F46',
    to: '#059669',
    img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'LuxeWear Fashion',
    client: 'LuxeWear Ltd.',
    cat: 'E-Commerce',
    yr: '2024',
    metric: '$2M Revenue',
    desc: 'Shopify flagship store with virtual try-on technology, loyalty programme and AR product viewer.',
    tags: ['Shopify', 'Liquid', 'AR'],
    from: '#7C1D6F',
    to: '#E8155A',
    img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'ByteGadgets Store',
    client: 'ByteGadgets',
    cat: 'E-Commerce',
    yr: '2023',
    metric: '500+ SKUs',
    desc: 'WooCommerce electronics store with a custom product configurator and Redis-powered search.',
    tags: ['WooCommerce', 'PHP', 'Redis'],
    from: '#1E3A8A',
    to: '#0891B2',
    img: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 5,
    title: 'FitPulse Fitness',
    client: 'FitPulse Co.',
    cat: 'Mobile',
    yr: '2024',
    metric: '50K Users',
    desc: 'iOS & Android fitness app with AI-generated workout plans and a social accountability feed.',
    tags: ['React Native', 'Firebase', 'AI'],
    from: '#7C3AED',
    to: '#A855F7',
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 6,
    title: 'MediCare Health',
    client: 'MediCare Clinic',
    cat: 'Mobile',
    yr: '2023',
    metric: '10K Patients',
    desc: 'Telemedicine app enabling online booking, HD video consultations and digital prescriptions.',
    tags: ['Flutter', 'WebRTC', 'AWS'],
    from: '#0E7490',
    to: '#06B6D4',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 7,
    title: 'ShopBot AI',
    client: 'ShopBot Technologies',
    cat: 'AI',
    yr: '2024',
    metric: '80% Automated',
    desc: 'WhatsApp + Messenger AI chatbot handling product orders, returns and customer queries 24/7.',
    tags: ['GPT-4', 'Node.js', 'WhatsApp API'],
    from: '#0C4A6E',
    to: '#2E55E0',
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 8,
    title: 'SupportAI Assistant',
    client: 'TelecomPro',
    cat: 'AI',
    yr: '2024',
    metric: '−65% Tickets',
    desc: 'Custom GPT-powered support bot for a telecom provider, built with Langchain and RAG pipelines.',
    tags: ['OpenAI', 'Python', 'Langchain'],
    from: '#1E1B4B',
    to: '#0891B2',
    img: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 9,
    title: 'RealEstate360 SEO',
    client: 'RealEstate360',
    cat: 'Marketing',
    yr: '2024',
    metric: '3× Organic',
    desc: 'Technical SEO audit plus a 6-month content strategy that tripled organic search traffic.',
    tags: ['SEO', 'Ahrefs', 'Analytics'],
    from: '#7C2D12',
    to: '#E8155A',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 10,
    title: 'FoodieHub Ads',
    client: 'FoodieHub',
    cat: 'Marketing',
    yr: '2023',
    metric: '4.8× ROAS',
    desc: 'Integrated Google and Meta ad campaigns for a food delivery app achieving 4.8× return on spend.',
    tags: ['Google Ads', 'Meta Ads', 'Analytics'],
    from: '#831843',
    to: '#F97316',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 11,
    title: 'NovaLabs Rebrand',
    client: 'NovaLabs',
    cat: 'Branding',
    yr: '2024',
    metric: 'Full System',
    desc: 'Complete brand identity including logo, typography scale, colour system and detailed brand guidelines.',
    tags: ['Brand Identity', 'Figma', 'Guidelines'],
    from: '#4C1D95',
    to: '#D97706',
    img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 12,
    title: 'Bloom Spa Identity',
    client: 'Bloom Luxury Spa',
    cat: 'Branding',
    yr: '2023',
    metric: '100% Custom',
    desc: 'Luxury spa brand from scratch — bespoke logo, packaging design, printed menus and social kit.',
    tags: ['Logo', 'Packaging', 'Social Kit'],
    from: '#831843',
    to: '#7C3AED',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=500&fit=crop&q=80',
  },
]

const tabs = ['All', 'Web', 'E-Commerce', 'Mobile', 'AI', 'Marketing', 'Branding']

const catColors = {
  Web: '#2E55E0',
  'E-Commerce': '#E8155A',
  Mobile: '#A855F7',
  AI: '#0891B2',
  Marketing: '#F97316',
  Branding: '#D97706',
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { delay, duration: 0.62 },
})

export default function PortfolioPage() {
  const [active, setActive] = useState('All')
  const list = active === 'All' ? projects : projects.filter(p => p.cat === active)

  return (
    <div className="min-h-screen bg-bg-dark pt-[72px]">
      <SEO
        title="Our Work & Portfolio | Abbas Digital Agency Pakistan"
        description="Explore Abbas Digital Agency's portfolio of web design, SEO and digital marketing projects for clients across Pakistan and the USA."
        keywords="Abbas Digital Agency portfolio, web design portfolio Pakistan, digital marketing projects Pakistan"
        path="/portfolio"
      />

      {/* Page hero */}
      <section className="py-20 lg:py-28 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4">
            Our Portfolio
          </motion.p>
          <motion.h1
            {...fade(0.08)}
            className="font-bold text-white leading-tight mb-5"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
          >
            Selected Work
          </motion.h1>
          <motion.p {...fade(0.18)} className="text-white/50 text-[15px] max-w-md leading-relaxed">
            12 featured projects spanning web, mobile, AI, marketing and branding — a slice of 500+ delivered.
          </motion.p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`px-4 py-1.5 text-xs tracking-widest uppercase rounded-full transition-all duration-250 ${
                  active === t
                    ? 'bg-white text-bg-dark font-semibold'
                    : 'border border-white/[0.12] text-white/45 hover:text-white hover:border-white/25'
                }`}
              >
                {t}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ delay: i * 0.06, duration: 0.42 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.14] transition-all duration-300 cursor-pointer"
                >
                  {/* Image area */}
                  <div
                    className="relative h-48 overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
                  >
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

                    {/* Colored top border on hover */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, ${p.from}, ${p.to})` }}
                    />

                    {/* Category chip */}
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full backdrop-blur-sm"
                      style={{
                        background: `${catColors[p.cat]}33`,
                        border: `1px solid ${catColors[p.cat]}55`,
                      }}
                    >
                      <span className="text-white text-[10px] tracking-widest uppercase font-medium">{p.cat}</span>
                    </div>

                    {/* Year */}
                    <div className="absolute top-3 right-3">
                      <span className="text-white/40 text-[11px]">{p.yr}</span>
                    </div>

                    {/* Metric badge */}
                    <div
                      className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full"
                      style={{ background: `${p.from}CC`, border: `1px solid ${p.from}` }}
                    >
                      <span className="text-white text-[10px] font-semibold tracking-wide">{p.metric}</span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <div className="mb-2">
                      <h3 className="font-bold text-white text-[17px] leading-snug">{p.title}</h3>
                      <p className="text-white/40 text-[11px] mt-0.5 tracking-wide uppercase">{p.client}</p>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">{p.desc}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-[10px] tracking-wide"
                          style={{
                            background: `${p.from}22`,
                            border: `1px solid ${p.from}44`,
                            color: p.from,
                            filter: 'brightness(1.6)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 bg-bg-dark2 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <motion.p
            {...fade(0)}
            className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4"
          >
            Start a Project
          </motion.p>
          <motion.h2
            {...fade(0.08)}
            className="font-bold text-white leading-tight mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Ready to Add Your Project<br className="hidden sm:block" /> to This List?
          </motion.h2>
          <motion.p
            {...fade(0.16)}
            className="text-white/45 text-[15px] mb-10 max-w-sm mx-auto leading-relaxed"
          >
            Tell us about your idea — we will turn it into something remarkable.
          </motion.p>
          <motion.div {...fade(0.24)}>
            <Link
              to="/contact"
              className="shimmer-btn inline-flex items-center gap-2 px-10 py-3.5 text-sm text-white hover:opacity-90 transition-opacity"
            >
              Start Your Project
              <ArrowUpRight size={15} strokeWidth={2} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
