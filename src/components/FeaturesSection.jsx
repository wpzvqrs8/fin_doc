import { useState } from 'react'

const FEATURES = [
  {
    num: '01',
    layer: 'LAYER 1',
    badge: 'INGESTION ENGINE',
    title: 'Data Ingestion & Normalization',
    subtitle: 'Real-time multi-source data streaming',
    desc: 'Automated sync with Stripe, Plaid, and bank webhooks. Every transaction categorized via vector embeddings — zero manual entry required.',
    tags: ['Stripe', 'Plaid', 'Webhooks', 'Vector Embeddings'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    accentColor: '#FF4500',
    metric: '100% Auto-Sync'
  },
  {
    num: '02',
    layer: 'LAYER 2',
    badge: 'DETERMINISTIC MATH',
    title: 'SQL / Algebraic Math Engine',
    subtitle: 'Zero-hallucination computation core',
    desc: 'Deterministic computation. Z-score anomaly detection spots vendor price creep. The LLM never touches raw numbers — zero hallucination risk.',
    tags: ['Deterministic', 'Z-Score', 'SQL', 'Zero-Hallucination'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19l4-14 4 14 4-14 4 14" />
      </svg>
    ),
    accentColor: '#FF4500',
    metric: 'Z = (X - μ) / σ'
  },
  {
    num: '03',
    layer: 'LAYER 3',
    badge: 'PREDICTIVE SCORING',
    title: 'Predictive Risk Scoring',
    subtitle: '30-day cash deficit simulation',
    desc: "Rolling 30-day cash simulation adjusted for each client's historical payment lag. Payroll shortfalls detected days in advance — automatically.",
    tags: ['Forecasting', 'Risk Scoring', 'Heuristic', 'Runway Model'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18M18 9l-5 5-2-2-4 4" />
      </svg>
    ),
    accentColor: '#FF4500',
    metric: '30-Day Forecast'
  },
  {
    num: '04',
    layer: 'LAYER 4',
    badge: 'NARRATIVE DISPATCH',
    title: 'LLM Narrative & Dispatch',
    subtitle: 'Natural language communication',
    desc: 'Fast LLM receives pre-calculated JSON payloads and generates plain-English alerts, WhatsApp messages, and 1-click payment reminders.',
    tags: ['GPT-4o-mini', 'WhatsApp', 'Twilio', '1-Click Links'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    accentColor: '#FF4500',
    metric: 'Sub-second Dispatch'
  },
]

export default function FeaturesSection() {
  const [hoveredStackIndex, setHoveredStackIndex] = useState(null)

  return (
    <section className="features-section" id="features" aria-labelledby="features-heading">
      <div className="section-container">
        
        {/* Header Block */}
        <div className="section-intro">
          <div className="section-header-row">
            <div className="section-dot-label">
              <div className="section-dot" />
              <span className="section-dot-text">Why Choose FIN_DOC</span>
            </div>
            <div className="section-header-divider" />
            <span className="section-tag">architecture & system design</span>
          </div>

          <div className="section-divider-line" />

          <div className="features-header-flex">
            <div>
              <h2 className="section-display-title" id="features-heading">
                Partnership, Not Just Software
              </h2>
              <p className="section-display-sub">
                The Four-Layer Intelligence Engine built on strict separation of concerns
              </p>
            </div>
          </div>
        </div>

        {/* ── LEFT-TO-RIGHT OVERLAPPING CARDS TRACK ── */}
        <div className="h-overlap-stage">
          <div className="h-overlap-container">
            {FEATURES.map((f, i) => {
              const isHovered = hoveredStackIndex === i
              return (
                <div
                  key={f.num}
                  className={`h-overlap-card ${isHovered ? 'is-hovered' : ''}`}
                  onMouseEnter={() => setHoveredStackIndex(i)}
                  onMouseLeave={() => setHoveredStackIndex(null)}
                  style={{
                    '--card-idx': i,
                    '--accent': f.accentColor,
                    zIndex: isHovered ? 100 : i * 10 + 10
                  }}
                  tabIndex={0}
                >
                  {/* Top Meta Bar */}
                  <div className="hol-top-bar" style={{ borderColor: f.accentColor }}>
                    <div className="hol-pill" style={{ borderColor: f.accentColor }}>
                      <span className="hol-num" style={{ color: f.accentColor }}>{f.num}</span>
                      <span className="hol-layer">{f.layer}</span>
                    </div>
                    <span className="hol-badge">{f.badge}</span>
                  </div>

                  {/* Main Content */}
                  <div className="hol-main-body">
                    <div className="hol-icon-box" style={{ color: f.accentColor, borderColor: f.accentColor }}>
                      {f.icon}
                    </div>
                    <h3 className="hol-title">{f.title}</h3>
                    <span className="hol-sub">{f.subtitle}</span>
                    <p className="hol-desc">{f.desc}</p>
                  </div>

                  {/* Footer Tags & Metric */}
                  <div className="hol-footer">
                    <div className="hol-metric-pill" style={{ color: f.accentColor, borderColor: f.accentColor }}>
                      {f.metric}
                    </div>
                    <div className="hol-tags-row">
                      {f.tags.slice(0, 3).map(t => (
                        <span key={t} className="hol-tag">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Book Spine Edge Accent */}
                  {/* <div className="hol-edge-bar" style={{ background: f.accentColor }} /> */}
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
