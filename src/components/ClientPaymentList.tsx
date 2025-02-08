"use client";

import React, { useState } from "react";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import PaymentForm from "@/components/forms/PaymentForm";

type StudentWithPayments = {
  id: string; // Ensure this matches Prisma's return type
  name: string;
  username: string;
  payments: {
    id: string; // Ensure payment ID is also a string
    amount: number;
    status: string;
  }[];
};

const ClientPaymentList = ({ students, total, role, page }: { students: StudentWithPayments[]; total: number; role?: string; page: number }) => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const handleOpenForm = (studentId: string) => {
    setSelectedStudentId(studentId);
    setOpenForm(true);
  };

  const columns = [
    { header: "Student Name", accessor: "name" },
    { header: "Student ID", accessor: "id" },
    { header: "Amount", accessor: "amount" },
    { header: "Status", accessor: "status" },
    { header: "Actions", accessor: "action" },
  ];

  const renderRow = (student: StudentWithPayments) => {
    const payment = student.payments[0];

    return (
      <tr key={student.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight dark:bg-[#18181b] dark:hover:bg-gray-500 dark:even:bg-gray-600">
        <td className="flex items-center gap-4 p-4 justify-center">{student.name}</td>
        <td className="text-center ">{student.id}</td>
        <td className="text-center">{payment ? payment.amount : 0}</td>
        <td className="text-center">{payment ? payment.status : "Not Paid"}</td>
        <td className="flex justify-center">
          <button
            onClick={() => handleOpenForm(student.id.toString())}
            className="bg-blue-500 text-white px-4 py-1 rounded-md"
          >
            Pay
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white dark:bg-[#18181b] p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Payments</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
        </div>
      </div>

      <Table columns={columns} renderRow={renderRow} data={students} />
      <Pagination page={page} count={total || 0} />

      {openForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-black p-4 rounded-md shadow-lg">
            <PaymentForm type="create" data={{ studentId: selectedStudentId || "", amount: 0, status: "NotPaid" }} setOpen={setOpenForm} />
          </div>
        </div>
      )}
    </div>
  );
};


export default ClientPaymentList;
