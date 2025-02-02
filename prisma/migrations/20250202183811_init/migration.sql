/*
  Warnings:

  - Changed the type of `subjectId` on the `Result` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_subjectId_fkey";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "subjectId",
ADD COLUMN     "subjectId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
