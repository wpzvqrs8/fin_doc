import { useEffect } from 'react'
import { preloadSiteImages } from './utils/imagePreloader'
import SiteLoader from './components/SiteLoader'
import AmbientBackground from './components/AmbientBackground'
import Navbar from './components/Navbar'
import IntroFrameSequence from './components/IntroFrameSequence'
import FeaturesSection from './components/FeaturesSection'
import HowItWorksSection from './components/HowItWorksSection'
import PricingSection from './components/PricingSection'
import Footer from './components/Footer'

/* ── CTA Section ── */
function CTASection() {
  return (
    <section className="cta-section" aria-labelledby="cta-heading">
      <div className="section-container">
        <div className="cta-inner">
          <h2 className="cta-title" id="cta-heading">
            Stop Flying Blind.<br />
            Let the AI Doctor Diagnose Your Cash Flow.
          </h2>
          <p className="cta-sub">
            Join 500+ businesses already using FIN_DOC to prevent payroll crises before they happen.
          </p>
          <div className="cta-actions">
            <button className="btn-primary lg" id="cta-main">
              Start Free — No Card Required
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <span className="cta-note">Setup takes under 5 minutes</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  // Preload all site images as soon as the site loads (first hero image loads fastest)
  useEffect(() => {
    preloadSiteImages()
  }, [])

  // Track mouse coordinates over white background sections for interactive dot matrix spotlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      const dotSections = document.querySelectorAll('.light-dot-matrix, .white-bg-dot-matrix, .features-section, .how-section, #how-it-works, .pricing-section, .cta-section, .site-footer, .slide-white, .demo-cta-slide')
      dotSections.forEach(sec => {
        const rect = sec.getBoundingClientRect()
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          sec.style.setProperty('--mouse-x', `${x}px`)
          sec.style.setProperty('--mouse-y', `${y}px`)
        }
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <SiteLoader />
      <AmbientBackground />
      <div className="page-wrapper">
        <Navbar />
        <main id="main-content">
          <IntroFrameSequence />
          <FeaturesSection />
          <HowItWorksSection />
          <PricingSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  )
}

