import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { mockContacts } from '@/data/mockContacts'
import { Contact } from '@/lib/types'

interface NewRecipientData {
  name: string
  email: string
  country: string
}

interface RecipientFieldProps {
  value: string
  isNewRecipient: boolean
  newRecipientName: string
  newRecipientEmail: string
  newRecipientCountry: string
  onContactSelect: (contact: Contact) => void
  onNewRecipientToggle: (isNew: boolean) => void
  onNewRecipientChange: (data: Partial<NewRecipientData>) => void
  error?: string
}

export default function RecipientField({
  value, isNewRecipient, newRecipientName, newRecipientEmail, newRecipientCountry,
  onContactSelect, onNewRecipientToggle, onNewRecipientChange, error,
}: RecipientFieldProps) {
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  const filtered = mockContacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  const selected = mockContacts.find(c => c.id === value)

  return (
    <div className="space-y-1.5">
      <Label>To</Label>

      {!isNewRecipient && (
        <div className="relative">
          {selected ? (
            <div className="flex items-center justify-between px-3 py-2 border rounded-md bg-white">
              <span className="text-sm">{selected.name}</span>
              <button
                type="button"
                className="text-xs text-slate-400 hover:text-slate-600"
                onClick={() => { onContactSelect({ id: '', name: '', email: '', country: '' }); setSearch('') }}
              >
                ✕
              </button>
            </div>
          ) : (
            <>
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={e => { setSearch(e.target.value); setShowDropdown(true) }}
                onFocus={() => setShowDropdown(true)}
                className={error ? 'border-red-500' : ''}
              />
              {showDropdown && search && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-md max-h-48 overflow-y-auto">
                  {filtered.length === 0 && (
                    <p className="px-3 py-2 text-sm text-slate-500">No contacts found</p>
                  )}
                  {filtered.map(contact => (
                    <button
                      key={contact.id}
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center justify-between"
                      onClick={() => { onContactSelect(contact); setSearch(''); setShowDropdown(false) }}
                    >
                      <span>{contact.name}</span>
                      {contact.lastTransfer && (
                        <span className="text-xs text-slate-400">Last: {contact.lastTransfer}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {!isNewRecipient && !selected && (
        <button
          type="button"
          className="text-xs text-indigo-500 hover:text-indigo-700"
          onClick={() => onNewRecipientToggle(true)}
        >
          + Add new recipient
        </button>
      )}

      {isNewRecipient && (
        <div className="space-y-2 p-3 border border-dashed border-indigo-200 rounded-md bg-indigo-50/30">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">New Recipient</Badge>
            <button
              type="button"
              className="text-xs text-slate-400 hover:text-slate-600"
              onClick={() => onNewRecipientToggle(false)}
            >
              ✕ Cancel
            </button>
          </div>
          <Input
            placeholder="Full name"
            value={newRecipientName}
            onChange={e => onNewRecipientChange({ name: e.target.value })}
          />
          <Input
            placeholder="Email address"
            type="email"
            value={newRecipientEmail}
            onChange={e => onNewRecipientChange({ email: e.target.value })}
          />
          <Input
            placeholder="Country (e.g. US, DE, GB)"
            value={newRecipientCountry}
            onChange={e => onNewRecipientChange({ country: e.target.value })}
          />
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
