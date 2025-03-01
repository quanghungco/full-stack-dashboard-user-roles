"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TableSearch = () => {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);

    const value = (e.currentTarget[0] as HTMLInputElement).value;
    const params = new URLSearchParams(window.location.search);
    params.set("search", value);

    try {
      await router.push(`${window.location.pathname}?${params}`);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2"
    >
      {isSearching ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        </div>
      ) : (
        <Image src="/search.png" alt="" width={14} height={14} />
      )}
      <input
        type="text"
        placeholder="Search..."
        className="md:w-[200px] p-2 bg-transparent outline-none"
        disabled={isSearching}
      />
    </form>
  );
};

export default TableSearch;
