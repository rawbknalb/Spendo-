import { useEffect, useState } from 'react'
import type { Settings } from '../types'
import { Sheet } from './Sheet'

interface SettingsSheetProps {
  open: boolean
  settings: Settings
  onClose: () => void
  onSave: (patch: Partial<Settings>) => void
}

const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'SEK']

export function SettingsSheet({
  open,
  settings,
  onClose,
  onSave,
}: SettingsSheetProps) {
  const [budget, setBudget] = useState(String(settings.monthlyBudget))
  const [currency, setCurrency] = useState(settings.currency)

  // Re-sync local form when the sheet is (re)opened.
  useEffect(() => {
    if (open) {
      setBudget(String(settings.monthlyBudget))
      setCurrency(settings.currency)
    }
  }, [open, settings])

  function save() {
    const parsed = parseFloat(budget)
    onSave({
      currency,
      monthlyBudget: Number.isNaN(parsed) || parsed < 0 ? 0 : parsed,
    })
    onClose()
  }

  return (
    <Sheet open={open} title="Settings" onClose={onClose}>
      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
            Monthly budget
          </label>
          <input
            inputMode="decimal"
            value={budget}
            onChange={(e) => setBudget(e.target.value.replace(/[^0-9.]/g, ''))}
            className="tabular w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-lg font-semibold outline-none focus:border-white/25"
          />
        </div>

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
