import { useCallback, useEffect, useState } from 'react'
import type { Expense, SplitterSettings } from '../types'
import {
  DEFAULT_SETTINGS,
  hasSeeded,
  loadExpenses,
  loadSettings,
  markSeeded,
  saveExpenses,
  saveSettings,
} from '../lib/storage'
import { createSampleExpenses } from '../lib/sample'

export interface NewExpense {
  label: string
  amount: number
  categoryId: string
}

function makeId(): string {
  return `exp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export function useSplitter() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [settings, setSettings] = useState<SplitterSettings>(DEFAULT_SETTINGS)

  useEffect(() => {
    const stored = loadExpenses()
    if (stored.length === 0 && !hasSeeded()) {
      const seed = createSampleExpenses()
      setExpenses(seed)
      saveExpenses(seed)
      markSeeded()
    } else {
      setExpenses(stored)
    }
    setSettings(loadSettings())
  }, [])

  const addExpense = useCallback((input: NewExpense) => {
    setExpenses((prev) => {
      const next = [...prev, { ...input, id: makeId() }]
      saveExpenses(next)
      return next
    })
  }, [])

  const removeExpense = useCallback((id: string) => {
    setExpenses((prev) => {
      const next = prev.filter((e) => e.id !== id)
      saveExpenses(next)
      return next
    })
  }, [])

  const updateSettings = useCallback((patch: Partial<SplitterSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch }
      saveSettings(next)
      return next
    })
  }, [])

  return { expenses, settings, addExpense, removeExpense, updateSettings }
}
