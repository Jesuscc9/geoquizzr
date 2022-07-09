import { Button, Modal } from 'components/UI'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

export const FinishedRound: FC = () => {
  const router = useRouter()

  const {
    query: { uuid }
  } = router

  return (
    <Modal show={true} onCloseModal={() => ''}>
      <div style={{ padding: '2rem' }}>
        <p style={{ color: 'black' }}>has acabo la ronda xd</p>
        <Link href={{ pathname: '/quizzes/[uuid]', query: { uuid } }}>
          <a>
            <Button>CONTINUE</Button>
          </a>
        </Link>
      </div>
    </Modal>
  )
}
