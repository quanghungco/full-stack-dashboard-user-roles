import React from "react";

type Props = {
  studentId: number | string;
};

const StudentBilling: React.FC<Props> = ({ studentId }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Student Billing</h2>
      <p>Show billing details for student ID: {studentId}</p>
      {/* Add billing table or summary here */}
    </div>
  );
};

export default StudentBilling;