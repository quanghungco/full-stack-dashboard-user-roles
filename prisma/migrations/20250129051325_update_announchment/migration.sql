/*
  Warnings:

  - You are about to drop the column `classId` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Announcement` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Announcement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_classId_fkey";

-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "classId",
DROP COLUMN "date",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "img" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
