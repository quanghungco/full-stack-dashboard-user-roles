"use client";

import { useState, FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TfiMenuAlt } from "react-icons/tfi";
import { RiMenuFold2Fill } from "react-icons/ri";


interface MenuItem {
  icon: string;
  label: string;
  href: string;
  visible: string[];
}

interface DropdownMenuProps {
  title: string;
  items: MenuItem[];
  role: string;
}

const DropdownToggle: FC<DropdownMenuProps> = ({ title, items, role }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={toggleMenu}
        className="flex justify-between items-center cursor-pointer text-gray-500 py-2 px-4 rounded-md hover:bg-lamaSkyLight"
      >
        
        <span>{isOpen ? <TfiMenuAlt className="w-6 h-6"/> : <RiMenuFold2Fill className="w-6 h-6   "/>
        }</span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-2 pl-4 overflow-hidden"
          >
            {items.map((item) => {
              if (item.visible.includes(role)) {
                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    className="flex items-center gap-4 w-fit text-gray-500 py-2 px-2 rounded-md hover:bg-lamaSkyLight hover:shadow-md hover:scale-105 transition-all duration-300 mr-2"
                  >
                    <Image src={item.icon} alt="" width={20} height={20} />
                    <span className="hidden lg:block">{item.label}</span>
                  </Link>
                );
              }
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownToggle;
