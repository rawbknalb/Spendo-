import type { Expense, SplitterSettings } from '../types'

export interface SplitResult {
  total: number
  /** personA.income / combined (0–1). 0.5 when incomes unknown. */
  ratioA: number
  ratioB: number
  /** Amount person A should pay. */
  shareA: number
  shareB: number
  /** What percentage of personA's income goes to shared expenses. */
  pctOfIncomeA: number
  pctOfIncomeB: number
  /** True only when both incomes are greater than zero. */
  hasIncome: boolean
}

export function computeSplit(
  expenses: Expense[],
  settings: SplitterSettings,
): SplitResult {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)
  const { personA, personB } = settings

  const combined = personA.income + personB.income
  const hasIncome = personA.income > 0 && personB.income > 0

  const ratioA = hasIncome ? personA.income / combined : 0.5
  const ratioB = hasIncome ? personB.income / combined : 0.5

  const shareA = total * ratioA
  const shareB = total * ratioB

  const pctOfIncomeA = hasIncome && personA.income > 0 ? (shareA / personA.income) * 100 : 0
  const pctOfIncomeB = hasIncome && personB.income > 0 ? (shareB / personB.income) * 100 : 0

  return { total, ratioA, ratioB, shareA, shareB, pctOfIncomeA, pctOfIncomeB, hasIncome }
}
