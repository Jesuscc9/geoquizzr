import { iClue } from 'types'
import { ContinentClue } from './ContinentClue'
import { PopulationClue } from './PopulationClue'

export const CluesData: iClue[] = [
  {
    key: 'population',
    component: PopulationClue,
    cost: 3
  },
  {
    key: 'continents',
    component: ContinentClue,
    cost: 10
  }
]
