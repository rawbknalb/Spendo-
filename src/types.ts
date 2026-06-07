export interface Category {
  id: string
  label: string
}

export interface Expense {
  id: string
  label: string
  /** Positive amount in the major currency unit (e.g. 850.00). */
  amount: number
  /** Category id — used for colour and icon only. */
  categoryId: string
}

export interface Person {
  name: string
  /** Gross monthly income in the same currency as expenses. */
  income: number
}

export interface SplitterSettings {
  currency: string
  personA: Person
  personB: Person
}
