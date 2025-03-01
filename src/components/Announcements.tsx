"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const Announcements = ({ data }: { data: any[] }) => {
  const [showAll, setShowAll] = useState(false);

  const [displayedData, setDisplayedData] = useState<any[]>([]);

  useEffect(() => {
    if (showAll) {
      setDisplayedData(data);
    } else {
      setDisplayedData(data.slice(0, 5));
    }
  }, [showAll, data]);




  return (
    <div className="bg-white dark:bg-[#18181b] rounded-md select-none p-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span
          onClick={() => setShowAll(!showAll)}
          className="text-xs text-gray-400 cursor-pointer hover:text-gray-600"
        >
          {showAll ? "Show Less" : "View All"}
        </span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {displayedData.map((announcement) => (
          <div key={announcement.id} className="bg-lamaSkyLight dark:bg-gray-600 rounded-md p-4">
            <div className="flex  justify-between">
              <h2 className="font-medium select-none">{announcement.title}</h2>
              <div>
                <span className="text-[10px] text-gray-400  rounded-md px-1 ">
                  Start Date: {new Intl.DateTimeFormat("en-GB").format(announcement.startDate)}
                </span>
                <br />
                <span className="text-[10px] text-gray-400  rounded-md px-1">
                  End Date: {new Intl.DateTimeFormat("en-GB").format(announcement.endDate)}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 mt-1 select-none">{announcement.description}</p>
            {announcement?.img && (
              <Image
                src={announcement.img}
                alt={announcement.title}
                width={100}
                height={100}
                className="rounded-md mt-2"
              />
            )}
          </div>

        ))}
      </div>
    </div>
  );
};

export default Announcements;
