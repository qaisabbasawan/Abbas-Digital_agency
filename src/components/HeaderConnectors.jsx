import { useEffect, useRef, useState, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────────────────────
   HeaderConnectors — 6 neon wires from each nav link to its landing section.

   Each wire:
   • Starts at the nav link's centre position in the header
   • Ends at the corresponding section's CTA button/element
   • Draws from scroll=0 (all start simultaneously)
   • Finishes when scrollY reaches the target element's document Y position
   • Uses a light CSS drop-shadow for glow — no heavy SVG filters
────────────────────────────────────────────────────────────────────────── */

const CONNECTORS = [
  {
    id:       'about',
    navSel:   '[data-hc-link="about"]',
    targSel:  '[data-hc-target="about"]',
    color:    '#00EEFF',
    xSwing:   +130,
    glow:     'drop-shadow(0 0 4px #00EEFF) drop-shadow(0 0 14px #0099CC)',
  },
  {
    id:       'services',
    navSel:   '[data-hc-link="services"]',
    targSel:  '[data-hc-target="services"]',
    color:    '#5566FF',
    xSwing:   -100,
    glow:     'drop-shadow(0 0 4px #5566FF) drop-shadow(0 0 14px #3344CC)',
  },
  {
    id:       'portfolio',
    navSel:   '[data-hc-link="portfolio"]',
    targSel:  '[data-hc-target="portfolio"]',
    color:    '#AA44FF',
    xSwing:   +110,
    glow:     'drop-shadow(0 0 4px #AA44FF) drop-shadow(0 0 14px #7722CC)',
  },
  {
    id:       'blog',
    navSel:   '[data-hc-link="blog"]',
    targSel:  'footer a[href="/blog"]',
    color:    '#00FF99',
    xSwing:   -130,
    glow:     'drop-shadow(0 0 4px #00FF99) drop-shadow(0 0 14px #00AA66)',
  },
  {
    id:       'contact',
    navSel:   '[data-hc-link="contact"]',
    targSel:  '[data-hc-target="contact"]',
    color:    '#FF2266',
    xSwing:   +90,
    glow:     'drop-shadow(0 0 4px #FF2266) drop-shadow(0 0 14px #CC0044)',
  },
  {
    id:       'analyzer',
    navSel:   '[data-hc-link="analyzer"]',
    targSel:  '[data-hc-target="analyzer"]',
    color:    '#FFAA00',
    xSwing:   -80,
    glow:     'drop-shadow(0 0 4px #FFAA00) drop-shadow(0 0 14px #CC7700)',
  },
]

const f = n => n.toFixed(1)

/* Organic path: nav link → target with two intermediate S-curve waypoints */
function wirePath(nx, ny, tx, ty, xSwing) {
  const span = ty - ny
  const p1x  = nx + xSwing * 0.6
  const p1y  = ny + span   * 0.28
  const p2x  = tx - xSwing * 0.45
  const p2y  = ny + span   * 0.62
  const p3x  = tx + xSwing * 0.18
  const p3y  = ny + span   * 0.82

  let d = `M ${f(nx)} ${f(ny)}`
  const pts = [[nx, ny], [p1x, p1y], [p2x, p2y], [p3x, p3y], [tx, ty]]
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
  const mainRefs    = CONNECTORS.map(() => useRef(null))  // eslint-disable-line
  const glowRefs    = CONNECTORS.map(() => useRef(null))  // eslint-disable-line
  const sparkRefs   = CONNECTORS.map(() => useRef(null))  // eslint-disable-line
  const lengths     = useRef(CONNECTORS.map(() => 0))
  const targetDocYs = useRef(CONNECTORS.map(() => 0))
  const rafRef      = useRef(null)

  const [dims,  setDims]  = useState({ w: 0, h: 0 })
  const [wires, setWires] = useState(null)   // array of path strings

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

  /* Init dasharray after wires are computed */
  useEffect(() => {
    if (!wires) return
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
  }, [wires])

  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const sy = window.scrollY

      mainRefs.forEach((ref, i) => {
        const el  = ref.current
        const l   = lengths.current[i]
        const tY  = targetDocYs.current[i]
        if (!el || !l || !tY) return

        /* Progress: 0 at scroll=0, 1 when target section is reached */
        const progress = Math.min(sy / (tY * 0.85), 1)
        const drawn    = l * progress
        const off      = l - drawn

        el.style.strokeDashoffset = `${off}`
        const gl = glowRefs[i].current
        if (gl) gl.style.strokeDashoffset = `${off}`

        const sp = sparkRefs[i].current
        if (sp) {
          if (progress < 0.01) {
            sp.setAttribute('display', 'none')
          } else {
            sp.setAttribute('display', 'block')
            const pt = el.getPointAtLength(Math.max(0, drawn - 2))
            sp.setAttribute('transform', `translate(${f(pt.x)},${f(pt.y)})`)
          }
        }
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
            zIndex:        4,
            pointerEvents: 'none',
            overflow:      'visible',
          }}
          viewBox={`0 0 ${dims.w} ${dims.h}`}
        >
          {wires.map((d, i) => {
            if (!d) return null
            const { color, glow } = CONNECTORS[i]
            return (
              <g key={i} style={{ mixBlendMode: 'screen', filter: glow }}>
                {/* Glow stroke */}
                <path ref={glowRefs[i]} d={d} fill="none"
                  stroke={color} strokeWidth="7" strokeLinecap="round"
                  opacity="0.30" />

                {/* Crisp main line */}
                <path ref={mainRefs[i]} d={d} fill="none"
                  stroke={color} strokeWidth="1.6" strokeLinecap="round"
                  opacity="0.92" />

                {/* Spark tip */}
                <g ref={sparkRefs[i]} display="none">
                  <circle cx="0" cy="0" r="16" fill="none"
                    stroke={color} strokeWidth="1" className="sp-ring-1" />
                  <circle cx="0" cy="0" r="10" fill="none"
                    stroke={color} strokeWidth="1.5" className="sp-ring-2" />
                  <circle cx="0" cy="0" r="4" fill={color} opacity="1" />
                  <circle cx="0" cy="0" r="1.8" fill="white" opacity="1" />
                </g>
              </g>
            )
          })}
        </svg>
      )}
    </>
  )
}
