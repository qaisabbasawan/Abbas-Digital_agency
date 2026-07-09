import { Phone, MapPin, Star } from 'lucide-react'

/* Six distinct CSS-3D hero centerpieces so the 14 industry landing pages
   don't all share one rotating cube. Assignment (see heroVariant in
   src/data/industryLandingPages.js) is spread so no two adjacent verticals
   in the data file share a variant. Each variant still uses the site's
   brand-pink/brand-blue palette — only the shape and motion differ. */

function OrbitVisual({ coreIcon, satellites }) {
  return (
    <div className="il-orbit">
      <div className="il-orbit-core">{coreIcon}</div>
      {satellites.map((s, i) => {
        const ring = i % 2 === 0 ? 1 : 2
        const radius = ring === 1 ? 92 : 148
        const dur = ring === 1 ? 13 : 21
        const dir = ring === 1 ? 'normal' : 'reverse'
        const startAngle = (360 / satellites.length) * i
        return (
          <div
            key={i}
            className="il-orbit-track"
            style={{ animationDuration: `${dur}s`, animationDirection: dir, transform: `rotate(${startAngle}deg)` }}
          >
            <span className="il-orbit-sat" style={{ transform: `translateX(${radius}px)` }}>{s}</span>
          </div>
        )
      })}
    </div>
  )
}

function RadarVisual({ coreIcon, satellites }) {
  const positions = [
    { top: '4%', left: '10%' },
    { top: '10%', right: '2%' },
    { bottom: '6%', left: '2%' },
  ]
  return (
    <div className="il-radar">
      {[0, 1, 2].map((i) => (
        <span key={i} className="il-radar-ring" style={{ animationDelay: `${i}s` }} />
      ))}
      <div className="il-radar-core">{coreIcon}</div>
      {satellites.slice(0, 3).map((s, i) => (
        <span key={i} className="il-radar-badge" style={{ ...positions[i], animationDelay: `${i * 0.4}s` }}>{s}</span>
      ))}
    </div>
  )
}

function CardsVisual({ coreIcon, satellites }) {
  const cards = [coreIcon, ...satellites].slice(0, 4)
  const offsets = [
    { x: -70, y: -10, r: -14, z: 4, delay: '0s' },
    { x: -20, y: 10, r: -4, z: 3, delay: '0.3s' },
    { x: 32, y: -4, r: 8, z: 2, delay: '0.6s' },
    { x: 82, y: 14, r: 16, z: 1, delay: '0.9s' },
  ]
  return (
    <div className="il-cards">
      {cards.map((c, i) => (
        <div
          key={i}
          className="il-card"
          style={{
            transform: `translateX(${offsets[i].x}px) translateY(${offsets[i].y}px) rotate(${offsets[i].r}deg)`,
            zIndex: offsets[i].z,
            animationDelay: offsets[i].delay,
            '--r': `${offsets[i].r}deg`,
          }}
        >
          {c}
        </div>
      ))}
    </div>
  )
}

function BarsVisual({ coreIcon, satellites }) {
  const heights = [58, 92, 74, 110, 66]
  return (
    <div className="il-bars">
      <span className="il-bars-icon">{coreIcon}</span>
      {heights.map((h, i) => (
        <div key={i} className="il-bar" style={{ height: `${h}px`, animationDelay: `${i * 0.18}s` }} />
      ))}
      <div className="il-bars-floaters">
        {satellites.slice(0, 2).map((s, i) => (
          <span key={i} className={`il-bars-float f${i}`}>{s}</span>
        ))}
      </div>
    </div>
  )
}

function BlocksVisual({ coreIcon, satellites }) {
  const blocks = [
    { icon: coreIcon, top: '38%', left: '38%', size: 78, delay: '0s' },
    { icon: satellites[0], top: '6%', left: '8%', size: 56, delay: '0.6s' },
    { icon: satellites[1], top: '10%', right: '4%', size: 50, delay: '1.2s' },
    { icon: satellites[2], bottom: '8%', left: '4%', size: 54, delay: '1.8s' },
    { icon: satellites[0], bottom: '2%', right: '10%', size: 46, delay: '2.4s' },
  ]
  return (
    <div className="il-blocks">
      {blocks.map((b, i) => (
        <span
          key={i}
          className="il-block"
          style={{
            top: b.top, left: b.left, right: b.right, bottom: b.bottom,
            width: b.size, height: b.size, fontSize: b.size * 0.42,
            animationDelay: b.delay, '--r': `${(i % 2 === 0 ? 1 : -1) * (6 + i * 2)}deg`,
          }}
        >
          {b.icon}
        </span>
      ))}
    </div>
  )
}

function SunburstVisual({ coreIcon }) {
  const rays = Array.from({ length: 10 })
  return (
    <div className="il-sun">
      <div className="il-sun-rays">
        {rays.map((_, i) => (
          <span key={i} className="il-sun-ray" style={{ transform: `rotate(${(360 / rays.length) * i}deg) translateY(-90px)` }} />
        ))}
      </div>
      <div className="il-sun-core">{coreIcon}</div>
    </div>
  )
}

const VARIANTS = {
  orbit: OrbitVisual,
  radar: RadarVisual,
  cards: CardsVisual,
  bars: BarsVisual,
  blocks: BlocksVisual,
  sunburst: SunburstVisual,
}

export default function IndustryHeroVisual({ variant, icon, satellites = [], proof }) {
  const Visual = VARIANTS[variant] || OrbitVisual

  return (
    <div className="relative h-[420px] hidden lg:flex items-center justify-center" style={{ perspective: '1100px' }} aria-hidden="true">
      <div className="absolute top-6 left-8 w-28 h-28 rounded-full bg-brand-pink/25 blur-2xl animate-pulse" />
      <div className="absolute bottom-10 right-6 w-20 h-20 rounded-full bg-brand-blue-light/30 blur-2xl animate-pulse" style={{ animationDelay: '1.2s' }} />

      <div className="relative w-[320px] h-[320px]" style={{ transformStyle: 'preserve-3d' }}>
        <Visual coreIcon={icon} satellites={satellites} />
      </div>

      {[
        { icon: <Phone size={15} className="text-brand-pink" />, big: proof[0].big, small: proof[0].small, cls: 'top-4 right-0', delay: '0s' },
        { icon: <MapPin size={15} className="text-brand-blue-light" />, big: proof[1].big, small: proof[1].small, cls: 'bottom-8 left-0', delay: '-2s' },
        { icon: <Star size={15} className="text-yellow-400" />, big: '4.9 rating', small: '100+ reviews', cls: 'top-1/2 -right-4', delay: '-4s' },
      ].map((c, i) => (
        <div
          key={i}
          className={`absolute ${c.cls} flex items-center gap-3 rounded-2xl border border-white/10 bg-bg-dark2/85 px-4 py-3 backdrop-blur-md shadow-[0_18px_50px_rgba(0,0,0,0.45)]`}
          style={{ animation: 'il-float 6s ease-in-out infinite', animationDelay: c.delay }}
        >
          <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-white/[0.06]">{c.icon}</span>
          <span>
            <b className="block text-[14px] text-white leading-tight">{c.big}</b>
            <span className="text-[11px] text-white/40">{c.small}</span>
          </span>
        </div>
      ))}

      <style>{`
        @keyframes il-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-14px) } }

        /* orbit */
        .il-orbit { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
        .il-orbit-core { width: 118px; height: 118px; border-radius: 50%; font-size: 54px; display: flex; align-items: center; justify-content: center; position: relative; z-index: 3; background: linear-gradient(145deg, rgba(232,21,90,0.28), rgba(46,85,224,0.22)); border: 1px solid rgba(232,21,90,0.4); box-shadow: 0 0 70px -10px rgba(232,21,90,0.5), inset 0 0 30px rgba(255,255,255,0.06); backdrop-filter: blur(6px); }
        .il-orbit-track { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; animation-name: il-orbit-spin; animation-timing-function: linear; animation-iteration-count: infinite; }
        .il-orbit-sat { position: absolute; width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 21px; background: rgba(255,255,255,0.05); border: 1px solid rgba(232,21,90,0.3); backdrop-filter: blur(4px); box-shadow: 0 6px 20px rgba(0,0,0,0.35); }
        @keyframes il-orbit-spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }

        /* radar */
        .il-radar { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
        .il-radar-core { width: 118px; height: 118px; border-radius: 50%; font-size: 54px; display: flex; align-items: center; justify-content: center; position: relative; z-index: 3; background: linear-gradient(145deg, rgba(232,21,90,0.28), rgba(46,85,224,0.22)); border: 1px solid rgba(232,21,90,0.45); box-shadow: 0 0 70px -10px rgba(232,21,90,0.5); }
        .il-radar-ring { position: absolute; border-radius: 50%; border: 2px solid rgba(232,21,90,0.5); animation: il-radar-ping 3s cubic-bezier(0,0,0.2,1) infinite; }
        @keyframes il-radar-ping { 0% { width: 118px; height: 118px; opacity: 0.7; } 100% { width: 340px; height: 340px; opacity: 0; } }
        .il-radar-badge { position: absolute; width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 19px; background: rgba(255,255,255,0.05); border: 1px solid rgba(46,85,224,0.35); backdrop-filter: blur(4px); animation: il-float 4s ease-in-out infinite; }

        /* cards */
        .il-cards { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
        .il-card { position: absolute; width: 112px; height: 142px; border-radius: 20px; background: linear-gradient(160deg, rgba(232,21,90,0.16), rgba(46,85,224,0.14)); border: 1px solid rgba(232,21,90,0.3); display: flex; align-items: center; justify-content: center; font-size: 40px; box-shadow: 0 20px 50px -12px rgba(0,0,0,0.5); animation: il-card-sway 5s ease-in-out infinite; }
        @keyframes il-card-sway { 0%, 100% { margin-top: 0; } 50% { margin-top: -14px; } }

        /* bars */
        .il-bars { position: relative; width: 100%; height: 100%; display: flex; align-items: flex-end; justify-content: center; gap: 12px; padding-bottom: 46px; }
        .il-bar { width: 30px; border-radius: 10px 10px 4px 4px; background: linear-gradient(180deg, #E8155A, #2E55E0); box-shadow: 0 10px 30px -8px rgba(232,21,90,0.45); animation: il-bar-grow 2.4s ease-in-out infinite alternate; transform-origin: bottom center; }
        @keyframes il-bar-grow { 0% { transform: scaleY(0.55); } 100% { transform: scaleY(1); } }
        .il-bars-icon { position: absolute; top: 10%; left: 50%; transform: translateX(-50%); font-size: 46px; animation: il-float 5s ease-in-out infinite; }
        .il-bars-float { position: absolute; font-size: 26px; animation: il-float 4.5s ease-in-out infinite; }
        .il-bars-float.f0 { top: 30%; left: 6%; }
        .il-bars-float.f1 { top: 22%; right: 4%; animation-delay: -2s; }

        /* blocks */
        .il-blocks { position: relative; width: 100%; height: 100%; }
        .il-block { position: absolute; border-radius: 18px; display: flex; align-items: center; justify-content: center; background: linear-gradient(150deg, rgba(232,21,90,0.2), rgba(46,85,224,0.16)); border: 1px solid rgba(232,21,90,0.3); box-shadow: 0 16px 40px -10px rgba(0,0,0,0.5); animation: il-block-float 5s ease-in-out infinite; }
        @keyframes il-block-float { 0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); } 50% { transform: translateY(-16px) rotate(var(--r, 0deg)); } }

        /* sunburst */
        .il-sun { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
        .il-sun-core { width: 112px; height: 112px; border-radius: 50%; font-size: 52px; display: flex; align-items: center; justify-content: center; position: relative; z-index: 3; background: radial-gradient(circle at 40% 35%, rgba(255,197,61,0.55), rgba(232,21,90,0.28)); box-shadow: 0 0 90px -6px rgba(255,197,61,0.6); animation: il-sun-pulse 3s ease-in-out infinite; }
        @keyframes il-sun-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
        .il-sun-rays { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; animation: il-orbit-spin 26s linear infinite; }
        .il-sun-ray { position: absolute; width: 4px; height: 70px; border-radius: 4px; background: linear-gradient(180deg, rgba(255,197,61,0.75), transparent); top: 50%; left: 50%; transform-origin: center 0; }
      `}</style>
    </div>
  )
}
