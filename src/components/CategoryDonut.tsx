import { useState } from 'react'
import type { CategoryTotal } from '../lib/stats'
import { getCategory } from '../lib/categories'
import { formatMoney } from '../lib/format'

interface CategoryDonutProps {
  data: CategoryTotal[]
  total: number
  currency: string
}

interface Arc {
  categoryId: string
  path: string
  from: string
  to: string
}

const SIZE = 200
const STROKE = 26
const RADIUS = (SIZE - STROKE) / 2
const CENTER = SIZE / 2
const GAP = 0.022 // radians between segments

function polar(angle: number, r = RADIUS) {
  return {
    x: CENTER + r * Math.cos(angle),
    y: CENTER + r * Math.sin(angle),
  }
}

function arcPath(start: number, end: number): string {
  const s = polar(start)
  const e = polar(end)
  const large = end - start > Math.PI ? 1 : 0
  return `M ${s.x} ${s.y} A ${RADIUS} ${RADIUS} 0 ${large} 1 ${e.x} ${e.y}`
}

export function CategoryDonut({ data, total, currency }: CategoryDonutProps) {
  const [active, setActive] = useState<string | null>(null)

  const arcs: Arc[] = []
  let cursor = -Math.PI / 2 // start at top
  for (const item of data) {
    const sweep = item.share * Math.PI * 2
    if (sweep <= 0) continue
    const start = cursor + GAP / 2
    const end = cursor + sweep - GAP / 2
    if (end > start) {
      const cat = getCategory(item.categoryId)
      arcs.push({
        categoryId: item.categoryId,
        path: arcPath(start, end),
        from: cat.from,
        to: cat.to,
      })
    }
    cursor += sweep
  }

  const activeItem = active ? data.find((d) => d.categoryId === active) : null
  const centerLabel = activeItem
    ? getCategory(activeItem.categoryId).label
    : 'Total'
  const centerValue = activeItem ? activeItem.total : total

  return (
    <div className="relative grid place-items-center" style={{ width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE}>
        <defs>
          {arcs.map((arc) => (
            <linearGradient
              key={arc.categoryId}
              id={`donut-${arc.categoryId}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={arc.from} />
              <stop offset="100%" stopColor={arc.to} />
            </linearGradient>
          ))}
        </defs>
        {arcs.length === 0 && (
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={STROKE}
          />
        )}
        {arcs.map((arc) => {
          const dimmed = active && active !== arc.categoryId
          return (
            <path
              key={arc.categoryId}
              d={arc.path}
              fill="none"
              stroke={`url(#donut-${arc.categoryId})`}
              strokeWidth={active === arc.categoryId ? STROKE + 4 : STROKE}
              strokeLinecap="round"
              style={{
                opacity: dimmed ? 0.3 : 1,
                transition: 'opacity 0.2s, stroke-width 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setActive(arc.categoryId)}
              onMouseLeave={() => setActive(null)}
            />
          )
        })}
      </svg>
      <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-white/50">
            {centerLabel}
          </div>
          <div className="tabular mt-1 text-2xl font-bold tracking-tight">
            {formatMoney(centerValue, currency)}
          </div>
        </div>
      </div>
    </div>
  )
}
