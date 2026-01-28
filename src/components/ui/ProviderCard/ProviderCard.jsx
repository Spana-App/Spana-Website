import "./ProviderCard.css"

const ProviderCard = ({ provider }) => {
  const handleViewInApp = () => {
    // Deep link to app - adjust scheme based on your app
    const appScheme = `spana://provider/${provider._id || provider.id}`
    const webFallback = `/providers/${provider._id || provider.id}`
    
    // Try to open app, fallback to web
    window.location.href = appScheme
    setTimeout(() => {
      window.location.href = webFallback
    }, 1000)
  }

  return (
    <div className="provider-card">
      <div className="provider-header">
        <div className="provider-avatar">
          {provider.profileImage ? (
            <img src={provider.profileImage} alt={`${provider.firstName} ${provider.lastName}`} />
          ) : (
            <div className="avatar-placeholder">
              {provider.firstName?.[0]}{provider.lastName?.[0]}
            </div>
          )}
          {provider.isVerified && (
            <div className="verified-badge">✓</div>
          )}
        </div>
        <div className="provider-status">
          {provider.isOnline && (
            <span className="online-indicator">Online</span>
          )}
        </div>
      </div>

      <div className="provider-content">
        <h3>{provider.firstName} {provider.lastName}</h3>
        
        {provider.rating && (
          <div className="provider-rating">
            <span className="stars">⭐⭐⭐⭐⭐</span>
            <span className="rating-value">{provider.rating.toFixed(1)}</span>
            {provider.totalReviews && (
              <span className="review-count">({provider.totalReviews} reviews)</span>
            )}
          </div>
        )}

        {provider.location?.address && (
          <div className="provider-location">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{provider.location.address}</span>
          </div>
        )}

        {provider.skills && provider.skills.length > 0 && (
          <div className="provider-skills">
            {provider.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
            {provider.skills.length > 3 && (
              <span className="skill-more">+{provider.skills.length - 3} more</span>
            )}
          </div>
        )}

        {provider.experienceYears && (
          <div className="provider-experience">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>{provider.experienceYears} years experience</span>
          </div>
        )}

        {provider.isProfileComplete && (
          <div className="profile-complete-badge">Complete Profile</div>
        )}
      </div>

      <div className="provider-actions">
        <button onClick={handleViewInApp} className="btn-view-app">
          View in App
        </button>
      </div>
    </div>
  )
}

export default ProviderCard

