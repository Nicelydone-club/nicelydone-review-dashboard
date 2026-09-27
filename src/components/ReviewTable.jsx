const COLUMNS = [
  {key: 'id', label: 'ID'},
  {key: 'title', label: 'Title'},
  {key: 'repository', label: 'Repository'},
  {key: 'author', label: 'Author'},
  {key: 'rating', label: 'Rating'},
]

export default function ReviewTable({reviews, sortKey, sortDir, onSort}) {
  if (reviews.length === 0) {
    return (
      <p data-testid="empty-state" className="empty-state">
        No reviews match the current filters.
      </p>
    )
  }

  return (
    <table data-testid="review-table">
      <thead>
        <tr>
          {COLUMNS.map((col) => (
            <th
              key={col.key}
              data-testid={`col-${col.key}`}
              onClick={() => onSort?.(col.key)}
              style={{cursor: 'pointer'}}
            >
              {col.label}
              {sortKey === col.key ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {reviews.map((review) => (
          <tr key={review.id} data-testid="review-row">
            <td>{review.id}</td>
            <td>{review.title}</td>
            <td>{review.repository}</td>
            <td>{review.author}</td>
            <td>{review.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
