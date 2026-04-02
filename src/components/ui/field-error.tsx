import { CircleX } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FieldError({ message, className }: { message: string; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2 py-1', className)}>
      <CircleX className="size-4 shrink-0 text-input-error-text" />
      <p className="text-sm font-medium leading-5 text-input-error-text">{message}</p>
    </div>
  )
}
