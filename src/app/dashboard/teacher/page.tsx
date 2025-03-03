// import { authOptions } from "@/auth";
// import AnnouncementData from "@/components/AnnouncementData";
// import BigCalendarContainer from "@/components/BigCalendarContainer";
// import EmergencyNumbers from "@/components/shared/EmergencyNumbers";
// import { getServerSession } from "next-auth";

// const TeacherPage = async () => {
//   const session = await getServerSession(authOptions);
//   const userId = session?.user?.username;
//   return (
//     <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
//       {/* LEFT */}
//       <div className="w-full xl:w-2/3">
//         <div className="h-fit bg-white dark:bg-[#18181b]  shadow-lg  p-4 rounded-md ">
//           <h1 className="text-xl font-semibold">Schedule</h1>
//           <BigCalendarContainer type="teacherId" id={userId!} />
//         </div>

//       </div>
//       {/* RIGHT */}
//       <div className="w-full xl:w-1/3 flex flex-col gap-8">
//         <AnnouncementData />
//         <EmergencyNumbers/>
//       </div>
//     </div>
//   );
// };

// export default TeacherPage;


import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth"
import { Suspense } from "react";
import SingleTeacherPage from "../list/teachers/[id]/page";

const TeacherPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const teacher = await prisma.teacher.findUnique({
    where: {
      id: user?.username!,
    },
  });
  if (!teacher) {
    return <div>Teacher not found</div>;
  }



  return (
    <div className="w-full ">
      <Suspense fallback={<div>Loading...</div>}>
        <SingleTeacherPage params={Promise.resolve({ id: teacher?.id || '' })} />
      </Suspense>
    </div>
  );
};

export default TeacherPage;

