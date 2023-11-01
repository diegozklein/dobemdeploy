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

    const verify = await prisma.receiver.findFirst({
      where: {
        fk_user: user?.id,
      },
    });

    if (!verify) {
      return NextResponse.json(
        { error: "User is not of Receiver type" },
        { status: 400 }
      );
    } else {
      const donations = await prisma.donation
        .findMany({
          where: {
            fk_receiver: user?.id,
          },
          include: {
            Intermediary: {
              select: {
                company_type: true,
                user: {
                  select: {
                    address: {
                      select: {
                        city: true,
                        state: true,
                        zip: true,
                        number: true,
                      },
                    },
                  },
                },
              },
            },
          },
        })
        .then((donations) => {
          return donations.map((donation) => {
            const intermediary = donation.Intermediary;
            const address = intermediary.user.address;
            return {
              id: donation.id,
              fk_intermediary: donation.fk_intermediary,
              fk_receiver: donation.fk_receiver,
              code: donation.code,
              status: donation.status,
              delivery_date: donation.delivery_date,
              quantity: donation.quantity,
              food_type: donation.food_type,
              amount: donation.amount,
              company_type: intermediary.company_type,
              address: {
                city: address.city,
                state: address.state,
                zip: address.zip,
                number: address.number,
              },
            };
          });
        });

      return NextResponse.json({ donations: donations });
    }
  } catch {
    return NextResponse.json({ error: "User does not exist" }, { status: 400 });
  }
}
