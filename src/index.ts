import { debounce, throttle } from 'throttle-debounce'

interface DebounceOptions {
  atBegin?: boolean
}

interface ThrottleOptions {
  noTrailing?: boolean
  noLeading?: boolean
  debounceMode?: boolean
}

type NotNill<T> = T extends null | undefined ? never : T

type Primitive = undefined | null | boolean | string | number | Function

type DeepRequired<T> = T extends Primitive
  ? NotNill<T>
  : {
      [P in keyof T]-?: T[P] extends Array<infer U>
        ? Array<DeepRequired<U>>
        : T[P] extends ReadonlyArray<infer U2>
          ? DeepRequired<U2>
          : DeepRequired<T[P]>
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
        delay?: number
        options?: DebounceOptions
      }
    | {
        type: 'throttle'
        delay?: number
        options?: ThrottleOptions
      }
    | false
  /**
   * @description
   * distinct device
   */
  distinctDevice?: {
    /**
     * @description
     * UI design width, AKA the starndard width.
     */
    UIWidth: number
    /**
     * @description
     * device width range (if width is out of range, use the edge value of the closed interval)
     */
    deviceWidthRange: number[]
    /**
     * @description
     * whether the current window width is this device
     */
    isDevice: ((width: number) => boolean) | boolean
  }[]
}

function genErrorMsg(msg: string) {
  return `[modern-flexible]: ${msg}`
}

const PX_UNIT = 'px'

const DEFAULT_OPTIONS: Partial<FlexibleOption> = {
  rootValue: 16,
  resizeOption: {
    type: 'debounce',
    delay: 60,
  },
  distinctDevice: [{ deviceWidthRange: [0, Number.POSITIVE_INFINITY], isDevice: true, UIWidth: 375 }],
}

function flexible(options: FlexibleOption = {}) {
  // ssr disable
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    throw new TypeError(genErrorMsg('current environment is not browser'))
  }

  options = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  const { rootValue, resizeOption, distinctDevice } = options as DeepRequired<FlexibleOption>

  if (!rootValue || rootValue <= 0) {
    throw new Error(genErrorMsg('rootValue must be greater than 0'))
  }

  if (!distinctDevice || !distinctDevice.length) {
    throw new Error(genErrorMsg('distinctDevice needed'))
  }

  function isLandscape() {
    return window.matchMedia('(orientation: landscape)').matches
  }

  function resize() {
    const landscape = isLandscape()
    let width = window.document.documentElement[landscape ? 'clientHeight' : 'clientWidth']

    const defaultDevice = distinctDevice[distinctDevice.length - 1]

    const currentDevice =
      distinctDevice.find((device) =>
        typeof device.isDevice === 'boolean' ? device.isDevice : device.isDevice(width),
      ) || defaultDevice

    if (currentDevice?.isDevice) {
      if (currentDevice.deviceWidthRange.length !== 2) {
        throw new Error(genErrorMsg('deviceWidthRange length must be 2'))
      }
      if (width >= currentDevice.deviceWidthRange[1]) {
        width = currentDevice.deviceWidthRange[1]
      } else if (width <= currentDevice.deviceWidthRange[0]) {
        width = currentDevice.deviceWidthRange[0]
      }

      if (document.documentElement) {
        document.documentElement.style.fontSize = `${(width / currentDevice.UIWidth) * rootValue}${PX_UNIT}`
      }
    } else {
      throw new Error(genErrorMsg('no device matched'))
    }
  }

  // avoid font-size blink
  resize()

  function enhanceResize() {
    if (resizeOption === false || !resizeOption) {
      return resize
    }
    if (typeof resizeOption !== 'object') {
      throw new TypeError(genErrorMsg('resizeOption must be object'))
    }
    if (resizeOption?.type === 'debounce') {
      return debounce(resizeOption.delay, resize, resizeOption.options)
    }
    if (resizeOption?.type === 'throttle') {
      return throttle(resizeOption.delay, resize, {
        ...resizeOption.options,
        noLeading: resizeOption.options?.noLeading ?? true,
      })
    }
    return resize
  }

  const enhancedResize = enhanceResize()

  window.addEventListener('resize', enhancedResize)

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      resize()
    }
  })

  window.addEventListener('orientationchange', () => {
    resize()
  })

  window.addEventListener('pushState', resize)

  return {
    resize,
    enhancedResize,
  }
}

export default flexible
export { flexible }
