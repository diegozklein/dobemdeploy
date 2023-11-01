-- CreateTable
CREATE TABLE "DefaultOrder" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "company_type" "Company_type" NOT NULL,
    "food_type" VARCHAR(255) NOT NULL,

    CONSTRAINT "DefaultOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DefaultOrder_company_type_key" ON "DefaultOrder"("company_type");
