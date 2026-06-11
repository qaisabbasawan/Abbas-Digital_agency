import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    let mouseX = -100, mouseY = -100
    let ringX = -100, ringY = -100
    let rafId

    const grow = () => {
      ring.style.width = '52px'
      ring.style.height = '52px'
      ring.style.borderColor = 'rgba(232,21,90,0.75)'
      ring.style.background = 'rgba(232,21,90,0.06)'
      dot.style.width = '4px'
      dot.style.height = '4px'
      dot.style.background = '#E8155A'
    }

    const shrink = () => {
      ring.style.width = '32px'
      ring.style.height = '32px'
      ring.style.borderColor = 'rgba(255,255,255,0.3)'
      ring.style.background = 'transparent'
      dot.style.width = '6px'
      dot.style.height = '6px'
      dot.style.background = 'white'
    }

    /* Delegated — keeps working for links added after route changes */
    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
      if (e.target.closest('a, button, [role="button"], input, textarea, select')) grow()
      else shrink()
    }

    const onMouseDown = () => { ring.style.transform = 'translate(-50%, -50%) scale(0.8)' }
    const onMouseUp   = () => { ring.style.transform = 'translate(-50%, -50%) scale(1)' }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.14
      ringY += (mouseY - ringY) * 0.14
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="custom-cursor hidden md:block">
      <div ref={dotRef} className="cursor-dot fixed" style={{ position: 'fixed' }} />
      <div ref={ringRef} className="cursor-ring fixed" style={{ position: 'fixed' }} />
    </div>
  )
}
