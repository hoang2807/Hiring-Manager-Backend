/*
  Warnings:

  - Changed the type of `jobId` on the `Applications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Applications" DROP COLUMN "jobId",
ADD COLUMN     "jobId" INTEGER NOT NULL;
