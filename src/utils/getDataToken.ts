import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataToken = (request: NextRequest) => {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1] || "";

    const tokenInfo: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    return tokenInfo.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
