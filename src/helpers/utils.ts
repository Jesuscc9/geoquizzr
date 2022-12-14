import axios, { AxiosRequestConfig } from 'axios'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

// Fetcher wrapper
export const fetcher = async (
  url: string,
  method = 'GET',
  data?: { [key: string]: any }
) => {
  const options: AxiosRequestConfig<any> = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  }

  options.method = method

  if (data != null) options.data = JSON.stringify(data)

  return await axios(url, options).then((res) => {
    if (res.statusText !== 'OK') {
      console.error('handle global error', res.statusText)
    }
    return res.data
  })
}

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

TimeAgo.addDefaultLocale(en)
export const timeAgo = new TimeAgo('en-US')
