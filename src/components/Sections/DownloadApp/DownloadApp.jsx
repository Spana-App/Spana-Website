import "./DownloadApp.css"

const DownloadApp = () => {
  const iosUrl = "https://apps.apple.com" // TODO: replace with real store link
  const androidUrl = "https://play.google.com/store" // TODO: replace with real store link

  return (
    <div className="download-app-container">
      <div className="bubbles-container">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
      </div>

      <div className="download-app-wrapper">
        <header className="download-app-header">
          <h1>
            Get the <span className="highlight">Spana</span> App
          </h1>
          <div className="accent-line" />
          <p>
            Whether you're booking services or providing them, manage trusted connections, bookings and payments in one
            powerful app.
          </p>
        </header>

        <section className="download-app-content">
          <div className="download-app-text">
            <h2>Why use the app?</h2>
            <ul>
              <li>For customers: instant booking with verified providers across multiple categories</li>
              <li>For providers: manage your availability, bookings and earnings in one place</li>
              <li>Real-time status updates, in-app chat and smart notifications</li>
              <li>Secure payments and a clear history of every job</li>
            </ul>

            <div className="store-buttons">
              <a
                href={iosUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="store-button ios"
              >
                <div className="store-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.665 13.985c-.033-3.242 2.647-4.79 2.769-4.864-1.51-2.204-3.864-2.506-4.695-2.54-1.992-.202-3.89 1.176-4.897 1.176-.998 0-2.567-1.15-4.228-1.116-2.158.033-4.163 1.262-5.274 3.204-2.258 3.915-.574 9.688 1.623 12.858 1.073 1.544 2.351 3.27 4.016 3.207 1.623-.067 2.232-1.04 4.192-1.04 1.952 0 2.506 1.04 4.215 1.007 1.744-.028 2.842-1.573 3.903-3.124 1.244-1.816 1.757-3.582 1.781-3.67-.039-.018-3.407-1.308-3.43-5.098z" />
                    <path d="M16.98 3.377C17.819 2.39 18.347.999 18.2 0c-1.061.043-2.353.707-3.117 1.581-.685.788-1.284 2.063-1.124 3.257 1.187.093 2.403-.602 3.021-1.461z" />
                  </svg>
                </div>
                <div className="store-text">
                  <span className="store-label">Download on the</span>
                  <span className="store-name">App Store</span>
                </div>
              </a>

              <a
                href={androidUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="store-button android"
              >
                <div className="store-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.89 2.2 13 12 3.89 21.8A1.5 1.5 0 0 1 1.5 20.7V3.3A1.5 1.5 0 0 1 3.89 2.2z" />
                    <path d="M14.19 10.81 18.88 6.12 6.41 1.01a1.5 1.5 0 0 0-.82-.06z" />
                    <path d="m14.19 13.19-8.6 8.6a1.5 1.5 0 0 0 .82-.06l12.47-5.11z" />
                    <path d="M20.11 7.35 15.24 12l4.87 4.65A1.5 1.5 0 0 0 22.5 15.7V8.3a1.5 1.5 0 0 0-2.39-.95z" />
                  </svg>
                </div>
                <div className="store-text">
                  <span className="store-label">Get it on</span>
                  <span className="store-name">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          <div className="download-app-visual">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="phone-header">Spana</div>
                <div className="phone-content">
                  <p className="phone-subtitle">Nearby services</p>
                  <p className="phone-title">Book trusted providers in minutes.</p>
                  <ul className="phone-list">
                    <li>Plumbing & electrical</li>
                    <li>Cleaning & maintenance</li>
                    <li>Personal care & more</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DownloadApp

