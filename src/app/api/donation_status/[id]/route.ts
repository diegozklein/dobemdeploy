import { NextRequest, NextResponse } from "next/server";
import { getDataToken } from "../../../../utils/getDataToken";
import { DonationStatus, Prisma } from "@prisma/client";
import client from "@/database";
import dayjs from "dayjs";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = getDataToken(request);
  const donationId = params.id;
  const { donation_status } = await request.json();

  const existingUser = await client.user.findUnique({ where: { id: userId } });
  if (!existingUser) {
    return returnError("User not found", 404);
  }

  const existingDonation = await client.donation.findUnique({
    where: { id: donationId },
  });
  if (!existingDonation) {
    return returnError("Donation not found", 404);
  }

  const statusEnumValues: string[] = Object.values(DonationStatus);
  if (!statusEnumValues.includes(donation_status)) {
    return returnError("Invalid Status", 404);
  }

  switch (existingDonation.status) {
    case "DECLINED":
    case "COMPLETED":
      return returnError("Donation is Finished", 409);
    case "PENDING":
      if (
        donation_status == "ACCEPTED" ||
        donation_status == "DECLINED" ||
        donation_status == "CANCELED"
      ) {
        return updateDonationStatus(existingDonation.id, donation_status);
      } else return returnError("Invalid Donation Status", 401);
    case "ACCEPTED":
      if (donation_status == "READY") {
        await client.donation.update({
          where: { id: existingDonation.id },
          data: {
            status: donation_status,
            delivery_date: dayjs().add(7, "day").toDate(),
          },
        });
        return NextResponse.json({ status: 200 });
      } else return returnError("Invalid Donation Status", 401);
    case "READY":
      if (donation_status == "COMPLETED" || donation_status == "RESCHEDULED") {
        return updateDonationStatus(existingDonation.id, donation_status);
      } else return returnError("Invalid Donation Status", 401);

    default:
      return returnError("Invalid donation status in database", 500);
  }
}

async function returnError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status: status });
}

export async function updateDonationStatus(
  donation_id: string,
  status: DonationStatus
) {
  await client.donation.update({
    where: { id: donation_id },
    data: { status: status },
  });
  return NextResponse.json({ status: 200 });
}
