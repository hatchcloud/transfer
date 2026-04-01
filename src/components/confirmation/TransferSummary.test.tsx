import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TransferSummary from './TransferSummary'
import { TransferPayload } from '@/lib/types'

const mockPayload: TransferPayload = {
  fromAccountId: 'acc-1', toContactId: 'c-1', isNewRecipient: false,
  newRecipientName: '', newRecipientEmail: '', newRecipientCountry: '',
  amount: '250', currency: 'EUR', date: '2026-03-31', memo: 'Rent', reference: '',
  fromAccount: { id: 'acc-1', label: 'Checking', masked: '•••4521', balance: 4230, currency: 'USD' },
  toContact: { id: 'c-1', name: 'Maria Santos', email: 'maria@example.com', country: 'PT' },
  rate: { from: 'USD', to: 'EUR', rate: 0.921, fee: 2.40 },
  convertedAmount: 230.25,
  transactionRef: 'TXN-20260331-8821',
}

describe('TransferSummary', () => {
  it('shows from account', () => {
    render(<TransferSummary payload={mockPayload} />)
    expect(screen.getByText(/Checking.*4521/)).toBeInTheDocument()
  })
  it('shows recipient name', () => {
    render(<TransferSummary payload={mockPayload} />)
    expect(screen.getByText('Maria Santos')).toBeInTheDocument()
  })
  it('shows amount and currency', () => {
    render(<TransferSummary payload={mockPayload} />)
    expect(screen.getByText(/250.00 USD/)).toBeInTheDocument()
  })
  it('shows memo when provided', () => {
    render(<TransferSummary payload={mockPayload} />)
    expect(screen.getByText('Rent')).toBeInTheDocument()
  })
  it('shows exchange rate and fee', () => {
    render(<TransferSummary payload={mockPayload} />)
    expect(screen.getByText(/230.25 EUR/)).toBeInTheDocument()
  })
})
