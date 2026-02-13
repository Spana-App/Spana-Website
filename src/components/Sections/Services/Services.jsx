"use client"

import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API_BASE_URL from "../../../config/api"
import "./Services.css"

// Icons by category slug (matches backend)
const CATEGORY_ICONS = {
  "plumbing-electrical": (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  ),
  cleaning: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h18v4H3z"></path>
      <path d="M6 7v11a3 3 0 0 0 6 0V7"></path>
      <path d="M12 7v11a3 3 0 0 0 6 0V7"></path>
    </svg>
  ),
  gardening: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20"></path>
      <path d="M5 9c2-2 4-3 7-3s5 1 7 3"></path>
      <path d="M5 15c2-2 4-3 7-3s5 1 7 3"></path>
    </svg>
  ),
  "home-repairs": (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7l9-4 9 4-9 4-9-4z"></path>
      <path d="M21 10v7"></path>
      <path d="M3 10v7"></path>
      <path d="M12 14v7"></path>
    </svg>
  ),
  "security-access": (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  ),
  "appliance-help": (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="18" rx="2" ry="2"></rect>
      <circle cx="12" cy="13" r="3"></circle>
      <path d="M9 7h6"></path>
    </svg>
  ),
}

const Services = () => {
  const headingRef = useRef(null)
  const introRef = useRef(null)
  const servicesRef = useRef(null)
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`${API_BASE_URL}/services/categories`)
        if (!res.ok) throw new Error("Failed to fetch categories")
        const data = await res.json()
        setCategories(data.categories || [])
      } catch (err) {
        console.error("Error fetching categories:", err)
        setError(err.message)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const elements = [headingRef.current, introRef.current, servicesRef.current]
    elements.forEach((el, index) => {
      if (el) {
        setTimeout(() => {
          el.classList.add("animate-in")
        }, 100 * index)
      }
    })

    const bubbles = document.querySelectorAll(".bubble")
    bubbles.forEach((bubble) => {
      setInterval(() => {
        const xPos = Math.random() * 20 - 10
        const yPos = Math.random() * 20 - 10
        bubble.style.transform = `translate(${xPos}px, ${yPos}px)`
      }, 3000)
    })
  }, [])

  const handleLearnMore = (slug) => {
    navigate(`/browse-services${slug ? `?category=${slug}` : ""}`)
  }

  return (
    <div className="services-container">
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
            <Link to="/browse-services" className="browse-link">
              <span>Browse All Services</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>

        <div className="services-grid" ref={servicesRef}>
          {loading ? (
            <div className="services-loading">
              <div className="loading-spinner"></div>
              <p>Loading services...</p>
            </div>
          ) : error ? (
            <div className="services-error">
              <p>{error}</p>
              <p className="services-error-hint">Showing placeholder categories.</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="services-empty">
              <p>No service categories available yet. Check back soon.</p>
            </div>
          ) : (
            categories.map((cat) => (
              <div className="service-card" key={cat.slug}>
                <div className="service-card-icon">{CATEGORY_ICONS[cat.slug] || CATEGORY_ICONS["home-repairs"]}</div>
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
                <div className="service-features-mini">
                  {cat.features?.map((feature, i) => (
                    <span key={i} className="feature-tag">{feature}</span>
                  ))}
                </div>
                <button className="card-cta" type="button" onClick={() => handleLearnMore(cat.slug)}>
                  <span>LEARN MORE</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Services
