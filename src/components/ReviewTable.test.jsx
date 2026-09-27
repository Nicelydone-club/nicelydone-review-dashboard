import {describe, it, expect, vi} from 'vitest'
import {render, screen, fireEvent} from '@testing-library/react'
import ReviewTable from './ReviewTable.jsx'

const reviews = [
  {id: 'rev-101', title: 'Checkout validation', repository: 'nicelydone/checkout-web', author: 'Laura Bennett', rating: 5},
  {id: 'rev-102', title: 'Search result caching', repository: 'nicelydone/search-api', author: 'Jeremy Parker', rating: 4},
]

describe('ReviewTable', () => {
  it('renders a row per review', () => {
    render(<ReviewTable reviews={reviews} onSort={() => {}} />)
    expect(screen.getAllByTestId('review-row')).toHaveLength(2)
    expect(screen.getByText('Checkout validation')).toBeInTheDocument()
  })

  it('shows an empty state when there are no reviews', () => {
    render(<ReviewTable reviews={[]} />)
    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
  })

  it('calls onSort when a column header is clicked', () => {
    const onSort = vi.fn()
    render(<ReviewTable reviews={reviews} onSort={onSort} />)
    fireEvent.click(screen.getByTestId('col-rating'))
    expect(onSort).toHaveBeenCalledWith('rating')
  })
})
