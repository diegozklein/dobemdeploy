import { NextRequest, NextResponse } from "next/server";
import client from "@/database";
import { getDataToken } from "@/utils/getDataToken";

export async function GET(request: NextRequest) {
  const token = await getDataToken(request);

  const user = await client.receiver.findFirst({
    where: {
      fk_user: token,
    },
    select: {
      user: {
        select: {
          address: {
            select: {
              city: true,
              state: true,
            },
          },
        },
      },
    },
  });

  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  const list = await client.intermediary.findMany({
    where: {
      user: {
        address: {
          AND: [
            { state: user.user.address.state },
            { city: user.user.address.city },
          ],
        },
      },
    },
    select: {
      company_type: true,
      user: {
        select: {
          id: true,
          name: true,
          phone_number: true,
          address: {
            select: {
              zip: true,
              number: true,
            },
          },
        },
      },
    },
  });

  if (list.length == 0) {
    return NextResponse.json(
      { message: "There are no intermediaries in yout city." },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: list }, { status: 200 });
}
