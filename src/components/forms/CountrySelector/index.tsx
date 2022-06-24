import confetti from 'canvas-confetti'
import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Select from 'react-select'
import useSWR from 'swr'

export const CountrySelector: FC<{
  timerStillRunning: boolean
  onCorrectGuess: () => void
}> = ({ timerStillRunning, onCorrectGuess }) => {
  const { data: countries } = useSWR('api/countries')

  const { uuid } = useParams()

  const { data, error } = useSWR(`api/quizzes/${uuid}`)

  if (!data) return <div>loading...</div>

  const { country_cca2: countryToGuess } = data

  useEffect(() => {
    console.log({ countryToGuess: countryToGuess.name.common })
    console.log({ countryToGuess })
  }, [countryToGuess])

  if (!countries || !countryToGuess) return <div>Loading...</div>

  const options: { value: string; label: string }[] = []

  countries.forEach((e: any) => {
    options.push({
      value: e.cca2,
      label: e.name.common
    })
  })

  const handleCountryChange = (e: any) => {
    if (e.value === countryToGuess.cca2 && timerStillRunning) {
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
