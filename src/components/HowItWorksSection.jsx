import { useState } from 'react'

const NON_TECH_STEPS = [
  {
    num: '01',
    title: 'Automated Sync',
    tag: 'DATA INGESTION',
    desc: 'Bank APIs, Stripe, and payment processors push data via webhooks. Every transaction is categorized and stored with sub-second latency.',
    accent: '#FF4500',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
      </svg>
    ),
    code: null,
  },
  {
    num: '02',
    title: 'Deterministic Math Loop',
    tag: 'Z-SCORE ALGORITHM',
    desc: 'The engine computes real cash balance, runs 30-day projection with client payment lag adjustments, and evaluates three risk rules against current thresholds.',
    accent: '#FF4500',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19l4-14 4 14 4-14 4 14"/>
      </svg>
    ),
    code: null,
  },
  {
    num: '03',
    title: 'Structured Risk Payload',
    tag: 'JSON PAYLOAD',
    desc: 'A verified JSON object is constructed with balance, risk type, days until deficit, and contributing factors. This — not raw data — goes to the AI.',
    accent: '#FF4500',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    code: `"risk_type": "PAYROLL_SHORTFALL",
"days_until_deficit": 7,
"deficit_amount": 6500,
"contributing_factors": {
  "upcoming_payroll": { "amount": 17500 },
  "overdue_invoices": [
    { "client": "Acme Corp", "days_overdue": 12 }
  ]
}`,
  },
  {
    num: '04',
    title: 'AI Action Dispatch',
    tag: 'DISPATCH CHANNEL',
    desc: 'LLM narrates the alert in plain English and drafts a payment reminder. Notification fires to your WhatsApp or SMS — one click sends it to the late client.',
    accent: '#FF4500',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
      </svg>
    ),
    code: null,
  },
]

const TECH_STEPS = [
  {
    num: '01',
    title: 'Data Ingestion & Invariant Parsing',
    tag: 'WEBHOOK INGESTION ENGINE',
    desc: 'Sub-second event-driven ingestion pipeline connecting Stripe Webhooks, Plaid Connect, and ISO20022 bank streams. Categorizes raw event logs via vector embeddings into an immutable Postgres ledger.',
    accent: '#FF4500',
    code: null,
  },
  {
    num: '02',
    title: 'Deterministic Algebraic Math Core',
    tag: 'Z-SCORE ALGORITHM (SQL)',
    desc: 'Pure deterministic computational core running Z-score anomaly evaluation (Z = (X - μ) / σ). Executes SQL window functions for 30-day rolling cash reserve projections with client-specific historical payment lag offsets.',
    accent: '#FF4500',
    code: null,
  },
  {
    num: '03',
    title: 'Schema-Validated Risk Payload',
    tag: 'STRICT JSON CONTRACT',
    desc: 'Constructs a schema-validated, zero-hallucination JSON object containing risk type, days until deficit, deficit quantum, and nested contributing arrays. Passed via strict system prompt contract to LLM agent runtime.',
    accent: '#FF4500',
    code: `"risk_type": "PAYROLL_SHORTFALL",
"days_until_deficit": 7,
"deficit_amount": 6500,
"contributing_factors": {
  "upcoming_payroll": { "amount": 17500 },
  "overdue_invoices": [
    { "client": "Acme Corp", "days_overdue": 12 }
  ]
}`,
  },
  {
    num: '04',
    title: 'LLM Agentic Dispatch & Webhook Trigger',
    tag: 'WHATSAPP / TWILIO DISPATCH',
    desc: 'Low-latency GPT-4o-mini agent receives pre-validated JSON payloads, generates deterministic natural language narratives, and dispatches authenticated 1-click payment webhooks to WhatsApp & Twilio API gateways.',
    accent: '#FF4500',
    code: null,
  },
]

function CodeHighlightMonokai({ code }) {
  const highlighted = code
    .replace(/"([^"]+)":/g, '<span class="code-key">"$1":</span>')
    .replace(/: "([^"]+)"/g, ': <span class="code-str">"$1"</span>')
    .replace(/: (\d+)/g, ': <span class="code-num">$1</span>')
  return (
    <div className="monokai-code-block" aria-label="Monokai JSON schema payload">
      <pre dangerouslySetInnerHTML={{ __html: highlighted }} style={{ margin: 0, fontSize: 11.5, lineHeight: 1.6 }}/>
    </div>
  )
}

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [viewMode, setViewMode] = useState('circular') // 'circular' (Non-Tech) | 'pipeline' (Tech)

  const activeData = NON_TECH_STEPS[activeStep]

  return (
    <section className="how-section" id="how-it-works" aria-labelledby="how-heading">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-intro">
          <div className="section-header-row">
            <div className="section-dot-label">
              <div className="section-dot" />
              <span className="section-dot-text">Pipeline & Execution</span>
            </div>
            <div className="section-header-divider" />
            <span className="section-tag">how it works</span>
          </div>

          <div className="section-divider-line" />

          <div className="features-header-flex">
            <div>
              <h2 className="section-display-title" id="how-heading">
                The Algorithm, Simplified
              </h2>
              <p className="section-display-sub">
                Four automated steps running in a continuous execution loop
              </p>
            </div>

            {/* View Switcher Controls */}
            <div className="view-switcher-3d" role="tablist" aria-label="Pipeline View options">
              <button
                className={`switch-btn-3d ${viewMode === 'circular' ? 'active' : ''}`}
                onClick={() => setViewMode('circular')}
                role="tab"
                aria-selected={viewMode === 'circular'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                For Normal People
              </button>

              <button
                className={`switch-btn-3d ${viewMode === 'pipeline' ? 'active' : ''}`}
                onClick={() => setViewMode('pipeline')}
                role="tab"
                aria-selected={viewMode === 'pipeline'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                </svg>
                For Technical People
              </button>
            </div>
          </div>
        </div>

        {/* ── MODE 1: FOR NORMAL PEOPLE (CIRCULAR LOOP FLOW) ── */}
        {viewMode === 'circular' ? (
          <div className="circular-loop-stage">
            <div className="circular-loop-hud">
              <span className="hud-static-badge">EXECUTIVE PIPELINE ARCHITECTURE</span>
              <span>SELECT ANY STEP CARD TO INSPECT DATA FLOW</span>
            </div>

            <div className="circular-loop-wrapper">
              
              {/* Static Clean Circular SVG Orbit Track */}
              <svg className="circular-orbit-svg" viewBox="0 0 600 600" aria-hidden="true">
                <defs>
                  <marker id="staticArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0A0A0A" />
                  </marker>
                </defs>

                {/* Clean Solid Orbit Ring Track */}
                <circle cx="300" cy="300" r="215" className="orbit-track-clean" />

                {/* 4 Static Directional Arrow Flow Pointers */}
                <path d="M 320 85 A 215 215 0 0 1 480 170" className="orbit-flow-static" markerEnd="url(#staticArrow)" />
                <path d="M 515 320 A 215 215 0 0 1 430 480" className="orbit-flow-static" markerEnd="url(#staticArrow)" />
                <path d="M 280 515 A 215 215 0 0 1 120 430" className="orbit-flow-static" markerEnd="url(#staticArrow)" />
                <path d="M 85 280 A 215 215 0 0 1 170 120" className="orbit-flow-static" markerEnd="url(#staticArrow)" />
              </svg>

              {/* Central Core Hub */}
              <div className="center-core-hub">
                <div className="core-hub-inner" style={{ borderColor: activeData.accent }}>
                  <div className="core-icon-wrap" style={{ color: activeData.accent }}>
                    {activeData.icon}
                  </div>
                  <span className="core-step-badge">STEP {activeData.num} OF 04</span>
                  <h4 className="core-step-title">{activeData.title}</h4>
                  <span className="core-status-pill">
                    <span className="core-dot-static" style={{ background: activeData.accent }} />
                    ACTIVE ENGINE
                  </span>
                </div>
              </div>

              {/* 4 Circular Orbit Cards */}
              <div className="circular-cards-container">
                {NON_TECH_STEPS.map((step, idx) => {
                  const isActive = activeStep === idx
                  return (
                    <div
                      key={step.num}
                      className={`circular-card card-pos-${idx + 1} ${isActive ? 'is-active' : ''}`}
                      onClick={() => setActiveStep(idx)}
                      onMouseEnter={() => setActiveStep(idx)}
                      style={{
                        '--accent-color': step.accent
                      }}
                      tabIndex={0}
                    >
                      <div className="circ-card-head" style={{ borderColor: step.accent }}>
                        <div className="circ-step-num" style={{ background: step.accent }}>
                          {step.num}
                        </div>
                        <span className="circ-tag">{step.tag}</span>
                        {isActive && <span className="circ-live-badge">SELECTED</span>}
                      </div>

                      <h3 className="circ-card-title">{step.title}</h3>
                      <p className="circ-card-desc">{step.desc}</p>

                      <div className="circ-next-arrow" aria-hidden="true" style={{ color: step.accent }}>
                        <span>FLOW POINTER</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>

            {/* Active Step Inspector Panel */}
            <div className="loop-active-inspector" style={{ borderLeftColor: activeData.accent }}>
              <div className="inspector-left">
                <span className="inspector-lbl">SELECTED EXECUTION STEP</span>
                <h3 className="inspector-title" style={{ color: activeData.accent }}>
                  {activeData.num} — {activeData.title}
                </h3>
                <p className="inspector-desc">{activeData.desc}</p>
              </div>

              {activeData.code && (
                <div className="inspector-right">
                  <span className="inspector-lbl">STRUCTURED JSON PAYLOAD (MONOKAI THEME)</span>
                  <CodeHighlightMonokai code={activeData.code} />
                </div>
              )}
            </div>

          </div>
        ) : (
          /* ── MODE 2: FOR TECHNICAL PEOPLE (TECHNICAL STEP LIST) ── */
          <div className="pipeline">
            {TECH_STEPS.map((step, i) => (
              <div key={step.num} className="pipeline-step" id={`step-${i+1}`}>
                <div className="step-num" aria-hidden="true">{step.num}</div>
                <div className="step-body">
                  <div className="step-header-tag">
                    <span className="tech-badge">{step.tag}</span>
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                  {step.code && (
                    <div className="tech-code-wrapper">
                      <span className="tech-code-lbl">STRICT JSON PAYLOAD CONTRACT SENT TO LLM:</span>
                      <CodeHighlightMonokai code={step.code} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
