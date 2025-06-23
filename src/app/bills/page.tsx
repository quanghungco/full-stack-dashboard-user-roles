"use client";

import { useState } from "react";

type Student = {
  id: string;
  name: string;
};

// Dummy students list (replace with real data or fetch from API)
const students: Student[] = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Alice Johnson" },
];

export default function GenerateBillPage() {
  const [studentId, setStudentId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send bill data to your backend here
    setSuccess(true);
    setStudentId("");
    setAmount("");
    setDescription("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Generate Student Bill</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Student
          <select
            className="w-full p-2 border rounded"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Amount
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min={0}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Generate Bill
        </button>
        {success && (
          <div className="text-green-600 font-semibold">
            Bill generated successfully!
          </div>
        )}
      </form>
    </div>
  );
}