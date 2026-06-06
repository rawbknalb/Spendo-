import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatMonthLabel, shiftMonth } from '../lib/format'
import { currentMonthKey } from '../lib/stats'

interface MonthSwitcherProps {
  monthKey: string
  onChange: (key: string) => void
}

export function MonthSwitcher({ monthKey, onChange }: MonthSwitcherProps) {
  const isCurrentOrFuture = monthKey >= currentMonthKey()

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        aria-label="Previous month"
        onClick={() => onChange(shiftMonth(monthKey, -1))}
        className="pressable grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <div className="min-w-[10.5rem] text-center text-base font-semibold tracking-tight">
        {formatMonthLabel(monthKey)}
      </div>
      <button
        type="button"
        aria-label="Next month"
        disabled={isCurrentOrFuture}
        onClick={() => onChange(shiftMonth(monthKey, 1))}
        className="pressable grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 enabled:hover:bg-white/10 disabled:opacity-30"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
