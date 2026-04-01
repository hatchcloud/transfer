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
  email: string
  country: string
  lastTransfer?: string
}

export interface ExchangeRate {
  from: string
  to: string
  rate: number
  fee: number
}

export interface TransferFormData {
  fromAccountId: string
  toContactId: string
  isNewRecipient: boolean
  newRecipientName: string
  newRecipientEmail: string
  newRecipientCountry: string
  amount: string
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
