import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getClassesWithStudents(schoolId: string) {
  const { data, error } = await supabase
    .from('school_classes')
    .select(`
      id,
      name,
      grade_level,
      student_classes (
        users (
          id,
          first_name,
          last_name,
          email
        )
      )
    `)
    .eq('school_id', schoolId)

  if (error) throw error
  return data
}