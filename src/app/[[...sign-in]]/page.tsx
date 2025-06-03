"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;
    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <SignIn
        appearance={{
          elements: {
            card: "bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2",
            headerTitle: "text-xl font-bold flex items-center gap-2",
            headerSubtitle: "text-gray-400",
            formButtonPrimary: "bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]",
            logoBox: "flex items-center gap-2",
          },
        }}
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
      />
    </div>
  );
};

export default LoginPage;