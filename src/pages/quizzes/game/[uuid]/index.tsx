import confetti from 'canvas-confetti'
import { CountrySelector } from 'components/forms'
import { Button, Clues, Loader, ProgressBar, StreetView } from 'components/UI'
import { useQuizzes, useTimer } from 'hooks'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import useInmutableSWR from 'swr/immutable'
import styles from './styles.module.css'

const TOTAL_SECONDS = 40

const QuizzGame: FC = () => {
  const router = useRouter()

  const [showSummary, setShowSummary] = useState(false)

  const {
    query: { uuid }
  } = router

  const shouldFetch = typeof uuid !== 'undefined'

  const {
    data: quizz,
    isValidating,
    mutate
  } = useInmutableSWR(shouldFetch && `/api/quizzes/${uuid}`)

  const {
    createGuess,
    isLoadingCreateGuess,
    isLoadingCreateRound,
    createRound
  } = useQuizzes()

  const currentRound = quizz?.rounds?.at(-1)

  const { seconds, start, percentage, decrement, isRunning, stop } = useTimer({
    totalSeconds: TOTAL_SECONDS,
    onFinish: (currentSeconds) => {
      if (currentSeconds === 1) {
        // If current seconds is equal to 1, means that it was timed_out
        createGuess({
          body: {
            timed_out: true,
            round_id: currentRound.id,
            is_correct: false
          },
          quizzId: quizz.id,
          quizzUuid: quizz.uuid,
          onSuccess: mutate
        })
      }
    }
  })

  const handleNewRound = () => {
    createRound({
      quizzUuid: String(uuid),
      onSuccess: () => {
        mutate()
      }
    })
  }

  useEffect(() => {
    if (quizz && quizz.finished === false) start()
  }, [quizz])

  useEffect(() => {
    if (!quizz) return
    if (quizz.rounds?.at(-1)?.guess?.at(-1)?.is_correct) confetti()
  }, [quizz])

  if (!quizz || isValidating || isLoadingCreateGuess || isLoadingCreateRound)
    return <Loader />

  const isQuizzFinished = quizz.finished

  const isRoundFinished = currentRound.guess.length > 0

  const currentGuess = currentRound.guess?.[0]

  return (
    <>
      {isRoundFinished ? (
        <div>
          <h3>
            Ronda finalizada este es el resultado <br />
          </h3>
          {JSON.stringify(currentGuess, null, 2)}
          <br />
          <br />

          {showSummary && JSON.stringify(quizz)}

          {isQuizzFinished ? (
            <Button
              onClick={() => {
                setShowSummary(true)
              }}
            >
              VIEW SUMMARY
            </Button>
          ) : (
            <Button onClick={handleNewRound}>CONTINUAR</Button>
          )}
        </div>
      ) : (
        <>
          <ProgressBar progress={percentage} text={seconds} />
          <div>
            <h1>What country is this? 🤔</h1>
            <div className={styles.QuizGrid}>
              <div>
                {/* <Map /> */}
                <StreetView round={currentRound} />
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
