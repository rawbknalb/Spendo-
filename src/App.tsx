import { useMemo, useState } from 'react'
import { Plus, Settings as SettingsIcon } from 'lucide-react'
import { useSplitter } from './hooks/useSplitter'
import { computeSplit } from './lib/splitter'
import { Background } from './components/Background'
import { SplitSummaryCard } from './components/SplitSummaryCard'
import { ExpenseList } from './components/ExpenseList'
import { AddExpenseSheet } from './components/AddExpenseSheet'
import { PeopleSheet } from './components/PeopleSheet'

export default function App() {
  const { expenses, settings, addExpense, removeExpense, updateSettings } = useSplitter()

  const [addOpen, setAddOpen] = useState(false)
  const [peopleOpen, setPeopleOpen] = useState(false)

  const split = useMemo(
    () => computeSplit(expenses, settings),
    [expenses, settings],
  )

  return (
    <>
      <Background />

      <div className="mx-auto min-h-screen w-full max-w-2xl px-4 pb-32 pt-[max(2rem,env(safe-area-inset-top))] sm:px-6">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl shadow-lg shadow-violet-500/30">
              🤝
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none tracking-tight">
                Spendo
              </h1>
              <p className="mt-1 text-xs font-medium text-white/50">
                Fair expense splitting
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Settings"
            onClick={() => setPeopleOpen(true)}
            className="pressable grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
          >
            <SettingsIcon className="h-5 w-5" />
          </button>
        </header>

        <main className="space-y-5">
          <SplitSummaryCard split={split} settings={settings} />
          <ExpenseList
            expenses={expenses}
            currency={settings.currency}
            onRemove={removeExpense}
          />
        </main>
      </div>

      {/* Floating add button */}
      <button
        type="button"
        aria-label="Add expense"
        onClick={() => setAddOpen(true)}
        className="pressable fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-4 text-base font-semibold shadow-xl shadow-violet-500/40 ring-1 ring-white/20"
      >
        <Plus className="h-5 w-5" />
        Add expense
      </button>

      <AddExpenseSheet
        open={addOpen}
        currency={settings.currency}
        onClose={() => setAddOpen(false)}
        onAdd={addExpense}
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
