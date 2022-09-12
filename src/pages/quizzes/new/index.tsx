import { Button, FormNotice, Navbar } from 'components/UI'
import { useQuizzes } from 'hooks'
import Router from 'next/router'
import React, { FC } from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Link from 'next/link'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

const NewQuizz: FC = () => {
  const { create, isLoadingCreate, errorCreate, quizzes } = useQuizzes()

  const handleCreateQuizz = async () => {
    await create({
      body: { total_seconds: 100, total_rounds: 5 },
      onSuccess: (createdQuizz) => {
        Router.push(`/quizzes/game/${encodeURI(createdQuizz.uuid)}`)
      }
    })
  }

  return (
    <>
      <Navbar key="navbar" />
      <div className="w-full p-4 lg:p-10 flex flex-col gap-y-6">
        <Button loading={isLoadingCreate} onClick={handleCreateQuizz}>
          <p className="text-sm">CREATE QUIZZ 🌎</p>
        </Button>

        <h1>Your past quizzes</h1>
        {quizzes?.map((e) => {
          const firstRound = e.rounds.at(0)

          const [lat = 0, lng = 0] = firstRound?.static_image_latlng ?? []

          return (
            <Link href={`/quizzes/game/${e.uuid}`} key={e.id}>
              <a>
                <div className="border p-4 rounded-lg flex justify-between">
                  <p>{`Created ${timeAgo.format(new Date(e?.created_at))}`}</p>
                  <img
                    className="w-40"
                    src={`https://maps.googleapis.com/maps/api/streetview?size=500x500&location=${lat},${lng}
&fov=80&heading=70&pitch=0&key=AIzaSyCGcxn8bTwWyW7Bwg4KRdgkpIlqTfL9Vds`}
                    alt=""
                  />
                </div>
              </a>
            </Link>
          )
        })}

        {errorCreate && isLoadingCreate === false && (
          <FormNotice variant="error" message={errorCreate + '🌎'} />
        )}
      </div>
    </>
  )
}

export default NewQuizz
