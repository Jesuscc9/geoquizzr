import { CountrySelector } from 'components/forms'
import { Clues, FinishedRound, Loader, Map, ProgressBar } from 'components/UI'
import { useQuizzes, useTimer } from 'hooks'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import useInmutableSWR from 'swr/immutable'
import styles from './styles.module.css'

const TOTAL_SECONDS = 40

const QuizzGame: FC = () => {
  const router = useRouter()
  const [showModal, setShowModal] = useState<boolean>(false)

  const {
    query: { uuid }
  } = router

  const shouldFetch = typeof uuid !== 'undefined'

  const { data: quizz, isValidating } = useInmutableSWR(
    shouldFetch && `/api/quizzes/${uuid}`
  )

  const { createGuess, isLoadingCreateGuess, isLoadingCreateRound } =
    useQuizzes()

  const currentRound = quizz?.rounds?.at(-1)

  const { seconds, start, percentage, decrement, isRunning, stop } = useTimer({
    totalSeconds: TOTAL_SECONDS,
    onFinish: (currentSeconds) => {
      if (currentSeconds === 1) {
        // If current seconds is equal to 1, means that it was timed_out

        createGuess({
          body: {
            timed_out: true,
            round_id: currentRound.id
          },
          quizzId: quizz.id,
          quizzUuid: quizz.uuid,
          onSuccess: () => {
            setShowModal(true)
          }
        })
      }
    }
  })

  useEffect(() => {
    if (quizz && quizz.finished === false) start()
  }, [quizz])

  if (!quizz || isValidating || isLoadingCreateGuess || isLoadingCreateRound)
    return <Loader />

  const isQuizzFinished = quizz.finished

  return (
    <>
      {isQuizzFinished ? (
        <div>
          <h1>El quizz esta acabade</h1>
        </div>
      ) : (
        <>
          {showModal && <FinishedRound />}
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
      )}
    </>
  )
}

export default QuizzGame
