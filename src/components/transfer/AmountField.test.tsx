import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AmountField from './AmountField'

const defaultProps = {
  value: '',
  currency: 'USD',
  onAmountChange: vi.fn(),
  onCurrencyChange: vi.fn(),
  availableBalance: 4230,
  accountCurrency: 'USD',
  error: undefined,
}

describe('AmountField', () => {
  it('renders amount input and currency selector', () => {
    render(<AmountField {...defaultProps} />)
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument()
    expect(screen.getByText('USD')).toBeInTheDocument()
  })

  it('shows live exchange rate when currency differs from account currency', () => {
    render(<AmountField {...defaultProps} currency="EUR" />)
    expect(screen.getByText(/1 USD = /)).toBeInTheDocument()
  })

  it('does not show exchange rate when currency matches account currency', () => {
    render(<AmountField {...defaultProps} currency="USD" />)
    expect(screen.queryByText(/1 USD =/)).not.toBeInTheDocument()
  })

  it('shows error message when error prop provided', () => {
    render(<AmountField {...defaultProps} error="Amount must be greater than $0" />)
    expect(screen.getByText('Amount must be greater than $0')).toBeInTheDocument()
  })

  it('calls onAmountChange when user types', async () => {
    const onAmountChange = vi.fn()
    render(<AmountField {...defaultProps} onAmountChange={onAmountChange} />)
    await userEvent.type(screen.getByPlaceholderText('0.00'), '250')
    expect(onAmountChange).toHaveBeenCalled()
  })
})
