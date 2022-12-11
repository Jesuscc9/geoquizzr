import { useLocation } from 'react-router-dom'
import React, { createRef, FC, ReactNode, useEffect, useState } from 'react'
import { supabase } from '../../../services'

import { SessionContextProvider } from '@supabase/auth-helpers-react'

export const CustomRouter: FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useLocation()

  const route = ''

  const bgRef = createRef<HTMLDivElement>()

  // e.g Convert from '/quizzes/new' to 'quizzes-new' and use it as a css class
  const backgroundClassname = route.slice(1, route.length).replace('/', '-')

  useEffect(() => {
    if (!bgRef?.current) return
    bgRef.current.style.opacity = '1'
  }, [])

  const fetchSession = async () => {
    console.log(await supabase.auth.getUser())
  }

  useEffect(() => {
    // fetchSession()
  }, [])

  return (
    <>
      <SessionContextProvider supabaseClient={supabase} initialSession={null}>
        <div
          ref={bgRef}
          className={`common-bg ${backgroundClassname}-background`}
        ></div>
        {children}
      </SessionContextProvider>
    </>
  )
}
