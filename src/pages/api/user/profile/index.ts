import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServerClient = createServerSupabaseClient<any>({
    req,
    res
  })

  const user = await supabaseServerClient.auth.getUser()

  res.status(200).json(user)
}
