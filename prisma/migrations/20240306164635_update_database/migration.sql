/*
  Warnings:

  - Changed the type of `phone_number` on the `Admin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_SEEN', 'WATCHED', 'SUITABLE', 'NOT_SUITABLE');

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "phone_number",
ADD COLUMN     "phone_number" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Enterprise" (
    "id" SERIAL NOT NULL,
    "madn" INTEGER NOT NULL,
    "mast" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "about_me" TEXT,
    "adminId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enterprise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullname" TEXT,
    "avatar" TEXT,
    "email" TEXT NOT NULL,
    "phone_number" INTEGER,
    "address" TEXT,
    "birthday" TEXT,
    "gender" BOOLEAN,
    "CV" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "job_description" TEXT NOT NULL,
    "job_requirements" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "working_time" TEXT NOT NULL,
    "deadline_date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Applications" (
    "id" SERIAL NOT NULL,
    "date_of_application" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NOT_SEEN',
    "score" INTEGER NOT NULL,
    "CV" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enterprise_madn_key" ON "Enterprise"("madn");

-- CreateIndex
CREATE UNIQUE INDEX "Enterprise_mast_key" ON "Enterprise"("mast");

-- CreateIndex
CREATE UNIQUE INDEX "Enterprise_name_key" ON "Enterprise"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Enterprise_email_key" ON "Enterprise"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Enterprise_adminId_key" ON "Enterprise"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
