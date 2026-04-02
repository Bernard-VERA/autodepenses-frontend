import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/autodepenses-frontend/', // ← très important pour GitHub Pages
  plugins: [react()],
})
