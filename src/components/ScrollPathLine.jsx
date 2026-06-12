import { useEffect, useRef, useState, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────────────────────
   ScrollPathLine
   Three scroll-drawn gradient threads weaving from the hero all the way to
   the Send Message button, with a glowing spark at each drawing tip.
   Placed as first child of the outer position:relative wrapper so it spans
   the full page including the hero.
────────────────────────────────────────────────────────────────────────── */

const f = n => n.toFixed(1)

/* Smooth cubic bezier through waypoints (vertical tangent at every node) */
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

/* ── Three paths through the full page ─────────────────────────────────── */
function makePaths(W, H) {
  // Keep paths 18–78 % wide — never touch screen edges
  const lx = W * 0.20, cx = W * 0.50, rx = W * 0.78

  /*  A — left silver thread
      Passes near: "Start a Project" hero CTA, Services left cards,
      About left block, Process steps 1&3, Portfolio left, Send Message  */
  const A = smooth([
    [W * 0.38, H * 0.003],   // hero — top of headline area
    [W * 0.22, H * 0.042],   // "Start a Project" button
    [W * 0.32, H * 0.095],   // bottom of hero stats → marquee
    [lx,       H * 0.190],   // services — first card left edge
    [W * 0.30, H * 0.295],   // about — left content block
    [lx,       H * 0.395],   // process step 1 card
    [W * 0.28, H * 0.510],   // process step 3 card
    [lx,       H * 0.615],   // portfolio — left card
    [W * 0.28, H * 0.730],   // portfolio card 3–4
    [lx,       H * 0.830],   // AI analyzer — left of card
    [W * 0.30, H * 0.910],   // testimonials left
    [W * 0.42, H * 0.966],   // Send Message — arriving from left
  ])

  /*  B — right silver thread
      Passes near: hero 3D orbit, Services right cards,
      About stats, Process step 4, Portfolio right, AI analyzer, testi  */
  const B = smooth([
    [W * 0.62, H * 0.003],   // hero — top right
    [W * 0.76, H * 0.048],   // hero orbit / "View Our Work"
    [rx,       H * 0.118],   // marquee right
    [W * 0.72, H * 0.205],   // services — last card right edge
    [rx,       H * 0.320],   // about — right stats column
    [W * 0.72, H * 0.428],   // process step 4 card
    [rx,       H * 0.555],   // portfolio right card
    [W * 0.72, H * 0.670],   // portfolio card 4–5
    [rx,       H * 0.775],   // AI analyzer right (card panel)
    [W * 0.72, H * 0.868],   // testimonials right
    [W * 0.58, H * 0.966],   // Send Message — arriving from right
  ])

  /*  C — dramatic center zigzag  (the "main wire", slightly thicker)
      Cuts through every section heading, button group, and CTA  */
  const C = smooth([
    [cx,       H * 0.001],   // hero — very top, center
    [W * 0.30, H * 0.046],   // hero CTAs row ("Start a Project" + "View Our Work")
    [W * 0.65, H * 0.098],   // hero bottom stats right → marquee
    [W * 0.32, H * 0.195],   // services — 2nd card heading
    [W * 0.66, H * 0.280],   // services → about section header
    [W * 0.34, H * 0.370],   // about "Full Story" CTA
    [W * 0.65, H * 0.458],   // process step 2–3 area
    [W * 0.32, H * 0.562],   // portfolio "See All Projects"
    [W * 0.66, H * 0.678],   // portfolio card 3 heading
    [W * 0.36, H * 0.785],   // AI analyzer "Analyse My Business Free" btn
    [W * 0.62, H * 0.874],   // testimonials nav arrows
    [cx,       H * 0.966],   // Send Message button — CENTER
  ])

  return { A, B, C }
}

export default function ScrollPathLine() {
  /* Anchor for measuring the outer wrapper */
  const anchorRef = useRef(null)

  /* Per-path refs: [A, B, C] */
  const mainRefs  = [useRef(null), useRef(null), useRef(null)]
  const glowRefs  = [useRef(null), useRef(null), useRef(null)]
  const sparkRefs = [useRef(null), useRef(null), useRef(null)]
  const lenRefs   = [useRef(0),    useRef(0),    useRef(0)]

  const clipRef = useRef(null)
  const rafRef  = useRef(null)

  const [dims,  setDims]  = useState({ w: 0, h: 0 })
  const [paths, setPaths] = useState(null)

  /* Remeasure on mount and resize */
  const recalc = useCallback(() => {
    const container = anchorRef.current?.parentElement
    if (!container) return
    const W = container.offsetWidth
    const H = container.scrollHeight
    setDims({ w: W, h: H })
    setPaths(makePaths(W, H))
  }, [])

  useEffect(() => {
    recalc()
    const container = anchorRef.current?.parentElement
    if (!container) return
    const ro = new ResizeObserver(recalc)
    ro.observe(container)
    return () => ro.disconnect()
  }, [recalc])

  /* After paths update → compute total length for each, init dasharray */
  useEffect(() => {
    if (!paths) return
    const id = requestAnimationFrame(() => {
      mainRefs.forEach((ref, i) => {
        const el = ref.current
        if (!el) return
        const len = el.getTotalLength?.() ?? 0
        if (!len) return
        lenRefs[i].current = len
        el.style.strokeDasharray  = `${len}`
        el.style.strokeDashoffset = `${len}`
        if (glowRefs[i].current) {
          glowRefs[i].current.style.strokeDasharray  = `${len}`
          glowRefs[i].current.style.strokeDashoffset = `${len}`
        }
      })
      onScroll()
    })
    return () => cancelAnimationFrame(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paths])

  /* Scroll handler: dashoffset + clip rect + spark positions */
  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress  = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0

      mainRefs.forEach((ref, i) => {
        const main = ref.current
        const glow = glowRefs[i].current
        const spark = sparkRefs[i].current
        const len = lenRefs[i].current
        if (!len || !main) return

        const drawnLen = len * progress
        const off = len - drawnLen
        main.style.strokeDashoffset = `${off}`
        if (glow) glow.style.strokeDashoffset = `${off}`

        /* Move spark to the drawing tip */
        if (spark) {
          if (progress <= 0.001) {
            spark.setAttribute('display', 'none')
          } else {
            spark.setAttribute('display', 'block')
            const pt = main.getPointAtLength(Math.max(0, drawnLen - 1))
            spark.setAttribute('transform', `translate(${f(pt.x)},${f(pt.y)})`)
          }
        }
      })

      /* Clip rect reveals the pulse orbs only over the drawn region */
      const H = anchorRef.current?.parentElement?.scrollHeight ?? 0
      if (clipRef.current && H) {
        clipRef.current.setAttribute('height', `${H * progress}`)
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [onScroll])

  /* Anchor always renders; SVG only on desktop */
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
            zIndex:        3,           // above hero (auto) + content (z:2)
            pointerEvents: 'none',
            mixBlendMode:  'screen',    // glows on dark bg, keeps white text white
            overflow:      'visible',
          }}
          viewBox={`0 0 ${dims.w} ${dims.h}`}
        >
          <defs>
            {/* Gradient mapped to full page height so colour = position */}
            <linearGradient id="sp-grad"
              gradientUnits="userSpaceOnUse"
              x1="0" y1="0" x2="0" y2={dims.h}>
              <stop offset="0%"   stopColor="#2E55E0" />
              <stop offset="100%" stopColor="#E8155A" />
            </linearGradient>

            {/* Wide halo — for glow layer + pulse orbs + spark */}
            <filter id="sp-halo" x="-500%" y="-2%" width="1100%" height="104%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="b" />
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>

            {/* Tight glow — for crisp main lines */}
            <filter id="sp-crisp" x="-120%" y="-1%" width="340%" height="102%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>

            {/* Clip pulse orbs to already-drawn region */}
            <clipPath id="sp-clip">
              <rect ref={clipRef} x="0" y="0" width={dims.w} height="0" />
            </clipPath>
          </defs>

          {/* ── PATH A — left thread ────────────────────────────── */}
          <path ref={glowRefs[0]} d={paths.A} fill="none"
            stroke="url(#sp-grad)" strokeWidth="11" strokeLinecap="round"
            filter="url(#sp-halo)" opacity="0.13" />
          <path ref={mainRefs[0]} d={paths.A} fill="none"
            stroke="url(#sp-grad)" strokeWidth="1.3" strokeLinecap="round"
            filter="url(#sp-crisp)" opacity="0.75" />

          {/* ── PATH B — right thread ───────────────────────────── */}
          <path ref={glowRefs[1]} d={paths.B} fill="none"
            stroke="url(#sp-grad)" strokeWidth="11" strokeLinecap="round"
            filter="url(#sp-halo)" opacity="0.13" />
          <path ref={mainRefs[1]} d={paths.B} fill="none"
            stroke="url(#sp-grad)" strokeWidth="1.3" strokeLinecap="round"
            filter="url(#sp-crisp)" opacity="0.75" />

          {/* ── PATH C — center dramatic wire (slightly bolder) ─── */}
          <path ref={glowRefs[2]} d={paths.C} fill="none"
            stroke="url(#sp-grad)" strokeWidth="14" strokeLinecap="round"
            filter="url(#sp-halo)" opacity="0.18" />
          <path ref={mainRefs[2]} d={paths.C} fill="none"
            stroke="url(#sp-grad)" strokeWidth="1.8" strokeLinecap="round"
            filter="url(#sp-crisp)" opacity="0.82" />

          {/* ── PULSE ORBS — one per path, staggered, clipped ───── */}
          {[paths.A, paths.B, paths.C].map((d, i) => (
            <path key={i} d={d} fill="none"
              stroke="url(#sp-grad)"
              strokeWidth={i === 2 ? 6 : 5}
              strokeLinecap="round"
              strokeDasharray="52 99999"
              clipPath="url(#sp-clip)"
              filter="url(#sp-halo)"
              opacity="0.92"
              className="sp-pulse"
              style={{ animationDelay: `${i * 0.95}s` }}
            />
          ))}

          {/* ── SPARKS at drawing tips ───────────────────────────── */}
          {[0, 1, 2].map(i => (
            <g key={i} ref={sparkRefs[i]} display="none">
              {/* Expanding rings */}
              <circle cx="0" cy="0" r={i === 2 ? 16 : 13}
                fill="none" stroke="url(#sp-grad)" strokeWidth="1"
                className="sp-ring-1" />
              <circle cx="0" cy="0" r={i === 2 ? 11 : 9}
                fill="none" stroke="url(#sp-grad)" strokeWidth="1.5"
                className="sp-ring-2" />
              {/* Core glow orb */}
              <circle cx="0" cy="0" r={i === 2 ? 6 : 5}
                fill="url(#sp-grad)" filter="url(#sp-halo)" opacity="0.95" />
              {/* White hot centre */}
              <circle cx="0" cy="0" r={i === 2 ? 2.5 : 2}
                fill="white" opacity="1" />
            </g>
          ))}
        </svg>
      )}
    </>
  )
}
