import { useState, useEffect } from 'react'

function fmt(n) { return '$' + Math.round(n).toLocaleString() }

function RunwaySegments({ days, total = 12 }) {
  const filled = Math.round((days / 90) * total)
  return (
    <div className="runway-segments" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => {
        let cls = 'seg'
        if (i < filled) cls += i === filled - 1 && days < 30 ? ' amber' : ' filled'
        return <div key={i} className={cls} />
      })}
    </div>
  )
}

export default function VitalsBanner() {
  const [cash, setCash] = useState(0)
  const [proj, setProj] = useState(0)

  useEffect(() => {
    const animate = (setter, target, delay = 0) => {
      setTimeout(() => {
        const dur = 1200, t0 = performance.now()
        const step = (now) => {
          const p = Math.min((now - t0) / dur, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setter(Math.round(ease * target))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }, delay)
    }
    animate(setCash, 84320, 200)
    animate(setProj, 61800, 400)
  }, [])

  return (
    <div className="vitals-banner glass-panel" role="region" aria-label="Financial vital signs">

      {/* Real-Time Cash */}
      <div className="vital-cluster">
        <div className="vital-icon emerald-bg" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="#4A7C59" strokeWidth="1.7">
            <rect x="2" y="7" width="20" height="14" rx="2"/>
            <path d="M16 7V5a2 2 0 0 0-4 0v2"/>
            <circle cx="12" cy="14" r="2"/>
          </svg>
        </div>
        <div className="vital-data">
          <div className="vital-metric emerald" aria-label={`Real-time cash: ${fmt(cash)}`}>
            {fmt(cash)}
          </div>
          <div className="vital-delta pos">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
            +$2,140 today
          </div>
          <div className="vital-lbl">REAL-TIME CASH</div>
        </div>
      </div>

      <div className="vital-divider" aria-hidden="true" />

      {/* 30-Day Projected */}
      <div className="vital-cluster">
        <div className="vital-icon indigo-bg" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="#4A4F9B" strokeWidth="1.7">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        </div>
        <div className="vital-data">
          <div className="vital-metric amber" aria-label={`30-day projected cash: ${fmt(proj)}`}>
            {fmt(proj)}
          </div>
          <div className="vital-delta neg">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M6 9l6 6 6-6"/>
            </svg>
            Buffer Breach Risk
          </div>
          <div className="vital-lbl">30-DAY PROJECTED CASH</div>
        </div>
      </div>

      <div className="vital-divider" aria-hidden="true" />

      {/* Runway Safety */}
      <div className="vital-cluster">
        <div className="vital-icon amber-bg" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="#B5711A" strokeWidth="1.7">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <div className="vital-data">
          <div className="vital-metric white" aria-label="Runway safety: 47 days">
            47 <span className="vital-unit">days</span>
          </div>
          <RunwaySegments days={47} />
          <div className="vital-lbl">RUNWAY SAFETY</div>
        </div>
      </div>
    </div>
  )
}
