import { useEffect, useState } from 'react'
import AmbientBackground from './components/AmbientBackground'
import Navbar from './components/Navbar'
import IntroFrameSequence from './components/IntroFrameSequence'
import FeaturesSection from './components/FeaturesSection'
import HowItWorksSection from './components/HowItWorksSection'
import PricingSection from './components/PricingSection'
import Footer from './components/Footer'

/* ── HUD Toast System ── */
function HudToast({ toast, onClose }) {
  useEffect(() => {
    const t = setTimeout(() => onClose(toast.id), 5000)
    return () => clearTimeout(t)
  }, [toast.id, onClose])

  return (
    <div
      className={`hud-toast ${toast.severity}`}
      role="alert"
      style={{ position: 'relative' }}
    >
      <span className="toast-msg">{toast.msg}</span>
      <button className="toast-close" onClick={() => onClose(toast.id)} aria-label="Dismiss notification">×</button>
    </div>
  )
}

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
  const [toasts, setToasts] = useState([])
  const [hasFiredToast, setHasFiredToast] = useState(false)

  // Track mouse coordinates over white background sections for interactive dot matrix spotlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      const dotSections = document.querySelectorAll('.light-dot-matrix, .white-bg-dot-matrix, .vitals-section, #dashboard, .features-section, .how-section, #how-it-works, .pricing-section, .cta-section, .site-footer, .slide-white')
      dotSections.forEach(sec => {
        const rect = sec.getBoundingClientRect()
        // Only compute if section is visible in viewport
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

  // ONLY fire the HUD toast alert when the user reaches the main content / command center section
  useEffect(() => {
    const handleScroll = () => {
      const dashboardEl = document.getElementById('dashboard')
      if (!dashboardEl || hasFiredToast) return

      const rect = dashboardEl.getBoundingClientRect()
      if (rect.top <= window.innerHeight * 0.75) {
        setHasFiredToast(true)
        setToasts(ts => [...ts, {
          id: Date.now(),
          severity: 'crimson',
          msg: '🚨 AI Alert: Payroll shortfall risk detected in 7 days — Acme Corp invoice $5K overdue',
        }])
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasFiredToast])

  const dismissToast = (id) => setToasts(ts => ts.filter(t => t.id !== id))

  return (
    <>
      <AmbientBackground />

      <div className="page-wrapper">
        <Navbar />

        <main id="main-content">
          {/* 1. Intro Frame Sequence + Command Center sticky slides */}
          <IntroFrameSequence />

          {/* 2. Features */}
          <FeaturesSection />

          {/* 4. How It Works */}
          <HowItWorksSection />

          {/* 5. Pricing */}
          <PricingSection />

          {/* 6. CTA */}
          <CTASection />
        </main>

        <Footer />
      </div>

      {/* HUD Toasts */}
      <div className="hud-container" aria-live="assertive" aria-atomic="false">
        {toasts.map(t => (
          <HudToast key={t.id} toast={t} onClose={dismissToast} />
        ))}
      </div>
    </>
  )
}
