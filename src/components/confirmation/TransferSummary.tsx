import { TransferPayload } from '@/lib/types'

interface TransferSummaryProps {
  payload: TransferPayload
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3">
      <p className="text-xs font-medium text-text-weak uppercase tracking-wide mb-1">{label}</p>
      <p className="text-sm font-semibold text-text-strong">{value}</p>
    </div>
  )
}

export default function TransferSummary({ payload }: TransferSummaryProps) {
  const { fromAccount, toContact, amount, currency, rate, convertedAmount, date, memo, reference } = payload
  const recipientName = toContact?.name ?? payload.newRecipientName

  return (
    <div className="rounded-xl border border-[rgba(23,37,84,0.1)] bg-surface-brand-soft divide-y divide-[rgba(23,37,84,0.08)] text-sm">
      <Row label="From" value={`${fromAccount.label} ${fromAccount.masked}`} />
      <Row label="To" value={recipientName} />

      <div className="px-4 py-3">
        <p className="text-xs font-medium text-text-weak uppercase tracking-wide mb-1">Amount</p>
        <p className="text-xl font-bold text-text-strong tabular-nums">
          {parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {fromAccount.currency}
        </p>
        {rate && currency !== fromAccount.currency && (
          <p className="text-sm text-text-weak mt-0.5 tabular-nums">
            ≈ {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency} · Fee ${rate.fee.toFixed(2)}
          </p>
        )}
      </div>

      {(date || memo || reference) && (
        <div className="px-4 py-3 space-y-2">
          {date && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-medium text-text-weak uppercase tracking-wide shrink-0">Date</span>
              <span className="text-sm text-text-strong">{date}</span>
            </div>
          )}
          {memo && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-medium text-text-weak uppercase tracking-wide shrink-0">Memo</span>
              <span className="text-sm text-text-strong text-right">{memo}</span>
            </div>
          )}
          {reference && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-medium text-text-weak uppercase tracking-wide shrink-0">Ref</span>
              <span className="text-sm font-mono text-text-strong">{reference}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
