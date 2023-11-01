import prisma from "../../../database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const doBemBalance = await prisma.doBemAccount.findFirst({
            select: {
                balance: true
            }
        });

        return NextResponse.json({ data: doBemBalance }, { status: 200 })

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}