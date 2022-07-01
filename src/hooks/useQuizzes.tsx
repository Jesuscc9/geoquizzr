import { fetcher } from 'pages/_app'
import { useState } from 'react'
import useSWR from 'swr'
import { iNewQuizz, iQuizz } from 'types'

const SWR_KEY = '/api/quizzes'

interface iCreateProps {
  body: iNewQuizz
  onSuccess: (newQuizz: iQuizz) => void
}

export const useQuizzes = () => {
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false)
  const [errorCreate, setErrorCreate] = useState<null | string>(null)

  const { data: quizzes, error } = useSWR(SWR_KEY)

  const create = async ({ body, onSuccess }: iCreateProps) => {
    setIsLoadingCreate(true)
    try {
      const newQuizz: iQuizz = await fetcher(SWR_KEY, 'POST', body)
      onSuccess(newQuizz)
    } catch (e: any) {
      setErrorCreate(String(e.response.data.error))
      console.error(e)
    } finally {
      setIsLoadingCreate(false)
    }
  }

  return {
    quizzes,
    isLoading: !quizzes && !error,
    error,
    create,
    isLoadingCreate,
    errorCreate
  }
}
