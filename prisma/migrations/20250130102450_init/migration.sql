/*
  Warnings:

  - You are about to drop the `_SubjectToTeacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SubjectToTeacher" DROP CONSTRAINT "_SubjectToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubjectToTeacher" DROP CONSTRAINT "_SubjectToTeacher_B_fkey";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "parentNId" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "subjectId" INTEGER;

-- DropTable
DROP TABLE "_SubjectToTeacher";

-- CreateTable
CREATE TABLE "Admission" (
    "id" SERIAL NOT NULL,
    "studentName" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "image" TEXT,
    "birthCertificate" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "presentAddress" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "fatherPhone" TEXT NOT NULL,
    "fatherOccupation" TEXT,
    "motherName" TEXT NOT NULL,
    "motherPhone" TEXT,
    "motherOccupation" TEXT NOT NULL,
    "sscEquivalent" TEXT,
    "sscGroup" TEXT,
    "sscBoard" TEXT,
    "sscBoardRoll" TEXT,
    "sscGPA" TEXT,
    "sscPassingYear" TEXT,
    "sscInstituteName" TEXT,
    "hscEquivalent" TEXT,
    "hscGroup" TEXT,
    "hscBoard" TEXT,
    "hscBoardRoll" TEXT,
    "hscGPA" TEXT,
    "hscPassingYear" TEXT,
    "hscInstituteName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
