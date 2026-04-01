interface ValidationBannerProps {
  type: 'insufficient' | 'first-time' | null
  availableBalance?: number
}

export default function ValidationBanner({ type, availableBalance }: ValidationBannerProps) {
  if (!type) return null

  if (type === 'insufficient') {
    return (
      <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600">
        ⚠ Insufficient funds. Available balance: ${availableBalance?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </div>
    )
  }

  return (
    <div className="rounded-md bg-orange-50 border border-orange-200 px-3 py-2 text-sm text-orange-600">
      ⚡ First transfer to this recipient — please double-check their account details before sending.
    </div>
  )
}
