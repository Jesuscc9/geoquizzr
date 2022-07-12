import confetti from 'canvas-confetti'
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

  const { data: quizz } = useSWR(`/api/quizzes/${uuid}`)

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
    if (e.value === countryToGuess && timerStillRunning) {
      onCorrectGuess()
      confetti()
    }
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
