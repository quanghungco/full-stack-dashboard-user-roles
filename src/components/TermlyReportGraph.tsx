import React from "react";

type Props = {
  studentId: number | string;
};

const TermlyReportGraph: React.FC<Props> = ({ studentId }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Termly Report Graph</h2>
      <p>Display performance graph for student ID: {studentId}</p>
      {/* Add chart/graph here */}
    </div>
  );
};

export default TermlyReportGraph;