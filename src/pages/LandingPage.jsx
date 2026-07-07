import { useEffect, useRef } from 'react'
import SEO from '../components/SEO'
import { organizationSchema, localBusinessPK, localBusinessUSA, homepageFaqSchema } from '../lib/schema'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroScene    from '../components/HeroScene'
import Hero         from '../components/Hero'
import Marquee      from '../components/Marquee'
import Services     from '../components/Services'
import About        from '../components/About'
import Process      from '../components/Process'
import Portfolio    from '../components/Portfolio'
import Testimonials       from '../components/Testimonials'
import AIAnalyzerSection  from '../components/AIAnalyzerSection'
import FAQ          from '../components/FAQ'
import Contact      from '../components/Contact'
import Footer       from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────────────────
   ScrollSection — clean scroll-linked entrance: each section rises, fades
   and settles as it enters the viewport. Reversible (scrubbed by scroll),
   no exit animation, no blur — keeps the page light and the rhythm varied.
───────────────────────────────────────────────────────────────────────── */
function ScrollSection({ children }) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.96', 'start 0.45'],
  })

  const y       = useTransform(scrollYProgress, [0, 1], [64, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1])
  const scale   = useTransform(scrollYProgress, [0, 1], [0.965, 1])

  return (
    <motion.div ref={ref} style={{ y, opacity, scale, transformOrigin: 'center top' }}>
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   LandingPage
───────────────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(canvasRef.current, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          start: 0,
          end:   () => window.innerHeight * 0.65,
          scrub: 1.5,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <SEO
        title="Digital Marketing Agency Islamabad & Montana USA | Abbas Digital Agency"
        description="Abbas Digital Agency — digital marketing agency in Islamabad, Pakistan & Montana, USA. SEO, web design, mobile apps & branding. US-registered LLC. Free quote."
        keywords="digital marketing agency Islamabad, digital marketing agency Montana, SEO services Pakistan, seo agency montana usa, web design company Pakistan, web design montana, mobile app development Pakistan, branding agency Pakistan, best SEO company Pakistan"
        path="/"
        schema={[organizationSchema(), localBusinessPK(), localBusinessUSA(), homepageFaqSchema()]}
      />
      {/* Fixed 3-D background */}
      <div
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      >
        <HeroScene />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>

        {/* Hero — sticky pin zone (hero stays on screen for 80 vh while zooming back) */}
        <div style={{ height: '180vh', position: 'relative' }}>
          <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
            <Hero />
          </div>
        </div>

        {/* Every section below gets the same push-into-background scroll animation */}
        <div style={{ background: '#05091A', position: 'relative', zIndex: 2 }}>
          <Marquee />
          {/* Services pins itself for the horizontal showcase — must NOT be
              inside a transformed wrapper or the pin breaks */}
          <Services />
          <ScrollSection><About /></ScrollSection>
          <ScrollSection><Process /></ScrollSection>
          {/* Portfolio uses sticky card-stacking — keep it out of transformed wrappers */}
          <Portfolio />
          <ScrollSection><AIAnalyzerSection /></ScrollSection>
          <ScrollSection><Testimonials /></ScrollSection>
          <ScrollSection><FAQ /></ScrollSection>
          <ScrollSection><Contact /></ScrollSection>
          <Footer />
        </div>
      </div>
    </>
  )
}
