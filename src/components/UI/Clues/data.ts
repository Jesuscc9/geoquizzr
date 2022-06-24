import { iClue } from 'types'
import { ContinentClue } from './ContinentClue'
import { PopulationClue } from './PopulationClue'

export const CluesData: iClue[] = [
  {
    type: 'population',
    component: PopulationClue,
    cost: 3
  },
  {
    type: 'continent',
    component: ContinentClue,
    cost: 10
  }
]
