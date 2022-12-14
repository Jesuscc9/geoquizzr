import { iQuizz, iQuizzInsert } from '../../../types'
import { createQuizz } from './service'
import { useState } from 'react'
import { PostgrestError } from '@supabase/supabase-js'
import {
  iCreateModelHook,
  iModelCreateFn,
  iCreateProps
} from '../../../types/common'
import { mutate } from 'swr'
import { SWR_KEY } from '.'

export const useCreateQuizz = (): iCreateModelHook<iQuizz, iQuizzInsert> => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<undefined | string>(undefined)

  const handleSupabaseError = (e: PostgrestError): void => {
    setError(e.message)
    setIsLoading(false)
  }

  const create: iModelCreateFn<iQuizz, iQuizzInsert> = async ({
    onSuccess,
    body
  }: iCreateProps<iQuizz, iQuizzInsert>) => {
    setIsLoading(true)
    try {
      const { data: createdQuizz, error } = await createQuizz(body)

      if (error != null) {
        return handleSupabaseError(error)
      }

      if (createdQuizz != null) {
        await mutate(SWR_KEY)
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
    isLoading,
    error
  }
}
