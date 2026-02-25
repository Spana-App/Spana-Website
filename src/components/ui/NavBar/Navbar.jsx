
import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import spanaLogo from "../../../assets/Attached_image.png"
import "./Navbar.css"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("Home")
  const navRef = useRef(null)
  const scrollTargetRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    // Animate bubbles
    const bubbles = document.querySelectorAll(".nav-bubble")
    bubbles.forEach((bubble) => {
      setInterval(() => {
        const xPos = Math.random() * 10 - 5
        const yPos = Math.random() * 10 - 5
        bubble.style.transform = `translate(${xPos}px, ${yPos}px)`
      }, 3000)
    })

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle active link based on route changes
  useEffect(() => {
    const path = location.pathname
    if (path === '/browse-services') {
      setActiveLink('Browse')
    } else if (path === '/providers') {
      setActiveLink('Providers')
    } else if (path === '/download-app') {
      setActiveLink('Download')
    } else if (path === '/careers') {
      setActiveLink('Careers')
    } else if (path.startsWith('/services/')) {
      setActiveLink('Services')
    } else if (path === '/') {
      // On homepage, will be handled by scroll detection
      // Set initial state based on hash if present
      const hash = location.hash.replace('#', '')
      if (hash) {
        setActiveLink(hash)
      } else {
        setActiveLink('Home')
      }
    } else {
      setActiveLink('')
    }
  }, [location.pathname, location.hash])

  // When we navigate back to "/", scroll to the requested section (if any)
  useEffect(() => {
    if (location.pathname === '/' && scrollTargetRef.current) {
      const sectionId = scrollTargetRef.current
      scrollTargetRef.current = null

      // Give React a moment to render the sections
      setTimeout(() => {
        const section = document.getElementById(sectionId)
        if (section) {
          const navbarHeight = 80
          const rect = section.getBoundingClientRect()
          const offsetTop = rect.top + window.pageYOffset - navbarHeight
          window.scrollTo({ top: offsetTop, behavior: 'smooth' })
        }
      }, 50)
    }
  }, [location.pathname])

  // Handle active link based on scroll position (only on homepage)
  useEffect(() => {
    // Only run scroll detection on homepage
    if (location.pathname !== '/') {
      return
    }

    const sections = ['Home', 'About', 'Services', 'Partners', 'Connect']
    const navbarHeight = 80 // Approximate navbar height
    
    const handleScrollActive = () => {
      const scrollPosition = window.scrollY + navbarHeight + 50
      let activeSection = 'Home'
      let maxVisible = 0
      
      // Check each section to see how much is visible
      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId)
        if (section) {
          const rect = section.getBoundingClientRect()
          const sectionTop = rect.top + window.scrollY
          const sectionBottom = sectionTop + rect.height
          
          // Calculate how much of the section is visible in the viewport
          const viewportTop = window.scrollY
          const viewportBottom = window.scrollY + window.innerHeight
          
          const visibleTop = Math.max(sectionTop, viewportTop)
          const visibleBottom = Math.min(sectionBottom, viewportBottom)
          const visibleHeight = Math.max(0, visibleBottom - visibleTop)
          
          // If section is near the top of viewport and has significant visibility
          if (rect.top <= navbarHeight + 100 && rect.bottom >= navbarHeight) {
            if (visibleHeight > maxVisible) {
              maxVisible = visibleHeight
              activeSection = sectionId
            }
          }
        }
      })
      
      // Special case: if at the very top, always set Home
      if (window.scrollY < 50) {
        activeSection = 'Home'
      }
      
      setActiveLink(activeSection)
    }

    // Initial check after a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      handleScrollActive()
    }, 100)

    // Use IntersectionObserver for more accurate detection
    const observers = []
    const sectionVisibility = new Map()
    
    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId)
      if (section) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              sectionVisibility.set(sectionId, {
                isIntersecting: entry.isIntersecting,
                intersectionRatio: entry.intersectionRatio,
                boundingClientRect: entry.boundingClientRect
              })
              
              // Find the section with the highest intersection ratio that's near the top
              let bestSection = 'Home'
              let bestScore = 0
              
              sectionVisibility.forEach((data, id) => {
                if (data.isIntersecting) {
                  // Score based on intersection ratio and position
                  const rect = data.boundingClientRect
                  const positionScore = rect.top <= navbarHeight + 150 ? 1 : 0.5
                  const score = data.intersectionRatio * positionScore
                  
                  if (score > bestScore) {
                    bestScore = score
                    bestSection = id
                  }
                }
              })
              
              // Special case: if at the very top, always set Home
              if (window.scrollY < 50) {
                bestSection = 'Home'
              }
              
              setActiveLink(bestSection)
            })
          },
          {
            root: null,
            rootMargin: `-${navbarHeight + 20}px 0px -60% 0px`,
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
          }
        )
        observer.observe(section)
        observers.push(observer)
      }
    })

    // Also listen to scroll for immediate feedback
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScrollActive()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      clearTimeout(timeoutId)
      observers.forEach((observer) => observer.disconnect())
      window.removeEventListener('scroll', onScroll)
    }
  }, [location.pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Prevent body scroll when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  const closeMenu = (linkName) => {
    setIsMenuOpen(false)
    document.body.style.overflow = "auto"
    if (linkName) setActiveLink(linkName)
  }

  const scrollToSection = (sectionId) => {
    const navbarHeight = 80
    const section = document.getElementById(sectionId)
    if (section) {
      const rect = section.getBoundingClientRect()
      const offsetTop = rect.top + window.pageYOffset - navbarHeight
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  const handleSectionClick = (sectionId) => {
    closeMenu(sectionId)

    // If we're not on the homepage, navigate there first, then scroll
    if (location.pathname !== '/') {
      scrollTargetRef.current = sectionId
      navigate('/')
      return
    }

    // Already on homepage – just scroll
    scrollToSection(sectionId)
  }

  return (
    <nav className={`navbar ${isMenuOpen ? "active" : ""} ${scrolled ? "scrolled" : ""}`} ref={navRef}>
      {/* Decorative bubbles */}
      <div className="nav-bubbles-container">
        <div className="nav-bubble bubble-1"></div>
        <div className="nav-bubble bubble-2"></div>
        <div className="nav-bubble bubble-3"></div>
      </div>

      <div className="navbar-container">
        <div className="navbar-logo">
          <a
            href="#Home"
            onClick={(e) => {
              e.preventDefault()
              handleSectionClick('Home')
            }}
          >
            <img src={spanaLogo} alt="Spana logo" className="navbar-logo-image" />
          </a>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span className="span-one"></span>
          <span className="span-two"></span>
          <span className="span-three"></span>
        </div>

        <div className="navbar-links-container">
          <ul className="navbar-links">
            <li className={`navbar-link ${activeLink === "Home" ? "active" : ""}`}>
              <a
                href="#Home"
                onClick={(e) => {
                  e.preventDefault()
                  handleSectionClick('Home')
                }}
              >
                <span className="link-text">Home</span>
              </a>
            </li>

            <li className={`navbar-link ${activeLink === "About" ? "active" : ""}`}>
              <a
                href="#About"
                onClick={(e) => {
                  e.preventDefault()
                  handleSectionClick('About')
                }}
              >
                <span className="link-text">About</span>
              </a>
            </li>

            <li className={`navbar-link ${activeLink === "Services" ? "active" : ""}`}>
              <a
                href="#Services"
                onClick={(e) => {
                  e.preventDefault()
                  handleSectionClick('Services')
                }}
              >
                <span className="link-text">Services</span>
              </a>
            </li>

            

            {/* Providers nav item temporarily hidden */}
            {false && (
              <li className={`navbar-link ${activeLink === "Providers" ? "active" : ""}`}>
                <Link to="/providers" onClick={() => closeMenu("Providers")}>
                  <span className="link-text">Providers</span>
                </Link>
              </li>
            )}

            <li className={`navbar-link ${activeLink === "Partners" ? "active" : ""}`}>
              <a
                href="#Partners"
                onClick={(e) => {
                  e.preventDefault()
                  handleSectionClick('Partners')
                }}
              >
                <span className="link-text">Partners</span>
              </a>
            </li>

            <li className={`navbar-link ${activeLink === "Browse" ? "active" : ""}`}>
              <Link to="/browse-services" onClick={() => closeMenu("Browse")}>
                <span className="link-text">Browse Services</span>
              </Link>
            </li>

            <li className={`navbar-link ${activeLink === "Careers" ? "active" : ""}`}>
              <Link to="/careers" onClick={() => closeMenu("Careers")}>
                <span className="link-text">Become A Service Provider</span>
              </Link>
            </li>

          {/* <li className={`navbar-link ${activeLink === "Download" ? "active" : ""}`}>
            <Link to="/download-app" onClick={() => closeMenu("Download")}>
              <span className="link-text">Download App</span>
            </Link>
          </li> */}

            <li className="navbar-cta">
              <a
                href="#Connect"
                onClick={(e) => {
                  e.preventDefault()
                  handleSectionClick('Connect')
                }}
                className="contact-button"
              >
                <span>Contact Us</span>
                <div className="button-icon">
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
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu-content">
          <ul className="mobile-links">
            <li className={`mobile-link ${activeLink === "Home" ? "active" : ""}`}>
              <a
                href="#Home"
                onClick={(e) => {
                  e.preventDefault()
                  handleSectionClick('Home')
                }}
              >
                <span className="link-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
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
                </span>
                <span>Home</span>
              </a>
            </li>

            <li className={`mobile-link ${activeLink === "About" ? "active" : ""}`}>
              <a
                href="#About"
                onClick={(e) => {
                  e.preventDefault()
                  handleSectionClick('About')
                }}
              >
                <span className="link-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                </span>
                <span>About</span>
              </a>
            </li>

            <li className={`mobile-link ${activeLink === "Services" ? "active" : ""}`}>
              <a
                href="#Services"
                onClick={(e) => {
                  e.preventDefault()
                  handleSectionClick('Services')
                }}
              >
                <span className="link-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </span>
                <span>Services</span>
              </a>
            </li>

            <li className={`mobile-link ${activeLink === "Browse" ? "active" : ""}`}>
              <Link to="/browse-services" onClick={() => closeMenu("Browse")}>
                <span className="link-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </span>
                <span>Browse Services</span>
              </Link>
            </li>

            <li className={`mobile-link ${activeLink === "Careers" ? "active" : ""}`}>
              <Link to="/careers" onClick={() => closeMenu("Careers")}>
                <span className="link-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <path d="M20 8v6"></path>
                    <path d="M23 11h-6"></path>
                  </svg>
                </span>
                <span>Careers</span>
              </Link>
            </li>

            {/* Providers mobile nav item temporarily hidden */}
            {false && (
              <li className={`mobile-link ${activeLink === "Providers" ? "active" : ""}`}>
                <Link to="/providers" onClick={() => closeMenu("Providers")}>
                  <span className="link-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </span>
                  <span>Providers</span>
                </Link>
              </li>
            )}

            <li className={`mobile-link ${activeLink === "Partners" ? "active" : ""}`}>
              <a
                href="#Partners"
                onClick={(e) => {
                  e.preventDefault()
                  handleSectionClick('Partners')
                }}
              >
                <span className="link-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z"></path>
                  </svg>
                </span>
                <span>Partners</span>
              </a>
            </li>

            <li className={`mobile-link ${activeLink === "Download" ? "active" : ""}`}>
              <Link to="/download-app" onClick={() => closeMenu("Download")}>
                <span className="link-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </span>
                <span>Download App</span>
              </Link>
            </li>

            <li className={`mobile-link ${activeLink === "Connect" ? "active" : ""}`}>
              <a
                href="#Connect"
                onClick={(e) => {
                  e.preventDefault()
                  handleSectionClick('Connect')
                }}
              >
                <span className="link-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </span>
                <span>Contact</span>
              </a>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
