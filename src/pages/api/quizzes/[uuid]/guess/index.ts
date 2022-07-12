import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'services'
import { iNewGuess } from 'types'
import { selectQuizz } from '../../../lib'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body,
    query: { uuid, quizz_id: quizzId }
  } = req

  const token = req.headers.token
  supabase.auth.setAuth(String(token))

  const handlePost = async () => {
    const newGuess: iNewGuess = body

    try {
      const quizz: any = await selectQuizz('uuid', String(uuid))

      if (quizz.rounds.length >= quizz.total_rounds) {
        await supabase
          .from('quizzes')
          .update({ finished: true })
          .match({ id: quizzId })
        return res.status(200).json('Max number of rounds')
      }

      const { error: insertError } = await supabase
        .from('guess')
        .insert([{ ...newGuess }], {
          returning: 'representation'
        })
        .single()

      if (insertError)
        return res.status(Number(insertError?.code || 400)).send(insertError)

      const { data, error } = await supabase
        .from('quizzes')
        .select(
          `
            *, rounds (
              *, guess (
                *
              )
            )
          `
        )
        .eq('id', quizzId)
        .limit(1)
        .single()

      if (error) return res.status(Number(error?.code) || 400).json(error)

      return res.status(200).json(data)
    } catch (e) {
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
