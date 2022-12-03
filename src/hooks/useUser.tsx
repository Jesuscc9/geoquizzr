import axios from 'axios'
import React, { useEffect, useState, createContext, useContext } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '../services/supabaseClient'

const SWR_KEY = '/api/auth'

interface iUserContext {
  user: User | null
  session: Session | null
}

export const UserContext = createContext<iUserContext>({} as iUserContext)

export const UserProvider = ({ ...props }) => {
  const [session, setSession] = useState<Session | null>(
    supabase.auth.session()
  )

  const [user, setUser] = useState<User | null>(
    supabase.auth.session()?.user ?? null
  )

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

        console.log({ data })
      }
    )

    return authListener?.unsubscribe()
  }, [])

  return <UserContext.Provider value={{ user, session }} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within an UserProvider')
  }

  return context
}
