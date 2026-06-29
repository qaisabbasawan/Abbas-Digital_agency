export default function Logo({ size = 'md' }) {
  const heights = { sm: 40, md: 56, lg: 80 }
  const h = heights[size] ?? heights.md
  const w = Math.round(h * 3.2) // logo artwork is 1600×500 (3.2:1)

  return (
    <img
      src="/logo-160.png"
      srcSet="/logo-80.png 1x, /logo-160.png 2x, /logo-240.png 3x"
      alt="Abbas Digital Agency"
      width={w}
      height={h}
      decoding="async"
      fetchPriority="high"
      style={{ height: h, width: 'auto', display: 'block', userSelect: 'none' }}
      draggable={false}
    />
  )
}
