import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../database";
import { getDataToken } from "../../../utils/getDataToken";
import { exclude } from "../../../utils/prisma/exclude";

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataToken(request);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    const response = exclude(user, "password");
    return NextResponse.json({
      data: response,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
