-- CreateEnum
CREATE TYPE "Company_type" AS ENUM ('SuperMercado', 'Padaria', 'Restaurante');

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "zip" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company_size" (
    "id" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "Company_size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "fk_address" TEXT NOT NULL,
    "cpf" VARCHAR(255),
    "cnpj" VARCHAR(255) NOT NULL,
    "birth_date" TIMESTAMP(3),
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_company_size" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donor" (
    "fk_user" TEXT NOT NULL,

    CONSTRAINT "Donor_pkey" PRIMARY KEY ("fk_user")
);

-- CreateTable
CREATE TABLE "Intermediary" (
    "fk_user" TEXT NOT NULL,
    "company_type" "Company_type" NOT NULL,
    "donate_profit" BOOLEAN NOT NULL,
    "donate_icms" BOOLEAN NOT NULL,

    CONSTRAINT "Intermediary_pkey" PRIMARY KEY ("fk_user")
);

-- CreateTable
CREATE TABLE "Receiver" (
    "fk_user" TEXT NOT NULL,

    CONSTRAINT "Receiver_pkey" PRIMARY KEY ("fk_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_size_size_key" ON "Company_size"("size");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_cnpj_key" ON "User"("cnpj");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_fk_company_size_fkey" FOREIGN KEY ("fk_company_size") REFERENCES "Company_size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_fk_address_fkey" FOREIGN KEY ("fk_address") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donor" ADD CONSTRAINT "Donor_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intermediary" ADD CONSTRAINT "Intermediary_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receiver" ADD CONSTRAINT "Receiver_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
