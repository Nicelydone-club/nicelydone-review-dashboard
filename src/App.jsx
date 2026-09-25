import {useEffect, useMemo, useState} from 'react'
import {fetchReviews} from './api.js'
import SummaryCards from './components/SummaryCards.jsx'
import ReviewTable from './components/ReviewTable.jsx'

export default function App() {
  const [status, setStatus] = useState('loading') // loading | error | ready
  const [reviews, setReviews] = useState([])
  const [repositoryFilter, setRepositoryFilter] = useState('all')
  const [ratingFilter, setRatingFilter] = useState('all')

  useEffect(() => {
    let active = true
    setStatus('loading')
    fetchReviews()
      .then((data) => {
        if (!active) return
        setReviews(data)
        setStatus('ready')
      })
      .catch(() => {
        if (active) setStatus('error')
      })
    return () => {
      active = false
    }
  }, [])

  const repositories = useMemo(
    () => [...new Set(reviews.map((r) => r.repository))].sort(),
    [reviews],
  )

  const filtered = useMemo(
    () =>
      reviews.filter((r) => {
        if (repositoryFilter !== 'all' && r.repository !== repositoryFilter) return false
        if (ratingFilter !== 'all' && String(r.rating) !== ratingFilter) return false
        return true
      }),
    [reviews, repositoryFilter, ratingFilter],
  )

  if (status === 'loading') {
    return <p data-testid="loading-state">Loading reviews…</p>
  }

  if (status === 'error') {
    return (
      <p data-testid="error-state" role="alert">
        Could not load reviews. Please try again.
      </p>
    )
  }

  return (
    <main>
      <h1>Nicelydone Review Dashboard</h1>

      <SummaryCards reviews={filtered} />

      <div className="filters" style={{display: 'flex', gap: '1rem', margin: '1rem 0'}}>
        <label>
          Repository{' '}
          <select
            data-testid="repository-filter"
            value={repositoryFilter}
            onChange={(e) => setRepositoryFilter(e.target.value)}
          >
            <option value="all">All</option>
            {repositories.map((repo) => (
              <option key={repo} value={repo}>
                {repo}
              </option>
            ))}
          </select>
        </label>

        <label>
          Rating{' '}
          <select
            data-testid="rating-filter"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <option value="all">All</option>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={String(n)}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ReviewTable reviews={filtered} />
    </main>
  )
}
