# modern-flexible

> 现代多设备伸缩方案

## 基础使用


### main.js入口中引入

```ts
import { flexible } from 'modern-flexible'

flexible({
  distinctDevice: [
    { isDevice: (w: number) => w < 750, UIWidth: 375, widthRange: [375, 750] },
    { isDevice: (w: number) => w >= 750, UIWidth: 1920, widthRange: [1080, 1920] },
  ],
})

// ...
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
// ...
```

这样做有个坏处，flexible会在页面加载完毕后才执行，这样会导致页面闪烁，所以建议在html中直接引入

## vite中使用

在vite中使用，可以搭配 vite-plugin-public-typescript 和 vite-plugin-html，这样就可以在html中直接引入了

示例请参考 [playground](playground/spa/vite.config.ts)
