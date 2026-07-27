import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    let mx = -100, my = -100
    let rx = -100, ry = -100
    let raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
    }

    const loop = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (dot)  { dot.style.left  = mx + 'px'; dot.style.top  = my + 'px' }
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px' }
      raf = requestAnimationFrame(loop)
    }

    const onEnter = () => {
      dot?.classList.add('hovered')
      ring?.classList.add('hovered')
    }
    const onLeave = () => {
      dot?.classList.remove('hovered')
      ring?.classList.remove('hovered')
    }

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('button, a, input[type=range], .chip, [tabindex]')
      .forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave) })

    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  )
}
