"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import type { LogoConfig } from '@/types/logo';
import { UserCircle, GraduationCap, Users2, Building2, School, Users } from 'lucide-react';

type AuthStep = "identifier" | "verify" | "new-password";
type UserRole = "superadmin" | "admin" | "accountant" | "teacher" | "student" | "parent";

// Add role-specific routes
const roleRoutes: Record<UserRole, string> = {
  superadmin: "/superadmin/dashboard",
  admin: "/admin/dashboard",
  accountant: "/accountant/dashboard",
  teacher: "/teacher/dashboard",
  student: "/student/dashboard",
  parent: "/parent/dashboard",
};

const roleIcons = {
  superadmin: <Building2 className="w-8 h-8" />,
  admin: <Users2 className="w-8 h-8" />,
  accountant: <School className="w-8 h-8" />,
  teacher: <UserCircle className="w-8 h-8" />,
  student: <GraduationCap className="w-8 h-8" />,
  parent: <Users className="w-8 h-8" />
};

const LoginPage = () => {
  const router = useRouter();
  const [authStep, setAuthStep] = useState<AuthStep>("identifier");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin"); // Changed default to admin
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoConfig, setLogoConfig] = useState<LogoConfig>({
    imageUrl: '/logo.png', // Updated path to match your public folder
    alt: 'School Logo',
    width: 200,
    height: 80
  });

  // Form states
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fetch logo configuration on component mount
  useEffect(() => {
    const fetchLogoConfig = async () => {
      try {
        const { data, error } = await supabase
          .from('site_config')
          .select('logo_config')
          .single();
        
        if (error) throw error;
        if (data?.logo_config) {
          setLogoConfig(data.logo_config);
        }
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    };

    fetchLogoConfig();
  }, []);

  const handleIdentifierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: identifier,
        password: password,
      });

      if (error) throw error;

      // Get user role from database
      if (!user) {
        throw new Error("User not found after sign in.");
      }
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (userError) throw userError;

      if (userData.role !== selectedRole) {
        throw new Error(`Invalid role. Please select the correct role for your account.`);
      }

      router.push(roleRoutes[selectedRole]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  // Update role selection array in the JSX
  const availableRoles: UserRole[] = [
    'student',
    'parent',
    'teacher',
    'admin',
    'superadmin',
    'accountant'
  ];

  // Update the role selection tabs in the return statement
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl p-8">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo.png"
            alt={logoConfig.alt}
            width={logoConfig.width}
            height={logoConfig.height}
            priority
            className="object-contain mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {/* Role Selection Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {availableRoles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`
                flex flex-col items-center p-4 rounded-lg transition-all
                ${selectedRole === role 
                  ? 'bg-blue-50 border-2 border-blue-500 shadow-md' 
                  : 'border-2 border-gray-200 hover:border-blue-300 hover:bg-gray-50'}
              `}
            >
              <div className={`
                ${selectedRole === role ? 'text-blue-500' : 'text-gray-500'}
              `}>
                {roleIcons[role]}
              </div>
              <span className={`
                mt-2 text-sm font-medium
                ${selectedRole === role ? 'text-blue-700' : 'text-gray-600'}
              `}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleIdentifierSubmit} className="space-y-4">
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
              Email or Phone Number
            </label>
            <input
              id="identifier"
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
              placeholder="Enter your email or phone"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              pattern="[0-9]*"
              inputMode="numeric"
              value={password}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, '');
                setPassword(numericValue);
              }}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
              placeholder="Enter your numeric password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;