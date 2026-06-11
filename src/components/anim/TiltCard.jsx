import { useRef } from 'react'
import {
  motion, useMotionValue, useSpring,
  useTransform, useMotionTemplate,
} from 'framer-motion'

/* 3D tilt card — tilts toward the cursor with a tracking glare spotlight */
export default function TiltCard({
  children,
  className = '',
  max = 9,                                   // max tilt in degrees
  glareColor = 'rgba(255,255,255,0.10)',
  glareSize = 420,
}) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)             // cursor position 0..1
  const py = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 180, damping: 20 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 180, damping: 20 })

  const glareX = useTransform(px, v => `${v * 100}%`)
  const glareY = useTransform(py, v => `${v * 100}%`)
  const glare = useMotionTemplate`radial-gradient(${glareSize}px circle at ${glareX} ${glareY}, ${glareColor}, transparent 65%)`

  const onMove = e => {
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => { px.set(0.5); py.set(0.5) }

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`relative h-full ${className}`}
      >
        {children}
        {/* Cursor-tracking glare */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          style={{ background: glare }}
        />
      </motion.div>
    </div>
  )
}
