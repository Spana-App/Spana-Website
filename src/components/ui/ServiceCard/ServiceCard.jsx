import { Link, useNavigate } from "react-router-dom"
import "./ServiceCard.css"

const ServiceCard = ({ service }) => {
  const navigate = useNavigate()

  const formatCurrency = (amount) => {
    if (!amount) return "Price on request"
    return `R${parseFloat(amount).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const handleBookInApp = (e) => {
    e.preventDefault()
    // Try deep link into the app
    const appScheme = `spana://service/${service.id}`
    window.location.href = appScheme

    // After a short delay, send the user to the download page in case the app isn't installed
    setTimeout(() => {
      navigate('/download-app')
    }, 1000)
  }

  return (
    <div className="service-card">
      {service.mediaUrl && (
        <div className="service-image">
          <img src={service.mediaUrl} alt={service.title} />
        </div>
      )}
      
      <div className="service-card-content">
        <div className="service-header">
          <h3>{service.title || "Untitled Service"}</h3>
          {service.status === "active" && service.adminApproved && (
            <span className="verified-badge">✓ Verified</span>
          )}
        </div>
        
        <p className="service-description">
          {service.description || "No description available."}
        </p>
        
        <div className="service-meta">
          <div className="service-price">
            <span className="price-label">From</span>
            <span className="price-value">{formatCurrency(service.price)}</span>
          </div>
          {service.duration && (
            <div className="service-duration">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {service.duration} min
            </div>
          )}
        </div>

        {service.provider && (
          <div className="service-provider-info">
            <div className="provider-name">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>{service.provider.firstName} {service.provider.lastName}</span>
            </div>
            {service.provider.rating && (
              <div className="provider-rating">
                ⭐ {service.provider.rating.toFixed(1)}
                {service.provider.totalReviews && (
                  <span>({service.provider.totalReviews})</span>
                )}
              </div>
            )}
          </div>
        )}

        <div className="service-actions">
          <Link to={`/services/${service.id}`} className="btn-learn-more">
            View Details
          </Link>
          <button onClick={handleBookInApp} className="btn-book-app">
            Book in App
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard

