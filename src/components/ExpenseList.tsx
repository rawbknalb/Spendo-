import { memo, useMemo } from 'react'
import { Trash2 } from 'lucide-react'
import type { Expense } from '../types'
import { getCategory, getCategoryIcon } from '../lib/categories'
import { formatMoney } from '../lib/format'
import { GlassCard } from './GlassCard'

interface ExpenseListProps {
  expenses: Expense[]
  currency: string
  onEdit: (expense: Expense) => void
  onRemove: (id: string) => void
}

export const ExpenseList = memo(function ExpenseList({
  expenses,
  currency,
  onEdit,
  onRemove,
}: ExpenseListProps) {
  const sorted = useMemo(
    () => [...expenses].sort((a, b) => b.amount - a.amount),
    [expenses],
  )

  return (
    <GlassCard className="animate-fade-in p-6">
      <h2 className="text-xs font-medium uppercase tracking-widest text-[#9CA3AF]">
        Shared expenses
      </h2>

      {sorted.length === 0 ? (
        <p className="mt-5 text-sm text-[#9CA3AF]">
          No expenses yet. Tap + to add one.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-[#F3F4F6]">
          {sorted.map((expense) => {
            const cat = getCategory(expense.categoryId)
            const Icon = getCategoryIcon(expense.categoryId)
            return (
              <li
                key={expense.id}
                className="group flex cursor-pointer items-center gap-3 py-3 transition-colors hover:opacity-70"
                onClick={() => onEdit(expense)}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#F3F4F6]">
                  <Icon className="h-4 w-4 text-[#6B7280]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#111111]">
                    {expense.label}
                  </p>
                  <p className="truncate text-xs text-[#9CA3AF]">{cat.label}</p>
                </div>
                <span className="tabular shrink-0 text-sm font-semibold text-[#111111]">
                  {formatMoney(expense.amount, currency)}
                </span>
                <button
                  type="button"
                  aria-label="Delete expense"
                  onClick={(e) => { e.stopPropagation(); onRemove(expense.id) }}
                  className="pressable grid h-8 w-8 shrink-0 place-items-center rounded-full text-transparent transition-colors hover:bg-[#FEF2F2] hover:text-[#EF4444] group-hover:text-[#D1D5DB]"
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
})
