"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import type { LogoConfig } from '@/types/logo';

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

const LoginPage = () => {
  const router = useRouter();
  const [authStep, setAuthStep] = useState<AuthStep>("identifier");
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoConfig, setLogoConfig] = useState<LogoConfig>({
    imageUrl: '/default-logo.png', // Default logo
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
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "User not found");
      }

      setAuthStep("verify");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data: session, error } = await supabase.auth.verifyOtp({
        email: identifier,
        token: otp,
        type: 'email',
      });

      if (error) throw error;

      // Get user role from database
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('email', identifier)
        .single();

      if (userError) throw userError;

      const userRole = userData.role as UserRole;
      const targetRoute = roleRoutes[userRole] || '/dashboard';
      router.push(targetRoute);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Replace with your API endpoint
      const response = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password: newPassword }),
      });

      if (!response.ok) throw new Error("Failed to set password");

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set password");
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
      <div className="max-w-md w-full space-y-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <div className="w-auto relative mb-4">
            <Image
              src={logoConfig.imageUrl}
              alt={logoConfig.alt}
              width={logoConfig.width}
              height={logoConfig.height}
              priority
              className="object-contain"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {authStep === "identifier" && "Sign in to your account"}
            {authStep === "verify" && "Enter verification code"}
            {authStep === "new-password" && "Set your password"}
          </h2>
        </div>

        {/* Updated Role Selection Tabs */}
        <div className="grid grid-cols-2 gap-2 rounded-md shadow-sm" role="group">
          {availableRoles.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              className={`
                px-4 py-2 text-sm font-medium rounded-md
                ${selectedRole === role
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                }
                border border-gray-200
                transition-colors duration-200
              `}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {authStep === "identifier" && (
          <form onSubmit={handleIdentifierSubmit} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700"
              >
                Email or Phone Number
              </label>
              <input
                id="identifier"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="Enter your email or phone"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? "Sending..." : "Continue"}
            </button>
          </form>
        )}

        {authStep === "verify" && (
          <form onSubmit={handleOtpVerification} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Verification Code
              </label>
              <input
                id="otp"
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="Enter verification code"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        )}

        {authStep === "new-password" && (
          <form onSubmit={handlePasswordSetup} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? "Setting up..." : "Set Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;