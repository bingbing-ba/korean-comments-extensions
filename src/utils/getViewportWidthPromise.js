export const getViewportWidthPromise = () => {
  return new Promise((resolve, reject) => {
    chrome.windows.getLastFocused({ populate: false }, function (
      currentWindow
    ) {
      resolve(currentWindow.width)
    })
  })
}
