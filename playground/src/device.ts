export const DEVICE = [
  { match: (clientWidth: number) => clientWidth <= 750, base: 375, range: [300, 750], type: '手机' }, // 手机
  {
    match: (clientWidth: number) => clientWidth > 750 && clientWidth <= 1280,
    base: 1280,
    range: [960, 1280],
    type: '平板',
  }, // 平板
  {
    match: (clientWidth: number) => clientWidth > 1280,
    base: 1920,
    range: [1280, 1920],
    type: '电脑',
  }, // 电脑
]
