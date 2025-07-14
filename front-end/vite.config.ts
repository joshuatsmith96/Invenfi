import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,       // listen on all network interfaces (0.0.0.0)
    port: 5173,       // default Vite port; change if needed
  },
  
  plugins: [
    react(),
    tailwindcss()],
})
