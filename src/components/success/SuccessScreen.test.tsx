import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import SuccessScreen from './SuccessScreen'
import { TransferPayload } from '@/lib/types'

const mockPayload: TransferPayload = {
  fromAccountId: 'acc-1', toContactId: 'c-1', isNewRecipient: false,
  newRecipientName: '', newRecipientPhone: '', newRecipientAccountNumber: '',
  amount: '250', currency: 'EUR', date: '', memo: '', reference: '',
  fromAccount: { id: 'acc-1', label: 'Checking', masked: '•••4521', balance: 4230, currency: 'USD' },
  toContact: { id: 'c-1', name: 'Maria Santos', phone: '+506 8845-1234', lastTransfer: '2026-03-01' },
  rate: { from: 'USD', to: 'EUR', rate: 0.921, fee: 2.40 },
  convertedAmount: 230.25,
  transactionRef: 'TXN-20260331-8821',
}

function renderWithRouter() {
  return render(
    <MemoryRouter initialEntries={[{ pathname: '/success', state: mockPayload }]}>
      <Routes>
        <Route path="/success" element={<SuccessScreen />} />
        <Route path="/form" element={<div>Form</div>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('SuccessScreen', () => {
  it('shows Transfer Sent heading', () => {
    renderWithRouter()
    expect(screen.getByText(/transfer sent/i)).toBeInTheDocument()
  })
  it('shows transaction reference', () => {
    renderWithRouter()
    expect(screen.getByText('TXN-20260331-8821')).toBeInTheDocument()
  })
  it('shows recipient name', () => {
    renderWithRouter()
    expect(screen.getByText(/Maria Santos/)).toBeInTheDocument()
  })
  it('shows New Transfer button that navigates to /form', async () => {
    renderWithRouter()
    await userEvent.click(screen.getByRole('button', { name: /new transfer/i }))
    expect(await screen.findByText('Form')).toBeInTheDocument()
  })
})
