import { useLocation, useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { TransferPayload } from '@/lib/types'

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

export default function SuccessScreen() {
  const location = useLocation()
  const navigate = useNavigate()
  const payload = (location.state as TransferPayload | null) ?? (import.meta.env.DEV ? PREVIEW_PAYLOAD : null)

  if (!payload) {
    navigate('/form', { replace: true })
    return null
  }

  const recipientName = payload.toContact?.name ?? payload.newRecipientName

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-8 pb-8 space-y-4">
          <div className="text-5xl">✅</div>
          <h1 className="text-2xl font-bold text-text-strong">Transfer Sent!</h1>
          <p className="text-text-weak text-sm">
            <span className="font-medium">${parseFloat(payload.amount).toFixed(2)} {payload.fromAccount.currency}</span> sent to <span className="font-medium">{recipientName}</span>.
            <br />Arrives in 1–2 business days.
          </p>
          <Separator />
          <p className="text-xs text-text-weak">
            Transaction ref: <span className="font-mono">{payload.transactionRef}</span>
          </p>
          <div className="space-y-2 pt-2">
            <Button className="w-full" onClick={() => navigate('/form')}>New Transfer</Button>
            <button
              type="button"
              className="text-sm text-text-weak hover:text-text-strong transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-focus-border rounded py-1"
              onClick={() => {}}
            >
              View transaction history
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
