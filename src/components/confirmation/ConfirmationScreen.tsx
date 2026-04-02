import { useLocation, useNavigate } from 'react-router-dom'
import { Check, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TransferPayload } from '@/lib/types'
import TransferSummary from './TransferSummary'
import ValidationBanner from '@/components/transfer/ValidationBanner'
import { mockContacts } from '@/data/mockContacts'

const PREVIEW_PAYLOAD: TransferPayload = {
  fromAccountId: 'acc-1', toContactId: 'c-1', isNewRecipient: false,
  newRecipientName: '', newRecipientPhone: '', newRecipientAccountNumber: '',
  amount: '1250.00', currency: 'EUR', date: '2026-03-31',
  memo: 'Invoice INV-2026-001', reference: 'Q1-PROJ',
  fromAccount: { id: 'acc-1', label: 'Checking Account', masked: '•••• 4521', balance: 12450.00, currency: 'USD' },
  toContact: { id: 'c-1', name: 'Alice Johnson', phone: '+506 8845-1234', lastTransfer: '2025-11-15' },
  rate: { from: 'USD', to: 'EUR', rate: 0.921, fee: 2.40 },
  convertedAmount: 1151.25, transactionRef: 'TXN-20260331-7392',
}

export default function ConfirmationScreen() {
  const location = useLocation()
  const navigate = useNavigate()
  const payload = (location.state as TransferPayload | null) ?? (import.meta.env.DEV ? PREVIEW_PAYLOAD : null)

  if (!payload) {
    navigate('/form', { replace: true })
    return null
  }

  const contactId = payload.toContact?.id ?? payload.toContactId
  const knownContact = mockContacts.find(c => c.id === contactId)
  const isFirstTime = knownContact && !knownContact.lastTransfer

  function handleConfirm() {
    navigate('/success', { state: payload })
  }

  return (
    <div className="flex items-center justify-center p-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-text-strong">Review Transfer</CardTitle>
          <p className="text-sm text-text-weak">Please confirm the details below before sending.</p>
        </CardHeader>
        <CardContent className="space-y-5">
          {isFirstTime && <ValidationBanner type="first-time" />}
          <TransferSummary payload={payload} />
          <div className="space-y-3 pt-1">
            <Button
              onClick={handleConfirm}
              className="w-full"
            >
              <Check className="size-4" />
              Confirm &amp; Send
            </Button>
            <button
              type="button"
              className="flex items-center justify-center gap-1.5 w-full text-sm text-text-weak hover:text-text-strong cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-focus-border rounded py-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="size-4" />
              Go back &amp; edit
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
