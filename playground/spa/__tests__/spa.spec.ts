import { getRem, page, sleep, timeout, viteTestUrl } from '~utils'
import { beforeAll, beforeEach, describe, expect, test } from 'vitest'

declare module 'vitest' {
  export interface TestContext {
    rem: string
  }
}

describe('pxtorem - phone', () => {
  beforeAll(async () => {
    await page.setViewportSize({
      width: 700,
      height: 1000,
    })
    await page.goto(viteTestUrl)
  })

  beforeEach(async (ctx) => {
    ctx.rem = await getRem()
  })

  test('should 1rem to be 16px', ({ rem }) => {
    expect(rem).toBe('16px')
  })

  test('should font-size change to 14px when resize to 1120', async () => {
    await page.setViewportSize({
      width: 1120,
      height: 1000,
    })
    await sleep(timeout)
    const rem = await getRem()
    expect(rem).toBe('14px')
  })

  test('should font-size change to 12.8px when resize to 300', async () => {
    await page.setViewportSize({
      width: 300,
      height: 1000,
    })
    await sleep(timeout)
    const rem = await getRem()
    expect(rem).toBe('12.8px')
  })
})

describe('pxtorem - pad', () => {
  beforeAll(async () => {
    await page.setViewportSize({
      width: 1120,
      height: 1120,
    })
    await page.goto(viteTestUrl)
  })

  beforeEach(async (ctx) => {
    ctx.rem = await getRem()
  })

  test('should 1rem to be 14px', ({ rem }) => {
    expect(rem).toBe('14px')
  })

  test('should font-size change to 12px when resize to 750', async () => {
    await page.setViewportSize({
      width: 750,
      height: 1120,
    })
    await sleep(timeout)
    const rem = await getRem()
    expect(rem).toBe('12px')
  })

  test('should font-size change to 15px when resize to 1200', async () => {
    await page.setViewportSize({
      width: 1200,
      height: 1120,
    })
    await sleep(timeout)
    const rem = await getRem()
    expect(rem).toBe('15px')
  })

  test('should font-size change to 16px when resize to 1280', async () => {
    await page.setViewportSize({
      width: 1280,
      height: 1120,
    })
    await sleep(timeout)
    const rem = await getRem()
    expect(rem).toBe('16px')
  })
})

describe('pxtorem - pc', () => {
  beforeAll(async () => {
    await page.setViewportSize({
      width: 1960,
      height: 1960,
    })
    await page.goto(viteTestUrl)
  })

  beforeEach(async (ctx) => {
    ctx.rem = await getRem()
  })

  test('should 1rem to be 16px', ({ rem }) => {
    expect(rem).toBe('16px')
  })

  test('should font-size change to 10.675px when resize to 1281', async () => {
    await page.setViewportSize({
      width: 1281,
      height: 1960,
    })
    await sleep(timeout)
    const rem = await getRem()
    expect(rem).toBe('10.675px')
  })

  test('should font-size change to 16px when resize to 1920', async () => {
    await page.setViewportSize({
      width: 1920,
      height: 1960,
    })
    await sleep(timeout)
    const rem = await getRem()
    expect(rem).toBe('16px')
  })
})
