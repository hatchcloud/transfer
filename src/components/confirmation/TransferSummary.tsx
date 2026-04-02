import { ArrowLeftRight } from 'lucide-react'
import { TransferPayload } from '@/lib/types'

interface TransferSummaryProps {
  payload: TransferPayload
}

export default function TransferSummary({ payload }: TransferSummaryProps) {
  const { fromAccount, toContact, amount, currency, rate, convertedAmount, date, memo, reference } = payload
  const recipientName = toContact?.name ?? payload.newRecipientName
  const recipientDetail = toContact?.phone ?? toContact?.accountNumber

  return (
    <div className="rounded-xl border border-[rgba(23,37,84,0.1)] bg-surface-brand-soft overflow-hidden">
      {/* Hero amount */}
      <div className="px-5 pt-5 pb-4">
        <p className="text-xs font-medium text-text-weak uppercase tracking-wider mb-2">You're sending</p>
        <p className="text-3xl font-bold text-text-strong tabular-nums tracking-tight">
          {parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          <span className="text-lg font-semibold text-text-weak ml-1.5">{fromAccount.currency}</span>
        </p>
        {rate && currency !== fromAccount.currency && (
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1.5 text-xs text-text-weak">
              <ArrowLeftRight className="size-3 shrink-0" />
              {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}
            </span>
            <span className="text-xs text-text-weak">Fee ${rate.fee.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Key details */}
      <div className="border-t border-[rgba(23,37,84,0.08)] px-5 py-4 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-text-weak">From</span>
          <span className="text-sm font-medium text-text-strong text-right">{fromAccount.label} {fromAccount.masked}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="text-sm text-text-weak shrink-0">To</span>
          <div className="text-right">
            <span className="text-sm font-medium text-text-strong">{recipientName}</span>
            {recipientDetail && (
              <p className="text-xs text-text-weak mt-0.5">{recipientDetail}</p>
            )}
          </div>
        </div>
      </div>

      {/* Optional details */}
      {(date || memo || reference) && (
        <div className="border-t border-[rgba(23,37,84,0.08)] px-5 py-4 space-y-2.5">
          {date && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-text-weak">Date</span>
              <span className="text-sm text-text-strong">{date}</span>
            </div>
          )}
          {memo && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-text-weak">Memo</span>
              <span className="text-sm text-text-strong text-right">{memo}</span>
            </div>
          )}
          {reference && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-text-weak">Ref</span>
              <span className="text-sm font-mono text-text-strong">{reference}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
