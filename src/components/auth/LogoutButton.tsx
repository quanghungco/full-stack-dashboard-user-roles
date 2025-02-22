"use client"
import { LogOut } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="flex items-center gap-4 text-gray-500 py-2 pl-2 rounded-md hover:scale-105 transition-all duration-300"
        >
          <LogOut size={20} />
          <span className="hidden lg:block">Logout</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };