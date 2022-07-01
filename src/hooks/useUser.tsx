import { useEffect } from 'react'
import useSWR from 'swr'
import { supabase } from '../services/supabaseClient'

export const useUser = () => {
  const { data: user, error, mutate } = useSWR('/api/auth')

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        if (event === 'SIGNED_IN') {
          mutate()
        }
      }
    )

    return authListener?.unsubscribe()
  }, [])

  return {
    isLoading: !user && !error,
    user,
    error
  }
}
