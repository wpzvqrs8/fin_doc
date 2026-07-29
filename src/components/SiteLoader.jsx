import { useState, useEffect } from 'react'
import { preloadAllSiteAssets } from '../utils/imagePreloader'

export default function SiteLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    preloadAllSiteAssets().then(() => {
      setTimeout(() => {
        setIsFadingOut(true)
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }, 400)
    })
  }, [])

  if (!isLoading) return null

  return (
    <div
      className={`site-loader-overlay ${isFadingOut ? 'fade-out' : ''}`}
      style={{
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`
      }}
      aria-hidden={isFadingOut}
    >
      {/* Bigger Animated Orange Loading Dots (No text or logo) */}
      <div className="loader" aria-label="Loading site" />
    </div>
  )
}
