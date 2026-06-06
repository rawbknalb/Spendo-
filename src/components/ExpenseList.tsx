import { Trash2 } from 'lucide-react'
import type { Expense } from '../types'
import { getCategory } from '../lib/categories'
import { formatMoney } from '../lib/format'
import { GlassCard } from './GlassCard'

interface ExpenseListProps {
  expenses: Expense[]
  currency: string
  onRemove: (id: string) => void
}

export function ExpenseList({ expenses, currency, onRemove }: ExpenseListProps) {
  const sorted = [...expenses].sort((a, b) => b.amount - a.amount)

  return (
    <GlassCard className="animate-fade-in p-6">
      <h2 className="text-lg font-semibold tracking-tight">Shared expenses</h2>

      {sorted.length === 0 ? (
        <p className="mt-6 text-sm text-white/50">
          No shared expenses yet. Tap + to add your first one.
        </p>
      ) : (
        <ul className="mt-4 space-y-1.5">
          {sorted.map((expense) => {
            const cat = getCategory(expense.categoryId)
            return (
              <li
                key={expense.id}
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
                  <div className="truncate text-sm font-medium">{expense.label}</div>
                  <div className="truncate text-xs text-white/45">{cat.label}</div>
                </div>
                <span className="tabular shrink-0 text-sm font-semibold">
                  {formatMoney(expense.amount, currency)}
                </span>
                <button
                  type="button"
                  aria-label="Delete expense"
                  onClick={() => onRemove(expense.id)}
                  className="pressable grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/0 transition-colors hover:bg-rose-500/20 hover:text-rose-300 group-hover:text-white/40"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </GlassCard>
  )
}
