-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_fk_company_size_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "cnpj" DROP NOT NULL,
ALTER COLUMN "fk_company_size" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_fk_company_size_fkey" FOREIGN KEY ("fk_company_size") REFERENCES "Company_size"("id") ON DELETE SET NULL ON UPDATE CASCADE;
