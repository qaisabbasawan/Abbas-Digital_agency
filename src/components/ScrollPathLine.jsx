import { useEffect, useRef, useState, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────────────────────
   ScrollPathLine — two dense gradient wires that roam the FULL landing page
   starting inside the hero, zigzagging through every section/button, and
   ending precisely at the Send Message submit button.
   • 30+ waypoints per path → aggressive full-width weaving
   • Dynamic endpoint: reads the real button position at runtime
   • 3-layer glow (wide + medium + crisp) for strong neon visibility
   • Sparking tip (2 pulsing rings + core orb + white dot)
   • Staggered pulse orbs clipped to drawn region
   • mix-blend-mode:screen — glows on dark bg, disappears on white text
────────────────────────────────────────────────────────────────────────── */

const BLUE = '#2E55E0'
const PINK = '#E8155A'
const f    = n => n.toFixed(1)

/* Smooth cubic bezier through waypoints (vertical tangent in/out every node) */
function smooth(pts) {
  let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]
    const [x1, y1] = pts[i]
    const my = (y0 + y1) / 2
    d += ` C ${f(x0)} ${f(my)}, ${f(x1)} ${f(my)}, ${f(x1)} ${f(y1)}`
  }
  return d
}

/*
 * Build two paths given container dimensions and the exact endpoint.
 * Both wires start in the hero, zigzag hard across the full width through
 * every section, and converge on (endX, endY) — the Send Message button.
 */
function makePaths(W, H, endX, endY) {
  const L  = W * 0.19   // left  boundary
  const R  = W * 0.81   // right boundary
  const CL = W * 0.30   // centre-left
  const CR = W * 0.70   // centre-right
  const C  = W * 0.50   // true centre

  /* ── Wire A ── enters hero left, zigzags across every section ─── */
  const A = smooth([
    [C,  H * 0.001],   // hero — top center
    [L,  H * 0.040],   // "Start a Project" CTA
    [R,  H * 0.068],   // hero orbit / "View Our Work"
    [L,  H * 0.090],   // hero stats left
    [R,  H * 0.115],   // marquee right
    [L,  H * 0.138],   // marquee left
    [R,  H * 0.162],   // services section top right
    [L,  H * 0.192],   // service card 1 left
    [R,  H * 0.220],   // service card 2 right
    [L,  H * 0.248],   // service card 3 left
    [R,  H * 0.272],   // service card 4 / about entry right
    [L,  H * 0.308],   // about heading left
    [R,  H * 0.335],   // about stats right
    [L,  H * 0.360],   // about CTA left
    [R,  H * 0.388],   // process step 1 right
    [L,  H * 0.412],   // process step 2 left
    [R,  H * 0.438],   // process step 3 right
    [L,  H * 0.462],   // process step 4 left
    [R,  H * 0.510],   // portfolio entry right
    [L,  H * 0.555],   // portfolio card 1 left
    [R,  H * 0.598],   // portfolio card 2 right
    [L,  H * 0.640],   // portfolio card 3 left
    [R,  H * 0.682],   // portfolio card 4 right
    [L,  H * 0.718],   // portfolio "See All" left
    [R,  H * 0.758],   // AI analyzer card right
    [L,  H * 0.800],   // AI analyzer CTA left
    [R,  H * 0.838],   // testimonials right
    [L,  H * 0.868],   // testimonials left
    [R,  H * 0.898],   // contact section right
    [L,  H * 0.928],   // contact form left
    [CR, H * 0.945],   // contact form right approach
    [endX, endY],       // SEND MESSAGE BUTTON — exact runtime position
  ])

  /* ── Wire B ── enters hero right, slightly offset route ─────── */
  const B = smooth([
    [C,  H * 0.004],   // hero — slightly lower start
    [R,  H * 0.035],   // hero right
    [L,  H * 0.060],   // hero left
    [R,  H * 0.082],   // hero bottom right
    [L,  H * 0.108],   // into marquee left
    [R,  H * 0.130],   // marquee right
    [L,  H * 0.155],   // services top left
    [R,  H * 0.182],   // service card 2 right
    [L,  H * 0.210],   // service card 3 left
    [R,  H * 0.238],   // service card 4 right
    [L,  H * 0.264],   // into about left
    [R,  H * 0.294],   // about right
    [L,  H * 0.322],   // about left content
    [R,  H * 0.350],   // process entry right
    [L,  H * 0.378],   // process step 1 left
    [R,  H * 0.405],   // process step 2 right
    [L,  H * 0.430],   // process step 3 left
    [R,  H * 0.455],   // process exit right
    [L,  H * 0.500],   // portfolio top left
    [R,  H * 0.542],   // portfolio card 1 right
    [L,  H * 0.578],   // portfolio card 2 left
    [R,  H * 0.618],   // portfolio card 3 right
    [L,  H * 0.658],   // portfolio card 4 left
    [R,  H * 0.698],   // portfolio exit right
    [L,  H * 0.740],   // AI analyzer left
    [R,  H * 0.778],   // AI analyzer card right
    [CL, H * 0.815],   // AI analyzer CTA center-left
    [R,  H * 0.855],   // testimonials right
    [L,  H * 0.882],   // testimonials left
    [R,  H * 0.912],   // contact form right
    [L,  H * 0.938],   // contact form left
    [endX, endY],       // SEND MESSAGE BUTTON — exact runtime position
  ])

  return { A, B }
}

export default function ScrollPathLine() {
  const anchorRef = useRef(null)

  /* Two paths: each has main + glow refs */
  const aMainRef = useRef(null),  aGlowRef = useRef(null)
  const bMainRef = useRef(null),  bGlowRef = useRef(null)
  const aSparkRef = useRef(null), bSparkRef = useRef(null)
  const aLen = useRef(0),         bLen = useRef(0)
  const clipRef = useRef(null)
  const rafRef  = useRef(null)

  const [dims,  setDims]  = useState({ w: 0, h: 0 })
  const [paths, setPaths] = useState(null)

  const recalc = useCallback(() => {
    const container = anchorRef.current?.parentElement
    if (!container) return
    const W = container.offsetWidth
    const H = container.scrollHeight

    /* Find the Send Message button at runtime */
    let endX = W * 0.688   // fallback: measured position
    let endY = H * 0.953
    const btn = document.querySelector(
      '#contact button[type="submit"], form button[type="submit"]'
    )
    if (btn) {
      const r = btn.getBoundingClientRect()
      endX = r.left + r.width  / 2
      endY = r.top  + r.height / 2 + window.scrollY
    }

    setDims({ w: W, h: H })
    setPaths(makePaths(W, H, endX, endY))
  }, [])

  /* Mount + ResizeObserver */
  useEffect(() => {
    recalc()
    const container = anchorRef.current?.parentElement
    if (!container) return
    const ro = new ResizeObserver(recalc)
    ro.observe(container)
    return () => ro.disconnect()
  }, [recalc])

  /* Paths changed → measure lengths and init dasharray */
  useEffect(() => {
    if (!paths) return
    const id = requestAnimationFrame(() => {
      const pairs = [
        { main: aMainRef, glow: aGlowRef, len: aLen },
        { main: bMainRef, glow: bGlowRef, len: bLen },
      ]
      pairs.forEach(({ main, glow, len }) => {
        const el = main.current
        if (!el) return
        const l = el.getTotalLength?.() ?? 0
        if (!l) return
        len.current = l
        el.style.strokeDasharray  = `${l}`
        el.style.strokeDashoffset = `${l}`
        if (glow.current) {
          glow.current.style.strokeDasharray  = `${l}`
          glow.current.style.strokeDashoffset = `${l}`
        }
      })
      onScroll()
    })
    return () => cancelAnimationFrame(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paths])

  /* Scroll handler */
  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress  = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0

      const pairs = [
        { main: aMainRef, glow: aGlowRef, spark: aSparkRef, len: aLen },
        { main: bMainRef, glow: bGlowRef, spark: bSparkRef, len: bLen },
      ]

      pairs.forEach(({ main, glow, spark, len }) => {
        const el = main.current
        if (!el || !len.current) return

        const drawnLen = len.current * progress
        const off      = len.current - drawnLen

        el.style.strokeDashoffset = `${off}`
        if (glow.current) glow.current.style.strokeDashoffset = `${off}`

        /* Spark at drawing tip */
        const sp = spark.current
        if (sp) {
          if (progress < 0.005) {
            sp.setAttribute('display', 'none')
          } else {
            sp.setAttribute('display', 'block')
            const pt = el.getPointAtLength(Math.max(0, drawnLen - 2))
            sp.setAttribute('transform', `translate(${f(pt.x)},${f(pt.y)})`)
          }
        }
      })

      /* Clip pulse orbs to drawn region */
      const H = anchorRef.current?.parentElement?.scrollHeight ?? 0
      if (clipRef.current && H) {
        clipRef.current.setAttribute('height', `${H * progress}`)
      }
    })
  }, []) // eslint-disable-line

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [onScroll])

  const show = dims.w >= 768 && !!paths

  return (
    <>
      <div ref={anchorRef} aria-hidden
        style={{ position: 'absolute', width: 0, height: 0, top: 0, left: 0, pointerEvents: 'none' }} />

      {show && (
        <svg
          aria-hidden
          style={{
            position:      'absolute',
            top: 0, left: 0,
            width:         '100%',
            height:        dims.h,
            zIndex:        5,
            pointerEvents: 'none',
            mixBlendMode:  'screen',
            overflow:      'visible',
          }}
          viewBox={`0 0 ${dims.w} ${dims.h}`}
        >
          <defs>
            {/* Gradient colour = blue(top) → pink(bottom), mapped to real px */}
            <linearGradient id="sp-grad"
              gradientUnits="userSpaceOnUse"
              x1="0" y1="0" x2="0" y2={dims.h}>
              <stop offset="0%"   stopColor={BLUE} />
              <stop offset="100%" stopColor={PINK} />
            </linearGradient>

            {/* Layer 1 — wide ambient halo */}
            <filter id="sp-wide" x="-600%" y="-1%" width="1300%" height="102%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="b" />
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>

            {/* Layer 2 — medium glow */}
            <filter id="sp-mid" x="-200%" y="-1%" width="500%" height="102%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b" />
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>

            {/* Layer 3 — tight crisp glow */}
            <filter id="sp-crisp" x="-80%" y="-1%" width="260%" height="102%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>

            {/* Clip — reveals pulse orbs only over drawn region */}
            <clipPath id="sp-clip">
              <rect ref={clipRef} x="0" y="0" width={dims.w} height="0" />
            </clipPath>
          </defs>

          {/* ╌╌ WIRE A ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ */}
          {/* Wide ambient halo — always-on, very faint atmospheric glow */}
          <path d={paths.A} fill="none"
            stroke="url(#sp-grad)" strokeWidth="22" strokeLinecap="round"
            filter="url(#sp-wide)" opacity="0.12" />
          {/* Medium glow — scroll-animated via aGlowRef */}
          <path ref={aGlowRef} d={paths.A} fill="none"
            stroke="url(#sp-grad)" strokeWidth="10" strokeLinecap="round"
            filter="url(#sp-mid)" opacity="0.38" />
          {/* Crisp main line — scroll-animated via aMainRef */}
          <path ref={aMainRef} d={paths.A} fill="none"
            stroke="url(#sp-grad)" strokeWidth="2.2" strokeLinecap="round"
            filter="url(#sp-crisp)" opacity="0.92" />
          {/* Pulse orb A */}
          <path d={paths.A} fill="none"
            stroke="url(#sp-grad)" strokeWidth="7" strokeLinecap="round"
            strokeDasharray="55 99999"
            clipPath="url(#sp-clip)"
            filter="url(#sp-wide)" opacity="0.95"
            className="sp-pulse" />

          {/* ╌╌ WIRE B ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ */}
          {/* Wide ambient halo */}
          <path d={paths.B} fill="none"
            stroke="url(#sp-grad)" strokeWidth="18" strokeLinecap="round"
            filter="url(#sp-wide)" opacity="0.10" />
          {/* Medium glow — scroll-animated via bGlowRef */}
          <path ref={bGlowRef} d={paths.B} fill="none"
            stroke="url(#sp-grad)" strokeWidth="8" strokeLinecap="round"
            filter="url(#sp-mid)" opacity="0.32" />
          {/* Crisp main line — scroll-animated via bMainRef */}
          <path ref={bMainRef} d={paths.B} fill="none"
            stroke="url(#sp-grad)" strokeWidth="1.8" strokeLinecap="round"
            filter="url(#sp-crisp)" opacity="0.85" />
          {/* Pulse orb B — staggered */}
          <path d={paths.B} fill="none"
            stroke="url(#sp-grad)" strokeWidth="6" strokeLinecap="round"
            strokeDasharray="55 99999"
            clipPath="url(#sp-clip)"
            filter="url(#sp-wide)" opacity="0.90"
            className="sp-pulse"
            style={{ animationDelay: '1.35s' }} />

          {/* ╌╌ SPARK TIP — Wire A ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ */}
          <g ref={aSparkRef} display="none">
            <circle cx="0" cy="0" r="20"
              fill="none" stroke="url(#sp-grad)" strokeWidth="1.2"
              className="sp-ring-1" />
            <circle cx="0" cy="0" r="13"
              fill="none" stroke="url(#sp-grad)" strokeWidth="1.8"
              className="sp-ring-2" />
            <circle cx="0" cy="0" r="7"
              fill="url(#sp-grad)" filter="url(#sp-wide)" opacity="0.95" />
            <circle cx="0" cy="0" r="2.8"
              fill="white" opacity="1" />
          </g>

          {/* ╌╌ SPARK TIP — Wire B ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ */}
          <g ref={bSparkRef} display="none">
            <circle cx="0" cy="0" r="16"
              fill="none" stroke="url(#sp-grad)" strokeWidth="1"
              className="sp-ring-1" />
            <circle cx="0" cy="0" r="10"
              fill="none" stroke="url(#sp-grad)" strokeWidth="1.5"
              className="sp-ring-2" />
            <circle cx="0" cy="0" r="5.5"
              fill="url(#sp-grad)" filter="url(#sp-mid)" opacity="0.95" />
            <circle cx="0" cy="0" r="2.2"
              fill="white" opacity="1" />
          </g>
        </svg>
      )}
    </>
  )
}
