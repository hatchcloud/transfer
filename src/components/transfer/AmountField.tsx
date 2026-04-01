import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
          className={error ? 'border-red-500' : ''}
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
        <p className="text-xs text-slate-500">
          1 {accountCurrency} = {rate.rate} {currency}
          {amount > 0 && ` · You send ≈ ${(amount * rate.rate).toFixed(2)} ${currency}`}
          {` · Fee: $${rate.fee.toFixed(2)}`}
        </p>
      )}

      {!error && (
        <p className="text-xs text-green-600">
          Available: ${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
