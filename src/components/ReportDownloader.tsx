import React from "react";

type Props = {
  studentId: number | string;
};

const ReportDownloader: React.FC<Props> = ({ studentId }) => {
  const handleDownload = () => {
    // Implement download logic here
    alert(`Download report for student ID: ${studentId}`);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Report Downloader</h2>
      <button
        onClick={handleDownload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download Report
      </button>
    </div>
  );
};

export default ReportDownloader;