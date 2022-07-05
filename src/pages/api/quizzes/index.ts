import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'services'
import { iNewQuizz } from 'types'

const key = 'AIzaSyBZdsJUUIKwzsQU-TXr3asOk2gSdRRAS5s'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  const token = req.headers.token
  supabase.auth.setAuth(String(token))

  const handleGet = async () => {
    try {
      const { data, error } = await supabase.from('quizzes').select('*')

      if (error) return res.status(Number(error?.code)).json(error)

      return res.status(200).json(data)
    } catch (e) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  const handlePost = async () => {
    const newQuizz: iNewQuizz = body

    const MINIMUM_COUNTRY_POPULATION = 25000000

    try {
      // Select a random cca2 identifier
      const {
        data: { cca2: randomCountry },
        error: selectError
      } = await supabase
        .from('random_countries')
        .select('cca2')
        .gt('population', MINIMUM_COUNTRY_POPULATION)
        .limit(1)
        .single()

      if (selectError)
        return res.status(Number(selectError.code)).json(selectError)

      // Lookup for a random static street view location on the country

      const getRandomLocation = async () => {
        const request = await fetch(
          `https://api.3geonames.org/randomland.${randomCountry}.json`
        )

        const randomLocation = await request.json()

        const {
          nearest: { latt: lat, longt: lng }
        } = randomLocation

        return { lat, lng }
      }

      const isValidLocation = async (): Promise<{
        lat: number
        lng: number
      }> => {
        const { lat, lng } = await getRandomLocation()

        const request = await fetch(
          `https://maps.googleapis.com/maps/api/streetview/metadata?size=600x400&radius=200&location=${lat},${lng}&fov=80&heading=70&pitch=0&key=${key}`
        )

        const location = await request.json()

        if (location.status !== 'OK') {
          return await isValidLocation()
        }

        return { lat, lng }
      }

      const { lat, lng } = await isValidLocation()

      // Create the quizz with the previous cca2 identifier and static image
      const { error: insertError } = await supabase.from('quizzes').insert(
        [
          {
            ...newQuizz,
            country_cca2: randomCountry,
            staticImage: [lat, lng]
          }
        ],
        {
          returning: 'minimal'
        }
      )

      if (insertError)
        return res.status(Number(insertError.code)).json(insertError)

      // Select the quizz we just created and return it with the additional information of the random country selected
      const { data, error } = await supabase
        .from('quizzes')
        .select(
          `
            *, country_cca2,
            countries (
              *
            )
          `
        )
        .order('id', { ascending: false })
        .limit(1)
        .single()

      if (error) return res.status(Number(error.code)).json(error)

      return res.status(200).json(data)
    } catch (e) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  switch (method) {
    case 'GET':
      return handleGet()
    case 'POST':
      return handlePost()
    default:
      return res.status(404).json(`Method ${method} not available`)
  }
}
