import Table from "@/components/Table";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth, currentUser } from "@clerk/nextjs/server";

type ResultList = {
  id: number;
  subjectId: string;
  surename: string;
  subjectName: string;
  marks: number;
  grade: string;
};

const StudentResultPage = async () => {
  const { userId, sessionClaims } = auth();
  const user = await currentUser();
  // console.log("userId 0000=====",userId, "sessionClaims====", sessionClaims, "user====", user);
  const role = (sessionClaims?.metadata as { role?: string })?.role;


  // Ensure only students can access this page
  if (role !== "student") {
    return <p className="text-red-500 text-center">Unauthorized access</p>;
  }

  // Fetch results for the logged-in student
  const dataRes = await prisma.result.findMany({
    where: { studentId: user?.username! },
    include: {
      student: { select: { name: true, surname: true , username: true} },
      subject: { select: { id: true, name: true } },
    },
  });



  const data = dataRes.map((item) => ({
    id: item.id,
    studentId: item.student?.username,
    studentName: item.student?.name,
    studentSurname: item.student?.surname,
    subjectId: item.subject?.id,
    subjectName: item.subject?.name,
    marks: item.marks,
    grade: item.grade,
  }));

  const columns = [
    { header: "Subject ID", accessor: "subjectId" },
    { header: "Subject", accessor: "subjectName" },
    { header: "Marks", accessor: "marks" },
    { header: "Grade", accessor: "grade" },
  ];

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <h1 className="text-lg font-semibold text-center">Your Results</h1>
      <Table columns={columns} data={data} renderRow={(item: ResultList) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
          <td className="p-4 text-center">{item.subjectId}</td>
          <td className="text-center">{item.subjectName}</td>
          <td className="p-4 text-center">{item.marks}</td>
          <td className="p-4 text-center">{item.grade}</td>
        </tr>
      )}/>
    </div>
  );
};

export default StudentResultPage;
