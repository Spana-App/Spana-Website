"use client"

import { useEffect, useState, useRef } from "react"
import API_BASE_URL from "../../../config/api"
import ProviderCard from "../../ui/ProviderCard/ProviderCard"
import "./Providers.css"

const Providers = () => {
  const [providers, setProviders] = useState([])
  const [filteredProviders, setFilteredProviders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [error, setError] = useState(null)
  const headingRef = useRef(null)

  // Fetch providers from API
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true)
        setError(null)
        const params = new URLSearchParams()
        if (selectedCategory) params.append('category', selectedCategory)
        
        const response = await fetch(`${API_BASE_URL}/users/providers?${params}`)
        if (!response.ok) throw new Error('Failed to fetch providers')
        const data = await response.json()
        setProviders(data.providers || [])
        setFilteredProviders(data.providers || [])
      } catch (err) {
        console.error('Error fetching providers:', err)
        setError(err.message)
        setProviders([])
        setFilteredProviders([])
      } finally {
        setLoading(false)
      }
    }

    fetchProviders()
  }, [selectedCategory])

  // Client-side search filter
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProviders(providers)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = providers.filter(provider => {
      const fullName = `${provider.firstName || ""} ${provider.lastName || ""}`.toLowerCase()
      const location = provider.location?.address?.toLowerCase() || ""
      const skills = (provider.skills || []).join(" ").toLowerCase()
      
      return fullName.includes(query) || 
             location.includes(query) ||
             skills.includes(query) ||
             provider.email?.toLowerCase().includes(query)
    })
    setFilteredProviders(filtered)
  }, [searchQuery, providers])

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
    <div className="providers-container">
      {/* Decorative bubbles */}
      <div className="bubbles-container">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
      </div>

      <div className="providers-wrapper">
        <div className="providers-header" ref={headingRef}>
          <h1>
            Provider <span className="highlight">Directory</span>
          </h1>
          <div className="accent-line"></div>
          <p>Browse verified service providers</p>
        </div>

        <div className="providers-filters">
          <div className="search-bar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search providers by name, location, or skills..."
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

          <div className="filter-group">
            <label htmlFor="category-filter-providers">Category</label>
            <select 
              id="category-filter-providers"
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {/* Categories can be populated from API if available */}
            </select>
          </div>
        </div>

        <div className="results-info">
          <p>
            {loading ? (
              "Loading..."
            ) : error ? (
              <span className="error-text">Error loading providers. Please try again later.</span>
            ) : (
              <>
                Showing <strong>{filteredProviders.length}</strong> provider{filteredProviders.length !== 1 ? 's' : ''}
                {searchQuery && ` for "${searchQuery}"`}
              </>
            )}
          </p>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading providers...</p>
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
        ) : filteredProviders.length === 0 ? (
          <div className="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <p>No providers found. Try adjusting your search.</p>
            {(searchQuery || selectedCategory) && (
              <button 
                className="clear-filters"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("")
                }}
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="providers-grid">
            {filteredProviders.map(provider => (
              <ProviderCard key={provider._id || provider.id} provider={provider} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Providers

