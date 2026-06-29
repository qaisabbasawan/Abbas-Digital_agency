import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Vite 8 (rolldown) minifies JS + CSS by default in production builds.
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // Split the heavy, rarely-changing vendor libraries into their own
        // long-cached chunks. They load once and are shared across every
        // route chunk instead of being bundled (and re-downloaded) per page —
        // cutting main-thread JS execution and total request weight.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('three') || id.includes('@react-three')) return 'three'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('gsap')) return 'gsap'
          if (id.includes('react-dom') || id.includes('react-router') || id.includes('/react/')) return 'react-vendor'
          if (id.includes('@supabase')) return 'supabase'
        },
      },
    },
  },
})
