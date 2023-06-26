import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export const middleware = async (request) => {
  const { pathname } = request.nextUrl;
  const isPath = (path) => pathname.startsWith(path);
  try {
    let cookie = request.cookies.get("jwt-token")?.value;
    if (!cookie || !cookie.startsWith("Bearer")) {
      throw new Error("Invalid token");
    }
    const secret = new TextEncoder().encode(process.env.jwt_secret);
    await jwtVerify(cookie.split("Bearer ")[1], secret);
    if (isPath("/login") || isPath("/signup")) {
      const { searchParams } = new URL(request.url);
      const redirectUrl = searchParams.get("redirectUrl") || "/";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    return NextResponse.next();
  } catch (error) {
    if (isPath("/login") || isPath("/signup")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(`/login?redirectUrl=${pathname}`, request.url)
    );
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/profile/:path*",
    "/dashboard/:path*",
    "/login/:path*",
    "/signup/:path*",
  ],
};
