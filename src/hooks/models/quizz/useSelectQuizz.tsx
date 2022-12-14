import useImmutableSWR from 'swr/immutable'
import { iQuizz } from '../../../types'
import { iOneModelHook } from '../../../types/common'
import { SWR_KEY } from '.'
import { fetchSupabase, getOneQuizz } from './service'

export const useSelectQuizz = (uuid: string): iOneModelHook<iQuizz> => {
  const res = useImmutableSWR<iQuizz>(`${SWR_KEY}/${uuid}`, async () => {
    return await fetchSupabase(getOneQuizz, uuid)
  })

  const isLoading = res.data === undefined && res.error === undefined

  return { ...res, isLoading }
}
