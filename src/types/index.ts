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
export interface iQuizz {
  id: number
  total_seconds: number
  uuid: string
  created_by: string
  total_rounds: number
  created_at: Date
}

export interface iNewRound {
  latlng?: number[]
  country_cca2?: string
  timed_out?: boolean
  round_id: number
}

export interface iNewQuizz {
  total_seconds: number
  total_rounds: number
}

export interface iUpdateQuizz {
  solved: boolean
  consumed_seconds: number
  ended_at: Date
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
export type iNewGuess = any

export interface iUpdateGuess {}

export interface iRound {
  id: number
  guesses: iGuess[]
  created_at: Date
  static_image_latlng: number[]
}

export interface iUpdateRound {}
