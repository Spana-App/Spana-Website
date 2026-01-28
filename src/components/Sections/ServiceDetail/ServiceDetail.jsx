"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API_BASE_URL from "../../../config/api"
import "./ServiceDetail.css"

const ServiceDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const detailRef = useRef(null)

  useEffect(() => {
    const mockServices = {
      "mock-cleaning": {
        id: "mock-cleaning",
        title: "Standard Home Cleaning",
        description:
          "This is example content for a standard home cleaning service. In the live app this would show details from the real service record stored in Spana.",
        price: null,
        duration: 90,
        status: "active",
        adminApproved: true,
      },
      "mock-plumbing": {
        id: "mock-plumbing",
        title: "Emergency Leak Fix",
        description:
          "Example description for an emergency plumbing service. In the live app you would see more detail about what is included and any call-out information.",
        price: null,
        duration: 60,
        status: "active",
        adminApproved: true,
      },
      "mock-electrician": {
        id: "mock-electrician",
        title: "Faulty Plug & Lights Check",
        description:
          "Example description for a small electrical fault-finding service. In production this would be populated from the backend.",
        price: null,
        duration: 60,
        status: "active",
        adminApproved: true,
      },
    }

    const createGenericMock = (serviceId) => {
      const prettyTitle = (serviceId || "Service")
        .toString()
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())

      return {
        id: serviceId,
        title: prettyTitle,
        description:
          "This is example content for this type of service. In the live app this page would show full details loaded from Spana.",
        price: null,
        duration: 60,
        status: "active",
        adminApproved: true,
      }
    }

    // If this is one of the predefined mock services, use local data instead of calling the API
    if (id && mockServices[id]) {
      setService(mockServices[id])
      setError(null)
      setLoading(false)
      return
    }

    const fetchService = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`${API_BASE_URL}/services/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch service")
        }
        const data = await response.json()
        setService(data)
      } catch (err) {
        console.error("Error fetching service:", err)
        // Fallback to a generic mock service instead of showing a hard error
        const fallback = createGenericMock(id)
        setService(fallback)
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchService()
    }
  }, [id])

  // Animation trigger after service loads
  useEffect(() => {
    if (service && detailRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        if (detailRef.current) {
          detailRef.current.classList.add("animate-in")
        }
      }, 50)
    }
  }, [service])

  const formatCurrency = (amount) => {
    if (!amount) return "Price on request"
    return `R${parseFloat(amount).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const handleBookInApp = () => {
    // Deep link to app
    const appScheme = `spana://service/${id}/book`
    window.location.href = appScheme
    setTimeout(() => {
      navigate('/download-app')
    }, 1000)
  }

  if (loading) {
    return (
      <div className="service-detail-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading service details...</p>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="service-detail-container">
        <div className="error-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p>{error || "Service not found"}</p>
          <button onClick={() => navigate('/browse-services')} className="btn-back">
            Back to Browse Services
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="service-detail-container">
      <div className="bubbles-container">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
      </div>

      <div className="service-detail-wrapper" ref={detailRef}>
        <br />
        <br />
        <br />
        {/* <button onClick={() => navigate('/browse-services')} className="btn-back-top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back to Services
        </button> */}

        <div className="service-detail-content">
          {service.mediaUrl && (
            <div className="service-detail-image">
              <img src={service.mediaUrl} alt={service.title} />
            </div>
          )}

          <div className="service-detail-info">
            <div className="service-detail-header">
              <h1>{service.title}</h1>
              {service.status === "active" && service.adminApproved && (
                <span className="verified-badge-large">✓ Verified</span>
              )}
            </div>

            <div className="service-detail-price">
              <span className="price-label">Starting from</span>
              <span className="price-value-large">{formatCurrency(service.price)}</span>
              {service.duration && (
                <span className="duration-badge">{service.duration} minutes</span>
              )}
            </div>

            <div className="service-detail-description">
              <h2>Description</h2>
              <p>{service.description || "No description available."}</p>
            </div>

            {service.provider && (
              <div className="service-provider-section">
                <h2>Service Provider</h2>
                <div className="provider-card-mini">
                  <div className="provider-avatar-mini">
                    {service.provider.profileImage ? (
                      <img src={service.provider.profileImage} alt={`${service.provider.firstName} ${service.provider.lastName}`} />
                    ) : (
                      <div className="avatar-placeholder-mini">
                        {service.provider.firstName?.[0]}{service.provider.lastName?.[0]}
                      </div>
                    )}
                  </div>
                  <div className="provider-info-mini">
                    <h3>{service.provider.firstName} {service.provider.lastName}</h3>
                    {service.provider.rating && (
                      <div className="provider-rating-mini">
                        ⭐ {service.provider.rating.toFixed(1)}
                        {service.provider.totalReviews && (
                          <span>({service.provider.totalReviews} reviews)</span>
                        )}
                      </div>
                    )}
                    {service.provider.skills && service.provider.skills.length > 0 && (
                      <div className="provider-skills-mini">
                        {service.provider.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="skill-tag-mini">{skill}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {service.bookings && (
              <div className="service-stats">
                <div className="stat-item">
                  <span className="stat-value">{service.bookings.total || 0}</span>
                  <span className="stat-label">Total Bookings</span>
                </div>
                {service.bookings.completed && (
                  <div className="stat-item">
                    <span className="stat-value">{service.bookings.completed}</span>
                    <span className="stat-label">Completed</span>
                  </div>
                )}
                {service.bookings.averageRating && (
                  <div className="stat-item">
                    <span className="stat-value">⭐ {service.bookings.averageRating.toFixed(1)}</span>
                    <span className="stat-label">Average Rating</span>
                  </div>
                )}
              </div>
            )}

            <div className="service-detail-actions">
              <button onClick={handleBookInApp} className="btn-book-primary">
                Book This Service
              </button>
              <button onClick={() => navigate('/browse-services')} className="btn-browse-more">
                Browse More Services
              </button>
              <button onClick={() => navigate('/download-app')} className="btn-browse-more">
                Download App
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetail

