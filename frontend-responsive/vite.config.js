import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // erlaubt Zugriff von außen
    strictPort: true,
    allowedHosts: [
      "frontend-responsive-bp8j.onrender.com",
      "localhost"
    ]
  }
})
