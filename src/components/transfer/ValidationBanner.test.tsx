import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ValidationBanner from './ValidationBanner'

describe('ValidationBanner', () => {
  it('shows insufficient funds banner', () => {
    render(<ValidationBanner type="insufficient" availableBalance={4230} />)
    expect(screen.getByText(/insufficient funds/i)).toBeInTheDocument()
    expect(screen.getByText(/4,230/)).toBeInTheDocument()
  })

  it('shows first-time recipient warning', () => {
    render(<ValidationBanner type="first-time" />)
    expect(screen.getByText(/first transfer/i)).toBeInTheDocument()
  })

  it('renders nothing when type is null', () => {
    const { container } = render(<ValidationBanner type={null} />)
    expect(container.firstChild).toBeNull()
  })
})
