import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const body = await request.json();

  const secret = new TextEncoder().encode(process.env.jwt_secret);
  const alg = "HS256";

  const jwt = await new SignJWT(body)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("90d")
    .sign(secret);

  cookies().set({
    name: "jwt-token",
    value: `Bearer ${jwt}`,
    secure: true,
    httpOnly: true,
  });
  return NextResponse.json({ message: "Token created" });
};
