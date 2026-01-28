"use client"

import { useEffect, useRef } from "react"
import "./About.css"

const About = () => {
  const headingRef = useRef(null)
  const contentRef = useRef(null)
  const imageRef = useRef(null)
  const teamSectionRef = useRef(null)

  // Team members data
  const teamMembers = [
    {
      name: "Lungi Khwela",
      position: "Project Founder & Data Engineer",
      initials: "LK",
    },
    {
      name: "Bongani Miya",
      position: "Project Manager",
      initials: "BM",
    },
    {
      name: "Oscar Poco",
      position: "UX/UI Designer & Mobile App Developer",
      initials: "OP",
    },
    {
      name: "Emson Moyo",
      position: "Investor & Business Development",
      initials: "EM",
    },
    {
      name: "Nhlakanipho Radebe",
      position: "Frontend CMS Developer",
      initials: "NR",
    },
    {
      name: "Hanley Nyathi",
      position: "Investor & Business Development",
      initials: "HN",
    },
    {
      name: "Xolile Nxiweni",
      position: "Backend Developer",
      initials: "XN",
    },
  ]

  useEffect(() => {
    // Simple animation on load
    const elements = [headingRef.current, contentRef.current, imageRef.current, teamSectionRef.current]
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

  const scrollTeam = (direction) => {
    const container = document.querySelector(".team-cards-container")
    const scrollAmount = 320 // Approximate card width + gap
    if (container) {
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  return (
    <div className="about-container">
      {/* Decorative bubbles */}
      <div className="bubbles-container">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>
        <div className="bubble bubble-6"></div>
      </div>

      <div className="about-content-wrapper">
        <div className="about-header" ref={headingRef}>
          <h1>
            About <span className="highlight">Us</span>
          </h1>
          <div className="accent-line"></div>
        </div>

        <div className="about-main-content">
          <div className="about-text" ref={contentRef}>
            <p className="about-intro">
              Spana is a two-sided platform that connects customers with verified service providers. Our mobile app
              makes it simple to discover, book and pay trusted professionals, while giving providers one place to
              manage work and grow their business.
            </p>

            <div className="about-details">
              <div className="about-detail-item">
                <div className="detail-icon">
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
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div className="detail-content">
                  <h3>Our Mission</h3>
                  <p>
                    Help people get reliable help, quickly. Spana gives customers an easy way to book trusted providers,
                    and gives providers a steady flow of work they can manage from their phone.
                  </p>
                </div>
              </div>

              <div className="about-detail-item">
                <div className="detail-icon">
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
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="detail-content">
                  <h3>What Spana Offers</h3>
                  <p>
                    For customers: one app to discover, compare and book verified services. For providers: tools to list
                    services, manage bookings, get paid securely and build a reputation with reviews and ratings.
                  </p>
                </div>
              </div>

              <div className="about-detail-item">
                <div className="detail-icon">
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
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z"></path>
                  </svg>
                </div>
                <div className="detail-content">
                  <h3>How It Works</h3>
                  <p>
                    You open the app, choose the service you need, see nearby verified providers, and book in a few
                    taps. Providers receive the request instantly, confirm the job, deliver the service and get paid –
                    all inside Spana.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-image-container" ref={imageRef}>
            <div className="about-image">
              <div className="overlay"></div>
            </div>
            <div className="image-accent"></div>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section" ref={teamSectionRef}>
          <div className="team-header">
            <h2>
              Meet Our <span className="highlight">Team</span>
            </h2>
            <div className="team-nav">
              <button className="team-nav-button" onClick={() => scrollTeam("left")}>
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
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="team-nav-button" onClick={() => scrollTeam("right")}>
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
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="team-cards-wrapper">
            <div className="team-cards-container">
              {teamMembers.map((member, index) => (
                <div className="team-card" key={index}>
                  <div className="team-card-image">
                    <div className="placeholder-avatar">
                      <span>{member.initials}</span>
                    </div>
                    <div className="image-overlay"></div>
                  </div>
                  <div className="team-card-content">
                    <h3>{member.name}</h3>
                    <p>{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
