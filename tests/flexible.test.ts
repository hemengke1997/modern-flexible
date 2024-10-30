// @vitest-environment jsdom

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { flexible } from '../src'
import { getHtmlFontSize, setClientHeight, setClientWidth } from './test-utils'

describe('modern flexible', () => {
  beforeAll(() => {
    window.matchMedia = function () {
      return {
        matches: false,
        addListener() {},
        removeListener() {},
      }
    } as any
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    setClientWidth(0)
    vi.restoreAllMocks()
    vi.clearAllTimers()
  })

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

  test('should resize immediately', () => {
    const flex = flexible({ resizeOption: false })
    setClientWidth(375)
    flex.enhancedResize()
    expect(getHtmlFontSize()).toBe('16px')
  })

  test('should resize debounce', async () => {
    const flex = flexible({ resizeOption: { delay: 60, type: 'debounce' } })
    setClientWidth(375)
    const resizeFn = vi.fn(flex.enhancedResize)
    resizeFn()
    expect(getHtmlFontSize()).toBe('0px')
    resizeFn()
    vi.advanceTimersByTime(59)
    expect(getHtmlFontSize()).toBe('0px')
    resizeFn()
    vi.advanceTimersByTime(59)
    expect(getHtmlFontSize()).toBe('0px')
    expect(vi.getTimerCount()).toBe(1)
    vi.advanceTimersByTime(1)
    expect(getHtmlFontSize()).toBe('16px')
    setClientWidth(0)
    resizeFn()
    vi.clearAllTimers()
    vi.advanceTimersByTime(60)
    expect(getHtmlFontSize()).toBe('16px')
  })

  test('should resize throttle', async () => {
    const flex = flexible({ resizeOption: { delay: 1000, type: 'throttle' } })
    const resizeFn = vi.fn(flex.enhancedResize)

    setClientWidth(375)
    resizeFn()
    expect(getHtmlFontSize()).toBe('0px')
    vi.advanceTimersByTime(1000)
    expect(getHtmlFontSize()).toBe('16px')

    setClientWidth(750)
    resizeFn()
    resizeFn()
    expect(getHtmlFontSize()).toBe('16px')
    expect(vi.getTimerCount()).toBe(1)
    vi.advanceTimersByTime(1000)
    expect(getHtmlFontSize()).toBe('32px')
  })
})

describe('landscape', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    window.matchMedia = function () {
      return {
        matches: true,
        addListener() {},
        removeListener() {},
      }
    } as any
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  test('basic', () => {
    const flex = flexible({
      resizeOption: false,
      distinctDevice: [
        {
          deviceWidthRange: [375, 750],
          isDevice: true,
          UIWidth: 750,
        },
      ],
    })
    setClientHeight(375)
    setClientWidth(666)
    flex.resize()
    expect(getHtmlFontSize()).toBe('8px')
  })
})
