import { useState, useEffect } from 'react'

export function LogoIcon({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <polygon
        points="16,2 28,9 28,23 16,30 4,23 4,9"
        fill="transparent"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect x="13.5" y="7"  width="5"  height="18" rx="1" fill={color} opacity="0.9"/>
      <rect x="7"  y="13.5" width="18" height="5"  rx="1" fill={color} opacity="0.9"/>
      <circle cx="16" cy="16" r="2.5" fill={color} />
    </svg>
  )
}

function WhatsappIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}

function XIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  )
}

function InstagramIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function LinkedinIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function EmailIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M22 6l-10 7L2 6"/>
    </svg>
  )
}

const SOCIAL_ICONS = [
  { href: '#', icon: WhatsappIcon, label: 'WhatsApp' },
  { href: '#', icon: XIcon, label: 'X' },
  { href: '#', icon: InstagramIcon, label: 'Instagram' },
  { href: '#', icon: LinkedinIcon, label: 'LinkedIn' },
  { href: '#', icon: EmailIcon, label: 'Email' },
]

const NAV_LINKS = [
  { href: '#dashboard', label: 'Dashboard' },
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
]

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Navbar appears ONLY when FIN_DOC logo reaches the exact top left position (scrollY > 295px)
  const isAfterFirstFrame = scrollY > 295

  return (
    <>
      {/* ── DISTORTED TRANSPARENT BLUR NAVBAR ── */}
      <nav
        className="distorted-blur-navbar"
        style={{
          opacity: isAfterFirstFrame ? 1 : 0,
          transform: isAfterFirstFrame ? 'translateY(0)' : 'translateY(-15px)',
          pointerEvents: isAfterFirstFrame ? 'auto' : 'none',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="distorted-navbar-inner">

          {/* 1. LEFT: Brand Name & Icon */}
          <a href="#" className="minimal-nav-logo" aria-label="FIN_DOC Home">
            <LogoIcon size={22} color="#FF4500" />
            <span className="minimal-brand-text">
              FIN_DOC<span className="minimal-reg">®</span>
            </span>
          </a>

          {/* 2. RIGHT: Seamless 2-Bar Orange Menu Button (stays fixed in place when drawer opens and morphs to 'X') */}
          <button
            className={`two-line-menu-btn ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={menuOpen}
          >
            <div className="two-line-bar bar-top" />
            <div className="two-line-bar bar-bottom" />
          </button>

        </div>
      </nav>

      {/* ── FULL-SCREEN SLIDE-OUT MENU OVERLAY ── */}
      {menuOpen && (
        <div className="menu-overlay" role="dialog" aria-modal="true">
          <div className="menu-overlay-bg" onClick={() => setMenuOpen(false)} />
          <div className="menu-drawer">
            <div className="menu-drawer-header">
              <div className="menu-drawer-brand">
                <LogoIcon size={26} color="#FF4500" />
                <span>FIN_DOC</span>
              </div>
            </div>

            <nav className="menu-drawer-nav">
              <span className="drawer-section-lbl">NAVIGATION</span>
              {NAV_LINKS.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  className="drawer-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <a href="#how-it-works" className="drawer-link" onClick={() => setMenuOpen(false)}>API &amp; Docs</a>
              <a href="#pricing" className="drawer-link" onClick={() => setMenuOpen(false)}>Enterprise SLA</a>
            </nav>

            <div className="menu-drawer-footer">
              <span className="drawer-section-lbl">CONNECT</span>
              <div className="drawer-socials">
                {SOCIAL_ICONS.map((s, idx) => {
                  const IconComp = s.icon
                  return (
                    <a key={idx} href={s.href} className="drawer-social-icon" title={s.label}>
                      <IconComp size={18} color="#FFFFFF" />
                    </a>
                  )
                })}
              </div>
              <button className="btn-primary lg drawer-cta">Get Early Access</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
