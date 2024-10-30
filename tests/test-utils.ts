export function setClientWidth(clientWidth: number) {
  Object.defineProperty(window.HTMLHtmlElement.prototype, 'clientWidth', { value: clientWidth, configurable: true })
}

export function setClientHeight(clientHeight: number) {
  Object.defineProperty(window.HTMLHtmlElement.prototype, 'clientHeight', { value: clientHeight, configurable: true })
}

export function getHtmlFontSize() {
  return document.documentElement.style.fontSize
}
