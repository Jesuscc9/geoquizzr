import { useQuizzes } from 'hooks'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import Select from 'react-select'
import useSWR from 'swr'

export const CountrySelector: FC<{
  timerStillRunning: boolean
  onCorrectGuess: () => void
}> = ({ timerStillRunning, onCorrectGuess }) => {
  const { data: countries } = useSWR('https://restcountries.com/v3.1/all')

  const router = useRouter()

  const {
    query: { uuid }
  } = router

  const { data: quizz, mutate } = useSWR(`/api/quizzes/${uuid}`)

  const { createGuess } = useQuizzes()

  if (!quizz) return <div>loading...</div>

  const currentRound = quizz.rounds.at(-1)

  const { cca2: countryToGuess } = currentRound.country

  if (!countries || !countryToGuess) return <div>Loading...</div>

  const options: { value: string; label: string }[] = []

  countries.forEach((e: any) => {
    options.push({
      value: e.cca2,
      label: e.name.common
    })
  })

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
    <Select
      options={options}
      styles={{
        option: (provided) => ({
          ...provided,
          color: 'black'
        })
      }}
      onChange={handleCountryChange}
    />
  )
}
