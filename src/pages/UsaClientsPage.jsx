import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Mail, Clock, Globe, MessageCircle } from 'lucide-react'
import Footer from '../components/Footer'
import { EmailText } from '../components/EmailLink'
import SEO from '../components/SEO'

const services = [
  { title: 'Web Design for US Clients', desc: 'Pixel-perfect, conversion-focused websites for American businesses — at a fraction of US agency rates.' },
  { title: 'SEO Services USA', desc: 'Rank on Google.com with proven technical SEO, content strategy, and link-building campaigns.' },
  { title: 'E-Commerce Development', desc: 'Shopify and WooCommerce stores built and optimised for US consumers and payment processors.' },
  { title: 'Digital Marketing USA', desc: 'Google Ads and Meta campaigns managed by certified specialists delivering measurable ROI.' },
  { title: 'Mobile App Development', desc: 'iOS and Android apps built on React Native and Flutter — App Store and Google Play ready.' },
  { title: 'AI & Automation', desc: 'Custom GPT-powered chatbots and workflow automation for US businesses looking to scale.' },
]

const advantages = [
  { title: 'US-Registered LLC', desc: 'Abbas Digital Agency LLC is officially registered in Kalispell, Montana — fully compliant and trustworthy for American clients.' },
  { title: 'Same-Day Communication', desc: 'Dedicated project managers available during US business hours via email, Slack, or Zoom.' },
  { title: 'Premium Quality, Offshore Pricing', desc: 'US-grade deliverables at 60–70% below typical American agency rates — without sacrificing quality.' },
  { title: 'Proven Track Record', desc: '10+ years, 500+ projects, and clients from New York to California who keep coming back.' },
]

const faqs = [
  { q: 'Is Abbas Digital Agency a US company?', a: 'Yes. Abbas Digital Agency LLC is registered in Kalispell, Montana, USA. Our mailing address is 1001 S Main St Ste 500, Kalispell, MT 59901.' },
  { q: 'How do US clients communicate with your team?', a: 'We work asynchronously with US clients via email, Slack, and scheduled Zoom calls. Our team covers US business hours for urgent matters.' },
  { q: 'Do you accept US payment methods?', a: 'Yes — we accept PayPal, Wise, bank transfer, and Stripe for US clients. Invoicing is done in USD.' },
  { q: 'What time zone do you operate in?', a: 'Our primary team is in Islamabad (PKT, UTC+5). We schedule regular check-ins during US morning hours to align with client availability.' },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { delay, duration: 0.62 },
})

export default function UsaClientsPage() {
  return (
    <div className="min-h-screen bg-bg-dark pt-[72px]">
      <SEO
        title="Digital Marketing Agency for US Clients | Abbas Digital Agency USA"
        description="Abbas Digital Agency LLC — US-registered digital marketing, SEO, web design and app development agency serving clients across the United States. Montana-based, world-class quality."
        keywords="digital marketing agency USA, SEO agency for US clients, web design company USA, affordable web development USA, offshore digital agency Montana"
        path="/usa-clients"
      />

      {/* Hero */}
      <section className="py-20 lg:py-28 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div {...fade(0)} className="flex items-center gap-2 mb-4">
            <Globe size={14} className="text-brand-pink" />
            <span className="text-brand-pink text-[11px] tracking-[0.28em] uppercase">Serving the United States</span>
          </motion.div>
          <motion.h1
            {...fade(0.08)}
            className="font-bold text-white leading-tight mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          >
            Digital Agency<br />for US Clients
          </motion.h1>
          <motion.p {...fade(0.18)} className="text-white/50 text-[15px] max-w-xl leading-relaxed mb-8">
            US-registered, globally capable. Abbas Digital Agency LLC delivers premium web design, SEO, and digital marketing to American businesses — with the quality you expect and pricing you will love.
          </motion.p>
          <motion.div {...fade(0.26)} className="flex flex-col sm:flex-row gap-3">
            <Link to="/contact" className="shimmer-btn inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm text-white hover:opacity-90 transition-opacity">
              Get a Free Quote <ArrowUpRight size={15} />
            </Link>
            <Link to="/portfolio" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm text-white/60 border border-white/15 hover:text-white hover:border-white/35 transition-all duration-250">
              See Our Work
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 border-b border-white/[0.06] bg-bg-dark2">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-3">Our Services</motion.p>
          <motion.h2 {...fade(0.08)} className="font-bold text-white leading-tight mb-12" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)' }}>
            Everything Your US Business Needs
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

      {/* Advantages */}
      <section className="py-20 lg:py-28 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-3">Why Work With Us</motion.p>
            <motion.h2 {...fade(0.08)} className="font-bold text-white leading-tight mb-8" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)' }}>
              The Smart Choice for<br /><span className="gradient-text">American Businesses</span>
            </motion.h2>
            <div className="space-y-5">
              {advantages.map((item, i) => (
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

          {/* US office card */}
          <motion.div {...fade(0.2)} className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-8">
            <p className="text-white/30 text-[11px] uppercase tracking-[0.18em] mb-5">US Mailing Address</p>
            <div className="space-y-4">
              {[
                { icon: <MapPin size={15} />, text: '1001 S Main St Ste 500, Kalispell, MT 59901, USA' },
                { icon: <Mail size={15} />, text: <EmailText /> },
                { icon: <MessageCircle size={15} />, text: <a href="https://wa.me/16677662781" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">WhatsApp: +1 (667) 766-2781</a> },
                { icon: <Clock size={15} />, text: 'Available during US business hours' },
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
              Start a Project <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-bg-dark2 border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-3">FAQ</motion.p>
          <motion.h2 {...fade(0.08)} className="font-bold text-white leading-tight mb-12" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)' }}>
            Questions from US Clients
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
            Let's Build Something<br />Great Together
          </motion.h2>
          <motion.p {...fade(0.1)} className="text-white/45 text-[15px] mb-10 max-w-sm mx-auto leading-relaxed">
            Free consultation for all US-based businesses. Response within 24 hours.
          </motion.p>
          <motion.div {...fade(0.2)}>
            <Link to="/contact" className="shimmer-btn inline-flex items-center gap-2 px-10 py-3.5 text-sm text-white hover:opacity-90 transition-opacity">
              Contact Us Today <ArrowUpRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
