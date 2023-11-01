import prisma from "../../../database";
import * as yup from "yup";
import { NextRequest, NextResponse } from "next/server";
import { getDataToken } from "../../../utils/getDataToken";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData = await yup
      .object()
      .shape({
        donationId: yup.string().required(),
        date: yup.date().required(),
      })
      .validate(body);

    const userId = getDataToken(req);

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    const existingDonation = await prisma.donation.findUnique({
      where: { id: validatedData.donationId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!existingDonation) {
      return NextResponse.json(
        { error: "Donation not found" },
        { status: 404 }
      );
    }

    if (existingDonation.fk_receiver !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (validatedData.date < new Date()) {
      return NextResponse.json(
        { error: "You can't reschedule a donation to a past date" },
        { status: 400 }
      );
    }

    if (
      existingDonation &&
      existingDonation.delivery_date &&
      validatedData.date < existingDonation.delivery_date
    ) {
      return NextResponse.json(
        {
          error:
            "You can't reschedule a donation to a date before the original date",
        },
        { status: 400 }
      );
    }

    if (existingDonation.status === "RESCHEDULED") {
      return NextResponse.json(
        { error: "You can't reschedule a donation more than once" },
        { status: 400 }
      );
    }

    const updatedDonation = await prisma.donation.update({
      where: {
        id: validatedData.donationId,
      },
      data: {
        delivery_date: validatedData.date,
        status: "RESCHEDULED",
      },
    });

    return NextResponse.json({
      message: "Donation rescheduled successfully",
      data: {
        updatedDonation,
      },
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
