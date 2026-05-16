import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Phone, Mail, Clock } from 'lucide-react'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const services = [
  { title: 'SEO Services Islamabad', desc: 'Rank higher on Google Pakistan. We help Islamabad businesses dominate local and national search results.' },
  { title: 'Web Design Islamabad', desc: 'Custom, fast-loading websites built to convert Islamabad visitors into paying customers.' },
  { title: 'E-Commerce Development', desc: 'Shopify, WooCommerce and custom stores built for Pakistani audiences with local payment gateways.' },
  { title: 'Digital Marketing Pakistan', desc: "Google Ads, Facebook and Instagram campaigns targeted to Pakistan's fastest-growing markets." },
  { title: 'Mobile App Development', desc: "iOS and Android apps built by Islamabad's leading digital agency for Pakistani consumers." },
  { title: 'AI & Chatbot Solutions', desc: 'WhatsApp and Messenger chatbots that automate sales and support for Pakistani businesses.' },
]

const faqs = [
  { q: 'Where is Abbas Digital Agency located in Islamabad?', a: 'Our Islamabad office is at H 1-A, IVY Street, Banigala, Islamabad, Pakistan.' },
  { q: 'Do you serve clients outside Islamabad?', a: 'Yes. While we are based in Islamabad, we work with clients across Pakistan — Lahore, Karachi, Rawalpindi, Peshawar — and internationally.' },
  { q: 'How quickly can you start a project?', a: 'We typically begin discovery within 48 hours of your first inquiry. Contact us to get started today.' },
  { q: 'What industries do you serve in Islamabad?', a: 'Real estate, retail, healthcare, education, restaurants, tech startups, and professional services — we have delivered projects across every major sector.' },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { delay, duration: 0.62 },
})

export default function IslamabadPage() {
  return (
    <div className="min-h-screen bg-bg-dark pt-[72px]">
      <SEO
        title="Digital Marketing Agency Islamabad | SEO & Web Design Pakistan"
        description="Abbas Digital Agency — Islamabad's leading digital marketing, SEO, web design and mobile app development agency. Serving businesses across Pakistan since 2012."
        keywords="digital marketing agency Islamabad, SEO services Islamabad, web design Islamabad, web development company Islamabad, digital agency Pakistan, online marketing Islamabad"
        path="/islamabad"
      />

      {/* Hero */}
      <section className="py-20 lg:py-28 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div {...fade(0)} className="flex items-center gap-2 mb-4">
            <MapPin size={14} className="text-brand-pink" />
            <span className="text-brand-pink text-[11px] tracking-[0.28em] uppercase">Islamabad, Pakistan</span>
          </motion.div>
          <motion.h1
            {...fade(0.08)}
            className="font-bold text-white leading-tight mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          >
            Digital Marketing<br />Agency Islamabad
          </motion.h1>
          <motion.p {...fade(0.18)} className="text-white/50 text-[15px] max-w-xl leading-relaxed mb-8">
            Pakistan's premier digital agency — headquartered in Islamabad with a decade of delivering world-class websites, SEO, and digital campaigns for businesses across Pakistan and beyond.
          </motion.p>
          <motion.div {...fade(0.26)} className="flex flex-col sm:flex-row gap-3">
            <Link to="/contact" className="shimmer-btn inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm text-white hover:opacity-90 transition-opacity">
              Free Consultation <ArrowUpRight size={15} />
            </Link>
            <Link to="/portfolio" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm text-white/60 border border-white/15 hover:text-white hover:border-white/35 transition-all duration-250">
              See Our Work
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 lg:py-28 border-b border-white/[0.06] bg-bg-dark2">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-3">What We Do</motion.p>
          <motion.h2 {...fade(0.08)} className="font-bold text-white leading-tight mb-12" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)' }}>
            Services for Islamabad Businesses
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div key={s.title} {...fade(i * 0.08)}
                className="p-7 bg-white/[0.03] border border-white/[0.07] rounded-xl hover:border-brand-pink/20 transition-colors duration-300">
                <h3 className="font-bold text-white text-[17px] mb-3">{s.title}</h3>
                <p className="text-white/50 text-[14px] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 lg:py-28 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-3">Why Abbas Digital</motion.p>
            <motion.h2 {...fade(0.08)} className="font-bold text-white leading-tight mb-7" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)' }}>
              Islamabad's Most Trusted<br /><span className="gradient-text">Digital Agency</span>
            </motion.h2>
            <div className="space-y-5">
              {[
                { title: '10+ Years in Pakistan', desc: 'Founded in Islamabad in 2012 — we understand the Pakistani market better than anyone.' },
                { title: 'US-Registered Company', desc: 'Abbas Digital Agency LLC is registered in Montana, USA, giving international clients confidence and reliability.' },
                { title: '500+ Projects Delivered', desc: 'From small businesses in G-11 to enterprises in Blue Area — we have delivered results for every type of client.' },
                { title: 'Transparent Pricing', desc: 'No hidden fees. No vague proposals. Just clear deliverables, timelines, and results.' },
              ].map((item, i) => (
                <motion.div key={item.title} {...fade(0.12 + i * 0.08)} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-brand-pink mt-2 shrink-0" />
                  <div>
                    <p className="text-white font-semibold text-[15px] mb-1">{item.title}</p>
                    <p className="text-white/45 text-[14px] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact card */}
          <motion.div {...fade(0.2)} className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-8">
            <p className="text-white/30 text-[11px] uppercase tracking-[0.18em] mb-5">Islamabad Office</p>
            <div className="space-y-4">
              {[
                { icon: <MapPin size={15} />, text: 'H 1-A, IVY Street, Banigala, Islamabad, Pakistan' },
                { icon: <Mail size={15} />, text: 'mqaisawan@gmail.com' },
                { icon: <Clock size={15} />, text: 'Mon – Sat · 9 AM – 7 PM PKT' },
              ].map((it, i) => (
                <div key={i} className="flex items-start gap-3 text-white/60 text-[14px]">
                  <span className="text-brand-pink mt-0.5 shrink-0">{it.icon}</span>
                  {it.text}
                </div>
              ))}
            </div>
            <Link to="/contact"
              className="mt-7 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
              Get a Free Quote <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-bg-dark2 border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-3">FAQ</motion.p>
          <motion.h2 {...fade(0.08)} className="font-bold text-white leading-tight mb-12" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)' }}>
            Common Questions
          </motion.h2>
          <div className="space-y-5">
            {faqs.map((faq, i) => (
              <motion.div key={i} {...fade(i * 0.1)} className="p-6 bg-white/[0.03] border border-white/[0.07] rounded-xl">
                <h3 className="text-white font-semibold text-[15px] mb-2">{faq.q}</h3>
                <p className="text-white/50 text-[14px] leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <motion.h2 {...fade(0)} className="font-bold text-white leading-tight mb-4" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
            Ready to Grow Your<br />Islamabad Business?
          </motion.h2>
          <motion.p {...fade(0.1)} className="text-white/45 text-[15px] mb-10 max-w-sm mx-auto leading-relaxed">
            Get a free consultation with our Islamabad team today.
          </motion.p>
          <motion.div {...fade(0.2)}>
            <Link to="/contact" className="shimmer-btn inline-flex items-center gap-2 px-10 py-3.5 text-sm text-white hover:opacity-90 transition-opacity">
              Start a Project <ArrowUpRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
