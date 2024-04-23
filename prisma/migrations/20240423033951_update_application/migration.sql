/*
  Warnings:

  - Added the required column `enterpriseId` to the `Applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Applications" ADD COLUMN     "enterpriseId" INTEGER NOT NULL;
