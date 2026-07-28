import { useState, useEffect, useRef, useCallback } from 'react'
import wallpaperImg from '../img/wallpaper2.jpg'

/* ── REAL ICON URLs ── */
const ICON_URLS = {
  finder: 'https://www.evrything.ai/app-icons/finder.png',
  launchpad: 'https://www.evrything.ai/app-icons/launchpad.png',
  chatgpt: 'https://www.evrything.ai/app-icons/chatgpt.png',
  claude: 'https://www.evrything.ai/app-icons/claude.png',
  safari: 'https://www.evrything.ai/app-icons/safari.png',
  messages: 'https://www.evrything.ai/app-icons/messages.png',
  mail: 'https://www.evrything.ai/app-icons/mail.png',
  maps: 'https://www.evrything.ai/app-icons/maps.png',
  photos: 'https://www.evrything.ai/app-icons/photos.png',
  music: 'https://www.evrything.ai/app-icons/music.png',
  podcasts: 'https://www.evrything.ai/app-icons/podcasts.png',
  appletv: 'https://www.evrything.ai/app-icons/tv.png',
  appstore: 'https://www.evrything.ai/app-icons/appstore.png',
  notes: 'https://www.evrything.ai/app-icons/notes.png',
  vscode: 'https://www.evrything.ai/app-icons/vscode.png',
  settings: 'https://www.evrything.ai/app-icons/settings.png',
  steam: 'https://www.evrything.ai/app-icons/steam.png',
}

/* ── DOCK ICON DEFINITIONS ── */
const DOCK_ICONS = [
  { id: 'finder', label: 'Finder', action: 'unavailable', msg: 'Finder is restricted in this demo. Click Safari to explore FIN_DOC.' },
  { id: 'launchpad', label: 'Launchpad', action: 'unavailable', msg: 'Launchpad is not available here. Click Safari to launch FIN_DOC.' },
  { id: 'chatgpt', label: 'ChatGPT', action: 'unavailable', msg: 'ChatGPT cannot be opened in demo mode. FIN_DOC has its own AI — try Safari.' },
  { id: 'claude', label: 'Claude', action: 'unavailable', msg: 'Claude is not available here. See FIN_DOC\'s built-in AI in action via Safari.' },
  { id: 'safari', label: 'Safari', action: 'safari', msg: null },
  { id: 'messages', label: 'Messages', action: 'unavailable', msg: 'Messages is disabled in demo mode. FIN_DOC dispatches real WhatsApp alerts — try Safari.' },
  { id: 'mail', label: 'Mail', action: 'unavailable', msg: 'Mail is not accessible here. Open Safari to see how FIN_DOC sends financial alerts.' },
  { id: 'maps', label: 'Maps', action: 'unavailable', msg: 'Maps is unavailable in the demo. Navigate to FIN_DOC by clicking Safari.' },
  { id: 'photos', label: 'Photos', action: 'unavailable', msg: 'Photos is restricted in demo mode. Click Safari to view the FIN_DOC platform.' },
  { id: 'music', label: 'Music', action: 'unavailable', msg: 'Music is not available here. Click Safari to explore FIN_DOC instead.' },
  { id: 'podcasts', label: 'Podcasts', action: 'unavailable', msg: 'Podcasts is disabled in this demo. FIN_DOC detects financial risks — click Safari.' },
  { id: 'appletv', label: 'Apple TV', action: 'unavailable', msg: 'Apple TV is not available in demo mode. Click Safari to see FIN_DOC.' },
  { id: 'appstore', label: 'App Store', action: 'unavailable', msg: 'App Store is restricted here. FIN_DOC is ready to go — just click Safari.' },
  { id: 'notes', label: 'Notes', action: 'unavailable', msg: 'Notes is unavailable in this demo. FIN_DOC logs every transaction automatically — try Safari.' },
  { id: 'vscode', label: 'VS Code', action: 'unavailable', msg: 'VS Code cannot be opened here. The FIN_DOC engine is already running — click Safari.' },
  { id: 'settings', label: 'System Settings', action: 'unavailable', msg: 'System Settings is disabled in demo mode. Configure your finances via Safari.' },
  { id: 'steam', label: 'Steam', action: 'unavailable', msg: 'Steam is not available in this demo. Level up your finances with FIN_DOC — click Safari.' },
]

/* ── PORTAL DEMO CONVERSATION (Rich Financial Doctor Intelligence) ── */
const DEMO_CONVERSATION = [
  {
    role: 'agent',
    text: 'Autonomous Audit Complete — Liquid cash across 4 bank accounts is **$43,200**. Total committed AP due in 30 days: **$40,000**.',
    delay: 500,
  },
  {
    role: 'agent',
    text: 'CRITICAL ALERT — Upcoming **$17,500** payroll on Aug 4th has a 34% shortfall risk. Your current Altman Z-Score is **1.82** (Grey Zone distress risk).',
    delay: 2200,
  },
  {
    role: 'agent',
    text: 'I have identified 3 actionable financial interventions:\n1. **Acme Corp Invoice #1042 ($5,000)** is 12 days overdue.\n2. **TechVendor Inc** charged **$600.00** twice on Jul 27 (Duplicate Billing).\n3. **4 Dormant SaaS Subscriptions** costing **$840/month** in unused user seats.',
    delay: 4500,
  },
  {
    role: 'user',
    text: 'How will resolving these impact our Z-Score and cash runway?',
    delay: 7200,
  },
  {
    role: 'agent',
    text: 'Executing all 3 interventions will recover **$6,440** in immediate cash. Your Altman Z-Score will increase to **3.42** (Safe Zone), and cash runway extends from **34 days to 62 days**.',
    delay: 9500,
  },
  {
    role: 'user',
    text: 'Execute all 3 actions immediately.',
    delay: 12000,
  },
  {
    role: 'agent',
    text: 'Interventions executed:\n• **WhatsApp Payment Reminder** with 1-click Stripe link dispatched via Twilio to John Smith (Acme Corp).\n• **Chargeback Claim #CB-9921** submitted for $600.00 duplicate fee.\n• **Terminated 4 dormant SaaS seats** saving $840/month.',
    delay: 14500,
  },
  {
    role: 'agent',
    text: 'UPDATE: Stripe Webhook received — Acme Corp settled Invoice #1042 (**+$5,000.00** cleared). Payroll buffer is secured! Updated runway: **62 Days**.',
    delay: 17500,
  },
]

/* ── CLOCK HELPER ── */
function useClockTime() {
  const [time, setTime] = useState(() => {
    const now = new Date()
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  })
  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
    }, 10000)
    return () => clearInterval(t)
  }, [])
  return time
}

/* ── BOT CHARACTER — Robot head with shape tracing orange outline & cursor tracking ── */
function BotCharacter({ agentMsg, smileState, onDismiss }) {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })
  const botRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!botRef.current) return
      const rect = botRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const dist = Math.sqrt(dx * dx + dy * dy) || 1
      const maxOffset = 8
      const factor = Math.min(1, dist / 250)
      setPupilOffset({
        x: (dx / dist) * maxOffset * factor,
        y: (dy / dist) * maxOffset * factor,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  /* Render Smile Path based on state */
  const renderSmile = () => {
    if (smileState === 'wrong') {
      return <path d="M5 9 Q14 6 23 9" stroke="#FF5C5C" strokeWidth="3" strokeLinecap="round" />
    }
    if (smileState === 'happy') {
      return <path d="M3 2 C7 13 21 13 25 2" stroke="#4ADE80" strokeWidth="3.5" strokeLinecap="round" />
    }
    return <path d="M4 3 C8 11 20 11 24 3" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
  }

  return (
    <div className="mac-bot-wrapper" ref={botRef}>
      {/* Robot Head Structure — Shape Traced Outline */}
      <div className={`mac-robot-head-traced ${smileState}`}>
        <div className="mac-robot-head">
          {/* Antenna */}
          <div className="mac-robot-antenna">
            <div className="mac-robot-antenna-stem" />
            <div className="mac-robot-antenna-orb" />
          </div>

          {/* Side Ear Pads */}
          <div className="mac-robot-ear left" />
          <div className="mac-robot-ear right" />

          {/* Main Robot Face */}
          <div className="mac-robot-face">
            {/* Forehead accent */}
            <div className="mac-robot-top-plate" />

            {/* Visor Screen */}
            <div className="mac-robot-visor">
              <div className="mac-robot-visor-inner">
                {/* Eyes container */}
                <div className="mac-bot-eyes-row">
                  {/* Left Eye */}
                  <div className="mac-bot-eye-wrap">
                    <div className="mac-bot-eyeball">
                      <div
                        className="mac-bot-pupil"
                        style={{ transform: `translate3d(${pupilOffset.x}px, ${pupilOffset.y}px, 0)` }}
                      >
                        <div className="mac-bot-shine" />
                      </div>
                    </div>
                  </div>

                  {/* Right Eye */}
                  <div className="mac-bot-eye-wrap">
                    <div className="mac-bot-eyeball">
                      <div
                        className="mac-bot-pupil"
                        style={{ transform: `translate3d(${pupilOffset.x}px, ${pupilOffset.y}px, 0)` }}
                      >
                        <div className="mac-bot-shine" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reactive Smile */}
                <div className="mac-robot-smile">
                  <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
                    {renderSmile()}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Speech Bubble — Positioned BELOW the head */}
      {agentMsg && (
        <div className="mac-agent-bubble-below" onClick={onDismiss}>
          <p className="mac-agent-bubble-text">{agentMsg}</p>
        </div>
      )}
    </div>
  )
}

/* ── SAFARI BROWSER PORTAL DEMO ── */
function SafariPortal({ onClose }) {
  const [loading, setLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [sendActive, setSendActive] = useState(false)
  const [activeTab, setActiveTab] = useState('agent')
  const [userQuery, setUserQuery] = useState('')
  const chatEndRef = useRef(null)

  const handleSendMessage = (e) => {
    e?.preventDefault()
    if (!userQuery.trim()) return

    const q = userQuery.trim()
    setUserQuery('')
    setSendActive(false)

    setMessages(prev => [...prev, { role: 'user', text: q }])
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      let reply = "FIN_DOC AI Doctor is actively monitoring your accounts. Altman Z-Score: **3.42** (Safe Zone). All AP/AR schedules are reconciled in real-time."

      const lower = q.toLowerCase()
      if (lower.includes('runway') || lower.includes('cash') || lower.includes('balance')) {
        reply = "Your total liquid cash reserve across 4 bank feeds is **$43,200**. Projected runway is **62 days** after invoice recovery and duplicate charge mitigation."
      } else if (lower.includes('invoice') || lower.includes('acme') || lower.includes('overdue')) {
        reply = "Acme Corp Invoice #1042 (**$5,000**) was settled via 1-click Stripe link. Delivery and receipt posted to ledger (#TRX-9982)."
      } else if (lower.includes('payroll') || lower.includes('gusto') || lower.includes('salary')) {
        reply = "Upcoming Gusto Payroll on Aug 4th (**$17,500**) is fully funded and protected by FIN_DOC Risk Shield."
      } else if (lower.includes('tax') || lower.includes('vat') || lower.includes('deduction')) {
        reply = "AI Tax Audit identified **$2,450** in deductible SaaS and cloud infrastructure expenses for Q3 filing."
      }

      setMessages(prev => [...prev, { role: 'agent', text: reply }])
    }, 1000)
  }

  useEffect(() => {
    let prog = 0
    const loadInterval = setInterval(() => {
      prog += Math.random() * 16 + 7
      if (prog >= 100) {
        prog = 100
        clearInterval(loadInterval)
        setTimeout(() => setLoading(false), 350)
      }
      setLoadProgress(Math.min(100, prog))
    }, 80)
    return () => clearInterval(loadInterval)
  }, [])

  /* Automated Scripted Chat Sequence with Character-by-Character Human Input Typing */
  useEffect(() => {
    if (loading) return
    let isCancelled = false

    const sleep = (ms) => new Promise(res => setTimeout(res, ms))

    const typeHumanMessage = async (fullText) => {
      setUserQuery('')
      setSendActive(false)

      for (let i = 0; i < fullText.length; i++) {
        if (isCancelled) return
        setUserQuery(prev => prev + fullText[i])
        
        const char = fullText[i]
        let delay = 35 + Math.random() * 45
        if (char === ' ' || char === ',' || char === '?') {
          delay += 180
        }
        await sleep(delay)
      }

      if (isCancelled) return
      setSendActive(true)
      await sleep(450)

      if (isCancelled) return
      setMessages(prev => [...prev, { role: 'user', text: fullText }])
      setUserQuery('')
      setSendActive(false)
      await sleep(350)
    }

    const runScript = async () => {
      // Step 0: Agent 1
      await sleep(400)
      if (isCancelled) return
      setIsTyping(true)
      await sleep(1100)
      if (isCancelled) return
      setIsTyping(false)
      setMessages(prev => [...prev, {
        role: 'agent',
        text: 'Autonomous Audit Complete — Liquid cash across 4 bank accounts is **$43,200**. Total committed AP due in 30 days: **$40,000**.'
      }])

      // Step 1: Agent 2
      await sleep(900)
      if (isCancelled) return
      setIsTyping(true)
      await sleep(1200)
      if (isCancelled) return
      setIsTyping(false)
      setMessages(prev => [...prev, {
        role: 'agent',
        text: 'CRITICAL ALERT — Upcoming **$17,500** payroll on Aug 4th has a 34% shortfall risk. Your current Altman Z-Score is **1.82** (Grey Zone distress risk).'
      }])

      // Step 2: Agent 3
      await sleep(1000)
      if (isCancelled) return
      setIsTyping(true)
      await sleep(1300)
      if (isCancelled) return
      setIsTyping(false)
      setMessages(prev => [...prev, {
        role: 'agent',
        text: 'I have identified 3 actionable financial interventions:\n1. **Acme Corp Invoice #1042 ($5,000)** is 12 days overdue.\n2. **TechVendor Inc** charged **$600.00** twice on Jul 27 (Duplicate Billing).\n3. **4 Dormant SaaS Subscriptions** costing **$840/month** in unused user seats.'
      }])

      // Step 3: Human Character-by-Character Typing 1
      await sleep(1200)
      if (isCancelled) return
      await typeHumanMessage('How will resolving these impact our Z-Score and cash runway?')

      // Step 4: Agent Response 1
      if (isCancelled) return
      setIsTyping(true)
      await sleep(1200)
      if (isCancelled) return
      setIsTyping(false)
      setMessages(prev => [...prev, {
        role: 'agent',
        text: 'Executing all 3 interventions will recover **$6,440** in immediate cash. Your Altman Z-Score will increase to **3.42** (Safe Zone), and cash runway extends from **34 days to 62 days**.'
      }])

      // Step 5: Human Character-by-Character Typing 2
      await sleep(1400)
      if (isCancelled) return
      await typeHumanMessage('Execute all 3 actions immediately.')

      // Step 6: Agent Response 2
      if (isCancelled) return
      setIsTyping(true)
      await sleep(1400)
      if (isCancelled) return
      setIsTyping(false)
      setMessages(prev => [...prev, {
        role: 'agent',
        text: 'Interventions executed:\n• **WhatsApp Payment Reminder** with 1-click Stripe link dispatched via Twilio to John Smith (Acme Corp).\n• **Chargeback Claim #CB-9921** submitted for $600.00 duplicate fee.\n• **Terminated 4 dormant SaaS seats** saving $840/month.'
      }])

      // Step 7: Agent Final Update
      await sleep(1600)
      if (isCancelled) return
      setIsTyping(true)
      await sleep(1200)
      if (isCancelled) return
      setIsTyping(false)
      setMessages(prev => [...prev, {
        role: 'agent',
        text: 'UPDATE: Stripe Webhook received — Acme Corp settled Invoice #1042 (**+$5,000.00** cleared). Payroll buffer is secured! Updated runway: **62 Days**.'
      }])
    }

    runScript()

    return () => {
      isCancelled = true
    }
  }, [loading])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, userQuery])

  const renderFormattedMessage = (text) => {
    if (!text) return null
    const lines = text.split('\n')

    return (
      <div className="portal-msg-formatted">
        {lines.map((line, lineIdx) => {
          const trimmed = line.trim()
          if (!trimmed) return <div key={lineIdx} className="msg-space" />

          const parseBold = (str) => {
            const parts = str.split(/\*\*(.*?)\*\*/g)
            return parts.map((part, i) =>
              i % 2 === 1 ? <strong key={i} className="msg-bold">{part}</strong> : part
            )
          }

          // Numbered item: 1. Acme Corp...
          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/)
          if (numMatch) {
            const num = numMatch[1]
            const body = numMatch[2]
            return (
              <div key={lineIdx} className="msg-list-item numbered">
                <span className="msg-num-badge">{num}</span>
                <span className="msg-list-content">{parseBold(body)}</span>
              </div>
            )
          }

          // Bullet item: • WhatsApp...
          const bulletMatch = trimmed.match(/^([•\-\*])\s+(.*)/)
          if (bulletMatch) {
            const body = bulletMatch[2]
            return (
              <div key={lineIdx} className="msg-list-item bullet">
                <span className="msg-bullet-badge">•</span>
                <span className="msg-list-content">{parseBold(body)}</span>
              </div>
            )
          }

          return (
            <p key={lineIdx} className="msg-para">
              {parseBold(line)}
            </p>
          )
        })}
      </div>
    )
  }

  const NAV_ITEMS = [
    {
      id: 'dashboard', icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
      ), label: 'Dashboard'
    },
    {
      id: 'agent', icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><rect x="7" y="14" width="10" height="2" rx="1" /><rect x="9" y="18" width="6" height="2" rx="1" /></svg>
      ), label: 'AI Agent'
    },
    {
      id: 'transactions', icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" /></svg>
      ), label: 'Transactions'
    },
    {
      id: 'forecasts', icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
      ), label: 'Forecasts'
    },
    {
      id: 'alerts', icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" /></svg>
      ), label: 'Alerts'
    },
    {
      id: 'settings', icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
      ), label: 'Settings'
    },
  ]

  return (
    <div className="mac-safari-overlay" onClick={(e) => e.stopPropagation()}>
      <div className="mac-safari-window">
        {/* Title Bar */}
        <div className="safari-titlebar">
          <div className="safari-traffic">
            <button className="safari-btn red" onClick={onClose} title="Close Safari" />
            <button className="safari-btn yellow" title="Minimize" />
            <button className="safari-btn green" title="Maximize" />
          </div>
          <div className="safari-toolbar">
            <div className="safari-nav-btns">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </div>
            <div className="safari-addressbar">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              <span className="safari-url">app.findoc.ai/dashboard</span>
              {loading && <div className="safari-spinner" />}
            </div>
            <div className="safari-share-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" /></svg>
            </div>
          </div>
        </div>

        {loading && (
          <div className="safari-loading-bar">
            <div className="safari-loading-fill" style={{ width: `${loadProgress}%` }} />
          </div>
        )}

        {loading ? (
          <div className="safari-loading-screen">
            <div className="safari-loading-logo">
              <div className="safari-loading-brand-icon">F</div>
              <span className="safari-loading-brand">FIN_DOC</span>
              <span className="safari-loading-sub">AI Financial Doctor</span>
            </div>
            <div className="safari-loading-spinner-big" />
            <p className="safari-loading-hint">Connecting to your financial data...</p>
          </div>
        ) : (
          <div className="portal-app">
            {/* Sidebar */}
            <nav className="portal-sidebar">
              <div className="portal-brand">
                <div className="portal-brand-icon">F</div>
                <span>FIN_DOC</span>
              </div>
              <div className="portal-nav">
                {NAV_ITEMS.map(item => (
                  <button
                    key={item.id}
                    className={`portal-nav-item ${activeTab === item.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <span className="portal-nav-icon">{item.icon}</span>
                    <span className="portal-nav-label">{item.label}</span>
                  </button>
                ))}
              </div>
              <div className="portal-quick-stats">
                <div className="portal-stat danger">
                  <span className="portal-stat-label">RISK SCORE</span>
                  <span className="portal-stat-val">HIGH</span>
                </div>
                <div className="portal-stat">
                  <span className="portal-stat-label">CASH BALANCE</span>
                  <span className="portal-stat-val">$43.2K</span>
                </div>
                <div className="portal-stat">
                  <span className="portal-stat-label">RUNWAY</span>
                  <span className="portal-stat-val">62 days</span>
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <main className="portal-main">
              {/* Top Navigation / Address indicator */}
              <div className="portal-topbar">
                <div className="portal-topbar-left">
                  <div className="portal-ai-orb" />
                  <div>
                    <h1 className="portal-page-title">
                      {activeTab === 'dashboard' && 'Financial Command Center'}
                      {activeTab === 'agent' && 'AI Financial Agent'}
                      {activeTab === 'transactions' && 'Live Transactions & Audit'}
                      {activeTab === 'forecasts' && '30-90 Day Cash Forecasts'}
                      {activeTab === 'alerts' && 'Security & Risk Alerts'}
                      {activeTab === 'settings' && 'AI Agent Settings & Integrations'}
                    </h1>
                    <p className="portal-page-sub">
                      {activeTab === 'dashboard' && 'Real-time financial overview and AI threat detection'}
                      {activeTab === 'agent' && 'Autonomous AI agent monitoring payroll & invoice recovery'}
                      {activeTab === 'transactions' && 'Automated ledger tracking with duplicate charge protection'}
                      {activeTab === 'forecasts' && 'Z-score cash flow predictions & runway extension models'}
                      {activeTab === 'alerts' && 'Active risk mitigation feeds and Twilio WhatsApp dispatch logs'}
                      {activeTab === 'settings' && 'Autopilot controls, risk sensitivity thresholds, and API keys'}
                    </p>
                  </div>
                </div>
                <div className="portal-topbar-right">
                  <span className="portal-live-badge">LIVE</span>
                  <span className="portal-account">Acme Industries</span>
                </div>
              </div>

              {/* TAB 1: DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="portal-tab-content">
                  <div className="portal-metrics-grid">
                    <div className="portal-card metric">
                      <span className="portal-card-label">TOTAL CASH BALANCE</span>
                      <span className="portal-card-value">$43,200</span>
                      <span className="portal-card-sub negative">-12.4% vs last month</span>
                    </div>
                    <div className="portal-card metric danger">
                      <span className="portal-card-label">UPCOMING PAYROLL</span>
                      <span className="portal-card-value">$17,500</span>
                      <span className="portal-card-sub danger-txt">Shortfall risk in 7 days</span>
                    </div>
                    <div className="portal-card metric warning">
                      <span className="portal-card-label">OVERDUE RECEIVABLES</span>
                      <span className="portal-card-value">$5,000</span>
                      <span className="portal-card-sub warning-txt">Acme Corp (12 days past due)</span>
                    </div>
                    <div className="portal-card metric positive">
                      <span className="portal-card-label">PROJECTED RUNWAY</span>
                      <span className="portal-card-value">62 Days</span>
                      <span className="portal-card-sub positive-txt">+18 days after AI recovery</span>
                    </div>
                  </div>

                  <div className="portal-grid-two">
                    <div className="portal-card">
                      <h3 className="portal-card-title">Cash Flow & Deficit Forecast</h3>
                      <div className="portal-chart-placeholder">
                        <div className="portal-chart-bars">
                          <div className="portal-bar" style={{ height: '65%' }}><span className="bar-val">$52k</span></div>
                          <div className="portal-bar" style={{ height: '55%' }}><span className="bar-val">$48k</span></div>
                          <div className="portal-bar danger" style={{ height: '35%' }}><span className="bar-val danger">$20k</span></div>
                          <div className="portal-bar positive" style={{ height: '80%' }}><span className="bar-val positive">$62k</span></div>
                        </div>
                        <div className="portal-chart-labels">
                          <span>Week 1</span><span>Week 2</span><span>Payroll Day</span><span>Post-Recovery</span>
                        </div>
                      </div>
                    </div>

                    <div className="portal-card">
                      <h3 className="portal-card-title">AI System Interventions</h3>
                      <ul className="portal-activity-list">
                        <li className="portal-act-item">
                          <div className="act-dot warning" />
                          <div>
                            <strong>WhatsApp Payment Link Sent</strong>
                            <p>Delivered to John Smith (Acme Corp) for $5,000 overdue invoice</p>
                          </div>
                          <span className="act-time">Just now</span>
                        </li>
                        <li className="portal-act-item">
                          <div className="act-dot danger" />
                          <div>
                            <strong>2 Duplicate Charges Flagged</strong>
                            <p>TechVendor Inc charged $600 twice — Chargeback claim #CB-9921 generated</p>
                          </div>
                          <span className="act-time">1 hr ago</span>
                        </li>
                        <li className="portal-act-item">
                          <div className="act-dot positive" />
                          <div>
                            <strong>Bank Feed Reconciled</strong>
                            <p>Stripe Payout +$14,200 verified and posted to cash ledger</p>
                          </div>
                          <span className="act-time">4 hrs ago</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: AI AGENT (Interactive Live Demo Chat) */}
              {activeTab === 'agent' && (
                <div className="portal-chat-wrapper">
                  <div className="portal-alert-banner">
                    <div className="portal-alert-indicator" />
                    <div className="portal-alert-text">
                      <strong>AI ALERT:</strong> Payroll shortfall risk detected in 7 days — $5,000 Acme Corp invoice overdue
                    </div>
                    <span className="portal-alert-time">2 min ago</span>
                  </div>

                  <div className="portal-chat-area">
                    <div className="portal-chat-messages">
                      {messages.map((msg, i) => (
                        <div key={i} className={`portal-message ${msg.role}`}>
                          {msg.role === 'agent' && (
                            <div className="portal-agent-avatar">
                              <span>F</span>
                            </div>
                          )}
                          <div className="portal-msg-bubble">
                            {renderFormattedMessage(msg.text)}
                          </div>
                          {msg.role === 'user' && (
                            <div className="portal-user-avatar">You</div>
                          )}
                        </div>
                      ))}
                      {isTyping && (
                        <div className="portal-message agent">
                          <div className="portal-agent-avatar"><span>F</span></div>
                          <div className="portal-msg-bubble typing">
                            <span className="typing-dot" />
                            <span className="typing-dot" />
                            <span className="typing-dot" />
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="portal-chat-input-area">
                      <input
                        className="portal-chat-input"
                        placeholder="Ask your AI agent anything (e.g., runway, invoice status, payroll)..."
                        value={userQuery}
                        onChange={(e) => setUserQuery(e.target.value)}
                      />
                      <button type="submit" className={`portal-chat-send ${sendActive ? 'active' : ''}`} title="Send message">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 3: TRANSACTIONS */}
              {activeTab === 'transactions' && (
                <div className="portal-tab-content">
                  <div className="portal-table-header">
                    <input className="portal-search-input" placeholder="Search transactions, vendors, or invoice IDs..." readOnly />
                    <div className="portal-filter-pills">
                      <span className="pill active">All</span>
                      <span className="pill">Overdue</span>
                      <span className="pill">Flagged</span>
                      <span className="pill">Cleared</span>
                    </div>
                  </div>

                  <div className="portal-card table-card">
                    <table className="portal-table">
                      <thead>
                        <tr>
                          <th>DATE</th>
                          <th>COUNTERPARTY</th>
                          <th>CATEGORY</th>
                          <th>AMOUNT</th>
                          <th>AI RISK STATUS</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Jul 28, 2026</td>
                          <td><strong>Acme Corp</strong></td>
                          <td>Invoice #1042</td>
                          <td className="amount positive">+$5,000.00</td>
                          <td><span className="status-badge warning">OVERDUE 12D</span></td>
                          <td><button className="table-btn">WhatsApp Sent</button></td>
                        </tr>
                        <tr>
                          <td>Jul 27, 2026</td>
                          <td><strong>TechVendor Inc</strong></td>
                          <td>SaaS Subscription</td>
                          <td className="amount negative">-$600.00</td>
                          <td><span className="status-badge danger">DUPLICATE</span></td>
                          <td><button className="table-btn danger">Chargeback</button></td>
                        </tr>
                        <tr>
                          <td>Jul 26, 2026</td>
                          <td><strong>AWS Cloud Services</strong></td>
                          <td>Infrastructure</td>
                          <td className="amount negative">-$1,420.50</td>
                          <td><span className="status-badge cleared">VERIFIED</span></td>
                          <td><button className="table-btn secondary">View Receipt</button></td>
                        </tr>
                        <tr>
                          <td>Jul 25, 2026</td>
                          <td><strong>Stripe Payout</strong></td>
                          <td>Revenue Clearing</td>
                          <td className="amount positive">+$14,200.00</td>
                          <td><span className="status-badge cleared">CLEARED</span></td>
                          <td><button className="table-btn secondary">Bank Log</button></td>
                        </tr>
                        <tr>
                          <td>Aug 04, 2026</td>
                          <td><strong>Gusto Payroll</strong></td>
                          <td>Payroll Reserve</td>
                          <td className="amount negative">-$17,500.00</td>
                          <td><span className="status-badge danger">RISK SHIELD</span></td>
                          <td><button className="table-btn">Protected</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: FORECASTS */}
              {activeTab === 'forecasts' && (
                <div className="portal-tab-content">
                  <div className="portal-metrics-grid">
                    <div className="portal-card metric positive">
                      <span className="portal-card-label">Z-SCORE HEALTH INDEX</span>
                      <span className="portal-card-value">3.42</span>
                      <span className="portal-card-sub positive-txt">Safe Zone (&gt; 2.99)</span>
                    </div>
                    <div className="portal-card metric">
                      <span className="portal-card-label">30-DAY CASH PROJECTION</span>
                      <span className="portal-card-value">$31,200</span>
                      <span className="portal-card-sub">Includes $5k invoice recovery</span>
                    </div>
                    <div className="portal-card metric">
                      <span className="portal-card-label">60-DAY CASH PROJECTION</span>
                      <span className="portal-card-value">$54,800</span>
                      <span className="portal-card-sub">Assumes standard revenue growth</span>
                    </div>
                  </div>

                  <div className="portal-card">
                    <h3 className="portal-card-title">Liquidity & Runway Projection</h3>
                    <p className="portal-card-sub">FIN_DOC AI models cash balances based on recurring AP/AR and anomaly mitigations.</p>
                    <div className="portal-forecast-bars">
                      <div className="forecast-item">
                        <div className="forecast-meta"><span>Current State (Pre-Intervention)</span><strong>$20,700 (34 days)</strong></div>
                        <div className="forecast-track"><div className="forecast-fill danger" style={{ width: '40%' }} /></div>
                      </div>
                      <div className="forecast-item">
                        <div className="forecast-meta"><span>With Acme Corp $5,000 Collected</span><strong>$25,700 (45 days)</strong></div>
                        <div className="forecast-track"><div className="forecast-fill warning" style={{ width: '60%' }} /></div>
                      </div>
                      <div className="forecast-item">
                        <div className="forecast-meta"><span>With Duplicate Chargebacks + Recovery (Full Autopilot)</span><strong>$62,000 (62 days)</strong></div>
                        <div className="forecast-track"><div className="forecast-fill positive" style={{ width: '90%' }} /></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: ALERTS */}
              {activeTab === 'alerts' && (
                <div className="portal-tab-content">
                  <div className="portal-alerts-feed">
                    <div className="portal-alert-card danger">
                      <div className="alert-card-header">
                        <span className="alert-level">CRITICAL</span>
                        <span className="alert-date">Today 14:32</span>
                      </div>
                      <h4 className="alert-card-title">Payroll Deficit Warning (7 Days Left)</h4>
                      <p className="alert-card-desc">Projected balance on payroll day is $20,700 against $17,500 payroll. Deficit buffer is critically narrow (34%).</p>
                      <div className="alert-card-footer">
                        <span className="alert-status">AI Intervention: Active</span>
                      </div>
                    </div>

                    <div className="portal-alert-card warning">
                      <div className="alert-card-header">
                        <span className="alert-level warning">HIGH</span>
                        <span className="alert-date">Today 12:10</span>
                      </div>
                      <h4 className="alert-card-title">Overdue Invoice #1042 — Acme Corp ($5,000)</h4>
                      <p className="alert-card-desc">Payment is 12 days past due date. Automated WhatsApp reminder dispatched via Twilio with Stripe 1-click checkout link.</p>
                      <div className="alert-card-footer">
                        <span className="alert-status">Status: Reminder Sent via WhatsApp</span>
                      </div>
                    </div>

                    <div className="portal-alert-card danger">
                      <div className="alert-card-header">
                        <span className="alert-level danger">MEDIUM</span>
                        <span className="alert-date">Yesterday 18:45</span>
                      </div>
                      <h4 className="alert-card-title">Duplicate Vendor Charge Detected — TechVendor Inc</h4>
                      <p className="alert-card-desc">Two identical charges of $600.00 processed within 4 minutes. Chargeback request #CB-9921 generated for bank submission.</p>
                      <div className="alert-card-footer">
                        <span className="alert-status">Status: Chargeback Claim Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: SETTINGS */}
              {activeTab === 'settings' && (
                <div className="portal-tab-content">
                  <div className="portal-grid-two">
                    <div className="portal-card">
                      <h3 className="portal-card-title">AI Autopilot Configuration</h3>
                      <div className="portal-toggle-list">
                        <div className="toggle-item">
                          <div>
                            <strong>Autonomous WhatsApp Reminders</strong>
                            <p>Automatically send WhatsApp reminders for overdue invoices &gt; 7 days</p>
                          </div>
                          <input type="checkbox" defaultChecked readOnly />
                        </div>
                        <div className="toggle-item">
                          <div>
                            <strong>Duplicate Charge Protection</strong>
                            <p>Instantly flag duplicate vendor billing and initiate chargebacks</p>
                          </div>
                          <input type="checkbox" defaultChecked readOnly />
                        </div>
                        <div className="toggle-item">
                          <div>
                            <strong>Payroll Deficit Shield</strong>
                            <p>Lock emergency reserve fund 7 days before scheduled payroll</p>
                          </div>
                          <input type="checkbox" defaultChecked readOnly />
                        </div>
                      </div>
                    </div>

                    <div className="portal-card">
                      <h3 className="portal-card-title">Connected API Integrations</h3>
                      <ul className="portal-integration-list">
                        <li className="int-item">
                          <span className="int-name">Stripe Payments</span>
                          <span className="int-status live">CONNECTED</span>
                        </li>
                        <li className="int-item">
                          <span className="int-name">Twilio WhatsApp API</span>
                          <span className="int-status live">CONNECTED</span>
                        </li>
                        <li className="int-item">
                          <span className="int-name">QuickBooks Online</span>
                          <span className="int-status live">SYNCED</span>
                        </li>
                        <li className="int-item">
                          <span className="int-name">Plaid Bank Feed</span>
                          <span className="int-status live">4 ACCOUNTS</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── DOCK with real icons + conditional scroll buttons ── */
function MacDock({ onIconClick, hoveredIndex, setHoveredIndex }) {
  const scrollRef = useRef(null)
  const [canScroll, setCanScroll] = useState(false)

  const checkOverflow = useCallback(() => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current
      setCanScroll(scrollWidth > clientWidth + 5)
    }
  }, [])

  useEffect(() => {
    checkOverflow()
    const timer = setTimeout(checkOverflow, 200)
    window.addEventListener('resize', checkOverflow)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkOverflow)
    }
  }, [checkOverflow])

  const handleScroll = (dir) => {
    if (!scrollRef.current) return
    const offset = dir === 'left' ? -220 : 220
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  const getScale = (index) => {
    if (hoveredIndex === null) return 1
    const dist = Math.abs(index - hoveredIndex)
    if (dist === 0) return 1.45
    if (dist === 1) return 1.22
    if (dist === 2) return 1.08
    return 1
  }

  const getTranslateY = (index) => {
    if (hoveredIndex === null) return 0
    const dist = Math.abs(index - hoveredIndex)
    if (dist === 0) return -10
    if (dist === 1) return -5
    if (dist === 2) return -2
    return 0
  }

  return (
    <div className="mac-dock-wrapper">
      <div className={`mac-dock ${canScroll ? 'has-scroll' : ''}`}>
        {/* Left Scroll Button — Only visible when screen size requires scrolling */}
        {canScroll && (
          <button
            className="mac-dock-scroll-btn left"
            onClick={() => handleScroll('left')}
            title="Scroll left"
            aria-label="Scroll dock left"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Horizontal Scroll Area */}
        <div className="mac-dock-scroll-area" ref={scrollRef}>
          {DOCK_ICONS.map((icon, i) => (
            <button
              key={icon.id}
              className="mac-dock-icon-btn"
              style={{
                transform: `scale(${getScale(i)}) translateY(${getTranslateY(i)}px)`,
                transformOrigin: 'bottom center',
                transition: 'transform 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                zIndex: hoveredIndex === i ? 10 : 1,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onIconClick(icon)}
              title={icon.label}
              aria-label={`Open ${icon.label}`}
            >
              <div className="mac-dock-icon-img">
                <img
                  src={ICON_URLS[icon.id]}
                  alt={icon.label}
                  draggable={false}
                />
              </div>
              <span className="mac-dock-label">{icon.label}</span>
            </button>
          ))}
        </div>

        {/* Right Scroll Button — Only visible when screen size requires scrolling */}
        {canScroll && (
          <button
            className="mac-dock-scroll-btn right"
            onClick={() => handleScroll('right')}
            title="Scroll right"
            aria-label="Scroll dock right"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

/* ── MAIN macOS DEMO COMPONENT ── */
export default function MacOSDemo({ onClose }) {
  const time = useClockTime()
  const [showSafari, setShowSafari] = useState(false)
  const [agentMessage, setAgentMessage] = useState(
    "Hello! I'm FIN_DOC, your Autonomous AI Financial Doctor. I'll be monitoring your cash reserves and payroll risk today. Please click the Safari browser icon in the dock below to launch the live portal!"
  )
  const [smileState, setSmileState] = useState('happy') // 'idle' | 'wrong' | 'happy'
  const [dockHovered, setDockHovered] = useState(null)
  const userInteractedRef = useRef(false)

  // 6 second inactivity prompt if user hasn't clicked any app
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!userInteractedRef.current) {
        setAgentMessage("Click the Safari icon in the bottom dock to open your financial doctor portal and view your live accounts.")
        setSmileState('idle')
      }
    }, 6000)
    return () => clearTimeout(timer)
  }, [])

  const handleIconClick = useCallback((icon) => {
    userInteractedRef.current = true
    if (icon.action === 'safari') {
      setShowSafari(true)
      setAgentMessage(null)
      setSmileState('happy')
    } else {
      setAgentMessage(icon.msg)
      setSmileState('wrong')
      // Auto-dismiss message and reset smile after 5s
      setTimeout(() => {
        setAgentMessage(null)
        setSmileState('idle')
      }, 5000)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="mac-overlay" aria-modal="true" role="dialog" aria-label="Virtual macOS Demo">
      {/* Wallpaper */}
      <div className="mac-wallpaper" style={{ backgroundImage: `url(${wallpaperImg})` }} />
      <div className="mac-wallpaper-overlay" />

      {/* Menu Bar */}
      <div className="mac-menubar">
        <div className="mac-menubar-left">
          {/* Apple logo */}
          <button className="mac-menu-item apple-logo" aria-label="Apple menu">
            <svg width="13" height="16" viewBox="0 0 814 1000" fill="currentColor">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46 790.8 0 663.5 0 541.8 0 347.5 130.2 244.2 258.2 244.2c67.5 0 124.3 44.8 166.5 44.8s109.3-47.6 187.6-47.6c30.5 0 133 2.6 191.5 104.7zm-167.1-120.9c31.2-37.1 53.1-88.3 53.1-139.5 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-70.6z" />
            </svg>
          </button>
          <span className="mac-menu-item bold">Finder</span>
          <span className="mac-menu-item">File</span>
          <span className="mac-menu-item">Edit</span>
          <span className="mac-menu-item">View</span>
          <span className="mac-menu-item">Window</span>
          <span className="mac-menu-item">Help</span>
        </div>
        <div className="mac-menubar-right">
          {/* WiFi icon */}
          <svg width="17" height="13" viewBox="0 0 24 18" fill="currentColor" className="mac-status-icon" aria-label="WiFi">
            <path d="M12 13.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0-4.5c2.5 0 4.7 1.1 6.2 2.8l-1.8 1.8C15.4 12.2 13.8 11.5 12 11.5s-3.4.7-4.4 2.1L5.8 11.8C7.3 10.1 9.5 9 12 9zm0-4.5c3.9 0 7.3 1.7 9.7 4.4l-1.8 1.8C17.9 8.3 15.1 7 12 7S6.1 8.3 4.1 10.7L2.3 8.9C4.7 6.2 8.1 4.5 12 4.5zm0-4.5c5.2 0 9.9 2.2 13.2 5.7l-1.8 1.8C20.6 4.9 16.6 3 12 3S3.4 4.9.6 7.5L-1.2 5.7C2.1 2.2 6.8 0 12 0z" />
          </svg>
          {/* Battery */}
          <svg width="23" height="12" viewBox="0 0 26 13" fill="none" className="mac-status-icon" aria-label="Battery">
            <rect x="0.5" y="0.5" width="21" height="12" rx="3.5" stroke="currentColor" strokeOpacity="0.7" />
            <rect x="2" y="2" width="16" height="9" rx="2" fill="currentColor" />
            <path d="M23 4.5v4a2 2 0 0 0 0-4z" fill="currentColor" fillOpacity="0.5" />
          </svg>
          <span className="mac-time">{time}</span>
          {/* Close */}
          <button className="mac-close-btn" onClick={onClose} aria-label="Exit demo">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1l8 8M9 1L1 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop */}
      <div className="mac-desktop">
        <BotCharacter
          agentMsg={agentMessage}
          smileState={smileState}
          onDismiss={() => setAgentMessage(null)}
        />
      </div>

      {/* Safari Window */}
      {showSafari && (
        <SafariPortal onClose={() => setShowSafari(false)} />
      )}

      {/* Dock */}
      <MacDock
        onIconClick={handleIconClick}
        hoveredIndex={dockHovered}
        setHoveredIndex={setDockHovered}
      />
    </div>
  )
}
