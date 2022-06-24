import { useState } from 'react'
import { createQuizz, getQuizzes } from 'services'
import useSWR from 'swr'
import { iNewQuizz } from 'types'

interface PostgrestError {
  message: string
  details: string
  hint: string
  code: string
}

export const useQuizzes = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formError, setFormError] = useState<null | string>(null)

  const handleError = (e: PostgrestError | any) => {
    setFormError(e.message)
    setIsLoading(false)
  }

  const { data: quizzes, error } = useSWR('api/quizzes', () => {
    return getQuizzes()
  })

  const create = async (values: iNewQuizz, onSuccess: (d: any) => void) => {
    setIsLoading(true)
    try {
      const { error, data } = await createQuizz(values)

      if (error) {
        handleError(error)
        return
      }

      onSuccess({ error, newQuizz: data })
      setIsLoading(false)
      return { error, newQuizz: data }
    } catch (e) {
      handleError(e)
      return { error: e }
    }
  }

  return {
    isLoading,
    formError,
    quizzes,
    error,
    create
  }
}
