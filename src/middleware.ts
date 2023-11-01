import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { TextEncoder } from "text-encoding";

const PUBLIC_PATHS = ["/", "/login", "/register"];

const textEncoder = new TextEncoder();

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;
  const isPublic = PUBLIC_PATHS.includes(path);
  const isTokenVerified =
    token &&
    (await jwtVerify(
      token,
      textEncoder.encode(process.env.JWT_SECRET_KEY!)
    ).catch((err) => {
      console.log(err);
    }));

  if (isTokenVerified) {
    return NextResponse.next();
  } else {
    if (isPublic) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard", "/paymentConfirmation"],
};
