import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base to the repo name for GitHub Pages deployment.
  // VITE_BASE_URL can be overridden in CI (e.g. '/GroceryList/').
  base: process.env.VITE_BASE_URL || '/',
})
