import { flexible } from 'modern-flexible'

flexible({
  distinctDevice: [
    { isDevice: (w: number) => w < 750, UIWidth: 375, widthRange: [300, 375] },
    // { isDevice: (w: number) => w >= 750, UIWidth: 1920, widthRange: [800, 1920] },
  ],
})
