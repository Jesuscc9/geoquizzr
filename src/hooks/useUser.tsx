import axios from 'axios'
import React, { useEffect, useState, createContext, useContext } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '../services/'

import useSWR from 'swr'

const fetchProfile = async () => {
  const id = await supabase.auth.getUser()
  return supabase.from('profiles').select('*').eq('id', 12)
}

const SWR_KEY = '/api/auth'

interface iUserContext {
  user: User | null
  session: Session | null
}

export const UserContext = createContext<iUserContext>({
  user: null,
  session: null
})

export const UserProvider = ({ ...props }) => {
  const [session, setSession] = useState<Session | null>()
  const [user, setUser] = useState<User | null>()
  const profile = useSWR('/profile', fetchProfile)

  console.log({ profile })

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setUser(currentSession?.user ?? null)
        setSession(currentSession)

        const data = await axios.post(
          SWR_KEY,
          { event, session: currentSession },
          { withCredentials: true }
        )
      }
    )

    return authListener?.subscription.unsubscribe()
  }, [])

  return (
    <UserContext.Provider value={{ user: null, session: null }} {...props} />
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within an UserProvider')
  }

  return context
}
