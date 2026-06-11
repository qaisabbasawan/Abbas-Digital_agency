import { motion } from 'framer-motion'

/* Word-by-word 3D flip-up reveal for headings.
   The viewport observer lives on the heading element itself — the animated
   spans start fully clipped by their overflow-hidden wrappers, so observing
   them directly would never fire. Variants propagate down to the spans.
   Usage: <RevealText as="h2" className="...">Our Services</RevealText> */
export default function RevealText({
  children,
  as: Tag = 'div',
  className = '',
  style,
  delay = 0,
  per = 'word',          // 'word' | 'char'
  stagger = 0.05,
  once = true,
  gradient = false,      // brand gradient flowing across the whole text
}) {
  const text = typeof children === 'string' ? children : String(children)
  const units = per === 'char' ? [...text] : text.split(' ')
  const MotionTag = motion.create(Tag)

  /* background-clip: text breaks on transformed children, so the gradient is
     applied per unit with an offset background-position to stay continuous */
  const gradientStyle = (i) => gradient
    ? {
        backgroundImage: 'linear-gradient(135deg, #2E55E0, #E8155A)',
        backgroundSize: `${units.length * 100}% 100%`,
        backgroundPosition: `${(i / Math.max(units.length - 1, 1)) * 100}% 0`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }
    : {}

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
  const unit = {
    hidden: { y: '115%', rotateX: -85, opacity: 0 },
    show: {
      y: 0, rotateX: 0, opacity: 1,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <MotionTag
      className={className}
      style={style}
      aria-label={text}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-60px' }}
    >
      <span aria-hidden style={{ display: 'inline-block', perspective: 900 }}>
        {units.map((u, i) => (
          <span
            key={i}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.08em', marginBottom: '-0.08em' }}
          >
            <motion.span
              variants={unit}
              style={{ display: 'inline-block', transformOrigin: '50% 100%', willChange: 'transform', ...gradientStyle(i) }}
            >
              {u === ' ' ? ' ' : u}
              {per === 'word' && i < units.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </MotionTag>
  )
}
