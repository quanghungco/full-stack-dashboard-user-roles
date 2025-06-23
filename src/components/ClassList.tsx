'use client'

import { useEffect, useState } from 'react'
import { getClassesWithStudents } from '../app/actions/classes'

type ClassWithStudents = Awaited<ReturnType<typeof getClassesWithStudents>>[0]

export function ClassList({ schoolId }: { schoolId: string }) {
  const [classes, setClasses] = useState<ClassWithStudents[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadClasses() {
      try {
        const data = await getClassesWithStudents(schoolId)
        setClasses(data)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load classes')
      } finally {
        setLoading(false)
      }
    }

    loadClasses()
  }, [schoolId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-4">
      {classes.map(classItem => (
        <div key={classItem.id} className="border p-4 rounded">
          <h3 className="font-bold">{classItem.name}</h3>
          <p>Grade: {classItem.grade_level}</p>
          <div className="mt-2">
            <h4 className="font-semibold">Students:</h4>
            <ul className="list-disc pl-5">
              {classItem.student_classes.map((sc: { users: { id: string; first_name: string; last_name: string } }) => (
                <li key={sc.users.id}>
                  {sc.users.first_name} {sc.users.last_name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}