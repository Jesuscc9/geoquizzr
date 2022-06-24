import { User } from '@supabase/gotrue-js'
import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { supabase } from '../services'
import { iLoginValues, iSignupValues } from '../types'

const parseUser = (rawUser: User | null) => {
  return rawUser?.identities?.[0].identity_data
}

const SWR_KEY = 'api/user'

export const useAuth = () => {
  const { mutate } = useSWRConfig()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<null | string>(null)

  const handleError = (e: string) => {
    setError(e)
    setIsLoading(false)
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      await mutate(SWR_KEY, async () => {
        const { user: rawUser } = await supabase.auth.signIn({
          provider: 'google'
        })
        setError(null)
        setIsLoading(false)
        return parseUser(rawUser)
      })
    } catch (e) {
      handleError(String(e))
    }
  }

  const login = async (values: iLoginValues) => {
    setIsLoading(true)
    try {
      await mutate(SWR_KEY, async () => {
        const { user: rawUser, error } = await supabase.auth.signIn(values)
        if (error) {
          handleError(error.message)
          return
        }
        setError(null)
        setIsLoading(false)
        return parseUser(rawUser)
      })
    } catch (e) {
      handleError(String(e))
    }
  }

  const signUp = async (values: iSignupValues) => {
    setIsLoading(true)
    try {
      await mutate(SWR_KEY, async () => {
        const { user: rawUser, error } = await supabase.auth.signUp(values)
        if (error) {
          handleError(error.message)
          return
        }
        setError(null)
        setIsLoading(false)
        return parseUser(rawUser)
      })
    } catch (e) {
      handleError(String(e))
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await mutate(SWR_KEY, async () => {
        await supabase.auth.signOut()
        setIsLoading(false)
        return null
      })
    } catch (e) {
      handleError(String(e))
    }
  }

  return {
    loginWithGoogle,
    login,
    logout,
    signUp,
    isLoading,
    error
  }
}
