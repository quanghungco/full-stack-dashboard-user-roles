import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Payment, Prisma } from "@prisma/client";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

type PaymentList = Payment & {
  student: {
    id: number;
    name: string;
    username: string;
  };
};


const PaymentList = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  
  const columns = [
    { header: "Student Name", accessor: "student.name" },
    { header: "Student ID", accessor: "student.username" },
    { header: "Amount", accessor: "amount" },
    { header: "Status", accessor: "status" },
    ...(role === "admin" ? [{ header: "Actions", accessor: "action" }] : []),


  ];


  const renderRow = (item: PaymentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight dark:bg-[#18181b] dark:hover:bg-gray-500 dark:even:bg-gray-600"
    >
      <td className="flex items-center gap-4 p-4 justify-center">{item.student.name}</td>
      <td className="text-center">{item.student.id}</td>
      <td className="text-center">{item.amount}</td>
      <td className="text-center">{item.status}</td>

      {role === "admin" && (
        <td className="hidden md:table-cell text-center">
          <div className="flex items-center gap-2 justify-center">
            <FormContainer table="payment" type="update" data={item} />
            <FormContainer table="payment" type="delete" id={item.id} />
          </div>
        </td>
      )}
    </tr>
  );

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.PaymentWhereInput = {};

  if (queryParams.studentId) {
    query.studentId = queryParams.studentId;
  }

  const [data, count] = await prisma.$transaction([
    prisma.payment.findMany({
      where: query,
      include: {
        student: { select: { id: true, name: true } },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.payment.count({ where: query }),
  ]);

  

  return (
    <div className="bg-white dark:bg-[#18181b] p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Payments</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormContainer table="payment" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count || 0} />
    </div>
  );
};

export default PaymentList;
