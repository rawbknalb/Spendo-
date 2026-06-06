import type { Expense, SplitterSettings } from '../types'

const EXPENSES_KEY = 'spendo.expenses.v1'
const SPLITTER_KEY = 'spendo.splitter.v1'
const SEED_KEY = 'spendo.seeded.v2'

export const DEFAULT_SETTINGS: SplitterSettings = {
  currency: 'EUR',
  personA: { name: 'Person A', income: 0 },
  personB: { name: 'Person B', income: 0 },
}

export function loadExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(EXPENSES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Expense[]) : []
  } catch {
    return []
  }
}

export function saveExpenses(expenses: Expense[]): void {
  try {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses))
  } catch {
    /* storage full or unavailable — fail quietly */
  }
}

export function loadSettings(): SplitterSettings {
  try {
    const raw = localStorage.getItem(SPLITTER_KEY)
    if (!raw) return DEFAULT_SETTINGS
    const parsed = JSON.parse(raw) as Partial<SplitterSettings>
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      personA: { ...DEFAULT_SETTINGS.personA, ...(parsed.personA ?? {}) },
      personB: { ...DEFAULT_SETTINGS.personB, ...(parsed.personB ?? {}) },
    }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings: SplitterSettings): void {
  try {
    localStorage.setItem(SPLITTER_KEY, JSON.stringify(settings))
  } catch {
    /* ignore */
  }
}

export function hasSeeded(): boolean {
  return localStorage.getItem(SEED_KEY) === 'true'
}

export function markSeeded(): void {
  try {
    localStorage.setItem(SEED_KEY, 'true')
  } catch {
    /* ignore */
  }
}
