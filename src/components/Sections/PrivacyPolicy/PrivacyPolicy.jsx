import { Link } from "react-router-dom"
import Breadcrumbs from "../../ui/Breadcrumbs/Breadcrumbs"
import "./PrivacyPolicy.css"

const PrivacyPolicy = () => {
  return (
    <div className="legal-page privacy-policy">
      <div className="bubbles-container">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
      </div>

      <div className="legal-content">
        <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Privacy Policy" }]} />
        <header className="legal-header">
          <h1>Privacy Policy</h1>
          <p className="legal-updated">Last updated: February 2025</p>
        </header>

        <div className="legal-body">
          <section>
            <h2>1. Introduction</h2>
            <p>
              Spana (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and mobile application.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <p>We may collect information that you provide directly to us, including:</p>
            <ul>
              <li>Name, email address, phone number, and physical address</li>
              <li>Account credentials and profile information</li>
              <li>Service requests, bookings, and payment details</li>
              <li>Communications with us and with service providers</li>
            </ul>
            <p>We also automatically collect certain information when you use our services, such as device information, IP address, and usage data.</p>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Connect you with verified service providers</li>
              <li>Send you updates, security alerts, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>4. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information with service providers who perform services on our behalf, with other users when necessary to facilitate bookings, or when required by law.
            </p>
          </section>

          <section>
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2>6. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to access, correct, or delete your personal information, or to object to or restrict certain processing. Contact us at{" "}
              <a href="mailto:xoli@spana.co.za">xoli@spana.co.za</a> to exercise these rights.
            </p>
          </section>

          <section>
            <h2>7. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:xoli@spana.co.za">xoli@spana.co.za</a> or call{" "}
              <a href="tel:+27671107268">+27 67 110 7268</a>.
            </p>
          </section>
        </div>

        <div className="legal-footer-links">
          <Link to="/">Back to Home</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
          <Link to="/sitemap">Sitemap</Link>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
