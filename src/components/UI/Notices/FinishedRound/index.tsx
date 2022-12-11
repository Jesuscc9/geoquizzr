import { Button, Modal } from '../../../../components/UI'
import { useQuizzes } from '../../../../hooks'
import React, { FC } from 'react'
import { useSWRConfig } from 'swr'

export const FinishedRound: FC = () => {
  // const router = useRouter()

  const { createRound } = useQuizzes()

  // const {
  //   query: { uuid }
  // } = router

  const uuid = ''

  const SWR_KEY = `/api/quizzes/${uuid}`

  const { mutate } = useSWRConfig()

  const handleClick = () => {
    createRound({
      quizzUuid: String(uuid),
      onSuccess: () => {
        mutate(SWR_KEY)
      }
    })
  }

  return (
    <Modal show={true} onCloseModal={() => ''}>
      <div style={{ padding: '2rem' }}>
        <p style={{ color: 'black' }}>has acabo la ronda xd</p>
        <a href="/quizzes/[uuid]">
          <Button onClick={handleClick}>CONTINUE</Button>
        </a>
      </div>
    </Modal>
  )
}
