import { NextRequest, NextResponse } from "next/server";
import client from "@/database";
import { getDataToken } from "@/utils/getDataToken";
import { customAlphabet } from "nanoid";
import * as yup from "yup";
import dayjs from "dayjs";

export async function POST(request: NextRequest) {
  try {
    const nanoID = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 8);
    const userId = getDataToken(request);
    const body = await request.json();
    const validatedData = await orderRegisterSchema.validate(body);

    const existingReceiver = await client.receiver.findUnique({
      where: { fk_user: userId },
    });

    if (!existingReceiver) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    //TODO REFACTOR THIS LOGIC    
    // const alreadyHasDonation = await client.donation.findFirst({
    //   where: {
    //     OR: [
    //       { status: "ACCEPTED" },
    //       { status: "PENDING" },
    //       { status: "READY" },
    //       { status: "RESCHEDULED" },
    //     ],
    //     AND: [{ fk_receiver: userId }],
    //   },
    // });

    // if (alreadyHasDonation)
    //   return NextResponse.json(
    //     { message: "You already have a donation" },
    //     { status: 409 }
    //   );

    const intermediary = await client.intermediary.findFirst({
      where: {
        fk_user: validatedData.intermediary_id,
      },
    });
    if (!intermediary)
      return NextResponse.json(
        { message: "Intermediary not found" },
        { status: 404 }
      );

    const reservedMoney = await client.donation.aggregate({
      where: {
        OR: [
          { status: "ACCEPTED" },
          { status: "PENDING" },
          { status: "READY" },
          { status: "RESCHEDULED" },
        ],
      },
      _sum: {
        amount: true,
      },
    });

    if (!reservedMoney._sum.amount) reservedMoney._sum.amount = 0;

    const totalMoney = await client.doBemAccount.findFirst({
      select: { balance: true },
    });

    if (!totalMoney)
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );

    const defaultDonation = await client.defaultOrder.findFirst({
      where: { company_type: intermediary.company_type },
    });

    if (!defaultDonation)
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );

    if (
      totalMoney.balance - reservedMoney._sum.amount <
      defaultDonation.amount
    ) {
      return NextResponse.json(
        { message: "Unable to complete" },
        { status: 401 }
      );
    }

    const createdId = nanoID();
    const createdDonation = await client.donation.create({
      data: {
        fk_intermediary: intermediary.fk_user,
        fk_receiver: userId,
        code: createdId,
        quantity: 1,
        status: "PENDING",
        food_type: defaultDonation.food_type,
        amount: defaultDonation.amount,
        delivery_date: dayjs().add(7, "day").toDate(),
      },
    });

    return NextResponse.json(
      { message: `Sua doação foi criada com sucesso` },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err }, { status: 500 });
  }
}

const orderRegisterSchema = yup.object().shape({
  intermediary_id: yup.string().required(),
});
