import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, applicationDefault } from 'firebase-admin/app';

// Initialize Firebase Admin SDK (do this only once)
// You might have this in a separate file
if (!initializeApp.length) {
  initializeApp({
    credential: applicationDefault(),
  });
}

const auth = getAuth();
const db = getFirestore();

const allowedRoles = {
  '/superadmin': ['superadmin'],
  '/admin': ['superadmin', 'admin'],
  '/accountant': ['superadmin', 'admin', 'accountant'],
  '/teacher': ['superadmin', 'admin', 'teacher'],
  '/student': ['superadmin', 'admin', 'student'],
  '/parent': ['superadmin', 'admin', 'parent'],
};

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const token = request.cookies.get('token')?.value || request.headers.get('Authorization')?.split(' ')[1]; // Get token from cookie or header

  if (!token) {
    // Redirect to login or return unauthorized response
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;

    const userDoc = await db.collection('users').doc(uid).get();
    const userRole = userDoc.data()?.role as string;

    const requestedPath = request.nextUrl.pathname;

    // Check if the requested path requires a specific role
    for (const path in allowedRoles) {
      if (requestedPath.startsWith(path)) {
        const allowedRolesForPath = allowedRoles[path as keyof typeof allowedRoles];
        if (!allowedRolesForPath.includes(userRole)) {
          // Redirect to an unauthorized page or return forbidden response
          return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
      }
    }

    // If authorized, continue to the next middleware or page
    return response;

  } catch (error) {
    console.error("Error verifying token or fetching user role:", error);
    // Redirect to login or return unauthorized response for invalid token
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/superadmin/:path*',
    '/admin/:path*',
    '/accountant/:path*',
    '/teacher/:path*',
    '/student/:path*',
    '/parent/:path*',
  ],
};
