import { NextRequest, NextResponse } from "next/server";
import { getDataToken } from "../../../../utils/getDataToken";
import prisma from "../../../../database";

export async function GET(req: NextRequest) {
  const userID = await getDataToken(req);
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userID,
      },
    });

    const verify = await prisma.donor.findFirst({
      where: {
        fk_user: user?.id,
      },
    });

    if (!verify) {
      return NextResponse.json(
        { error: "User is not of Donor type" },
        { status: 400 }
      );
    } else {
      const donations = await prisma.moneyDonation.findMany({
        where: {
          donorId: user?.id,
        },
        orderBy: { creation_date: "desc" },
      });
      return NextResponse.json({ donations: donations });
    }
  } catch {
    return NextResponse.json({ error: "User does not exist" }, { status: 400 });
  }
}
