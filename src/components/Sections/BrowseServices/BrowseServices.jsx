"use client"

import { useEffect, useState, useRef } from "react"
import { Link, useSearchParams } from "react-router-dom"
import API_BASE_URL from "../../../config/api"
import Breadcrumbs from "../../ui/Breadcrumbs/Breadcrumbs"
import ServiceCard from "../../ui/ServiceCard/ServiceCard"
import "./BrowseServices.css"

const BrowseServices = () => {
  const [searchParams] = useSearchParams()
  const categoryFromUrl = searchParams.get("category") || ""
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState(null)
  const headingRef = useRef(null)

  // Fetch services from API (with optional category filter)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        setError(null)

        let url = `${API_BASE_URL}/services`
        if (categoryFromUrl) {
          url += `?category=${encodeURIComponent(categoryFromUrl)}`
        }
        const response = await fetch(url)
        if (!response.ok) throw new Error('Failed to fetch services')
        const data = await response.json()

        // Backend may return either an array or { services: [...] }
        const serviceList = Array.isArray(data) ? data : (data.services || [])

        setServices(serviceList || [])
        setFilteredServices(serviceList || [])
      } catch (err) {
        console.error('Error fetching services:', err)
        setError(err.message)
        setServices([])
        setFilteredServices([])
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [categoryFromUrl])

  // Client-side search filter
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredServices(services)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = services.filter(service =>
      service.title?.toLowerCase().includes(query) ||
      service.description?.toLowerCase().includes(query)
    )
    setFilteredServices(filtered)
  }, [searchQuery, services])

  useEffect(() => {
    // Animation on load
    if (headingRef.current) {
      setTimeout(() => {
        headingRef.current.classList.add("animate-in")
      }, 100)
    }

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
    <div className="browse-services-container">
      {/* Decorative bubbles */}
      <div className="bubbles-container">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
      </div>

      <div className="browse-services-wrapper">
        <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Browse Services" }]} />
        <div className="browse-header" ref={headingRef}>
          <h1>
            Browse <span className="highlight">Services</span>
          </h1>
          <div className="accent-line"></div>
          <p>Search services from verified providers</p>
        </div>

        <div className="search-filters">
          <div className="search-bar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search your preferred service"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="clear-search"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>

        </div>

        <div className="results-info">
          <p>
            {loading ? (
              "Loading..."
            ) : error ? (
              <span className="error-text">Error loading services. Please try again later.</span>
            ) : (
              <>
                Showing <strong>{filteredServices.length}</strong> service{filteredServices.length !== 1 ? 's' : ''}
                {searchQuery && ` for "${searchQuery}"`}
                {categoryFromUrl && !searchQuery && (
                  <>
                    {" "}in <strong>{categoryFromUrl.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</strong>
                    {" "}
                    <Link to="/browse-services" className="clear-category-link">(clear)</Link>
                  </>
                )}
              </>
            )}
          </p>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading services...</p>
          </div>
        ) : error ? (
          <div className="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>{error}</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <p>No services found. Try changing your search.</p>
            {searchQuery && (
              <button
                className="clear-filters"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="services-grid">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BrowseServices

