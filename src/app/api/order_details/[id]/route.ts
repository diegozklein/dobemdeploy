import { NextRequest, NextResponse } from "next/server";
import { getDataToken } from "../../../../utils/getDataToken";
import client from "@/database";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = getDataToken(request);
  const donationId = params.id;

  const intermediary = await client.intermediary.findFirst({
    where: { fk_user: userId },
  });

  if (!intermediary) return returnError("Forbidden", 403);

  const donation = await client.donation.findFirst({
    where: {
      id: donationId,
      fk_intermediary: userId,
    },
    select: {
      id: true,
      status: true,
      delivery_date: true,
      quantity: true,
      food_type: true,
      amount: true,
      Receiver: {
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!donation) return returnError("Invalid ID", 404);

  return NextResponse.json({ message: donation }, { status: 200 });
}

async function returnError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status: status });
}
