import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface AdvancedFieldsProps {
  expanded: boolean
  date: string
  memo: string
  reference: string
  onToggle: (expanded: boolean) => void
  onChange: (field: 'date' | 'memo' | 'reference', value: string) => void
}

export default function AdvancedFields({
  expanded, date, memo, reference, onToggle, onChange,
}: AdvancedFieldsProps) {
  return (
    <div className="border-t border-dashed border-slate-200 pt-3">
      {!expanded ? (
        <button
          type="button"
          className="text-sm text-text-weak hover:text-text-strong cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-focus-border rounded flex items-center gap-1"
          onClick={() => onToggle(true)}
        >
          <span>＋</span> Add date, memo &amp; reference
        </button>
      ) : (
        <div className="space-y-3">
          <button
            type="button"
            className="text-sm text-text-weak hover:text-text-strong cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-focus-border rounded"
            onClick={() => onToggle(false)}
          >
            － Hide details
          </button>

          <div className="space-y-1.5">
            <Label htmlFor="transfer-date">Transfer Date</Label>
            <Input
              id="transfer-date"
              type="date"
              value={date}
              onChange={e => onChange('date', e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="memo">Memo</Label>
            <Input
              id="memo"
              placeholder="e.g. Rent, Invoice #123"
              value={memo}
              onChange={e => onChange('memo', e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="reference">Reference <span className="text-slate-400 font-normal">(optional)</span></Label>
            <Input
              id="reference"
              placeholder="PO number, project code…"
              value={reference}
              onChange={e => onChange('reference', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
