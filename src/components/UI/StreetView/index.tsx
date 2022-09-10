/* eslint-disable no-unused-vars */
import { Loader } from '@googlemaps/js-api-loader'
import React, { FC, useEffect, useRef } from 'react'
import { iRound } from 'types'

declare global {
  interface Window {
    google: any
  }
}

window.google = window.google || {}

export const StreetView: FC<{ round: iRound }> = ({ round }) => {
  const googlemap = useRef(null)

  useEffect(() => {
    if (!googlemap.current) return

    console.log({ round })

    const [lat, lng] = round.static_image_latlng

    console.log({ lat, lng })

    const loader = new Loader({
      apiKey: 'AIzaSyCGcxn8bTwWyW7Bwg4KRdgkpIlqTfL9Vds',
      version: 'weekly'
    })

    loader.load().then(() => {
      const google = window.google // ADDED

      // const fenway = { lat: -36.054623, lng: -63.5638754 }
      const fenway = { lat, lng }
      const map = new google.maps.Map(googlemap.current, {
        center: fenway,
        zoom: 14
      })
      const panorama = new google.maps.StreetViewPanorama(googlemap.current, {
        position: fenway,
        pov: {
          heading: 34,
          pitch: 10
        }
      })

      map.setStreetView(panorama)
    })
  }, [round])

  return <div id="map" style={{ width: 500, height: 500 }} ref={googlemap} />
}
