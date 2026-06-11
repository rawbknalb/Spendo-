import { useState } from 'react'
import { CATEGORIES, getCategoryIcon } from '../lib/categories'
import { currencySymbol } from '../lib/format'
import type { Expense } from '../types'
import type { NewExpense } from '../hooks/useSplitter'
import { Sheet } from './Sheet'

interface AddExpenseSheetProps {
  open: boolean
  currency: string
  /** When provided the sheet is in edit mode and pre-fills the form. */
  expense?: Expense
  onClose: () => void
  onSubmit: (data: NewExpense) => void
}

export function AddExpenseSheet({ open, currency, expense, onClose, onSubmit }: AddExpenseSheetProps) {
  const editing = expense !== undefined
  return (
    <Sheet open={open} title={editing ? 'Edit expense' : 'Add expense'} onClose={onClose}>
      {/* Keyed so switching between add/edit (or different expenses) resets the form. */}
      <ExpenseForm
        key={expense?.id ?? 'new'}
        currency={currency}
        expense={expense}
        editing={editing}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </Sheet>
  )
}

interface ExpenseFormProps {
  currency: string
  expense?: Expense
  editing: boolean
  onClose: () => void
  onSubmit: (data: NewExpense) => void
}

function ExpenseForm({ currency, expense, editing, onClose, onSubmit }: ExpenseFormProps) {
  const [label, setLabel] = useState(expense?.label ?? '')
  const [amount, setAmount] = useState(expense ? String(expense.amount) : '')
  const [categoryId, setCategoryId] = useState(expense?.categoryId ?? CATEGORIES[0].id)

  const parsed = parseFloat(amount)
  const valid = !Number.isNaN(parsed) && parsed > 0 && label.trim().length > 0

  function submit() {
    if (!valid) return
    onSubmit({ label: label.trim(), amount: Math.round(parsed * 100) / 100, categoryId })
    onClose()
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[#9CA3AF]">
          Description
        </label>
        <input
          autoFocus
          type="text"
          placeholder="e.g. Rent, Netflix, Gym"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          className="w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3 text-sm outline-none placeholder:text-[#D1D5DB] focus:border-[#111111]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[#9CA3AF]">
          Monthly amount
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3 focus-within:border-[#111111]">
          <span className="text-xl font-semibold text-[#D1D5DB]">
            {currencySymbol(currency)}
          </span>
          <input
            inputMode="decimal"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            className="tabular w-full bg-transparent text-3xl font-bold tracking-tight text-[#111111] outline-none placeholder:text-[#E5E7EB]"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[#9CA3AF]">
          Category
        </label>
        <div className="grid grid-cols-5 gap-2">
          {CATEGORIES.map((cat) => {
            const selected = cat.id === categoryId
            const Icon = getCategoryIcon(cat.id)
            return (
              <button
                key={cat.id}
                type="button"
                title={cat.label}
                onClick={() => setCategoryId(cat.id)}
                className={`pressable grid aspect-square place-items-center rounded-xl border transition-colors ${
                  selected
                    ? 'border-[#111111] bg-[#111111]'
                    : 'border-[#E5E7EB] bg-[#F9FAFB] hover:border-[#9CA3AF]'
                }`}
              >
                <Icon className={`h-5 w-5 ${selected ? 'text-white' : 'text-[#6B7280]'}`} />
              </button>
            )
          })}
        </div>
        <p className="mt-2 text-center text-xs text-[#9CA3AF]">
          {CATEGORIES.find((c) => c.id === categoryId)?.label}
        </p>
      </div>

      <button
        type="button"
        disabled={!valid}
        onClick={submit}
        className="pressable w-full rounded-xl bg-[#111111] py-3.5 text-sm font-semibold text-white transition-opacity disabled:opacity-30"
      >
        {editing ? 'Save changes' : 'Add expense'}
      </button>
    </div>
  )
}
