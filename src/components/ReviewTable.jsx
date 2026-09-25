export default function ReviewTable({reviews}) {
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
          <th>ID</th>
          <th>Title</th>
          <th>Repository</th>
          <th>Author</th>
          <th>Rating</th>
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
