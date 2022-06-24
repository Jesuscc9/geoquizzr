import { supabase } from 'services'
import { iNewQuizz } from 'types'

export const createQuizz = async (e: iNewQuizz) => {
  try {
    const {
      data: { cca2: randomCountry },
      error: selectError
    } = await supabase.from('random_countries').select('cca2').limit(1).single()

    if (selectError) return { selectError }

    const { error: insertError } = await supabase
      .from('quizzes')
      .insert([{ ...e, country_cca2: randomCountry }], {
        returning: 'minimal'
      })

    if (insertError) return { error: insertError }

    const { data, error } = await supabase
      .from('quizzes')
      .select(
        `
            *, country_cca2, 
            countries (
              *
            )
          `
      )
      .order('id', { ascending: false })
      .limit(1)
      .single()

    return { data, error }
  } catch (e) {
    return { error: e }
  }
}

export const getQuizz = async (uuid: string) => {
  return new Promise((resolve, reject) => {
    supabase
      .from('quizzes')
      .select(
        `
          *, country_cca2, 
            countries (
              *
            )
        `
      )
      .filter('uuid', 'eq', uuid)
      .single()
      .then((e: any) => {
        const { data, error } = e
        if (error) reject(error)
        resolve(data)
      })
  })
}

export const getQuizzes = () => {
  return new Promise((resolve, reject) => {
    supabase
      .from('quizzes')
      .select('*')
      .then((e) => {
        const { data, error } = e
        if (error) reject(error)
        resolve(data)
      })
  })
}
