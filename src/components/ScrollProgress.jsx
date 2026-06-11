import { motion, useScroll, useSpring } from 'framer-motion'

/* Thin gradient progress bar pinned to the very top of the viewport */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] origin-left pointer-events-none"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #2E55E0, #7C3AED, #E8155A)',
        boxShadow: '0 0 12px rgba(232,21,90,0.55)',
      }}
    />
  )
}
