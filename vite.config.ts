import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        // target: "https://resumify-v1.onrender.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') ,
      }
    }
  }
})
