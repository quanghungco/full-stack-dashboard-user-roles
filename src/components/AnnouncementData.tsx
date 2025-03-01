import prisma from '@/lib/prisma';
import React from 'react'
import Announcements from './Announcements';

const AnnouncementData = async () => {
   const data = await prisma.announcement.findMany({
      orderBy: { startDate: "desc" },
   });
   return (
      <div><Announcements data={data} /> </div>
   )
}

export default AnnouncementData