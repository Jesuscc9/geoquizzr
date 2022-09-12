import React, { FC } from 'react'
import { CluesData } from './data'

export const Clues: FC<{ decrement: (n: number) => void }> = ({
  decrement
}) => {
  return (
    <div className="flex flex-col gap-3">
      {CluesData.map((e, i) => {
        const ClueComponent = e.component
        return <ClueComponent data={e} decrement={decrement} key={i} />
      })}
    </div>
  )
}

export * from './ClueWrapper'
export * from './PopulationClue'
