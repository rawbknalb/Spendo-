# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Spendo is a client-only spending-overview web app (React + TypeScript + Vite +
Tailwind) with an Apple-style frosted-glass UI. There is **no backend** — all
state lives in the browser's `localStorage`. The whole app is a single page that
shows one month at a time.

## Commands

```bash
npm run dev      # Vite dev server at http://localhost:5173
npm run build    # tsc -b (strict type-check) then vite build → dist/
npm run preview  # serve the production build
npm run lint     # ESLint
```

There is no test runner configured. `npm run build` is the primary correctness
gate — TypeScript runs in **strict** mode with `noUnusedLocals` and
`noUnusedParameters`, so unused imports/vars fail the build. Always run
`npm run build` before committing.

## Architecture

Data flows one way from a single hook down through presentational components:

- **`src/hooks/useTransactions.ts`** is the single source of truth. It owns the
  `transactions` and `settings` state, persists every mutation to
  `localStorage`, seeds sample data on first run, and returns transactions
  pre-sorted newest-first. `App.tsx` calls this once; everything else receives
  data via props. If you add a new field to the data model, thread it through
  here first.

- **`src/lib/`** holds all non-React logic, kept pure and unit-testable:
  - `storage.ts` — `localStorage` read/write under `spendo.*` keys, plus
    `DEFAULT_SETTINGS`. All access is wrapped in try/catch and fails silently.
  - `stats.ts` — derived data: `computeMonthStats` (totals, per-category
    breakdown with shares, cumulative curve), `computeTrend` (last N months),
    and the `transactionsForMonth` filter. This is where spending math lives.
  - `categories.ts` — the fixed `CATEGORIES` catalogue. Each category carries a
    two-stop gradient (`from`/`to`) that is the **single colour source** for the
    donut, category bars, transaction icons, and the add-expense picker.
  - `format.ts` — money (`Intl.NumberFormat`) and month/date helpers. Months are
    keyed as `YYYY-MM` strings everywhere; use `monthKey`/`shiftMonth` rather
    than juggling `Date` objects.

- **`src/components/`** are presentational and stateless except for local UI
  state (open/closed sheets, hover). `App.tsx` computes all derived values with
  `useMemo` and passes them down.

### Conventions

- **Months are `YYYY-MM` strings.** Filtering, navigation, and the trend chart
  all rely on string comparison of these keys. Don't introduce `Date`-based
  month logic in components.
- **Amounts** are positive numbers in major currency units (e.g. `12.50`).
  Currency formatting is centralized in `format.ts` — never hand-format money.
- **Charts are hand-rolled SVG** (`CategoryDonut`, `BudgetRing`, `TrendChart`) —
  there is no charting library. Match this approach for new visualizations.
- **The glass look** comes from the `.glass` / `.glass-strong` / `.glass-sheen`
  component classes in `src/index.css` (backdrop-blur + translucency) layered
  over the animated `Background`. Reuse `GlassCard` for new surfaces rather than
  re-deriving the blur/border/shadow stack.
- **Category colors**: pull gradients from `getCategory(id)`; never hardcode a
  hex for a category-related element.
- Tailwind is the styling system; prefer utility classes. Custom design tokens
  (radii, animations, fonts) live in `tailwind.config.js`.

### First-run / data reset

On first load with no stored data, `useTransactions` seeds demo transactions
from `src/lib/sample.ts` and sets a `spendo.seeded.v1` flag so an
intentionally-emptied app stays empty. To reset during development, clear the
`spendo.*` keys from `localStorage`.
