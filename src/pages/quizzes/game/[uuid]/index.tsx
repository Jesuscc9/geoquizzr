import confetti from 'canvas-confetti'
import { Button, Loader, StreetView } from '../../../../components/UI'
import { useQuizzes, useTimer } from '../../../../hooks'
import React, { FC, useEffect, useState } from 'react'
import useInmutableSWR from 'swr/immutable'
import { useLocation, useParams } from 'react-router-dom'
import { useSelectQuizz } from '../../../../hooks/models/quizz'

const TOTAL_SECONDS = 40

const QuizzGame: FC = () => {
  // const router = useRouter()

  const { uuid = '' } = useParams()

  const [showSummary, setShowSummary] = useState(false)

  const { data: quizz, isValidating, mutate } = useSelectQuizz(uuid)

  console.log({ quizz })

  // const {
  //   createGuess,
  //   isLoadingCreateGuess,
  //   isLoadingCreateRound,
  //   createRound
  // } = useQuizzes()

  // const currentRound = quizz?.rounds?.at(-1)

  const { seconds, start, percentage, decrement, isRunning, stop } = useTimer({
    totalSeconds: TOTAL_SECONDS,
    onFinish: (currentSeconds) => {
      if (currentSeconds === 1) {
        // If current seconds is equal to 1, means that it was timed_out
        // createGuess({
        //   body: {
        //     timed_out: true,
        //     round_id: currentRound.id,
        //     is_correct: false
        //   },
        //   quizzId: quizz.id,
        //   quizzUuid: quizz.uuid,
        //   onSuccess: mutate
        // })
      }
    }
  })

  // const handleNewRound = () => {
  //   createRound({
  //     quizzUuid: String(uuid),
  //     onSuccess: () => {
  //       mutate()
  //     }
  //   })
  // }

  const handleNewRound = (): void => {}

  // useEffect(() => {
  //   if (quizz && quizz.finished === false) start()
  // }, [quizz])

  // useEffect(() => {
  //   if (!quizz) return
  //   // If the guess was correct
  //   if (quizz.rounds?.at(-1)?.guess?.at(-1)?.is_correct) confetti()
  // }, [quizz])

  if (
    quizz ==
    null /* || isValidating || isLoadingCreateGuess || isLoadingCreateRound */
  )
    return <Loader />

  // const isQuizzFinished = quizz.finished
  const isQuizzFinished = false

  // const isRoundFinished = currentRound.guess.length > 0

  // const currentGuess = currentRound.guess?.[0]

  return (
    <div>hola</div>
    // <>
    //   {isRoundFinished ? (
    //     <div>
    //       <h3>
    //         Ronda finalizada este es el resultado <br />
    //       </h3>
    //       {JSON.stringify(currentGuess, null, 2)}
    //       <br />
    //       <br />

    //       {/* {showSummary && JSON.stringify(quizz)} */}

    //       {isQuizzFinished ? (
    //         <Button
    //           onClick={() => {
    //             setShowSummary(true)
    //           }}
    //           className="text-sm"
    //         >
    //           VIEW SUMMARY
    //         </Button>
    //       ) : (
    //         <Button onClick={handleNewRound}>CONTINUAR</Button>
    //       )}
    //     </div>
    //   ) : (
    //     <>
    //       <div className="w-screen h-screen">
    //         <StreetView
    //           decrement={decrement}
    //           round={currentRound}
    //           progress={percentage}
    //           progressText={seconds}
    //           timerStillRunning={isRunning}
    //           onCorrectGuess={stop}
    //         />
    //       </div>
    //     </>
    //   )}
    // </>
  )
}

export default QuizzGame
