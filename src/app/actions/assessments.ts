import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function recordAssessment(
  schoolId: string,
  assessmentData: {
    student_id: string;
    assessment_id: string;
    score: number;
    comment?: string;
  }
) {
  const { data, error } = await supabase
    .from('student_assessments')
    .insert({
      school_id: schoolId,
      ...assessmentData
    })
    .select()
    .single()

  if (error) throw error
  return data
}