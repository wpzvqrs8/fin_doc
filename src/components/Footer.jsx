import { LogoIcon } from './Navbar'


const FOOTER_LINKS = {
  Product: ['Features', 'How It Works', 'Pricing', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Legal:   ['Privacy Policy', 'Terms of Service', 'Security'],
}

export default function Footer() {
  return (
    <footer className="site-footer glass-panel" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="#" className="logo-link" aria-label="FIN_DOC Home">
            <LogoIcon size={26} />
            <span className="logo-text">FIN_DOC</span>
          </a>
          <p className="footer-tagline">
            AI Financial Doctor — Zero hallucinations, zero surprises.
          </p>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          {Object.entries(FOOTER_LINKS).map(([col, links]) => (
            <div key={col} className="footer-col">
              <h4>{col}</h4>
              <ul role="list">
                {links.map(l => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="footer-bottom">
        <span>© 2026 FIN_DOC. All rights reserved.</span>
        <span className="footer-status">
          <span className="status-dot" aria-hidden="true" />
          All systems operational
        </span>
      </div>
    </footer>
  )
}
