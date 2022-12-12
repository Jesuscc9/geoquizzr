import axios from 'axios'
import React, { useEffect, useState, createContext, useContext } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '../services'

import useSWR from 'swr'
import { useUser } from '@supabase/auth-helpers-react'

const fetchProfile = async (profileId: string) => {
  const profileRes = await supabase
    .from('profiles')
    .select('*')
    .eq('id', profileId)
    .single()
  const profile = profileRes.data
  return profile
}

export const useProfile = () => {
  const user = useUser()

  const shouldFetch = typeof user?.id !== 'undefined'

  const { data: profile } = useSWR(shouldFetch && '/profile', () =>
    fetchProfile(user?.id ?? '')
  )

  return {
    profile
  }
}
