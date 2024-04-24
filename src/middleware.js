import { NextResponse } from "next/server";

export function middleware(request) {
  const basicAuth = request.headers.get("authorization");
  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");
    const validUser = process.env.BASIC_AUTH_USER;
    const validPassWord = process.env.BASIC_AUTH_PASSWORD;
    if (user === validUser && pwd === validPassWord) return NextResponse.next();
  }
  return NextResponse.rewrite(new URL("/api/auth", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
