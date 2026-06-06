import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import type { Settings } from '../types'
import type { MonthStats } from '../lib/stats'
import { formatMoney } from '../lib/format'
import { GlassCard } from './GlassCard'
import { BudgetRing } from './BudgetRing'

interface SummaryCardProps {
  stats: MonthStats
  previousTotal: number
  settings: Settings
}

export function SummaryCard({ stats, previousTotal, settings }: SummaryCardProps) {
  const { currency, monthlyBudget } = settings
  const delta = previousTotal > 0 ? (stats.total - previousTotal) / previousTotal : 0
  const hasComparison = previousTotal > 0
  const up = delta > 0.001
  const down = delta < -0.001

  return (
    <GlassCard strong className="animate-scale-in p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-white/60">Spent this month</p>
          <p className="tabular mt-1 break-words text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {formatMoney(stats.total, currency)}
          </p>
        </div>

        <BudgetRing spent={stats.total} budget={monthlyBudget} currency={currency} />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span
          className={[
            'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
            up && 'bg-rose-500/15 text-rose-300',
            down && 'bg-emerald-500/15 text-emerald-300',
            !up && !down && 'bg-white/10 text-white/60',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {up && <ArrowUpRight className="h-3.5 w-3.5" />}
          {down && <ArrowDownRight className="h-3.5 w-3.5" />}
          {!up && !down && <Minus className="h-3.5 w-3.5" />}
          {hasComparison
            ? `${Math.abs(delta * 100).toFixed(0)}% vs last month`
            : 'No prior data'}
        </span>
        <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/60">
          {stats.count} {stats.count === 1 ? 'transaction' : 'transactions'}
        </span>
      </div>
    </GlassCard>
  )
}
