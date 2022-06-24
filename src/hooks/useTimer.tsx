import { useEffect, useState } from 'react'

export const useTimer = (totalSeconds: number, onFinish?: () => void) => {
  const [seconds, setSeconds] = useState<number>(totalSeconds)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [timerInterval, setTimerInterval] = useState<number | null>(null)

  const percentage = (100 / totalSeconds) * seconds

  useEffect(() => {
    console.log({ timerInterval })
  }, [])

  const handleDecrease = (n: number = 1) => {
    setSeconds((prev) => {
      let newVal = prev - Math.abs(n)
      if (newVal < 0) newVal = 0
      if (newVal < 1 && timerInterval !== null) stop()
      return newVal
    })
  }

  const start = () => {
    setIsRunning(true)
  }

  const stop = () => {
    setIsRunning(false)
    console.log({ timerInterval })
    if (timerInterval !== null) {
      window.clearInterval(timerInterval)
      setTimerInterval(null)
      if (typeof onFinish !== 'undefined') {
        onFinish()
      }
    }
  }

  const decrement = (n: number) => {
    handleDecrease(n)
  }

  useEffect(() => {
    if (!isRunning) return
    if (timerInterval === null) {
      console.log('se crea el intervalo')
      setTimerInterval(window.setInterval(handleDecrease, 1000))
      console.log({ timerInterval })
    }
  }, [isRunning])

  return {
    start,
    seconds,
    percentage,
    isRunning,
    decrement,
    stop
  }
}
