import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import bcrypt from "bcrypt";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: ({ token, user }) => {
      console.log("JWT callback called with token and user:", token, user);
      if (user) {
        token.id = user.id;
      }
  
      console.log("Token value:", token);
      return token;
    }
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }), 

    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        console.log("Authorize function called with credentials:", credentials);
        const { email, password } = credentials as {
          email: string;
          password: string;
        }
    
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        console.log("User found:", user);
        const hashedPassword = user?.password?.toString() || "";
        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log("Password match:", isMatch);
        if (isMatch && user) {
          return user;
        } else {
          throw new Error("No user found");
        }
      },
    }),
    
  ],

  pages: {
    signIn: "/sign", // Displays signin buttons
    error: "/auth/error", // Error code passed in query string as ?error=
  },

  session: {
    strategy: "jwt",
  },



};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};