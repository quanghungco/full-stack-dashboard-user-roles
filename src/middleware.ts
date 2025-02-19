import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // If no token or role, redirect to login
    if (!token?.role) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    if (path === '/dashboard') {
      const rolePath = `/dashboard/${String(token.role).toLowerCase()}`;
      return NextResponse.redirect(new URL(rolePath, req.url));
    }
    // Role-based route protection
    if (path.startsWith('/dashboard/admin') && token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL(`/dashboard/${String(token.role).toLowerCase()}`, req.url));
    }
    if (path.startsWith('/dashboard/teacher') && token.role !== 'TEACHER') {
      return NextResponse.redirect(new URL(`/dashboard/${String(token.role).toLowerCase()}`, req.url));
    }
    if (path.startsWith('/dashboard/student') && token.role !== 'STUDENT') {
      return NextResponse.redirect(new URL(`/dashboard/${String(token.role).toLowerCase()}`, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/auth/:path*", // Ensure NextAuth API routes are handled correctly
  ],
};
