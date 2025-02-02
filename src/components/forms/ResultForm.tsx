'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';


export default function ExamResultForm() {
  const [subjects, setSubjects] = useState([{ id: Date.now(), name: '', score: '' }]);

  const addSubject = () => {
    setSubjects([...subjects, { id: Date.now(), name: '', score: '' }]);
  };

  const removeSubject = (id: number) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const handleChange = (id: number, field: 'name' | 'score', value: string) => {
    setSubjects(subjects.map(subject => 
      subject.id === id ? { ...subject, [field]: value } : subject
    ));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const studentId = form.elements.namedItem('studentId') as HTMLInputElement;
    console.log({ subjects, studentId: studentId.value });
    console.log([...subjects]);
  };
 

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <div>
        <label className="block font-medium">Student ID:</label>
        <Input name="studentId" type="text" placeholder="Enter Student ID" required className="w-full" />
      </div>


      {subjects.map((subject, index) => (
        <div key={subject.id} className="flex space-x-2 items-center">
          <Input
            type="text"
            placeholder="Subject Name"
            value={subject.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(subject.id, 'name', e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Score"
            value={subject.score}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(subject.id, 'score', e.target.value)}
            required
          />
          {index > 0 && (
            <Button type="button" onClick={() => removeSubject(subject.id)} variant="destructive">
              Remove
            </Button>
          )}
        </div>
      ))}

      <Button type="button" onClick={addSubject} variant="outline">
        Add Subject
      </Button>

      <Button type="submit">Submit</Button>
    </form>
  );
}
