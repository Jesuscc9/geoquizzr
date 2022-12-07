import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'services'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  const handleGet = async () => {
    const data = await supabase.from('profiles').select('*')
    res.json(data)
  }

  switch (method) {
    case 'GET':
      return handleGet()
    default:
      return res.status(404).json(`Method ${method} not available`)
  }
}
