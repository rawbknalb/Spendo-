# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Spendo is a client-only bill-splitting web app (React + TypeScript + Vite +
Tailwind) for **two people sharing fixed monthly expenses**. The split is
income-proportional: each person pays the same percentage of their own income,
so whoever earns more pays a larger share of the bills. There is **no
backend** — all state lives in the browser's `localStorage`.

The design is deliberately **minimal and monochrome**: near-black `#111111`,
grays (`#6B7280`, `#9CA3AF`, `#E5E7EB`), white cards on `#F7F7F7`. No accent
colors, no gradients, no emojis, no glass/blur effects. Icons are Lucide.
Keep it that way — the owner explicitly rejected colorful/playful styling.

## Commands

```bash
npm run dev      # Vite dev server at http://localhost:5173
npm run build    # tsc -b (strict type-check) then vite build → dist/
npm run preview  # serve the production build
npm run lint     # ESLint (flat config, typescript-eslint + react-hooks)
```

There is no test runner configured. `npm run build` is the primary correctness
gate — TypeScript runs in **strict** mode with `noUnusedLocals` and
`noUnusedParameters`, so unused imports/vars fail the build. Always run
`npm run build` before committing.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages. Feature-branch pushes do **not** deploy — merge to
`main` when the user wants to see changes live.

## Architecture

Data flows one way from a single hook down through presentational components:

- **`src/hooks/useSplitter.ts`** is the single source of truth. It owns
  `expenses` and `settings`, persists every mutation to `localStorage`, and
  seeds sample expenses on first run. Mutations: `addExpense`,
  `updateExpense`, `removeExpense`, `updateSettings`. `App.tsx` calls this
  once; everything else receives data via props.

- **`src/lib/`** holds all non-React logic, kept pure:
  - `splitter.ts` — `computeSplit(expenses, settings)` returns the
    `SplitResult` (total, each person's ratio/share/percent-of-income).
    Falls back to 50:50 with `hasIncome: false` when either income is 0.
    This is the core domain logic.
  - `storage.ts` — `localStorage` read/write under `spendo.expenses.v1` /
    `spendo.splitter.v1`, plus `DEFAULT_SETTINGS`. All access is wrapped in
    try/catch and fails silently.
  - `categories.ts` — fixed `CATEGORIES` catalogue plus
    `getCategoryIcon(id)` mapping category ids to Lucide icon components.
  - `format.ts` — `formatMoney` (Intl) and `currencySymbol` (cached).
    Never hand-format money.

- **`src/components/`** are presentational; the only state they own is local
  form/UI state:
  - `SplitSummaryCard` — hero card: total, thin split bar, one row per person.
  - `ExpenseList` — rows are clickable (opens edit); trash button deletes
    (stops propagation).
  - `AddExpenseSheet` — handles **both add and edit**: the optional `expense`
    prop switches mode, pre-fills the form, and changes title/button labels.
  - `PeopleSheet` — settings: currency picker, names, incomes.
  - `Sheet` — modal shell (bottom sheet on mobile, centered on desktop,
    Escape/backdrop closes).
  - `GlassCard` — plain white card (the name is historical; there's no glass
    effect anymore). Uses `.card` / `.card-strong` from `index.css`.

### Conventions

- **Amounts** are positive numbers in major currency units (e.g. `12.50`),
  rounded to cents on input (`Math.round(x * 100) / 100`).
- **The two people** are `settings.personA` / `personB` (`{ name, income }`).
  Person A is rendered as the primary (black) row, B as secondary (gray).
- **Styling**: Tailwind utilities with hardcoded hex values from the palette
  above. Shared surface/interaction classes (`.card`, `.card-strong`,
  `.pressable`, `.tabular`) live in `src/index.css`.
- **List/expensive components** are wrapped in `React.memo`; callbacks passed
  from `App.tsx` are wrapped in `useCallback` to keep memoization effective.

### First-run / data reset

On first load with no stored data, `useSplitter` seeds demo expenses from
`src/lib/sample.ts` and sets a `spendo.seeded.v2` flag so an intentionally
emptied app stays empty. To reset during development, clear the `spendo.*`
keys from `localStorage`.
