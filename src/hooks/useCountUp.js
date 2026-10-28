import { useState, useEffect, useRef } from 'react'

/* Starts at the real value so the pre-rendered HTML (what search engines and
   AI crawlers read) shows "500+" rather than "0+". In the browser the value
   drops to 0 while off-screen and counts up once it scrolls into view. */
export default function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(target)
  const [triggered, setTriggered] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true)
        } else if (!triggered) {
          setCount(0)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [triggered])

  useEffect(() => {
    if (!triggered) return
    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [triggered, target, duration])

  return { count, ref }
}
