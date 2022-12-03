import axios from 'axios'

// Fetcher wrapper
export const fetcher = (url: string) => axios.get(url).then((res) => res.data)

// Random number between range
export function randomBetween(min: number = 1, max: number = 100) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function maskNumber(x: string | number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * @param {string}  value - The number to map.
 * @param {number} fromLow - The lower bound of the value's current range.
 * @param {number} fromHigh - The upper bound of the value's current range.
 * @param {number} toLow - The lower bound of the value's target range.
 * @param {number} toHigh - The upper bound of the value's target range.
 * @returns {number} Mapped value.
 */
export function adjust(
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number
): number {
  const mag = Math.abs(value - fromLow)
  const sgn = value < 0 ? -1 : 1
  return (sgn * mag * (toHigh - toLow)) / (fromHigh - fromLow)
}
