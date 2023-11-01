import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../database";
import bcrypt from "bcrypt";
import * as yup from "yup";
import {
  ItemAmount,
  HouseLocation,
  HouseResidents,
  HouseType,
  Income,
  WorkHours,
  WorkType,
  Company_type,
  Role,
} from "@prisma/client";

const receiverUserSchema = yup.object().shape({
  name: yup.string().required(),
  phone_number: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  cpf: yup.string().nullable(),
  cnpj: yup.string().nullable(),
  birth_date: yup.date().nullable(),
  fk_company_size: yup.string().nullable(),
  role: yup.string().required(),
  address: yup.object().shape({
    zip: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    number: yup.number().required(),
  }),
  company_type: yup.string().nullable(),
  donate_profit: yup.boolean().nullable(),
  donate_icms: yup.boolean().nullable(),
  quiz: yup.object().shape({
    microComputers: yup
      .mixed<ItemAmount>()
      .oneOf(Object.values(ItemAmount))
      .required(),
    vehicles: yup
      .mixed<ItemAmount>()
      .oneOf(Object.values(ItemAmount))
      .required(),
    washerMachines: yup
      .mixed<ItemAmount>()
      .oneOf(Object.values(ItemAmount))
      .required(),
    refrigerators: yup
      .mixed<ItemAmount>()
      .oneOf(Object.values(ItemAmount))
      .required(),
    notebooks: yup
      .mixed<ItemAmount>()
      .oneOf(Object.values(ItemAmount))
      .required(),
    cellphones: yup
      .mixed<ItemAmount>()
      .oneOf(Object.values(ItemAmount))
      .required(),
    internetAccess: yup.boolean().required(),
    cableTvAccess: yup.boolean().required(),
    housekeeper: yup.boolean().required(),
    works: yup.boolean().required(),
    worksCurrently: yup
      .mixed<WorkType>()
      .oneOf(Object.values(WorkType))
      .required(),
    houseExpenses: yup.number().required(),
    supportFamily: yup.number().required(),
    independence: yup.number().required(),
    getExperience: yup.number().required(),
    payStudies: yup.number().required(),
    workHours: yup
      .mixed<WorkHours>()
      .oneOf(Object.values(WorkHours))
      .required(),
    familyIncome: yup.mixed<Income>().oneOf(Object.values(Income)).required(),
    houseResidents: yup
      .mixed<HouseResidents>()
      .oneOf(Object.values(HouseResidents))
      .required(),
    houseLocation: yup
      .mixed<HouseLocation>()
      .oneOf(Object.values(HouseLocation))
      .required(),
    houseType: yup
      .mixed<HouseType>()
      .oneOf(Object.values(HouseType))
      .required(),
    children: yup.number().required(),
    alimony: yup.number().required(),
    receivedAlimony: yup.number().required(),
    reason: yup.string().required(),
  }),
});

const userSchema = yup.object().shape({
  name: yup.string().required(),
  phone_number: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  cpf: yup.string().nullable(),
  cnpj: yup.string().nullable(),
  birth_date: yup.date().nullable(),
  fk_company_size: yup.string().nullable(),
  role: yup.string().required(),
  address: yup.object().shape({
    zip: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    number: yup.number().required(),
  }),
  company_type: yup.string().nullable(),
  donate_profit: yup.boolean().nullable(),
  donate_icms: yup.boolean().nullable(),
});

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const data = await request.json();

    let validatedData;
    let companySize;

    const role = data.body.role as Role;

    if (role === Role.Receiver) {
      validatedData = await receiverUserSchema.validate(data.body);
    } else {
      validatedData = await userSchema.validate(data.body);
    }

    const userAlreadyExist = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: validatedData.email,
          },
          {
            ...(validatedData.cpf != null && {
              cpf: validatedData.cpf,
            }),
          },
          {
            ...(validatedData.cnpj != null && {
              cnpj: validatedData.cnpj,
            }),
          },
          {
            phone_number: validatedData.phone_number,
          },
        ],
      },
    });

    if (userAlreadyExist) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }

    if (validatedData.cpf == null && validatedData.cnpj == null) {
      return NextResponse.json(
        { error: "User must have a cpf or cnpj" },
        { status: 400 }
      );
    }

    const saltValue = parseInt(process.env.BCRYPT_SALT_ROUNDS!);
    const encyptedPassword = await bcrypt.hash(
      validatedData.password,
      saltValue
    );
    validatedData.password = encyptedPassword;

    const address = await prisma.address.create({
      data: {
        zip: validatedData.address.zip,
        city: validatedData.address.city,
        state: validatedData.address.state,
        number: validatedData.address.number,
      },
    });

    if (validatedData.fk_company_size != null) {
      companySize = await prisma.company_size.findFirst({
        where: {
          size: parseInt(validatedData.fk_company_size),
        },
      });
    }

    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        phone_number: validatedData.phone_number,
        email: validatedData.email,
        password: validatedData.password,
        cpf: validatedData.cpf,
        cnpj: validatedData.cnpj,
        birth_date: validatedData.birth_date,
        fk_address: address.id,
        role: validatedData.role as Role,
        fk_company_size: companySize?.id,
      },
    });

    switch (role) {
      case Role.DonorPF:
        await prisma.donor.create({
          data: {
            fk_user: user.id,
          },
        });
        break;

      case Role.DonorPJ:
        await prisma.donor.create({
          data: {
            fk_user: user.id,
          },
        });
        break;

      case Role.Intermediary:
        await prisma.intermediary.create({
          data: {
            fk_user: user.id,
            company_type: validatedData.company_type as Company_type,
            donate_profit: validatedData.donate_profit || false,
            donate_icms: validatedData.donate_icms || false,
          },
        });
        break;

      case Role.Receiver:
        const quiz = await prisma.quiz.create({
          data: {
            microComputers: validatedData.quiz.microComputers,
            vehicles: validatedData.quiz.vehicles,
            washerMachines: validatedData.quiz.washerMachines,
            refrigerators: validatedData.quiz.refrigerators,
            notebooks: validatedData.quiz.notebooks,
            cellphones: validatedData.quiz.cellphones,
            internetAccess: validatedData.quiz.internetAccess,
            cableTvAccess: validatedData.quiz.cableTvAccess,
            housekeeper: validatedData.quiz.housekeeper,
            works: validatedData.quiz.works,
            worksCurrently: validatedData.quiz.worksCurrently,
            houseExpenses: validatedData.quiz.houseExpenses,
            supportFamily: validatedData.quiz.supportFamily,
            independence: validatedData.quiz.independence,
            getExperience: validatedData.quiz.getExperience,
            payStudies: validatedData.quiz.payStudies,
            workHours: validatedData.quiz.workHours,
            familyIncome: validatedData.quiz.familyIncome,
            houseResidents: validatedData.quiz.houseResidents,
            houseLocation: validatedData.quiz.houseLocation,
            houseType: validatedData.quiz.houseType,
            children: validatedData.quiz.children,
            alimony: validatedData.quiz.alimony,
            receivedAlimony: validatedData.quiz.receivedAlimony,
            reason: validatedData.quiz.reason,
          },
        });

        await prisma.receiver.create({
          data: {
            fk_user: user.id,
            fk_quiz: quiz.id,
          },
        });
        break;

      default:
        break;
    }

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
