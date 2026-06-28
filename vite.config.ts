import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Sub-path GitHub Pages: https://<username>.github.io/arena-osn/
  base: '/arena-osn/',
  plugins: [react(), tailwindcss()],
})
