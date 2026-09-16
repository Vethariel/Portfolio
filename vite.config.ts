import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project Pages: https://vethariel.github.io/Portfolio/
const base = process.env.GITHUB_PAGES === 'true' ? '/Portfolio/' : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
