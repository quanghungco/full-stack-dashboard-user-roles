import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
    <SidebarProvider>
      <div className="fixed top-0 bg-white dark:bg-gray-900 z-50 w-full">
        <Navbar />
      </div>
      <Menu />

      <div className="w-full bg-[#F7F8FA] dark:bg-black overflow-scroll flex h-screen pt-20">
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
    </ThemeProvider>
  );
}
