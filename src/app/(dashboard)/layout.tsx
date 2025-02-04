import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="fixed top-0 bg-white z-50 w-full">
        <Navbar />
      </div>
      <Menu />

      <div className="w-full bg-[#F7F8FA] overflow-scroll flex h-screen pt-20">
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  );
}
