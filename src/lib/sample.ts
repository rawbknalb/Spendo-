import type { Expense } from '../types'

export function createSampleExpenses(): Expense[] {
  return [
    { id: 'seed-rent', label: 'Rent', amount: 1200, categoryId: 'home' },
    { id: 'seed-electric', label: 'Electricity', amount: 85, categoryId: 'bills' },
    { id: 'seed-internet', label: 'Internet', amount: 45, categoryId: 'bills' },
    { id: 'seed-groceries', label: 'Weekly groceries', amount: 320, categoryId: 'groceries' },
    { id: 'seed-netflix', label: 'Netflix', amount: 18, categoryId: 'fun' },
    { id: 'seed-spotify', label: 'Spotify Family', amount: 15, categoryId: 'fun' },
    { id: 'seed-insurance', label: 'Home insurance', amount: 60, categoryId: 'health' },
    { id: 'seed-gym', label: 'Gym membership', amount: 50, categoryId: 'health' },
  ]
}
