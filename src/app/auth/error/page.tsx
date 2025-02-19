"use client";

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-red-600 text-xl font-bold">
        Authentication Error: {searchParams?.error || "Unknown error"}
      </h1>
    </div>
  );
}
