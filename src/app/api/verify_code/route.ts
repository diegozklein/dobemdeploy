import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";
import { getDataToken } from "../../../utils/getDataToken";
import { updateDonationStatus } from "../donation_status/[id]/route";
import client from "@/database";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const userId = getDataToken(request);
    const body = await request.json();
    const validate = await donationCodeSchema.validate(body);
    const { donation_code } = body;
    const intermediary = await client.intermediary.findFirst({
      where: { fk_user: userId },
    });

    if (!intermediary) return returnError("Forbidden", 403);

    const donation = await client.donation.findFirst({
      where: {
        code: donation_code,
        fk_intermediary: userId,
        status: "READY",
      },
    });

    if (!donation)
      return NextResponse.json({ error: "Invalid Code" }, { status: 404 });

    const saldo = await client.doBemAccount.findFirst({});

    if (!saldo || saldo.balance < donation.amount)
      return NextResponse.json({ message: "Internal Error" }, { status: 500 });

    await client.doBemAccount.update({
      data: {
        balance: saldo.balance - donation.amount,
      },
      where: {
        id: saldo.id,
      },
    });

    await updateDonationStatus(donation.id, "COMPLETED");
    
    return NextResponse.json(
      { message: "Doação Registrada como Entregue" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return returnError(`${err}`, 400);
  }
}

async function returnError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status: status });
}

const donationCodeSchema = yup.object().shape({
  donation_code: yup.string().min(8).max(8).required(),
});
