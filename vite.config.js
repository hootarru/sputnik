import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base — путь сайта на GitHub Pages: https://hootarru.github.io/sputnik/
export default defineConfig({
  base: '/sputnik/',
  plugins: [react()],
  server: { host: true, port: 5173 },
})
