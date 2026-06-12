import { useEffect, useRef, useState, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────────────────────
   HeaderConnectors — 6 thin ambient wires, one per nav link.
   Lightweight: 1 path per wire, 1 shared SVG blur filter (stdDeviation=5),
   no CSS blur (avoids large rasterisation buffers on tall SVG).
────────────────────────────────────────────────────────────────────────── */

const CONNECTORS = [
  { id: 'about',    navSel: '[data-hc-link="about"]',    targSel: '[data-hc-target="about"]',    color: '#66DDFF' },
  { id: 'services', navSel: '[data-hc-link="services"]', targSel: '[data-hc-target="services"]', color: '#8899FF' },
  { id: 'portfolio',navSel: '[data-hc-link="portfolio"]',targSel: '[data-hc-target="portfolio"]',color: '#CC88FF' },
  { id: 'blog',     navSel: '[data-hc-link="blog"]',     targSel: 'footer a[href="/blog"]',      color: '#66FFBB' },
  { id: 'contact',  navSel: '[data-hc-link="contact"]',  targSel: '[data-hc-target="contact"]',  color: '#FF8899' },
  { id: 'analyzer', navSel: '[data-hc-link="analyzer"]', targSel: '[data-hc-target="analyzer"]', color: '#FFCC66' },
]

/* Unique 9-point X patterns (as fractions of W) — full-width zigzags */
const PATTERNS = [
  [0.86, 0.13, 0.80, 0.18, 0.82, 0.14, 0.78, 0.20, 0.75],
  [0.14, 0.87, 0.20, 0.82, 0.15, 0.85, 0.22, 0.78, 0.25],
  [0.72, 0.13, 0.85, 0.28, 0.80, 0.15, 0.75, 0.12, 0.70],
  [0.28, 0.87, 0.15, 0.72, 0.20, 0.85, 0.25, 0.88, 0.30],
  [0.85, 0.28, 0.88, 0.14, 0.72, 0.86, 0.18, 0.80, 0.70],
  [0.15, 0.72, 0.12, 0.86, 0.28, 0.14, 0.82, 0.20, 0.30],
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

function wirePath(nx, ny, tx, ty, W, idx) {
  const pat  = PATTERNS[idx]
  const span = ty - ny
  const step = span / (pat.length + 1)
  const pts  = [[nx, ny]]
  pat.forEach((xf, j) => pts.push([W * xf, ny + step * (j + 1)]))
  pts.push([tx, ty])
  return smooth(pts)
}

export default function HeaderConnectors() {
  const anchorRef = useRef(null)
  const pathRefs  = CONNECTORS.map(() => useRef(null)) // eslint-disable-line
  const lengths   = useRef(CONNECTORS.map(() => 0))
  const targDocYs = useRef(CONNECTORS.map(() => 0))
  const rafRef    = useRef(null)

  const [dims,  setDims]  = useState({ w: 0, h: 0 })
  const [wires, setWires] = useState(null)

  const recalc = useCallback(() => {
    const container = anchorRef.current?.parentElement
    if (!container) return
    const W = container.offsetWidth
    const H = container.scrollHeight

    const computed = CONNECTORS.map(({ navSel, targSel }, i) => {
      const navEl  = document.querySelector(navSel)
      const targEl = document.querySelector(targSel)
      if (!navEl || !targEl) return null
      const nr = navEl.getBoundingClientRect()
      const tr = targEl.getBoundingClientRect()
      const nx = nr.left + nr.width  / 2
      const ny = nr.top  + nr.height / 2
      const tx = tr.left + tr.width  / 2
      const ty = tr.top  + tr.height / 2 + window.scrollY
      return { path: wirePath(nx, ny, tx, ty, W, i), targetDocY: ty }
    })

    computed.forEach((c, i) => { targDocYs.current[i] = c?.targetDocY ?? 0 })
    setDims({ w: W, h: H })
    setWires(computed.map(c => c?.path ?? null))
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
    if (!wires) return
    const id = requestAnimationFrame(() => {
      pathRefs.forEach((ref, i) => {
        const el = ref.current
        if (!el) return
        const l = el.getTotalLength?.() ?? 0
        if (!l) return
        lengths.current[i] = l
        el.style.strokeDasharray  = `${l}`
        el.style.strokeDashoffset = `${l}`
      })
      onScroll()
    })
    return () => cancelAnimationFrame(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wires])

  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const sy = window.scrollY
      pathRefs.forEach((ref, i) => {
        const el = ref.current
        const l  = lengths.current[i]
        const tY = targDocYs.current[i]
        if (!el || !l || !tY) return
        const progress = Math.min(sy / (tY * 0.85), 1)
        el.style.strokeDashoffset = `${l - l * progress}`
      })
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

  const show = dims.w >= 1024 && !!wires

  return (
    <>
      <div ref={anchorRef} aria-hidden
        style={{ position: 'absolute', width: 0, height: 0, top: 0, left: 0, pointerEvents: 'none' }} />

      {show && (
        <svg aria-hidden
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: dims.h,
            zIndex: 3, pointerEvents: 'none',
            overflow: 'visible', mixBlendMode: 'screen',
          }}
          viewBox={`0 0 ${dims.w} ${dims.h}`}
        >
          <defs>
            {/* Single cheap SVG blur — small stdDeviation, tight region */}
            <filter id="hc-soft" x="-30%" y="0%" width="160%" height="100%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
            </filter>
          </defs>

          {wires.map((d, i) => {
            if (!d) return null
            const { color } = CONNECTORS[i]
            return (
              <path
                key={i}
                ref={pathRefs[i]}
                d={d}
                fill="none"
                stroke={color}
                strokeWidth="10"
                strokeLinecap="round"
                opacity="0.38"
                filter="url(#hc-soft)"
              />
            )
          })}
        </svg>
      )}
    </>
  )
}
