import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import SummaryCards from './SummaryCards.jsx'

const reviews = [
  {id: 'rev-101', rating: 5},
  {id: 'rev-102', rating: 4},
  {id: 'rev-103', rating: 3},
]

describe('SummaryCards', () => {
  it('shows the total number of reviews', () => {
    render(<SummaryCards reviews={reviews} />)
    expect(screen.getByTestId('total-reviews-card')).toHaveTextContent('3')
  })

  it('shows the average rating', () => {
    render(<SummaryCards reviews={reviews} />)
    expect(screen.getByTestId('average-rating-card')).toHaveTextContent('4.0')
  })

  it('handles an empty list without dividing by zero', () => {
    render(<SummaryCards reviews={[]} />)
    expect(screen.getByTestId('total-reviews-card')).toHaveTextContent('0')
    expect(screen.getByTestId('average-rating-card')).toHaveTextContent('0.0')
  })
})
