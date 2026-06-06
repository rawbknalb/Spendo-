import { useState } from 'react'
import { CATEGORIES } from '../lib/categories'
import { todayISO } from '../lib/format'
import type { NewTransaction } from '../hooks/useTransactions'
import { Sheet } from './Sheet'

interface AddTransactionSheetProps {
  open: boolean
  currency: string
  onClose: () => void
  onAdd: (tx: NewTransaction) => void
}

export function AddTransactionSheet({
  open,
  currency,
  onClose,
  onAdd,
}: AddTransactionSheetProps) {
  const [amount, setAmount] = useState('')
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id)
  const [note, setNote] = useState('')
  const [date, setDate] = useState(todayISO())

  const parsed = parseFloat(amount)
  const valid = !Number.isNaN(parsed) && parsed > 0

  function reset() {
    setAmount('')
    setCategoryId(CATEGORIES[0].id)
    setNote('')
    setDate(todayISO())
  }

  function submit() {
    if (!valid) return
    onAdd({
      amount: Math.round(parsed * 100) / 100,
      categoryId,
      note: note.trim(),
      date,
    })
    reset()
    onClose()
  }

  return (
    <Sheet open={open} title="Add expense" onClose={onClose}>
      <div className="space-y-5">
        {/* Amount */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
            Amount
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-white/25">
            <span className="text-2xl font-semibold text-white/50">
              {currencySymbol(currency)}
            </span>
            <input
              autoFocus
              inputMode="decimal"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              className="tabular w-full bg-transparent text-3xl font-bold tracking-tight outline-none placeholder:text-white/25"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
            Category
          </label>
          <div className="grid grid-cols-5 gap-2">
            {CATEGORIES.map((cat) => {
              const selected = cat.id === categoryId
              return (
                <button
                  key={cat.id}
                  type="button"
                  title={cat.label}
                  onClick={() => setCategoryId(cat.id)}
                  className={`pressable grid aspect-square place-items-center rounded-2xl text-xl transition-all ${
                    selected
                      ? 'ring-2 ring-white/80'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${cat.from}, ${cat.to})`,
                  }}
                >
                  {cat.emoji}
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-center text-xs font-medium text-white/55">
            {CATEGORIES.find((c) => c.id === categoryId)?.label}
          </p>
        </div>

        {/* Note + date */}
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
              Note
            </label>
            <input
              type="text"
              placeholder="What was it for?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-white/25"
            />
          </div>
          <div className="col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
              Date
            </label>
            <input
              type="date"
              value={date}
              max={todayISO()}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none [color-scheme:dark] focus:border-white/25"
            />
          </div>
        </div>

        <button
          type="button"
          disabled={!valid}
          onClick={submit}
          className="pressable w-full rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-3.5 text-base font-semibold shadow-lg shadow-violet-500/25 transition-opacity disabled:opacity-40"
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
        .find((p) => p.type === 'currency')?.value ?? '$'
    )
  } catch {
    return '$'
  }
}
