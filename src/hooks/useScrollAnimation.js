import { useEffect, useRef } from 'react'

export default function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const { threshold = 0.15, once = true } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          if (once) observer.disconnect()
        } else if (!once) {
          el.style.opacity = '0'
          el.style.transform = 'translateY(60px)'
        }
      },
      { threshold }
    )

    el.style.opacity = '0'
    el.style.transform = 'translateY(60px)'
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
    observer.observe(el)

    return () => observer.disconnect()
  }, [threshold, once])

  return ref
}
