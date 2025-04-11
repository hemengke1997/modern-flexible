// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flexible } from '../src'
import { getHtmlFontSize, setClientHeight, setClientWidth } from './test-utils'

describe('modern flexible', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    setClientWidth(0)
    vi.restoreAllMocks()
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('should throw rootValue must be greater than 0 when rootValue is 0', () => {
    expect(() =>
      flexible({
        rootValue: 0,
        devices: [
          {
            base: 750,
            match: true,
            range: [375, 750],
          },
        ],
      }),
    ).toThrowError('rootValue must be greater than 0')
  })

  it('should throw range length must be 2 when range length is not 2', () => {
    expect(() =>
      flexible({
        devices: [
          {
            range: [0],
            match: true,
            base: 0,
          },
        ],
      }),
    ).toThrowError('range length must be 2')
  })

  it('should throw no devices matched when no devices matched', () => {
    expect(() =>
      flexible({
        devices: [
          {
            range: [0, 100],
            match: false,
            base: 0,
          },
        ],
      }),
    ).toThrowError('no devices matched')
  })

  it('should resize immediately', () => {
    const flex = flexible({
      resizeOption: false,
      devices: [
        {
          base: 375,
          match: true,
          range: [375, 750],
        },
      ],
    })
    setClientWidth(375)
    flex.enhancedResize()
    expect(getHtmlFontSize()).toBe('16px')
  })

  it('should apply debounce correctly', async () => {
    const flex = flexible({
      resizeOption: {
        type: 'debounce',
        delay: 100,
      },
      devices: [
        {
          base: 375,
          match: true,
          range: [375, 750],
        },
      ],
    })

    setClientWidth(1280)

    flex.enhancedResize()
    flex.enhancedResize()
    flex.enhancedResize()

    expect(getHtmlFontSize()).toBe('16px')

    vi.advanceTimersByTime(50)
    expect(getHtmlFontSize()).toBe('16px')

    vi.advanceTimersByTime(50)
    expect(getHtmlFontSize()).toBe('32px')
  })

  it('should apply throttle correctly', async () => {
    const flex = flexible({
      resizeOption: {
        type: 'throttle',
        delay: 100,
      },
      devices: [
        {
          base: 375,
          match: true,
          range: [375, 750],
        },
      ],
    })

    setClientWidth(1280)

    flex.enhancedResize()
    flex.enhancedResize()
    flex.enhancedResize()

    expect(getHtmlFontSize()).toBe('16px')

    vi.advanceTimersByTime(50)
    flex.enhancedResize()
    expect(getHtmlFontSize()).toBe('16px')

    vi.advanceTimersByTime(50)
    flex.enhancedResize()
    expect(getHtmlFontSize()).toBe('32px')
  })
})

describe('landscape', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('basic', () => {
    const flex = flexible({
      resizeOption: false,
      devices: [
        {
          range: [375, 750],
          match: true,
          base: 750,
        },
      ],
      landscape: true,
    })
    setClientHeight(375)
    setClientWidth(666)
    flex.resize()
    expect(getHtmlFontSize()).toBe('8px')
  })
})
