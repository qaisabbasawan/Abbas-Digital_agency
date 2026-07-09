import { Link } from 'react-router-dom'

/* One copy of the item list. The marquee renders it twice for a seamless
   -50% translateX loop; the second copy is aria-hidden and untabbable so
   screen readers and keyboard users only meet each link once. */
function Track({ items, ariaHidden = false }) {
  return (
    <div className="flex items-center shrink-0" aria-hidden={ariaHidden || undefined}>
      {items.map(item => (
        <span key={item.path} className="flex items-center">
          <Link
            to={item.path}
            tabIndex={ariaHidden ? -1 : undefined}
            className="whitespace-nowrap px-3 py-0.5 rounded text-[11px] tracking-wide text-white/35 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-pink/70 transition-colors duration-200"
          >
            {item.label}
          </Link>
          <span className="text-brand-pink/40 text-[7px] leading-none select-none" aria-hidden>
            ◆
          </span>
        </span>
      ))}
    </div>
  )
}

/**
 * Thin auto-scrolling link bar for the footer.
 * direction="left"  → content drifts right-to-left
 * direction="right" → content drifts left-to-right
 * Pauses on hover and keyboard focus; prefers-reduced-motion falls back
 * to a manually scrollable strip (see index.css).
 */
export default function FooterLinkMarquee({ label, items, direction = 'left' }) {
  const duration = Math.max(30, items.length * 4)
  return (
    <nav aria-label={label} className="flex items-center">
      <span className="shrink-0 pl-5 sm:pl-8 lg:pl-12 pr-4 py-2.5 text-[10px] uppercase tracking-[0.22em] text-white/30 whitespace-nowrap">
        {label}
      </span>
      <div className="footer-marquee relative flex-1 overflow-hidden py-2.5">
        <div
          className="footer-marquee-track"
          style={{
            animationDuration: `${duration}s`,
            animationDirection: direction === 'right' ? 'reverse' : 'normal',
          }}
        >
          <Track items={items} />
          <Track items={items} ariaHidden />
        </div>
        <span className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-bg-dark to-transparent" aria-hidden />
        <span className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-bg-dark to-transparent" aria-hidden />
      </div>
    </nav>
  )
}
