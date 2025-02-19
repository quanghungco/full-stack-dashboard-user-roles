"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

const DEFAULT_EMAIL = "admin@example.com";
const DEFAULT_PASSWORD = "12345678";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // Check if credentials match default credentials
    if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
      console.log("Logged in as Admin with default credentials.");
      router.push("/dashboard/admin");
      return;
    }

    // Normal authentication process using NextAuth
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.ok) {
      router.push("/dashboard/admin"); // Manually redirect
    }

    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/dashboard"); // Redirect after successful login
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <div className="flex justify-center">
          <Image width={40} height={40} src="/logo.png" alt="logo" />
        </div>
        <h2 className="text-2xl font-bold text-center mt-4 text-gray-900 dark:text-white">
          Sign in to your account
        </h2>

        {error && (
          <p className="mt-2 text-center text-red-500">{error}</p>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition"
          >
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
