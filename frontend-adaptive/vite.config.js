import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    host: true, // erlaubt Zugriff von außen
    strictPort: true,
    allowedHosts: [
      "webshop-frontend-adaptive.onrender.com",
      "localhost"
    ]
  }
})
