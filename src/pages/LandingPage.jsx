import { useEffect, useRef } from 'react'
import SEO from '../components/SEO'
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
import ScrollPathLine     from '../components/ScrollPathLine'
import HeaderConnectors  from '../components/HeaderConnectors'
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
        title="Digital Marketing Agency Islamabad | Abbas Digital Agency"
        description="Abbas Digital Agency delivers SEO, web design & digital marketing for businesses in Pakistan & USA. US-registered LLC. Free consultation."
        keywords="digital marketing agency Islamabad, SEO services Pakistan, web design company Pakistan, digital agency Islamabad, best SEO company Pakistan, social media marketing Pakistan"
        path="/"
      />
      {/* Fixed 3-D background */}
      <div
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      >
        <HeroScene />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Scroll-drawn curly path threads — spans hero + all sections */}
        <ScrollPathLine />
        {/* 6 header nav connectors — each wire from nav link to its section */}
        <HeaderConnectors />

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
          <ScrollSection><Contact /></ScrollSection>
          <Footer />
        </div>
      </div>
    </>
  )
}
