/*
  Warnings:

  - Made the column `skills` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "skills" SET NOT NULL;
