import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    strictPort: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://server_ecom:4000', // or your API server URL
        changeOrigin: true,
        secure: false, // This disables SSL verification
      },
    },
  },
  plugins: [react()],
})
