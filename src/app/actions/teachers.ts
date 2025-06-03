import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getTeacherSubjects(teacherId: string, schoolId: string) {
  const { data, error } = await supabase
    .from('teacher_subjects')
    .select(`
      subjects (
        id,
        name,
        code
      ),
      school_classes (
        id,
        name,
        grade_level
      )
    `)
    .eq('teacher_id', teacherId)
    .eq('school_id', schoolId)

  if (error) throw error
  return data
}