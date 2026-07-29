import { useState, useEffect } from 'react'
import { preloadAllSiteAssets } from '../utils/imagePreloader'

export default function SiteLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    // Start preloading all images and tracking document state
    preloadAllSiteAssets().then(() => {
      // Small minimum display to avoid layout flickering
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
    <div className={`site-loader-overlay ${isFadingOut ? 'fade-out' : ''}`} aria-hidden={isFadingOut}>
      <div className="site-loader-content">
        <div className="site-loader-brand">
          <span className="site-loader-dot" />
          <span className="site-loader-brand-text">FIN_DOC</span>
        </div>

        {/* User's Orange Dotted Morphing Animation */}
        <div className="loader" aria-label="Loading website assets" />

        <div className="site-loader-status">
          <span>INITIALIZING PLATFORM</span>
        </div>
      </div>
    </div>
  )
}
