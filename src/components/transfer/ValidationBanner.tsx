import { TriangleAlert, ShieldAlert } from 'lucide-react'

interface ValidationBannerProps {
  type: 'insufficient' | 'first-time' | null
  availableBalance?: number
}

export default function ValidationBanner({ type, availableBalance }: ValidationBannerProps) {
  if (!type) return null

  if (type === 'insufficient') {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-banner-error-border bg-banner-error-bg px-4 py-3">
        <ShieldAlert className="size-5 shrink-0 text-banner-error-text mt-0.5" />
        <p className="text-sm font-medium text-banner-error-text">
          Insufficient funds. Available balance: ${availableBalance?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3 rounded-lg border border-banner-warning-border bg-banner-warning-bg px-4 py-3">
      <TriangleAlert className="size-5 shrink-0 text-banner-warning-text mt-0.5" />
      <p className="text-sm font-medium text-banner-warning-text">
        First transfer to this recipient — please double-check their account details before sending.
      </p>
    </div>
  )
}
