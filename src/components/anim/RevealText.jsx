import { motion } from 'framer-motion'

/* Word-by-word 3D flip-up reveal for headings.
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
}) {
  const text = typeof children === 'string' ? children : String(children)
  const units = per === 'char' ? [...text] : text.split(' ')

  return (
    <Tag className={className} style={style} aria-label={text}>
      <span aria-hidden style={{ display: 'inline-block', perspective: 900 }}>
        {units.map((u, i) => (
          <span
            key={i}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.08em', marginBottom: '-0.08em' }}
          >
            <motion.span
              style={{ display: 'inline-block', transformOrigin: '50% 100%', willChange: 'transform' }}
              initial={{ y: '115%', rotateX: -85, opacity: 0 }}
              whileInView={{ y: 0, rotateX: 0, opacity: 1 }}
              viewport={{ once, margin: '-60px' }}
              transition={{ delay: delay + i * stagger, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              {u === ' ' ? ' ' : u}
              {per === 'word' && i < units.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
