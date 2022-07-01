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
    const user: any = supabase.auth.session()?.access_token?.user_metadata
    return res.json(user)
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
