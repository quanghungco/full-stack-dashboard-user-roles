"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import  { auth } from "@/auth";

const LoginPage = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log(formData, email, password);
    
  
    // Check for default credentials
    if (email === "admin@example.com" && password === "password123" ) {
      // Simulate successful login with default credentials
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
  
      if (result?.error) {
        console.error("Login failed:", result.error);
      } else {
        console.log("You are logged in as admin.");
        router.push("/dashboard"); 
      }
      return;
    }
  
    // Normal sign-in process
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(result);
    
  
    if (result?.error) {
      console.error("Login failed:", result.error);
    } else {
      console.log("You are logged in.");
      const session = await auth();
      if (session?.user.role === "ADMIN") {
        router.push("/dashboard/admin");
      } else if (session?.user.role === "TEACHER") {
        router.push("/dashboard/teacher");
      } else if (session?.user.role === "STUDENT") {
        router.push("/dashboard/student");
      } else {
        router.push("/dashboard");
      }
    }
  };
  

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image className="w-8 h-8 mr-2" width={32} height={32} src="/logo.png" alt="logo" />
          Gen-School
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-sky-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage; 