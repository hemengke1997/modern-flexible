import { useLayoutEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import { DEVICE } from './device'
import './App.css'

function App() {
  const [fontSize, setFontSize] = useState('')

  const [device, setDevice] = useState('')

  const size = useWindowSize()

  useLayoutEffect(() => {
    const t = setTimeout(() => {
      setFontSize(document.documentElement.style.fontSize)
    }, 100)

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
    <div className='App flex flex-col gap-y-[12px]'>
      <div className={'box flex'}>
        <div className={'text-[24px] font-bold'}>预定义机型：</div>
        <div className={'flex divide-x'}>
          {DEVICE.map((d) => (
            <div key={d.type} className={'px-[8px]'}>
              【{d.type}】字体变化的窗口范围：{d.deviceWidthRange[0]}px~{d.deviceWidthRange[1]}px
            </div>
          ))}
        </div>
      </div>
      <div className={'mt-[12px] text-2xl font-bold'}>当前机型：{device}</div>
      <div className={'text-2xl font-bold'}>当前html根font-size: {fontSize}</div>

      <div className={'mt-[32px] text-2xl font-bold text-orange-400'}>
        请缩放浏览器窗口大小，可观察到机型和font-size变化
      </div>
    </div>
  )
}

export default App
