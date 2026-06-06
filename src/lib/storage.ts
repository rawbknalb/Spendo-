import type { Settings, Transaction } from '../types'

const TX_KEY = 'spendo.transactions.v1'
const SETTINGS_KEY = 'spendo.settings.v1'
const SEED_KEY = 'spendo.seeded.v1'

export const DEFAULT_SETTINGS: Settings = {
  currency: 'USD',
  monthlyBudget: 2000,
}

export function loadTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(TX_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Transaction[]) : []
  } catch {
    return []
  }
}

export function saveTransactions(transactions: Transaction[]): void {
  try {
    localStorage.setItem(TX_KEY, JSON.stringify(transactions))
  } catch {
    /* storage full or unavailable — fail quietly */
  }
}

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return DEFAULT_SETTINGS
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings: Settings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
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
