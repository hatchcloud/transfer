import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdvancedFields from './AdvancedFields'

const defaultProps = {
  expanded: false,
  date: '',
  memo: '',
  reference: '',
  onToggle: vi.fn(),
  onChange: vi.fn(),
}

describe('AdvancedFields', () => {
  it('shows expand toggle when collapsed', () => {
    render(<AdvancedFields {...defaultProps} />)
    expect(screen.getByText(/add date, memo/i)).toBeInTheDocument()
  })

  it('hides date, memo, reference inputs when collapsed', () => {
    render(<AdvancedFields {...defaultProps} />)
    expect(screen.queryByLabelText(/memo/i)).not.toBeInTheDocument()
  })

  it('shows date, memo, reference when expanded', () => {
    render(<AdvancedFields {...defaultProps} expanded={true} />)
    expect(screen.getByLabelText(/memo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/reference/i)).toBeInTheDocument()
  })

  it('shows collapse toggle when expanded', () => {
    render(<AdvancedFields {...defaultProps} expanded={true} />)
    expect(screen.getByText(/hide/i)).toBeInTheDocument()
  })

  it('calls onToggle when expand link clicked', async () => {
    const onToggle = vi.fn()
    render(<AdvancedFields {...defaultProps} onToggle={onToggle} />)
    await userEvent.click(screen.getByText(/add date, memo/i))
    expect(onToggle).toHaveBeenCalledWith(true)
  })
})
