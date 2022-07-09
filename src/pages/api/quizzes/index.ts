import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'services'
import { iNewQuizz } from 'types'
import { createNewRound } from '../lib'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  const token = req.headers.token
  supabase.auth.setAuth(String(token))

  const handleGet = async () => {
    try {
      const { data, error } = await supabase.from('quizzes').select('*')

      if (error) return res.status(Number(error?.code)).json(error)

      return res.status(200).json(data)
    } catch (e) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  const handlePost = async () => {
    const newQuizz: iNewQuizz = body

    console.log({ newQuizz })

    try {
      const { error: insertError, data: createdQuizz } = await supabase
        .from('quizzes')
        .insert([newQuizz], {
          returning: 'representation'
        })
        .single()

      if (insertError)
        return res.status(Number(insertError?.code || 400)).json(insertError)

      const id = createdQuizz?.id ?? ''

      // Create the initial round
      await createNewRound(id)

      const { data, error } = await supabase
        .from('quizzes')
        .select(
          `
            *, rounds (
              *
            )
          `
        )
        .order('id', { ascending: false })
        .limit(1)
        .single()

      if (error) return res.status(Number(error?.code) || 400).json(error)

      return res.status(200).json(data)
    } catch (e) {
      console.log({ e })
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  switch (method) {
    case 'GET':
      return handleGet()
    case 'POST':
      return handlePost()
    default:
      return res.status(404).json(`Method ${method} not available`)
  }
}
