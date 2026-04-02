import { ExchangeRate } from '@/lib/types'

export const mockRates: ExchangeRate[] = [
  { from: 'USD', to: 'EUR', rate: 0.921, fee: 2.40 },
  { from: 'USD', to: 'CRC', rate: 462, fee: 1.00 },
  { from: 'EUR', to: 'USD', rate: 1.086, fee: 2.40 },
  { from: 'EUR', to: 'CRC', rate: 501.7, fee: 1.50 },
  { from: 'CRC', to: 'USD', rate: 0.00216, fee: 1.00 },
  { from: 'CRC', to: 'EUR', rate: 0.00199, fee: 1.50 },
]

export function getRate(from: string, to: string): ExchangeRate | null {
  if (from === to) return { from, to, rate: 1, fee: 0 }
  return mockRates.find(r => r.from === from && r.to === to) ?? null
}

export const currencies = ['USD', 'EUR', 'CRC'] as const
