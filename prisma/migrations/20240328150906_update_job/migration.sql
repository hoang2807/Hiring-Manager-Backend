/*
  Warnings:

  - Added the required column `benefits` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "benefits" TEXT NOT NULL;
