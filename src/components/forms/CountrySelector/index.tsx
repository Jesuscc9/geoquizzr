import { useQuizzes } from '../../../hooks'
import React, { FC } from 'react'
import Select from 'react-select'
import useSWR from 'swr'
import countries from '../../../helpers/countries.json'

export const CountrySelector: FC<{
  timerStillRunning: boolean
  onCorrectGuess: () => void
}> = ({ timerStillRunning, onCorrectGuess }) => {
  // const uuid = router?.query.uuid
  const uuid = ''

  const { data: quizz, mutate } = useSWR(`/api/quizzes/${uuid}`)

  const { createGuess } = useQuizzes()

  if (!quizz) return <div>loading...</div>

  const currentRound = quizz.rounds.at(-1)

  const { cca2: countryToGuess } = currentRound.country

  if (!countries || !countryToGuess) return <div>Loading...</div>

  const options: { value: string; label: string }[] = countries.map((e) => ({
    value: e.cca2,
    label: e.name.common
  }))

  const handleCountryChange = (e: any) => {
    if (!timerStillRunning) return
    const isCorrect = e.value === countryToGuess
    createGuess({
      body: {
        timed_out: false,
        round_id: currentRound.id,
        is_correct: isCorrect
      },
      quizzId: quizz.id,
      quizzUuid: quizz.uuid,
      onSuccess: () => {
        if (isCorrect) onCorrectGuess()
        mutate()
      }
    })
  }

  return (
    <div className="">
      <Select
        options={options}
        styles={{
          option: (provided) => ({
            ...provided,
            color: 'black'
          })
        }}
        className="text-base"
        menuPlacement="top"
        onChange={handleCountryChange}
      />
    </div>
  )
}
