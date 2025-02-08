// Menu.tsx (Server Component)
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"; // Import Shadcn Sidebar components

// Define the structure of the menu items
interface MenuItem {
  icon: string;
  label: string;
  href: string;
  visible: string[];
}

const menuItems: MenuItem[] = [
  {
    icon: "/home.png",
    label: "Home",
    href: "/",
    visible: ["admin", "teacher", "student"],
  },
  {
    icon: "/announcement.png",
    label: "Announcements",
    href: "/list/announcements",
    visible: ["admin", "teacher", "student"],
  },
  {
    icon: "/student.png",
    label: "Addmission",
    href: "/list/addmission",
    visible: ["admin",],
  },
  {
    icon: "/teacher.png",
    label: "Teachers",
    href: "/list/teachers",
    visible: ["admin", "teacher"],
  },
 
  {
    icon: "/student.png",
    label: "Students",
    href: "/list/students",
    visible: ["admin", "teacher"],
  },
  // {
  //   icon: "/parent.png",
  //   label: "Parents",
  //   href: "/list/parents",
  //   visible: ["admin", "teacher"],
  // },
  {
    icon: "/subject.png",
    label: "Subjects",
    href: "/list/subjects",
    visible: ["admin"],
  },
  {
    icon: "/class.png",
    label: "Classes",
    href: "/list/classes",
    visible: ["admin", "teacher"],
  },
  // {
  //   icon: "/lesson.png",
  //   label: "Lessons",
  //   href: "/list/lessons",
  //   visible: ["teacher","admin"],
  // },

  {
    icon: "/exam.png",
    label: "Exams",
    href: "/list/exams",
    visible: ["admin", "teacher", "student",],
  },
  {
    icon: "/assignment.png",
    label: "Assignments",
    href: "/list/assignments",
    visible: [ "teacher", "student", ],
  },
  {
    icon: "/result.png",
    label: "All Results",
    href: "/list/results",
    visible: ["admin", "teacher", ],
  },
  {
    icon: "/result.png",
    label: "Your Results",
    href: "/list/student-result",
    visible: ["student",],

  },
  {
    icon: "/attendance.png",
    label: "Attendance",
    href: "/list/attendance",
    visible: ["admin", "teacher" ],
  },

  {
    icon: "/finance.png",
    label: "Finance",
    href: "/list/finance",
    visible: ["admin"],
  },
  {
    icon: "/wallet2.png",
    label: "Payments",
    href: "/list/payment",
    visible: ["admin"],
  },


  // {
  //   icon: "/calendar.png",
  //   label: "Events",
  //   href: "/list/events",
  //   visible: ["admin", "teacher", "student", "parent"],

  // },
  // {
  //   icon: "/message.png",
  //   label: "Messages",
  //   href: "/list/messages",
  //   visible: ["admin", "teacher", "student", "parent"],
  // },
];

const Menu = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;

  return (
    <Sidebar className="pt-16 ">
   
      <SidebarContent>
        <div className="flex flex-col gap-2 pt-2 pl-5">
          {menuItems.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center w-44 gap-4 text-gray-500 py-2 px-2 rounded-md hover:bg-lamaSkyLight hover:shadow-md hover:scale-105 transition-all duration-300"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
            return null; // Return null if the item is not visible
          })}
          <div className="flex gap-4 py-10 pl-2 border-t-2 border-gray-200">
            <UserButton />
            <span className="text-lg text-gray-500">
              {user?.firstName ? `${user.firstName}` : `${user?.publicMetadata?.role as string}`}
            </span>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default Menu;
