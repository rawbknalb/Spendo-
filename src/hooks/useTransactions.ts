import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Settings, Transaction } from '../types'
import {
  DEFAULT_SETTINGS,
  hasSeeded,
  loadSettings,
  loadTransactions,
  markSeeded,
  saveSettings,
  saveTransactions,
} from '../lib/storage'
import { createSampleTransactions } from '../lib/sample'

export interface NewTransaction {
  amount: number
  categoryId: string
  note: string
  date: string
}

function makeId(): string {
  return `tx-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

/**
 * Single source of truth for all spending data. Owns transactions + settings,
 * persists every change to localStorage, and seeds sample data on first run.
 */
export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)

  // Hydrate from storage once, seeding demo data the very first time.
  useEffect(() => {
    const stored = loadTransactions()
    if (stored.length === 0 && !hasSeeded()) {
      const seed = createSampleTransactions()
      setTransactions(seed)
      saveTransactions(seed)
      markSeeded()
    } else {
      setTransactions(stored)
    }
    setSettings(loadSettings())
  }, [])

  const addTransaction = useCallback((input: NewTransaction) => {
    setTransactions((prev) => {
      const next = [
        { ...input, id: makeId(), createdAt: Date.now() },
        ...prev,
      ]
      saveTransactions(next)
      return next
    })
  }, [])

  const removeTransaction = useCallback((id: string) => {
    setTransactions((prev) => {
      const next = prev.filter((t) => t.id !== id)
      saveTransactions(next)
      return next
    })
  }, [])

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch }
      saveSettings(next)
      return next
    })
  }, [])

  // Sorted newest-first; used by virtually every view.
  const sorted = useMemo(
    () =>
      [...transactions].sort((a, b) =>
        a.date === b.date ? b.createdAt - a.createdAt : a.date < b.date ? 1 : -1,
      ),
    [transactions],
  )

  return {
    transactions: sorted,
    settings,
    addTransaction,
    removeTransaction,
    updateSettings,
  }
}
