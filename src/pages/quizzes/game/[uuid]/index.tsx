import { CountrySelector } from 'components/forms'
import { Clues, FinishedRound, Map } from 'components/UI'
import { motion } from 'framer-motion'
import { useTimer } from 'hooks'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import useSWR from 'swr'
import styles from './styles.module.css'

const TOTAL_SECONDS = 60

const QuizzGame: FC = () => {
  const [showFinishModal, setShowFinishedModal] = useState<boolean>(false)
  const [isImageQuizzReady, setIsImageQuizzReady] = useState<boolean>(false)

  const { seconds, start, percentage, decrement, isRunning, stop } = useTimer(
    TOTAL_SECONDS,
    () => {
      setShowFinishedModal(true)
    }
  )

  const router = useRouter()

  const {
    query: { uuid }
  } = router

  const shouldFetch = typeof uuid !== 'undefined'

  const { data: country, error } = useSWR(shouldFetch && `/api/quizzes/${uuid}`)

  // const { data } = useSWRImmutable(
  //   shouldFetch && 'isQuizzImageReady',
  //   () => false
  // )

  useEffect(() => {
    if (country && isImageQuizzReady) start()
  }, [country, isImageQuizzReady])

  if (!country) return <div>loader</div>

  const {
    countries: { capitalInfo }
  } = country

  const {
    latlng: [lat, lng]
  } = JSON.parse(capitalInfo)

  return (
    <>
      {showFinishModal && <FinishedRound />}

      <p>{seconds}</p>
      <motion.div
        layout
        style={{
          width: `${percentage}%`,
          height: 20,
          backgroundColor: 'red',
          borderRadius: '0.4rem'
        }}
      ></motion.div>

      <div>
        <h1>What country is this? 🤔</h1>
        <div className={styles.QuizGrid}>
          <div>
            <Map />
          </div>

          <div>
            <CountrySelector
              timerStillRunning={isRunning}
              onCorrectGuess={stop}
            />
          </div>
          <Clues decrement={decrement} />
        </div>
      </div>
    </>
  )
}

export default QuizzGame
