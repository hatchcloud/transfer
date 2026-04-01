import { describe, it, expect } from 'vitest'
import { transferSchema } from './transferSchema'

const validData = {
  fromAccountId: 'acc-1',
  toContactId: 'c-1',
  isNewRecipient: false,
  newRecipientName: '',
  newRecipientEmail: '',
  newRecipientCountry: '',
  amount: '250',
  currency: 'EUR',
  date: '2026-03-31',
  memo: 'Rent',
  reference: '',
}

describe('transferSchema', () => {
  it('passes with valid data', () => {
    expect(transferSchema.safeParse(validData).success).toBe(true)
  })

  it('fails when fromAccountId is empty', () => {
    const result = transferSchema.safeParse({ ...validData, fromAccountId: '' })
    expect(result.success).toBe(false)
  })

  it('fails when toContactId is empty and not a new recipient', () => {
    const result = transferSchema.safeParse({ ...validData, toContactId: '' })
    expect(result.success).toBe(false)
  })

  it('fails when amount is 0', () => {
    const result = transferSchema.safeParse({ ...validData, amount: '0' })
    expect(result.success).toBe(false)
  })

  it('fails when amount is negative', () => {
    const result = transferSchema.safeParse({ ...validData, amount: '-10' })
    expect(result.success).toBe(false)
  })

  it('fails when new recipient name is empty and isNewRecipient is true', () => {
    const result = transferSchema.safeParse({
      ...validData,
      toContactId: '',
      isNewRecipient: true,
      newRecipientName: '',
      newRecipientEmail: 'test@test.com',
      newRecipientCountry: 'US',
    })
    expect(result.success).toBe(false)
  })

  it('passes when isNewRecipient is true and all new recipient fields filled', () => {
    const result = transferSchema.safeParse({
      ...validData,
      toContactId: '',
      isNewRecipient: true,
      newRecipientName: 'New Person',
      newRecipientEmail: 'new@example.com',
      newRecipientCountry: 'US',
    })
    expect(result.success).toBe(true)
  })
})
