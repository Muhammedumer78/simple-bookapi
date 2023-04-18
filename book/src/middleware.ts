import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  let token = await request.headers.get("authtoken");
  if (!token) {
    return NextResponse.json({
      status: 400,
      statusText: "Token not found",
    });
  } else {
    // fetch request to self api
    // send auth token in header
    let res: any = await fetch(`${process.env.MIDLLEWARE_URL}/api/auth`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    // API response
    const data = await res.json();
    if (data.noUser) {
      return NextResponse.json({
        status: 404,
        statusText: "User not registered",
      });
    } else {
      return NextResponse.rewrite(new URL("/api/orders", request.url));
    }
  }
}

export const config = {
  matcher: "/api/orders",
};
