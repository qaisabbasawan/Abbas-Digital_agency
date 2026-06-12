import { useEffect, useRef, useState, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────────────────────
   ScrollPathLine — 3-wire neon weave (performance build)
   Performance: NO SVG feGaussianBlur filters. Each wire is grouped in a <g>
   with a CSS drop-shadow filter — one cheap GPU composite per wire instead
   of 5 expensive SVG filter renders per wire.
────────────────────────────────────────────────────────────────────────── */

const WIRES = [
  { color: '#00DDFF', glow: 'drop-shadow(0 0 5px #00DDFF) drop-shadow(0 0 18px #00AAFF)' },
  { color: '#CC44FF', glow: 'drop-shadow(0 0 5px #CC44FF) drop-shadow(0 0 18px #9922CC)' },
  { color: '#FF2266', glow: 'drop-shadow(0 0 5px #FF2266) drop-shadow(0 0 18px #CC0044)' },
]

const f = n => n.toFixed(1)

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

  return [A, B, Cp]
}

export default function ScrollPathLine() {
  const anchorRef  = useRef(null)
  const mainRefs   = [useRef(null), useRef(null), useRef(null)]
  const glowRefs   = [useRef(null), useRef(null), useRef(null)]
  const sparkRefs  = [useRef(null), useRef(null), useRef(null)]
  const clipRef    = useRef(null)
  const lengths    = useRef([0, 0, 0])
  const rafRef     = useRef(null)

  const [dims,  setDims]  = useState({ w: 0, h: 0 })
  const [paths, setPaths] = useState(null)

  const recalc = useCallback(() => {
    const container = anchorRef.current?.parentElement
    if (!container) return
    const W = container.offsetWidth
    const H = container.scrollHeight

    let endX = W * 0.688
    let endY = H * 0.953
    const btn = document.querySelector('[data-hc-target="contact"]')
      || document.querySelector('#contact button[type="submit"]')
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
      mainRefs.forEach((ref, i) => {
        const el = ref.current
        if (!el) return
        const l = el.getTotalLength?.() ?? 0
        if (!l) return
        lengths.current[i] = l
        el.style.strokeDasharray  = `${l}`
        el.style.strokeDashoffset = `${l}`
        const gl = glowRefs[i].current
        if (gl) {
          gl.style.strokeDasharray  = `${l}`
          gl.style.strokeDashoffset = `${l}`
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

      mainRefs.forEach((ref, i) => {
        const el = ref.current
        const l  = lengths.current[i]
        if (!el || !l) return
        const drawn = l * progress
        const off   = l - drawn
        el.style.strokeDashoffset = `${off}`
        const gl = glowRefs[i].current
        if (gl) gl.style.strokeDashoffset = `${off}`

        const sp = sparkRefs[i].current
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            overflow: 'visible',
          }}
          viewBox={`0 0 ${dims.w} ${dims.h}`}
        >
          <defs>
            <clipPath id="sp-clip">
              <rect ref={clipRef} x="0" y="0" width={dims.w} height="0" />
            </clipPath>
          </defs>

          {paths.map((d, i) => {
            const { color, glow } = WIRES[i]
            const flowClass = i === 0 ? 'sp-flow' : i === 1 ? 'sp-flow-b' : 'sp-flow-c'
            const orbDelay  = i === 0 ? '0s'    : i === 1 ? '1.1s'    : '2.2s'

            return (
              <g key={i} style={{ mixBlendMode: 'screen', filter: glow }}>
                {/* Glow stroke — scroll-drawn */}
                <path ref={glowRefs[i]} d={d} fill="none"
                  stroke={color} strokeWidth="9" strokeLinecap="round"
                  opacity="0.35" />

                {/* Crisp main line — scroll-drawn, getTotalLength source */}
                <path ref={mainRefs[i]} d={d} fill="none"
                  stroke={color} strokeWidth="2" strokeLinecap="round"
                  opacity="0.95" />

                {/* Flowing electricity pulses — CSS animated, clipped to drawn region */}
                <path d={d} fill="none"
                  stroke="white" strokeWidth="2.5" strokeLinecap="round"
                  strokeDasharray="24 204" opacity="0.80"
                  clipPath="url(#sp-clip)"
                  className={flowClass} />

                {/* Travelling pulse orb */}
                <path d={d} fill="none"
                  stroke={color} strokeWidth="5" strokeLinecap="round"
                  strokeDasharray="46 99999"
                  clipPath="url(#sp-clip)"
                  opacity="0.90"
                  className="sp-pulse"
                  style={{ animationDelay: orbDelay }} />

                {/* Spark tip */}
                <g ref={sparkRefs[i]} display="none">
                  <circle cx="0" cy="0" r="22" fill="none"
                    stroke={color} strokeWidth="1" className="sp-ring-1" />
                  <circle cx="0" cy="0" r="14" fill="none"
                    stroke={color} strokeWidth="1.4" className="sp-ring-2" />
                  <circle cx="0" cy="0" r="8" fill="none"
                    stroke={color} strokeWidth="2" className="sp-ring-3" />
                  <circle cx="0" cy="0" r="5.5" fill={color} opacity="1" />
                  <circle cx="0" cy="0" r="2.2" fill="white" opacity="1" />
                </g>
              </g>
            )
          })}
        </svg>
      )}
    </>
  )
}
