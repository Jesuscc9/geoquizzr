import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'services'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { uuid }
  } = req

  const token = req.headers.token
  supabase.auth.setAuth(String(token))

  const handleGet = async () => {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select(
          `*, country_cca2, countries (
          *
          )`
        )
        .eq('uuid', uuid)
        .single()

      if (error)
        return res
          .status(Number(error.code) || 200)
          .json(error.message || 'Something went wrong')

      return res.status(200).json(data)
    } catch (e) {
      return res.status(200).json('Something went wrong')
    }
  }

  switch (method) {
    case 'GET':
      return handleGet()
    default:
      return res.status(404).json('Method not found')
  }
}
