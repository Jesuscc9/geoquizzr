import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'services'

const key = 'AIzaSyCGcxn8bTwWyW7Bwg4KRdgkpIlqTfL9Vds'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { uuid },
    body
  } = req

  const token = req.headers.token
  supabase.auth.setAuth(String(token))

  const handleGet = async () => {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select(
          `*, rounds (
          *, country ( * )
          )`
        )
        .eq('uuid', uuid)
        .single()

      if (error)
        return res
          .status(Number(error.code) || 400)
          .json(error.message || 'Something went wrong')

      return res.status(200).json(data)
    } catch (e) {
      return res.status(400).json('Something went wrong')
    }
  }

  const handleUpdate = async () => {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .update(body)
        .eq('uuid', uuid)

      if (error) {
        return res
          .status(Number(error.code) | 400)
          .json(error.message || 'Something went wrong')
      }

      return res.status(200).json(data)
    } catch (e) {
      return res.status(400).json('Something went wrong')
    }
  }

  const handlePost = async () => {
    const MINIMUM_COUNTRY_POPULATION = 20000000 // Twenty million

    const getRandomCca2 = async () => {
      // Select a random cca2 identifier
      const {
        data: { cca2 }
      } = await supabase
        .from('random_countries')
        .select('cca2')
        .gt('population', MINIMUM_COUNTRY_POPULATION)
        .limit(1)
        .single()

      return cca2
    }

    try {
      // Select a random cca2 identifier

      let validLocationTriesWithSameCountry = 0

      let randomCountry = await getRandomCca2()

      // Lookup for a random static street view location on the country

      const getRandomLocation = async () => {
        if (validLocationTriesWithSameCountry >= 4) {
          randomCountry = await getRandomCca2()
          validLocationTriesWithSameCountry = 0
        }

        const request = await fetch(
          `https://api.3geonames.org/randomland.${randomCountry}.json`
        )

        const randomLocation = await request.json()

        const areaToPickFrom: 'major' | 'nearest' = randomLocation?.major
          ? 'major'
          : 'nearest'

        const lat = randomLocation[areaToPickFrom].latt
        const lng = randomLocation[areaToPickFrom].longt

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
          validLocationTriesWithSameCountry++
          return await isValidLocation()
        }

        return { lat, lng }
      }

      const { lat, lng } = await isValidLocation()

      // Create the quizz with the previous cca2 identifier and static image
      const { error: insertError } = await supabase.from('rounds').insert(
        [
          {
            country_cca2: randomCountry,
            quizz_uuid: uuid,
            static_image_latlng: [lat, lng]
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
            ), rounds (
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
      console.log({ e })
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  switch (method) {
    case 'GET':
      return handleGet()
    case 'PUT':
      return handleUpdate()
    case 'POST':
      return handlePost()
    default:
      return res.status(404).json('Method not found')
  }
}
