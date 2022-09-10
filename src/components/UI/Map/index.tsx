import { useRouter } from 'next/router'
import React, { FC } from 'react'
import ReactStreetview from 'react-streetview'
import useSWR from 'swr'

const key = 'AIzaSyCGcxn8bTwWyW7Bwg4KRdgkpIlqTfL9Vds'

export const Map: FC = () => {
  const router = useRouter()

  const {
    query: { uuid }
  } = router

  const { data: quizz, error } = useSWR(`/api/quizzes/${uuid}`)

  const currentRound = quizz.rounds.at(-1)

  if (error) return <div>we have an error xd</div>

  const [lat, lng] = currentRound.static_image_latlng

  const streetViewPanoramaOptions = {
    position: { lat, lng }
  }

  return (
    <div>
      abajo
      <div style={{ width: 500, height: 500 }}>
        <ReactStreetview
          apiKey={key}
          streetViewPanoramaOptions={streetViewPanoramaOptions}
        />
      </div>
      {/* <img
        width='600'
        height='400'
        src={`https://maps.googleapis.com/maps/api/streetview?size=600x400&radius=200&location=${lat},${lng}&fov=80&heading=70&pitch=0&key=${key}`}
      /> */}
    </div>
  )
}
