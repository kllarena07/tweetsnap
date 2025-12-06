import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Chrome extension configuration
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: 'index.html',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development'
    ),
  },
})
