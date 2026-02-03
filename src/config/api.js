// API Configuration
// Uses VITE_API_BASE_URL if set, otherwise defaults to production backend

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://spana-server-5bhu.onrender.com'

export default API_BASE_URL
