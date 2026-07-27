import { useState, useEffect } from 'react'

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

      {/* ── HERO INTRO CANVAS FRAME ── */}
      <section className="intro-hero-frame">
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

      {/* ── CANVAS FRAME 1: CENTERED MEDIA MODAL ── */}
      <div className="sticky-canvas-container">
        <section className="sticky-frame modal-frame">
          <div className="centered-media-modal">
            <div className="modal-bg-effect" />
            <h1 className="modal-headline">
              Design &amp; Math that captivates today &amp; inspires tomorrow.
            </h1>
          </div>
        </section>

        {/* ── STACKED STICKY CANVAS SERVICE SLIDES (Pure Arpeggio Theme) ── */}
        <div className="stacked-slides-wrapper">

          {/* ⚡ STICKY SLIDE 1: SERVICE 01 */}
          <section className="sticky-frame slide-1">
            <div className="slide-content-box arpeggio-slide">
              <div className="slide-top-bar">
                <div className="arpeggio-tag">
                  <span className="arpeggio-num">01</span>
                  <span className="arpeggio-lbl">/ ANOMALY DETECTION ENGINE</span>
                </div>
                <span className="arpeggio-sub-tag">Service 01</span>
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

                  <div className="arpeggio-stat-block">
                    <span className="stat-val">99.98%</span>
                    <span className="stat-lbl">Anomaly Detection Accuracy</span>
                  </div>
                </div>

                <div className="slide-graphic-col">
                  <div className="arpeggio-hud-card">
                    <div className="arpeggio-hud-head">
                      <span className="arpeggio-hud-dot" />
                      <span>LIVE TRANSACTION STREAM</span>
                    </div>
                    <div className="arpeggio-feed-item">
                      <div className="feed-left">
                        <span className="feed-name">Stripe Direct Payout</span>
                        <span className="feed-time">Synchronized</span>
                      </div>
                      <span className="feed-val pos">+$14,250.00</span>
                    </div>
                    <div className="arpeggio-feed-item flag-item">
                      <div className="feed-left">
                        <span className="feed-name">AWS Cloud Infrastructure</span>
                        <span className="feed-flag">FLAGGED ANOMALY</span>
                      </div>
                      <span className="feed-val neg">-$48,500.00</span>
                    </div>
                    <div className="arpeggio-feed-item">
                      <div className="feed-left">
                        <span className="feed-name">Gusto Payroll Clearing</span>
                        <span className="feed-time">Synchronized</span>
                      </div>
                      <span className="feed-val">-$18,400.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ⚡ STICKY SLIDE 2: SERVICE 02 */}
          <section className="sticky-frame slide-2">
            <div className="slide-content-box arpeggio-slide">
              <div className="slide-top-bar">
                <div className="arpeggio-tag">
                  <span className="arpeggio-num">02</span>
                  <span className="arpeggio-lbl">/ PROSPECTIVE CASH FORECASTER</span>
                </div>
                <span className="arpeggio-sub-tag">Service 02</span>
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

                  <div className="arpeggio-stat-block">
                    <span className="stat-val">30 Days</span>
                    <span className="stat-lbl">Predictive Forecast Horizon</span>
                  </div>
                </div>

                <div className="slide-graphic-col">
                  <div className="arpeggio-hud-card">
                    <div className="arpeggio-hud-head">
                      <span className="arpeggio-hud-dot" />
                      <span>CASH RUNWAY FORECAST</span>
                    </div>
                    <div className="arpeggio-bars-row">
                      {[65, 78, 85, 92, 45, 60, 88, 95].map((h, i) => (
                        <div
                          key={i}
                          className={`arpeggio-bar ${i === 4 ? 'dip' : ''}`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className="arpeggio-note">
                      <span className="orange-txt">AUTOMATED TRIGGER:</span> Reminded client of $12K invoice due Day 14.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ⚡ STICKY SLIDE 3: SERVICE 03 */}
          <section className="sticky-frame slide-3">
            <div className="slide-content-box arpeggio-slide">
              <div className="slide-top-bar">
                <div className="arpeggio-tag">
                  <span className="arpeggio-num">03</span>
                  <span className="arpeggio-lbl">/ AUTONOMOUS DEBT RECOVERY</span>
                </div>
                <span className="arpeggio-sub-tag">Service 03</span>
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

                  <div className="arpeggio-stat-block">
                    <span className="stat-val">4.2x</span>
                    <span className="stat-lbl">Faster Receivables Recovery</span>
                  </div>
                </div>

                <div className="slide-graphic-col">
                  <div className="arpeggio-hud-card">
                    <div className="arpeggio-hud-head">
                      <span className="arpeggio-hud-dot" />
                      <span>AUTOMATED DISPATCH</span>
                    </div>
                    <div className="arpeggio-msg-box">
                      <div className="msg-text">
                        "Hi Mark! Quick nudge on invoice #4829 ($12,400). Settle via 1-click link below."
                      </div>
                      <div className="msg-status">STATUS: PAID IN 4 MINUTES</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

    </div>
  )
}
