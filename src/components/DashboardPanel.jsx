import { useState } from 'react'
import ForecastChart from './ForecastChart'

function fmt(n) { return (n >= 0 ? '+' : '') + '$' + Math.abs(Math.round(n)).toLocaleString() }
function fmtRunway(base, pricing, overhead) {
  const days = Math.max(0, Math.round(base + pricing * 0.5 - overhead * 0.0015))
  return `${days} days`
}

export default function DashboardPanel() {
  const [priceMod,    setPriceMod]    = useState(0)
  const [overheadMod, setOverheadMod] = useState(0)
  const [simulating,  setSimulating]  = useState(false)
  const [activeChip,  setActiveChip]  = useState('30D')

  const impact = priceMod * 840 - overheadMod
  const runway = fmtRunway(47, priceMod, overheadMod)

  const handleSlider = (setter, val) => {
    setter(val)
    setSimulating(true)
    clearTimeout(window.__simTimer)
    window.__simTimer = setTimeout(() => setSimulating(false), 1200)
  }

  const pricePct  = ((priceMod + 10) / 40) * 100
  const overPct   = (overheadMod / 20000) * 100

  return (
    <div className="chart-col">
      {/* ---- Forecast Chart Panel ---- */}
      <div className="glass-panel chart-panel">
        <div className="chart-header">
          <div>
            <h2 className="chart-title">30-Day Liquidity Forecast</h2>
            <p className="chart-subtitle">AI-adjusted receivables with client payment lag modeling</p>
          </div>
          <div className="chart-chips" role="group" aria-label="Chart time range">
            {['30D','60D','90D'].map(c => (
              <button key={c} className={`chip${activeChip===c?' active':''}`}
                onClick={() => setActiveChip(c)}
                aria-pressed={activeChip === c}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <ForecastChart priceMod={priceMod} overheadMod={overheadMod} />
      </div>

      {/* ---- Scenario Engine Panel ---- */}
      <div className="glass-panel scenario-panel" id="scenario-panel">
        <div className="scenario-header">
          <div>
            <h3 className="scenario-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#6366F1" strokeWidth="2" aria-hidden="true">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              Scenario Engine
            </h3>
            <p className="scenario-sub">Drag to simulate changes in real time</p>
          </div>
          {simulating && <span className="sim-badge" role="status" aria-live="polite">SIMULATING</span>}
        </div>

        {/* Slider 1: Pricing */}
        <div className="slider-group">
          <label className="slider-lbl" htmlFor="pricing-slider">
            Service Pricing Modifier
          </label>
          <div className="slider-wrap">
            <div className="slider-pill" style={{ left: `${pricePct}%` }}>
              {priceMod > 0 ? '+' : ''}{priceMod}%
            </div>
            <input
              id="pricing-slider"
              type="range" min={-10} max={30} step={1}
              value={priceMod}
              onChange={e => handleSlider(setPriceMod, Number(e.target.value))}
              className="custom-slider"
              style={{
                background: `linear-gradient(to right, #6366F1 ${pricePct}%, rgba(255,255,255,0.08) ${pricePct}%)`
              }}
              aria-label="Service pricing modifier"
            />
          </div>
          <div className="slider-extremes"><span>-10%</span><span>+30%</span></div>
        </div>

        {/* Slider 2: Overhead */}
        <div className="slider-group">
          <label className="slider-lbl" htmlFor="overhead-slider">
            Monthly Overhead Adjustment
          </label>
          <div className="slider-wrap">
            <div className="slider-pill" style={{
              left: `${overPct}%`,
              borderColor: overheadMod > 12000 ? 'rgba(244,63,94,0.5)' : 'rgba(99,102,241,0.4)',
              color: overheadMod > 12000 ? '#F43F5E' : '#6366F1',
            }}>
              ${overheadMod.toLocaleString()}
            </div>
            <input
              id="overhead-slider"
              type="range" min={0} max={20000} step={500}
              value={overheadMod}
              onChange={e => handleSlider(setOverheadMod, Number(e.target.value))}
              className="custom-slider"
              style={{
                background: overheadMod > 12000
                  ? `linear-gradient(to right, #F43F5E ${overPct}%, rgba(255,255,255,0.08) ${overPct}%)`
                  : `linear-gradient(to right, #6366F1 ${overPct}%, rgba(255,255,255,0.08) ${overPct}%)`,
              }}
              aria-label="Monthly overhead adjustment"
            />
          </div>
          <div className="slider-extremes"><span>$0</span><span>$20,000</span></div>
        </div>

        {/* Impact Summary */}
        <div className="scenario-impact">
          <div className="impact-item">
            <div className="impact-lbl">Projected Impact</div>
            <div className={`impact-val ${impact >= 0 ? 'pos' : 'neg'}`}>
              {fmt(impact)}
            </div>
          </div>
          <div className="impact-item">
            <div className="impact-lbl">New Runway</div>
            <div className="impact-val">{runway}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
