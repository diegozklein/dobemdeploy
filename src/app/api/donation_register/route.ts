import prisma from "../../../database";
import * as yup from "yup";
import { NextRequest, NextResponse } from "next/server";
import { getDataToken } from "../../../utils/getDataToken";
import { PaymentType } from "@prisma/client";

const moneyDonationSchema = yup.object().shape({
  amount: yup.string().required(),
});

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();

    const validatedData = await moneyDonationSchema.validate(body);

    const userId = getDataToken(request);

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const moneyDonation = await prisma.moneyDonation.create({
      data: {
        donorId: userId,
        amount: parseFloat(validatedData.amount),
        payment_type: PaymentType.PIX,
      },
    });

    const doBemAccount = await prisma.doBemAccount.findFirst();
    const doBemAccountBalance = doBemAccount?.balance;
    const newBalance = doBemAccountBalance! + parseFloat(validatedData.amount);

    const updatedDoBemAccount = await prisma.doBemAccount.update({
      where: {
        id: doBemAccount?.id,
      },
      data: {
        balance: newBalance,
      },
    });

    return NextResponse.json(
      {
        message: "Donation registered successfully",
        data: {
          moneyDonation,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const donorId = getDataToken(req);

    const donationById = await prisma.moneyDonation.findMany({
      where: {
        donorId: donorId,
      },
    });

    if (donationById.length === 0)
      return NextResponse.json(
        { message: "Donations were not found for user:", id: donorId },
        { status: 404 }
      );

    return NextResponse.json({
      data: {
        donationById,
      },
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
