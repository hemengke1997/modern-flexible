import type { HtmlTagDescriptor, PluginOption } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'
import { publicTypescript } from 'vite-plugin-public-typescript'
import manifest from './publicTypescript/manifest.json'

function setupHtml() {
  const tags: Parameters<typeof createHtmlPlugin>[0] = {
    minify: false,
    inject: {
      tags: [],
    },
  }
  tags.inject?.tags?.push(
    ...([
      {
        tag: 'script',
        attrs: {
          src: `${manifest.flexible}`,
        },
        injectTo: 'head-prepend',
      },
    ] as HtmlTagDescriptor[]),
  )
  const htmlPlugin: PluginOption[] = createHtmlPlugin(tags)
  return htmlPlugin
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../../playground-dist',
    emptyOutDir: true,
  },
  base: '/modern-flexible/',
  plugins: [react(), publicTypescript({ sideEffects: true }), setupHtml()],
})
