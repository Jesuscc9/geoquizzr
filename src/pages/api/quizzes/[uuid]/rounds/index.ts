import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'services'
import { createNewRound, selectQuizz } from '../../../lib'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { uuid }
  } = req

  const token = req.headers.token
  supabase.auth.setAuth(String(token))

  const handlePost = async () => {
    try {
      const quizz: any = await selectQuizz('uuid', String(uuid))

      // Create another round
      const data = await createNewRound(String(quizz.id))

      return res.status(200).json(data)
    } catch (e) {
      console.log({ e })
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  switch (method) {
    case 'POST':
      return handlePost()
    default:
      return res.status(405).json(`Method ${method} not available`)
  }
}
