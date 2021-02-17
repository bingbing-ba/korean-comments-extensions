const getVideoIdPromise = () => {
  if (process.env.NODE_ENV === 'development') {
    return new Promise((resolve, reject) => {
      resolve('SMemB8qejtk')
    })
  } else {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const urlParams = new URLSearchParams(tabs[0].url.split('?')[1])
        const videoId = urlParams.get('v')
        resolve(videoId)
      })
    })
  }
}
export { getVideoIdPromise }
