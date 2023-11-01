/*
  Warnings:

  - You are about to drop the column `card_cvv` on the `MoneyDonation` table. All the data in the column will be lost.
  - You are about to drop the column `card_expiration` on the `MoneyDonation` table. All the data in the column will be lost.
  - You are about to drop the column `card_name` on the `MoneyDonation` table. All the data in the column will be lost.
  - You are about to drop the column `card_number` on the `MoneyDonation` table. All the data in the column will be lost.
  - You are about to drop the column `document` on the `MoneyDonation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MoneyDonation" DROP COLUMN "card_cvv",
DROP COLUMN "card_expiration",
DROP COLUMN "card_name",
DROP COLUMN "card_number",
DROP COLUMN "document";
