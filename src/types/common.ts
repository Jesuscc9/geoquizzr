import { SWRResponse } from 'swr'

export interface iCreateProps<Model, CreateModel> {
  body: CreateModel
  onSuccess: (inserted: Model) => void
}

export type iModelCreateFn<Model, CreateModel> = (
  props: iCreateProps<Model, CreateModel>
) => Promise<void>

export interface iCreateModelHook<Model, CreateModel> {
  create: iModelCreateFn<Model, CreateModel>
  error: undefined | string
  isLoading: boolean
}

// Select only one model hook
export type iOneModelHook<Model = undefined> = SWRResponse<Model> & {
  isLoading: boolean
}

export interface iModelHook<T> extends SWRResponse<T> {
  isLoading: boolean
}
