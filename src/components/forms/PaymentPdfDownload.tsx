"use client"
import React from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaDownload } from 'react-icons/fa';

interface PaymentHistory {
  id: string;
//   studentName: string;
  studentId: string;
//   class: string;
  amount: number;
  status: string;
  createdAt: Date;

}

const DownloadPaymentPDF: React.FC<PaymentHistory> = (data) => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Payment History Data", 20, 10);
    doc.autoTable({
      head: [["Label", "Value"]],
      body: [
        // ["Student's Name", data.studentName],
        ["Student's ID", data.studentId],
        // ["Class", data.class],
        ["Amount", `${data.amount}/=`],
        ["Payment Date", data.createdAt.toISOString().split('T')[0]],
        ["Status", data.status],
      ],
    });
    doc.save(`payment_${data.id}.pdf`);
  };

  return (
    <button onClick={downloadPDF} className="bg-blue-300 text-white p-1 rounded-md flex items-center gap-2 px-2">
      <FaDownload className='w-3 h-3' /> PDF
    </button>
  );
};

export default DownloadPaymentPDF;
