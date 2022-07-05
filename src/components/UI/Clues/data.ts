import { iClue } from 'types'
import { CapitalClue } from './CapitalClue'
import { ContinentClue } from './ContinentClue'
import { PopulationClue } from './PopulationClue'

// TODO: Move this to somewehre in backend

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
  },
  {
    key: 'capital',
    component: CapitalClue,
    cost: 15
  }
]
