import { useEffect, useRef, useState, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────────────────────
   ScrollPathLine — "Three-Wire Neon Weave"
   Three live neon cables roaming the full landing page.

   Wire A  Cyan   #00CCFF  full-width zigzag, left-heavy phase
   Wire B  Violet #CC44FF  center-weave, expands to edges, threads between A/C
   Wire C  Pink   #FF1A6C  full-width zigzag, right-heavy phase, offset from A

   Each wire has 5 visual layers:
     1. Always-on blurred atmospheric halo
     2. Scroll-animated medium glow (dashoffset)
     3. Scroll-animated crisp main line (dashoffset + getTotalLength source)
     4. CSS-animated "electricity" pulses clipped to drawn region
     5. Pulsing orb clipped to drawn region

   Spark tip per wire: 3 expanding rings + bright core + white dot
────────────────────────────────────────────────────────────────────────── */

const CYAN   = '#00CCFF'
const VIOLET = '#CC44FF'
const PINK   = '#FF1A6C'
const f      = n => n.toFixed(1)

function smooth(pts) {
  let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]
    const [x1, y1] = pts[i]
    const mid = (y0 + y1) / 2
    d += ` C ${f(x0)} ${f(mid)}, ${f(x1)} ${f(mid)}, ${f(x1)} ${f(y1)}`
  }
  return d
}

function makePaths(W, H, endX, endY) {
  const L  = W * 0.13
  const R  = W * 0.87
  const CL = W * 0.28
  const CR = W * 0.72
  const MC = W * 0.50

  /* Wire A — Cyan — left-heavy full-width zigzag */
  const A = smooth([
    [CL, H*0.001], [R,  H*0.036], [L,  H*0.062], [R,  H*0.088],
    [L,  H*0.114], [R,  H*0.140], [L,  H*0.165], [R,  H*0.193],
    [L,  H*0.222], [R,  H*0.250], [L,  H*0.278], [R,  H*0.306],
    [L,  H*0.334], [R,  H*0.362], [L,  H*0.390], [R,  H*0.418],
    [L,  H*0.445], [R,  H*0.474], [L,  H*0.504], [R,  H*0.534],
    [L,  H*0.562], [R,  H*0.592], [L,  H*0.620], [R,  H*0.650],
    [L,  H*0.678], [R,  H*0.706], [L,  H*0.735], [R,  H*0.763],
    [L,  H*0.792], [R,  H*0.820], [L,  H*0.848], [R,  H*0.876],
    [L,  H*0.905], [CR, H*0.930], [endX, endY],
  ])

  /* Wire B — Violet — center-weave with occasional edge expansions */
  const B = smooth([
    [MC,  H*0.003], [CR,  H*0.030], [CL,  H*0.056], [R,   H*0.082],
    [CL,  H*0.108], [CR,  H*0.135], [L,   H*0.160], [CR,  H*0.186],
    [CL,  H*0.213], [R,   H*0.240], [CL,  H*0.268], [CR,  H*0.295],
    [L,   H*0.322], [CR,  H*0.350], [CL,  H*0.377], [R,   H*0.404],
    [CL,  H*0.432], [CR,  H*0.458], [L,   H*0.485], [CR,  H*0.513],
    [CL,  H*0.540], [R,   H*0.567], [CL,  H*0.595], [CR,  H*0.622],
    [L,   H*0.648], [CR,  H*0.676], [CL,  H*0.703], [R,   H*0.730],
    [CL,  H*0.758], [CR,  H*0.785], [L,   H*0.812], [CR,  H*0.840],
    [CL,  H*0.868], [R,   H*0.895], [MC,  H*0.922], [endX, endY],
  ])

  /* Wire C — Pink — right-heavy full-width zigzag, offset from A */
  const Cp = smooth([
    [CR,  H*0.002], [L,  H*0.042], [R,  H*0.070], [L,  H*0.096],
    [R,   H*0.122], [L,  H*0.148], [R,  H*0.175], [L,  H*0.202],
    [R,   H*0.230], [L,  H*0.258], [R,  H*0.285], [L,  H*0.313],
    [R,   H*0.340], [CL, H*0.368], [R,  H*0.395], [L,  H*0.422],
    [R,   H*0.450], [L,  H*0.478], [R,  H*0.506], [CL, H*0.534],
    [R,   H*0.561], [L,  H*0.589], [R,  H*0.617], [L,  H*0.644],
    [R,   H*0.672], [CL, H*0.700], [R,  H*0.727], [L,  H*0.754],
    [R,   H*0.782], [L,  H*0.810], [R,  H*0.837], [L,  H*0.865],
    [R,   H*0.892], [L,  H*0.918], [CR, H*0.940], [endX, endY],
  ])

  return { A, B, C: Cp }
}

export default function ScrollPathLine() {
  const anchorRef = useRef(null)

  const aMainRef = useRef(null), aGlowRef = useRef(null), aSparkRef = useRef(null)
  const bMainRef = useRef(null), bGlowRef = useRef(null), bSparkRef = useRef(null)
  const cMainRef = useRef(null), cGlowRef = useRef(null), cSparkRef = useRef(null)
  const aLen = useRef(0), bLen = useRef(0), cLen = useRef(0)
  const clipRef = useRef(null)
  const rafRef  = useRef(null)

  const [dims,  setDims]  = useState({ w: 0, h: 0 })
  const [paths, setPaths] = useState(null)

  const recalc = useCallback(() => {
    const container = anchorRef.current?.parentElement
    if (!container) return
    const W = container.offsetWidth
    const H = container.scrollHeight

    let endX = W * 0.688
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

  useEffect(() => {
    recalc()
    const container = anchorRef.current?.parentElement
    if (!container) return
    const ro = new ResizeObserver(recalc)
    ro.observe(container)
    return () => ro.disconnect()
  }, [recalc])

  useEffect(() => {
    if (!paths) return
    const id = requestAnimationFrame(() => {
      const wires = [
        { main: aMainRef, glow: aGlowRef, len: aLen },
        { main: bMainRef, glow: bGlowRef, len: bLen },
        { main: cMainRef, glow: cGlowRef, len: cLen },
      ]
      wires.forEach(({ main, glow, len }) => {
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

  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress  = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0

      const wires = [
        { main: aMainRef, glow: aGlowRef, spark: aSparkRef, len: aLen },
        { main: bMainRef, glow: bGlowRef, spark: bSparkRef, len: bLen },
        { main: cMainRef, glow: cGlowRef, spark: cSparkRef, len: cLen },
      ]

      wires.forEach(({ main, glow, spark, len }) => {
        const el = main.current
        if (!el || !len.current) return
        const drawn = len.current * progress
        const off   = len.current - drawn
        el.style.strokeDashoffset = `${off}`
        if (glow.current) glow.current.style.strokeDashoffset = `${off}`

        const sp = spark.current
        if (sp) {
          if (progress < 0.005) {
            sp.setAttribute('display', 'none')
          } else {
            sp.setAttribute('display', 'block')
            const pt = el.getPointAtLength(Math.max(0, drawn - 2))
            sp.setAttribute('transform', `translate(${f(pt.x)},${f(pt.y)})`)
          }
        }
      })

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
        <svg aria-hidden
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: dims.h,
            zIndex: 5, pointerEvents: 'none',
            mixBlendMode: 'screen', overflow: 'visible',
          }}
          viewBox={`0 0 ${dims.w} ${dims.h}`}
        >
          <defs>
            {/* ── Gradients — one per wire, top→bottom colour shift ── */}
            <linearGradient id="sp-ga" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={dims.h}>
              <stop offset="0%"   stopColor="#00EEFF" />
              <stop offset="100%" stopColor="#0055FF" />
            </linearGradient>
            <linearGradient id="sp-gb" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={dims.h}>
              <stop offset="0%"   stopColor="#DD44FF" />
              <stop offset="100%" stopColor="#FF44BB" />
            </linearGradient>
            <linearGradient id="sp-gc" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={dims.h}>
              <stop offset="0%"   stopColor="#FF2266" />
              <stop offset="100%" stopColor="#FF8833" />
            </linearGradient>

            {/* ── Filters ── */}
            {/* sp-halo: pure big blur → atmospheric depth behind the wire */}
            <filter id="sp-halo" x="-400%" y="-2%" width="900%" height="104%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
            </filter>
            {/* sp-glow: medium blur merged back → bright corona around crisp edge */}
            <filter id="sp-glow" x="-150%" y="-2%" width="400%" height="104%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b" />
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {/* sp-edge: tight blur merged → soft neon edge on main line */}
            <filter id="sp-edge" x="-60%" y="-1%" width="220%" height="102%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b" />
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {/* sp-dot: small radial glow for spark core + orb */}
            <filter id="sp-dot" x="-250%" y="-250%" width="600%" height="600%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>

            {/* ── Clip — shared rect that grows with scroll progress ── */}
            <clipPath id="sp-clip">
              <rect ref={clipRef} x="0" y="0" width={dims.w} height="0" />
            </clipPath>
          </defs>

          {/* ════════════════════════════════════════════
              WIRE A  —  CYAN
          ════════════════════════════════════════════ */}

          {/* Layer 1: atmospheric halo (always drawn, very subtle) */}
          <path d={paths.A} fill="none"
            stroke="url(#sp-ga)" strokeWidth="30" strokeLinecap="round"
            filter="url(#sp-halo)" opacity="0.20" />

          {/* Layer 2: scroll-drawn medium glow */}
          <path ref={aGlowRef} d={paths.A} fill="none"
            stroke="url(#sp-ga)" strokeWidth="10" strokeLinecap="round"
            filter="url(#sp-glow)" opacity="0.50" />

          {/* Layer 3: scroll-drawn crisp main line */}
          <path ref={aMainRef} d={paths.A} fill="none"
            stroke="url(#sp-ga)" strokeWidth="2" strokeLinecap="round"
            filter="url(#sp-edge)" opacity="1" />

          {/* Layer 4: flowing electricity pulses (CSS-animated, clipped) */}
          <path d={paths.A} fill="none"
            stroke="#88EEFF" strokeWidth="3.5" strokeLinecap="round"
            strokeDasharray="28 200" clipPath="url(#sp-clip)"
            filter="url(#sp-glow)" opacity="0.90"
            className="sp-flow" />

          {/* Layer 5: travelling pulse orb */}
          <path d={paths.A} fill="none"
            stroke="url(#sp-ga)" strokeWidth="6" strokeLinecap="round"
            strokeDasharray="50 99999" clipPath="url(#sp-clip)"
            filter="url(#sp-halo)" opacity="0.95"
            className="sp-pulse" />

          {/* ════════════════════════════════════════════
              WIRE B  —  VIOLET
          ════════════════════════════════════════════ */}

          <path d={paths.B} fill="none"
            stroke="url(#sp-gb)" strokeWidth="26" strokeLinecap="round"
            filter="url(#sp-halo)" opacity="0.18" />

          <path ref={bGlowRef} d={paths.B} fill="none"
            stroke="url(#sp-gb)" strokeWidth="9" strokeLinecap="round"
            filter="url(#sp-glow)" opacity="0.46" />

          <path ref={bMainRef} d={paths.B} fill="none"
            stroke="url(#sp-gb)" strokeWidth="1.8" strokeLinecap="round"
            filter="url(#sp-edge)" opacity="0.95" />

          <path d={paths.B} fill="none"
            stroke="#EE88FF" strokeWidth="3" strokeLinecap="round"
            strokeDasharray="28 200" clipPath="url(#sp-clip)"
            filter="url(#sp-glow)" opacity="0.85"
            className="sp-flow-b" />

          <path d={paths.B} fill="none"
            stroke="url(#sp-gb)" strokeWidth="5" strokeLinecap="round"
            strokeDasharray="50 99999" clipPath="url(#sp-clip)"
            filter="url(#sp-halo)" opacity="0.90"
            className="sp-pulse" style={{ animationDelay: '1.1s' }} />

          {/* ════════════════════════════════════════════
              WIRE C  —  PINK
          ════════════════════════════════════════════ */}

          <path d={paths.C} fill="none"
            stroke="url(#sp-gc)" strokeWidth="26" strokeLinecap="round"
            filter="url(#sp-halo)" opacity="0.18" />

          <path ref={cGlowRef} d={paths.C} fill="none"
            stroke="url(#sp-gc)" strokeWidth="9" strokeLinecap="round"
            filter="url(#sp-glow)" opacity="0.46" />

          <path ref={cMainRef} d={paths.C} fill="none"
            stroke="url(#sp-gc)" strokeWidth="1.8" strokeLinecap="round"
            filter="url(#sp-edge)" opacity="0.95" />

          <path d={paths.C} fill="none"
            stroke="#FF88BB" strokeWidth="3" strokeLinecap="round"
            strokeDasharray="28 200" clipPath="url(#sp-clip)"
            filter="url(#sp-glow)" opacity="0.85"
            className="sp-flow-c" />

          <path d={paths.C} fill="none"
            stroke="url(#sp-gc)" strokeWidth="5" strokeLinecap="round"
            strokeDasharray="50 99999" clipPath="url(#sp-clip)"
            filter="url(#sp-halo)" opacity="0.90"
            className="sp-pulse" style={{ animationDelay: '2.2s' }} />

          {/* ════════════════════════════════════════════
              SPARK TIPS
          ════════════════════════════════════════════ */}

          {/* Spark A — Cyan */}
          <g ref={aSparkRef} display="none">
            <circle cx="0" cy="0" r="26" fill="none"
              stroke={CYAN} strokeWidth="1" className="sp-ring-1" />
            <circle cx="0" cy="0" r="16" fill="none"
              stroke={CYAN} strokeWidth="1.5" className="sp-ring-2" />
            <circle cx="0" cy="0" r="9" fill="none"
              stroke={CYAN} strokeWidth="2" className="sp-ring-3" />
            <circle cx="0" cy="0" r="7"
              fill={CYAN} filter="url(#sp-dot)" opacity="0.95" />
            <circle cx="0" cy="0" r="2.8"
              fill="white" opacity="1" />
          </g>

          {/* Spark B — Violet */}
          <g ref={bSparkRef} display="none">
            <circle cx="0" cy="0" r="24" fill="none"
              stroke={VIOLET} strokeWidth="1" className="sp-ring-1" />
            <circle cx="0" cy="0" r="15" fill="none"
              stroke={VIOLET} strokeWidth="1.5" className="sp-ring-2" />
            <circle cx="0" cy="0" r="8" fill="none"
              stroke={VIOLET} strokeWidth="2" className="sp-ring-3" />
            <circle cx="0" cy="0" r="6"
              fill={VIOLET} filter="url(#sp-dot)" opacity="0.95" />
            <circle cx="0" cy="0" r="2.5"
              fill="white" opacity="1" />
          </g>

          {/* Spark C — Pink */}
          <g ref={cSparkRef} display="none">
            <circle cx="0" cy="0" r="24" fill="none"
              stroke={PINK} strokeWidth="1" className="sp-ring-1" />
            <circle cx="0" cy="0" r="15" fill="none"
              stroke={PINK} strokeWidth="1.5" className="sp-ring-2" />
            <circle cx="0" cy="0" r="8" fill="none"
              stroke={PINK} strokeWidth="2" className="sp-ring-3" />
            <circle cx="0" cy="0" r="6"
              fill={PINK} filter="url(#sp-dot)" opacity="0.95" />
            <circle cx="0" cy="0" r="2.5"
              fill="white" opacity="1" />
          </g>
        </svg>
      )}
    </>
  )
}
