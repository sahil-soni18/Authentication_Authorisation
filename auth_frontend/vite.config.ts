import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    'process.env': {},
  },
  // Add this part for Node types support
  build: {
    rollupOptions: {
      external: ['path'],
    },
  },
  // Optional: Adding Node.js type support
  optimizeDeps: {
    include: ['path'],
  },
})
