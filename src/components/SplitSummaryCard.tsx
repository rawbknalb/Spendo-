import { AlertCircle } from 'lucide-react'
import type { SplitterSettings } from '../types'
import type { SplitResult } from '../lib/splitter'
import { formatMoney } from '../lib/format'
import { GlassCard } from './GlassCard'
import { IncomeRing } from './IncomeRing'

interface SplitSummaryCardProps {
  split: SplitResult
  settings: SplitterSettings
}

export function SplitSummaryCard({ split, settings }: SplitSummaryCardProps) {
  const { currency, personA, personB } = settings
  const { total, shareA, shareB, ratioA, ratioB, pctOfIncomeA, hasIncome } = split

  return (
    <GlassCard strong className="animate-scale-in p-6 sm:p-7">
      {/* Header row */}
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-400">Monthly shared expenses</p>
          <p className="tabular mt-1 break-words text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {formatMoney(total, currency)}
          </p>
        </div>
        <IncomeRing
          ratioA={ratioA}
          ratioB={ratioB}
          nameA={personA.name}
          nameB={personB.name}
        />
      </div>

      {/* Person rows */}
      <div className="mt-5 space-y-3">
        <PersonRow
          name={personA.name}
          share={shareA}
          ratio={ratioA}
          pctOfIncome={pctOfIncomeA}
          currency={currency}
          hasIncome={hasIncome}
          colorClass="text-[#007AFF]"
          bgClass="bg-[#007AFF]/10"
        />
        <PersonRow
          name={personB.name}
          share={shareB}
          ratio={ratioB}
          pctOfIncome={pctOfIncomeA}
          currency={currency}
          hasIncome={hasIncome}
          colorClass="text-[#1a9e3f]"
          bgClass="bg-[#34C759]/10"
        />
      </div>

      {/* Footer */}
      {hasIncome ? (
        <p className="mt-4 text-xs text-gray-400">
          Both contribute ~{pctOfIncomeA.toFixed(1)}% of their income
        </p>
      ) : (
        <div className="mt-4 flex items-start gap-2 rounded-2xl bg-amber-50 px-3 py-2.5 text-xs text-amber-700">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>Add your incomes in settings for a fair, income-proportional split</span>
        </div>
      )}
    </GlassCard>
  )
}

interface PersonRowProps {
  name: string
  share: number
  ratio: number
  pctOfIncome: number
  currency: string
  hasIncome: boolean
  colorClass: string
  bgClass: string
}

function PersonRow({
  name,
  share,
  ratio,
  pctOfIncome,
  currency,
  hasIncome,
  colorClass,
  bgClass,
}: PersonRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-black/[0.04] px-4 py-3">
      <div className="flex items-center gap-2 min-w-0">
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${bgClass} ${colorClass}`}>
          {name}
        </span>
        <span className="truncate text-xs text-gray-400">
          {Math.round(ratio * 100)}% of expenses
          {hasIncome && ` · ${pctOfIncome.toFixed(1)}% of income`}
        </span>
      </div>
      <span className={`tabular shrink-0 text-lg font-bold ${colorClass}`}>
        {formatMoney(share, currency)}
      </span>
    </div>
  )
}
