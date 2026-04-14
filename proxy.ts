import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";

const ADMIN_PATHS = ["/admin"];
const PUBLIC_ADMIN_PATHS = ["/admin/login"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run on admin paths
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Allow login page
  if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check access token
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const payload = verifyAccessToken(token);

  if (!payload) {
    // Try refresh flow: redirect to a refresh endpoint
    const response = NextResponse.redirect(new URL("/admin/login", request.url));
    response.cookies.delete("access_token");
    return response;
  }

  // Inject user info into request headers for use in server components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", payload.userId);
  requestHeaders.set("x-user-role", payload.role);
  requestHeaders.set("x-user-name", payload.name);
  requestHeaders.set("x-user-email", payload.email);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
