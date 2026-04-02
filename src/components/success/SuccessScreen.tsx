import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { CircleCheck, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
  const formattedAmount = parseFloat(payload.amount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <div className="flex items-center justify-center p-4 py-8">
      <Card className="w-full max-w-md">
        <CardContent className="pt-10 pb-8 px-8">
          {/* Icon + headline group */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="size-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
              <CircleCheck className="size-7 text-emerald-600" />
            </div>
            <h1 className="text-xl font-semibold text-text-strong mb-1">Transfer Sent</h1>
            <p className="text-sm text-text-weak">Arrives in 1–2 business days</p>
          </div>

          {/* Hero amount */}
          <div className="rounded-xl bg-surface-brand-soft border border-[rgba(23,37,84,0.1)] px-5 py-5 text-center mb-8">
            <p className="text-3xl font-bold text-text-strong tabular-nums tracking-tight mb-1">
              {formattedAmount}
              <span className="text-base font-semibold text-text-weak ml-1.5">{payload.fromAccount.currency}</span>
            </p>
            <p className="text-sm text-text-weak">
              sent to <span className="font-medium text-text-strong">{recipientName}</span>
            </p>
          </div>

          {/* Reference */}
          <p className="text-center text-xs text-text-weak mb-8">
            Ref: <span className="font-mono">{payload.transactionRef}</span>
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <Button className="w-full" onClick={() => navigate('/form')}>
              New Transfer
              <ArrowRight className="size-4" />
            </Button>
            <button
              type="button"
              className="flex items-center justify-center w-full text-sm text-text-weak hover:text-text-strong cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-focus-border rounded py-2"
              onClick={() => toast('This is just a prototype :)', { description: 'Transaction history coming soon!' })}
            >
              View transaction history
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
