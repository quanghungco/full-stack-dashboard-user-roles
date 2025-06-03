import { supabase } from '@/lib/supabase'

export async function getSchoolWithConfig(schoolId: string) {
  const { data, error } = await supabase
    .from('schools')
    .select(`
      *,
      school_configs (*)
    `)
    .eq('id', schoolId)
    .single()

  if (error) throw error
  return data
}