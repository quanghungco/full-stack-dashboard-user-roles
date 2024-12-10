import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

// Create matchers based on the routeAccessMap
const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

export default clerkMiddleware(async (auth, req) => {
  // Get the session claims (metadata) of the current user
  const { sessionClaims } = auth();

  // Debugging: Log session claims to ensure you have the correct session
  console.log("Session Claims:", sessionClaims);

  // Extract the role from org_role field (remove 'org:' prefix)
  const orgRole = sessionClaims?.org_role; // 'org:admin'
  const role = orgRole ? orgRole.split(":")[1] : undefined; // Extract 'admin'

 

  console.log("User role in middleware: 🧑🏽‍✈️", role);

  // Check if the user role has access to the requested route
  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req) && role && !allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL(`/${role}`, req.url)); // Redirect to user's role-specific page
    }
  }

  return NextResponse.next(); // Continue with the request if the role is valid
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)", // Always run for API routes
  ],
};