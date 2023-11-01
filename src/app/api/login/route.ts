import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../../database";
import { getUserType } from "../../../utils/getUserType";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário ou senha inválidos" },
        { status: 400 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Usuário ou senha inválidos" }, { status: 400 });
    }

    const tokenData = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1h",
    });

    const userType = await getUserType(user.id);

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      userType: userType,
      token: token,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
