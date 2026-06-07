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
  { id: 'food',      label: 'Food & Drink' },
  { id: 'groceries', label: 'Groceries' },
  { id: 'transport', label: 'Transport' },
  { id: 'shopping',  label: 'Shopping' },
  { id: 'bills',     label: 'Bills & Utilities' },
  { id: 'home',      label: 'Home & Rent' },
  { id: 'health',    label: 'Health' },
  { id: 'fun',       label: 'Entertainment' },
  { id: 'travel',    label: 'Travel' },
  { id: 'other',     label: 'Other' },
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
