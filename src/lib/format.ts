/** Format an amount as currency, hiding cents when the value is whole-ish. */
export function formatMoney(amount: number, currency = 'EUR'): string {
  const fractionDigits = Number.isInteger(amount) ? 0 : 2
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: 2,
  }).format(amount)
}

const symbolCache = new Map<string, string>()

/** Currency symbol for input prefixes, cached per currency code. */
export function currencySymbol(currency: string): string {
  const cached = symbolCache.get(currency)
  if (cached) return cached
  let symbol = '€'
  try {
    symbol =
      new Intl.NumberFormat(undefined, { style: 'currency', currency })
        .formatToParts(0)
        .find((p) => p.type === 'currency')?.value ?? '€'
  } catch {
    /* unknown currency code — fall back to € */
  }
  symbolCache.set(currency, symbol)
  return symbol
}
