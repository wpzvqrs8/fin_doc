import { useEffect, useRef, useState } from 'react'

function fmt(n) { return '$' + Math.round(n).toLocaleString() }

// Arpeggio-style Plus icon
function PlusIcon() {
  return (
    <svg className="plus-icon" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
      <path d="M5 12h14"/><path d="M12 5v14"/>
    </svg>
  )
}

export default function HeroSection() {
  const [cash, setCash] = useState(0)
  const canvasRef = useRef(null)

  useEffect(() => {
    const target = 84320, dur = 1600, t0 = performance.now()
    const step = (now) => {
      const p = Math.min((now - t0) / dur, 1)
      setCash(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [])

  // Very subtle noise texture on canvas — dark background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, t = 0

    const resize = () => {
      canvas.width  = canvas.offsetWidth * devicePixelRatio
      canvas.height = canvas.offsetHeight * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight
      // fill with dark background
      ctx.fillStyle = '#111111'
      ctx.fillRect(0, 0, w, h)

      t += 0.003

      // Slow-moving radial gradient — very subtle
      const cx = w * 0.5 + Math.sin(t) * w * 0.1
      const cy = h * 0.5 + Math.cos(t * 0.8) * h * 0.08
      const rad = Math.max(w, h) * 0.55

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad)
      g.addColorStop(0, 'rgba(255,255,255,0.04)')
      g.addColorStop(0.5, 'rgba(255,255,255,0.015)')
      g.addColorStop(1, 'transparent')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      // Corner accent — very faint geometric
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < 3; i++) {
        const size = 120 + i * 80
        ctx.strokeRect(
          w * 0.72 - size / 2 + Math.sin(t + i) * 5,
          h * 0.5  - size / 2 + Math.cos(t + i * 0.7) * 5,
          size, size
        )
      }

      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section className="hero-section" id="hero" aria-labelledby="hero-heading">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
        aria-hidden="true"
      />

      {/* Plus corner markers — Arpeggio signature */}
      <div className="hero-corners" aria-hidden="true">
        <div className="hero-corner-col">
          <PlusIcon/><PlusIcon/><PlusIcon/><PlusIcon/>
        </div>
        <div className="hero-corner-col" style={{ alignItems: 'flex-end' }}>
          <PlusIcon/><PlusIcon/><PlusIcon/><PlusIcon/>
        </div>
      </div>

      {/* Content */}
      <div className="hero-inner">
        <div className="hero-badge">
          <span className="badge-dot" aria-hidden="true" />
          AI Financial Intelligence — Live
        </div>

        {/* Arpeggio two-part headline row */}
        <div className="hero-top-row">
          <h1 className="hero-title" id="hero-heading">
            Real cash flow<br />
            intelligence, zero<br />
            hallucinations.
          </h1>
          <div className="hero-title-serif" aria-hidden="true">
            The Financial<br />AI Doctor —
          </div>
        </div>

        {/* Sub row — Arpeggio dot + description */}
        <div className="hero-sub-row">
          <div className="hero-dot-marker" aria-hidden="true" />
          <p className="hero-sub">
            30-day liquidity forecasting with deterministic math.
            Your payroll never surprises you again.
          </p>
        </div>

        <div className="hero-actions">
          <button className="btn-primary lg" id="hero-cta"
            style={{ background: 'white', color: 'black', borderColor: 'white' }}>
            Start Free Trial
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button className="btn-outline" id="hero-demo"
            style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Watch Demo
          </button>
        </div>

        <div className="hero-trust">
          <span className="trust-item">
            <span className="trust-val">{fmt(cash)}</span>
            cash tracked live
          </span>
          <div className="trust-divider" aria-hidden="true" />
          <span className="trust-item">
            <span className="trust-val">30-Day</span>
            AI Cash Forecast
          </span>
          <div className="trust-divider" aria-hidden="true" />
          <span className="trust-item">
            <span className="trust-val">$0</span>
            Hallucination Risk
          </span>
        </div>
      </div>
    </section>
  )
}
