import { Trash2 } from 'lucide-react'
import type { Transaction } from '../types'
import { getCategory } from '../lib/categories'
import { formatDayLabel, formatMoney } from '../lib/format'
import { GlassCard } from './GlassCard'

interface TransactionListProps {
  transactions: Transaction[]
  currency: string
  onRemove: (id: string) => void
}

interface DayGroup {
  date: string
  items: Transaction[]
  total: number
}

function groupByDay(transactions: Transaction[]): DayGroup[] {
  const groups = new Map<string, Transaction[]>()
  for (const t of transactions) {
    const list = groups.get(t.date) ?? []
    list.push(t)
    groups.set(t.date, list)
  }
  return [...groups.entries()]
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([date, items]) => ({
      date,
      items,
      total: items.reduce((s, t) => s + t.amount, 0),
    }))
}

export function TransactionList({
  transactions,
  currency,
  onRemove,
}: TransactionListProps) {
  const groups = groupByDay(transactions)

  return (
    <GlassCard className="animate-fade-in p-6">
      <h2 className="text-lg font-semibold tracking-tight">Transactions</h2>

      {groups.length === 0 ? (
        <p className="mt-6 text-sm text-white/50">
          Nothing here yet. Tap the + button to add your first expense.
        </p>
      ) : (
        <div className="mt-4 space-y-6">
          {groups.map((group) => (
            <div key={group.date}>
              <div className="mb-2 flex items-baseline justify-between px-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-white/45">
                  {formatDayLabel(group.date)}
                </span>
                <span className="tabular text-xs font-medium text-white/45">
                  {formatMoney(group.total, currency)}
                </span>
              </div>
              <ul className="space-y-1.5">
                {group.items.map((t) => {
                  const cat = getCategory(t.categoryId)
                  return (
                    <li
                      key={t.id}
                      className="group flex items-center gap-3 rounded-2xl px-2 py-2 transition-colors hover:bg-white/5"
                    >
                      <span
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg"
                        style={{
                          background: `linear-gradient(135deg, ${cat.from}, ${cat.to})`,
                        }}
                      >
                        {cat.emoji}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">
                          {t.note || cat.label}
                        </div>
                        <div className="truncate text-xs text-white/45">
                          {cat.label}
                        </div>
                      </div>
                      <span className="tabular shrink-0 text-sm font-semibold">
                        {formatMoney(t.amount, currency)}
                      </span>
                      <button
                        type="button"
                        aria-label="Delete transaction"
                        onClick={() => onRemove(t.id)}
                        className="pressable grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/0 transition-colors hover:bg-rose-500/20 hover:text-rose-300 group-hover:text-white/40"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  )
}
