import { ArrowLeftRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FieldError } from '@/components/ui/field-error'
import { currencies, getRate } from '@/data/mockRates'

interface AmountFieldProps {
  value: string
  currency: string
  onAmountChange: (value: string) => void
  onCurrencyChange: (value: string) => void
  availableBalance: number
  accountCurrency: string
  error?: string
}

export default function AmountField({
  value, currency, onAmountChange, onCurrencyChange,
  availableBalance, accountCurrency, error,
}: AmountFieldProps) {
  const rate = currency !== accountCurrency ? getRate(accountCurrency, currency) : null
  const amount = parseFloat(value) || 0

  return (
    <div className="space-y-1.5">
      <Label htmlFor="amount">Amount</Label>
      <div className="flex gap-2">
        <Input
          id="amount"
          placeholder="0.00"
          value={value}
          onChange={e => onAmountChange(e.target.value)}
          aria-invalid={!!error}
          type="number"
          min="0"
          step="0.01"
        />
        <Select value={currency} onValueChange={onCurrencyChange}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {currencies.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {rate && (
        <div className="rounded-lg border border-[rgba(23,37,84,0.1)] bg-surface-brand-soft px-4 py-3 space-y-2">
          {amount > 0 && (
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm text-text-weak">You send</span>
              <span className="text-xl font-bold text-text-strong tabular-nums">
                {(amount * rate.rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-text-weak">
              <ArrowLeftRight className="size-3 shrink-0" />
              1 {accountCurrency} = {rate.rate.toLocaleString()} {currency}
            </span>
            <span className="text-xs text-text-weak">Fee ${rate.fee.toFixed(2)}</span>
          </div>
        </div>
      )}

      {!error && (
        <p className="text-sm text-text-weak">
          Available: ${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      )}

      {error && <FieldError message={error} />}
    </div>
  )
}
