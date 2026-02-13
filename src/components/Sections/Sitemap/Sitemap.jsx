import { Link } from "react-router-dom"
import Breadcrumbs from "../../ui/Breadcrumbs/Breadcrumbs"
import "./Sitemap.css"

const Sitemap = () => {
  const mainPages = [
    { path: "/", label: "Home" },
    { path: "/#About", label: "About Us" },
    { path: "/#Services", label: "Services" },
    { path: "/#Partners", label: "Partners" },
    { path: "/#Connect", label: "Contact" },
  ]

  const servicePages = [
    { path: "/browse-services", label: "Browse Services" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/providers", label: "Providers Directory" },
    { path: "/download-app", label: "Download App" },
  ]

  const otherPages = [
    { path: "/careers", label: "Careers" },
    { path: "/privacy-policy", label: "Privacy Policy" },
    { path: "/terms-of-service", label: "Terms of Service" },
  ]

  return (
    <div className="legal-page sitemap-page">
      <div className="bubbles-container">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
      </div>

      <div className="legal-content">
        <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Sitemap" }]} />
        <header className="legal-header">
          <h1>Sitemap</h1>
          <p className="legal-updated">Navigate the Spana website</p>
        </header>

        <div className="sitemap-sections">
          <section className="sitemap-section">
            <h2>Main Pages</h2>
            <ul>
              {mainPages.map((page) => (
                <li key={page.path}>
                  <Link to={page.path}>{page.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="sitemap-section">
            <h2>Services</h2>
            <ul>
              {servicePages.map((page) => (
                <li key={page.path}>
                  <Link to={page.path}>{page.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="sitemap-section">
            <h2>Other</h2>
            <ul>
              {otherPages.map((page) => (
                <li key={page.path}>
                  <Link to={page.path}>{page.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="legal-footer-links">
          <Link to="/">Back to Home</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
    </div>
  )
}

export default Sitemap
