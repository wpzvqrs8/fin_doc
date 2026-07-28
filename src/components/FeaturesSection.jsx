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
    accentColor: '#FF4500',
    metric: 'Sub-second Dispatch'
  },
]

export default function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

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

        {/* ── EXPANDABLE FLAT CARDS GRID ── */}
        <div className="flat-cards-grid">
          {FEATURES.map((f, i) => {
            const isHovered = hoveredIndex === i
            let originClass = 'origin-center'
            if (i === 0) originClass = 'origin-left'
            if (i === FEATURES.length - 1) originClass = 'origin-right'

            return (
              <div
                key={f.num}
                className={`flat-feature-card ${originClass} ${isHovered ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                tabIndex={0}
              >
                {/* Card Header Architectural Tag & Badge */}
                <div className="flat-card-top">
                  <div className="flat-card-arch-tag">
                    <span className="arch-num">{f.num}</span>
                    <span className="arch-layer">{f.layer}</span>
                  </div>
                  <span className="flat-card-badge">{f.badge}</span>
                </div>

                {/* Card Titles */}
                <div className="flat-card-body">
                  <span className="flat-card-sub">{f.subtitle}</span>
                  <h3 className="flat-card-title">{f.title}</h3>

                  {/* Hidden initially; Expands vertically & reveals full text on hover! */}
                  <div className="flat-card-expandable-desc">
                    <p className="flat-card-desc">{f.desc}</p>
                  </div>
                </div>

                {/* Card Footer Metric & Tags */}
                <div className="flat-card-footer">
                  <div className="flat-card-metric">
                    {f.metric}
                  </div>
                  <div className="flat-card-tags">
                    {f.tags.slice(0, 3).map(t => (
                      <span key={t} className="flat-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
