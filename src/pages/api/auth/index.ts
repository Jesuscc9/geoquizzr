import { User } from '@supabase/gotrue-js'
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'services'

const extractUser = (rawUser: User | null) => {
  return rawUser?.identities?.[0].identity_data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  const token = req.headers.token

  supabase.auth.setAuth(String(token))

  const handleGet = async () => {
    const token = supabase.auth.session()?.access_token ?? ''

    const { user } = await supabase.auth.api.getUser(token)

    return res.json(extractUser(user))
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
