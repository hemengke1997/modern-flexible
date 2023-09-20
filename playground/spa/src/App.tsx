import { useLayoutEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import './App.css'
import { DEVICE } from './device'

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
