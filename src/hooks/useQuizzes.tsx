import { useState } from 'react'
import { fetcher } from '../helpers'
import useSWR from 'swr'
import { iNewGuess, iNewQuizz, iQuizz, iUpdateQuizz } from 'types'

const SWR_KEY = '/api/quizzes'

interface iCreateProps {
  body: iNewQuizz
  onSuccess: (newQuizz: iQuizz) => void
}

interface iUpdateProps {
  uuid: string
  body: iUpdateQuizz
  onSuccess?: (newQuizz: iQuizz) => void
}

interface iCreateGuess {
  body: iNewGuess
  quizzId: string
  quizzUuid: string
  onSuccess: () => void
}

interface iCreateRound {
  quizzUuid: string
  onSuccess: () => void
}

export const useQuizzes = () => {
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false)
  const [errorCreate, setErrorCreate] = useState<null | string>(null)

  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false)
  const [errorUpdate, setErrorUpdate] = useState<null | string>(null)

  const [isLoadingCreateGuess, setIsLoadingCreateGuess] =
    useState<boolean>(false)
  const [errorGuess, setErrorGuess] = useState<string | undefined>()

  const [isLoadingCreateRound, setIsLoadingCreateRound] =
    useState<boolean>(false)
  const [errorRound, setErrorRound] = useState<string | undefined>()

  const { data: quizzes, error } = useSWR<iQuizz[]>(SWR_KEY)

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

  const update = async ({ uuid, body, onSuccess }: iUpdateProps) => {
    setIsLoadingUpdate(true)
    try {
      const newQuizz: iQuizz = await fetcher(`${SWR_KEY}/${uuid}`, 'PUT', body)
      if (typeof onSuccess !== 'undefined') onSuccess(newQuizz)
    } catch (e: any) {
      setErrorUpdate(String(e.response.data.error))
      console.error(e)
    } finally {
      setIsLoadingUpdate(false)
    }
  }

  const createGuess = async ({
    body,
    onSuccess,
    quizzId,
    quizzUuid
  }: iCreateGuess) => {
    setIsLoadingCreateGuess(true)

    try {
      await fetcher(
        `${SWR_KEY}/${quizzUuid}/guess?quizz_id=${quizzId}`,
        'POST',
        body
      )
      onSuccess()
    } catch (e: any) {
      setErrorGuess(e)
    } finally {
      setIsLoadingCreateGuess(false)
    }
  }

  const createRound = async ({ quizzUuid, onSuccess }: iCreateRound) => {
    setIsLoadingCreateRound(true)

    try {
      await fetcher(`${SWR_KEY}/${quizzUuid}/rounds`, 'POST')
      onSuccess()
    } catch (e: any) {
      setErrorRound(e)
    } finally {
      setIsLoadingCreateRound(false)
    }
  }

  return {
    quizzes,
    isLoading: !quizzes && !error,
    error,
    create,
    isLoadingCreate,
    errorCreate,
    update,
    isLoadingUpdate,
    errorUpdate,
    createGuess,
    isLoadingCreateGuess,
    errorGuess,
    isLoadingCreateRound,
    errorRound,
    createRound
  }
}
