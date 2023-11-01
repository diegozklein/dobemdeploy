import prisma from "../../../database";
import { NextRequest, NextResponse } from "next/server";
import { getDataToken } from "../../../utils/getDataToken";

export async function GET(req: NextRequest) {
  try {
    const userId = getDataToken(req);

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const donations = await prisma.donation.findMany({
      where: {
        fk_receiver: userId,
      },
    });

    return NextResponse.json({ status: 200, data: donations });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
