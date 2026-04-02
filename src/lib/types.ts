export interface Account {
  id: string
  label: string
  masked: string
  balance: number
  currency: string
}

export interface Contact {
  id: string
  name: string
  phone?: string
  accountNumber?: string
  lastTransfer?: string
}

export interface ExchangeRate {
  from: string
  to: string
  rate: number
  fee: number // flat fee in the 'from' currency
}

export interface TransferFormData {
  fromAccountId: string
  toContactId: string
  isNewRecipient: boolean
  newRecipientName: string
  newRecipientPhone: string
  newRecipientAccountNumber: string
  amount: string // kept as string for form binding; coerce with parseFloat before calculations
  currency: string
  date: string
  memo: string
  reference: string
}

export interface TransferPayload extends TransferFormData {
  fromAccount: Account
  toContact: Contact | null
  rate: ExchangeRate | null
  convertedAmount: number
  transactionRef: string
}
