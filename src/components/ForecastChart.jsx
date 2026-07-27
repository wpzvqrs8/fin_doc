import { useState, useRef, useEffect, useMemo } from 'react'
import { FORECAST_DATA, SAFETY_THRESHOLD } from '../data/dummyData'

const W = 860, H = 260, PAD = { t: 20, r: 20, b: 36, l: 60 }
const CHART_W = W - PAD.l - PAD.r
const CHART_H = H - PAD.t - PAD.b

function fmt(n) { return '$' + Math.round(n).toLocaleString() }

function getY(val, minV, maxV) {
  return PAD.t + CHART_H - ((val - minV) / (maxV - minV)) * CHART_H
}

function buildPath(points) {
  if (!points.length) return ''
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1], p1 = points[i]
    const cpx = (p0.x + p1.x) / 2
    d += ` C ${cpx} ${p0.y} ${cpx} ${p1.y} ${p1.x} ${p1.y}`
  }
  return d
}

function buildArea(pts, baseY) {
  if (!pts.length) return ''
  const line = buildPath(pts)
  return line + ` L ${pts[pts.length - 1].x} ${baseY} L ${pts[0].x} ${baseY} Z`
}

export default function ForecastChart({ priceMod = 0, overheadMod = 0 }) {
  const [tooltip,  setTooltip]  = useState(null)
  const [hovered,  setHovered]  = useState(null)
  const [animated, setAnimated] = useState(0)
  const svgRef = useRef(null)

  const data = useMemo(() => FORECAST_DATA.map(d => ({
    ...d,
    balance: Math.max(0, d.balance * (1 + priceMod / 100) - overheadMod / 30),
  })), [priceMod, overheadMod])

  const minV = Math.min(...data.map(d => d.balance), SAFETY_THRESHOLD) * 0.9
  const maxV = Math.max(...data.map(d => d.balance)) * 1.08

  const points = data.map((d, i) => ({
    x: PAD.l + (i / (data.length - 1)) * CHART_W,
    y: getY(d.balance, minV, maxV),
    ...d,
  }))

  const threshY = getY(SAFETY_THRESHOLD, minV, maxV)
  const baseY   = PAD.t + CHART_H

  const linePath = buildPath(points)
  const areaPath = buildArea(points, baseY)

  useEffect(() => {
    setAnimated(0)
    const dur = 900, t0 = performance.now()
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1)
      setAnimated(p)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [priceMod, overheadMod])

  const svgLen = 2200

  // Warm theme colors
  const nodeColor = (bal) => bal < SAFETY_THRESHOLD
    ? '#9B3A2E'       // danger — brick red
    : bal < SAFETY_THRESHOLD * 1.3
      ? '#B5711A'     // warning — warm amber
      : '#4A7C59'     // positive — forest green

  const handleNode = (pt) => ({
    onMouseEnter: () => {
      setHovered(pt.day)
      setTooltip({ x: pt.x, y: pt.y, data: pt })
    },
    onMouseLeave: () => { setHovered(null); setTooltip(null) },
  })

  return (
    <div style={{ position: 'relative' }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="chart-svg"
        style={{ height: 280 }}
        aria-label="30-day cash flow forecast"
        role="img"
      >
        <defs>
          <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#8B6914" stopOpacity="0.12"/>
            <stop offset="100%" stopColor="#8B6914" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="dangerGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#9B3A2E" stopOpacity="0.08"/>
            <stop offset="100%" stopColor="#9B3A2E" stopOpacity="0.02"/>
          </linearGradient>
          <linearGradient id="lineGrad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#4A7C59"/>
            <stop offset="50%"  stopColor="#B5711A"/>
            <stop offset="85%"  stopColor="#9B3A2E"/>
            <stop offset="100%" stopColor="#9B3A2E"/>
          </linearGradient>
          <clipPath id="chartClip2">
            <rect x={PAD.l} y={PAD.t} width={CHART_W} height={CHART_H}/>
          </clipPath>
        </defs>

        {/* Y-axis grid lines */}
        {[0, 25, 50, 75, 100].map(pct => {
          const y = PAD.t + CHART_H * (1 - pct / 100)
          const val = minV + (maxV - minV) * (pct / 100)
          return (
            <g key={pct}>
              <line x1={PAD.l} y1={y} x2={W - PAD.r} y2={y}
                stroke="rgba(26,18,9,0.06)" strokeWidth="1"/>
              <text x={PAD.l - 8} y={y + 4} textAnchor="end"
                fontSize="10" fill="#9B8876"
                fontFamily="JetBrains Mono, monospace">
                {val >= 1000 ? `$${Math.round(val / 1000)}k` : `$${Math.round(val)}`}
              </text>
            </g>
          )
        })}

        {/* X-axis labels */}
        {[0, 6, 13, 20, 27, 29].map(i => (
          <text key={i}
            x={PAD.l + (i / (data.length - 1)) * CHART_W}
            y={H - 6} textAnchor="middle"
            fontSize="10" fill="#9B8876"
            fontFamily="JetBrains Mono, monospace">
            {data[i]?.date}
          </text>
        ))}

        {/* Danger zone fill */}
        <rect
          x={PAD.l} y={threshY}
          width={CHART_W} height={Math.max(0, baseY - threshY)}
          fill="url(#dangerGrad2)" clipPath="url(#chartClip2)"
        />

        {/* Area fill */}
        <path d={areaPath} fill="url(#areaGrad2)" clipPath="url(#chartClip2)" opacity={animated}/>

        {/* Safety threshold line */}
        <line
          x1={PAD.l} y1={threshY} x2={W - PAD.r} y2={threshY}
          stroke="rgba(155,58,46,0.45)" strokeWidth="1.5" strokeDasharray="8,4"
        />
        <text x={W - PAD.r + 4} y={threshY + 4} fontSize="9"
          fill="rgba(155,58,46,0.6)"
          fontFamily="Inter, sans-serif" letterSpacing="0.07em">
          PAYROLL FLOOR
        </text>

        {/* Main forecast line */}
        <path
          d={linePath}
          fill="none"
          stroke="url(#lineGrad2)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={svgLen}
          strokeDashoffset={svgLen * (1 - animated)}
          clipPath="url(#chartClip2)"
        />

        {/* Interactive nodes */}
        {animated > 0.9 && points.map((pt) => {
          const col = nodeColor(pt.balance)
          const isHov = hovered === pt.day
          return (
            <g key={pt.day} {...handleNode(pt)} style={{ cursor: 'crosshair' }}>
              <circle cx={pt.x} cy={pt.y} r="16" fill="transparent"/>
              <circle
                cx={pt.x} cy={pt.y}
                r={isHov ? 7 : pt.balance < SAFETY_THRESHOLD ? 5 : 3.5}
                fill={col}
                stroke="rgba(244,239,230,0.8)" strokeWidth="1.5"
                style={{ transition: 'r 0.15s' }}
              />
            </g>
          )
        })}

        {/* Hover guide */}
        {tooltip && (
          <line
            x1={tooltip.x} y1={PAD.t}
            x2={tooltip.x} y2={baseY}
            stroke="rgba(26,18,9,0.1)" strokeWidth="1"
          />
        )}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="chart-tooltip-box"
          style={{
            position: 'absolute',
            left: Math.min(tooltip.x + 14, W - 175),
            top: tooltip.y - 100,
            pointerEvents: 'none',
          }}
          role="tooltip"
        >
          <div className="tt-date">{tooltip.data.date}</div>
          <div className="tt-value" style={{ color: nodeColor(tooltip.data.balance) }}>
            {fmt(tooltip.data.balance)}
          </div>
          <div className="tt-row tt-in">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
            Inflow: {fmt(tooltip.data.inflow)}
          </div>
          <div className="tt-row tt-out" style={{ marginTop: 4 }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M6 9l6 6 6-6"/>
            </svg>
            Outflow: {fmt(tooltip.data.outflow)}
          </div>
        </div>
      )}
    </div>
  )
}
