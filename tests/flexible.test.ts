// @vitest-environment happy-dom

import { GlobalWindow } from 'happy-dom'
import { describe, expect, test, vi } from 'vitest'
import { flexible } from '../src'

describe('morder flexible', () => {
  test('should throw rootValue must be greater than 0 when rootValue is 0', () => {
    expect(() =>
      flexible({
        rootValue: 0,
      }),
    ).toThrowError('rootValue must be greater than 0')
  })

  test('should throw distinctDevice needed when distinctDevice is empty', () => {
    expect(() =>
      flexible({
        distinctDevice: [],
      }),
    ).toThrowError('distinctDevice needed')
  })

  test('should throw deviceWidthRange length must be 2 when deviceWidthRange length is not 2', () => {
    expect(() =>
      flexible({
        distinctDevice: [
          {
            deviceWidthRange: [0],
            isDevice: true,
            UIWidth: 0,
          },
        ],
      }),
    ).toThrowError('deviceWidthRange length must be 2')
  })

  test('should throw no device matched when no device matched', () => {
    expect(() =>
      flexible({
        distinctDevice: [
          {
            deviceWidthRange: [0, 100],
            isDevice: false,
            UIWidth: 0,
          },
        ],
      }),
    ).toThrowError('no device matched')
  })

  test('should resize called', () => {
    const flex = flexible({ resizeOption: false })

    const globalWindow = new GlobalWindow()
    globalWindow.eval('window.document.documentElement.clientWidth = 375')

    flex.enhancedResize()
    expect(document.documentElement.style.fontSize).toBe('16px')
  })

  test('should resize debounce', async () => {
    const flex = flexible({ resizeOption: { delay: 60, type: 'debounce' } })
    const spyEnhanced = vi.fn(flex.enhancedResize)

    spyEnhanced()
    expect(spyEnhanced).toHaveBeenCalledTimes(1)
  })
})
