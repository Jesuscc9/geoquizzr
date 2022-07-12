import { useEffect, useState } from 'react'

interface iProps {
  totalSeconds: number
  onFinish?: (seconds: number) => void
}

export const useTimer = ({ totalSeconds, onFinish }: iProps) => {
  const [seconds, setSeconds] = useState<number>(totalSeconds)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const percentage = (100 / totalSeconds) * seconds

  const handleDecrease = (n: number = 1) => {
    setSeconds((prev) => {
      let newVal = prev - Math.abs(n)
      if (newVal < 0) newVal = 0
      if (newVal < 1) stop()
      return newVal
    })
  }

  const start = () => {
    setIsRunning(true)
    setSeconds(totalSeconds)
  }

  const stop = () => {
    setIsRunning(false)
    if (typeof onFinish !== 'undefined') onFinish(seconds)
  }

  const decrement = (n: number) => {
    handleDecrease(n)
  }

  useEffect(() => {
    let intervalId: any = null

    if (isRunning) {
      intervalId = window.setInterval(handleDecrease, 1000)
    }

    return () => window.clearInterval(intervalId)
  }, [isRunning, seconds])

  return {
    start,
    seconds,
    percentage,
    isRunning,
    decrement,
    stop
  }
}
