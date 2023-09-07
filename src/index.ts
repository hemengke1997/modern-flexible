import deepmerge from 'deepmerge'
import { debounce, throttle } from 'throttle-debounce'

interface DebounceOptions {
  atBegin?: boolean
}

interface ThrottleOptions {
  noTrailing?: boolean
  noLeading?: boolean
  debounceMode?: boolean
}

type FlexibleOption = {
  rootValue?: number
  /**
   * @description
   * resize event trigger mode
   */
  resizeOption?:
    | {
        type: 'debounce'
        delay: number
        options?: DebounceOptions
      }
    | {
        type: 'throttle'
        delay: number
        options?: ThrottleOptions
      }
  /**
   * @description
   * distinct device
   */
  distinctDevice: {
    /**
     * @description
     * UI design width
     */
    UIWidth: number
    /**
     * @description
     * device width range (if width is out of range, use the edge value of the closed interval)
     */
    widthRange: [number, number]
    /**
     * @description
     * whether the current window width is this device
     */
    isDevice: ((clientWidth: number) => boolean) | boolean
  }[]
}

function genErrorMsg(msg: string) {
  return `[flexible.js]: ${msg}`
}

const DEFAULT_OPTIONS: Partial<FlexibleOption> = {
  rootValue: 16,
  resizeOption: {
    type: 'debounce',
    delay: 60,
  },
}

function flexible(options: FlexibleOption) {
  // ssr disable
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  options = deepmerge(options, DEFAULT_OPTIONS)

  const { rootValue, resizeOption, distinctDevice } = options as Required<FlexibleOption>

  if (!rootValue || rootValue <= 0) {
    throw new Error(genErrorMsg('rootValue must be greater than 0'))
  }

  if (!distinctDevice || !distinctDevice.length) {
    throw new Error(genErrorMsg('distinctDevice needed'))
  }

  function resize() {
    let width = document.documentElement.clientWidth

    const defaultDevice = distinctDevice[distinctDevice.length - 1]

    const currentDevice =
      distinctDevice.find((device) =>
        typeof device.isDevice === 'boolean' ? device.isDevice : device.isDevice(width),
      ) || defaultDevice

    if (currentDevice) {
      if (width >= currentDevice.widthRange[1]) {
        width = currentDevice.widthRange[1]
      } else if (width <= currentDevice.widthRange[0]) {
        width = currentDevice.widthRange[0]
      }

      if (document.documentElement) {
        document.documentElement.style.fontSize = `${(width * rootValue) / currentDevice.UIWidth}px`
      }
    } else {
      throw new Error(genErrorMsg('no device matched'))
    }
  }

  resize()

  function enhancedResize() {
    if (resizeOption?.type === 'debounce') {
      return debounce(resizeOption.delay, resize, resizeOption.options)
    }
    if (resizeOption?.type === 'throttle') {
      return throttle(resizeOption.delay, resize, resizeOption.options)
    }
    return resize
  }

  window.addEventListener('resize', enhancedResize())

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      enhancedResize()()
    }
  })
  window.addEventListener('DOMContentLoaded', enhancedResize())

  window.addEventListener('pushState', enhancedResize())
}

export default flexible
export { flexible }
