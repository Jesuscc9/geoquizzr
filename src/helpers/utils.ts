import axios from 'axios'
export const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export function between(min: number = 1, max: number = 100) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function maskNumber(x: string | number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
