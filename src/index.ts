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
   * resize 事件触发模式，分为节流和防抖
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
   * distinct devices
   * 设备列表
   */
  devices?: {
    /**
     * @description
     * Base width, usually the width of the design UI
     *
     * 基准宽度，通常是设计稿宽度
     */
    base: number
    /**
     * @description
     * devices width range (if width is out of range, use the edge value of the closed interval)
     *
     * 设备宽度范围（如果宽度超出范围，则使用闭区间的边值）
     */
    range: number[]
    /**
     * @description
     * whether the window width match current devices
     *
     * 窗口宽度是否匹配当前设备
     */
    match: ((width: number) => boolean) | boolean
  }[]
  /**
   * @description
   * whether use landscape mode
   */
  landscape?: boolean
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
  devices: [],
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

  const { rootValue, resizeOption, devices } = options as DeepRequired<FlexibleOption>

  if (!rootValue || rootValue <= 0) {
    throw new Error(genErrorMsg('rootValue must be greater than 0'))
  }

  function resize() {
    let width = window.document.documentElement[options.landscape ? 'clientHeight' : 'clientWidth']

    const defaultDevice = devices[devices.length - 1]

    const currentDevice =
      devices.find((devices) => (typeof devices.match === 'boolean' ? devices.match : devices.match(width))) ||
      defaultDevice

    if (currentDevice?.match) {
      if (currentDevice.range.length !== 2) {
        throw new Error(genErrorMsg('range length must be 2'))
      }
      if (width >= currentDevice.range[1]) {
        width = currentDevice.range[1]
      } else if (width <= currentDevice.range[0]) {
        width = currentDevice.range[0]
      }

      if (document.documentElement) {
        document.documentElement.style.fontSize = `${(width / currentDevice.base) * rootValue}${PX_UNIT}`
      }
    } else {
      throw new Error(genErrorMsg('no devices matched'))
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
export { type FlexibleOption }
