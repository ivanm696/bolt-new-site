import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this project from /bolt-new-site/, so asset URLs must be prefixed.
  base: '/bolt-new-site/',
})
