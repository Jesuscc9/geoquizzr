import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'services'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  const handlePost = () => {
    supabase.auth.api.setAuthCookie(req, res)
  }

  switch (method) {
    case 'POST':
      return handlePost()
    default:
      return res.status(404).json(`Method ${method} not available`)
  }
}
