import { supabase } from 'services'

const key = 'AIzaSyCGcxn8bTwWyW7Bwg4KRdgkpIlqTfL9Vds'

export const createNewRound = async (quizzId: string) => {
  const id = quizzId

  return new Promise(async (resolve, reject) => {
    const MINIMUM_COUNTRY_POPULATION = 20000000 // Twenty million

    const getRandomCca2 = async () => {
      // Select a random cca2 identifier
      const {
        data: { cca2 },
        error
      } = await supabase
        .from('random_countries')
        .select('cca2')
        .gt('population', MINIMUM_COUNTRY_POPULATION)
        .limit(1)
        .single()

      if (error) reject(error)

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
      const { error, data } = await supabase
        .from('rounds')
        .insert(
          [
            {
              country_cca2: randomCountry,
              quizz_id: id,
              static_image_latlng: [lat, lng]
            }
          ],
          {
            returning: 'representation'
          }
        )
        .single()

      if (error) reject(error)

      resolve(data)
    } catch (e) {
      reject(e)
    }
  })
}

export const selectQuizz = (field: string, value: string) => {
  return new Promise((resolve, reject) => {
    supabase
      .from('quizzes')
      .select(
        `*, rounds (
          *, country ( * ), guess ( * )
      )`
      )
      .eq(field, value)
      .single()
      .then(({ data, error }) => {
        if (error) return reject(error)

        return resolve(data)
      })
  })
}
