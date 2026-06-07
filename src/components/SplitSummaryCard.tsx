import { AlertCircle } from 'lucide-react'
import type { SplitterSettings } from '../types'
import type { SplitResult } from '../lib/splitter'
import { formatMoney } from '../lib/format'
import { GlassCard } from './GlassCard'

interface SplitSummaryCardProps {
  split: SplitResult
  settings: SplitterSettings
}

export function SplitSummaryCard({ split, settings }: SplitSummaryCardProps) {
  const { currency, personA, personB } = settings
  const { total, shareA, shareB, ratioA, ratioB, pctOfIncomeA, hasIncome } = split

  return (
    <GlassCard strong className="animate-scale-in p-6 sm:p-7">
      <p className="text-xs font-medium uppercase tracking-widest text-[#9CA3AF]">
        Monthly shared expenses
      </p>
      <p className="tabular mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        {formatMoney(total, currency)}
      </p>

      {/* Split bar */}
      <div className="mt-5 h-[3px] overflow-hidden rounded-full bg-[#F3F4F6]">
        <div
          className="h-full rounded-full bg-[#111111] transition-all duration-700"
          style={{ width: `${ratioA * 100}%` }}
        />
      </div>

      {/* Person rows */}
      <div className="mt-4 divide-y divide-[#F3F4F6]">
        <PersonRow
          name={personA.name}
          share={shareA}
          ratio={ratioA}
          pctOfIncome={pctOfIncomeA}
          currency={currency}
          hasIncome={hasIncome}
          primary
        />
        <PersonRow
          name={personB.name}
          share={shareB}
          ratio={ratioB}
          pctOfIncome={pctOfIncomeA}
          currency={currency}
          hasIncome={hasIncome}
          primary={false}
        />
      </div>

      {hasIncome ? (
        <p className="mt-4 text-xs text-[#9CA3AF]">
          Each contributes {pctOfIncomeA.toFixed(1)}% of their income
        </p>
      ) : (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-2.5 text-xs text-[#6B7280]">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9CA3AF]" />
          <span>Add incomes in settings for a proportional split</span>
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
  primary: boolean
}

function PersonRow({ name, share, ratio, pctOfIncome, currency, hasIncome, primary }: PersonRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className={`text-sm font-semibold ${primary ? 'text-[#111111]' : 'text-[#6B7280]'}`}>
          {name}
        </p>
        <p className="mt-0.5 text-xs text-[#9CA3AF]">
          {Math.round(ratio * 100)}% of total
          {hasIncome && ` · ${pctOfIncome.toFixed(1)}% of income`}
        </p>
      </div>
      <span className={`tabular shrink-0 text-lg font-bold ${primary ? 'text-[#111111]' : 'text-[#6B7280]'}`}>
        {formatMoney(share, currency)}
      </span>
    </div>
  )
}
