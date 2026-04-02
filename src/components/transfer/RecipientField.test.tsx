import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RecipientField from './RecipientField'

const defaultProps = {
  value: '',
  isNewRecipient: false,
  newRecipientName: '',
  newRecipientPhone: '',
  newRecipientAccountNumber: '',
  onContactSelect: vi.fn(),
  onNewRecipientToggle: vi.fn(),
  onNewRecipientChange: vi.fn(),
  error: undefined,
}

describe('RecipientField', () => {
  it('renders search input', () => {
    render(<RecipientField {...defaultProps} />)
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument()
  })

  it('shows "+ Add new recipient" link', () => {
    render(<RecipientField {...defaultProps} />)
    expect(screen.getByText(/add new recipient/i)).toBeInTheDocument()
  })

  it('shows new recipient form when isNewRecipient is true', () => {
    render(<RecipientField {...defaultProps} isNewRecipient={true} />)
    expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
  })

  it('hides new recipient form when isNewRecipient is false', () => {
    render(<RecipientField {...defaultProps} isNewRecipient={false} />)
    expect(screen.queryByPlaceholderText(/full name/i)).not.toBeInTheDocument()
  })

  it('shows error message when error prop provided', () => {
    render(<RecipientField {...defaultProps} error="Please select a recipient" />)
    expect(screen.getByText('Please select a recipient')).toBeInTheDocument()
  })

  it('filters contacts by search term', async () => {
    render(<RecipientField {...defaultProps} />)
    await userEvent.type(screen.getByPlaceholderText(/search/i), 'Maria')
    expect(screen.getByText('Maria Santos')).toBeInTheDocument()
  })
})
