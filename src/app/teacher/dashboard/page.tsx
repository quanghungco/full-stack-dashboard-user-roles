"use client";

import { useState } from "react";

const subjects = [
  "Mathematics",
  "English",
  "Science",
  "Social Studies",
  "ICT",
];

const students = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Alice Johnson" },
];

const assessmentFields = [
  { key: "classwork", label: "Classwork", max: 10 },
  { key: "homework", label: "Homework", max: 10 },
  { key: "test1", label: "Test 1", max: 20 },
  { key: "test2", label: "Test 2", max: 20 },
  { key: "projectwork", label: "Project Work", max: 20 },
  { key: "groupwork", label: "Group Work", max: 20 },
];

type Marks = {
  [studentId: string]: {
    [field: string]: number | "";
  };
};

export default function TeacherDashboard() {
  const [activeSubject, setActiveSubject] = useState(subjects[0]);
  const [marks, setMarks] = useState<Marks>({});

  const handleInput = (
    studentId: string,
    field: string,
    value: string,
    max: number
  ) => {
    let num = value === "" ? "" : Math.max(0, Math.min(Number(value), max));
    setMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] ?? {}),
        [field]: num as number | "",
      } as { [field: string]: number | "" },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send marks[studentId] for activeSubject to backend
    alert("Marks saved for " + activeSubject);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Teacher Dashboard</h1>
      {/* Subject Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        {subjects.map((subject) => (
          <button
            key={subject}
            className={`px-4 py-2 font-semibold border-b-2 ${
              activeSubject === subject
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveSubject(subject)}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* SBA Input Table */}
      <form onSubmit={handleSubmit}>
        <table className="min-w-full border text-sm mb-4">
          <thead className="bg-blue-50">
            <tr>
              <th className="border px-2 py-1">Student</th>
              {assessmentFields.map((field) => (
                <th key={field.key} className="border px-2 py-1">
                  {field.label} <span className="text-xs text-gray-400">(/{field.max})</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border px-2 py-1">{student.name}</td>
                {assessmentFields.map((field) => (
                  <td key={field.key} className="border px-2 py-1">
                    <input
                      type="number"
                      min={0}
                      max={field.max}
                      value={
                        marks[student.id]?.[field.key] !== undefined
                          ? marks[student.id][field.key]
                          : ""
                      }
                      onChange={(e) =>
                        handleInput(
                          student.id,
                          field.key,
                          e.target.value,
                          field.max
                        )
                      }
                      className="w-16 p-1 border rounded"
                      required
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          Save Marks
        </button>
      </form>
    </div>
  );
}