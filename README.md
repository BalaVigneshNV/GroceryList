# GroceryList

[![CI](https://github.com/BalaVigneshNV/GroceryList/actions/workflows/ci.yml/badge.svg)](https://github.com/BalaVigneshNV/GroceryList/actions/workflows/ci.yml)
[![Deploy](https://github.com/BalaVigneshNV/GroceryList/actions/workflows/deploy.yml/badge.svg)](https://github.com/BalaVigneshNV/GroceryList/actions/workflows/deploy.yml)

An Indian Meals Grocery List Generator that helps families plan weekly meals and automatically generate categorized grocery lists tailored to Indian cooking habits, local units, and market styles.

## Features

- 📅 **Weekly Meal Planner** — 7-day × 3-meal grid with cuisine-grouped recipe selectors
- 🛍️ **Grocery List Generator** — items grouped by Indian market section with INR budget estimate
- 🏠 **Pantry Tracker** — stock management with expiry alerts
- 📖 **Recipe Library** — 15+ recipes filterable by cuisine (South Indian, North Indian, Gujarati, Bengali)
- 🎉 **Festival Templates** — Diwali, Pongal, and Eid quick-load menus
- 👨‍👩‍👧‍👦 **Meal Scaling** — adjust quantities for 2, 4, or 6 family members
- 📤 **Export** — download grocery list as CSV or Markdown

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### Run locally

```bash
# Start the backend API (http://localhost:3001)
cd backend && node server.js

# Start the frontend dev server (http://localhost:5173)
cd frontend && npm run dev
```

## CI/CD

This project uses **GitHub Actions** for continuous integration and deployment.

### Continuous Integration (`ci.yml`)

Runs on every push and pull request to any branch:

| Job | Steps |
|-----|-------|
| `backend-check` | Install deps → syntax-check `server.js` and `database.js` |
| `frontend-lint-build` | Install deps → ESLint → Vite build → upload build artifact |

### Continuous Deployment (`deploy.yml`)

Runs on every push to `main` (and can be triggered manually):

1. Installs frontend dependencies
2. Lints the frontend
3. Builds with `VITE_BASE_URL=/<repo-name>/` for GitHub Pages path correctness
4. Deploys the `frontend/dist` folder to **GitHub Pages**

#### Enable GitHub Pages

1. Go to **Settings → Pages** in this repository.
2. Under **Source**, select **GitHub Actions**.
3. Push a commit to `main` — the workflow will deploy automatically.

The live site will be available at:
`https://balavigneshnv.github.io/GroceryList/`

> **Note:** The backend API is not deployed by the GitHub Pages workflow (GitHub Pages serves only static files). To use the full app with a live backend, deploy `backend/` to a Node.js hosting service such as [Render](https://render.com), [Railway](https://railway.app), or [Fly.io](https://fly.io) and update `API` constants in the frontend source files to point to your deployed backend URL.

## Project Structure

```
GroceryList/
├── .github/
│   └── workflows/
│       ├── ci.yml        # Lint, build, syntax-check on every push/PR
│       └── deploy.yml    # Deploy frontend to GitHub Pages on push to main
├── backend/
│   ├── data/             # Seed data (recipes, festival templates)
│   ├── database.js       # SQLite initialisation & seeding
│   ├── server.js         # Express API server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
└── package.json          # Root convenience scripts
```
