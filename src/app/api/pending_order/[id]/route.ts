import { NextRequest, NextResponse } from "next/server";
import { getDataToken } from "../../../../utils/getDataToken";
import { DonationStatus } from "@prisma/client";
import client from "@/database";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = getDataToken(request);
    const intermediaryId = params.id;
    const user = await client.user.findUnique({ where: { id: userId } });
    const intermediary = await client.user.findUnique({
      where: { id: intermediaryId },
    });

    if (!user) {
      return returnError("User not found", 404);
    }

    if (!intermediary) {
      return returnError("Intermediary not found", 404);
    }

    if (intermediary.id !== userId) {
      return returnError("Forbidden", 403);
    }

    const pendingDonations = await client.donation.findMany({
      where: {
        fk_intermediary: intermediaryId,
        status: DonationStatus.PENDING,
      },
    });

    if (pendingDonations.length === 0) {
      return returnError("No pending donations", 404);
    }

    return NextResponse.json(pendingDonations, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return returnError("Internal Server Error", 500);
  }
}

async function returnError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status: status });
}
