import { useLocation, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TransferPayload } from '@/lib/types'
import TransferSummary from './TransferSummary'
import ValidationBanner from '@/components/transfer/ValidationBanner'
import { mockContacts } from '@/data/mockContacts'

export default function ConfirmationScreen() {
  const location = useLocation()
  const navigate = useNavigate()
  const payload = location.state as TransferPayload | null

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Review Transfer</CardTitle>
          <p className="text-sm text-slate-500">Please confirm the details below before sending.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {isFirstTime && <ValidationBanner type="first-time" />}
          <TransferSummary payload={payload} />
          <Button onClick={handleConfirm} className="w-full bg-green-600 hover:bg-green-700">
            ✓ Confirm &amp; Send
          </Button>
          <div className="text-center">
            <button type="button" className="text-sm text-indigo-500 hover:text-indigo-700" onClick={() => navigate(-1)}>
              ← Go back &amp; edit
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
