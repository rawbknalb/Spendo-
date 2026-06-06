import type { MonthStats } from '../lib/stats'
import { getCategory } from '../lib/categories'
import { formatMoney } from '../lib/format'
import { GlassCard } from './GlassCard'
import { CategoryDonut } from './CategoryDonut'

interface CategoryBreakdownProps {
  stats: MonthStats
  currency: string
}

export function CategoryBreakdown({ stats, currency }: CategoryBreakdownProps) {
  const empty = stats.byCategory.length === 0

  return (
    <GlassCard className="animate-fade-in p-6">
      <h2 className="text-lg font-semibold tracking-tight">Where it went</h2>

      {empty ? (
        <p className="mt-6 text-sm text-white/50">
          No spending recorded for this month yet.
        </p>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-8">
          <div className="shrink-0">
            <CategoryDonut
              data={stats.byCategory}
              total={stats.total}
              currency={currency}
            />
          </div>

          <ul className="w-full space-y-3">
            {stats.byCategory.slice(0, 6).map((item) => {
              const cat = getCategory(item.categoryId)
              return (
                <li key={item.categoryId} className="flex items-center gap-3">
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-base shadow-inner"
                    style={{
                      background: `linear-gradient(135deg, ${cat.from}, ${cat.to})`,
                    }}
                  >
                    {cat.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm font-medium">
                        {cat.label}
                      </span>
                      <span className="tabular text-sm font-semibold">
                        {formatMoney(item.total, currency)}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.max(item.share * 100, 3)}%`,
                          background: `linear-gradient(90deg, ${cat.from}, ${cat.to})`,
                          transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)',
                        }}
                      />
                    </div>
                  </div>
                  <span className="tabular w-10 shrink-0 text-right text-xs font-medium text-white/50">
                    {Math.round(item.share * 100)}%
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </GlassCard>
  )
}
