import { getRem, page, sleep, timeout, viteTestUrl } from '~utils'
import { beforeAll, describe, expect, test } from 'vitest'

describe('pxtorem - phone', () => {
  beforeAll(async () => {
    await page.setViewportSize({
      width: 750,
      height: 1000,
    })
    console.log(viteTestUrl, 'viteTestUrl')
    await page.goto(viteTestUrl)
  })

  test('should 1rem to be 16px', async () => {
    const rem = await getRem()

    expect(rem).toBe('16px')
  })

  test('should font-size change to 8px when resize to 375', async () => {
    await page.setViewportSize({
      width: 375,
      height: 4000,
    })
    await sleep(timeout)
    const rem = await getRem()
    expect(rem).toBe('8px')
  })

  test('should font-size change to 8px when resize to 300', async () => {
    await page.setViewportSize({
      width: 300,
      height: 4000,
    })
    await sleep(timeout)
    const rem = await getRem()
    expect(rem).toBe('8px')
  })
})

describe('pxtorem - pad', () => {
  beforeAll(async () => {
    await page.setViewportSize({
      width: 1280,
      height: 4000,
    })
    await page.goto(viteTestUrl)
  })

  test('should 1rem to be 16px', async () => {
    const rem = await getRem()
    expect(rem).toBe('16px')
  })

  test('should font-size change to 12px when resize to 960', async () => {
    await page.setViewportSize({
      width: 960,
      height: 4000,
    })
    await sleep(timeout)
    const rem = await getRem()
    expect(rem).toBe('12px')
  })
})

describe('pxtorem - pc', () => {
  beforeAll(async () => {
    await page.setViewportSize({
      width: 1440,
      height: 4000,
    })
    await page.goto(viteTestUrl)
  })

  test('should 1rem to be 12px', async () => {
    const rem = await getRem()
    expect(rem).toBe('12px')
  })

  test('should font-size change to 16px when resize to 1920', async () => {
    await page.setViewportSize({
      width: 1920,
      height: 4000,
    })
    await sleep(timeout)
    const rem = await getRem()
    expect(rem).toBe('16px')
  })
})
