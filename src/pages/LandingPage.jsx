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
import Testimonials from '../components/Testimonials'
import Contact      from '../components/Contact'
import Footer       from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────────────────
   ScrollSection — wraps any section with the hero-style push-into-background
   scroll animation:
     • Entry  (0 → 10 %)  : scales up from 0.92, fades in, de-blurs
     • In-view (10 → 68 %) : fully normal — no transform
     • Exit   (68 → 100 %) : scales to 0.84, fades to 0, blurs to 10 px
   offset ['start end','end start'] so the full enter-to-exit range is tracked
───────────────────────────────────────────────────────────────────────── */
function ScrollSection({ children }) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale   = useTransform(scrollYProgress, [0, 0.10, 0.68, 1], [0.92, 1,   1,   0.84])
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.70, 1], [0,    1,   1,   0   ])
  const blurPx  = useTransform(scrollYProgress, [0, 0.08, 0.66, 1], [5,    0,   0,   10  ])
  const filter  = useTransform(blurPx, v => `blur(${v}px)`)

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, filter, transformOrigin: 'center center' }}
    >
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
    ScrollTrigger.getAll().forEach(t => t.kill())
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

        {/* Hero — sticky pin zone (hero stays on screen for 80 vh while zooming back) */}
        <div style={{ height: '180vh', position: 'relative' }}>
          <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
            <Hero />
          </div>
        </div>

        {/* Every section below gets the same push-into-background scroll animation */}
        <div style={{ background: '#05091A', position: 'relative', zIndex: 2 }}>
          <Marquee />
          <ScrollSection><Services /></ScrollSection>
          <ScrollSection><About /></ScrollSection>
          <ScrollSection><Process /></ScrollSection>
          <ScrollSection><Portfolio /></ScrollSection>
          <ScrollSection><Testimonials /></ScrollSection>
          <ScrollSection><Contact /></ScrollSection>
          <Footer />
        </div>
      </div>
    </>
  )
}
