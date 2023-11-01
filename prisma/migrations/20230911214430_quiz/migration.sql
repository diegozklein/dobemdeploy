/*
  Warnings:

  - You are about to drop the column `have_micro_computers` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `how_much_alimony_pays` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `how_much_alimony_receives` on the `Quiz` table. All the data in the column will be lost.
  - You are about to alter the column `reason_recieve_help` on the `Quiz` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `house_residents` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `microComputers` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `works_currently` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `house_expenses` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `support_family` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `independence` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `get_experience` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pay_studies` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `work_hours` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `family_income` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `house_type` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `have_vehicles` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `have_washer_machines` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `have_refrigerators` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `have_notebooks` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `have_cellphones` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `donation_frequency` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `house_location` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `fk_quiz` to the `Receiver` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemAmount" AS ENUM ('ZERO', 'ONE', 'TWO', 'THREE_PLUS');

-- CreateEnum
CREATE TYPE "WorkType" AS ENUM ('AGRICULTURE', 'INDUSTRY_OR_CONSTRUCTION', 'SERVICES', 'PUBLIC_AGENT', 'INFORMAL', 'INFORMAL_HOME_OFFICE', 'DOMESTICS_SERVICE', 'HOME_WITHOUT_PAYMENT', 'OTHER', 'UNEMPLOYED');

-- CreateEnum
CREATE TYPE "WorkHours" AS ENUM ('LESS_THAN_10', 'BETWEEN_11_AND_20', 'BETWEEN_21_AND_30', 'BETWEEN_31_AND_44');

-- CreateEnum
CREATE TYPE "Income" AS ENUM ('NOTHING', 'LESS_THAN_1', 'BETWEEN_1_AND_3', 'BETWEEN_3_AND_6', 'BETWEEN_6_AND_9', 'BETWEEN_9_AND_12', 'BETWEEN_12_AND_15', 'MORE_THAN_15');

-- CreateEnum
CREATE TYPE "HouseResidents" AS ENUM ('ALONE', 'ONE_TO_THREE', 'FOUR_TO_SEVEN', 'EIGHT_TO_TEN', 'MORE_THAN_TEN');

-- CreateEnum
CREATE TYPE "HouseLocation" AS ENUM ('RURAL', 'URBAN', 'INDIGENOUS');

-- CreateEnum
CREATE TYPE "HouseType" AS ENUM ('OWN', 'RENTED', 'ASSIGNED');

-- CreateEnum
CREATE TYPE "DonationFrequency" AS ENUM ('SINGLE', 'SIX_MONTHS', 'YEARLY');

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "have_micro_computers",
DROP COLUMN "how_much_alimony_pays",
DROP COLUMN "how_much_alimony_receives",
ADD COLUMN     "house_residents" "HouseResidents" NOT NULL,
ADD COLUMN     "microComputers" "ItemAmount" NOT NULL,
DROP COLUMN "works_currently",
ADD COLUMN     "works_currently" "WorkType" NOT NULL,
DROP COLUMN "house_expenses",
ADD COLUMN     "house_expenses" INTEGER NOT NULL,
DROP COLUMN "support_family",
ADD COLUMN     "support_family" INTEGER NOT NULL,
DROP COLUMN "independence",
ADD COLUMN     "independence" INTEGER NOT NULL,
DROP COLUMN "get_experience",
ADD COLUMN     "get_experience" INTEGER NOT NULL,
DROP COLUMN "pay_studies",
ADD COLUMN     "pay_studies" INTEGER NOT NULL,
DROP COLUMN "work_hours",
ADD COLUMN     "work_hours" "WorkHours" NOT NULL,
DROP COLUMN "family_income",
ADD COLUMN     "family_income" "Income" NOT NULL,
DROP COLUMN "house_type",
ADD COLUMN     "house_type" "HouseType" NOT NULL,
DROP COLUMN "have_vehicles",
ADD COLUMN     "have_vehicles" "ItemAmount" NOT NULL,
DROP COLUMN "have_washer_machines",
ADD COLUMN     "have_washer_machines" "ItemAmount" NOT NULL,
DROP COLUMN "have_refrigerators",
ADD COLUMN     "have_refrigerators" "ItemAmount" NOT NULL,
DROP COLUMN "have_notebooks",
ADD COLUMN     "have_notebooks" "ItemAmount" NOT NULL,
DROP COLUMN "have_cellphones",
ADD COLUMN     "have_cellphones" "ItemAmount" NOT NULL,
ALTER COLUMN "reason_recieve_help" SET DATA TYPE VARCHAR(255),
DROP COLUMN "donation_frequency",
ADD COLUMN     "donation_frequency" "DonationFrequency" NOT NULL,
DROP COLUMN "house_location",
ADD COLUMN     "house_location" "HouseLocation" NOT NULL;

-- AlterTable
ALTER TABLE "Receiver" ADD COLUMN     "fk_quiz" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Receiver" ADD CONSTRAINT "Receiver_fk_quiz_fkey" FOREIGN KEY ("fk_quiz") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
