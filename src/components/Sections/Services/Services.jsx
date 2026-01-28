"use client"

import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import "./Services.css"

const Services = () => {
  const headingRef = useRef(null)
  const introRef = useRef(null)
  const servicesRef = useRef(null)
  const navigate = useNavigate()

  // Services data – focused on home jobs only
  const services = [
    {
      id: 1,
      title: "Plumbing & Electrical",
      description:
        "Burst geysers, leaking taps, tripping plugs or no lights? Use Spana to find people who can sort out common plumbing and electrical issues around your home.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      features: ["Geysers & leaks", "Blocked drains", "Sockets & switches", "General fault finding"],
    },
    {
      id: 2,
      title: "Cleaning Services",
      description:
        "When the place needs a proper clean, Spana helps you find cleaners for once‑off deep cleans or regular weekly help.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3h18v4H3z"></path>
          <path d="M6 7v11a3 3 0 0 0 6 0V7"></path>
          <path d="M12 7v11a3 3 0 0 0 6 0V7"></path>
        </svg>
      ),
      features: ["Once‑off deep cleans", "Regular home cleaning", "Move‑in / move‑out", "Office & common areas"],
    },
    {
      id: 3,
      title: "Landscaping & Gardening",
      description:
        "Keep the outside looking as good as the inside. Find people to cut grass, trim trees and help with small landscaping jobs.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v20"></path>
          <path d="M5 9c2-2 4-3 7-3s5 1 7 3"></path>
          <path d="M5 15c2-2 4-3 7-3s5 1 7 3"></path>
        </svg>
      ),
      features: ["Grass cutting", "Tree trimming", "Garden clean‑ups", "Small landscaping projects"],
    },
    {
      id: 4,
      title: "Home Repairs & Maintenance",
      description:
        "For all the small fixes that pile up – doors that don’t close, cupboards that need work, paint that needs touching up – Spana connects you with handypeople who can help.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 7l9-4 9 4-9 4-9-4z"></path>
          <path d="M21 10v7"></path>
          <path d="M3 10v7"></path>
          <path d="M12 14v7"></path>
        </svg>
      ),
      features: ["General handyman work", "Painting & patching", "Doors, cupboards & fittings", "Small renovation touch‑ups"],
    },
    {
      id: 5,
      title: "Security & Access",
      description:
        "From new locks and remotes to basic security checks, Spana helps you find people who can make it easier to feel safe at home.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
      features: ["Lock changes", "Gate & garage remotes", "Basic security checks", "Minor access control issues"],
    },
    {
      id: 6,
      title: "Appliance Help",
      description:
        "When everyday appliances stop working properly, Spana connects you with people who can assess and fix common issues.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="3" width="16" height="18" rx="2" ry="2"></rect>
          <circle cx="12" cy="13" r="3"></circle>
          <path d="M9 7h6"></path>
        </svg>
      ),
      features: ["Washing machines", "Fridges & freezers", "Stoves & ovens", "Small household appliances"],
    },
  ]

  useEffect(() => {
    // Simple animation on load
    const elements = [headingRef.current, introRef.current, servicesRef.current]
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

  const handleLearnMore = (serviceId) => {
    navigate(`/how-it-works?service=${serviceId}`)
  }

  return (
    <div className="services-container">
      {/* Decorative bubbles */}
      <div className="bubbles-container">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>
        <div className="bubble bubble-6"></div>
      </div>

      <div className="services-content-wrapper">
        <div className="services-header" ref={headingRef}>
          <h1>
            Our <span className="highlight">Services</span>
          </h1>
          <div className="accent-line"></div>
        </div>

        <div className="services-intro" ref={introRef}>
          <p>
            Browse service categories available in the Spana app. Every booking connects you with a verified provider, so
            you can get work done with confidence.
          </p>
          <div className="browse-link-wrapper">
            <a href="/browse-services" className="browse-link">
              <span>Browse All Services</span>
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

        <div className="services-grid" ref={servicesRef}>
          {services.map((service) => (
            <div className="service-card" key={service.id}>
              <div className="service-card-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-features-mini">
                {service.features.map((feature, i) => (
                  <span key={i} className="feature-tag">{feature}</span>
                ))}
              </div>
              <button className="card-cta" type="button" onClick={() => handleLearnMore(service.id)}>
                <span>LEARN MORE</span>
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
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services
