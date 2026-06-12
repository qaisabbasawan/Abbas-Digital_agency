import { useEffect, useRef, useState, useCallback } from 'react'

const BLUE = '#2E55E0'
const PINK = '#E8155A'

/* ── Generate a smooth wavy bezier path through the container ─────────── */
function buildPath(W, H) {
  const L = W * 0.30   // left swing x
  const C = W * 0.50   // center x
  const R = W * 0.70   // right swing x

  // Waypoints — x alternates L/R to create the wave, y is section fraction
  const pts = [
    [C, H * 0.004],   // top of content — center
    [R, H * 0.095],   // marquee → services
    [L, H * 0.215],   // services mid
    [R, H * 0.345],   // about section
    [L, H * 0.460],   // process section
    [R, H * 0.590],   // portfolio top
    [L, H * 0.700],   // portfolio mid
    [R, H * 0.800],   // AI analyzer / testimonials
    [C, H * 0.960],   // contact — send message button
  ]

  let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]
    const [x1, y1] = pts[i]
    const midY = (y0 + y1) / 2
    // Cubic bezier: vertical tangent out of p0, vertical tangent into p1
    d += ` C ${f(x0)} ${f(midY)}, ${f(x1)} ${f(midY)}, ${f(x1)} ${f(y1)}`
  }
  return d
}

const f = n => n.toFixed(1)

/* ─────────────────────────────────────────────────────────────────────────
   ScrollPathLine
   • An anchor <div> is placed as a child of whatever container wraps this.
   • The SVG (position:absolute) is sized to that container.
   • mix-blend-mode:screen makes the gradient glow through the dark bg
     without obscuring any white text / UI elements.
────────────────────────────────────────────────────────────────────────── */
export default function ScrollPathLine() {
  const anchorRef = useRef(null)
  const mainRef   = useRef(null)  // crisp stroke — scroll-driven dashoffset
  const glowRef   = useRef(null)  // wide diffuse glow — same dashoffset
  const clipRef   = useRef(null)  // clipPath rect that reveals pulse only on drawn region
  const lenRef    = useRef(0)
  const rafRef    = useRef(null)

  const [dims,  setDims]  = useState({ w: 0, h: 0 })
  const [pathD, setPathD] = useState('')

  /* Remeasure container and rebuild path */
  const recalc = useCallback(() => {
    const container = anchorRef.current?.parentElement
    if (!container) return
    const W = container.offsetWidth
    const H = container.scrollHeight
    setDims({ w: W, h: H })
    setPathD(buildPath(W, H))
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

  /* Whenever pathD changes: recalc total length, init dasharray, force update */
  useEffect(() => {
    if (!pathD || !mainRef.current) return
    const id = requestAnimationFrame(() => {
      const len = mainRef.current?.getTotalLength?.()
      if (!len) return
      lenRef.current = len
      for (const el of [mainRef.current, glowRef.current]) {
        if (!el) continue
        el.style.strokeDasharray  = `${len}`
        el.style.strokeDashoffset = `${len}`
      }
      onScroll()
    })
    return () => cancelAnimationFrame(id)
  // onScroll is stable; pathD triggers this
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathD])

  /* Scroll → dashoffset + clipRect height */
  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress  = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0
      const len       = lenRef.current
      if (!len) return

      const off = len * (1 - progress)
      if (mainRef.current) mainRef.current.style.strokeDashoffset = `${off}`
      if (glowRef.current) glowRef.current.style.strokeDashoffset = `${off}`

      // Clip pulse to drawn region (top fraction of SVG)
      const H = anchorRef.current?.parentElement?.scrollHeight ?? 0
      if (clipRef.current && H) {
        clipRef.current.setAttribute('height', `${H * progress}`)
      }
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [onScroll])

  /* Always render the anchor; hide path on mobile */
  const showSvg = dims.w >= 768 && !!pathD

  return (
    <>
      {/* Zero-size anchor — used to read parentElement */}
      <div ref={anchorRef} aria-hidden style={{ position: 'absolute', width: 0, height: 0, top: 0, left: 0 }} />

      {showSvg && (
        <svg
          aria-hidden
          style={{
            position:       'absolute',
            top:            0,
            left:           0,
            width:          '100%',
            height:         dims.h,
            zIndex:         1,
            pointerEvents:  'none',
            mixBlendMode:   'screen',   // glows through dark bg, leaves white text untouched
            overflow:       'visible',
          }}
          viewBox={`0 0 ${dims.w} ${dims.h}`}
        >
          <defs>
            {/* Blue→pink gradient along the Y axis */}
            <linearGradient id="sp-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor={BLUE} />
              <stop offset="100%" stopColor={PINK} />
            </linearGradient>

            {/* Wide halo glow */}
            <filter id="sp-halo" x="-500%" y="-1%" width="1100%" height="102%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>

            {/* Tight crisp glow for the main line */}
            <filter id="sp-crisp" x="-150%" y="-1%" width="400%" height="102%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>

            {/* Clip the pulse to whatever has already been drawn */}
            <clipPath id="sp-clip">
              <rect ref={clipRef} x="0" y="0" width={dims.w} height="0" />
            </clipPath>
          </defs>

          {/* ── Layer 1: wide diffuse halo (scroll-driven) ── */}
          <path
            ref={glowRef}
            d={pathD}
            fill="none"
            stroke="url(#sp-grad)"
            strokeWidth="14"
            strokeLinecap="round"
            filter="url(#sp-halo)"
            opacity="0.16"
          />

          {/* ── Layer 2: crisp 1.5px drawn line (scroll-driven) ── */}
          <path
            ref={mainRef}
            d={pathD}
            fill="none"
            stroke="url(#sp-grad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#sp-crisp)"
            opacity="0.82"
          />

          {/* ── Layer 3: moving orb pulse (CSS-animated, clipped to drawn region) ── */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#sp-grad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="55 99999"
            clipPath="url(#sp-clip)"
            filter="url(#sp-halo)"
            opacity="0.95"
            className="sp-pulse"
          />
        </svg>
      )}
    </>
  )
}
