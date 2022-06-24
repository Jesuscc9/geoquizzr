import { Button, Modal } from 'components/UI'
import React, { FC } from 'react'
import { useSWRConfig } from 'swr'

export const FinishedRound: FC = () => {
  const { mutate } = useSWRConfig()

  return (
    <Modal show={true} onCloseModal={() => ''}>
      <div style={{ padding: '2rem' }}>
        <p style={{ color: 'black' }}>has acabo la ronda xd</p>
        <Button
          onClick={() => {
            mutate('api/quizzData', null)
          }}
        >
          CONTINUE
        </Button>
      </div>
    </Modal>
  )
}
