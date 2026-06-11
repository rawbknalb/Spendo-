import { useCallback, useMemo, useState } from 'react'
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

  // One sheet handles both add and edit; `editingExpense` decides the mode.
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [peopleOpen, setPeopleOpen] = useState(false)

  const split = useMemo(
    () => computeSplit(expenses, settings),
    [expenses, settings],
  )

  const openAdd = useCallback(() => {
    setEditingExpense(null)
    setSheetOpen(true)
  }, [])

  const openEdit = useCallback((expense: Expense) => {
    setEditingExpense(expense)
    setSheetOpen(true)
  }, [])

  const closeSheet = useCallback(() => setSheetOpen(false), [])

  const submitExpense = useCallback(
    (data: { label: string; amount: number; categoryId: string }) => {
      if (editingExpense) {
        updateExpense(editingExpense.id, data)
      } else {
        addExpense(data)
      }
    },
    [editingExpense, updateExpense, addExpense],
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
            onEdit={openEdit}
            onRemove={removeExpense}
          />
        </main>
      </div>

      <button
        type="button"
        aria-label="Add expense"
        onClick={openAdd}
        className="pressable fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white shadow-lg"
      >
        <Plus className="h-5 w-5" />
        Add expense
      </button>

      <AddExpenseSheet
        open={sheetOpen}
        currency={settings.currency}
        expense={editingExpense ?? undefined}
        onClose={closeSheet}
        onSubmit={submitExpense}
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
