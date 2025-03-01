"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function SortButton() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const currentSort = searchParams.get("sort") || "desc";

   const handleSort = () => {
      const params = new URLSearchParams(searchParams.toString());
      const newSort = currentSort === "asc" ? "desc" : "asc";
      params.set("sort", newSort);
      router.push(`?${params.toString()}`);
   };

   return (
      <button
         onClick={handleSort}
         className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow hover:bg-yellow-400 transition-colors"
         title={`Sort by date ${currentSort === "asc" ? "descending" : "ascending"}`}
      >
         <Image
            src="/sort.png"
            alt={`Sort ${currentSort === "asc" ? "descending" : "ascending"}`}
            width={14}
            height={14}
            className={`transform ${currentSort === "desc" ? "rotate-180" : ""}`}
         />
      </button>
   );
}