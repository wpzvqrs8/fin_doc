import { useState, useEffect } from 'react'
import heroBgImage from '../img/image.png'
import s1BgImage from '../img/s1.png'
import s2BgImage from '../img/s2.jpg'
import s3BgImage from '../img/s3.jpg'
import VitalsBanner from './VitalsBanner'
import DashboardPanel from './DashboardPanel'
import AIPulsePanel from './AIPulsePanel'

function PlusGrid() {
  return (
    <div className="plus-grid-overlay" aria-hidden="true">
      <div className="plus-col">
        {[1,2,3,4].map(i => (
          <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M5 12h14M12 5v14"/>
          </svg>
        ))}
      </div>
      <div className="plus-col right">
        {[1,2,3,4].map(i => (
          <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M5 12h14M12 5v14"/>
          </svg>
        ))}
      </div>
    </div>
  )
}

export default function IntroFrameSequence() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Progress of initial scroll (0 to 1 over first 295px)
  const maxScroll = 295
  const progress = Math.min(1, Math.max(0, scrollY / maxScroll))

  // Trajectory math:
  const scale = 1 - progress * 0.83
  const topVh = 66 - progress * 63.8
  const leftVw = 5.5

  return (
    <div className="intro-sequence-wrapper">

      {/* ── GIANT MORPHING BRAND LOGO ── */}
      <div
        className="hero-giant-logo-anchor"
        style={{
          position: 'fixed',
          top: `${topVh}vh`,
          left: `${leftVw}vw`,
          zIndex: 90,
          pointerEvents: 'none',
          opacity: progress > 0.96 ? 0 : 1,
          transition: 'opacity 0.1s ease-out',
        }}
      >
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'left top' }}>
          <h1 className="hero-giant-logo-text">
            FIN_DOC<span className="logo-reg">®</span>
          </h1>
        </div>
      </div>

      <div className="sticky-canvas-container">
        {/* ── STACKED STICKY CANVAS SERVICE SLIDES (Pure Arpeggio Theme) ── */}
        <div className="stacked-slides-wrapper">

          {/* ⚡ STICKY LANDING HERO FRAME */}
          <section className="sticky-frame hero-slide intro-hero-frame">
            <div className="hero-bg-image" style={{ backgroundImage: `url(${heroBgImage})` }} />
            <div className="hero-bg-grid" />
            <PlusGrid />

            <div className="hero-frame-content">
              <div className="hero-frame-row">
                <div className="hero-left-headline">
                  <h3>
                    One subscription, <br /> unlimited financial clarity.
                  </h3>
                </div>
                <div className="hero-right-headline">
                  <h2>The Creative Agency —</h2>
                </div>
              </div>

              <div className="hero-sub-block">
                <div className="hero-orange-dot" />
                <p>
                  Freedom beyond traditional accounting &amp; manual cash spreadsheets
                </p>
              </div>
            </div>
          </section>

          {/* ⚡ STICKY SLIDE 1: SERVICE 01 */}
          <section className="sticky-frame slide-1">
            <div className="hero-bg-image" style={{ backgroundImage: `url(${s1BgImage})` }} />
            <div className="hero-bg-grid" />
            <div className="slide-content-box arpeggio-slide">
              <div className="slide-top-bar">
                <div className="arpeggio-tag">
                  <span className="arpeggio-num">01</span>
                  <span className="arpeggio-lbl">/ ANOMALY DETECTION ENGINE</span>
                </div>
                
              </div>

              <div className="slide-main-grid">
                <div className="slide-text-col">
                  <h2 className="arpeggio-hero-title">
                    Real-time bank sync &amp; <br />
                    <em>Z-score anomaly detection.</em>
                  </h2>
                  <p className="arpeggio-desc">
                    Continuous sub-second transaction streaming paired with machine learning algorithms to detect duplicate vendor billings, payroll spikes, and unexpected cash drain.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ⚡ STICKY SLIDE 2: SERVICE 02 */}
          <section className="sticky-frame slide-2">
            <div className="hero-bg-image" style={{ backgroundImage: `url(${s2BgImage})` }} />
            <div className="hero-bg-grid" />
            <div className="slide-content-box arpeggio-slide">
              <div className="slide-top-bar">
                <div className="arpeggio-tag">
                  <span className="arpeggio-num">02</span>
                  <span className="arpeggio-lbl">/ PROSPECTIVE CASH FORECASTER</span>
                </div>
                
              </div>

              <div className="slide-main-grid">
                <div className="slide-text-col">
                  <h2 className="arpeggio-hero-title">
                    Predict payroll deficits <br />
                    <em>30 days into the future.</em>
                  </h2>
                  <p className="arpeggio-desc">
                    Model client payment lags and upcoming expense spikes weeks before they happen. Eliminates surprise cash shortages on payroll Friday.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ⚡ STICKY SLIDE 3: SERVICE 03 */}
          <section className="sticky-frame slide-3">
            <div className="hero-bg-image" style={{ backgroundImage: `url(${s3BgImage})` }} />
            <div className="hero-bg-grid" />
            <div className="slide-content-box arpeggio-slide">
              <div className="slide-top-bar">
                <div className="arpeggio-tag">
                  <span className="arpeggio-num">03</span>
                  <span className="arpeggio-lbl">/ AUTONOMOUS DEBT RECOVERY</span>
                </div>
                
              </div>

              <div className="slide-main-grid">
                <div className="slide-text-col">
                  <h2 className="arpeggio-hero-title">
                    Instant WhatsApp <br />
                    <em>late invoice reminders.</em>
                  </h2>
                  <p className="arpeggio-desc">
                    Automated plain-English messaging dispatches 1-click Stripe and bank payment links directly to client WhatsApp channels.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ⚡ STICKY SLIDE 4: COMMAND CENTER / YOUR FINANCIAL COCKPIT */}
          <section className="sticky-frame slide-4 vitals-section" id="dashboard" aria-label="Financial dashboard">
            <div className="section-container">
              <div className="section-intro">
                <div className="section-header-row">
                  <div className="section-dot-label">
                    <div className="section-dot" />
                    <span className="section-dot-text">Command Center</span>
                  </div>
                  <div className="section-header-divider" />
                  <span className="section-tag">metrics &amp; live controls</span>
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

        </div>
      </div>

    </div>
  )
}
