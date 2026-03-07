import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/doctor") && token?.role !== "DOCTOR") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/portal") && token?.role !== "PATIENT") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (
      pathname.startsWith("/api/admin") &&
      token?.role !== "ADMIN"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (
      pathname.startsWith("/api/doctor") &&
      token?.role !== "DOCTOR"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (
      pathname.startsWith("/api/patient") &&
      token?.role !== "PATIENT"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        // Only require auth for protected routes
        if (
          pathname.startsWith("/admin") ||
          pathname.startsWith("/doctor") ||
          pathname.startsWith("/portal") ||
          pathname.startsWith("/api/admin") ||
          pathname.startsWith("/api/doctor") ||
          pathname.startsWith("/api/patient")
        ) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/doctor/:path*",
    "/portal/:path*",
    "/api/admin/:path*",
    "/api/doctor/:path*",
    "/api/patient/:path*",
  ],
};
