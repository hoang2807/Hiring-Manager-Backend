/*
  Warnings:

  - Made the column `email` on table `Applications` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fullName` on table `Applications` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone_number` on table `Applications` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Applications" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "fullName" SET NOT NULL,
ALTER COLUMN "phone_number" SET NOT NULL;
