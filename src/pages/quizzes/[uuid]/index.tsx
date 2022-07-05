import { Loader } from 'components/UI'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'

export const QuizzesDetails: NextPage = () => {
  const router = useRouter()

  const {
    query: { uuid }
  } = router

  const { data } = useSWR(`/api/quizzes/${uuid}`)

  if (!data) return <Loader />

  return <div>{JSON.stringify(data)}</div>
}

export default QuizzesDetails
