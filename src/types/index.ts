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
    | 'capital'
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

export interface iUpdateQuizz {
  solved: boolean
  consumed_seconds: number
  ended_at: Date
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

export interface iNewGuess {
  round_id: number
  latlng: number[]
  country_cca2: string
  timed_out: boolean
  consumed_seconds: number
  score: number
}

export interface iGuess {
  id: number
  round_id: number
  latlng: number[]
  country_cca2: string
  timed_out: boolean
  consumed_seconds: number
  score: number
  created_at: Date
}
