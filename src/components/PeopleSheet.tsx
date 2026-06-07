import { useEffect, useState } from 'react'
import type { SplitterSettings } from '../types'
import { Sheet } from './Sheet'

interface PeopleSheetProps {
  open: boolean
  settings: SplitterSettings
  onClose: () => void
  onSave: (patch: Partial<SplitterSettings>) => void
}

const CURRENCIES = ['EUR', 'USD', 'GBP', 'CHF', 'CAD', 'AUD', 'JPY', 'SEK']

export function PeopleSheet({ open, settings, onClose, onSave }: PeopleSheetProps) {
  const [currency, setCurrency] = useState(settings.currency)
  const [nameA, setNameA] = useState(settings.personA.name)
  const [incomeA, setIncomeA] = useState(String(settings.personA.income || ''))
  const [nameB, setNameB] = useState(settings.personB.name)
  const [incomeB, setIncomeB] = useState(String(settings.personB.income || ''))

  useEffect(() => {
    if (open) {
      setCurrency(settings.currency)
      setNameA(settings.personA.name)
      setIncomeA(settings.personA.income > 0 ? String(settings.personA.income) : '')
      setNameB(settings.personB.name)
      setIncomeB(settings.personB.income > 0 ? String(settings.personB.income) : '')
    }
  }, [open, settings])

  function save() {
    const parsedA = parseFloat(incomeA)
    const parsedB = parseFloat(incomeB)
    onSave({
      currency,
      personA: { name: nameA.trim() || 'Person A', income: Number.isNaN(parsedA) || parsedA < 0 ? 0 : parsedA },
      personB: { name: nameB.trim() || 'Person B', income: Number.isNaN(parsedB) || parsedB < 0 ? 0 : parsedB },
    })
    onClose()
  }

  return (
    <Sheet open={open} title="Settings" onClose={onClose}>
      <div className="space-y-6">
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[#9CA3AF]">
            Currency
          </label>
          <div className="grid grid-cols-4 gap-2">
            {CURRENCIES.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setCurrency(code)}
                className={`pressable rounded-xl border py-2.5 text-sm font-medium transition-colors ${
                  currency === code
                    ? 'border-[#111111] bg-[#111111] text-white'
                    : 'border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] hover:border-[#9CA3AF]'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        <PersonSection
          label="Person 1"
          name={nameA}
          income={incomeA}
          currency={currency}
          onNameChange={setNameA}
          onIncomeChange={setIncomeA}
        />

        <PersonSection
          label="Person 2"
          name={nameB}
          income={incomeB}
          currency={currency}
          onNameChange={setNameB}
          onIncomeChange={setIncomeB}
        />

        <button
          type="button"
          onClick={save}
          className="pressable w-full rounded-xl bg-[#111111] py-3.5 text-sm font-semibold text-white"
        >
          Save
        </button>
      </div>
    </Sheet>
  )
}

interface PersonSectionProps {
  label: string
  name: string
  income: string
  currency: string
  onNameChange: (v: string) => void
  onIncomeChange: (v: string) => void
}

function PersonSection({ label, name, income, currency, onNameChange, onIncomeChange }: PersonSectionProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-widest text-[#9CA3AF]">{label}</p>
      <div>
        <label className="mb-1 block text-xs text-[#9CA3AF]">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3 text-sm outline-none focus:border-[#111111]"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs text-[#9CA3AF]">Monthly income ({currency})</label>
        <input
          inputMode="decimal"
          placeholder="0"
          value={income}
          onChange={(e) => onIncomeChange(e.target.value.replace(/[^0-9.]/g, ''))}
          className="tabular w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3 text-lg font-semibold outline-none focus:border-[#111111]"
        />
      </div>
    </div>
  )
}
