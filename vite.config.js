import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  base: '/ketchkit/',
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        process: true,
        Buffer: true,
      }
    })
  ],
  define: {
    'process.env': {},
  },
})