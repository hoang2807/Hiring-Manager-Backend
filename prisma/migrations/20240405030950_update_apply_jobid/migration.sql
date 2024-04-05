/*
  Warnings:

  - Made the column `jobId` on table `Applications` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Applications" ALTER COLUMN "jobId" SET NOT NULL;
