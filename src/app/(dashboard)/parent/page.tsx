import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";


const ParentPage = async () => {
  const { userId } = auth();
  const currentUserId = userId;
  
  const students = await prisma.student.findMany({
    where: {
      parentId: currentUserId!,
    },
  });

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="">
        {students.map((student) => (
          <div className="w-full xl:w-2/3" key={student.id}>
            <div className="h-full bg-white p-4 rounded-md">
              <h1 className="text-xl font-semibold">
                Schedule ({student.name + " " + student.surname})
              </h1>
              <BigCalendarContainer type="classId" id={student.classId} />
            </div>
          </div>
        ))}
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;




import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Update the import path below to the correct location of your Card components.
// For example, if the file is at 'src/components/ui/Card.tsx', use:
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import StudentBilling from "@/components/StudentBilling";
import StudentWallet from "@/components/StudentWallet";
import TermlyReportGraph from "@/components/TermlyReportGraph";
import ReportDownloader from "@/components/ReportDownloader";
import CanteenWallet from "@/components/CanteenWallet";
import StudentPass from "@/components/StudentPass";
import TimeLogger from "@/components/TimeLogger";

// Mock data - replace with actual API calls
const mockStudents = [
  {
    id: 1,
    name: "John",
    surname: "Doe",
    classId: "class-1",
    parentId: "parent-1"
  },
  {
    id: 2,
    name: "Jane",
    surname: "Doe",
    classId: "class-2",
    parentId: "parent-1"
  }
];

const ParentPage = () => {
  const [selectedStudent, setSelectedStudent] = useState(mockStudents[0]);

  return (
    <div className="flex-1 p-4 space-y-6">
      {/* Student Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Student</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {mockStudents.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  selectedStudent.id === student.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {student.name} {student.surname}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Dashboard */}
      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="canteen">Canteen</TabsTrigger>
          <TabsTrigger value="pass">Pass</TabsTrigger>
          <TabsTrigger value="timelog">Time Log</TabsTrigger>
          <TabsTrigger value="announcements">News</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>
                Schedule ({selectedStudent.name} {selectedStudent.surname})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BigCalendarContainer type="classId" id={selectedStudent.classId} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <StudentBilling studentId={selectedStudent.id} />
        </TabsContent>

        <TabsContent value="wallet">
          <StudentWallet studentId={selectedStudent.id} />
        </TabsContent>

        <TabsContent value="reports">
          <div className="space-y-6">
            <TermlyReportGraph studentId={selectedStudent.id} />
            <ReportDownloader studentId={selectedStudent.id} />
          </div>
        </TabsContent>

        <TabsContent value="canteen">
          <CanteenWallet studentId={selectedStudent.id} />
        </TabsContent>

        <TabsContent value="pass">
          <StudentPass studentId={selectedStudent.id} />
        </TabsContent>

        <TabsContent value="timelog">
          <TimeLogger studentId={selectedStudent.id} />
        </TabsContent>

        <TabsContent value="announcements">
          <Announcements />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentPage;
