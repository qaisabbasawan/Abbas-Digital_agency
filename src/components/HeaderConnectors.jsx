import { useEffect, useRef, useState, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────────────────────
   HeaderConnectors — 6 soft blurred ambient wires, one per nav link.
   Each wire zigzags aggressively across the full page width using a unique
   pattern, creating lush curly paths. The visual treatment is purely
   atmospheric: heavy blur, thick soft stroke, screen blend — coloured
   light in the background.
────────────────────────────────────────────────────────────────────────── */

const CONNECTORS = [
  { id: 'about',    navSel: '[data-hc-link="about"]',    targSel: '[data-hc-target="about"]',    color: '#66DDFF' },
  { id: 'services', navSel: '[data-hc-link="services"]', targSel: '[data-hc-target="services"]', color: '#8899FF' },
  { id: 'portfolio',navSel: '[data-hc-link="portfolio"]',targSel: '[data-hc-target="portfolio"]',color: '#CC88FF' },
  { id: 'blog',     navSel: '[data-hc-link="blog"]',     targSel: 'footer a[href="/blog"]',      color: '#66FFBB' },
  { id: 'contact',  navSel: '[data-hc-link="contact"]',  targSel: '[data-hc-target="contact"]',  color: '#FF8899' },
  { id: 'analyzer', navSel: '[data-hc-link="analyzer"]', targSel: '[data-hc-target="analyzer"]', color: '#FFCC66' },
]

/*
 * Unique full-width zigzag patterns per wire — 9 X positions between
 * start and end. Different phase and swing direction for every wire.
 * Values are fractions of viewport width (resolved at runtime).
 */
const PATTERNS = [
  [0.86, 0.13, 0.80, 0.18, 0.82, 0.14, 0.78, 0.20, 0.75],  // about    — starts far-right
  [0.14, 0.87, 0.20, 0.82, 0.15, 0.85, 0.22, 0.78, 0.25],  // services — starts far-left
  [0.72, 0.13, 0.85, 0.28, 0.80, 0.15, 0.75, 0.12, 0.70],  // portfolio — center-right opener
  [0.28, 0.87, 0.15, 0.72, 0.20, 0.85, 0.25, 0.88, 0.30],  // blog      — center-left opener
  [0.85, 0.28, 0.88, 0.14, 0.72, 0.86, 0.18, 0.80, 0.70],  // contact   — erratic right-heavy
  [0.15, 0.72, 0.12, 0.86, 0.28, 0.14, 0.82, 0.20, 0.30],  // analyzer  — erratic left-heavy
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

function wirePath(nx, ny, tx, ty, W, wireIndex) {
  const pat  = PATTERNS[wireIndex]
  const span = ty - ny
  const step = span / (pat.length + 1)

  const pts = [[nx, ny]]
  pat.forEach((xFrac, j) => {
    pts.push([W * xFrac, ny + step * (j + 1)])
  })
  pts.push([tx, ty])

  return smooth(pts)
}

export default function HeaderConnectors() {
  const anchorRef = useRef(null)

  /* Two refs per wire: halo (wide blur) + inner (medium blur) */
  const haloRefs  = CONNECTORS.map(() => useRef(null))  // eslint-disable-line
  const innerRefs = CONNECTORS.map(() => useRef(null))  // eslint-disable-line

  const lengths     = useRef(CONNECTORS.map(() => 0))
  const targetDocYs = useRef(CONNECTORS.map(() => 0))
  const rafRef      = useRef(null)

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

    computed.forEach((c, i) => {
      targetDocYs.current[i] = c?.targetDocY ?? 0
    })

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
      innerRefs.forEach((ref, i) => {
        const el = ref.current
        if (!el) return
        const l = el.getTotalLength?.() ?? 0
        if (!l) return
        lengths.current[i] = l
        el.style.strokeDasharray  = `${l}`
        el.style.strokeDashoffset = `${l}`
        const hl = haloRefs[i].current
        if (hl) {
          hl.style.strokeDasharray  = `${l}`
          hl.style.strokeDashoffset = `${l}`
        }
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

      innerRefs.forEach((ref, i) => {
        const el = ref.current
        const l  = lengths.current[i]
        const tY = targetDocYs.current[i]
        if (!el || !l || !tY) return

        const progress = Math.min(sy / (tY * 0.85), 1)
        const off      = l - l * progress

        el.style.strokeDashoffset = `${off}`
        const hl = haloRefs[i].current
        if (hl) hl.style.strokeDashoffset = `${off}`
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
            position:      'absolute',
            top: 0, left: 0,
            width:         '100%',
            height:        dims.h,
            /* z:3 — sits above the content div (z:2) so screen blend
               can work across all sections, not just the hero */
            zIndex:        3,
            pointerEvents: 'none',
            overflow:      'visible',
            mixBlendMode:  'screen',
          }}
          viewBox={`0 0 ${dims.w} ${dims.h}`}
        >
          {wires.map((d, i) => {
            if (!d) return null
            const { color } = CONNECTORS[i]
            return (
              <g key={i}>
                {/* Ultra-wide blurred halo */}
                <path
                  ref={haloRefs[i]}
                  d={d}
                  fill="none"
                  stroke={color}
                  strokeWidth="90"
                  strokeLinecap="round"
                  opacity="0.26"
                  style={{ filter: 'blur(36px)' }}
                />
                {/* Softer inner streak */}
                <path
                  ref={innerRefs[i]}
                  d={d}
                  fill="none"
                  stroke={color}
                  strokeWidth="28"
                  strokeLinecap="round"
                  opacity="0.20"
                  style={{ filter: 'blur(14px)' }}
                />
              </g>
            )
          })}
        </svg>
      )}
    </>
  )
}
