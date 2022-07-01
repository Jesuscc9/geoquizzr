import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'services'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  const token = req.headers.token

  supabase.auth.setAuth(String(token))

  const handleGet = async () => {
    try {
      const request = await fetch(
        'https://api.3geonames.org/randomland.DE.json'
      )

      const data = await request.json()

      const latlng = [data.nearest.latt, data.nearest.longt]

      return res.status(200).json(latlng)
    } catch (e) {
      return res.status(404).json('Internal server error')
    }
  }

  const handlePost = () => {}

  switch (method) {
    case 'GET':
      return handleGet()
    case 'POST':
      return handlePost()
    default:
      return res.status(404).json(`Method ${method} not available`)
  }
}
