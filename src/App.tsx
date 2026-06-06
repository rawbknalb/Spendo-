import { useMemo, useState } from 'react'
import { Plus, Settings as SettingsIcon } from 'lucide-react'
import { useTransactions } from './hooks/useTransactions'
import {
  computeMonthStats,
  computeTrend,
  currentMonthKey,
  transactionsForMonth,
} from './lib/stats'
import { shiftMonth } from './lib/format'
import { Background } from './components/Background'
import { MonthSwitcher } from './components/MonthSwitcher'
import { SummaryCard } from './components/SummaryCard'
import { CategoryBreakdown } from './components/CategoryBreakdown'
import { TrendChart } from './components/TrendChart'
import { TransactionList } from './components/TransactionList'
import { AddTransactionSheet } from './components/AddTransactionSheet'
import { SettingsSheet } from './components/SettingsSheet'

export default function App() {
  const {
    transactions,
    settings,
    addTransaction,
    removeTransaction,
    updateSettings,
  } = useTransactions()

  const [month, setMonth] = useState(currentMonthKey)
  const [addOpen, setAddOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const stats = useMemo(
    () => computeMonthStats(transactions, month),
    [transactions, month],
  )
  const previousTotal = useMemo(
    () =>
      transactionsForMonth(transactions, shiftMonth(month, -1)).reduce(
        (sum, t) => sum + t.amount,
        0,
      ),
    [transactions, month],
  )
  const trend = useMemo(
    () => computeTrend(transactions, month, 6),
    [transactions, month],
  )
  const monthTransactions = useMemo(
    () => transactionsForMonth(transactions, month),
    [transactions, month],
  )

  return (
    <>
      <Background />

      <div className="mx-auto min-h-screen w-full max-w-2xl px-4 pb-32 pt-[max(2rem,env(safe-area-inset-top))] sm:px-6">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl shadow-lg shadow-violet-500/30">
              💸
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none tracking-tight">
                Spendo
              </h1>
              <p className="mt-1 text-xs font-medium text-white/50">
                Your monthly overview
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Settings"
            onClick={() => setSettingsOpen(true)}
            className="pressable grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
          >
            <SettingsIcon className="h-5 w-5" />
          </button>
        </header>

        {/* Month switcher */}
        <div className="mb-5 flex justify-center">
          <MonthSwitcher monthKey={month} onChange={setMonth} />
        </div>

        <main className="space-y-5">
          <SummaryCard
            stats={stats}
            previousTotal={previousTotal}
            settings={settings}
          />
          <TrendChart
            data={trend}
            activeKey={month}
            currency={settings.currency}
            onSelect={setMonth}
          />
          <CategoryBreakdown stats={stats} currency={settings.currency} />
          <TransactionList
            transactions={monthTransactions}
            currency={settings.currency}
            onRemove={removeTransaction}
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

      <AddTransactionSheet
        open={addOpen}
        currency={settings.currency}
        onClose={() => setAddOpen(false)}
        onAdd={addTransaction}
      />
      <SettingsSheet
        open={settingsOpen}
        settings={settings}
        onClose={() => setSettingsOpen(false)}
        onSave={updateSettings}
      />
    </>
  )
}
