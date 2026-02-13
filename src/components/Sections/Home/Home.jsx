import { useEffect, useRef, useState } from "react"
import "./Home.css"
import ComingSoonModal from "../../ui/ComingSoonModal/ComingSoonModal"

const HOME_IMAGES = [
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80", // plumber
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80", // electrician
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80", // gardener
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",    // cleaner
]

const Home = () => {
  const [heroImage] = useState(() => HOME_IMAGES[Math.floor(Math.random() * HOME_IMAGES.length)])
  const [showComingSoon, setShowComingSoon] = useState(false)
  const headingRef = useRef(null)
  const paragraphRef = useRef(null)
  const ctaRef = useRef(null)
  const imageRef = useRef(null)
  const featuresRef = useRef(null)

  useEffect(() => {
    const elements = [headingRef.current, paragraphRef.current, ctaRef.current, imageRef.current, featuresRef.current]
    elements.forEach((el, index) => {
      if (el) {
        setTimeout(() => {
          el.classList.add("animate-in")
        }, 100 * index)
      }
    })

    // Animate bubbles
    const bubbles = document.querySelectorAll(".bubble")
    bubbles.forEach((bubble) => {
      setInterval(() => {
        const xPos = Math.random() * 20 - 10
        const yPos = Math.random() * 20 - 10
        bubble.style.transform = `translate(${xPos}px, ${yPos}px)`
      }, 3000)
    })
  }, [])

  return (
    <div className="home-container">
      {/* Decorative bubbles */}
      <div className="bubbles-container">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>
        <div className="bubble bubble-6"></div>
      </div>

      <div className="content-wrapper">
        <div className="content-text">
          <div className="text-content-inner">
            <h1 ref={headingRef}>
              Need Help? Need A Service?
            </h1>
            <p ref={paragraphRef}>
              Look no further. Stop relying on word-of-mouth – connect directly with verified professionals through the
              Spana app, your way.
            </p>

            <div className="cta-wrapper" ref={ctaRef}>
              <button
                type="button"
                onClick={() => setShowComingSoon(true)}
                className="download-button app-store"
                aria-label="Download on App Store"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div className="download-text">
                  <span className="download-label">Download on the</span>
                  <span className="download-store">App Store</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setShowComingSoon(true)}
                className="download-button play-store"
                aria-label="Get it on Google Play"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="download-text">
                  <span className="download-label">Get it on</span>
                  <span className="download-store">Google Play</span>
                </div>
              </button>
            </div>

            <div className="features-section" ref={featuresRef}>
              <div className="feature">
                <div className="feature-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div className="feature-text">
                  <h3>Verified</h3>
                  <h6 className="p-tag">All providers are vetted</h6>
                </div>
              </div>

              <div className="feature feature-two">
                <div className="feature-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                </div>
                <div className="feature-text">
                  <h3>Fast</h3>
                  <h6 className="p-tag">Connect in minutes</h6>
                </div>
              </div>

              <div className="feature feature-three">
                <div className="feature-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="feature-text">
                  <h3>Reliable</h3>
                  <h6 className="p-tag">Real reviews, real results</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="background-pattern"></div>
        </div>

        <div className="image-container" ref={imageRef}>
          <div 
            className="service-provider-image"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="image-overlay"></div>
            <div className="profession-badge">
              <span>Service Provider</span>
            </div>
          </div>
          <div className="image-accent"></div>
          <div className="image-accent-2"></div>
        </div>
      </div>
      <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
    </div>
  )
}

export default Home
