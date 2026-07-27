const FEATURES = [
  {
    layer: '01 / LAYER 1',
    title: 'Data Ingestion & Normalization',
    desc: 'Automated sync with Stripe, Plaid, and bank webhooks. Every transaction categorized via vector embeddings — zero manual entry required.',
    tags: ['Stripe', 'Plaid', 'Webhooks'],
  },
  {
    layer: '02 / LAYER 2',
    title: 'SQL / Algebraic Math Engine',
    desc: 'Deterministic computation. Z-score anomaly detection spots vendor price creep. The LLM never touches raw numbers — zero hallucination risk.',
    tags: ['Deterministic', 'Z-Score', 'SQL'],
  },
  {
    layer: '03 / LAYER 3',
    title: 'Predictive Risk Scoring',
    desc: "Rolling 30-day cash simulation adjusted for each client's historical payment lag. Payroll shortfalls detected days in advance — automatically.",
    tags: ['Forecasting', 'Risk Scoring', 'Heuristic'],
  },
  {
    layer: '04 / LAYER 4',
    title: 'LLM Narrative & Dispatch',
    desc: 'Fast LLM receives pre-calculated JSON payloads and generates plain-English alerts, WhatsApp messages, and 1-click payment reminders.',
    tags: ['GPT-4o-mini', 'WhatsApp', 'Twilio'],
  },
]

export default function FeaturesSection() {
  return (
    <section className="features-section" id="features" aria-labelledby="features-heading">
      <div className="section-container">
        {/* Arpeggio Section Header Pattern */}
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

          <h2 className="section-display-title" id="features-heading">
            Partnership, Not Just Software
          </h2>
          <p className="section-display-sub">
            The Four-Layer Intelligence Engine built on strict separation of concerns
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.layer} className="feature-card" tabIndex={0}>
              <div className="feature-layer">{f.layer}</div>
              <h3 className="feature-title-card">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
              <div className="feature-tags">
                {f.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
