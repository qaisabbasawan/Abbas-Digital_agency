export default function Logo({ size = 'md' }) {
  const heights = { sm: 40, md: 56, lg: 80 }
  const h = heights[size] ?? heights.md

  return (
    <img
      src="/logo.png"
      alt="Abbas Digital Agency"
      height={h}
      style={{ height: h, width: 'auto', display: 'block', userSelect: 'none' }}
      draggable={false}
    />
  )
}
