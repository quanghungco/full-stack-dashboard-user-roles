import FormContainer from "@/components/forms/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/shared/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { ClassMaterial, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import SortButton from "@/components/shared/SortButton";

type ClassMaterialList = ClassMaterial & {
  class: {
    id: number;
    name: string;
  };
};

const ClassMaterialListPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role?.toLowerCase();

  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Class Name",
      accessor: "class.name",
    },
    {
      header: "Uploaded Date",
      accessor: "uploadedAt",
    },
    {
      header: "PDF File",
      accessor: "pdfUrl",
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

  const renderRow = (item: ClassMaterialList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 dark:border-white/20 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight dark:bg-[#18181b] dark:hover:bg-gray-600 dark:even:bg-[#242429]"
    >
      <td className="text-center p-4">{item.title}</td>
      <td className="text-center">{item.class?.name || 'N/A'}</td>
      <td className="text-center">{item.uploadedAt?.toLocaleDateString()}</td>
      <td className="text-sky-500 font-semibold">
        <Link
          className="flex gap-2 justify-center"
          href={item.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.title}.pdf <FaDownload />
        </Link>
      </td>
      <td>
        <div className="flex items-center gap-2 justify-center">
          {role === "admin" && (
            <>
              <FormContainer table="classMaterial" type="update" data={item} />
              <FormContainer table="classMaterial" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, perPage, sort, ...queryParams } = await Promise.resolve(searchParams);
  const p = page ? parseInt(page) : 1;
  const itemsPerPage = perPage ? parseInt(perPage) : ITEM_PER_PAGE;

  const query: Prisma.ClassMaterialWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.classMaterial.findMany({
      where: query,
      include: {
        class: true, // Include the class relation
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
      orderBy: {
        uploadedAt: (sort as "asc" | "desc") || "desc",
      },
    }),
    prisma.classMaterial.count({ where: query }),
  ]);

  return (
    <div className="bg-white dark:bg-[#18181b]  shadow-lg  p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          Class Materials
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <SortButton />
          <div className="flex items-center gap-4 self-end">
            {(role === "admin" || role === "teacher") && (
              <FormContainer table="classMaterial" type="create" />
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} perPage={itemsPerPage} />
    </div>
  );
};

export default ClassMaterialListPage;
