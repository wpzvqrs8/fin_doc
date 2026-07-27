const PLANS = [
  {
    tier: 'Starter',
    price: '$0',
    period: '/mo',
    desc: 'Perfect for solopreneurs and freelancers who want AI-powered cash flow visibility.',
    features: ['1 Bank Account', '30-Day Cash Forecast', '3 AI Alerts / Month', 'Email Notifications'],
    cta: 'Get Started Free',
    id: 'starter',
    featured: false,
  },
  {
    tier: 'Growth',
    price: '$49',
    period: '/mo',
    desc: 'For growing SMBs that need automated risk detection and WhatsApp alert workflows.',
    features: ['5 Bank Accounts','90-Day Cash Forecast','Unlimited AI Alerts','WhatsApp + SMS','Scenario Engine','Invoice Auto-Reminders'],
    cta: 'Start 14-Day Trial',
    id: 'growth',
    featured: true,
  },
  {
    tier: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Full white-label deployment with custom integrations, dedicated support, and SLA guarantees.',
    features: ['Unlimited Accounts','Custom Integrations','Dedicated AI Instance','White-label Option','SLA + Priority Support','On-premise Deployment'],
    cta: 'Contact Sales',
    id: 'enterprise',
    featured: false,
  },
]

export default function PricingSection() {
  return (
    <section className="pricing-section" id="pricing" aria-labelledby="pricing-heading">
      <div className="section-container">
        {/* Arpeggio Section Header */}
        <div className="section-intro">
          <div className="section-header-row">
            <div className="section-dot-label">
              <div className="section-dot" />
              <span className="section-dot-text">Pricing & Membership</span>
            </div>
            <div className="section-header-divider" />
            <span className="section-tag">plans & tiers</span>
          </div>

          <div className="section-divider-line" />

          <h2 className="section-display-title" id="pricing-heading">
            Simple, Transparent Pricing
          </h2>
          <p className="section-display-sub">
            Start free. Scale as your business grows.
          </p>
        </div>

        <div className="pricing-grid">
          {PLANS.map(plan => (
            <div
              key={plan.id}
              className={`pricing-card${plan.featured ? ' featured' : ''}`}
              aria-label={`${plan.tier} plan`}
            >
              {plan.featured && <div className="popular-badge" aria-label="Most popular plan">MOST POPULAR</div>}
              <div className="pricing-tier">{plan.tier}</div>
              <div className="pricing-price">
                {plan.price}<span className="price-period">{plan.period}</span>
              </div>
              <p className="pricing-desc">{plan.desc}</p>
              <ul className="pricing-feats" role="list">
                {plan.features.map(f => (
                  <li key={f}>
                    <span className="check" aria-hidden="true">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                id={`${plan.id}-btn`}
                className={`pricing-btn ${plan.featured ? 'btn-primary' : 'btn-outline'}`}
                aria-label={`${plan.cta} — ${plan.tier} plan`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
