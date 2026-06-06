# 💸 Spendo

A beautiful, modern **spending overview** app with an Apple-style frosted-glass
interface. See exactly what you spend each month — at a glance.

![Made with React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6)
![Vite](https://img.shields.io/badge/Vite-5-646cff)

## Features

- **Monthly overview** — total spend, transaction count, and month-over-month change.
- **Budget ring** — an Apple-Watch-style progress ring against your monthly budget.
- **Category breakdown** — an interactive donut chart + ranked category bars.
- **6-month trend** — tap any bar to jump to that month.
- **Quick add** — log an expense with amount, category, note, and date in seconds.
- **Glassmorphism UI** — animated mesh-gradient backdrop with frosted-glass cards.
- **Offline-first** — everything is stored locally in your browser. No account, no backend.

> First launch seeds a few sample transactions so the app never looks empty.
> Delete them anytime, or clear `localStorage` to start fresh.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
npm run lint     # run ESLint
```

## Tech stack

- **React 18** + **TypeScript** (strict mode)
- **Vite 5** for dev/build tooling
- **Tailwind CSS 3** for styling
- **lucide-react** for icons
- Hand-rolled **SVG charts** (donut, budget ring, trend bars) — no chart library

## Data & privacy

All data lives in your browser's `localStorage` under the `spendo.*` keys.
Nothing is ever sent anywhere.
