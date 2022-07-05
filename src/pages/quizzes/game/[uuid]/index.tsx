import { CountrySelector } from 'components/forms'
import { Clues, FinishedRound, Loader, Map, ProgressBar } from 'components/UI'
import { useQuizzes, useTimer } from 'hooks'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import useInmutableSwr from 'swr/immutable'
import styles from './styles.module.css'

const TOTAL_SECONDS = 40

const QuizzGame: FC = () => {
  const [showFinishModal, setShowFinishedModal] = useState<boolean>(false)

  const router = useRouter()

  const {
    query: { uuid }
  } = router

  const shouldFetch = typeof uuid !== 'undefined'

  const { data: quizz } = useInmutableSwr(shouldFetch && `/api/quizzes/${uuid}`)

  const { update } = useQuizzes()

  const { seconds, start, percentage, decrement, isRunning, stop } = useTimer(
    TOTAL_SECONDS,
    () => {
      setShowFinishedModal(true)
      if (seconds === 1) {
        update({
          uuid: String(uuid),
          body: {
            consumed_seconds: TOTAL_SECONDS,
            ended_at: new Date(),
            solved: false
          }
        })
        return
      }
      update({
        uuid: String(uuid),
        body: {
          consumed_seconds: TOTAL_SECONDS - seconds,
          ended_at: new Date(),
          solved: true
        }
      })
    }
  )

  useEffect(() => {
    if (quizz) start()
  }, [quizz])

  if (!quizz) return <Loader />

  if (quizz.consumed_seconds)
    return (
      <div>
        <h3>This quizz has been solved</h3>
        <p>{JSON.stringify(quizz, null, 4)}</p>
      </div>
    )

  return (
    <>
      {showFinishModal && <FinishedRound />}

      <ProgressBar progress={percentage} text={seconds} />

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
