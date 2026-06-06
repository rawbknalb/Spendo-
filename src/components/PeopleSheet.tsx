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
      personA: {
        name: nameA.trim() || 'Person A',
        income: Number.isNaN(parsedA) || parsedA < 0 ? 0 : parsedA,
      },
      personB: {
        name: nameB.trim() || 'Person B',
        income: Number.isNaN(parsedB) || parsedB < 0 ? 0 : parsedB,
      },
    })
    onClose()
  }

  return (
    <Sheet open={open} title="People & Currency" onClose={onClose}>
      <div className="space-y-6">
        {/* Currency */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
            Currency
          </label>
          <div className="grid grid-cols-4 gap-2">
            {CURRENCIES.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setCurrency(code)}
                className={`pressable rounded-2xl border px-2 py-2.5 text-sm font-semibold transition-colors ${
                  currency === code
                    ? 'border-white/60 bg-white/15'
                    : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Person A */}
        <PersonSection
          label="Person A"
          accentClass="text-violet-300"
          name={nameA}
          income={incomeA}
          currency={currency}
          onNameChange={setNameA}
          onIncomeChange={setIncomeA}
        />

        {/* Person B */}
        <PersonSection
          label="Person B"
          accentClass="text-cyan-300"
          name={nameB}
          income={incomeB}
          currency={currency}
          onNameChange={setNameB}
          onIncomeChange={setIncomeB}
        />

        <button
          type="button"
          onClick={save}
          className="pressable w-full rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-3.5 text-base font-semibold shadow-lg shadow-violet-500/25"
        >
          Save
        </button>
      </div>
    </Sheet>
  )
}

interface PersonSectionProps {
  label: string
  accentClass: string
  name: string
  income: string
  currency: string
  onNameChange: (v: string) => void
  onIncomeChange: (v: string) => void
}

function PersonSection({
  label,
  accentClass,
  name,
  income,
  currency,
  onNameChange,
  onIncomeChange,
}: PersonSectionProps) {
  return (
    <div className="space-y-3">
      <p className={`text-sm font-semibold ${accentClass}`}>{label}</p>
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-white/25"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
          Monthly income ({currency})
        </label>
        <input
          inputMode="decimal"
          placeholder="0"
          value={income}
          onChange={(e) => onIncomeChange(e.target.value.replace(/[^0-9.]/g, ''))}
          className="tabular w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-lg font-semibold outline-none focus:border-white/25"
        />
      </div>
    </div>
  )
}
