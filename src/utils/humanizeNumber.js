const floor = (number) => {
  return number>=10 ? Math.floor(number) : Math.floor(number * 10) / 10
}

const humanizeNumber = (number) => {
  if (number>=10**8){
    const num = floor(number / 10**8)
    const unit = '억'
    return `${num}${unit}`
  }
  if (number >= 10**4) {
    const num = floor(number / 10**4)
    const unit = '만'
    return `${num}${unit}`
  }
  if (number >= 10**3) {
    const num = floor(number / 10**3)
    const unit = '천'
    return `${num}${unit}`
  }
  return `${number}`
}

export { humanizeNumber }