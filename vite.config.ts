import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Relative base ('./') makes the build work under any path, including a GitHub
// Pages project subpath like https://<user>.github.io/Spendo-/ — no need to
// hardcode the repo name. Safe here because the app is a single page with no
// client-side routing.
export default defineConfig({
  base: './',
  plugins: [react()],
})
