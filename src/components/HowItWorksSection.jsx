const STEPS = [
  {
    num: '01',
    title: 'Automated Sync',
    desc: 'Bank APIs, Stripe, and payment processors push data via webhooks. Every transaction is categorized and stored with sub-second latency.',
    code: null,
  },
  {
    num: '02',
    title: 'Deterministic Math Loop',
    desc: 'The engine computes real cash balance, runs 30-day projection with client payment lag adjustments, and evaluates three risk rules against current thresholds.',
    code: null,
  },
  {
    num: '03',
    title: 'Structured Risk Payload',
    desc: 'A verified JSON object is constructed with balance, risk type, days until deficit, and contributing factors. This — not raw data — goes to the AI.',
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
    desc: 'LLM narrates the alert in plain English and drafts a payment reminder. Notification fires to your WhatsApp or SMS — one click sends it to the late client.',
    code: null,
  },
]

function CodeHighlight({ code }) {
  const highlighted = code
    .replace(/"([^"]+)":/g, '<span class="code-key">"$1":</span>')
    .replace(/: "([^"]+)"/g, ': <span class="code-str">"$1"</span>')
    .replace(/: (\d+)/g, ': <span class="code-num">$1</span>')
  return (
    <div className="code-block" aria-label="Example risk payload">
      <pre dangerouslySetInnerHTML={{ __html: highlighted }} style={{ margin: 0, fontSize: 12, lineHeight: 1.7 }}/>
    </div>
  )
}

export default function HowItWorksSection() {
  return (
    <section className="how-section" id="how-it-works" aria-labelledby="how-heading">
      <div className="section-container">
        {/* Arpeggio Section Header */}
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

          <h2 className="section-display-title" id="how-heading">
            The Algorithm, Simplified
          </h2>
          <p className="section-display-sub">
            Four automated steps running continuously in the background
          </p>
        </div>

        <div className="pipeline">
          {STEPS.map((step, i) => (
            <div key={step.num} className="pipeline-step" id={`step-${i+1}`}>
              <div className="step-num" aria-hidden="true">{step.num}</div>
              <div className="step-body">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
                {step.code && <CodeHighlight code={step.code} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
