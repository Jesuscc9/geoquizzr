import axios from 'axios'
import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  Context
} from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '../services/'

import useSWR from 'swr'

const SWR_KEY = '/api/auth'

interface iUserContext {
  user: User | null
  session: Session | null
}

export const UserContext = createContext<iUserContext>({
  user: null,
  session: null
})

export const UserProvider = ({ ...props }: any) => {
  const [session, setSession] = useState<Session | null>()
  const [user, setUser] = useState<User | null>()
  const profile = useSWR('/profile', fetchProfile)

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
