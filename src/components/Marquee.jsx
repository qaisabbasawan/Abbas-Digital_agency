const items = [
  'Web Development', 'E-Commerce', 'Mobile Apps',
  'AI Solutions', 'Digital Marketing', 'Branding & Design',
]

export default function Marquee() {
  const track = [...items, ...items, ...items]
  return (
    <div className="py-4 border-y border-white/10 overflow-hidden marquee-wrapper bg-bg-dark2/60 backdrop-blur-sm">
      <div className="marquee-track select-none">
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6 font-syne font-bold text-xs uppercase tracking-[0.25em] text-white/40">
            {item}
            <span className="text-brand-pink text-base leading-none">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
