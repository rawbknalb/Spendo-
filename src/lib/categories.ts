import type { LucideIcon } from 'lucide-react'
import {
  Utensils,
  ShoppingCart,
  Car,
  ShoppingBag,
  Receipt,
  Home,
  Heart,
  Music,
  Plane,
  MoreHorizontal,
} from 'lucide-react'
import type { Category } from '../types'

export const CATEGORIES: Category[] = [
  { id: 'food',      label: 'Food & Drink',     from: '#fb7185', to: '#f43f5e' },
  { id: 'groceries', label: 'Groceries',         from: '#34d399', to: '#10b981' },
  { id: 'transport', label: 'Transport',         from: '#60a5fa', to: '#3b82f6' },
  { id: 'shopping',  label: 'Shopping',          from: '#f472b6', to: '#ec4899' },
  { id: 'bills',     label: 'Bills & Utilities', from: '#fbbf24', to: '#f59e0b' },
  { id: 'home',      label: 'Home & Rent',       from: '#a78bfa', to: '#8b5cf6' },
  { id: 'health',    label: 'Health',            from: '#2dd4bf', to: '#14b8a6' },
  { id: 'fun',       label: 'Entertainment',     from: '#818cf8', to: '#6366f1' },
  { id: 'travel',    label: 'Travel',            from: '#38bdf8', to: '#0ea5e9' },
  { id: 'other',     label: 'Other',             from: '#cbd5e1', to: '#94a3b8' },
]

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  food:      Utensils,
  groceries: ShoppingCart,
  transport: Car,
  shopping:  ShoppingBag,
  bills:     Receipt,
  home:      Home,
  health:    Heart,
  fun:       Music,
  travel:    Plane,
  other:     MoreHorizontal,
}

const CATEGORY_MAP = new Map(CATEGORIES.map((c) => [c.id, c]))

export function getCategory(id: string): Category {
  return CATEGORY_MAP.get(id) ?? CATEGORIES[CATEGORIES.length - 1]
}

export function getCategoryIcon(id: string): LucideIcon {
  return CATEGORY_ICONS[id] ?? MoreHorizontal
}
