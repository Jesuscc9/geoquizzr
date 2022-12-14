import { mutate } from 'swr'
import { iRound, iRoundInsert } from '../../../types'
import {
  iModelCreateFn,
  iCreateProps,
  iCreateModelHook
} from '../../../types/common'
import { createRound, SWR_KEY } from './service'
import { useState } from 'react'
import { PostgrestError } from '@supabase/supabase-js'

export const useCreateRound = (
  quizzUuid: string
): iCreateModelHook<iRound, iRoundInsert> => {
  const [error, setError] = useState<undefined | string>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSupabaseError = (error: PostgrestError): void => {
    setError(error.message)
    setIsLoading(false)
  }

  const create: iModelCreateFn<iRound, iRoundInsert> = async ({
    onSuccess,
    body
  }: iCreateProps<iRound, iRoundInsert>) => {
    setIsLoading(true)
    try {
      const { data: createdQuizz, error } = await createRound({
        ...body,
        quizz_uuid: quizzUuid
      })

      if (error != null) {
        return handleSupabaseError(error)
      }

      if (createdQuizz != null) {
        await mutate(SWR_KEY)
        await mutate(`quizzes/${quizzUuid}`)
        onSuccess(createdQuizz)
      }
    } catch (e: any) {
      setError(String(e?.response.data.error))
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    create,
    error,
    isLoading
  }
}
