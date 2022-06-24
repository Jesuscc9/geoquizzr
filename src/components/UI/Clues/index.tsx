import React, { FC } from 'react'
import { CluesData } from './data'

export const Clues: FC<{ decrement: (n: number) => void }> = ({
  decrement
}) => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>CLUES: </h1>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {CluesData.map((e, i) => {
          const ClueComponent = e.component
          return <ClueComponent data={e} decrement={decrement} key={i} />
        })}
      </div>
    </div>
  )
}

export * from './ClueWrapper'
export * from './PopulationClue'
