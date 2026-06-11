import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* Magnetic hover — the wrapped element is gently pulled toward the cursor */
export default function Magnetic({ children, strength = 0.32, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 16, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 200, damping: 16, mass: 0.35 })

  const onMove = e => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
