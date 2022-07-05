import { Button, Modal } from 'components/UI'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useSWRConfig } from 'swr'

export const FinishedRound: FC = () => {
  const router = useRouter()

  const {
    query: { uuid }
  } = router

  const { mutate } = useSWRConfig()

  return (
    <Modal show={true} onCloseModal={() => ''}>
      <div style={{ padding: '2rem' }}>
        <p style={{ color: 'black' }}>has acabo la ronda xd</p>
        <Button onClick={() => {
          router.push({
            pathname: '/quizzes/[uuid]',
            query: { uuid }
          })
        }} >CONTINUE</Button>
      </div>
    </Modal>
  )
}
