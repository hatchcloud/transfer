import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { transferSchema, TransferSchemaType } from '@/lib/transferSchema'
import { mockAccounts } from '@/data/mockAccounts'
import { mockContacts } from '@/data/mockContacts'
import { getRate } from '@/data/mockRates'
import { TransferPayload, Contact } from '@/lib/types'
import AmountField from './AmountField'
import RecipientField from './RecipientField'
import AdvancedFields from './AdvancedFields'
import ValidationBanner from './ValidationBanner'

export default function TransferForm() {
  const navigate = useNavigate()
  const [advancedExpanded, setAdvancedExpanded] = useState(false)

  const { handleSubmit, setValue, watch, formState: { errors } } = useForm<TransferSchemaType>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      fromAccountId: '', toContactId: '', isNewRecipient: false,
      newRecipientName: '', newRecipientEmail: '', newRecipientCountry: '',
      amount: '', currency: 'USD', date: '', memo: '', reference: '',
    },
  })

  const values = watch()
  const selectedAccount = mockAccounts.find(a => a.id === values.fromAccountId)
  const amount = parseFloat(values.amount) || 0
  const isInsufficient = selectedAccount ? amount > selectedAccount.balance : false
  const selectedContact = mockContacts.find(c => c.id === values.toContactId)
  const isFirstTime = selectedContact && !selectedContact.lastTransfer

  function onSubmit(data: TransferSchemaType) {
    if (isInsufficient) return
    const fromAccount = mockAccounts.find(a => a.id === data.fromAccountId)!
    const toContact = data.isNewRecipient
      ? { id: 'new', name: data.newRecipientName, email: data.newRecipientEmail, country: data.newRecipientCountry }
      : mockContacts.find(c => c.id === data.toContactId) ?? null
    const rate = getRate(fromAccount.currency, data.currency)
    const payload: TransferPayload = {
      ...data,
      fromAccount,
      toContact,
      rate,
      convertedAmount: rate ? amount * rate.rate : amount,
      transactionRef: `TXN-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 9000 + 1000)}`,
    }
    navigate('/confirm', { state: payload })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Send Money</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* From account */}
            <div className="space-y-1.5">
              <Label>From</Label>
              <Select value={values.fromAccountId} onValueChange={v => setValue('fromAccountId', v)}>
                <SelectTrigger className={errors.fromAccountId ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {mockAccounts.map(acc => (
                    <SelectItem key={acc.id} value={acc.id}>
                      {acc.label} {acc.masked}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.fromAccountId && (
                <p className="text-xs text-red-500">{errors.fromAccountId.message}</p>
              )}
            </div>

            {/* Recipient */}
            <RecipientField
              value={values.toContactId}
              isNewRecipient={values.isNewRecipient}
              newRecipientName={values.newRecipientName}
              newRecipientEmail={values.newRecipientEmail}
              newRecipientCountry={values.newRecipientCountry}
              onContactSelect={(contact: Contact) => setValue('toContactId', contact.id)}
              onNewRecipientToggle={v => setValue('isNewRecipient', v)}
              onNewRecipientChange={data => {
                if (data.name !== undefined) setValue('newRecipientName', data.name)
                if (data.email !== undefined) setValue('newRecipientEmail', data.email)
                if (data.country !== undefined) setValue('newRecipientCountry', data.country)
              }}
              error={errors.toContactId?.message ?? errors.newRecipientName?.message}
            />

            {/* Amount */}
            <AmountField
              value={values.amount}
              currency={values.currency}
              onAmountChange={v => setValue('amount', v)}
              onCurrencyChange={v => setValue('currency', v)}
              availableBalance={selectedAccount?.balance ?? 0}
              accountCurrency={selectedAccount?.currency ?? 'USD'}
              error={errors.amount?.message}
            />

            {/* Banners */}
            {isInsufficient && (
              <ValidationBanner type="insufficient" availableBalance={selectedAccount?.balance} />
            )}
            {isFirstTime && !isInsufficient && (
              <ValidationBanner type="first-time" />
            )}

            {/* Advanced fields */}
            <AdvancedFields
              expanded={advancedExpanded}
              date={values.date}
              memo={values.memo}
              reference={values.reference}
              onToggle={setAdvancedExpanded}
              onChange={(field, value) => setValue(field, value)}
            />

            <Button type="submit" className="w-full" disabled={isInsufficient}>
              Review Transfer →
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
