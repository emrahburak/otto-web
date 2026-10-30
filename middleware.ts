import { NextResponse } from "next/server";

export const config = {
  matcher: ["/"],
};

export default function middleware(request: Request) {
  const url = new URL(request.url);
  if (url.pathname === "/") {
    return NextResponse.rewrite(new URL("/api/handler", request.url));
  }
  return NextResponse.next();
}
