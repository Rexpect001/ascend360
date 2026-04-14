import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ADMIN_PATHS = ["/admin/login"];

function isAdminRoute(pathname: string) {
  return pathname.startsWith("/admin");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isAdminRoute(pathname)) return NextResponse.next();

  // Allow login page through
  if (PUBLIC_ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    // If already logged in, redirect to dashboard
    const token = request.cookies.get("access_token")?.value;
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        await jwtVerify(token, secret);
        return NextResponse.redirect(new URL("/admin", request.url));
      } catch {
        // Token invalid — let them see the login page
      }
    }
    return NextResponse.next();
  }

  // All other /admin routes require a valid token
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    // Forward user info to server components via headers
    const res = NextResponse.next();
    res.headers.set("x-user-id", String(payload.userId ?? ""));
    res.headers.set("x-user-email", String(payload.email ?? ""));
    res.headers.set("x-user-role", String(payload.role ?? "EDITOR"));
    res.headers.set("x-user-name", String(payload.name ?? "Admin"));
    return res;
  } catch {
    // Token expired or invalid — redirect to login
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    const res = NextResponse.redirect(loginUrl);
    res.cookies.delete("access_token");
    res.cookies.delete("refresh_token");
    return res;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
