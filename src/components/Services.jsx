import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Globe, ShoppingCart, Smartphone,
  Bot, TrendingUp, Palette,
} from 'lucide-react'
import RevealText from './anim/RevealText'
import TiltCard from './anim/TiltCard'

const services = [
  {
    Icon: Globe,
    title: 'Web Development',
    desc: 'Custom WordPress, WooCommerce and React/Next.js websites built for performance, SEO, and conversions.',
    link: '/services',
    color: '#2E55E0',
  },
  {
    Icon: ShoppingCart,
    title: 'E-Commerce',
    desc: 'Shopify, WooCommerce, Amazon and eBay stores with seamless payment integration and conversion optimisation.',
    link: '/services',
    color: '#E8155A',
  },
  {
    Icon: Smartphone,
    title: 'Mobile Apps',
    desc: 'Native iOS and Android apps from concept to App Store launch. Great UX, clean code, ongoing support.',
    link: '/services',
    color: '#7C3AED',
  },
  {
    Icon: Bot,
    title: 'AI & Chatbots',
    desc: 'WhatsApp and Facebook chatbots, ChatGPT integrations and smart automation that works around the clock.',
    link: '/services',
    color: '#0891B2',
  },
  {
    Icon: TrendingUp,
    title: 'Digital Marketing',
    desc: 'SEO, Google Ads, social media management and email campaigns designed to drive qualified traffic and real ROI.',
    link: '/services',
    color: '#059669',
  },
  {
    Icon: Palette,
    title: 'Branding & Design',
    desc: 'Logo design, brand identity, UI/UX and marketing materials that make your business unforgettable.',
    link: '/services',
    color: '#D97706',
  },
]

const fade = (i) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { delay: i * 0.09, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function Services() {
  return (
    <section id="services" className="py-28 lg:py-36 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-3">
              What We Do
            </motion.p>
            <RevealText as="h2" className="font-bold text-white leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }} delay={0.1} stagger={0.09}>
              Our Services
            </RevealText>
          </div>
          <motion.div {...fade(2)}>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors duration-200 group"
            >
              View All Services
              <span className="w-5 h-px bg-white/30 group-hover:bg-white group-hover:w-8 transition-all duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(({ Icon, title, desc, link, color }, i) => (
            <motion.div key={title} {...fade(i + 2)} className="h-full">
              <TiltCard glareColor={`${color}1F`}>
              <Link
                to={link}
                className="group relative flex flex-col h-full p-8 bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300 rounded-2xl overflow-hidden"
              >
                {/* Top accent line on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                >
                  <Icon
                    size={22}
                    style={{ color }}
                    strokeWidth={1.6}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-bold text-white text-xl mb-3">{title}</h3>
                <p className="text-white/50 text-[14px] leading-relaxed mb-6 flex-1">{desc}</p>

                <span
                  className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                  style={{ color }}
                >
                  Learn More
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
