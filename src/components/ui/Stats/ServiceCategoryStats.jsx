import { useEffect, useState } from "react"
import API_BASE_URL from "../../../config/api"
import "./ServiceCategoryStats.css"

const ServiceCategoryStats = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/stats/services/categories`)
        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }
        const data = await response.json()
        setCategories(data.categories || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching service categories:', err)
        setError(err.message)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
    // Refresh categories every 10 minutes
    const interval = setInterval(fetchCategories, 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="category-stats">
        <div className="category-stats-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="category-stat-card loading">
              <div className="category-skeleton"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error || !categories || categories.length === 0) {
    return null
  }

  const formatCurrency = (amount) => {
    return `R${parseFloat(amount).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <div className="category-stats">
      <div className="category-stats-header">
        <h3>Service Categories</h3>
        <p>Explore services by category</p>
      </div>
      <div className="category-stats-grid">
        {categories.map((category) => (
          <div key={category.category} className="category-stat-card">
            <div className="category-stat-header">
              <h4>{category.category}</h4>
              <div className="category-stat-badge">
                {category.serviceCount} {category.serviceCount === 1 ? 'Service' : 'Services'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServiceCategoryStats

