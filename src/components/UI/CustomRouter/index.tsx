import { useRouter } from 'next/router'
import React, { createRef, FC, ReactNode, useEffect } from 'react'

export const CustomRouter: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()

  const { route } = router

  const bgRef = createRef<HTMLDivElement>()

  // e.g Convert from '/quizzes/new' to 'quizzes-new'
  const backgroundClassname = route.slice(1, route.length).replace('/', '-')

  useEffect(() => {
    if (!bgRef?.current) return
    bgRef.current.style.opacity = '1'
  }, [])

  return (
    <>
      <div
        ref={bgRef}
        className={`common-bg ${backgroundClassname}-background`}
      ></div>
      {children}
    </>
  )
}
