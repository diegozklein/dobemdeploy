/*
  Warnings:

  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Donor', 'Intermediary', 'Receiver');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_fk_company_size_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL,
ALTER COLUMN "cnpj" DROP NOT NULL,
ALTER COLUMN "fk_company_size" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_fk_company_size_fkey" FOREIGN KEY ("fk_company_size") REFERENCES "Company_size"("id") ON DELETE SET NULL ON UPDATE CASCADE;
