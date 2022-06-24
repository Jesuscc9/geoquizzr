import { CountrySelector } from 'components/forms'
import { Clues, FinishedRound } from 'components/UI'
import { motion } from 'framer-motion'
import { useTimer } from 'hooks'
import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getQuizz } from 'services'
import useSWR from 'swr'
import styles from './styles.module.css'

const TOTAL_SECONDS = 60

export const Quizz: FC = () => {
  const [showFinishModal, setShowFinishedModal] = useState<boolean>(false)

  const { seconds, start, percentage, decrement, isRunning, stop } = useTimer(
    TOTAL_SECONDS,
    () => {
      setShowFinishedModal(true)
    }
  )

  const { uuid } = useParams()

  const { data: country, error } = useSWR(`api/quizzes/${uuid}`, () =>
    getQuizz(String(uuid))
  )

  console.log({ country, error })

  useEffect(() => {
    start()
  }, [])

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
            <img src='https://i.blogs.es/40fecc/googlemaps/450_1000.jpg' />
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
