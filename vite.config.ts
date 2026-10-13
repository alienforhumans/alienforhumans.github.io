import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // This repository is the root GitHub Pages site: https://alienforhumans.github.io/
  base: '/',
  plugins: [react()],
})
