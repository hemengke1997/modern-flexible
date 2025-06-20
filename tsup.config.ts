import { defineConfig } from 'tsup'

export const tsup = defineConfig(option => ({
  entry: ['src/index.ts'],
  dts: true,
  clean: true,
  format: ['cjs', 'esm'],
  platform: 'browser',
  splitting: false,
  treeshake: true,
  minify: false,
  sourcemap: !!option.watch,
  tsconfig: option.watch ? 'tsconfig.dev.json' : 'tsconfig.json',
  target: 'es2015',
}))
