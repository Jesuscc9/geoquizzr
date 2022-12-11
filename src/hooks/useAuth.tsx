import { User } from '@supabase/gotrue-js'
import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { iLoginValues, iSignupValues } from '../types'
import { supabase } from '../services'
import { debug } from 'console'

const SWR_KEY = 'api/user'

export const useAuth = () => {
  const { mutate } = useSWRConfig()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<null | string>(null)

  const handleError = (e: string) => {
    console.error(e)
    setError(e)
    setIsLoading(false)
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      const res = await supabase.auth.signInWithOAuth({
        provider: 'google'
      })

      if (res.error) {
        handleError(res.error.message)
        return
      }

      await mutate(SWR_KEY)

      setError(null)
      setIsLoading(false)
    } catch (e) {
      handleError(String(e))
    }
  }

  const login = async (values: iLoginValues) => {
    setIsLoading(true)
    try {
      const res = await supabase.auth.signInWithPassword(values)
      await mutate(SWR_KEY)

      if (res.error) {
        handleError(res.error?.message)
        return
      }

      setError(null)
      setIsLoading(false)
    } catch (e) {
      handleError(String(e))
    }
  }

  const signUp = async (values: iSignupValues) => {
    setIsLoading(true)
    try {
      const res = await supabase.auth.signUp(values)
      await mutate(SWR_KEY)

      if (res.error) {
        handleError(res.error.message)
      }

      setError(null)
      setIsLoading(false)
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
