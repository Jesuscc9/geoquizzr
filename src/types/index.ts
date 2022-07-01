import { FC } from 'react'

export interface iLoginValues {
  email: string
  password: string
}

export interface iSignupValues extends iLoginValues {}

export interface iClue {
  key:
    | 'population'
    | 'continents'
    | 'capita'
    | 'capitalInfo'
    | 'car'
    | 'cca2'
    | 'flag'
    | 'flags'
    | 'latlng'
    | 'maps'
    | 'name'
    | 'population'
  component: FC<any>
  cost: number
}

export interface iNewQuizz {
  total_seconds: number
}

export interface iQuizz {
  id: number
  uuid: string
  country_cca2: string
  total_seconds: number
  consumed_seconds?: number
  solved: boolean
  created_by: string
  created_at: Date
  ended_at: Date
}

export interface iFinishedQuizz {
  consumed_seconds: number
  solved: boolean
  ended_at: Date
}
