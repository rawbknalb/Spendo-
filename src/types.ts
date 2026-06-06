export interface Category {
  id: string
  label: string
  emoji: string
  /** Two-stop gradient used across charts, chips and icons. */
  from: string
  to: string
}

export interface Transaction {
  id: string
  /** Positive amount in the major currency unit (e.g. 12.50). */
  amount: number
  categoryId: string
  note: string
  /** ISO date string, `YYYY-MM-DD`. */
  date: string
  createdAt: number
}

export interface Settings {
  currency: string
  /** Target spend for a single month, in the major currency unit. */
  monthlyBudget: number
}
