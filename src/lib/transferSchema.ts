import { z } from 'zod'

export const transferSchema = z.object({
  fromAccountId: z.string().min(1, 'Please select an account'),
  toContactId: z.string(),
  isNewRecipient: z.boolean(),
  newRecipientName: z.string(),
  newRecipientEmail: z.string(),
  newRecipientCountry: z.string(),
  amount: z.string().refine(
    val => parseFloat(val) > 0,
    { message: 'Amount must be greater than $0' }
  ),
  currency: z.string().min(1, 'Please select a currency'),
  date: z.string(),
  memo: z.string(),
  reference: z.string(),
}).superRefine((data, ctx) => {
  if (!data.isNewRecipient && !data.toContactId) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Please select a recipient', path: ['toContactId'] })
  }
  if (data.isNewRecipient) {
    if (!data.newRecipientName) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Name is required', path: ['newRecipientName'] })
    }
    if (!data.newRecipientEmail) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Email is required', path: ['newRecipientEmail'] })
    }
    if (!data.newRecipientCountry) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Country is required', path: ['newRecipientCountry'] })
    }
  }
})

export type TransferSchemaType = z.infer<typeof transferSchema>
