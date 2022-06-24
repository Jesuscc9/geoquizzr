import { User } from '@supabase/gotrue-js'
import { useEffect } from 'react'
import useSWR from 'swr'
import { supabase } from '../services/supabaseClient'

const parseUser = (rawUser: User | null | undefined) => {
  return rawUser?.identities?.[0].identity_data
}

export const useUser = () => {
  const {
    data: user,
    error,
    mutate
  } = useSWR('api/user', () => {
    return parseUser(supabase.auth.user())
  })

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      mutate(parseUser(session?.user))
    })
  }, [])

  return {
    isLoading: !user && !error,
    user,
    error
  }
}
