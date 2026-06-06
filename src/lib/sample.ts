import type { Transaction } from '../types'

interface SampleSpec {
  daysAgo: number
  amount: number
  categoryId: string
  note: string
}

/** A realistic spread of transactions so a first-run app never looks empty. */
const SPEC: SampleSpec[] = [
  { daysAgo: 0, amount: 4.5, categoryId: 'food', note: 'Morning coffee' },
  { daysAgo: 0, amount: 18.9, categoryId: 'food', note: 'Lunch' },
  { daysAgo: 1, amount: 62.4, categoryId: 'groceries', note: 'Weekly shop' },
  { daysAgo: 1, amount: 12.0, categoryId: 'transport', note: 'Metro card' },
  { daysAgo: 2, amount: 39.99, categoryId: 'fun', note: 'Streaming bundle' },
  { daysAgo: 3, amount: 24.0, categoryId: 'food', note: 'Dinner with friends' },
  { daysAgo: 4, amount: 9.5, categoryId: 'transport', note: 'Rideshare' },
  { daysAgo: 5, amount: 120.0, categoryId: 'shopping', note: 'New sneakers' },
  { daysAgo: 6, amount: 45.0, categoryId: 'health', note: 'Pharmacy' },
  { daysAgo: 8, amount: 1250.0, categoryId: 'home', note: 'Rent' },
  { daysAgo: 9, amount: 74.3, categoryId: 'bills', note: 'Electricity' },
  { daysAgo: 11, amount: 58.0, categoryId: 'groceries', note: 'Groceries' },
  { daysAgo: 13, amount: 33.5, categoryId: 'food', note: 'Brunch' },
  { daysAgo: 16, amount: 89.0, categoryId: 'shopping', note: 'Home supplies' },
  { daysAgo: 20, amount: 16.0, categoryId: 'transport', note: 'Parking' },
  { daysAgo: 24, amount: 210.0, categoryId: 'travel', note: 'Train tickets' },
  { daysAgo: 38, amount: 1250.0, categoryId: 'home', note: 'Rent' },
  { daysAgo: 40, amount: 67.8, categoryId: 'groceries', note: 'Groceries' },
  { daysAgo: 44, amount: 95.0, categoryId: 'fun', note: 'Concert' },
  { daysAgo: 48, amount: 52.0, categoryId: 'bills', note: 'Internet' },
  { daysAgo: 52, amount: 140.0, categoryId: 'shopping', note: 'Jacket' },
  { daysAgo: 66, amount: 1250.0, categoryId: 'home', note: 'Rent' },
  { daysAgo: 70, amount: 80.0, categoryId: 'health', note: 'Dentist' },
  { daysAgo: 74, amount: 44.0, categoryId: 'food', note: 'Date night' },
]

export function createSampleTransactions(): Transaction[] {
  const now = Date.now()
  return SPEC.map((spec, index) => {
    const d = new Date()
    d.setDate(d.getDate() - spec.daysAgo)
    return {
      id: `sample-${index}`,
      amount: spec.amount,
      categoryId: spec.categoryId,
      note: spec.note,
      date: d.toISOString().slice(0, 10),
      createdAt: now - index * 1000,
    }
  })
}
