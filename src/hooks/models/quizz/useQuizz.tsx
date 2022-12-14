import useSWR from 'swr'
import { iQuizz } from '../../../types'
import { SWR_KEY } from '.'
import { fetchSupabase, getAllQuizzes } from './service'
import { iModelHook } from '../../../types/common'

export const useQuizz = (): iModelHook<iQuizz[]> => {
  const res = useSWR<iQuizz[]>(SWR_KEY, async () => {
    return await fetchSupabase(getAllQuizzes)
  })

  const isLoading = res.data === undefined && res.error === undefined

  return {
    ...res,
    isLoading
  }
}
