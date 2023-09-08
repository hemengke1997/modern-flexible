import { useLayoutEffect, useState } from 'react'
import flexible from 'modern-flexible'
import { useWindowSize } from 'react-use'
import './App.css'

const DEVICE = [
  { isDevice: (clientWidth: number) => clientWidth < 750, UIWidth: 375, deviceWidthRange: [300, 375], type: '手机' }, // 手机
  {
    isDevice: (clientWidth: number) => clientWidth >= 750 && clientWidth < 1280,
    UIWidth: 1280,
    deviceWidthRange: [960, 1280],
    type: '平板',
  }, // 平板
  {
    isDevice: (clientWidth: number) => clientWidth >= 1280,
    UIWidth: 1920,
    deviceWidthRange: [1280, 1920],
    type: '电脑',
  }, // 电脑
]

flexible({
  distinctDevice: DEVICE,
})

function App() {
  const [fontSize, setFontSize] = useState('')

  const [device, setDevice] = useState('')

  const size = useWindowSize()

  useLayoutEffect(() => {
    const t = setTimeout(() => {
      setFontSize(document.documentElement.style.fontSize)
    }, 500)

    DEVICE.find((d) => {
      if (d.isDevice(size.width)) {
        setDevice(d.type)
        return true
      }
      return false
    })
    return () => {
      clearTimeout(t)
    }
  }, [size])

  return (
    <div className='App'>
      <h1>当前机型：{device}</h1>

      <h2>font-size: {fontSize}</h2>
    </div>
  )
}

export default App
