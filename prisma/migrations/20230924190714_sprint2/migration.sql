-- CreateEnum
CREATE TYPE "DonationStatus" AS ENUM ('DECLINED', 'PENDING', 'ACCEPTED', 'READY', 'COMPLETED');

-- CreateTable
CREATE TABLE "MoneyDonation" (
    "id" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "intermediaryId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MoneyDonation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL,
    "fk_intermediary" TEXT NOT NULL,
    "fk_receiver" TEXT NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "status" "DonationStatus" NOT NULL,
    "delivery_date" TIMESTAMP(3),
    "smallint" INTEGER NOT NULL,
    "food_type" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoBemAccount" (
    "id" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "DoBemAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donation_code_key" ON "Donation"("code");

-- AddForeignKey
ALTER TABLE "MoneyDonation" ADD CONSTRAINT "MoneyDonation_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("fk_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_fk_intermediary_fkey" FOREIGN KEY ("fk_intermediary") REFERENCES "Intermediary"("fk_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_fk_receiver_fkey" FOREIGN KEY ("fk_receiver") REFERENCES "Receiver"("fk_user") ON DELETE RESTRICT ON UPDATE CASCADE;
