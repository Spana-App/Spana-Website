"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import API_BASE_URL from "../../../config/api"
import Breadcrumbs from "../../ui/Breadcrumbs/Breadcrumbs"
import "./Careers.css"

const Careers = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    skills: [],
    experienceYears: "",
    motivation: "",
    location: ""
  })
  const [formErrors, setFormErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState([])
  const [documents, setDocuments] = useState([])
  const [uploadingDocs, setUploadingDocs] = useState(false)
  const formRef = useRef(null)
  
  const documentTypes = [
    { id: 'id', label: 'ID Document', required: true },
    { id: 'certificate', label: 'Professional Certificate', required: false },
    { id: 'license', label: 'License', required: false },
    { id: 'other', label: 'Other Document', required: false }
  ]

  const availableSkills = [
    "Plumbing",
    "Electrical",
    "Cleaning",
    "Gardening",
    "HVAC",
    "Painting",
    "Carpentry",
    "Flooring",
    "Roofing",
    "Appliance Repair",
    "General Maintenance",
    "Moving & Logistics"
  ]

  useEffect(() => {
    // Simple animation on load
    if (formRef.current) {
      setTimeout(() => {
        formRef.current.classList.add("animate-in")
      }, 100)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    }
    setSubmitError("")
  }

  const handleSkillToggle = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const handleDocumentChange = async (e, docType) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf']
    if (!validTypes.includes(file.type)) {
      setSubmitError('Please upload only images (JPEG, PNG, GIF) or PDF files')
      return
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setSubmitError('File size must be less than 10MB')
      return
    }

    setUploadingDocs(true)
    setSubmitError("")

    try {
      const formData = new FormData()
      formData.append('documents', file)
      formData.append('types[]', docType)

      const response = await fetch(`${API_BASE_URL}/uploads/application-documents`, {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload document')
      }

      // Add document to documents array
      setDocuments([...documents, ...data.documents])
    } catch (error) {
      console.error('Document upload error:', error)
      setSubmitError(error.message || 'Failed to upload document. Please try again.')
    } finally {
      setUploadingDocs(false)
    }
  }

  const removeDocument = (index) => {
    setDocuments(documents.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required"
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required"
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required"
    }
    if (selectedSkills.length === 0) {
      errors.skills = "Please select at least one skill"
    }
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError("")
    setSubmitSuccess(false)

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch(`${API_BASE_URL}/auth/applications/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          skills: selectedSkills,
          experienceYears: parseInt(formData.experienceYears) || 0,
          motivation: formData.motivation || null,
          location: formData.location || null,
          documents: documents.length > 0 ? documents : null
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit application")
      }

      setSubmitSuccess(true)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        skills: [],
        experienceYears: "",
        motivation: "",
        location: ""
      })
      setSelectedSkills([])
      setDocuments([])
      setFormErrors({})

      // Scroll to success message
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }, 100)
    } catch (error) {
      console.error("Submit application error:", error)
      setSubmitError(error.message || "Failed to submit application. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="careers-page">
      <div className="careers-container">
        <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Careers" }]} />
        {/* Header Section */}
        <div className="careers-header">
          <h1>Join Spana as a Service Provider</h1>
          <p className="careers-subtitle">
            Connect with customers in your area and grow your business. Apply now to become a verified service provider on Spana.
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="careers-success-message">
            <div className="success-icon">✓</div>
            <h2>Application Submitted Successfully!</h2>
            <p>
              Thank you for your interest in joining Spana. We've received your application and will review it shortly.
              You'll receive an email notification once your application has been reviewed.
            </p>
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="careers-error-message">
            <p>{submitError}</p>
          </div>
        )}

        {/* Application Form */}
        {!submitSuccess && (
          <form ref={formRef} className="careers-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Personal Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">
                    First Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={formErrors.firstName ? "error" : ""}
                    placeholder="Enter your first name"
                  />
                  {formErrors.firstName && (
                    <span className="error-message">{formErrors.firstName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">
                    Last Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={formErrors.lastName ? "error" : ""}
                    placeholder="Enter your last name"
                  />
                  {formErrors.lastName && (
                    <span className="error-message">{formErrors.lastName}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={formErrors.email ? "error" : ""}
                    placeholder="your.email@example.com"
                  />
                  {formErrors.email && (
                    <span className="error-message">{formErrors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={formErrors.phone ? "error" : ""}
                    placeholder="+27 12 345 6789"
                  />
                  {formErrors.phone && (
                    <span className="error-message">{formErrors.phone}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Documents & Verification</h2>
              <p className="section-description">
                Please upload your identification and relevant documents. All documents will be verified before approval.
              </p>

              {documentTypes.map((docType) => (
                <div key={docType.id} className="form-group document-upload-group">
                  <label htmlFor={`doc-${docType.id}`}>
                    {docType.label} {docType.required && <span className="required">*</span>}
                  </label>
                  <input
                    type="file"
                    id={`doc-${docType.id}`}
                    accept="image/*,.pdf"
                    onChange={(e) => handleDocumentChange(e, docType.id)}
                    disabled={uploadingDocs}
                    className="document-input"
                  />
                  <small className="file-hint">
                    Accepted formats: JPEG, PNG, GIF, PDF (Max 10MB)
                  </small>
                </div>
              ))}

              {documents.length > 0 && (
                <div className="uploaded-documents">
                  <h3>Uploaded Documents:</h3>
                  <ul className="document-list">
                    {documents.map((doc, index) => (
                      <li key={index} className="document-item">
                        <span className="document-name">{doc.name}</span>
                        <button
                          type="button"
                          onClick={() => removeDocument(index)}
                          className="remove-doc-btn"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="form-section">
              <h2>Professional Information</h2>
              
              <div className="form-group">
                <label>
                  Skills & Services <span className="required">*</span>
                </label>
                <div className="skills-grid">
                  {availableSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      className={`skill-chip ${selectedSkills.includes(skill) ? "selected" : ""}`}
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {skill}
                      {selectedSkills.includes(skill) && <span className="check-icon">✓</span>}
                    </button>
                  ))}
                </div>
                {formErrors.skills && (
                  <span className="error-message">{formErrors.skills}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="experienceYears">
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="experienceYears"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g., 5"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">
                  Service Area / Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Johannesburg, Gauteng"
                />
              </div>

              <div className="form-group">
                <label htmlFor="motivation">
                  Why do you want to join Spana?
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about yourself and why you'd like to become a Spana service provider..."
                />
              </div>
            </div>

            <div className="form-section">
              <div className="form-note">
                <p>
                  <strong>What happens next?</strong>
                </p>
                <ul>
                  <li>We'll review your application and verify your documents</li>
                  <li>If approved, you'll receive an email with instructions to complete your profile</li>
                  <li>Once your profile is complete, you can start receiving bookings</li>
                </ul>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="submit-button"
                disabled={submitting || uploadingDocs}
              >
                {submitting ? "Submitting..." : uploadingDocs ? "Uploading Documents..." : "Submit Application"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Careers
