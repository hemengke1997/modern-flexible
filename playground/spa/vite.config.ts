import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { injectScripts, publicTypescript } from 'vite-plugin-public-typescript'

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: '/modern-flexible/',
  plugins: [
    react(),
    publicTypescript(),
    injectScripts((manifest) => [
      {
        attrs: {
          src: manifest.flexible,
        },
        injectTo: 'head',
      },
    ]),
  ],
}))
