import {useEffect, useMemo, useState} from 'react'
import {fetchReviews} from './api.js'
import SummaryCards from './components/SummaryCards.jsx'
import ReviewTable from './components/ReviewTable.jsx'

export default function App() {
  const [status, setStatus] = useState('loading') // loading | error | ready
  const [reviews, setReviews] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [repositoryFilter, setRepositoryFilter] = useState('all')
  const [ratingFilter, setRatingFilter] = useState('all')
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')

  function load() {
    setStatus('loading')
    fetchReviews()
      .then((data) => {
        setReviews(data)
        setStatus('ready')
      })
      .catch((err) => {
        setErrorMessage(err.message || 'Request failed')
        setStatus('error')
      })
  }

  useEffect(() => {
    load()
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

  // Sorted view of the filtered records.
  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    const copy = [...filtered]
    copy.sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return copy
  }, [sortKey, sortDir])

  const displayed = sortKey ? sorted : filtered

  function handleSort(key) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  function retry() {
    load()
  }

  if (status === 'loading') {
    return <p data-testid="loading-state">Loading reviews…</p>
  }

  return (
    <main>
      <h1>Nicelydone Review Dashboard</h1>

      {errorMessage && (
        <p data-testid="error-state" role="alert">
          Could not load reviews: {errorMessage}
          <button data-testid="retry-button" onClick={retry}>
            Retry
          </button>
        </p>
      )}

      {status === 'ready' && (
        <>
          <SummaryCards reviews={displayed} />

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

          <ReviewTable
            reviews={displayed}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={handleSort}
          />
        </>
      )}
    </main>
  )
}
