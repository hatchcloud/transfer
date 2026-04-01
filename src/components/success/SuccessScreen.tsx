import { useLocation, useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { TransferPayload } from '@/lib/types'

export default function SuccessScreen() {
  const location = useLocation()
  const navigate = useNavigate()
  const payload = location.state as TransferPayload | null

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
          <h1 className="text-2xl font-bold text-green-600">Transfer Sent!</h1>
          <p className="text-slate-600 text-sm">
            <span className="font-medium">${parseFloat(payload.amount).toFixed(2)} {payload.fromAccount.currency}</span> sent to <span className="font-medium">{recipientName}</span>.
            <br />Arrives in 1–2 business days.
          </p>
          <Separator />
          <p className="text-xs text-slate-400">
            Transaction ref: <span className="font-mono">{payload.transactionRef}</span>
          </p>
          <div className="space-y-2 pt-2">
            <Button className="w-full" onClick={() => navigate('/form')}>New Transfer</Button>
            <button type="button" className="text-sm text-indigo-500 hover:text-indigo-700" onClick={() => {}}>
              View transaction history
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
