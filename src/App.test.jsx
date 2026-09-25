import {describe, it, expect, vi, beforeEach} from 'vitest'
import {render, screen, waitFor} from '@testing-library/react'
import App from './App.jsx'
import {fetchReviews} from './api.js'

vi.mock('./api.js', () => ({fetchReviews: vi.fn()}))

const seed = [
  {id: 'rev-101', title: 'Checkout validation', repository: 'nicelydone/checkout-web', author: 'Laura Bennett', rating: 5},
  {id: 'rev-102', title: 'Search result caching', repository: 'nicelydone/search-api', author: 'Jeremy Parker', rating: 4},
  {id: 'rev-103', title: 'Webhook retry policy', repository: 'nicelydone/notifications', author: 'Alice Morgan', rating: 3},
]

beforeEach(() => vi.clearAllMocks())

describe('App states', () => {
  it('shows a loading state first', () => {
    fetchReviews.mockReturnValue(new Promise(() => {}))
    render(<App />)
    expect(screen.getByTestId('loading-state')).toBeInTheDocument()
  })

  it('shows the populated table and cards', async () => {
    fetchReviews.mockResolvedValue(seed)
    render(<App />)
    await waitFor(() => expect(screen.getByTestId('review-table')).toBeInTheDocument())
    expect(screen.getAllByTestId('review-row')).toHaveLength(3)
    expect(screen.getByTestId('total-reviews-card')).toHaveTextContent('3')
  })

  it('shows a request-error state when the API fails', async () => {
    fetchReviews.mockRejectedValue(new Error('boom'))
    render(<App />)
    await waitFor(() => expect(screen.getByTestId('error-state')).toBeInTheDocument())
  })

  it('shows an empty state when the API returns no records', async () => {
    fetchReviews.mockResolvedValue([])
    render(<App />)
    await waitFor(() => expect(screen.getByTestId('empty-state')).toBeInTheDocument())
  })
})
