import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      // Provide browser-compatible alternatives for Node.js modules
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      util: false,
      buffer: 'buffer',
    }
  },
  optimizeDeps: {
    include: ['buffer'],
    esbuildOptions: {
      // Enable CommonJS interop
      define: {
        global: 'globalThis',
      },
    }
  },
  build: {
    target: 'es2015',
    commonjsOptions: {
      // Enable CommonJS to ESM interop
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: ['fs', 'path', 'crypto', 'stream', 'util'],
      output: {
        globals: {
          fs: 'false',
          path: 'false', 
          crypto: 'false',
          stream: 'false',
          util: 'false'
        }
      }
    }
  }
})