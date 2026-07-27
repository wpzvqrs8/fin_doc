import { useState, useEffect } from 'react'
import { ALERTS } from '../data/dummyData'

function AlertCard({ alert, onDismiss }) {
  const [done, setDone] = useState({})

  return (
    <article
      className={`alert-card ${alert.severity}`}
      role="article"
      aria-label={`${alert.category}: ${alert.title}`}
    >
      <div className={`alert-badge ${alert.severity}`}>{alert.category}</div>
      <div className="alert-title">{alert.title}</div>
      <div className="alert-insight">{alert.insight}</div>
      <div className="alert-actions">
        {alert.actions.map((a, i) =>
          i === 0 ? (
            <button
              key={a}
              className="btn-action-primary"
              onClick={() => setDone(d => ({ ...d, [a]: true }))}
              aria-label={a}
            >
              {done[a]
                ? <><span style={{ color: '#4A7C59' }}>✓</span> Done</>
                : <>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    {a}
                  </>
              }
            </button>
          ) : (
            <button
              key={a}
              className="btn-action-secondary"
              onClick={() => onDismiss && onDismiss(alert.id)}
              aria-label={a}
            >
              {a}
            </button>
          )
        )}
      </div>
    </article>
  )
}

export default function AIPulsePanel() {
  const [alerts,    setAlerts]    = useState(ALERTS)
  const [timestamp, setTimestamp] = useState(12)

  useEffect(() => {
    const id = setInterval(() => {
      setTimestamp(t => (t >= 59 ? 0 : t + 1))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const dismiss = (id) => setAlerts(a => a.filter(x => x.id !== id))

  return (
    <aside className="glass-panel ai-panel ai-col" aria-label="AI Controller panel">
      {/* Header */}
      <div className="ai-header">
        <div className="ai-orb-wrap" aria-hidden="true">
          <div className="orb-core" />
          <div className="orb-ring orb-ring-1" />
          <div className="orb-ring orb-ring-2" />
        </div>
        <div>
          <div className="ai-active-lbl">AI Controller Active</div>
          <div className="ai-ts" aria-live="polite">Last scan: {timestamp}s ago</div>
        </div>
      </div>

      {/* Alert Feed */}
      <div className="alert-feed" role="feed" aria-label="Smart financial alerts">
        {alerts.length === 0 && (
          <div style={{
            textAlign: 'center', color: 'var(--text-tertiary)',
            fontSize: 14, padding: '40px 16px',
            fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          }}>
            All clear — no active alerts
          </div>
        )}
        {alerts.map(alert => (
          <AlertCard key={alert.id} alert={alert} onDismiss={dismiss} />
        ))}
      </div>
    </aside>
  )
}
