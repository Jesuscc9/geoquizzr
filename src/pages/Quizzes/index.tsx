import { Button, FormNotice, Navbar } from 'components/UI'
import { useQuizzes } from 'hooks'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

export const Quizzes: FC = () => {
  const navigate = useNavigate()

  const { create, isLoading, formError } = useQuizzes()

  const handleCreateQuizz = async () => {
    await create({ total_seconds: 100 }, (e) => {
      navigate(`/quizzes/game/${e?.newQuizz.uuid}`)
    })
  }

  return (
    <>
      <Navbar key='navbar' />
      <Button loading={isLoading} onClick={handleCreateQuizz}>
        hacer quizz
      </Button>

      {formError && !isLoading && (
        <FormNotice variant={'error'} message={formError} />
      )}
    </>
  )
}

export * from './[uuid]'
