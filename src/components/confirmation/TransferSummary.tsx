import { TransferPayload } from '@/lib/types'

interface TransferSummaryProps {
  payload: TransferPayload
}

export default function TransferSummary({ payload }: TransferSummaryProps) {
  const { fromAccount, toContact, amount, currency, rate, convertedAmount, date, memo, reference } = payload
  const recipientName = toContact?.name ?? payload.newRecipientName

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 divide-y divide-slate-100 text-sm">
      <div className="px-4 py-3">
        <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">From</p>
        <p className="font-medium">{fromAccount.label} {fromAccount.masked}</p>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">To</p>
        <p className="font-medium">{recipientName}</p>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Amount</p>
        <p className="text-lg font-bold text-indigo-600">
          {parseFloat(amount).toFixed(2)} {fromAccount.currency}
        </p>
        {rate && currency !== fromAccount.currency && (
          <p className="text-xs text-slate-400">
            ≈ {convertedAmount.toFixed(2)} {currency} · Fee ${rate.fee.toFixed(2)}
          </p>
        )}
      </div>
      {(date || memo || reference) && (
        <div className="px-4 py-3 space-y-1">
          {date && <p className="text-xs text-slate-400"><span className="uppercase tracking-wide">Date</span>: <span>{date}</span></p>}
          {memo && <p className="text-xs text-slate-400"><span className="uppercase tracking-wide">Memo</span>: <span>{memo}</span></p>}
          {reference && <p className="text-xs text-slate-400"><span className="uppercase tracking-wide">Ref</span>: <span>{reference}</span></p>}
        </div>
      )}
    </div>
  )
}
