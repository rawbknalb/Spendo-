import type { Transaction } from '../types'
import { monthKey, monthKeyFromISO, shiftMonth } from './format'

export interface CategoryTotal {
  categoryId: string
  total: number
  count: number
  share: number
}

export interface MonthStats {
  key: string
  total: number
  count: number
  byCategory: CategoryTotal[]
  topCategoryId: string | null
  /** Running total per day-of-month, for the sparkline. */
  cumulative: { day: number; total: number }[]
}

export interface TrendPoint {
  key: string
  total: number
}

export function transactionsForMonth(
  transactions: Transaction[],
  key: string,
): Transaction[] {
  return transactions.filter((t) => monthKeyFromISO(t.date) === key)
}

export function computeMonthStats(
  transactions: Transaction[],
  key: string,
): MonthStats {
  const inMonth = transactionsForMonth(transactions, key)
  const total = inMonth.reduce((sum, t) => sum + t.amount, 0)

  const totals = new Map<string, { total: number; count: number }>()
  for (const t of inMonth) {
    const entry = totals.get(t.categoryId) ?? { total: 0, count: 0 }
    entry.total += t.amount
    entry.count += 1
    totals.set(t.categoryId, entry)
  }

  const byCategory: CategoryTotal[] = [...totals.entries()]
    .map(([categoryId, { total: catTotal, count }]) => ({
      categoryId,
      total: catTotal,
      count,
      share: total > 0 ? catTotal / total : 0,
    }))
    .sort((a, b) => b.total - a.total)

  // Build a per-day cumulative curve across the whole month.
  const [year, month] = key.split('-').map(Number)
  const daysInMonth = new Date(year, month, 0).getDate()
  const perDay = new Array<number>(daysInMonth + 1).fill(0)
  for (const t of inMonth) {
    const day = Number(t.date.slice(8, 10))
    if (day >= 1 && day <= daysInMonth) perDay[day] += t.amount
  }
  let running = 0
  const cumulative = []
  for (let day = 1; day <= daysInMonth; day++) {
    running += perDay[day]
    cumulative.push({ day, total: running })
  }

  return {
    key,
    total,
    count: inMonth.length,
    byCategory,
    topCategoryId: byCategory[0]?.categoryId ?? null,
    cumulative,
  }
}

/** Totals for the last `count` months ending at `key`, oldest → newest. */
export function computeTrend(
  transactions: Transaction[],
  key: string,
  count = 6,
): TrendPoint[] {
  const points: TrendPoint[] = []
  for (let i = count - 1; i >= 0; i--) {
    const k = shiftMonth(key, -i)
    const total = transactionsForMonth(transactions, k).reduce(
      (sum, t) => sum + t.amount,
      0,
    )
    points.push({ key: k, total })
  }
  return points
}

export function currentMonthKey(): string {
  return monthKey(new Date())
}
