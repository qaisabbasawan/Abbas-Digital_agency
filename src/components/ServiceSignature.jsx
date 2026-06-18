import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, animate, AnimatePresence } from 'framer-motion'
import {
  ShoppingCart, Star, Heart, Bell, Wifi,
  ArrowUpRight, TrendingUp, Sparkles,
} from 'lucide-react'

/* ──────────────────────────────────────────────────────────────
   ServiceSignature — a bespoke, living mockup per service that
   instantly communicates what the service *does*. Pure DOM + CSS +
   framer-motion (no extra 3D cost). One module per scene variant.
─────────────────────────────────────────────────────────────── */

const COPY = {
  web:       { eyebrow: 'Built Responsive',  heading: 'One Build, Every Screen' },
  commerce:  { eyebrow: 'Conversion Engine',  heading: 'From Browsing to Buying' },
  mobile:    { eyebrow: 'In Your Pocket',     heading: 'Apps That Feel Alive' },
  ai:        { eyebrow: 'Always On',          heading: 'Conversations on Autopilot' },
  marketing: { eyebrow: 'Measurable Growth',  heading: 'Watch the Numbers Climb' },
  brand:     { eyebrow: 'Identity System',    heading: 'A Brand, Assembled' },
}

const glass = (color, extra = 0) => ({
  background: 'rgba(8,14,42,0.5)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: `1px solid ${color}2E`,
  boxShadow: `0 18px 50px rgba(0,0,0,0.4), 0 0 30px ${color}14, inset 0 1px 0 rgba(255,255,255,0.06)`,
})

/* Animated number that counts up the first time it scrolls into view */
function CountUp({ to, prefix = '', suffix = '', decimals = 0, color, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const mv = useMotionValue(0)
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, to, {
      duration: 1.7, ease: [0.22, 1, 0.36, 1], onUpdate: v => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <span ref={ref} className={className} style={{ color }}>
      {prefix}{val.toFixed(decimals)}{suffix}
    </span>
  )
}

/* ════════════════ WEB — responsive browser frames ════════════════ */
function WebSignature({ color }) {
  const Frame = ({ w, label, single, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl overflow-hidden shrink-0"
      style={{ width: w, ...glass(color) }}
    >
      {/* chrome bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b" style={{ borderColor: `${color}22` }}>
        <span className="w-2 h-2 rounded-full" style={{ background: '#E8155A' }} />
        <span className="w-2 h-2 rounded-full" style={{ background: '#F59E0B' }} />
        <span className="w-2 h-2 rounded-full" style={{ background: '#059669' }} />
        <div className="ml-2 h-3 flex-1 rounded-full" style={{ background: `${color}1E` }} />
      </div>
      {/* content blocks build in, then reflow per device */}
      <div className="p-3 space-y-2">
        <motion.div
          className="h-8 rounded-md"
          style={{ background: `linear-gradient(90deg, ${color}55, ${color}20)` }}
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ delay: delay + 0.3, duration: 0.6 }}
        />
        <div className={single ? 'space-y-2' : 'grid grid-cols-3 gap-2'}>
          {[0, 1, 2].map(i => (
            <motion.div key={i} className="h-10 rounded-md"
              style={{ background: `${color}18`, border: `1px solid ${color}2A` }}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: delay + 0.45 + i * 0.1, duration: 0.4 }}
            />
          ))}
        </div>
        {[0.9, 0.65].map((wd, i) => (
          <motion.div key={i} className="h-2 rounded-full"
            style={{ width: `${wd * 100}%`, background: 'rgba(255,255,255,0.12)' }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: delay + 0.7 + i * 0.1 }}
          />
        ))}
      </div>
      <div className="px-3 pb-2 text-center text-[9px] uppercase tracking-[0.2em] text-white/30">{label}</div>
    </motion.div>
  )

  return (
    <div className="relative flex items-end justify-center gap-4 sm:gap-6 flex-wrap">
      <Frame w="min(340px, 70vw)" label="Desktop" delay={0} />
      <Frame w="160px" label="Tablet" delay={0.15} />
      <Frame w="92px" label="Phone" single delay={0.3} />
      {/* performance score badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
        className="absolute -top-5 right-2 sm:right-8 flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={glass('#059669')}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[11px] font-bold text-emerald-400">
          <CountUp to={100} color="#34D399" /> Performance
        </span>
      </motion.div>
    </div>
  )
}

/* ════════════════ COMMERCE — product card → add to cart → revenue ════════════════ */
function CommerceSignature({ color }) {
  const [count, setCount] = useState(0)
  const [flying, setFlying] = useState(false)

  useEffect(() => {
    const loop = setInterval(() => {
      setFlying(true)
      setTimeout(() => { setFlying(false); setCount(c => (c + 1) % 6) }, 750)
    }, 2600)
    return () => clearInterval(loop)
  }, [])

  return (
    <div className="relative flex flex-col sm:flex-row items-center justify-center gap-8">
      {/* product card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[260px] rounded-2xl overflow-hidden"
        style={glass(color)}
      >
        <div className="h-36 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, #7C1D6F, ${color})` }}>
          <motion.div className="absolute inset-0"
            animate={{ backgroundPosition: ['0% 0%', '120% 0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.22) 50%, transparent 60%)', backgroundSize: '220% 100%' }}
          />
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
            style={{ background: 'rgba(255,255,255,0.9)', color }}>-20%</div>
          {/* the item that "flies" to the cart */}
          <AnimatePresence>
            {flying && (
              <motion.div
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{ x: 220, y: -150, scale: 0.25, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: [0.5, 0, 0.75, 0] }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.92)', boxShadow: `0 0 24px ${color}` }}
              />
            )}
          </AnimatePresence>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-0.5 mb-1.5">
            {[0, 1, 2, 3, 4].map(i => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
            <span className="text-white/40 text-[10px] ml-1">(248)</span>
          </div>
          <div className="text-white font-semibold text-sm mb-1">Premium Sneakers</div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-white font-bold text-lg" style={{ color }}>$79</span>
            <span className="text-white/30 text-xs line-through">$99</span>
          </div>
          <motion.button
            animate={flying ? { scale: [1, 0.92, 1] } : {}}
            transition={{ duration: 0.4 }}
            className="w-full py-2.5 rounded-xl text-white text-xs font-semibold flex items-center justify-center gap-2"
            style={{ background: color, boxShadow: `0 8px 24px ${color}55` }}
          >
            <ShoppingCart size={14} /> Add to Cart
          </motion.button>
        </div>
      </motion.div>

      {/* cart + live revenue */}
      <div className="flex flex-col gap-4">
        <div className="relative flex items-center gap-3 px-5 py-4 rounded-2xl" style={glass(color)}>
          <div className="relative">
            <ShoppingCart size={26} style={{ color }} />
            <motion.span
              key={count}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 14 }}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
              style={{ background: color }}
            >{count}</motion.span>
          </div>
          <div>
            <div className="text-white/40 text-[10px] uppercase tracking-wider">In Cart</div>
            <div className="text-white text-sm font-semibold">{count} item{count === 1 ? '' : 's'}</div>
          </div>
        </div>
        <div className="px-5 py-4 rounded-2xl" style={glass('#059669')}>
          <div className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Revenue Today</div>
          <div className="text-2xl font-bold">
            <CountUp to={24850} prefix="$" color="#34D399" />
          </div>
          <div className="flex items-center gap-1 text-emerald-400 text-[11px] mt-1">
            <TrendingUp size={12} /> +35% conv. rate
          </div>
        </div>
      </div>
    </div>
  )
}

/* ════════════════ MOBILE — phone cycling app screens ════════════════ */
const SCREENS = [
  { name: 'Home',    bars: [0.9, 0.6, 0.75], tint: '#7C3AED' },
  { name: 'Profile', bars: [0.7, 0.85, 0.5], tint: '#A855F7' },
  { name: 'Stats',   bars: [0.55, 0.9, 0.7], tint: '#6D28D9' },
]
function MobileSignature({ color }) {
  const [screen, setScreen] = useState(0)
  const [toast, setToast] = useState(false)
  useEffect(() => {
    const s = setInterval(() => setScreen(p => (p + 1) % SCREENS.length), 2200)
    const t = setInterval(() => { setToast(true); setTimeout(() => setToast(false), 2200) }, 5200)
    return () => { clearInterval(s); clearInterval(t) }
  }, [])
  const cur = SCREENS[screen]

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ ...glass(color) }}
        className="relative w-[210px] h-[420px] rounded-[2.4rem] p-3"
      >
        {/* the float loop lives on a child so the entrance animation isn't fought */}
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="w-full h-full">
          {/* notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-b-2xl bg-black/60 z-20" />
          {/* screen */}
          <div className="relative w-full h-full rounded-[1.9rem] overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #120a30, #05071a)' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-4 pt-9"
              >
                <div className="h-16 rounded-2xl mb-3" style={{ background: `linear-gradient(135deg, ${cur.tint}, ${color}55)` }} />
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[0, 1, 2, 3, 4, 5].map(i => (
                    <motion.div key={i} className="aspect-square rounded-xl"
                      style={{ background: `${color}22`, border: `1px solid ${color}33` }}
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.04 }}
                    />
                  ))}
                </div>
                {cur.bars.map((w, i) => (
                  <div key={i} className="h-2 rounded-full mb-2" style={{ width: `${w * 100}%`, background: 'rgba(255,255,255,0.14)' }} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* notification toast */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="absolute top-9 left-3 right-3 flex items-center gap-2 px-3 py-2 rounded-xl z-10"
                  style={{ background: 'rgba(20,12,48,0.92)', border: `1px solid ${color}44`, backdropFilter: 'blur(8px)' }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: color }}>
                    <Bell size={13} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-white text-[10px] font-semibold leading-tight">New message</div>
                    <div className="text-white/40 text-[9px] truncate">You have 3 new likes ❤</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* bottom tab bar with sliding active pill */}
            <div className="absolute bottom-0 inset-x-0 h-14 flex items-center justify-around px-4"
              style={{ background: 'rgba(8,5,24,0.7)', borderTop: `1px solid ${color}22` }}>
              {SCREENS.map((_, i) => (
                <div key={i} className="relative flex items-center justify-center w-8 h-8">
                  {screen === i && (
                    <motion.span layoutId="mob-tab" className="absolute inset-0 rounded-full"
                      style={{ background: `${color}33` }} transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                  )}
                  <span className="w-1.5 h-1.5 rounded-full relative z-10"
                    style={{ background: screen === i ? color : 'rgba(255,255,255,0.3)' }} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* orbiting like burst */}
      <motion.div
        className="absolute -right-2 top-10 w-11 h-11 rounded-full flex items-center justify-center"
        style={glass('#E8155A')}
        animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
      >
        <Heart size={18} className="fill-pink-500 text-pink-500" />
      </motion.div>
    </div>
  )
}

/* ════════════════ AI — self-typing chat thread ════════════════ */
const CHAT = [
  { from: 'user', text: 'Do you ship to Lahore?' },
  { from: 'bot',  text: 'Yes! Free delivery in 2–3 days 🚚' },
  { from: 'user', text: 'Track my order #4821?' },
  { from: 'bot',  text: "It's out for delivery — arriving today ✅" },
]
function AISignature({ color }) {
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    let mounted = true
    const run = async () => {
      while (mounted) {
        for (let i = 0; i < CHAT.length; i++) {
          if (CHAT[i].from === 'bot') {
            setTyping(true)
            await wait(900)
            if (!mounted) return
            setTyping(false)
          }
          setShown(i + 1)
          await wait(1100)
          if (!mounted) return
        }
        await wait(1600)
        if (!mounted) return
        setShown(0)
      }
    }
    const wait = ms => new Promise(r => setTimeout(r, ms))
    run()
    return () => { mounted = false }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-[min(380px,90vw)] rounded-2xl overflow-hidden"
      style={glass(color)}
    >
      {/* header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: `${color}22` }}>
        <div className="relative w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${color}22`, border: `1px solid ${color}44` }}>
          <Sparkles size={16} style={{ color }} />
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2" style={{ borderColor: '#0a1130' }} />
        </div>
        <div className="flex-1">
          <div className="text-white text-sm font-semibold">Support Assistant</div>
          <div className="flex items-center gap-1 text-emerald-400 text-[10px]"><Wifi size={10} /> Online · replies instantly</div>
        </div>
      </div>
      {/* messages */}
      <div className="p-4 space-y-3 h-[260px] flex flex-col justify-end overflow-hidden">
        {CHAT.slice(0, shown).map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className={`max-w-[78%] px-3.5 py-2.5 text-[13px] leading-snug ${m.from === 'user' ? 'self-end text-white rounded-2xl rounded-br-sm' : 'self-start text-white/85 rounded-2xl rounded-bl-sm'}`}
            style={m.from === 'user'
              ? { background: color, boxShadow: `0 6px 18px ${color}40` }
              : { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {m.text}
          </motion.div>
        ))}
        {typing && (
          <div className="self-start px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {[0, 1, 2].map(i => (
              <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-white/60"
                animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
            ))}
          </div>
        )}
      </div>
      {/* input */}
      <div className="flex items-center gap-2 px-4 py-3 border-t" style={{ borderColor: `${color}22` }}>
        <div className="flex-1 h-9 rounded-full px-4 flex items-center text-white/30 text-xs" style={{ background: 'rgba(255,255,255,0.05)' }}>Type a message…</div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: color }}>
          <ArrowUpRight size={16} className="text-white" />
        </div>
      </div>
    </motion.div>
  )
}

/* ════════════════ MARKETING — live analytics dashboard ════════════════ */
const MK_BARS = [0.45, 0.62, 0.5, 0.78, 0.68, 0.92, 1]
function MarketingSignature({ color }) {
  return (
    <div className="w-[min(520px,92vw)] rounded-2xl p-6" style={glass(color)}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-white/40 text-[10px] uppercase tracking-[0.2em]">Campaign Performance</div>
          <div className="text-white font-semibold text-sm mt-0.5">Last 7 days</div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: '#05966922', border: '1px solid #05966944' }}>
          <TrendingUp size={13} className="text-emerald-400" />
          <span className="text-emerald-400 text-xs font-bold">Live</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'ROAS', to: 4.8, suffix: '×', dec: 1 },
          { label: 'Traffic', to: 312, suffix: '%', dec: 0, prefix: '+' },
          { label: 'Leads', to: 1284, dec: 0 },
        ].map(k => (
          <div key={k.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${color}22` }}>
            <div className="text-white/40 text-[9px] uppercase tracking-wider mb-1">{k.label}</div>
            <div className="text-lg font-bold">
              <CountUp to={k.to} prefix={k.prefix || ''} suffix={k.suffix || ''} decimals={k.dec} color={color} />
            </div>
          </div>
        ))}
      </div>

      {/* growing bar chart */}
      <div className="flex items-end justify-between gap-2 h-32 px-1">
        {MK_BARS.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
            <motion.div
              className="w-full rounded-t-md"
              style={{ background: `linear-gradient(180deg, ${color}, ${color}55)`, boxShadow: `0 0 16px ${color}40` }}
              initial={{ height: 0 }}
              whileInView={{ height: `${h * 100}%` }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 px-1">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <span key={i} className="flex-1 text-center text-white/25 text-[9px]">{d}</span>
        ))}
      </div>
    </div>
  )
}

/* ════════════════ BRAND — logo assembling + palette + type ════════════════ */
function BrandSignature({ color }) {
  const palette = ['#D97706', '#E8155A', '#2E55E0', '#0891B2', '#059669']
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
      {/* logo lockup that assembles */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="w-[260px] h-[260px] rounded-2xl flex items-center justify-center relative overflow-hidden"
        style={glass(color)}
      >
        <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(circle at 50% 40%, ${color}22, transparent 70%)` }} />
        {/* monogram built from converging shapes */}
        <div className="relative w-28 h-28">
          <motion.span className="absolute inset-0 rounded-2xl"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}66)` }}
            initial={{ rotate: -45, scale: 0, opacity: 0 }}
            whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          />
          <motion.span className="absolute inset-3 rounded-xl border-2"
            style={{ borderColor: 'rgba(255,255,255,0.7)' }}
            initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.45, type: 'spring', stiffness: 140 }}
          />
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-white font-bold text-5xl"
            initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.65, type: 'spring', stiffness: 160 }}
          >A</motion.span>
        </div>
      </motion.div>

      {/* palette + type scale */}
      <div className="flex flex-col gap-5">
        <div>
          <div className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-2.5">Colour System</div>
          <div className="flex gap-2">
            {palette.map((c, i) => (
              <motion.div key={c}
                initial={{ opacity: 0, y: 16, scale: 0.6 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 220 }}
                whileHover={{ y: -5 }}
                className="w-11 h-16 rounded-lg" style={{ background: c, boxShadow: `0 6px 18px ${c}55` }}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-2.5">Typography</div>
          <div className="space-y-1.5">
            {[
              { t: 'Aa', w: 700, s: '28px', l: 'Bold' },
              { t: 'Aa', w: 500, s: '22px', l: 'Medium' },
              { t: 'Aa', w: 300, s: '18px', l: 'Light' },
            ].map((row, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-baseline gap-3"
              >
                <span className="text-white leading-none" style={{ fontWeight: row.w, fontSize: row.s }}>{row.t}</span>
                <span className="text-white/30 text-[11px]">{row.l} · {row.s}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const MODULES = {
  web: WebSignature,
  commerce: CommerceSignature,
  mobile: MobileSignature,
  ai: AISignature,
  marketing: MarketingSignature,
  brand: BrandSignature,
}

/* Just the animated mockup — used as the hero visual on each service page */
export function SignatureVisual({ variant = 'web', color = '#2E55E0' }) {
  const Module = MODULES[variant] || WebSignature
  return <Module color={color} />
}

export default function ServiceSignature({ variant = 'web', color = '#2E55E0', glow }) {
  const Module = MODULES[variant] || WebSignature
  const copy = COPY[variant] || COPY.web

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[520px] h-[520px] rounded-full blur-[150px] pointer-events-none opacity-40"
        style={{ background: glow }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}
          className="text-[11px] tracking-[0.28em] uppercase mb-3" style={{ color }}
        >{copy.eyebrow}</motion.p>
        <h2 className="font-bold text-white mb-14 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          {copy.heading}
        </h2>

        <div className="mt-6 pt-8">
          <Module color={color} />
        </div>
      </div>
    </section>
  )
}
