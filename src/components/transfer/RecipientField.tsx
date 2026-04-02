import { useState } from 'react'
import { X, UserPlus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FieldError } from '@/components/ui/field-error'
import { mockContacts } from '@/data/mockContacts'
import { Contact } from '@/lib/types'

interface NewRecipientData {
  name: string
  phone: string
  accountNumber: string
}

interface RecipientFieldProps {
  value: string
  isNewRecipient: boolean
  newRecipientName: string
  newRecipientPhone: string
  newRecipientAccountNumber: string
  onContactSelect: (contact: Contact) => void
  onNewRecipientToggle: (isNew: boolean) => void
  onNewRecipientChange: (data: Partial<NewRecipientData>) => void
  error?: string
}

export default function RecipientField({
  value, isNewRecipient, newRecipientName, newRecipientPhone, newRecipientAccountNumber,
  onContactSelect, onNewRecipientToggle, onNewRecipientChange, error,
}: RecipientFieldProps) {
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  const filtered = mockContacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.phone?.includes(search)) ||
    (c.accountNumber?.toLowerCase().includes(search.toLowerCase()))
  )

  const selected = mockContacts.find(c => c.id === value)

  return (
    <div className="space-y-1.5">
      <Label>To</Label>

      {!isNewRecipient && (
        <div className="relative z-10">
          {selected ? (
            <div className="flex h-12 items-center justify-between rounded-lg border border-input-border bg-surface-raised px-4">
              <span className="text-base leading-6 text-text-strong">{selected.name}</span>
              <button
                type="button"
                aria-label="Clear recipient"
                className="text-text-weak hover:text-text-strong transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-focus-border rounded"
                onClick={() => { onContactSelect({ id: '', name: '' }); setSearch('') }}
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <>
              <Input
                placeholder="Search by name, phone or account..."
                value={search}
                onChange={e => { setSearch(e.target.value); setShowDropdown(true) }}
                onFocus={() => setShowDropdown(true)}
                aria-invalid={!!error}
              />
              {showDropdown && search && (
                <div className="absolute z-50 w-full mt-1 bg-surface-raised border border-[rgba(0,0,51,0.06)] rounded-lg p-2 shadow-[0px_12px_32px_-16px_rgba(0,9,50,0.12),0px_12px_60px_0px_rgba(0,0,0,0.15)] max-h-52 overflow-y-auto">
                  {filtered.length === 0 && (
                    <p className="px-3 h-8 flex items-center text-sm text-text-weak">No contacts found</p>
                  )}
                  {filtered.map(contact => (
                    <button
                      key={contact.id}
                      type="button"
                      className="w-full text-left px-3 h-8 flex items-center justify-between rounded text-sm text-[#1c2024] hover:bg-surface-base transition-colors"
                      onClick={() => { onContactSelect(contact); setSearch(''); setShowDropdown(false) }}
                    >
                      <span>{contact.name}</span>
                      {contact.lastTransfer && (
                        <span className="text-xs text-text-weak shrink-0 ml-2">Last: {contact.lastTransfer}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {error && !selected && !isNewRecipient && <FieldError message={error} />}

      {!isNewRecipient && !selected && (
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm text-text-weak hover:text-text-strong transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-focus-border rounded"
          onClick={() => onNewRecipientToggle(true)}
        >
          <UserPlus className="size-4" />
          Add new recipient
        </button>
      )}

      {isNewRecipient && (
        <div className="rounded-lg border border-input-border bg-surface-raised p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-strong">New recipient</span>
            <button
              type="button"
              aria-label="Cancel new recipient"
              className="flex items-center gap-1 text-sm text-text-weak hover:text-text-strong transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-focus-border rounded px-1"
              onClick={() => onNewRecipientToggle(false)}
            >
              <X className="size-4" />
              Cancel
            </button>
          </div>
          <Input
            placeholder="Full name"
            value={newRecipientName}
            onChange={e => onNewRecipientChange({ name: e.target.value })}
          />
          <Input
            placeholder="Phone number or account number"
            value={newRecipientPhone || newRecipientAccountNumber}
            onChange={e => {
              const val = e.target.value
              const looksLikePhone = /^[+\d\s\-()]*$/.test(val) && (val.startsWith('+') || /^\d/.test(val))
              if (looksLikePhone && !val.includes(' ') || val.startsWith('+')) {
                onNewRecipientChange({ phone: val, accountNumber: '' })
              } else {
                onNewRecipientChange({ accountNumber: val, phone: '' })
              }
            }}
          />
          <p className="text-xs text-text-weak">Enter a phone number (e.g. +506 8845-1234) or bank account number</p>
        </div>
      )}

      {error && (selected || isNewRecipient) && <FieldError message={error} />}
    </div>
  )
}
