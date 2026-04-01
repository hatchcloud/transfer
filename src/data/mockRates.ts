import { ExchangeRate } from '@/lib/types'

export const mockRates: ExchangeRate[] = [
  { from: 'USD', to: 'EUR', rate: 0.921, fee: 2.40 },
  { from: 'USD', to: 'GBP', rate: 0.786, fee: 2.90 },
  { from: 'USD', to: 'JPY', rate: 149.50, fee: 1.80 },
  { from: 'USD', to: 'CAD', rate: 1.357, fee: 1.50 },
  { from: 'USD', to: 'AUD', rate: 1.534, fee: 1.70 },
  { from: 'EUR', to: 'USD', rate: 1.086, fee: 2.40 },
]

export function getRate(from: string, to: string): ExchangeRate | null {
  if (from === to) return { from, to, rate: 1, fee: 0 }
  return mockRates.find(r => r.from === from && r.to === to) ?? null
}

export const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD']
