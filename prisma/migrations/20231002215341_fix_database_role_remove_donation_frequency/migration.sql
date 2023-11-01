/*
  Warnings:

  - You are about to drop the column `donation_frequency` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `microComputers` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `have_micro_computers` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "donation_frequency",
DROP COLUMN "microComputers",
ADD COLUMN     "have_micro_computers" "ItemAmount" NOT NULL;

-- DropEnum
DROP TYPE "DonationFrequency";
