import { iQuizzInsert } from '../../../types'
import { supabase } from '../../../services'
import {
  PostgrestResponse,
  PostgrestSingleResponse
} from '@supabase/supabase-js'

const supabaseQuizzSelect = `*, rounds ( *, country ( * ))`

export const createQuizz = async (
  body: iQuizzInsert
): Promise<PostgrestSingleResponse<any>> => {
  return await supabase
    .from('quizzes')
    .insert(body, { count: 'exact' })
    .select(supabaseQuizzSelect)
    .single()
}

// Fetch helper for SWR handler
export const fetchSupabase = async (
  fn: (...args: any) => Promise<PostgrestResponse<any>>,
  ...args: any
): Promise<any> => {
  try {
    const res = await fn(...args)
    if (res.error != null) {
      throw new Error(res.error.message)
    }
    return res.data
  } catch (e: any) {
    throw new Error(e)
  }
}

// Get all quizes
export const getAllQuizzes = async (): Promise<PostgrestResponse<any>> => {
  return await supabase
    .from('quizzes')
    .select(supabaseQuizzSelect)
    .order('id', { ascending: false })
}

// Get single quizz
export const getOneQuizz = async (
  uuid: string
): Promise<PostgrestSingleResponse<any>> => {
  return await supabase
    .from('quizzes')
    .select(supabaseQuizzSelect)
    .eq('uuid', uuid)
    .order('id', { ascending: false })
    .single()
}
