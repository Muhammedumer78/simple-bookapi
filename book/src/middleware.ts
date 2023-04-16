import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  let token = await request.headers.get("authtoken");
  if (!token) {
    return NextResponse.json({
      status: 400,
      statusText: "Token not found",
    });
  } else {
    return NextResponse.rewrite(new URL('/api/orders', request.url));  }
}

export const config = {
  matcher: '/api/orders',
}