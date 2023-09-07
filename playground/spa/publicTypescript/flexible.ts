import { flexible } from 'modern-flexible'

flexible({
  distinctDevice: [
    { isDevice: (w: number) => w < 750, UIWidth: 375, widthRange: [375, 750] },
    { isDevice: (w: number) => w >= 750, UIWidth: 1920, widthRange: [1080, 1920] },
  ],
})
