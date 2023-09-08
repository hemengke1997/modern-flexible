# modern-flexible

> 现代多设备伸缩方案

## 在线示例

[Demo](https://hemengke1997.github.io/modern-flexible/)

## 基础使用

[playground](./playground/spa/src/App.tsx)

### main.js入口中引入

**这样做有个坏处，flexible会在页面加载完毕后才执行，这样会导致页面闪烁，所以建议在html中直接引入**

```ts
import { flexible } from 'modern-flexible'


flexible({
  // 以下数字只是举例
  // 具体宽度设定请自行定义
  distinctDevice: [
    { isDevice: (clientWidth: number) => clientWidth < 750, UIWidth: 375, deviceWidthRange: [300, 375] }, // 手机
    { isDevice: (clientWidth: number) => clientWidth >= 750 && clientWidth < 1280, UIWidth: 1280, deviceWidthRange: [960, 1280] }, // 平板
    { isDevice: (clientWidth: number) => clientWidth >= 1280, UIWidth: 1920, deviceWidthRange: [1280, 1920] }, // 电脑
  ],
})
```

## tailwindcss

可配合 `tailwindcss` 实现多设备 自适应 + 响应式布局


## vite中使用

在vite中使用，可以搭配 vite-plugin-public-typescript 和 vite-plugin-html，这样就可以在html中直接引入了

示例请参考 [playground](playground/spa/vite.config.ts)
