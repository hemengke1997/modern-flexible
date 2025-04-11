# modern-flexible

> 现代多设备伸缩方案
>
> 支持同时适配多种分辨率的设备

## 在线示例

[Demo](https://hemengke1997.github.io/modern-flexible/)

## 配置项

| 参数         | 类型      | 默认值                            | 描述                                                                                                                                                      |
| ------------ | --------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rootValue    | `number`  | `16`                              | 根字体大小，最好跟postcss-pxtorem中的rootValue一致                                                                                                        |
| devices      | `array`   | `[]`                              | 不同设备的适配方式。<br/> `range`定义设备宽度范围（超出范围后不会再触发resize）<br/>`match`用于判断当前窗口是否属于此设备<br/>`base` 定义对应的设计图宽度 |
| resizeOption | `object`  | `{ type: 'debounce', delay: 60 }` | 窗口大小改变时resize防抖或节流配置                                                                                                                        |
| landscape    | `boolean` | `false`                           | 是否横屏                                                                                                                                                  |

### main.js入口中引入

**这样做有个坏处，flexible会在页面加载完毕后才执行，这样会导致页面闪烁，所以建议在html中直接引入**

```ts
import { flexible } from 'modern-flexible'


flexible({
  // 以下数字只是举例，具体宽度设定请自行定义
  // 以下只适配了3种设备，手机、平板、电脑，但实际上可以适配无限种设备，数组长度决定了适配的设备数量
  devices: [
    // 手机
    {
      // 如果屏幕宽度小于750px，则以此对象适配
      match: (clientWidth: number) => clientWidth < 750,
      // 设计图宽度
      base: 375,
      // 如果设备宽度超过此范围，则不会再触发resize，也就是font-size不会再变化
      range: [300, 375]
    },
    // 平板
    {
      // 如果屏幕宽度在750px到1280px之间，则以此对象适配
      match: (clientWidth: number) => clientWidth >= 750 && clientWidth < 1280,
      // 设计图宽度
      base: 1280,
      // 如果设备宽度超过此范围，则不会再触发resize，也就是font-size不会再变化
      range: [960, 1280] 
    },
    // 电脑
    {
      // 如果屏幕宽度大于1280px，则以此对象适配
      match: (clientWidth: number) => clientWidth >= 1280,
      // 设计图宽度
      base: 1920,
      // 如果设备宽度超过此范围，则不会再触发resize，也就是font-size不会再变化
      range: [1280, 1920]
    },
  ],
  // 根字体默认大小。最好跟postcss-pxtorem中的rootValue一致
  rootValue: 16,
  // 防抖或节流配置。默认防抖60ms
  resizeOption: {
    // resize防抖或节流配置
    type: 'debounce',
    delay: 60
  },
  // 是否横屏
  landscape: false
})
```

### html中引入

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <!-- 尽早引入flexible，避免页面闪烁 -->
  <script type="module" src="/src/flexible.ts"></script>
</head>

<body>
  <div id="root"></div>
</body>

</html>
```
