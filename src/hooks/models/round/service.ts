import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { supabase } from '../../../services'
import { iRoundInsert } from '../../../types'

export const SWR_KEY = '/rounds'

const supabaseQuizzSelect = `*, rounds ( *, country ( * ))`

export const createRound = async (
  body: iRoundInsert
): Promise<PostgrestSingleResponse<any>> => {
  return await supabase
    .from('rounds')
    .insert(body, { count: 'exact' })
    .select(supabaseQuizzSelect)
    .single()
}
