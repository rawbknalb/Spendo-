import { useMemo, useState } from 'react'
import { Plus, Scale, Settings as SettingsIcon } from 'lucide-react'
import { useSplitter } from './hooks/useSplitter'
import { computeSplit } from './lib/splitter'
import type { Expense } from './types'
import { Background } from './components/Background'
import { SplitSummaryCard } from './components/SplitSummaryCard'
import { ExpenseList } from './components/ExpenseList'
import { AddExpenseSheet } from './components/AddExpenseSheet'
import { PeopleSheet } from './components/PeopleSheet'

export default function App() {
  const { expenses, settings, addExpense, removeExpense, updateExpense, updateSettings } = useSplitter()

  const [addOpen, setAddOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [peopleOpen, setPeopleOpen] = useState(false)

  const split = useMemo(
    () => computeSplit(expenses, settings),
    [expenses, settings],
  )

  return (
    <>
      <Background />

      <div className="mx-auto min-h-screen w-full max-w-2xl px-4 pb-32 pt-[max(2rem,env(safe-area-inset-top))] sm:px-6">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#111111]">
              <Scale className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none tracking-tight">
                Spendo
              </h1>
              <p className="mt-0.5 text-xs text-[#9CA3AF]">
                Fair expense splitting
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Settings"
            onClick={() => setPeopleOpen(true)}
            className="pressable grid h-9 w-9 place-items-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F3F4F6]"
          >
            <SettingsIcon className="h-5 w-5" />
          </button>
        </header>

        <main className="space-y-5">
          <SplitSummaryCard split={split} settings={settings} />
          <ExpenseList
            expenses={expenses}
            currency={settings.currency}
            onEdit={setEditingExpense}
            onRemove={removeExpense}
          />
        </main>
      </div>

      <button
        type="button"
        aria-label="Add expense"
        onClick={() => setAddOpen(true)}
        className="pressable fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white shadow-lg"
      >
        <Plus className="h-5 w-5" />
        Add expense
      </button>

      {/* Add */}
      <AddExpenseSheet
        open={addOpen}
        currency={settings.currency}
        onClose={() => setAddOpen(false)}
        onSubmit={addExpense}
      />

      {/* Edit */}
      <AddExpenseSheet
        open={editingExpense !== null}
        currency={settings.currency}
        expense={editingExpense ?? undefined}
        onClose={() => setEditingExpense(null)}
        onSubmit={(data) => {
          if (editingExpense) updateExpense(editingExpense.id, data)
          setEditingExpense(null)
        }}
      />

      <PeopleSheet
        open={peopleOpen}
        settings={settings}
        onClose={() => setPeopleOpen(false)}
        onSave={updateSettings}
      />
    </>
  )
}
