import { useNavigate } from 'react-router-dom'
import { ArrowRight, Send, Clock, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { mockAccounts } from '@/data/mockAccounts'

const recentTransactions = [
  { id: 't-1', to: 'Maria Santos', amount: -250.00, currency: 'USD', date: 'Mar 28', status: 'completed' as const },
  { id: 't-2', to: 'Acme Supplies Ltd.', amount: -1200.00, currency: 'EUR', date: 'Mar 25', status: 'completed' as const },
  { id: 't-3', to: 'John Doe', amount: -85.50, currency: 'USD', date: 'Mar 22', status: 'pending' as const },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="mx-auto max-w-md space-y-6">
        {/* Header */}
        <div className="pt-4">
          <h1 className="text-2xl font-bold text-text-strong tracking-tight">Moody</h1>
          <p className="text-sm text-text-weak mt-0.5">Welcome back</p>
        </div>

        {/* Accounts */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-text-weak uppercase tracking-wider">Accounts</h2>
          </div>
          <div className="space-y-2">
            {mockAccounts.map(account => (
              <Card
                key={account.id}
                className="cursor-pointer transition-shadow hover:shadow-md"
                onClick={() => navigate('/form', { state: { fromAccountId: account.id } })}
              >
                <CardContent className="flex items-center justify-between py-4 px-5">
                  <div>
                    <p className="text-sm font-medium text-text-strong">{account.label}</p>
                    <p className="text-xs text-text-weak mt-0.5">{account.masked}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-lg font-bold text-text-strong tabular-nums">
                        ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs text-text-weak">{account.currency}</p>
                    </div>
                    <ChevronRight className="size-4 text-text-weak" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick action */}
        <Button className="w-full" onClick={() => navigate('/form')}>
          <Send className="size-4" />
          New Transfer
          <ArrowRight className="size-4" />
        </Button>

        {/* Recent transactions */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-text-weak uppercase tracking-wider">Recent</h2>
          </div>
          <Card>
            <CardContent className="divide-y divide-[rgba(23,37,84,0.08)] p-0">
              {recentTransactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-surface-brand-soft flex items-center justify-center">
                      <span className="text-xs font-semibold text-text-strong">
                        {tx.to.split(' ').map(w => w[0]).slice(0, 2).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-strong">{tx.to}</p>
                      <p className="text-xs text-text-weak">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-text-strong tabular-nums">
                      {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)}
                    </p>
                    {tx.status === 'pending' && (
                      <span className="inline-flex items-center gap-1 text-xs text-banner-warning-text">
                        <Clock className="size-3" />
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
