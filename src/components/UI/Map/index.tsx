import { useRouter } from 'next/router'
import React, { FC } from 'react'
import useSWR from 'swr'

const key = 'AIzaSyBZdsJUUIKwzsQU-TXr3asOk2gSdRRAS5s'

export const Map: FC = () => {
  const router = useRouter()

  const {
    query: { uuid }
  } = router

  const { data: country } = useSWR(`/api/quizzes/${uuid}`)

  if (!country) return <div>loading..</div>

  const [lat, lng] = country.staticImage

  return (
    <div>
      <img
        src={`https://maps.googleapis.com/maps/api/streetview?size=600x400&radius=200&location=${lat},${lng}&fov=80&heading=70&pitch=0&key=${key}`}
      />
    </div>
  )
}
