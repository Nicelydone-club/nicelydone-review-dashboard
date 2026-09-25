// Reads the review records from nicelydone-review-api.
// The API base URL comes from VITE_API_URL (e.g. http://localhost:3001).

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function fetchReviews() {
  const res = await fetch(`${API_URL}/api/reviews`)
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }
  return res.json()
}
