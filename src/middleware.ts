import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // If no token or role, redirect to login
    if (!token?.role) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // Redirect logged-in users to their respective dashboards
    if (path === "/dashboard") {
      const rolePath = `/dashboard/${String(token.role).toLowerCase()}`;
      return NextResponse.redirect(new URL(rolePath, req.url));
    }

    // Ensure users only access their allowed dashboard
    const rolePaths = {
      ADMIN: "/dashboard/admin",
      TEACHER: "/dashboard/teacher",
      STUDENT: "/dashboard/student",
    };

    const userRolePath = rolePaths[token.role as keyof typeof rolePaths] || "/dashboard";

    if (!path.startsWith(userRolePath)) {
      return NextResponse.redirect(new URL(userRolePath, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
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
