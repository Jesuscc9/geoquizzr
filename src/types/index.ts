import { FC } from 'react'

export interface iLoginValues {
  email: string
  password: string
}

export interface iSignupValues extends iLoginValues {}

export interface iClue {
  type: 'population' | 'continent'
  component: FC<any>
  cost: number
}

export interface iNewQuizz {
  total_seconds: number
}

export interface iFinishedQuizz {
  consumed_seconds: number
  solved: boolean
  ended_at: Date
}
