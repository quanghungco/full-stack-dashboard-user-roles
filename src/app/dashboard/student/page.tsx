import prisma from "@/lib/prisma";
import SingleStudentPage from "../list/students/[id]/page";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth"
import { Suspense } from "react";

const StudentPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const student = await prisma.student.findUnique({
    where: {
      id: user?.username!,
    },
  });
  if (!student) {
    return <div>Student not found</div>;
  }



  return (
    <div className="w-full ">
      <Suspense fallback={<div>Loading...</div>}>
        <SingleStudentPage params={Promise.resolve({ id: student?.id || '' })} />
      </Suspense>
    </div>
  );
};

export default StudentPage;
