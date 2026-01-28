import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import "./HowItWorks.css"

const howItWorksSections = [
  {
    id: 1,
    key: "plumbing",
    title: "Plumbing & Electrical",
    summary:
      "Sort out common plumbing and electrical issues without the back-and-forth. Spana automatically sends your job to a verified provider who can get things working again.",
    examples: ["Burst or leaking geysers", "Leaking taps and pipes", "Plugs that keep tripping", "No lights in part of the house"],
  },
  {
    id: 2,
    key: "cleaning",
    title: "Cleaning Services",
    summary:
      "From once-off deep cleans to regular weekly help, Spana matches you with cleaners who can keep your spaces looking good on your schedule.",
    examples: ["Once-off deep cleans", "Regular weekly or monthly cleaning", "Move-in / move-out tidy-ups", "Small office or shared spaces"],
  },
  {
    id: 3,
    key: "gardening",
    title: "Landscaping & Gardening",
    summary:
      "Keep the outside as tidy as the inside. Spana connects you with people to handle grass cutting, trimming and general garden clean-ups.",
    examples: ["Grass cutting and edging", "Tree and hedge trimming", "Garden clean-ups", "Small landscaping touch-ups"],
  },
  {
    id: 4,
    key: "repairs",
    title: "Home Repairs & Maintenance",
    summary:
      "Handle the small fixes that pile up – doors, cupboards, paint and other day-to-day repair work – by sending them straight to reliable handypeople via Spana.",
    examples: ["Doors that don’t close properly", "Cupboards and shelves that need fixing", "Patching and repainting small areas", "Minor repair work inside the house"],
  },
  {
    id: 5,
    key: "security",
    title: "Security & Access",
    summary:
      "Get help with locks, remotes and basic home access issues so it’s easier to feel safe at home, without phoning around.",
    examples: ["New or changed locks", "Gate and garage remotes", "Basic home security checks", "Minor access control issues"],
  },
  {
    id: 6,
    key: "appliances",
    title: "Appliance Help",
    summary:
      "When everyday appliances stop working properly, Spana routes your job to providers who can assess and fix common issues.",
    examples: ["Washing machines that won’t spin or drain", "Fridges and freezers not cooling", "Stoves and ovens not heating evenly", "Kettles, microwaves and other small appliances"],
  },
]

const HowItWorks = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialId = Number(searchParams.get("service")) || 1
  const [activeId, setActiveId] = useState(initialId)

  const activeSection = useMemo(
    () => howItWorksSections.find((s) => s.id === activeId) || howItWorksSections[0],
    [activeId]
  )

  const handleSelect = (id) => {
    setActiveId(id)
    setSearchParams({ service: String(id) })
  }

  return (
    <div className="howitworks-container">
      <div className="bubbles-container">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
      </div>

      <div className="howitworks-content-wrapper">
        <header className="howitworks-header">
          <h1>
            How <span className="highlight">Spana</span> Works
          </h1>
          <div className="accent-line" />
          <p>
            Every booking in Spana follows the same simple flow. You log the job, Spana automatically assigns an online,
            verified provider nearby, and you track everything from your phone.
          </p>
        </header>

        <div className="howitworks-layout">
          <aside className="howitworks-sidebar">
            {howItWorksSections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`howitworks-tab ${section.id === activeSection.id ? "active" : ""}`}
                onClick={() => handleSelect(section.id)}
              >
                {section.title}
              </button>
            ))}
          </aside>

          <section className="howitworks-detail">
            <article className="howitworks-card">
              <h2>{activeSection.title}</h2>
              <p className="howitworks-summary">{activeSection.summary}</p>

              {activeSection.examples && (
                <div className="howitworks-examples">
                  <h3>Typical jobs</h3>
                  <ul>
                    {activeSection.examples.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          </section>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks

