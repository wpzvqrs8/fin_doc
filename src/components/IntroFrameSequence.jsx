import { useState, useEffect, lazy, Suspense } from 'react'
import heroBgImage from '../img/image.png'
import s1BgImage from '../img/s1.png'
import s2BgImage from '../img/s2.jpg'
import s3BgImage from '../img/s3.jpg'

const MacOSDemo = lazy(() => import('./MacOSDemo'))

function PlusGrid() {
  return (
    <div className="plus-grid-overlay" aria-hidden="true">
      <div className="plus-col">
        {[1, 2, 3, 4].map(i => (
          <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M5 12h14M12 5v14" />
          </svg>
        ))}
      </div>
      <div className="plus-col right">
        {[1, 2, 3, 4].map(i => (
          <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M5 12h14M12 5v14" />
          </svg>
        ))}
      </div>
    </div>
  )
}

export default function IntroFrameSequence() {
  const [scrollY, setScrollY] = useState(0)
  const [demoOpen, setDemoOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const maxScroll = 295
  const progress = Math.min(1, Math.max(0, scrollY / maxScroll))
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
              </div>
              <div className="hero-sub-block">
                <div className="hero-orange-dot" />
                <p>Freedom beyond traditional accounting &amp; manual cash spreadsheets</p>
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

          {/* ⚡ STICKY SLIDE 4 — GET A DEMO CTA (replaces Command Center) */}
          <section className="sticky-frame slide-4 demo-cta-slide" id="dashboard" aria-label="Get a Demo">
            <div className="demo-cta-bg" />

            {/* ── LEFT SCREEN ANCHORED HALF-CIRCLE (180°) DONUT WHEEL ──
                • 4 Self-Contained Wedge Paths (No SVG mask artifact on hover!)
                • Native 5px Parallel Gap Geometry
                • Enlarged Outer Radius R=215px, Inner Hub R=75px
            ── */}
            <div className="demo-half-wheel-anchor">
              <div className="demo-wheel-vignette" />
              <svg className="demo-half-wheel-svg" viewBox="0 -25 280 450" width="280" height="450">
                <defs>
                  {/* Luxury 3-Stop Gradient */}
                  <linearGradient id="sliceGradientLuxury" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFA347" />
                    <stop offset="50%" stopColor="#FF6A2B" />
                    <stop offset="100%" stopColor="#D94B16" />
                  </linearGradient>

                  {/* Dark Radial Center Hub Gradient */}
                  <radialGradient id="centerHubGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#2A140B" />
                    <stop offset="100%" stopColor="#0E0705" />
                  </radialGradient>

                  {/* Soft Premium Glow */}
                  <filter id="softGlowPremium" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="3" dy="3" stdDeviation="4" floodColor="#FF6A2B" floodOpacity="0.25" />
                  </filter>
                </defs>

                {/* ── 4 INDEPENDENT WEDGES WITH BUILT-IN NATIVE 5PX PARALLEL GAPS ── */}
                <g className="demo-wheel-wedges-container">
                  {/* SECTOR 1: Top (-90° to -45°) */}
                  <g className="demo-wheel-wedge-group">
                    <path
                      d="M 0,-15 A 215,215 0 0,1 150.2,46.2 L 51.2,145.2 A 75,75 0 0,0 0,125 Z"
                      fill="url(#sliceGradientLuxury)"
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="1.2"
                      filter="url(#softGlowPremium)"
                      className="demo-wheel-wedge"
                    />
                    <text x="26" y="70" fill="#FFFFFF" fontWeight="700" fontSize="13" letterSpacing="0.02em" fontFamily="var(--font-sans)" className="demo-wedge-text">
                      Real
                    </text>
                    <text x="26" y="90" fill="#FFFFFF" fontWeight="700" fontSize="13" letterSpacing="0.02em" fontFamily="var(--font-sans)" className="demo-wedge-text">
                      AI Agent
                    </text>
                  </g>

                  {/* SECTOR 2: Upper-Mid (-45° to 0°) */}
                  <g className="demo-wheel-wedge-group">
                    <path
                      d="M 153.8,49.8 A 215,215 0 0,1 214.9,197.5 L 75.0,197.5 A 75,75 0 0,0 54.8,148.8 Z"
                      fill="url(#sliceGradientLuxury)"
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="1.2"
                      filter="url(#softGlowPremium)"
                      className="demo-wheel-wedge"
                    />
                    <text x="100" y="156" fill="#FFFFFF" fontWeight="700" fontSize="13" letterSpacing="0.02em" fontFamily="var(--font-sans)" className="demo-wedge-text">
                      Live Payroll Risk
                    </text>
                  </g>

                  {/* SECTOR 3: Lower-Mid (0° to +45°) */}
                  <g className="demo-wheel-wedge-group">
                    <path
                      d="M 214.9,202.5 A 215,215 0 0,1 153.8,350.2 L 54.8,251.2 A 75,75 0 0,0 75.0,202.5 Z"
                      fill="url(#sliceGradientLuxury)"
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="1.2"
                      filter="url(#softGlowPremium)"
                      className="demo-wheel-wedge"
                    />
                    <text x="90" y="250" fill="#FFFFFF" fontWeight="700" fontSize="13" letterSpacing="0.02em" fontFamily="var(--font-sans)" className="demo-wedge-text">
                      WhatsApp Alerts
                    </text>
                  </g>

                  {/* SECTOR 4: Bottom (+45° to +90°) */}
                  <g className="demo-wheel-wedge-group">
                    <path
                      d="M 150.2,353.8 A 215,215 0 0,1 0,415 L 0,275 A 75,75 0 0,0 51.2,254.8 Z"
                      fill="url(#sliceGradientLuxury)"
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="1.2"
                      filter="url(#softGlowPremium)"
                      className="demo-wheel-wedge"
                    />
                    <text x="40" y="342" fill="#FFFFFF" fontWeight="700" fontSize="13" letterSpacing="0.02em" fontFamily="var(--font-sans)" className="demo-wedge-text">
                      Cash
                    </text>
                    <text x="40" y="360" fill="#FFFFFF" fontWeight="700" fontSize="13" letterSpacing="0.02em" fontFamily="var(--font-sans)" className="demo-wedge-text">
                      Forecast
                    </text>
                  </g>
                </g>

                {/* ── ENLARGED CENTER HUB (R=75px) ── */}
                <g className="demo-center-hub">
                  <path d="M 0,125 A 75,75 0 0,1 0,275 Z" fill="url(#centerHubGrad)" stroke="#FFA347" strokeWidth="3" />
                  <path d="M 0,132 A 68,68 0 0,1 0,268 Z" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" strokeDasharray="4 4" />

                  <text x="15" y="193" fill="#FFFFFF" fontWeight="800" fontSize="14" letterSpacing="0.12em" fontFamily="var(--font-sans)">
                    FIN
                  </text>
                  <text x="15 " y="213" fill="#FFA347" fontWeight="800" fontSize="14" letterSpacing="0.12em" fontFamily="var(--font-sans)">
                    DOC
                  </text>
                </g>
              </svg>
            </div>

            <div className="demo-cta-split-container">
              {/* ── LEFT COLUMN: Headline & Subtitle ── */}
              <div className="demo-cta-left-col">
                <h2 className="demo-cta-headline">
                  See FIN_DOC<span className="demo-cta-reg">®</span><br />
                  <em>in action.</em>
                </h2>
                <p className="demo-cta-sub">
                  Launch our interactive demo — experience a real AI financial agent detecting risks,
                  dispatching WhatsApp alerts, and recovering late invoices. No sign-up required.
                </p>
              </div>

              {/* ── RIGHT COLUMN: Robot Head, Launch Button & Footnote ── */}
              <div className="demo-cta-right-col">
                {/* Robot Head Preview */}
                <div className="demo-cta-bot-preview" aria-hidden="true">
                  <div className="mac-robot-head-traced preview-scale">
                    <div className="mac-robot-head">
                      <div className="mac-robot-antenna">
                        <div className="mac-robot-antenna-stem" />
                        <div className="mac-robot-antenna-orb" />
                      </div>
                      <div className="mac-robot-ear left" />
                      <div className="mac-robot-ear right" />
                      <div className="mac-robot-face">
                        <div className="mac-robot-top-plate" />
                        <div className="mac-robot-visor">
                          <div className="mac-robot-visor-inner">
                            <div className="mac-bot-eyes-row">
                              <div className="mac-bot-eye-wrap">
                                <div className="mac-bot-eyeball">
                                  <div className="mac-bot-pupil"><div className="mac-bot-shine" /></div>
                                </div>
                              </div>
                              <div className="mac-bot-eye-wrap">
                                <div className="mac-bot-eyeball">
                                  <div className="mac-bot-pupil"><div className="mac-bot-shine" /></div>
                                </div>
                              </div>
                            </div>
                            <div className="mac-robot-smile">
                              <svg width="22" height="10" viewBox="0 0 28 14" fill="none">
                                <path d="M4 3 C8 11 20 11 24 3" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* High-End State-of-the-Art CTA Launch Button */}
                <button
                  className="demo-launch-btn"
                  id="get-demo-btn"
                  onClick={() => setDemoOpen(true)}
                  aria-label="Launch virtual macOS demo"
                >
                  <span className="demo-btn-icon-orb">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="8 5 19 12 8 19 8 5" />
                    </svg>
                  </span>
                  <span className="demo-btn-text">Get a Demo</span>
                  <span className="demo-btn-badge">INTERACTIVE</span>
                  <div className="demo-btn-shimmer" />
                </button>

                <p className="demo-cta-footnote">Opens a virtual macOS environment · No downloads · Instant access</p>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* ── macOS Demo Overlay (lazy-loaded) ── */}
      {demoOpen && (
        <Suspense fallback={null}>
          <MacOSDemo onClose={() => setDemoOpen(false)} />
        </Suspense>
      )}
    </div>
  )
}
