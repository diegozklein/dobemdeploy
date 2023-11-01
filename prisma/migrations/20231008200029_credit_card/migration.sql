-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'PIX');

-- AlterTable
ALTER TABLE "MoneyDonation" ADD COLUMN     "card_cvv" VARCHAR(255),
ADD COLUMN     "card_expiration" VARCHAR(255),
ADD COLUMN     "card_name" VARCHAR(255),
ADD COLUMN     "card_number" VARCHAR(255),
ADD COLUMN     "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "document" VARCHAR(255),
ADD COLUMN     "payment_type" "PaymentType" DEFAULT 'CREDIT_CARD';
