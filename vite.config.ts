import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base must be '/' for custom domains (e.g. nthakur.com)
  // If you were deploying to thakurnaval.github.io/repo-name, this would be '/repo-name/'
  base: '/',
})