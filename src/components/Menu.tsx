// Menu.tsx (Server Component)
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import DropdownToggle from "./DropdownToggle";
import { UserButton } from "@clerk/nextjs";

// Define the structure of the menu items
interface MenuItem {
  icon: string;
  label: string;
  href: string;
  visible: string[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuItems: MenuSection[] = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
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
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: [ "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
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

    ],
  },
];
const otherMenuItems = [
  {
    title: "OTHER",
    items: [
      {
      icon: "/profile.png",
      label: "Profile",
      href: "/profile",
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      icon: "/setting.png",
      label: "Settings",
      href: "/settings",
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      icon: "/logout.png",
      label: "Logout",
      href: "/logout",
      visible: ["admin", "teacher", "student", "parent"],
    },
  ],
  },
];
const Menu = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;

  // console.log("jfhjhjjhhjhhhhh=====", user);
  
  return (
    <div className="mt-4 text-sm w-[14%]  lg:w-[17rem]">
      {menuItems.map((section) => (
        <DropdownToggle
          key={section.title}
          title={section.title}
          items={section.items}
          role={role}
        />
      ))}
      {otherMenuItems.map((section) => (
        <div className="flex flex-col gap-4 py-10 pl-4" key={section.title}>
          <h1 className="text-sm font-semibold text-gray-500">{section.title}</h1>
          <div className="flex items-center gap-2">
          <UserButton />
          <span className=" font-medium">
            
          </span>
          <span className="text-lg text-gray-500">
            {user?.firstName ? `${user.firstName}` : `${user?.publicMetadata?.role as string}`}
          </span>
        </div>
          {/* {section.items.map((item) => (
            <Link href={item.href} key={item.label}>
              <div className="flex items-center gap-2">
                <Image src={item.icon} alt={item.label} width={20} height={20} />
                <span>{item.label}</span>
              </div>
            </Link>
          ))} */}
        </div>
      ))}
    </div>
  );
};

export default Menu;
