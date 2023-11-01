-- CreateTable
CREATE TABLE "Quiz" (
    "id" TEXT NOT NULL,
    "works" BOOLEAN NOT NULL,
    "works_currently" TEXT NOT NULL,
    "house_expenses" TEXT NOT NULL,
    "support_family" TEXT NOT NULL,
    "independence" TEXT NOT NULL,
    "get_experience" TEXT NOT NULL,
    "pay_studies" TEXT NOT NULL,
    "work_hours" TEXT NOT NULL,
    "family_income" TEXT NOT NULL,
    "house_type" TEXT NOT NULL,
    "children" INTEGER NOT NULL,
    "how_much_alimony_pays" INTEGER NOT NULL,
    "how_much_alimony_receives" INTEGER NOT NULL,
    "have_micro_computers" TEXT NOT NULL,
    "have_vehicles" TEXT NOT NULL,
    "have_washer_machines" TEXT NOT NULL,
    "have_refrigerators" TEXT NOT NULL,
    "have_notebooks" TEXT NOT NULL,
    "have_cellphones" TEXT NOT NULL,
    "have_internet_access" BOOLEAN NOT NULL,
    "have_cable_tv_access" BOOLEAN NOT NULL,
    "have_housekeeper" BOOLEAN NOT NULL,
    "reason_recieve_help" TEXT NOT NULL,
    "donation_frequency" TEXT NOT NULL,
    "house_location" TEXT NOT NULL,
    "pays_alimony" DOUBLE PRECISION NOT NULL,
    "receives_alimony" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);
