import { Link } from "react-router-dom"
import Breadcrumbs from "../../ui/Breadcrumbs/Breadcrumbs"
import "./TermsOfService.css"

const TermsOfService = () => {
  return (
    <div className="legal-page terms-of-service">
      <div className="bubbles-container">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
      </div>

      <div className="legal-content">
        <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Terms of Service" }]} />
        <header className="legal-header">
          <h1>Terms of Service</h1>
          <p className="legal-updated">Last updated: February 2025</p>
        </header>

        <div className="legal-body">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Spana website and mobile application, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>
              Spana is a platform that connects customers with verified service providers for home and property services, including plumbing, electrical work, cleaning, gardening, and related services. We facilitate discovery, booking, and payment between users and providers.
            </p>
          </section>

          <section>
            <h2>3. User Accounts</h2>
            <p>
              You must create an account to use certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information.
            </p>
          </section>

          <section>
            <h2>4. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the service for any unlawful purpose</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with or disrupt the service or servers</li>
              <li>Transmit viruses or malicious code</li>
              <li>Harass, abuse, or harm other users or providers</li>
            </ul>
          </section>

          <section>
            <h2>5. Bookings and Payments</h2>
            <p>
              When you book a service through Spana, you enter into a direct agreement with the service provider. Spana facilitates the connection and may process payments. Cancellation and refund policies may vary by provider and service type.
            </p>
          </section>

          <section>
            <h2>6. Limitation of Liability</h2>
            <p>
              Spana acts as an intermediary between customers and service providers. We do not guarantee the quality, safety, or legality of services provided by third-party providers. Our liability is limited to the extent permitted by applicable law.
            </p>
          </section>

          <section>
            <h2>7. Changes to Terms</h2>
            <p>
              We may modify these Terms of Service at any time. We will notify you of material changes by posting the updated terms on our website. Your continued use of the service after such changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2>8. Contact</h2>
            <p>
              For questions about these Terms of Service, contact us at{" "}
              <a href="mailto:xoli@spana.co.za">xoli@spana.co.za</a> or{" "}
              <a href="tel:+27671107268">+27 67 110 7268</a>.
            </p>
          </section>
        </div>

        <div className="legal-footer-links">
          <Link to="/">Back to Home</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/sitemap">Sitemap</Link>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService
