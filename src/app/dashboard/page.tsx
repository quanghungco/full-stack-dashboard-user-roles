import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { Suspense } from "react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return redirect("/");
  }

  const role = (session?.user?.role as string)?.toLowerCase();

  return <Suspense fallback={<div>Loading...</div>}> {redirect(`/dashboard/${role}`)}</Suspense>;

}
