import { useEffect } from "react"
import "./ComingSoonModal.css"

const ComingSoonModal = ({ isOpen, onClose, variant = "app" }) => {
  const contentMap = {
    social: { title: "Coming Soon", message: "Our social media pages are coming soon. Follow us for updates!" },
    newsletter: { title: "Coming Soon", message: "Newsletter signup is coming soon. We'll notify you when it's ready!" },
    app: { title: "Coming Soon", message: "The Spana app is currently being developed. We'll be available on the App Store and Google Play soon. Stay tuned!" },
  }
  const content = contentMap[variant] || contentMap.app
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleEscape)
    }
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="coming-soon-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="coming-soon-title">
      <div className="coming-soon-modal" onClick={(e) => e.stopPropagation()}>
        <button className="coming-soon-close" onClick={onClose} aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="coming-soon-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v6l4 2"></path>
          </svg>
        </div>
        <h2 id="coming-soon-title">{content.title}</h2>
        <p>{content.message}</p>
        <button className="coming-soon-ok" onClick={onClose}>OK</button>
      </div>
    </div>
  )
}

export default ComingSoonModal
