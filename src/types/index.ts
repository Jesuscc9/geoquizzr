import { FC } from 'react'
import { Database } from './database'

export interface iLoginValues {
  email: string
  password: string
}

export interface iSignupValues extends iLoginValues {}

type iGuessRow = Database['public']['Tables']['guess']['Row']

export type iGuess = iGuessRow

type iRoundRow = Database['public']['Tables']['rounds']['Row']

export type iRound = iRoundRow & {
  guess: iGuess[]
}

export type iRoundInsert = Database['public']['Tables']['rounds']['Insert']

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

/* QUIZZ TYPES */

type iQuizzRow = Database['public']['Tables']['quizzes']['Row']

export type iQuizz = iQuizzRow & {
  rounds: iRoundRow[]
}

export type iQuizzInsert = Database['public']['Tables']['quizzes']['Insert']

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
export type iNewGuess = any
