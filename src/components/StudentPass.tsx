import React from "react";

type Props = {
  studentId: number | string;
};

const StudentPass: React.FC<Props> = ({ studentId }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Student Pass</h2>
      <p>Show student pass info for student ID: {studentId}</p>
      {/* Add pass details or QR code here */}
    </div>
  );
};

export default StudentPass;