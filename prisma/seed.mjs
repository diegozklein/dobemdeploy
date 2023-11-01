import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { customAlphabet } from "nanoid";
const prisma = new PrismaClient();

async function deleteAllData() {
  await prisma.moneyDonation.deleteMany();
  await prisma.donation.deleteMany();
  await prisma.intermediary.deleteMany();
  await prisma.receiver.deleteMany();
  await prisma.donor.deleteMany();
  await prisma.doBemAccount.deleteMany();
  await prisma.user.deleteMany();
  await prisma.address.deleteMany();
  await prisma.company_size.deleteMany();
  await prisma.defaultOrder.deleteMany();
}

async function createCompanySizes() {
  await prisma.company_size.createMany({
    data: [
      { description: "Microempresa: menor ou igual a R$ 360 mil.", size: 0 },
      {
        description:
          "Empresa de Pequeno Porte: menor ou igual a R$ 4,8 milhões e maior que R$ 360 mil.",
        size: 1,
      },
      {
        description:
          "Grupo IV – Empresa de Médio Porte: menor ou igual a R$ 6 milhões.",
        size: 2,
      },
      {
        description:
          "Grupo III – Empresa de Médio Porte: menor ou igual a R$ 20 milhões e maior que R$ 6 milhões.",
        size: 3,
      },
      {
        description:
          "Grupo II – Empresa de Grande Porte: menor ou igual a R$ 50 milhões e maior que R$ 20 milhões.",
        size: 4,
      },
      {
        description:
          "Grupo I – Empresa de Grande Porte: maior que R$ 50 milhões.",
        size: 5,
      },
    ],
  });
}

async function createAddress() {
  await prisma.address.createMany({
    data: [
      { zip: "90619-900", city: "Porto Alegre", state: "RS", number: 6681 },
      { zip: "90160-092", city: "Porto Alegre", state: "RS", number: 3000 },
      { zip: "90020-050", city: "Porto Alegre", state: "RS", number: 1 },
    ],
  });
}

async function createDoBemAccount() {
  await prisma.doBemAccount.create({
    data: { balance: 0 },
  });
}

async function createUsers() {
  const sizes = await prisma.company_size.findMany();
  const address = await prisma.address.findMany();

  const passwords = bcrypt.hashSync("Dobem2023", 10);
  const birth_date = dayjs().year(1950).month(0).date(1).toDate();

  const users = await prisma.user.createMany({
    data: [
      {
        name: "PUCRS",
        phone_number: "555133203500",
        email: "pucrs@edu.pucrs.br",
        cnpj: "88.630.413/0002-81",
        password: passwords,
        fk_company_size: sizes[sizes.length - 1].id,
        fk_address: address[0].id,
        role: "DonorPJ",
      },
      {
        name: "Zaffari",
        phone_number: "4004-1112",
        email: "comercial@zaffari.com.br",
        cnpj: "93.015.006/0001-13",
        password: passwords,
        fk_company_size: sizes[sizes.length - 1].id,
        fk_address: address[1].id,
        role: "Intermediary",
      },
      {
        name: "João da Silva",
        phone_number: "9999-9999",
        email: "joao.silva@gmail.com",
        cpf: "01234567891",
        password: passwords,
        fk_address: address[2].id,
        birth_date: birth_date,
        role: "Receiver",
      },
    ],
  });
}

async function insertRoles() {
  const userPucrs = await prisma.user.findFirst({
    where: {
      cnpj: "88.630.413/0002-81",
    },
  });
  const userZaffari = await prisma.user.findFirst({
    where: {
      cnpj: "93.015.006/0001-13",
    },
  });
  const userJoao = await prisma.user.findFirst({
    where: {
      cpf: "01234567891",
    },
  });

  const quiz = await prisma.quiz.findFirst({});

  if (!(userPucrs && userJoao && userZaffari))
    return console.error("Users Not found");

  const donator = await prisma.donor.create({
    data: {
      fk_user: userPucrs.id,
    },
  });

  const intermediry = await prisma.intermediary.create({
    data: {
      fk_user: userZaffari.id,
      company_type: "SuperMercado",
      donate_icms: true,
      donate_profit: true,
    },
  });

  const receiver = await prisma.receiver.create({
    data: {
      fk_user: userJoao.id,
      fk_quiz: quiz.id,
    },
  });
}

async function makeDonation() {
  const donor = await prisma.donor.findFirst();
  const account = await prisma.doBemAccount.findFirst();
  const amount = 749.57;
  await prisma.moneyDonation.create({
    data: {
      donorId: donor.fk_user,
      amount: amount,
    },
  });
  await prisma.doBemAccount.update({
    where: { id: account.id },
    data: {
      balance: amount,
    },
  });
}

async function createBaseDonation() {
  await prisma.defaultOrder.createMany({
    data: [
      {
        company_type: "Padaria",
        amount: 50,
        food_type: "Saldo de R$50,00 para itens de Padaria",
      },
      {
        company_type: "Restaurante",
        amount: 39.9,
        food_type: "Uma refeição a ser consumida no local",
      },
      {
        company_type: "SuperMercado",
        amount: 219.32,
        food_type: "Cesta Básica",
      },
    ],
  });
}

async function createDonation() {
  const intermediary = await prisma.intermediary.findFirst();
  const receiver = await prisma.receiver.findFirst();

  const nanoID = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 8);

  await prisma.donation.createMany({
    data: [
      {
        fk_intermediary: intermediary.fk_user,
        fk_receiver: receiver.fk_user,
        code: nanoID(),
        status: "PENDING",
        quantity: 1,
        food_type: "Cesta Básica",
        delivery_date: dayjs().add(7, "day").toDate(),
        amount: 229.32,
      },
      {
        fk_intermediary: intermediary.fk_user,
        fk_receiver: receiver.fk_user,
        code: nanoID(),
        status: "CANCELED",
        quantity: 2,
        food_type: "Cesta Básica Econômica",
        delivery_date: dayjs().add(7, "day").toDate(),
        amount: 115.58,
      },
      {
        fk_intermediary: intermediary.fk_user,
        fk_receiver: receiver.fk_user,
        code: nanoID(),
        status: "COMPLETED",
        quantity: 1,
        food_type: "Cesta Básica Completa",
        delivery_date: dayjs().add(7, "day").toDate(),
        amount: 296.85,
      },
    ],
  });
}

async function createQuiz() {
  await prisma.quiz.create({
    data: {
      works: true,
      worksCurrently: "AGRICULTURE",
      houseExpenses: 1000,
      supportFamily: 2,
      independence: 1,
      getExperience: 3,
      payStudies: 2,
      workHours: "BETWEEN_11_AND_20",
      familyIncome: "BETWEEN_3_AND_6",
      houseType: "RENTED",
      houseResidents: "FOUR_TO_SEVEN",
      children: 2,
      microComputers: "TWO",
      vehicles: "ONE",
      washerMachines: "ZERO",
      refrigerators: "ONE",
      notebooks: "THREE_PLUS",
      cellphones: "THREE_PLUS",
      internetAccess: true,
      cableTvAccess: false,
      housekeeper: true,
      reason: "Preciso de ajuda para despesas da casa.",
      houseLocation: "URBAN",
      alimony: 300.5,
      receivedAlimony: 150.2,
    },
  });
}

async function createAllData() {
  await deleteAllData();
  await createCompanySizes();
  await createAddress();
  await createDoBemAccount();
  await createUsers();
  await createQuiz();
  await insertRoles();
  await makeDonation();
  await createBaseDonation();
  await createDonation();
}

createAllData();
