"use client"

import { useEffect, useRef } from "react"
import "./Partners.css"
import hanleyLogo from "../../../assets/HanleyTechnologies.jpg"

const Partners = () => {
  const headerRef = useRef(null)
  const marqueeRef = useRef(null)

  const partners = [
    {
      name: "Hanley Technologies",
      logo: "HT",
      logoImage: hanleyLogo,
      url: "https://hanleytechnologies.com",
      description: "Software House - Bespoke Development"
    },
    // Additional slots currently all showing Hanley Technologies as trusted partner
    {
      name: "Hanley Technologies",
      logo: "HT",
      logoImage: hanleyLogo,
      url: "https://hanleytechnologies.com",
      description: "Trusted Technology Partner"
    },
    {
      name: "Hanley Technologies",
      logo: "HT",
      logoImage: hanleyLogo,
      url: "https://hanleytechnologies.com",
      description: "Trusted Technology Partner"
    },
    {
      name: "Hanley Technologies",
      logo: "HT",
      logoImage: hanleyLogo,
      url: "https://hanleytechnologies.com",
      description: "Trusted Technology Partner"
    },
  ]

  useEffect(() => {
    // Simple animation on load
    if (headerRef.current) {
      setTimeout(() => {
        headerRef.current.classList.add("animate-in")
      }, 100)
    }
  }, [])

  return (
    <div className="partners-container">
      {/* Decorative bubbles */}
      <div className="bubbles-container">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
      </div>

      <div className="partners-content-wrapper">
        <div className="partners-header" ref={headerRef}>
          <h2>
            Our <span className="highlight">Partners</span>
          </h2>
          <div className="accent-line"></div>
        </div>

        {/* Hanley Technologies Featured Partnership */}
        <div className="featured-partnership">
          <div className="partnership-logo">
            <img 
              src={hanleyLogo} 
              alt="Hanley Technologies Logo" 
              className="hanley-logo"
            />
          </div>
          <div className="partnership-content">
            <h3>Hanley Technologies</h3>
            <p className="partnership-description">
              We are proud to partner with <strong>Hanley Technologies</strong>, a leading software house 
              that excels in bespoke development and customizing commercial-off-the-shelf products. This 
              partnership strengthens our development capabilities and technical expertise.
            </p>
            <a 
              href="https://hanleytechnologies.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="partnership-link"
            >
              Visit Hanley Technologies
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>

        {/* Sponsors Marquee */}
        <div className="sponsors-section">
          <h3 className="sponsors-title">Trusted By</h3>
          <div className="marquee-wrapper">
            <div className="marquee" ref={marqueeRef}>
              {/* Exclude Hanley Technologies from marquee since it's featured above */}
              {partners.slice(1).map((partner, index) => (
                <a href={partner.url} target="_blank" rel="noopener noreferrer" className="sponsor-item" key={`${partner.name}-${index}`}>
                  <div className="sponsor-logo">
                    {partner.logoImage ? (
                      <img src={partner.logoImage} alt={`${partner.name} Logo`} className="sponsor-logo-image" />
                    ) : (
                      <span>{partner.logo}</span>
                    )}
                  </div>
                  <div className="sponsor-info">
                    <h4>{partner.name}</h4>
                    <p>{partner.description}</p>
                  </div>
                </a>
              ))}
              {/* Duplicate for seamless loop */}
              {partners.slice(1).map((partner, index) => (
                <a href={partner.url} target="_blank" rel="noopener noreferrer" className="sponsor-item" key={`${partner.name}-dup-${index}`}>
                  <div className="sponsor-logo">
                    {partner.logoImage ? (
                      <img src={partner.logoImage} alt={`${partner.name} Logo`} className="sponsor-logo-image" />
                    ) : (
                      <span>{partner.logo}</span>
                    )}
                  </div>
                  <div className="sponsor-info">
                    <h4>{partner.name}</h4>
                    <p>{partner.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Partners

