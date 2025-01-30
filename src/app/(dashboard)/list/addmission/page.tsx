import { Admission, Prisma } from "@prisma/client";
import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import DownloadPDF from "@/components/forms/DownloadPDF";
import React from "react";

export type AdmissionList = Admission;

const AdmissionListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;
  
  const columns = [
    {
      header: "Student Name",
      accessor: "studentName",
    },
    {
      header: "Father Name",
      accessor: "fatherName",
    },
    {
      header: "Mother Name",
      accessor: "motherName",
    },
    {
      header: "Contact Number", // Corrected spelling from "Discription" to "Description"
      accessor: "contactNumber", // Corrected accessor from "discription" to "description"
    },
    {
      header: "Date of Birth",
      accessor: "dateOfBirth",
      className: "hidden md:table-cell",
    },
    {
      header: "Admission Date",
      accessor: "createdAt",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];
  
  const renderRow = (item: AdmissionList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center p-4">{item.studentName}</td>
      
      <td className="hidden md:table-cell gap-4 ">{item.fatherName}</td>
      <td className="hidden md:table-cell gap-4 ">{item.motherName}</td>
      <td className="hidden md:table-cell gap-4">
        {item.contactNumber.length > 11 
          ? item.contactNumber.split(' ').slice(0, 11).join(' ') + '...'
          : item.contactNumber}
      </td>
      <td className="hidden md:table-cell gap-4 ">
        {new Intl.DateTimeFormat("en-US").format(item.dateOfBirth)}
      </td>
      <td className="hidden md:table-cell gap-4 ">
        {new Intl.DateTimeFormat("en-US").format(item.createdAt)}
      </td>

      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="admission" type="update" data={item} />
              <FormContainer table="admission" type="delete" id={item.id} />
            </>
          )}
          <DownloadPDF {...item} />
        </div>
      </td>
    </tr>
  );
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.AdmissionWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.studentName = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.admission.findMany({
      where: query,
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.admission.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Admissions
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormContainer table="admission" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AdmissionListPage;

