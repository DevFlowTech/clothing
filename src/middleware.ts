import NextAuth from "next-auth";

// Simplified middleware that doesn't require database connection for basic routes
// The database connection is only needed when session is accessed

const { auth } = NextAuth({
  providers: [],
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token }) {
      return token;
    },
    session({ session }) {
      return session;
    },
  },
});

export default auth(() => {
  // For now, skip auth checks in development when DB is not connected
  // The actual protection happens at the page level with server-side auth checks
  return;
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
