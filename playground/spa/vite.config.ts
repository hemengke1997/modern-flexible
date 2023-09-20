import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { injectScripts, publicTypescript } from 'vite-plugin-public-typescript'
import manifest from './public-typescript/manifest.json'

// https://vitejs.dev/config/
export default defineConfig(() => ({
  build: {
    outDir: '../../playground-dist',
    emptyOutDir: true,
  },
  base: '/modern-flexible/',
  plugins: [
    react(),
    publicTypescript({ sideEffects: true }),
    injectScripts([
      {
        attrs: {
          src: manifest.flexible,
        },
        injectTo: 'head-prepend',
      },
    ]),
  ],
}))
