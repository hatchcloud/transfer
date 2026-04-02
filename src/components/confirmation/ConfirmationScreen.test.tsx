import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ConfirmationScreen from './ConfirmationScreen'
import { TransferPayload } from '@/lib/types'

const mockPayload: TransferPayload = {
  fromAccountId: 'acc-1', toContactId: 'c-1', isNewRecipient: false,
  newRecipientName: '', newRecipientPhone: '', newRecipientAccountNumber: '',
  amount: '250', currency: 'EUR', date: '2026-03-31', memo: 'Rent', reference: '',
  fromAccount: { id: 'acc-1', label: 'Checking', masked: '•••4521', balance: 4230, currency: 'USD' },
  toContact: { id: 'c-1', name: 'Maria Santos', phone: '+506 8845-1234' },
  rate: { from: 'USD', to: 'EUR', rate: 0.921, fee: 2.40 },
  convertedAmount: 230.25,
  transactionRef: 'TXN-20260331-8821',
}

function renderWithRouter(payload = mockPayload) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: '/confirm', state: payload }]}>
      <Routes>
        <Route path="/confirm" element={<ConfirmationScreen />} />
        <Route path="/success" element={<div>Success</div>} />
        <Route path="/form" element={<div>Form</div>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ConfirmationScreen', () => {
  it('renders Confirm & Send button', () => {
    renderWithRouter()
    expect(screen.getByRole('button', { name: /confirm & send/i })).toBeInTheDocument()
  })
  it('renders go back link', () => {
    renderWithRouter()
    expect(screen.getByText(/go back/i)).toBeInTheDocument()
  })
  it('shows transfer summary', () => {
    renderWithRouter()
    expect(screen.getByText('Maria Santos')).toBeInTheDocument()
  })
  it('shows first-time recipient warning when applicable', () => {
    const firstTimePayload = { ...mockPayload, toContact: { id: 'c-4', name: 'Sofia Müller', phone: '+506 8845-1234' } }
    render(
      <MemoryRouter initialEntries={[{ pathname: '/confirm', state: firstTimePayload }]}>
        <Routes><Route path="/confirm" element={<ConfirmationScreen />} /></Routes>
      </MemoryRouter>
    )
    expect(screen.getByText(/first transfer/i)).toBeInTheDocument()
  })
  it('navigates to /success on confirm', async () => {
    renderWithRouter()
    await userEvent.click(screen.getByRole('button', { name: /confirm & send/i }))
    expect(await screen.findByText('Success')).toBeInTheDocument()
  })
})
