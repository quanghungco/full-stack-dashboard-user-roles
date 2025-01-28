import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma"; // Adjust the import based on your structure

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Here you can fetch the user from your database
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        // Check if user exists and password matches
        if (user && user.password === credentials?.password) {
          return { id: user.id, email: user.email }; // Return user object
        }
        return null; // Return null if user not found or password doesn't match
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user id to token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; // Add user id to session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 