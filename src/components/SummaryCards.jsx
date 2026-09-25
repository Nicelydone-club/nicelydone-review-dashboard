export default function SummaryCards({reviews}) {
  const total = reviews.length
  const average =
    total === 0 ? 0 : reviews.reduce((sum, r) => sum + Number(r.rating), 0) / total

  return (
    <div className="summary-cards" style={{display: 'flex', gap: '1rem'}}>
      <div className="card" data-testid="total-reviews-card">
        <div className="card-label">Total reviews</div>
        <div className="card-value">{total}</div>
      </div>
      <div className="card" data-testid="average-rating-card">
        <div className="card-label">Average rating</div>
        <div className="card-value">{average.toFixed(1)}</div>
      </div>
    </div>
  )
}
