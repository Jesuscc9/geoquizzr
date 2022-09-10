export interface iCreate<T> {
  body: T
  onSuccess?: () => void
}

export interface iUpdate<T> {
  body: T
  id?: number
  uuid?: string
}

export interface iDelete {
  id?: number
  uuid?: string
}
