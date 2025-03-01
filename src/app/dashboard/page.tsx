import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return redirect("/");
  }

  const role = (session?.user?.role as string)?.toLowerCase();

  return redirect(`/dashboard/${role}`);
}
