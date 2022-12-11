import { Loader } from '@googlemaps/js-api-loader'
import { CountrySelector } from '../../forms'
import React, { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import { iRound } from '../../../types'
import { createRoot, Root } from 'react-dom/client'
import { Clues } from '../Clues'
import { ProgressBar } from '../ProgressBar'

export const StreetView: FC<{
  round: iRound
  decrement: (n: number) => void
  progress: number
  progressText: number
  timerStillRunning: boolean
  onCorrectGuess: () => void
}> = ({
  round,
  decrement,
  progress,
  progressText,
  timerStillRunning,
  onCorrectGuess
}) => {
  const googlemap = useRef(null)
  const [googleApi, setGoogleApi] = useState<any>(null)

  const progressBarDiv = document.createElement('div')
  progressBarDiv.style.width = '90%'

  const progressBarRoot: MutableRefObject<Root | null> = useRef(null)

  useEffect(() => {
    if (!googlemap.current) return

    const loader = new Loader({
      apiKey: 'AIzaSyCGcxn8bTwWyW7Bwg4KRdgkpIlqTfL9Vds',
      version: 'weekly',
      authReferrerPolicy: 'origin'
    })

    loader.load().then(() => {
      setGoogleApi(window.google)
    })
  }, [])

  useEffect(() => {
    if (googleApi === null) return
    const [lat, lng] = round.static_image_latlng

    const google = window.google // ADDED

    // const fenway = { lat: -36.054623, lng: -63.5638754 }
    const fenway = { lat, lng }
    // const fenway = { lat: 40.0497823, lng: 0.066678 }
    const panorama = new google.maps.StreetViewPanorama(googlemap.current, {
      position: fenway,
      pov: {
        heading: 34,
        pitch: 10
      },
      disableDefaultUI: true
    })

    // Add Country Selector

    const countrySelectroDiv = document.createElement('div')

    countrySelectroDiv.style.width = '300px'

    const countrySelectorRoot = createRoot(countrySelectroDiv)
    countrySelectorRoot.render(
      <CountrySelector
        onCorrectGuess={onCorrectGuess}
        timerStillRunning={timerStillRunning}
        key="1"
      />
    )

    panorama.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(
      countrySelectroDiv
    )

    // Add Clues

    const cluesDiv = document.createElement('div')

    const cluesContainerRoot = createRoot(cluesDiv)
    cluesContainerRoot.render(<Clues decrement={decrement} />)

    panorama.controls[google.maps.ControlPosition.LEFT_CENTER].push(cluesDiv)

    // Add progress bar
    panorama.controls[google.maps.ControlPosition.TOP_CENTER].push(
      progressBarDiv
    )

    progressBarRoot.current = createRoot(progressBarDiv)
  }, [googleApi])

  useEffect(() => {
    if (!progressBarRoot.current) return
    progressBarRoot.current.render(
      <ProgressBar progress={progress} text={progressText} />
    )
  }, [progress])

  return <div style={{ width: '100%', height: '100%' }} ref={googlemap} />
}
