import { useEffect, useState } from 'react'
import AmbientBackground    from './components/AmbientBackground'
import Navbar               from './components/Navbar'
import IntroFrameSequence   from './components/IntroFrameSequence'
import VitalsBanner         from './components/VitalsBanner'
import DashboardPanel       from './components/DashboardPanel'
import AIPulsePanel         from './components/AIPulsePanel'
import FeaturesSection      from './components/FeaturesSection'
import HowItWorksSection    from './components/HowItWorksSection'
import PricingSection       from './components/PricingSection'
import Footer               from './components/Footer'

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
                <path d="M5 12h14M12 5l7 7-7 7"/>
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

  // ONLY fire the HUD toast alert when the user reaches the main content / command center section
  useEffect(() => {
    const handleScroll = () => {
      const dashboardEl = document.getElementById('dashboard')
      if (!dashboardEl || hasFiredToast) return

      const rect = dashboardEl.getBoundingClientRect()
      // Fire when user reaches the dashboard section
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
          {/* 1. Intro Frame Sequence: Giant morphing logo + Sticky Canvas Slides */}
          <IntroFrameSequence />

          {/* 2. Command Center / Dashboard (Main Content Section) */}
          <section className="vitals-section" id="dashboard" aria-label="Financial dashboard">
            <div className="section-container">
              <div className="section-intro">
                <div className="section-header-row">
                  <div className="section-dot-label">
                    <div className="section-dot" />
                    <span className="section-dot-text">Command Center</span>
                  </div>
                  <div className="section-header-divider" />
                  <span className="section-tag">metrics & live controls</span>
                </div>

                <div className="section-divider-line" />

                <h2 className="section-display-title">
                  Your Financial Cockpit
                </h2>
                <p className="section-display-sub">
                  Live data, 30-day AI forecasting, and real-time scenario modeling in one view
                </p>
              </div>

              <VitalsBanner />

              {/* Dashboard Grid: Chart + AI Panel */}
              <div className="dashboard-grid" style={{ marginTop: 24 }}>
                <DashboardPanel />
                <AIPulsePanel />
              </div>
            </div>
          </section>

          {/* 3. Features */}
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
