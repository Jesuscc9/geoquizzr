import { SWRResponse } from 'swr'

export interface iUseModel<P, Q = {}, R = {}> {
  data: SWRResponse<P>
  error: string | undefined
  isLoading: boolean
  actions: {
    create?: (props: Q) => Promise<void>
    isLoadingCreate?: boolean
    errorCreate?: string | null
    update?: (props: R) => Promise<void>
    isLoadingUpdate?: boolean
    errorUpdate?: string | null
    delete?: (id: number | string) => Promise<void>
    isLoadingCreateGuess?: boolean
    errorGuess?: string | undefined
  }
}
