import { useEffect, useRef, useState, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────────────────────
   HeaderConnectors — 6 soft blurred ambient wires, one per nav link.
   Each wire is a diffuse glowing streak in the background: heavy blur,
   thick stroke, very low opacity — purely atmospheric, like coloured light
   bleeding down the page from each nav item to its section.
────────────────────────────────────────────────────────────────────────── */

const CONNECTORS = [
  { id: 'about',    navSel: '[data-hc-link="about"]',    targSel: '[data-hc-target="about"]',    color: '#66DDFF', xSwing: +130 },
  { id: 'services', navSel: '[data-hc-link="services"]', targSel: '[data-hc-target="services"]', color: '#8899FF', xSwing: -100 },
  { id: 'portfolio',navSel: '[data-hc-link="portfolio"]',targSel: '[data-hc-target="portfolio"]',color: '#CC88FF', xSwing: +120 },
  { id: 'blog',     navSel: '[data-hc-link="blog"]',     targSel: 'footer a[href="/blog"]',      color: '#66FFBB', xSwing: -130 },
  { id: 'contact',  navSel: '[data-hc-link="contact"]',  targSel: '[data-hc-target="contact"]',  color: '#FF7799', xSwing: +90  },
  { id: 'analyzer', navSel: '[data-hc-link="analyzer"]', targSel: '[data-hc-target="analyzer"]', color: '#FFCC66', xSwing: -90  },
]

const f = n => n.toFixed(1)

function wirePath(nx, ny, tx, ty, xSwing) {
  const span = ty - ny
  const pts = [
    [nx,                   ny],
    [nx + xSwing * 0.7,    ny + span * 0.22],
    [tx - xSwing * 0.5,    ny + span * 0.50],
    [tx + xSwing * 0.25,   ny + span * 0.75],
    [tx,                   ty],
  ]
  let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]
    const [x1, y1] = pts[i]
    const mid = (y0 + y1) / 2
    d += ` C ${f(x0)} ${f(mid)}, ${f(x1)} ${f(mid)}, ${f(x1)} ${f(y1)}`
  }
  return d
}

export default function HeaderConnectors() {
  const anchorRef   = useRef(null)

  /* Two layers per wire: ultra-wide halo + softer inner glow */
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

    const computed = CONNECTORS.map(({ navSel, targSel, xSwing }) => {
      const navEl  = document.querySelector(navSel)
      const targEl = document.querySelector(targSel)
      if (!navEl || !targEl) return null

      const nr = navEl.getBoundingClientRect()
      const tr = targEl.getBoundingClientRect()

      const nx = nr.left + nr.width  / 2
      const ny = nr.top  + nr.height / 2
      const tx = tr.left + tr.width  / 2
      const ty = tr.top  + tr.height / 2 + window.scrollY

      return { path: wirePath(nx, ny, tx, ty, xSwing), targetDocY: ty }
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
            zIndex:        2,
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
                {/* Ultra-wide blurred halo — the dominant atmospheric glow */}
                <path
                  ref={haloRefs[i]}
                  d={d}
                  fill="none"
                  stroke={color}
                  strokeWidth="80"
                  strokeLinecap="round"
                  opacity="0.28"
                  style={{ filter: 'blur(32px)' }}
                />
                {/* Softer inner streak — slightly crisper, adds depth */}
                <path
                  ref={innerRefs[i]}
                  d={d}
                  fill="none"
                  stroke={color}
                  strokeWidth="24"
                  strokeLinecap="round"
                  opacity="0.22"
                  style={{ filter: 'blur(12px)' }}
                />
              </g>
            )
          })}
        </svg>
      )}
    </>
  )
}
