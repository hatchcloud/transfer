import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import TransferForm from './TransferForm'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
)

describe('TransferForm', () => {
  it('renders the form with required fields', () => {
    render(<TransferForm />, { wrapper })
    expect(screen.getByText('From')).toBeInTheDocument()
    expect(screen.getByText('To')).toBeInTheDocument()
    expect(screen.getByText('Amount')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /review transfer/i })).toBeInTheDocument()
  })

  it('shows validation errors when submitting empty form', async () => {
    render(<TransferForm />, { wrapper })
    await userEvent.click(screen.getByRole('button', { name: /review transfer/i }))
    expect(await screen.findByText(/please select an account/i)).toBeInTheDocument()
  })

  it('shows advanced fields toggle', () => {
    render(<TransferForm />, { wrapper })
    expect(screen.getByText(/add date, memo/i)).toBeInTheDocument()
  })
})
