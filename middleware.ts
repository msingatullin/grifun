import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { hostname } = request.nextUrl;

  if (hostname === "grifun.ru") {
    const url = request.nextUrl.clone();
    url.hostname = "www.grifun.ru";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
