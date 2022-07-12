import { Button, Modal } from 'components/UI'
import { useQuizzes } from 'hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useSWRConfig } from 'swr'

export const FinishedRound: FC = () => {
  const router = useRouter()

  const { createRound } = useQuizzes()

  const {
    query: { uuid }
  } = router

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
        <Link href={{ pathname: '/quizzes/[uuid]', query: { uuid } }}>
          <a>
            <Button onClick={handleClick}>CONTINUE</Button>
          </a>
        </Link>
      </div>
    </Modal>
  )
}
