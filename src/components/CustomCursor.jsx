import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      requestAnimationFrame(animate)
    }

    const onMouseEnterLink = () => {
      ring.style.width = '48px'
      ring.style.height = '48px'
      ring.style.borderColor = 'rgba(232,21,90,0.7)'
      dot.style.width = '4px'
      dot.style.height = '4px'
      dot.style.background = '#E8155A'
    }

    const onMouseLeaveLink = () => {
      ring.style.width = '32px'
      ring.style.height = '32px'
      ring.style.borderColor = 'rgba(255,255,255,0.3)'
      dot.style.width = '6px'
      dot.style.height = '6px'
      dot.style.background = 'white'
    }

    window.addEventListener('mousemove', onMouseMove)
    animate()

    const links = document.querySelectorAll('a, button')
    links.forEach(link => {
      link.addEventListener('mouseenter', onMouseEnterLink)
      link.addEventListener('mouseleave', onMouseLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div className="custom-cursor hidden md:block">
      <div ref={dotRef} className="cursor-dot fixed" style={{position:'fixed'}} />
      <div ref={ringRef} className="cursor-ring fixed" style={{position:'fixed'}} />
    </div>
  )
}
