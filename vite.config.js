import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/autodepenses-frontend/', // Cette ligne sera a supprimer pour déployer sur Vercel (Ajoutée uniquement pour le déploiement sur Github Pages)
  plugins: [react()],
})
