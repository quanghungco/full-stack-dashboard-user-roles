import prisma from "@/lib/prisma";
import SingleStudentPage from "../list/students/[id]/page";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth"

const StudentPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const student = await prisma.student.findUnique({
    where: {
      id: user?.username!,
    },
  });



  return (
      <div className="w-full ">
      <SingleStudentPage params={Promise.resolve({id: student?.id || ''})}/> 

      </div>
  );
};

export default StudentPage;
