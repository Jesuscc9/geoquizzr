import { Button, FormNotice, Navbar } from 'components/UI'
import { useQuizzes } from 'hooks'
import Router from 'next/router'
import React, { FC } from 'react'

const NewQuizz: FC = () => {
  const { create, isLoadingCreate, errorCreate } = useQuizzes()

  const handleCreateQuizz = async () => {
    await create({
      body: { total_seconds: 100 },
      onSuccess: (createdQuizz) => {
        Router.push(`/quizzes/game/${encodeURI(createdQuizz.uuid)}`)
      }
    })
  }

  return (
    <>
      <Navbar key='navbar' />
      <Button loading={isLoadingCreate} onClick={handleCreateQuizz}>
        CREATE QUIZZ 🌎
      </Button>

      {errorCreate && isLoadingCreate === false && (
        <FormNotice variant={'error'} message={errorCreate + '🌎'} />
      )}
    </>
  )
}

export default NewQuizz
