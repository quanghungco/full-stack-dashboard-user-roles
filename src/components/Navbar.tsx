"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// Import your useAuth hook from your AuthContext
import { useAuth } from "@/contexts/AuthContext";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useAuth(); // Get user from your AuthContext

  // Assuming your user object from useAuth has a 'role' property
  const userRole = user?.role as string; // Access the role property

  return (
    <nav className="w-full bg-white flex justify-between items-center px-4 md:px-8 h-16 shadow-md">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <span className="ml-2 text-xl font-bold text-gray-800">EduFlow</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        {links.map((link) => (
          <Link
            key={link.route}
            href={link.route}
            className="text-gray-600 hover:text-gray-800"
          >
            {link.label}
          </Link>
        ))}
        {/* Replace with your Firebase authentication UI (e.g., login/logout buttons, user avatar) */}
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <IoClose size={30} /> : <IoIosMenu size={30} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="text-gray-600 hover:text-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {/* Replace with your Firebase authentication UI */}
        </div>
      )}

      {/* Display user info using the user from your AuthContext */}
      {user && (
        <div className="flex items-center space-x-2">
          <div className="relative">
            {/* Replace with user avatar */}
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
              {/* Display user initials or avatar */}
            </div>
            {/* Optional: Notification badge */}
            <div className="absolute -top-1 -right-1 w-3 h-3 flex items-center justify-center bg-blue-500 text-white rounded-full text-[8px]">
              {/* Notification count */}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs leading-3 font-medium">{user.displayName || user.email}</span> {/* Display user name or email */}
            <span className="text-[10px] text-gray-500 text-right">
              {userRole} {/* Display user role */}
            </span>
          </div>
          {/* Add a logout button */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
