import React from "react";

type Props = {
  studentId: number | string;
};

const TimeLogger: React.FC<Props> = ({ studentId }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Time Logger</h2>
      <p>Display time logs for student ID: {studentId}</p>
      {/* Add time log table or chart here */}
    </div>
  );
};

export default TimeLogger;