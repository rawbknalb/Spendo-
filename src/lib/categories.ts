import type { Category } from '../types'

/**
 * Fixed catalogue of spending categories. Each carries a two-stop gradient so
 * charts, chips and the donut all share one consistent colour language.
 */
export const CATEGORIES: Category[] = [
  { id: 'food', label: 'Food & Drink', emoji: '🍔', from: '#fb7185', to: '#f43f5e' },
  { id: 'groceries', label: 'Groceries', emoji: '🛒', from: '#34d399', to: '#10b981' },
  { id: 'transport', label: 'Transport', emoji: '🚗', from: '#60a5fa', to: '#3b82f6' },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️', from: '#f472b6', to: '#ec4899' },
  { id: 'bills', label: 'Bills & Utilities', emoji: '🧾', from: '#fbbf24', to: '#f59e0b' },
  { id: 'home', label: 'Home & Rent', emoji: '🏠', from: '#a78bfa', to: '#8b5cf6' },
  { id: 'health', label: 'Health', emoji: '💊', from: '#2dd4bf', to: '#14b8a6' },
  { id: 'fun', label: 'Entertainment', emoji: '🎬', from: '#818cf8', to: '#6366f1' },
  { id: 'travel', label: 'Travel', emoji: '✈️', from: '#38bdf8', to: '#0ea5e9' },
  { id: 'other', label: 'Other', emoji: '✨', from: '#cbd5e1', to: '#94a3b8' },
]

const CATEGORY_MAP = new Map(CATEGORIES.map((c) => [c.id, c]))

export function getCategory(id: string): Category {
  return CATEGORY_MAP.get(id) ?? CATEGORIES[CATEGORIES.length - 1]
}
