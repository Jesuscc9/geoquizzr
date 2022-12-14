import { Button, FormNotice, Navbar } from '../../../components/UI'
import { useQuizz, useCreateQuizz } from '../../../hooks/models/quizz'
import React, { FC } from 'react'
import { timeAgo } from '../../../helpers'

import { Link, useNavigate } from 'react-router-dom'
import { iQuizz } from '../../../types'

const NewQuizz: FC = () => {
  const { data: quizzes } = useQuizz()

  return (
    <>
      <Navbar key="navbar" />
      <div className="w-full p-4 lg:p-10 flex flex-col gap-y-6 text-white">
        <CreateNewQuizz />

        <h1>Your past quizzes</h1>
        {quizzes?.map((quizz: iQuizz) => {
          const firstRound = quizz.rounds.at(0)

          const [lat = 0, lng = 0] = firstRound?.static_image_latlng ?? []

          return (
            <Link to={`/quizzes/game/${quizz.uuid}`} key={quizz.id}>
              <div className="border p-4 rounded-lg flex justify-between">
                <p>{`Created ${timeAgo.format(
                  new Date(quizz?.created_at)
                )}`}</p>
                <img
                  className="w-40"
                  src={`https://maps.googleapis.com/maps/api/streetview?size=500x500&location=${lat},${lng}
&fov=80&heading=70&pitch=0&key=AIzaSyCGcxn8bTwWyW7Bwg4KRdgkpIlqTfL9Vds`}
                  alt=""
                />
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default NewQuizz

export const CreateNewQuizz: FC = () => {
  const push = useNavigate()

  const { isLoading, create, error } = useCreateQuizz()

  const handleClick = async (): Promise<void> => {
    await create({
      body: { total_seconds: 100, total_rounds: 5 },
      onSuccess: (createdQuizz) => {
        console.log({ createdQuizz })
        push(`/quizzes/game/${encodeURI(createdQuizz.uuid)}`)
      }
    })
  }

  return (
    <>
      <Button loading={isLoading} onClick={handleClick}>
        <p className="text-sm text-white">CREATE QUIZZ 🌎</p>
      </Button>

      {error !== undefined && !isLoading && (
        <FormNotice variant="error" message={error + '🌎'} />
      )}
    </>
  )
}
