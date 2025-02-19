import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// import saltAndHashPassword from "./utils/password"
// import { getUserFromDb } from "./lib/userAction"
import { signInSchema } from "./lib/formValidationSchemas"
import prisma from './lib/prisma';
import bcrypt from "bcryptjs";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Store role in token
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (token && session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Ensure redirection always goes to /dashboard/admin
      if (url === "/") {
        return `${baseUrl}/dashboard/admin`;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.role = user.role;
  //       token.id = user.id;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }: { session: any, token: any }) {
  //     if (session.user) {
  //       session.user.role = token.role as string;
  //       session.user.id = token.id as string;
  //     }
  //     return session;
  //   }
  // },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },


      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials);

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          throw new Error("Invalid credentials.");
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        };
      }
      ,
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: "/auth/error",
  },
})
export const { auth } = handler
export const { GET, POST } = handler