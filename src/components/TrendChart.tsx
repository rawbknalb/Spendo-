import type { TrendPoint } from '../lib/stats'
import { formatCompact, formatShortMonth } from '../lib/format'
import { GlassCard } from './GlassCard'

interface TrendChartProps {
  data: TrendPoint[]
  activeKey: string
  currency: string
  onSelect: (key: string) => void
}

export function TrendChart({ data, activeKey, currency, onSelect }: TrendChartProps) {
  const max = Math.max(...data.map((d) => d.total), 1)
  const avg = data.reduce((s, d) => s + d.total, 0) / Math.max(data.length, 1)

  return (
    <GlassCard className="animate-fade-in p-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold tracking-tight">6-month trend</h2>
        <span className="text-xs font-medium text-white/50">
          avg {formatCompact(avg, currency)}/mo
        </span>
      </div>

      <div className="mt-6 flex h-44 items-end justify-between gap-2 sm:gap-3">
        {data.map((point) => {
          const heightPct = (point.total / max) * 100
          const isActive = point.key === activeKey
          return (
            <button
              key={point.key}
              type="button"
              onClick={() => onSelect(point.key)}
              className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <span
                className={`tabular text-[10px] font-semibold transition-opacity ${
                  isActive ? 'text-white' : 'text-white/0 group-hover:text-white/70'
                }`}
              >
                {formatCompact(point.total, currency)}
              </span>
              <div className="flex w-full flex-1 items-end justify-center">
                <div
                  className="w-full max-w-[2.6rem] rounded-t-xl"
                  style={{
                    height: `${Math.max(heightPct, 2)}%`,
                    background: isActive
                      ? 'linear-gradient(180deg, #c4b5fd, #8b5cf6)'
                      : 'linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.10))',
                    transition: 'height 0.6s cubic-bezier(0.22,1,0.36,1), background 0.2s',
                  }}
                />
              </div>
              <span
                className={`text-[11px] font-medium ${
                  isActive ? 'text-white' : 'text-white/45'
                }`}
              >
                {formatShortMonth(point.key)}
              </span>
            </button>
          )
        })}
      </div>
    </GlassCard>
  )
}
