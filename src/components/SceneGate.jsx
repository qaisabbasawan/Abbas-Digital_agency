import { Suspense, cloneElement, useEffect, useRef, useState } from 'react'
import { useIsClient } from '../hooks/useIsClient'
import { canRender3D } from '../lib/webgl'

/* Mounts a lazy three.js scene only on devices that can render it with a GPU
   (see lib/webgl.js) and shows `fallback` everywhere else — during
   prerender, while the scene chunk downloads, and on devices that skip 3D.
   Devices that skip 3D never download three.js at all.

   The scene receives an `active` prop that is false while it is off-screen,
   so it can stop its render loop. `watch` optionally names the element whose
   visibility decides that (defaults to the scene's own box). */
export default function SceneGate({ children, fallback = null, watch }) {
  const isClient = useIsClient()
  const capable = isClient && canRender3D()
  const boxRef = useRef(null)
  const [active, setActive] = useState(true)

  useEffect(() => {
    if (!capable) return
    const el = watch?.current ?? boxRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [capable, watch])

  return (
    <div ref={boxRef} className="absolute inset-0">
      {capable
        ? <Suspense fallback={fallback}>{cloneElement(children, { active })}</Suspense>
        : fallback}
    </div>
  )
}

/* Lightweight stand-in for the 3D scenes: a glowing orb over a faint star
   field, drawn with CSS gradients only — no JavaScript, no animation loop. */
export function SceneFallback({ color = '#2E55E0', accent = '#E8155A', className = 'left-1/2 top-1/2', size = 'min(62vw, 520px)' }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 12% 22%, #fff9, transparent), radial-gradient(1px 1px at 78% 14%, #fff8, transparent),' +
            'radial-gradient(1.5px 1.5px at 64% 72%, #fffa, transparent), radial-gradient(1px 1px at 32% 82%, #fff7, transparent),' +
            'radial-gradient(1px 1px at 88% 58%, #fff8, transparent), radial-gradient(1.5px 1.5px at 46% 38%, #fff6, transparent),' +
            'radial-gradient(1px 1px at 22% 56%, #fff7, transparent), radial-gradient(1px 1px at 92% 86%, #fff6, transparent)',
        }}
      />
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${className}`}
        style={{
          width: size,
          aspectRatio: '1',
          background: `radial-gradient(circle at 34% 30%, #ffffff40 0%, ${color} 26%, ${color}99 52%, transparent 72%)`,
          boxShadow: `0 0 120px ${color}66, 0 0 260px ${accent}26`,
          filter: 'blur(2px)',
        }}
      />
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${className}`}
        style={{
          width: `calc(${size} * 1.7)`,
          aspectRatio: '1',
          border: `1px solid ${accent}40`,
          transform: 'rotateX(72deg)',
        }}
      />
    </div>
  )
}
