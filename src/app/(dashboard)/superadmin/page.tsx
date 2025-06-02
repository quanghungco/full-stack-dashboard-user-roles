
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StaffRoleManager from "@/components/StaffRoleManager";
import UserCard from "@/components/UserCard";
import FinanceChart from "@/components/FinanceChart";
import Announcements from "@/components/Announcements";
import SystemOverview from "@/components/SystemOverview";
import StudentManager from "@/components/StudentManager";
import StudentBilling from "@/components/StudentBilling";
import StudentReports from "@/components/StudentReports";

const SuperAdminPage = ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  return (
    <div className="p-4 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="staff">Staff Management</TabsTrigger>
          <TabsTrigger value="students">Student Management</TabsTrigger>
          <TabsTrigger value="reports">Student Reports</TabsTrigger>
          <TabsTrigger value="billing">Student Billing</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <UserCard type="admin" />
            <UserCard type="teacher" />
            <UserCard type="student" />
            <UserCard type="parent" />
          </div>
          <SystemOverview />
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <StaffRoleManager />
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <StudentManager />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <StudentReports />
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <StudentBilling studentId={0} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="w-full h-[500px]">
            <FinanceChart />
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">System configuration and settings will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-6">
          <Announcements />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminPage;
