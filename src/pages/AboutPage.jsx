import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import useCountUp from '../hooks/useCountUp'
import SEO from '../components/SEO'

const stats = [
  { value:10,  suffix:'+', label:'Years Experience' },
  { value:500, suffix:'+', label:'Projects Delivered' },
  { value:50,  suffix:'+', label:'Happy Clients' },
  { value:5,   suffix:'★', label:'Star Rating' },
]

const values = [
  { title:'Quality First',             desc:'Every project is built to the highest standard. We never cut corners.' },
  { title:'On-Time Delivery',          desc:'Deadlines are commitments. We plan carefully and execute precisely.' },
  { title:'Transparent Communication', desc:'No surprises. We keep you in the loop at every stage of the project.' },
  { title:'Results Driven',            desc:'We measure success by your growth — real, measurable business results.' },
]

const fade = (delay = 0) => ({
  initial:{ opacity:0, y:24 },
  whileInView:{ opacity:1, y:0 },
  viewport:{ once:true, margin:'-60px' },
  transition:{ delay, duration:0.62, ease:[0.25,0.46,0.45,0.94] },
})

function Stat({ s, i }) {
  const { count, ref } = useCountUp(s.value, 1800)
  return (
    <motion.div ref={ref} {...fade(i * 0.1)}
      className="p-7 bg-white/[0.03] border border-white/[0.07] rounded-xl text-center"
    >
      <p className="font-bold text-white text-4xl mb-1">{count}{s.suffix}</p>
      <p className="text-white/40 text-[11px] uppercase tracking-[0.18em]">{s.label}</p>
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-dark pt-[72px]">
      <SEO
        title="About Abbas Digital Agency — US-Registered, Pakistan-Based"
        description="Learn about Abbas Digital Agency LLC — a US-registered, Pakistan-based digital marketing agency serving clients since 2012 with world-class SEO, web design and more."
        keywords="about Abbas Digital Agency, digital agency Pakistan, Abbas Digital Agency LLC Montana, digital marketing Islamabad"
        path="/about"
      />

      {/* Page hero */}
      <section className="py-20 lg:py-28 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4">
            Who We Are
          </motion.p>
          <motion.h1 {...fade(0.08)}
            className="font-bold text-white leading-tight mb-5"
            style={{ fontSize:'clamp(3rem,7vw,6rem)' }}
          >
            About Us
          </motion.h1>
          <motion.p {...fade(0.18)} className="text-white/50 text-[15px] max-w-lg leading-relaxed">
            A decade of building digital products that matter. Based in Islamabad, trusted globally.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28 border-b border-white/[0.06] bg-bg-dark2">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-3">Our Story</motion.p>
            <motion.h2 {...fade(0.08)} className="font-bold text-white leading-tight mb-7" style={{ fontSize:'clamp(2rem,4vw,3.2rem)' }}>
              Built From Passion,<br /><span className="gradient-text">Driven By Results</span>
            </motion.h2>
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

          <motion.div {...fade(0.2)}
            className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 sm:p-10"
          >
            <div className="flex items-center gap-4 mb-7 pb-7 border-b border-white/[0.07]">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-blue to-brand-pink flex items-center justify-center font-bold text-white text-lg shrink-0">
                MQ
              </div>
              <div>
                <p className="text-white font-semibold">Muhammad Qais Abbas</p>
                <p className="text-white/40 text-[13px] mt-0.5">Founder & CEO · Islamabad, Pakistan</p>
              </div>
            </div>
            <blockquote className="text-white/65 text-[15px] leading-relaxed italic">
              "My goal from day one has been to make premium digital services accessible to every
              business in Pakistan. Technology should not be a barrier — it should be your
              greatest competitive advantage."
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s,i) => <Stat key={s.label} s={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-bg-dark2 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-3">Our Values</motion.p>
          <motion.h2 {...fade(0.08)} className="font-bold text-white leading-tight mb-12" style={{ fontSize:'clamp(2rem,4vw,3.2rem)' }}>
            What Drives Us
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v,i) => (
              <motion.div key={v.title} {...fade(i * 0.1)}
                className="p-7 bg-white/[0.03] border border-white/[0.07] rounded-xl hover:border-brand-pink/25 transition-colors duration-300"
              >
                <h3 className="font-bold text-white text-lg mb-3">{v.title}</h3>
                <p className="text-white/50 text-[14px] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <motion.h2 {...fade(0)} className="font-bold text-white leading-tight mb-4" style={{ fontSize:'clamp(2.2rem,4.5vw,3.8rem)' }}>
            Ready to Work Together?
          </motion.h2>
          <motion.p {...fade(0.1)} className="text-white/45 text-[15px] mb-10 max-w-sm mx-auto leading-relaxed">
            Tell us about your project and we will get back to you within 24 hours.
          </motion.p>
          <motion.div {...fade(0.2)} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="shimmer-btn inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm text-white hover:opacity-90 transition-opacity">
              Start a Project →
            </Link>
            <Link to="/services" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm text-white/60 border border-white/15 hover:text-white hover:border-white/35 transition-all duration-250">
              View Services
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
