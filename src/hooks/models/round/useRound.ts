import useSWR from 'swr'
import { iRound } from '../../../types'
import { iModelHook } from '../../../types/common'
import { SWR_KEY } from './service'

export const useRound = (): iModelHook<iRound> => {
  const res = useSWR(SWR_KEY)

  return {
    ...res,
    isLoading: false
  }
}
