import { useState } from 'react'
import { CATEGORIES, getCategoryIcon } from '../lib/categories'
import type { NewExpense } from '../hooks/useSplitter'
import { Sheet } from './Sheet'

interface AddExpenseSheetProps {
  open: boolean
  currency: string
  onClose: () => void
  onAdd: (expense: NewExpense) => void
}

export function AddExpenseSheet({
  open,
  currency,
  onClose,
  onAdd,
}: AddExpenseSheetProps) {
  const [amount, setAmount] = useState('')
  const [label, setLabel] = useState('')
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id)

  const parsed = parseFloat(amount)
  const valid = !Number.isNaN(parsed) && parsed > 0 && label.trim().length > 0

  function reset() {
    setAmount('')
    setLabel('')
    setCategoryId(CATEGORIES[0].id)
  }

  function submit() {
    if (!valid) return
    onAdd({
      label: label.trim(),
      amount: Math.round(parsed * 100) / 100,
      categoryId,
    })
    reset()
    onClose()
  }

  return (
    <Sheet open={open} title="Add expense" onClose={onClose}>
      <div className="space-y-5">
        {/* Label */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
            What is it?
          </label>
          <input
            autoFocus
            type="text"
            placeholder="e.g. Rent, Netflix, Gym…"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            className="w-full rounded-2xl border border-black/[0.08] bg-black/[0.04] px-4 py-3 text-base outline-none placeholder:text-gray-300 focus:border-[#007AFF]/40 focus:ring-2 focus:ring-[#007AFF]/10"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
            Monthly amount
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-black/[0.08] bg-black/[0.04] px-4 py-3 focus-within:border-[#007AFF]/40 focus-within:ring-2 focus-within:ring-[#007AFF]/10">
            <span className="text-2xl font-semibold text-gray-300">
              {currencySymbol(currency)}
            </span>
            <input
              inputMode="decimal"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              className="tabular w-full bg-transparent text-3xl font-bold tracking-tight outline-none placeholder:text-gray-200"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
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
                  className={`pressable grid aspect-square place-items-center rounded-2xl transition-all ${
                    selected ? 'ring-2 ring-black/30 ring-offset-1' : 'opacity-60 hover:opacity-90'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${cat.from}, ${cat.to})`,
                  }}
                >
                  <Icon className="h-5 w-5 text-white" />
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-center text-xs font-medium text-gray-400">
            {CATEGORIES.find((c) => c.id === categoryId)?.label}
          </p>
        </div>

        <button
          type="button"
          disabled={!valid}
          onClick={submit}
          className="pressable w-full rounded-2xl bg-[#007AFF] py-3.5 text-base font-semibold text-white shadow-lg shadow-[#007AFF]/20 transition-opacity disabled:opacity-40"
        >
          Add expense
        </button>
      </div>
    </Sheet>
  )
}

function currencySymbol(currency: string): string {
  try {
    return (
      new Intl.NumberFormat(undefined, { style: 'currency', currency })
        .formatToParts(0)
        .find((p) => p.type === 'currency')?.value ?? '€'
    )
  } catch {
    return '€'
  }
}
