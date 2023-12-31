import { page } from 'vitest-e2e/test-utils'

export * from 'vitest-e2e/test-utils'

async function toEl(el: string) {
  return await page.$(el)
}

export async function getFontsize(el: string): Promise<string> {
  const element = await toEl(el)
  return await element.evaluate((e) => getComputedStyle(e).fontSize)
}

export async function getRem() {
  return getFontsize('html')
}

export async function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export const timeout = process.env.CI ? 300 : 100
