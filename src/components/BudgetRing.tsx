import { formatCompact } from '../lib/format'

interface BudgetRingProps {
  spent: number
  budget: number
  currency: string
}

/** Apple-Watch-style progress ring showing spend against the monthly budget. */
export function BudgetRing({ spent, budget, currency }: BudgetRingProps) {
  const size = 104
  const stroke = 11
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const ratio = budget > 0 ? Math.min(spent / budget, 1) : 0
  const over = budget > 0 && spent > budget
  const pct = budget > 0 ? Math.round((spent / budget) * 100) : 0
  const dash = circumference * ratio

  const gradId = 'budget-ring-grad'
  const stops = over
    ? ['#fb7185', '#ef4444']
    : ['#a78bfa', '#22d3ee']

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stops[0]} />
            <stop offset="100%" stopColor={stops[1]} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          style={{ transition: 'stroke-dasharray 0.7s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div
            className={`tabular text-xl font-bold leading-none ${
              over ? 'text-rose-300' : 'text-white'
            }`}
          >
            {pct}%
          </div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-wide text-white/50">
            of {formatCompact(budget, currency)}
          </div>
        </div>
      </div>
    </div>
  )
}
