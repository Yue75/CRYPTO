export function useFormatNumber(value: number): string {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + 'B'
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + 'M'
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(2) + 'k'
  } else {
    return value.toFixed(2)
  }
}

export function useFormatNumberCrypto(value: string): string {
  const number = parseFloat(value)
  if (isNaN(number)) {
    return value
  }
  return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
